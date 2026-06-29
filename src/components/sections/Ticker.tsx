import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const items = [
  { pair: 'EUR/USD', price: '1.0872', change: '+0.12%', dir: 'up' as const },
  { pair: 'GBP/USD', price: '1.2649', change: '-0.08%', dir: 'down' as const },
  { pair: 'XAU/USD', price: '2,345.80', change: '+0.45%', dir: 'up' as const },
  { pair: 'BTC/USD', price: '68,432', change: '+1.23%', dir: 'up' as const },
  { pair: 'S&P 500', price: '5,234.00', change: '+0.31%', dir: 'up' as const },
  { pair: 'WTI Crude', price: '78.45', change: '-0.22%', dir: 'down' as const },
  { pair: 'USD/JPY', price: '151.23', change: '-0.15%', dir: 'down' as const },
  { pair: 'NASDAQ', price: '18,345', change: '+0.67%', dir: 'up' as const },
]

function TickerItem({ item }: { item: typeof items[number] }) {
  const isUp = item.dir === 'up'
  const Icon = isUp ? TrendingUp : item.dir === 'down' ? TrendingDown : Minus
  return (
    <div className="flex items-center gap-3 shrink-0 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-gold/8 card-hover">
      <span className="text-sm font-bold text-white font-sans min-w-[72px]">{item.pair}</span>
      <span className="text-sm font-mono text-muted-light">{item.price}</span>
      <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
        <Icon className="w-3 h-3" />
        <span className="text-xs font-semibold font-mono">{item.change}</span>
      </div>
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="relative border-y border-gold/10 overflow-hidden bg-dark-950/80 py-3">
      <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-dark-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-dark-950 to-transparent pointer-events-none" />
      <div className="flex animate-ticker gap-3 group hover:[animation-play-state:paused]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3 shrink-0">
            {items.map((item) => (
              <TickerItem key={`${i}-${item.pair}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
