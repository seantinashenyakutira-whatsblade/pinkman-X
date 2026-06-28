import Card from '../ui/Card'

const features = [
  { icon: '📊', title: 'AI Chart Analysis', desc: 'Let AI analyze price action, patterns, and market structure across any timeframe.' },
  { icon: '🎓', title: 'Beginner to Advanced Courses', desc: 'Structured education from fundamentals to advanced algorithmic trading concepts.' },
  { icon: '📰', title: 'AI Filtered Forex News', desc: 'AI filters and explains how news affects currencies, gold, indices, and volatility.' },
  { icon: '🧠', title: 'Smart Money Education', desc: 'Learn SMC, order flow, supply & demand, and institutional trading concepts.' },
  { icon: '⏰', title: 'Sessions & Timetable', desc: 'Session times, overlaps, news blackouts, and personal routine planning.' },
  { icon: '🔗', title: 'Broker & MT5 Integration', desc: 'Connect your MT5 terminal for automated strategy execution and risk controls.' },
  { icon: '🤖', title: 'Prebuilt AI Strategies', desc: 'Ready-to-use trading strategies powered by AI and market-proven logic.' },
  { icon: '📝', title: 'Journal & Analytics', desc: 'AI-powered trade journal that analyzes your performance and identifies patterns.' },
  { icon: '🛡️', title: 'Risk Management Tools', desc: 'Position sizing, risk-reward calculators, and portfolio-level exposure tracking.' },
]

export default function Solution() {
  return (
    <section className="relative py-20 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">The Solution</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Every Trading Workflow.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-sm">{f.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{f.title}</h3>
              </div>
              <p className="text-xs text-muted-light/70 leading-relaxed pl-12">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
