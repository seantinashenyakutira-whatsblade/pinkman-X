import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getBlogPosts } from '../lib/supabase'
import BlogCard from '../components/blog/BlogCard'
import Header from '../components/Header'
import Footer from '../components/sections/Footer'
import { Sparkles, Newspaper, TrendingUp } from 'lucide-react'

const categories = ['all', 'update', 'announcement', 'discussion']
const catLabels: Record<string, string> = {
  all: 'All Stories',
  update: 'Updates',
  announcement: 'Announcements',
  discussion: 'Discussions',
}

export default function BlogPage() {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState<any[]>([])
  const [cat, setCat] = useState('all')
  const [loading, setLoading] = useState(true)
  const [welcome, setWelcome] = useState(false)

  useEffect(() => {
    if (searchParams.get('welcome') === 'true') {
      setWelcome(true)
      const timer = setTimeout(() => setWelcome(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  useEffect(() => {
    getBlogPosts({ status: 'published' }).then((data) => { setPosts(data); setLoading(false) })
  }, [])

  const filtered = cat === 'all' ? posts : posts.filter((p) => p.category === cat)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main className="pt-20 pb-16 px-4">
        {welcome && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-slide-down">
            <div className="rounded-xl bg-gradient-to-r from-gold/10 to-amber/10 border border-gold/20 p-4 flex items-center gap-3 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-gold shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Email Verified!</p>
                <p className="text-xs text-muted-light">Welcome to Pinkman X — explore the latest insights below.</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Newspaper className="w-5 h-5 text-gold" />
                <h1 className="text-xl sm:text-2xl font-black">
                  <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">News & Updates</span>
                </h1>
              </div>
              <p className="text-xs text-muted-light/70">Latest from Pinkman X</p>
            </div>
            <Link to="/" className="text-xs text-muted-light hover:text-gold transition-colors hidden sm:block">
              &larr; Home
            </Link>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  cat === c
                    ? 'bg-gold/10 text-gold border-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                    : 'bg-black/40 text-muted-light border-gold/10 hover:text-white hover:border-gold/20'
                }`}
              >
                {catLabels[c]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 text-gold/20 mx-auto mb-4" />
              <p className="text-muted text-sm mb-2">No stories yet in this category.</p>
              <p className="text-xs text-muted">Stay tuned for updates from Pinkman X.</p>
            </div>
          ) : (
            <>
              {/* Featured story */}
              {featured && (
                <div className="mb-6">
                  <BlogCard post={featured} featured />
                </div>
              )}

              {/* Rest of stories in masonry-like grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {rest.map((p: any) => (
                    <BlogCard key={p.id} post={p} />
                  ))}
                </div>
              )}

              {/* Trending / Latest sidebar — inline on desktop */}
              {rest.length >= 3 && (
                <div className="mt-10 rounded-2xl bg-black/40 border border-gold/10 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    <h3 className="text-sm font-bold text-white">Trending Stories</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rest.slice(0, 3).map((p: any) => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="flex items-start gap-3 group">
                        <span className="text-lg font-black text-gold/30 group-hover:text-gold/60 transition-colors shrink-0 w-6 text-right">
                          {rest.indexOf(p) + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                            {p.title}
                          </p>
                          {p.published_at && (
                            <p className="text-[10px] text-muted mt-0.5">
                              {new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Connect footer */}
          <div className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/10 text-center">
            <p className="text-xs text-muted-light">
              Have a story idea or question?{' '}
              <a href="mailto:hello@pinkman.vip" className="text-gold underline font-semibold">hello@pinkman.vip</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
