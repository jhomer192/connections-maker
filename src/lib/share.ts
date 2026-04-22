import type { Puzzle } from '../types/puzzle'
import { validatePuzzle } from './puzzle'

/**
 * URL hash encoding for puzzles.
 *
 * Puzzles serialize to JSON, then to base64url (same as JWT segments:
 * swap `+/` for `-_` and drop `=` padding). This keeps the hash safe
 * across URL-shortening and chat apps that sometimes munge `+` or `=`.
 *
 * A full 16-word puzzle is ~300 bytes of JSON, ~400 chars of base64 --
 * well under every browser's URL limit.
 *
 * The hash never hits a server, so puzzle content stays private between
 * the creator and whoever they share the link with. No DB required.
 */

export function encodePuzzle(puzzle: Puzzle): string {
  const json = JSON.stringify(puzzle)
  // btoa requires latin1-safe input; UTF-8 encode first so emoji / accents
  // in titles round-trip cleanly.
  const bytes = new TextEncoder().encode(json)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  const b64 = btoa(bin)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodePuzzle(encoded: string): Puzzle | null {
  try {
    // Reverse base64url -> base64
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4
    if (pad) b64 += '='.repeat(4 - pad)
    const bin = atob(b64)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    const parsed = JSON.parse(json) as unknown
    const result = validatePuzzle(parsed)
    return result.ok ? result.puzzle : null
  } catch {
    return null
  }
}

/**
 * Build a shareable URL for a puzzle. Uses location.origin + location.pathname
 * so it works whether the app is at `/connections-maker/`, a custom domain,
 * or localhost during dev.
 */
export function shareUrl(puzzle: Puzzle): string {
  const base = `${window.location.origin}${window.location.pathname}`
  return `${base}#p=${encodePuzzle(puzzle)}`
}

/**
 * Parse the current URL hash into a mode decision.
 *   #p=...     -> play that puzzle
 *   #create    -> create mode
 *   otherwise  -> home
 */
export type Mode =
  | { kind: 'home' }
  | { kind: 'create' }
  | { kind: 'play'; puzzle: Puzzle }
  | { kind: 'invalid' }

export function readMode(): Mode {
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return { kind: 'home' }
  if (hash === 'create') return { kind: 'create' }
  if (hash.startsWith('p=')) {
    const puzzle = decodePuzzle(hash.slice(2))
    return puzzle ? { kind: 'play', puzzle } : { kind: 'invalid' }
  }
  return { kind: 'home' }
}

/**
 * Clipboard helper. Falls back to a textarea hack if the Clipboard API is
 * unavailable (older iOS Safari, non-HTTPS contexts).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
