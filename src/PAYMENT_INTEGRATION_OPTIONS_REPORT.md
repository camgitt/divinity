# DivinityAGI Payment Integration Options
## Comprehensive Technical Report: Stripe Direct vs. Supabase+Stripe vs. WooCommerce

---

# 🎯 EXECUTIVE SUMMARY

This report analyzes three approaches to implementing DivinityAGI's subscription and token purchase system:

| Option | Complexity | Cost | Best For | Time to Implement |
|--------|------------|------|----------|-------------------|
| **1. Stripe Direct** | Low | ~3% per transaction | Simple, fast launch | 1-2 weeks |
| **2. Supabase + Stripe** | Medium | ~3% + $25/mo hosting | Scalable, full control | 3-4 weeks |
| **3. WooCommerce API** | High | ~3% + $50-100/mo | Existing WordPress sites | 4-6 weeks |

**Recommended:** Option 2 (Supabase + Stripe) for long-term scalability and data control.

---

# OPTION 1: STRIPE DIRECT INTEGRATION

## 📋 Overview
Integrate Stripe Checkout and Billing directly into your React app without a backend database. User subscription data stored in Stripe, synced to localStorage/React Context.

## ✅ Pros
- **Fastest to implement** (1-2 weeks)
- **No backend required** (serverless)
- **PCI compliant** by default (Stripe handles all payment data)
- **Excellent React libraries** (@stripe/stripe-js, @stripe/react-stripe-js)
- **Built-in subscription management** (billing portal, invoices, renewals)
- **Lower initial costs** (no database hosting)
- **Automatic tax calculation** (Stripe Tax)

## ❌ Cons
- **Limited data ownership** (subscription data lives in Stripe)
- **No custom user database** (harder to build features requiring user history)
- **Token balance tracking** relies on client-side storage (can be lost)
- **Webhook dependency** (need serverless functions for Stripe webhooks)
- **Limited analytics** (must query Stripe API for reporting)
- **Vendor lock-in** (hard to migrate away from Stripe later)

## 💰 Cost Breakdown

### Transaction Fees
- **Credit Card:** 2.9% + $0.30 per transaction
- **ACH/Bank Transfer:** 0.8% (capped at $5)
- **International Cards:** +1.5% additional

### Monthly Costs (Estimated)
```
100 subscribers × $9.99 (Devotee) = $999
Transaction fees (2.9% + $0.30) = $29.97 + $30 = $59.97
Net revenue: $939.03

+ Token purchases (estimated $500/month)
Token fees (2.9% + $0.30 avg) = ~$15
Total monthly fees: ~$75
```

### Additional Features
- **Stripe Billing:** Free
- **Stripe Tax:** $0.50 per transaction (optional)
- **Fraud Prevention (Radar):** Included for free tier, $0.05/transaction for advanced

**Total Monthly Cost:** $75-100 in fees (scales with revenue)

---

## 🛠️ Implementation Guide

### Step 1: Install Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 2: Create Stripe Products (via Dashboard)

**Subscription Products:**
```javascript
// Created in Stripe Dashboard
Product 1: "Devotee Monthly"
- Price: $9.99/month recurring
- Product ID: prod_DevoteeMonthly
- Price ID: price_XXXXXXXXXXXXX

Product 2: "Enlightened Monthly"  
- Price: $14.99/month recurring
- Product ID: prod_EnlightenedMonthly
- Price ID: price_XXXXXXXXXXXXX
```

**Token Packages (One-time):**
```javascript
Product 3: "Starter Token Package"
- Price: $4.99 one-time
- Metadata: { tokens: 100, bonus: 20, total: 120 }

Product 4: "Popular Token Package"
- Price: $9.99 one-time
- Metadata: { tokens: 250, bonus: 75, total: 325 }

Product 5: "Premium Token Package"
- Price: $19.99 one-time
- Metadata: { tokens: 500, bonus: 200, total: 700 }

Product 6: "Ultimate Token Package"
- Price: $34.99 one-time
- Metadata: { tokens: 1000, bonus: 500, total: 1500 }
```

### Step 3: Create Stripe Context (React)

```typescript
// /components/stripe-context.tsx
import { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

interface StripeContextType {
  createSubscription: (priceId: string) => Promise<void>;
  purchaseTokens: (priceId: string) => Promise<void>;
  openBillingPortal: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const createSubscription = async (priceId: string) => {
    setLoading(true);
    const stripe = await stripePromise;
    
    // Call your serverless function to create checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        priceId, 
        mode: 'subscription',
        userId: getCurrentUserId() 
      })
    });
    
    const { sessionId } = await response.json();
    
    // Redirect to Stripe Checkout
    const { error } = await stripe!.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe error:', error);
    }
    setLoading(false);
  };

  const purchaseTokens = async (priceId: string) => {
    setLoading(true);
    const stripe = await stripePromise;
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        priceId, 
        mode: 'payment', // One-time payment
        userId: getCurrentUserId() 
      })
    });
    
    const { sessionId } = await response.json();
    await stripe!.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  const openBillingPortal = async () => {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: getStripeCustomerId() })
    });
    
    const { url } = await response.json();
    window.location.href = url;
  };

  const cancelSubscription = async () => {
    // Cancel via Stripe Billing Portal
    await openBillingPortal();
  };

  return (
    <StripeContext.Provider value={{
      createSubscription,
      purchaseTokens,
      openBillingPortal,
      cancelSubscription
    }}>
      {children}
    </StripeContext.Provider>
  );
}

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) throw new Error('useStripe must be used within StripeProvider');
  return context;
};
```

### Step 4: Serverless Functions (API Routes)

**Vercel/Netlify Function: Create Checkout Session**
```typescript
// /api/create-checkout-session.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, mode, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: mode, // 'subscription' or 'payment'
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.DOMAIN}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/subscription/cancelled`,
      client_reference_id: userId, // Track which user is purchasing
      metadata: { userId }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**Vercel/Netlify Function: Billing Portal**
```typescript
// /api/create-portal-session.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export default async function handler(req, res) {
  const { customerId } = req.body;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.DOMAIN}/profile`
  });

  res.status(200).json({ url: session.url });
}
```

**Vercel/Netlify Function: Webhook Handler**
```typescript
// /api/stripe-webhook.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id;
      
      if (session.mode === 'subscription') {
        // Activate subscription tier
        await activateSubscription(userId, session.subscription);
      } else if (session.mode === 'payment') {
        // Add tokens to user balance
        const tokens = session.metadata.tokens;
        await addTokensToUser(userId, tokens);
      }
      break;

    case 'customer.subscription.deleted':
      // Downgrade user to free tier
      const subscription = event.data.object;
      await downgradeUser(subscription.metadata.userId);
      break;

    case 'customer.subscription.updated':
      // Handle subscription changes
      break;

    case 'invoice.payment_failed':
      // Send warning email
      break;
  }

  res.json({ received: true });
}
```

### Step 5: Update UI Components

```typescript
// Example: Subscription upgrade button
import { useStripe } from './stripe-context';

function UpgradeButton({ tier }: { tier: 'devotee' | 'enlightened' }) {
  const { createSubscription } = useStripe();
  
  const priceIds = {
    devotee: 'price_XXXXXXXXXXXXX',
    enlightened: 'price_YYYYYYYYYYYYY'
  };

  return (
    <button onClick={() => createSubscription(priceIds[tier])}>
      Upgrade to {tier === 'devotee' ? 'Devotee' : 'Enlightened'}
    </button>
  );
}
```

---

## 📊 Data Storage Strategy

Since there's no backend database, you'll store:

### In Stripe (Source of Truth)
- Customer information
- Subscription status
- Payment history
- Active products

### In localStorage (Client-side Cache)
```javascript
{
  "userId": "user_123",
  "stripeCustomerId": "cus_XXXXXXXXXXXXX",
  "subscriptionId": "sub_XXXXXXXXXXXXX",
  "tier": "devotee",
  "tokenBalance": 450,
  "lastSync": "2024-12-15T10:30:00Z"
}
```

### Sync Logic
```typescript
// Periodically sync with Stripe
async function syncSubscriptionStatus() {
  const customerId = localStorage.getItem('stripeCustomerId');
  
  const response = await fetch(`/api/get-subscription-status`, {
    method: 'POST',
    body: JSON.stringify({ customerId })
  });
  
  const { subscription, tier } = await response.json();
  
  // Update local context
  updateSubscriptionContext({ tier, subscription });
}
```

---

## 🚀 Deployment Checklist

- [ ] Create Stripe account (https://dashboard.stripe.com)
- [ ] Set up products and prices in Stripe Dashboard
- [ ] Install Stripe libraries in React app
- [ ] Create serverless functions for checkout/portal/webhooks
- [ ] Configure webhook endpoint in Stripe Dashboard
- [ ] Set environment variables (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY)
- [ ] Test in Stripe Test Mode with test cards
- [ ] Enable Stripe Tax (optional)
- [ ] Configure Stripe Billing Portal settings
- [ ] Go live with production keys

---

## ⚠️ Limitations & Considerations

### Token Balance Persistence
**Problem:** Token balance stored in localStorage can be lost if user clears browser data.

**Solutions:**
1. Store token purchases in Stripe metadata
2. Re-sync from Stripe on app load
3. Use Stripe Customer metadata to track token balance
4. Implement a simple key-value store (Redis, Upstash)

### User Account Management
**Problem:** No central user database means limited user management.

**Solutions:**
1. Use Stripe Customer Portal for subscription management
2. Store minimal user data in localStorage
3. Implement basic email-based authentication
4. Consider adding Supabase Auth (leads to Option 2)

### Analytics & Reporting
**Problem:** Must query Stripe API for all analytics.

**Solutions:**
1. Use Stripe Dashboard for basic reporting
2. Export data via Stripe API for custom analytics
3. Integrate Stripe with analytics tools (Segment, Mixpanel)
4. Build custom reporting by querying Stripe API periodically

---

## 🎯 When to Choose This Option

Choose **Stripe Direct Integration** if:
- ✅ You need to launch FAST (MVP in 1-2 weeks)
- ✅ You're okay with Stripe being your source of truth
- ✅ You don't need complex user profiles or analytics
- ✅ Your app is mostly client-side React
- ✅ Budget is tight (no hosting costs)
- ✅ You're comfortable with serverless functions

Avoid if:
- ❌ You need deep analytics and custom reporting
- ❌ You plan to build complex user features (activity feeds, social features)
- ❌ You want to own all user data
- ❌ You might want to switch payment providers later
- ❌ Token balance tracking needs to be bulletproof

---

# OPTION 2: SUPABASE + STRIPE INTEGRATION

## 📋 Overview
Use Supabase as your backend database to store user profiles, subscriptions, and token balances. Stripe handles payments, but Supabase is the source of truth for user data.

## ✅ Pros
- **Full data ownership** (all user data in your database)
- **Robust token tracking** (database-backed, never lost)
- **Built-in authentication** (Supabase Auth with email, OAuth, magic links)
- **Real-time capabilities** (WebSockets for live updates)
- **Advanced analytics** (query your own data)
- **Scalable architecture** (PostgreSQL backend)
- **Row-level security** (built-in access control)
- **Future-proof** (easy to add features like social, chat, etc.)
- **API auto-generated** (REST + GraphQL)

## ❌ Cons
- **More complex setup** (3-4 weeks implementation)
- **Backend hosting costs** ($25/month minimum)
- **Requires database design** (schema planning needed)
- **More moving parts** (Stripe + Supabase sync)
- **Learning curve** (if team unfamiliar with Supabase)

## 💰 Cost Breakdown

### Supabase Costs
**Free Tier:**
- 500MB database storage
- 2GB bandwidth
- 50,000 monthly active users
- Good for MVP/testing

**Pro Tier: $25/month**
- 8GB database storage
- 250GB bandwidth
- 100,000 monthly active users
- Daily backups
- **Recommended for production**

**Team Tier: $599/month** (for scale)
- Everything in Pro
- Point-in-time recovery
- Advanced security features

### Stripe Costs (Same as Option 1)
- 2.9% + $0.30 per transaction
- No additional fees for Supabase integration

### Total Monthly Cost Estimate
```
Supabase Pro: $25/month
Stripe fees: ~$75/month (based on $1000 revenue)
Total: $100/month + transaction fees

As you scale to 1000+ subscribers:
Supabase Pro: $25/month
Stripe fees: ~$750/month (based on $10,000 revenue)
Total: $775/month
```

**ROI:** The $25/month Supabase cost is negligible compared to the value of owning your data and having scalability.

---

## 🛠️ Implementation Guide

### Step 1: Set Up Supabase Project

1. Create account at https://supabase.com
2. Create new project: "divinityagi-production"
3. Note your credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Public Key: `eyJhbGc...`
   - Service Role Key: `eyJhbGc...` (keep secret!)

### Step 2: Database Schema Design

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  faith_tradition TEXT,
  location TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription tiers table
CREATE TABLE public.subscription_tiers (
  id TEXT PRIMARY KEY, -- 'seeker', 'subscriber', 'devotee', 'enlightened'
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_period TEXT, -- 'month', 'year', null for free
  daily_token_allowance INTEGER NOT NULL,
  avatar_access TEXT NOT NULL, -- 'limited', 'standard', 'full', 'priority'
  personal_guide TEXT NOT NULL, -- 'trial', 'basic', 'advanced', 'unlimited'
  exclusive_content BOOLEAN DEFAULT FALSE,
  priority_support BOOLEAN DEFAULT FALSE,
  community_access TEXT DEFAULT 'basic', -- 'none', 'basic', 'full', 'exclusive'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert tier data
INSERT INTO subscription_tiers (id, name, price, billing_period, daily_token_allowance, avatar_access, personal_guide, exclusive_content, priority_support, community_access)
VALUES 
  ('seeker', 'Seeker', 0.00, NULL, 10, 'limited', 'trial', FALSE, FALSE, 'basic'),
  ('subscriber', 'Subscriber', 0.00, NULL, 25, 'standard', 'basic', FALSE, FALSE, 'full'),
  ('devotee', 'Devotee', 9.99, 'month', 100, 'full', 'advanced', TRUE, FALSE, 'full'),
  ('enlightened', 'Enlightened', 14.99, 'month', -1, 'priority', 'unlimited', TRUE, TRUE, 'exclusive');

-- User subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  tier_id TEXT REFERENCES public.subscription_tiers(id) DEFAULT 'seeker',
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'past_due', 'unpaid'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Token balances table
CREATE TABLE public.token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  daily_tokens INTEGER DEFAULT 0,
  purchased_tokens INTEGER DEFAULT 0,
  wisdom_tokens INTEGER DEFAULT 500,
  total_tokens_earned INTEGER DEFAULT 0,
  total_tokens_spent INTEGER DEFAULT 0,
  last_daily_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token transactions history
CREATE TABLE public.token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'purchase', 'daily_reset', 'earned', 'spent', 'bonus'
  amount INTEGER NOT NULL, -- positive for credit, negative for debit
  balance_after INTEGER NOT NULL,
  description TEXT,
  stripe_payment_intent_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table (token packages & subscriptions)
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  type TEXT NOT NULL, -- 'subscription', 'tokens'
  product_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  tokens_granted INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);
CREATE INDEX idx_token_balances_user_id ON token_balances(user_id);
CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only read/update their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own token balance" ON public.token_balances
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON public.token_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Functions
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_token_balances_updated_at BEFORE UPDATE ON public.token_balances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to reset daily tokens (run via cron)
CREATE OR REPLACE FUNCTION reset_daily_tokens()
RETURNS void AS $$
BEGIN
  UPDATE token_balances tb
  SET 
    daily_tokens = st.daily_token_allowance,
    last_daily_reset = NOW()
  FROM user_subscriptions us
  JOIN subscription_tiers st ON us.tier_id = st.id
  WHERE tb.user_id = us.user_id
    AND tb.last_daily_reset < (NOW() - INTERVAL '24 hours')
    AND st.daily_token_allowance > 0; -- Don't reset unlimited tiers
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get total available tokens
CREATE OR REPLACE FUNCTION get_total_tokens(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_total INTEGER;
BEGIN
  SELECT 
    CASE 
      WHEN st.daily_token_allowance = -1 THEN -1 -- Unlimited
      ELSE COALESCE(tb.daily_tokens, 0) + COALESCE(tb.purchased_tokens, 0)
    END INTO v_total
  FROM token_balances tb
  JOIN user_subscriptions us ON tb.user_id = us.user_id
  JOIN subscription_tiers st ON us.tier_id = st.id
  WHERE tb.user_id = p_user_id;
  
  RETURN COALESCE(v_total, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Step 3: Supabase Edge Functions (Webhooks Handler)

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@13.11.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16'
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      
      if (session.mode === 'subscription') {
        // New subscription created
        await supabase.from('user_subscriptions').upsert({
          user_id: session.client_reference_id,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          tier_id: session.metadata.tier,
          status: 'active',
          current_period_start: new Date(session.subscription.current_period_start * 1000),
          current_period_end: new Date(session.subscription.current_period_end * 1000)
        });
        
        // Reset daily tokens to new tier allowance
        const { data: tier } = await supabase
          .from('subscription_tiers')
          .select('daily_token_allowance')
          .eq('id', session.metadata.tier)
          .single();
          
        await supabase.from('token_balances').upsert({
          user_id: session.client_reference_id,
          daily_tokens: tier.daily_token_allowance
        });
      } 
      else if (session.mode === 'payment') {
        // Token package purchased
        const tokens = parseInt(session.metadata.tokens);
        
        // Add purchased tokens
        await supabase.rpc('add_purchased_tokens', {
          p_user_id: session.client_reference_id,
          p_tokens: tokens
        });
        
        // Record purchase
        await supabase.from('purchases').insert({
          user_id: session.client_reference_id,
          stripe_payment_intent_id: session.payment_intent,
          type: 'tokens',
          amount: session.amount_total / 100,
          status: 'completed',
          tokens_granted: tokens,
          metadata: session.metadata
        });
        
        // Record transaction
        await supabase.from('token_transactions').insert({
          user_id: session.client_reference_id,
          type: 'purchase',
          amount: tokens,
          description: `Purchased ${tokens} tokens`,
          stripe_payment_intent_id: session.payment_intent
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      
      // Downgrade to subscriber (free tier)
      await supabase.from('user_subscriptions').update({
        tier_id: 'subscriber',
        status: 'cancelled',
        stripe_subscription_id: null
      }).eq('stripe_subscription_id', subscription.id);
      
      // Reset to subscriber token allowance
      await supabase.from('token_balances').update({
        daily_tokens: 25
      }).eq('user_id', subscription.metadata.user_id);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      
      await supabase.from('user_subscriptions').update({
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000),
        cancel_at_period_end: subscription.cancel_at_period_end
      }).eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      
      await supabase.from('user_subscriptions').update({
        status: 'past_due'
      }).eq('stripe_customer_id', invoice.customer);
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
```

### Step 4: React Integration with Supabase

```typescript
// /components/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types (auto-generated)
export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  faith_tradition?: string;
  location?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  tier_id: 'seeker' | 'subscriber' | 'devotee' | 'enlightened';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
}

export interface TokenBalance {
  id: string;
  user_id: string;
  daily_tokens: number;
  purchased_tokens: number;
  wisdom_tokens: number;
  total_tokens_earned: number;
  total_tokens_spent: number;
  last_daily_reset: string;
}
```

```typescript
// /components/supabase-subscription-context.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase-client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface SubscriptionContextType {
  subscription: UserSubscription | null;
  tokenBalance: TokenBalance | null;
  totalTokens: number;
  loading: boolean;
  upgradeSubscription: (tier: string) => Promise<void>;
  purchaseTokens: (packageId: string) => Promise<void>;
  useTokens: (amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SupabaseSubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUser = supabase.auth.getUser();

  // Load subscription and token data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    // Load subscription
    const { data: sub } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    setSubscription(sub);

    // Load token balance
    const { data: balance } = await supabase
      .from('token_balances')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    setTokenBalance(balance);
    setLoading(false);
  };

  const upgradeSubscription = async (tier: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const stripe = await stripePromise;
    
    // Call your Edge Function to create checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        tier,
        userId: user.id,
        mode: 'subscription'
      }
    });

    if (error) throw error;

    // Redirect to Stripe Checkout
    await stripe!.redirectToCheckout({ sessionId: data.sessionId });
  };

  const purchaseTokens = async (packageId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const packages = {
      starter: { tokens: 120, price: 'price_XXXXX' },
      popular: { tokens: 325, price: 'price_YYYYY' },
      premium: { tokens: 700, price: 'price_ZZZZZ' },
      ultimate: { tokens: 1500, price: 'price_AAAAA' }
    };

    const pkg = packages[packageId];
    const stripe = await stripePromise;

    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId: pkg.price,
        tokens: pkg.tokens,
        userId: user.id,
        mode: 'payment'
      }
    });

    if (error) throw error;
    await stripe!.redirectToCheckout({ sessionId: data.sessionId });
  };

  const useTokens = async (amount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Call stored procedure to deduct tokens
    const { data, error } = await supabase.rpc('use_tokens', {
      p_user_id: user.id,
      p_amount: amount
    });

    if (error || !data) return false;

    // Refresh balance
    await refreshBalance();
    return true;
  };

  const refreshBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: balance } = await supabase
      .from('token_balances')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    setTokenBalance(balance);
  };

  const totalTokens = tokenBalance 
    ? (tokenBalance.daily_tokens + tokenBalance.purchased_tokens)
    : 0;

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      tokenBalance,
      totalTokens,
      loading,
      upgradeSubscription,
      purchaseTokens,
      useTokens,
      refreshBalance
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSupabaseSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('Must be used within SupabaseSubscriptionProvider');
  return context;
};
```

### Step 5: Supabase Edge Function (Checkout Session Creator)

```typescript
// supabase/functions/create-checkout-session/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@13.11.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16'
});

serve(async (req) => {
  const { tier, priceId, tokens, userId, mode } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: mode, // 'subscription' or 'payment'
      payment_method_types: ['card'],
      line_items: mode === 'subscription' 
        ? [{ 
            price: getTierPriceId(tier), 
            quantity: 1 
          }]
        : [{ 
            price: priceId, 
            quantity: 1 
          }],
      success_url: `${Deno.env.get('APP_URL')}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('APP_URL')}/subscription/cancelled`,
      client_reference_id: userId,
      metadata: mode === 'subscription' 
        ? { tier, userId }
        : { tokens, userId }
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

function getTierPriceId(tier: string): string {
  const priceIds = {
    devotee: 'price_DEVOTEE_MONTHLY',
    enlightened: 'price_ENLIGHTENED_MONTHLY'
  };
  return priceIds[tier] || priceIds.devotee;
}
```

### Step 6: Database Helper Functions

```sql
-- Function to add purchased tokens
CREATE OR REPLACE FUNCTION add_purchased_tokens(p_user_id UUID, p_tokens INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE token_balances
  SET purchased_tokens = purchased_tokens + p_tokens,
      total_tokens_earned = total_tokens_earned + p_tokens,
      updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to use tokens (with validation)
CREATE OR REPLACE FUNCTION use_tokens(p_user_id UUID, p_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  v_total INTEGER;
  v_daily INTEGER;
  v_purchased INTEGER;
BEGIN
  -- Get current balance
  SELECT daily_tokens, purchased_tokens INTO v_daily, v_purchased
  FROM token_balances
  WHERE user_id = p_user_id;
  
  v_total := v_daily + v_purchased;
  
  -- Check if enough tokens
  IF v_total < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Deduct from daily first, then purchased
  IF v_daily >= p_amount THEN
    UPDATE token_balances
    SET daily_tokens = daily_tokens - p_amount,
        total_tokens_spent = total_tokens_spent + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id;
  ELSE
    UPDATE token_balances
    SET daily_tokens = 0,
        purchased_tokens = purchased_tokens - (p_amount - v_daily),
        total_tokens_spent = total_tokens_spent + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
  
  -- Log transaction
  INSERT INTO token_transactions (user_id, type, amount, balance_after, description)
  VALUES (
    p_user_id,
    'spent',
    -p_amount,
    (SELECT (daily_tokens + purchased_tokens) FROM token_balances WHERE user_id = p_user_id),
    'Tokens used for AI conversation'
  );
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🚀 Deployment Checklist

### Supabase Setup
- [ ] Create Supabase project
- [ ] Run database schema SQL
- [ ] Set up Row Level Security policies
- [ ] Create Edge Functions (webhook handler, checkout creator)
- [ ] Configure environment variables in Supabase Dashboard
- [ ] Set up daily token reset cron job (using pg_cron or external scheduler)

### Stripe Setup
- [ ] Create Stripe products and prices
- [ ] Configure webhook endpoint (point to Supabase Edge Function)
- [ ] Add webhook secret to Supabase environment
- [ ] Test webhook with Stripe CLI

### React App
- [ ] Install Supabase client library
- [ ] Configure environment variables (Supabase URL, Anon Key, Stripe Publishable Key)
- [ ] Implement authentication flow (Supabase Auth)
- [ ] Replace localStorage token tracking with Supabase queries
- [ ] Update subscription context to use Supabase

### Testing
- [ ] Test user registration → creates database records
- [ ] Test subscription purchase → updates tier in database
- [ ] Test token package purchase → adds to purchased_tokens
- [ ] Test token usage → deducts correctly from balance
- [ ] Test daily token reset (run manually or wait 24hr)
- [ ] Test cancellation → downgrades tier
- [ ] Verify RLS policies work (users can't see other users' data)

---

## 📊 Analytics & Reporting

With Supabase, you own all the data and can query it directly:

```sql
-- Monthly Recurring Revenue (MRR)
SELECT 
  st.name as tier,
  COUNT(*) as subscribers,
  SUM(st.price) as mrr
FROM user_subscriptions us
JOIN subscription_tiers st ON us.tier_id = st.id
WHERE us.status = 'active' AND st.price > 0
GROUP BY st.name, st.price;

-- Token purchase revenue (last 30 days)
SELECT 
  SUM(amount) as total_revenue,
  SUM(tokens_granted) as total_tokens_sold,
  COUNT(*) as total_purchases
FROM purchases
WHERE type = 'tokens' 
  AND status = 'completed'
  AND created_at >= NOW() - INTERVAL '30 days';

-- User engagement (token usage)
SELECT 
  user_id,
  SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END) as tokens_used_7d
FROM token_transactions
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY user_id
ORDER BY tokens_used_7d DESC
LIMIT 100;

-- Churn rate
SELECT 
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
  COUNT(*) FILTER (WHERE status = 'active') as active,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'cancelled')::DECIMAL / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as churn_percentage
FROM user_subscriptions
WHERE tier_id IN ('devotee', 'enlightened');
```

Build custom dashboards by querying Supabase directly or use tools like:
- **Metabase** (connect to Supabase PostgreSQL)
- **Retool** (admin dashboard builder)
- **Grafana** (real-time metrics)

---

## 🎯 When to Choose This Option

Choose **Supabase + Stripe** if:
- ✅ You want to own all your user data
- ✅ You plan to build complex features (social, analytics, admin tools)
- ✅ You need robust token balance tracking
- ✅ You want real-time features (live updates, notifications)
- ✅ You're building for long-term scale
- ✅ You need advanced authentication (OAuth, magic links, etc.)
- ✅ Budget allows $25/month for hosting

Avoid if:
- ❌ You need to launch in less than 2 weeks
- ❌ Team has no database/backend experience
- ❌ You want zero hosting costs
- ❌ Your app is extremely simple and won't evolve

---

# OPTION 3: WOOCOMMERCE API INTEGRATION

## 📋 Overview
Run a separate WordPress + WooCommerce site to handle all e-commerce. Your React app communicates with WooCommerce via REST API. WooCommerce becomes your source of truth for products, subscriptions, and purchases.

## ✅ Pros
- **Full e-commerce platform** (product management, discounts, coupons, etc.)
- **Familiar for WordPress developers** (huge ecosystem)
- **Advanced marketing tools** (email campaigns, abandoned cart, upsells)
- **Extensive payment gateways** (100+ options)
- **Subscription management** (via WooCommerce Subscriptions extension)
- **Invoice generation** (automatic billing documents)
- **Tax handling** (built-in tax calculation)
- **Customer portal** (account management, order history)

## ❌ Cons
- **Most complex setup** (4-6 weeks)
- **Requires WordPress hosting** ($50-100/month)
- **Two separate systems** (React app + WordPress site)
- **API sync complexity** (keeping data in sync)
- **Performance overhead** (REST API calls to WordPress)
- **Security concerns** (WordPress vulnerabilities)
- **Maintenance burden** (WordPress updates, plugin updates)
- **Overkill for digital products** (WooCommerce designed for physical goods)

## 💰 Cost Breakdown

### WordPress Hosting
**Shared Hosting (Not Recommended):**
- $5-15/month (Bluehost, HostGator)
- Too slow for API-heavy usage

**Managed WordPress Hosting (Recommended):**
- **WP Engine:** $30-50/month
- **Kinsta:** $35-60/month
- **Cloudways:** $24/month (managed cloud)

**VPS/Cloud (For Scale):**
- **DigitalOcean Droplet:** $12-40/month
- **AWS Lightsail:** $20-40/month
- Requires server management

### WooCommerce Extensions
- **WooCommerce Subscriptions:** $199/year (required for recurring billing)
- **WooCommerce Memberships:** $149/year (optional, for tier-based content)
- **WooCommerce REST API (free)**

### Payment Gateway Fees
- Same as Stripe: 2.9% + $0.30 per transaction
- Or PayPal: 2.9% + $0.30

### Total Monthly Cost Estimate
```
WP Managed Hosting: $35/month
WooCommerce Subscriptions: $16.50/month ($199/year amortized)
SSL Certificate: $0 (free with Let's Encrypt)
CDN (Cloudflare): $0 (free tier)
Backups: $10/month
Total: ~$60/month base cost

Plus transaction fees: ~$75/month (same as other options)

Grand Total: $135/month minimum
```

**Note:** This is significantly more expensive than Option 2 (Supabase) for similar functionality.

---

## 🛠️ Implementation Guide

### Step 1: Set Up WordPress + WooCommerce

1. **Provision Hosting**
   - Sign up for managed WordPress hosting (WP Engine, Kinsta, etc.)
   - Install WordPress (usually one-click)

2. **Install WooCommerce**
   ```bash
   # Via WordPress admin dashboard:
   Plugins → Add New → Search "WooCommerce" → Install → Activate
   
   # Or via WP-CLI:
   wp plugin install woocommerce --activate
   ```

3. **Install Required Plugins**
   ```bash
   wp plugin install woocommerce-subscriptions --activate
   wp plugin install woocommerce-rest-api --activate
   wp plugin install jwt-authentication-for-wp-rest-api --activate
   ```

4. **Configure WooCommerce**
   - Set currency to USD
   - Enable virtual/downloadable products
   - Disable shipping (digital products only)
   - Configure payment gateways (Stripe recommended)

### Step 2: Create Products in WooCommerce

**Via WordPress Admin:**

**Subscription Product 1: Devotee Monthly**
```
Product Name: Devotee Monthly Subscription
Product Type: Simple Subscription
Regular Price: $9.99
Subscription Period: Monthly
Subscription Length: Until cancelled
Virtual: Yes
Downloadable: No
Product Attributes (Custom Fields):
  - tier_id: devotee
  - daily_token_allowance: 100
  - avatar_access: full
  - personal_guide: advanced
  - exclusive_content: true
  - priority_support: false
```

**Subscription Product 2: Enlightened Monthly**
```
Product Name: Enlightened Monthly Subscription
Product Type: Simple Subscription
Regular Price: $14.99
Subscription Period: Monthly
Subscription Length: Until cancelled
Virtual: Yes
Product Attributes:
  - tier_id: enlightened
  - daily_token_allowance: -1
  - avatar_access: priority
  - personal_guide: unlimited
  - exclusive_content: true
  - priority_support: true
```

**Simple Product: Token Packages**
```
Product 1: Starter Token Package
Product Type: Simple Product
Regular Price: $4.99
Virtual: Yes
Product Meta:
  - tokens: 100
  - bonus_tokens: 20
  - total_tokens: 120
  - package_type: starter

Product 2: Popular Token Package
Regular Price: $9.99
Sale Price: (none, already discounted)
Product Meta:
  - tokens: 250
  - bonus_tokens: 75
  - total_tokens: 325
  - package_type: popular
  - featured: true

Product 3: Premium Token Package
Regular Price: $19.99
Product Meta:
  - tokens: 500
  - bonus_tokens: 200
  - total_tokens: 700
  - package_type: premium

Product 4: Ultimate Token Package
Regular Price: $34.99
Product Meta:
  - tokens: 1000
  - bonus_tokens: 500
  - total_tokens: 1500
  - package_type: ultimate
```

### Step 3: Enable REST API

**Generate API Keys:**
1. WooCommerce → Settings → Advanced → REST API
2. Click "Add Key"
3. Description: "DivinityAGI React App"
4. User: (select admin user)
5. Permissions: Read/Write
6. Generate API Key
7. Save Consumer Key and Consumer Secret

**Example Credentials:**
```
Consumer Key: ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Consumer Secret: cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REST API Base URL: https://yourstore.com/wp-json/wc/v3/
```

### Step 4: React App Integration

```typescript
// /lib/woocommerce-client.ts
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const woocommerce = new WooCommerceRestApi({
  url: "https://your-wordpress-site.com",
  consumerKey: import.meta.env.VITE_WC_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true // For development, use OAuth for production
});

// Types
export interface WCProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  type: 'simple' | 'subscription';
  meta_data: Array<{ key: string; value: any }>;
}

export interface WCSubscription {
  id: number;
  status: 'active' | 'on-hold' | 'cancelled' | 'expired';
  billing_period: 'month' | 'year';
  billing_interval: number;
  total: string;
  customer_id: number;
  line_items: Array<{
    product_id: number;
    name: string;
    total: string;
  }>;
}

export interface WCOrder {
  id: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total: string;
  customer_id: number;
  line_items: Array<{
    product_id: number;
    name: string;
    total: string;
    meta_data: Array<{ key: string; value: any }>;
  }>;
}
```

```typescript
// /components/woocommerce-context.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { woocommerce, WCProduct, WCSubscription } from '../lib/woocommerce-client';

interface WCContextType {
  products: WCProduct[];
  userSubscriptions: WCSubscription[];
  loading: boolean;
  createSubscription: (productId: number) => Promise<void>;
  purchaseTokens: (productId: number) => Promise<void>;
  cancelSubscription: (subscriptionId: number) => Promise<void>;
  getTokenBalance: () => Promise<number>;
}

const WCContext = createContext<WCContextType | undefined>(undefined);

export function WooCommerceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<WCSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [wcCustomerId, setWcCustomerId] = useState<number | null>(null);

  // Load products on mount
  useEffect(() => {
    loadProducts();
    loadUserSubscriptions();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await woocommerce.get("products", {
        per_page: 20,
        category: '' // Filter by category if needed
      });
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserSubscriptions = async () => {
    if (!wcCustomerId) return;
    
    try {
      const { data } = await woocommerce.get("subscriptions", {
        customer: wcCustomerId
      });
      setUserSubscriptions(data);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    }
  };

  const createSubscription = async (productId: number) => {
    try {
      // Get current user email from your auth system
      const userEmail = getCurrentUserEmail();
      
      // Create or get WooCommerce customer
      let customer;
      try {
        const { data } = await woocommerce.get("customers", {
          email: userEmail
        });
        customer = data[0];
      } catch {
        // Create new customer
        const { data } = await woocommerce.post("customers", {
          email: userEmail,
          first_name: getCurrentUserName(),
          username: getCurrentUsername()
        });
        customer = data;
      }

      setWcCustomerId(customer.id);

      // Create subscription
      const { data: subscription } = await woocommerce.post("subscriptions", {
        customer_id: customer.id,
        billing_period: "month",
        billing_interval: 1,
        start_date: new Date().toISOString(),
        line_items: [
          {
            product_id: productId,
            quantity: 1
          }
        ],
        payment_method: "stripe", // or your configured gateway
        payment_method_title: "Credit Card (Stripe)"
      });

      // Redirect to checkout for payment
      const checkoutUrl = `https://your-wordpress-site.com/checkout/pay/${subscription.id}`;
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  };

  const purchaseTokens = async (productId: number) => {
    try {
      const userEmail = getCurrentUserEmail();
      
      // Get or create customer (same as above)
      let customer = await getOrCreateCustomer(userEmail);

      // Create order for token purchase
      const { data: order } = await woocommerce.post("orders", {
        customer_id: customer.id,
        payment_method: "stripe",
        payment_method_title: "Credit Card",
        set_paid: false, // Will be paid via Stripe checkout
        line_items: [
          {
            product_id: productId,
            quantity: 1
          }
        ]
      });

      // Redirect to checkout
      const checkoutUrl = `https://your-wordpress-site.com/checkout/pay/${order.id}`;
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error('Failed to purchase tokens:', error);
      throw error;
    }
  };

  const cancelSubscription = async (subscriptionId: number) => {
    try {
      await woocommerce.put(`subscriptions/${subscriptionId}`, {
        status: "cancelled"
      });
      
      // Reload subscriptions
      await loadUserSubscriptions();
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  };

  const getTokenBalance = async () => {
    // Query all completed token orders for this customer
    const { data: orders } = await woocommerce.get("orders", {
      customer: wcCustomerId,
      status: "completed"
    });

    let totalTokens = 0;
    orders.forEach(order => {
      order.line_items.forEach(item => {
        const tokenMeta = item.meta_data.find(m => m.key === 'total_tokens');
        if (tokenMeta) {
          totalTokens += parseInt(tokenMeta.value);
        }
      });
    });

    return totalTokens;
  };

  return (
    <WCContext.Provider value={{
      products,
      userSubscriptions,
      loading,
      createSubscription,
      purchaseTokens,
      cancelSubscription,
      getTokenBalance
    }}>
      {children}
    </WCContext.Provider>
  );
}

export const useWooCommerce = () => {
  const context = useContext(WCContext);
  if (!context) throw new Error('useWooCommerce must be within WooCommerceProvider');
  return context;
};
```

### Step 5: WordPress Webhooks (Action Hooks)

WooCommerce fires WordPress action hooks when events occur. You can listen to these and send data to your React app.

**Install Custom Plugin: functions.php or custom plugin**

```php
<?php
// /wp-content/plugins/divinityagi-integration/divinityagi-integration.php

/**
 * Plugin Name: DivinityAGI Integration
 * Description: Syncs WooCommerce subscriptions and orders with DivinityAGI React app
 * Version: 1.0.0
 */

// Hook into subscription activation
add_action('woocommerce_subscription_status_active', 'divinityagi_subscription_activated', 10, 1);

function divinityagi_subscription_activated($subscription) {
    $customer_id = $subscription->get_customer_id();
    $customer = new WC_Customer($customer_id);
    $product_id = $subscription->get_items()[0]->get_product_id();
    $product = wc_get_product($product_id);
    
    // Get tier from product meta
    $tier_id = $product->get_meta('tier_id');
    $token_allowance = $product->get_meta('daily_token_allowance');
    
    // Send webhook to your React app backend (or Supabase Edge Function)
    $response = wp_remote_post('https://your-react-app.com/api/subscription-activated', array(
        'body' => json_encode(array(
            'customer_email' => $customer->get_email(),
            'tier_id' => $tier_id,
            'subscription_id' => $subscription->get_id(),
            'token_allowance' => $token_allowance,
            'status' => 'active'
        )),
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . get_option('divinityagi_api_key')
        )
    ));
}

// Hook into order completion (token purchases)
add_action('woocommerce_order_status_completed', 'divinityagi_order_completed', 10, 1);

function divinityagi_order_completed($order_id) {
    $order = wc_get_order($order_id);
    $customer_email = $order->get_billing_email();
    
    $total_tokens = 0;
    
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        $tokens = $product->get_meta('total_tokens');
        
        if ($tokens) {
            $total_tokens += intval($tokens);
        }
    }
    
    if ($total_tokens > 0) {
        // Send webhook to grant tokens
        wp_remote_post('https://your-react-app.com/api/tokens-purchased', array(
            'body' => json_encode(array(
                'customer_email' => $customer_email,
                'tokens' => $total_tokens,
                'order_id' => $order_id
            )),
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . get_option('divinityagi_api_key')
            )
        ));
    }
}

// Hook into subscription cancellation
add_action('woocommerce_subscription_status_cancelled', 'divinityagi_subscription_cancelled', 10, 1);

function divinityagi_subscription_cancelled($subscription) {
    $customer_id = $subscription->get_customer_id();
    $customer = new WC_Customer($customer_id);
    
    wp_remote_post('https://your-react-app.com/api/subscription-cancelled', array(
        'body' => json_encode(array(
            'customer_email' => $customer->get_email(),
            'subscription_id' => $subscription->get_id()
        )),
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . get_option('divinityagi_api_key')
        )
    ));
}
?>
```

### Step 6: Sync User Data

**Challenge:** Keeping user data in sync between WooCommerce (WordPress) and your React app.

**Solution 1: WooCommerce as Source of Truth**
- Store ONLY subscription/purchase data in WooCommerce
- Store user profiles, token balance in your React app (localStorage or Supabase)
- On app load, query WooCommerce API for active subscriptions
- Sync token purchases via webhook

**Solution 2: Dual Storage**
- Store everything in both systems
- Use webhooks to keep in sync
- More complex but more resilient

**Recommended Approach:**
```typescript
// On React app load
async function syncWithWooCommerce() {
  const userEmail = getCurrentUserEmail();
  
  // 1. Get WooCommerce customer by email
  const customer = await getWCCustomer(userEmail);
  
  // 2. Get active subscriptions
  const subscriptions = await getWCSubscriptions(customer.id);
  const activeSub = subscriptions.find(s => s.status === 'active');
  
  // 3. Update local state with tier from WooCommerce
  if (activeSub) {
    const productMeta = await getProductMeta(activeSub.line_items[0].product_id);
    updateLocalTier(productMeta.tier_id);
  }
  
  // 4. Get token balance from completed orders
  const tokenBalance = await calculateTokenBalance(customer.id);
  updateLocalTokenBalance(tokenBalance);
}
```

---

## 🚀 Deployment Checklist

### WordPress/WooCommerce Setup
- [ ] Provision managed WordPress hosting
- [ ] Install WordPress + WooCommerce
- [ ] Install WooCommerce Subscriptions extension
- [ ] Configure payment gateway (Stripe)
- [ ] Create subscription products (Devotee, Enlightened)
- [ ] Create token package products (Starter, Popular, Premium, Ultimate)
- [ ] Add custom product meta fields (tier_id, tokens, etc.)
- [ ] Enable REST API and generate keys
- [ ] Install DivinityAGI integration plugin
- [ ] Configure webhooks to React app

### React App
- [ ] Install WooCommerce REST API client
- [ ] Store API keys in environment variables
- [ ] Build WooCommerce context/provider
- [ ] Implement sync logic (load subscriptions on app start)
- [ ] Build checkout flow (redirect to WooCommerce checkout)
- [ ] Handle return from checkout (success/cancel pages)
- [ ] Implement token balance calculation from orders

### Backend/API
- [ ] Create webhook receiver endpoints (/api/subscription-activated, etc.)
- [ ] Implement authentication for webhooks (verify signature)
- [ ] Update local user state when webhooks fire
- [ ] Set up logging for webhook events

### Testing
- [ ] Test subscription purchase flow (end-to-end)
- [ ] Test token package purchase
- [ ] Test subscription cancellation
- [ ] Test webhook delivery and processing
- [ ] Test sync logic (refresh page, ensure tier persists)
- [ ] Test with multiple users
- [ ] Verify data consistency between WooCommerce and React app

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│   React App     │
│  (DivinityAGI)  │
└────────┬────────┘
         │
         │ 1. User clicks "Upgrade"
         ↓
┌─────────────────┐
│ WooCommerce API │
│  (REST Request) │
└────────┬────────┘
         │
         │ 2. Create subscription/order
         ↓
┌─────────────────┐
│   WordPress     │
│  WooCommerce    │
└────────┬────────┘
         │
         │ 3. Redirect to checkout
         ↓
┌─────────────────┐
│ Stripe Checkout │
│  (Payment Page) │
└────────┬────────┘
         │
         │ 4. User completes payment
         ↓
┌─────────────────┐
│   WordPress     │
│  (Webhooks)     │
└────────┬────────┘
         │
         │ 5. Fire action hook
         ↓
┌─────────────────┐
│  Custom Plugin  │
│  (PHP webhook)  │
└────────┬────────┘
         │
         │ 6. POST to React app API
         ↓
┌─────────────────┐
│  React App API  │
│  (Update state) │
└────────┬────────┘
         │
         │ 7. Update user tier/tokens
         ↓
┌─────────────────┐
│   Local State   │
│  (or Supabase)  │
└─────────────────┘
```

---

## ⚠️ Challenges & Limitations

### 1. **Sync Complexity**
**Problem:** Keeping data in sync between two systems is hard.
**Mitigations:**
- Use webhooks religiously
- Implement retry logic for failed webhooks
- Periodic background sync (every 5 minutes, check for changes)
- Logging and monitoring

### 2. **Performance**
**Problem:** API calls to WordPress can be slow (200-500ms per request).
**Mitigations:**
- Cache product data in React app (refresh every hour)
- Only query subscriptions on app load, not on every page
- Use CDN for WordPress (Cloudflare)
- Optimize WordPress (caching plugins, object cache)

### 3. **Security**
**Problem:** WordPress is a common target for hackers.
**Mitigations:**
- Keep WordPress, plugins updated
- Use strong passwords, 2FA
- Security plugins (Wordfence, Sucuri)
- Regular backups
- Hide wp-admin, wp-login.php
- Disable XML-RPC

### 4. **Cost**
**Problem:** More expensive than other options.
**Justification:**
- Only worth it if you need advanced e-commerce features
- Not justified for simple subscriptions + token sales

### 5. **Vendor Lock-in**
**Problem:** Heavily tied to WordPress ecosystem.
**Mitigations:**
- Document API structure
- Export data regularly
- Consider exit strategy before committing

---

## 🎯 When to Choose This Option

Choose **WooCommerce API** if:
- ✅ You already have a WordPress site
- ✅ You need advanced e-commerce features (coupons, bundles, cross-sells)
- ✅ You have WordPress developers on the team
- ✅ You need extensive payment gateway options
- ✅ You need invoice generation and accounting integration
- ✅ You plan to sell physical products in the future

Avoid if:
- ❌ You're only selling digital subscriptions and tokens
- ❌ Budget is constrained (extra $60+/month)
- ❌ Team is unfamiliar with WordPress/PHP
- ❌ You want simple, modern architecture
- ❌ Performance is critical (API latency is a concern)
- ❌ You don't want to maintain two separate systems

---

# 🏆 FINAL RECOMMENDATIONS

## Quick Comparison Table

| Criteria | Stripe Direct | Supabase + Stripe | WooCommerce API |
|----------|---------------|-------------------|-----------------|
| **Implementation Time** | 1-2 weeks | 3-4 weeks | 4-6 weeks |
| **Complexity** | ⭐ Low | ⭐⭐ Medium | ⭐⭐⭐ High |
| **Monthly Cost** | $0 hosting + fees | $25 + fees | $60-100 + fees |
| **Data Ownership** | ❌ Stripe only | ✅ Full ownership | ⚠️ Split (WC + App) |
| **Scalability** | ⭐⭐ Limited | ⭐⭐⭐ Excellent | ⭐⭐ Good |
| **Feature Flexibility** | ⭐⭐ Limited | ⭐⭐⭐ Unlimited | ⭐⭐⭐ High |
| **Analytics** | ⭐ Basic (Stripe) | ⭐⭐⭐ Custom queries | ⭐⭐ Via plugins |
| **Maintenance** | ⭐⭐⭐ Low | ⭐⭐ Medium | ⭐ High |
| **Security** | ⭐⭐⭐ Excellent | ⭐⭐⭐ Excellent | ⭐⭐ Requires effort |

---

## Recommended Path Forward

### **For DivinityAGI: Choose Option 2 (Supabase + Stripe)**

**Why:**
1. ✅ **Best long-term architecture** - You own your data, can build any feature
2. ✅ **Reasonable timeline** - 3-4 weeks is acceptable for quality foundation
3. ✅ **Cost-effective** - $25/month is negligible for a subscription business
4. ✅ **Future-proof** - Easy to add social features, admin dashboards, analytics
5. ✅ **Token tracking** - Database-backed, reliable, never lost
6. ✅ **Authentication built-in** - Supabase Auth handles email, OAuth, magic links
7. ✅ **Real-time ready** - Can add live features (notifications, chat) later
8. ✅ **Modern stack** - React + PostgreSQL + Stripe is industry standard

**When to Downgrade to Option 1:**
- If you absolutely must launch in 1 week
- If you're 100% sure you'll never need user profiles or analytics
- If this is a prototype/MVP and you'll rebuild later anyway

**When to Upgrade to Option 3:**
- If you plan to sell physical products later (books, merch)
- If you already have a WordPress site with traffic
- If you need WooCommerce-specific features (affiliate programs, advanced coupons)

---

## Implementation Roadmap (Option 2 - Recommended)

### Week 1: Foundation
- Day 1-2: Set up Supabase project, design database schema
- Day 3-4: Implement Supabase Auth in React app
- Day 5: Create Stripe products, configure webhooks

### Week 2: Core Features
- Day 1-2: Build subscription upgrade flow
- Day 3: Build token purchase flow
- Day 4: Implement Supabase Edge Function (webhook handler)
- Day 5: Test end-to-end flows

### Week 3: Polish & Sync
- Day 1-2: Implement daily token reset cron
- Day 3: Build admin analytics queries
- Day 4: Add error handling, retry logic
- Day 5: User acceptance testing

### Week 4: Launch Prep
- Day 1-2: Security audit, RLS policy review
- Day 3: Performance testing, optimization
- Day 4: Deploy to production, smoke tests
- Day 5: Soft launch, monitor webhooks

---

## Next Steps

1. **Decision:** Choose which option aligns with your timeline and budget
2. **Approval:** Get stakeholder buy-in on architecture
3. **Setup:** Create Supabase/Stripe accounts (or WordPress hosting)
4. **Development:** Follow implementation guide step-by-step
5. **Testing:** Thoroughly test all flows before going live
6. **Launch:** Start with soft launch, monitor closely
7. **Iterate:** Gather feedback, optimize based on real usage

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Prepared For:** DivinityAGI Payment Integration Decision
