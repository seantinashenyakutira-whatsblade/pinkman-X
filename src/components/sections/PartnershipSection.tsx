import Card from '../ui/Card'

export default function PartnershipSection() {
  return (
    <section className="relative py-24 px-4" id="partners">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Partnership</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Built by Traders, Powered by AI</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Two forces combining deep technology expertise with real trading experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card glow className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-neon/10 border border-neon/20 flex items-center justify-center">
              <span className="text-2xl font-black text-neon">W</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">WhatsBlade Technologies</h3>
            <p className="text-sm text-muted-light leading-relaxed">
              AI software company building the next generation of intelligent applications including Winlerr, ZedIdeaArena, and Pinkman X. Focused on bringing enterprise-grade AI to every industry.
            </p>
          </Card>

          <Card glow className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <span className="text-2xl font-black text-gold">PF</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Pinkman FX</h3>
            <p className="text-sm text-muted-light leading-relaxed">
              Trading partner providing strategy insight, market experience, educational direction, and real-world feedback. Ensuring Pinkman X is built by traders, for traders.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
