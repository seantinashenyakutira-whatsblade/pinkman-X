import type { IncomingMessage, ServerResponse } from 'http'

function getBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk: string) => (body += chunk))
    req.on('end', () => resolve(body))
  })
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173'

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Missing Supabase environment variables' }))
    return
  }

  try {
    const body = await getBody(req)
    const { email } = JSON.parse(body)
    if (!email) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Email is required' }))
      return
    }

    const normalEmail = email.toLowerCase()

    // Find user
    const findRes = await fetch(
      `${SUPABASE_URL}/rest/v1/pinkman_waitlist?email=eq.${encodeURIComponent(normalEmail)}&select=id,full_name,verified`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    )
    const rows = findRes.ok ? await findRes.json() : []

    if (!rows || rows.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, message: 'not_found' }))
      return
    }

    const user = rows[0]
    if (user.verified) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, message: 'already_verified' }))
      return
    }

    // Generate new token and send
    const token = crypto.randomUUID()
    await fetch(`${SUPABASE_URL}/rest/v1/pinkman_waitlist?id=eq.${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ verification_token: token, status: 'pending_verification' }),
    })

    let emailSent = false
    if (RESEND_API_KEY) {
      const verifyLink = `${BASE_URL}/api/confirm-signup?token=${token}`
      const firstName = user.full_name.split(' ')[0]
      const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#050508;font-family:Inter,system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="480" cellpadding="0" cellspacing="0" style="background:#0a0a12;border-radius:16px;border:1px solid rgba(212,175,55,0.15)">
<tr><td style="padding:40px 32px 32px;text-align:center">
<img src="https://pinkmanx.vip/pinkmanx-logo.jpeg" alt="Pinkman X" width="56" height="56" style="border-radius:12px;margin-bottom:20px" />
<h1 style="color:#D4AF37;font-size:22px;font-weight:800;margin:0 0 8px">Verify Your Email</h1>
<p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 24px">Hi ${firstName},<br/>Here's a fresh verification link for Pinkman X. Click below to confirm your email.</p>
<a href="${verifyLink}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#D4AF37,#E6A817);color:#050508;font-size:14px;font-weight:700;border-radius:12px;text-decoration:none;margin-bottom:24px">Verify Email</a>
<p style="color:#6b7280;font-size:12px;margin:0">If you didn't sign up, you can safely ignore this email.<br/>Pinkman X &mdash; AI Trading Intelligence</p>
</td></tr></table>
</td></tr></table></body></html>`
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Pinkman X <hello@pinkmanx.vip>', to: normalEmail, subject: 'Verify your email — Pinkman X Waitlist', html }),
      })
      emailSent = emailRes.ok
      if (!emailRes.ok) {
        const errText = await emailRes.text()
        console.error('[Resend] Resend failed:', emailRes.status, errText)
        // Log failure to email_logs
        try {
          await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
            body: JSON.stringify({ recipient_email: normalEmail, email_type: 'welcome', status: 'failed', error_message: `Resend ${emailRes.status}: ${errText.slice(0, 200)}` }),
          })
        } catch {}
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true, message: 'resent', email_sent: emailSent }))
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Invalid request' }))
  }
}
