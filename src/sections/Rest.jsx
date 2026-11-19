import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../motion'
import { Icon, Wordmark } from '../Icons'
import { Btn, CountUp, Item, Reveal, Stagger, Tick } from '../ui'

export function Stats() {
  const s = [
    [<><CountUp to={6.5} format={(v) => v.toFixed(1)} /> cr+</>, 'UPI merchants, zero onboarding'],
    [<CountUp to={0} from={0} />, 'KYC checks per employee'],
    [<><CountUp to={28} />+</>, 'Voucher categories to lock to'],
    [<><CountUp to={100} />%</>, 'Of unspent value returns to you'],
  ]
  return (
    <section className="section" style={{ paddingBottom: 96 }}>
      <Stagger className="wrap stats" s={.1}>
        {s.map(([n, l], i) => (<Item className="stat" key={i}><div className="n">{n}</div><div className="l">{l}</div></Item>))}
      </Stagger>
    </section>
  )
}

const ROWS = [
  ['New card or app', 'Their own UPI app', 'A card per person', 'A separate app'],
  ['Employee KYC', 'Not needed', 'Required', 'Required'],
  ['Where it works', 'Any UPI QR · 6.5 cr+', 'Card merchants', 'Wallet merchants'],
  ['Spend locks', 'Category, brand or outlet', 'Category only', 'Limited'],
  ['Money pre-loaded', 'No — leaves when spent', 'Yes, pre-funded', 'Yes, pre-funded'],
]
const Yes = () => <span className="yes"><Icon name="check" size={11} stroke="#fff" width={2.6} /></span>
const No = () => <span className="no"><Icon name="x" size={10} stroke="#5B6461" width={2} /></span>

export function Compare() {
  return (
    <section className="cx" id="compare">
      <div className="wrap cx-in">
        <div className="cx-left">
          <Reveal><span className="eyebrow">Compare</span></Reveal>
          <Reveal delay={.08}><h2 className="cx-h2">Why UPI vouchers beat cards and wallets.</h2></Reveal>
          <Reveal delay={.16}><p className="cx-lead">The control of an expense card — without issuing a single card, wallet or KYC check.</p></Reveal>
          <Reveal delay={.24}><Btn kind="dark" href="#demo">Book a demo</Btn></Reveal>
        </div>
        <Stagger className="cx-table" s={.08} d={.1} amount={.25}>
          <motion.span className="cx-raise" aria-hidden="true" variants={{ hidden: { opacity: 0, y: 24, scale: .97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: .9, ease: EASE } } }} />
          <Item className="cx-row cx-th">
            <div className="mono">What you get</div>
            <div className="cx-me"><Wordmark dark size={22} /><span className="mono">UPI vouchers</span></div>
            <div>Prepaid cards</div>
            <div>Digital wallets</div>
          </Item>
          {ROWS.map((r) => (
            <Item className="cx-row" key={r[0]} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: EASE } } }}>
              <div>{r[0]}</div>
              <div className="cx-me" data-label="CotoPay"><motion.span style={{ display: 'flex' }} variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15, delay: .2 } } }}><Yes /></motion.span>{r[1]}</div>
              <div data-label="Cards"><No />{r[2]}</div>
              <div data-label="Wallets"><No />{r[3]}</div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const BADGES = [
  ['shield', 'NPCI e-RUPI', 'National rails', 'Vouchers run on the e-RUPI framework launched by NPCI in 2021.'],
  ['bank', 'ICICI Bank', 'Issuing bank', 'Funds stay in your current account until an employee actually pays.'],
  ['user', 'Role-based access', 'Admin · Approver · Finance', 'Separate rights for who issues, who approves and who reconciles.'],
  ['doc', 'Full audit trail', 'Every rupee logged', 'Each issue, revoke and payment is recorded with merchant, time and amount.'],
]
export function Security() {
  return (
    <section className="section" id="security">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <Reveal><span className="eyebrow">Security &amp; rails</span></Reveal>
            <Reveal delay={.08}><h2 className="h2">Built on regulated rails,<br />controlled by your finance team.</h2></Reveal>
          </div>
          <Reveal delay={.16}><Btn kind="light" href="#security">Read security details</Btn></Reveal>
        </div>
        <Stagger className="badges" s={.1}>
          {BADGES.map(([ic, t, k, d]) => (
            <Item className="badge-card" key={t}><div className="in">
              <div className="ib"><Icon name={ic} size={26} width={1.4} /></div>
              <h6>{t}</h6><div className="k mono">{k}</div><p>{d}</p>
            </div></Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const QUOTE = '“With CotoPay I issue a fuel voucher straight to my drivers. No cash changing hands, no follow-ups, no misuse — it only works at fuel and gas stations.”'
function Word({ w, i, n, p }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.18, 1])
  return <motion.span style={{ opacity: o }}>{w} </motion.span>
}
export function Testimonial() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const words = QUOTE.split(' ')
  return (
    <section className="testi" ref={ref}>
      <div className="wrap">
        <p className="quote">{words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}</p>
        <Reveal><div className="who">Fleet owner · 300 cabs</div></Reveal>
        <div className="note">Customer story — add name, logo and the % fuel leakage saved</div>
      </div>
    </section>
  )
}

export function Team() {
  return (
    <section className="team">
      <div className="wrap team-inner">
        <Reveal><h4>Built by people from Aadhaar, CoWIN,<br />BharatPe and the e-RUPI launch team.</h4></Reveal>
        <Stagger className="people" s={.1}>
          {[['AG', 'Aviral Gupta', 'Co-founder & CEO'], ['VS', 'Vidit Sidana', 'Co-founder & CBO'], ['UA', 'Uzair Ahmed', 'Co-founder & CTO']].map(([i, n, r]) => (
            <Item className="person" key={n}><span className="av">{i}</span><div><b>{n}</b><small>{r}</small></div></Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export function DemoCTA() {
  const [sent, setSent] = useState(false)
  return (
    <section className="section alt" id="demo">
      <div className="wrap cta-grid">
        <div>
          <Reveal><span className="eyebrow">Get started</span></Reveal>
          <Reveal delay={.08}><h2 className="h2" style={{ fontSize: 'clamp(40px,5vw,58px)' }}>Move your business<br />spend to UPI.</h2></Reveal>
          <Reveal delay={.16}><p className="lead" style={{ maxWidth: 480 }}>A 15-minute demo. We’ll issue a test voucher to your own phone so you can pay with it on the call.</p></Reveal>
          <Stagger className="checks" s={.08} d={.2}>
            {['Pricing shared on the call — early-customer rates available', 'Live in days, alongside your HRMS', 'Prefer chat? Message us on WhatsApp'].map((c) => <Item key={c}><span><Tick />{c}</span></Item>)}
          </Stagger>
        </div>
        <Reveal delay={.1} y={40}>
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <div className="two">
              <div><label htmlFor="n">Full name</label><input id="n" required placeholder="Your name" /></div>
              <div><label htmlFor="e">Work email</label><input id="e" type="email" required placeholder="you@company.com" /></div>
            </div>
            <div><label htmlFor="c">Company</label><input id="c" required placeholder="Company name" /></div>
            <div><label htmlFor="t">Team size</label><select id="t" defaultValue=""><option value="" disabled>Select an option</option><option>1–20</option><option>21–100</option><option>101–500</option><option>500+</option></select></div>
            <div><label htmlFor="u">What do you want to pay for?</label><select id="u" defaultValue=""><option value="" disabled>Fuel · Petty cash · Benefits · Loyalty</option><option>Fleet fuel &amp; tolls</option><option>Petty cash</option><option>Flexi-benefits</option><option>Loyalty &amp; incentives</option></select></div>
            <Btn type="submit">Book a demo</Btn>
            <small>We reply within one working day.</small>
            <AnimatePresence>
              {sent && (
                <motion.div className="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4 }}>
                  <motion.span className="tick" style={{ width: 64, height: 64 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: .1 }}><Icon name="check" size={30} stroke="#fff" width={2.4} /></motion.span>
                  <b style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-.02em' }}>You’re on the list.</b>
                  <span className="muted" style={{ fontSize: 15 }}>This is a design concept — no request was sent.<br />On the live site, the team replies within one working day.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const cols = [['Solutions', ['Fleet expenses', 'Corporate expenses', 'Flexi-benefits', 'Loyalty & incentives']], ['Company', ['About', 'Founders', 'Press', 'Careers']], ['Resources', ['Blog', 'What is e-RUPI?', 'FAQs', 'Contact']], ['Legal', ['Terms', 'Privacy', 'Refund policy']]]
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-top">
          <div><Wordmark dark size={28} /><p>Business expenses on UPI.<br />A Cotodel Technologies company.</p></div>
          <div className="f-cols">{cols.map(([h, ls]) => <div key={h}><b>{h}</b>{ls.map((l) => <a key={l} href="#top">{l}</a>)}</div>)}</div>
        </div>
        <div className="f-bot">
          <span>© 2026 Cotodel Technologies Pvt Ltd · WeWork Eldeco Centre, Malviya Nagar, New Delhi 110017</span>
          <span>App Store · Google Play · LinkedIn · YouTube</span>
        </div>
      </div>
    </footer>
  )
}
