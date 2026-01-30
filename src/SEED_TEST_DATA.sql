-- ============================================================================
-- DivinityAGI Test Data Seeding Script
-- This script adds placeholder data to all tables for testing
-- Run this AFTER running CLEAN_SUPABASE_SCHEMA.sql and ADD_MISSING_FUNCTIONS.sql
-- ============================================================================

-- IMPORTANT: Temporarily drop foreign key constraint to allow test data
-- This is safe for testing environments only
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- ============================================================================
-- CLEANUP: Delete existing test data (if re-running)
-- ============================================================================

-- Delete in reverse order of dependencies to avoid foreign key issues
DELETE FROM billing_events WHERE stripe_customer_id IN ('cus_test_001', 'cus_test_002', 'cus_test_003', 'cus_test_004', 'cus_test_005');
DELETE FROM purchases WHERE stripe_customer_id IN ('cus_test_001', 'cus_test_002', 'cus_test_003', 'cus_test_004', 'cus_test_005');
DELETE FROM support_tickets WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM system_events WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM admin_events WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM admin_users WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM leader_contributions WHERE leader_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM verified_leader_applications WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM user_activity_log WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM daily_reflections WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM quiet_space_sessions WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM chat_sessions WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM token_transactions WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM token_balances WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM user_subscriptions WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM token_purchases WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM subscription_history WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM payments WHERE stripe_customer_id IN ('cus_test_001', 'cus_test_002', 'cus_test_003', 'cus_test_004', 'cus_test_005');
DELETE FROM subscriptions WHERE stripe_customer_id IN ('cus_test_001', 'cus_test_002', 'cus_test_003', 'cus_test_004', 'cus_test_005');
DELETE FROM customers WHERE stripe_customer_id IN ('cus_test_001', 'cus_test_002', 'cus_test_003', 'cus_test_004', 'cus_test_005');
DELETE FROM user_preferences WHERE user_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');
DELETE FROM users WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');

-- Note: You'll need to replace these UUIDs with actual auth.users IDs from your Supabase Auth
-- For now, we'll create placeholder users. In production, these would come from Supabase Auth.

-- ============================================================================
-- SEED USERS (Test Data)
-- ============================================================================
-- Note: In production, users come from Supabase Auth. These are test entries.

INSERT INTO users (id, email, full_name, username, faith_tradition, preferred_language, status, is_verified_leader, verified_leader_type, onboarding_completed, last_login_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com', 'John Doe', 'johndoe', 'Christianity', 'en', 'active', FALSE, NULL, TRUE, NOW() - INTERVAL '2 hours'),
  ('22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', 'Jane Smith', 'janesmith', 'Buddhism', 'en', 'active', FALSE, NULL, TRUE, NOW() - INTERVAL '1 day'),
  ('33333333-3333-3333-3333-333333333333', 'leader@example.com', 'Rev. Michael Leader', 'revmike', 'Christianity', 'en', 'active', TRUE, 'ministry', TRUE, NOW() - INTERVAL '3 hours'),
  ('44444444-4444-4444-4444-444444444444', 'seeker@example.com', 'Sarah Seeker', 'sarahseeker', 'Hinduism', 'en', 'active', FALSE, NULL, TRUE, NOW() - INTERVAL '5 days'),
  ('55555555-5555-5555-5555-555555555555', 'premium@example.com', 'David Premium', 'davidprem', 'Islam', 'en', 'active', FALSE, NULL, TRUE, NOW() - INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- USER PREFERENCES
-- ============================================================================

INSERT INTO user_preferences (user_id, theme, ambient_sound_enabled, ambient_sound_type, ambient_sound_volume, notifications_enabled, email_notifications, daily_reflection_time)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'light', TRUE, 'ocean-waves', 60, TRUE, TRUE, '08:00:00'),
  ('22222222-2222-2222-2222-222222222222', 'dark', TRUE, 'tibetan-bowls', 40, TRUE, FALSE, '06:00:00'),
  ('33333333-3333-3333-3333-333333333333', 'light', FALSE, NULL, 50, TRUE, TRUE, '07:00:00'),
  ('44444444-4444-4444-4444-444444444444', 'light', TRUE, 'meditation-bells', 70, TRUE, TRUE, '09:00:00'),
  ('55555555-5555-5555-5555-555555555555', 'dark', TRUE, 'forest-sounds', 55, FALSE, FALSE, '20:00:00')
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- STRIPE CUSTOMERS
-- ============================================================================

INSERT INTO customers (id, stripe_customer_id, user_id, email, name, metadata)
VALUES 
  (uuid_generate_v4(), 'cus_test_001', '11111111-1111-1111-1111-111111111111', 'john.doe@example.com', 'John Doe', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'cus_test_002', '22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', 'Jane Smith', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'cus_test_003', '33333333-3333-3333-3333-333333333333', 'leader@example.com', 'Rev. Michael Leader', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'cus_test_004', '44444444-4444-4444-4444-444444444444', 'seeker@example.com', 'Sarah Seeker', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'cus_test_005', '55555555-5555-5555-5555-555555555555', 'premium@example.com', 'David Premium', '{"test": true}'::jsonb);

-- ============================================================================
-- SUBSCRIPTIONS (Stripe subscriptions table)
-- ============================================================================

INSERT INTO subscriptions (id, stripe_subscription_id, stripe_customer_id, stripe_price_id, tier, status, current_period_start, current_period_end, cancel_at_period_end, metadata)
VALUES 
  (uuid_generate_v4(), 'sub_test_001', 'cus_test_002', 'price_subscriber_monthly', 'subscriber', 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', FALSE, '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'sub_test_002', 'cus_test_003', 'price_devotee_monthly', 'devotee', 'active', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', FALSE, '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'sub_test_003', 'cus_test_005', 'price_enlightened_monthly', 'enlightened', 'active', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', FALSE, '{"test": true}'::jsonb);

-- ============================================================================
-- PAYMENTS
-- ============================================================================

INSERT INTO payments (id, stripe_payment_intent_id, stripe_customer_id, stripe_subscription_id, amount, currency, status, payment_type, payment_method_type, description, metadata)
VALUES 
  (uuid_generate_v4(), 'pi_test_001', 'cus_test_002', 'sub_test_001', 999, 'usd', 'succeeded', 'subscription', 'card', 'Subscriber Monthly Subscription', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'pi_test_002', 'cus_test_003', 'sub_test_002', 1999, 'usd', 'succeeded', 'subscription', 'card', 'Devotee Monthly Subscription', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'pi_test_003', 'cus_test_005', 'sub_test_003', 3499, 'usd', 'succeeded', 'subscription', 'card', 'Enlightened Monthly Subscription', '{"test": true}'::jsonb),
  (uuid_generate_v4(), 'pi_test_004', 'cus_test_001', NULL, 499, 'usd', 'succeeded', 'token_purchase', 'card', 'Starter Token Package', '{"test": true, "type": "token_purchase"}'::jsonb),
  (uuid_generate_v4(), 'pi_test_005', 'cus_test_004', NULL, 999, 'usd', 'succeeded', 'token_purchase', 'card', 'Popular Token Package', '{"test": true, "type": "token_purchase"}'::jsonb);

-- ============================================================================
-- SUBSCRIPTION HISTORY
-- ============================================================================

INSERT INTO subscription_history (id, user_id, email, from_tier, to_tier, change_reason, metadata)
VALUES 
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'leader@example.com', 'subscriber', 'devotee', 'upgrade', '{"upgraded_at": "2024-12-10"}'::jsonb),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'premium@example.com', 'devotee', 'enlightened', 'upgrade', '{"upgraded_at": "2024-12-17"}'::jsonb);

-- ============================================================================
-- TOKEN PURCHASES
-- ============================================================================

INSERT INTO token_purchases (id, user_id, email, stripe_customer_id, token_amount, price_paid, currency, stripe_payment_intent_id, status, completed_at)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'john.doe@example.com', 'cus_test_001', 120, 499, 'usd', 'pi_test_004', 'completed', NOW() - INTERVAL '2 days'),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'seeker@example.com', 'cus_test_004', 325, 999, 'usd', 'pi_test_005', 'completed', NOW() - INTERVAL '1 day');

-- ============================================================================
-- USER SUBSCRIPTIONS (Internal Subscription Tier Tracking)
-- ============================================================================

INSERT INTO user_subscriptions (id, user_id, tier_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, status, current_period_start, current_period_end, cancel_at_period_end)
VALUES 
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'subscriber', 'cus_test_002', 'sub_test_001', 'price_subscriber_monthly', 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', FALSE),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'devotee', 'cus_test_003', 'sub_test_002', 'price_devotee_monthly', 'active', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', FALSE),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'enlightened', 'cus_test_005', 'sub_test_003', 'price_enlightened_monthly', 'active', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', FALSE);

-- ============================================================================
-- TOKEN BALANCES
-- ============================================================================

INSERT INTO token_balances (user_id, daily_tokens, purchased_tokens, bonus_tokens, total_tokens_earned, total_tokens_spent)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 25, 95, 0, 120, 25),
  ('22222222-2222-2222-2222-222222222222', 100, 100, 0, 350, 150),
  ('33333333-3333-3333-3333-333333333333', 200, 250, 0, 500, 50),
  ('44444444-4444-4444-4444-444444444444', 50, 250, 0, 325, 25),
  ('55555555-5555-5555-5555-555555555555', 300, 500, 0, 1000, 200)
ON CONFLICT (user_id) DO UPDATE SET
  daily_tokens = EXCLUDED.daily_tokens,
  purchased_tokens = EXCLUDED.purchased_tokens,
  bonus_tokens = EXCLUDED.bonus_tokens,
  total_tokens_earned = EXCLUDED.total_tokens_earned,
  total_tokens_spent = EXCLUDED.total_tokens_spent;

-- ============================================================================
-- TOKEN TRANSACTIONS
-- ============================================================================

INSERT INTO token_transactions (id, user_id, type, amount, balance_after, description, metadata)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'purchased', 120, 120, 'Purchased starter token package', '{"package": "starter"}'::jsonb),
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'spent', -25, 95, 'Used tokens for guided conversation', '{"session_type": "chat"}'::jsonb),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'earned', 350, 350, 'Monthly subscriber token allocation', '{"tier": "subscriber"}'::jsonb),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'spent', -150, 200, 'Various guided conversations', '{"session_count": 10}'::jsonb),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'earned', 500, 500, 'Monthly devotee token allocation', '{"tier": "devotee"}'::jsonb),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'spent', -50, 450, 'Meditation and quiet time', '{"session_type": "quiet_space"}'::jsonb),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'purchased', 325, 325, 'Purchased popular token package', '{"package": "popular"}'::jsonb),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'spent', -25, 300, 'Chat with spiritual guide', '{"guide_id": "guide_hindu_001"}'::jsonb),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'earned', 1000, 1000, 'Monthly enlightened token allocation', '{"tier": "enlightened"}'::jsonb),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'spent', -200, 800, 'Multiple extended conversations', '{"session_count": 15}'::jsonb);

-- ============================================================================
-- CHAT SESSIONS
-- ============================================================================

INSERT INTO chat_sessions (id, user_id, avatar_id, avatar_name, faith_tradition, title, tokens_used, message_count, started_at, ended_at, duration_seconds)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'guide_christian_001', 'Father Benedict', 'Christianity', 'Seeking guidance on faith journey', 10, 12, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 45 minutes', 900),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'guide_buddhist_001', 'Venerable Thich', 'Buddhism', 'Meditation and mindfulness practice', 20, 25, NOW() - INTERVAL '1 day', NOW() - INTERVAL '23 hours', 3600),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'guide_christian_002', 'Pastor Sarah', 'Christianity', 'Prayer and community service', 15, 18, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours 30 minutes', 1800),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'guide_hindu_001', 'Swami Krishna', 'Hinduism', 'Understanding ancient wisdom', 5, 8, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days 23 hours', 600),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'guide_muslim_001', 'Imam Hassan', 'Islam', 'Deepening spiritual connection', 25, 30, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', 3600);

-- ============================================================================
-- QUIET SPACE SESSIONS
-- ============================================================================

INSERT INTO quiet_space_sessions (id, user_id, space_type, ambient_sound, duration_seconds, completed, started_at, ended_at)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'meditation', 'ocean-waves', 900, TRUE, NOW() - INTERVAL '15 minutes', NOW()),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'breathing', 'tibetan-bowls', 600, TRUE, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '10 minutes'),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'prayer', NULL, 1200, TRUE, NOW() - INTERVAL '5 hours', NOW() - INTERVAL '5 hours' + INTERVAL '20 minutes'),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'meditation', 'meditation-bells', 1800, TRUE, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '30 minutes'),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'contemplation', 'forest-sounds', 2700, TRUE, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours' + INTERVAL '45 minutes');

-- ============================================================================
-- DAILY REFLECTIONS
-- ============================================================================

INSERT INTO daily_reflections (id, user_id, reflection_date, faith_tradition, content, title, viewed)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', CURRENT_DATE, 'Christianity', 'Today I felt grateful for my family and the beautiful weather. Working on being more patient.', 'Morning Gratitude', TRUE),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', CURRENT_DATE - INTERVAL '1 day', 'Buddhism', 'Meditation practice is getting deeper. Feeling more centered each day.', 'Meditation Progress', TRUE),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', CURRENT_DATE - INTERVAL '2 days', 'Christianity', 'Spent time in prayer today. Feeling blessed and ready to serve others.', 'Prayer and Service', TRUE),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', CURRENT_DATE - INTERVAL '3 days', 'Hinduism', 'Studying ancient texts brought new insights today. The wisdom is timeless.', 'Ancient Wisdom', FALSE),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', CURRENT_DATE, 'Islam', 'Today''s prayers were especially meaningful. Felt a deep connection.', 'Deep Connection', TRUE);

-- ============================================================================
-- USER ACTIVITY LOG
-- ============================================================================

INSERT INTO user_activity_log (id, user_id, activity_type, description, metadata)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'login', 'User logged in', '{"ip": "192.168.1.1", "device": "Chrome Desktop"}'::jsonb),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', 'chat_started', 'Started chat with guide', '{"guide_id": "guide_buddhist_001"}'::jsonb),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'subscription_change', 'Upgraded to devotee tier', '{"old_tier": "subscriber", "new_tier": "devotee"}'::jsonb),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'token_purchase', 'Purchased token package', '{"package": "popular", "amount": 9.99}'::jsonb),
  (uuid_generate_v4(), '55555555-5555-5555-5555-555555555555', 'quiet_space', 'Completed quiet space session', '{"duration": 45, "type": "contemplation"}'::jsonb);

-- ============================================================================
-- VERIFIED LEADER APPLICATIONS
-- ============================================================================

INSERT INTO verified_leader_applications (id, user_id, application_type, status, full_name, email, faith_tradition, credentials, bio, ministry_name, ministry_website, verification_documents)
VALUES 
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'ministry', 'approved', 'Rev. Michael Leader', 'leader@example.com', 'Christianity', 'Master of Divinity, 15 years pastoral experience', 'I would like to contribute spiritual guidance to the DivinityAGI community.', 'First Community Church', 'https://www.firstcommunitychurch.example', '["https://example.com/credentials.pdf"]'::jsonb),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'individual', 'pending', 'Sarah Johnson', 'newleader@example.com', 'Universal', 'Certified Spiritual Director, 10 years experience', 'Passionate about helping others on their spiritual journey.', NULL, NULL, '["https://example.com/cert.pdf"]'::jsonb);

-- ============================================================================
-- LEADER CONTRIBUTIONS
-- ============================================================================

INSERT INTO leader_contributions (id, leader_id, contribution_type, title, content, faith_tradition, status, view_count, like_count, published_at, metadata)
VALUES 
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'article', 'Finding Peace in Turbulent Times', 'In times of uncertainty, we must turn inward and upward...', 'Christianity', 'published', 145, 23, NOW() - INTERVAL '10 days', '{"featured": true, "tags": ["peace", "faith", "guidance"]}'::jsonb),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'meditation', 'Morning Gratitude Practice', 'Begin each day with these simple gratitude exercises...', 'Universal', 'published', 89, 15, NOW() - INTERVAL '5 days', '{"duration": 10, "tags": ["gratitude", "morning", "practice"]}'::jsonb);

-- ============================================================================
-- ADMIN USERS
-- ============================================================================

INSERT INTO admin_users (id, user_id, role, permissions, is_active)
VALUES 
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', 'moderator', '["view_analytics", "manage_content"]'::jsonb, TRUE);

-- ============================================================================
-- ADMIN EVENTS
-- ============================================================================

INSERT INTO admin_events (id, event_id, type, severity, timestamp, user_id, user_email, user_name, title, description, metadata)
VALUES 
  (uuid_generate_v4(), 'evt_admin_001', 'user_action', 'info', NOW() - INTERVAL '1 day', '33333333-3333-3333-3333-333333333333', 'leader@example.com', 'Rev. Michael Leader', 'Leader Application Approved', 'Approved verified leader application', '{"applicant": "newleader@example.com"}'::jsonb),
  (uuid_generate_v4(), 'evt_admin_002', 'content_moderation', 'info', NOW() - INTERVAL '2 hours', '33333333-3333-3333-3333-333333333333', 'leader@example.com', 'Rev. Michael Leader', 'Content Reviewed', 'Flagged content reviewed and approved', '{"content_id": "12345", "action": "approved"}'::jsonb);

-- ============================================================================
-- SYSTEM EVENTS
-- ============================================================================

INSERT INTO system_events (id, event_type, severity, title, description, user_id, user_email, metadata)
VALUES 
  (uuid_generate_v4(), 'payment', 'info', 'Payment Successful', 'User subscription payment processed successfully', '22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', '{"amount": 9.99, "currency": "usd"}'::jsonb),
  (uuid_generate_v4(), 'subscription', 'info', 'Subscription Created', 'New devotee subscription activated', '33333333-3333-3333-3333-333333333333', 'leader@example.com', '{"tier": "devotee"}'::jsonb),
  (uuid_generate_v4(), 'error', 'error', 'Payment Failed', 'Payment declined due to insufficient funds', '11111111-1111-1111-1111-111111111111', 'john.doe@example.com', '{"reason": "insufficient_funds"}'::jsonb);

-- ============================================================================
-- SUPPORT TICKETS
-- ============================================================================

INSERT INTO support_tickets (id, user_id, ticket_number, subject, description, status, priority, category, assigned_to)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'TKT-001', 'Cannot access premium features', 'I subscribed but still see locked content', 'open', 'high', 'technical', NULL),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'TKT-002', 'Billing question', 'Question about my recent charge', 'resolved', 'normal', 'billing', (SELECT id FROM admin_users LIMIT 1));

-- ============================================================================
-- PURCHASES (Legacy Token Package Tracking)
-- ============================================================================

INSERT INTO purchases (id, user_id, stripe_customer_id, stripe_payment_intent_id, type, payment_type, status, amount, currency, description, token_package_id, token_amount)
VALUES 
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', 'cus_test_001', 'pi_test_004', 'tokens', 'card', 'succeeded', 499, 'usd', 'Starter Token Package', 'starter', 120),
  (uuid_generate_v4(), '44444444-4444-4444-4444-444444444444', 'cus_test_004', 'pi_test_005', 'tokens', 'card', 'succeeded', 999, 'usd', 'Popular Token Package', 'popular', 325);

-- ============================================================================
-- BILLING EVENTS (Payment Activity Tracking)
-- ============================================================================

INSERT INTO billing_events (id, event_id, event_type, stripe_customer_id, stripe_subscription_id, stripe_payment_intent_id, data, processed, processed_at)
VALUES 
  (uuid_generate_v4(), 'evt_test_001', 'payment_intent.succeeded', 'cus_test_002', 'sub_test_001', 'pi_test_001', '{"amount": 999, "currency": "usd"}'::jsonb, TRUE, NOW()),
  (uuid_generate_v4(), 'evt_test_002', 'payment_intent.succeeded', 'cus_test_003', 'sub_test_002', 'pi_test_002', '{"amount": 1999, "currency": "usd"}'::jsonb, TRUE, NOW()),
  (uuid_generate_v4(), 'evt_test_003', 'payment_intent.succeeded', 'cus_test_005', 'sub_test_003', 'pi_test_003', '{"amount": 3499, "currency": "usd"}'::jsonb, TRUE, NOW()),
  (uuid_generate_v4(), 'evt_test_004', 'customer.subscription.created', 'cus_test_002', 'sub_test_001', NULL, '{"tier": "subscriber"}'::jsonb, TRUE, NOW());

-- ============================================================================
-- UPDATE ADMIN ANALYTICS (Calculate after seeding)
-- ============================================================================

-- Manually update admin_analytics with calculated values from seed data
INSERT INTO admin_analytics (
  id, 
  total_users, 
  active_users, 
  new_signups_24h, 
  new_signups_7d, 
  total_subscriptions, 
  revenue_estimate, 
  error_rate,
  last_updated
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  5,  -- total_users (we seeded 5 users)
  3,  -- active_users (users who logged in recently: john, leader, premium)
  1,  -- new_signups_24h (premium user created 1 hour ago)
  1,  -- new_signups_7d (premium user within last 7 days)
  3,  -- total_subscriptions (subscriber, devotee, enlightened)
  64.97,  -- revenue_estimate ($9.99 + $19.99 + $34.99)
  0.0,  -- error_rate (no errors yet)
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  total_users = 5,
  active_users = 3,
  new_signups_24h = 1,
  new_signups_7d = 1,
  total_subscriptions = 3,
  revenue_estimate = 64.97,
  error_rate = 0.0,
  last_updated = NOW();

-- Try to refresh analytics using functions (if they exist)
DO $$
BEGIN
  -- Try to call calculate_admin_analytics if it exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'calculate_admin_analytics') THEN
    PERFORM calculate_admin_analytics();
  END IF;
  
  -- Try to call update_subscription_analytics if it exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_subscription_analytics') THEN
    PERFORM update_subscription_analytics();
  END IF;
END $$;

-- Display summary
SELECT 
  'Seeding Complete!' as message,
  (SELECT COUNT(*) FROM users) as users_count,
  (SELECT COUNT(*) FROM subscriptions) as active_subscriptions,
  (SELECT COUNT(*) FROM payments) as total_payments,
  (SELECT SUM(amount) FROM payments WHERE status = 'succeeded') / 100.0 as total_revenue_usd,
  (SELECT COUNT(*) FROM chat_sessions) as chat_sessions,
  (SELECT COUNT(*) FROM quiet_space_sessions) as meditation_sessions;

-- Success message
SELECT '✅ Test data seeded successfully! Foreign key constraint removed for testing.' as status;