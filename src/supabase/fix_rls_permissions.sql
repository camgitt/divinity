-- Fix RLS Permissions for User Registration
-- This fixes the "permission denied for table users" error
-- Run this in your Supabase SQL Editor

-- =============================================================================
-- 1. DROP EXISTING POLICIES (to avoid conflicts)
-- =============================================================================

DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;

-- =============================================================================
-- 2. CREATE NEW POLICIES WITH PROPER PERMISSIONS
-- =============================================================================

-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to INSERT their own user record (for manual creation fallback)
CREATE POLICY "Users can insert their own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow authenticated users to UPDATE their own profile
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- =============================================================================
-- 3. FIX THE TRIGGER TO USE SECURITY DEFINER
-- =============================================================================

-- Drop and recreate the trigger function with SECURITY DEFINER
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER -- This allows the function to bypass RLS
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into public.users table
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
  ) VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'faith_tradition', 'universal'),
    COALESCE(new.raw_user_meta_data->>'preferred_language', 'en'),
    'active',
    false,
    null,
    false,
    now()
  );

  -- Create default user preferences
  INSERT INTO public.user_preferences (
    user_id,
    theme,
    ambient_sound_enabled,
    ambient_sound_volume,
    notifications_enabled,
    email_notifications,
    daily_reflection_time
  ) VALUES (
    new.id,
    'light',
    true,
    50,
    true,
    true,
    '08:00:00'
  );

  -- Create initial token balance
  INSERT INTO public.token_balances (
    user_id,
    daily_tokens,
    purchased_tokens,
    bonus_tokens,
    total_tokens_earned,
    total_tokens_spent
  ) VALUES (
    new.id,
    25, -- subscriber tier gets 25 tokens
    0,
    0,
    25,
    0
  );

  -- Create initial subscription (subscriber tier)
  INSERT INTO public.user_subscriptions (
    user_id,
    tier_id,
    status,
    current_period_start,
    current_period_end
  ) VALUES (
    new.id,
    'subscriber',
    'active',
    now(),
    now() + interval '1 year'
  );

  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth signup
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN new;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 4. GRANT NECESSARY PERMISSIONS
-- =============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated, anon;

-- Grant permissions on tables
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_preferences TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.token_balances TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_subscriptions TO authenticated;

-- Grant permissions on sequences (needed for auto-increment IDs)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =============================================================================
-- 5. ADD POLICIES FOR RELATED TABLES
-- =============================================================================

-- User Preferences Policies
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;

CREATE POLICY "Users can view own preferences"
ON public.user_preferences
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
ON public.user_preferences
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
ON public.user_preferences
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Token Balances Policies
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can insert own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;

CREATE POLICY "Users can view own token balance"
ON public.token_balances
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own token balance"
ON public.token_balances
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own token balance"
ON public.token_balances
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User Subscriptions Policies
DROP POLICY IF EXISTS "Users can view own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;

CREATE POLICY "Users can view own subscription"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
ON public.user_subscriptions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- 6. VERIFY THE CHANGES
-- =============================================================================

-- Check that RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'user_preferences', 'token_balances', 'user_subscriptions');

-- Check policies
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('users', 'user_preferences', 'token_balances', 'user_subscriptions')
ORDER BY tablename, cmd;

-- Check trigger exists
SELECT tgname, tgenabled 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ RLS permissions fixed successfully!';
  RAISE NOTICE '✅ Users can now register and manage their own data';
  RAISE NOTICE '✅ Trigger has SECURITY DEFINER and will bypass RLS';
  RAISE NOTICE '';
  RAISE NOTICE '📝 Next steps:';
  RAISE NOTICE '1. Test user registration in your app';
  RAISE NOTICE '2. Check that no "permission denied" errors appear';
  RAISE NOTICE '3. Verify that user records are created automatically';
END $$;
