export default function Ticker() {
  const items = [
    'EUR/USD 1.0872 +0.12%', 'GBP/USD 1.2649 -0.08%', 'XAU/USD 2,345.80 +0.45%',
    'BTC/USD 68,432 +1.23%', 'S&P 500 5,234 +0.31%', 'WTI Crude 78.45 -0.22%',
    'USD/JPY 151.23 -0.15%', 'NASDAQ 18,345 +0.67%',
  ]
  return (
    <div className="relative border-y border-border/40 overflow-hidden bg-dark-900/50 py-2.5">
      <div className="flex animate-ticker whitespace-nowrap gap-12">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 shrink-0">
            {items.map((item) => (
              <span key={item} className="text-xs text-muted-light font-mono tracking-wide">{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
