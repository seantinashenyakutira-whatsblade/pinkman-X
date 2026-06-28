import Card from '../ui/Card'

const sessions = [
  { icon: '🌏', time: '00:00–09:00 GMT', name: 'Asian Session', desc: 'Lower volatility, range-bound movements. Ideal for breakout preparation.' },
  { icon: '🇬🇧', time: '07:00–16:00 GMT', name: 'London Session', desc: 'Highest liquidity session. Major trends often begin here.' },
  { icon: '🇺🇸', time: '12:00–21:00 GMT', name: 'New York Session', desc: 'High volatility with US economic data releases.' },
  { icon: '🔄', time: '12:00–16:00 GMT', name: 'London / NY Overlap', desc: 'Peak market activity — highest volume and volatility window.' },
  { icon: '⚠️', time: 'Varies', name: 'News Blackout Windows', desc: 'Avoid trading 30 min before and after major economic releases.' },
  { icon: '📋', time: 'Custom', name: 'Personal Trading Routine', desc: 'Build and save your personalized daily trading schedule.' },
]

export default function TradingTimetable() {
  return (
    <section className="relative py-20 px-4" id="timetable">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Trading Timetable</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Trade With{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Time, Not Emotion</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-2xl mx-auto">Plan your trading around global sessions, news events, and your personal schedule.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((s, i) => (
            <Card key={s.name} className={`p-5 card-hover reveal reveal-delay-${(i % 6) + 1}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                  <p className="text-[10px] text-gold font-mono">{s.time}</p>
                </div>
              </div>
              <p className="text-xs text-muted-light/70">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
