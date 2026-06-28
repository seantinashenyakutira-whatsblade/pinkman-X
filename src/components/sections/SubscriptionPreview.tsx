import Card from '../ui/Card'
import ScrollLink from '../ui/ScrollLink'

const plans = [
  {
    name: 'Explorer', price: 'Free', period: null, popular: false,
    features: ['Basic chart analysis', '2 courses', 'News feed access', 'Community access'],
  },
  {
    name: 'Trader', price: '$10', period: '/month', popular: false,
    features: ['Full AI chart analysis', 'All courses', 'AI news intelligence', 'Strategy library (Trader)', 'Trade journal'],
  },
  {
    name: 'Pro', price: '$25', period: '/month', popular: true,
    features: ['Everything in Trader', 'All strategies (incl. Pro)', 'MT5 automation', 'Risk management suite', 'Session planner', 'Priority support'],
  },
  {
    name: 'Elite', price: '$50', period: '/month', popular: false,
    features: ['Everything in Pro', 'Elite-only strategies', 'API access', 'Dedicated account manager', 'Beta feature access', 'Founder feedback calls'],
  },
]

export default function SubscriptionPreview() {
  return (
    <section className="relative py-20 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Choose Your Level{' '}
            <span className="font-cursive italic font-normal bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">When We Launch</span>
          </h2>
          <p className="text-muted-light/70 text-sm max-w-xl mx-auto">Four tiers — from free exploration to full automation. Founding Traders on the waitlist receive launch benefits.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p, i) => (
            <div key={p.name} className={`card-hover reveal reveal-delay-${(i % 4) + 1}`}>
              <Card highlight={p.popular} className={`p-6 flex flex-col h-full ${p.popular ? 'relative border-gold/40' : ''}`}>
                {p.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold text-dark-950 text-[10px] font-bold rounded-full tracking-wider whitespace-nowrap">
                    MOST LOVED
                  </div>
                )}
                <h3 className="text-base font-bold text-white mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-0.5 mb-5">
                  <span className="text-2xl font-black text-white">{p.price}</span>
                  {p.period && <span className="text-xs text-muted">{p.period}</span>}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ScrollLink href="#founding">
                  <span className={`block w-full text-center py-3 rounded-xl text-sm font-semibold border transition-all duration-300 cursor-pointer ${p.popular ? 'bg-gold text-dark-950 border-gold hover:bg-gold-dark hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]' : 'bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5'}`}>
                    {p.popular ? 'Get Started' : 'Join Waitlist'}
                  </span>
                </ScrollLink>
              </Card>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted mt-5">Pricing may change before launch based on beta feedback.</p>
      </div>
    </section>
  )
}
