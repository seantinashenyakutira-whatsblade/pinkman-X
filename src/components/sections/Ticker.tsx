import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TickerItem {
  pair: string
  flag: string
  symbol: string
  price: number
  change: string
  dir: 'up' | 'down'
}

const defaults: TickerItem[] = [
  { pair: 'EUR/USD', flag: '🇪🇺', symbol: '€', price: 1.0872, change: '+0.00%', dir: 'up' },
  { pair: 'GBP/USD', flag: '🇬🇧', symbol: '£', price: 1.2649, change: '+0.00%', dir: 'up' },
  { pair: 'XAU/USD', flag: '🏆', symbol: 'Au', price: 2345.80, change: '+0.00%', dir: 'up' },
  { pair: 'BTC/USD', flag: '₿', symbol: '₿', price: 68432, change: '+0.00%', dir: 'up' },
  { pair: 'S&P 500', flag: '📈', symbol: 'SP', price: 5234.00, change: '+0.00%', dir: 'up' },
  { pair: 'WTI Crude', flag: '🛢️', symbol: 'Oil', price: 78.45, change: '+0.00%', dir: 'up' },
  { pair: 'USD/JPY', flag: '🇯🇵', symbol: '¥', price: 151.23, change: '+0.00%', dir: 'up' },
  { pair: 'NASDAQ', flag: '💻', symbol: 'ND', price: 18345.00, change: '+0.00%', dir: 'up' },
]

function formatPrice(pair: string, price: number): string {
  if (pair.includes('JPY') || pair === 'XAU/USD') return price.toFixed(2)
  if (pair === 'BTC/USD' || pair === 'NASDAQ') return price.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (pair === 'S&P 500') return price.toFixed(2)
  if (pair === 'WTI Crude') return price.toFixed(2)
  return price.toFixed(4)
}

function TickerCard({ item, prev }: { item: TickerItem; prev: number }) {
  const isUp = item.dir === 'up'
  const Icon = isUp ? TrendingUp : TrendingDown
  const changed = item.price !== prev
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-gold/10 card-hover">
      <span className="text-sm">{item.flag}</span>
      <span className="text-sm font-bold text-white font-sans">{item.pair.replace('/', '/')}</span>
      <span className={`text-sm font-mono font-semibold transition-colors duration-500 ${changed ? (isUp ? 'text-emerald-400' : 'text-red-400') : 'text-muted-light'}`}>
        {formatPrice(item.pair, item.price)}
      </span>
      <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
        <Icon className="w-3 h-3" />
        <span className="text-[11px] font-semibold font-mono">{item.change}</span>
      </div>
      {item.pair === 'BTC/USD' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
    </div>
  )
}

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(defaults)
  const [prev, setPrev] = useState<Record<string, number>>({})
  const [live, setLive] = useState(false)

  useEffect(() => {
    let mounted = true

    async function fetchRates() {
      try {
        const res = await fetch('/api/forex-rates')
        if (!res.ok) return
        const json = await res.json()
        if (!mounted) return
        setPrev(Object.fromEntries(items.map((i) => [i.pair, i.price])))
        setItems(json.data)
        setLive(json.live)
      } catch {
        // keep current data on error
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60_000)
    return () => { mounted = false; clearInterval(interval) }
  }, [])

  const repeated = [...Array(3)].flatMap((_, i) => items.map((item) => ({ ...item, key: `${i}-${item.pair}` })))

  return (
    <div className="relative border-y border-gold/10 overflow-hidden bg-dark-950/80 py-3">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-dark-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-dark-950 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 absolute right-28 top-1/2 -translate-y-1/2 z-20">
        {live && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-black/60 px-2 py-0.5 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        )}
      </div>
      <div className="flex animate-ticker gap-3 hover:[animation-play-state:paused]">
        {repeated.map((item) => (
          <TickerCard key={item.key} item={item} prev={prev[item.pair] ?? item.price} />
        ))}
      </div>
    </div>
  )
}
