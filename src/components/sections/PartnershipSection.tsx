import Card from '../ui/Card'

export default function PartnershipSection() {
  return (
    <section className="relative py-20 px-4" id="partners">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Partnership</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Built by Technology.{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">Guided by Trading Experience.</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-xl mx-auto">A partnership combining African-built AI engineering with real-world trading expertise.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-6 text-center card-hover reveal">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3L5.25 9l4.5 6h9l4.5-6-4.5-6h-9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6" /></svg>
            </div>
            <p className="text-[10px] text-gold font-semibold tracking-widest uppercase mb-2">Technology Partner</p>
            <h3 className="text-lg font-bold text-white mb-2">WhatsBlade Technologies</h3>
            <p className="text-sm text-muted-light/70 leading-relaxed">AI software company building the next generation of intelligent applications including Winlerr, ZedIdeaArena, and Pinkman X.</p>
          </Card>
          <Card className="p-6 text-center card-hover reveal reveal-delay-2">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
