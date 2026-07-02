import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, getBlogPosts } from '../lib/supabase'
import CommentSection from '../components/blog/CommentSection'
import Header from '../components/Header'
import Footer from '../components/sections/Footer'
import { Calendar, ArrowLeft, TrendingUp } from 'lucide-react'

const categoryColors: Record<string, string> = {
  update: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  announcement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  discussion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

const catGradients: Record<string, string> = {
  update: 'from-blue-600/20 to-blue-900/10',
  announcement: 'from-amber-600/20 to-amber-900/10',
  discussion: 'from-purple-600/20 to-purple-900/10',
}

const catLabels: Record<string, string> = {
  update: 'Update',
  announcement: 'Announcement',
  discussion: 'Discussion',
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogPostBySlug(slug).then((data) => {
      setPost(data)
      if (data) {
        getBlogPosts({ status: 'published' }).then((all) => {
          setRelated(
            all.filter((p: any) => p.id !== data.id && p.category === data.category).slice(0, 3)
          )
        })
      }
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-muted text-sm">Post not found.</p>
        <Link to="/blog" className="text-sm text-gold underline">Back to Blog</Link>
      </div>
    )
  }

  const catColor = categoryColors[post.category] ?? 'bg-gold/10 text-gold border-gold/20'
  const gradient = catGradients[post.category] ?? 'from-gold/20 to-dark-950'

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <article>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-light hover:text-gold transition-colors mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>

            {/* Featured image */}
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} h-48 sm:h-64 mb-6 border border-gold/10`}>
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl sm:text-8xl font-black text-white/5 select-none">
                    {post.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${catColor}`}>
                  {catLabels[post.category] ?? post.category}
                </span>
                {post.published_at && (
                  <span className="flex items-center gap-1 text-[10px] text-muted">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">{post.title}</h1>

              {post.excerpt && (
                <p className="text-sm text-muted-light/80 mb-6 italic border-l-2 border-gold/20 pl-4">
                  {post.excerpt}
                </p>
              )}

              <div
                className="prose prose-invert text-sm text-white/80 max-w-none mt-4 [&_h3]:text-gold [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_b]:text-white [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-white/80 [&_p]:mb-4 [&_img]:rounded-xl [&_img]:border [&_img]:border-gold/10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <CommentSection postId={post.id} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              {related.length > 0 && (
                <div className="rounded-xl bg-black/40 border border-gold/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-gold" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">More {catLabels[post.category] ?? post.category}s</h3>
                  </div>
                  <div className="space-y-3">
                    {related.map((p: any) => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="block group">
                        <p className="text-xs font-semibold text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                          {p.title}
                        </p>
                        {p.published_at && (
                          <p className="text-[10px] text-muted mt-0.5">
                            {new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl bg-gold/5 border border-gold/10 p-4 text-center">
                <p className="text-xs text-muted-light mb-2">Stay in the loop</p>
                <Link
                  to="/#founding"
                  className="inline-block text-[10px] font-semibold text-dark-950 bg-gradient-to-r from-gold to-amber px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
