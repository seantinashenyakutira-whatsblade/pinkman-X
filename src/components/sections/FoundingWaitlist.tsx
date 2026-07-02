import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import VerificationPending from '../ui/VerificationPending'

const expOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
const intOptions = ['Learning', 'AI Analysis', 'Trading Automation', 'Signals', 'Prop Firm Support', 'All Features']

const PENDING_KEY = 'pinkman_pending_email'

export default function FoundingWaitlist() {
  const navigate = useNavigate()
  const [f, setF] = useState({ full_name: '', email: '', whatsapp: '', experience_level: '', interest: '', marketing_consent: false })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    () => localStorage.getItem(PENDING_KEY)
  )

  // Check if ?verified=true on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verified') === 'true') {
      localStorage.removeItem(PENDING_KEY)
      setVerificationEmail(null)
      window.history.replaceState({}, '', window.location.pathname)
      navigate('/blog?welcome=true')
    }
  }, [navigate])

  // Poll for verification if we have a pending email
  useEffect(() => {
    if (!verificationEmail) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-verification?email=${encodeURIComponent(verificationEmail)}`)
        const data = await res.json()
        if (data.verified) {
          clearInterval(interval)
          localStorage.removeItem(PENDING_KEY)
          setVerificationEmail(null)
          navigate('/blog?welcome=true')
        }
      } catch {}
    }, 5000)
    return () => clearInterval(interval)
  }, [verificationEmail, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!f.full_name.trim()) { setStatus('error'); setMsg('Full name is required.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { setStatus('error'); setMsg('Valid email is required.'); return }
    if (!f.whatsapp.trim()) { setStatus('error'); setMsg('WhatsApp number is required.'); return }
    if (!f.experience_level) { setStatus('error'); setMsg('Select your experience level.'); return }
    if (!f.interest) { setStatus('error'); setMsg('Select your main interest.'); return }
    setStatus('loading'); setMsg('')
    try {
      const res = await fetch('/api/initiate-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: f.full_name.trim(),
          email: f.email.trim().toLowerCase(),
          whatsapp: f.whatsapp.trim(),
          experience_level: f.experience_level,
          interest: f.interest,
          marketing_consent: f.marketing_consent,
        }),
      })
      const json = await res.json()
      if (json.error) { setStatus('error'); setMsg(json.error); return }
      setStatus('idle')

      if (json.message === 'already_verified') {
        localStorage.removeItem(PENDING_KEY)
        navigate('/blog?welcome=true')
        return
      }

      if (json.email_sent === false) {
        setStatus('error'); setMsg('Verification email failed to send. Contact hello@pinkman.vip for help.')
        return
      }
      localStorage.setItem(PENDING_KEY, json.email)
      setVerificationEmail(json.email)
    } catch {
      setStatus('error'); setMsg('Network issue. Try again or email hello@pinkman.vip.')
    }
  }

  const handleResend = async () => {
    if (!verificationEmail) return
    await fetch('/api/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: verificationEmail }),
    })
  }

  const handleVerified = () => {
    localStorage.removeItem(PENDING_KEY)
    setVerificationEmail(null)
    navigate('/blog?welcome=true')
  }

  return (
    <section className="relative py-20 px-4" id="founding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 reveal reveal-slide-up">
          <Badge className="mb-4">Founding Traders</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Become a{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline-center">Founding Trader</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-xl mx-auto">Be among the first to access Pinkman X. Founding Traders receive exclusive beta invites, early previews, and launch benefits.</p>
        </div>
        <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-6 sm:p-8 max-w-lg mx-auto card-hover glow-gold reveal reveal-zoom reveal-delay-1">
          {verificationEmail ? (
            <VerificationPending
              email={verificationEmail}
              onResend={handleResend}
              onVerified={handleVerified}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
              <input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
              <input value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} placeholder="WhatsApp Number" className="w-full px-4 py-3 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300" />
              <div className="grid grid-cols-2 gap-3">
                <select value={f.experience_level} onChange={(e) => setF({ ...f, experience_level: e.target.value })} className="w-full px-3 py-3 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300">
                  <option value="">Experience</option>
                  {expOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <select value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })} className="w-full px-3 py-3 rounded-lg bg-black/80 border border-gold/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300">
                  <option value="">Interest</option>
                  {intOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={f.marketing_consent} onChange={(e) => setF({ ...f, marketing_consent: e.target.checked })} className="mt-0.5 w-4 h-4 rounded border-gold/15 bg-black/80 text-gold focus:ring-gold/25 transition-all duration-200" />
                <span className="text-xs text-muted-light group-hover:text-white transition-colors duration-200">I agree to receive product updates, early access offers, and trading insights from Pinkman X.</span>
              </label>
              {status === 'error' && <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs animate-fade-in">{msg}</div>}
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
