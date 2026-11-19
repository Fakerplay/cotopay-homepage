import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'framer-motion'
import { EASE, VIEW, fadeUp, stagger } from './motion'
import { Icon } from './Icons'

export function Reveal({ children, delay = 0, y = 28, className, style, as = 'div', amount = 0.25 }) {
  const M = motion[as]
  return (
    <M className={className} style={style}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}>
      {children}
    </M>
  )
}

export function Stagger({ children, className, style, s = 0.08, d = 0, amount = 0.25, as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} style={style} variants={stagger(s, d)} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </M>
  )
}
export const Item = ({ children, className, style, as = 'div', variants = fadeUp }) => {
  const M = motion[as]
  return <M className={className} style={style} variants={variants}>{children}</M>
}

export function CountUp({ to, from = 0, duration = 1.6, format = (v) => Math.round(v).toLocaleString('en-IN'), prefix = '', suffix = '', delay = 0, start }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : from)
  const go = start === undefined ? inView : start && inView
  useEffect(() => {
    if (!go || reduce) { if (reduce) setV(to); return }
    const c = animate(from, to, { duration, ease: EASE, delay, onUpdate: setV })
    return () => c.stop()
  }, [go])
  return <span ref={ref}>{prefix}{format(v)}{suffix}</span>
}

/** Renders children in a fixed design-size canvas and scales it to fit the host width (never above `max`). */
export function Canvas({ w, h, children, className, style, max = 1, align = 'center' }) {
  const host = useRef(null)
  const [hw, setHw] = useState(w)
  useLayoutEffect(() => {
    const el = host.current
    const ro = new ResizeObserver(() => setHw(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const s = Math.min(max, hw / w)
  const left = align === 'right' ? hw - w * s : align === 'left' ? 0 : (hw - w * s) / 2
  return (
    <div ref={host} className={'canvas-host ' + (className || '')} style={{ height: h * s, ...style }}>
      <div className="canvas" style={{ width: w, height: h, transform: `translateX(${left}px) scale(${s})` }}>{children}</div>
    </div>
  )
}

export function useWidth(ref) {
  const [wd, setWd] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(() => setWd(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return wd
}

export function Btn({ children, kind = 'dark', sm, href = '#demo', onClick, type, className = '' }) {
  const cls = `btn btn-${kind} ${sm ? 'btn-sm' : ''} ${className}`
  const inner = (<>{children}<span className="chip"><Icon name="arrow" size={15} /></span></>)
  if (type) return <button type={type} className={cls} onClick={onClick}>{inner}</button>
  return <a href={href} className={cls} onClick={onClick}>{inner}</a>
}

export const Tick = ({ size = 18, bg = 'var(--green)' }) => (
  <span className="tick" style={{ width: size, height: size, background: bg }}><Icon name="check" size={size * 0.62} stroke="#fff" width={2.6} /></span>
)
