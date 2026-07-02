import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const STORAGE_KEY = 'pinkman_followed'

const platforms = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/pinkmanx',
    hover: 'hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@pinkmanx',
    hover: 'hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@pinkmanx',
    hover: 'hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/pinkmanx',
    hover: 'hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/pinkmanx',
    hover: 'hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp Channel',
    url: 'https://wa.me/1234567890',
    hover: 'hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.57-.075-.2-.725-1.75-.994-2.47-.27-.72-.54-.62-.74-.62-.2 0-.43.03-.66.03-.23 0-.6.086-.915.43-.315.344-1.2 1.173-1.2 2.86 0 1.688 1.23 3.322 1.4 3.55.17.23 2.42 3.697 5.87 4.523 2.81.675 3.39.54 4 .34.5-.165 1.66-.682 1.89-1.345.23-.663.23-1.23.174-1.345-.056-.115-.207-.18-.465-.293z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.68 4.11 1.82 5.72L.68 23.32c-.07.26.16.5.42.42l5.6-1.14A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm-1.4 18.36c-1.28 0-2.54-.33-3.65-.96l-.26-.15-4.08.83.87-3.98-.17-.27a7.94 7.94 0 01-1.22-4.23c0-4.4 3.58-7.98 7.98-7.98s7.98 3.58 7.98 7.98-3.58 7.98-7.98 7.98z" />
      </svg>
    ),
  },
]

export default function SocialFollow() {
  const navigate = useNavigate()
  const [followed, setFollowed] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [animating, setAnimating] = useState(false)

  // Clear pending email on mount — user is already verified
  useEffect(() => {
    localStorage.removeItem('pinkman_pending_email')
  }, [])

  const count = followed.length
  const minMet = count >= 2

  const markFollowed = useCallback((name: string) => {
    setFollowed(prev => {
      if (prev.includes(name)) return prev
      const next = [...prev, name]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const handleClick = (p: typeof platforms[0]) => {
    markFollowed(p.name)
    window.open(p.url, '_blank', 'noopener')
  }

  const handleComplete = () => {
    setAnimating(true)
    setTimeout(() => navigate('/blog?welcome=true'), 800)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
          <Badge className="mb-3">Step 2 of 2</Badge>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Follow Us</span>
          </h1>
          <p className="text-sm text-muted-light/70 max-w-sm mx-auto">
            Follow at least <span className="text-gold font-semibold">2</span> of our social channels to complete your registration.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${minMet ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-gold/10 border-gold/30 text-gold'}`}>
            {minMet ? <Check className="w-5 h-5" /> : count}
          </div>
          <div className={`h-0.5 w-12 rounded transition-all duration-500 ${minMet ? 'bg-green-500/50' : 'bg-gold/20'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${count >= 2 ? 'bg-green-500/10 border-green-500/30 text-green-400' : count >= 1 ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-black/40 border-gold/10 text-muted'}`}>
            {count >= 2 ? <Check className="w-5 h-5" /> : '2'}
          </div>
        </div>

        {/* Social grid */}
        <div className="rounded-2xl bg-black/60 backdrop-blur-xl border border-gold/10 p-6 sm:p-8 card-hover glow-gold mb-6">
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((p) => {
              const isFollowed = followed.includes(p.name)
              return (
                <button
                  key={p.name}
                  onClick={() => handleClick(p)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 group ${
                    isFollowed
                      ? 'bg-green-500/5 border-green-500/30 text-white'
                      : 'bg-black/40 border-gold/10 text-muted-light hover:text-white hover:border-gold/30'
                  } ${p.hover}`}
                >
                  {isFollowed && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                  )}
                  <div className={`transition-transform duration-300 group-hover:scale-110 ${isFollowed ? 'text-green-400' : ''}`}>
                    {p.icon}
                  </div>
                  <span className={`text-[10px] font-semibold text-center leading-tight ${isFollowed ? 'text-green-400' : ''}`}>
                    {isFollowed ? 'Followed!' : p.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action */}
        <div className={`transition-all duration-500 ${minMet ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2 pointer-events-none'}`}>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleComplete}
            disabled={!minMet || animating}
          >
            {animating ? (
              'Getting your access ready...'
            ) : (
              <><ArrowRight className="w-5 h-5 mr-2" /> Complete Registration</>
            )}
          </Button>
          {!minMet && (
            <p className="text-xs text-muted text-center mt-3">
              Follow at least 2 channels to continue
            </p>
          )}
        </div>

        <p className="text-[10px] text-muted text-center mt-6 leading-relaxed">
          Click each button to open our profile in a new tab. Follow/Subscribe, then return here.
        </p>
      </div>
    </div>
  )
}
