import type { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

const RESEND_API_KEY = process.env.RESEND_API_KEY

async function findAndVerifyToken(token: string) {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null

  // Find entry by token
  const findRes = await fetch(
    `${SUPABASE_URL}/rest/v1/pinkman_waitlist?verification_token=eq.${encodeURIComponent(token)}&select=id,full_name,email`,
    {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    }
  )
  if (!findRes.ok) return null
  const rows = await findRes.json()
  if (!rows || rows.length === 0) return null

  const row = rows[0]

  // Mark verified, clear token, set status to waitlist
  const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/pinkman_waitlist?id=eq.${row.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      verified: true,
      verification_token: null,
      status: 'waitlist',
    }),
  })
  if (!updateRes.ok) return null

  return row
}

async function sendWelcomeEmail(name: string, email: string) {
  if (!RESEND_API_KEY) return
  const firstName = name.split(' ')[0]
  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#050508;font-family:Inter,system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="480" cellpadding="0" cellspacing="0" style="background:#0a0a12;border-radius:16px;border:1px solid rgba(212,175,55,0.15)">
<tr><td style="padding:40px 32px 32px;text-align:center">
<img src="https://pinkmanx.vip/pinkmanx-logo.jpeg" alt="Pinkman X" width="56" height="56" style="border-radius:12px;margin-bottom:20px" />
<h1 style="color:#D4AF37;font-size:22px;font-weight:800;margin:0 0 8px">Welcome to Pinkman X!</h1>
<p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0">Hi ${firstName},<br/>Your email is verified. You're officially on the Pinkman X waitlist.<br/>We'll keep you updated on launch news, beta access, and exclusive offers.</p>
</td></tr></table>
</td></tr></table></body></html>`

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Pinkman X <hello@pinkman.vip>',
        to: email,
        subject: 'Email verified — Welcome to Pinkman X!',
        html,
      }),
    })
  } catch {}
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const query = url.parse(req.url || '', true).query
  const token = query.token as string

  if (!token) {
    res.writeHead(302, { Location: '/?verified=error' })
    res.end()
    return
  }

  const row = await findAndVerifyToken(token)

  if (!row) {
    res.writeHead(302, { Location: '/?verified=invalid' })
    res.end()
    return
  }

  // Send welcome email (non-blocking, don't wait)
  sendWelcomeEmail(row.full_name, row.email)

  // Log email sent
  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL
    const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          recipient_email: row.email,
          email_type: 'welcome',
          status: 'sent',
        }),
      })
    }
  } catch {}

  res.writeHead(302, { Location: '/?verified=true' })
  res.end()
}
