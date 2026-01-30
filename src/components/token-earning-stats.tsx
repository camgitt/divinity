import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useTimer } from "./timer-context";
import { useSubscription } from "./subscription-context";
import { 
  TrendingUp, 
  Zap, 
  Award, 
  Clock,
  Target,
  ChevronRight,
  Crown
} from "lucide-react";

interface TokenEarningStatsProps {
  onUpgrade?: () => void;
  className?: string;
}

/**
 * Dashboard widget showing token earning statistics and achievements
 * Display in user profile or stats page
 */
export function TokenEarningStats({ onUpgrade, className = "" }: TokenEarningStatsProps) {
  const { currentTokens, totalTokensEarned } = useTimer();
  const { tier, openPortal } = useSubscription();

  // Calculate potential earnings with upgrade
  const earningMultipliers = {
    seeker: 1,
    subscriber: 2,
    devotee: 3.3,
    enlightened: 5
  };

  const currentMultiplier = earningMultipliers[tier];
  const nextTier = tier === 'seeker' ? 'subscriber' : tier === 'subscriber' ? 'devotee' : tier === 'devotee' ? 'enlightened' : null;
  const nextMultiplier = nextTier ? earningMultipliers[nextTier] : null;

  // Achievement milestones
  const milestones = [
    { tokens: 10, label: "First Steps", icon: "🌱" },
    { tokens: 50, label: "Dedicated Seeker", icon: "⭐" },
    { tokens: 100, label: "Wise One", icon: "🌟" },
    { tokens: 500, label: "Enlightened Path", icon: "✨" },
    { tokens: 1000, label: "Master Teacher", icon: "👑" }
  ];

  const currentMilestone = milestones.reduce((acc, milestone) => {
    return totalTokensEarned >= milestone.tokens ? milestone : acc;
  }, milestones[0]);

  const nextMilestone = milestones.find(m => m.tokens > totalTokensEarned) || milestones[milestones.length - 1];
  const progressToNextMilestone = nextMilestone ? (totalTokensEarned / nextMilestone.tokens) * 100 : 100;

  return (
    <Card className={`bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20 backdrop-blur-sm overflow-hidden ${className}`}>
      {/* Header with cosmic glow */}
      <div className="relative p-6 border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-white">Token Earnings</h3>
              <p className="text-sm text-white/60">Your engagement rewards</p>
            </div>
          </div>
          
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
            <span className="capitalize">{tier}</span>
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Total Earned</span>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-3xl text-white mb-1">{totalTokensEarned}</div>
            <p className="text-xs text-green-400">+{Math.floor(totalTokensEarned * 0.15)} this week</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Current Balance</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl text-white mb-1">{currentTokens}</div>
            <p className="text-xs text-blue-400">Available now</p>
          </motion.div>
        </div>

        {/* Achievement Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-white">Next Milestone</span>
            </div>
            <span className="text-sm text-purple-300">
              {currentMilestone.icon} {currentMilestone.label}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{nextMilestone.label}</span>
              <span className="text-purple-300">{totalTokensEarned} / {nextMilestone.tokens}</span>
            </div>
            <Progress 
              value={progressToNextMilestone} 
              className="h-3 bg-slate-700"
            />
            <p className="text-xs text-white/50 text-center">
              {nextMilestone.tokens - totalTokensEarned} tokens until {nextMilestone.icon}
            </p>
          </div>
        </div>

        {/* Earning Rate */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white">Earning Rate</span>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {currentMultiplier}x
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Your rate</span>
              <span className="text-blue-400">
                {tier === 'seeker' && '1 token per 10 min'}
                {tier === 'subscriber' && '1 token per 5 min'}
                {tier === 'devotee' && '1 token per 3 min'}
                {tier === 'enlightened' && '1 token per 2 min'}
              </span>
            </div>
            
            {nextTier && nextMultiplier && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">With {nextTier}</span>
                <span className="text-purple-300">
                  {nextTier === 'subscriber' && '1 token per 5 min'}
                  {nextTier === 'devotee' && '1 token per 3 min'}
                  {nextTier === 'enlightened' && '1 token per 2 min'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Prompt */}
        {tier !== 'enlightened' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 rounded-xl p-4 border border-amber-500/30"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">Earn Tokens Faster</h4>
                <p className="text-sm text-white/70">
                  Upgrade to earn tokens {nextMultiplier ? `${(nextMultiplier / currentMultiplier).toFixed(1)}x` : '2x'} faster with enhanced engagement rewards
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => onUpgrade ? onUpgrade() : openPortal('upgrade-prompt')}
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
            >
              <span>Upgrade to {nextTier}</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* All Milestones */}
        <div>
          <h4 className="text-white/80 text-sm mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Achievement Milestones
          </h4>
          <div className="space-y-2">
            {milestones.map((milestone) => {
              const achieved = totalTokensEarned >= milestone.tokens;
              return (
                <div
                  key={milestone.tokens}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    achieved
                      ? 'bg-purple-900/30 border-purple-500/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{milestone.icon}</span>
                    <div>
                      <p className="text-white text-sm">{milestone.label}</p>
                      <p className="text-xs text-white/50">{milestone.tokens} tokens</p>
                    </div>
                  </div>
                  {achieved && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Unlocked
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
