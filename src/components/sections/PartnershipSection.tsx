import { Code2, TrendingUp } from 'lucide-react'
import Card from '../ui/Card'

export default function PartnershipSection() {
  return (
    <section className="relative py-20 px-4" id="partners">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal reveal-slide-up">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Partnership</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Built by Technology.{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent heading-underline">Guided by Trading Experience.</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-xl mx-auto">A partnership combining African-built AI engineering with real-world trading expertise.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-6 text-center card-hover glow-gold reveal reveal-tilt reveal-delay-1">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Code2 className="w-7 h-7 text-gold" />
            </div>
            <p className="text-[10px] text-gold font-semibold tracking-widest uppercase mb-2">Technology Partner</p>
            <h3 className="text-lg font-bold text-white mb-2">WhatsBlade Technologies</h3>
            <p className="text-sm text-muted-light/70 leading-relaxed">AI software company building the next generation of intelligent applications including Winlerr, ZedIdeaArena, and Pinkman X.</p>
          </Card>
          <Card className="p-6 text-center card-hover glow-gold reveal reveal-zoom reveal-delay-2">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-amber" />
            </div>
            <p className="text-[10px] text-amber font-semibold tracking-widest uppercase mb-2">Trading Partner</p>
            <h3 className="text-lg font-bold text-white mb-2">Pinkman FX</h3>
            <p className="text-sm text-muted-light/70 leading-relaxed">Trading partner providing strategy insight, market experience, educational direction, and real-world feedback.</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
