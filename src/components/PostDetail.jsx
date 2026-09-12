import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { formatDate } from '../lib/date'
import TableOfContents from './TableOfContents'
import CodeBlock from './CodeBlock'
import FloatingMascot from './FloatingMascot'
import { useTypewriter } from '../hooks/useTypewriter'
import { highlightLanguages } from '../lib/highlightLanguages'

const VARIANT_BY_TYPE = { Writeup: 'writeups', Blog: 'blog' }

export default function PostDetail({ post, onBack }) {
  const duration = post ? Math.min(Math.max(post.content.length * 2.2, 500), 1800) : 900
  const { revealed, done } = useTypewriter(post?.content, duration)

  if (!post) return null

  return (
    <motion.div
      className="post-layout"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="post-main">
        <div className="post-detail-head">
          <div>
            <button className="back-link" onClick={onBack}>&larr; back</button>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="type">{post.type}</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
          <FloatingMascot variant={VARIANT_BY_TYPE[post.type] || 'default'} size={80} />
        </div>
        <div className={'prose' + (done ? '' : ' typing')}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, [rehypeHighlight, { languages: highlightLanguages, ignoreMissing: true }]]}
            components={{ pre: CodeBlock }}
          >
            {revealed}
          </ReactMarkdown>
        </div>
      </div>
      <TableOfContents content={post.content} />
    </motion.div>
  )
}
