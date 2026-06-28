import Card from '../ui/Card'

const strategies = [
  { name: 'SMC Scalper Pro', cat: 'SCALPING', color: 'border-l-[#D4AF37]' },
  { name: 'Liquidity Sweep Pro', cat: 'INTRADAY', color: 'border-l-[#22c55e]' },
  { name: 'Gold Momentum AI', cat: 'XAU/USD', color: 'border-l-[#f59e0b]' },
  { name: 'London Open Sniper', cat: 'SESSION', color: 'border-l-[#06b6d4]' },
  { name: 'Fair Value Gap Trader', cat: 'SMC', color: 'border-l-[#a855f7]' },
  { name: 'Order Block Master', cat: 'SMC', color: 'border-l-[#ec4899]' },
  { name: 'Boom & Crash Hunter', cat: 'SYNTHETICS', color: 'border-l-[#ef4444]' },
  { name: 'Prop Firm Guardian', cat: 'FUNDED', color: 'border-l-[#14b8a6]' },
  { name: 'Multi-TF Trend AI', cat: 'SWING', color: 'border-l-[#3b82f6]' },
  { name: 'News Risk Filter', cat: 'RISK', color: 'border-l-[#f97316]' },
]

interface StrategyProps { onToast: (m: string) => void }

function MiniChart() {
  return (
    <svg className="w-full h-8" viewBox="0 0 120 28" fill="none">
      <path d="M0 20 Q10 22 20 18 Q30 14 40 16 Q50 18 60 10 Q70 2 80 6 Q90 10 100 4 Q110 -2 120 0" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M0 20 Q10 22 20 18 Q30 14 40 16 Q50 18 60 10 Q70 2 80 6 Q90 10 100 4 Q110 -2 120 0" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" fill="url(#goldFill)" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#D4AF37" stopOpacity="0" /><stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient>
        <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient>
      </defs>
    </svg>
  )
}

export default function StrategyLibrary({ onToast }: StrategyProps) {
  return (
    <section className="relative py-20 px-4" id="strategies">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Strategy Library</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            AI-Powered Strategies{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Built for Every Trader</span>
          </h2>
          <p className="text-muted-light/70 text-sm">Access to strategies will depend on subscription plan.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {strategies.map((s) => (
            <Card key={s.name} className={`p-4 border-l-2 ${s.color}`} onClick={() => onToast('This strategy will be available during beta.')}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-wider text-gold uppercase">{s.cat}</span>
                <span className="text-[10px] text-muted font-mono">v1.0</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{s.name}</h3>
              <MiniChart />
              <div className="mt-2 flex items-center gap-1">
                <svg className="w-3 h-3 text-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span className="text-[10px] text-gold">AI-powered</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
