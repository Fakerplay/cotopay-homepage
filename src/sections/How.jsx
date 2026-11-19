import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../motion'
import { Icon } from '../Icons'
import { CountUp, Reveal } from '../ui'

const STEPS = [
  ['01', 'Issue', 'Pick drivers, amount and a lock.'],
  ['02', 'Receive', 'Lands in the UPI app they already use.'],
  ['03', 'Pay', 'Scan any QR. Only eligible vouchers show.'],
  ['04', 'Reconcile', 'Every rupee matched, automatically.'],
]
const VIEW = { once: true, amount: 0.35 }
// each card's visual starts after the rail reaches its node
const at = (i, d = 0) => 0.35 + i * 0.32 + d
const up = (delay, y = 14) => ({ initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: VIEW, transition: { duration: .7, ease: EASE, delay } })
const pop = (delay) => ({ initial: { opacity: 0, scale: .6 }, whileInView: { opacity: 1, scale: 1 }, viewport: VIEW, transition: { type: 'spring', stiffness: 380, damping: 18, delay } })

function Ok({ size = 18, bg = '#1E7D45', fg = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" style={{ flex: 'none', display: 'block' }}>
      <circle cx="10" cy="10" r="10" fill={bg} /><path d="M6 10.3l2.6 2.6L14.2 7.3" stroke={fg} strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Issue({ i }) {
  const av = [['RK', '#1E6B45'], ['SP', '#1A5E3C'], ['IS', '#1E7D45'], ['AD', '#245A3E']]
  return (
    <div className="hx-comp hx-issue">
      <div className="hx-avs">
        <div className="hx-stack">
          {av.map(([t, c], k) => <motion.span key={t} className="hx-av" style={{ background: c }} {...pop(at(i, k * .06))}>{t}</motion.span>)}
          <motion.span className="hx-av more" {...pop(at(i, .26))}>+10</motion.span>
        </div>
        <motion.span className="hx-soft" {...up(at(i, .3), 6)}>14 drivers</motion.span>
      </div>
      <div className="hx-amt">₹<CountUp to={2000} duration={1.2} delay={at(i, .1)} /></div>
      <div className="hx-soft">each · valid 7 days</div>
      <motion.span className="hx-lock" {...up(at(i, .45), 8)}><Icon name="lock" size={14} stroke="#fff" width={1.7} />Fuel stations only</motion.span>
      <motion.span className="hx-issue-btn" {...up(at(i, .6), 10)}>Issue ₹28,000<span className="go"><Icon name="right" size={15} stroke="#05140C" width={1.8} /></span></motion.span>
    </div>
  )
}

function Receive({ i }) {
  return (
    <div className="hx-comp hx-receive">
      <motion.div className="hx-phone" {...up(at(i), 40)}>
        <div className="hx-screen">
          <span className="hx-notch" />
          <div className="hx-ph-t">UPI Vouchers</div>
          <motion.div className="hx-voucher" initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={{ type: 'spring', stiffness: 220, damping: 20, delay: at(i, .55) }}>
            <span className="mono">Fuel · e-RUPI</span>
            <b>₹2,000</b>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="hx-notif" initial={{ opacity: 0, y: -26 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ type: 'spring', stiffness: 260, damping: 22, delay: at(i, .35) }}>
        <span className="cp-tile">cp</span>
        <span><b>₹2,000 fuel voucher</b><small>Received · now</small></span>
      </motion.div>
    </div>
  )
}

function QR() {
  // deterministic 21×21 pattern with the three finder squares
  const cells = useMemo(() => {
    const out = []; let s = 7
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280
    const finder = (x, y) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)
    const centre = (x, y) => x >= 8 && x <= 12 && y >= 8 && y <= 12
    for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) if (!finder(x, y) && !centre(x, y) && rnd() > .52) out.push([x, y])
    return out
  }, [])
  const F = ({ x, y }) => (<g transform={`translate(${x} ${y})`}><rect width="7" height="7" rx="1.6" fill="#0B1410" /><rect x="1" y="1" width="5" height="5" rx="1.1" fill="#fff" /><rect x="2" y="2" width="3" height="3" rx=".7" fill="#0B1410" /></g>)
  return (
    <svg viewBox="0 0 21 21" width="132" height="132" aria-hidden="true" shapeRendering="geometricPrecision">
      {cells.map(([x, y]) => <rect key={x + '-' + y} x={x + .08} y={y + .08} width=".84" height=".84" rx=".2" fill="#0B1410" />)}
      <F x={0} y={0} /><F x={14} y={0} /><F x={0} y={14} />
      <rect x="8.4" y="8.4" width="4.2" height="4.2" rx="1" fill="#1E7D45" />
    </svg>
  )
}

function Pay({ i }) {
  return (
    <div className="hx-comp hx-pay">
      <motion.div className="hx-qr" {...up(at(i), 20)}>
        <QR />
        <motion.span className="hx-scan" initial={{ top: '14%' }} animate={{ top: ['14%', '84%', '14%'] }} transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }} />
      </motion.div>
      <motion.div className="hx-paid" {...pop(at(i, .7))}>
        <Ok size={26} />
        <span><b>Paid ₹1,850</b><small>NH-48 fuel pump</small></span>
      </motion.div>
    </div>
  )
}

function Reconcile({ i }) {
  const rows = [['RK', 'Ramesh K.', '₹1,850'], ['SP', 'Suresh P.', '₹1,420'], ['IS', 'Imran S.', '₹2,000']]
  return (
    <div className="hx-comp hx-recon">
      {rows.map(([a, n, v], k) => (
        <motion.div key={a} className={'hx-row' + (k === 0 ? ' on' : '')} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={VIEW} transition={{ duration: .6, ease: EASE, delay: at(i, k * .14) }}>
          <span className="hx-ini">{a}</span><b>{n}</b><span className="v">{v}</span>
          <motion.span {...pop(at(i, .3 + k * .14))} style={{ display: 'flex' }}><Ok size={18} bg="#7EE2A2" fg="#05140C" /></motion.span>
        </motion.div>
      ))}
      <motion.div className="hx-total" {...up(at(i, .6), 10)}>
        <span className="mono">Auto-reconciled</span>
        <b>₹<CountUp to={5270} duration={1.2} delay={at(i, .6)} /></b>
      </motion.div>
    </div>
  )
}

const VIS = [Issue, Receive, Pay, Reconcile]

export default function How() {
  return (
    <section className="hx" id="how">
      <span className="hx-orb a" /><span className="hx-orb b" /><span className="hx-orb c" />
      <div className="wrap hx-in">
        <div className="hx-head">
          <Reveal><span className="hx-eyebrow mono">How it works</span></Reveal>
          <Reveal delay={.08}><h2 className="hx-h2">From issued to reconciled, <b>in four steps.</b></h2></Reveal>
        </div>

        <div className="hx-rail" aria-hidden="true">
          <motion.span className="hx-path" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VIEW} transition={{ duration: 1.3, ease: EASE, delay: .2 }} />
          {STEPS.map(([n], i) => (
            <span className="hx-node-wrap" key={n}>
              <motion.span className="hx-node" initial={{ opacity: .35, scale: .85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: at(i, -.12) }}>{n}</motion.span>
              <motion.span className="hx-drop" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={VIEW} transition={{ duration: .4, ease: EASE, delay: at(i, -.05) }} />
            </span>
          ))}
        </div>

        <div className="hx-cards">
          {STEPS.map(([n, t, d], i) => {
            const V = VIS[i]
            return (
              <motion.article className="hx-card" key={n} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, ease: EASE, delay: .1 + i * .1 }}>
                <div className="hx-vis"><V i={i} /></div>
                <div className="hx-txt">
                  <span className="hx-n mono">{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
