import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({ children, onClick, href, variant = 'primary', size = 'md', className = '', type, disabled }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer border whitespace-nowrap'
  const variants = {
    primary: 'bg-neon text-dark-950 border-neon hover:bg-neon-dark hover:shadow-[0_0_30px_rgba(0,245,160,0.3)]',
    secondary: 'bg-transparent text-neon border-neon/40 hover:border-neon hover:shadow-[0_0_20px_rgba(0,245,160,0.15)]',
    ghost: 'bg-transparent text-muted-light border-transparent hover:text-white hover:bg-dark-700',
    gold: 'bg-gold text-dark-950 border-gold hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(240,185,11,0.3)]',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return <a href={href} className={classes}>{children}</a>
  }

  return <button type={type ?? 'button'} onClick={onClick} className={classes} disabled={disabled}>{children}</button>
}
