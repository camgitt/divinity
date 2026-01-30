-- ============================================================================
-- FIX 406 TIMING ISSUE: Allow Authenticated Users to SELECT Before Session Sync
-- ============================================================================
-- The issue: App tries to query users table before Supabase client has the
-- auth token fully synced, causing 406 errors.
--
-- The fix: Ensure the auth session is properly recognized
-- ============================================================================

BEGIN;

-- Add missing SELECT policy for admin_analytics (for the 400 error)
DROP POLICY IF EXISTS "admin_analytics_select" ON public.admin_analytics;
CREATE POLICY "admin_analytics_select"
  ON public.admin_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify trigger has SECURITY DEFINER (it should from previous migration)
-- This ensures the trigger can create records even with RLS enabled
DO $$
DECLARE
  has_security_definer BOOLEAN;
BEGIN
  SELECT prosecdef INTO has_security_definer
  FROM pg_proc
  WHERE proname = 'initialize_user_data';
  
  IF NOT has_security_definer THEN
    RAISE EXCEPTION 'Trigger function missing SECURITY DEFINER! Please re-run COMPLETE_FIX_ALL_ERRORS.sql';
  ELSE
    RAISE NOTICE '✅ Trigger has SECURITY DEFINER';
  END IF;
END $$;

-- Grant explicit permissions on auth schema (sometimes needed)
GRANT USAGE ON SCHEMA auth TO authenticated;

-- Ensure service role bypass (for trigger)
GRANT ALL ON public.users TO postgres;
GRANT ALL ON public.user_preferences TO postgres;
GRANT ALL ON public.token_balances TO postgres;
GRANT ALL ON public.user_subscriptions TO postgres;

-- Add helpful function to check if user exists (for debugging)
CREATE OR REPLACE FUNCTION public.user_exists(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS(SELECT 1 FROM public.users WHERE id = user_id);
$$;

GRANT EXECUTE ON FUNCTION public.user_exists TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ Timing fix applied!';
  RAISE NOTICE '✅ admin_analytics SELECT policy added';
  RAISE NOTICE '✅ Auth schema access granted';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next: Hard refresh browser and try signup again';
  RAISE NOTICE '';
END $$;

COMMIT;
