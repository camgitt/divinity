import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type SubscriptionTier = 'seeker' | 'subscriber' | 'devotee' | 'enlightened';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  tokenAllowance: number; // Daily allowance for free/basic, or multiplier for premium
  avatarAccess: 'limited' | 'standard' | 'full' | 'priority';
  personalGuide: 'trial' | 'basic' | 'advanced' | 'unlimited';
  exclusiveContent: boolean;
  prioritySupport: boolean;
  communityAccess: 'none' | 'basic' | 'full' | 'exclusive';
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'seeker',
    name: 'Guest',
    price: 0,
    period: 'forever',
    description: 'Start your spiritual journey with basic access',
    features: [
      '1 avatar per faith group (rotating)',
      '5-10 daily prompts',
      'Browse free avatars',
      'Community groups access',
      'Trial Personal Guide (limited)'
    ],
    tokenAllowance: 10,
    avatarAccess: 'limited',
    personalGuide: 'trial',
    exclusiveContent: false,
    prioritySupport: false,
    communityAccess: 'basic'
  },
  {
    id: 'subscriber',
    name: 'Free with an Account',
    price: 0,
    period: 'with email',
    description: 'Enhanced access with token earning system',
    features: [
      'Chat with standard avatars',
      'Token top-ups available',
      'Earn tokens through wisdom gained',
      'Badge & milestone system',
      'Enhanced Personal Guide',
      'Join Community Circle'
    ],
    tokenAllowance: 25,
    avatarAccess: 'standard',
    personalGuide: 'basic',
    exclusiveContent: false,
    prioritySupport: false,
    communityAccess: 'full'
  },
  {
    id: 'devotee',
    name: 'Devotee',
    price: 9.99,
    period: 'month',
    description: 'Full access to spiritual guidance and content',
    features: [
      'Chat with all avatars',
      'Unlimited scroll access',
      'Token rewards & top-ups',
      'Full badge system',
      'Advanced Personal Guide',
      'Extended Spirit Guide library',
      'Special reflections & rituals'
    ],
    tokenAllowance: 100,
    avatarAccess: 'full',
    personalGuide: 'advanced',
    exclusiveContent: true,
    prioritySupport: false,
    communityAccess: 'full'
  },
  {
    id: 'enlightened',
    name: 'Enlightened',
    price: 14.99,
    period: 'month',
    description: 'Ultimate spiritual experience with priority access',
    features: [
      'Everything from Devotee',
      'Priority new avatar access',
      'Unlimited token benefits',
      'Exclusive events & workshops',
      'Priority support',
      'Recognition badges',
      'Live Q&A sessions'
    ],
    tokenAllowance: -1, // Unlimited
    avatarAccess: 'priority',
    personalGuide: 'unlimited',
    exclusiveContent: true,
    prioritySupport: true,
    communityAccess: 'exclusive'
  }
];

interface UserSubscription {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: Date;
  tokens: number;
  dailyTokensUsed: number;
  lastTokenReset: Date;
  email?: string;
  wisdomTokens: number; // Permanent wisdom points earned through achievements
}

interface SubscriptionContextType {
  // Portal Management
  isPortalOpen: boolean;
  openPortal: (context?: 'low-tokens' | 'premium-feature' | 'manual' | 'upgrade-prompt' | 'token-purchase') => void;
  closePortal: () => void;
  triggerContext: 'low-tokens' | 'premium-feature' | 'manual' | 'upgrade-prompt' | 'token-purchase';
  
  // Signup Flow Management
  isSignupFlowOpen: boolean;
  openSignupFlow: (initialPlan?: SubscriptionTier) => void;
  closeSignupFlow: () => void;
  
  // Subscription Management
  currentSubscription: UserSubscription;
  currentPlan: SubscriptionPlan;
  upgradeTo: (tier: SubscriptionTier, email?: string) => void;
  updateTier: (tier: SubscriptionTier) => void;
  tier: SubscriptionTier;
  
  // Token Management
  useTokens: (amount: number) => boolean;
  addTokens: (amount: number) => void;
  getRemainingDailyTokens: () => number;
  canUseFeature: (feature: 'avatar-chat' | 'personal-guide' | 'exclusive-content' | 'community') => boolean;
  
  // Wisdom Token Management
  wisdomTokens: number;
  addWisdomTokens: (amount: number) => void;
  
  // Feature Access
  hasFeatureAccess: (feature: string) => boolean;
  getAvatarAccessLevel: () => 'limited' | 'standard' | 'full' | 'priority';
  
  // User Info
  userEmail?: string;
  setUserEmail: (email: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isSignupFlowOpen, setIsSignupFlowOpen] = useState(false);
  const [triggerContext, setTriggerContext] = useState<'low-tokens' | 'premium-feature' | 'manual' | 'upgrade-prompt' | 'token-purchase'>('manual');
  
  // Initialize subscription state - check for existing user
  const initializeSubscription = (): UserSubscription => {
    // Try to restore user from localStorage
    const storedUser = localStorage.getItem('divinityagi_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // If user is a guest, keep them on seeker tier
        if (userData.email === 'guest@example.com') {
          return {
            tier: 'seeker',
            isActive: true,
            tokens: 10, // Guest default (seeker tier)
            dailyTokensUsed: 0,
            lastTokenReset: new Date(),
            wisdomTokens: 500,
            email: userData.email
          };
        }
        // If user has registered with email, start them as subscriber
        return {
          tier: 'subscriber',
          isActive: true,
          tokens: 25, // Subscriber default
          dailyTokensUsed: 0,
          lastTokenReset: new Date(),
          wisdomTokens: 500,
          email: userData.email
        };
      } catch (e) {
        // If parsing fails, fall back to default
        console.error('Failed to restore user session:', e);
      }
    }
    
    // Default: free tier (seeker)
    return {
      tier: 'seeker',
      isActive: true,
      tokens: 10,
      dailyTokensUsed: 0,
      lastTokenReset: new Date(),
      wisdomTokens: 500
    };
  };
  
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription>(initializeSubscription);

  // Get current plan details
  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === currentSubscription.tier) || SUBSCRIPTION_PLANS[0];

  // Reset daily tokens if needed
  useEffect(() => {
    const now = new Date();
    const lastReset = new Date(currentSubscription.lastTokenReset);
    const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceReset >= 24) {
      setCurrentSubscription(prev => {
        const planForUser = SUBSCRIPTION_PLANS.find(plan => plan.id === prev.tier) || SUBSCRIPTION_PLANS[0];
        return {
          ...prev,
          dailyTokensUsed: 0,
          lastTokenReset: now,
          tokens: prev.tokens + planForUser.tokenAllowance
        };
      });
    }
  }, [currentSubscription.lastTokenReset, currentSubscription.tier]);

  const openPortal = useCallback((context: 'low-tokens' | 'premium-feature' | 'manual' | 'upgrade-prompt' | 'token-purchase' = 'manual') => {
    setTriggerContext(context);
    setIsPortalOpen(true);
  }, []);

  const closePortal = useCallback(() => {
    setIsPortalOpen(false);
  }, []);

  const openSignupFlow = useCallback((initialPlan?: SubscriptionTier) => {
    setIsSignupFlowOpen(true);
  }, []);

  const closeSignupFlow = useCallback(() => {
    setIsSignupFlowOpen(false);
  }, []);

  const upgradeTo = useCallback((tier: SubscriptionTier, email?: string, isNewUser: boolean = false) => {
    const newPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === tier);
    if (!newPlan) return;

    setCurrentSubscription(prev => ({
      ...prev,
      tier,
      isActive: true,
      // For new users, set tokens to the plan's allowance. For upgrades, add to existing tokens
      tokens: isNewUser ? newPlan.tokenAllowance : prev.tokens + newPlan.tokenAllowance,
      email: email || prev.email,
      expiresAt: tier === 'seeker' ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }));
    
    closePortal();
  }, [closePortal]);

  const useTokens = useCallback((amount: number) => {
    if (currentSubscription.tokens < amount) {
      openPortal('low-tokens');
      return false;
    }

    setCurrentSubscription(prev => ({
      ...prev,
      tokens: prev.tokens - amount,
      dailyTokensUsed: prev.dailyTokensUsed + amount
    }));
    
    return true;
  }, [currentSubscription.tokens, openPortal]);

  const addTokens = useCallback((amount: number) => {
    setCurrentSubscription(prev => ({
      ...prev,
      tokens: prev.tokens + amount
    }));
  }, []);

  const addWisdomTokens = useCallback((amount: number) => {
    setCurrentSubscription(prev => ({
      ...prev,
      wisdomTokens: prev.wisdomTokens + amount
    }));
  }, []);

  const updateTier = useCallback((tier: SubscriptionTier) => {
    upgradeTo(tier);
  }, [upgradeTo]);

  const getRemainingDailyTokens = useCallback(() => {
    if (currentPlan.tokenAllowance === -1) return -1; // Unlimited
    return Math.max(0, currentPlan.tokenAllowance - currentSubscription.dailyTokensUsed);
  }, [currentPlan.tokenAllowance, currentSubscription.dailyTokensUsed]);

  const canUseFeature = useCallback((feature: 'avatar-chat' | 'personal-guide' | 'exclusive-content' | 'community') => {
    switch (feature) {
      case 'avatar-chat':
        return currentSubscription.tokens > 0;
      case 'personal-guide':
        return currentPlan.personalGuide !== 'trial' || currentSubscription.tokens > 0;
      case 'exclusive-content':
        return currentPlan.exclusiveContent;
      case 'community':
        return currentPlan.communityAccess !== 'none';
      default:
        return false;
    }
  }, [currentSubscription.tokens, currentPlan]);

  const hasFeatureAccess = useCallback((feature: string) => {
    const featureMap: { [key: string]: boolean } = {
      'unlimited-avatars': currentPlan.avatarAccess === 'full' || currentPlan.avatarAccess === 'priority',
      'priority-support': currentPlan.prioritySupport,
      'exclusive-content': currentPlan.exclusiveContent,
      'advanced-guide': currentPlan.personalGuide === 'advanced' || currentPlan.personalGuide === 'unlimited',
      'token-earning': currentSubscription.tier !== 'seeker',
      'badge-system': currentSubscription.tier !== 'seeker'
    };
    
    return featureMap[feature] || false;
  }, [currentPlan, currentSubscription.tier]);

  const getAvatarAccessLevel = useCallback(() => {
    return currentPlan.avatarAccess;
  }, [currentPlan.avatarAccess]);

  const setUserEmail = useCallback((email: string) => {
    setCurrentSubscription(prev => ({
      ...prev,
      email
    }));
  }, []);

  const value: SubscriptionContextType = {
    isPortalOpen,
    openPortal,
    closePortal,
    triggerContext,
    isSignupFlowOpen,
    openSignupFlow,
    closeSignupFlow,
    currentSubscription,
    currentPlan,
    upgradeTo,
    updateTier,
    tier: currentSubscription.tier,
    useTokens,
    addTokens,
    getRemainingDailyTokens,
    canUseFeature,
    hasFeatureAccess,
    getAvatarAccessLevel,
    wisdomTokens: currentSubscription.wisdomTokens,
    addWisdomTokens,
    userEmail: currentSubscription.email,
    setUserEmail
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}