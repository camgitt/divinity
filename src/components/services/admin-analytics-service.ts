/**
 * Admin Analytics Service - Fetches real analytics data from Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  newSignups24h: number;
  newSignups7d: number;
  totalSubscriptions: number;
  subscriptionsByTier: {
    seeker: number;
    subscriber: number;
    devotee: number;
    mystic: number;
  };
  revenueEstimate: number;
  errorRate: number;
}

/**
 * Calculate real analytics from Supabase database
 */
export async function fetchRealAnalytics(): Promise<AdminAnalytics> {
  const supabase = await getSupabaseClient();
  
  // Default analytics if Supabase not configured
  const defaultAnalytics: AdminAnalytics = {
    totalUsers: 0,
    activeUsers: 0,
    newSignups24h: 0,
    newSignups7d: 0,
    totalSubscriptions: 0,
    subscriptionsByTier: {
      seeker: 0,
      subscriber: 0,
      devotee: 0,
      mystic: 0
    },
    revenueEstimate: 0,
    errorRate: 0
  };

  if (!supabase) {
    console.warn('Supabase not configured - returning default analytics');
    return defaultAnalytics;
  }

  try {
    // Calculate time thresholds
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    console.log('🔍 Fetching users from Supabase...');
    
    // Fetch total users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    console.log('📊 Total users query result:', { totalUsers, error: usersError });

    if (usersError) {
      console.error('Error fetching total users:', usersError);
      console.error('⚠️ RLS POLICY ISSUE DETECTED ⚠️');
      console.error('The users table has Row Level Security enabled, but no policy allows anonymous SELECT.');
      console.error('');
      console.error('TO FIX: Run this SQL in your Supabase SQL Editor:');
      console.error('');
      console.error(`
CREATE POLICY IF NOT EXISTS "Allow anon to read users for analytics" 
  ON public.users FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to read subscriptions for analytics" 
  ON public.user_subscriptions FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to read payments for analytics" 
  ON public.payments FOR SELECT TO anon USING (true);
      `);
      console.error('');
      console.error('See /ADMIN_ANALYTICS_RLS_FIX.md for complete instructions.');
    }

    // Fetch active users (logged in within last 30 days)
    const { count: activeUsers, error: activeError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('last_login_at', thirtyDaysAgo);

    console.log('📊 Active users query result:', { activeUsers, error: activeError });

    if (activeError) {
      console.error('Error fetching active users:', activeError);
    }

    // Fetch signups in last 24 hours
    const { count: newSignups24h, error: signups24hError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', twentyFourHoursAgo);

    console.log('📊 New signups (24h) query result:', { newSignups24h, error: signups24hError });

    if (signups24hError) {
      console.error('Error fetching 24h signups:', signups24hError);
    }

    // Fetch signups in last 7 days
    const { count: newSignups7d, error: signups7dError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo);

    console.log('📊 New signups (7d) query result:', { newSignups7d, error: signups7dError });

    if (signups7dError) {
      console.error('Error fetching 7d signups:', signups7dError);
    }

    // Fetch active subscriptions
    const { count: totalSubscriptions, error: subsError } = await supabase
      .from('user_subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .neq('tier_id', 'seeker');

    if (subsError) {
      console.error('Error fetching subscriptions:', subsError);
    }

    // Fetch subscriptions by tier
    const { data: tierData, error: tierError } = await supabase
      .from('user_subscriptions')
      .select('tier_id')
      .eq('status', 'active');

    let subscriptionsByTier = {
      seeker: 0,
      subscriber: 0,
      devotee: 0,
      mystic: 0
    };

    if (!tierError && tierData) {
      tierData.forEach((sub: any) => {
        const tier = sub.tier_id;
        if (tier in subscriptionsByTier) {
          subscriptionsByTier[tier as keyof typeof subscriptionsByTier]++;
        }
      });
    }

    // If no tier data, count users who don't have subscriptions as seekers
    if (totalUsers && totalUsers > 0) {
      const totalWithTiers = Object.values(subscriptionsByTier).reduce((a, b) => a + b, 0);
      subscriptionsByTier.seeker = totalUsers - totalWithTiers;
    }

    // Fetch revenue from successful payments
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'succeeded');

    let revenueEstimate = 0;
    if (!paymentsError && payments) {
      revenueEstimate = payments.reduce((sum: number, p: any) => sum + (p.amount / 100), 0);
    }

    // Calculate error rate from admin events
    const { count: totalEvents, error: eventsError } = await supabase
      .from('admin_events')
      .select('*', { count: 'exact', head: true });

    const { count: errorEvents, error: errorEventsError } = await supabase
      .from('admin_events')
      .select('*', { count: 'exact', head: true })
      .in('severity', ['error', 'critical']);

    let errorRate = 0;
    if (!eventsError && !errorEventsError && totalEvents && totalEvents > 0) {
      errorRate = parseFloat(((errorEvents || 0) / totalEvents * 100).toFixed(2));
    }

    const analytics: AdminAnalytics = {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      newSignups24h: newSignups24h || 0,
      newSignups7d: newSignups7d || 0,
      totalSubscriptions: totalSubscriptions || 0,
      subscriptionsByTier,
      revenueEstimate,
      errorRate
    };

    console.log('✅ Real analytics fetched from Supabase:', analytics);
    return analytics;

  } catch (error) {
    console.error('Exception fetching analytics:', error);
    return defaultAnalytics;
  }
}

/**
 * Save analytics snapshot to admin_analytics table
 * Uses UPDATE instead of INSERT since table has a single fixed row
 */
export async function saveAnalyticsSnapshot(analytics: AdminAnalytics) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false };

  try {
    // Update the single row (fixed ID) instead of inserting
    const { data, error } = await supabase
      .from('admin_analytics')
      .update({
        total_users: analytics.totalUsers,
        active_users: analytics.activeUsers,
        new_signups_24h: analytics.newSignups24h,
        new_signups_7d: analytics.newSignups7d,
        total_subscriptions: analytics.totalSubscriptions,
        subscriptions_seeker: analytics.subscriptionsByTier.seeker,
        subscriptions_subscriber: analytics.subscriptionsByTier.subscriber,
        subscriptions_devotee: analytics.subscriptionsByTier.devotee,
        subscriptions_mystic: analytics.subscriptionsByTier.mystic,
        revenue_estimate: analytics.revenueEstimate,
        error_rate: analytics.errorRate,
        last_updated: new Date().toISOString()
      })
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .select()
      .single();

    if (error) {
      console.error('Error saving analytics snapshot:', error);
      return { success: false, error };
    }

    console.log('✅ Analytics snapshot saved');
    return { success: true, data };
  } catch (error) {
    console.error('Exception saving analytics:', error);
    return { success: false, error };
  }
}

/**
 * Get latest analytics snapshot from database
 */
export async function getLatestAnalyticsSnapshot(): Promise<AdminAnalytics | null> {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return null;

  try {
    // Fetch the single row with fixed ID
    const { data, error } = await supabase
      .from('admin_analytics')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .single();

    if (error) {
      // No snapshot found, return null
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching analytics snapshot:', error);
      return null;
    }

    return {
      totalUsers: data.total_users || 0,
      activeUsers: data.active_users || 0,
      newSignups24h: data.new_signups_24h || 0,
      newSignups7d: data.new_signups_7d || 0,
      totalSubscriptions: data.total_subscriptions || 0,
      subscriptionsByTier: {
        seeker: data.subscriptions_seeker || 0,
        subscriber: data.subscriptions_subscriber || 0,
        devotee: data.subscriptions_devotee || 0,
        mystic: data.subscriptions_mystic || 0
      },
      revenueEstimate: data.revenue_estimate || 0,
      errorRate: data.error_rate || 0
    };
  } catch (error) {
    console.error('Exception fetching analytics snapshot:', error);
    return null;
  }
}