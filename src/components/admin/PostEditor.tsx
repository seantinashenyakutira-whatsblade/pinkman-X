import { useState, type FormEvent } from 'react'
import { createBlogPost, updateBlogPost } from '../../lib/supabase'
import { Bold, Italic, Heading3, Link, List } from 'lucide-react'

interface Props {
  post: any | null
  authorId: string
  onSave: () => void
  onCancel: () => void
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function PostEditor({ post, authorId, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [category, setCategory] = useState(post?.category ?? 'update')
  const [content, setContent] = useState(post?.content ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [status, setStatus] = useState(post?.status ?? 'draft')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [autoSlug, setAutoSlug] = useState(!post?.slug)

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (autoSlug) setSlug(slugify(v))
  }

  const insertTag = (open: string, close: string) => {
    const ta = document.getElementById('post-content') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = content.substring(start, end)
    const before = content.substring(0, start)
    const after = content.substring(end)
    setContent(before + open + selected + close + after)
    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + open.length + selected.length + close.length }, 0)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }
    if (!content.trim()) { setError('Content is required.'); return }
    setSaving(true); setError('')
    const data = { title: title.trim(), slug: slug.trim(), content, excerpt: excerpt.trim(), category, status }
    const r = post
      ? await updateBlogPost(post.id, data)
      : await createBlogPost({ ...data, author_id: authorId })
    setSaving(false)
    if (r.error) { setError(r.error); return }
    onSave()
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">{post ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <div>
          <label className="block text-xs text-muted mb-1">Title</label>
          <input value={title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted mb-1">Slug</label>
            <input value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false) }} className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25" />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25">
              <option value="update">Update</option>
              <option value="announcement">Announcement</option>
              <option value="discussion">Discussion</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Content</label>
          <div className="flex items-center gap-1 mb-2">
            <button type="button" onClick={() => insertTag('<b>', '</b>')} className="p-1.5 rounded bg-black/60 border border-gold/10 text-muted-light hover:text-white hover:border-gold/30 transition-all" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => insertTag('<i>', '</i>')} className="p-1.5 rounded bg-black/60 border border-gold/10 text-muted-light hover:text-white hover:border-gold/30 transition-all" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => insertTag('<h3>', '</h3>')} className="p-1.5 rounded bg-black/60 border border-gold/10 text-muted-light hover:text-white hover:border-gold/30 transition-all" title="Heading"><Heading3 className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => insertTag('<a href="', '">link</a>')} className="p-1.5 rounded bg-black/60 border border-gold/10 text-muted-light hover:text-white hover:border-gold/30 transition-all" title="Link"><Link className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => insertTag('<ul>\n<li>', '</li>\n</ul>')} className="p-1.5 rounded bg-black/60 border border-gold/10 text-muted-light hover:text-white hover:border-gold/30 transition-all" title="List"><List className="w-3.5 h-3.5" /></button>
          </div>
          <textarea
            id="post-content"
            value={content} onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/25 resize-y"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Excerpt (short summary, shown on blog cards)</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 resize-none" />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="status" checked={status === 'draft'} onChange={() => setStatus('draft')} className="text-gold focus:ring-gold/25" />
            <span className="text-xs text-muted-light">Draft</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="status" checked={status === 'published'} onChange={() => setStatus('published')} className="text-gold focus:ring-gold/25" />
            <span className="text-xs text-muted-light">Published</span>
          </label>
        </div>
        {error && <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs">{error}</div>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-gradient-to-r from-gold to-amber text-dark-950 font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50">
            {saving ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2 rounded-lg border border-gold/20 text-muted-light text-sm hover:text-white transition-all">
            Cancel
          </button>
        </div>
      </form>
      {content && (
        <div className="mt-8">
          <p className="text-xs text-muted mb-2">Preview:</p>
          <div className="rounded-xl bg-black/40 border border-gold/10 p-6 max-w-3xl prose prose-invert text-sm text-white/80 [&_h3]:text-gold [&_h3]:text-lg [&_h3]:font-bold [&_b]:text-white [&_a]:text-gold [&_a]:underline [&_li]:text-white/80"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  )
}
