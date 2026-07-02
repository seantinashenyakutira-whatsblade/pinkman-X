import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

const catGradients: Record<string, string> = {
  update: 'from-blue-600/30 to-blue-900/20',
  announcement: 'from-amber-600/30 to-amber-900/20',
  discussion: 'from-purple-600/30 to-purple-900/20',
}

const catLabels: Record<string, string> = {
  update: 'Update',
  announcement: 'Announcement',
  discussion: 'Discussion',
}

const categoryColors: Record<string, string> = {
  update: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  announcement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  discussion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function BlogCard({ post, featured }: { post: any; featured?: boolean }) {
  const catColor = categoryColors[post.category] ?? 'bg-gold/10 text-gold border-gold/20'
  const gradient = catGradients[post.category] ?? 'from-gold/20 to-dark-950'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 overflow-hidden card-hover glow-gold transition-all duration-300 ${featured ? '' : ''}`}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${featured ? 'h-56 sm:h-72' : 'h-40 sm:h-48'}`}>
        {post.featured_image ? (
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black text-white/5 select-none">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {featured && (
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${catColor} mb-2`}>
              {catLabels[post.category] ?? post.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-gold transition-colors line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-xs text-white/70 mt-1 line-clamp-2">{post.excerpt}</p>
            )}
          </div>
        )}
      </div>
      {!featured && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${catColor}`}>
              {catLabels[post.category] ?? post.category}
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1 text-[9px] text-muted">
                <Calendar className="w-2.5 h-2.5" />
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-white leading-snug group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-xs text-muted-light/70 mt-1.5 leading-relaxed line-clamp-2">{post.excerpt}</p>
          )}
        </div>
      )}
    </Link>
  )
}
