import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { EASE } from '../motion'
import { Icon, Wordmark } from '../Icons'
import { Btn, CountUp, Tick } from '../ui'

export function Announce() {
  return (
    <div className="announce">
      <a href="#how"><span>As seen on Shark Tank India — watch how UPI vouchers work in 60 seconds</span><Icon name="right" size={15} /></a>
    </div>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 48)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['Fleet', '#use-cases'], ['Corporate', '#use-cases'], ['Benefits', '#use-cases'], ['Pricing', '#demo'], ['Resources', '#security']]
  return (
    <header className={'nav ' + (scrolled || open ? 'scrolled' : '')}>
      <div className="wrap nav-inner">
        <a href="#top" aria-label="CotoPay home"><Wordmark /></a>
        <nav className="nav-links">{links.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</nav>
        <div className="nav-right">
          <a className="login" href="#demo">Log in</a>
          <Btn sm>Book a demo</Btn>
          <button className={'menu-btn ' + (open ? 'open' : '')} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="menu-panel" initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} transition={{ duration: .4, ease: EASE }}>
            {[...links, ['Log in', '#demo']].map(([l, h], i) => (
              <motion.a key={l} href={h} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: EASE, delay: .05 + i * .04 }}>{l}</motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

const lines = [['Company', 'money,'], ['spent', 'on', 'UPI.']]

export function Hero() {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 })
  const lx = useTransform(sx, (v) => v * -14), ly = useTransform(sy, (v) => v * -10)
  const rx = useTransform(sx, (v) => v * 18), ry = useTransform(sy, (v) => v * 12)
  const px = useTransform(sx, (v) => v * 6)
  const { scrollY } = useScroll()
  const [wide, setWide] = useState(true)
  useEffect(() => { const m = window.matchMedia('(min-width: 901px)'); const f = () => setWide(m.matches); f(); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  const phoneY = useTransform(scrollY, [0, 700], wide ? [0, -60] : [0, 0])
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  let w = 0
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <motion.span className="pill-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE, delay: .1 }}>
          <span className="eb-long">Built on NPCI e-RUPI · Issued with ICICI Bank</span><span className="eb-short">NPCI e-RUPI · ICICI Bank</span>
        </motion.span>
        <h1 className="h1">
          {lines.map((ln, i) => (
            <span className="line" key={i}>
              {ln.map((word) => {
                const d = 0.2 + (w++) * 0.07
                return (<motion.span className="word" key={word} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: d }}>{word}&nbsp;</motion.span>)
              })}
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE, delay: .6 }}>
          Issue purpose-locked UPI vouchers to any phone number in seconds. Lock them to fuel, meals or travel. Unspent money never leaves your account.
        </motion.p>
        <motion.div className="ticks" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: .08, delayChildren: .75 } } }}>
          {['No new card or app', 'No employee KYC', 'Works at 6.5 cr+ UPI merchants'].map((t) => (
            <motion.span key={t} variants={{ h: { opacity: 0, y: 8 }, s: { opacity: 1, y: 0, transition: { duration: .6, ease: EASE } } }}><Tick />{t}</motion.span>
          ))}
        </motion.div>
        <motion.div className="ctas" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: EASE, delay: .95 }}>
          <Btn>Book a demo</Btn>
          <Btn kind="light" href="#how">See how it works</Btn>
        </motion.div>

        <motion.div className="shell" initial={{ opacity: 0, y: 60, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 1.0 }}>
          <div className="stage" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
            <motion.div className="orb" style={{ width: 720, height: 560, left: 232, top: 240, background: 'rgba(31,164,90,.42)' }} animate={{ x: [0, 40, -20, 0], y: [0, -30, 10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="orb" style={{ width: 380, height: 320, left: 402, top: 130, background: 'rgba(126,226,162,.22)' }} animate={{ x: [0, -50, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="orb" style={{ width: 460, height: 420, left: -160, top: 300, background: 'rgba(14,95,85,.55)' }} />
            <div className="orb" style={{ width: 420, height: 380, right: -120, top: -140, background: 'rgba(20,83,45,.6)' }} />
            {[240, 360, 480, 600, 720].map((r, i) => (
              <motion.div key={r} className="ring" style={{ width: r * 2, height: r * 2, top: 664 - r }} initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: EASE, delay: 1.3 + i * .12 }} />
            ))}

            <motion.div className="hero-phone" style={{ x: px, y: phoneY }}>
              <motion.div initial={{ y: 220, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 1.25 }}>
                <div className="phone">
                  <div className="screen">
                    <div className="sbar"><span>9:41</span><span className="island" /><span>UPI</span></div>
                    <div className="vhead"><h4>Vouchers</h4><span className="badge">3 active</span></div>
                    <div className="vshell"><div className="vcore">
                      <div className="sheen" />
                      <div className="top"><span>FUEL · e-RUPI</span><span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', letterSpacing: 0, fontFamily: 'var(--sans)' }}><Icon name="lock" size={12} />Locked</span></div>
                      <div className="amt">₹<CountUp to={2000} duration={1.8} delay={1.9} /></div>
                      <div className="meta">Sharma Roadways · valid till 25 Nov</div>
                    </div></div>
                    <div className="vrow"><div><b>Meals</b><small>Cafés &amp; restaurants</small></div><span className="r">₹2,200</span></div>
                    <div className="vrow"><div><b>Telecom</b><small>Recharges &amp; bills</small></div><span className="r">₹1,000</span></div>
                    <div className="scan-btn">Scan any QR to pay<span className="chip"><Icon name="arrow" size={14} stroke="#fff" /></span></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* issued (left) */}
            <motion.div className="sat-issued" style={{ x: lx, y: ly }}>
              <motion.div className="glass-dark" initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE, delay: 1.9 }}>
                <div className="core">
                  <span className="pill-eyebrow dark">Issued · 9:02 am</span>
                  <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: '-.03em', marginTop: 12 }}>₹2,000 fuel voucher</div>
                  <div style={{ fontSize: 13, color: '#B8C4BE', marginTop: 6 }}>To Ramesh K. · fuel stations only</div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div className="connector conn-l" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .6, ease: EASE, delay: 2.4 }} />
            <motion.div className="cdot dot-l" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 2.9 }} />

            {/* paid (right) */}
            <motion.div className="connector conn-r" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .6, ease: EASE, delay: 3.1 }} />
            <motion.div className="cdot dot-r" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 3.5 }} />
            <motion.div className="sat-paid" style={{ x: rx, y: ry }}>
              <motion.div className="glass-light" initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 3.4 }}>
                <div className="core">
                  <div className="cp-tile">cp</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 16, fontWeight: 500 }}>Paid ₹1,850</b><span style={{ fontSize: 12, color: '#4F5954' }}>9:47 am</span></div>
                    <div style={{ fontSize: 13, color: '#2E3834' }}>Fuel station, NH-48 · reconciled</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Trust() {
  const names = ['NPCI e-RUPI', 'ICICI Bank', 'DigiLocker', 'Shark Tank India', 'Business Standard', 'News18', 'The Print', 'The Tribune']
  return (
    <section className="trust">
      <div className="wrap trust-inner">
        <div className="trust-label">Built on India’s payment rails, featured across national media</div>
        <div className="marquee"><div className="marquee-track">
          {[...names, ...names].map((n, i) => <span key={i}>{n}</span>)}
        </div></div>
      </div>
    </section>
  )
}
