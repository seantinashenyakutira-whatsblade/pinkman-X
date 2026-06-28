import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  highlight?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', highlight = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl bg-black/60 backdrop-blur-xl border transition-all duration-300 ${highlight ? 'border-gold/30' : 'border-gold/10'} ${onClick ? 'cursor-pointer hover:border-gold/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.06)]' : 'hover:border-gold/20'} ${className}`}
    >
      {children}
    </div>
  )
}
