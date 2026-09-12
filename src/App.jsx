import { useState, useMemo, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TopNav from './components/TopNav'
import Hero from './components/Hero'
import PostList from './components/PostList'
const PostDetail = lazy(() => import('./components/PostDetail'))
import About from './components/About'
import MascotDock from './components/MascotDock'
import ReadingProgress from './components/ReadingProgress'
import { useTheme } from './hooks/useTheme'
import { posts } from './content'

const TYPE_BY_VIEW = { writeups: 'Writeup', blog: 'Blog' }

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const [view, setView] = useState('home')
  const [activeId, setActiveId] = useState(null)
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState(null)

  function goTo(v) {
    setQuery('')
    setTagFilter(null)
    setView(v)
  }

  function openPost(id) {
    setActiveId(id)
    setView('post')
  }

  function handleSearch(q) {
    setQuery(q)
    setTagFilter(null)
    setView(q.trim() ? 'search' : 'home')
  }

  function filterByTag(tag) {
    setTagFilter(tag)
    setQuery('')
    setView('search')
  }

  const activePost = useMemo(() => posts.find(p => p.id === activeId), [activeId])

  const listForView = useMemo(() => {
    if (view === 'search') {
      const q = query.trim().toLowerCase()
      if (tagFilter) return posts.filter(p => (p.tags || []).includes(tagFilter))
      return posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }
    const type = TYPE_BY_VIEW[view]
    return type ? posts.filter(p => p.type === type) : posts
  }, [view, query, tagFilter])

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  }

  return (
    <>
      <TopNav view={view} goTo={goTo} onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
      {view === 'post' && <ReadingProgress key={activeId} />}
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div className="page" key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <Hero goTo={goTo} />
              <p className="section-title">latest entries</p>
              <PostList posts={posts.slice(0, 6)} onOpen={openPost} onTag={filterByTag} />
            </motion.div>
          )}

          {(view === 'writeups' || view === 'blog') && (
            <motion.div className="page" key={view} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <PostList
                posts={listForView}
                onOpen={openPost}
                onTag={filterByTag}
                title={view[0].toUpperCase() + view.slice(1)}
                mascotVariant={view}
              />
            </motion.div>
          )}

          {view === 'search' && (
            <motion.div className="page" key="search" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <PostList
                posts={listForView}
                onOpen={openPost}
                onTag={filterByTag}
                title="Search results"
                subtitle={tagFilter ? `Tagged "${tagFilter}"` : `${listForView.length} match${listForView.length === 1 ? '' : 'es'} for "${query}"`}
                mascotVariant="default"
              />
            </motion.div>
          )}

          {view === 'about' && <About key="about" />}

          {view === 'post' && (
            <Suspense fallback={<div className="page-loading">loading…</div>}>
              <PostDetail key={'post-' + activeId} post={activePost} onBack={() => setView('home')} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>
      <MascotDock />
    </>
  )
}
