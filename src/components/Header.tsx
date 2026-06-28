import { useState, useEffect } from 'react'
import Button from './ui/Button'
import ScrollLink from './ui/ScrollLink'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label: 'Features', href: '#features' },
    { label: 'Strategies', href: '#strategies' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-950/80 backdrop-blur-xl border-b border-border/30' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center">
            <span className="text-sm font-black text-neon">Px</span>
          </div>
          <span className="font-bold text-white text-sm sm:text-base">Pinkman X</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <ScrollLink key={n.label} href={n.href} className="text-sm text-muted-light hover:text-white transition-colors">
              {n.label}
            </ScrollLink>
          ))}
          <ScrollLink href="#waitlist">
            <Button variant="primary" size="sm">Join Waitlist</Button>
          </ScrollLink>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-muted-light hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="px-4 py-4 bg-dark-900/95 backdrop-blur-xl border-t border-border/30 space-y-3">
          {nav.map((n) => (
            <ScrollLink key={n.label} href={n.href} className="block text-sm text-muted-light hover:text-white transition-colors py-1" onClick={() => setMenuOpen(false)}>
              {n.label}
            </ScrollLink>
          ))}
          <ScrollLink href="#waitlist">
            <Button variant="primary" size="sm" className="w-full mt-2">Join Waitlist</Button>
          </ScrollLink>
        </div>
      </div>
    </header>
  )
}
