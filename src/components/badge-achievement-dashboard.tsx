import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge as BadgeComponent } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useBadges, Badge } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { 
  Trophy, 
  Star, 
  Lock, 
  Target,
  Award,
  Sparkles,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Heart,
  Zap,
  Gift,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface AchievementDashboardProps {
  onBack?: () => void;
}

export function BadgeAchievementDashboard({ onBack }: AchievementDashboardProps) {
  const { 
    badges, 
    totalWisdomPoints, 
    unlockedBadges, 
    progressBadges,
    getRecentAchievements,
    getUserWisdomSummary,
    getBadgesByCategory
  } = useBadges();
  
  const { addTokens } = useSubscription();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const recentAchievements = getRecentAchievements(7);
  const wisdomSummary = getUserWisdomSummary();
  
  // Calculate achievement statistics
  const achievementStats = useMemo(() => {
    const totalBadges = badges.length;
    const unlockedCount = unlockedBadges.length;
    const completionPercentage = Math.round((unlockedCount / totalBadges) * 100);
    
    const rarityStats = {
      common: unlockedBadges.filter(b => b.rarity === 'common').length,
      rare: unlockedBadges.filter(b => b.rarity === 'rare').length,
      epic: unlockedBadges.filter(b => b.rarity === 'epic').length,
      legendary: unlockedBadges.filter(b => b.rarity === 'legendary').length
    };
    
    const categoryStats = {
      faith: getBadgesByCategory('faith').filter(b => b.unlocked).length,
      wisdom: getBadgesByCategory('wisdom').filter(b => b.unlocked).length,
      community: getBadgesByCategory('community').filter(b => b.unlocked).length,
      journey: getBadgesByCategory('journey').filter(b => b.unlocked).length,
      special: getBadgesByCategory('special').filter(b => b.unlocked).length
    };
    
    return {
      totalBadges,
      unlockedCount,
      completionPercentage,
      rarityStats,
      categoryStats
    };
  }, [badges, unlockedBadges, getBadgesByCategory]);

  const rarityColors = {
    common: 'from-slate-500 to-slate-600',
    rare: 'from-blue-500 to-cyan-500', 
    epic: 'from-[#497EBC] to-[#3a6ba3]',
    legendary: 'from-[#FFD369] to-amber-600'
  };

  const categoryIcons = {
    faith: BookOpen,
    wisdom: Sparkles,
    community: Users,
    journey: Target,
    special: Award
  };

  const filteredBadges = useMemo(() => {
    const badgesToFilter = activeCategory === "all" ? badges : getBadgesByCategory(activeCategory);
    // Ensure unique badges by ID to prevent React key warnings
    const uniqueBadges = badgesToFilter.reduce((acc: Badge[], badge) => {
      if (!acc.find(b => b.id === badge.id)) {
        acc.push(badge);
      }
      return acc;
    }, []);
    return uniqueBadges;
  }, [activeCategory, badges, getBadgesByCategory]);

  const handleClaimAllRewards = () => {
    const unclaimedTokens = unlockedBadges.reduce((total, badge) => total + badge.tokenReward, 0);
    addTokens(unclaimedTokens);
    // In a real app, you'd mark these as claimed
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      {/* Enhanced Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(73,126,188,_0.18),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(201,168,130,_0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(255,_211,_105,_0.1),_transparent_50%)]" />
        
        {/* Enhanced multi-layer texture system */}
        <div 
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(73, 126, 188, 0.2) 2px,
                rgba(73, 126, 188, 0.2) 4px
              )
            `
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.1] mix-blend-soft-light"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(255, 211, 105, 0.15) 3px,
                rgba(255, 211, 105, 0.15) 6px
              )
            `
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 pt-6">
        {/* Enhanced Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD369] drop-shadow-[0_0_12px_rgba(255,211,105,0.6)]" />
            <h1 className="text-2xl sm:text-3xl bg-gradient-to-r from-[#497EBC] to-[#C9A882] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(73,126,188,0.5)]">
              Achievement Dashboard
            </h1>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto px-4">
            Track your spiritual journey and unlock meaningful achievements
          </p>
        </div>

        {/* Enhanced Achievement Overview */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/70 border-[#C9A882]/40 backdrop-blur-sm shadow-[0_8px_30px_rgba(73,126,188,0.3),0_4px_15px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl font-bold text-[#FFD369] mb-2 drop-shadow-[0_0_15px_rgba(255,211,105,0.5)]">
              {achievementStats.unlockedCount}/{achievementStats.totalBadges}
            </div>
            <div className="text-slate-200 text-sm mb-3 sm:mb-4">Achievements Unlocked</div>
            <Progress value={achievementStats.completionPercentage} className="w-full max-w-xs mx-auto mb-2" />
            <div className="text-[#497EBC] text-sm drop-shadow-[0_1px_4px_rgba(73,126,188,0.6)]">{achievementStats.completionPercentage}% Complete</div>
          </div>

          {/* Enhanced Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="text-center p-3 sm:p-4 bg-slate-700/50 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#497EBC]/20">
              <div className="text-lg sm:text-xl font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{totalWisdomPoints}</div>
              <div className="text-slate-300 text-xs">Wisdom Points</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-slate-700/50 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#497EBC]/20">
              <div className="text-lg sm:text-xl font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{recentAchievements.length}</div>
              <div className="text-slate-300 text-xs">This Week</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-slate-700/50 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#497EBC]/20">
              <div className="text-lg sm:text-xl font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{achievementStats.rarityStats.legendary}</div>
              <div className="text-slate-300 text-xs">Legendary</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-slate-700/50 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#497EBC]/20">
              <div className="text-lg sm:text-xl font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{Object.keys(achievementStats.categoryStats).length}</div>
              <div className="text-slate-300 text-xs">Categories</div>
            </div>
          </div>

          {/* Enhanced Claim Rewards Button */}
          {unlockedBadges.length > 0 && (
            <div className="text-center">
              <Button
                onClick={handleClaimAllRewards}
                className="bg-gradient-to-r from-[#FFD369] to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-0 text-sm sm:text-base w-full sm:w-auto shadow-[0_4px_20px_rgba(255,211,105,0.5),0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(255,211,105,0.7),0_10px_40px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-all duration-300"
              >
                <Gift className="w-4 h-4 mr-2 drop-shadow-lg" />
                <span className="truncate">Claim All Rewards ({unlockedBadges.reduce((total, badge) => total + badge.tokenReward, 0)} tokens)</span>
              </Button>
            </div>
          )}
        </Card>

        {/* Enhanced Recent Achievements */}
        {recentAchievements.length > 0 && (
          <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/70 border-[#C9A882]/40 backdrop-blur-sm shadow-[0_8px_30px_rgba(73,126,188,0.3),0_4px_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#FFD369] drop-shadow-[0_0_8px_rgba(255,211,105,0.6)]" />
              <h3 className="text-white text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Recent Achievements</h3>
            </div>
            <div className="space-y-3">
              {recentAchievements.slice(0, 3).map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#497EBC]/20"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.4)]`}>
                    {badge.icon && typeof badge.icon === 'function' ? 
                      React.createElement(badge.icon, {
                        className: "w-5 h-5 text-white"
                      }) :
                      <Star className="w-5 h-5 text-white" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{badge.name}</div>
                    <div className="text-slate-300 text-xs">{badge.description}</div>
                  </div>
                  <div className="text-[#FFD369] text-xs drop-shadow-[0_0_6px_rgba(255,211,105,0.5)]">
                    +{badge.tokenReward}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Enhanced Category Filter */}
        <div className="mb-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-slate-800/60 border-slate-700/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="faith" className="text-xs sm:text-sm">Faith</TabsTrigger>
              <TabsTrigger value="wisdom" className="text-xs sm:text-sm">Wisdom</TabsTrigger>
              <TabsTrigger value="community" className="text-xs sm:text-sm">Community</TabsTrigger>
              <TabsTrigger value="journey" className="text-xs sm:text-sm">Journey</TabsTrigger>
              <TabsTrigger value="special" className="text-xs sm:text-sm">Special</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className={`p-3 sm:p-4 ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-[#C9A882]/50 shadow-[0_6px_25px_rgba(73,126,188,0.3),0_4px_15px_rgba(0,0,0,0.4)]' 
                    : 'bg-slate-800/50 border-slate-600/40 shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
                } backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}>
                  
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0`}>
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${
                        badge.unlocked 
                          ? `bg-gradient-to-br ${rarityColors[badge.rarity]} shadow-[0_4px_15px_rgba(0,0,0,0.4)]` 
                          : 'bg-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                      } relative overflow-hidden`}>
                        {badge.unlocked && (
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />
                        )}
                        {badge.icon && typeof badge.icon === 'function' ? 
                          React.createElement(badge.icon, {
                            className: `w-5 h-5 sm:w-6 sm:h-6 ${
                              badge.unlocked ? 'text-white' : 'text-slate-400'
                            } relative z-10`
                          }) :
                          <Star className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            badge.unlocked ? 'text-white' : 'text-slate-400'
                          } relative z-10`} />
                        }
                        {!badge.unlocked && (
                          <Lock className="absolute w-3 h-3 sm:w-4 sm:h-4 text-slate-500 bottom-0 right-0 transform translate-x-1 translate-y-1" />
                        )}
                      </div>
                      
                      {badge.unlocked && badge.rarity === 'legendary' && (
                        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start sm:items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                        <h4 className={`text-xs sm:text-sm font-medium ${badge.unlocked ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : 'text-slate-400'} line-clamp-1`}>
                          {badge.name}
                        </h4>
                        <BadgeComponent className={`text-xs px-1.5 sm:px-2 py-0.5 bg-gradient-to-r ${rarityColors[badge.rarity]} text-white border-0 capitalize flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]`}>
                          {badge.rarity}
                        </BadgeComponent>
                      </div>
                      <p className={`text-xs ${badge.unlocked ? 'text-slate-200' : 'text-slate-500'} line-clamp-2`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar for Unlocked Badges */}
                  {!badge.unlocked && badge.requirements && (
                    <div className="mb-2 sm:mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400">Progress</span>
                        <span className="text-xs text-slate-400">
                          {badge.requirements.current || 0}/{badge.requirements.target}
                        </span>
                      </div>
                      <Progress 
                        value={((badge.requirements.current || 0) / Number(badge.requirements.target)) * 100} 
                        className="h-1.5 sm:h-2"
                      />
                    </div>
                  )}

                  {/* Enhanced Reward Info */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FFD369] flex-shrink-0 drop-shadow-[0_0_6px_rgba(255,211,105,0.5)]" />
                      <span className="text-slate-200">+{badge.tokenReward} tokens</span>
                    </div>
                    {badge.unlocked && (
                      <div className="text-green-400 flex-shrink-0 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">✓ Unlocked</div>
                    )}
                  </div>

                  {/* Enhanced Wisdom Gained */}
                  {badge.unlocked && badge.wisdomGained && badge.wisdomGained.length > 0 && (
                    <div className="mt-2 sm:mt-3 p-2 bg-slate-700/50 rounded text-xs text-slate-200 italic line-clamp-2 border border-[#C9A882]/20 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      "{badge.wisdomGained[0]}"
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Wisdom Summary */}
        <Card className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/70 border-[#C9A882]/40 backdrop-blur-sm shadow-[0_8px_30px_rgba(73,126,188,0.3),0_4px_15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 text-[#497EBC] drop-shadow-[0_0_8px_rgba(73,126,188,0.6)]" />
            <h3 className="text-white text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Your Spiritual Journey</h3>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{wisdomSummary}</p>
        </Card>

        {/* Enhanced Back Button */}
        {onBack && (
          <div className="text-center mt-6 sm:mt-8 mb-6">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#C9A882]/50 text-[#C9A882] hover:bg-[#497EBC]/20 hover:border-[#497EBC] w-full sm:w-auto shadow-[0_4px_15px_rgba(73,126,188,0.2)] hover:shadow-[0_6px_20px_rgba(73,126,188,0.4)] transition-all duration-300"
            >
              Back to Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}