import type { PoleId } from '../data/poles'
import type { FormatId } from '../data/formats'

export type PosterStyle = 'box' | 'sober'
export type Edition = 'weekly' | 'special'
export type WhenMode = 'recurrence' | 'date' | 'free'
export type Rhythm = 'weekly' | 'biweekly' | 'first' | 'last'

export interface PosterState {
  pole: PoleId
  style: PosterStyle
  partners: string[]
  edition: Edition
  format: FormatId
  eventName: string
  place: string
  whenMode: WhenMode
  weekday: number
  rhythm: Rhythm
  date: string
  freeWhen: string
  timeStart: string
  timeEnd: string
  description: string
  price: string
}

const today = new Date()
const nextSaturday = new Date(today)
nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7 || 7))
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const DEFAULT_STATE: PosterState = {
  pole: 'tcg',
  style: 'box',
  partners: [],
  edition: 'weekly',
  format: 'ig-portrait',
  eventName: 'Commander Night',
  place: 'Salle B204',
  whenMode: 'recurrence',
  weekday: 2,
  rhythm: 'weekly',
  date: iso(nextSaturday),
  freeWhen: '',
  timeStart: '18:30',
  timeEnd: '23:00',
  description: 'Ramenez vos decks, on fournit les tables et les tapis.',
  price: '',
}

export const WEEKDAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
export const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

export const RHYTHMS: { id: Rhythm; label: string }[] = [
  { id: 'weekly', label: 'Chaque semaine' },
  { id: 'biweekly', label: 'Une semaine sur deux' },
  { id: 'first', label: 'Le premier du mois' },
  { id: 'last', label: 'Le dernier du mois' },
]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const parseDate = (value: string) => {
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export function whenLine(s: PosterState): string {
  if (s.whenMode === 'free') return s.freeWhen.trim()
  if (s.whenMode === 'date') {
    const d = parseDate(s.date)
    if (!d) return ''
    return cap(new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(d))
  }
  const day = WEEKDAYS[s.weekday]
  switch (s.rhythm) {
    case 'weekly':
      return `Tous les ${day}s`
    case 'biweekly':
      return `Un ${day} sur deux`
    case 'first':
      return `Le premier ${day} du mois`
    case 'last':
      return `Le dernier ${day} du mois`
  }
}

export interface Badge {
  big: string
  small: string
}

export function badgeFor(s: PosterState): Badge | null {
  if (s.whenMode === 'free') return null
  if (s.whenMode === 'date') {
    const d = parseDate(s.date)
    if (!d) return null
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(d).replace('.', '')
    return { big: String(d.getDate()), small: month }
  }
  const short = WEEKDAYS[s.weekday].slice(0, 3)
  const small = { weekly: 'hebdo', biweekly: '1 sur 2', first: '1er du mois', last: 'fin du mois' }[s.rhythm]
  return { big: short, small }
}

const fmtTime = (t: string) => {
  const [h, m] = t.split(':')
  if (!h) return ''
  return m && m !== '00' ? `${Number(h)}h${m}` : `${Number(h)}h`
}

export function timeLine(s: PosterState): string {
  const a = fmtTime(s.timeStart)
  const b = fmtTime(s.timeEnd)
  if (a && b) return `${a}\u00a0–\u00a0${b}`
  if (a) return `Dès\u00a0${a}`
  return ''
}

export function slug(s: string) {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'affiche'
  )
}
