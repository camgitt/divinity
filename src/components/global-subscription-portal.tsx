import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTimer } from "./timer-context";
import { useSubscription, SUBSCRIPTION_PLANS, type SubscriptionTier } from "./subscription-context";
import { 
  Crown, 
  Infinity, 
  Star, 
  Sparkles, 
  Zap, 
  Check, 
  X,
  Clock,
  MessageSquare,
  Users,
  Shield,
  Heart,
  Globe,
  Mail,
  Award
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface GlobalSubscriptionPortalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerContext?: 'low-tokens' | 'premium-feature' | 'manual' | 'upgrade-prompt' | 'token-purchase';
  onNavigate?: (tab: string) => void;
}

// Use the subscription plans from context with enhanced display properties
const getSubscriptionPlans = () => SUBSCRIPTION_PLANS.map(plan => ({
  ...plan,
  displayPrice: plan.price === 0 ? 'Free' : `${plan.price}/${plan.period}`,
  monthlyPrice: plan.price === 0 ? '$0' : `${plan.price}`,
  color: plan.id === 'seeker' ? 'from-slate-600 to-slate-800' :
         plan.id === 'subscriber' ? 'from-teal-600 to-[#497EBC]' :
         plan.id === 'devotee' ? 'from-[#497EBC] to-[#1e3a5a]' :
         'from-[#C9A882] to-[#B8976E]',
  icon: plan.id === 'seeker' ? <Heart className="w-6 h-6" /> :
        plan.id === 'subscriber' ? <Mail className="w-6 h-6" /> :
        plan.id === 'devotee' ? <Star className="w-6 h-6" /> :
        <Crown className="w-6 h-6" />,
  popular: plan.id === 'devotee'
}));

export function GlobalSubscriptionPortal({ isOpen, onClose, triggerContext = 'manual', onNavigate }: GlobalSubscriptionPortalProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>('devotee');
  const [isLoading, setIsLoading] = useState(false);
  const { currentSubscription, upgradeTo } = useSubscription();
  
  // Use tokens from subscription context
  const tokens = currentSubscription.tokens;
  
  const subscriptionPlans = getSubscriptionPlans();

  const handleSelectPlan = async (planId: SubscriptionTier) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    if (planId === 'subscriber') {
      // Navigate to Create Account registration form
      onClose();
      if (onNavigate) {
        onNavigate('registration');
      }
    } else if (planId === currentSubscription.tier) {
      toast.success("You're already on this plan!");
    } else if (planId === 'devotee' || planId === 'enlightened') {
      // For paid plans, navigate to subscription management/payment page
      onClose();
      if (onNavigate) {
        onNavigate('subscription');
      }
      toast.success(`Redirecting to checkout for ${subscriptionPlans.find(p => p.id === planId)?.name}...`);
    } else {
      // For seeker tier (free downgrade)
      upgradeTo(planId);
      toast.success(`Switched to ${subscriptionPlans.find(p => p.id === planId)?.name}`);
      onClose();
    }
  };

  const getContextualMessage = () => {
    switch (triggerContext) {
      case 'low-tokens':
        return {
          title: "Choose Your Spiritual Path",
          subtitle: "Select the plan that best supports your spiritual growth",
          highlight: `${tokens} minutes remaining`
        };
      case 'premium-feature':
        return {
          title: "Unlock Premium Features",
          subtitle: "Access advanced spiritual guidance and exclusive content",
          highlight: "Premium feature requested"
        };
      case 'upgrade-prompt':
        return {
          title: "Ready to deepen your journey?",
          subtitle: "Upgrade for unlimited access to spiritual wisdom",
          highlight: "Enhanced spiritual experience awaits"
        };
      default:
        return {
          title: "Choose Your Spiritual Path",
          subtitle: "Select the plan that best supports your spiritual growth",
          highlight: "Transform your spiritual practice"
        };
    }
  };

  const contextMessage = getContextualMessage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1e3a5a] via-[#0f1a2e] to-[#1a2d4a] border-[#C9A882]/30 text-white" style={{ fontFamily: "'Helvetica', sans-serif" }}>
        <DialogHeader className="text-center pb-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#497EBC]/20 via-[#C9A882]/20 to-[#497EBC]/20 blur-xl"></div>
            <motion.div 
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#C9A882]" />
            </motion.div>
          </div>
          
          <DialogTitle className="text-3xl mb-2 bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] bg-clip-text text-transparent" style={{ fontFamily: "'Butler', serif" }}>
            {contextMessage.title}
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-lg" style={{ fontFamily: "'Helvetica', sans-serif" }}>
            {contextMessage.subtitle}
          </DialogDescription>
          
          {contextMessage.highlight && (
            <Badge className="mx-auto mt-3 bg-gradient-to-r from-[#497EBC] to-[#3867a0] text-white border-none px-4 py-1">
              <Clock className="w-4 h-4 mr-2" />
              {contextMessage.highlight}
            </Badge>
          )}
        </DialogHeader>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#497EBC]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#C9A882]/5 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10">
          {/* Subscription Plans - Always show */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative overflow-hidden transition-all duration-300 cursor-pointer border-2 h-full ${
                    selectedPlan === plan.id 
                      ? 'border-[#C9A882] shadow-xl shadow-[#C9A882]/20' 
                      : 'border-slate-700 hover:border-[#497EBC]/50'
                  } ${plan.popular ? 'ring-2 ring-[#C9A882]/50' : ''} ${
                    currentSubscription.tier === plan.id ? 'border-green-400' : ''
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {/* Popular/Current badge */}
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-[#C9A882] to-[#B8976E] text-white border-none">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  {currentSubscription.tier === plan.id && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-green-500 text-white border-none">
                        <Check className="w-3 h-3 mr-1" />
                        Current
                      </Badge>
                    </div>
                  )}

                  {/* Plan gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10`}></div>
                  
                  <div className="relative p-4 flex flex-col h-full">
                    {/* Plan header */}
                    <div className="text-center mb-4">
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-lg mb-1" style={{ fontFamily: "'Helvetica', sans-serif" }}>{plan.name}</h3>
                      <div className="text-2xl mb-1">
                        <span className="bg-gradient-to-r from-[#C9A882] to-[#B8976E] bg-clip-text text-transparent" style={{ fontFamily: "'Butler', serif" }}>
                          {plan.displayPrice}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs" style={{ fontFamily: "'Helvetica', sans-serif" }}>{plan.description}</p>
                    </div>

                    {/* Key Features (first 3) */}
                    <div className="space-y-2 mb-4 flex-1">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-slate-300">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <div className="text-xs text-slate-400">
                          +{plan.features.length - 3} more features
                        </div>
                      )}
                    </div>

                    {/* Token allowance */}
                    <div className="bg-white/5 rounded p-2 mb-4">
                      <div className="text-xs text-center">
                        <span className="text-slate-400">Tokens: </span>
                        <span className="text-white font-medium">
                          {plan.tokenAllowance === -1 ? 'Unlimited' : `${plan.tokenAllowance}/day`}
                        </span>
                      </div>
                    </div>

                    {/* Select button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan.id);
                      }}
                      disabled={isLoading || currentSubscription.tier === plan.id}
                      className={`w-full text-sm ${
                        currentSubscription.tier === plan.id
                          ? 'bg-green-600 cursor-not-allowed'
                          : selectedPlan === plan.id
                          ? 'bg-gradient-to-r from-[#C9A882] to-[#B8976E] hover:from-[#B8976E] hover:to-[#C9A882] text-white'
                          : plan.popular
                          ? 'bg-gradient-to-r from-[#497EBC] to-[#3867a0] hover:from-[#3867a0] hover:to-[#497EBC] text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      } transition-all duration-300`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></div>
                          Processing...
                        </div>
                      ) : currentSubscription.tier === plan.id ? (
                        'Current Plan'
                      ) : plan.id === 'subscriber' ? (
                        <div className="flex items-center justify-center">
                          <Mail className="w-3 h-3 mr-1" />
                          Sign Up Free
                        </div>
                      ) : plan.id === 'seeker' ? (
                        'Switch to Guest'
                      ) : (
                        <div className="flex items-center justify-center">
                          <Crown className="w-3 h-3 mr-1" />
                          Continue to Checkout
                        </div>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <Users className="w-4 h-4 text-blue-400" />
              <span>50k+ Members</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Multi-Language</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
              <MessageSquare className="w-4 h-4 text-gold-400" />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* Close button */}
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-[#C9A882] hover:text-white hover:bg-[#497EBC]/10 backdrop-blur-sm"
              style={{ fontFamily: "'Helvetica', sans-serif" }}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}