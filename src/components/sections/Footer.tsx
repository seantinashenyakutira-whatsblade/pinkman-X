import ScrollLink from '../ui/ScrollLink'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Strategies', href: '#strategies' },
  { label: 'Academy', href: '#academy' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center">
                <span className="text-sm font-black text-neon">Px</span>
              </div>
              <span className="font-bold text-white">Pinkman X</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              AI Trading Intelligence Platform<br />
              Powered by WhatsBlade Technologies<br />
              In partnership with Pinkman FX
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <ScrollLink href={l.href} className="text-sm text-muted hover:text-neon transition-colors">
                    {l.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted">Twitter / X — Coming Soon</span></li>
              <li><span className="text-sm text-muted">Discord — Coming Soon</span></li>
              <li><span className="text-sm text-muted">YouTube — Coming Soon</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 space-y-4">
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-muted-light">Risk Disclaimer:</strong> Pinkman X is an educational and trading technology platform. Trading involves substantial risk of loss. AI tools, analysis, strategies, and automation do not guarantee profits. Past performance is not indicative of future results. Users remain fully responsible for their own trading decisions. Never trade with money you cannot afford to lose.
          </p>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Pinkman X &mdash; A WhatsBlade Technologies Product. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
