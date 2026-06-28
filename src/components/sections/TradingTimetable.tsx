import Card from '../ui/Card'

const sessions = [
  {
    name: 'Asian Session',
    time: '00:00 – 09:00 GMT',
    assets: 'JPY, AUD, NZD, Gold',
    desc: 'Lower volatility, range-bound movements. Ideal for breakout preparation.',
    color: 'border-l-cyan',
  },
  {
    name: 'London Session',
    time: '07:00 – 16:00 GMT',
    assets: 'EUR, GBP, CHF, Gold',
    desc: 'Highest liquidity session. Major trends often begin here.',
    color: 'border-l-neon',
  },
  {
    name: 'New York Session',
    time: '12:00 – 21:00 GMT',
    assets: 'USD, CAD, Indices, Oil',
    desc: 'High volatility with US economic data releases.',
    color: 'border-l-gold',
  },
  {
    name: 'London / New York Overlap',
    time: '12:00 – 16:00 GMT',
    assets: 'All Majors, Gold, Indices',
    desc: 'Peak market activity — highest volume and volatility window.',
    color: 'border-l-cyan',
  },
  {
    name: 'News Blackout Windows',
    time: 'Varies',
    assets: 'All Assets',
    desc: 'Avoid trading 30 min before and after major economic releases.',
    color: 'border-l-red-500',
  },
  {
    name: 'Personal Trading Routine',
    time: 'Custom',
    assets: 'Your Markets',
    desc: 'Build and save your personalized daily trading schedule.',
    color: 'border-l-accent-2',
  },
]

export default function TradingTimetable() {
  return (
    <section className="relative py-24 px-4" id="timetable">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Trading Timetable</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Trade the Right Sessions</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Know exactly when to trade each asset with session analysis, overlap windows, and personalized scheduling.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {sessions.map((s) => (
            <Card key={s.name} className={`border-l-4 ${s.color}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                <span className="text-xs font-mono text-muted bg-dark-700 px-2 py-1 rounded">{s.time}</span>
              </div>
              <p className="text-sm text-muted-light mb-2">{s.desc}</p>
              <p className="text-xs text-neon font-mono">{s.assets}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
