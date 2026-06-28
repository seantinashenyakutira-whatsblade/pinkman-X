import { useState, type FormEvent } from 'react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { submitWaitlist } from '../../lib/supabase'

const expOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
const intOptions = ['Learning', 'AI Analysis', 'Trading Automation', 'Signals', 'Prop Firm Support', 'All Features']

export default function FoundingWaitlist() {
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
    if (r.error) { setStatus('error'); setMsg(r.error.message); return }
    setStatus('success'); setMsg(`You're on the list, ${f.full_name.split(' ')[0]}! We'll be in touch.`)
  }

  return (
    <section className="relative py-20 px-4" id="founding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge className="mb-4">Founding Traders</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Become a{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Founding Trader</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-xl mx-auto">Be among the first to access Pinkman X. Founding Traders receive exclusive beta invites, early previews, and launch benefits.</p>
        </div>
        <div className="rounded-2xl bg-dark-800/80 border border-border/60 p-6 sm:p-8 max-w-lg mx-auto">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Welcome to Pinkman X!</h3>
              <p className="text-sm text-muted-light">{msg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all" />
              <input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all" />
              <input value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} placeholder="WhatsApp Number" className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-border text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all" />
              <div className="grid grid-cols-2 gap-3">
                <select value={f.experience_level} onChange={(e) => setF({ ...f, experience_level: e.target.value })} className="w-full px-3 py-3 rounded-lg bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40">
                  <option value="">Experience</option>
                  {expOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })} className="w-full px-3 py-3 rounded-lg bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40">
                  <option value="">Interest</option>
                  {intOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={f.marketing_consent} onChange={(e) => setF({ ...f, marketing_consent: e.target.checked })} className="mt-0.5 w-4 h-4 rounded border-border bg-dark-900 text-gold focus:ring-gold/25" />
                <span className="text-xs text-muted-light">I agree to receive product updates, early access offers, and trading insights from Pinkman X.</span>
              </label>
              {status === 'error' && <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs">{msg}</div>}
              <Button variant="primary" size="lg" type="submit" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? 'Reserving...' : 'Reserve My Spot'}
              </Button>
              <p className="text-xs text-muted text-center italic">First 10 waitlist members receive 2 months of Pinkman X Pro free at launch.</p>
              <p className="text-[10px] text-muted text-center leading-relaxed">
                Pinkman X is an educational and trading technology platform. Trading involves risk. AI tools, analysis, strategies, and automation do not guarantee profits. Users remain responsible for their own trading decisions.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
