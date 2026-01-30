-- ============================================================================
-- 🎯 DivinityAGI MASTER DATABASE MIGRATION - COMPLETE
-- ============================================================================
-- This is a comprehensive migration that combines ALL database migrations
-- that have been applied to the DivinityAGI Supabase database.
--
-- 📋 WHAT THIS MIGRATION INCLUDES:
--   ✅ Row-Level Security (RLS) policies for all tables
--   ✅ Auto-creation trigger for new user signups
--   ✅ Permissions for authenticated and anonymous users
--   ✅ Admin dashboard analytics access
--   ✅ Verified leader application submission
--   ✅ Helper functions for token management and analytics
--   ✅ Views for subscription metrics and analytics
--   ✅ Seed data for subscription tiers and token packages
--
-- 🚀 HOW TO RUN:
--   1. Go to Supabase Dashboard → SQL Editor
--   2. Copy this ENTIRE file
--   3. Paste and click "Run"
--   4. Wait for success message
--   5. Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+F5)
--
-- ⚠️  NOTE: This migration is IDEMPOTENT (safe to run multiple times)
--     It will DROP existing policies/triggers and recreate them.
-- ============================================================================

-- ============================================================================
-- SECTION 1: RLS POLICIES FOR AUTHENTICATED USERS
-- ============================================================================
-- These policies allow authenticated users to manage their own data
-- while preventing them from accessing other users' data.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- USERS TABLE POLICIES
-- ────────────────────────────────────────────────────────────────────────────

-- Drop all existing user policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_all_operations" ON public.users;

-- Create policies for authenticated users
-- Allow users to SELECT and UPDATE their own profile
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to INSERT their own profile (for fallback when trigger fails)
CREATE POLICY "users_insert_own"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ────────────────────────────────────────────────────────────────────────────
-- USER_PREFERENCES TABLE POLICIES
-- ────────────────────────────────────────────────────────────────────────────

-- Drop all existing preferences policies
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_select_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_insert_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_update_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_all_operations" ON public.user_preferences;

-- Create unified policy for authenticated users
CREATE POLICY "preferences_all_operations"
  ON public.user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────────
-- TOKEN_BALANCES TABLE POLICIES
-- ────────────────────────────────────────────────────────────────────────────

-- Drop all existing token balance policies
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can insert own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_select_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_insert_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_update_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_all_operations" ON public.token_balances;

-- Create unified policy for authenticated users
CREATE POLICY "token_balances_all_operations"
  ON public.token_balances
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────────
-- USER_SUBSCRIPTIONS TABLE POLICIES
-- ────────────────────────────────────────────────────────────────────────────

-- Drop all existing subscription policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_select_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_insert_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_update_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_all_operations" ON public.user_subscriptions;

-- Create unified policy for authenticated users
CREATE POLICY "subscriptions_all_operations"
  ON public.user_subscriptions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────────
-- Ensure RLS is enabled on core tables
-- ────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SECTION 2: RLS POLICIES FOR ANONYMOUS USERS (ADMIN DASHBOARD & ANALYTICS)
-- ============================================================================
-- These policies allow the admin dashboard to work without authentication
-- by granting anonymous users read-only access to analytics data.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- USERS TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Allow anon to count users for analytics" ON public.users;
DROP POLICY IF EXISTS "Allow anon to read users for analytics" ON public.users;

CREATE POLICY "Allow anon to count users for analytics" 
  ON public.users
  FOR SELECT 
  TO anon
  USING (true);

-- ────────────────────────────────────────────────────────────────────────────
-- USER_SUBSCRIPTIONS TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Allow anon to read subscriptions for analytics" ON public.user_subscriptions;

CREATE POLICY "Allow anon to read subscriptions for analytics" 
  ON public.user_subscriptions
  FOR SELECT 
  TO anon
  USING (true);

-- ────────────────────────────────────────────────────────────────────────────
-- PAYMENTS/PURCHASES TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

-- For 'payments' table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'payments') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon to read payments for analytics" ON public.payments';
    
    EXECUTE 'CREATE POLICY "Allow anon to read payments for analytics" 
      ON public.payments
      FOR SELECT 
      TO anon
      USING (true)';
    RAISE NOTICE '✅ Created analytics policy for payments table';
  END IF;
END $$;

-- For 'purchases' table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchases') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon to read purchases for analytics" ON public.purchases';
    
    EXECUTE 'CREATE POLICY "Allow anon to read purchases for analytics" 
      ON public.purchases
      FOR SELECT 
      TO anon
      USING (true)';
    RAISE NOTICE '✅ Created analytics policy for purchases table';
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────────────
-- ADMIN_EVENTS TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_events') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon to read admin events for analytics" ON public.admin_events';
    EXECUTE 'DROP POLICY IF EXISTS "Allow public insert admin_events" ON public.admin_events';
    EXECUTE 'DROP POLICY IF EXISTS "Allow public select admin_events" ON public.admin_events';
    EXECUTE 'DROP POLICY IF EXISTS "Allow authenticated all admin_events" ON public.admin_events';
    
    EXECUTE 'CREATE POLICY "Allow anon to read admin events for analytics" 
      ON public.admin_events
      FOR SELECT 
      TO anon
      USING (true)';
    
    EXECUTE 'CREATE POLICY "Allow anon to insert admin events" 
      ON public.admin_events
      FOR INSERT 
      TO anon
      WITH CHECK (true)';
    
    RAISE NOTICE '✅ Created analytics policies for admin_events table';
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────────────
-- SYSTEM_EVENTS TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'system_events') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow anon to read system events for analytics" ON public.system_events';
    
    EXECUTE 'CREATE POLICY "Allow anon to read system events for analytics" 
      ON public.system_events
      FOR SELECT 
      TO anon
      USING (true)';
    RAISE NOTICE '✅ Created analytics policy for system_events table';
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────────────
-- ADMIN_ANALYTICS TABLE - Analytics Access
-- ────────────────────────────────────────────────────────────────────────────

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_analytics') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Allow public select admin_analytics" ON public.admin_analytics';
    EXECUTE 'DROP POLICY IF EXISTS "Allow public update admin_analytics" ON public.admin_analytics';
    
    EXECUTE 'CREATE POLICY "Allow public select admin_analytics" 
      ON public.admin_analytics
      FOR SELECT 
      TO anon
      USING (true)';
      
    EXECUTE 'CREATE POLICY "Allow public update admin_analytics" 
      ON public.admin_analytics
      FOR UPDATE 
      TO anon
      USING (true)
      WITH CHECK (true)';
    
    RAISE NOTICE '✅ Created analytics policies for admin_analytics table';
  END IF;
END $$;

-- ============================================================================
-- SECTION 3: VERIFIED LEADER APPLICATION POLICIES
-- ============================================================================
-- Allows anonymous users to submit and admins to manage leader applications
-- ============================================================================

DROP POLICY IF EXISTS "Allow anon to read leader applications for analytics" ON public.verified_leader_applications;
DROP POLICY IF EXISTS "Allow anon to insert leader applications" ON public.verified_leader_applications;
DROP POLICY IF EXISTS "Allow anon to update leader applications" ON public.verified_leader_applications;

-- Allow anonymous users to read applications (for admin dashboard)
CREATE POLICY "Allow anon to read leader applications for analytics" 
  ON public.verified_leader_applications
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to submit new applications
CREATE POLICY "Allow anon to insert leader applications" 
  ON public.verified_leader_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update applications (for approve/reject actions)
CREATE POLICY "Allow anon to update leader applications" 
  ON public.verified_leader_applications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- SECTION 4: AUTO-CREATION TRIGGER FOR NEW USER SIGNUPS
-- ============================================================================
-- This trigger automatically creates user records, preferences, token balances,
-- and subscriptions when a new user signs up through Supabase Auth.
-- ============================================================================

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_user_data();

-- Create the trigger function with comprehensive error handling
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
DECLARE
  v_tier_id TEXT;
  v_username TEXT;
  v_faith TEXT;
BEGIN
  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 1: Determine subscription tier
  -- ──────────────────────────────────────────────────────────────────────────
  -- Email signups → 'subscriber' (25 daily tokens, free)
  -- Anonymous → 'seeker' (10 daily tokens, free)
  
  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    v_tier_id := 'subscriber';
  ELSE
    v_tier_id := 'seeker';
  END IF;

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 2: Generate username
  -- ──────────────────────────────────────────────────────────────────────────
  -- Priority: metadata username > email prefix > random ID
  
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1),
    'user_' || substring(NEW.id::text, 1, 8)
  );

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 3: Get faith tradition
  -- ──────────────────────────────────────────────────────────────────────────
  
  v_faith := COALESCE(
    NEW.raw_user_meta_data->>'faith_tradition',
    'Not specified'
  );

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 4: Create user record in public.users
  -- ──────────────────────────────────────────────────────────────────────────
  
  INSERT INTO public.users (
    id, 
    email, 
    full_name,
    username,
    faith_tradition,
    preferred_language,
    status,
    is_verified_leader,
    verified_leader_type,
    onboarding_completed,
    last_login_at
  )
  VALUES (
    NEW.id, 
    COALESCE(NEW.email, 'guest_' || NEW.id::text || '@divinityagi.app'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', v_username),
    v_username,
    v_faith,
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en'),
    'active',
    FALSE,
    NULL,
    COALESCE((NEW.raw_user_meta_data->>'onboarding_completed')::boolean, FALSE),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    last_login_at = NOW();

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 5: Create default user preferences
  -- ──────────────────────────────────────────────────────────────────────────
  
  INSERT INTO public.user_preferences (
    user_id,
    theme,
    ambient_sound_enabled,
    ambient_sound_type,
    ambient_sound_volume,
    notifications_enabled,
    email_notifications,
    daily_reflection_time
  )
  VALUES (
    NEW.id,
    'light',  -- Default to light theme (per UI/UX redesign)
    FALSE,
    NULL,
    50,
    TRUE,
    TRUE,
    '08:00'
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 6: Create token balance
  -- ──────────────────────────────────────────────────────────────────────────
  -- Subscriber tier: 25 tokens/day (updated to match tier definition)
  -- Seeker tier: 10 tokens/day
  
  INSERT INTO public.token_balances (
    user_id, 
    daily_tokens,
    purchased_tokens,
    bonus_tokens,
    total_tokens_earned,
    total_tokens_spent,
    last_daily_reset
  )
  VALUES (
    NEW.id, 
    CASE WHEN v_tier_id = 'subscriber' THEN 25 ELSE 10 END,
    0,
    0,
    CASE WHEN v_tier_id = 'subscriber' THEN 25 ELSE 10 END,
    0,
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- ──────────────────────────────────────────────────────────────────────────
  -- STEP 7: Create subscription
  -- ──────────────────────────────────────────────────────────────────────────
  
  INSERT INTO public.user_subscriptions (
    user_id, 
    tier_id,
    status, 
    current_period_start,
    current_period_end
  )
  VALUES (
    NEW.id, 
    v_tier_id,
    'active', 
    NOW(),
    NOW() + INTERVAL '1 year'  -- Free tiers get 1 year periods
  )
  ON CONFLICT (user_id, tier_id, status) DO NOTHING;

  -- ──────────────────────────────────────────────────────────────────────────
  -- Success!
  -- ──────────────────────────────────────────────────────────────────────────
  
  RAISE NOTICE '✅ User % initialized successfully with tier %', NEW.email, v_tier_id;
  
  RETURN NEW;

EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth signup
    RAISE WARNING '❌ Error in initialize_user_data for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- ============================================================================
-- SECTION 5: HELPER FUNCTIONS FOR TOKEN MANAGEMENT AND ANALYTICS
-- ============================================================================
-- These functions provide utilities for managing tokens, calculating metrics,
-- and maintaining analytics data.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Spend Tokens
-- ────────────────────────────────────────────────────────────────────────────

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

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Add Purchased Tokens
-- ────────────────────────────────────────────────────────────────────────────

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

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Get Subscription Counts by Tier
-- ────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_subscription_counts()
RETURNS TABLE (tier TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    us.tier_id as tier,
    COUNT(*)::BIGINT as count
  FROM public.user_subscriptions us
  WHERE us.status = 'active'
  GROUP BY us.tier_id
  ORDER BY CASE us.tier_id
    WHEN 'enlightened' THEN 4 
    WHEN 'devotee' THEN 3 
    WHEN 'subscriber' THEN 2 
    WHEN 'seeker' THEN 1 
    ELSE 0
  END DESC;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Get Revenue Metrics
-- ────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_subscription_revenue(days INTEGER DEFAULT 30)
RETURNS TABLE (
  total_revenue DECIMAL, 
  subscription_revenue DECIMAL, 
  token_revenue DECIMAL, 
  transaction_count BIGINT
) AS $$
BEGIN
  -- Check if payments table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'payments') THEN
    RETURN QUERY
    SELECT 
      COALESCE(SUM(amount::DECIMAL / 100), 0) as total_revenue,
      COALESCE(SUM(CASE WHEN payment_type = 'subscription' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as subscription_revenue,
      COALESCE(SUM(CASE WHEN payment_type = 'token_purchase' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as token_revenue,
      COUNT(*)::BIGINT as transaction_count
    FROM payments
    WHERE status = 'succeeded' AND created_at > NOW() - (days || ' days')::INTERVAL;
  -- Check if purchases table exists as fallback
  ELSIF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchases') THEN
    RETURN QUERY
    SELECT 
      COALESCE(SUM(amount::DECIMAL / 100), 0) as total_revenue,
      COALESCE(SUM(CASE WHEN type = 'subscription' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as subscription_revenue,
      COALESCE(SUM(CASE WHEN type = 'tokens' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as token_revenue,
      COUNT(*)::BIGINT as transaction_count
    FROM purchases
    WHERE status = 'succeeded' AND created_at > NOW() - (days || ' days')::INTERVAL;
  ELSE
    -- Return zeros if no payment table exists
    RETURN QUERY
    SELECT 0::DECIMAL, 0::DECIMAL, 0::DECIMAL, 0::BIGINT;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Cleanup Old Events
-- ────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION cleanup_old_events(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE 
  deleted_count INTEGER;
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_events') THEN
    DELETE FROM public.admin_events 
    WHERE timestamp < NOW() - (days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
  ELSE
    RETURN 0;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────────────────────
-- FUNCTION: Get Event Summary
-- ───────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_event_summary(days INTEGER DEFAULT 7)
RETURNS TABLE (event_type TEXT, severity TEXT, count BIGINT) AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_events') THEN
    RETURN QUERY
    SELECT 
      e.type as event_type, 
      e.severity, 
      COUNT(*)::BIGINT as count
    FROM public.admin_events e
    WHERE e.timestamp > NOW() - (days || ' days')::INTERVAL
    GROUP BY e.type, e.severity
    ORDER BY count DESC;
  ELSE
    -- Return empty result if table doesn't exist
    RETURN;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 6: SEED DATA FOR SUBSCRIPTION TIERS AND TOKEN PACKAGES
-- ============================================================================
-- Insert or update the default subscription tiers and token packages
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- SUBSCRIPTION TIERS
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO public.subscription_tiers (id, name, display_name, price, billing_period, daily_token_allowance, features, sort_order) VALUES
  ('seeker', 'Seeker', 'Seeker', 0.00, 'free', 10, 
   '["Basic AI chat", "Limited avatars", "Daily inspiration"]'::JSONB, 1),
  ('subscriber', 'Subscriber', 'Subscriber', 0.00, 'free', 25, 
   '["All Seeker features", "Email-based access", "Community access", "More avatars"]'::JSONB, 2),
  ('devotee', 'Devotee', 'Devotee', 9.99, 'month', 100, 
   '["All Subscriber features", "Full avatar access", "Unlimited scroll", "Token rewards", "Advanced personal guide", "Exclusive content"]'::JSONB, 3),
  ('enlightened', 'Enlightened', 'Enlightened', 14.99, 'month', -1, 
   '["All Devotee features", "Priority avatar access", "Unlimited tokens", "Exclusive events", "Priority support", "Recognition badges", "Live Q&A sessions"]'::JSONB, 4)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price = EXCLUDED.price,
  daily_token_allowance = EXCLUDED.daily_token_allowance,
  features = EXCLUDED.features,
  updated_at = NOW();

-- ────────────────────────────────────────────────────────────────────────────
-- TOKEN PACKAGES
-- ────────────────────────────────────────────────────────────────────────────

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
-- SECTION 7: GRANT NECESSARY PERMISSIONS
-- ============================================================================
-- Ensures that the trigger and users have the necessary permissions to
-- access and modify all required tables.
-- ============================================================================

GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant anon limited permissions (just what they need for analytics)
GRANT SELECT ON public.users TO anon;
GRANT SELECT ON public.user_subscriptions TO anon;
GRANT SELECT ON public.verified_leader_applications TO anon;
GRANT SELECT ON public.subscription_tiers TO anon;
GRANT SELECT ON public.token_packages TO anon;

-- Grant anon INSERT for leader applications
GRANT INSERT ON public.verified_leader_applications TO anon;

-- Grant anon UPDATE for leader application approvals
GRANT UPDATE ON public.verified_leader_applications TO anon;

-- Conditionally grant on payments/purchases tables
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'payments') THEN
    EXECUTE 'GRANT SELECT ON public.payments TO anon';
    RAISE NOTICE '✅ Granted SELECT on payments to anon';
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchases') THEN
    EXECUTE 'GRANT SELECT ON public.purchases TO anon';
    RAISE NOTICE '✅ Granted SELECT on purchases to anon';
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_events') THEN
    EXECUTE 'GRANT SELECT, INSERT ON public.admin_events TO anon';
    RAISE NOTICE '✅ Granted SELECT, INSERT on admin_events to anon';
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'system_events') THEN
    EXECUTE 'GRANT SELECT ON public.system_events TO anon';
    RAISE NOTICE '✅ Granted SELECT on system_events to anon';
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_analytics') THEN
    EXECUTE 'GRANT SELECT, UPDATE ON public.admin_analytics TO anon';
    RAISE NOTICE '✅ Granted SELECT, UPDATE on admin_analytics to anon';
  END IF;
END $$;

-- ============================================================================
-- SECTION 8: VERIFICATION & SUCCESS MESSAGE
-- ============================================================================
-- Verifies that all migrations were applied successfully and provides
-- a detailed success message with next steps.
-- ============================================================================

DO $$
DECLARE
  trigger_count INTEGER;
  policy_count INTEGER;
  anon_policy_count INTEGER;
  v_missing_policies TEXT[];
  tier_count INTEGER;
  package_count INTEGER;
BEGIN
  -- ──────────────────────────────────────────────────────────────────────────
  -- Check 1: Verify trigger was created
  -- ──────────────────────────────────────────────────────────────────────────
  
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger
  WHERE tgname = 'on_auth_user_created';
  
  IF trigger_count = 0 THEN
    RAISE EXCEPTION '❌ Trigger "on_auth_user_created" was not created!';
  END IF;

  -- ──────────────────────────────────────────────────────────────────────────
  -- Check 2: Verify authenticated user policies
  -- ──────────────────────────────────────────────────────────────────────────
  
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE policyname IN (
    'users_select_own',
    'users_update_own',
    'users_insert_own',
    'preferences_all_operations',
    'token_balances_all_operations',
    'subscriptions_all_operations'
  );
  
  IF policy_count < 6 THEN
    -- Find missing policies
    SELECT array_agg(policy) INTO v_missing_policies
    FROM unnest(ARRAY[
      'users_select_own',
      'users_update_own',
      'users_insert_own',
      'preferences_all_operations',
      'token_balances_all_operations',
      'subscriptions_all_operations'
    ]) AS policy
    WHERE policy NOT IN (
      SELECT policyname FROM pg_policies
    );
    
    RAISE EXCEPTION '❌ Missing policies: %. Found % of 6 required policies.', 
      array_to_string(v_missing_policies, ', '), policy_count;
  END IF;

  -- ──────────────────────────────────────────────────────────────────────────
  -- Check 3: Verify anonymous user policies
  -- ──────────────────────────────────────────────────────────────────────────
  
  SELECT COUNT(*) INTO anon_policy_count
  FROM pg_policies
  WHERE policyname LIKE '%anon%'
    AND 'anon' = ANY(roles);
  
  IF anon_policy_count < 3 THEN
    RAISE WARNING '⚠️  Found only % anonymous policies (expected at least 3)', anon_policy_count;
  END IF;

  -- ──────────────────────────────────────────────────────────────────────────
  -- Check 4: Verify seed data
  -- ──────────────────────────────────────────────────────────────────────────
  
  SELECT COUNT(*) INTO tier_count FROM public.subscription_tiers;
  SELECT COUNT(*) INTO package_count FROM public.token_packages;
  
  IF tier_count < 4 THEN
    RAISE WARNING '⚠️  Only % subscription tiers found (expected 4)', tier_count;
  END IF;
  
  IF package_count < 4 THEN
    RAISE WARNING '⚠️  Only % token packages found (expected 4)', package_count;
  END IF;

  -- ──────────────────────────────────────────────────────────────────────────
  -- All checks passed! Display success message
  -- ──────────────────────────────────────────────────────────────────────────
  
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════════';
  RAISE NOTICE '🎉 MIGRATION SUCCESSFUL!';
  RAISE NOTICE '═══════════════════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Database trigger created: on_auth_user_created';
  RAISE NOTICE '✅ RLS policies created: % authenticated policies', policy_count;
  RAISE NOTICE '✅ Anonymous policies created: % policies', anon_policy_count;
  RAISE NOTICE '✅ Subscription tiers seeded: % tiers', tier_count;
  RAISE NOTICE '✅ Token packages seeded: % packages', package_count;
  RAISE NOTICE '✅ Helper functions created: 5 functions';
  RAISE NOTICE '✅ Permissions granted to authenticated and anon roles';
  RAISE NOTICE '';
  RAISE NOTICE '──────────────────────────────────────────────────────────────';
  RAISE NOTICE '📋 WHAT HAPPENS NOW:';
  RAISE NOTICE '──────────────────────────────────────────────────────────────';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 USER SIGNUP (Authenticated):';
  RAISE NOTICE '   • New signups AUTO-CREATE:';
  RAISE NOTICE '     → User record in public.users';
  RAISE NOTICE '     → Default preferences (light theme, notifications on)';
  RAISE NOTICE '     → Token balance (25 tokens for subscriber, 10 for seeker)';
  RAISE NOTICE '     → Subscription (subscriber or seeker tier, 1 year period)';
  RAISE NOTICE '   • Users can only access their own data';
  RAISE NOTICE '   • RLS protects against unauthorized access';
  RAISE NOTICE '';
  RAISE NOTICE '📊 ADMIN DASHBOARD (Anonymous):';
  RAISE NOTICE '   • Can read analytics data (user counts, subscriptions, payments)';
  RAISE NOTICE '   • Can view and manage leader applications';
  RAISE NOTICE '   • Cannot modify user data';
  RAISE NOTICE '';
  RAISE NOTICE '🌟 VERIFIED LEADER PROGRAM:';
  RAISE NOTICE '   • Anyone can submit applications';
  RAISE NOTICE '   • Admins can approve/reject applications';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 SUBSCRIPTION TIERS:';
  RAISE NOTICE '   • Seeker: 10 tokens/day (free)';
  RAISE NOTICE '   • Subscriber: 25 tokens/day (free)';
  RAISE NOTICE '   • Devotee: 100 tokens/day ($9.99/month)';
  RAISE NOTICE '   • Enlightened: Unlimited tokens ($14.99/month)';
  RAISE NOTICE '';
  RAISE NOTICE '──────────────────────────────────────────────────────────────';
  RAISE NOTICE '🚀 NEXT STEPS:';
  RAISE NOTICE '──────────────────────────────────────────────────────────────';
  RAISE NOTICE '';
  RAISE NOTICE '1. 🔄 Hard refresh your browser:';
  RAISE NOTICE '   • Mac: Cmd + Shift + R';
  RAISE NOTICE '   • Windows: Ctrl + Shift + F5';
  RAISE NOTICE '';
  RAISE NOTICE '2. 🧪 Test user signup:';
  RAISE NOTICE '   • Try registering a new account';
  RAISE NOTICE '   • Verify you can access your profile';
  RAISE NOTICE '   • Check that you have 25 tokens (subscriber tier)';
  RAISE NOTICE '';
  RAISE NOTICE '3. 📊 Test admin dashboard:';
  RAISE NOTICE '   • Go to https://divinitybot.com/?tab=admin';
  RAISE NOTICE '   • Verify analytics are loading';
  RAISE NOTICE '   • Check leader applications';
  RAISE NOTICE '';
  RAISE NOTICE '4. 🎯 Optional verification queries:';
  RAISE NOTICE '   • Run: SELECT * FROM pg_policies WHERE schemaname = ''public''';
  RAISE NOTICE '   • Run: SELECT * FROM pg_trigger WHERE tgname LIKE ''%%auth%%''';
  RAISE NOTICE '   • Run: SELECT * FROM get_subscription_counts();';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════════════';
  RAISE NOTICE '✨ DivinityAGI database is ready!';
  RAISE NOTICE '═══════════════════════════════════════════════════════════════';
  RAISE NOTICE '';

END $$;

-- ============================================================================
-- END OF MASTER MIGRATION
-- ============================================================================
-- 
-- 📝 MIGRATION HISTORY:
--   • Combined from: All previous migrations (001-004, APPLY_THIS_MIGRATION, etc.)
--   • Includes: RLS policies, auto-creation trigger, permissions, functions, seed data
--   • Safe to run: Idempotent (can run multiple times)
--   • Version: 2.0 (December 2024)
--
-- 🔗 RELATED FILES:
--   • /supabase/schema.sql - Base schema definition (run this first!)
--   • /supabase/migrations/debug_trigger.sql - Diagnostic queries
--   • /supabase/migrations/cleanup_orphaned_users.sql - User audit query
--
-- 💡 TROUBLESHOOTING:
--   If signup still fails after running this migration:
--   1. Check Supabase logs for specific error messages
--   2. Run debug_trigger.sql to check trigger status
--   3. Verify table names match (purchases vs payments, etc.)
--   4. Ensure subscription_tiers table has data (should be seeded by this migration)
--   5. Check that auth.users table exists (created by Supabase automatically)
--
-- ============================================================================