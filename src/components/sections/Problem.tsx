import Card from '../ui/Card'

export default function Problem() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Traders Are Using Too Many Tools</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Juggling separate apps for charts, news, education, signals, journaling, automation, and session planning creates friction, distraction, and inconsistent results.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Card key={tool.label} className="text-center py-6">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <p className="text-sm text-muted-light">{tool.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-sm font-medium">Most traders use 5+ tools daily — Pinkman X replaces them all.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const tools = [
  { icon: '📊', label: 'Charting Platforms' },
  { icon: '📰', label: 'News Feeds' },
  { icon: '🎓', label: 'Education Sites' },
  { icon: '📈', label: 'Signal Services' },
  { icon: '📝', label: 'Trade Journals' },
  { icon: '🤖', label: 'Automation Tools' },
  { icon: '⏰', label: 'Session Timers' },
  { icon: '📋', label: 'Strategy Managers' },
]
