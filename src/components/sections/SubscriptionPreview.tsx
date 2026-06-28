import Card from '../ui/Card'
import Button from '../ui/Button'
import ScrollLink from '../ui/ScrollLink'

const plans = [
  {
    name: 'Explorer',
    price: 'Free',
    desc: 'Get started with core trading tools.',
    features: ['Basic chart analysis', '2 courses', 'News feed access', 'Community access'],
    cta: 'Join Free',
    popular: false,
  },
  {
    name: 'Trader',
    price: '$10',
    period: '/month',
    desc: 'For active traders who want more.',
    features: ['Full AI chart analysis', 'All courses', 'AI news intelligence', 'Strategy library (Trader)', 'Trade journal'],
    cta: 'Join Waitlist',
    popular: true,
  },
  {
    name: 'Pro',
    price: '$25',
    period: '/month',
    desc: 'Professional-grade trading toolkit.',
    features: ['Everything in Trader', 'All strategies (incl. Pro)', 'MT5 automation', 'Risk management suite', 'Session planner', 'Priority support'],
    cta: 'Join Waitlist',
    popular: false,
  },
  {
    name: 'Elite',
    price: '$50',
    period: '/month',
    desc: 'Maximum edge. Premium access.',
    features: ['Everything in Pro', 'Elite-only strategies', 'API access', 'Dedicated account manager', 'Beta feature access', 'Founder feedback calls'],
    cta: 'Join Waitlist',
    popular: false,
  },
]

export default function SubscriptionPreview() {
  return (
    <section className="relative py-24 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Choose Your Plan</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Start free. Upgrade as you grow. All plans include core AI intelligence features.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <Card key={p.name} glow={p.popular} className={`flex flex-col ${p.popular ? 'border-gold/30 relative' : ''}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-dark-950 text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{p.price}</span>
                  {p.period && <span className="text-sm text-muted">{p.period}</span>}
                </div>
                <p className="text-sm text-muted-light mt-2">{p.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-light">
                    <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <ScrollLink href="#waitlist">
                <Button variant={p.popular ? 'primary' : 'secondary'} className="w-full">{p.cta}</Button>
              </ScrollLink>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Pricing may change before launch based on beta feedback.
        </p>
      </div>
    </section>
  )
}
