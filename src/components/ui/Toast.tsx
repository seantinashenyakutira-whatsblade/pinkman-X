import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'info' | 'success' | 'error'
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, type = 'info', visible, onClose }: ToastProps) {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    if (visible) {
      setShowing(true)
      const timer = setTimeout(() => {
        setShowing(false)
        setTimeout(onClose, 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  const colors = {
    info: 'border-cyan/30 bg-cyan/10 text-cyan',
    success: 'border-neon/30 bg-neon/10 text-neon',
    error: 'border-red-500/30 bg-red-500/10 text-red-400',
  }

  if (!visible && !showing) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className={`px-5 py-3 rounded-xl border backdrop-blur-xl text-sm font-medium transition-all duration-300 ${colors[type]} ${showing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {message}
      </div>
    </div>
  )
}
