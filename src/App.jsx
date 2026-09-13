import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopNav from './components/TopNav'
import About from './components/About'
import MascotDock from './components/MascotDock'
import ReadingProgress from './components/ReadingProgress'
import HomePage from './pages/HomePage'
import TypeListPage from './pages/TypeListPage'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import NotFoundPage from './pages/NotFoundPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <>
      <TopNav theme={theme} toggleTheme={toggleTheme} />
      {location.pathname.startsWith('/post/') && <ReadingProgress key={location.pathname} />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/writeups" element={<TypeListPage slug="writeups" />} />
            <Route path="/blog" element={<TypeListPage slug="blog" />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <MascotDock />
    </>
  )
}
