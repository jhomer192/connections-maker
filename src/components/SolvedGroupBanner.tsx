import type { Group } from '../types/puzzle'

/**
 * Colored banner that replaces a solved group's row of tiles. Shows
 * the theme title and the 4 words, using the group's difficulty color.
 */
export function SolvedGroupBanner({ group }: { group: Group }) {
  return (
    <div
      className="rounded-lg p-3 text-center group-reveal"
      style={{
        background: `var(--diff-${group.difficulty})`,
        color: `var(--diff-${group.difficulty}-text)`,
      }}
    >
      <div className="font-bold uppercase tracking-wide text-sm">{group.title}</div>
      <div className="text-sm mt-0.5">{group.words.join(', ')}</div>
    </div>
  )
}
