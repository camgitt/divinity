# 🚀 How to Run SQL Queries in Supabase

## Step-by-Step Guide

### **Step 1: Log into Supabase**

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in with your account
3. You should see your project: `wukzavslddamlxoksxuo`

---

### **Step 2: Open SQL Editor**

1. Click on your project to open it
2. On the left sidebar, look for **"SQL Editor"** (it has a database icon)
3. Click on **"SQL Editor"**

---

### **Step 3: Create a New Query**

1. In the SQL Editor, click the **"+ New query"** button (top left area)
2. This will open a blank text editor where you can paste SQL code

---

### **Step 4: Run the First Schema (Admin Tables)**

1. **Open the file:** `/supabase-schema.sql` from this project
2. **Select all the text** (Ctrl+A or Cmd+A)
3. **Copy it** (Ctrl+C or Cmd+C)
4. **Go back to Supabase SQL Editor**
5. **Paste the SQL code** into the editor (Ctrl+V or Cmd+V)
6. **Click the "Run" button** (bottom right corner of the editor, or press Ctrl+Enter)

**Wait for it to complete** - You should see green checkmarks and success messages!

---

### **Step 5: Run the Second Schema (Subscription Tables)**

1. **Click "+ New query"** again (to start fresh)
2. **Open the file:** `/supabase-subscription-schema.sql` from this project
3. **Select all the text** (Ctrl+A or Cmd+A)
4. **Copy it** (Ctrl+C or Cmd+C)
5. **Go back to Supabase SQL Editor**
6. **Paste the SQL code** into the editor (Ctrl+V or Cmd+V)
7. **Click the "Run" button** (bottom right corner, or Ctrl+Enter)

**Wait for it to complete** - More green checkmarks!

---

## ✅ How to Know It Worked

After running both queries, you should see:

### **In the SQL Editor:**
- ✅ Green checkmark icons
- ✅ Success messages like "Success. No rows returned"
- ✅ Messages like "✓ customers table created"
- ✅ Messages like "✓ admin_events table created"

### **Verify Tables Were Created:**

1. Click **"Table Editor"** in the left sidebar
2. You should now see new tables:
   - `admin_events`
   - `admin_analytics`
   - `customers`
   - `subscriptions`
   - `payments`
   - `subscription_history`
   - `billing_events`
   - `token_purchases`

---

## 🎯 Quick Reference: What to Copy

### **First Query (Admin Schema):**
```
File: /supabase-schema.sql
Purpose: Creates admin events and analytics tables
Tables created: admin_events, admin_analytics
```

### **Second Query (Subscription Schema):**
```
File: /supabase-subscription-schema.sql
Purpose: Creates subscription and payment tracking tables
Tables created: customers, subscriptions, payments, subscription_history, billing_events, token_purchases
```

---

## 🆘 Troubleshooting

### **Error: "relation already exists"**
✅ **This is fine!** It means the table was already created. The queries are safe to re-run.

### **Error: "permission denied"**
❌ Make sure you're logged into the correct Supabase account and project.

### **Nothing happens when I click "Run"**
- Make sure you actually pasted the SQL code into the editor
- Try pressing **Ctrl+Enter** (or Cmd+Enter on Mac) instead

### **Can't find SQL Editor**
- Look on the left sidebar for an icon that looks like a database or brackets `<>`
- It should be labeled "SQL Editor"

---

## 🎊 After Successfully Running Both Queries

Your admin panel will now have full functionality:

1. **Go to:** `https://divinitybot.com/?tab=admin`
2. **Check the Overview tab** - Should show real-time data
3. **Check the Subscriptions tab** - Should load without errors
4. **Check the Events tab** - Events will now sync to the database

---

## 💡 Pro Tips

- ✅ **You only need to run these queries ONCE**
- ✅ **They're safe to re-run** if you need to (won't duplicate data)
- ✅ **Takes about 5-10 seconds** for each query to complete
- ✅ **You can save the queries** in Supabase for future reference

---

## 📞 Need More Help?

If you get stuck, let me know:
- What error message you're seeing
- Which step you're on
- A screenshot helps!

The SQL files are ready to go - just copy, paste, and run! 🚀
