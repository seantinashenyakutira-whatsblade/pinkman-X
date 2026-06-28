import Card from '../ui/Card'

const courses = [
  { title: 'Introduction to Forex Trading', lessons: '6 lessons', icon: '🌍' },
  { title: 'Candlesticks & Market Structure', lessons: '8 lessons', icon: '🕯️' },
  { title: 'Risk Management', lessons: '5 lessons', icon: '🛡️' },
  { title: 'Smart Money Concepts', lessons: '10 lessons', icon: '🧠' },
  { title: 'Algorithmic Trading Basics', lessons: '7 lessons', icon: '🤖' },
  { title: 'AI in Trading', lessons: '6 lessons', icon: '⚡' },
  { title: 'MT5 & Broker Setup', lessons: '4 lessons', icon: '⚙️' },
  { title: 'Trading Psychology', lessons: '5 lessons', icon: '🎯' },
]

export default function LearningAcademy() {
  return (
    <section className="relative py-24 px-4" id="academy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Learning Academy</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Master the Markets</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Structured trading education from fundamentals to advanced AI strategies.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c) => (
            <Card key={c.title} glow className="group text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-xs text-muted">{c.lessons}</p>
              <div className="mt-4 w-full h-1.5 rounded-full bg-dark-700 overflow-hidden">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-neon to-cyan group-hover:w-full transition-all duration-700" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
