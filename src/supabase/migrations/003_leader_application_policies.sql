-- ============================================================================
-- Verified Leader Application RLS Policies
-- Allows anonymous users to submit verified leader applications
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anon to insert leader applications" ON public.verified_leader_applications;

-- Allow anonymous users to INSERT new leader applications (for submissions)
CREATE POLICY "Allow anon to insert leader applications" 
  ON public.verified_leader_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'verified_leader_applications'
AND 'anon' = ANY(roles)
ORDER BY policyname;
