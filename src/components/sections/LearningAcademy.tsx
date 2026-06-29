import { GraduationCap } from 'lucide-react'
import Card from '../ui/Card'

const courses = [
  'Introduction to Forex Trading', 'Candlesticks & Market Structure', 'Risk Management', 'Smart Money Concepts',
  'Algorithmic Trading Basics', 'AI in Trading', 'MT5 & Broker Setup', 'Trading Psychology',
]

const r = ['reveal-tilt', 'reveal-zoom', 'reveal-slide-up', 'reveal-slide-left', 'reveal-slide-right']

export default function LearningAcademy() {
  return (
    <section className="relative py-20 px-4" id="academy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal reveal-slide-up">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Learning Academy</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Learn Before You{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline">Automate</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {courses.map((c, i) => (
            <Card key={c} className={`p-5 text-center card-hover glow-gold reveal ${r[i % 5]} reveal-delay-${(i % 5) + 1}`}>
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-xs font-black text-gold">0{i + 1}</span>
              </div>
              <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-sm font-semibold text-white">{c}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
