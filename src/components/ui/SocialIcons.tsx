const socials = [
  {
    name: 'Instagram',
    href: '#',
    hover: 'hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    hover: 'hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.4 29.4 0 0 0 1 12a29.4 29.4 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.4 29.4 0 0 0 23 12a29.4 29.4 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.3" />
        <polygon points="10,8.5 16,12 10,15.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    hover: 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.58 2.87 2.87 0 0 1-2.88-3.02 2.89 2.89 0 0 1 2.88-2.73c.44 0 .86.1 1.23.28v-3.5a6.38 6.38 0 0 0-1.23-.12A6.34 6.34 0 0 0 3.18 15.4a6.32 6.32 0 0 0 6.41 6.23 6.34 6.34 0 0 0 6.41-6.23V9.56a8.24 8.24 0 0 0 4.77 1.5V7.63a4.83 4.83 0 0 1-1.18-.94Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    hover: 'hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    hover: 'hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 8h-2a2 2 0 0 0-2 2v2h-2v2.5h2V20h2.5v-5.5h1.5l.5-2.5H14v-1.5a.5.5 0 0 1 .5-.5h1V8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    hover: 'hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.13.67 4.11 1.82 5.72L2.7 21.33a.5.5 0 0 0 .63.63l3.58-1.12A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16.1 13.9c-.38-.2-2.27-1.13-2.62-1.26-.35-.13-.6-.2-.85.2-.25.4-.98 1.26-1.2 1.52-.22.26-.44.3-.82.1-.88-.44-1.68-.98-2.37-1.64-.36-.35-.96-.93-1.02-1.18-.06-.25.02-.4.14-.54.15-.17.3-.35.44-.53.2-.25.3-.44.44-.73.14-.3.07-.55-.03-.77-.1-.22-.85-2.07-1.17-2.84-.3-.73-.63-.62-.86-.64-.22-.01-.48-.01-.74-.01-.26 0-.7.1-1.06.5-.36.4-1.38 1.35-1.38 3.3 0 1.95 1.42 3.83 1.62 4.1.2.27 2.78 4.26 6.75 5.97.94.4 1.68.65 2.26.83.95.3 1.82.26 2.5.16.77-.11 2.38-.97 2.72-1.92.34-.95.34-1.75.24-1.92-.1-.17-.36-.27-.74-.47Z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function SocialIcons() {
  return (
    <div className="flex flex-col items-center gap-3 mb-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-gold">Follow Us</span>
      <div className="flex items-center gap-2.5 flex-wrap justify-center">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-muted-light transition-all duration-300 hover:text-white ${s.hover} hover:scale-110`}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
