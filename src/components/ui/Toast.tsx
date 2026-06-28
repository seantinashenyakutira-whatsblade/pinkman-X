import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  const [showing, setShowing] = useState(false)
  useEffect(() => {
    if (visible) {
      setShowing(true)
      const t = setTimeout(() => { setShowing(false); setTimeout(onClose, 300) }, 3000)
      return () => clearTimeout(t)
    }
  }, [visible, onClose])
  if (!visible && !showing) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className={`px-5 py-3 rounded-xl border border-gold/30 bg-gold/10 backdrop-blur-xl text-gold text-sm font-medium transition-all duration-300 ${showing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {message}
      </div>
    </div>
  )
}
