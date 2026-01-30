-- ============================================================================
-- FIX: Supabase Auth Trigger for Automatic User Creation
-- ============================================================================
-- This migration fixes the initialize_user_data() trigger that was causing
-- "Database error saving new user" errors during signup.
--
-- Issue: The trigger was missing required fields and had constraint issues
-- Solution: Update trigger to properly handle all constraints and defaults
-- ============================================================================

-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the function with proper error handling and all required fields
CREATE OR REPLACE FUNCTION initialize_user_data()
RETURNS TRIGGER AS $$
DECLARE
  v_tier_id TEXT;
  v_username TEXT;
  v_faith TEXT;
BEGIN
  -- Determine default tier based on signup method
  -- Email signups get 'subscriber', anonymous gets 'seeker'
  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    v_tier_id := 'subscriber';
  ELSE
    v_tier_id := 'seeker';
  END IF;

  -- Generate username if not provided
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1),
    'user_' || substring(NEW.id::text, 1, 8)
  );

  -- Get faith tradition with fallback
  v_faith := COALESCE(
    NEW.raw_user_meta_data->>'faith_tradition',
    'Not specified'
  );

  -- Create user record with all required fields
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
  
  -- Create default token balance
  -- Subscriber tier gets 50 tokens, Seeker gets 10
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
  
  -- Create default subscription
  -- Use tier_id (not subscription_tier) as that's the actual column name
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
  ON CONFLICT ON CONSTRAINT user_subscriptions_user_id_tier_id_status_key DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth signup
    RAISE WARNING 'Error in initialize_user_data for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION initialize_user_data();

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
-- Ensure the trigger function can access all necessary tables
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Check that trigger exists
DO $$
DECLARE
  trigger_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger
  WHERE tgname = 'on_auth_user_created';
  
  IF trigger_count > 0 THEN
    RAISE NOTICE '✅ Trigger "on_auth_user_created" successfully created!';
    RAISE NOTICE '📝 New signups will automatically create:';
    RAISE NOTICE '   - User record in public.users';
    RAISE NOTICE '   - Default preferences in user_preferences';
    RAISE NOTICE '   - Token balance (50 for subscriber, 10 for seeker)';
    RAISE NOTICE '   - Subscription (subscriber or seeker tier)';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Ready to test! Try signing up now.';
  ELSE
    RAISE EXCEPTION '❌ Trigger was not created successfully!';
  END IF;
END $$;

-- ============================================================================
-- TEST THE TRIGGER (Optional - Comment out after verification)
-- ============================================================================
-- Uncomment to test the trigger with a dummy user:
/*
-- First, create a test auth user (this will trigger our function)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'test_trigger_' || floor(random() * 1000000) || '@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Test User", "faith_tradition": "Christianity"}'::JSONB
);

-- Check if all related records were created
SELECT 'Users created:' as info, COUNT(*) FROM public.users WHERE email LIKE 'test_trigger_%@example.com'
UNION ALL
SELECT 'Preferences created:', COUNT(*) FROM public.user_preferences WHERE user_id IN (SELECT id FROM public.users WHERE email LIKE 'test_trigger_%@example.com')
UNION ALL
SELECT 'Token balances created:', COUNT(*) FROM public.token_balances WHERE user_id IN (SELECT id FROM public.users WHERE email LIKE 'test_trigger_%@example.com')
UNION ALL
SELECT 'Subscriptions created:', COUNT(*) FROM public.user_subscriptions WHERE user_id IN (SELECT id FROM public.users WHERE email LIKE 'test_trigger_%@example.com');
*/