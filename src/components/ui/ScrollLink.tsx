import type { ReactNode } from 'react'

interface ScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function ScrollLink({ href, children, className = '', onClick }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClick?.()
  }

  return <a href={href} onClick={handleClick} className={className}>{children}</a>
}
