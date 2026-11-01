import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string }

const Base = ({ size = 24, children, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h2M14 14h2M8 17.2h2" />
  </Base>
)

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
)

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Base>
)

export const TicketIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 8.5V6.5a1.5 1.5 0 0 1 1.5-1.5h14a1.5 1.5 0 0 1 1.5 1.5v2a3.5 3.5 0 0 0 0 7v2a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-2a3.5 3.5 0 0 0 0-7Z" />
    <path d="M14.5 5v2.2M14.5 10.9v2.2M14.5 16.8V19" />
  </Base>
)

export const D20Icon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3Z" />
    <path d="M12 2.5 7.3 14.6h9.4ZM3.5 7.3l3.8 7.3M20.5 7.3l-3.8 7.3M7.3 14.6 12 21.5l4.7-6.9M3.5 16.7l3.8-2.1M20.5 16.7l-3.8-2.1" />
  </Base>
)

export const DownloadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
  </Base>
)

export const SparkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 13.9 10l6.6 2-6.6 2L12 20.5 10.1 14l-6.6-2 6.6-2Z" />
  </Base>
)

export const RepeatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 11V9.5a3 3 0 0 1 3-3h11M15.5 3.5l3 3-3 3M19.5 13v1.5a3 3 0 0 1-3 3h-11M8.5 20.5l-3-3 3-3" />
  </Base>
)

export const ResetIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v4h4" />
  </Base>
)

export const BoxIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4Z" />
    <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" />
  </Base>
)

export const TypeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6" />
  </Base>
)
