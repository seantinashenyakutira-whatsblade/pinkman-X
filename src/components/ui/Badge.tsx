import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'neon' | 'gold' | 'cyan' | 'muted'
}

export default function Badge({ children, variant = 'neon' }: BadgeProps) {
  const colors = {
    neon: 'bg-neon/10 text-neon border-neon/20',
    gold: 'bg-gold/10 text-gold border-gold/20',
    cyan: 'bg-cyan/10 text-cyan border-cyan/20',
    muted: 'bg-dark-700 text-muted-light border-border',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colors[variant]}`}>
      {children}
    </span>
  )
}
