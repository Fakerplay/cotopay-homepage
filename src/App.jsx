import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { Announce, Nav, Hero, Trust } from './sections/Hero'
import Locks from './sections/Locks'
import UseCases from './sections/UseCases'
import How from './sections/How'
import { Stats, Compare, Security, Testimonial, Team, DemoCTA, Footer } from './sections/Rest'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -76 }) }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(id); lenis.destroy(); document.removeEventListener('click', onClick) }
  }, [])
  return (
    <>
      <Announce />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Locks />
        <UseCases />
        <Stats />
        <HowStack />
        <Security />
        <Testimonial />
        <Team />
        <DemoCTA />
      </main>
      <Footer />
    </>
  )
}

/** How it works sticks once its bottom meets the viewport; Compare slides up over it on a rounded white panel. */
function HowStack() {
  const how = useRef(null), cmp = useRef(null)
  const [top, setTop] = useState(0)
  useLayoutEffect(() => {
    const el = how.current
    const fit = () => setTop(Math.min(76, window.innerHeight - el.offsetHeight))
    const ro = new ResizeObserver(fit); ro.observe(el); window.addEventListener('resize', fit); fit()
    return () => { ro.disconnect(); window.removeEventListener('resize', fit) }
  }, [])
  const { scrollYProgress } = useScroll({ target: cmp, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, .94])
  const dim = useTransform(scrollYProgress, [0, 1], [0, .6])
  return (
    <div className="hstack">
      <motion.div ref={how} className="hstack-back" style={{ top, scale }}>
        <How />
        <motion.span className="hstack-dim" style={{ opacity: dim }} aria-hidden="true" />
      </motion.div>
      <div ref={cmp} className="hstack-front"><Compare /></div>
    </div>
  )
}
