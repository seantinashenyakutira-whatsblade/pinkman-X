import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return res.status(200).json({ reply: 'Chat is not configured. Set GROQ_API_KEY env var.', noKey: true })

  const { message, history } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message is required' })

  const systemPrompt = `You are a helpful assistant for Pinkman X, an AI-powered trading intelligence platform. 

ABOUT PINKMAN X:
- Pinkman X combines AI education, market analysis, news filtering, strategy management, session planning, and MT5 automation into one workspace.
- Built by WhatsBlade Technologies in partnership with Pinkman FX.
- Features: AI Chart Analysis, Beginner to Advanced Courses, AI Filtered Forex News, Smart Money Education, Sessions & Timetable, Broker & MT5 Integration, Prebuilt AI Strategies, Journal & Analytics, Risk Management Tools.
- Currently in pre-launch with a waitlist open at pinkmanx.vip.
- Pricing: Explorer (free), Trader ($10/mo), Pro ($25/mo), Elite ($50/mo).
- Contact: hello@pinkmanx.vip
- Blog and updates at pinkmanx.vip/blog

Keep answers concise, friendly, and helpful. Use emojis occasionally. If asked something outside your knowledge, say you'll redirect them to hello@pinkmanx.vip.`

  try {
    const response = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...(history || []),
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Groq API error:', response.status, errText)
      return res.status(200).json({ reply: "Sorry, I'm having a moment. Try again or email hello@pinkmanx.vip.", error: true })
    }

    const json = await response.json()
    const reply = json.choices?.[0]?.message?.content || "I'm not sure about that. Email hello@pinkmanx.vip for help."
    res.status(200).json({ reply })
  } catch {
    res.status(200).json({ reply: "Network glitch! Try again or email hello@pinkmanx.vip." })
  }
}
