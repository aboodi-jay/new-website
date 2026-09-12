import { motion } from 'framer-motion'
import { formatDate, excerpt } from '../lib/date'
import FloatingMascot from './FloatingMascot'

export default function PostList({ posts, onOpen, onTag, title, subtitle, mascotVariant }) {
  const sorted = [...posts].sort((a, b) => b.date - a.date)

  return (
    <div>
      {title && (
        <div className="hero hero-with-mascot" style={{ marginBottom: 8 }}>
          <div>
            <h1 style={{ fontSize: 26 }}>{title}</h1>
            {subtitle && <p style={{ marginBottom: 24 }}>{subtitle}</p>}
          </div>
          {mascotVariant && <FloatingMascot variant={mascotVariant} size={130} />}
        </div>
      )}
      {sorted.length === 0 ? (
        <div className="empty-state">
          No entries yet. Add a markdown file to <code>content/</code> and push.
        </div>
      ) : (
        <div>
          {sorted.map((p, i) => (
            <motion.div
              key={p.id}
              className="post-row"
              onClick={() => onOpen(p.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3), ease: 'easeOut' }}
            >
              <div className="post-row-meta">
                <span className="type">{p.type}</span>
                <span>{formatDate(p.date)}</span>
              </div>
              <h3 className="post-row-title">{p.title}</h3>
              <p className="post-row-excerpt">{excerpt(p.content)}</p>
              {(p.tags || []).map(t => (
                <span
                  key={t}
                  className="tag-pill"
                  onClick={e => { e.stopPropagation(); onTag && onTag(t) }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
