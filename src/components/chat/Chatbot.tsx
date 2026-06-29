import { useState, useEffect, useRef, type FormEvent, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User, GripHorizontal } from 'lucide-react'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(true)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0, elX: 0, elY: 0 })
  const posRef = useRef({ x: window.innerWidth - 80, y: window.innerHeight - 80 })
  const [pos, setPos] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 })

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open) setShowPopup(false)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const clamp = useCallback((v: number, min: number, max: number) => Math.max(min, Math.min(max, v)), [])

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const history = messages.slice(-10)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history }),
      })
      const json = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: json.reply || "I'm not sure. Email hello@pinkmanx.vip." }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Network issue. Try again or email hello@pinkmanx.vip." }])
    }
    setLoading(false)
  }

  useEffect(() => {
    const onDown = (clientX: number, clientY: number) => {
      dragging.current = true
      dragStart.current = { x: clientX, y: clientY, elX: posRef.current.x, elY: posRef.current.y }
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    }

    const onMove = (clientX: number, clientY: number) => {
      if (!dragging.current) return
      const dx = clientX - dragStart.current.x
      const dy = clientY - dragStart.current.y
      const nx = clamp(dragStart.current.elX + dx, 0, window.innerWidth - 60)
      const ny = clamp(dragStart.current.elY + dy, 0, window.innerHeight - 60)
      posRef.current = { x: nx, y: ny }
      setPos({ x: nx, y: ny })
    }

    const onUp = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.chat-ignore-drag')) return
      onDown(e.clientX, e.clientY)
    }
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.chat-ignore-drag')) return
      onDown(e.touches[0].clientX, e.touches[0].clientY)
    }
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [clamp])

  return (
    <div
      className="fixed z-50 flex flex-col items-end"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Popup bubble */}
      {showPopup && !open && (
        <div className="relative animate-fade-in mb-3 chat-ignore-drag">
          <div className="bg-black/80 backdrop-blur-xl border border-gold/30 rounded-2xl px-4 py-2.5 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
            <button
              onClick={(e) => { e.stopPropagation(); setShowPopup(false) }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-dark-600 border border-gold/20 flex items-center justify-center hover:bg-dark-700 transition-colors"
            >
              <X className="w-3 h-3 text-muted-light" />
            </button>
            <p className="text-sm text-white font-medium whitespace-nowrap">Heyy, ask me anything about Pinkman X 🤖</p>
          </div>
          <div className="w-3 h-3 bg-black/80 border-r border-b border-gold/30 rotate-45 -mt-1.5 mr-5 ml-auto" />
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-[340px] sm:w-[380px] h-[480px] rounded-2xl bg-black/80 backdrop-blur-xl border border-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.1)] flex flex-col overflow-hidden animate-fade-in mb-3">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gold/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Pinkman X AI</p>
                <p className="text-[10px] text-emerald-400">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1 chat-ignore-drag">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-light cursor-grab active:cursor-grabbing">
                <GripHorizontal className="w-4 h-4" />
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-black/60 border border-gold/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <X className="w-4 h-4 text-muted-light" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-ignore-drag">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <Bot className="w-10 h-10 text-gold/30 mx-auto mb-3" />
                <p className="text-sm text-muted-light font-medium">Ask me anything about Pinkman X!</p>
                <p className="text-xs text-muted mt-1">Pricing, features, launch date, anything.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-gold/10 border border-gold/20' : 'bg-amber/10 border border-amber/20'}`}>
                  {m.role === 'user' ? <User className="w-3.5 h-3.5 text-gold" /> : <Bot className="w-3.5 h-3.5 text-amber" />}
                </div>
                <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-gold/10 border border-gold/20 text-white' : 'bg-black/60 border border-gold/10 text-white/80'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-amber" />
                </div>
                <div className="px-3 py-2 rounded-xl bg-black/60 border border-gold/10">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gold/10 shrink-0 flex items-center gap-2 chat-ignore-drag">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Pinkman X..."
              className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-gold/15 text-white text-sm placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25 focus:border-gold/40 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-lg bg-gradient-to-r from-gold to-amber text-dark-950 flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-40 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => { if (!dragging.current) setOpen(!open) }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber text-dark-950 shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center hover:scale-105 hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] transition-shadow duration-300 cursor-grab active:cursor-grabbing shrink-0"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  )
}
