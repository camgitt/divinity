/**
 * Subscription Service - Handles subscription operations with Supabase
 */

import { getSupabaseClient } from './supabase-client';

export interface UserSubscription {
  id?: string;
  user_id: string;
  tier_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  stripe_price_id?: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionHistory {
  id?: string;
  user_id: string;
  email: string;
  from_tier: string;
  to_tier: string;
  change_reason: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

/**
 * Get user's current subscription
 */
export async function getUserSubscription(userId: string) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Try localStorage fallback
    const tier = localStorage.getItem('divinityagi_tier') || 'seeker';
    return { 
      success: true, 
      data: { tier_id: tier, status: 'active' },
      source: 'localStorage' 
    };
  }

  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      // No active subscription is okay
      if (error.code === 'PGRST116') {
        return { 
          success: true, 
          data: { tier_id: 'seeker', status: 'active' },
          source: 'supabase' 
        };
      }
      console.error('Error fetching subscription:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching subscription:', error);
    return { success: false, error };
  }
}

/**
 * Create or update user subscription
 */
export async function upsertUserSubscription(subscription: UserSubscription) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Save to localStorage
    localStorage.setItem('divinityagi_tier', subscription.tier_id);
    return { success: true, source: 'localStorage' };
  }

  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .upsert([{
        user_id: subscription.user_id,
        tier_id: subscription.tier_id,
        stripe_customer_id: subscription.stripe_customer_id,
        stripe_subscription_id: subscription.stripe_subscription_id,
        stripe_price_id: subscription.stripe_price_id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end ?? false
      }], {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting subscription:', error);
      return { success: false, error };
    }

    console.log('✅ Subscription upserted:', data);
    
    // Also save to localStorage
    localStorage.setItem('divinityagi_tier', subscription.tier_id);
    
    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception upserting subscription:', error);
    return { success: false, error };
  }
}

/**
 * Record subscription change in history
 */
export async function recordSubscriptionChange(history: SubscriptionHistory) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase not configured - subscription history not saved');
    return { success: false, source: 'none' };
  }

  try {
    const { data, error } = await supabase
      .from('subscription_history')
      .insert([{
        user_id: history.user_id,
        email: history.email,
        from_tier: history.from_tier,
        to_tier: history.to_tier,
        change_reason: history.change_reason,
        metadata: history.metadata || {},
        created_at: history.created_at || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error recording subscription history:', error);
      return { success: false, error };
    }

    console.log('✅ Subscription change recorded:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Exception recording subscription history:', error);
    return { success: false, error };
  }
}

/**
 * Cancel user subscription
 */
export async function cancelUserSubscription(userId: string, cancelAtPeriodEnd: boolean = true) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Just update localStorage
    localStorage.setItem('divinityagi_tier', 'seeker');
    return { success: true, source: 'localStorage' };
  }

  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        status: cancelAtPeriodEnd ? 'active' : 'canceled',
        cancel_at_period_end: cancelAtPeriodEnd
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error canceling subscription:', error);
      return { success: false, error };
    }

    console.log('✅ Subscription canceled:', data);
    
    // Update localStorage if immediate cancel
    if (!cancelAtPeriodEnd) {
      localStorage.setItem('divinityagi_tier', 'seeker');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception canceling subscription:', error);
    return { success: false, error };
  }
}

/**
 * Get subscription history for a user
 */
export async function getSubscriptionHistory(userId: string, limit = 50) {
  const supabase = await getSupabaseClient();
  
  if (!supabase) return { success: false, source: 'none' };

  try {
    const { data, error } = await supabase
      .from('subscription_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching subscription history:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching subscription history:', error);
    return { success: false, error };
  }
}

/**
 * Get all subscription tiers
 */
export async function getSubscriptionTiers() {
  const supabase = await getSupabaseClient();
  
  if (!supabase) {
    // Return hardcoded tiers
    return {
      success: true,
      data: [
        { id: 'seeker', name: 'Seeker', price: 0, tokens_per_month: 50 },
        { id: 'subscriber', name: 'Subscriber', price: 9.99, tokens_per_month: 350 },
        { id: 'devotee', name: 'Devotee', price: 19.99, tokens_per_month: 750 },
        { id: 'enlightened', name: 'Enlightened', price: 34.99, tokens_per_month: 2000 }
      ],
      source: 'hardcoded'
    };
  }

  try {
    const { data, error } = await supabase
      .from('subscription_tiers')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching tiers:', error);
      return { success: false, error };
    }

    return { success: true, data, source: 'supabase' };
  } catch (error) {
    console.error('Exception fetching tiers:', error);
    return { success: false, error };
  }
}
