export type WaitlistStatus = 'waitlist' | 'pre_approved' | 'beta_invited' | 'beta_user' | 'launched' | 'unsubscribed'

const API_URL = '/api/send-email'

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html }),
    })
    if (!res.ok) {
      const data = await res.json()
      console.warn('[Email] Failed:', data.error)
    } else {
      console.log(`[Email] Sent to ${to}: "${subject}"`)
    }
  } catch (err) {
    console.warn('[Email] Send error (API not available locally):', err)
  }
}

function wrapHtml(body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Inter,system-ui,sans-serif;background:#050508;color:#e2e8f0;padding:32px 24px;max-width:560px;margin:0 auto;}
    .logo{font-size:18px;font-weight:800;color:#D4AF37;margin-bottom:24px;}
    h1{font-size:22px;font-weight:700;color:#fff;margin-bottom:16px;}
    p{font-size:14px;line-height:1.7;color:#9ca3af;margin-bottom:16px;}
    .highlight{color:#D4AF37;font-weight:600;}
    .footer{margin-top:32px;padding-top:16px;border-top:1px solid rgba(212,175,55,0.1);font-size:12px;color:#6b7280;}
  </style></head><body>
    <div class="logo">Pinkman X</div>
    ${body}
    <div class="footer">Pinkman X — AI Trading Intelligence<br>Built by WhatsBlade Technologies</div>
  </body></html>`
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const body = `
    <h1>You're on the Pinkman X waitlist</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>Welcome to the waitlist. You are among the first to secure early access to the future of AI-powered trading intelligence.</p>
    <p>Pinkman X is being built by <span class="highlight">WhatsBlade Technologies</span> in partnership with <span class="highlight">Pinkman FX</span> — combining cutting-edge artificial intelligence with real-world trading expertise.</p>
    <p><strong>What to expect:</strong></p>
    <p>• Early product previews and feature reveals<br>
    • Exclusive beta access opportunities<br>
    • Weekly build updates and progress reports<br>
    • Launch day priority access</p>
    <p>We are building a single intelligent workspace that brings together AI chart analysis, forex news intelligence, strategy education, trade journaling, session planning, and future MT5 automation.</p>
    <p>Stay tuned for what's coming.</p>
    <p>The Pinkman X Team<br>WhatsBlade Technologies</p>
  `
  await sendEmail(email, "You're on the Pinkman X waitlist", wrapHtml(body))
}

export async function sendBetaApprovalEmail(email: string, name: string): Promise<void> {
  const body = `
    <h1>You've been selected for early Pinkman X access</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>Congratulations — you've been pre-approved for early Pinkman X access.</p>
    <p>As a valued member of our waitlist community, we're giving you the opportunity to experience Pinkman X before the general public.</p>
    <p><strong>Next steps:</strong></p>
    <p>1. We'll send you onboarding instructions within 48 hours<br>
    2. You'll receive credentials to access the beta platform<br>
    3. A personal onboarding call will be scheduled (optional)</p>
    <p>Your early feedback will directly shape the final product.</p>
    <p>Let's build the future of trading together.</p>
    <p>The Pinkman X Team<br>WhatsBlade Technologies</p>
  `
  await sendEmail(email, "You've been selected for early Pinkman X access", wrapHtml(body))
}

export async function sendWeeklyUpdate(email: string): Promise<void> {
  const body = `
    <h1>Pinkman X Build Update</h1>
    <p>Here's what we shipped this week on Pinkman X.</p>
    <p>Stay tuned for the full update content.</p>
  `
  await sendEmail(email, 'Pinkman X Build Update', wrapHtml(body))
}

export async function sendLaunchOfferEmail(email: string, name: string): Promise<void> {
  const body = `
    <h1>Your Pinkman X Pro launch benefit</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>As one of the first waitlist members, you qualify for an exclusive founding trader benefit: <span class="highlight">2 months of Pinkman X Pro — free at launch.</span></p>
    <p>This includes full access to all AI analysis tools, advanced trading strategies library, priority MT5 automation access, premium AI news intelligence, and direct founder access for feedback.</p>
    <p>We'll send redemption instructions when we launch.</p>
    <p>Thank you for being part of this journey.</p>
    <p>The Pinkman X Team<br>WhatsBlade Technologies</p>
  `
  await sendEmail(email, 'Your Pinkman X Pro launch benefit', wrapHtml(body))
}
