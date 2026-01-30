-- =====================================================
-- DivinityAGI Admin Dashboard - Supabase Schema
-- =====================================================
-- 
-- Instructions:
-- 1. Create a new Supabase project at https://supabase.com
-- 2. Go to SQL Editor in your Supabase dashboard
-- 3. Copy and paste this entire file
-- 4. Click "Run" to create all tables and policies
-- 5. Get your credentials from Project Settings > API
-- 
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ADMIN EVENTS TABLE
-- Stores all events from the DivinityAGI app
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_events (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Event identification
  event_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  
  -- Timestamps
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- User information
  user_id TEXT,
  user_email TEXT,
  user_name TEXT,
  
  -- Event details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  
  -- Notification tracking
  notification_sent BOOLEAN DEFAULT false
);

-- =====================================================
-- INDEXES for faster queries
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_admin_events_type 
  ON admin_events(type);

CREATE INDEX IF NOT EXISTS idx_admin_events_severity 
  ON admin_events(severity);

CREATE INDEX IF NOT EXISTS idx_admin_events_timestamp 
  ON admin_events(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_admin_events_created_at 
  ON admin_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_events_user_email 
  ON admin_events(user_email) 
  WHERE user_email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_admin_events_metadata 
  ON admin_events USING GIN (metadata);

-- =====================================================
-- ADMIN ANALYTICS TABLE (Optional - for caching)
-- Stores aggregated analytics to reduce computation
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_analytics (
  -- Fixed ID - single row table
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  
  -- User metrics
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  new_signups_24h INTEGER DEFAULT 0,
  new_signups_7d INTEGER DEFAULT 0,
  
  -- Subscription metrics
  total_subscriptions INTEGER DEFAULT 0,
  subscriptions_seeker INTEGER DEFAULT 0,
  subscriptions_subscriber INTEGER DEFAULT 0,
  subscriptions_devotee INTEGER DEFAULT 0,
  subscriptions_mystic INTEGER DEFAULT 0,
  
  -- Financial metrics
  revenue_estimate DECIMAL DEFAULT 0,
  
  -- System health
  error_rate DECIMAL DEFAULT 0,
  
  -- Verified leader metrics
  pending_applications INTEGER DEFAULT 0,
  ministry_applications INTEGER DEFAULT 0,
  individual_applications INTEGER DEFAULT 0,
  
  -- Update tracking
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial analytics row
INSERT INTO admin_analytics (id) 
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on tables
ALTER TABLE admin_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_analytics ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES for admin_events
-- =====================================================

-- Allow public INSERT (from DivinityAGI app)
CREATE POLICY "Allow public insert admin_events" 
  ON admin_events
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow public SELECT (for admin dashboard)
CREATE POLICY "Allow public select admin_events" 
  ON admin_events
  FOR SELECT 
  TO anon
  USING (true);

-- Allow authenticated users full access (future multi-admin support)
CREATE POLICY "Allow authenticated all admin_events" 
  ON admin_events
  FOR ALL 
  TO authenticated
  USING (true);

-- =====================================================
-- POLICIES for admin_analytics
-- =====================================================

-- Allow public read of analytics
CREATE POLICY "Allow public select admin_analytics" 
  ON admin_analytics
  FOR SELECT 
  TO anon
  USING (true);

-- Allow public update of analytics (from app)
CREATE POLICY "Allow public update admin_analytics" 
  ON admin_analytics
  FOR UPDATE 
  TO anon
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- FUNCTIONS for automatic analytics updates
-- =====================================================

-- Function to calculate analytics
CREATE OR REPLACE FUNCTION calculate_admin_analytics()
RETURNS VOID AS $$
BEGIN
  UPDATE admin_analytics
  SET
    -- Count verification requests
    pending_applications = (
      SELECT COUNT(*) 
      FROM admin_events 
      WHERE type = 'verification_request'
    ),
    ministry_applications = (
      SELECT COUNT(*) 
      FROM admin_events 
      WHERE type = 'verification_request' 
        AND metadata->>'applicationType' = 'ministry'
    ),
    individual_applications = (
      SELECT COUNT(*) 
      FROM admin_events 
      WHERE type = 'verification_request' 
        AND metadata->>'applicationType' = 'individual'
    ),
    -- Calculate error rate
    error_rate = (
      SELECT ROUND(
        (COUNT(*) FILTER (WHERE severity IN ('error', 'critical'))::DECIMAL / 
         NULLIF(COUNT(*), 0) * 100)::NUMERIC, 
        2
      )
      FROM (
        SELECT severity 
        FROM admin_events 
        ORDER BY timestamp DESC 
        LIMIT 1000
      ) recent_events
    ),
    last_updated = NOW()
  WHERE id = '00000000-0000-0000-0000-000000000001';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS for automatic updates
-- =====================================================

-- Trigger to update analytics when new event is inserted
CREATE OR REPLACE FUNCTION trigger_calculate_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Only recalculate on specific event types
  IF NEW.type IN ('verification_request', 'error_reported', 'crash_detected') THEN
    PERFORM calculate_admin_analytics();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_admin_event_insert
  AFTER INSERT ON admin_events
  FOR EACH ROW
  EXECUTE FUNCTION trigger_calculate_analytics();

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to cleanup old events
CREATE OR REPLACE FUNCTION cleanup_old_events(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM admin_events
  WHERE timestamp < NOW() - (days_to_keep || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get event summary
CREATE OR REPLACE FUNCTION get_event_summary(days INTEGER DEFAULT 7)
RETURNS TABLE (
  event_type TEXT,
  severity TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.type,
    e.severity,
    COUNT(*) as count
  FROM admin_events e
  WHERE e.timestamp > NOW() - (days || ' days')::INTERVAL
  GROUP BY e.type, e.severity
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEWS for common queries
-- =====================================================

-- View for recent events
CREATE OR REPLACE VIEW recent_events AS
  SELECT * 
  FROM admin_events
  ORDER BY timestamp DESC
  LIMIT 100;

-- View for critical events only
CREATE OR REPLACE VIEW critical_events AS
  SELECT *
  FROM admin_events
  WHERE severity = 'critical'
  ORDER BY timestamp DESC;

-- View for verification requests
CREATE OR REPLACE VIEW verification_requests AS
  SELECT *
  FROM admin_events
  WHERE type = 'verification_request'
  ORDER BY timestamp DESC;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant usage on views to anon and authenticated
GRANT SELECT ON recent_events TO anon, authenticated;
GRANT SELECT ON critical_events TO anon, authenticated;
GRANT SELECT ON verification_requests TO anon, authenticated;

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- Calculate initial analytics
SELECT calculate_admin_analytics();

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Verify tables were created
DO $$
BEGIN
  RAISE NOTICE 'Checking table creation...';
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admin_events') THEN
    RAISE NOTICE '✓ admin_events table created';
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admin_analytics') THEN
    RAISE NOTICE '✓ admin_analytics table created';
  END IF;
  
  RAISE NOTICE 'Schema setup complete!';
END $$;

-- =====================================================
-- NEXT STEPS
-- =====================================================

-- After running this schema:
-- 
-- 1. Get your Supabase credentials:
--    - Go to Project Settings > API
--    - Copy "Project URL" and "anon public" key
--
-- 2. Update /components/services/supabase-admin-service.ts:
--    - Replace SUPABASE_URL with your Project URL
--    - Replace SUPABASE_ANON_KEY with your anon public key
--
-- 3. Test the connection:
--    - Deploy your admin dashboard
--    - Create a test event in DivinityAGI app
--    - Verify it appears in admin dashboard
--
-- 4. Optional: Set up automatic cleanup
--    - Run this SQL to schedule weekly cleanup:
--    SELECT cron.schedule(
--      'cleanup-old-events',
--      '0 0 * * 0',
--      $$ SELECT cleanup_old_events(90); $$
--    );
--
-- =====================================================
