import Card from '../ui/Card'
import Badge from '../ui/Badge'

const strategies = [
  { name: 'SMC Scalper Pro', category: 'Scalping', access: 'Pro', locked: true },
  { name: 'Liquidity Sweep Hunter', category: 'SMC', access: 'Trader', locked: true },
  { name: 'Gold Momentum AI', category: 'Commodities', access: 'Elite', locked: true },
  { name: 'London Open Sniper', category: 'Session', access: 'Trader', locked: true },
  { name: 'Fair Value Gap Trader', category: 'SMC', access: 'Explorer', locked: false },
  { name: 'Order Block Master', category: 'SMC', access: 'Pro', locked: true },
  { name: 'Boom & Crash Spike Hunter', category: 'Synthetics', access: 'Elite', locked: true },
  { name: 'Prop Firm Guardian', category: 'Risk', access: 'Pro', locked: true },
  { name: 'Multi-Timeframe Trend AI', category: 'Trend', access: 'Explorer', locked: false },
  { name: 'News Risk Filter', category: 'Risk', access: 'Trader', locked: true },
]

interface StrategyLibraryProps {
  onToast: (msg: string) => void
}

export default function StrategyLibrary({ onToast }: StrategyLibraryProps) {
  return (
    <section className="relative py-24 px-4" id="strategies">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Strategy Library</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">AI-Powered Trading Strategies</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Prebuilt strategies designed by traders and optimized by AI. Ready for backtesting, paper trading, and future MT5 automation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {strategies.map((s) => (
            <Card
              key={s.name}
              glow
              onClick={() => {
                if (s.locked) {
                  onToast('This strategy will be available during beta.')
                } else {
                  onToast('Free strategy — available at launch.')
                }
              }}
              className="group"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge variant={s.access === 'Elite' ? 'gold' : s.access === 'Pro' ? 'amber' : 'gold'}>
                  {s.access}
                </Badge>
                <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-muted-light border border-border">
                  {s.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.name}</h3>
              <div className="flex items-center gap-2 mt-4">
                {s.locked ? (
                  <>
                    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="text-xs text-muted">Coming Soon</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                    <span className="text-xs text-gold">Free at Launch</span>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
