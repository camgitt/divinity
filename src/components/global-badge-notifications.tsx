import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge as BadgeComponent } from "./ui/badge";
import { Button } from "./ui/button";
import { useBadges, Badge } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useSound } from "./sound-context";
import { useHapticFeedback } from "./hooks/use-haptic";
import { 
  X, 
  Sparkles, 
  Trophy, 
  Star, 
  Coins,
  ChevronRight,
  Gift
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BadgeNotification extends Badge {
  showNotification?: boolean;
}

export function GlobalBadgeNotifications() {
  const { badges, totalWisdomPoints, getRecentAchievements } = useBadges();
  const { addTokens } = useSubscription();
  const { playSound } = useSound();
  const haptic = useHapticFeedback();
  const [notifications, setNotifications] = useState<BadgeNotification[]>([]);
  const [previousBadgeCount, setPreviousBadgeCount] = useState(0);

  // Monitor for new badges and show notifications
  useEffect(() => {
    const unlockedBadges = badges.filter(b => b.unlocked);
    
    if (unlockedBadges.length > previousBadgeCount && previousBadgeCount > 0) {
      // New badge(s) were unlocked
      const newBadges = unlockedBadges.slice(previousBadgeCount);
      
      newBadges.forEach((badge, index) => {
        setTimeout(() => {
          setNotifications(prev => [...prev, { ...badge, showNotification: true }]);
          // Play badge unlock sound
          playSound('badge', 0.4);
          // Trigger success haptic pattern
          haptic.success();
        }, index * 500); // Stagger notifications
      });
    }
    
    setPreviousBadgeCount(unlockedBadges.length);
  }, [badges, previousBadgeCount, playSound]);

  // Auto-dismiss notifications after 8 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const dismissNotification = (badgeId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== badgeId));
  };

  const handleClaimReward = (badge: Badge) => {
    // Play success sound
    playSound('success', 0.3);
    
    // Add tokens to subscription context
    addTokens(badge.tokenReward);
    
    toast.success(`Claimed ${badge.tokenReward} wisdom tokens!`, {
      description: `Total tokens: ${totalWisdomPoints + badge.tokenReward}`
    });
    
    dismissNotification(badge.id);
  };

  const rarityColors = {
    common: 'from-slate-500 to-slate-600',
    rare: 'from-blue-500 to-blue-600', 
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 to-yellow-600'
  };

  const rarityGlow = {
    common: 'shadow-slate-500/20',
    rare: 'shadow-blue-500/30',
    epic: 'shadow-purple-500/40', 
    legendary: 'shadow-yellow-500/50'
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="pointer-events-auto"
          >
            <Card className={`
              relative overflow-hidden bg-gradient-to-br from-slate-800/95 to-slate-900/95 
              border-purple-500/30 backdrop-blur-sm max-w-sm
              ${rarityGlow[badge.rarity]} shadow-2xl
            `}>
              {/* Rarity glow effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r ${rarityColors[badge.rarity]} 
                opacity-10 pointer-events-none
              `} />
              
              {/* Sparkle animation for legendary badges */}
              {badge.rarity === 'legendary' && (
                <div className="absolute inset-0 pointer-events-none">
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-400 animate-pulse" />
                  <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-yellow-400 animate-pulse delay-500" />
                </div>
              )}
              
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#FFD369]" />
                    <span className="text-[#FFD369] text-sm font-semibold">Badge Unlocked!</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(badge.id)}
                    className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Badge Info */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center 
                      bg-gradient-to-br ${rarityColors[badge.rarity]} relative overflow-hidden
                    `}>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />
                      {badge.icon && typeof badge.icon === 'function' ? 
                        React.createElement(badge.icon, {
                          className: "w-6 h-6 text-white relative z-10"
                        }) :
                        <Star className="w-6 h-6 text-white relative z-10" />
                      }
                    </div>
                    {badge.rarity === 'legendary' && (
                      <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{badge.name}</h4>
                      <BadgeComponent className={`
                        text-xs px-2 py-0.5 bg-gradient-to-r ${rarityColors[badge.rarity]} 
                        text-white border-0 capitalize
                      `}>
                        {badge.rarity}
                      </BadgeComponent>
                    </div>
                    <p className="text-slate-300 text-sm">{badge.description}</p>
                  </div>
                </div>

                {/* Wisdom Gained */}
                {badge.wisdomGained && badge.wisdomGained.length > 0 && (
                  <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#7A4FFF]" />
                      <span className="text-sm text-[#7A4FFF] font-medium">Wisdom Gained</span>
                    </div>
                    <p className="text-slate-300 text-xs italic">
                      "{badge.wisdomGained[0]}"
                    </p>
                  </div>
                )}

                {/* Reward Section */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#7A4FFF]/20 to-purple-700/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#FFD369]" />
                    <span className="text-white text-sm">
                      +{badge.tokenReward} Wisdom Tokens
                    </span>
                  </div>
                  <Button
                    onClick={() => handleClaimReward(badge)}
                    className="bg-gradient-to-r from-[#7A4FFF] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 text-xs px-3 py-1 h-auto"
                  >
                    <Gift className="w-3 h-3 mr-1" />
                    Claim
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Achievement Summary Component for Profile/Dashboard
export function AchievementSummary() {
  const { 
    badges, 
    totalWisdomPoints, 
    unlockedBadges, 
    progressBadges,
    getRecentAchievements,
    getUserWisdomSummary 
  } = useBadges();

  const recentAchievements = getRecentAchievements(7);
  const wisdomSummary = getUserWisdomSummary();
  
  const rarityStats = {
    common: unlockedBadges.filter(b => b.rarity === 'common').length,
    rare: unlockedBadges.filter(b => b.rarity === 'rare').length,
    epic: unlockedBadges.filter(b => b.rarity === 'epic').length,
    legendary: unlockedBadges.filter(b => b.rarity === 'legendary').length
  };

  const completionPercentage = Math.round((unlockedBadges.length / badges.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
            boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
          <div className="p-4 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD369] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{unlockedBadges.length}</div>
              <div className="text-slate-300 text-sm">Badges Earned</div>
            </div>
          </div>
        </Card>
        
        <Card 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
            boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
          <div className="p-4 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#497EBC] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{totalWisdomPoints}</div>
              <div className="text-slate-300 text-sm">Wisdom Points</div>
            </div>
          </div>
        </Card>
        
        <Card 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
            boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
          <div className="p-4 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{completionPercentage}%</div>
              <div className="text-slate-300 text-sm">Completion</div>
            </div>
          </div>
        </Card>
        
        <Card 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
            boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
          <div className="p-4 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{recentAchievements.length}</div>
              <div className="text-slate-300 text-sm">This Week</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Rarity Breakdown */}
      <Card 
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
          boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
        <div className="p-6 relative z-10">
          <h3 className="text-white mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Badge Collection</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(rarityStats).map(([rarity, count]) => (
              <div key={rarity} className="text-center">
                <div className="text-lg font-semibold text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{count}</div>
                <div className="text-slate-300 text-sm capitalize">{rarity}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Wisdom Summary */}
      <Card 
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
          boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#497EBC] drop-shadow-[0_2px_4px_rgba(73,126,188,0.5)]" />
            <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Your Spiritual Journey</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{wisdomSummary}</p>
        </div>
      </Card>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card 
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
            boxShadow: '0 0 0 2px #C9A882, 0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
          <div className="p-6 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#FFD369] drop-shadow-[0_2px_4px_rgba(255,211,105,0.5)]" />
              <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Recent Achievements</h3>
            </div>
            <div className="space-y-3">
              {recentAchievements.slice(0, 3).map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#497EBC] to-teal-700 flex items-center justify-center">
                    {badge.icon && typeof badge.icon === 'function' ? 
                      React.createElement(badge.icon, {
                        className: "w-5 h-5 text-white"
                      }) :
                      <Star className="w-5 h-5 text-white" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{badge.name}</div>
                    <div className="text-slate-400 text-xs">{badge.description}</div>
                  </div>
                  <div className="text-[#FFD369] text-xs">
                    +{badge.tokenReward} tokens
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}