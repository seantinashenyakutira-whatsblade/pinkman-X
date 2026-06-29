import { useAuth } from '../../lib/AuthContext'
import { LogOut, Mail, Users, FileText } from 'lucide-react'

interface AdminLayoutProps {
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

const tabs = [
  { id: 'waitlist', label: 'Waitlist', icon: Users },
  { id: 'emails', label: 'Email Logs', icon: Mail },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
]

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col">
      <header className="h-14 border-b border-gold/10 bg-black/40 backdrop-blur-md flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded overflow-hidden">
            <img src="/pinkmanx-logo.jpeg" alt="" className="w-full h-full object-cover scale-125" />
          </div>
          <span className="text-sm font-bold text-white">Admin</span>
        </div>
        <button onClick={signOut} className="flex items-center gap-1.5 text-xs text-muted-light hover:text-red-400 transition-colors">
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className="w-52 border-r border-gold/10 bg-black/30 shrink-0 p-3 space-y-1 hidden md:block">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${activeTab === t.id ? 'bg-gold/10 text-gold border border-gold/20' : 'text-muted-light hover:text-white hover:bg-white/5'}`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </nav>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </div>
      {/* Mobile tab bar */}
      <div className="md:hidden flex border-t border-gold/10 bg-black/60 backdrop-blur-md shrink-0">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`flex-1 flex flex-col items-center py-2 text-[10px] transition-colors ${activeTab === t.id ? 'text-gold' : 'text-muted-light'}`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              {t.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
