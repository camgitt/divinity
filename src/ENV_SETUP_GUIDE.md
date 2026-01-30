# 🔐 Environment Variables Setup Guide

## Quick Setup

### 1️⃣ Create `.env` File

Create a new file called `.env` in the root directory of your project (same level as `package.json`).

### 2️⃣ Copy Your Credentials

Copy the contents from `.env.example` and update with your actual Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://wukzavslddamlxoksxuo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1a3phdnNsZGRhbWx4b2tzeHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Njk2NjYsImV4cCI6MjA3ODU0NTY2Nn0.oa3v9vuTLK4T4IXWzWJAExV3dnjfoXwkPwnXw6Ff6tw
```

### 3️⃣ Save and Restart

Save the `.env` file and restart your development server:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

---

## 📍 Where to Find Your Credentials

### Supabase URL and Key

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `wukzavslddamlxoksxuo`
3. Click **Settings** (gear icon on left sidebar)
4. Click **API** under Project Settings
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## ✅ Verify It's Working

After setting up your `.env` file, check these:

### 1. Check Admin Dashboard
- Go to `http://localhost:5173/?tab=admin`
- Look for "Supabase Connected" badge in the header
- It should show a green indicator

### 2. Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- You should NOT see warnings like:
  - ❌ "Supabase not configured"
  - ❌ "using localStorage fallback"

### 3. Test Database Connection
- Go to the Subscriptions tab in admin
- It should load data (or show empty state, not an error)

---

## 🔒 Security Notes

### ⚠️ Important:
- **NEVER** commit your `.env` file to git
- The `.env` file is listed in `.gitignore` to prevent this
- Only share `.env.example` (with placeholder values)
- The `anon` key is safe to use in frontend code (public access)

### Public vs Service Keys:
- ✅ **anon/public key** - Safe for frontend (what we're using)
- ❌ **service_role key** - NEVER use in frontend (admin access)

---

## 🎯 What Changed

### Before:
```typescript
// Old way - hardcoded in /utils/supabase/info.tsx
export const projectId = "wukzavslddamlxoksxuo"
export const publicAnonKey = "eyJ..."
```

### After:
```typescript
// New way - from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
```

### Benefits:
✅ Can use different credentials for dev/staging/production  
✅ Easy to update without code changes  
✅ Better security practice  
✅ Credentials not hardcoded in repository  

---

## 🚨 Troubleshooting

### "Supabase not configured" Warning
**Problem:** Environment variables not loading  
**Solution:**
1. Make sure `.env` file is in root directory (next to `package.json`)
2. Variable names must start with `VITE_` (Vite requirement)
3. Restart your dev server after creating/editing `.env`

### Variables Still Not Working
**Problem:** `.env` file in wrong location  
**Solution:**
```
your-project/
├── .env              ← Should be HERE
├── .env.example
├── package.json
├── vite.config.ts
└── components/
    └── ...
```

### Empty Values
**Problem:** Variables showing as empty strings  
**Solution:**
- Check for extra spaces in `.env` file
- Don't use quotes around values
- Make sure variable names match exactly:
  - ✅ `VITE_SUPABASE_URL`
  - ❌ `SUPABASE_URL` (missing VITE_ prefix)

---

## 📦 For Production/Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Don't** deploy the `.env` file
2. **Do** add environment variables in your hosting platform:
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Build & deploy → Environment
   - Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## ✨ You're All Set!

Your Supabase credentials are now properly configured using environment variables. The admin panel and subscription system will automatically use these values.
