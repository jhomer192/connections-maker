import type { Puzzle } from '../types/puzzle'
import { usePuzzleState } from '../hooks/usePuzzleState'
import { Tile } from './Tile'
import { SolvedGroupBanner } from './SolvedGroupBanner'
import { ResultsScreen } from './ResultsScreen'

export function PlayPanel({ puzzle, onBack, onCreate }: { puzzle: Puzzle; onBack: () => void; onCreate: () => void }) {
  const state = usePuzzleState(puzzle)

  if (state.status !== 'playing') {
    return (
      <ResultsScreen
        puzzle={puzzle}
        status={state.status}
        guesses={state.guesses}
        onPlayAgain={state.reset}
        onCreateOwn={onCreate}
        onHome={onBack}
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto p-4 pt-16">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onBack}
          className="text-[var(--text-dim)] hover:text-[var(--text)] text-sm"
        >
          ← Home
        </button>
        <div className="text-[var(--text-dim)] text-xs">
          {state.mistakesLeft} mistake{state.mistakesLeft === 1 ? '' : 's'} left
        </div>
      </div>

      {puzzle.title && (
        <h1 className="text-xl font-bold text-[var(--text)] text-center mb-1">{puzzle.title}</h1>
      )}
      {puzzle.author && (
        <div className="text-[var(--text-dim)] text-xs text-center mb-3">by {puzzle.author}</div>
      )}

      <p className="text-[var(--text-dim)] text-center text-sm mb-4">
        Create four groups of four!
      </p>

      {/* Solved banners at top */}
      <div className="space-y-2 mb-3">
        {state.solved.map((gi) => (
          <SolvedGroupBanner key={gi} group={puzzle.groups[gi]} />
        ))}
      </div>

      {/* Unsolved tiles grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {state.unsolvedOrder.map((w) => (
          <Tile
            key={w.word}
            word={w.word}
            selected={state.selected.some((s) => s.word === w.word)}
            shakeKey={state.selected.some((s) => s.word === w.word) ? state.shakeId : 0}
            onClick={() => state.toggle(w)}
          />
        ))}
      </div>

      {/* Mistakes remaining: filled dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-[var(--text-dim)] text-sm">Mistakes remaining:</span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full transition-all ${
                i < state.mistakesLeft ? 'bg-[var(--text)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={state.reshuffle}
          className="py-3 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--color-bg-hover)] text-sm font-medium"
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={state.clearSelected}
          disabled={state.selected.length === 0}
          className="py-3 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--color-bg-hover)] text-sm font-medium disabled:opacity-40"
        >
          Deselect all
        </button>
        <button
          type="button"
          onClick={state.submit}
          disabled={state.selected.length !== 4}
          className="py-3 rounded-full bg-[var(--accent)] text-[#111] text-sm font-semibold disabled:opacity-40 disabled:bg-[var(--border)] disabled:text-[var(--text-dim)]"
        >
          Submit
        </button>
      </div>

      {/* Toast -- CSS auto-dismisses; remount via key to replay on each event */}
      {state.oneAwayAt > 0 && (
        <div
          key={state.oneAwayAt}
          className="fixed top-20 left-1/2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-medium shadow-lg toast-flash pointer-events-none"
        >
          One away!
        </div>
      )}
    </div>
  )
}
