-- ============================================================================
-- 🚨 CRITICAL FIX: Resolves All Signup Errors (406, 401, 400)
-- ============================================================================
-- This migration adds the missing RLS policies that allow:
-- 1. Authenticated users to create/manage their own data
-- 2. Anonymous users to read public data (subscription tiers, token packages)
-- 3. The trigger to properly initialize user data on signup
--
-- HOW TO RUN:
-- 1. Go to: https://app.supabase.com/project/wukzavslddamlxoksxuo/sql/new
-- 2. Copy this ENTIRE file
-- 3. Paste and click "Run"
-- 4. Wait for: 🎉 MIGRATION SUCCESSFUL!
-- 5. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
-- ============================================================================

BEGIN;

-- ============================================================================
-- SECTION 1: DROP ALL EXISTING POLICIES (Clean Slate)
-- ============================================================================

-- Users table
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

-- User preferences
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_select_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_insert_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_update_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_all_operations" ON public.user_preferences;

-- Token balances
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can insert own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_select_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_insert_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_update_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_all_operations" ON public.token_balances;

-- User subscriptions
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_select_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_insert_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_update_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_all_operations" ON public.user_subscriptions;

-- Subscription tiers
DROP POLICY IF EXISTS "Anyone can view subscription tiers" ON public.subscription_tiers;
DROP POLICY IF EXISTS "Public read subscription_tiers" ON public.subscription_tiers;

-- Token packages
DROP POLICY IF EXISTS "Anyone can view token packages" ON public.token_packages;
DROP POLICY IF EXISTS "Public read token_packages" ON public.token_packages;

-- Admin analytics
DROP POLICY IF EXISTS "Public read admin_analytics" ON public.admin_analytics;
DROP POLICY IF EXISTS "Anyone can view admin_analytics" ON public.admin_analytics;

-- ============================================================================
-- SECTION 2: CREATE NEW RLS POLICIES (Authenticated Users)
-- ============================================================================

-- USERS: Allow authenticated users to SELECT, INSERT, UPDATE their own data
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "users_insert_own"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- USER_PREFERENCES: Allow full access to own preferences
CREATE POLICY "preferences_all_operations"
  ON public.user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- TOKEN_BALANCES: Allow full access to own token balance
CREATE POLICY "token_balances_all_operations"
  ON public.token_balances
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- USER_SUBSCRIPTIONS: Allow full access to own subscriptions
CREATE POLICY "subscriptions_all_operations"
  ON public.user_subscriptions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SECTION 3: PUBLIC READ POLICIES (Anonymous Users)
-- ============================================================================

-- Allow everyone to read subscription tiers (needed for pricing page)
CREATE POLICY "Public read subscription_tiers"
  ON public.subscription_tiers
  FOR SELECT
  TO public
  USING (true);

-- Allow everyone to read token packages (needed for token store)
CREATE POLICY "Public read token_packages"
  ON public.token_packages
  FOR SELECT
  TO public
  USING (true);

-- ============================================================================
-- SECTION 4: ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_packages ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SECTION 5: FIX/RECREATE TRIGGER FOR USER INITIALIZATION
-- ============================================================================

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_user_data() CASCADE;

-- Create improved trigger function with better error handling
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER 
SECURITY DEFINER -- Required to bypass RLS during trigger execution
SET search_path = public
AS $$
DECLARE
  v_tier_id TEXT;
  v_username TEXT;
  v_faith TEXT;
BEGIN
  -- Determine default tier
  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    v_tier_id := 'subscriber';
  ELSE
    v_tier_id := 'seeker';
  END IF;

  -- Generate username
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1),
    'user_' || substring(NEW.id::text, 1, 8)
  );

  -- Get faith tradition
  v_faith := COALESCE(
    NEW.raw_user_meta_data->>'faith_tradition',
    'Not specified'
  );

  -- Create user record
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
  
  -- Create default preferences
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
    'light',
    FALSE,
    NULL,
    50,
    TRUE,
    TRUE,
    '08:00'
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Create token balance (Subscriber gets 25 tokens, Seeker gets 10)
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
  
  -- Create subscription
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
    NOW() + INTERVAL '1 year'
  )
  ON CONFLICT (user_id, tier_id, status) DO NOTHING;
  
  RAISE NOTICE '✅ User % initialized successfully with tier %', NEW.email, v_tier_id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth signup
    RAISE WARNING '❌ Error in initialize_user_data for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- ============================================================================
-- SECTION 6: GRANT PERMISSIONS
-- ============================================================================

GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant specific read permissions to anon
GRANT SELECT ON public.subscription_tiers TO anon;
GRANT SELECT ON public.token_packages TO anon;

-- ============================================================================
-- SECTION 7: VERIFICATION & SUCCESS MESSAGE
-- ============================================================================

DO $$
DECLARE
  trigger_count INTEGER;
  policy_count INTEGER;
  tier_count INTEGER;
BEGIN
  -- Check trigger exists
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger
  WHERE tgname = 'on_auth_user_created';
  
  -- Check policies exist
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE policyname IN (
    'users_select_own',
    'users_insert_own',
    'users_update_own',
    'preferences_all_operations',
    'token_balances_all_operations',
    'subscriptions_all_operations',
    'Public read subscription_tiers',
    'Public read token_packages'
  );
  
  -- Check subscription tiers exist
  SELECT COUNT(*) INTO tier_count
  FROM public.subscription_tiers;
  
  IF trigger_count > 0 AND policy_count >= 6 AND tier_count >= 4 THEN
    RAISE NOTICE '';
    RAISE NOTICE '╔════════════════════════════════════════════════════════════╗';
    RAISE NOTICE '║                                                            ║';
    RAISE NOTICE '║   🎉  MIGRATION SUCCESSFUL!  🎉                            ║';
    RAISE NOTICE '║                                                            ║';
    RAISE NOTICE '╚════════════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Trigger created: %', trigger_count;
    RAISE NOTICE '✅ RLS policies created: %', policy_count;
    RAISE NOTICE '✅ Subscription tiers: %', tier_count;
    RAISE NOTICE '';
    RAISE NOTICE '📝 What happens now when users sign up:';
    RAISE NOTICE '   1. Auth record created ✅';
    RAISE NOTICE '   2. Trigger auto-creates:';
    RAISE NOTICE '      • User record in public.users';
    RAISE NOTICE '      • Default preferences';
    RAISE NOTICE '      • Token balance (25 for subscribers, 10 for seekers)';
    RAISE NOTICE '      • Active subscription';
    RAISE NOTICE '   3. RLS protects all data (users see only their own)';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 NEXT STEPS:';
    RAISE NOTICE '   1. Hard refresh browser: Cmd+Shift+R or Ctrl+Shift+F5';
    RAISE NOTICE '   2. Try signing up with a new email';
    RAISE NOTICE '   3. Check Table Editor to verify user was created';
    RAISE NOTICE '';
  ELSE
    RAISE EXCEPTION '❌ Migration incomplete! Trigger: %, Policies: %, Tiers: %', 
      trigger_count, policy_count, tier_count;
  END IF;
END $$;

COMMIT;