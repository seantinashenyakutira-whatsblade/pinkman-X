import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'amber' | 'muted'
}

export default function Badge({ children, variant = 'gold' }: BadgeProps) {
  const colors = {
    gold: 'bg-gold/10 text-gold border-gold/20',
    amber: 'bg-amber/10 text-amber border-amber/20',
    muted: 'bg-dark-700 text-muted-light border-border',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colors[variant]}`}>
      {children}
    </span>
  )
}
