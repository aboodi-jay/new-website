import { motion } from 'framer-motion'
import FloatingMascot from './FloatingMascot'
import { useIsMobile } from '../hooks/useIsMobile'

const ICONS = {
  writeups: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M15 4v5h5" />
      <path d="M7 12h8M7 16h5" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
}

export default function Hero({ goTo }) {
  const isMobile = useIsMobile()
  const cards = [
    { id: 'writeups', title: 'Writeups', desc: 'CTF, lab, and bug bounty style writeups from hands-on testing.' },
    { id: 'blog', title: 'Blog posts', desc: 'Longer-form articles, tutorials, and opinions on offensive security.' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="hero hero-with-mascot">
        <div>
          <h1>Hey, I'm Aboodi.</h1>
          <p>
            This is my little parcel of the internet — a log of web app security
            testing and CTF writeups. Have a look around.
          </p>
        </div>
        <FloatingMascot variant="default" size={isMobile ? 140 : 220} />
      </div>
      <div className="directory-grid">
        {cards.map((c, i) => (
          <motion.div
            key={c.id}
            className="directory-card"
            onClick={() => goTo(c.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i, ease: 'easeOut' }}
            whileHover={{ y: -2 }}
          >
            <div className="directory-icon">{ICONS[c.id]}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
