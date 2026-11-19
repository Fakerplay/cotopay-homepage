import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { EASE } from '../motion'
import { Icon } from '../Icons'
import { Reveal, Tick } from '../ui'

const MODES = {
  Category: { desc: 'Any fuel station in India', pins: [1, 1, 1, 1], pill: 'Locked to: Fuel · Category', note: 'Works at every pump here — and at any fuel station in India. Nowhere else.' },
  Brand: { desc: 'Only one fuel company’s stations', pins: [1, 1, 0, 0], pill: 'Locked to: Fuel · One brand', note: 'Shows only at your chosen fuel company’s pumps. Other brands can’t see it.' },
  Outlet: { desc: 'Only the depot pump you choose', pins: [1, 0, 0, 0], pill: 'Locked to: Depot pump · Sec 62', note: 'Works at a single outlet — the depot pump your fleet uses every morning.' },
}
const PINS = [[34.2, 40.9], [62, 40.9], [34.2, 67.2], [62, 67.2]]

export default function Locks() {
  const [mode, setMode] = useState('Category')
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  useEffect(() => {
    if (!auto || !inView) return
    const keys = Object.keys(MODES)
    const t = setInterval(() => setMode((m) => keys[(keys.indexOf(m) + 1) % keys.length]), 3200)
    return () => clearInterval(t)
  }, [auto, inView])
  const pick = (k) => { setAuto(false); setMode(k) }
  const m = MODES[mode]
  return (
    <section className="section" id="locks" ref={ref}>
      <div className="wrap locks">
        <div>
          <Reveal><span className="eyebrow">Spend locks</span></Reveal>
          <Reveal delay={.08}><h2 className="h2">Lock every rupee<br />to its purpose.</h2></Reveal>
          <Reveal delay={.16}><p className="lead" style={{ maxWidth: 500 }}>A voucher only appears at merchants you allow. Lock it as wide as a category or as narrow as a single outlet — decided per voucher, per employee band.</p></Reveal>
          <Reveal delay={.24}>
            <div className="seg" role="tablist">
              {Object.keys(MODES).map((k) => (
                <button key={k} role="tab" aria-selected={mode === k} className={mode === k ? 'on' : ''} onClick={() => pick(k)}>
                  {mode === k && <motion.span layoutId="seg-hl" className="hl" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {k}
                </button>
              ))}
            </div>
            <ul className="levels">
              {Object.entries(MODES).map(([k, v]) => (
                <li key={k} className={mode === k ? 'on' : ''} onClick={() => pick(k)}><span className="d" /><b>{k}</b>— {v.desc}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={.1} y={48}>
          <div className="lock-visual">
            <motion.img src="./img/aerial.webp" alt="Aerial view of a highway fuel station with four pump islands" initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE }} />
            <div className="tint" />
            {PINS.map(([x, y], i) => {
              const ok = m.pins[i] === 1
              return (
                <div key={i} className="pin" style={{ left: x + '%', top: y + '%' }}>
                  <motion.div className="mk" animate={{ background: ok ? '#1E7D45' : '#8A948F', scale: ok ? 1 : .8 }} transition={{ duration: .4 }} />
                  {ok && <span className="ripple-pulse" />}
                  <AnimatePresence mode="popLayout">
                    <motion.span key={ok ? 'ok' : 'no'} className="lb" initial={{ opacity: 0, y: 8, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .9 }} transition={{ duration: .35, ease: EASE, delay: i * .05 }}
                      style={{ color: ok ? 'var(--ink)' : '#4F5954' }}>
                      <i style={{ background: ok ? 'var(--green)' : '#B6BEBA' }} />{ok ? 'Eligible' : 'Hidden'}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )
            })}
            <div style={{ position: 'absolute', left: 24, top: 24 }}>
              <AnimatePresence mode="wait">
                <motion.span key={m.pill} className="status-pill" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .35, ease: EASE }}>
                  <Tick size={22} />{m.pill}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="lock-note">
              <div className="glass-light"><div className="core">
                <div className="cp-tile">cp</div>
                <div style={{ flex: 1, minHeight: 58 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Fuel voucher · ₹2,000</b><span style={{ fontSize: 12, color: '#4F5954' }}>7 days</span></div>
                  <AnimatePresence mode="wait">
                    <motion.p key={m.note} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .3 }}>{m.note}</motion.p>
                  </AnimatePresence>
                </div>
              </div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
