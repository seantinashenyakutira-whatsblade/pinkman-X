import { useState, type FormEvent } from 'react'
import { useAuth } from '../../lib/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) { setError('Email and password required.'); return }
    setLoading(true)
    const r = await signIn(email, password)
    setLoading(false)
    if (r.error) setError(r.error)
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-8 card-hover glow-gold">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg overflow-hidden">
              <img src="/pinkmanx-logo.jpeg" alt="Pinkman X" className="w-full h-full object-cover scale-125" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            <p className="text-xs text-muted mt-1">Sign in to manage Pinkman X</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="Email"
              className="w-full px-4 py-2.5 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300"
            />
            <input
              value={password} onChange={(e) => setPassword(e.target.value)}
              type="password" placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg bg-black/80 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all duration-300"
            />
            {error && <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs">{error}</div>}
            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-gold to-amber text-dark-950 font-bold text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
