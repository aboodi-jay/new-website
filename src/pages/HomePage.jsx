import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import PostList from '../components/PostList'
import { posts } from '../content'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Hero goTo={path => navigate(path === 'home' ? '/' : `/${path}`)} />
      <p className="section-title">latest entries</p>
      <PostList
        posts={posts.slice(0, 6)}
        onOpen={id => navigate(`/post/${id}`)}
        onTag={tag => navigate(`/search?tag=${encodeURIComponent(tag)}`)}
      />
    </motion.div>
  )
}
