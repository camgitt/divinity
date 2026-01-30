-- ============================================================================
-- View recently created users
-- ============================================================================
SELECT 
  '👥 Recently Created Users' as info,
  u.id,
  u.email,
  u.full_name,
  u.faith_tradition,
  u.created_at,
  EXISTS(SELECT 1 FROM user_preferences WHERE user_id = u.id) as has_preferences,
  EXISTS(SELECT 1 FROM token_balances WHERE user_id = u.id) as has_tokens,
  EXISTS(SELECT 1 FROM user_subscriptions WHERE user_id = u.id AND status = 'active') as has_subscription
FROM public.users u
ORDER BY u.created_at DESC
LIMIT 20;