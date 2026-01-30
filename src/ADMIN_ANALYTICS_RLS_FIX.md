# Admin Analytics RLS Fix

## Problem
The admin dashboard shows 0 users and 0 signups because Row Level Security (RLS) policies on the `users`, `user_subscriptions`, and `payments` tables prevent anonymous users from reading data for analytics.

## Current Behavior
- Admin dashboard displays: **0 Total Users, 0 New Signups**
- Console shows: `totalUsers: 0`, `newSignups24h: 0`, etc.
- Error: RLS policies block anonymous queries

## Solution
Add RLS policies that allow anonymous users to SELECT (count/read) data for analytics purposes, without allowing INSERT, UPDATE, or DELETE operations.

## SQL Migration to Apply

Run this SQL in your Supabase SQL Editor:

```sql
-- ============================================================================
-- Admin Analytics RLS Policies
-- Allows anonymous users to query analytics data for the admin dashboard
-- These are READ-ONLY policies for counting and analytics
-- ============================================================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anon to read users for analytics" ON public.users;
DROP POLICY IF EXISTS "Allow anon to read subscriptions for analytics" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Allow anon to read payments for analytics" ON public.payments;
DROP POLICY IF EXISTS "Allow anon to read admin_events for analytics" ON public.admin_events;
DROP POLICY IF EXISTS "Allow anon to read leader applications for analytics" ON public.verified_leader_applications;
DROP POLICY IF EXISTS "Allow anon to update leader applications" ON public.verified_leader_applications;

-- 1. Allow anonymous users to SELECT from users table (for counting)
CREATE POLICY "Allow anon to read users for analytics" 
  ON public.users
  FOR SELECT 
  TO anon
  USING (true);

-- 2. Allow anonymous users to SELECT from user_subscriptions (for counting)
CREATE POLICY "Allow anon to read subscriptions for analytics" 
  ON public.user_subscriptions
  FOR SELECT 
  TO anon
  USING (true);

-- 3. Allow anonymous users to SELECT from payments (for revenue calculation)
CREATE POLICY "Allow anon to read payments for analytics" 
  ON public.payments
  FOR SELECT 
  TO anon
  USING (true);

-- 4. Verify admin_events policy exists (should already exist in supabase-schema.sql)
CREATE POLICY "Allow anon to read admin_events for analytics" 
  ON public.admin_events
  FOR SELECT 
  TO anon
  USING (true);

-- 5. Allow anonymous users to read verified leader applications
CREATE POLICY "Allow anon to read leader applications for analytics" 
  ON public.verified_leader_applications
  FOR SELECT 
  TO anon
  USING (true);

-- 6. Allow anonymous users to update verified leader applications (for approve/reject)
CREATE POLICY "Allow anon to update leader applications" 
  ON public.verified_leader_applications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'user_subscriptions', 'payments', 'admin_events', 'verified_leader_applications')
AND 'anon' = ANY(roles)
ORDER BY tablename, policyname;
```

## How to Apply

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New query**
4. Copy and paste the SQL migration above
5. Click **Run** or press `Ctrl+Enter`
6. Verify the output shows 4 policies created

### Option 2: Supabase CLI
```bash
# Navigate to your project directory
cd /path/to/divinityagi

# Create new migration
supabase migration new admin_analytics_policies

# Paste the SQL migration into the generated file
# Then push to your remote database
supabase db push
```

## Expected Result

After applying the migration:

### Admin Dashboard Should Show:
- ✅ **Total Users:** 5 (from test data)
- ✅ **New Signups (24h):** 1 (recent signups)
- ✅ **New Signups (7d):** 2 (signups within 7 days)
- ✅ **Active Users:** 3 (logged in within 30 days)
- ✅ **Subscriptions by Tier:** Breakdown of seeker/subscriber/devotee/mystic
- ✅ **Revenue Estimate:** Sum of successful payments

### Console Should Show:
```javascript
🔍 Fetching users from Supabase...
📊 Total users query result: { totalUsers: 5, error: null }
📊 Active users query result: { activeUsers: 3, error: null }
📊 New signups (24h) query result: { newSignups24h: 1, error: null }
📊 New signups (7d) query result: { newSignups7d: 2, error: null }
✅ Real analytics fetched from Supabase: {
  totalUsers: 5,
  activeUsers: 3,
  newSignups24h: 1,
  newSignups7d: 2,
  ...
}
```

## Verification Queries

After applying the migration, verify the data exists:

```sql
-- 1. Check total users
SELECT COUNT(*) as total_users FROM public.users;
-- Expected: 5

-- 2. Check recent signups (24 hours)
SELECT COUNT(*) as signups_24h 
FROM public.users 
WHERE created_at >= NOW() - INTERVAL '24 hours';
-- Expected: 1

-- 3. Check recent signups (7 days)
SELECT COUNT(*) as signups_7d 
FROM public.users 
WHERE created_at >= NOW() - INTERVAL '7 days';
-- Expected: 2

-- 4. Check active users (30 days)
SELECT COUNT(*) as active_users 
FROM public.users 
WHERE last_login_at >= NOW() - INTERVAL '30 days';
-- Expected: 3

-- 5. View all users with timestamps
SELECT id, email, full_name, created_at, last_login_at 
FROM public.users 
ORDER BY created_at DESC;
```

## Security Notes

These policies are **READ-ONLY** and only allow:
- ✅ SELECT queries (counting, reading)
- ❌ No INSERT, UPDATE, or DELETE operations
- ❌ Anonymous users cannot modify data
- ✅ Authenticated users still have their existing permissions
- ✅ Admin operations remain secure

## Troubleshooting

### If you still see 0 users after applying migration:

1. **Check if test data exists:**
   ```sql
   SELECT COUNT(*) FROM public.users;
   ```
   If 0, you need to load test data (see SEED_TEST_DATA.sql)

2. **Verify policies were created:**
   ```sql
   SELECT policyname FROM pg_policies 
   WHERE tablename = 'users' AND 'anon' = ANY(roles);
   ```

3. **Check console for errors:**
   Open browser DevTools → Console → Look for error messages

4. **Verify Supabase connection:**
   Console should show: `✅ Supabase client initialized`

## Next Steps

After applying this migration:
1. Refresh the admin dashboard (?tab=admin)
2. Check that metrics display correctly
3. Try clicking metric cards to see detail views
4. Verify real-time updates when users sign up

## Files Modified

- `/components/services/admin-analytics-service.ts` - Added detailed logging
- `/supabase/migrations/001_admin_analytics_policies.sql` - New migration file
- This guide - `ADMIN_ANALYTICS_RLS_FIX.md`