import { useEffect, useState, type FormEvent } from 'react'
import { getApprovedComments, submitComment } from '../../lib/supabase'
import { MessageSquare, Send } from 'lucide-react'

interface Props {
  postId: string
}

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const load = () => getApprovedComments(postId).then(setComments)
  useEffect(() => { load() }, [postId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setError('Valid email is required.'); return }
    if (!content.trim()) { setError('Comment cannot be empty.'); return }
    const r = await submitComment({ post_id: postId, commenter_name: name.trim() || undefined, commenter_email: email.trim(), content: content.trim() })
    if (r.error) { setError(r.error); return }
    setSubmitted(true)
    setName(''); setEmail(''); setContent('')
  }

  return (
    <div className="mt-10 border-t border-gold/10 pt-8">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-gold" />
        Comments ({comments.length})
      </h3>

      {comments.length > 0 && (
        <div className="space-y-4 mb-8">
          {comments.map((c: any) => (
            <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-gold/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-white">{c.commenter_name || 'Anonymous'}</span>
                <span className="text-[10px] text-muted">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-light/80 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-sm text-emerald-400">
          Your comment has been submitted and is pending approval. Thank you!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
          <p className="text-xs text-muted mb-1">Share your thoughts</p>
          <div className="grid grid-cols-2 gap-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *" required className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25" />
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your comment..." rows={3} className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 resize-none" />
          {error && <div className="text-xs text-red-400">{error}</div>}
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-amber text-dark-950 font-bold text-xs hover:brightness-110 transition-all">
            <Send className="w-3.5 h-3.5" /> Submit Comment
          </button>
        </form>
      )}

      <div className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/10 text-center">
        <p className="text-sm text-muted-light">
          Questions or feedback? Email us at{' '}
          <a href="mailto:hello@pinkmanx.vip" className="text-gold underline font-semibold">hello@pinkmanx.vip</a>
        </p>
      </div>
    </div>
  )
}
