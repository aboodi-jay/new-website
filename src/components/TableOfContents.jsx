import { useMemo, useState, useEffect } from 'react'
import GithubSlugger from 'github-slugger'

export function extractHeadings(markdown) {
  const slugger = new GithubSlugger()
  const lines = (markdown || '').split('\n')
  const headings = []
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.*)/)
    if (!match) continue
    const level = match[1].length
    const text = match[2].trim()
    headings.push({ level, text, id: slugger.slug(text) })
  }
  return headings
}

export default function TableOfContents({ content }) {
  const headings = useMemo(() => extractHeadings(content), [content])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (headings.length === 0) return
    function onScroll() {
      let current = null
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top <= 100) current = h.id
      }
      setActiveId(current || headings[0].id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="toc">
      <p className="toc-label">On this page</p>
      <ul>
        {headings.map(h => (
          <li key={h.id} className={'toc-level-' + h.level + (activeId === h.id ? ' active' : '')}>
            <a
              href={'#' + h.id}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
