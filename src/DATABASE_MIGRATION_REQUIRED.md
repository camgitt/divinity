# 🚨 CRITICAL: Database Migration Required

## Current Status

Your app is experiencing **RLS (Row-Level Security) policy violations** because the database migration has **not been applied yet**.

## Error You're Seeing

```
❌ Error creating user in Supabase: {
  "code": "42501",
  "message": "new row violates row-level security policy for table \"users\""
}
```

## What This Means

The database doesn't have:
1. ✅ Proper RLS policies to allow user signups
2. ✅ Automatic trigger to create user records

## 🔥 IMMEDIATE FIX (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your **Supabase Dashboard**: https://app.supabase.com
2. Select your DivinityAGI project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### Step 2: Run the Migration

1. Open the file: `/supabase/migrations/APPLY_THIS_MIGRATION.sql`
2. **Copy the ENTIRE content** (all ~250 lines)
3. **Paste into the SQL Editor**
4. Click **"Run"** button (or press Cmd+Enter / Ctrl+Enter)

### Step 3: Wait for Success

You should see this output:

```
🎉 ============================================
🎉 MIGRATION SUCCESSFUL!
🎉 ============================================

✅ Database trigger created
✅ RLS policies updated
✅ Permissions granted

🚀 NEXT STEP: Hard refresh your browser!
```

### Step 4: Hard Refresh Browser

- **Mac**: `Cmd + Shift + R`
- **Windows/Linux**: `Ctrl + Shift + F5`

This clears cached JavaScript.

### Step 5: Test Signup

1. Try signing up with a **new email**
2. Check browser console - you should see:
   ```
   ✅ User created in Supabase Auth
   ⏳ Waiting for database trigger to initialize user data...
   ✅ User record created by trigger
   ✅ User fully initialized in Supabase
   ```
3. **No more RLS errors!** 🎉

---

## What the Migration Does

### 1. Fixes RLS Policies ✅

**Before:** Policies block all inserts (even for authenticated users)

**After:** Policies allow users to:
- ✅ Create their own user record during signup
- ✅ Read their own data
- ✅ Update their own profile
- 🔒 **Security maintained:** Users can ONLY access their own data

### 2. Creates Auto-Setup Trigger ✅

**What it does:**
- Runs automatically when a user signs up via Supabase Auth
- Creates user record in `users` table
- Creates default preferences in `user_preferences`
- Creates token balance (50 tokens for subscribers)
- Creates subscription record

**Why it's needed:**
- Frontend doesn't need to manually create these records
- No more duplicate insert attempts
- Cleaner, more reliable signup flow

---

## Troubleshooting

### "Migration failed" or SQL errors

**Check these tables exist:**
- `public.users`
- `public.user_preferences`
- `public.token_balances`
- `public.user_subscriptions`

If they don't exist, you need to run the **initial schema migration first**.

### Still seeing RLS errors after migration

1. **Verify trigger exists:**
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
   Should return 1 row.

2. **Verify policies exist:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename IN ('users', 'user_preferences', 'token_balances', 'user_subscriptions');
   ```
   Should return 4 rows (one per table).

3. **Hard refresh browser** again (clear cache completely)

4. **Try incognito/private window** to rule out caching issues

### Trigger not creating records

**Check Supabase logs:**
1. Go to Supabase Dashboard
2. Click **"Logs"** → **"Postgres Logs"**
3. Look for warnings starting with `❌ Error in initialize_user_data`

This will show what went wrong in the trigger.

---

## Alternative: Disable RLS (NOT RECOMMENDED)

⚠️ **Only use if you're testing locally and don't care about security:**

```sql
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions DISABLE ROW LEVEL SECURITY;
```

**WARNING:** This allows anyone to read/write ALL user data. Only use for local testing!

---

## Why This Happened

Supabase enables RLS by default for security. Without proper policies:
- ❌ Users can't insert their own records
- ❌ Frontend gets blocked by RLS
- ❌ Signup fails with code `42501`

The migration adds policies that allow users to manage their own data while maintaining security.

---

## Summary

**What you need to do:**

1. ✅ Run `/supabase/migrations/APPLY_THIS_MIGRATION.sql` in Supabase SQL Editor
2. ✅ Wait for success message
3. ✅ Hard refresh browser
4. ✅ Test signup

**Time required:** 5 minutes

**After migration:**
- ✅ Signups work automatically
- ✅ No more RLS errors
- ✅ Trigger creates all user records
- ✅ Security maintained (users can only access their own data)

---

## Questions?

If you're still having issues after running the migration:

1. Check browser console for the detailed error message
2. Check Supabase logs for trigger errors
3. Verify the migration ran successfully (check for success message)
4. Try signing up in incognito mode (rules out caching)

The app is now configured to give you **detailed instructions in the console** if the migration isn't applied, so check there first!

---

**Ready?** Go run that migration! 🚀
