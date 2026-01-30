-- ============================================================================
-- FINAL FIX: Add Missing SELECT Policy for admin_analytics
-- ============================================================================
-- This adds the SELECT policy that was missing, allowing the admin panel
-- to read analytics data without 400 errors
-- ============================================================================

-- Add SELECT policy for admin_analytics
DROP POLICY IF EXISTS "admin_analytics_select" ON public.admin_analytics;
CREATE POLICY "admin_analytics_select"
  ON public.admin_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Success
SELECT 
  '✅ Admin analytics SELECT policy added!' as message,
  COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'admin_analytics';
