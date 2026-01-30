-- ============================================================================
-- Admin Analytics RLS Policies
-- Allows anonymous users to query analytics data for the admin dashboard
-- ============================================================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anon to count users for analytics" ON public.users;
DROP POLICY IF EXISTS "Allow anon to read subscriptions for analytics" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Allow anon to read payments for analytics" ON public.payments;
DROP POLICY IF EXISTS "Allow anon to read admin events for analytics" ON public.admin_events;
DROP POLICY IF EXISTS "Allow anon to read leader applications for analytics" ON public.verified_leader_applications;
DROP POLICY IF EXISTS "Allow anon to update leader applications" ON public.verified_leader_applications;

-- Allow anonymous users to count users (for analytics)
CREATE POLICY "Allow anon to count users for analytics" ON public.users
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to read user subscriptions (for analytics)
CREATE POLICY "Allow anon to read subscriptions for analytics" ON public.user_subscriptions
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to read payments (for analytics)
CREATE POLICY "Allow anon to read payments for analytics" ON public.payments
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to read admin events (for analytics)
CREATE POLICY "Allow anon to read admin events for analytics" ON public.admin_events
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to read verified leader applications (for admin dashboard)
CREATE POLICY "Allow anon to read leader applications for analytics" ON public.verified_leader_applications
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to update verified leader applications (for approve/reject)
CREATE POLICY "Allow anon to update leader applications" ON public.verified_leader_applications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Note: These policies allow READ-ONLY access for counting and analytics
-- They do NOT allow INSERT or DELETE operations