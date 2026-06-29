import { useEffect, useState } from 'react'
import { getBlogPosts, deleteBlogPost } from '../../lib/supabase'
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react'

interface Props {
  onEdit: (post: any | null) => void
  refreshKey: number
}

export default function BlogTab({ onEdit, refreshKey }: Props) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getBlogPosts().then((data) => { setPosts(data); setLoading(false) })
  }

  useEffect(() => { load() }, [refreshKey])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await deleteBlogPost(id)
    load()
  }

  if (loading) return <p className="text-sm text-muted">Loading posts...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Blog Posts ({posts.length})</h2>
        <button
          onClick={() => onEdit(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gold to-amber text-dark-950 font-bold text-xs hover:brightness-110 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> New Post
        </button>
      </div>
      <div className="space-y-2">
        {posts.map((p: any) => (
          <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gold/10 hover:border-gold/20 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                {p.status}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{p.title}</p>
                <p className="text-[10px] text-muted">{p.category} &middot; {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {p.status === 'published' && (
                <a href={`/blog/${p.slug}`} target="_blank" className="p-1.5 rounded-lg text-muted-light hover:text-white hover:bg-white/10 transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button onClick={() => onEdit(p)} className="p-1.5 rounded-lg text-muted-light hover:text-gold hover:bg-gold/10 transition-all">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-muted-light hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-muted py-8 text-sm">No blog posts yet. Create your first one!</p>
        )}
      </div>
    </div>
  )
}
