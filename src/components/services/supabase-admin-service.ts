/**
 * Supabase Admin Service
 * 
 * This service handles real-time event synchronization between
 * the DivinityAGI app and the Admin Dashboard using Supabase.
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase-client';

/**
 * Track an event to Supabase
 */
export async function trackEventToSupabase(event: {
  id: string;
  type: string;
  severity: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  notificationSent: boolean;
}) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    // Fallback to localStorage only
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('admin_events')
      .insert([{
        event_id: event.id,
        type: event.type,
        severity: event.severity,
        timestamp: event.timestamp,
        user_id: event.userId,
        user_email: event.userEmail,
        user_name: event.userName,
        title: event.title,
        description: event.description,
        metadata: event.metadata,
        notification_sent: event.notificationSent
      }])
      .select()
      .single();

    if (error) {
      console.error('Error tracking event to Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to track event to Supabase:', error);
    throw error;
  }
}

/**
 * Fetch events from Supabase
 */
export async function fetchEventsFromSupabase(limit = 1000) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('admin_events')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching events from Supabase:', error);
      throw error;
    }

    // Transform Supabase format to app format
    return data.map((event: any) => ({
      id: event.event_id,
      type: event.type,
      severity: event.severity,
      timestamp: event.timestamp,
      userId: event.user_id,
      userEmail: event.user_email,
      userName: event.user_name,
      title: event.title,
      description: event.description,
      metadata: event.metadata,
      notificationSent: event.notification_sent
    }));
  } catch (error) {
    console.error('Failed to fetch events from Supabase:', error);
    return [];
  }
}

/**
 * Subscribe to real-time events
 */
export async function subscribeToEvents(callback: (event: any) => void) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { unsubscribe: () => {} };
  }

  try {
    const channel = supabase
      .channel('admin_events')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'admin_events'
      }, (payload: any) => {
        // Transform to app format
        const event = {
          id: payload.new.event_id,
          type: payload.new.type,
          severity: payload.new.severity,
          timestamp: payload.new.timestamp,
          userId: payload.new.user_id,
          userEmail: payload.new.user_email,
          userName: payload.new.user_name,
          title: payload.new.title,
          description: payload.new.description,
          metadata: payload.new.metadata,
          notificationSent: payload.new.notification_sent
        };
        callback(event);
      })
      .subscribe();

    return channel;
  } catch (error) {
    console.error('Failed to subscribe to events:', error);
    return { unsubscribe: () => {} };
  }
}

/**
 * Update analytics in Supabase (optional - for caching)
 */
export async function updateAnalyticsInSupabase(analytics: {
  totalUsers: number;
  activeUsers: number;
  newSignups24h: number;
  newSignups7d: number;
  totalSubscriptions: number;
  revenueEstimate: number;
  errorRate: number;
}) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('admin_analytics')
      .upsert([{
        id: '00000000-0000-0000-0000-000000000001', // Fixed ID for single row
        total_users: analytics.totalUsers,
        active_users: analytics.activeUsers,
        new_signups_24h: analytics.newSignups24h,
        new_signups_7d: analytics.newSignups7d,
        total_subscriptions: analytics.totalSubscriptions,
        revenue_estimate: analytics.revenueEstimate,
        error_rate: analytics.errorRate,
        last_updated: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error updating analytics in Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to update analytics in Supabase:', error);
    throw error;
  }
}

/**
 * Fetch analytics from Supabase
 */
export async function fetchAnalyticsFromSupabase() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return null;
  }

  try {
    // Fetch all necessary data in parallel
    const [analyticsResult, usersResult, subscriptionsResult] = await Promise.all([
      supabase.from('admin_analytics').select('*').single(),
      supabase.from('users').select('id, email, created_at, last_login_at, status'),
      supabase.from('subscriptions').select('tier, status')
    ]);

    // Use the cached analytics table first
    if (analyticsResult.data) {
      // Count subscriptions by tier from real data
      const subscriptionsByTier = {
        seeker: 0,
        subscriber: 0,
        devotee: 0,
        mystic: 0
      };

      if (subscriptionsResult.data) {
        subscriptionsResult.data.forEach((sub: any) => {
          const tier = sub.tier?.toLowerCase();
          if (tier && tier in subscriptionsByTier) {
            subscriptionsByTier[tier as keyof typeof subscriptionsByTier]++;
          }
        });
      }

      return {
        totalUsers: analyticsResult.data.total_users || 0,
        activeUsers: analyticsResult.data.active_users || 0,
        newSignups24h: analyticsResult.data.new_signups_24h || 0,
        newSignups7d: analyticsResult.data.new_signups_7d || 0,
        totalSubscriptions: analyticsResult.data.total_subscriptions || 0,
        subscriptionsByTier,
        revenueEstimate: parseFloat(analyticsResult.data.revenue_estimate || 0),
        errorRate: parseFloat(analyticsResult.data.error_rate || 0),
        lastUpdated: analyticsResult.data.last_updated || new Date().toISOString()
      };
    }

    // Fallback: Calculate from raw data
    const totalUsers = usersResult.data?.length || 0;
    const now = Date.now();
    const day24h = 24 * 60 * 60 * 1000;
    const day7d = 7 * day24h;

    const newSignups24h = usersResult.data?.filter((u: any) => 
      u.created_at && new Date(u.created_at).getTime() > now - day24h
    ).length || 0;

    const newSignups7d = usersResult.data?.filter((u: any) => 
      u.created_at && new Date(u.created_at).getTime() > now - day7d
    ).length || 0;

    const activeUsers = usersResult.data?.filter((u: any) => 
      u.last_login_at && new Date(u.last_login_at).getTime() > now - day7d
    ).length || 0;

    // Count subscriptions by tier
    const subscriptionsByTier = {
      seeker: 0,
      subscriber: 0,
      devotee: 0,
      mystic: 0
    };

    if (subscriptionsResult.data) {
      subscriptionsResult.data.forEach((sub: any) => {
        const tier = sub.tier?.toLowerCase();
        if (tier && tier in subscriptionsByTier) {
          subscriptionsByTier[tier as keyof typeof subscriptionsByTier]++;
        }
      });
    }

    // Calculate revenue estimate
    const tierPricing: Record<string, number> = {
      seeker: 0,
      subscriber: 9.99,
      devotee: 19.99,
      mystic: 34.99
    };

    const revenueEstimate = Object.entries(subscriptionsByTier).reduce(
      (sum, [tier, count]) => sum + (tierPricing[tier] * count),
      0
    );

    return {
      totalUsers,
      activeUsers,
      newSignups24h,
      newSignups7d,
      totalSubscriptions: subscriptionsResult.data?.filter((s: any) => s.status === 'active').length || 0,
      subscriptionsByTier,
      revenueEstimate,
      errorRate: 0,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to fetch analytics from Supabase:', error);
    return null;
  }
}

/**
 * Delete old events (cleanup)
 */
export async function deleteOldEvents(daysToKeep = 90) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return null;
  }

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const { data, error } = await supabase
      .from('admin_events')
      .delete()
      .lt('timestamp', cutoffDate.toISOString());

    if (error) {
      console.error('Error deleting old events:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to delete old events:', error);
    throw error;
  }
}

/**
 * Export configuration status
 */
export function getSupabaseStatus() {
  return {
    configured: isSupabaseConfigured(),
    url: isSupabaseConfigured() ? 'Configured' : 'Not configured',
    mode: isSupabaseConfigured() ? 'Supabase Sync' : 'LocalStorage Only'
  };
}