import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import { useTimer } from "./timer-context";
import { useSubscription, SUBSCRIPTION_PLANS, type SubscriptionTier } from "./subscription-context";
import { 
  Crown, 
  Clock, 
  Infinity, 
  Star, 
  Users, 
  MessageCircle, 
  Shield, 
  Heart,
  Zap,
  Gift,
  History,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Headphones,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Mail,
  Award,
  Calendar,
  Receipt
} from "lucide-react";
import { AppFooter } from "./app-footer";

interface TokenPackage {
  id: string;
  tokens: number;
  bonus: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  description: string;
}

interface PurchaseHistory {
  id: string;
  type: "tokens" | "subscription";
  item: string;
  date: string;
  amount: number;
  tokens?: number;
  status: "completed" | "pending" | "failed";
}

interface SubscriptionSystemProps {
  onBack?: () => void;
  onOpenMission?: () => void;
  onNavigate?: (page: string) => void;
}

export function SubscriptionSystem({ onBack, onOpenMission, onNavigate }: SubscriptionSystemProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { currentTokens, freeTokensUsed, maxFreeTokens, purchaseTokens } = useTimer();
  const { 
    currentSubscription, 
    currentPlan, 
    upgradeTo, 
    addTokens, 
    getRemainingDailyTokens,
    hasFeatureAccess,
    openSignupFlow
  } = useSubscription();
  
  const tokenProgress = (currentSubscription.tokens / 100) * 100;
  const dailyTokensRemaining = getRemainingDailyTokens();

  const tokenPackages: TokenPackage[] = [
    {
      id: "starter",
      tokens: 100,
      bonus: 20,
      price: 4.99,
      description: "Perfect for occasional spiritual guidance"
    },
    {
      id: "popular",
      tokens: 250,
      bonus: 75,
      price: 9.99,
      originalPrice: 12.49,
      popular: true,
      description: "Most popular choice for regular seekers"
    },
    {
      id: "premium",
      tokens: 500,
      bonus: 200,
      price: 19.99,
      originalPrice: 24.99,
      description: "For deep spiritual exploration"
    },
    {
      id: "ultimate",
      tokens: 1000,
      bonus: 500,
      price: 34.99,
      originalPrice: 49.99,
      description: "Ultimate spiritual journey package"
    }
  ];

  // Get subscription plans with enhanced display info
  const subscriptionPlans = SUBSCRIPTION_PLANS.map(plan => ({
    ...plan,
    popular: plan.id === 'devotee',
    displayPrice: plan.price === 0 ? 'Free' : `${plan.price}`,
    ctaText: plan.id === 'seeker' ? 'Current Plan' : 
             plan.id === 'subscriber' ? 'Sign Up Free' : 
             'Upgrade Now'
  }));

  const purchaseHistory: PurchaseHistory[] = [
    {
      id: "1",
      type: "tokens",
      item: "250 + 75 Bonus Tokens",
      date: "2024-01-15",
      amount: 9.99,
      tokens: 325,
      status: "completed"
    },
    {
      id: "2",
      type: "subscription",
      item: "Devotee Monthly",
      date: "2024-01-01",
      amount: 19.99,
      status: "completed"
    },
    {
      id: "3",
      type: "tokens",
      item: "100 + 20 Bonus Tokens",
      date: "2023-12-20",
      amount: 4.99,
      tokens: 120,
      status: "completed"
    }
  ];

  const handlePurchaseTokens = (packageId: string) => {
    const tokenPackage = tokenPackages.find(p => p.id === packageId);
    if (tokenPackage) {
      addTokens(tokenPackage.tokens + tokenPackage.bonus);
      // Here you would integrate with your payment processor
      console.log(`Purchasing ${tokenPackage.tokens + tokenPackage.bonus} tokens for ${tokenPackage.price}`);
    }
  };

  const handleSubscribe = (tierId: SubscriptionTier) => {
    if (tierId === 'subscriber') {
      // Handle email signup for subscriber tier
      console.log('Opening email signup modal');
    } else {
      upgradeTo(tierId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] via-[#EFF1FF] to-[#F8F7FF] text-gray-900 pb-20">
      {/* Removed all background graphics */}

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 text-center relative">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-4 top-6 sm:top-8 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl mb-2 sm:mb-3 px-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              <span className="text-[#1e386e]">Spiritual</span>{' '}
              <span className="text-[#a79a4c]">Journey Tokens</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4" style={{ fontFamily: "Raleway, sans-serif" }}>
              Transparent. Simple. Meaningful.
            </p>
          </motion.div>

          {/* Token Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-3xl text-white border-0 overflow-hidden p-6 sm:p-8 max-w-md mx-auto mb-4 sm:mb-6" style={{
              background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
              boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#a79a4c] mr-2 sm:mr-3 drop-shadow-lg" />
                  <span className="text-xl sm:text-2xl text-white" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Your Sacred Balance</span>
                </div>
                
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  {currentSubscription.tokens}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mb-4 sm:mb-6" style={{ fontFamily: "Raleway, sans-serif" }}>tokens = minutes of divine guidance</p>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-white">
                      <span>Current Plan</span>
                      <Badge variant="outline" className="border-[#497EBC]/50 text-[#FFD369] bg-[#497EBC]/10">
                        {currentPlan.name}
                      </Badge>
                    </div>
                    
                    {dailyTokensRemaining !== -1 && (
                      <>
                        <div className="flex justify-between text-xs sm:text-sm text-white">
                          <span>Daily Remaining</span>
                          <span>{dailyTokensRemaining}</span>
                        </div>
                        <Progress value={(dailyTokensRemaining / currentPlan.tokenAllowance) * 100} className="h-2 sm:h-3 bg-white/10" />
                      </>
                    )}
                    
                    {dailyTokensRemaining === -1 && (
                      <div className="flex items-center justify-center text-xs sm:text-sm text-[#FFD369]">
                        <Infinity className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Unlimited Sacred Access
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => openSignupFlow()}
                    className="w-full bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white mt-2 sm:mt-3 h-10 sm:h-11"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade Your Journey
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

      {/* Tabs Navigation */}
      <div className="px-4 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/90 border border-[#1e386e]/20 shadow-md p-1 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="text-xs text-gray-600 data-[state=active]:bg-[#1e386e] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="tokens" 
              className="text-xs text-gray-600 data-[state=active]:bg-[#1e386e] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Tokens
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="text-xs text-gray-600 data-[state=active]:bg-[#1e386e] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Plans
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="text-xs text-gray-600 data-[state=active]:bg-[#1e386e] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 rounded-lg"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Value Proposition */}
            <Card className="rounded-3xl text-white border-0 overflow-hidden p-6 sm:p-8" style={{
              background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
              boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <h3 className="text-lg sm:text-xl text-white mb-4 sm:mb-6 text-center" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Why Choose Premium?</h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#a79a4c] mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
                  <p className="text-xs sm:text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>100+ Diverse AI Guides</p>
                </div>
                <div className="text-center">
                  <Infinity className="w-8 h-8 sm:w-10 sm:h-10 text-[#a79a4c] mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
                  <p className="text-xs sm:text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>Unlimited Chat Time</p>
                </div>
                <div className="text-center">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#a79a4c] mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
                  <p className="text-xs sm:text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>Exclusive Reflections</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#a79a4c] mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
                  <p className="text-xs sm:text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>Ad-Free Experience</p>
                </div>
              </div>

              <Separator className="bg-white/30 my-4 sm:my-6" />

              <div className="text-center">
                <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {currentPlan.description}
                </p>
                <Badge variant="outline" className="border-[#a79a4c]/50 text-[#a79a4c] bg-[#a79a4c]/10">
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Generous Free Tier
                </Badge>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => setActiveTab("tokens")}
                className="rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden h-auto py-5 sm:py-6 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
                  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div className="text-center">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-[#a79a4c] drop-shadow-lg" />
                  <div className="text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Buy Tokens</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab("subscriptions")}
                className="rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden h-auto py-5 sm:py-6 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
                  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div className="text-center">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-[#a79a4c] drop-shadow-lg" />
                  <div className="text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Go Premium</div>
                </div>
              </button>
            </div>
          </TabsContent>

          {/* Token Packages Tab */}
          <TabsContent value="tokens" className="mt-6 space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl text-gray-900 mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Sacred Token Packages</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>One token = one minute of divine guidance</p>
            </div>

            {tokenPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-3xl text-white border-0 overflow-hidden p-6 transition-all duration-300" style={{
                  background: '#182238',
                  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
                }}>
                  {pkg.popular && (
                    <Badge className="mb-4 bg-[#a79a4c] text-white">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg text-white mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        {pkg.tokens} + {pkg.bonus} Bonus
                      </h4>
                      <p className="text-slate-300 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>{pkg.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>${pkg.price}</div>
                      {pkg.originalPrice && (
                        <div className="text-sm text-slate-400 line-through" style={{ fontFamily: "Raleway, sans-serif" }}>
                          ${pkg.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>
                      Total: {pkg.tokens + pkg.bonus} tokens
                    </div>
                    
                    <Button
                      onClick={() => handlePurchaseTokens(pkg.id)}
                      className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white"
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                    >
                      Purchase
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Subscription Plans Tab */}
          <TabsContent value="subscriptions" className="mt-6 space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Subscription Plans</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>Choose your spiritual journey level</p>
            </div>

            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-3xl text-white border-0 overflow-hidden p-6 transition-all duration-300" style={{
                  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
                  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
                }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {plan.popular && (
                        <Badge className="mb-2 bg-[#a79a4c] text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {currentSubscription.tier === plan.id && (
                        <Badge className="mb-2 bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Current Plan
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        {plan.displayPrice}
                        {plan.price > 0 && <span className="text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>/{plan.period}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xl text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{plan.name}</h4>
                    <p className="text-slate-300 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-white">
                        <CheckCircle className="w-4 h-4 text-[#a79a4c] mr-3 flex-shrink-0" />
                        <span className="text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    {/* Token Allowance Display */}
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm text-white">
                        <span style={{ fontFamily: "Raleway, sans-serif" }}>Token Allowance:</span>
                        <span className="font-medium text-[#a79a4c]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                          {plan.tokenAllowance === -1 ? 'Unlimited' : `${plan.tokenAllowance} daily`}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={currentSubscription.tier === plan.id}
                      className={`w-full ${ currentSubscription.tier === plan.id
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c]'
                      } text-white transition-colors`}
                      style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                    >
                      {plan.id === 'subscriber' && (
                        <Mail className="w-4 h-4 mr-2" />
                      )}
                      {currentSubscription.tier === plan.id ? 'Current Plan' : plan.ctaText}
                      {currentSubscription.tier !== plan.id && <ChevronRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            {/* Tier Benefits Comparison */}
            <Card className="rounded-3xl text-white border-0 overflow-hidden p-6 mt-8" style={{
              background: '#182238',
              boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <h4 className="text-lg text-white mb-4 text-center" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Feature Comparison</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-slate-300">
                    <Users className="w-4 h-4 text-[#a79a4c] mr-2" />
                    <span style={{ fontFamily: "Raleway, sans-serif" }}>Avatar Access: {currentPlan.avatarAccess}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <BookOpen className="w-4 h-4 text-[#a79a4c] mr-2" />
                    <span style={{ fontFamily: "Raleway, sans-serif" }}>Personal Guide: {currentPlan.personalGuide}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-slate-300">
                    <Globe className="w-4 h-4 text-[#a79a4c] mr-2" />
                    <span style={{ fontFamily: "Raleway, sans-serif" }}>Community: {currentPlan.communityAccess}</span>
                  </div>
                  {currentPlan.prioritySupport && (
                    <div className="flex items-center text-slate-300">
                      <Headphones className="w-4 h-4 text-[#a79a4c] mr-2" />
                      <span style={{ fontFamily: "Raleway, sans-serif" }}>Priority Support</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Purchase History Tab */}
          <TabsContent value="history" className="mt-6 space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Purchase History</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>Track your spiritual investments</p>
            </div>

            {purchaseHistory.map((purchase, index) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-3xl text-white border-0 overflow-hidden p-4" style={{
                  background: '#182238',
                  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        purchase.type === 'tokens' 
                          ? 'bg-[#a79a4c]/20 text-[#a79a4c]' 
                          : 'bg-[#1e386e]/20 text-[#1e386e]'
                      }`}>
                        {purchase.type === 'tokens' ? <Zap className="w-5 h-5" /> : <Crown className="w-5 h-5" />}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>{purchase.item}</h4>
                        <p className="text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>{purchase.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>${purchase.amount}</div>
                      <Badge 
                        variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                        className={`text-xs ${
                          purchase.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400 border-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-400'
                        }`}
                      >
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {purchase.tokens && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <p className="text-sm text-slate-300" style={{ fontFamily: "Raleway, sans-serif" }}>
                        Added {purchase.tokens} tokens to your balance
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
            
            {purchaseHistory.length === 0 && (
              <Card className="rounded-3xl text-white border-0 overflow-hidden p-8 text-center" style={{
                background: '#182238',
                boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
              }}>
                <History className="w-12 h-12 text-[#a79a4c] mx-auto mb-4" />
                <h4 className="text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>No Purchase History</h4>
                <p className="text-slate-300 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Your purchases and subscriptions will appear here
                </p>
              </Card>
            )}
            
            {/* View Full Billing History Button */}
            {purchaseHistory.length > 0 && onNavigate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Button
                  onClick={() => onNavigate('billing')}
                  className="w-full bg-[#1e386e] hover:bg-[#2a4a8e] border-2 border-[#1e386e] text-white"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  View Full Billing History
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    </div>
  );
}