-- ============================================================================
-- Add Missing Functions and Views
-- Run this after the main schema to fix errors
-- ============================================================================

-- Function: Get subscription counts by tier
CREATE OR REPLACE FUNCTION get_subscription_counts()
RETURNS TABLE (tier TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT s.tier, COUNT(*) as count
  FROM subscriptions s
  WHERE s.status = 'active'
  GROUP BY s.tier
  ORDER BY CASE s.tier 
    WHEN 'enlightened' THEN 4 
    WHEN 'devotee' THEN 3 
    WHEN 'subscriber' THEN 2 
    WHEN 'seeker' THEN 1 
  END DESC;
END;
$$ LANGUAGE plpgsql;

-- Function: Get revenue metrics
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
  WHERE status = 'succeeded' AND created_at > NOW() - (days || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Function: Get customer lifetime value
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

-- Function: Cleanup old events
CREATE OR REPLACE FUNCTION cleanup_old_events(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE deleted_count INTEGER;
BEGIN
  DELETE FROM admin_events 
  WHERE timestamp < NOW() - (days_to_keep || ' days')::INTERVAL;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Get event summary
CREATE OR REPLACE FUNCTION get_event_summary(days INTEGER DEFAULT 7)
RETURNS TABLE (event_type TEXT, severity TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT e.type, e.severity, COUNT(*) as count
  FROM admin_events e
  WHERE e.timestamp > NOW() - (days || ' days')::INTERVAL
  GROUP BY e.type, e.severity
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function: Spend tokens
CREATE OR REPLACE FUNCTION spend_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
BEGIN
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_current_balance
  FROM token_balances
  WHERE user_id = p_user_id;
  
  IF v_current_balance < p_amount THEN
    RETURN FALSE;
  END IF;
  
  UPDATE token_balances
  SET
    daily_tokens = GREATEST(0, daily_tokens - p_amount),
    bonus_tokens = GREATEST(0, bonus_tokens - GREATEST(0, p_amount - daily_tokens)),
    purchased_tokens = GREATEST(0, purchased_tokens - GREATEST(0, p_amount - daily_tokens - bonus_tokens)),
    total_tokens_spent = total_tokens_spent + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_new_balance
  FROM token_balances
  WHERE user_id = p_user_id;
  
  INSERT INTO token_transactions (user_id, type, amount, balance_after, description)
  VALUES (p_user_id, 'spent', -p_amount, v_new_balance, p_description);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function: Add purchased tokens
CREATE OR REPLACE FUNCTION add_purchased_tokens(
  p_user_id UUID,
  p_amount INTEGER,
  p_reference_id TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  UPDATE token_balances
  SET
    purchased_tokens = purchased_tokens + p_amount,
    total_tokens_earned = total_tokens_earned + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  SELECT (daily_tokens + purchased_tokens + bonus_tokens) INTO v_new_balance
  FROM token_balances
  WHERE user_id = p_user_id;
  
  INSERT INTO token_transactions (user_id, type, amount, balance_after, description, reference_id)
  VALUES (p_user_id, 'purchased', p_amount, v_new_balance, 'Token package purchased', p_reference_id);
END;
$$ LANGUAGE plpgsql;

-- View: Subscription Metrics
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

-- View: Critical Events
CREATE OR REPLACE VIEW critical_events AS 
SELECT * FROM admin_events 
WHERE severity = 'critical' 
ORDER BY timestamp DESC;

-- View: Verification Requests
CREATE OR REPLACE VIEW verification_requests AS 
SELECT * FROM admin_events 
WHERE type = 'verification_request' 
ORDER BY timestamp DESC;

-- View: Customer Lifetime Value
CREATE OR REPLACE VIEW customer_lifetime_value AS
SELECT 
  c.user_id,
  c.email,
  c.name,
  COUNT(DISTINCT s.id) as total_subscriptions,
  COALESCE(SUM(p.amount), 0) as total_revenue_cents,
  COALESCE(SUM(p.amount)::DECIMAL / 100, 0) as total_revenue,
  MAX(p.paid_at) as last_payment_date
FROM customers c
LEFT JOIN subscriptions s ON c.stripe_customer_id = s.stripe_customer_id
LEFT JOIN payments p ON c.stripe_customer_id = p.stripe_customer_id AND p.status = 'succeeded'
GROUP BY c.user_id, c.email, c.name;

-- Grant permissions
GRANT SELECT ON subscription_metrics_view TO anon, authenticated;
GRANT SELECT ON critical_events TO anon, authenticated;
GRANT SELECT ON verification_requests TO anon, authenticated;
GRANT SELECT ON customer_lifetime_value TO anon, authenticated;
