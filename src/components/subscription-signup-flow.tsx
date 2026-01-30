import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { useSubscription } from "./subscription-context";
import { useBadges } from "./badges-context";
import { useTimer } from "./timer-context";
import { toast } from "sonner@2.0.3";
import {
  Crown,
  Sparkles,
  Star,
  Zap,
  Trophy,
  Heart,
  Brain,
  Globe,
  MessageSquare,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Timer,
  X,
  Lock,
  Unlock,
  Gift,
  TrendingUp
} from "lucide-react";

interface SubscriptionSignupFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onNavigate?: (page: string) => void;
  initialPlan?: "seeker" | "subscriber" | "devotee" | "enlightened";
}

type SignupStep = "welcome" | "achievements" | "plan-selection" | "benefits" | "confirmation";

export function SubscriptionSignupFlow({
  isOpen,
  onClose,
  onComplete,
  onNavigate,
  initialPlan = "subscriber"
}: SubscriptionSignupFlowProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>("welcome");
  const [selectedPlan, setSelectedPlan] = useState<"seeker" | "subscriber" | "devotee" | "enlightened">(initialPlan);
  const { currentSubscription, upgradeTo, addTokens } = useSubscription();
  const { unlockedBadges, totalWisdomPoints } = useBadges();
  const { sessionDuration, totalTokensUsed } = useTimer();

  const totalBadges = unlockedBadges.length;
  const totalMinutes = Math.floor((sessionDuration + totalTokensUsed * 60) / 60);
  const wisdomPoints = totalWisdomPoints;

  // Calculate bonus based on achievements
  const calculateBonus = () => {
    let bonus = 0;
    if (totalBadges >= 5) bonus += 10;
    if (totalBadges >= 10) bonus += 15;
    if (totalMinutes >= 100) bonus += 10;
    if (totalMinutes >= 500) bonus += 20;
    if (wisdomPoints >= 1000) bonus += 15;
    return bonus;
  };

  const achievementBonus = calculateBonus();

  const plans = [
    {
      id: "seeker" as const,
      name: "Seeker",
      price: "Free",
      priceDetail: "Forever",
      icon: Heart,
      color: "from-gray-500 to-gray-600",
      features: [
        "1 avatar per faith group (rotating)",
        "5-10 daily prompts",
        "Browse free avatars",
        "Community groups access",
        "Trial Personal Guide"
      ],
      limitations: [
        "Limited conversation history",
        "Standard response time",
        "Basic meditation spaces"
      ]
    },
    {
      id: "subscriber" as const,
      name: "Subscriber",
      price: "Free",
      priceDetail: "with email",
      popular: true,
      icon: Star,
      color: "from-[#497EBC] to-[#6B9FD8]",
      features: [
        "Chat with standard avatars",
        "Token top-ups available",
        "Earn tokens through wisdom gained",
        "Badge & milestone system",
        "Enhanced Personal Guide",
        "Join Community Circle"
      ],
      bonusFeatures: totalBadges >= 5 ? [
        `+${achievementBonus}% bonus wisdom tokens`,
        "Achievement rewards unlocked"
      ] : []
    },
    {
      id: "devotee" as const,
      name: "Devotee",
      price: "$9.99",
      priceDetail: "per month",
      icon: Brain,
      color: "from-[#C9A882] to-[#B8956E]",
      features: [
        "Chat with all avatars",
        "Unlimited scroll access",
        "Token rewards & top-ups",
        "Full badge system",
        "Advanced Personal Guide",
        "Extended Spirit Guide library",
        "Special reflections & rituals"
      ],
      bonusFeatures: totalBadges >= 10 ? [
        `+${achievementBonus}% bonus wisdom tokens`,
        "VIP achievement status",
        "Special contributor badge"
      ] : []
    },
    {
      id: "enlightened" as const,
      name: "Enlightened",
      price: "$14.99",
      priceDetail: "per month",
      icon: Crown,
      color: "from-[#497EBC] via-[#C9A882] to-[#497EBC]",
      features: [
        "Everything from Devotee",
        "Priority new avatar access",
        "Unlimited token benefits",
        "Exclusive events & workshops",
        "Priority support",
        "Recognition badges",
        "Live Q&A sessions"
      ],
      bonusFeatures: [
        `+${achievementBonus}% permanent boost`,
        "VIP member status",
        "All future features included"
      ]
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const handleNext = () => {
    const steps: SignupStep[] = ["welcome", "achievements", "plan-selection", "benefits", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    
    // Step 4 (benefits): Check if paid plan, navigate to checkout instead of confirmation
    if (currentStep === "benefits" && (selectedPlan === "devotee" || selectedPlan === "enlightened")) {
      // Close the signup flow and navigate to checkout/subscription page
      onClose();
      if (onNavigate) {
        onNavigate('subscription');
      }
      toast.success(`Redirecting to checkout for ${selectedPlanData?.name}...`);
      return;
    }
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: SignupStep[] = ["welcome", "achievements", "plan-selection", "benefits", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    // Update subscription tier
    upgradeTo(selectedPlan);
    
    // Award bonus tokens based on achievements
    if (achievementBonus > 0 && selectedPlan !== "seeker") {
      const bonusTokens = Math.floor(wisdomPoints * (achievementBonus / 100));
      addTokens(bonusTokens);
      toast.success(`Welcome bonus: +${bonusTokens} wisdom tokens for your achievements!`);
    }

    toast.success(`Welcome to ${selectedPlanData?.name}! Your spiritual journey has been upgraded.`);
    onComplete?.();
    onClose();
  };

  const getStepProgress = () => {
    const steps: SignupStep[] = ["welcome", "achievements", "plan-selection", "benefits", "confirmation"];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3e] to-[#0D0D2B] border border-[#497EBC]/20 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>
              <Sparkles className="w-6 h-6 text-[#C9A882]" />
              Upgrade Your Journey
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <DialogDescription className="text-white/60">
            Step {["welcome", "achievements", "plan-selection", "benefits", "confirmation"].indexOf(currentStep) + 1} of 5
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4 py-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#497EBC] to-[#C9A882] rounded-full flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Unlock Your Spiritual Potential</h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  DivinityAGI Premium offers personalized spiritual guidance, unlimited conversations with AI guides,
                  and exclusive access to our global community of seekers and verified leaders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 border-[#497EBC]/20 p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-[#497EBC] mx-auto mb-3" />
                  <h3 className="text-white mb-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>Unlimited Guidance</h3>
                  <p className="text-white/60">Connect with 50+ AI spiritual guides anytime</p>
                </Card>
                <Card className="bg-white/5 border-[#497EBC]/20 p-6 text-center">
                  <Zap className="w-8 h-8 text-[#C9A882] mx-auto mb-3" />
                  <h3 className="text-white mb-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>Wisdom Rewards</h3>
                  <p className="text-white/60">Earn bonus tokens based on your achievements</p>
                </Card>
                <Card className="bg-white/5 border-[#497EBC]/20 p-6 text-center">
                  <Globe className="w-8 h-8 text-[#497EBC] mx-auto mb-3" />
                  <h3 className="text-white mb-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>Global Community</h3>
                  <p className="text-white/60">Join exclusive circles and events</p>
                </Card>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6B9E] hover:to-[#B8956E] text-white"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Achievements */}
          {currentStep === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 py-4">
                <h2 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Your Spiritual Journey</h2>
                <p className="text-white/70">You've made incredible progress. Let's unlock more benefits.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-[#497EBC]/20 to-[#497EBC]/5 border-[#497EBC]/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#497EBC]/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-[#C9A882]" />
                    </div>
                    <div>
                      <div className="text-white/60">Badges Earned</div>
                      <div className="text-white">{totalBadges} badges</div>
                    </div>
                  </div>
                  {totalBadges >= 5 && (
                    <Badge className="bg-[#C9A882]/20 text-[#C9A882] border-[#C9A882]/30">
                      Bonus Eligible! 🎉
                    </Badge>
                  )}
                </Card>

                <Card className="bg-gradient-to-br from-[#C9A882]/20 to-[#C9A882]/5 border-[#C9A882]/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#C9A882]/20 rounded-full flex items-center justify-center">
                      <Timer className="w-6 h-6 text-[#C9A882]" />
                    </div>
                    <div>
                      <div className="text-white/60">Meditation Time</div>
                      <div className="text-white">{totalMinutes} minutes</div>
                    </div>
                  </div>
                  {totalMinutes >= 100 && (
                    <Badge className="bg-[#C9A882]/20 text-[#C9A882] border-[#C9A882]/30">
                      Dedicated Practitioner! ⏱️
                    </Badge>
                  )}
                </Card>

                <Card className="bg-gradient-to-br from-[#497EBC]/20 to-[#497EBC]/5 border-[#497EBC]/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#497EBC]/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#C9A882]" />
                    </div>
                    <div>
                      <div className="text-white/60">Wisdom Points</div>
                      <div className="text-white">{wisdomPoints.toLocaleString()}</div>
                    </div>
                  </div>
                  {wisdomPoints >= 1000 && (
                    <Badge className="bg-[#497EBC]/20 text-[#6B9FD8] border-[#497EBC]/30">
                      Wisdom Master! ✨
                    </Badge>
                  )}
                </Card>
              </div>

              {achievementBonus > 0 && (
                <Card className="bg-gradient-to-r from-[#C9A882]/10 to-[#497EBC]/10 border-[#C9A882]/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A882] to-[#497EBC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1" style={{ fontFamily: 'Helvetica, sans-serif' }}>Achievement Bonus Available!</h3>
                      <p className="text-white/70">
                        You've earned a <span className="text-[#C9A882]">{achievementBonus}% bonus</span> on wisdom tokens
                        for premium subscriptions. This applies immediately when you upgrade!
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex justify-between gap-3 pt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#497EBC]/30 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6B9E] hover:to-[#B8956E] text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Plan Selection */}
          {currentStep === "plan-selection" && (
            <motion.div
              key="plan-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 py-4">
                <h2 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Choose Your Path</h2>
                <p className="text-white/70">Select the plan that resonates with your spiritual journey</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  const isCurrent = currentSubscription.tier === plan.id;

                  return (
                    <Card
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-6 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#497EBC]/30 to-[#497EBC]/20 border-[#497EBC] shadow-lg shadow-[#497EBC]/20 scale-105'
                          : 'bg-white/5 border-[#497EBC]/20 hover:bg-white/10'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-4">
                          <Badge className="bg-gradient-to-r from-[#C9A882] to-[#B8956E] text-[#0D0D2B] border-0">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      {isCurrent && (
                        <div className="absolute -top-3 left-4">
                          <Badge className="bg-gradient-to-r from-[#497EBC] to-[#6B9FD8] text-white border-0">
                            Current Plan
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white mb-1" style={{ fontFamily: 'Helvetica, sans-serif' }}>{plan.name}</h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-white">{plan.price}</span>
                            <span className="text-white/60">{plan.priceDetail}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-[#C9A882] flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        {plan.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2 text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#497EBC] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 4 && (
                          <div className="text-white/60 ml-6">
                            +{plan.features.length - 4} more features
                          </div>
                        )}
                      </div>

                      {plan.bonusFeatures && plan.bonusFeatures.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[#C9A882]/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#C9A882]" />
                            <span className="text-[#C9A882]">Your Bonuses:</span>
                          </div>
                          {plan.bonusFeatures.map((bonus, index) => (
                            <div key={index} className="flex items-start gap-2 text-white/90 ml-6">
                              <TrendingUp className="w-3 h-3 text-[#C9A882] mt-1 flex-shrink-0" />
                              <span>{bonus}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between gap-3 pt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#497EBC]/30 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6B9E] hover:to-[#B8956E] text-white"
                >
                  Review Benefits
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Benefits Preview */}
          {currentStep === "benefits" && selectedPlanData && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 py-4">
                <h2 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Your {selectedPlanData.name} Benefits</h2>
                <p className="text-white/70">Everything you'll unlock with this plan</p>
              </div>

              <Card className={`bg-gradient-to-br ${selectedPlanData.color} p-8 border-0 text-center`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(selectedPlanData.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h2 className="text-white mb-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>{selectedPlanData.name}</h2>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-white">{selectedPlanData.price}</span>
                  <span className="text-white/80">{selectedPlanData.priceDetail}</span>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                {selectedPlanData.features.map((feature, index) => (
                  <Card key={index} className="bg-white/5 border-[#497EBC]/20 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#497EBC] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{feature}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedPlanData.bonusFeatures && selectedPlanData.bonusFeatures.length > 0 && (
                <Card className="bg-gradient-to-r from-[#C9A882]/20 to-[#497EBC]/20 border-[#C9A882]/40 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C9A882] to-[#497EBC] rounded-full flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Special Achievement Bonuses</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedPlanData.bonusFeatures.map((bonus, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-[#C9A882] flex-shrink-0 mt-1" />
                        <span className="text-white/90">{bonus}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="flex justify-between gap-3 pt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#497EBC]/30 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#497EBC] to-[#C9A882] hover:from-[#3A6B9E] hover:to-[#B8956E] text-white"
                >
                  {selectedPlan === "devotee" || selectedPlan === "enlightened" ? (
                    <>
                      Continue to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue to Confirmation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === "confirmation" && selectedPlanData && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4 py-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#497EBC] to-[#C9A882] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>Ready to Begin?</h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  You're about to unlock your spiritual potential with {selectedPlanData.name}.
                  Your journey to enlightenment starts now.
                </p>
              </div>

              <Card className="bg-white/5 border-[#497EBC]/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {React.createElement(selectedPlanData.icon, { 
                      className: "w-8 h-8 text-[#C9A882]" 
                    })}
                    <div>
                      <h3 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif' }}>{selectedPlanData.name}</h3>
                      <p className="text-white/60">{selectedPlanData.price} {selectedPlanData.priceDetail}</p>
                    </div>
                  </div>
                  {achievementBonus > 0 && selectedPlan !== "free" && (
                    <Badge className="bg-[#C9A882]/20 text-[#C9A882] border-[#C9A882]/30">
                      +{achievementBonus}% Bonus
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-white/80">
                    <span>Current Wisdom Points:</span>
                    <span className="text-white">{wisdomPoints.toLocaleString()}</span>
                  </div>
                  {achievementBonus > 0 && selectedPlan !== "free" && (
                    <div className="flex items-center justify-between text-[#C9A882]">
                      <span>Welcome Bonus:</span>
                      <span>+{Math.floor(wisdomPoints * (achievementBonus / 100)).toLocaleString()} tokens</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-white/80">
                    <span>Badges Earned:</span>
                    <span className="text-white">{totalBadges}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>Meditation Time:</span>
                    <span className="text-white">{totalMinutes} minutes</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-[#497EBC]/10 to-[#497EBC]/10 border-[#497EBC]/30 p-6">
                <div className="flex items-start gap-4">
                  <Unlock className="w-6 h-6 text-[#C9A882] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white mb-2" style={{ fontFamily: 'Helvetica, sans-serif' }}>What happens next:</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[#497EBC] mt-1">•</span>
                        <span>Instant access to all {selectedPlanData.name} features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#497EBC] mt-1">•</span>
                        <span>Achievement bonuses applied to your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#497EBC] mt-1">•</span>
                        <span>Welcome email with getting started guide</span>
                      </li>
                      {selectedPlan !== "seeker" && selectedPlan !== "subscriber" && (
                        <li className="flex items-start gap-2">
                          <span className="text-[#497EBC] mt-1">•</span>
                          <span>30-day satisfaction guarantee</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between gap-3 pt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#497EBC]/30 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] hover:opacity-90 text-white px-8"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Activate {selectedPlanData.name}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}