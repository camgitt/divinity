import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useSubscription } from "./subscription-context";
import { Crown, Sparkles, Settings, Activity, Zap } from "lucide-react";

interface SubscriptionPromotionBannerProps {
  onNavigate?: (tab: string) => void;
  className?: string;
  showBillingHistory?: boolean;
  compact?: boolean;
}

/**
 * Reusable subscription promotion banner component
 * Displays current subscription plan with upgrade and management options
 * Used consistently across the app (Profile, Guides, Circle of Faiths, etc.)
 */
export function SubscriptionPromotionBanner({ 
  onNavigate, 
  className = "",
  showBillingHistory = true,
  compact = false
}: SubscriptionPromotionBannerProps) {
  const { currentSubscription, tier, openSignupFlow } = useSubscription();

  // Get current plan details
  const plans = {
    seeker: {
      name: 'Seeker',
      description: 'Start your spiritual journey with limited access',
      price: 0,
      period: '',
      tokenAllowance: 10
    },
    subscriber: {
      name: 'Subscriber',
      description: 'Enhanced spiritual guidance with daily token refresh',
      price: 0,
      period: 'free',
      tokenAllowance: 50
    },
    devotee: {
      name: 'Devotee',
      description: 'Deep spiritual connection with premium features',
      price: '$9.99',
      period: 'month',
      tokenAllowance: 200
    },
    mystic: {
      name: 'Mystic',
      description: 'Unlimited wisdom and exclusive spiritual content',
      price: '$24.99',
      period: 'month',
      tokenAllowance: -1
    }
  };

  const currentPlan = plans[tier as keyof typeof plans] || plans.seeker;

  if (compact) {
    // Compact version for sidebar or smaller spaces
    return (
      <Card className={`bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/50 transition-all duration-500 backdrop-blur-sm p-4 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/10 via-transparent to-[#FFD369]/10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7A4FFF]/50 to-transparent" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD369] to-amber-500 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                <Crown className="w-4 h-4 text-slate-900" />
              </div>
              <div>
                <h4 className="text-sm bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                  {currentPlan.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {currentPlan.price === 0 ? 'Free' : currentPlan.price}
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#FFD369] hover:to-[#7A4FFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 h-9 text-sm"
            onClick={() => openSignupFlow()}
          >
            <Sparkles className="w-3 h-3 mr-2" />
            {currentPlan.price === 0 ? 'Upgrade' : 'Enhance'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center justify-center mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-[#FFD369] to-amber-500 rounded-xl flex items-center justify-center mr-3">
          <Crown className="w-4 h-4 text-slate-900" />
        </div>
        <h2 className="text-2xl sm:text-3xl bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
          Subscription
        </h2>
      </div>
      
      <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/50 transition-all duration-500 backdrop-blur-sm p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/10 via-transparent to-[#FFD369]/10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7A4FFF]/50 to-transparent" />
        
        <div className="relative text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD369] to-amber-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <Crown className="w-6 h-6 text-slate-900" />
            </div>
            <h3 className="text-3xl bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
              {currentPlan.name} Plan
            </h3>
          </div>
          <p className="text-slate-300 mb-8 max-w-xs mx-auto leading-relaxed">
            {currentPlan.description}
          </p>
          <div className="text-4xl mb-2 bg-gradient-to-r from-[#FFD369] to-amber-300 bg-clip-text text-transparent">
            {currentPlan.price === 0 ? 'Free' : currentPlan.price}
          </div>
          {currentPlan.price !== 0 && (
            <p className="text-slate-400 mb-8">per {currentPlan.period}</p>
          )}
          
          <div className="bg-[#162844]/50 rounded-xl p-6 mb-8 border border-[#1E3A5F]/50">
            <div className="flex items-center justify-center mb-3">
              {currentPlan.tokenAllowance === -1 ? (
                <>
                  <div className="w-6 h-6 bg-gradient-to-r from-[#7A4FFF] to-purple-600 rounded-lg flex items-center justify-center mr-2">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-purple-300 font-medium">Unlimited tokens</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-2">
                    <Zap className="w-3 h-3 text-slate-900" />
                  </div>
                  <span className="text-white font-medium">{currentSubscription?.tokens || 0} tokens available</span>
                </>
              )}
            </div>
            {currentPlan.tokenAllowance > 0 && (
              <div className="text-sm text-slate-400 text-center">
                {currentPlan.tokenAllowance} tokens refresh daily
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-[#1E3A5F]/50 bg-[#162844]/30 text-[#7A4FFF] hover:bg-[#7A4FFF]/10 hover:text-white hover:border-[#7A4FFF]/50 transition-all duration-300 backdrop-blur-sm h-12"
                onClick={() => onNavigate?.("subscription")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Plan
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#7A4FFF] to-[#FFD369] hover:from-[#FFD369] hover:to-[#7A4FFF] text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                onClick={() => openSignupFlow()}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {currentPlan.price === 0 ? 'Upgrade Now' : 'Enhance Plan'}
                </span>
              </Button>
            </div>
            
            {/* Billing History Button - only show for paid subscribers */}
            {showBillingHistory && tier !== 'seeker' && (
              <Button 
                variant="outline" 
                className="w-full border-[#1E3A5F]/50 bg-[#162844]/30 text-slate-300 hover:bg-[#1E3A5F]/30 hover:text-white hover:border-[#7A4FFF]/50 transition-all duration-300 backdrop-blur-sm h-12"
                onClick={() => onNavigate?.("billing")}
              >
                <Activity className="w-4 h-4 mr-2" />
                View Billing History
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
