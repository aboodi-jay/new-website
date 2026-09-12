import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingMascot from './FloatingMascot'

// Sits fixed bottom-right. Hidden until the user first scrolls, then shows
// the mascot itself (instead of a plain arrow) — clicking it scrolls to
// the top of the page, and its terminal switches to showing "go up".
export default function MascotDock() {
  const [everScrolled, setEverScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y > 40) {
        setEverScrolled(true)
        setVisible(true)
      } else if (everScrolled) {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [everScrolled])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mascot-dock"
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.85 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          title="Back to top"
        >
          <FloatingMascot variant="goup" size={100} enableFacts={false} onClick={scrollToTop} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
