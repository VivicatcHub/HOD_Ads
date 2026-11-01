import { useCallback, useEffect, useRef, useState } from 'react'
import { Shelf } from './components/Shelf'
import { Sheet } from './components/Sheet'
import { Stage } from './components/Stage'
import { formatById } from './data/formats'
import { poleById, type PoleId } from './data/poles'
import { exportPoster, type ExportKind } from './lib/export'
import { DEFAULT_STATE, slug, type PosterState } from './lib/poster-state'

const STORAGE_KEY = 'hod-ads:v1'

const load = (): PosterState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
  return DEFAULT_STATE
}

export default function App() {
  const [state, setState] = useState<PosterState>(load)
  const [busy, setBusy] = useState<ExportKind | null>(null)
  const [error, setError] = useState<string | null>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      return
    }
  }, [state])

  const set = useCallback(<K extends keyof PosterState>(key: K, value: PosterState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
  }, [])

  const choosePole = (id: PoleId) => {
    setState((s) => {
      const prev = poleById(s.pole)
      const next = poleById(id)
      const nameUntouched = !s.eventName.trim() || prev.examples.includes(s.eventName)
      const pitchUntouched = !s.description.trim() || s.description === prev.pitch
      return {
        ...s,
        pole: id,
        eventName: nameUntouched ? next.examples[0] : s.eventName,
        description: pitchUntouched ? next.pitch : s.description,
      }
    })
  }

  const format = formatById(state.format)
  const baseName = ['hod', state.pole, slug(state.eventName), state.edition === 'special' ? 'speciale' : 'hebdo', state.style === 'sober' && 'sobre', ...state.partners, format.id]
    .filter(Boolean)
    .join('-')

  const onExport = async (kind: ExportKind) => {
    if (!posterRef.current) return
    setBusy(kind)
    setError(null)
    try {
      await exportPoster(posterRef.current, format, kind, baseName)
    } catch {
      setError('L’export a échoué. Réessaie ; si ça persiste, recharge la page.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="app" data-pole={state.pole}>
      <Shelf value={state.pole} onChange={choosePole} />
      <Stage state={state} posterRef={posterRef} />
      <Sheet
        state={state}
        set={set}
        onExport={onExport}
        onReset={() => setState(DEFAULT_STATE)}
        busy={busy}
        error={error}
        fileName={`${baseName}.${busy ?? 'png'}`}
      />
    </div>
  )
}
