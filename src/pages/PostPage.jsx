import { lazy, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { posts } from '../content'
import NotFoundPage from './NotFoundPage'

const PostDetail = lazy(() => import('../components/PostDetail'))

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = posts.find(p => p.id === id)

  if (!post) return <NotFoundPage />

  return (
    <Suspense fallback={<div className="page-loading">loading…</div>}>
      <PostDetail post={post} onBack={() => navigate(-1)} />
    </Suspense>
  )
}
