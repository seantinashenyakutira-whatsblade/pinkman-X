import Card from '../ui/Card'

export default function AINewsIntelligence() {
  const news = [
    { time: 'Today 08:30', title: 'US CPI m/m', impact: 'HIGH', label: 'USD, Gold, Indices' },
    { time: 'Today 10:00', title: 'BoE Gov Speech', impact: 'MEDIUM', label: 'GBP Pairs' },
    { time: 'Today 15:30', title: 'Crude Oil Inventories', impact: 'HIGH', label: 'Oil, USD/CAD' },
    { time: 'Tomorrow 19:00', title: 'FOMC Minutes', impact: 'HIGH', label: 'USD, Gold, Indices' },
  ]

  return (
    <section className="relative py-20 px-4" id="news">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">AI News Intelligence</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Understand News Before It{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline">Moves the Market</span>
          </h2>
          <p className="text-sm text-muted-light/70 leading-relaxed mb-6">
            Pinkman X filters important forex news and explains how each update could affect currencies, gold, indices, volatility, spreads, and risk. Instead of just showing economic news, the AI tells you what to watch — and when to avoid trading.
          </p>
          <ul className="space-y-3">
            {['AI-classified high / medium / low impact', 'Currency & asset exposure breakdown', 'Volatility and spread risk windows', 'No automated trading recommendations'].map((item, i) => (
              <li key={item} className={`flex items-start gap-3 text-sm text-muted-light/80 reveal reveal-delay-${i + 1}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal reveal-delay-2">
          <Card className="p-5 card-hover glow-gold">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-white tracking-wider uppercase">AI News Feed</span>
              <span className="text-[10px] flex items-center gap-1 text-gold font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="space-y-3">
              {news.map((item, i) => (
                <div key={item.title} className={`flex items-center justify-between py-2 border-b border-border/40 last:border-0 reveal reveal-delay-${i + 1}`}>
                  <div>
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <div className="text-[10px] text-muted mt-0.5">{item.time}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${item.impact === 'HIGH' ? 'bg-red-500/10 text-red-400' : 'bg-amber/10 text-amber'}`}>{item.impact}</span>
                    <div className="text-[9px] text-muted mt-0.5">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
