import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

const categoryColors: Record<string, string> = {
  update: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  announcement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  discussion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function BlogCard({ post }: { post: any }) {
  const catColor = categoryColors[post.category] ?? 'bg-gold/10 text-gold border-gold/20'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-6 card-hover glow-gold transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${catColor}`}>
          {post.category}
        </span>
        {post.published_at && (
          <span className="flex items-center gap-1 text-[10px] text-muted">
            <Calendar className="w-3 h-3" />
            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 leading-snug">{post.title}</h3>
      {post.excerpt && (
        <p className="text-sm text-muted-light/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
      )}
    </Link>
  )
}
