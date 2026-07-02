-- Add 'daily_tip' to email_logs type constraint
ALTER TABLE email_logs DROP CONSTRAINT IF EXISTS email_logs_email_type_check;
ALTER TABLE email_logs ADD CONSTRAINT email_logs_email_type_check
  CHECK (email_type IN ('welcome', 'beta_approval', 'weekly_update', 'launch_offer', 'comment_notification', 'daily_tip'));

-- Allow anon inserts into email_logs (for serverless functions with anon key)
-- The service role key (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS entirely,
-- but this policy ensures anon-key functions can also log emails
DROP POLICY IF EXISTS "Allow anon email log inserts" ON email_logs;
CREATE POLICY "Allow anon email log inserts"
  ON email_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);
