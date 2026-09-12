import { motion } from 'framer-motion'
import FloatingMascot from './FloatingMascot'

export default function About() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="hero hero-with-mascot">
        <div>
          <h1>About</h1>
          <p>
            This is a personal log of web app security testing, CTF writeups,
            and pentest writeups. Edit this component to make it yours.
          </p>
        </div>
        <FloatingMascot variant="about" size={180} />
      </div>
    </motion.div>
  )
}
