import { useMemo, useState } from 'react'
import type { Difficulty, Puzzle } from '../types/puzzle'
import { DIFFICULTY_LABELS } from '../types/puzzle'
import { validatePuzzle } from '../lib/puzzle'
import { encodePuzzle, shareUrl, copyToClipboard } from '../lib/share'

/**
 * Shape of the in-progress form. Looser than Puzzle (strings instead of
 * tuples, optional difficulty) so the user can build the puzzle
 * incrementally without type gymnastics.
 */
interface DraftGroup {
  title: string
  words: string[] // always length 4
  difficulty: Difficulty | null
}

interface Draft {
  title: string
  author: string
  groups: DraftGroup[] // always length 4
}

function emptyDraft(): Draft {
  return {
    title: '',
    author: '',
    groups: [0, 1, 2, 3].map((i) => ({
      title: '',
      words: ['', '', '', ''],
      difficulty: i as Difficulty, // pre-assign distinct difficulties so it's valid from the start
    })),
  }
}

function draftToPuzzle(d: Draft): unknown {
  return {
    v: 1,
    title: d.title.trim() || undefined,
    author: d.author.trim() || undefined,
    groups: d.groups.map((g) => ({
      title: g.title,
      words: g.words,
      difficulty: g.difficulty,
    })),
  }
}

const DIFFICULTY_OPTIONS: Difficulty[] = [0, 1, 2, 3]

export function CreatePanel({ onBack, initialPuzzle }: { onBack: () => void; initialPuzzle?: Puzzle }) {
  const [draft, setDraft] = useState<Draft>(() => {
    if (!initialPuzzle) return emptyDraft()
    return {
      title: initialPuzzle.title ?? '',
      author: initialPuzzle.author ?? '',
      groups: initialPuzzle.groups.map((g) => ({
        title: g.title,
        words: [...g.words],
        difficulty: g.difficulty,
      })),
    }
  })
  const [showShareFor, setShowShareFor] = useState<Puzzle | null>(null)

  const validation = useMemo(() => validatePuzzle(draftToPuzzle(draft)), [draft])

  const wordsFilled = draft.groups.reduce(
    (n, g) => n + g.words.filter((w) => w.trim()).length,
    0,
  )

  function updateGroup(i: number, patch: Partial<DraftGroup>) {
    setDraft((d) => ({
      ...d,
      groups: d.groups.map((g, gi) => (gi === i ? { ...g, ...patch } : g)),
    }))
  }

  function updateWord(gi: number, wi: number, value: string) {
    setDraft((d) => ({
      ...d,
      groups: d.groups.map((g, i) =>
        i === gi ? { ...g, words: g.words.map((w, j) => (j === wi ? value : w)) } : g,
      ),
    }))
  }

  function handleGenerate() {
    if (!validation.ok) return
    setShowShareFor(validation.puzzle)
    window.location.hash = `p=${encodePuzzle(validation.puzzle)}`
  }

  if (showShareFor) {
    return <ShareScreen puzzle={showShareFor} onEdit={() => setShowShareFor(null)} onBack={onBack} />
  }

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-[var(--text-dim)] hover:text-[var(--text)] text-sm"
          type="button"
        >
          ← Home
        </button>
        <h1 className="text-2xl font-bold text-[var(--text)]">Create puzzle</h1>
        <div className="w-12" />
      </div>

      <div className="bg-[var(--surface)] rounded-lg p-4 mb-4 border border-[var(--border)]">
        <input
          type="text"
          placeholder="Puzzle title (optional)"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          className="w-full bg-transparent text-xl font-semibold text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none"
          maxLength={80}
        />
        <input
          type="text"
          placeholder="Your name (optional)"
          value={draft.author}
          onChange={(e) => setDraft((d) => ({ ...d, author: e.target.value }))}
          className="w-full bg-transparent text-sm text-[var(--text-dim)] placeholder:text-[var(--text-dim)] focus:outline-none mt-1"
          maxLength={40}
        />
      </div>

      <ValidationPill validation={validation} wordsFilled={wordsFilled} />

      <div className="space-y-4 mt-4">
        {draft.groups.map((g, gi) => (
          <GroupEditor
            key={gi}
            index={gi}
            group={g}
            usedDifficulties={draft.groups.filter((_, i) => i !== gi).map((x) => x.difficulty)}
            onUpdate={(patch) => updateGroup(gi, patch)}
            onWordChange={(wi, value) => updateWord(gi, wi, value)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!validation.ok}
        className="mt-6 w-full py-3 rounded-lg bg-[var(--accent)] text-[#111] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
      >
        Generate share link
      </button>
    </div>
  )
}

function ValidationPill({
  validation,
  wordsFilled,
}: {
  validation: ReturnType<typeof validatePuzzle>
  wordsFilled: number
}) {
  if (validation.ok) {
    return (
      <div className="px-3 py-2 rounded-md bg-[var(--accent)]/20 text-[var(--accent)] text-sm border border-[var(--accent)]/40">
        Ready to share — all 16 words, 4 groups, 4 colors ✓
      </div>
    )
  }
  const msg = wordsFilled < 16 ? `${wordsFilled}/16 words entered` : validation.error
  return (
    <div className="px-3 py-2 rounded-md bg-[var(--color-danger)]/10 text-[var(--text)] text-sm border border-[var(--border)]">
      {msg}
    </div>
  )
}

function GroupEditor({
  index,
  group,
  usedDifficulties,
  onUpdate,
  onWordChange,
}: {
  index: number
  group: DraftGroup
  usedDifficulties: (Difficulty | null)[]
  onUpdate: (patch: Partial<DraftGroup>) => void
  onWordChange: (wi: number, value: string) => void
}) {
  const bandColor = group.difficulty !== null ? `var(--diff-${group.difficulty})` : 'var(--border)'
  return (
    <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="h-1.5" style={{ background: bandColor }} />
      <div className="p-4 space-y-3">
        <div className="flex gap-2 items-center">
          <span className="text-[var(--text-dim)] text-sm font-mono w-6">{index + 1}.</span>
          <input
            type="text"
            placeholder="Category title (e.g. Types of bread)"
            value={group.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="flex-1 bg-transparent text-[var(--text)] font-medium placeholder:text-[var(--text-dim)] focus:outline-none"
            maxLength={60}
          />
          <select
            value={group.difficulty ?? ''}
            onChange={(e) => {
              const v = e.target.value
              onUpdate({ difficulty: v === '' ? null : (Number(v) as Difficulty) })
            }}
            className="bg-[var(--bg)] border border-[var(--border)] rounded px-2 py-1 text-sm text-[var(--text)]"
          >
            <option value="">Color...</option>
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d} disabled={usedDifficulties.includes(d) && group.difficulty !== d}>
                {DIFFICULTY_LABELS[d]}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {group.words.map((w, wi) => (
            <input
              key={wi}
              type="text"
              placeholder={`Word ${wi + 1}`}
              value={w}
              onChange={(e) => onWordChange(wi, e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] rounded px-2 py-1.5 text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)]"
              maxLength={30}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ShareScreen({ puzzle, onEdit, onBack }: { puzzle: Puzzle; onEdit: () => void; onBack: () => void }) {
  const url = shareUrl(puzzle)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyToClipboard(url)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handlePlay() {
    // Hash is already set -- reload so App re-reads mode and enters Play.
    window.location.reload()
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold text-[var(--text)] mb-2">Puzzle ready</h1>
      <p className="text-[var(--text-dim)] mb-6">
        Share this link. Anyone who opens it plays your puzzle -- no account, no app install.
      </p>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3 mb-4">
        <div className="text-xs text-[var(--text-dim)] mb-1">Share URL</div>
        <div className="text-sm font-mono break-all text-[var(--text)] select-all">{url}</div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-3 rounded-lg bg-[var(--accent)] text-[#111] font-semibold hover:brightness-110 transition-all"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <button
          type="button"
          onClick={handlePlay}
          className="w-full py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--color-bg-hover)] transition-all"
        >
          Play my puzzle
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="w-full py-2 text-[var(--text-dim)] hover:text-[var(--text)] text-sm"
        >
          ← Edit
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 text-[var(--text-dim)] hover:text-[var(--text)] text-sm"
        >
          Home
        </button>
      </div>
    </div>
  )
}
