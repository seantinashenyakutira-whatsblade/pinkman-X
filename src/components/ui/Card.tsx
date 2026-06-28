import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', glow = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border border-border/50 bg-dark-800/60 backdrop-blur-xl p-6 transition-all duration-300 ${glow ? 'hover:border-neon/30 hover:shadow-[0_0_30px_rgba(0,245,160,0.08)]' : 'hover:border-border-light'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
