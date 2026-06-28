import Card from '../ui/Card'

export default function Automation() {
  return (
    <section className="relative py-20 px-4" id="automation">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Automation</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Automation When{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">You're Ready</span>
          </h2>
          <p className="text-sm text-muted-light/70 leading-relaxed mb-6">
            Pinkman X will support broker connection and MT5 automation for users who want to configure AI-powered strategies, risk settings, timeframes, and trading modes.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Scalping', 'Day Trading', 'Swing Trading', 'Multi-Timeframe'].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-gold/5 text-gold border border-gold/15 uppercase tracking-wider card-hover">{t}</span>
            ))}
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber/5 border border-amber/15">
            <svg className="w-4 h-4 text-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <p className="text-xs text-amber/80">Automation is optional and should be tested on demo first.</p>
          </div>
        </div>
        <div className="reveal reveal-delay-2">
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-white">MT5 Live Bridge</p>
                <p className="text-[10px] text-muted">AI Strategy Runner • v1.0</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gold/10 text-gold border border-gold/20 animate-glow-pulse">ACTIVE</span>
            </div>
            <div className="h-24 mb-4 relative">
              <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path d="M0 50 Q10 48 20 45 Q30 42 40 35 Q50 28 60 30 Q70 32 80 25 Q90 18 100 20 Q110 22 120 15 Q130 8 140 12 Q150 16 160 10 Q170 4 180 8 Q190 12 200 5" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M0 50 Q10 48 20 45 Q30 42 40 35 Q50 28 60 30 Q70 32 80 25 Q90 18 100 20 Q110 22 120 15 Q130 8 140 12 Q150 16 160 10 Q170 4 180 8 Q190 12 200 5 L200 60 L0 60 Z" fill="url(#chartAutoUp)" opacity="0.15" />
                <defs><linearGradient id="chartAutoUp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient></defs>
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ label: 'Equity', val: '$12,450' }, { label: 'Drawdown', val: '3.2%' }, { label: 'Win Rate', val: '67%' }].map((s) => (
                <div key={s.label} className="py-2 rounded-lg bg-dark-900/50 card-hover">
                  <p className="text-xs font-bold text-white">{s.val}</p>
                  <p className="text-[9px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
