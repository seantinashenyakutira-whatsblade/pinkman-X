import { useState, type FormEvent } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { submitWaitlist } from '../../lib/supabase'

const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
const interestOptions = ['Learning', 'AI Analysis', 'Trading Automation', 'Signals', 'Prop Firm Support', 'All Features']

interface WaitlistFormProps {
  onSuccess?: () => void
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    whatsapp: '',
    experience_level: '',
    interest: '',
    marketing_consent: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validate = () => {
    if (!form.full_name.trim()) return 'Full name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required.'
    if (!form.whatsapp.trim()) return 'WhatsApp number is required.'
    if (!form.experience_level) return 'Please select your experience level.'
    if (!form.interest) return 'Please select your main interest.'
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setStatus('error')
      setMessage(err)
      return
    }

    setStatus('loading')
    setMessage('')

    const result = await submitWaitlist({
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp.trim(),
      experience_level: form.experience_level,
      interest: form.interest,
      marketing_consent: form.marketing_consent,
    })

    if (result.error) {
      setStatus('error')
      setMessage(result.error.message)
    } else {
      setStatus('success')
      setMessage(`You're on the list, ${form.full_name.split(' ')[0]}! We'll be in touch.`)
      onSuccess?.()
    }
  }

  return (
    <section className="relative py-24 px-4" id="waitlist">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Get Early Access</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Join the Pinkman X Waitlist</h2>
          <p className="text-muted-light">
            Be first to access Pinkman X. Get exclusive beta invitations, early previews, and launch benefits.
          </p>
        </div>

        <Card glow className="p-6 sm:p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to Pinkman X!</h3>
              <p className="text-muted-light">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-muted-light mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-border text-white text-sm placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-light mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-border text-white text-sm placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-light mb-1.5">WhatsApp Number *</label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-border text-white text-sm placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all"
                  placeholder="+263 7XX XXX XXX"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-muted-light mb-1.5">Trading Experience *</label>
                  <select
                    value={form.experience_level}
                    onChange={(e) => setForm({ ...form, experience_level: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all appearance-none"
                  >
                    <option value="">Select experience</option>
                    {experienceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-light mb-1.5">Main Interest *</label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon/30 focus:border-neon/50 transition-all appearance-none"
                  >
                    <option value="">Select interest</option>
                    {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketing_consent}
                  onChange={(e) => setForm({ ...form, marketing_consent: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-border bg-dark-900 text-neon focus:ring-neon/30"
                />
                <span className="text-sm text-muted-light">
                  I agree to receive product updates, early access offers, and trading insights from Pinkman X.
                </span>
              </label>

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm">
                  {message}
                </div>
              )}

              <Button variant="primary" size="lg" type="submit" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
