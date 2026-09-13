import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PostList from '../components/PostList'
import { posts } from '../content'

const TYPE_BY_SLUG = { writeups: 'Writeup', blog: 'Blog' }

export default function TypeListPage({ slug }) {
  const navigate = useNavigate()
  const type = TYPE_BY_SLUG[slug]
  const filtered = posts.filter(p => p.type === type)

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <PostList
        posts={filtered}
        onOpen={id => navigate(`/post/${id}`)}
        onTag={tag => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
        title={slug[0].toUpperCase() + slug.slice(1)}
        mascotVariant={slug}
      />
    </motion.div>
  )
}
