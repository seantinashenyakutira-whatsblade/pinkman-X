# Pinkman X — Waitlist Management Guide

## Table of Contents
1. Viewing Signups in Supabase
2. Exporting CSV
3. Changing User Status
4. Connecting Resend for Emails
5. Sending Newsletters
6. Deploying to Vercel

---

## 1. Viewing Signups in Supabase

1. Log in to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Go to **Table Editor** in the left sidebar
4. Select the `pinkman_waitlist` table
5. All waitlist signups are displayed here

### SQL Query (from Supabase SQL Editor):
```sql
SELECT * FROM pinkman_waitlist ORDER BY created_at DESC;
```

---

## 2. Exporting CSV

From the Supabase Table Editor:
1. Click **Export** button (top right of the table)
2. Choose **CSV**
3. Save the file

### Via SQL:
```sql
COPY pinkman_waitlist TO '/tmp/waitlist_export.csv' WITH CSV HEADER;
```

---

## 3. Changing User Status

Status options: `waitlist`, `pre_approved`, `beta_invited`, `beta_user`, `launched`, `unsubscribed`

### Update a single user:
```sql
UPDATE pinkman_waitlist
SET status = 'pre_approved'
WHERE email = 'user@example.com';
```

### Update multiple users:
```sql
UPDATE pinkman_waitlist
SET status = 'beta_invited'
WHERE status = 'pre_approved';
```

---

## 4. Connecting Resend (or other email provider)

### Option A: Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add domain verification
4. Update `src/lib/emailAutomation.ts` with actual API calls

### Option B: Brevo
1. Sign up at [brevo.com](https://brevo.com)
2. Get SMTP credentials or API key
3. Use `sib-api-v3-sdk` npm package

### Option C: Supabase Edge Functions
1. Create a new Edge Function
2. Use Resend or SMTP inside the function
3. Call the function from `emailAutomation.ts`

---

## 5. Sending Newsletters

### With Resend:
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'updates@pinkmanx.app',
  to: emails, // Array of subscriber emails
  subject: 'Your Newsletter Subject',
  html: '<h1>Your content</h1>',
});
```

### With Mailchimp:
1. Create an audience in Mailchimp
2. Use their API to add contacts and send campaigns
3. Export from Supabase → Import to Mailchimp

---

## 6. Deploying to Vercel

1. Push the project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-org/pinkman-x.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **Add New → Project**
4. Import your GitHub repository
5. Configure environment variables:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon key
6. Framework preset: **Vite** (auto-detected)
7. Click **Deploy**

### Post-Deployment:
- Set up custom domain (e.g., pinkmanx.app)
- Enable Vercel Analytics (optional)
- Set up email provider integration
- Monitor Supabase for new signups
