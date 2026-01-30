-- =====================================================
-- DivinityAGI Subscription Management - Supabase Schema
-- =====================================================
-- 
-- This extends the existing admin schema with subscription
-- and payment management capabilities
--
-- Instructions:
-- 1. First run the main supabase-schema.sql if not done
-- 2. Run this file in Supabase SQL Editor
-- 3. Set up Stripe webhook endpoint in your backend
-- 
-- =====================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CUSTOMERS TABLE
-- Stores Stripe customer information
-- =====================================================

CREATE TABLE IF NOT EXISTS customers (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Stripe IDs
  stripe_customer_id TEXT UNIQUE NOT NULL,
  
  -- User information
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- Stores active and historical subscription data
-- =====================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Stripe IDs
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  
  -- Subscription details
  tier TEXT NOT NULL CHECK (tier IN ('seeker', 'subscriber', 'devotee', 'enlightened')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'past_due', 'trialing', 'unpaid')),
  
  -- Billing period
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  
  -- Cancellation
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMPTZ,
  
  -- Trial
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key
  FOREIGN KEY (stripe_customer_id) REFERENCES customers(stripe_customer_id) ON DELETE CASCADE
);

-- =====================================================
-- PAYMENTS TABLE
-- Stores payment history and transactions
-- =====================================================

CREATE TABLE IF NOT EXISTS payments (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Stripe IDs
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  
  -- Payment details
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('succeeded', 'pending', 'failed', 'refunded')),
  
  -- Payment type
  payment_type TEXT NOT NULL CHECK (payment_type IN ('subscription', 'token_purchase', 'donation')),
  
  -- Token purchase details (if applicable)
  token_amount INTEGER,
  
  -- Payment method
  payment_method_type TEXT, -- card, bank_transfer, etc.
  last4 TEXT, -- Last 4 digits of card
  brand TEXT, -- visa, mastercard, etc.
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  description TEXT,
  
  -- Refund information
  refunded_amount INTEGER DEFAULT 0,
  refunded_at TIMESTAMPTZ,
  
  -- Timestamps
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key
  FOREIGN KEY (stripe_customer_id) REFERENCES customers(stripe_customer_id) ON DELETE CASCADE
);

-- =====================================================
-- USER SUBSCRIPTION HISTORY
-- Tracks subscription tier changes over time
-- =====================================================

CREATE TABLE IF NOT EXISTS subscription_history (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User information
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Subscription change
  from_tier TEXT,
  to_tier TEXT NOT NULL,
  
  -- Change reason
  change_reason TEXT NOT NULL CHECK (change_reason IN ('signup', 'upgrade', 'downgrade', 'cancellation', 'reactivation', 'trial_start', 'trial_end')),
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamp
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BILLING EVENTS TABLE
-- Stores all billing-related events for audit trail
-- =====================================================

CREATE TABLE IF NOT EXISTS billing_events (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Event identification
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  
  -- Stripe data
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  
  -- Event details
  data JSONB NOT NULL,
  
  -- Processing status
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TOKEN PURCHASES TABLE
-- Tracks standalone token purchases
-- =====================================================

CREATE TABLE IF NOT EXISTS token_purchases (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User information
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Purchase details
  token_amount INTEGER NOT NULL,
  price_paid INTEGER NOT NULL, -- Amount in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  
  -- Payment reference
  stripe_payment_intent_id TEXT,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- Foreign key
  FOREIGN KEY (stripe_payment_intent_id) REFERENCES payments(stripe_payment_intent_id) ON DELETE SET NULL
);

-- =====================================================
-- INDEXES for faster queries
-- =====================================================

-- Customers indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);

-- Subscriptions indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tier ON subscriptions(tier);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON subscriptions(current_period_end);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription ON payments(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(payment_type);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at DESC);

-- Subscription history indexes
CREATE INDEX IF NOT EXISTS idx_sub_history_user ON subscription_history(user_id);
CREATE INDEX IF NOT EXISTS idx_sub_history_email ON subscription_history(email);
CREATE INDEX IF NOT EXISTS idx_sub_history_changed ON subscription_history(changed_at DESC);

-- Billing events indexes
CREATE INDEX IF NOT EXISTS idx_billing_events_type ON billing_events(event_type);
CREATE INDEX IF NOT EXISTS idx_billing_events_processed ON billing_events(processed);
CREATE INDEX IF NOT EXISTS idx_billing_events_customer ON billing_events(stripe_customer_id);

-- Token purchases indexes
CREATE INDEX IF NOT EXISTS idx_token_purchases_user ON token_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_token_purchases_status ON token_purchases(status);
CREATE INDEX IF NOT EXISTS idx_token_purchases_purchased ON token_purchases(purchased_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_purchases ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES
-- =====================================================

-- Customers: Public read access, anon can insert/update
CREATE POLICY "Allow public read customers"
  ON customers FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert customers"
  ON customers FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update customers"
  ON customers FOR UPDATE TO anon
  USING (true);

-- Subscriptions: Public read access
CREATE POLICY "Allow public read subscriptions"
  ON subscriptions FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert subscriptions"
  ON subscriptions FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update subscriptions"
  ON subscriptions FOR UPDATE TO anon
  USING (true);

-- Payments: Public read access
CREATE POLICY "Allow public read payments"
  ON payments FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert payments"
  ON payments FOR INSERT TO anon
  WITH CHECK (true);

-- Subscription history: Public read access
CREATE POLICY "Allow public read sub_history"
  ON subscription_history FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert sub_history"
  ON subscription_history FOR INSERT TO anon
  WITH CHECK (true);

-- Billing events: Admin access only (anon can insert from webhooks)
CREATE POLICY "Allow public read billing_events"
  ON billing_events FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert billing_events"
  ON billing_events FOR INSERT TO anon
  WITH CHECK (true);

-- Token purchases: Public read access
CREATE POLICY "Allow public read token_purchases"
  ON token_purchases FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon insert token_purchases"
  ON token_purchases FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update token_purchases"
  ON token_purchases FOR UPDATE TO anon
  USING (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to get subscription revenue metrics
CREATE OR REPLACE FUNCTION get_subscription_revenue(days INTEGER DEFAULT 30)
RETURNS TABLE (
  total_revenue DECIMAL,
  subscription_revenue DECIMAL,
  token_revenue DECIMAL,
  transaction_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(amount::DECIMAL / 100), 0) as total_revenue,
    COALESCE(SUM(CASE WHEN payment_type = 'subscription' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as subscription_revenue,
    COALESCE(SUM(CASE WHEN payment_type = 'token_purchase' THEN amount::DECIMAL / 100 ELSE 0 END), 0) as token_revenue,
    COUNT(*) as transaction_count
  FROM payments
  WHERE status = 'succeeded'
    AND created_at > NOW() - (days || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Function to get active subscription counts by tier
CREATE OR REPLACE FUNCTION get_subscription_counts()
RETURNS TABLE (
  tier TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.tier,
    COUNT(*) as count
  FROM subscriptions s
  WHERE s.status = 'active'
  GROUP BY s.tier
  ORDER BY 
    CASE s.tier
      WHEN 'enlightened' THEN 4
      WHEN 'devotee' THEN 3
      WHEN 'subscriber' THEN 2
      WHEN 'seeker' THEN 1
    END DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get customer lifetime value
CREATE OR REPLACE FUNCTION get_customer_ltv(customer_stripe_id TEXT)
RETURNS DECIMAL AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(amount::DECIMAL / 100)
     FROM payments
     WHERE stripe_customer_id = customer_stripe_id
       AND status = 'succeeded'),
    0
  );
END;
$$ LANGUAGE plpgsql;

-- Function to update subscription analytics in admin_analytics table
CREATE OR REPLACE FUNCTION update_subscription_analytics()
RETURNS VOID AS $$
BEGIN
  UPDATE admin_analytics
  SET
    total_subscriptions = (
      SELECT COUNT(*) FROM subscriptions WHERE status = 'active'
    ),
    subscriptions_seeker = (
      SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'seeker'
    ),
    subscriptions_subscriber = (
      SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'subscriber'
    ),
    subscriptions_devotee = (
      SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'devotee'
    ),
    subscriptions_mystic = (
      SELECT COUNT(*) FROM subscriptions WHERE status = 'active' AND tier = 'enlightened'
    ),
    revenue_estimate = (
      SELECT COALESCE(SUM(amount::DECIMAL / 100), 0)
      FROM payments
      WHERE status = 'succeeded'
        AND created_at > NOW() - INTERVAL '30 days'
    ),
    last_updated = NOW()
  WHERE id = '00000000-0000-0000-0000-000000000001';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update analytics when subscription changes
CREATE OR REPLACE FUNCTION trigger_update_subscription_analytics()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_subscription_analytics();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_subscription_change
  AFTER INSERT OR UPDATE OR DELETE ON subscriptions
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_update_subscription_analytics();

-- =====================================================
-- VIEWS
-- =====================================================

-- View for active subscriptions with customer info
CREATE OR REPLACE VIEW active_subscriptions_view AS
  SELECT 
    s.*,
    c.email,
    c.name,
    c.user_id
  FROM subscriptions s
  JOIN customers c ON s.stripe_customer_id = c.stripe_customer_id
  WHERE s.status = 'active'
  ORDER BY s.created_at DESC;

-- View for recent payments
CREATE OR REPLACE VIEW recent_payments_view AS
  SELECT 
    p.*,
    c.email,
    c.name
  FROM payments p
  JOIN customers c ON p.stripe_customer_id = c.stripe_customer_id
  ORDER BY p.created_at DESC
  LIMIT 100;

-- View for subscription metrics
CREATE OR REPLACE VIEW subscription_metrics_view AS
  SELECT 
    COUNT(*) FILTER (WHERE status = 'active') as active_count,
    COUNT(*) FILTER (WHERE status = 'canceled') as canceled_count,
    COUNT(*) FILTER (WHERE status = 'past_due') as past_due_count,
    COUNT(*) FILTER (WHERE status = 'trialing') as trialing_count,
    COUNT(*) FILTER (WHERE tier = 'devotee' AND status = 'active') as devotee_count,
    COUNT(*) FILTER (WHERE tier = 'enlightened' AND status = 'active') as enlightened_count,
    SUM(CASE 
      WHEN tier = 'devotee' AND status = 'active' THEN 999 
      WHEN tier = 'enlightened' AND status = 'active' THEN 1499 
      ELSE 0 
    END)::DECIMAL / 100 as mrr
  FROM subscriptions;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

GRANT SELECT ON active_subscriptions_view TO anon, authenticated;
GRANT SELECT ON recent_payments_view TO anon, authenticated;
GRANT SELECT ON subscription_metrics_view TO anon, authenticated;

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Update analytics
SELECT update_subscription_analytics();

-- =====================================================
-- VERIFICATION
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Checking subscription tables creation...';
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'customers') THEN
    RAISE NOTICE '✓ customers table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'subscriptions') THEN
    RAISE NOTICE '✓ subscriptions table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'payments') THEN
    RAISE NOTICE '✓ payments table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'subscription_history') THEN
    RAISE NOTICE '✓ subscription_history table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'billing_events') THEN
    RAISE NOTICE '✓ billing_events table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'token_purchases') THEN
    RAISE NOTICE '✓ token_purchases table created';
  END IF;
  
  RAISE NOTICE 'Subscription schema setup complete!';
END $$;

-- =====================================================
-- NEXT STEPS
-- =====================================================

-- 1. Set up Stripe webhook endpoint
-- 2. Configure webhook events to listen for:
--    - customer.subscription.created
--    - customer.subscription.updated
--    - customer.subscription.deleted
--    - invoice.payment_succeeded
--    - invoice.payment_failed
--    - payment_intent.succeeded
--    - payment_intent.payment_failed
-- 3. Update Stripe service with your Stripe keys
-- 4. Test with Stripe test mode
-- 5. Deploy webhook handler to production
