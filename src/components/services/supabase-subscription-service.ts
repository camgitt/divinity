/**
 * Supabase Subscription Service
 * Handles subscription data storage and retrieval
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase-client';
import { SubscriptionTier } from '../subscription-context';

// ===========================
// TYPES
// ===========================

export interface Customer {
  id: string;
  stripe_customer_id: string;
  user_id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_price_id: string;
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'trialing' | 'unpaid';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  stripe_payment_intent_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  payment_type: 'subscription' | 'token_purchase' | 'donation';
  token_amount?: number;
  payment_method_type?: string;
  last4?: string;
  brand?: string;
  metadata?: Record<string, any>;
  description?: string;
  refunded_amount?: number;
  refunded_at?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionHistory {
  id: string;
  user_id: string;
  email: string;
  from_tier?: string;
  to_tier: string;
  change_reason: 'signup' | 'upgrade' | 'downgrade' | 'cancellation' | 'reactivation' | 'trial_start' | 'trial_end';
  metadata?: Record<string, any>;
  changed_at: string;
}

export interface TokenPurchase {
  id: string;
  user_id: string;
  email: string;
  token_amount: number;
  price_paid: number;
  currency: string;
  stripe_payment_intent_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  metadata?: Record<string, any>;
  purchased_at: string;
  completed_at?: string;
}

export interface SubscriptionMetrics {
  active_count: number;
  canceled_count: number;
  past_due_count: number;
  trialing_count: number;
  devotee_count: number;
  enlightened_count: number;
  mrr: number;
}

export interface RevenueMetrics {
  total_revenue: number;
  subscription_revenue: number;
  token_revenue: number;
  transaction_count: number;
}

// ===========================
// CUSTOMER FUNCTIONS
// ===========================

export async function createCustomer(data: {
  stripe_customer_id: string;
  user_id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
}): Promise<Customer | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data: customer, error } = await supabase
      .from('customers')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting customer:', error);
    return null;
  }
}

export async function getCustomerByUserId(userId: string): Promise<Customer | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting customer:', error);
    return null;
  }
}

export async function getCustomerByStripeId(stripeCustomerId: string): Promise<Customer | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('stripe_customer_id', stripeCustomerId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting customer:', error);
    return null;
  }
}

// ===========================
// SUBSCRIPTION FUNCTIONS
// ===========================

export async function createSubscription(data: {
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_price_id: string;
  tier: SubscriptionTier;
  status: string;
  current_period_start: string;
  current_period_end: string;
  trial_start?: string;
  trial_end?: string;
  metadata?: Record<string, any>;
}): Promise<Subscription | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    return null;
  }
}

export async function getActiveSubscriptionByCustomer(stripeCustomerId: string): Promise<Subscription | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_customer_id', stripeCustomerId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting active subscription:', error);
    return null;
  }
}

export async function getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
}

export async function updateSubscription(
  stripeSubscriptionId: string,
  updates: Partial<Subscription>
): Promise<Subscription | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    return null;
  }
}

export async function getAllActiveSubscriptions(): Promise<Subscription[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured - returning empty subscriptions');
    return [];
  }
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting active subscriptions:', error);
    return [];
  }
}

// ===========================
// PAYMENT FUNCTIONS
// ===========================

export async function createPayment(data: {
  stripe_payment_intent_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_type: 'subscription' | 'token_purchase' | 'donation';
  token_amount?: number;
  payment_method_type?: string;
  last4?: string;
  brand?: string;
  metadata?: Record<string, any>;
  description?: string;
  paid_at?: string;
}): Promise<Payment | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data: payment, error } = await supabase
      .from('payments')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
}

export async function getPaymentsByCustomer(stripeCustomerId: string, limit: number = 50): Promise<Payment[]> {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('stripe_customer_id', stripeCustomerId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting payments:', error);
    return [];
  }
}

export async function getAllPayments(limit: number = 100): Promise<Payment[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured - returning empty payments');
    return [];
  }
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting payments:', error);
    return [];
  }
}

// ===========================
// SUBSCRIPTION HISTORY FUNCTIONS
// ===========================

export async function recordSubscriptionChange(data: {
  user_id: string;
  email: string;
  from_tier?: string;
  to_tier: string;
  change_reason: string;
  metadata?: Record<string, any>;
}): Promise<SubscriptionHistory | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data: history, error } = await supabase
      .from('subscription_history')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return history;
  } catch (error) {
    console.error('Error recording subscription change:', error);
    return null;
  }
}

export async function getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error} = await supabase
      .from('subscription_history')
      .select('*')
      .eq('user_id', userId)
      .order('changed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting subscription history:', error);
    return [];
  }
}

// ===========================
// TOKEN PURCHASE FUNCTIONS
// ===========================

export async function createTokenPurchase(data: {
  user_id: string;
  email: string;
  token_amount: number;
  price_paid: number;
  currency: string;
  stripe_payment_intent_id?: string;
  status: string;
  metadata?: Record<string, any>;
}): Promise<TokenPurchase | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data: purchase, error } = await supabase
      .from('token_purchases')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return purchase;
  } catch (error) {
    console.error('Error creating token purchase:', error);
    return null;
  }
}

export async function updateTokenPurchase(
  id: string,
  updates: Partial<TokenPurchase>
): Promise<TokenPurchase | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('token_purchases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating token purchase:', error);
    return null;
  }
}

export async function getTokenPurchasesByUser(userId: string): Promise<TokenPurchase[]> {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('token_purchases')
      .select('*')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting token purchases:', error);
    return [];
  }
}

// ===========================
// ANALYTICS FUNCTIONS
// ===========================

export async function getSubscriptionMetrics(): Promise<SubscriptionMetrics | null> {
  if (!isSupabaseConfigured()) {
    return null; // Return null instead of default - let caller handle fallback
  }
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('subscription_metrics_view')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // Silently return null - view may not exist yet
    return null;
  }
}

export async function getRevenueMetrics(days: number = 30): Promise<RevenueMetrics | null> {
  if (!isSupabaseConfigured()) {
    return null; // Return null instead of default - let caller handle fallback
  }
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .rpc('get_subscription_revenue', { days });

    if (error) throw error;
    return data;
  } catch (error) {
    // Silently return null - function may not exist yet
    return null;
  }
}

export async function getSubscriptionCounts(): Promise<Array<{ tier: string; count: number }>> {
  if (!isSupabaseConfigured()) {
    return []; // Return empty array - let caller handle fallback
  }
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .rpc('get_subscription_counts');

    if (error) throw error;
    return data || [];
  } catch (error) {
    // Silently return empty array - function may not exist yet
    return [];
  }
}

export async function getCustomerLifetimeValue(stripeCustomerId: string): Promise<number> {
  const supabase = await getSupabaseClient();
  if (!supabase) return 0;
  
  try {
    const { data, error } = await supabase
      .rpc('get_customer_ltv', { customer_stripe_id: stripeCustomerId });

    if (error) throw error;
    return data || 0;
  } catch (error) {
    // Silently return 0 - function may not exist yet
    return 0;
  }
}