import { useState, type FormEvent } from 'react'
import { Play, Check } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ScrollLink from '../ui/ScrollLink'
import { submitWaitlist } from '../../lib/supabase'

const expOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
const intOptions = ['Learning', 'AI Analysis', 'Trading Automation', 'Signals', 'Prop Firm Support', 'All Features']

export default function Hero() {
  const [f, setF] = useState({ full_name: '', email: '', whatsapp: '', experience_level: '', interest: '', marketing_consent: false })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!f.full_name.trim()) { setStatus('error'); setMsg('Full name is required.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setStatus('error'); setMsg('Valid email is required.'); return }
    if (!f.whatsapp.trim()) { setStatus('error'); setMsg('WhatsApp number is required.'); return }
    if (!f.experience_level) { setStatus('error'); setMsg('Select your experience level.'); return }
    if (!f.interest) { setStatus('error'); setMsg('Select your main interest.'); return }
    setStatus('loading'); setMsg('')
    const r = await submitWaitlist({ full_name: f.full_name.trim(), email: f.email.trim().toLowerCase(), whatsapp: f.whatsapp.trim(), experience_level: f.experience_level, interest: f.interest, marketing_consent: f.marketing_consent })
    if (r.error) { setStatus('error'); setMsg(r.error.message) }
    else { setStatus('success'); setMsg(`You're on the list, ${f.full_name.split(' ')[0]}!`) }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-dark-950 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gold/4 rounded-full blur-[140px] pointer-events-none animate-glow-pulse" />
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 reveal visible">
            <Badge>Built by WhatsBlade Technologies</Badge>
            <Badge>Partner: Pinkman FX</Badge>
            <Badge>Launching Soon</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6 reveal visible">
            <span className="text-white">The Future of</span>
            <br />
            <span className="text-white">AI</span>{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Trading</span>
            <br />
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline">Intelligence</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-light/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed reveal visible reveal-delay-1">
            Pinkman X is an AI-powered trading platform built to help traders learn, analyze markets, understand news, manage risk, and automate trading strategies from one intelligent workspace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mb-6 reveal visible reveal-delay-2">
            <ScrollLink href="#founding">
              <Button variant="primary" size="lg">Join the Waitlist &rarr;</Button>
            </ScrollLink>
            <ScrollLink href="#preview">
              <Button variant="secondary" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Preview
              </Button>
            </ScrollLink>
          </div>
          <p className="text-xs text-muted italic reveal visible reveal-delay-3">First 10 waitlist members receive 2 months of Pinkman X Pro free at launch.</p>
        </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto reveal visible reveal-delay-2">
          <div className="rounded-2xl bg-dark-800/80 border border-border/60 p-6 sm:p-8 backdrop-blur-sm card-hover glow-gold">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <Check className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Welcome!</h3>
                <p className="text-sm text-muted-light">{msg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-2">
                  <p className="text-lg font-bold text-white">Reserve Your Spot</p>
                </div>
                <input value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
                <input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} type="email" placeholder="Email Address" className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
                <input value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} placeholder="WhatsApp Number" className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={f.experience_level} onChange={(e) => setF({ ...f, experience_level: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300">
                    <option value="">Experience</option>
                    {expOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <select value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300">
                    <option value="">Interest</option>
                    {intOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input type="checkbox" checked={f.marketing_consent} onChange={(e) => setF({ ...f, marketing_consent: e.target.checked })} className="mt-0.5 w-4 h-4 rounded border-border bg-dark-900 text-gold focus:ring-gold/25 transition-all duration-200" />
                  <span className="text-xs text-muted-light group-hover:text-white transition-colors duration-200">I agree to receive product updates, early access offers, and trading insights.</span>
                </label>
                {status === 'error' && <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs animate-fade-in">{msg}</div>}
                <Button variant="primary" size="lg" type="submit" disabled={status === 'loading'} className="w-full">
                  {status === 'loading' ? 'Joining...' : 'Reserve My Spot'}
                </Button>
                <p className="text-[10px] text-muted text-center leading-relaxed">
                  Pinkman X is an educational and trading technology platform. Trading involves risk. AI tools, analysis, strategies, and automation do not guarantee profits. Users remain responsible for their own trading decisions.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
