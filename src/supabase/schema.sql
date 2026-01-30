-- ============================================================================
-- DivinityAGI Database Schema
-- Supabase PostgreSQL Database
-- Version: 1.0
-- Last Updated: December 2024
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- PART 1: CORE USER TABLES
-- ============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  onboarding_completed BOOLEAN DEFAULT FALSE
);

-- User preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'cosmic')),
  ambient_sound_enabled BOOLEAN DEFAULT FALSE,
  ambient_sound_type TEXT,
  ambient_sound_volume INTEGER DEFAULT 50 CHECK (ambient_sound_volume >= 0 AND ambient_sound_volume <= 100),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT FALSE,
  daily_reflection_time TIME,
  preferred_avatars JSONB DEFAULT '[]'::JSONB,
  accessibility_settings JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================================
-- PART 2: SUBSCRIPTION TABLES
-- ============================================================================

-- Subscription tiers (reference data)
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  billing_period TEXT DEFAULT 'month' CHECK (billing_period IN ('month', 'year', 'lifetime', 'free')),
  daily_token_allowance INTEGER DEFAULT 0,
  stripe_price_id TEXT,
  features JSONB DEFAULT '[]'::JSONB,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription tiers
INSERT INTO public.subscription_tiers (id, name, display_name, price, daily_token_allowance, features, sort_order) VALUES
  ('seeker', 'Seeker', 'Seeker', 0.00, 10, 
   '["Basic AI chat", "Limited avatars", "Daily inspiration"]'::JSONB, 1),
  ('subscriber', 'Subscriber', 'Subscriber', 0.00, 25, 
   '["All Seeker features", "Email-based access", "Community access", "More avatars"]'::JSONB, 2),
  ('devotee', 'Devotee', 'Devotee', 9.99, 100, 
   '["All Subscriber features", "Full avatar access", "Unlimited scroll", "Token rewards", "Advanced personal guide", "Exclusive content"]'::JSONB, 3),
  ('enlightened', 'Enlightened', 'Enlightened', 14.99, -1, 
   '["All Devotee features", "Priority avatar access", "Unlimited tokens", "Exclusive events", "Priority support", "Recognition badges", "Live Q&A sessions"]'::JSONB, 4)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price = EXCLUDED.price,
  daily_token_allowance = EXCLUDED.daily_token_allowance,
  features = EXCLUDED.features,
  updated_at = NOW();

-- User subscriptions
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tier_id TEXT REFERENCES public.subscription_tiers(id) NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'unpaid')),
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster subscription lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer ON public.user_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);

-- Create partial unique index to ensure only one active subscription per user per tier
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_unique_active 
  ON public.user_subscriptions(user_id, tier_id, status) 
  WHERE status = 'active';

-- ============================================================================
-- PART 3: TOKEN SYSTEM TABLES
-- ============================================================================

-- Token balances
CREATE TABLE IF NOT EXISTS public.token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  daily_tokens INTEGER DEFAULT 0,
  purchased_tokens INTEGER DEFAULT 0,
  bonus_tokens INTEGER DEFAULT 0,
  total_tokens_earned INTEGER DEFAULT 0,
  total_tokens_spent INTEGER DEFAULT 0,
  last_daily_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Token transactions (audit log)
CREATE TABLE IF NOT EXISTS public.token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'spent', 'purchased', 'bonus', 'refund', 'daily_reset', 'expired')),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  reference_id TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for transaction history queries
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON public.token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_created_at ON public.token_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_token_transactions_type ON public.token_transactions(type);

-- Token packages (reference data)
CREATE TABLE IF NOT EXISTS public.token_packages (
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
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default token packages
INSERT INTO public.token_packages (id, name, description, base_tokens, bonus_tokens, price, featured, sort_order) VALUES
  ('starter', 'Starter Token Package', '120 spiritual guidance tokens (100 base + 20 bonus)', 100, 20, 4.99, FALSE, 1),
  ('popular', 'Popular Token Package', '325 spiritual guidance tokens (250 base + 75 bonus)', 250, 75, 9.99, TRUE, 2),
  ('premium', 'Premium Token Package', '700 spiritual guidance tokens (500 base + 200 bonus)', 500, 200, 19.99, FALSE, 3),
  ('ultimate', 'Ultimate Token Package', '1500 spiritual guidance tokens (1000 base + 500 bonus)', 1000, 500, 34.99, FALSE, 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  base_tokens = EXCLUDED.base_tokens,
  bonus_tokens = EXCLUDED.bonus_tokens,
  price = EXCLUDED.price,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- ============================================================================
-- PART 4: PAYMENT TABLES
-- ============================================================================

-- Payments/Purchases
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  stripe_customer_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('subscription', 'tokens', 'one_time')),
  payment_type TEXT CHECK (payment_type IN ('card', 'ach', 'apple_pay', 'google_pay', 'other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'canceled', 'refunded')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  description TEXT,
  token_package_id TEXT REFERENCES public.token_packages(id),
  token_amount INTEGER,
  subscription_id UUID REFERENCES public.user_subscriptions(id),
  receipt_url TEXT,
  receipt_email TEXT,
  failure_code TEXT,
  failure_message TEXT,
  refunded_amount INTEGER DEFAULT 0,
  refunded_at TIMESTAMP WITH TIME ZONE,
  brand TEXT,
  last4 TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for payment queries
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_customer ON public.purchases(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON public.purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(created_at DESC);

-- ============================================================================
-- PART 5: ACTIVITY & ENGAGEMENT TABLES
-- ============================================================================

-- Chat sessions
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  avatar_id TEXT NOT NULL,
  avatar_name TEXT,
  faith_tradition TEXT,
  title TEXT,
  tokens_used INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for user chat history
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON public.chat_sessions(started_at DESC);

-- Quiet Space sessions
CREATE TABLE IF NOT EXISTS public.quiet_space_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  space_type TEXT NOT NULL,
  ambient_sound TEXT,
  duration_seconds INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily reflections
CREATE TABLE IF NOT EXISTS public.daily_reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reflection_date DATE NOT NULL,
  faith_tradition TEXT,
  content TEXT NOT NULL,
  title TEXT,
  source TEXT,
  viewed BOOLEAN DEFAULT FALSE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, reflection_date)
);

-- User activity log
CREATE TABLE IF NOT EXISTS public.user_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'login', 'logout', 'chat_started', 'chat_ended', 'token_purchase', 
    'subscription_change', 'reflection_viewed', 'quiet_space', 'avatar_interaction'
  )),
  description TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for activity queries
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON public.user_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_activity_type ON public.user_activity_log(activity_type);

-- ============================================================================
-- PART 6: VERIFIED LEADER PROGRAM
-- ============================================================================

-- Verified leader applications
CREATE TABLE IF NOT EXISTS public.verified_leader_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  application_type TEXT NOT NULL CHECK (application_type IN ('ministry', 'individual')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'additional_info_needed')),
  
  -- Common fields
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  faith_tradition TEXT NOT NULL,
  
  -- Individual fields
  credentials TEXT,
  years_of_service INTEGER,
  bio TEXT,
  
  -- Ministry fields
  ministry_name TEXT,
  ministry_website TEXT,
  ministry_size TEXT,
  ministry_address TEXT,
  verification_documents JSONB DEFAULT '[]'::JSONB,
  
  -- Admin review
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  rejection_reason TEXT,
  
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verified leader content contributions
CREATE TABLE IF NOT EXISTS public.leader_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  leader_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
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
  published_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PART 7: ADMIN & MONITORING TABLES
-- ============================================================================

-- Admin users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator', 'support')),
  permissions JSONB DEFAULT '[]'::JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Admin events (for tracking all app events)
CREATE TABLE IF NOT EXISTS public.admin_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id TEXT,
  user_email TEXT,
  user_name TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  notification_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for admin_events
CREATE INDEX IF NOT EXISTS idx_admin_events_type ON public.admin_events(type);
CREATE INDEX IF NOT EXISTS idx_admin_events_severity ON public.admin_events(severity);
CREATE INDEX IF NOT EXISTS idx_admin_events_timestamp ON public.admin_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_admin_events_created_at ON public.admin_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_events_user_email ON public.admin_events(user_email) WHERE user_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_admin_events_metadata ON public.admin_events USING GIN (metadata);

-- Drop existing admin_analytics safely (handles both view and table)
DO $$ 
DECLARE
    obj_type TEXT;
BEGIN
    -- Check what type of object admin_analytics is
    SELECT 
        CASE 
            WHEN c.relkind = 'r' THEN 'table'
            WHEN c.relkind = 'v' THEN 'view'
            ELSE NULL
        END INTO obj_type
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' 
    AND c.relname = 'admin_analytics';
    
    -- Drop based on type
    IF obj_type = 'table' THEN
        EXECUTE 'DROP TABLE IF EXISTS public.admin_analytics CASCADE';
        RAISE NOTICE 'Dropped admin_analytics TABLE';
    ELSIF obj_type = 'view' THEN
        EXECUTE 'DROP VIEW IF EXISTS public.admin_analytics CASCADE';
        RAISE NOTICE 'Dropped admin_analytics VIEW';
    ELSE
        RAISE NOTICE 'admin_analytics does not exist, skipping drop';
    END IF;
END $$;

-- Admin analytics (cached aggregated metrics)
CREATE TABLE public.admin_analytics (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::UUID,
  
  -- User metrics
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_signups_24h INTEGER DEFAULT 0,
  new_signups_7d INTEGER DEFAULT 0,
  
  -- Subscription metrics
  total_subscriptions INTEGER DEFAULT 0,
  subscriptions_seeker INTEGER DEFAULT 0,
  subscriptions_subscriber INTEGER DEFAULT 0,
  subscriptions_devotee INTEGER DEFAULT 0,
  subscriptions_enlightened INTEGER DEFAULT 0,
  
  -- Financial metrics
  revenue_estimate DECIMAL(10,2) DEFAULT 0,
  
  -- System health
  error_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Verified leader metrics
  pending_applications INTEGER DEFAULT 0,
  ministry_applications INTEGER DEFAULT 0,
  individual_applications INTEGER DEFAULT 0,
  
  -- Timestamps
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialize the single row for admin_analytics
INSERT INTO public.admin_analytics (id) 
VALUES ('00000000-0000-0000-0000-000000000001'::UUID)
ON CONFLICT (id) DO NOTHING;

-- System events (for admin monitoring)
CREATE TABLE IF NOT EXISTS public.system_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  user_email TEXT,
  notification_sent BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for event monitoring
CREATE INDEX IF NOT EXISTS idx_system_events_created_at ON public.system_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_severity ON public.system_events(severity);
CREATE INDEX IF NOT EXISTS idx_system_events_event_type ON public.system_events(event_type);

-- Support tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ticket_number TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('technical', 'billing', 'content', 'account', 'other')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_user', 'resolved', 'closed')),
  assigned_to UUID REFERENCES public.admin_users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PART 8: FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON public.user_preferences;
DROP TRIGGER IF EXISTS update_subscription_tiers_updated_at ON public.subscription_tiers;
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON public.user_subscriptions;
DROP TRIGGER IF EXISTS update_token_balances_updated_at ON public.token_balances;
DROP TRIGGER IF EXISTS update_token_packages_updated_at ON public.token_packages;
DROP TRIGGER IF EXISTS update_purchases_updated_at ON public.purchases;

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_tiers_updated_at BEFORE UPDATE ON public.subscription_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_token_balances_updated_at BEFORE UPDATE ON public.token_balances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_token_packages_updated_at BEFORE UPDATE ON public.token_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize user data on signup
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user record
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  -- Create default preferences
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  
  -- Create default token balance
  INSERT INTO public.token_balances (user_id, daily_tokens)
  VALUES (NEW.id, 10); -- Seeker tier default
  
  -- Create default subscription (free tier)
  INSERT INTO public.user_subscriptions (user_id, tier_id, status, current_period_start)
  VALUES (NEW.id, 'seeker', 'active', NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger to initialize user data on auth signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- Function to reset daily tokens
CREATE OR REPLACE FUNCTION reset_daily_tokens()
RETURNS void AS $$
BEGIN
  UPDATE public.token_balances tb
  SET 
    daily_tokens = COALESCE(
      (SELECT daily_token_allowance 
       FROM public.subscription_tiers st
       JOIN public.user_subscriptions us ON us.tier_id = st.id
       WHERE us.user_id = tb.user_id 
         AND us.status = 'active'
       ORDER BY st.price DESC
       LIMIT 1
      ), 10
    ),
    last_daily_reset = NOW()
  WHERE last_daily_reset < NOW() - INTERVAL '1 day';
  
  -- Log the reset
  INSERT INTO public.token_transactions (user_id, type, amount, balance_after, description)
  SELECT 
    tb.user_id,
    'daily_reset',
    tb.daily_tokens,
    tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens,
    'Daily token allowance reset'
  FROM public.token_balances tb
  WHERE tb.last_daily_reset >= NOW() - INTERVAL '1 minute';
END;
$$ LANGUAGE plpgsql;

-- Function to spend tokens
CREATE OR REPLACE FUNCTION spend_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
BEGIN
  -- Get current balance
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_current_balance
  FROM public.token_balances
  WHERE user_id = p_user_id;
  
  -- Check if user has enough tokens
  IF v_current_balance < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct tokens (prioritize: daily -> bonus -> purchased)
  UPDATE public.token_balances
  SET
    daily_tokens = GREATEST(0, daily_tokens - p_amount),
    bonus_tokens = GREATEST(0, bonus_tokens - GREATEST(0, p_amount - daily_tokens)),
    purchased_tokens = GREATEST(0, purchased_tokens - GREATEST(0, p_amount - daily_tokens - bonus_tokens)),
    total_tokens_spent = total_tokens_spent + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Calculate new balance
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_new_balance
  FROM public.token_balances
  WHERE user_id = p_user_id;
  
  -- Log transaction
  INSERT INTO public.token_transactions (user_id, type, amount, balance_after, description)
  VALUES (p_user_id, 'spent', -p_amount, v_new_balance, p_description);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to add purchased tokens
CREATE OR REPLACE FUNCTION add_purchased_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_reference_id TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- Add tokens
  UPDATE public.token_balances
  SET
    purchased_tokens = purchased_tokens + p_amount,
    total_tokens_earned = total_tokens_earned + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  -- Get new balance
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_new_balance
  FROM public.token_balances
  WHERE user_id = p_user_id;
  
  -- Log transaction
  INSERT INTO public.token_transactions (user_id, type, amount, balance_after, description, reference_id)
  VALUES (p_user_id, 'purchased', p_amount, v_new_balance, 'Token package purchased', p_reference_id);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 9: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiet_space_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_leader_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leader_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can view own token transactions" ON public.token_transactions;
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;
DROP POLICY IF EXISTS "Users can view own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can insert own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can view own quiet space sessions" ON public.quiet_space_sessions;
DROP POLICY IF EXISTS "Users can insert own quiet space sessions" ON public.quiet_space_sessions;
DROP POLICY IF EXISTS "Users can view own reflections" ON public.daily_reflections;
DROP POLICY IF EXISTS "Users can insert own reflections" ON public.daily_reflections;
DROP POLICY IF EXISTS "Users can update own reflections" ON public.daily_reflections;
DROP POLICY IF EXISTS "Users can view own support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can create support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Anyone can view subscription tiers" ON public.subscription_tiers;
DROP POLICY IF EXISTS "Anyone can view token packages" ON public.token_packages;
DROP POLICY IF EXISTS "Anyone can view published contributions" ON public.leader_contributions;
DROP POLICY IF EXISTS "Leaders can manage own contributions" ON public.leader_contributions;
DROP POLICY IF EXISTS "Users can view own activity log" ON public.user_activity_log;
DROP POLICY IF EXISTS "Users can insert own activity log" ON public.user_activity_log;
DROP POLICY IF EXISTS "Users can view own applications" ON public.verified_leader_applications;
DROP POLICY IF EXISTS "Users can insert applications" ON public.verified_leader_applications;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription policies
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Token balance policies
CREATE POLICY "Users can view own token balance" ON public.token_balances
  FOR SELECT USING (auth.uid() = user_id);

-- Token transaction policies
CREATE POLICY "Users can view own token transactions" ON public.token_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Purchase policies
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Chat session policies
CREATE POLICY "Users can view own chat sessions" ON public.chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON public.chat_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Quiet space policies
CREATE POLICY "Users can view own quiet space sessions" ON public.quiet_space_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiet space sessions" ON public.quiet_space_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily reflections policies
CREATE POLICY "Users can view own reflections" ON public.daily_reflections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reflections" ON public.daily_reflections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reflections" ON public.daily_reflections
  FOR UPDATE USING (auth.uid() = user_id);

-- Support ticket policies
CREATE POLICY "Users can view own support tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create support tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reference tables (public read access)
CREATE POLICY "Anyone can view subscription tiers" ON public.subscription_tiers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view token packages" ON public.token_packages
  FOR SELECT USING (true);

-- Leader contributions (public read for published content)
CREATE POLICY "Anyone can view published contributions" ON public.leader_contributions
  FOR SELECT USING (status = 'published');

CREATE POLICY "Leaders can manage own contributions" ON public.leader_contributions
  FOR ALL USING (auth.uid() = leader_id);

-- ============================================================================
-- PART 10: VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View for user dashboard data
CREATE OR REPLACE VIEW user_dashboard AS
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.username,
  u.faith_tradition,
  us.tier_id,
  st.display_name as tier_name,
  st.price as tier_price,
  us.status as subscription_status,
  us.current_period_end,
  tb.daily_tokens,
  tb.purchased_tokens,
  tb.bonus_tokens,
  (tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens) as total_tokens,
  tb.total_tokens_earned,
  tb.total_tokens_spent,
  u.is_verified_leader,
  u.created_at,
  u.last_login_at
FROM public.users u
LEFT JOIN public.user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
LEFT JOIN public.subscription_tiers st ON us.tier_id = st.id
LEFT JOIN public.token_balances tb ON u.id = tb.user_id;

-- View for real-time admin analytics (use admin_analytics table for cached version)
CREATE OR REPLACE VIEW admin_analytics_realtime AS
SELECT
  COUNT(DISTINCT u.id) as total_users,
  COUNT(DISTINCT CASE WHEN u.last_login_at >= NOW() - INTERVAL '30 days' THEN u.id END) as active_users_30d,
  COUNT(DISTINCT CASE WHEN u.created_at >= NOW() - INTERVAL '1 day' THEN u.id END) as new_signups_24h,
  COUNT(DISTINCT CASE WHEN u.created_at >= NOW() - INTERVAL '7 days' THEN u.id END) as new_signups_7d,
  COUNT(DISTINCT CASE WHEN us.status = 'active' AND st.price > 0 THEN us.id END) as paid_subscriptions,
  COALESCE(SUM(CASE WHEN us.status = 'active' THEN st.price END), 0) as monthly_recurring_revenue,
  COUNT(DISTINCT CASE WHEN u.is_verified_leader = true THEN u.id END) as verified_leaders
FROM public.users u
LEFT JOIN public.user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
LEFT JOIN public.subscription_tiers st ON us.tier_id = st.id;

-- ============================================================================
-- PART 11: INITIAL DATA & SETUP
-- ============================================================================

-- Generate ticket number sequence
CREATE SEQUENCE IF NOT EXISTS support_ticket_number_seq START 1000;

-- Function to generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'DIVINITY-' || LPAD(nextval('support_ticket_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Set default ticket number
ALTER TABLE public.support_tickets 
  ALTER COLUMN ticket_number SET DEFAULT generate_ticket_number();

-- ============================================================================
-- PART 12: UTILITY FUNCTIONS
-- ============================================================================

-- Function to get user's current tier
CREATE OR REPLACE FUNCTION get_user_tier(p_user_id UUID)
RETURNS TEXT AS $$
  SELECT tier_id
  FROM public.user_subscriptions
  WHERE user_id = p_user_id 
    AND status = 'active'
  ORDER BY 
    CASE tier_id
      WHEN 'enlightened' THEN 4
      WHEN 'devotee' THEN 3
      WHEN 'subscriber' THEN 2
      ELSE 1
    END DESC
  LIMIT 1;
$$ LANGUAGE sql STABLE;

-- Function to check if user has access to feature
CREATE OR REPLACE FUNCTION user_has_feature(p_user_id UUID, p_feature TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_tier_id TEXT;
  v_features JSONB;
BEGIN
  -- Get user's current tier
  v_tier_id := get_user_tier(p_user_id);
  
  IF v_tier_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Get tier features
  SELECT features INTO v_features
  FROM public.subscription_tiers
  WHERE id = v_tier_id;
  
  -- Check if feature exists in tier
  RETURN v_features ? p_feature;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get user's token balance
CREATE OR REPLACE FUNCTION get_token_balance(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT (daily_tokens + purchased_tokens + bonus_tokens)
  FROM public.token_balances
  WHERE user_id = p_user_id;
$$ LANGUAGE sql STABLE;

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================

-- Grant necessary permissions (adjust based on your needs)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'DivinityAGI Database Schema Created Successfully!';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Tables created: 20';
  RAISE NOTICE 'Views created: 2';
  RAISE NOTICE 'Functions created: 10+';
  RAISE NOTICE 'RLS policies enabled: Yes';
  RAISE NOTICE 'Default data inserted: Yes';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Update Stripe Price IDs in subscription_tiers table';
  RAISE NOTICE '2. Update Stripe Price IDs in token_packages table';
  RAISE NOTICE '3. Test user signup flow';
  RAISE NOTICE '4. Configure Stripe webhooks';
  RAISE NOTICE '============================================================';
END $$;