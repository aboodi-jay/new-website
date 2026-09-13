import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PostList from '../components/PostList'
import { posts } from '../content'

export default function SearchPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const tag = params.get('tag') || ''

  const results = tag
    ? posts.filter(p => (p.tags || []).includes(tag))
    : posts.filter(p => {
        const needle = q.toLowerCase()
        return (
          p.title.toLowerCase().includes(needle) ||
          p.content.toLowerCase().includes(needle) ||
          (p.tags || []).some(t => t.toLowerCase().includes(needle))
        )
      })

  const subtitle = tag
    ? `Tagged "${tag}"`
    : `${results.length} match${results.length === 1 ? '' : 'es'} for "${q}"`

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <PostList
        posts={results}
        onOpen={id => navigate(`/post/${id}`)}
        onTag={t => navigate(`/search?tag=${encodeURIComponent(t)}`)}
        title="Search results"
        subtitle={subtitle}
        mascotVariant="default"
      />
    </motion.div>
  )
}
