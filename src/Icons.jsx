const P = {
  fuel: 'M4 20V5a1 1 0 011-1h7a1 1 0 011 1v15M3 20h11M6 8h5M13 9h2a1 1 0 011 1v6a1.5 1.5 0 003 0V8l-3-3',
  toll: 'M6 20L10 4M18 20L14 4M12 6v2M12 11v2M12 16v2',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.2L4 16.8 7.2 20l5.3-5.3a4 4 0 005.2-5.4l-2.4 2.4-2.6-.5-.5-2.6 2.5-2.3z',
  park: 'M7 20V4h6a4 4 0 010 8H7',
  check: 'M5 12.5l4.5 4.5L19 7',
  meals: 'M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M16 3c-2 2-2 6 0 8v10',
  plane: 'M21 4L3 11l7 3 3 7 8-17zM10 14l5-5',
  bed: 'M3 18V8M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5',
  phone: 'M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z',
  store: 'M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6',
  plus: 'M12 5v14M5 12h14',
  arrow: 'M7 17L17 7M8 7h9v9',
  right: 'M5 12h14M13 6l6 6-6 6',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3',
  shield: 'M12 3l8 3.5v5.5c0 4.8-3.4 8.6-8 10-4.6-1.4-8-5.2-8-10V6.5L12 3zM8.5 12l2.5 2.5 4.5-5',
  bank: 'M4 10h16M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M3 9l9-5 9 5',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21c1-4 3.8-6 7-6s6 2 7 6',
  doc: 'M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM9 8h6M9 12h6M9 16h4',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-3.5-3.5',
  x: 'M7 7l10 10M17 7L7 17',
  play: 'M8 5v14l11-7z',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
}
export function Icon({ name, size = 20, stroke = 'currentColor', width = 1.6, style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className} aria-hidden="true">
      <path d={P[name]} stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export function Wordmark({ dark, size = 26 }) {
  return (
    <span className="wordmark" style={{ fontSize: size, color: dark ? '#fff' : 'var(--ink)' }}>
      coto<span style={{ color: dark ? '#7EE2A2' : 'var(--green)' }}>pay</span>
    </span>
  )
}
