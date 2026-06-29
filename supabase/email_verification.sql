-- Email verification for waitlist signups
ALTER TABLE pinkman_waitlist ADD COLUMN IF NOT EXISTS verification_token TEXT;
ALTER TABLE pinkman_waitlist ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Index for looking up by verification token
CREATE INDEX IF NOT EXISTS idx_pinkman_waitlist_verification_token ON pinkman_waitlist(verification_token);
