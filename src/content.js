// Loads every markdown file under /content at build time (Vite glob import).
// No runtime fetch, no backend - posts are baked into the JS bundle on build.

const files = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }
  const [, block, content] = match
  const meta = {}
  block.split('\n').forEach(line => {
    const i = line.indexOf(':')
    if (i === -1) return
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if (key === 'tags') {
      meta.tags = val.replace(/^\[|\]$/g, '').split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      meta[key] = val.replace(/^["']|["']$/g, '')
    }
  })
  return { meta, content: content.trim() }
}

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

function typeFromPath(path) {
  if (path.includes('/content/writeups/')) return 'Writeup'
  if (path.includes('/content/blog/')) return 'Blog'
  return 'Writeup'
}

export const posts = Object.entries(files).map(([path, raw]) => {
  const { meta, content } = parseFrontmatter(raw)
  const slug = meta.slug || slugFromPath(path)
  return {
    id: slug,
    title: meta.title || slug,
    type: meta.type || typeFromPath(path),
    date: meta.date ? new Date(meta.date).getTime() : 0,
    tags: meta.tags || [],
    content,
  }
})
