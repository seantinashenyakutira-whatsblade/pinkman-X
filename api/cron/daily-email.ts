import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'

const DAILY_PROMPT = `You are Pinkman X's AI copywriter. Generate a warm, professional daily trading email. 

Return ONLY a JSON object with these fields (no markdown, no backticks):
{
  "subject": "A short, enticing subject line (max 60 chars)",
  "insight": "One concise market insight or trading psychology tip (1-2 sentences)",
  "tip": "One actionable trading tip for today (1-2 sentences)"
}

Guidelines: Write for beginner-to-intermediate retail traders. Keep tone warm, confident, professional. Never give financial advice — always include that each trader should do their own research. Make each generation feel unique (vary sentence structure). Current market conditions are mixed (USD strength, gold volatile, crypto consolidating).`

function wrapHtml(body: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#050508;font-family:Inter,system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="480" cellpadding="0" cellspacing="0" style="background:#0a0a12;border-radius:16px;border:1px solid rgba(212,175,55,0.15)">
<tr><td style="padding:36px 28px 24px;text-align:center">
<img src="https://pinkmanx.vip/pinkmanx-logo.jpeg" alt="Pinkman X" width="48" height="48" style="border-radius:10px;margin-bottom:16px" />
<p style="color:#D4AF37;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px">Daily Trading Insight</p>
${body}
<p style="color:#6b7280;font-size:11px;line-height:1.5;margin:24px 0 0;padding-top:16px;border-top:1px solid rgba(212,175,55,0.08)">Pinkman X — AI Trading Intelligence<br>Built by WhatsBlade Technologies<br><a href="https://pinkmanx.vip/unsubscribe" style="color:#D4AF37;text-decoration:none">Unsubscribe</a></p>
</td></tr></table>
</td></tr></table></body></html>`
}

async function generateDailyContent(groqKey: string): Promise<{ subject: string; insight: string; tip: string } | null> {
  try {
    const res = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey}` },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: DAILY_PROMPT },
          { role: 'user', content: 'Generate today\'s daily trading email content. Make it fresh and unique.' },
        ],
        temperature: 0.85,
        max_tokens: 300,
      }),
    })
    if (!res.ok) return null
    const json = await res.json()
    const text = json.choices?.[0]?.message?.content?.trim()
    if (!text) return null
    // Try to parse JSON from response (handle potential markdown wrapping)
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Protect cron endpoint — only Vercel Cron or valid secret can trigger
  const isVercelCron = req.headers['x-vercel-cron'] === 'true'
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.authorization
  const hasValidSecret = cronSecret && authHeader === `Bearer ${cronSecret}`
  if (!isVercelCron && !hasValidSecret) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
  const resendKey = process.env.RESEND_API_KEY
  const groqKey = process.env.GROQ_API_KEY

  if (!supabaseUrl || !supabaseKey || !resendKey || !groqKey) {
    return res.status(200).json({ error: 'Missing environment variables (need SUPABASE_URL, RESEND_API_KEY, GROQ_API_KEY)' })
  }

  try {
    // 1. Generate AI content for today
    const content = await generateDailyContent(groqKey)
    if (!content) {
      return res.status(200).json({ error: 'Failed to generate AI content' })
    }

    // 2. Fetch verified waitlist users
    const usersRes = await fetch(
      `${supabaseUrl}/rest/v1/pinkman_waitlist?verified=eq.true&status=eq.waitlist&select=id,full_name,email`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
    )
    if (!usersRes.ok) {
      return res.status(200).json({ error: 'Failed to fetch users' })
    }
    const users: { id: string; full_name: string; email: string }[] = await usersRes.json()

    if (!users || users.length === 0) {
      return res.status(200).json({ message: 'No users to email', count: 0 })
    }

    // 3. Send personalized email to each user (with small delay between batches)
    let sent = 0
    let failed = 0

    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      const firstName = user.full_name.split(' ')[0]

      const bodyHtml = `
        <h1 style="color:#fff;font-size:18px;font-weight:700;margin:0 0 12px">${content.subject}</h1>
        <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:0 0 8px">Hey <span style="color:#D4AF37;font-weight:600">${firstName}</span>,</p>
        <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0 0 16px">${content.insight}</p>
        <table style="background:rgba(212,175,55,0.06);border-radius:10px;margin:0 0 16px;width:100%"><tr><td style="padding:16px 20px">
          <p style="color:#D4AF37;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 6px">Today's Tip</p>
          <p style="color:#e2e8f0;font-size:13px;line-height:1.6;margin:0">${content.tip}</p>
        </td></tr></table>
        <p style="color:#6b7280;font-size:12px;line-height:1.5;margin:0">Always do your own research before trading.</p>
        <p style="color:#9ca3af;font-size:13px;margin:16px 0 0">Trade smart,<br>The Pinkman X Team</p>
      `

      const emailHtml = wrapHtml(bodyHtml)

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Pinkman X <daily@pinkmanx.vip>',
            to: user.email,
            subject: content.subject,
            html: emailHtml,
          }),
        })

        if (emailRes.ok) {
          sent++
          // Log success to email_logs
          await fetch(`${supabaseUrl}/rest/v1/email_logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
            body: JSON.stringify({ recipient_email: user.email, email_type: 'daily_tip', status: 'sent' }),
          })
        } else {
          failed++
        }
      } catch {
        failed++
      }

      // Delay 200ms between emails to avoid Resend rate limits
      if (i < users.length - 1) {
        await new Promise(r => setTimeout(r, 200))
      }
    }

    return res.status(200).json({
      message: 'Daily emails sent',
      total: users.length,
      sent,
      failed,
      subject: content.subject,
    })
  } catch (err) {
    return res.status(200).json({ error: String(err) })
  }
}
