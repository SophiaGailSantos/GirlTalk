/* Shared inline SVG icon set — stroke icons, sized via the `size` prop. */

function Svg({ size = 20, strokeWidth = 1.7, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function IconDrop({ size }) {
  return (
    <Svg size={size}>
      <path d="M12 3.2s5.6 5.8 5.6 9.4a5.6 5.6 0 1 1-11.2 0C6.4 9 12 3.2 12 3.2z" />
      <path d="M9.5 13.6a2.7 2.7 0 0 0 2 3.2" />
    </Svg>
  )
}

export function IconPill({ size }) {
  return (
    <Svg size={size}>
      <g transform="rotate(-45 12 12)">
        <rect x="2.8" y="8.3" width="18.4" height="7.4" rx="3.7" />
        <path d="M12 8.5v7" />
      </g>
    </Svg>
  )
}

export function IconBell({ size }) {
  return (
    <Svg size={size}>
      <path d="M18 8.8a6 6 0 1 0-12 0c0 6.1-2.4 7.4-2.4 7.4h16.8S18 14.9 18 8.8z" />
      <path d="M10.2 19.4a2.1 2.1 0 0 0 3.6 0" />
    </Svg>
  )
}

export function IconBook({ size }) {
  return (
    <Svg size={size}>
      <path d="M12 7.4S10 5 6.4 5H2.6v13.4h3.8c3.6 0 5.6 2.2 5.6 2.2s2-2.2 5.6-2.2h3.8V5h-3.8C14 5 12 7.4 12 7.4z" />
      <path d="M12 7.4v13.2" />
    </Svg>
  )
}

export function IconBulb({ size }) {
  return (
    <Svg size={size}>
      <path d="M9.2 18.4h5.6M10.4 21h3.2" />
      <path d="M12 3.2a5.8 5.8 0 0 0-3.4 10.5c.6.5 1 1.2 1 1.9v.6h4.8v-.6c0-.7.4-1.4 1-1.9A5.8 5.8 0 0 0 12 3.2z" />
    </Svg>
  )
}

export function IconCompass({ size }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z" />
    </Svg>
  )
}

export function IconSearch({ size }) {
  return (
    <Svg size={size}>
      <circle cx="11" cy="11" r="6.8" />
      <path d="M16 16l4.6 4.6" />
    </Svg>
  )
}

export function IconArrow({ size }) {
  return (
    <Svg size={size}>
      <path d="M4.5 12h14M13 6.2l5.8 5.8-5.8 5.8" />
    </Svg>
  )
}

export function IconCheck({ size }) {
  return (
    <Svg size={size} strokeWidth={2.1}>
      <path d="M4.6 12.6l4.8 4.8L19.4 7" />
    </Svg>
  )
}

export function IconCalendar({ size }) {
  return (
    <Svg size={size}>
      <rect x="3.2" y="5" width="17.6" height="15.8" rx="3" />
      <path d="M8 3v4M16 3v4M3.2 10.2h17.6" />
      <path d="M7.8 14h.01M12 14h.01M16.2 14h.01M7.8 17.6h.01M12 17.6h.01" />
    </Svg>
  )
}

export function IconClock({ size }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 7.2V12l3.2 2" />
    </Svg>
  )
}

export function IconLock({ size }) {
  return (
    <Svg size={size}>
      <rect x="4.6" y="10.4" width="14.8" height="10.2" rx="2.6" />
      <path d="M8.3 10.4V8a3.7 3.7 0 0 1 7.4 0v2.4" />
    </Svg>
  )
}

export function IconShield({ size }) {
  return (
    <Svg size={size}>
      <path d="M12 3l7.4 2.9v5.4c0 4.6-3.1 8-7.4 9.7-4.3-1.7-7.4-5.1-7.4-9.7V5.9z" />
      <path d="M9.3 12.2l2 2 3.5-3.8" />
    </Svg>
  )
}

export function IconMoon({ size }) {
  return (
    <Svg size={size}>
      <path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z" />
    </Svg>
  )
}

export function IconLeaf({ size }) {
  return (
    <Svg size={size}>
      <path d="M4.6 19.4C4.6 11.5 10.5 5.6 19.4 4.6c1 8.9-4.5 14.8-11.9 14.8H4.6z" />
      <path d="M4.6 19.4c3.6-3.9 7-6.2 11-7.8" />
    </Svg>
  )
}

export function IconDumbbell({ size }) {
  return (
    <Svg size={size}>
      <path d="M6.6 8.4v7.2M3.6 10v4M17.4 8.4v7.2M20.4 10v4M6.6 12h10.8" />
    </Svg>
  )
}

export function IconSparkle({ size }) {
  return (
    <Svg size={size}>
      <path d="M11.4 3.6l1.8 4.8 4.8 1.8-4.8 1.8-1.8 4.8-1.8-4.8L4.8 10.2l4.8-1.8z" />
      <path d="M18.4 16.2l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </Svg>
  )
}

export function IconPulse({ size }) {
  return (
    <Svg size={size}>
      <path d="M3 12.6h4L9.3 6l4 12 2.2-5.4H21" />
    </Svg>
  )
}

export function IconOrbit({ size }) {
  return (
    <Svg size={size}>
      <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-30 12 12)" />
      <circle cx="12" cy="12" r="2.4" />
    </Svg>
  )
}

export function IconClose({ size }) {
  return (
    <Svg size={size} strokeWidth={2}>
      <path d="M6.4 6.4l11.2 11.2M17.6 6.4L6.4 17.6" />
    </Svg>
  )
}

export function IconChevronLeft({ size }) {
  return (
    <Svg size={size} strokeWidth={2}>
      <path d="M14.6 6.4L9 12l5.6 5.6" />
    </Svg>
  )
}

export function IconChevronRight({ size }) {
  return (
    <Svg size={size} strokeWidth={2}>
      <path d="M9.4 6.4L15 12l-5.6 5.6" />
    </Svg>
  )
}
