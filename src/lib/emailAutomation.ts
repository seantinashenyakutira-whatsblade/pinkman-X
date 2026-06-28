export type WaitlistStatus = 'waitlist' | 'pre_approved' | 'beta_invited' | 'beta_user' | 'launched' | 'unsubscribed'

export type EmailProvider = 'resend' | 'brevo' | 'mailchimp' | 'convertkit' | 'supabase_edge' | 'zapier_make'

export async function sendWelcomeEmail(email: string, _name: string): Promise<void> {
  console.log(`[Email] Welcome email queued for ${email}`)
  // Provider options:
  // - Resend: https://resend.com
  // - Brevo: https://brevo.com
  // - Mailchimp: https://mailchimp.com
  // - ConvertKit: https://convertkit.com
  // - Supabase Edge Functions: https://supabase.com/edge-functions
  // - Zapier / Make: Webhook automation
  // Implement when email provider is connected.
}

export async function sendWeeklyUpdate(email: string): Promise<void> {
  console.log(`[Email] Weekly update queued for ${email}`)
}

export async function sendBetaApprovalEmail(email: string, _name: string): Promise<void> {
  console.log(`[Email] Beta approval email queued for ${email}`)
}

export async function sendLaunchOfferEmail(email: string, _name: string): Promise<void> {
  console.log(`[Email] Launch offer email queued for ${email}`)
}
