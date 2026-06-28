import { BarChart3, Newspaper, GraduationCap, BookOpen, TrendingUp, Bot, Zap } from 'lucide-react'
import Card from '../ui/Card'

const tools = [
  { icon: BarChart3, label: 'CHARTS', desc: 'Separate charting platforms for analysis' },
  { icon: Newspaper, label: 'NEWS', desc: 'Multiple news feeds to monitor' },
  { icon: GraduationCap, label: 'LEARNING', desc: 'Courses scattered across sites' },
  { icon: BookOpen, label: 'JOURNALING', desc: 'Manual trade tracking in spreadsheets' },
  { icon: TrendingUp, label: 'SIGNALS', desc: 'Signal groups and copy trading' },
  { icon: Bot, label: 'AUTOMATION', desc: 'Complex bots requiring coding' },
]

export default function Problem() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Traders Are Using{' '}
            <span className="heading-underline bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Too Many Tools</span>
          </h2>
          <p className="text-muted-light/70 max-w-2xl mx-auto text-sm sm:text-base">Juggling separate apps for charts, news, education, signals, journaling, automation, and session planning creates friction, distraction, and inconsistent results.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t, i) => (
            <Card key={t.label} className={`p-5 text-center sm:text-left sm:flex sm:items-start sm:gap-4 card-hover glow-gold reveal reveal-delay-${(i % 6) + 1}`}>
              <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 sm:mt-0.5">
                <t.icon className="w-4 h-4 text-gold" />
              </div>
              <div className="mt-2 sm:mt-0">
                <h3 className="text-sm font-bold text-white mb-0.5">{t.label}</h3>
                <p className="text-xs text-muted-light/70">{t.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center reveal reveal-delay-3">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold/5 border border-gold/15 card-hover glow-gold">
            <Zap className="w-4 h-4 text-gold shrink-0" />
            <span className="text-xs text-gold font-medium">One workspace. One workflow.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
