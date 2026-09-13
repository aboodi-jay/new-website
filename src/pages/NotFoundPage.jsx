import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FloatingMascot from '../components/FloatingMascot'

export default function NotFoundPage() {
  return (
    <motion.div
      className="page not-found-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FloatingMascot variant="default" size={160} enableFacts={false} />
      <h1>connection refused</h1>
      <p>Nothing here — this route returned a 404. Might've been moved, renamed, or never existed.</p>
      <Link to="/" className="back-home-link">&larr; back to aboodijay.com</Link>
    </motion.div>
  )
}
