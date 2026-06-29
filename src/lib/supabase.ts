const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseClient: any = null

export async function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }
  if (!supabaseClient) {
    const { createClient } = await import('@supabase/supabase-js')
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export async function submitWaitlist(data: {
  full_name: string
  email: string
  whatsapp: string
  experience_level: string
  interest: string
  marketing_consent: boolean
}) {
  const supabase = await getSupabase()
  if (!supabase) {
    return { error: new Error('Waitlist backend not connected. Add Supabase environment variables.') }
  }

  const { error } = await supabase.from('pinkman_waitlist').insert([
    {
      ...data,
      source: 'landing_page',
      status: 'waitlist',
    },
  ])

  if (error) {
    if (error.code === '23505') {
      return { error: new Error("You're already on the Pinkman X waitlist.") }
    }
    return { error }
  }

  // Fire welcome email (non-blocking)
  try {
    const { sendWelcomeEmail } = await import('./emailAutomation')
    sendWelcomeEmail(data.email, data.full_name.split(' ')[0])
  } catch {
    // email automation is optional — never block the signup
  }

  return { error: null }
}
