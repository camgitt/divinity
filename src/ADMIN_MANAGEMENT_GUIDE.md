# DivinityAGI Admin Management Guide
## Complete Guide to Managing Your Application, Sales, and Subscriptions

---

## 📋 TABLE OF CONTENTS

1. [How to Access the Admin Panel](#accessing-admin-panel)
2. [Data Entry & Configuration](#data-entry)
3. [Monitoring Sales & Revenue](#monitoring-sales)
4. [Managing Subscriptions & Memberships](#managing-subscriptions)
5. [User Management](#user-management)
6. [Financial Reports & Analytics](#financial-reports)
7. [System Events & Monitoring](#system-events)
8. [Daily Operations Checklist](#daily-operations)
9. [Troubleshooting Common Issues](#troubleshooting)

---

# <a name="accessing-admin-panel"></a>📊 1. HOW TO ACCESS THE ADMIN PANEL

## Current Setup (Without Backend)

Your DivinityAGI app currently has a **client-side admin dashboard** that tracks activity using localStorage. This is perfect for development and demo purposes.

### Access Method 1: Direct URL
```
https://your-app-url.com/#admin
```
Simply navigate to your app and add `#admin` to the URL, then click "Admin" in your navigation.

### Access Method 2: Secret Login (Recommended)

**Step 1: Set Admin Password**
Open your browser console (F12) and run:
```javascript
localStorage.setItem('divinityagi_admin_password', 'your-secure-password-here');
```

**Step 2: Create Admin Login Component**
The app already has an admin dashboard, but you can add password protection by creating a login flow.

### What You See in Admin Panel

Once logged in, you'll see **3 main tabs**:

1. **Overview Tab** - Key metrics and dashboard
2. **Subscriptions Tab** - All subscription management
3. **Events Tab** - System activity log

---

# <a name="data-entry"></a>⚙️ 2. DATA ENTRY & CONFIGURATION

## What Data Needs to Be Entered?

### Option 1: Using Stripe Dashboard (Recommended)

**If you go with Stripe + Supabase integration**, you'll enter product data in Stripe:

#### A. Create Subscription Products in Stripe

**Go to:** https://dashboard.stripe.com/products

**Product 1: Devotee Monthly**
```
Product Information:
├─ Name: "Devotee Monthly Subscription"
├─ Description: "Full access to spiritual guidance and content"
├─ Price: $9.99 USD
├─ Billing: Recurring monthly
└─ Metadata (click "Add metadata"):
    ├─ tier_id: "devotee"
    ├─ daily_token_allowance: "100"
    ├─ avatar_access: "full"
    ├─ personal_guide: "advanced"
    ├─ exclusive_content: "true"
    └─ priority_support: "false"
```

**Product 2: Enlightened Monthly**
```
Product Information:
├─ Name: "Enlightened Monthly Subscription"
├─ Description: "Ultimate spiritual experience with priority access"
├─ Price: $14.99 USD
├─ Billing: Recurring monthly
└─ Metadata:
    ├─ tier_id: "enlightened"
    ├─ daily_token_allowance: "-1" (unlimited)
    ├─ avatar_access: "priority"
    ├─ personal_guide: "unlimited"
    ├─ exclusive_content: "true"
    └─ priority_support: "true"
```

#### B. Create Token Package Products in Stripe

**Product 3: Starter Token Package**
```
├─ Name: "Starter Token Package"
├─ Description: "120 tokens for spiritual guidance"
├─ Price: $4.99 USD
├─ Type: One-time payment
└─ Metadata:
    ├─ base_tokens: "100"
    ├─ bonus_tokens: "20"
    ├─ total_tokens: "120"
    └─ package_type: "starter"
```

**Product 4: Popular Token Package**
```
├─ Name: "Popular Token Package"
├─ Description: "325 tokens - Best Value!"
├─ Price: $9.99 USD
├─ Type: One-time payment
└─ Metadata:
    ├─ base_tokens: "250"
    ├─ bonus_tokens: "75"
    ├─ total_tokens: "325"
    └─ package_type: "popular"
```

**Product 5: Premium Token Package**
```
├─ Name: "Premium Token Package"
├─ Description: "700 tokens for deep exploration"
├─ Price: $19.99 USD
├─ Type: One-time payment
└─ Metadata:
    ├─ base_tokens: "500"
    ├─ bonus_tokens: "200"
    ├─ total_tokens: "700"
    └─ package_type: "premium"
```

**Product 6: Ultimate Token Package**
```
├─ Name: "Ultimate Token Package"
├─ Description: "1500 tokens - Best Savings!"
├─ Price: $34.99 USD
├─ Type: One-time payment
└─ Metadata:
    ├─ base_tokens: "1000"
    ├─ bonus_tokens: "500"
    ├─ total_tokens: "1500"
    └─ package_type: "ultimate"
```

### Option 2: Using Supabase Database (If Integrated)

If you've implemented the Supabase integration, you'll enter data via SQL:

```sql
-- Insert subscription tiers (already in schema, just verify)
SELECT * FROM subscription_tiers;

-- Should show:
-- seeker, subscriber, devotee, enlightened

-- Token packages don't need database entries (managed by Stripe)
-- User subscriptions are created automatically when users purchase
```

### Option 3: Using WooCommerce (If Selected)

If you chose WooCommerce integration:

**Go to:** WordPress Admin → Products → Add New

Create 6 products (2 subscriptions + 4 token packages) as detailed in the WooCommerce Integration Report.

---

## Where to Configure App Settings

### Current App Configuration

Your app settings are hardcoded in `/components/subscription-context.tsx`. To modify:

**Step 1: Open the file**
```
/components/subscription-context.tsx
```

**Step 2: Find SUBSCRIPTION_PLANS array (lines 20-106)**
```typescript
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'seeker',
    name: 'Seeker',
    price: 0,
    period: 'forever',
    // ... modify these values
  },
  // ... etc
];
```

**Step 3: Modify as needed**
- Change `price` to adjust pricing
- Change `tokenAllowance` to adjust daily tokens
- Change `features` array to update feature lists
- Save file and redeploy

### Future: Admin Configuration Panel

**Recommendation:** Build an admin settings page where you can update these values via UI:

```
Admin → Settings → Subscription Configuration
├─ Devotee Price: [$9.99] [Save]
├─ Enlightened Price: [$14.99] [Save]
├─ Devotee Token Allowance: [100] [Save]
└─ Enlightened Token Allowance: [-1 (Unlimited)] [Save]
```

This would require storing settings in localStorage or Supabase database.

---

# <a name="monitoring-sales"></a>💰 3. MONITORING SALES & REVENUE

## Current Analytics Dashboard

Your admin panel (`/components/admin-dashboard-page.tsx`) shows:

### Key Metrics (Overview Tab)

**Metric 1: Total Users**
- Shows all registered users
- Displays active users in last 30 days
- Source: Tracks user signups via AdminMonitoringContext

**Metric 2: New Signups**
- Last 7 days signup count
- Today's signup count
- Source: Events tracked via `trackUserSignup()`

**Metric 3: Revenue Estimate**
- Calculated from subscription counts × pricing
- Formula: `(devotee_count × $9.99) + (enlightened_count × $14.99)`
- Shows number of paid subscribers

**Metric 4: Error Rate**
- Percentage of error/critical events
- Calculated from last 1000 events
- Helps identify system issues

### Subscription Breakdown

**Visual Distribution:**
```
┌─────────────────────────────────────────────┐
│  Seeker (Free)      │  15 subscribers       │
│  Subscriber (Free)  │  45 subscribers       │
│  Devotee ($9.99)    │  23 subscribers       │
│  Enlightened ($14.99)│  8 subscribers       │
└─────────────────────────────────────────────┘

Total MRR = (23 × $9.99) + (8 × $14.99) = $349.69
```

---

## With Stripe Integration: Enhanced Analytics

### Stripe Dashboard Analytics

**Go to:** https://dashboard.stripe.com

**What You Can See:**

1. **Revenue Tab**
   - Gross revenue (all time, monthly, daily)
   - Net revenue (after fees)
   - Revenue by product
   - Revenue charts and trends

2. **Customers Tab**
   - Total customer count
   - Active subscribers
   - Churned customers
   - Customer lifetime value

3. **Subscriptions Tab**
   - Active subscriptions
   - Upcoming renewals
   - Failed payments
   - Cancellations

4. **Payments Tab**
   - All payment transactions
   - Payment methods used
   - Success/failure rates
   - Refunds processed

### Exporting Stripe Data

**Method 1: Manual Export**
```
Dashboard → Payments → Export → Download CSV
- Choose date range
- Select payment status
- Download to Excel
```

**Method 2: Automated Reports**
```
Settings → Reporting → Configure
- Daily/Weekly/Monthly reports
- Email delivery
- Specific metrics to track
```

---

## With Supabase Integration: Database Queries

If you've implemented Supabase, run these SQL queries in the **SQL Editor**:

### Query 1: Monthly Recurring Revenue (MRR)
```sql
SELECT 
  st.name as tier,
  st.price,
  COUNT(us.*) as subscriber_count,
  (st.price * COUNT(us.*)) as tier_mrr
FROM user_subscriptions us
JOIN subscription_tiers st ON us.tier_id = st.id
WHERE us.status = 'active' 
  AND st.price > 0
GROUP BY st.name, st.price
ORDER BY tier_mrr DESC;
```

**Expected Output:**
```
 tier         | price  | subscriber_count | tier_mrr
--------------+--------+------------------+---------
 Enlightened  | 14.99  | 8                | 119.92
 Devotee      | 9.99   | 23               | 229.77
```

### Query 2: Revenue by Day (Last 30 Days)
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as transactions,
  SUM(amount) as revenue,
  AVG(amount) as avg_transaction
FROM purchases
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Query 3: Token Sales Summary
```sql
SELECT 
  SUM(tokens_granted) as total_tokens_sold,
  COUNT(*) as total_purchases,
  SUM(amount) as total_revenue,
  AVG(amount) as avg_purchase_price
FROM purchases
WHERE type = 'tokens'
  AND status = 'completed'
  AND created_at >= NOW() - INTERVAL '30 days';
```

### Query 4: Subscription Churn Rate
```sql
WITH monthly_stats AS (
  SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) FILTER (WHERE status = 'active') as active,
    COUNT(*) FILTER (WHERE status = 'canceled') as canceled
  FROM user_subscriptions
  WHERE tier_id IN ('devotee', 'enlightened')
  GROUP BY month
)
SELECT 
  month,
  active,
  canceled,
  ROUND((canceled::DECIMAL / NULLIF(active + canceled, 0)) * 100, 2) as churn_rate_pct
FROM monthly_stats
ORDER BY month DESC
LIMIT 12;
```

---

## Setting Up Revenue Alerts

### Stripe Webhooks (Automatic Notifications)

Configure Stripe to send you alerts:

**Step 1: Go to Stripe Dashboard**
```
Settings → Webhooks → Add endpoint
```

**Step 2: Configure Endpoint**
```
URL: https://your-app.com/api/stripe-webhook
Events to listen for:
  ✓ customer.subscription.created
  ✓ customer.subscription.deleted
  ✓ invoice.payment_succeeded
  ✓ invoice.payment_failed
  ✓ charge.refunded
```

**Step 3: Set Up Email Alerts**
```
Settings → Email Notifications
Enable:
  ✓ Payment succeeded
  ✓ Payment failed
  ✓ Subscription canceled
  ✓ Dispute created
```

---

# <a name="managing-subscriptions"></a>🎟️ 4. MANAGING SUBSCRIPTIONS & MEMBERSHIPS

## Current System: Admin Dashboard

Your app has an **Admin Subscription Management** component that shows:

### Subscriptions Tab Features

**View All Subscriptions:**
- Customer ID
- Tier (Devotee, Enlightened, etc.)
- Status (Active, Trialing, Past Due, Canceled)
- Period start/end dates
- Whether subscription is set to cancel

**Search & Filter:**
```
Search: [Search by customer ID or tier...]
Status: [All Status ▼]
        - Active
        - Trialing
        - Past Due
        - Canceled
```

**Actions Available:**
- View subscription details
- See payment history
- Export subscription data (JSON)

### Payments Tab Features

**View All Payments:**
- Amount charged
- Payment type (subscription or token purchase)
- Token amount (if applicable)
- Payment method (Visa ••••1234)
- Status (Succeeded, Failed, Pending, Refunded)
- Date and time

---

## With Stripe: Managing Subscriptions

### Common Admin Tasks in Stripe Dashboard

#### Task 1: Pause a Subscription
```
Customers → [Select Customer] → Subscriptions → [Select] → Actions → Pause subscription
- Set pause duration
- Choose to collect payment method
- Save
```

#### Task 2: Cancel a Subscription
```
Customers → [Select Customer] → Subscriptions → [Select] → Actions → Cancel subscription
Options:
  ○ Cancel immediately
  ○ Cancel at period end (recommended)
```

#### Task 3: Refund a Payment
```
Payments → [Select Payment] → Refund
- Full refund or partial
- Add refund reason
- Process refund
```

#### Task 4: Upgrade/Downgrade User
```
Customers → [Select Customer] → Subscriptions → [Select] → Update subscription
- Change to different price/product
- Proration settings:
  ○ Create prorations (charge/credit difference)
  ○ None (no immediate charge)
  ○ Always invoice (create invoice)
```

#### Task 5: Manually Add Subscription
```
Customers → [Select Customer] → Add subscription
- Choose product
- Select billing cycle
- Set trial period (optional)
- Save
```

#### Task 6: Handle Failed Payment
```
Dashboard shows: "Failed payment" alert
→ Click alert
→ View customer details
→ Actions:
   - Retry payment
   - Update payment method
   - Send payment reminder email
   - Cancel subscription
```

---

## With Supabase: Managing Subscriptions via Database

If using Supabase backend, manage subscriptions with SQL:

### Common Admin Queries

#### Query 1: Manually Activate Subscription
```sql
INSERT INTO user_subscriptions (
  user_id,
  tier_id,
  stripe_customer_id,
  stripe_subscription_id,
  status,
  current_period_start,
  current_period_end
) VALUES (
  'user-uuid-here',
  'devotee',
  'cus_XXXXXX',
  'sub_XXXXXX',
  'active',
  NOW(),
  NOW() + INTERVAL '30 days'
);
```

#### Query 2: Cancel Subscription
```sql
UPDATE user_subscriptions
SET status = 'canceled',
    cancel_at_period_end = true
WHERE stripe_subscription_id = 'sub_XXXXXX';
```

#### Query 3: Upgrade User Tier
```sql
UPDATE user_subscriptions
SET tier_id = 'enlightened'
WHERE user_id = 'user-uuid-here';

-- Also update token balance
UPDATE token_balances
SET daily_tokens = -1 -- unlimited for enlightened
WHERE user_id = 'user-uuid-here';
```

#### Query 4: Grant Bonus Tokens
```sql
-- Add 500 bonus tokens to user
UPDATE token_balances
SET purchased_tokens = purchased_tokens + 500,
    total_tokens_earned = total_tokens_earned + 500
WHERE user_id = 'user-uuid-here';

-- Log the transaction
INSERT INTO token_transactions (
  user_id,
  type,
  amount,
  balance_after,
  description
) VALUES (
  'user-uuid-here',
  'bonus',
  500,
  (SELECT purchased_tokens + daily_tokens FROM token_balances WHERE user_id = 'user-uuid-here'),
  'Admin bonus grant'
);
```

#### Query 5: Find Users with Expiring Subscriptions
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

---

# <a name="user-management"></a>👥 5. USER MANAGEMENT

## Current System: No Central User Database

Your app currently stores user data in:
1. **localStorage** - Client-side only (lost if cleared)
2. **AdminMonitoringContext** - Event tracking

### What User Data is Tracked

**Basic Info:**
- Email address
- Username
- Full name
- Registration date
- Subscription tier

**Activity Tracking:**
- Signup events
- Subscription changes
- Token purchases
- Errors encountered

---

## With Supabase: Full User Management

### View All Users
```sql
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.username,
  u.faith_tradition,
  u.created_at,
  us.tier_id as current_tier,
  us.status as subscription_status,
  tb.daily_tokens + tb.purchased_tokens as total_tokens
FROM users u
LEFT JOIN user_subscriptions us ON u.id = us.user_id
LEFT JOIN token_balances tb ON u.id = tb.user_id
ORDER BY u.created_at DESC
LIMIT 100;
```

### User Activity Report
```sql
SELECT 
  u.email,
  u.full_name,
  COUNT(tt.*) as total_sessions,
  SUM(ABS(tt.amount)) FILTER (WHERE tt.amount < 0) as tokens_used,
  MAX(tt.created_at) as last_activity
FROM users u
LEFT JOIN token_transactions tt ON u.id = tt.user_id
WHERE tt.type = 'spent'
GROUP BY u.id, u.email, u.full_name
ORDER BY last_activity DESC
LIMIT 50;
```

### Inactive Users (No Activity in 30 Days)
```sql
SELECT 
  u.email,
  u.full_name,
  u.created_at,
  MAX(tt.created_at) as last_activity,
  EXTRACT(DAY FROM NOW() - MAX(tt.created_at)) as days_inactive
FROM users u
LEFT JOIN token_transactions tt ON u.id = tt.user_id
GROUP BY u.id, u.email, u.full_name, u.created_at
HAVING MAX(tt.created_at) < NOW() - INTERVAL '30 days'
  OR MAX(tt.created_at) IS NULL
ORDER BY days_inactive DESC;
```

### Ban/Suspend a User
```sql
-- Add a banned status field (requires schema update)
ALTER TABLE users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Ban user
UPDATE users SET status = 'banned' WHERE email = 'user@example.com';

-- In your app, check user status before allowing access
```

---

# <a name="financial-reports"></a>📈 6. FINANCIAL REPORTS & ANALYTICS

## Export Options

### Option 1: Admin Dashboard Export (Current System)

**Step 1:** Open Admin Dashboard  
**Step 2:** Click "Export" button (top right)  
**Step 3:** JSON file downloads with:
```json
{
  "analytics": {
    "totalUsers": 125,
    "activeUsers": 87,
    "newSignups7d": 12,
    "totalSubscriptions": 31,
    "subscriptionsByTier": {
      "seeker": 55,
      "subscriber": 39,
      "devotee": 23,
      "enlightened": 8
    },
    "revenueEstimate": 349.69,
    "errorRate": 2.3
  },
  "events": [...],
  "exportedAt": "2024-12-15T10:30:00Z"
}
```

**Step 4:** Open in Excel or Google Sheets  
**Step 5:** Create visualizations

### Option 2: Stripe Reports (With Integration)

**Go to:** Stripe Dashboard → Reports

**Pre-built Reports:**
1. **Balance Report** - Daily balance changes
2. **Payout Report** - Money paid out to bank account
3. **Ending Balance Report** - Current Stripe balance
4. **Item Sales Report** - Sales by product
5. **Subscription Report** - Recurring revenue tracking
6. **Customer Report** - All customer data

**Export Format:** CSV, JSON, or PDF

### Option 3: Supabase Database Export

**Method 1: Via Dashboard**
```
Supabase Dashboard → SQL Editor → Run Query → Export CSV
```

**Method 2: Via psql (Command Line)**
```bash
psql "postgresql://[CONNECTION_STRING]" -c "\COPY (
  SELECT * FROM purchases 
  WHERE created_at >= NOW() - INTERVAL '30 days'
) TO '/path/to/file.csv' CSV HEADER;"
```

---

## Key Financial Metrics to Track

### Monthly Recurring Revenue (MRR)
```
MRR = Sum of all active subscription prices

Example:
23 Devotee × $9.99 = $229.77
8 Enlightened × $14.99 = $119.92
Total MRR = $349.69
```

### Average Revenue Per User (ARPU)
```
ARPU = Total Revenue / Total Paid Users

Example:
$349.69 MRR / 31 paid users = $11.28 per user
```

### Customer Lifetime Value (LTV)
```
LTV = ARPU × Average Customer Lifespan (months)

Example:
$11.28 ARPU × 12 months = $135.36 LTV
(assuming 1 year average subscription)
```

### Churn Rate
```
Monthly Churn = (Cancellations / Total Subscribers) × 100

Example:
3 cancellations / 31 total = 9.7% churn rate
```

### Customer Acquisition Cost (CAC)
```
CAC = Total Marketing Spend / New Customers Acquired

Example:
$500 ad spend / 25 new signups = $20 CAC
```

### Profitability Check
```
LTV:CAC Ratio = LTV / CAC

Example:
$135.36 LTV / $20 CAC = 6.77:1 ratio
(Healthy is 3:1 or higher)
```

---

## Creating Monthly Reports

### Template: Monthly Business Review

```markdown
# DivinityAGI Monthly Report - December 2024

## Executive Summary
- Total Revenue: $XXX
- New Subscribers: XX
- Churn Rate: X.X%
- MRR Growth: +X%

## Financial Metrics
- Monthly Recurring Revenue: $XXX
- Token Package Sales: $XXX
- Refunds Issued: $XXX
- Net Revenue: $XXX

## User Metrics
- Total Users: XXX
- Active Users (30d): XXX
- New Signups: XX
- Churned Users: XX

## Subscription Breakdown
- Seeker (Free): XX
- Subscriber (Free): XX
- Devotee ($9.99): XX
- Enlightened ($14.99): XX

## Top Performing
- Best Selling Token Package: Popular (325 tokens)
- Highest Revenue Day: Dec 15 ($XX)
- Peak Signup Day: Dec 10 (XX users)

## Issues & Actions
- Failed Payments: XX (sent reminders)
- Support Tickets: XX (resolved)
- System Errors: XX (fixed)

## Goals for Next Month
- Target MRR: $XXX
- Target New Subscribers: XX
- Churn Reduction Goal: <X%
```

---

# <a name="system-events"></a>🔔 7. SYSTEM EVENTS & MONITORING

## Events Tab in Admin Dashboard

Your admin panel tracks these events:

### Event Types Monitored

**User Events:**
- `user_signup` - New user registration
- `subscription_upgrade` - User upgrades tier
- `subscription_downgrade` - User downgrades tier
- `subscription_cancel` - User cancels subscription

**Payment Events:**
- `payment_success` - Payment processed successfully
- `payment_failed` - Payment failed
- `high_usage` - User exceeding normal token usage

**System Events:**
- `error_reported` - Application error occurred
- `crash_detected` - Critical system failure
- `abuse_detected` - Potential abuse/fraud

**Support Events:**
- `verification_request` - Verified Leader application
- `support_ticket` - User submitted help request

### Event Severity Levels

**🔵 Info** - Normal operations
```
Example: "New user John signed up as Subscriber"
```

**🟡 Warning** - Requires attention
```
Example: "User exceeded 200 tokens in one session"
```

**🟠 Error** - Something went wrong
```
Example: "Payment failed for customer cus_XXXX"
```

**🔴 Critical** - Immediate action required
```
Example: "Server crash detected - 50 users affected"
```

### Filtering Events

**By Severity:**
```
[All] [Critical] [Error] [Warning] [Info]
```

**By Type:**
Use the search function to filter by event type.

**By Date:**
Events are sorted chronologically (newest first).

---

## Setting Up Alerts

### Current System: Browser Notifications

Your app uses `toast` notifications. To get desktop alerts:

**Step 1:** Allow browser notifications  
**Step 2:** Critical events trigger toast alerts  
**Step 3:** You'll see popup even when tab is in background

### With Supabase: Email Alerts

Create a Supabase Edge Function that emails you on critical events:

```typescript
// supabase/functions/admin-alert/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { event_type, severity, description } = await req.json();

  if (severity === 'critical' || severity === 'error') {
    // Send email to admin
    await sendEmail({
      to: 'admin@divinityagi.com',
      subject: `[${severity.toUpperCase()}] ${event_type}`,
      body: description
    });
  }

  return new Response('OK', { status: 200 });
});
```

### With Stripe: Webhook Alerts

Stripe automatically sends you emails for:
- Failed payments
- Disputes/chargebacks
- Subscription cancellations
- Fraud alerts

Configure in: **Stripe Dashboard → Settings → Email Notifications**

---

# <a name="daily-operations"></a>✅ 8. DAILY OPERATIONS CHECKLIST

## Morning Routine (5 minutes)

```
□ Open Admin Dashboard
□ Check "New Signups (7d)" metric
□ Review overnight Events (filter by Error/Critical)
□ Check "Past Due" subscription count
□ Review any failed payments
```

## Weekly Review (30 minutes)

```
□ Export weekly report from Admin Dashboard
□ Calculate week-over-week MRR growth
□ Review subscription churn (cancellations)
□ Analyze top-selling token packages
□ Check error rate trend
□ Process any Verified Leader applications
□ Send thank-you emails to new subscribers
```

## Monthly Tasks (2 hours)

```
□ Generate monthly financial report
□ Export Stripe revenue data
□ Calculate key metrics (LTV, CAC, Churn)
□ Review customer feedback/support tickets
□ Analyze user activity trends
□ Update pricing strategy if needed
□ Plan marketing for next month
□ Review and update app features based on data
□ Backup all data (export from Stripe/Supabase)
```

## Quarterly Review (1 day)

```
□ Full financial audit
□ Customer satisfaction survey
□ Competitive analysis
□ Feature roadmap planning
□ Infrastructure scaling review
□ Security audit
□ Update business projections
```

---

# <a name="troubleshooting"></a>🔧 9. TROUBLESHOOTING COMMON ISSUES

## Issue 1: "No data showing in Admin Dashboard"

**Cause:** Admin events not being tracked

**Solution:**
```javascript
// Check if AdminMonitoringProvider is wrapping your app
// In App.tsx, verify:
<AdminMonitoringProvider>
  <SubscriptionProvider>
    {/* Your app */}
  </SubscriptionProvider>
</AdminMonitoringProvider>

// Check localStorage
console.log(localStorage.getItem('divinityagi_admin_events'));
```

---

## Issue 2: "Revenue numbers seem wrong"

**Cause:** Mock data vs real transactions

**Solution:**
1. Current system uses simulated revenue
2. To get real numbers, integrate Stripe
3. Query Stripe API for actual transaction data
4. Formula: `SUM(successful_payments.amount)`

---

## Issue 3: "Can't see specific user's subscription"

**Cause:** No user search in current version

**Solution (Temporary):**
```javascript
// Open browser console on Admin page
const users = JSON.parse(localStorage.getItem('divinityagi_admin_events') || '[]');
const userEvents = users.filter(e => e.userEmail === 'user@example.com');
console.table(userEvents);
```

**Solution (Permanent):**
Implement Supabase backend, then query:
```sql
SELECT * FROM user_subscriptions WHERE stripe_customer_id LIKE '%search_term%';
```

---

## Issue 4: "Failed payment - what do I do?"

**With Stripe:**
1. Go to Dashboard → Payments
2. Find failed payment
3. Click to see failure reason:
   - **Card declined** → Ask user to update payment method
   - **Insufficient funds** → Send reminder email
   - **Expired card** → Stripe auto-emails customer
4. Click "Retry payment" or "Send payment reminder"

**Manually:**
1. Contact user via email
2. Offer to update payment method
3. If unresponsive, cancel subscription

---

## Issue 5: "How do I give someone a free subscription?"

**Current System (No Backend):**
Not possible without code change. Would need to manually set their tier in app.

**With Stripe:**
```
Customers → [Select] → Add subscription
→ Apply 100% coupon
→ Set duration (1 month, forever, etc.)
→ Save
```

**With Supabase:**
```sql
INSERT INTO user_subscriptions (user_id, tier_id, status, current_period_end)
VALUES ('user-uuid', 'enlightened', 'active', NOW() + INTERVAL '1 year');
```

---

## Issue 6: "User says they paid but don't have access"

**Troubleshooting Steps:**

1. **Check Stripe Dashboard**
   - Payments → Search by email
   - Verify payment succeeded
   - Check if subscription is active

2. **Check Webhook Delivery**
   - Webhooks → Events
   - Find `checkout.session.completed` event
   - Click → View details
   - Check if webhook delivered successfully
   - If failed, click "Resend"

3. **Check User's Tier in App**
   - Admin → Subscriptions → Search user
   - Verify tier shows correctly
   - If not, webhook may have failed

4. **Manual Fix (Stripe)**
   - Subscriptions → Create new subscription
   - Assign to customer
   - Activate immediately

5. **Manual Fix (Supabase)**
   ```sql
   UPDATE user_subscriptions 
   SET tier_id = 'devotee', status = 'active'
   WHERE user_id = 'user-uuid';
   ```

---

## Issue 7: "How do I refund someone?"

**Stripe Method:**
```
Payments → [Select Payment] → Refund
→ Choose amount (full or partial)
→ Reason: [Select reason]
→ Process refund
```

**Important Notes:**
- Refunds take 5-10 business days to appear
- Stripe fees are **not** refunded
- User should lose access immediately (handle in app)

**Handle in App:**
If using webhooks, listen for `charge.refunded`:
```typescript
case 'charge.refunded':
  // Downgrade user to free tier
  await downgradeUser(userId);
  break;
```

---

## Issue 8: "Admin dashboard is slow"

**Causes:**
1. Too many events in localStorage (>1000)
2. Complex filtering calculations
3. No pagination

**Solutions:**

**Clear old events:**
```javascript
// In browser console on Admin page
const events = JSON.parse(localStorage.getItem('divinityagi_admin_events') || '[]');
const recent = events.slice(0, 500); // Keep last 500
localStorage.setItem('divinityagi_admin_events', JSON.stringify(recent));
location.reload();
```

**Optimize queries:**
Move to Supabase for indexed database queries.

**Add pagination:**
Show 50 events per page instead of all at once.

---

## Getting Help

**Documentation:**
- Stripe: https://stripe.com/docs
- Supabase: https://supabase.com/docs
- WooCommerce: https://woocommerce.com/documentation

**Support Channels:**
- Stripe Support: Available 24/7 via dashboard
- Supabase Discord: https://discord.supabase.com
- DivinityAGI Codebase: Review `/components/admin-*.tsx` files

**Emergency Contacts:**
- Set up PagerDuty or similar for critical alerts
- Have backup admin with dashboard access
- Document all procedures in internal wiki

---

## 📚 APPENDIX: Quick Reference

### Admin Dashboard Keyboard Shortcuts
```
(Currently none - could implement:)
R - Refresh data
E - Export report
F - Focus search
```

### Important URLs
```
Admin Dashboard: /admin
Stripe Dashboard: https://dashboard.stripe.com
Supabase Dashboard: https://app.supabase.com
```

### Key Metrics Definitions
- **MRR:** Monthly Recurring Revenue (predictable monthly income)
- **ARPU:** Average Revenue Per User (revenue / users)
- **LTV:** Customer Lifetime Value (total revenue per customer)
- **CAC:** Customer Acquisition Cost (cost to acquire one customer)
- **Churn:** Rate at which customers cancel subscriptions

### SQL Query Templates
See "Managing Subscriptions via Database" section for copy-paste queries.

### Status Code Reference
```
Subscription Status:
- active: Currently paying and active
- trialing: In free trial period
- past_due: Payment failed, grace period
- canceled: Subscription ended
- incomplete: Checkout not completed

Payment Status:
- succeeded: Payment successful
- pending: Payment processing
- failed: Payment declined
- refunded: Money returned to customer
```

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Next Review:** After Stripe/Supabase Integration
