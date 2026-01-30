-- ============================================================================
-- FIX: Row-Level Security (RLS) Policies for User Registration
-- ============================================================================
-- This migration fixes RLS policies that are blocking user creation during signup.
-- The trigger (initialize_user_data) runs with SECURITY DEFINER so it bypasses RLS,
-- but frontend calls may still fail if policies are too restrictive.
-- ============================================================================

-- ============================================================================
-- USERS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;

-- Create permissive policies for authenticated users
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

-- ============================================================================
-- USER_PREFERENCES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;

-- Create permissive policies
CREATE POLICY "preferences_select_own"
  ON public.user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "preferences_insert_own"
  ON public.user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "preferences_update_own"
  ON public.user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- TOKEN_BALANCES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;
DROP POLICY IF EXISTS "Users can insert own token balance" ON public.token_balances;

-- Create permissive policies
CREATE POLICY "token_balances_select_own"
  ON public.token_balances
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "token_balances_insert_own"
  ON public.token_balances
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "token_balances_update_own"
  ON public.token_balances
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- USER_SUBSCRIPTIONS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;

-- Create permissive policies
CREATE POLICY "subscriptions_select_own"
  ON public.user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "subscriptions_insert_own"
  ON public.user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscriptions_update_own"
  ON public.user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- ENSURE RLS IS ENABLED
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ RLS policies updated successfully!';
  RAISE NOTICE '📝 Policies now allow authenticated users to:';
  RAISE NOTICE '   - SELECT their own data';
  RAISE NOTICE '   - INSERT their own records (signup)';
  RAISE NOTICE '   - UPDATE their own data';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Security: Users can only access their own data (auth.uid() = user_id)';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Ready to test! Try signing up now.';
END $$;
