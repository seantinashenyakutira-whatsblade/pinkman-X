import { BarChart3, GraduationCap, Newspaper, Brain, Clock, Link2, Bot, BookOpen, Shield } from 'lucide-react'
import Card from '../ui/Card'

const features = [
  { icon: BarChart3, title: 'AI Chart Analysis', desc: 'Let AI analyze price action, patterns, and market structure across any timeframe.' },
  { icon: GraduationCap, title: 'Beginner to Advanced Courses', desc: 'Structured education from fundamentals to advanced algorithmic trading concepts.' },
  { icon: Newspaper, title: 'AI Filtered Forex News', desc: 'AI filters and explains how news affects currencies, gold, indices, and volatility.' },
  { icon: Brain, title: 'Smart Money Education', desc: 'Learn SMC, order flow, supply & demand, and institutional trading concepts.' },
  { icon: Clock, title: 'Sessions & Timetable', desc: 'Session times, overlaps, news blackouts, and personal routine planning.' },
  { icon: Link2, title: 'Broker & MT5 Integration', desc: 'Connect your MT5 terminal for automated strategy execution and risk controls.' },
  { icon: Bot, title: 'Prebuilt AI Strategies', desc: 'Ready-to-use trading strategies powered by AI and market-proven logic.' },
  { icon: BookOpen, title: 'Journal & Analytics', desc: 'AI-powered trade journal that analyzes your performance and identifies patterns.' },
  { icon: Shield, title: 'Risk Management Tools', desc: 'Position sizing, risk-reward calculators, and portfolio-level exposure tracking.' },
]

const r = ['reveal-tilt', 'reveal-zoom', 'reveal-slide-up', 'reveal-slide-left', 'reveal-slide-right']

export default function Solution() {
  return (
    <section className="relative py-20 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal reveal-slide-up">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">The Solution</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            One Platform.{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline">Every Trading Workflow.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Card key={f.title} className={`p-5 card-hover glow-gold reveal ${r[i % 5]} reveal-delay-${(i % 5) + 1}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-4 h-4 text-gold" />
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
