const socials = [
  {
    name: 'Instagram',
    href: '#',
    hover: 'hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    hover: 'hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    hover: 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.58 2.87 2.87 0 0 1-2.88-3.02 2.89 2.89 0 0 1 2.88-2.73c.44 0 .86.1 1.23.28v-3.5a6.38 6.38 0 0 0-1.23-.12A6.34 6.34 0 0 0 3.18 15.4a6.32 6.32 0 0 0 6.41 6.23 6.34 6.34 0 0 0 6.41-6.23V9.56a8.24 8.24 0 0 0 4.77 1.5V7.63a4.83 4.83 0 0 1-1.18-.94Z" stroke="currentColor" strokeWidth="1.2" />
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
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 8h-1.5A2.5 2.5 0 0 0 12 10.5V16h-2v-4h2V8a4 4 0 0 1 4-4h1v2h-1a2 2 0 0 0-2 2v2h2.5L16 10Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    hover: 'hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M17.507 14.33a.98.98 0 0 0-.49-.29l-2.22-.58a.96.96 0 0 0-.52 0l-.37.16a.77.77 0 0 1-.42.06 5.28 5.28 0 0 1-2.84-1.78.77.77 0 0 1-.07-.4l.06-.38a.96.96 0 0 0-.18-.49l-1.19-1.82a.96.96 0 0 0-.47-.33l-.39-.05a.95.95 0 0 0-.5.1l-.39.19a2.56 2.56 0 0 0-1.36 1.75 4.06 4.06 0 0 0 .88 3.35 8.18 8.18 0 0 0 3.04 2.32 7.82 7.82 0 0 0 3.13.78 2.56 2.56 0 0 0 2.03-1.03l.26-.34a.95.95 0 0 0 .11-.5l-.07-.39Z" fill="currentColor" />
        <path d="M12 2a10 10 0 0 0-8.66 15l-1.1 3.74a.5.5 0 0 0 .62.62L6.68 20A10 10 0 1 0 12 2Z" stroke="currentColor" strokeWidth="1.2" />
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
