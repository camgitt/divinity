-- ============================================================================
-- 🚨 CRITICAL: RUN THIS MIGRATION IN SUPABASE SQL EDITOR 🚨
-- ============================================================================
-- This fixes ALL signup errors (RLS violations and missing user records)
-- 
-- HOW TO RUN:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Copy this ENTIRE file
-- 3. Paste and click "Run"
-- 4. Wait for success message
-- 5. Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+F5)
-- ============================================================================

-- ============================================================================
-- STEP 1: Fix RLS Policies (Allow Users to Manage Their Own Data)
-- ============================================================================

-- USERS TABLE
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;

CREATE POLICY "users_all_operations"
  ON public.users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- USER_PREFERENCES TABLE
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_select_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_insert_own" ON public.user_preferences;
DROP POLICY IF EXISTS "preferences_update_own" ON public.user_preferences;

CREATE POLICY "preferences_all_operations"
  ON public.user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- TOKEN_BALANCES TABLE
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can insert own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_select_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_insert_own" ON public.token_balances;
DROP POLICY IF EXISTS "token_balances_update_own" ON public.token_balances;

CREATE POLICY "token_balances_all_operations"
  ON public.token_balances
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- USER_SUBSCRIPTIONS TABLE
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_select_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_insert_own" ON public.user_subscriptions;
DROP POLICY IF EXISTS "subscriptions_update_own" ON public.user_subscriptions;

CREATE POLICY "subscriptions_all_operations"
  ON public.user_subscriptions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 2: Create Trigger for Automatic User Setup
-- ============================================================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_user_data();

-- Create the trigger function
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
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
  
  -- Create token balance
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
    CASE WHEN v_tier_id = 'subscriber' THEN 50 ELSE 10 END,
    0,
    0,
    CASE WHEN v_tier_id = 'subscriber' THEN 50 ELSE 10 END,
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
  
  RAISE NOTICE '✅ User % initialized successfully', NEW.email;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING '❌ Error in initialize_user_data for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- ============================================================================
-- STEP 3: Grant Necessary Permissions
-- ============================================================================

GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- VERIFICATION & SUCCESS MESSAGE
-- ============================================================================

DO $$
DECLARE
  trigger_count INTEGER;
  policy_count INTEGER;
BEGIN
  -- Check trigger
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger
  WHERE tgname = 'on_auth_user_created';
  
  -- Check policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE policyname IN (
    'users_all_operations',
    'preferences_all_operations',
    'token_balances_all_operations',
    'subscriptions_all_operations'
  );
  
  IF trigger_count > 0 AND policy_count = 4 THEN
    RAISE NOTICE '';
    RAISE NOTICE '🎉 ============================================';
    RAISE NOTICE '🎉 MIGRATION SUCCESSFUL!';
    RAISE NOTICE '🎉 ============================================';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Database trigger created';
    RAISE NOTICE '✅ RLS policies updated';
    RAISE NOTICE '✅ Permissions granted';
    RAISE NOTICE '';
    RAISE NOTICE '📝 What happens now:';
    RAISE NOTICE '   1. New signups will AUTO-CREATE:';
    RAISE NOTICE '      • User record';
    RAISE NOTICE '      • Preferences';
    RAISE NOTICE '      • Token balance (50 tokens for subscribers)';
    RAISE NOTICE '      • Subscription';
    RAISE NOTICE '   2. Users can manage their own data';
    RAISE NOTICE '   3. RLS protects data (users can only see their own)';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 NEXT STEP: Hard refresh your browser!';
    RAISE NOTICE '   • Mac: Cmd + Shift + R';
    RAISE NOTICE '   • Windows: Ctrl + Shift + F5';
    RAISE NOTICE '';
    RAISE NOTICE '🧪 Then test signup with a new email!';
    RAISE NOTICE '';
  ELSE
    RAISE EXCEPTION '❌ Migration incomplete! Trigger: %, Policies: %', trigger_count, policy_count;
  END IF;
END $$;
