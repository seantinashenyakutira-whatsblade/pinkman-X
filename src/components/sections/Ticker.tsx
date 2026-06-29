import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TickerItem {
  pair: string
  flag: string
  price: number
  change: string
  dir: 'up' | 'down'
}

const assets = [
  { pair: 'EUR/USD', flag: '🇪🇺', base: 1.0872, fmt: (v: number) => v.toFixed(4) },
  { pair: 'GBP/USD', flag: '🇬🇧', base: 1.2649, fmt: (v: number) => v.toFixed(4) },
  { pair: 'XAU/USD', flag: '🏆', base: 2345.80, fmt: (v: number) => v.toFixed(2) },
  { pair: 'BTC/USD', flag: '₿', base: 68432, fmt: (v: number) => Math.round(v).toLocaleString() },
  { pair: 'S&P 500', flag: '📈', base: 5234.00, fmt: (v: number) => v.toFixed(2) },
  { pair: 'WTI Crude', flag: '🛢️', base: 78.45, fmt: (v: number) => v.toFixed(2) },
  { pair: 'USD/JPY', flag: '🇯🇵', base: 151.23, fmt: (v: number) => v.toFixed(2) },
  { pair: 'NASDAQ', flag: '💻', base: 18345, fmt: (v: number) => Math.round(v).toLocaleString() },
]

function wiggle(base: number): { price: number; change: string; dir: 'up' | 'down' } {
  const pct = (Math.random() - 0.47) * 0.008
  const price = base * (1 + pct)
  return {
    price,
    change: `${pct >= 0 ? '+' : ''}${(pct * 100).toFixed(2)}%`,
    dir: pct >= 0 ? 'up' : 'down',
  }
}

function TickerCard({ item }: { item: TickerItem }) {
  const isUp = item.dir === 'up'
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-gold/10 card-hover">
      <span className="text-sm">{item.flag}</span>
      <span className="text-sm font-bold text-white font-sans min-w-[68px]">{item.pair}</span>
      <span className={`text-sm font-mono font-semibold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
        {assets.find((a) => a.pair === item.pair)?.fmt(item.price) ?? item.price}
      </span>
      <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
        {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span className="text-[11px] font-semibold font-mono">{item.change}</span>
      </div>
    </div>
  )
}

function buildItems(): TickerItem[] {
  return assets.map((a) => {
    const w = wiggle(a.base)
    return { pair: a.pair, flag: a.flag, ...w }
  })
}

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(buildItems)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const sim = setInterval(() => setItems(buildItems()), 5000)

    fetch('/api/forex-rates').then((r) => {
      if (!r.ok) throw new Error()
      return r.json()
    }).then((json) => {
      if (json.data) {
        clearInterval(sim)
        setItems(json.data)
        setLive(json.live)
      }
    }).catch(() => {})

    return () => clearInterval(sim)
  }, [])

  const repeated = [...Array(3)].flatMap((_, i) =>
    items.map((item) => ({ ...item, key: `${i}-${item.pair}` }))
  )

  return (
    <div className="relative border-y border-gold/10 overflow-hidden bg-dark-950/80 py-3">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-dark-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-dark-950 to-transparent pointer-events-none" />
      {live && (
        <div className="absolute right-28 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5">
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-black/60 px-2 py-0.5 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
      )}
      <div className="flex animate-ticker gap-3 hover:[animation-play-state:paused]">
        {repeated.map((item) => (
          <TickerCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  )
}
