import Card from '../ui/Card'

export default function AINewsIntelligence() {
  return (
    <section className="relative py-24 px-4" id="news">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">AI News Intelligence</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Smart News. Smarter Trades.</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Our AI continuously scans and filters global forex news, then explains exactly how each event may affect your trading.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Currency Impact Analysis', desc: 'AI breaks down how news events affect major, minor, and exotic currency pairs in real-time.' },
            { title: 'Gold & Commodity Correlation', desc: 'Understand how economic data, geopolitics, and central bank policy move XAU/USD and commodities.' },
            { title: 'Index & Sentiment Tracking', desc: 'Monitor equity indices and market sentiment shifts driven by breaking news and earnings.' },
            { title: 'Synthetic Asset Alerts', desc: 'Get volatility and spread warnings on synthetic indices during high-impact news events.' },
            { title: 'Volatility & Spread Forecasting', desc: 'AI predicts periods of elevated volatility and spread widening before major releases.' },
            { title: 'Risk-Adjusted News Filter', desc: 'Filter news by relevance to your portfolio — only see what matters to your open positions and watchlist.' },
          ].map((item) => (
            <Card key={item.title} glow>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-muted-light leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl bg-gold/5 border border-gold/10 text-center">
          <p className="text-sm text-gold">
            AI News Intelligence filters noise and delivers actionable insights — not just headlines.
          </p>
        </div>
      </div>
    </section>
  )
}
