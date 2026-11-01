import type { ReactNode } from 'react'
import type { Pole } from '../data/poles'
import { HOD } from '../data/poles'

interface MotifProps {
  pole: Pole
  w: number
  h: number
  special: boolean
}

const rng = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const MEEPLE =
  'M5 0C6.2 0 7 .9 7 2c0 .8-.4 1.3-.8 1.6l3.2 1c.8.3.8 1.4 0 1.7l-2 .6L9 9.4c.3.5 0 .6-.4.6H6.2L5 8 3.8 10H1.4c-.4 0-.7-.1-.4-.6l1.6-2.5-2-.6c-.8-.3-.8-1.4 0-1.7l3.2-1C3.4 3.3 3 2.8 3 2 3 .9 3.8 0 5 0Z'
const HEART = 'M5 9C2 6.5 0 5 0 3 0 1.3 1.3 0 2.8 0c1 0 1.8.6 2.2 1.4C5.4.6 6.2 0 7.2 0 8.7 0 10 1.3 10 3c0 2-2 3.5-5 6Z'
const SPADE =
  'M5 0c3 2.5 5 4 5 6 0 1.6-1.2 2.6-2.6 2.6-.8 0-1.5-.4-1.9-1 .1 1 .5 1.8 1.3 2.4H3.2c.8-.6 1.2-1.4 1.3-2.4-.4.6-1.1 1-1.9 1C1.2 8.6 0 7.6 0 6c0-2 2-3.5 5-6Z'
const DIAMOND = 'M5 0l4 5-4 5-4-5Z'
const CLUB = 'M4.4 6 3.4 10h3.2l-1-4Z'

const Svg = ({ w, h, children, opacity = 1 }: { w: number; h: number; children: ReactNode; opacity?: number }) => (
  <svg className="motif" width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ opacity }} aria-hidden="true">
    {children}
  </svg>
)

function Reflexion({ pole, w, h }: MotifProps) {
  const s = Math.min(w, h) * 1.05
  const n = 13
  const step = s / (n - 1)
  const cx = w * 0.42
  const cy = h * 0.2
  const lines = []
  for (let i = 0; i < n; i++) {
    lines.push(<line key={`h${i}`} x1={0} y1={i * step} x2={s} y2={i * step} />)
    lines.push(<line key={`v${i}`} x1={i * step} y1={0} x2={i * step} y2={s} />)
  }
  const stones: [number, number, 0 | 1][] = [
    [3, 6, 1], [3, 7, 0], [4, 7, 1], [4, 6, 0], [5, 7, 0], [4, 8, 1], [5, 8, 1], [6, 7, 0],
    [2, 7, 0], [3, 8, 1], [6, 8, 1], [5, 9, 0], [9, 10, 1], [10, 6, 0], [2, 10, 1], [8, 9, 0],
  ]
  const stars = [3, 6, 9]
  return (
    <Svg w={w} h={h}>
      <g transform={`translate(${cx} ${cy}) rotate(-14) translate(${-s / 2} ${-s / 2})`}>
        <rect x={-step * 0.8} y={-step * 0.8} width={s + step * 1.6} height={s + step * 1.6} fill={pole.light} rx={step * 0.3} />
        <g stroke={pole.line} strokeWidth={Math.max(1.5, step * 0.05)}>{lines}</g>
        {stars.flatMap((x) => stars.map((y) => <circle key={`s${x}${y}`} cx={x * step} cy={y * step} r={step * 0.1} fill={pole.line} />))}
        {stones.map(([x, y, c], i) => (
          <circle
            key={i}
            cx={x * step}
            cy={y * step}
            r={step * 0.46}
            fill={c ? pole.second : '#ffffff'}
            stroke={c ? 'none' : pole.deep}
            strokeWidth={step * 0.05}
          />
        ))}
      </g>
    </Svg>
  )
}

function Tcg({ pole, w, h, special }: MotifProps) {
  const m = Math.min(w, h)
  const cw = m * 0.44
  const ch = cw * 1.4
  const px = w * 0.98
  const py = h * 1.12
  const angles = [-58, -44, -30, -16, -2]
  return (
    <Svg w={w} h={h}>
      {angles.map((a, i) => (
        <g key={i} transform={`rotate(${a} ${px} ${py}) translate(${px - cw / 2} ${py - ch - m * 0.42})`}>
          <rect width={cw} height={ch} rx={cw * 0.06} fill={pole.deep} stroke={special ? HOD.gold : pole.light} strokeWidth={cw * 0.012} />
          <rect x={cw * 0.07} y={cw * 0.07} width={cw * 0.86} height={ch - cw * 0.14} rx={cw * 0.04} fill="none" stroke={pole.line} strokeWidth={cw * 0.018} />
          <ellipse cx={cw / 2} cy={ch / 2} rx={cw * 0.3} ry={ch * 0.3} fill={pole.base} stroke={pole.light} strokeWidth={cw * 0.018} />
          <path
            transform={`translate(${cw / 2 - cw * 0.14} ${ch / 2 - cw * 0.15}) scale(${(cw * 0.28) / 24})`}
            d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3ZM12 2.5 7.3 14.6h9.4ZM3.5 7.3l3.8 7.3M20.5 7.3l-3.8 7.3M7.3 14.6 12 21.5l4.7-6.9"
            fill="none"
            stroke={pole.light}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        </g>
      ))}
    </Svg>
  )
}

function Societe({ pole, w, h, special }: MotifProps) {
  const r = rng(7)
  const m = Math.min(w, h)
  const items = []
  const count = special ? 18 : 15
  for (let i = 0; i < count; i++) {
    const t = i / count
    const x = special ? w * (i % 2 ? 0.02 + r() * 0.2 : 0.78 + r() * 0.2) : w * (0.32 + r() * 0.72)
    const y = special ? h * (t * 0.9 + r() * 0.05) : h * (-0.05 + t * 0.62 + r() * 0.12)
    const size = m * (special ? 0.11 + r() * 0.06 : 0.08 + r() * 0.07)
    const rot = r() * 90 - 45
    const kind = i % 3
    const fill = [pole.deep, pole.light, HOD.deep][i % 3]
    if (kind === 0) {
      items.push(
        <path key={i} d={MEEPLE} fill={fill} transform={`translate(${x} ${y}) rotate(${rot}) scale(${size / 10}) translate(-5 -5)`} />,
      )
    } else {
      const pips = 1 + Math.floor(r() * 6)
      const pos: Record<number, [number, number][]> = {
        1: [[5, 5]],
        2: [[3, 3], [7, 7]],
        3: [[3, 3], [5, 5], [7, 7]],
        4: [[3, 3], [7, 3], [3, 7], [7, 7]],
        5: [[3, 3], [7, 3], [5, 5], [3, 7], [7, 7]],
        6: [[3, 3], [7, 3], [3, 5], [7, 5], [3, 7], [7, 7]],
      }
      items.push(
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${size / 10}) translate(-5 -5)`}>
          <rect width={10} height={10} rx={2} fill={fill} />
          {pos[pips].map(([px, py], j) => (
            <circle key={j} cx={px} cy={py} r={0.95} fill={fill === pole.light ? pole.deep : pole.base} />
          ))}
        </g>,
      )
    }
  }
  return <Svg w={w} h={h}>{items}</Svg>
}

function Jdr({ pole, w, h }: MotifProps) {
  const m = Math.min(w, h)
  const R = m * 0.075
  const hw = R * 1.5
  const hh = Math.sqrt(3) * R
  const cols = Math.ceil(w / hw) + 2
  const rows = Math.ceil(h / hh) + 2
  const r = rng(11)
  const hex = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k
      return `${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`
    }).join(' ')
  const cells = []
  const path: [number, number][] = []
  for (let c = 0; c < cols; c++) {
    for (let rr = 0; rr < rows; rr++) {
      const cx = c * hw
      const cy = rr * hh + (c % 2 ? hh / 2 : 0)
      const explored = cx > w * 0.42 && cy < h * 0.62 && r() > 0.45
      cells.push(
        <polygon key={`${c}-${rr}`} points={hex(cx, cy)} fill={explored ? pole.second : 'none'} fillOpacity={explored ? 0.55 : 0} stroke={pole.line} strokeWidth={R * 0.06} />,
      )
    }
  }
  for (let c = Math.floor(cols * 0.45); c < cols; c++) {
    const rr = Math.max(0, Math.round(rows * 0.5 - (c - cols * 0.45) * 0.55))
    path.push([c * hw, rr * hh + (c % 2 ? hh / 2 : 0)])
  }
  const d20 = m * 0.34
  return (
    <Svg w={w} h={h}>
      {cells}
      <polyline points={path.map((p) => p.join(',')).join(' ')} fill="none" stroke={pole.light} strokeWidth={R * 0.14} strokeDasharray={`${R * 0.3} ${R * 0.25}`} strokeLinecap="round" />
      {path.length > 0 && <circle cx={path[path.length - 1][0]} cy={path[path.length - 1][1]} r={R * 0.35} fill={pole.light} />}
      <path
        transform={`translate(${w - d20 * 0.95} ${h * 0.08}) scale(${d20 / 24})`}
        d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3ZM12 2.5 7.3 14.6h9.4ZM3.5 7.3l3.8 7.3M20.5 7.3l-3.8 7.3M7.3 14.6 12 21.5l4.7-6.9M3.5 16.7l3.8-2.1M20.5 16.7l-3.8-2.1"
        fill={pole.deep}
        fillOpacity={0.35}
        stroke={pole.light}
        strokeWidth={0.7}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function Wargames({ pole, w, h }: MotifProps) {
  const m = Math.min(w, h)
  const r = rng(23)
  const centers: [number, number, number][] = [
    [w * 0.82, h * 0.2, 1],
    [w * 0.35, h * 0.05, 0.7],
    [w * 1.02, h * 0.68, 0.9],
  ]
  const rings = centers.flatMap(([cx, cy, k], ci) =>
    Array.from({ length: 7 }, (_, i) => {
      const base = m * 0.06 * (i + 1) * k
      const phase = r() * Math.PI * 2
      const amp = 0.08 + r() * 0.06
      const pts = Array.from({ length: 48 }, (_, j) => {
        const a = (j / 48) * Math.PI * 2
        const rad = base * (1 + amp * Math.sin(a * 3 + phase) + amp * 0.5 * Math.cos(a * 5 + phase))
        return `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a) * 0.82}`
      })
      return <polygon key={`${ci}-${i}`} points={pts.join(' ')} fill="none" stroke={i === 3 ? pole.light : pole.line} strokeWidth={m * (i === 3 ? 0.004 : 0.0028)} />
    }),
  )
  const len = m * 1.1
  const tw = m * 0.07
  const ticks = Array.from({ length: 13 }, (_, i) => (
    <g key={i}>
      <line x1={(i * len) / 12} y1={0} x2={(i * len) / 12} y2={i % 2 ? tw * 0.3 : tw * 0.5} stroke={pole.deep} strokeWidth={m * 0.003} />
      {i % 2 === 0 && (
        <text x={(i * len) / 12 + m * 0.006} y={tw * 0.86} fontSize={tw * 0.32} fill={pole.deep} fontFamily="Hanken Grotesk Variable" fontWeight={700}>
          {i}
        </text>
      )}
    </g>
  ))
  const bases: [number, number][] = [
    [w * 0.62, h * 0.32], [w * 0.69, h * 0.36], [w * 0.76, h * 0.31], [w * 0.66, h * 0.43],
  ]
  return (
    <Svg w={w} h={h}>
      {rings}
      <g transform={`translate(${w * 0.36} ${h * 0.58}) rotate(-24)`}>
        <rect width={len} height={tw} fill={HOD.gold} rx={tw * 0.08} />
        {ticks}
      </g>
      {bases.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={m * 0.032} fill={pole.deep} stroke={pole.light} strokeWidth={m * 0.004} />
          <circle cx={x} cy={y} r={m * 0.012} fill={pole.light} />
        </g>
      ))}
    </Svg>
  )
}

function Poker({ pole, w, h }: MotifProps) {
  const m = Math.min(w, h)
  const suits = [
    { d: SPADE, red: false },
    { d: HEART, red: true },
    { d: CLUB, red: false, club: true },
    { d: DIAMOND, red: true },
  ]
  const s = m * 0.2
  const grid = []
  let k = 0
  for (let row = -1; row < Math.ceil(h / (s * 1.6)) + 1; row++) {
    for (let col = -1; col < Math.ceil(w / (s * 1.6)) + 1; col++) {
      const suit = suits[(((k++ + row) % 4) + 4) % 4]
      const x = col * s * 1.6 + (row % 2 ? s * 0.8 : 0)
      const y = row * s * 1.6
      const fill = suit.red ? pole.second : pole.deep
      const op = suit.red ? 0.5 : 0.75
      grid.push(
        <g key={`${row}-${col}`} transform={`translate(${x} ${y}) scale(${s / 10})`} opacity={op}>
          {suit.club ? (
            <g fill={fill}>
              <circle cx={5} cy={2.6} r={2.3} />
              <circle cx={2.6} cy={6} r={2.3} />
              <circle cx={7.4} cy={6} r={2.3} />
              <path d={CLUB} />
            </g>
          ) : (
            <path d={suit.d} fill={fill} />
          )}
        </g>,
      )
    }
  }
  const chip = (x: number, y: number, n: number, color: string) => (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x} ${y - i * m * 0.022})`}>
          <ellipse rx={m * 0.09} ry={m * 0.032} cy={m * 0.012} fill={pole.deep} />
          <ellipse rx={m * 0.09} ry={m * 0.032} fill={color} />
          <ellipse rx={m * 0.075} ry={m * 0.026} fill="none" stroke="#ffffff" strokeWidth={m * 0.008} strokeDasharray={`${m * 0.02} ${m * 0.02}`} />
        </g>
      ))}
    </g>
  )
  return (
    <Svg w={w} h={h}>
      <g opacity={0.55}>{grid}</g>
      {chip(w * 0.8, h * 0.42, 7, HOD.deep)}
      {chip(w * 0.95, h * 0.5, 5, pole.second)}
      {chip(w * 0.66, h * 0.52, 4, '#f4f1ea')}
    </Svg>
  )
}

function Mensonges({ pole, w, h }: MotifProps) {
  const m = Math.min(w, h)
  const r = rng(31)
  const moonR = m * 0.3
  const mx = w * 0.82
  const my = h * 0.2
  const stars = Array.from({ length: 22 }, (_, i) => {
    const x = r() * w
    const y = r() * h * 0.7
    const s = m * (0.008 + r() * 0.02)
    return (
      <path
        key={i}
        d={`M${x} ${y - s}L${x + s * 0.25} ${y - s * 0.25}L${x + s} ${y}L${x + s * 0.25} ${y + s * 0.25}L${x} ${y + s}L${x - s * 0.25} ${y + s * 0.25}L${x - s} ${y}L${x - s * 0.25} ${y - s * 0.25}Z`}
        fill={i % 4 === 0 ? HOD.orchid : pole.inkSoft}
        opacity={0.35 + r() * 0.5}
      />
    )
  })
  const eyes: [number, number, number, boolean][] = [
    [w * 0.5, h * 0.36, 1, true],
    [w * 0.72, h * 0.5, 0.75, false],
    [w * 0.9, h * 0.62, 0.9, true],
    [w * 0.36, h * 0.2, 0.6, false],
    [w * 0.62, h * 0.12, 0.55, true],
  ]
  return (
    <Svg w={w} h={h}>
      <defs>
        <mask id="moon-cut">
          <rect width={w} height={h} fill="#fff" />
          <circle cx={mx - moonR * 0.42} cy={my - moonR * 0.18} r={moonR * 0.92} fill="#000" />
        </mask>
      </defs>
      {stars}
      <circle cx={mx} cy={my} r={moonR} fill={pole.inkSoft} mask="url(#moon-cut)" opacity={0.9} />
      {eyes.map(([x, y, k, open], i) => {
        const ew = m * 0.16 * k
        return (
          <g key={i} transform={`translate(${x - ew / 2} ${y - ew / 4})`}>
            {open ? (
              <>
                <path d={`M0 ${ew / 4}Q${ew / 2} ${-ew / 8} ${ew} ${ew / 4}Q${ew / 2} ${ew * 0.62} 0 ${ew / 4}Z`} fill={pole.light} />
                <circle cx={ew / 2} cy={ew / 4} r={ew * 0.15} fill={HOD.electric} />
                <circle cx={ew / 2} cy={ew / 4} r={ew * 0.065} fill={pole.deep} />
              </>
            ) : (
              <path d={`M0 ${ew / 4}Q${ew / 2} ${ew * 0.58} ${ew} ${ew / 4}`} fill="none" stroke={pole.light} strokeWidth={ew * 0.05} strokeLinecap="round" />
            )}
          </g>
        )
      })}
    </Svg>
  )
}

const MOTIFS = {
  reflexion: Reflexion,
  tcg: Tcg,
  societe: Societe,
  jdr: Jdr,
  wargames: Wargames,
  poker: Poker,
  mensonges: Mensonges,
}

export function PoleMotif(props: MotifProps) {
  const M = MOTIFS[props.pole.id]
  return <M {...props} />
}

export function Medallion({ pole, w, h, cx, cy }: { pole: Pole; w: number; h: number; cx: number; cy: number }) {
  const m = Math.min(w, h)
  return (
    <svg className="motif" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <circle cx={cx} cy={cy} r={m * 0.4} fill={pole.deep} />
      <circle cx={cx} cy={cy} r={m * 0.4} fill="none" stroke={HOD.gold} strokeWidth={m * 0.012} />
      <circle cx={cx} cy={cy} r={m * 0.37} fill="none" stroke={pole.light} strokeWidth={m * 0.005} />
    </svg>
  )
}

export function CrystalBurst({ pole, w, h, cx, cy }: { pole: Pole; w: number; h: number; cx: number; cy: number }) {
  const r = rng(pole.id.length * 97 + 5)
  const R = Math.hypot(w, h)
  const colors = [pole.base, HOD.electric, pole.light, HOD.royal, pole.deep, HOD.orchid]
  const rays = []
  let a = -Math.PI
  let i = 0
  while (a < Math.PI) {
    const span = 0.14 + r() * 0.22
    const len = R * (0.55 + r() * 0.5)
    const mid = a + span * (0.3 + r() * 0.4)
    const p1 = [cx + Math.cos(a) * len, cy + Math.sin(a) * len]
    const p2 = [cx + Math.cos(mid) * len * (0.8 + r() * 0.4), cy + Math.sin(mid) * len * (0.8 + r() * 0.4)]
    const p3 = [cx + Math.cos(a + span) * len, cy + Math.sin(a + span) * len]
    rays.push(<polygon key={i} points={`${cx},${cy} ${p1.join(',')} ${p2.join(',')} ${p3.join(',')}`} fill={colors[i % colors.length]} opacity={0.92} />)
    a += span
    i++
  }
  const m = Math.min(w, h)
  const shards = Array.from({ length: 46 }, (_, k) => {
    const ang = r() * Math.PI * 2
    const dist = m * (0.28 + r() * 0.75)
    const x = cx + Math.cos(ang) * dist
    const y = cy + Math.sin(ang) * dist
    const s = m * (0.012 + r() * 0.035)
    const rot = r() * 360
    const fill = [HOD.orchid, '#ffffff', pole.light, HOD.electric][k % 4]
    return (
      <polygon
        key={k}
        points={`0,${-s} ${s * 0.7},${-s * 0.1} ${s * 0.2},${s * 0.9} ${-s * 0.6},${s * 0.3}`}
        transform={`translate(${x} ${y}) rotate(${rot})`}
        fill={fill}
        opacity={0.55 + r() * 0.45}
      />
    )
  })
  return (
    <svg className="motif" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <rect width={w} height={h} fill={HOD.deep} />
      {rays}
      {shards}
    </svg>
  )
}
