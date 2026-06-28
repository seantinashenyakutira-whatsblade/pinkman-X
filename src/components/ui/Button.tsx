import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({ children, onClick, href, variant = 'primary', size = 'md', className = '', type, disabled }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer border whitespace-nowrap'
  const variants = {
    primary: 'bg-gold text-dark-950 border-gold hover:bg-gold-dark hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]',
    secondary: 'bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5',
    ghost: 'bg-transparent text-muted-light border-transparent hover:text-white hover:bg-dark-700',
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
