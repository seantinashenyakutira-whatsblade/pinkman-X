import { useState, useEffect } from 'react'
import { Mail, RefreshCw, Check } from 'lucide-react'
import Button from './Button'

interface Props {
  email: string
  onResend: () => Promise<void>
  onVerified: () => void
}

export default function VerificationPending({ email, onResend, onVerified }: Props) {
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  // Check for verified param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verified') === 'true') {
      onVerified()
    }
  }, [onVerified])

  const handleResend = async () => {
    setResending(true)
    await onResend()
    setResending(false)
    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }

  return (
    <div className="text-center py-8 animate-scale-in">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
        <Mail className="w-8 h-8 text-gold" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
      <p className="text-sm text-muted-light mb-1">
        We sent a verification link to
      </p>
      <p className="text-sm text-gold font-semibold mb-5 break-all">{email}</p>
      <p className="text-xs text-muted mb-6">
        Click the link in the email to verify your account and access the blog.
      </p>

      <Button variant="primary" size="md" onClick={handleResend} disabled={resending || resent} className="mx-auto">
        {resending ? (
          'Sending...'
        ) : resent ? (
          <><Check className="w-4 h-4 mr-1.5 inline" /> Sent!</>
        ) : (
          <><RefreshCw className="w-4 h-4 mr-1.5 inline" /> Resend Email</>
        )}
      </Button>

      {resent && (
        <p className="text-xs text-gold mt-3 animate-fade-in">
          Verification email resent. Check your inbox (and spam).
        </p>
      )}

      <div className="mt-8 pt-4 border-t border-gold/10">
        <p className="text-xs text-muted-light">
          Didn't receive it?{' '}
          <button onClick={handleResend} className="text-gold underline hover:text-amber transition-colors">
            Resend
          </button>
          {' '}or email{' '}
          <a href="mailto:hello@pinkman.vip" className="text-gold underline">hello@pinkman.vip</a>
        </p>
      </div>
    </div>
  )
}
