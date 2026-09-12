import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import HackerMascot from './HackerMascot'
import { HACKER_FACTS } from '../lib/hackerFacts'

export default function FloatingMascot({ variant = 'default', size = 180, enableFacts = true, onClick }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 })

  const [fact, setFact] = useState(null)
  const timeoutRef = useRef(null)

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  function handleClick(e) {
    if (onClick) onClick(e)
    if (!enableFacts) return
    const next = HACKER_FACTS[Math.floor(Math.random() * HACKER_FACTS.length)]
    setFact(next)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setFact(null), 10000)
  }

  return (
    <div className="mascot-wrap">
      <motion.div
        ref={ref}
        className="mascot"
        style={{ rotateX, rotateY, transformPerspective: 600 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <HackerMascot variant={variant} size={size} />
      </motion.div>
      <AnimatePresence>
        {fact && (
          <motion.div
            className="mascot-bubble"
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p className="mascot-bubble-label">did you know?</p>
            <p>{fact}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
