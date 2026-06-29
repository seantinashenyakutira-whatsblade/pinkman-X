const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseClient: any = null

export async function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null
  if (!supabaseClient) {
    const { createClient } = await import('@supabase/supabase-js')
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// ─── Waitlist ──────────────────────────────────────────

export async function submitWaitlist(data: {
  full_name: string
  email: string
  whatsapp: string
  experience_level: string
  interest: string
  marketing_consent: boolean
}) {
  const supabase = await getSupabase()
  if (!supabase) return { error: new Error('Waitlist backend not connected.') }
  const { error } = await supabase.from('pinkman_waitlist').insert([
    { ...data, source: 'landing_page', status: 'waitlist' },
  ])
  if (error) {
    if (error.code === '23505') return { error: new Error("You're already on the Pinkman X waitlist.") }
    return { error }
  }
  try {
    const { sendWelcomeEmail } = await import('./emailAutomation')
    sendWelcomeEmail(data.email, data.full_name.split(' ')[0])
  } catch {}
  return { error: null }
}

export async function getWaitlistEntries() {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data } = await supabase.from('pinkman_waitlist').select('*').order('created_at', { ascending: false })
  return data ?? []
}

// ─── Email Logs ────────────────────────────────────────

export async function getEmailLogs() {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data } = await supabase.from('email_logs').select('*').order('sent_at', { ascending: false })
  return data ?? []
}

export async function logEmailSent(recipient_email: string, email_type: string, status = 'sent', error_message?: string) {
  const supabase = await getSupabase()
  if (!supabase) return
  await supabase.from('email_logs').insert([{ recipient_email, email_type, status, error_message }])
}

// ─── Blog Posts ────────────────────────────────────────

export async function getBlogPosts(filters?: { status?: string; category?: string }) {
  const supabase = await getSupabase()
  if (!supabase) return []
  let q = supabase.from('blog_posts').select('*')
  if (filters?.status) q = q.eq('status', filters.status)
  if (filters?.category) q = q.eq('category', filters.category)
  const { data } = await q.order('published_at', { ascending: false }).order('created_at', { ascending: false })
  return data ?? []
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await getSupabase()
  if (!supabase) return null
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle()
  return data ?? null
}

export async function createBlogPost(data: {
  title: string; slug: string; content: string; excerpt?: string
  category: string; author_id: string; status?: string
}) {
  const supabase = await getSupabase()
  if (!supabase) return { error: 'Backend not connected' }
  const payload: any = { ...data }
  if (data.status === 'published') payload.published_at = new Date().toISOString()
  const { error } = await supabase.from('blog_posts').insert([payload])
  return { error: error?.message ?? null }
}

export async function updateBlogPost(id: string, data: {
  title?: string; slug?: string; content?: string; excerpt?: string
  category?: string; status?: string
}) {
  const supabase = await getSupabase()
  if (!supabase) return { error: 'Backend not connected' }
  const payload: any = { ...data, updated_at: new Date().toISOString() }
  if (data.status === 'published') payload.published_at = new Date().toISOString()
  const { error } = await supabase.from('blog_posts').update(payload).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteBlogPost(id: string) {
  const supabase = await getSupabase()
  if (!supabase) return { error: 'Backend not connected' }
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  return { error: error?.message ?? null }
}

// ─── Blog Comments ─────────────────────────────────────

export async function getApprovedComments(postId: string) {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data } = await supabase.from('blog_comments').select('*')
    .eq('post_id', postId).eq('status', 'approved').order('created_at', { ascending: true })
  return data ?? []
}

export async function submitComment(data: {
  post_id: string; commenter_name?: string; commenter_email: string; content: string
}) {
  const supabase = await getSupabase()
  if (!supabase) return { error: 'Backend not connected' }
  const { error } = await supabase.from('blog_comments').insert([{ ...data, status: 'pending' }])
  return { error: error?.message ?? null }
}

export async function getAllComments() {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data } = await supabase.from('blog_comments').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export async function updateCommentStatus(id: string, status: string) {
  const supabase = await getSupabase()
  if (!supabase) return
  await supabase.from('blog_comments').update({ status }).eq('id', id)
}
