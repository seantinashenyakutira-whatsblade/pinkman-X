import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const query = url.parse(req.url || '', true).query
  const email = query.email as string

  if (!email) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Email is required' }))
    return
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Supabase not configured' }))
    return
  }

  const findRes = await fetch(
    `${SUPABASE_URL}/rest/v1/pinkman_waitlist?email=eq.${encodeURIComponent(email.toLowerCase())}&select=verified`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  )

  if (!findRes.ok) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Failed to check' }))
    return
  }

  const rows = await findRes.json()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ verified: rows?.[0]?.verified ?? false }))
}
