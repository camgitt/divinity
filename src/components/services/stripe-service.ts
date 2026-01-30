/**
 * Stripe Payment Gateway Service
 * Handles subscription payments, billing, and customer management
 * 
 * Setup Instructions:
 * 1. Create a Stripe account at https://stripe.com
 * 2. Get your API keys from Dashboard > Developers > API keys
 * 3. Replace STRIPE_PUBLISHABLE_KEY with your publishable key
 * 4. Set up Products and Prices in Stripe Dashboard:
 *    - Devotee Plan: $9.99/month
 *    - Enlightened Plan: $14.99/month
 * 5. Copy the Price IDs and add them to STRIPE_PRICE_IDS below
 */

import { SubscriptionTier } from '../subscription-context';

// ===========================
// CONFIGURATION
// ===========================

// Replace with your Stripe publishable key
// Using import.meta.env for Vite/browser compatibility
const STRIPE_PUBLISHABLE_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY) || 
                                'pk_test_YOUR_STRIPE_KEY_HERE';

// Stripe Price IDs - Replace with your actual price IDs from Stripe Dashboard
export const STRIPE_PRICE_IDS = {
  devotee_monthly: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRIPE_DEVOTEE_PRICE_ID) || 
                   'price_devotee_monthly',
  enlightened_monthly: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRIPE_ENLIGHTENED_PRICE_ID) || 
                       'price_enlightened_monthly',
};

// ===========================
// TYPES
// ===========================

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface StripeSubscription {
  id: string;
  customerId: string;
  status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'trialing' | 'unpaid';
  priceId: string;
  tier: SubscriptionTier;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  metadata?: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface SubscriptionCreateParams {
  email: string;
  name?: string;
  tier: SubscriptionTier;
  paymentMethodId?: string;
}

export interface BillingPortalSession {
  url: string;
}

// ===========================
// STRIPE SERVICE
// ===========================

class StripeService {
  private publishableKey: string;
  private initialized: boolean = false;

  constructor() {
    this.publishableKey = STRIPE_PUBLISHABLE_KEY;
  }

  /**
   * Initialize Stripe.js
   * Must be called before using any Stripe functions
   */
  async initialize(): Promise<any> {
    if (this.initialized) {
      return (window as any).Stripe;
    }

    // Load Stripe.js if not already loaded
    if (!(window as any).Stripe) {
      await this.loadStripeScript();
    }

    const stripe = (window as any).Stripe(this.publishableKey);
    this.initialized = true;
    return stripe;
  }

  /**
   * Load Stripe.js script dynamically
   */
  private loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src*="stripe.com"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Stripe.js'));
      document.head.appendChild(script);
    });
  }

  /**
   * Get price ID for a subscription tier
   */
  getPriceIdForTier(tier: SubscriptionTier): string | null {
    switch (tier) {
      case 'devotee':
        return STRIPE_PRICE_IDS.devotee_monthly;
      case 'enlightened':
        return STRIPE_PRICE_IDS.enlightened_monthly;
      default:
        return null;
    }
  }

  /**
   * Create a checkout session
   * This redirects users to Stripe's hosted checkout page
   */
  async createCheckoutSession(params: {
    tier: SubscriptionTier;
    email: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ sessionId: string }> {
    const priceId = this.getPriceIdForTier(params.tier);
    
    if (!priceId) {
      throw new Error(`No price configured for tier: ${params.tier}`);
    }

    // In production, this should call your backend API
    // For now, we'll return mock data
    // TODO: Replace with actual API call to your backend
    const mockResponse = {
      sessionId: `cs_test_${Date.now()}`,
    };

    return mockResponse;
  }

  /**
   * Redirect to Stripe Checkout
   */
  async redirectToCheckout(params: {
    tier: SubscriptionTier;
    email: string;
  }): Promise<void> {
    const stripe = await this.initialize();
    
    const session = await this.createCheckoutSession({
      tier: params.tier,
      email: params.email,
      successUrl: `${window.location.origin}?subscription_success=true&tier=${params.tier}`,
      cancelUrl: `${window.location.origin}?subscription_canceled=true`,
    });

    // Redirect to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  }

  /**
   * Create a billing portal session
   * This allows customers to manage their subscription
   */
  async createBillingPortalSession(customerId: string): Promise<BillingPortalSession> {
    // In production, this should call your backend API
    // TODO: Replace with actual API call
    const mockResponse = {
      url: `https://billing.stripe.com/session/${customerId}`,
    };

    return mockResponse;
  }

  /**
   * Get customer by email
   */
  async getCustomerByEmail(email: string): Promise<StripeCustomer | null> {
    // In production, call your backend API
    // TODO: Replace with actual API call
    return null;
  }

  /**
   * Get active subscription for customer
   */
  async getActiveSubscription(customerId: string): Promise<StripeSubscription | null> {
    // In production, call your backend API
    // TODO: Replace with actual API call
    return null;
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = true): Promise<void> {
    // In production, call your backend API
    // TODO: Replace with actual API call
    console.log('Canceling subscription:', subscriptionId, 'at period end:', cancelAtPeriodEnd);
  }

  /**
   * Resume subscription (if canceled but not yet ended)
   */
  async resumeSubscription(subscriptionId: string): Promise<void> {
    // In production, call your backend API
    // TODO: Replace with actual API call
    console.log('Resuming subscription:', subscriptionId);
  }

  /**
   * Update subscription tier
   */
  async updateSubscriptionTier(subscriptionId: string, newTier: SubscriptionTier): Promise<void> {
    const priceId = this.getPriceIdForTier(newTier);
    
    if (!priceId) {
      throw new Error(`No price configured for tier: ${newTier}`);
    }

    // In production, call your backend API
    // TODO: Replace with actual API call
    console.log('Updating subscription:', subscriptionId, 'to tier:', newTier);
  }

  /**
   * Process one-time payment (for token purchases)
   */
  async processTokenPurchase(params: {
    amount: number;
    tokenAmount: number;
    email: string;
  }): Promise<PaymentIntent> {
    // In production, call your backend API to create a payment intent
    // TODO: Replace with actual API call
    const mockResponse: PaymentIntent = {
      id: `pi_test_${Date.now()}`,
      amount: params.amount * 100, // Stripe uses cents
      currency: 'usd',
      status: 'succeeded',
      clientSecret: `pi_test_secret_${Date.now()}`,
    };

    return mockResponse;
  }

  /**
   * Validate webhook signature
   * This should be done server-side for security
   */
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
    // This should only be done server-side
    console.warn('Webhook validation should be done server-side');
    return false;
  }
}

// Export singleton instance
export const stripeService = new StripeService();

// ===========================
// HELPER FUNCTIONS
// ===========================

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Get tier display name
 */
export function getTierDisplayName(tier: SubscriptionTier): string {
  const names: Record<SubscriptionTier, string> = {
    seeker: 'Seeker (Free)',
    subscriber: 'Subscriber (Free)',
    devotee: 'Devotee',
    enlightened: 'Enlightened',
  };
  return names[tier];
}

/**
 * Get tier price
 */
export function getTierPrice(tier: SubscriptionTier): number {
  const prices: Record<SubscriptionTier, number> = {
    seeker: 0,
    subscriber: 0,
    devotee: 9.99,
    enlightened: 14.99,
  };
  return prices[tier];
}
