// Stub — wired up for real in commit 2. Keeps the scaffold buildable.
import { ThemePicker } from './components/ThemePicker'

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="absolute top-4 right-4">
        <ThemePicker />
      </div>
      <h1 className="text-4xl font-bold text-text-bright mb-2">Connections Maker</h1>
      <p className="text-text-dim">Build and share your own Connections puzzles.</p>
      <p className="text-text-dim text-sm mt-8 opacity-60">scaffold loaded — game coming next</p>
    </div>
  )
}
