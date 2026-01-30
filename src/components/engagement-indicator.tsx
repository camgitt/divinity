import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useEngagement } from "./engagement-tracker";
import { useSubscription } from "./subscription-context";
import { Zap, TrendingUp, Clock, Activity } from "lucide-react";

interface EngagementIndicatorProps {
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

/**
 * Visual indicator showing real-time token earning progress
 * Shows in chat interface to encourage continued engagement
 */
export function EngagementIndicator({ variant = "compact", className = "" }: EngagementIndicatorProps) {
  const { 
    isEngaged, 
    engagementDuration, 
    tokensEarnedThisSession, 
    getEngagementStats 
  } = useEngagement();
  const { tier } = useSubscription();

  const stats = getEngagementStats();
  const progressToNextToken = ((stats.nextTokenIn > 0 ? (1 / stats.earningRate * 60 - stats.nextTokenIn) : 0) / (1 / stats.earningRate * 60)) * 100;

  if (variant === "minimal") {
    return (
      <AnimatePresence>
        {isEngaged && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 ${className}`}
          >
            <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Active</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1.5 rounded-full border border-yellow-500/30">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-sm text-yellow-400">+{tokensEarnedThisSession}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (variant === "compact") {
    return (
      <AnimatePresence>
        {isEngaged && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={className}
          >
            <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30 backdrop-blur-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-sm text-white/90">Earning Tokens</span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Zap className="w-3 h-3 mr-1" />
                  +{tokensEarnedThisSession}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Next token in {Math.floor(stats.nextTokenIn / 60)}:{(stats.nextTokenIn % 60).toString().padStart(2, '0')}</span>
                  <span>{Math.round(progressToNextToken)}%</span>
                </div>
                <Progress 
                  value={progressToNextToken} 
                  className="h-1.5 bg-slate-700"
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{stats.totalEngagementMinutes}m active</span>
                </div>
                <span className="text-purple-300">{stats.earningRate.toFixed(2)} tokens/min</span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Full variant
  return (
    <AnimatePresence>
      {isEngaged && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={className}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse" />
                  <div className="relative w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white">Active Engagement</h3>
                  <p className="text-sm text-white/60">Keep chatting to earn more tokens</p>
                </div>
              </div>
              
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                +{tokensEarnedThisSession} Earned
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Progress to next token */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-white/80">Next Token Progress</span>
                  <span className="text-purple-300">{Math.round(progressToNextToken)}%</span>
                </div>
                <Progress 
                  value={progressToNextToken} 
                  className="h-2 bg-slate-700"
                />
                <p className="text-xs text-white/60 mt-1">
                  {Math.floor(stats.nextTokenIn / 60)}:{(stats.nextTokenIn % 60).toString().padStart(2, '0')} until next token
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-lg text-white">{stats.totalEngagementMinutes}</div>
                  <p className="text-xs text-white/60">Minutes</p>
                </div>
                
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-lg text-white">{tokensEarnedThisSession}</div>
                  <p className="text-xs text-white/60">Earned</p>
                </div>
                
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-lg text-white">{stats.earningRate.toFixed(2)}</div>
                  <p className="text-xs text-white/60">Rate/min</p>
                </div>
              </div>

              {/* Tier info */}
              <div className="text-center pt-3 border-t border-white/10">
                <p className="text-xs text-white/60">
                  <span className="text-purple-300 capitalize">{tier}</span> tier earning rate
                  {tier !== 'enlightened' && (
                    <span className="text-white/40"> • Upgrade for faster earning</span>
                  )}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
