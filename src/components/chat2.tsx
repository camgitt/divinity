import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EditGuideModal } from "./edit-guide-modal";
import { toast } from "sonner@2.0.3";
import { useSavedGuides } from "./saved-guides-context";
import { useCreatedGuide } from "./created-guide-context";
import { getFaithSymbol } from "./faith-symbols-config";
import { useMeditation } from "./meditation-context";
import { useSound } from "./sound-context";
import { getGuideChatUrl, validateGuideChatUrl, getFallbackChatUrlByFaith, getGuideChatUrlById } from "./guide-chat-url-mapping";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useCrisisSupport } from "./crisis-support-context";
import { guides as guideDatabase } from "./guide-matching-data";
import { generateGuideSummary, getAgeDisplay, condenseDescription } from "./guide-description-utils";
import { AppFooter } from "./app-footer";
import { GuideSlider } from "./guide-card-slider";
import { GettingStartedSection } from "./getting-started-section";
import guideBg from "figma:asset/936069199d8bf088e4dae0072f3271aa27baad55.png";
import chat2Background from "figma:asset/544c9e2d2ed2480aa4ccd42f2793d101bf048610.png";
import spiritGuidesHeaderBg from "figma:asset/1847734abe7a49bcd8e8b157e708c728b7b4c659.png";
import trackJourneyBg from "figma:asset/54d09cc481d4f9b232b121a81c2fb1e03c84377b.png";
import { 
  MessageCircle,
  Play,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  Star,
  Users,
  BookOpen,
  Heart,
  Compass,
  Crown,
  Clock,
  Edit,
  PlusCircle,
  Flower2,
  User,
  Trophy,
  CheckCircle2,
  Flame,
  TrendingUp,
  Target,
  Award
} from "lucide-react";

// Import the reference images
import personalGuideHeaderImage from 'figma:asset/fd140ce9e74d29cb232a9f684fc4734ae835fe37.png';
import guidePortraitsImage from 'figma:asset/f662228f2b1dfd1baded8c26be3b45ee0193ca8d.png';
import diverseChatGuides from 'figma:asset/67280b1e2e3ec8776bfe77f18aba1ccae46b0604.png';
import chatGuidePortraits from 'figma:asset/fb402ff21ee92e20e221c2002cae0575576e0b02.png';
import newChatGuidePortraits from 'figma:asset/232e0028b061c9156a65f358468fd3a03d98c52e.png';
import newDiverseChatGuides from 'figma:asset/586238c9f771cfca789d613f4340d531bd2f525b.png';
import quietSpaceHeaderImage from 'figma:asset/ed3a3eb566a303691cff2cc2a5a651fe06b4868a.png';
import companionVideoPoster from 'figma:asset/beae568b3c864e8361c509b0422b9241503bb8fd.png';

// ==================== CONSTANTS ====================

const JOURNEY_CARD_STYLE = {
  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};

// ==================== HELPER FUNCTIONS ====================

function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'legendary': return '#a79a4c';
    case 'epic': return '#1e386e';
    case 'rare': return '#497EBC';
    default: return '#6B7280';
  }
}

function getRarityGradient(rarity: string): string {
  switch (rarity) {
    case 'legendary': return 'from-[#a79a4c] to-[#8b7a4a]';
    case 'epic': return 'from-[#1e386e] to-[#152951]';
    case 'rare': return 'from-[#497EBC] to-[#3d6aa3]';
    default: return 'from-gray-600 to-gray-700';
  }
}

function createMeditationStatsCards(streakInfo: any, stats: any) {
  return [
    {
      label: "Day Streak",
      value: streakInfo.current,
      icon: Flame,
      color: "#FF8904",
      bgGradient: "from-orange-500/10 to-orange-600/10",
      borderColor: "border-orange-500/20"
    },
    {
      label: "Minutes",
      value: stats.totalMinutes,
      icon: Clock,
      color: "#b69e60",
      bgGradient: "from-[#b69e60]/10 to-[#a88e56]/10",
      borderColor: "border-[#b69e60]/20"
    },
    {
      label: "Sessions",
      value: stats.totalSessions,
      icon: Award,
      color: "#05DF72",
      bgGradient: "from-green-500/10 to-green-600/10",
      borderColor: "border-green-500/20"
    },
    {
      label: "Best Streak",
      value: streakInfo.longest,
      icon: TrendingUp,
      color: "#51A2FF",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20"
    }
  ];
}

// Track Your Journey Component - From Quiet Space
const RecentAchievementsSection = memo(({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const { unlockedBadges, totalWisdomPoints, faithWisdom, getRecentAchievements } = useBadges();
  const { savedGuides } = useSavedGuides();
  const { createdGuide } = useCreatedGuide();
  const { stats: meditationStats, getStreakInfo } = useMeditation();
  
  // Get faith-specific colors function
  const getFaithColors = (faith: string) => {
    const colorMap: Record<string, { primary: string, light: string }> = {
      Christianity: { primary: '#E53935', light: 'rgba(229, 57, 53, 0.2)' },
      Islam: { primary: '#2E7D32', light: 'rgba(46, 125, 50, 0.2)' },
      'Sunni Islam': { primary: '#2E7D32', light: 'rgba(46, 125, 50, 0.2)' },
      'Shia Islam': { primary: '#2E7D32', light: 'rgba(46, 125, 50, 0.2)' },
      'Sufi Islam': { primary: '#2E7D32', light: 'rgba(46, 125, 50, 0.2)' },
      Hinduism: { primary: '#F4511E', light: 'rgba(244, 81, 30, 0.2)' },
      Buddhism: { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
      'Mahayana Buddhism': { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
      'Vajrayana Buddhism': { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
      'Zen Buddhism': { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
      'Theravada Buddhism': { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
      Taoism: { primary: '#212121', light: 'rgba(33, 33, 33, 0.2)' },
      Daoism: { primary: '#212121', light: 'rgba(33, 33, 33, 0.2)' },
      Shinto: { primary: '#E64A19', light: 'rgba(230, 74, 25, 0.2)' },
      'Jinja Shinto': { primary: '#E64A19', light: 'rgba(230, 74, 25, 0.2)' },
      'Koshinto': { primary: '#E64A19', light: 'rgba(230, 74, 25, 0.2)' },
      'Kyoha Shinto': { primary: '#E64A19', light: 'rgba(230, 74, 25, 0.2)' },
      Judaism: { primary: '#1565C0', light: 'rgba(21, 101, 192, 0.2)' },
      Sikhism: { primary: '#F57F17', light: 'rgba(245, 127, 23, 0.2)' },
      Jainism: { primary: '#8E1537', light: 'rgba(142, 21, 55, 0.2)' },
      'Digambara Jainism': { primary: '#8E1537', light: 'rgba(142, 21, 55, 0.2)' },
      'Svetambara Jainism': { primary: '#8E1537', light: 'rgba(142, 21, 55, 0.2)' },
      'Sthanakvasi Jainism': { primary: '#8E1537', light: 'rgba(142, 21, 55, 0.2)' },
      Polytheism: { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
      'Norse Polytheism': { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
      'Greek Mythology': { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
      'Egyptian Mythology': { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
      'Indigenous Spirituality': { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
      Confucianism: { primary: '#1E3A8A', light: 'rgba(30, 58, 138, 0.2)' },
      'Neo-Confucianism': { primary: '#1E3A8A', light: 'rgba(30, 58, 138, 0.2)' },
      'Classical Confucianism': { primary: '#1E3A8A', light: 'rgba(30, 58, 138, 0.2)' },
      'Contemporary Confucianism': { primary: '#1E3A8A', light: 'rgba(30, 58, 138, 0.2)' },
      'Bahá\'í': { primary: '#497EBC', light: 'rgba(73, 126, 188, 0.2)' },
      'Bahai Faith': { primary: '#497EBC', light: 'rgba(73, 126, 188, 0.2)' }
    };
    return colorMap[faith] || { primary: '#497EBC', light: 'rgba(73, 126, 188, 0.2)' };
  };
  
  // Get engagement statistics - Memoized
  const stats = useMemo(() => {
    const recentBadges = getRecentAchievements(30); // Last 30 days
    const visitedFaiths = Object.values(faithWisdom).filter((fw: any) => fw.visitCount > 0).length;
    const totalSessions = Object.values(faithWisdom).reduce((sum: number, fw: any) => sum + fw.visitCount, 0);
    const totalMinutes = Object.values(faithWisdom).reduce((sum: number, fw: any) => sum + fw.sessionMinutes, 0);
    
    // Calculate chat statistics
    const totalConversations = savedGuides.length + (createdGuide ? 1 : 0);
    const createdGuideMessages = createdGuide?.conversationHistory?.length || 0;
    
    return {
      recentBadges: recentBadges.length,
      totalBadges: unlockedBadges.length,
      visitedFaiths,
      totalSessions,
      totalMinutes,
      wisdomPoints: totalWisdomPoints,
      totalConversations,
      totalMessages: createdGuideMessages
    };
  }, [unlockedBadges.length, totalWisdomPoints, faithWisdom, savedGuides.length, createdGuide, getRecentAchievements]);

  const streakInfo = getStreakInfo();
  const recentBadges = getRecentAchievements(30).slice(0, 3);
  
  // Generate meditation stats cards using helper function
  const meditationStatsCards = createMeditationStatsCards(streakInfo, meditationStats);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="px-6 pb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[#a79a4c] rounded-xl flex items-center justify-center mr-3 shadow-[0_4px_15px_rgba(167,154,76,0.5)]">
            <Trophy className="w-5 h-5 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-[24px] text-[#2C2C54]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Track Your Journey
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onNavigate?.("profile")}
          className="text-[#2C2C54] hover:text-[#a79a4c] hover:bg-[#a79a4c]/10 rounded-xl px-4 py-2 font-['Raleway']"
          style={{ fontFamily: 'Raleway, sans-serif' }}
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <Card className="relative rounded-3xl text-white border-0 overflow-hidden" style={JOURNEY_CARD_STYLE}>
        {/* Background Image */}
        <img 
          src={trackJourneyBg}
          alt="Track Your Journey Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative p-6" style={{ zIndex: 2 }}>
          {/* Engagement Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#0F1A2E]/80 border border-[#b69e60]/60 backdrop-blur-md rounded-xl p-3 text-center hover:border-[#b69e60]/90 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(182,158,96,0.6)] bg-[rgba(15,26,46,0.79)]">
              <div className="text-2xl text-white mb-1 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{stats.totalBadges}</div>
              <div className="text-xs text-[#FFD700]/80 uppercase tracking-wide font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Badges</div>
            </div>
            
            <div className="bg-[#0F1A2E]/80 border border-[#b69e60]/60 backdrop-blur-md rounded-xl p-3 text-center hover:border-[#b69e60]/90 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(182,158,96,0.6)] bg-[rgba(15,26,46,0.8)]">
              <div className="text-2xl text-white mb-1 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{stats.visitedFaiths}</div>
              <div className="text-xs text-[#FFD700]/80 uppercase tracking-wide font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Faiths</div>
            </div>
            
            <div className="bg-[#0F1A2E]/80 border border-[#b69e60]/60 backdrop-blur-md rounded-xl p-3 text-center hover:border-[#b69e60]/90 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(182,158,96,0.6)] bg-[rgba(15,26,46,0.8)]">
              <div className="text-2xl text-white mb-1 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{stats.totalConversations}</div>
              <div className="text-xs text-[#FFD700]/80 uppercase tracking-wide font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>Chats</div>
            </div>
          </div>

          {/* Meditation Stats Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)]">
            {meditationStatsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="bg-[#0F1A2E]/80 border border-[#b69e60]/60 backdrop-blur-md rounded-xl p-4 text-center hover:border-[#b69e60]/90 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(182,158,96,0.6)]"
                >
                  <div className="flex justify-center mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center border border-white/20`}>
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-[28px] text-white mb-1 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#FFD700]/80 uppercase tracking-wide font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Badges */}
          {recentBadges.length > 0 ? (
            <div className="space-y-3">
              <div className="text-sm text-slate-300 uppercase tracking-wider mb-3">Latest Unlocked</div>
              {recentBadges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-[#1E3A5F]/40 to-transparent border border-[#1E3A5F]/50 backdrop-blur-md rounded-xl p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getRarityGradient(badge.rarity)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {BadgeIcon && <BadgeIcon className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-base text-white truncate">{badge.name}</h4>
                          <Badge className={`bg-gradient-to-r ${getRarityGradient(badge.rarity)} text-white border-0 text-xs px-2 py-0.5 opacity-80`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">{badge.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#0F2346] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-base text-slate-300 mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Start Your Journey</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Explore different faith traditions and unlock achievements as you grow spiritually
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          {stats.totalBadges > 0 && (
            <div className="mt-6 pt-6 border-t border-[#1E3A5F]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Spiritual Journey Progress</span>
                <span className="text-sm text-[#b69e60]">{stats.totalBadges} / 20 Milestones</span>
              </div>
              <div className="w-full bg-[#1E3A5F]/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#497EBC] to-[#b69e60] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((stats.totalBadges / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Upgrade Your Journey Button */}
          <div className="mt-6 pt-6 border-t border-[#1E3A5F]/30">
            <Button
              onClick={() => onNavigate?.('subscription')}
              className="w-full h-12 bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white shadow-[0_4px_15px_rgba(167,154,76,0.4)] hover:shadow-[0_6px_25px_rgba(167,154,76,0.6)] transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Your Journey
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

RecentAchievementsSection.displayName = 'RecentAchievementsSection';

interface Chat2Props {
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
  setOverlayUrl?: (url: string) => void;
  setOverlayAgentName?: (name: string) => void;
  setOverlayFaithColor?: (color: string) => void;
  setIsIframeLoading?: (loading: boolean) => void;
  setIsOverlayOpen?: (open: boolean) => void;
  setOverlayGuideImage?: (image: string) => void;
  setOverlayGuideRole?: (role: string) => void;
}

export function Chat2({ 
  onOpenMission, 
  onNavigate, 
  setOverlayUrl, 
  setOverlayAgentName, 
  setOverlayFaithColor, 
  setIsIframeLoading, 
  setIsOverlayOpen,
  setOverlayGuideImage,
  setOverlayGuideRole
}: Chat2Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { savedGuides, saveGuide, isGuideSaved } = useSavedGuides();
  const { hasCreatedGuide, createdGuide, archiveCurrentGuide, saveCreatedGuide, clearCreatedGuide, archivedGuides, restoreArchivedGuide, deleteArchivedGuide } = useCreatedGuide();
  const { playSound } = useSound();
  const { badges } = useBadges();
  const { currentSubscription, tier } = useSubscription();

  // Combine current guide with archived guides for slider
  const allGuides = React.useMemo(() => {
    const guides = [];
    if (hasCreatedGuide && createdGuide) {
      guides.push({ ...createdGuide, isActive: true });
    }
    if (archivedGuides && archivedGuides.length > 0) {
      guides.push(...archivedGuides.map(g => ({ ...g, isActive: false })));
    }
    return guides;
  }, [hasCreatedGuide, createdGuide, archivedGuides]);

  // Reset to "Find a Guide" mode when user is not subscribed
  // This ensures free users and those who skip always see the matching process
  React.useEffect(() => {
    // Check if user is not subscribed (free tier or no subscription)
    const isFreeUser = !currentSubscription || tier === 'free' || tier === 'Free';
    
    // If user is free and has a guide, archive it to show the default "Find a Guide" view
    if (isFreeUser && hasCreatedGuide) {
      // Archive the current guide silently (without toast notification)
      archiveCurrentGuide();
      console.log('Chat2: Reset to Find a Guide mode for free/unsubscribed user');
    }
  }, [currentSubscription, tier, hasCreatedGuide, archiveCurrentGuide]);

  // Listen for localStorage changes (e.g., when app is reset via Privacy Dashboard)
  // This ensures Chat 2 returns to default state when data is cleared
  React.useEffect(() => {
    const checkForReset = () => {
      const storedGuide = localStorage.getItem('divinityagi-created-guide');
      // If we think we have a guide but localStorage says we don't, clear it
      if (hasCreatedGuide && !storedGuide) {
        console.log('Chat2: Detected localStorage reset, clearing created guide state');
        clearCreatedGuide();
      }
    };

    // Check immediately
    checkForReset();

    // Set up an interval to periodically check (every 2 seconds)
    const intervalId = setInterval(checkForReset, 2000);

    // Listen for storage events (when localStorage is modified in another tab/window)
    window.addEventListener('storage', checkForReset);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', checkForReset);
    };
  }, [hasCreatedGuide, clearCreatedGuide]);

  // Filter guides based on search
  const filteredGuides = savedGuides.filter(guide =>
    guide.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.tradition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter for companion guides only (matched guides from guide-matching process)
  const companionGuides = savedGuides.filter(guide => guide.guideType === 'companion');
  
  // Apply search filter to companion guides
  const filteredCompanionGuides = companionGuides.filter(guide =>
    guide.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.tradition.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleGuideClick = (guide: any) => {
    playSound('spiritual-bell', 0.3);
    
    // Archive current guide if one exists
    if (createdGuide) {
      archiveCurrentGuide();
    }

    // Try to find the guide in the guide database by name
    const matchedGuideData = guideDatabase.find(
      g => g.name.toLowerCase() === guide.guideName.toLowerCase()
    );

    if (matchedGuideData) {
      // Load full guide data from database
      const loadedGuide = {
        guideName: matchedGuideData.name,
        faith: matchedGuideData.faith,
        guideRole: matchedGuideData.role,
        agePreference: matchedGuideData.ageGroup,
        spiritualGoals: matchedGuideData.specialties.slice(0, 3), // Use first 3 specialties as spiritual goals
        usageFrequency: "As Needed",
        generatedImageUrl: matchedGuideData.image,
        description: generateGuideSummary(matchedGuideData),
        welcomeMessage: matchedGuideData.welcomeMessage,
        isMatched: true,
        matchedGuideId: matchedGuideData.id,
        chatUrl: matchedGuideData.chatUrl,
        specialties: matchedGuideData.specialties,
        personality: matchedGuideData.personality,
        sect: matchedGuideData.sect,
        archetypeRoles: matchedGuideData.archetypeRoles,
        journeyLevel: matchedGuideData.journeyLevel,
        conversationHistory: [] // Start with empty conversation
      };

      // Save as the current created guide
      saveCreatedGuide(loadedGuide);

      toast.success(
        `Now chatting with ${matchedGuideData.name}`,
        {
          description: `${matchedGuideData.role} from ${matchedGuideData.faith}`,
          duration: 3000
        }
      );

      // Scroll to top to show the guide profile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback: Use the saved guide data directly (less detailed)
      const loadedGuide = {
        guideName: guide.guideName,
        faith: guide.tradition,
        guideRole: "Advisor",
        agePreference: "mature",
        spiritualGoals: guide.specialty ? [guide.specialty] : ["Spiritual Growth"],
        usageFrequency: "As Needed",
        generatedImageUrl: guide.avatar,
        description: guide.description || `A spiritual guide from the ${guide.tradition} tradition.`,
        welcomeMessage: `Welcome, seeker. I am ${guide.guideName}, here to guide you on your spiritual journey.`,
        isMatched: false,
        chatUrl: guide.chatUrl,
        conversationHistory: []
      };

      saveCreatedGuide(loadedGuide);

      toast.success(
        `Now chatting with ${guide.guideName}`,
        {
          description: `Guide from ${guide.tradition}`,
          duration: 3000
        }
      );

      // Scroll to top to show the guide profile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMeditationStart = (session: any) => {
    playSound('meditation-bell', 0.4);
    toast.success(`Starting ${session.title}`, { duration: 2000 });
    onNavigate?.('quiet-space');
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      
      {/* Swell Effect Background */}
      <div className="fixed inset-0 -z-50" style={{
        background: 'linear-gradient(to bottom, #182238 0%, #1e386e 50%, #182238 100%)'
      }} />
      
      {/* Content Container */}
      <div className="relative max-w-md lg:max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="px-4 sm:px-6 pt-[30px] sm:pb-2 text-center relative z-10 mx-auto max-w-full sm:max-w-2xl min-h-screen sm:min-h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 sm:rounded-3xl overflow-hidden -z-10">
            <img 
              src={spiritGuidesHeaderBg} 
              alt="" 
              className="w-full h-full object-cover opacity-100"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-0 sm:mb-2 relative py-8"
          >
            {/* AI Icon */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            <h1 className="text-[40px] sm:text-[48px] text-white mb-1 sm:mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              My Spirit Guides
            </h1>
            
            <div className="w-20 h-0.5 sm:h-1 sm:w-24 bg-[#a79a4c] mx-auto rounded-full mb-1 sm:mb-3" />
            
            <p className="text-[15px] sm:text-[16px] text-white mb-0 sm:mb-3 px-8 sm:px-20" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.5 }}>
              Speak with a guide matched to your preferences and beliefs.
            </p>
          </motion.div>
        </section>

        {/* Personal Guide Portal Section with Video Background */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 sm:px-6 pb-6 sm:pb-6 pt-12 lg:grid lg:grid-cols-2 lg:gap-6 relative z-20"
        >
          {/* Beautiful "Find Your Guide" Hero - When user hasn't created a guide */}
          {!hasCreatedGuide && (
            <div className="w-full max-w-sm mx-auto relative flex justify-center">
              {/* Background Video Container */}
              <div className="relative rounded-3xl overflow-hidden min-h-[600px] sm:min-h-[700px] w-full">
                {/* Background Video */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center">
                  <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={companionVideoPoster}
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: 'center center',
                      transform: 'scale(1.0)'
                    }}
                  >
                    <source src="https://divinityagi.com/wp-content/uploads/2026/01/Circle-Group-Pose-Loop.mp4" type="video/mp4" />
                    {/* Fallback to poster image if video doesn't load */}
                    <img 
                      src={companionVideoPoster} 
                      alt="AI Companions"
                      className="w-full h-full object-cover"
                      style={{ 
                        objectPosition: 'center center',
                        transform: 'scale(1.0)'
                      }}
                    />
                  </video>
                </div>
                
                {/* Glassmorphism Card Overlay - Positioned at bottom */}
                <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center items-end z-10 px-4 sm:px-0 mx-[0px] my-[83px]">
                  <div 
                    className="cursor-pointer group w-full max-w-[280px] sm:max-w-sm"
                    onClick={() => {
                      playSound('modal-open', 0.3);
                      onNavigate?.('guide-process');
                    }}
                  >
                    <div className="relative backdrop-blur-md bg-white/10 rounded-2xl border border-[#a79a4c] shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(167,154,76,0.4)] w-full aspect-square mx-auto transition-all duration-300 active:scale-[0.98] sm:hover:scale-[1.02] flex flex-col items-center justify-center p-4 sm:p-5" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
                      <h3 className="text-[20px] sm:text-[22px] md:text-[26px] text-white mb-2 sm:mb-2 leading-tight text-center" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        Find a Spirit Guide
                      </h3>
                      
                      <p className="text-center text-white text-[12px] sm:text-[13px] md:text-[14px] mb-3 sm:mb-4 md:mb-5 max-w-[240px] sm:max-w-sm mx-auto" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, lineHeight: '1.6' }}>
                        Discover a personalized spiritual companion tailored to your faith, goals, and spiritual journey
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-[11px] sm:text-[12px] md:text-[13px] mb-4 sm:mb-5 md:mb-6 flex-wrap" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, textShadow: '0 2px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.7)' }}>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                          <span className="font-[Raleway]">AI-powered matching</span>
                        </div>
                        <span className="text-white/70 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                          <span className="font-[Raleway]">100+ guides</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center w-full">
                        <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] rounded-full text-white shadow-[0_4px_20px_rgba(167,154,76,0.4)] hover:shadow-[0_6px_30px_rgba(167,154,76,0.6)] transition-all text-[13px] sm:text-[14px] md:text-[15px] touch-manipulation active:scale-95" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                          Start your Search
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </motion.section>

        {/* Created Guide Section with Quick Actions */}
        {allGuides.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="px-6 pb-4 lg:col-span-1"
          >
            <Card className="relative rounded-3xl p-5 text-white border-0 overflow-hidden shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid #b69e60'
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#497EBC]/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-[#497EBC]" />
                </div>
                <div>
                  <Badge className="bg-[#497EBC]/10 backdrop-blur-sm text-[#497EBC] border border-[#497EBC]/20 text-xs font-['Raleway'] font-semibold tracking-wider">
                    Your Personal Guides {allGuides.length > 1 && `(${allGuides.length})`}
                  </Badge>
                </div>
              </div>

              {/* Guide Slider */}
              <GuideSlider
                guides={allGuides}
                currentIndex={currentSlide}
                onIndexChange={setCurrentSlide}
                isGuideSaved={isGuideSaved}
                saveGuide={saveGuide}
                onLaunchConversation={async (guide) => {
                  playSound('modal-open', 0.3);
                  
                  // Debug: Log the current guide data
                  console.log('=== Launch Conversation Debug ===');
                  console.log('guide:', guide);
                  console.log('guide.chatUrl:', (guide as any).chatUrl);
                  console.log('guide.guideId:', (guide as any).guideId);
                  console.log('guide.id:', (guide as any).id);
                  console.log('guide.guideName:', guide.guideName);
                  console.log('guide.faith:', guide.faith);
                  
                  // PRIORITY 1: Try to lookup fresh chatUrl from database by guide name/faith
                  let chatUrl = '';
                  const matchedGuideData = guideDatabase.find(
                    g => g.name === (guide.guideName || guide.guideRole) && 
                         g.faith === guide.faith
                  );
                  
                  if (matchedGuideData?.chatUrl) {
                    chatUrl = matchedGuideData.chatUrl;
                    console.log(`Step 1 - Found fresh chatUrl in database for ${guide.guideName}: ${chatUrl}`);
                  } else {
                    console.log('Step 1 - No match in database, trying other methods...');
                  }
                  
                  // PRIORITY 2: Try guide ID lookup if database lookup failed
                  if (!chatUrl) {
                    const guideId = (guide as any).guideId || (guide as any).id;
                    if (guideId) {
                      console.log('Step 2 - Looking up chatUrl by guide ID:', guideId);
                      chatUrl = getGuideChatUrlById(guideId);
                      console.log('Step 2 - chatUrl from ID lookup:', chatUrl);
                    }
                  }
                  
                  // PRIORITY 3: Try URL mapping utility by name
                  if (!chatUrl && guide.guideName) {
                    console.log('Step 3 - Looking up chatUrl by name...');
                    chatUrl = getGuideChatUrl(guide.guideName, guide.faith);
                    console.log('Step 3 - chatUrl from name lookup:', chatUrl);
                  }
                  
                  // PRIORITY 4: Use the chatUrl stored in guide (fallback to saved value)
                  if (!chatUrl) {
                    chatUrl = (guide as any).chatUrl;
                    console.log('Step 4 - Using stored chatUrl from guide:', chatUrl);
                  }
                  
                  // PRIORITY 5: Use fallback URL by faith (last resort)
                  if (!chatUrl) {
                    console.log('Step 5 - Using fallback URL by faith...');
                    chatUrl = getFallbackChatUrlByFaith(guide.faith);
                    console.log(`Step 5 - Fallback chatUrl for ${guide.faith}: ${chatUrl}`);
                  }
                  
                  // Final validation
                  console.log('=== Final chatUrl selected:', chatUrl);
                  console.log('=== Opening D-ID iframe with URL:', chatUrl);
                  
                  // Validate URL format
                  if (!chatUrl || !chatUrl.includes('link.divinityagi.com')) {
                    console.error('⚠️ WARNING: Invalid chatUrl detected!', chatUrl);
                    toast.error('Unable to find guide conversation link. Please contact support.');
                    return;
                  }
                  
                  // Set overlay with the correct chatUrl and guide details
                  setOverlayUrl?.(chatUrl);
                  setOverlayAgentName?.(guide.guideName || guide.guideRole);
                  setOverlayFaithColor?.('#497EBC'); // Use teal color
                  setOverlayGuideImage?.(guide.generatedImageUrl || '');
                  setOverlayGuideRole?.(guide.guideRole || (guide.specialties?.[0]) || 'Spiritual Guide');
                  setIsIframeLoading?.(true);
                  setIsOverlayOpen?.(true);
                  
                  console.log('✅ Successfully opened conversation overlay');
                  toast.success(`Opening conversation with ${guide.guideName || guide.guideRole}`, { duration: 2000 });
                }}
                onArchiveAndMakeNew={() => {
                  if (!onNavigate) {
                    toast.error("Navigation not available");
                    return;
                  }
                  archiveCurrentGuide();
                  toast.success("Current guide archived. Creating new guide...");
                  onNavigate('guide-process');
                }}
                onRestore={(guide) => {
                  playSound('spiritual-bell', 0.3);
                  restoreArchivedGuide(guide);
                  setCurrentSlide(0); // Reset to first slide after restore
                  toast.success(`${guide.guideName || guide.guideRole} has been restored as your active guide!`);
                }}
                onDelete={(guide) => {
                  playSound('click', 0.2);
                  deleteArchivedGuide(guide);
                  // Adjust slide index if needed
                  if (currentSlide >= allGuides.length - 1 && currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                  }
                  toast.success(`${guide.guideName || guide.guideRole} has been permanently deleted`);
                }}
                playSound={playSound}
              />
            </Card>
          </motion.section>
        )}

        {/* Guide Details Grid - Desktop 2-column layout */}
        {hasCreatedGuide && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Daily Reflection Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="px-6 pb-6 lg:col-span-2"
            >
            <Card className="rounded-3xl p-5 border-0 overflow-hidden shadow-xl" style={{
              background: 'linear-gradient(to bottom, #1a2d4a 0%, #2d4a6b 30%, #1e3a5a 70%, #0f1a2e 100%)',
              boxShadow: '0 0 0 2px #b69e60, 0 10px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md">
                  <BookOpen className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-white text-sm font-['Raleway'] font-semibold tracking-wider uppercase drop-shadow-md">
                  Daily Reflection
                </h4>
              </div>
              <p className="text-white/80 text-sm font-['Raleway'] drop-shadow-sm">
                Wisdom from your {createdGuide.faith.toLowerCase()} guide
              </p>
            </Card>
            </motion.section>

            {/* Guide Profile Section */}
            {createdGuide && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="px-6 pb-6 lg:col-span-1"
              >
            <Card className="relative rounded-3xl p-6 text-white border-0 overflow-hidden shadow-2xl" style={{
              background: 'linear-gradient(to bottom, #1a2d4a 0%, #2d4a6b 30%, #1e3a5a 70%, #0f1a2e 100%)',
              boxShadow: '0 0 0 2px #b69e60, 0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                <div>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs font-['Raleway'] font-semibold tracking-wider">
                    GUIDE PROFILE
                  </Badge>
                  <p className="text-white/70 text-xs mt-1 font-['Raleway']">
                    {createdGuide.guideRole} • {createdGuide.faith}
                  </p>
                </div>
              </div>

              {/* Guide Description */}
              {createdGuide.description && (
                <div className="mb-4">
                  <p className="text-white/90 leading-relaxed font-['Raleway'] drop-shadow-sm">
                    {condenseDescription(createdGuide.description, 1)}
                  </p>
                </div>
              )}

              {/* Welcome Message */}
              {createdGuide.welcomeMessage && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#497EBC] mt-1 flex-shrink-0 drop-shadow-lg" />
                    <p className="text-white/90 italic font-['Raleway'] drop-shadow-sm">
                      "{condenseDescription(createdGuide.welcomeMessage, 1)}"
                    </p>
                  </div>
                </div>
              )}

              {/* Guide Specialties */}
              {(createdGuide as any).specialties && (createdGuide as any).specialties.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#b69e60] drop-shadow-lg" />
                    <h4 className="text-white font-['Raleway'] font-semibold drop-shadow-md">Areas of Expertise</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(createdGuide as any).specialties.map((specialty: string, idx: number) => (
                      <Badge 
                        key={idx} 
                        className="bg-[#b69e60]/20 border border-[#b69e60]/40 text-[#b69e60] font-['Raleway']"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Personality Traits */}
              {(createdGuide as any).personality && (createdGuide as any).personality.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-[#497EBC] drop-shadow-lg" />
                    <h4 className="text-white font-['Raleway'] font-semibold drop-shadow-md">Personality Traits</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(createdGuide as any).personality.map((trait: string, idx: number) => (
                      <Badge 
                        key={idx} 
                        className="bg-[#497EBC]/20 border border-[#497EBC]/40 text-[#B8D5F0] font-['Raleway'] capitalize"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Spiritual Goals */}
              {createdGuide.spiritualGoals && createdGuide.spiritualGoals.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-[#b69e60] drop-shadow-lg" />
                    <h4 className="text-white font-['Raleway'] font-semibold drop-shadow-md">Your Spiritual Focus Areas</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {createdGuide.spiritualGoals.map((goal, idx) => (
                      <Badge 
                        key={idx} 
                        className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.3)] text-[#b69e60] font-['Raleway']"
                      >
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Sect/Tradition Focus */}
              {(createdGuide as any).sect && (createdGuide as any).sect.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-[#b69e60] drop-shadow-lg" />
                    <h4 className="text-white font-['Raleway'] font-semibold drop-shadow-md">Tradition Focus</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(createdGuide as any).sect.map((tradition: string, idx: number) => (
                      <Badge 
                        key={idx} 
                        className="bg-white/10 border border-white/30 text-white/90 font-['Raleway']"
                      >
                        {tradition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Journey Level */}
              {(createdGuide as any).journeyLevel && (createdGuide as any).journeyLevel.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Compass className="w-5 h-5 text-[#497EBC] drop-shadow-lg" />
                    <h4 className="text-white font-['Raleway'] font-semibold drop-shadow-md">Suitable For</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(createdGuide as any).journeyLevel.map((level: string, idx: number) => (
                      <Badge 
                        key={idx} 
                        className="bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-['Raleway']"
                      >
                        {level}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Age Preference */}
                {createdGuide.agePreference && (
                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-4 h-4 text-[#b69e60] drop-shadow-lg" />
                      <span className="text-white/70 text-sm font-['Raleway']">Guide Age</span>
                    </div>
                    <p className="text-white font-['Raleway'] drop-shadow-sm">{getAgeDisplay(createdGuide.agePreference)}</p>
                  </div>
                )}

                {/* Usage Frequency */}
                {createdGuide.usageFrequency && (
                  <div className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#497EBC] drop-shadow-lg" />
                      <span className="text-white/70 text-sm font-['Raleway']">Connection Frequency</span>
                    </div>
                    <p className="text-white font-['Raleway'] drop-shadow-sm">{createdGuide.usageFrequency}</p>
                  </div>
                )}
              </div>
            </Card>
              </motion.section>
            )}
          </div>
        )}

        {/* Saved Guides Section */}
        {/* Getting Started Section - Only show when no guide is selected */}
        {!hasCreatedGuide && (
          <GettingStartedSection onNavigate={onNavigate} />
        )}
        
        {/* Track Your Journey Section */}
        <RecentAchievementsSection onNavigate={onNavigate} />
        
        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* Edit Guide Modal */}
      {showEditModal && createdGuide && (
        <EditGuideModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
      </div>
    </div>
  );
}