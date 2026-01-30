-- ============================================================================
-- DivinityAGI Complete Database Schema - CLEAN INSTALL
-- This script drops all existing tables and recreates them from scratch
-- ============================================================================

-- DROP ALL EXISTING TABLES (in reverse dependency order)
DROP TABLE IF EXISTS support_tickets CASCADE;
DROP TABLE IF EXISTS system_events CASCADE;
DROP TABLE IF EXISTS admin_analytics CASCADE;
DROP TABLE IF EXISTS admin_events CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS leader_contributions CASCADE;
DROP TABLE IF EXISTS verified_leader_applications CASCADE;
DROP TABLE IF EXISTS user_activity_log CASCADE;
DROP TABLE IF EXISTS daily_reflections CASCADE;
DROP TABLE IF EXISTS quiet_space_sessions CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS token_packages CASCADE;
DROP TABLE IF EXISTS token_transactions CASCADE;
DROP TABLE IF EXISTS token_balances CASCADE;
DROP TABLE IF EXISTS user_subscriptions CASCADE;
DROP TABLE IF EXISTS subscription_tiers CASCADE;
DROP TABLE IF EXISTS token_purchases CASCADE;
DROP TABLE IF EXISTS billing_events CASCADE;
DROP TABLE IF EXISTS subscription_history CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- DROP ALL VIEWS
DROP VIEW IF EXISTS customer_lifetime_value CASCADE;
DROP VIEW IF EXISTS verification_requests CASCADE;
DROP VIEW IF EXISTS critical_events CASCADE;
DROP VIEW IF EXISTS recent_events CASCADE;
DROP VIEW IF EXISTS subscription_metrics_view CASCADE;
DROP VIEW IF EXISTS recent_payments_view CASCADE;
DROP VIEW IF EXISTS active_subscriptions_view CASCADE;

-- DROP ALL FUNCTIONS
DROP FUNCTION IF EXISTS add_purchased_tokens(UUID, INTEGER, TEXT) CASCADE;
DROP FUNCTION IF EXISTS spend_tokens(UUID, INTEGER, TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_customer_ltv(TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_subscription_counts() CASCADE;
DROP FUNCTION IF EXISTS get_subscription_revenue(INTEGER) CASCADE;
DROP FUNCTION IF EXISTS get_event_summary(INTEGER) CASCADE;
DROP FUNCTION IF EXISTS cleanup_old_events(INTEGER) CASCADE;
DROP FUNCTION IF EXISTS trigger_update_subscription_analytics() CASCADE;
DROP FUNCTION IF EXISTS update_subscription_analytics() CASCADE;
DROP FUNCTION IF EXISTS trigger_calculate_analytics() CASCADE;
DROP FUNCTION IF EXISTS calculate_admin_analytics() CASCADE;
DROP FUNCTION IF EXISTS initialize_user_data() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  faith_tradition TEXT,
  preferred_language TEXT DEFAULT 'en',
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned', 'deleted')),
  is_verified_leader BOOLEAN DEFAULT FALSE,
  verified_leader_type TEXT CHECK (verified_leader_type IN ('ministry', 'individual', NULL)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'cosmic')),
  ambient_sound_enabled BOOLEAN DEFAULT FALSE,
  ambient_sound_type TEXT,
  ambient_sound_volume INTEGER DEFAULT 50 CHECK (ambient_sound_volume >= 0 AND ambient_sound_volume <= 100),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT FALSE,
  daily_reflection_time TIME,
  preferred_avatars JSONB DEFAULT '[]',
  accessibility_settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STRIPE SUBSCRIPTION MANAGEMENT
-- ============================================================================

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_customer_id TEXT UNIQUE NOT NULL,
  user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL REFERENCES customers(stripe_customer_id) ON DELETE CASCADE,
  stripe_price_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('seeker', 'subscriber', 'devotee', 'enlightened')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'past_due', 'trialing', 'unpaid')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL REFERENCES customers(stripe_customer_id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed', 'refunded')),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('subscription', 'token_purchase', 'donation')),
  token_amount INTEGER,
  payment_method_type TEXT,
  last4 TEXT,
  brand TEXT,
  metadata JSONB DEFAULT '{}',
  description TEXT,
  refunded_amount INTEGER DEFAULT 0,
  refunded_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscription_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  from_tier TEXT CHECK (from_tier IN ('seeker', 'subscriber', 'devotee', 'enlightened')),
  to_tier TEXT NOT NULL CHECK (to_tier IN ('seeker', 'subscriber', 'devotee', 'enlightened')),
  change_reason TEXT NOT NULL CHECK (change_reason IN ('signup', 'upgrade', 'downgrade', 'cancellation', 'reactivation', 'trial_start', 'trial_end')),
  metadata JSONB DEFAULT '{}',
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE billing_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  data JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE token_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  stripe_customer_id TEXT NOT NULL REFERENCES customers(stripe_customer_id) ON DELETE CASCADE,
  token_amount INTEGER NOT NULL CHECK (token_amount > 0),
  price_paid INTEGER NOT NULL CHECK (price_paid >= 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB DEFAULT '{}',
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================================================
-- SUBSCRIPTION TIERS
-- ============================================================================

CREATE TABLE subscription_tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  billing_period TEXT DEFAULT 'month' CHECK (billing_period IN ('month', 'year', 'lifetime', 'free')),
  daily_token_allowance INTEGER DEFAULT 0,
  stripe_price_id TEXT,
  features JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  tier_id TEXT REFERENCES subscription_tiers(id) NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'unpaid')),
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TOKEN SYSTEM
-- ============================================================================

CREATE TABLE token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_tokens INTEGER DEFAULT 0,
  purchased_tokens INTEGER DEFAULT 0,
  bonus_tokens INTEGER DEFAULT 0,
  total_tokens_earned INTEGER DEFAULT 0,
  total_tokens_spent INTEGER DEFAULT 0,
  last_daily_reset TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'spent', 'purchased', 'bonus', 'refund', 'daily_reset', 'expired')),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  reference_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE token_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  base_tokens INTEGER NOT NULL,
  bonus_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER GENERATED ALWAYS AS (base_tokens + bonus_tokens) STORED,
  price DECIMAL(10, 2) NOT NULL,
  stripe_price_id TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PURCHASES (LEGACY)
-- ============================================================================

CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  stripe_customer_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('subscription', 'tokens', 'one_time')),
  payment_type TEXT CHECK (payment_type IN ('card', 'ach', 'apple_pay', 'google_pay', 'other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'canceled', 'refunded')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  description TEXT,
  token_package_id TEXT REFERENCES token_packages(id),
  token_amount INTEGER,
  subscription_id UUID REFERENCES user_subscriptions(id),
  receipt_url TEXT,
  receipt_email TEXT,
  failure_code TEXT,
  failure_message TEXT,
  refunded_amount INTEGER DEFAULT 0,
  refunded_at TIMESTAMPTZ,
  brand TEXT,
  last4 TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ACTIVITY & ENGAGEMENT
-- ============================================================================

CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  avatar_id TEXT NOT NULL,
  avatar_name TEXT,
  faith_tradition TEXT,
  title TEXT,
  tokens_used INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiet_space_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  space_type TEXT NOT NULL,
  ambient_sound TEXT,
  duration_seconds INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE daily_reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  reflection_date DATE NOT NULL,
  faith_tradition TEXT,
  content TEXT NOT NULL,
  title TEXT,
  source TEXT,
  viewed BOOLEAN DEFAULT FALSE,
  viewed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, reflection_date)
);

CREATE TABLE user_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'login', 'logout', 'chat_started', 'chat_ended', 'token_purchase', 
    'subscription_change', 'reflection_viewed', 'quiet_space', 'avatar_interaction'
  )),
  description TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- VERIFIED LEADER PROGRAM
-- ============================================================================

CREATE TABLE verified_leader_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  application_type TEXT NOT NULL CHECK (application_type IN ('ministry', 'individual')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'additional_info_needed')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  faith_tradition TEXT NOT NULL,
  credentials TEXT,
  years_of_service INTEGER,
  bio TEXT,
  ministry_name TEXT,
  ministry_website TEXT,
  ministry_size TEXT,
  ministry_address TEXT,
  verification_documents JSONB DEFAULT '[]',
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  rejection_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leader_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  leader_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  contribution_type TEXT NOT NULL CHECK (contribution_type IN (
    'reflection', 'meditation', 'prayer', 'teaching', 'article', 'video', 'audio'
  )),
  title TEXT NOT NULL,
  content TEXT,
  faith_tradition TEXT,
  media_url TEXT,
  media_type TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'published', 'rejected')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ADMIN
-- ============================================================================

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator', 'support')),
  permissions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id TEXT,
  user_email TEXT,
  user_name TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  notification_sent BOOLEAN DEFAULT false
);

CREATE TABLE admin_analytics (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_signups_24h INTEGER DEFAULT 0,
  new_signups_7d INTEGER DEFAULT 0,
  total_subscriptions INTEGER DEFAULT 0,
  subscriptions_seeker INTEGER DEFAULT 0,
  subscriptions_subscriber INTEGER DEFAULT 0,
  subscriptions_devotee INTEGER DEFAULT 0,
  subscriptions_mystic INTEGER DEFAULT 0,
  revenue_estimate DECIMAL DEFAULT 0,
  error_rate DECIMAL DEFAULT 0,
  pending_applications INTEGER DEFAULT 0,
  ministry_applications INTEGER DEFAULT 0,
  individual_applications INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE system_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email TEXT,
  notification_sent BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ticket_number TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('technical', 'billing', 'content', 'account', 'other')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_user', 'resolved', 'closed')),
  assigned_to UUID REFERENCES admin_users(id),
  resolved_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_subscriptions_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_tier ON subscriptions(tier);
CREATE INDEX idx_payments_customer ON payments(stripe_customer_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_sub_history_user ON subscription_history(user_id);
CREATE INDEX idx_billing_events_type ON billing_events(event_type);
CREATE INDEX idx_token_purchases_user ON token_purchases(user_id);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX idx_admin_events_type ON admin_events(type);
CREATE INDEX idx_admin_events_severity ON admin_events(severity);
CREATE INDEX idx_admin_events_timestamp ON admin_events(timestamp DESC);
CREATE INDEX idx_system_events_created_at ON system_events(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiet_space_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_leader_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE leader_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow public read customers" ON customers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert customers" ON customers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update customers" ON customers FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow public read subscriptions" ON subscriptions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert subscriptions" ON subscriptions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update subscriptions" ON subscriptions FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow public read payments" ON payments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert payments" ON payments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public read sub_history" ON subscription_history FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert sub_history" ON subscription_history FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public read billing_events" ON billing_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert billing_events" ON billing_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public read token_purchases" ON token_purchases FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anon insert token_purchases" ON token_purchases FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update token_purchases" ON token_purchases FOR UPDATE TO anon USING (true);
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own token balance" ON token_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own token transactions" ON token_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own chat sessions" ON chat_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own quiet space sessions" ON quiet_space_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiet space sessions" ON quiet_space_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own reflections" ON daily_reflections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reflections" ON daily_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reflections" ON daily_reflections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own support tickets" ON support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create support tickets" ON support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view subscription tiers" ON subscription_tiers FOR SELECT USING (true);
CREATE POLICY "Anyone can view token packages" ON token_packages FOR SELECT USING (true);
CREATE POLICY "Anyone can view published contributions" ON leader_contributions FOR SELECT USING (status = 'published');
CREATE POLICY "Leaders can manage own contributions" ON leader_contributions FOR ALL USING (auth.uid() = leader_id);
CREATE POLICY "Allow public insert admin_events" ON admin_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select admin_events" ON admin_events FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated all admin_events" ON admin_events FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow public select admin_analytics" ON admin_analytics FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update admin_analytics" ON admin_analytics FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name) VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name') ON CONFLICT (id) DO NOTHING;
  INSERT INTO user_preferences (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO token_balances (user_id, daily_tokens) VALUES (NEW.id, 10) ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO user_subscriptions (user_id, tier_id, status, current_period_start) VALUES (NEW.id, 'seeker', 'active', NOW()) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

CREATE OR REPLACE FUNCTION calculate_admin_analytics()
RETURNS VOID AS $$
BEGIN
  UPDATE admin_analytics SET
    pending_applications = (SELECT COUNT(*) FROM admin_events WHERE type = 'verification_request'),
    ministry_applications = (SELECT COUNT(*) FROM admin_events WHERE type = 'verification_request' AND metadata->>'applicationType' = 'ministry'),
    individual_applications = (SELECT COUNT(*) FROM admin_events WHERE type = 'verification_request' AND metadata->>'applicationType' = 'individual'),
    error_rate = (SELECT ROUND((COUNT(*) FILTER (WHERE severity IN ('error', 'critical'))::DECIMAL / NULLIF(COUNT(*), 0) * 100)::NUMERIC, 2) FROM (SELECT severity FROM admin_events ORDER BY timestamp DESC LIMIT 1000) recent_events),
    last_updated = NOW()
  WHERE id = '00000000-0000-0000-0000-000000000001';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_calculate_analytics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type IN ('verification_request', 'error_reported', 'crash_detected') THEN PERFORM calculate_admin_analytics(); END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_admin_event_insert AFTER INSERT ON admin_events FOR EACH ROW EXECUTE FUNCTION trigger_calculate_analytics();

CREATE OR REPLACE FUNCTION update_subscription_analytics()
RETURNS VOID AS $$
BEGIN
  UPDATE admin_analytics SET
    total_subscriptions = (SELECT COUNT(*) FROM subscriptions WHERE status = 'active'),
    subscriptions_seeker = (SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'seeker'),
    subscriptions_subscriber = (SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'subscriber'),
    subscriptions_devotee = (SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'devotee'),
    subscriptions_mystic = (SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'enlightened'),
    revenue_estimate = (SELECT COALESCE(SUM(amount::DECIMAL / 100), 0) FROM payments WHERE status = 'succeeded' AND created_at > NOW() - INTERVAL '30 days'),
    last_updated = NOW()
  WHERE id = '00000000-0000-0000-0000-000000000001';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_update_subscription_analytics()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_subscription_analytics();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_subscription_change AFTER INSERT OR UPDATE OR DELETE ON subscriptions FOR EACH STATEMENT EXECUTE FUNCTION trigger_update_subscription_analytics();

-- ============================================================================
-- VIEWS
-- ============================================================================

CREATE VIEW active_subscriptions_view AS
  SELECT s.*, c.email, c.name, c.user_id FROM subscriptions s
  JOIN customers c ON s.stripe_customer_id = c.stripe_customer_id
  WHERE s.status = 'active' ORDER BY s.created_at DESC;

CREATE VIEW recent_payments_view AS
  SELECT p.*, c.email, c.name FROM payments p
  JOIN customers c ON p.stripe_customer_id = c.stripe_customer_id
  ORDER BY p.created_at DESC LIMIT 100;

CREATE VIEW recent_events AS SELECT * FROM admin_events ORDER BY timestamp DESC LIMIT 100;

GRANT SELECT ON active_subscriptions_view TO anon, authenticated;
GRANT SELECT ON recent_payments_view TO anon, authenticated;
GRANT SELECT ON recent_events TO anon, authenticated;

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO subscription_tiers (id, name, display_name, price, daily_token_allowance, features, sort_order) VALUES
  ('seeker', 'Seeker', 'Seeker', 0.00, 10, '["Basic AI chat", "Limited avatars", "Daily inspiration"]', 1),
  ('subscriber', 'Subscriber', 'Subscriber', 0.00, 25, '["All Seeker features", "Email-based access", "Community access", "More avatars"]', 2),
  ('devotee', 'Devotee', 'Devotee', 9.99, 100, '["All Subscriber features", "Full avatar access", "Unlimited scroll", "Token rewards"]', 3),
  ('enlightened', 'Enlightened', 'Enlightened', 14.99, -1, '["All Devotee features", "Priority avatar access", "Unlimited tokens", "Exclusive events"]', 4);

INSERT INTO token_packages (id, name, description, base_tokens, bonus_tokens, price, featured, sort_order) VALUES
  ('starter', 'Starter Token Package', '120 tokens (100 base + 20 bonus)', 100, 20, 4.99, FALSE, 1),
  ('popular', 'Popular Token Package', '325 tokens (250 base + 75 bonus)', 250, 75, 9.99, TRUE, 2),
  ('premium', 'Premium Token Package', '700 tokens (500 base + 200 bonus)', 500, 200, 19.99, FALSE, 3),
  ('ultimate', 'Ultimate Token Package', '1500 tokens (1000 base + 500 bonus)', 1000, 500, 34.99, FALSE, 4);

INSERT INTO admin_analytics (id) VALUES ('00000000-0000-0000-0000-000000000001');

SELECT calculate_admin_analytics();
SELECT update_subscription_analytics();
