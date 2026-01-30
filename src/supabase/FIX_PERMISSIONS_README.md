# 🔧 FIX: Permission Denied Error

## The Problem
You're getting this error when users try to register:
```
❌ Error creating user in Supabase: {
  "code": "42501",
  "message": "permission denied for table users"
}
```

## Why This Happens
The Row Level Security (RLS) policies on your Supabase database are blocking user registration. Users can't create or update their own records.

## The Solution (2 minutes)

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your DivinityAGI project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Fix
1. Click **New Query**
2. Copy the entire contents of `/supabase/fix_rls_permissions.sql`
3. Paste it into the SQL Editor
4. Click **Run** (or press Ctrl/Cmd + Enter)

### Step 3: Verify Success
You should see output like:
```
✅ RLS permissions fixed successfully!
✅ Users can now register and manage their own data
✅ Trigger has SECURITY DEFINER and will bypass RLS
```

### Step 4: Test Registration
1. Go back to your app
2. Try registering a new user
3. The "permission denied" errors should be gone!

## What This Fix Does

1. **Fixes RLS Policies**: Allows authenticated users to insert/update their own records
2. **Fixes Database Trigger**: Adds `SECURITY DEFINER` flag so it bypasses RLS
3. **Adds Proper Permissions**: Grants necessary permissions to authenticated users
4. **Covers All Tables**: Users, preferences, tokens, subscriptions

## If You Still Get Errors

Check these in Supabase SQL Editor:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'users';

-- Check if trigger exists
SELECT tgname, tgenabled 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- Check policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'users';
```

## Need Help?
If errors persist, share:
1. The exact error message
2. Results from the verification queries above
3. Your Supabase project logs

---

**This is a one-time fix.** Once run, all future user registrations should work smoothly.
