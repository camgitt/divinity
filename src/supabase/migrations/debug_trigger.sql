-- ============================================================================
-- DEBUG: Check Current Trigger Status
-- ============================================================================
-- Run this in Supabase SQL Editor to diagnose trigger issues
-- ============================================================================

-- 1. Check if trigger exists
SELECT 
  '🔍 Checking for trigger...' as step,
  CASE 
    WHEN COUNT(*) > 0 THEN '✅ Trigger EXISTS'
    ELSE '❌ Trigger NOT FOUND - Need to run migration!'
  END as status
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';

-- 2. Check trigger details
SELECT 
  '📋 Trigger Details' as info,
  tgname as trigger_name,
  tgtype as trigger_type,
  tgenabled as enabled,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';

-- 3. View current trigger function source
SELECT 
  '📝 Current Function Source' as info,
  prosrc as function_source
FROM pg_proc
WHERE proname = 'initialize_user_data';

-- 4. Check recent auth.users
SELECT 
  '👥 Recent Auth Users (last 10)' as info,
  id,
  email,
  created_at,
  email_confirmed_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check if public.users records were created for recent signups
SELECT 
  '🔗 Public Users Records' as info,
  u.id,
  u.email,
  u.full_name,
  u.faith_tradition,
  u.created_at
FROM public.users u
ORDER BY u.created_at DESC
LIMIT 10;

-- 6. Find orphaned auth users (users in auth.users but not in public.users)
SELECT 
  '🚨 Orphaned Auth Users (in auth.users but NOT in public.users)' as issue,
  a.id,
  a.email,
  a.created_at
FROM auth.users a
LEFT JOIN public.users p ON a.id = p.id
WHERE p.id IS NULL
ORDER BY a.created_at DESC;

-- 7. Check subscription_tiers table exists and has data
SELECT 
  '📊 Subscription Tiers' as info,
  id,
  name,
  daily_token_allowance,
  price
FROM public.subscription_tiers
ORDER BY sort_order;

-- 8. Check table constraints
SELECT 
  '🔐 user_subscriptions Constraints' as info,
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'public.user_subscriptions'::regclass;

-- 9. Test basic insert capability (this WON'T create a real user)
DO $$
BEGIN
  RAISE NOTICE '🧪 Testing table access permissions...';
  
  -- Check if we can read from tables
  PERFORM 1 FROM public.users LIMIT 1;
  RAISE NOTICE '  ✅ Can read from public.users';
  
  PERFORM 1 FROM public.user_preferences LIMIT 1;
  RAISE NOTICE '  ✅ Can read from user_preferences';
  
  PERFORM 1 FROM public.token_balances LIMIT 1;
  RAISE NOTICE '  ✅ Can read from token_balances';
  
  PERFORM 1 FROM public.user_subscriptions LIMIT 1;
  RAISE NOTICE '  ✅ Can read from user_subscriptions';
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ All table access checks passed!';
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE '❌ Error accessing tables: %', SQLERRM;
END $$;

-- ============================================================================
-- INTERPRETATION GUIDE
-- ============================================================================
-- 
-- ✅ GOOD STATUS:
-- - Trigger EXISTS
-- - Function source includes "ON CONFLICT DO NOTHING"
-- - No orphaned auth users
-- - All 4 subscription tiers exist
-- - Table access checks pass
--
-- ❌ BAD STATUS - Need to run migration:
-- - Trigger NOT FOUND
-- - Orphaned auth users exist
-- - Function missing error handling
-- - Subscription tiers missing
--
-- 🔧 HOW TO FIX:
-- If any checks fail, run: /supabase/migrations/003_fix_user_trigger.sql
-- ============================================================================