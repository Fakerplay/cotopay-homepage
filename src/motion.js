export const EASE = [0.22, 1, 0.36, 1]
export const VIEW = { once: true, amount: 0.25 }
export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}
export const stagger = (s = 0.08, d = 0) => ({ hidden: {}, show: { transition: { staggerChildren: s, delayChildren: d } } })
export const pop = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}
