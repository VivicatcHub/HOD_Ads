import { forwardRef, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import logo from '../assets/logo.png'
import { HOD, poleById } from '../data/poles'
import { formatById, type Shape } from '../data/formats'
import { partnersByIds } from '../data/partners'
import { badgeFor, timeLine, whenLine, type PosterState } from '../lib/poster-state'
import { CalendarIcon, ClockIcon, D20Icon, PinIcon, SparkIcon, TicketIcon } from './icons'
import { CrystalBurst, Medallion, PoleMotif } from './motifs'
import { PartnerRibbon } from './PartnerRibbon'

const TITLE_MAX: Record<Shape, number> = { portrait: 15, story: 17, square: 13, landscape: 12.5 }
const TITLE_ROOM: Record<Shape, number> = { portrait: 0.44, story: 0.4, square: 0.42, landscape: 0.5 }
const STRETCHES = [125, 112, 100, 88, 78]

function useFontsTick() {
  const [tick, setTick] = useState(0)
  useLayoutEffect(() => {
    let alive = true
    const bump = () => alive && setTick((t) => t + 1)
    document.fonts.ready.then(bump)
    document.fonts.addEventListener('loadingdone', bump)
    return () => {
      alive = false
      document.fonts.removeEventListener('loadingdone', bump)
    }
  }, [])
  return tick
}

export const Poster = forwardRef<HTMLDivElement, { state: PosterState }>(function Poster({ state }, ref) {
  const pole = poleById(state.pole)
  const format = formatById(state.format)
  const shape = format.shape
  const special = state.edition === 'special'
  const partners = partnersByIds(state.partners)
  const u = Math.min(format.width, format.height) / 100

  const coverRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const [cover, setCover] = useState({ w: 0, h: 0 })
  const fonts = useFontsTick()

  useLayoutEffect(() => {
    const el = coverRef.current
    if (!el) return
    const measure = () => setCover({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const title = state.eventName.trim() || 'Nom de l’évènement'
  const tagline = state.description.trim()

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el || !cover.h) return
    const room = cover.h * TITLE_ROOM[shape] - (taglineRef.current?.offsetHeight ?? 0)
    const max = u * TITLE_MAX[shape]
    const min = u * 3
    for (let size = max; size >= min; size *= 0.95) {
      for (const stretch of STRETCHES) {
        el.style.fontSize = `${size}px`
        el.style.fontStretch = `${stretch}%`
        el.style.letterSpacing = stretch < 100 ? '0.012em' : '-0.01em'
        if (el.scrollWidth <= el.clientWidth + 1 && el.offsetHeight <= room) return
      }
    }
  }, [title, tagline, shape, special, cover.w, cover.h, u, fonts])

  const badge = badgeFor(state)
  const when = whenLine(state) || 'Date à définir'
  const time = timeLine(state)
  const place = state.place.trim() || 'Lieu à définir'
  const price = state.price.trim()

  const pictos = [
    { key: 'when', label: 'Quand', value: when, Icon: CalendarIcon },
    time && { key: 'time', label: 'Horaires', value: time, Icon: ClockIcon },
    { key: 'place', label: 'Lieu', value: place, Icon: PinIcon },
    price && { key: 'price', label: 'Entrée', value: price, Icon: TicketIcon },
  ].filter(Boolean) as { key: string; label: string; value: string; Icon: typeof CalendarIcon }[]

  const vars = {
    '--u': `${u}px`,
    '--pw': `${format.width}px`,
    '--ph': `${format.height}px`,
    '--pole': pole.base,
    '--pole-deep': pole.deep,
    '--pole-light': pole.light,
    '--pole-line': pole.line,
    '--pole-ink': pole.ink,
    '--pole-ink-soft': pole.inkSoft,
    '--hod-night': HOD.night,
    '--hod-deep': HOD.deep,
    '--hod-royal': HOD.royal,
    '--hod-electric': HOD.electric,
    '--hod-orchid': HOD.orchid,
    '--hod-lilac': HOD.lilac,
    '--hod-gold': HOD.gold,
  } as CSSProperties

  const burstCenter = { x: cover.w * (shape === 'landscape' ? 0.66 : 0.5), y: cover.h * (shape === 'story' ? 0.36 : 0.4) }

  return (
    <div
      ref={ref}
      className="poster"
      data-shape={shape}
      data-edition={state.edition}
      data-pole={pole.id}
      style={{ ...vars, width: format.width, height: format.height }}
    >
      <header className="maker">
        <span className="maker-mark">
          <D20Icon className="maker-die" />
          <span>
            <b>Heaven of Dice</b>
            <small>
              {partners.length ? 'présentent' : 'présente'}
              {special && ' une édition spéciale'}
            </small>
          </span>
          {partners.map((p) => (
            <span key={p.id} className="maker-partner">
              <span className="maker-x" style={{ color: p.colors.soft }} aria-hidden="true">
                ×
              </span>
              <img
                src={p.logo}
                alt={p.name}
                style={{ background: p.chip ?? p.colors.main, boxShadow: `inset 0 0 0 calc(var(--u) * 0.25) ${p.colors.main}` }}
              />
            </span>
          ))}
        </span>
        <span className="maker-pole">{partners.length ? pole.short : pole.name}</span>
      </header>

      <section className="cover" ref={coverRef}>
        {cover.w > 0 &&
          (special ? (
            <>
              <CrystalBurst pole={pole} w={cover.w} h={cover.h} cx={burstCenter.x} cy={burstCenter.y} />
              <div className="special-motif">
                <PoleMotif pole={pole} w={cover.w} h={cover.h} special />
              </div>
              <Medallion pole={pole} w={cover.w} h={cover.h} cx={burstCenter.x} cy={burstCenter.y} />
            </>
          ) : (
            <PoleMotif pole={pole} w={cover.w} h={cover.h} special={false} />
          ))}
        <img className="phoenix" src={logo} alt="" />
        {special && (
          <div className="sash">
            <span>
              <SparkIcon className="sash-spark" />
              Édition spéciale
              <SparkIcon className="sash-spark" />
            </span>
          </div>
        )}
        {badge && (
          <div className="badge">
            <b>{badge.big}</b>
            <span>{badge.small}</span>
          </div>
        )}
        <div className="title-block">
          <h1 className="title" ref={titleRef}>
            {title}
          </h1>
          {tagline && (
            <p className="tagline" ref={taglineRef}>
              {tagline}
            </p>
          )}
        </div>
      </section>

      <div className="side-face">
        <img src={logo} alt="" />
        <b>{pole.name}</b>
        <small>Collection Heaven of Dice</small>
      </div>

      <ul className="pictos" data-count={pictos.length}>
        {pictos.map(({ key, label, value, Icon }) => (
          <li key={key} className={`picto picto-${key}`}>
            <span className="picto-icon" title={label}>
              <Icon />
            </span>
            <b className="picto-text">{value}</b>
          </li>
        ))}
      </ul>

      <footer className="lip">
        <span>HOD · Association de jeux de société</span>
        <span className="lip-ref">
          Réf. HOD-{pole.code}-{special ? 'SPE' : 'HEB'}
        </span>
      </footer>
      <PartnerRibbon pole={pole.base} partners={partners} />
    </div>
  )
})
