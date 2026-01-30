# DivinityAGI Database Quick Reference
## Common SQL Queries & Operations

**Quick access guide for day-to-day database operations**

---

## 📑 TABLE OF CONTENTS

1. [User Management](#user-management)
2. [Subscription Operations](#subscription-operations)
3. [Token Management](#token-management)
4. [Payment Queries](#payment-queries)
5. [Analytics & Reports](#analytics-reports)
6. [Admin Operations](#admin-operations)
7. [Maintenance Tasks](#maintenance-tasks)
8. [Troubleshooting](#troubleshooting)

---

## <a name="user-management"></a>👤 USER MANAGEMENT

### View All Users

```sql
SELECT 
  id,
  email,
  full_name,
  username,
  faith_tradition,
  status,
  is_verified_leader,
  created_at
FROM users
ORDER BY created_at DESC
LIMIT 50;
```

### Search User by Email

```sql
SELECT * FROM users 
WHERE email ILIKE '%search@example.com%';
```

### Find User by Username

```sql
SELECT * FROM users 
WHERE username = 'john_doe';
```

### Get User's Complete Profile

```sql
SELECT 
  u.*,
  up.theme,
  up.notifications_enabled,
  us.tier_id,
  st.display_name as tier_name,
  tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens as total_tokens
FROM users u
LEFT JOIN user_preferences up ON u.id = up.user_id
LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
LEFT JOIN subscription_tiers st ON us.tier_id = st.id
LEFT JOIN token_balances tb ON u.id = tb.user_id
WHERE u.email = 'user@example.com';
```

### Update User's Name

```sql
UPDATE users
SET full_name = 'New Name',
    updated_at = NOW()
WHERE id = 'user-uuid-here';
```

### Update User Status (Ban/Suspend)

```sql
-- Ban user
UPDATE users
SET status = 'banned',
    updated_at = NOW()
WHERE email = 'problem@user.com';

-- Unban user
UPDATE users
SET status = 'active',
    updated_at = NOW()
WHERE email = 'problem@user.com';
```

### Delete User (Complete Removal)

```sql
-- This will cascade delete all related data
DELETE FROM auth.users
WHERE email = 'user@example.com';

-- Verify deletion
SELECT COUNT(*) FROM users WHERE email = 'user@example.com';
-- Should return 0
```

### Find Inactive Users (No Activity in 30 Days)

```sql
SELECT 
  u.email,
  u.full_name,
  u.created_at,
  u.last_login_at,
  EXTRACT(DAY FROM NOW() - u.last_login_at) as days_since_login
FROM users u
WHERE u.last_login_at < NOW() - INTERVAL '30 days'
  OR u.last_login_at IS NULL
ORDER BY u.last_login_at ASC NULLS FIRST
LIMIT 100;
```

### Count Users by Faith Tradition

```sql
SELECT 
  COALESCE(faith_tradition, 'Not Set') as faith,
  COUNT(*) as user_count
FROM users
GROUP BY faith_tradition
ORDER BY user_count DESC;
```

---

## <a name="subscription-operations"></a>💳 SUBSCRIPTION OPERATIONS

### View All Active Subscriptions

```sql
SELECT 
  u.email,
  u.full_name,
  us.tier_id,
  st.display_name,
  st.price,
  us.status,
  us.current_period_start,
  us.current_period_end,
  us.stripe_subscription_id
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
JOIN subscription_tiers st ON us.tier_id = st.id
WHERE us.status = 'active'
ORDER BY us.created_at DESC;
```

### Find Subscriptions Expiring Soon (Next 7 Days)

```sql
SELECT 
  u.email,
  u.full_name,
  us.tier_id,
  us.current_period_end,
  EXTRACT(DAY FROM us.current_period_end - NOW()) as days_until_renewal
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
WHERE us.status = 'active'
  AND us.current_period_end <= NOW() + INTERVAL '7 days'
ORDER BY us.current_period_end ASC;
```

### Manually Create Subscription

```sql
-- For comp/free subscriptions
INSERT INTO user_subscriptions (
  user_id,
  tier_id,
  stripe_customer_id,
  status,
  current_period_start,
  current_period_end
) VALUES (
  'user-uuid-here',
  'devotee',
  'manual_subscription',
  'active',
  NOW(),
  NOW() + INTERVAL '1 month'
);
```

### Upgrade User Tier

```sql
-- Update existing subscription
UPDATE user_subscriptions
SET tier_id = 'enlightened',
    updated_at = NOW()
WHERE user_id = 'user-uuid-here'
  AND status = 'active';
```

### Cancel Subscription

```sql
UPDATE user_subscriptions
SET status = 'canceled',
    cancel_at_period_end = TRUE,
    canceled_at = NOW(),
    updated_at = NOW()
WHERE user_id = 'user-uuid-here'
  AND status = 'active';
```

### Extend Subscription (Add Free Month)

```sql
UPDATE user_subscriptions
SET current_period_end = current_period_end + INTERVAL '1 month',
    updated_at = NOW()
WHERE user_id = 'user-uuid-here'
  AND status = 'active';
```

### Count Subscriptions by Tier

```sql
SELECT 
  st.display_name,
  st.price,
  COUNT(us.id) as subscriber_count,
  (st.price * COUNT(us.id)) as monthly_revenue
FROM subscription_tiers st
LEFT JOIN user_subscriptions us ON st.id = us.tier_id AND us.status = 'active'
GROUP BY st.id, st.display_name, st.price
ORDER BY st.price DESC;
```

### Find Users on Trial

```sql
SELECT 
  u.email,
  u.full_name,
  us.tier_id,
  us.trial_start,
  us.trial_end,
  EXTRACT(DAY FROM us.trial_end - NOW()) as days_remaining
FROM user_subscriptions us
JOIN users u ON us.user_id = u.id
WHERE us.status = 'trialing'
  AND us.trial_end IS NOT NULL
ORDER BY us.trial_end ASC;
```

### Update Stripe Price IDs

```sql
-- Update subscription tier price IDs
UPDATE subscription_tiers
SET stripe_price_id = 'price_NEW_ID',
    updated_at = NOW()
WHERE id = 'devotee';

-- Verify
SELECT id, name, price, stripe_price_id 
FROM subscription_tiers;
```

---

## <a name="token-management"></a>🪙 TOKEN MANAGEMENT

### View User's Token Balance

```sql
SELECT 
  u.email,
  u.full_name,
  tb.daily_tokens,
  tb.purchased_tokens,
  tb.bonus_tokens,
  (tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens) as total_tokens,
  tb.total_tokens_earned,
  tb.total_tokens_spent,
  tb.last_daily_reset
FROM token_balances tb
JOIN users u ON tb.user_id = u.id
WHERE u.email = 'user@example.com';
```

### Grant Bonus Tokens

```sql
-- Add 500 bonus tokens to user
UPDATE token_balances
SET bonus_tokens = bonus_tokens + 500,
    total_tokens_earned = total_tokens_earned + 500,
    updated_at = NOW()
WHERE user_id = 'user-uuid-here';

-- Log the transaction
INSERT INTO token_transactions (
  user_id,
  type,
  amount,
  balance_after,
  description
) 
SELECT 
  user_id,
  'bonus',
  500,
  (daily_tokens + purchased_tokens + bonus_tokens),
  'Admin bonus grant - Holiday promotion'
FROM token_balances
WHERE user_id = 'user-uuid-here';
```

### Reset Daily Tokens for Specific User

```sql
-- Get user's tier allowance and reset
UPDATE token_balances tb
SET daily_tokens = (
  SELECT st.daily_token_allowance
  FROM user_subscriptions us
  JOIN subscription_tiers st ON us.tier_id = st.id
  WHERE us.user_id = tb.user_id 
    AND us.status = 'active'
  ORDER BY st.price DESC
  LIMIT 1
),
last_daily_reset = NOW(),
updated_at = NOW()
WHERE user_id = 'user-uuid-here';
```

### View Token Transaction History

```sql
SELECT 
  tt.created_at,
  tt.type,
  tt.amount,
  tt.balance_after,
  tt.description,
  tt.reference_id
FROM token_transactions tt
WHERE tt.user_id = 'user-uuid-here'
ORDER BY tt.created_at DESC
LIMIT 50;
```

### Find Top Token Spenders

```sql
SELECT 
  u.email,
  u.full_name,
  tb.total_tokens_spent,
  tb.total_tokens_earned,
  (tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens) as current_balance,
  ROUND((tb.total_tokens_spent::DECIMAL / NULLIF(tb.total_tokens_earned, 0)) * 100, 2) as spend_rate_pct
FROM token_balances tb
JOIN users u ON tb.user_id = u.id
ORDER BY tb.total_tokens_spent DESC
LIMIT 20;
```

### Manually Add Purchased Tokens (After Purchase)

```sql
-- Use the built-in function
SELECT add_purchased_tokens(
  'user-uuid-here'::UUID,
  325,  -- token amount
  'purchase-reference-id'
);

-- Or manual way
UPDATE token_balances
SET purchased_tokens = purchased_tokens + 325,
    total_tokens_earned = total_tokens_earned + 325,
    updated_at = NOW()
WHERE user_id = 'user-uuid-here';
```

### Refund Tokens (After Payment Refund)

```sql
-- Deduct refunded tokens
UPDATE token_balances
SET purchased_tokens = GREATEST(0, purchased_tokens - 325),
    updated_at = NOW()
WHERE user_id = 'user-uuid-here';

-- Log refund
INSERT INTO token_transactions (user_id, type, amount, balance_after, description)
SELECT 
  user_id,
  'refund',
  -325,
  (daily_tokens + purchased_tokens + bonus_tokens),
  'Token refund - Payment reversed'
FROM token_balances
WHERE user_id = 'user-uuid-here';
```

### Check Who Needs Daily Reset

```sql
SELECT 
  u.email,
  tb.last_daily_reset,
  EXTRACT(HOUR FROM NOW() - tb.last_daily_reset) as hours_since_reset
FROM token_balances tb
JOIN users u ON tb.user_id = u.id
WHERE tb.last_daily_reset < NOW() - INTERVAL '1 day'
ORDER BY tb.last_daily_reset ASC
LIMIT 10;
```

---

## <a name="payment-queries"></a>💰 PAYMENT QUERIES

### View All Successful Payments

```sql
SELECT 
  p.created_at,
  u.email,
  p.type,
  (p.amount / 100.0) as amount_usd,
  p.status,
  p.payment_type,
  p.token_amount,
  p.stripe_payment_intent_id
FROM purchases p
LEFT JOIN users u ON p.user_id = u.id
WHERE p.status = 'succeeded'
ORDER BY p.created_at DESC
LIMIT 50;
```

### Daily Revenue Report

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as transactions,
  SUM(amount) / 100.0 as revenue_usd,
  AVG(amount) / 100.0 as avg_transaction,
  COUNT(*) FILTER (WHERE type = 'subscription') as subscriptions,
  COUNT(*) FILTER (WHERE type = 'tokens') as token_purchases
FROM purchases
WHERE status = 'succeeded'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Monthly Revenue Summary

```sql
SELECT 
  TO_CHAR(created_at, 'YYYY-MM') as month,
  COUNT(*) as total_transactions,
  SUM(amount) / 100.0 as total_revenue,
  SUM(CASE WHEN type = 'subscription' THEN amount ELSE 0 END) / 100.0 as subscription_revenue,
  SUM(CASE WHEN type = 'tokens' THEN amount ELSE 0 END) / 100.0 as token_revenue
FROM purchases
WHERE status = 'succeeded'
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC
LIMIT 12;
```

### Find Failed Payments

```sql
SELECT 
  p.created_at,
  u.email,
  u.full_name,
  (p.amount / 100.0) as amount_usd,
  p.failure_code,
  p.failure_message,
  p.stripe_payment_intent_id
FROM purchases p
JOIN users u ON p.user_id = u.id
WHERE p.status = 'failed'
ORDER BY p.created_at DESC
LIMIT 50;
```

### Find User's Purchase History

```sql
SELECT 
  created_at,
  type,
  (amount / 100.0) as amount_usd,
  status,
  token_amount,
  description,
  receipt_url
FROM purchases
WHERE user_id = 'user-uuid-here'
ORDER BY created_at DESC;
```

### Token Package Sales Report

```sql
SELECT 
  tp.name,
  tp.price,
  COUNT(p.id) as units_sold,
  SUM(p.amount) / 100.0 as total_revenue,
  SUM(p.token_amount) as total_tokens_sold
FROM token_packages tp
LEFT JOIN purchases p ON tp.id = p.token_package_id AND p.status = 'succeeded'
WHERE p.created_at >= NOW() - INTERVAL '30 days'
  OR p.id IS NULL
GROUP BY tp.id, tp.name, tp.price
ORDER BY total_revenue DESC NULLS LAST;
```

### Refund a Payment

```sql
-- Mark as refunded
UPDATE purchases
SET status = 'refunded',
    refunded_amount = amount,
    refunded_at = NOW(),
    updated_at = NOW()
WHERE stripe_payment_intent_id = 'pi_XXXXXXXX';

-- Then deduct tokens if applicable (see Token Management section)
```

### Average Order Value

```sql
SELECT 
  ROUND(AVG(amount / 100.0), 2) as avg_order_value,
  ROUND(AVG(CASE WHEN type = 'subscription' THEN amount / 100.0 END), 2) as avg_subscription,
  ROUND(AVG(CASE WHEN type = 'tokens' THEN amount / 100.0 END), 2) as avg_token_purchase
FROM purchases
WHERE status = 'succeeded'
  AND created_at >= NOW() - INTERVAL '30 days';
```

---

## <a name="analytics-reports"></a>📊 ANALYTICS & REPORTS

### User Growth Report

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as new_users,
  SUM(COUNT(*)) OVER (ORDER BY DATE(created_at)) as cumulative_users
FROM users
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date ASC;
```

### Monthly Recurring Revenue (MRR)

```sql
SELECT 
  st.display_name,
  st.price,
  COUNT(us.id) as active_subscriptions,
  (st.price * COUNT(us.id)) as mrr_contribution,
  ROUND((st.price * COUNT(us.id)) * 12, 2) as arr_contribution
FROM subscription_tiers st
LEFT JOIN user_subscriptions us ON st.id = us.tier_id AND us.status = 'active'
WHERE st.price > 0
GROUP BY st.id, st.display_name, st.price
ORDER BY mrr_contribution DESC;
```

### Churn Rate (Monthly)

```sql
WITH monthly_data AS (
  SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) FILTER (WHERE status = 'active') as active_subs,
    COUNT(*) FILTER (WHERE status = 'canceled' AND canceled_at >= DATE_TRUNC('month', created_at)) as churned_subs
  FROM user_subscriptions
  WHERE tier_id IN ('devotee', 'enlightened')
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT 
  TO_CHAR(month, 'YYYY-MM') as month,
  active_subs,
  churned_subs,
  ROUND((churned_subs::DECIMAL / NULLIF(active_subs + churned_subs, 0)) * 100, 2) as churn_rate_pct
FROM monthly_data
ORDER BY month DESC
LIMIT 12;
```

### User Engagement Score

```sql
SELECT 
  u.email,
  u.full_name,
  COUNT(DISTINCT cs.id) as chat_sessions,
  COUNT(DISTINCT qs.id) as quiet_space_visits,
  COUNT(DISTINCT dr.id) as reflections_viewed,
  tb.total_tokens_spent,
  -- Engagement score (custom formula)
  (COUNT(DISTINCT cs.id) * 2 + 
   COUNT(DISTINCT qs.id) + 
   COUNT(DISTINCT dr.id) +
   (tb.total_tokens_spent / 100)) as engagement_score
FROM users u
LEFT JOIN chat_sessions cs ON u.id = cs.user_id AND cs.created_at >= NOW() - INTERVAL '30 days'
LEFT JOIN quiet_space_sessions qs ON u.id = qs.user_id AND qs.created_at >= NOW() - INTERVAL '30 days'
LEFT JOIN daily_reflections dr ON u.id = dr.user_id AND dr.viewed = TRUE AND dr.created_at >= NOW() - INTERVAL '30 days'
LEFT JOIN token_balances tb ON u.id = tb.user_id
GROUP BY u.id, u.email, u.full_name, tb.total_tokens_spent
ORDER BY engagement_score DESC
LIMIT 50;
```

### Conversion Funnel

```sql
WITH funnel AS (
  SELECT 
    COUNT(DISTINCT u.id) as total_signups,
    COUNT(DISTINCT CASE WHEN u.onboarding_completed THEN u.id END) as completed_onboarding,
    COUNT(DISTINCT cs.user_id) as had_first_chat,
    COUNT(DISTINCT us.user_id) FILTER (WHERE us.tier_id IN ('devotee', 'enlightened')) as upgraded_to_paid
  FROM users u
  LEFT JOIN chat_sessions cs ON u.id = cs.user_id
  LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
  WHERE u.created_at >= NOW() - INTERVAL '30 days'
)
SELECT 
  total_signups,
  completed_onboarding,
  ROUND((completed_onboarding::DECIMAL / NULLIF(total_signups, 0)) * 100, 1) as onboarding_rate,
  had_first_chat,
  ROUND((had_first_chat::DECIMAL / NULLIF(completed_onboarding, 0)) * 100, 1) as activation_rate,
  upgraded_to_paid,
  ROUND((upgraded_to_paid::DECIMAL / NULLIF(had_first_chat, 0)) * 100, 1) as conversion_rate
FROM funnel;
```

### Most Popular Avatars

```sql
SELECT 
  avatar_id,
  avatar_name,
  faith_tradition,
  COUNT(*) as total_sessions,
  COUNT(DISTINCT user_id) as unique_users,
  SUM(tokens_used) as total_tokens_used,
  ROUND(AVG(message_count), 1) as avg_messages_per_session,
  ROUND(AVG(duration_seconds / 60.0), 1) as avg_duration_minutes
FROM chat_sessions
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY avatar_id, avatar_name, faith_tradition
ORDER BY total_sessions DESC
LIMIT 20;
```

### Retention Cohort (30-Day)

```sql
WITH cohorts AS (
  SELECT 
    DATE_TRUNC('month', created_at) as cohort_month,
    id as user_id
  FROM users
  WHERE created_at >= NOW() - INTERVAL '6 months'
)
SELECT 
  TO_CHAR(c.cohort_month, 'YYYY-MM') as cohort,
  COUNT(DISTINCT c.user_id) as cohort_size,
  COUNT(DISTINCT al.user_id) FILTER (WHERE al.created_at >= c.cohort_month + INTERVAL '1 month') as retained_month_1,
  ROUND((COUNT(DISTINCT al.user_id) FILTER (WHERE al.created_at >= c.cohort_month + INTERVAL '1 month')::DECIMAL / COUNT(DISTINCT c.user_id)) * 100, 1) as retention_rate_pct
FROM cohorts c
LEFT JOIN user_activity_log al ON c.user_id = al.user_id
GROUP BY c.cohort_month
ORDER BY c.cohort_month DESC;
```

---

## <a name="admin-operations"></a>🔧 ADMIN OPERATIONS

### Make User an Admin

```sql
-- First check if admin_users record exists
INSERT INTO admin_users (user_id, role, permissions, is_active)
VALUES (
  'user-uuid-here',
  'admin',
  '["manage_users", "view_analytics", "manage_content"]'::JSONB,
  TRUE
)
ON CONFLICT (user_id) DO UPDATE
SET role = 'admin',
    is_active = TRUE,
    updated_at = NOW();
```

### View All Admins

```sql
SELECT 
  u.email,
  u.full_name,
  au.role,
  au.permissions,
  au.is_active,
  au.created_at
FROM admin_users au
JOIN users u ON au.user_id = u.id
ORDER BY au.created_at DESC;
```

### Remove Admin Access

```sql
UPDATE admin_users
SET is_active = FALSE,
    updated_at = NOW()
WHERE user_id = 'user-uuid-here';
```

### Create System Event

```sql
INSERT INTO system_events (
  event_type,
  severity,
  title,
  description,
  user_id,
  user_email,
  metadata
) VALUES (
  'payment_failed',
  'warning',
  'Payment Failed',
  'User subscription payment failed - card declined',
  'user-uuid-here',
  'user@example.com',
  '{"stripe_error": "card_declined", "amount": 999}'::JSONB
);
```

### View Recent System Events

```sql
SELECT 
  created_at,
  event_type,
  severity,
  title,
  description,
  user_email,
  notification_sent
FROM system_events
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 100;
```

### View Critical Events

```sql
SELECT 
  created_at,
  event_type,
  title,
  description,
  user_email,
  metadata
FROM system_events
WHERE severity = 'critical'
ORDER BY created_at DESC
LIMIT 50;
```

### Create Support Ticket

```sql
INSERT INTO support_tickets (
  user_id,
  subject,
  description,
  category,
  priority,
  status
) VALUES (
  'user-uuid-here',
  'Unable to access Devotee features',
  'I upgraded to Devotee but still cannot access exclusive content',
  'technical',
  'high',
  'open'
);
```

### View Open Support Tickets

```sql
SELECT 
  st.ticket_number,
  st.created_at,
  u.email,
  st.subject,
  st.category,
  st.priority,
  st.status,
  admin.email as assigned_to
FROM support_tickets st
LEFT JOIN users u ON st.user_id = u.id
LEFT JOIN admin_users au ON st.assigned_to = au.id
LEFT JOIN users admin ON au.user_id = admin.id
WHERE st.status IN ('open', 'in_progress')
ORDER BY 
  CASE st.priority
    WHEN 'urgent' THEN 1
    WHEN 'high' THEN 2
    WHEN 'normal' THEN 3
    ELSE 4
  END,
  st.created_at ASC;
```

### Assign Ticket to Admin

```sql
UPDATE support_tickets
SET assigned_to = (SELECT id FROM admin_users WHERE user_id = 'admin-user-uuid'),
    status = 'in_progress',
    updated_at = NOW()
WHERE ticket_number = 'DIVINITY-001234';
```

### Close Support Ticket

```sql
UPDATE support_tickets
SET status = 'resolved',
    resolved_at = NOW(),
    updated_at = NOW()
WHERE ticket_number = 'DIVINITY-001234';
```

---

## <a name="maintenance-tasks"></a>🔧 MAINTENANCE TASKS

### Manually Run Daily Token Reset

```sql
SELECT reset_daily_tokens();
```

### Clean Up Old Activity Logs (Keep 90 Days)

```sql
DELETE FROM user_activity_log
WHERE created_at < NOW() - INTERVAL '90 days';
```

### Archive Old System Events (Keep 30 Days)

```sql
-- Create archive table if needed
CREATE TABLE IF NOT EXISTS system_events_archive (LIKE system_events INCLUDING ALL);

-- Move old events to archive
INSERT INTO system_events_archive
SELECT * FROM system_events
WHERE created_at < NOW() - INTERVAL '30 days';

-- Delete from main table
DELETE FROM system_events
WHERE created_at < NOW() - INTERVAL '30 days';
```

### Vacuum and Analyze (Performance Optimization)

```sql
-- Reclaim storage and update statistics
VACUUM ANALYZE users;
VACUUM ANALYZE token_transactions;
VACUUM ANALYZE purchases;
VACUUM ANALYZE chat_sessions;
```

### Check Database Size

```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Find Missing Indexes

```sql
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct > 100
  AND correlation < 0.1
ORDER BY n_distinct DESC;
```

### Rebuild Indexes (If Performance Degraded)

```sql
REINDEX TABLE users;
REINDEX TABLE token_transactions;
REINDEX TABLE purchases;
```

---

## <a name="troubleshooting"></a>🐛 TROUBLESHOOTING

### Find Users with Missing Token Balances

```sql
SELECT u.id, u.email
FROM users u
LEFT JOIN token_balances tb ON u.id = tb.user_id
WHERE tb.id IS NULL;
```

### Fix Missing Token Balances

```sql
INSERT INTO token_balances (user_id, daily_tokens)
SELECT u.id, 10
FROM users u
LEFT JOIN token_balances tb ON u.id = tb.user_id
WHERE tb.id IS NULL;
```

### Find Users with No Active Subscription

```sql
SELECT u.id, u.email, u.created_at
FROM users u
LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
WHERE us.id IS NULL;
```

### Fix Missing Default Subscription

```sql
INSERT INTO user_subscriptions (user_id, tier_id, status, current_period_start)
SELECT u.id, 'seeker', 'active', u.created_at
FROM users u
LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
WHERE us.id IS NULL;
```

### Find Duplicate Active Subscriptions

```sql
SELECT user_id, COUNT(*) as sub_count
FROM user_subscriptions
WHERE status = 'active'
GROUP BY user_id
HAVING COUNT(*) > 1;
```

### Check for Orphaned Records

```sql
-- Purchases without users
SELECT COUNT(*) 
FROM purchases p
LEFT JOIN users u ON p.user_id = u.id
WHERE u.id IS NULL;

-- Token transactions without balances
SELECT COUNT(*)
FROM token_transactions tt
LEFT JOIN token_balances tb ON tt.user_id = tb.user_id
WHERE tb.id IS NULL;
```

### Reset User's Account (Fresh Start)

```sql
BEGIN;

-- Reset tokens
UPDATE token_balances
SET daily_tokens = 10,
    purchased_tokens = 0,
    bonus_tokens = 0,
    total_tokens_earned = 0,
    total_tokens_spent = 0,
    last_daily_reset = NOW()
WHERE user_id = 'user-uuid-here';

-- Reset to free tier
UPDATE user_subscriptions
SET tier_id = 'seeker',
    status = 'active'
WHERE user_id = 'user-uuid-here';

-- Clear chat history (optional)
DELETE FROM chat_sessions WHERE user_id = 'user-uuid-here';

COMMIT;
```

---

## 🎯 PERFORMANCE TIPS

### Query Optimization

**Always use indexes:**
```sql
-- Good (uses index)
WHERE email = 'user@example.com'

-- Bad (full table scan)
WHERE LOWER(email) = 'user@example.com'
```

**Limit results:**
```sql
-- Always use LIMIT for large tables
SELECT * FROM token_transactions LIMIT 100;
```

**Use covering indexes:**
```sql
-- If you frequently query email + full_name
CREATE INDEX idx_users_email_name ON users(email, full_name);
```

### Batch Operations

**Instead of multiple INSERTs:**
```sql
-- Bad
INSERT INTO token_transactions (...) VALUES (...);
INSERT INTO token_transactions (...) VALUES (...);
INSERT INTO token_transactions (...) VALUES (...);

-- Good
INSERT INTO token_transactions (...)
VALUES 
  (...),
  (...),
  (...);
```

### Use Views for Complex Queries

**Create a view instead of repeating complex JOINs:**
```sql
CREATE VIEW user_complete_profile AS
SELECT 
  u.*,
  us.tier_id,
  tb.daily_tokens + tb.purchased_tokens + tb.bonus_tokens as total_tokens
FROM users u
LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
LEFT JOIN token_balances tb ON u.id = tb.user_id;

-- Then just query the view
SELECT * FROM user_complete_profile WHERE email = 'user@example.com';
```

---

## 📝 NOTES

- All timestamps are in UTC
- Token amounts are stored as integers (not decimals)
- Payment amounts are in cents (e.g., 999 = $9.99)
- Always use transactions for multi-table updates
- Test queries on small datasets first
- Back up before running DELETE operations

---

**Quick Reference Complete!** 🎉

Save this document for easy access to common database operations.

**For more details, see:**
- Full schema: `/supabase/schema.sql`
- Setup guide: `/SUPABASE_SETUP_WALKTHROUGH.md`
- Schema diagram: `/DATABASE_SCHEMA_DIAGRAM.md`

**Last Updated:** December 2024
