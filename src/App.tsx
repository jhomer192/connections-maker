import { useEffect, useState } from 'react'
import { ThemePicker } from './components/ThemePicker'
import { CreatePanel } from './components/CreatePanel'
import { readMode } from './lib/share'
import type { Mode } from './lib/share'

export default function App() {
  const [mode, setMode] = useState<Mode>(() => readMode())

  useEffect(() => {
    const onHash = () => setMode(readMode())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function goHome() {
    window.location.hash = ''
  }
  function goCreate() {
    window.location.hash = 'create'
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-10">
        <ThemePicker />
      </div>

      {mode.kind === 'home' && <HomeScreen onCreate={goCreate} />}
      {mode.kind === 'create' && <CreatePanel onBack={goHome} />}
      {mode.kind === 'play' && <PlayPlaceholder title={mode.puzzle.title} onBack={goHome} />}
      {mode.kind === 'invalid' && <InvalidScreen onBack={goHome} onCreate={goCreate} />}
    </div>
  )
}

function HomeScreen({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="max-w-xl mx-auto p-8 pt-16 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-6 w-6 rounded" style={{ background: 'var(--diff-0)' }} />
        <div className="h-6 w-6 rounded" style={{ background: 'var(--diff-1)' }} />
        <div className="h-6 w-6 rounded" style={{ background: 'var(--diff-2)' }} />
        <div className="h-6 w-6 rounded" style={{ background: 'var(--diff-3)' }} />
      </div>
      <h1 className="text-4xl font-bold text-[var(--text)] mb-2">Connections Maker</h1>
      <p className="text-[var(--text-dim)] mb-10">
        Build and share your own NYT-style Connections puzzles. 16 words, 4 groups, no account needed.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="w-full py-4 rounded-lg bg-[var(--accent)] text-[#111] font-semibold text-lg hover:brightness-110 transition-all mb-3"
      >
        Create a puzzle
      </button>
      <p className="text-[var(--text-dim)] text-xs mt-8">
        Puzzles live entirely in the share link -- no accounts, no database, nothing tracked.
      </p>
    </div>
  )
}

function PlayPlaceholder({ title, onBack }: { title?: string; onBack: () => void }) {
  return (
    <div className="max-w-xl mx-auto p-8 pt-16 text-center">
      <h1 className="text-2xl font-bold text-[var(--text)] mb-2">{title ?? 'Untitled puzzle'}</h1>
      <p className="text-[var(--text-dim)] mb-6">Play panel coming in the next commit.</p>
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
      >
        Home
      </button>
    </div>
  )
}

function InvalidScreen({ onBack, onCreate }: { onBack: () => void; onCreate: () => void }) {
  return (
    <div className="max-w-xl mx-auto p-8 pt-16 text-center">
      <div className="text-5xl mb-4">🤔</div>
      <h1 className="text-2xl font-bold text-[var(--text)] mb-2">That link isn't a valid puzzle</h1>
      <p className="text-[var(--text-dim)] mb-6">
        It might be truncated by the chat app that sent it, or the puzzle format has changed.
      </p>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onCreate}
          className="w-full py-3 rounded-lg bg-[var(--accent)] text-[#111] font-semibold"
        >
          Create a new puzzle
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 text-[var(--text-dim)]"
        >
          Home
        </button>
      </div>
    </div>
  )
}
