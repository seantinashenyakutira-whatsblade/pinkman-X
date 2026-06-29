-- Admin Portal: Profiles for authenticated admin users
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read own profile" ON admin_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can update own profile" ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'update' CHECK (category IN ('update', 'announcement', 'discussion')),
  author_id UUID REFERENCES admin_profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can CRUD all posts" ON blog_posts
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_profiles)
  );

-- Blog comments (public engagement on posts)
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  commenter_name TEXT,
  commenter_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved comments" ON blog_comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can insert a comment" ON blog_comments
  FOR INSERT WITH CHECK (status = 'pending');

CREATE POLICY "Admins can manage comments" ON blog_comments
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_profiles)
  );

-- Email logs for tracking sent automated emails
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL CHECK (email_type IN ('welcome', 'beta_approval', 'weekly_update', 'launch_offer', 'comment_notification')),
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed')),
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read email logs" ON email_logs
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM admin_profiles)
  );

CREATE POLICY "Admins can insert email logs" ON email_logs
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_profiles)
  );

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Seed initial admin profile (requires admin to sign in first)
-- Run after creating the user in Supabase Auth dashboard:
-- INSERT INTO admin_profiles (id, full_name)
-- VALUES ((SELECT id FROM auth.users WHERE email = 'hello@pinkmanx.vip'), 'Pinkman X Admin');
