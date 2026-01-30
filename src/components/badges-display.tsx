import { useState } from "react";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge as BadgeComponent } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useBadges, Badge } from "./badges-context";
import { 
  Trophy, 
  Star, 
  Lock, 
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Filter
} from "lucide-react";

interface BadgesDisplayProps {
  compact?: boolean;
  showProgress?: boolean;
  maxItems?: number;
  category?: string;
}

const rarityColors = {
  common: "from-slate-400 to-slate-600",
  rare: "from-blue-400 to-blue-600", 
  epic: "from-teal-400 to-teal-600",
  legendary: "from-gold-400 to-yellow-600"
};

const rarityTextColors = {
  common: "text-slate-300",
  rare: "text-blue-300",
  epic: "text-teal-300", 
  legendary: "text-yellow-300"
};

export function BadgesDisplay({ 
  compact = false, 
  showProgress = true, 
  maxItems,
  category 
}: BadgesDisplayProps) {
  const { 
    badges, 
    unlockedBadges, 
    progressBadges, 
    getBadgesByCategory,
    totalWisdomPoints 
  } = useBadges();
  
  const [activeTab, setActiveTab] = useState<string>("unlocked");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getDisplayBadges = (type: 'unlocked' | 'progress') => {
    let targetBadges = type === 'unlocked' ? unlockedBadges : progressBadges;
    
    if (category) {
      targetBadges = getBadgesByCategory(category);
      if (type === 'unlocked') {
        targetBadges = targetBadges.filter(b => b.unlocked);
      } else {
        targetBadges = targetBadges.filter(b => !b.unlocked);
      }
    }

    if (selectedCategory !== 'all') {
      targetBadges = targetBadges.filter(b => b.category === selectedCategory);
    }

    if (maxItems) {
      targetBadges = targetBadges.slice(0, maxItems);
    }

    return targetBadges;
  };

  const getProgressPercentage = (badge: Badge): number => {
    if (badge.unlocked) return 100;
    
    const { requirements } = badge;
    
    if (requirements.type === 'session_count' || requirements.type === 'streak') {
      const current = requirements.current || 0;
      const target = requirements.target as number;
      return Math.min((current / target) * 100, 100);
    }
    
    if (requirements.type === 'faith_visit' && typeof requirements.target === 'number') {
      // This is for multi-faith badges
      const visitedCount = Object.values(badges).filter(b => 
        b.category === 'faith' && b.unlocked
      ).length;
      return Math.min((visitedCount / (requirements.target as number)) * 100, 100);
    }
    
    return 0;
  };

  // Badge category background images
  const getBadgeBackgroundImage = (badge: Badge): string => {
    if (badge.category === 'faith') {
      return 'https://images.unsplash.com/photo-1604913137600-31e385852fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycyUyMG5pZ2h0JTIwZ2FsYXh5fGVufDF8fHx8MTc2NDYwMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (badge.category === 'journey') {
      return 'https://images.unsplash.com/photo-1760907217241-3b9c169c6b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZmxhbWUlMjBlbmVyZ3l8ZW58MXx8fHwxNzY0NTgxMDU3fDA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (badge.category === 'wisdom') {
      return 'https://images.unsplash.com/photo-1665059691261-daa5bacdf826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXNkb20lMjBrbm93bGVkZ2UlMjBsaWdodHxlbnwxfHx8fDE3NjQ2OTU3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (badge.category === 'special') {
      return 'https://images.unsplash.com/photo-1675419065612-2c5962bc21b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWslMjBhY2hpZXZlbWVudHxlbnwxfHx8fDE3NjQ2ODk3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
    return 'https://images.unsplash.com/photo-1535117156854-d5c5243361a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBncm93dGglMjBsaWdodHxlbnwxfHx8fDE3NjQ2OTUzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080';
  };

  const BadgeCard = ({ badge, showProgressBar = false }: { badge: Badge; showProgressBar?: boolean }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group"
    >
      <Card className={`relative overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 ${
        compact ? 'h-auto' : 'h-52'
      } ${badge.unlocked ? 'hover:scale-[1.02]' : ''}`}>
        {/* Background Image - Only for unlocked badges in non-compact mode */}
        {!compact && badge.unlocked && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${getBadgeBackgroundImage(badge)})` }}
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              badge.rarity === 'legendary' 
                ? 'from-[#FFD369]/95 via-amber-600/90 to-orange-600/95'
                : badge.rarity === 'epic'
                ? 'from-[#497EBC]/95 via-teal-600/90 to-teal-800/95'
                : badge.rarity === 'rare'
                ? 'from-blue-600/95 via-cyan-600/90 to-teal-700/95'
                : 'from-slate-700/95 via-slate-800/90 to-slate-900/95'
            }`} />
          </>
        )}
        
        {/* Locked Badge Background */}
        {!compact && !badge.unlocked && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm" />
        )}
        
        {/* Compact Badge Background */}
        {compact && (
          <div className={`absolute inset-0 ${
            badge.unlocked 
              ? 'bg-gradient-to-br from-teal-900/40 to-gold-900/30' 
              : 'bg-slate-800/50'
          } backdrop-blur-sm`} />
        )}
        
        <div className={`relative z-10 p-5 h-full ${compact ? 'flex items-start space-x-3' : 'flex flex-col justify-between'}`}>
          {/* Top Section */}
          <div className={compact ? 'flex items-start space-x-3 flex-1' : 'flex items-start justify-between'}>
            {/* Badge Icon */}
            <div className={`relative ${compact ? 'w-8 h-8' : 'w-16 h-16'} flex-shrink-0`}>
              <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                !compact && badge.unlocked
                  ? 'bg-white/20 backdrop-blur-sm border-2 border-white/40 shadow-xl'
                  : badge.unlocked 
                  ? `bg-gradient-to-br ${rarityColors[badge.rarity]}` 
                  : 'bg-slate-600'
              } relative overflow-hidden ${compact ? 'rounded-full' : ''}`}>
                {badge.unlocked && compact && (
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />
                )}
                {badge.icon && typeof badge.icon === 'function' ? 
                  React.createElement(badge.icon, {
                    className: `${compact ? 'w-4 h-4' : 'w-8 h-8'} ${
                      badge.unlocked ? 'text-white' : 'text-slate-400'
                    } relative z-10`
                  }) :
                  <Star className={`${compact ? 'w-4 h-4' : 'w-8 h-8'} ${
                    badge.unlocked ? 'text-white' : 'text-slate-400'
                  } relative z-10`} />
                }
                {!badge.unlocked && (
                  <Lock className={`absolute ${compact ? 'w-3 h-3' : 'w-5 h-5'} text-slate-300 bottom-1 right-1`} />
                )}
              </div>
              
              {badge.unlocked && badge.rarity === 'legendary' && !compact && (
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white animate-pulse drop-shadow-lg" />
              )}
            </div>

            {/* Badge Rarity Badge (top right for non-compact) */}
            {!compact && badge.unlocked && (
              <BadgeComponent 
                variant="outline" 
                className="text-xs px-3 py-1 text-white/90 border-white/40 bg-white/10 backdrop-blur-sm font-medium uppercase tracking-wide"
              >
                {badge.rarity}
              </BadgeComponent>
            )}

            {/* Compact Badge Info */}
            {compact && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-white truncate">
                    {badge.name}
                  </h4>
                  {badge.unlocked && (
                    <BadgeComponent 
                      variant="outline" 
                      className={`text-xs px-2 py-0.5 ${rarityTextColors[badge.rarity]} border-current`}
                    >
                      {badge.rarity}
                    </BadgeComponent>
                  )}
                </div>
                
                <p className="text-xs text-slate-300 mb-2 line-clamp-2">
                  {badge.description}
                </p>

                {badge.unlocked && (
                  <div className="flex items-center text-xs text-gold-400">
                    <Award className="w-3 h-3 mr-1" />
                    <span>+{badge.tokenReward} tokens</span>
                    {badge.unlockedAt && (
                      <>
                        <span className="mx-2 text-slate-500">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-slate-400">
                          {new Date(badge.unlockedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {!badge.unlocked && showProgressBar && showProgress && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(getProgressPercentage(badge))}%</span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(badge)} 
                      className="h-1 bg-slate-700" 
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Section - Only for non-compact */}
          {!compact && (
            <div>
              <h4 className="text-[20px] font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                {badge.name}
              </h4>
              
              <p className="text-[13px] text-white/90 mb-3 line-clamp-2" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                {badge.description}
              </p>

              <div className="flex items-center justify-between">
                {badge.unlocked && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                      <Award className="w-3.5 h-3.5 mr-1.5" />
                      <span className="font-medium">+{badge.tokenReward} tokens</span>
                    </div>
                    {badge.unlockedAt && (
                      <div className="flex items-center text-xs text-white/70">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span>{new Date(badge.unlockedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {!badge.unlocked && showProgressBar && showProgress && (
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="font-bold">{Math.round(getProgressPercentage(badge))}%</span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(badge)} 
                      className="h-2 bg-white/20" 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );

  if (compact) {
    const displayBadges = getDisplayBadges('unlocked');
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-white">Recent Achievements</h3>
          <BadgeComponent variant="outline" className="text-xs text-teal-300 border-teal-400/30">
            {displayBadges.length} unlocked
          </BadgeComponent>
        </div>
        <div className="grid gap-3">
          {displayBadges.slice(0, 3).map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
        {displayBadges.length > 3 && (
          <Button variant="ghost" className="w-full text-teal-300 hover:text-white hover:bg-teal-600/20">
            View All Badges
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    );
  }

  const categories = ['all', 'faith', 'wisdom', 'journey', 'community', 'special'];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-teal-900/30 to-teal-800/20 border-teal-500/20">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-gold-400" />
            <div>
              <p className="text-sm text-slate-400">Total Badges</p>
              <p className="text-xl text-white">{unlockedBadges.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Wisdom Points</p>
              <p className="text-xl text-white">{totalWisdomPoints}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/20">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Token Rewards</p>
              <p className="text-xl text-white">
                {unlockedBadges.reduce((sum, badge) => sum + badge.tokenReward, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 capitalize ${
              selectedCategory === cat 
                ? 'bg-teal-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Badges Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger value="unlocked" className="data-[state=active]:bg-teal-600">
            Unlocked ({getDisplayBadges('unlocked').length})
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-teal-600">
            In Progress ({getDisplayBadges('progress').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unlocked" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {getDisplayBadges('unlocked').length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg text-slate-400 mb-2">No badges unlocked yet</h3>
                <p className="text-slate-500">Start your spiritual journey to earn your first badge!</p>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {getDisplayBadges('unlocked').map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {getDisplayBadges('progress').length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg text-slate-400 mb-2">All badges unlocked!</h3>
                <p className="text-slate-500">Congratulations on your spiritual achievements!</p>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {getDisplayBadges('progress').map(badge => (
                  <BadgeCard key={badge.id} badge={badge} showProgressBar={true} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}