import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { getSupabase } from './supabase'

interface AuthState {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  isAdmin: false,
  signIn: async () => ({ error: 'Auth not initialized' }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [sb, setSb] = useState<any>(null)

  useEffect(() => {
    getSupabase().then(async (client) => {
      if (!client) { setLoading(false); return }
      setSb(client)

      const { data: { session } } = await client.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        const { data: profile } = await client.from('admin_profiles').select('id').eq('id', session.user.id).maybeSingle()
        setIsAdmin(!!profile)
      }
      setLoading(false)

      const { data: { subscription } } = client.auth.onAuthStateChange(async (_event: string, session: any) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const { data: profile } = await client.from('admin_profiles').select('id').eq('id', session.user.id).maybeSingle()
          setIsAdmin(!!profile)
        } else {
          setIsAdmin(false)
        }
      })
      return () => subscription.unsubscribe()
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!sb) return { error: 'Backend not connected' }
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }

  const signOut = async () => {
    if (!sb) return
    await sb.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
