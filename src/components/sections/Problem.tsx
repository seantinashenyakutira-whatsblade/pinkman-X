import Card from '../ui/Card'

const tools = [
  { icon: '📊', label: 'CHARTS', desc: 'Separate charting platforms for analysis' },
  { icon: '📰', label: 'NEWS', desc: 'Multiple news feeds to monitor' },
  { icon: '🎓', label: 'LEARNING', desc: 'Courses scattered across sites' },
  { icon: '📝', label: 'JOURNALING', desc: 'Manual trade tracking in spreadsheets' },
  { icon: '📈', label: 'SIGNALS', desc: 'Signal groups and copy trading' },
  { icon: '🤖', label: 'AUTOMATION', desc: 'Complex bots requiring coding' },
]

export default function Problem() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Traders Are Using{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Too Many Tools</span>
          </h2>
          <p className="text-muted-light/70 max-w-2xl mx-auto text-sm sm:text-base">
            Juggling separate apps for charts, news, education, signals, journaling, automation, and session planning creates friction, distraction, and inconsistent results.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Card key={t.label} className="p-5 text-center sm:text-left sm:flex sm:items-start sm:gap-4">
              <div className="text-2xl mb-2 sm:mb-0 sm:mt-0.5">{t.icon}</div>
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">{t.label}</h3>
                <p className="text-xs text-muted-light/70">{t.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold/5 border border-gold/15">
            <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="text-xs text-gold font-medium">One workspace. One workflow.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
