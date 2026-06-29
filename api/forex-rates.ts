import type { IncomingMessage, ServerResponse } from 'http'

function getBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk: string) => (body += chunk))
    req.on('end', () => resolve(body))
  })
}

const basePrices: Record<string, number> = {
  'EUR/USD': 1.0872, 'GBP/USD': 1.2649, 'XAU/USD': 2345.80,
  'BTC/USD': 68432, 'S&P 500': 5234.00, 'WTI Crude': 78.45,
  'USD/JPY': 151.23, 'NASDAQ': 18345.00,
}

function randomPrice(base: number): { price: number; change: string; dir: 'up' | 'down' } {
  const pct = (Math.random() - 0.45) * 0.04
  const price = base * (1 + pct)
  const dir = pct >= 0 ? 'up' : 'down'
  const change = `${pct >= 0 ? '+' : ''}${(pct * 100).toFixed(2)}%`
  return { price: Math.round(price * (price < 1000 ? 10000 : 100)) / (price < 1000 ? 10000 : 100), change, dir }
}

const items = [
  { pair: 'EUR/USD', flag: '🇪🇺', symbol: '€', decimals: 4 },
  { pair: 'GBP/USD', flag: '🇬🇧', symbol: '£', decimals: 4 },
  { pair: 'XAU/USD', flag: '🏆', symbol: 'Au', decimals: 2 },
  { pair: 'BTC/USD', flag: '₿', symbol: '₿', decimals: 0 },
  { pair: 'S&P 500', flag: '📈', symbol: 'SP', decimals: 2 },
  { pair: 'WTI Crude', flag: '🛢️', symbol: 'Oil', decimals: 2 },
  { pair: 'USD/JPY', flag: '🇯🇵', symbol: '¥', decimals: 2 },
  { pair: 'NASDAQ', flag: '💻', symbol: 'ND', decimals: 0 },
]

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const key = process.env.ALPHA_VANTAGE_KEY
  let live = false

  const data = await Promise.all(
    items.map(async ({ pair, flag, symbol }) => {
      if (key && !live) {
        try {
          const from = pair.split('/')[0]
          const to = pair.split('/')[1]
          const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${key}`
          const r = await fetch(url)
          const j = await r.json()
          const rate = j['Realtime Currency Exchange Rate']
          if (rate) {
            const price = parseFloat(rate['5. Exchange Rate'])
            const prev = basePrices[pair] || price
            const pct = ((price - prev) / prev) * 100
            const dir = pct >= 0 ? 'up' as const : 'down' as const
            const change = `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`
            basePrices[pair] = price
            live = true
            return { pair, flag, symbol, price, change, dir }
          }
        } catch {}
      }
      const r = randomPrice(basePrices[pair])
      basePrices[pair] = r.price
      return { pair, flag, symbol, ...r }
    })
  )

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  })
  res.end(JSON.stringify({ live, data, ts: Date.now() }))
}
