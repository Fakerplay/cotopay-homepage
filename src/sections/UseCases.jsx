import { useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../motion'
import { Icon } from '../Icons'
import { Canvas, CountUp, Reveal, useWidth } from '../ui'

const V = (delay = 0, from = { y: 24 }, dur = 0.9) => ({
  hidden: { opacity: 0, ...from },
  show: { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, transition: { duration: dur, ease: EASE, delay } },
})
const Spring = (delay = 0) => ({
  hidden: { opacity: 0, scale: .6 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 18, delay } },
})

function Card({ cls, children, delay = 0, label, cref }) {
  return (
    <motion.article ref={cref} className={'ucard ' + cls} aria-label={label}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay } } }}>
      {children}
    </motion.article>
  )
}
function Head({ tag, l, m, size, sub, subColor }) {
  return (
    <div className="head">
      <div className="top"><span className="tag">{tag}</span><span className="go" aria-hidden="true"><Icon name="arrow" size={16} /></span></div>
      <h3 style={{ fontSize: size }}>{l}<br />{m}</h3>
      {sub && <motion.p className="sub" variants={V(.15)} style={{ color: subColor }}>{sub}</motion.p>}
    </div>
  )
}

/* ---------- 01 FLEET ---------- */
const ROAD_W = 'M800 48 C560 48 420 88 410 240 C402 360 360 420 360 540'
const ROAD_C = 'M30 -10 C30 120 70 140 70 232 C70 350 40 390 40 500'
const ITEMS = [['toll', 'Tolls'], ['fuel', 'Fuel'], ['wrench', 'Repairs'], ['park', 'Parking']]

function Road({ d, w, h, id }) {
  return (<>
    <svg className="abs" width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ left: 0, top: 0, overflow: 'visible' }} fill="none">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="-100" y="-100" width={w + 300} height={h + 300}>
          <motion.path d={d} stroke="#fff" strokeWidth="90" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: EASE, delay: .2 } } }} />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <path d={d} stroke="#9A4A1C" strokeOpacity=".1" strokeWidth="64" strokeLinecap="round" transform="translate(0 8)" />
        <path d={d} stroke="#fff" strokeOpacity=".22" strokeWidth="58" strokeLinecap="round" />
        <path d={d} stroke="#fff" strokeOpacity=".9" strokeWidth="46" strokeLinecap="round" />
        <path d={d} stroke="#F4C6A2" strokeWidth="42" strokeLinecap="round" />
        <path d={d} stroke="#fff" strokeWidth="2.5" strokeDasharray="12 12" strokeLinecap="round" />
      </g>
    </svg>
    <span className="travel-dot" style={{ offsetPath: `path('${d}')` }} />
  </>)
}
function VoucherRules({ x, y, w }) {
  return (
    <motion.div className="abs fleet-rules" variants={V(1.5, { x: 40 })} style={{ left: x, top: y, width: w }}>
      <div className="mono" style={{ fontSize: 12, color: '#FFC9A3' }}>Step 2 · Locked &amp; sent</div>
      <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-.01em', marginTop: 12 }}>Fuel voucher · ₹2,000</div>
      <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: .1, delayChildren: 1.9 } } }} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {['Fuel stations only', 'Valid 7 days · till 25 Nov', 'Sent to 14 drivers', 'Revocable in one tap'].map((s) => (
          <motion.div key={s} variants={V(0, { x: -10 }, .5)} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: '#FFF3EA' }}>
            <span className="ic-circle" style={{ width: 16, height: 16, background: '#FFD9BC', flex: 'none' }}><Icon name="check" size={11} stroke="#3E1D08" width={2.6} /></span>{s}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
function Paid({ x, y, w }) {
  return (
    <motion.div className="abs glass" variants={V(2.4, { y: 20 })} style={{ left: x, top: y, width: w, borderRadius: 16, padding: 12, display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,.42)' }}>
      <span className="ic-circle" style={{ width: 36, height: 36, borderRadius: 12, background: '#3E1D08', flex: 'none' }}><Icon name="check" size={18} stroke="#FFD9BC" width={2} /></span>
      <div><div className="mono" style={{ fontSize: 12, color: '#5A2C10' }}>Step 3 · Paid</div><div style={{ fontSize: 14, fontWeight: 500, color: '#2B1407' }}>₹1,850 · NH-48 pump</div></div>
    </motion.div>
  )
}
const Step1 = ({ x, y }) => (
  <motion.span className="abs mono" variants={V(.6, { x: 20 })} style={{ left: x, top: y, fontSize: 12, padding: '5px 10px', borderRadius: 99, background: 'rgba(62,29,8,.85)', color: '#FFD9BC', whiteSpace: 'nowrap' }}>Step 1 · Issued</motion.span>
)
const Node = ({ x, y }) => (
  <motion.div className="abs" variants={Spring(1.4)} style={{ left: x - 13, top: y - 13, width: 26, height: 26 }}>
    <span className="node-ring" style={{ inset: -8 }} />
    <span className="abs" style={{ inset: 0, borderRadius: 99, background: '#fff', boxShadow: '0 0 0 8px rgba(255,255,255,.55), 0 6px 16px rgba(154,74,28,.2)' }} />
  </motion.div>
)
const IconCircle = ({ k, act, size }) => (
  <div className="ic-circle" style={{ width: size, height: size, background: act ? 'rgba(180,96,44,.42)' : 'rgba(180,96,44,.14)', border: act ? '2px solid rgba(255,255,255,.95)' : '1px solid rgba(255,255,255,.4)', boxShadow: act ? '0 10px 24px rgba(154,74,28,.25)' : 'none' }}>
    <Icon name={k} size={size * .4} stroke="#fff" />
  </div>
)

function FleetWide() {
  return (
    <Canvas w={776} h={514} align="right" max={1}>
      <Road d={ROAD_W} w={776} h={514} id="road-w" />
      <Step1 x={612} y={2} />
      {ITEMS.map(([k, lb], i) => {
        const cy = 240 + (i - 1) * 84, act = i === 1
        return (
          <motion.div key={k} className="abs" variants={V(.6 + i * .1, { x: -20 })} style={{ left: 150, top: cy - 30, width: 182, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
            <span style={{ fontSize: 14, fontWeight: act ? 500 : 400, color: act ? '#3A1D0B' : '#4A230C' }}>{lb}</span>
            <IconCircle k={k} act={act} size={60} />
          </motion.div>
        )
      })}
      <motion.div className="abs" variants={V(1.1, { scaleX: 0 }, .6)} style={{ left: 338, top: 240, width: 59, height: 1, background: 'rgba(255,255,255,.85)', transformOrigin: 'left' }} />
      <Node x={410} y={240} />
      <VoucherRules x={472} y={135} w={272} />
      <Paid x={472} y={365} w={272} />
    </Canvas>
  )
}
function FleetCompact() {
  return (
    <Canvas w={360} h={450} align="center" max={1.1}>
      <Road d={ROAD_C} w={360} h={450} id="road-c" />
      {ITEMS.map(([k, lb], i) => (
        <motion.div key={k} className="abs" variants={V(.5 + i * .08, { y: 12 })} style={{ left: 104 + i * 64, top: 0, width: 64, display: 'grid', justifyItems: 'center', gap: 6 }}>
          <IconCircle k={k} act={i === 1} size={48} />
          <span style={{ fontSize: 13, fontWeight: i === 1 ? 500 : 400, color: i === 1 ? '#3A1D0B' : '#4A230C' }}>{lb}</span>
        </motion.div>
      ))}
      <Step1 x={112} y={92} />
      <motion.div className="abs" variants={V(1.1, { scaleX: 0 }, .5)} style={{ left: 83, top: 232, width: 29, height: 1, background: 'rgba(255,255,255,.85)', transformOrigin: 'left' }} />
      <Node x={70} y={232} />
      <VoucherRules x={112} y={128} w={240} />
      <Paid x={112} y={357} w={240} />
    </Canvas>
  )
}
function Fleet() {
  const ref = useRef(null)
  const w = useWidth(ref)
  return (
    <Card cls="c-fleet" label="Fleet fuel and tolls" cref={ref}>
      <Head tag="01 · Fleet fuel & tolls" l="Fuel that only goes" m={<>into <b>your trucks.</b></>} size="clamp(32px, 4vw, 48px)"
        sub="Every driver’s voucher is locked to pumps, tolls and service centres." subColor="#4A230C" />
      <div className="vis bleed">{w === 0 ? null : w >= 640 ? <FleetWide /> : <FleetCompact />}</div>
    </Card>
  )
}

/* ---------- 02 PETTY ---------- */
function Petty() {
  return (
    <Card cls="c-petty" delay={.1} label="Petty cash">
      <Head tag="02 · Petty cash" l="Petty cash," m={<b>without the cash.</b>} size={26} />
      <div className="vis">
        <Canvas w={336} h={180} max={1.15}>
          <motion.div className="gridlines" variants={V(.2, {}, 1.2)} style={{ left: 0, top: 10, width: 336, height: 168, '--gl': 'rgba(126,135,48,.22)', backgroundSize: '56px 56px' }} />
          <motion.div className="abs winframe" variants={V(.4, { y: 30 })} style={{ left: 28, top: 34, background: '#6B7A1E', boxShadow: '0 14px 28px rgba(74,84,16,.22)' }}>
            <div className="dots"><i /><i /><i /></div>
            <div className="body"><img src="./img/store.webp" alt="" style={{ width: 84, height: 84, objectFit: 'cover' }} /><div className="sk"><i style={{ width: 56 }} /><i style={{ width: 72 }} /><i style={{ width: 40 }} /></div></div>
          </motion.div>
          <motion.div className="abs glass" variants={V(.65, { y: -16 })} style={{ left: 212, top: 14, borderRadius: 14, padding: '10px 12px 12px', boxShadow: '0 12px 26px rgba(126,135,48,.15), inset 0 1px 0 rgba(255,255,255,.7)' }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Float used</div>
            <svg width="100" height="44" viewBox="0 0 100 44" style={{ marginTop: 8, display: 'block' }}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F5D547" /><stop offset="1" stopColor="#F29C8F" /></linearGradient>
                <clipPath id="pclip"><motion.rect x="0" y="0" height="44" variants={{ hidden: { width: 0 }, show: { width: 100, transition: { duration: 1.4, ease: EASE, delay: .9 } } }} /></clipPath></defs>
              <path clipPath="url(#pclip)" d="M0 38 L14 32 L26 34 L40 22 L54 26 L68 12 L82 16 L100 4 L100 44 L0 44Z" fill="url(#pg)" />
            </svg>
          </motion.div>
          <motion.div className="abs profile" variants={V(.9, { x: 30 })} style={{ left: 118, top: 124, background: 'rgba(251,252,238,.92)', boxShadow: '0 12px 26px rgba(107,122,30,.22)' }}>
            <img src="./img/store.webp" alt="" style={{ width: 38, height: 38 }} />
            <div><small style={{ color: '#4A5410' }}>store_07 · andheri</small><b style={{ fontSize: 16, color: '#1C2003' }}>₹<CountUp to={1240} delay={1} /> of 1,500</b></div>
          </motion.div>
        </Canvas>
      </div>
    </Card>
  )
}

/* ---------- 03 BENEFITS ---------- */
function Benefits() {
  const tiles = [['meals', 'Meals', '₹2,200', .62], ['fuel', 'Fuel', '₹3,000', .38], ['phone', 'Telecom', '₹1,000', .8]]
  return (
    <Card cls="c-ben" delay={.2} label="Flexi-benefits">
      <Head tag="03 · Flexi-benefits" l="Allowances," m={<b>spent in one scan.</b>} size={26} />
      <div className="vis">
        <Canvas w={336} h={162} max={1.15}>
          {tiles.map(([k, l, v, p], i) => {
            const act = i === 1
            return (
              <motion.div key={k} className="abs glass" variants={V(.3 + i * .12, { y: 50 })} whileHover={{ y: -6 }}
                style={{ left: i * 116, top: act ? 0 : 24, width: 104, borderRadius: 18, padding: '14px 14px 16px', display: 'grid', gap: 8, background: act ? 'rgba(255,255,255,.62)' : 'rgba(255,255,255,.32)', boxShadow: `0 14px 30px rgba(106,85,194,${act ? .24 : .1}), inset 0 1px 0 rgba(255,255,255,.7)` }}>
                <span className="ic-circle" style={{ width: 32, height: 32, background: act ? '#3B2A7A' : 'rgba(106,85,194,.16)' }}><Icon name={k} size={17} stroke={act ? '#fff' : '#3B2A7A'} /></span>
                <span className="mono" style={{ fontSize: 13, color: '#3B2A7A', letterSpacing: '.04em' }}>{l}</span>
                <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-.02em' }}>{v}</span>
                <span style={{ display: 'block', width: 76, height: 4, borderRadius: 9, background: 'rgba(106,85,194,.16)', overflow: 'hidden' }}>
                  <motion.span variants={V(.8 + i * .12, { scaleX: 0 }, 1)} style={{ display: 'block', height: 4, width: 76 * p, borderRadius: 9, background: '#6A55C2', transformOrigin: 'left' }} />
                </span>
              </motion.div>
            )
          })}
        </Canvas>
      </div>
    </Card>
  )
}

/* ---------- 04 CATEGORIES ---------- */
function Categories() {
  const cats = [['fuel', 'Fuel'], ['toll', 'Tolls'], ['wrench', 'Repairs'], ['meals', 'Meals'], ['plane', 'Travel'], ['bed', 'Stay'], ['phone', 'Telecom'], ['heart', 'Health'], ['store', 'Stores'], ['plus', '+20']]
  return (
    <Card cls="c-cat" label="Voucher categories">
      <Head tag="04 · 28+ categories" l="Lock a voucher to" m={<b>almost anything.</b>} size={26} />
      <div className="vis">
        <Canvas w={336} h={176} max={1.15}>
          {cats.map(([k, l], i) => {
            const col = i % 5, row = Math.floor(i / 5), cx = col * 67.2 + 33.6, last = k === 'plus'
            return (
              <div key={k}>
                <motion.div className="abs ic-circle" variants={Spring(.3 + i * .05)} whileHover={{ y: -4, scale: 1.06 }} style={{ left: cx - 26, top: row * 100, width: 52, height: 52, background: last ? '#0E4A3A' : 'rgba(255,255,255,.42)', border: last ? 'none' : '1px solid rgba(255,255,255,.85)', boxShadow: '0 8px 20px rgba(46,138,110,.12), inset 0 1px 0 rgba(255,255,255,.7)' }}>
                  <Icon name={k} size={21} stroke={last ? '#fff' : '#0E4A3A'} />
                </motion.div>
                <motion.span className="abs mono" variants={V(.4 + i * .05, { y: 6 }, .5)} style={{ left: cx - 40, width: 80, textAlign: 'center', top: 60 + row * 100, fontSize: 13, color: '#0E4A3A', letterSpacing: '.02em' }}>{l}</motion.span>
              </div>
            )
          })}
        </Canvas>
      </div>
    </Card>
  )
}

/* ---------- 05 LOYALTY ---------- */
function Loyalty() {
  const bars = [22, 34, 28, 46, 56, 70]
  return (
    <Card cls="c-loy" delay={.1} label="Loyalty and incentives">
      <div className="loy-body">
        <div className="loy-copy">
          <Head tag="05 · Loyalty & incentives" l="Rewards retailers" m={<b>actually redeem.</b>} size="clamp(30px, 3.2vw, 40px)"
            sub="Channel incentives and promos that only work at your partner stores." subColor="#5E2416" />
          <motion.div className="loy-stat" variants={V(.3)}>
            <span style={{ fontSize: 44, fontWeight: 300, letterSpacing: '-.04em', lineHeight: 1 }}><CountUp to={92} delay={.4} />%</span>
            <span style={{ fontSize: 13, lineHeight: 1.35, color: '#5E2416' }}>redeemed at<br />partner stores</span>
          </motion.div>
        </div>
        <div className="vis loy-vis">
          <Canvas w={370} h={270} max={1}>
            <motion.div className="gridlines" variants={V(.2, {}, 1.2)} style={{ left: 24, top: 0, width: 288, height: 216, '--gl': 'rgba(181,84,60,.2)', backgroundSize: '72px 72px' }} />
            <motion.div className="abs winframe" variants={V(.4, { y: 30 })} style={{ left: 50, top: 32, background: '#A8402B', padding: '10px 12px 12px', boxShadow: '0 16px 32px rgba(122,42,24,.22)' }}>
              <div className="dots"><i /><i /><i /></div>
              <div className="body" style={{ gap: 14 }}><img src="./img/shop.webp" alt="" style={{ width: 120, height: 120, objectFit: 'cover' }} /><div className="sk" style={{ gap: 9, paddingTop: 30 }}><i style={{ width: 64 }} /><i style={{ width: 84 }} /><i style={{ width: 52 }} /></div></div>
            </motion.div>
            <motion.div className="abs glass" variants={V(.65, { y: -16 })} style={{ left: 206, top: 4, borderRadius: 16, padding: '12px 14px 14px', boxShadow: '0 14px 30px rgba(181,84,60,.15), inset 0 1px 0 rgba(255,255,255,.7)' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Redemptions</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 70, marginTop: 10 }}>
                {bars.map((h, i) => <motion.span key={i} variants={V(.9 + i * .08, { scaleY: 0 }, .8)} style={{ width: 14, height: h, borderRadius: '4px 4px 0 0', background: 'linear-gradient(#FFD6A0, #F2765A)', transformOrigin: 'bottom' }} />)}
              </div>
            </motion.div>
            <motion.div className="abs profile" variants={V(1.1, { x: 40 })} style={{ left: 30, top: 208, padding: '8px 16px 8px 8px', gap: 12, background: 'rgba(255,244,240,.92)', boxShadow: '0 14px 30px rgba(181,84,60,.22)' }}>
              <img src="./img/shop.webp" alt="" style={{ width: 44, height: 44 }} />
              <div style={{ flex: 1 }}><small style={{ color: '#7A3424', fontSize: 14 }}>meera.stores</small><b style={{ fontSize: 18, color: '#2B0E07' }}>₹750 reward</b></div>
              <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', fontSize: 14, fontWeight: 500, color: '#7A2A18', whiteSpace: 'nowrap' }}><Icon name="check" size={14} stroke="#9A3420" width={2.2} />Redeemed</span>
            </motion.div>
          </Canvas>
        </div>
      </div>
    </Card>
  )
}

export default function UseCases() {
  return (
    <section className="section alt" id="use-cases">
      <div className="wrap">
        <div className="center">
          <Reveal><span className="eyebrow">Use cases</span></Reveal>
          <Reveal delay={.08}><h2 className="h2">Built for how India spends at work.</h2></Reveal>
          <Reveal delay={.16}><p className="lead">Fleets, stores, HR teams and brands — one engine, locked differently for each.</p></Reveal>
        </div>
        <div className="bento">
          <div className="row-a">
            <Fleet />
            <div className="stack"><Petty /><Benefits /></div>
          </div>
          <div className="row-b"><Categories /><Loyalty /></div>
        </div>
      </div>
    </section>
  )
}
