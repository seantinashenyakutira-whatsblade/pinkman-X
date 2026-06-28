import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from './ui/Button'
import ScrollLink from './ui/ScrollLink'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-950/85 backdrop-blur-xl border-b border-border/30' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img src="/pinkmanx-logo.jpeg" alt="Pinkman X" className="w-full h-full object-cover scale-125" />
          </div>
          <span className="font-bold text-white text-sm">Pinkman X</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {['Features', 'Strategies', 'Pricing', 'FAQ'].map((l) => (
            <ScrollLink key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-light hover:text-white transition-colors">
              {l}
            </ScrollLink>
          ))}
          <ScrollLink href="#waitlist">
            <Button variant="primary" size="sm">Join Waitlist</Button>
          </ScrollLink>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-muted-light hover:text-white">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="px-4 py-4 bg-dark-900/95 backdrop-blur-xl border-t border-border/30 space-y-3">
          {['Features', 'Strategies', 'Pricing', 'FAQ'].map((l) => (
            <ScrollLink key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-muted-light hover:text-white py-1" onClick={() => setMenuOpen(false)}>
              {l}
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
