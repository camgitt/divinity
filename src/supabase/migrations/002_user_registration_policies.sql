-- ============================================================================
-- User Registration RLS Policies
-- Allows anonymous users to create accounts and register
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anon to insert users" ON public.users;
DROP POLICY IF EXISTS "Allow anon to insert preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Allow anon to insert token balances" ON public.token_balances;
DROP POLICY IF EXISTS "Allow anon to insert subscriptions" ON public.user_subscriptions;

-- 1. Allow anonymous users to INSERT new users (for registration)
CREATE POLICY "Allow anon to insert users" 
  ON public.users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 2. Allow anonymous users to INSERT user preferences (for new users)
CREATE POLICY "Allow anon to insert preferences" 
  ON public.user_preferences
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 3. Allow anonymous users to INSERT token balances (for new users)
CREATE POLICY "Allow anon to insert token balances" 
  ON public.token_balances
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Allow anonymous users to INSERT user subscriptions (for new users)
CREATE POLICY "Allow anon to insert subscriptions" 
  ON public.user_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Allow users to update their own data (for profile updates)
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" 
  ON public.users
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 6. Allow users to update their own preferences
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
CREATE POLICY "Users can update own preferences" 
  ON public.user_preferences
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 7. Allow users to update their own token balance
DROP POLICY IF EXISTS "Users can update own token balance" ON public.token_balances;
CREATE POLICY "Users can update own token balance" 
  ON public.token_balances
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 8. Allow users to update their own subscriptions
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can update own subscription" 
  ON public.user_subscriptions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'user_preferences', 'token_balances', 'user_subscriptions')
AND 'anon' = ANY(roles)
ORDER BY tablename, policyname;
