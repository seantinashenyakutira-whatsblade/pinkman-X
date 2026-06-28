import Card from '../ui/Card'

const courses = [
  'Introduction to Forex Trading', 'Candlesticks & Market Structure', 'Risk Management', 'Smart Money Concepts',
  'Algorithmic Trading Basics', 'AI in Trading', 'MT5 & Broker Setup', 'Trading Psychology',
]

export default function LearningAcademy() {
  return (
    <section className="relative py-20 px-4" id="academy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Learning Academy</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Learn Before You{' '}
            <span className="bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Automate</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((c, i) => (
            <Card key={c} className="p-5 text-center group">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xs font-black text-gold">0{i + 1}</span>
              </div>
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-sm font-semibold text-white">{c}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
