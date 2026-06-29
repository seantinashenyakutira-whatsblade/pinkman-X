import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug } from '../lib/supabase'
import CommentSection from '../components/blog/CommentSection'
import Header from '../components/Header'
import Footer from '../components/sections/Footer'
import { Calendar, ArrowLeft } from 'lucide-react'

const categoryColors: Record<string, string> = {
  update: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  announcement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  discussion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getBlogPostBySlug(slug).then((data) => { setPost(data); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center">
        <p className="text-muted text-sm">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-muted">Post not found.</p>
        <Link to="/blog" className="text-sm text-gold underline">Back to Blog</Link>
      </div>
    )
  }

  const catColor = categoryColors[post.category] ?? 'bg-gold/10 text-gold border-gold/20'

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-light hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${catColor}`}>
                {post.category}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1 text-[10px] text-muted">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">{post.title}</h1>

            <div
              className="prose prose-invert text-sm text-white/80 max-w-none mt-6 [&_h3]:text-gold [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_b]:text-white [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-white/80 [&_p]:mb-4 [&_img]:rounded-xl [&_img]:border [&_img]:border-gold/10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <CommentSection postId={post.id} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
