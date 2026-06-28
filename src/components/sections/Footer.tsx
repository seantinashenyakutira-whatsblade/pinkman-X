export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <img src="/pinkmanx-logo.jpeg" alt="Pinkman X" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-bold text-white text-sm">Pinkman X</span>
          </div>
          <p className="text-[10px] text-muted tracking-widest uppercase">AI Trading Intelligence</p>
        </div>
        <div className="pt-6 border-t border-border/20 space-y-3">
          <p className="text-[10px] text-muted leading-relaxed text-center">
            Pinkman X is an educational and trading technology platform. Trading involves substantial risk of loss. AI tools, analysis, strategies, and automation do not guarantee profits. Past performance is not indicative of future results. Users remain fully responsible for their own trading decisions. Never trade with money you cannot afford to lose.
          </p>
          <p className="text-[10px] text-muted text-center">&copy; {new Date().getFullYear()} WhatsBlade Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
