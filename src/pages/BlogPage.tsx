import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts } from '../lib/supabase'
import BlogCard from '../components/blog/BlogCard'
import Header from '../components/Header'
import Footer from '../components/sections/Footer'

const categories = ['all', 'update', 'announcement', 'discussion']

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [cat, setCat] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts({ status: 'published' }).then((data) => { setPosts(data); setLoading(false) })
  }, [])

  const filtered = cat === 'all' ? posts : posts.filter((p) => p.category === cat)

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Link to="/" className="text-xs text-muted-light hover:text-gold transition-colors">&larr; Back to Home</Link>
            <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Blog & Updates</span>
            </h1>
            <p className="text-sm text-muted-light/70 max-w-lg mx-auto">
              Latest updates, announcements, and discussions from the Pinkman X team.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${cat === c ? 'bg-gold/10 text-gold border-gold/30' : 'bg-black/40 text-muted-light border-gold/10 hover:text-white hover:border-gold/20'}`}
              >
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1) + 's'}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted text-sm py-12">Loading posts...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted text-sm mb-4">No posts yet.</p>
              <p className="text-xs text-muted">Stay tuned for updates from Pinkman X.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {filtered.map((p: any) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}

          <div className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/10 text-center">
            <p className="text-sm text-muted-light">
              Want to share something or have questions?{' '}
              <a href="mailto:hello@pinkmanx.vip" className="text-gold underline font-semibold">hello@pinkmanx.vip</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
