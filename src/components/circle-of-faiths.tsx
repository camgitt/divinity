import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { useBadges } from "./badges-context";
import { useSavedGuides } from "./saved-guides-context";
import { useCreatedGuide } from "./created-guide-context";
import { useCrisisSupport } from "./crisis-support-context";
import { toast } from "sonner@2.0.3";
import { 
  Star, 
  Infinity,
  Heart,
  ChevronRight,
  MessageCircle,
  Users,
  Globe,
  User,
  Trophy,
  Shield,
  Sparkles,
  Circle,
  Flower2,
  Palette,
  ChevronDown,
  Target,
  Zap
} from "lucide-react";
import { EnhancedCommunityHub } from "./enhanced-community-hub";
import { SpiritualJourneySection } from "./spiritual-journey-section";
import { AchievementSummary } from "./global-badge-notifications";
import exampleImage from 'figma:asset/32526f3075f3897f74062f8dae16dce17dffd8c2.png';
import christianCrossImage from 'figma:asset/4f05d38222fad7a295a249e1c5585d22b9c9ee33.png';
import jewishStarImage from 'figma:asset/b69db2b5d663e554055f9374a5a9ad8456cde58c.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import taoistYinYangImage from 'figma:asset/c397d643e112416d09d7db13091a278ced73b15a.png';
import buddhistDharmaWheelImage from 'figma:asset/608e0bda2ef24ff5c6c2c3db58bc2977a2999739.png';
import shintoToriiImage from 'figma:asset/cbedb086a3581eacb3cd37924ce6d70079a0d267.png';
import jainHandImage from 'figma:asset/a2eee3f20602ba33f4e72f04d7c55725d6773e30.png';
import polytheismCircleImage from 'figma:asset/9ff2251323feab51585b09eb603462a37f34b643.png';
import islamCrescentImage from 'figma:asset/a5ab3d839924023949cf4fb780ffed4eed18db88.png';
import confuciusCharacterImage from 'figma:asset/6597d1c24da1b3fb6d3682910db9c7d838ef88c5.png';
import bahaiStarImage from 'figma:asset/6a635cafe9ba90b87d513400d449fe13e3c2f63b.png';
import sikhKhandaImage from 'figma:asset/96952c71f84ce0599cc3e18fecf53302df4e862c.png';
import diverseCommunityImage from 'figma:asset/2c86b1ec2c11106ae48391ac3fe14def6192d5a1.png';
import faithLeadersImage from 'figma:asset/29185fd94947d8cddf54fc502a7b32d7b07c8d5f.png';
import logoImage from 'figma:asset/029577c8d493e50233dc3c91517732567d175971.png';
import videoPosterImage from 'figma:asset/34e1fcbe28828ab00d74e597b2c0095ae442e342.png';
import companionGroupPoster from 'figma:asset/4e42e24732bc2fb542fae5c865dbf1b84461d6b7.png';
import starryNightPoster from 'figma:asset/c24f7eb5677fe9329b550d72ef16016a1f216a6e.png';
import achievementsBgImage from 'figma:asset/41dc02e277e24f83df4b90a9c341e24d010dcdba.png';

// Faith symbol mapper for chat history
const getFaithSymbol = (faith: string): { type: 'emoji' | 'svg', symbol: string } | null => {
  const faithLower = faith.toLowerCase();
  const symbolMap: Record<string, { type: 'emoji' | 'svg', symbol: string }> = {
    christianity: { type: 'svg', symbol: christianCrossImage },
    islam: { type: 'svg', symbol: islamCrescentImage },
    judaism: { type: 'svg', symbol: jewishStarImage },
    hinduism: { type: 'svg', symbol: hinduOmImage },
    buddhism: { type: 'svg', symbol: buddhistDharmaWheelImage },
    taoism: { type: 'svg', symbol: taoistYinYangImage },
    daoism: { type: 'svg', symbol: taoistYinYangImage },
    shinto: { type: 'svg', symbol: shintoToriiImage },
    sikhism: { type: 'svg', symbol: sikhKhandaImage },
    jainism: { type: 'svg', symbol: jainHandImage },
    polytheism: { type: 'svg', symbol: polytheismCircleImage },
    confucianism: { type: 'svg', symbol: confuciusCharacterImage },
    'bahá\'í': { type: 'svg', symbol: bahaiStarImage },
    bahai: { type: 'svg', symbol: bahaiStarImage }
  };
  return symbolMap[faithLower] || null;
};
import circleBackgroundImage from 'figma:asset/0faf5832cf95cf38184460eadd9cd8f4e83e5c38.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import cosmicMoonBackground from 'figma:asset/57b70a49b8f71da089887c31462cd4e9026d4090.png';

// Faith traditions with their corresponding icons and colors (12 total)
const faithTraditions = [
  { name: "Christianity", icon: christianCrossImage, color: "text-blue-400", bgColor: "bg-blue-500/20", key: "christianity", isImage: true },
  { name: "Judaism", icon: jewishStarImage, color: "text-yellow-400", bgColor: "bg-yellow-500/20", key: "judaism", isImage: true },
  { name: "Hinduism", icon: hinduOmImage, color: "text-orange-400", bgColor: "bg-orange-500/20", key: "hinduism", isImage: true },
  { name: "Daoism", icon: taoistYinYangImage, color: "text-teal-400", bgColor: "bg-teal-500/20", key: "daoism", isImage: true },
  { name: "Shinto", icon: shintoToriiImage, color: "text-rose-400", bgColor: "bg-rose-500/20", key: "shinto", isImage: true },
  { name: "Buddhism", icon: buddhistDharmaWheelImage, color: "text-blue-400", bgColor: "bg-blue-500/20", key: "buddhism", isImage: true },
  { name: "Jainism", icon: jainHandImage, color: "text-red-400", bgColor: "bg-red-500/20", key: "jainism", isImage: true },
  { name: "Polytheism", icon: polytheismCircleImage, color: "text-amber-400", bgColor: "bg-amber-500/20", key: "polytheism", isImage: true },
  { name: "Islam", icon: islamCrescentImage, color: "text-green-400", bgColor: "bg-green-500/20", key: "islam", isImage: true },
  { name: "Confucianism", icon: confuciusCharacterImage, color: "text-lime-400", bgColor: "bg-lime-500/20", key: "confucianism", isImage: true },
  { name: "Bahá'í Faith", icon: bahaiStarImage, color: "text-pink-400", bgColor: "bg-pink-500/20", key: "bahai", isImage: true },
  { name: "Sikhism", icon: sikhKhandaImage, color: "text-indigo-400", bgColor: "bg-indigo-500/20", key: "sikhism", isImage: true }
];

// FAQ items with content
const faqItems = [
  { 
    id: "how-does-this-work",
    question: "HOW DOES THIS WORK?", 
    title: "Curated Avatars",
    answer: "Each guide is trained to respond according to its religious context and spiritual nuance."
  },
  { 
    id: "what-can-i-ask",
    question: "WHAT CAN I ASK?", 
    title: "Here to Listen",
    answer: "Guides are available 24/7 to support individuals navigating moral dilemmas, crisis-related situations, or for general conversation."
  },
  { 
    id: "how-does-it-answer",
    question: "HOW DOES IT ANSWER?", 
    title: "Natural Responses",
    answer: "Guides utilize natural language processing (NLP) and generative AI to comprehend your text or voice input, and then provide relevant responses."
  }
];

// Featured guides
const featuredGuides = [
  {
    name: "Cultural",
    subtitle: "Celebrate Diversity",
    icon: "🌍",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  {
    name: "Historical",
    subtitle: "Discover Connections",
    icon: "📜",
    color: "text-amber-400", 
    bgColor: "bg-amber-500/20"
  },
  {
    name: "Technical",
    subtitle: "24/7 Access via Whisper",
    icon: "🔮",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  }
];

// Community circles now imported from centralized data file

// Recent Achievements Section Component - Memoized for performance
const RecentAchievementsSection = memo(({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const { unlockedBadges, totalWisdomPoints, faithWisdom, getRecentAchievements } = useBadges();
  const { savedGuides } = useSavedGuides();
  const { createdGuide } = useCreatedGuide();
  
  // Get faith-specific colors function
  const getFaithColors = (faithKey: string) => {
    const colorMap: Record<string, { primary: string }> = {
      christianity: { primary: '#E5756E' },
      islam: { primary: '#6BA96E' },
      judaism: { primary: '#6394C7' },
      hinduism: { primary: '#F68969' },
      buddhism: { primary: '#FACB6B' },
      taoism: { primary: '#5A5A5A' },
      daoism: { primary: '#5A5A5A' },
      shinto: { primary: '#EA7F6A' },
      sikhism: { primary: '#F9AB5C' },
      jainism: { primary: '#B45F75' },
      polytheism: { primary: '#9566B8' },
      confucianism: { primary: '#5873AD' },
      bahai: { primary: '#B862C4' }
    };
    return colorMap[faithKey] || { primary: '#9B82FF' };
  };
  
  // Get engagement statistics - Memoized
  const stats = useMemo(() => {
    const recentBadges = getRecentAchievements(30); // Last 30 days
    const visitedFaiths = Object.values(faithWisdom).filter(fw => fw.visitCount > 0).length;
    const totalSessions = Object.values(faithWisdom).reduce((sum, fw) => sum + fw.visitCount, 0);
    const totalMinutes = Object.values(faithWisdom).reduce((sum, fw) => sum + fw.sessionMinutes, 0);
    
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

  const recentBadges = useMemo(() => getRecentAchievements(30).slice(0, 3), [getRecentAchievements]);
  
  // Get recent chat guides (including created guide and saved guides) - Memoized
  const recentChats = useMemo(() => {
    const guides = [];
    
    // Add created guide if exists
    if (createdGuide) {
      const lastMessage = createdGuide.conversationHistory?.[createdGuide.conversationHistory.length - 1];
      const lastTimestamp = lastMessage?.timestamp 
        ? new Date(lastMessage.timestamp) // Convert to Date if it's a string from localStorage
        : new Date(createdGuide.createdAt);
      
      guides.push({
        id: 'created-guide',
        name: createdGuide.guideRole,
        faith: createdGuide.faith,
        lastMessage: lastMessage?.text || 'Start your conversation',
        messageCount: createdGuide.conversationHistory?.length || 0,
        timestamp: lastTimestamp,
        isCreatedGuide: true
      });
    }
    
    // Add saved guides
    savedGuides.slice(0, 3).forEach(guide => {
      guides.push({
        id: guide.id,
        name: guide.guideName,
        faith: guide.tradition,
        lastMessage: 'Continue your spiritual journey',
        messageCount: 0,
        timestamp: new Date(guide.savedAt), // Ensure it's a Date object
        isCreatedGuide: false
      });
    });
    
    // Sort by most recent - now all timestamps are Date objects
    return guides.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 3);
  }, [createdGuide, savedGuides]);

  // Rarity color mapping
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-[#FFD369] to-amber-600';
      case 'epic': return 'from-purple-500 to-pink-600';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 mt-20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-8 sm:h-8 bg-[#a79a4c] rounded-xl flex items-center justify-center mr-3 flex-shrink-0 shadow-[0_4px_15px_rgba(167,154,76,0.5)]">
            <Sparkles className="w-5 h-5 sm:w-4 sm:h-4 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#3D3D6B]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Recent Achievements
          </h2>
        </div>
        <button 
          onClick={() => onNavigate?.("profile")}
          className="px-6 py-2.5 rounded-full bg-[#a79a4c] hover:bg-[#8b7a4a] text-white text-sm transition-all duration-300 shadow-[0_4px_12px_rgba(167,154,76,0.4)] hover:shadow-[0_6px_20px_rgba(167,154,76,0.6)] self-start sm:self-auto border-0"
          style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
        >
          View Full Profile
        </button>
      </div>

      <Card className="relative rounded-3xl text-white border-0 overflow-hidden transition-all duration-500 min-h-[500px]" style={{
        boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${achievementsBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative p-4 sm:p-6 md:p-8 min-h-[500px] flex flex-col justify-center bg-[rgba(0,0,0,0.54)]">
          {/* Recent Badges - Mobile Optimized */}
          {recentBadges.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-sm text-slate-300 uppercase tracking-wider mb-3" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Latest Unlocked Badges</div>
              {recentBadges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-2 border-[#a79a4c]/50 rounded-xl p-3 sm:p-4 hover:border-[#a79a4c] transition-all duration-300"
                    style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        {BadgeIcon && <BadgeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                          <h4 className="text-base sm:text-lg text-white truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{badge.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white border-0 text-xs px-2 py-0.5`} style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                              {badge.rarity}
                            </Badge>
                            <Badge className="bg-[#a79a4c]/20 text-[#a79a4c] border border-[#a79a4c]/30 text-xs px-2 py-0.5" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                              +{badge.tokenReward}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>{badge.description}</p>
                        {badge.unlockedAt && (
                          <div className="text-xs text-slate-500" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                            Unlocked {new Date(badge.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1e386e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
              </div>
              <p className="text-base sm:text-lg text-slate-300 mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Start Your Journey</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto px-4" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                Explore different faith traditions and unlock achievements as you grow spiritually
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
});

RecentAchievementsSection.displayName = 'RecentAchievementsSection';

// How Badges Work Section Component - Memoized
const HowBadgesWorkSection = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-6"
    >
      <Card 
        className="relative rounded-3xl p-5"
        style={{
          background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
          boxShadow: '0px 0px 0px 2px #a79a4c, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#1e386e] flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_rgba(30,56,110,0.5)]">
            <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>How Badges Work</h3>
              <p className="text-sm text-slate-300 leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                Earn spiritual badges by engaging with DivinityAGI. Each badge represents a milestone in your journey and rewards you with tokens.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#a79a4c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#a79a4c]" />
                </div>
                <div>
                  <p className="text-xs text-[#a79a4c]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Chat & Engage</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Talk with guides</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-teal-400" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Complete Goals</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Unlock achievements</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-lg bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-green-400" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Earn Tokens</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Get rewarded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

HowBadgesWorkSection.displayName = 'HowBadgesWorkSection';

// Accumulated Wisdom Section Component - Memoized
const AccumulatedWisdomSection = memo(() => {
  const { unlockedBadges, getUserWisdomSummary } = useBadges();

  if (unlockedBadges.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
    >
      <Card 
        className="relative rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
        style={{
          background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
          boxShadow: '0px 0px 0px 2px #a79a4c, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="p-8 relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#1e386e] flex items-center justify-center mr-4 shadow-[0_4px_15px_rgba(30,56,110,0.5)]">
              <Star className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
            <div>
              <h3 className="text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Accumulated Wisdom</h3>
              <p className="text-slate-300 text-sm" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Your interfaith learning guides our AI</p>
            </div>
          </div>
          
          <div className="bg-[#334155]/60 border border-[#475569]/30 rounded-2xl p-6">
            <p className="text-slate-200 leading-relaxed mb-4" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
              {getUserWisdomSummary()}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="bg-[#1e386e]/40 border-2 border-[#a79a4c] rounded-xl px-4 py-2">
                <span className="text-[#a79a4c] text-sm drop-shadow-[0_0_8px_rgba(167,154,76,0.4)]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>{unlockedBadges.length} Spiritual Badges</span>
              </div>
              <span className="text-slate-300 text-sm" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Referenced in all conversations</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

AccumulatedWisdomSection.displayName = 'AccumulatedWisdomSection';

// Faith Color System Component - Memoized
const FaithColorSystem = memo(({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const { createdGuide } = useCreatedGuide();
  const [expandedFaith, setExpandedFaith] = useState<string | null>(null);
  
  const religionColors = [
    { 
      name: "Christianity", 
      color: "faith-christian", 
      bgColor: "faith-christian-bg", 
      symbol: christianCrossImage,
      description: "Christianity is an Abrahamic monotheistic religion based on the life and teachings of Jesus Christ. With over 2.4 billion followers worldwide, it emphasizes love, forgiveness, and salvation through faith."
    },
    { 
      name: "Islam", 
      color: "faith-islam", 
      bgColor: "faith-islam-bg", 
      symbol: islamCrescentImage,
      description: "Islam is an Abrahamic monotheistic religion teaching that Muhammad is a messenger of God. Muslims believe in one God (Allah) and follow the Five Pillars, including daily prayer, charity, and pilgrimage to Mecca."
    },
    { 
      name: "Hinduism", 
      color: "faith-hinduism", 
      bgColor: "faith-hinduism-bg", 
      symbol: hinduOmImage,
      description: "Hinduism is one of the world's oldest religions, originating in the Indian subcontinent. It encompasses a diverse set of beliefs and practices, including karma, dharma, and the pursuit of moksha (liberation)."
    },
    { 
      name: "Buddhism", 
      color: "faith-buddhism", 
      bgColor: "faith-buddhism-bg", 
      symbol: buddhistDharmaWheelImage,
      description: "Buddhism is a spiritual tradition founded by Siddhartha Gautama (the Buddha) focusing on the path to enlightenment through the Four Noble Truths and the Eightfold Path. It emphasizes meditation, mindfulness, and compassion."
    },
    { 
      name: "Judaism", 
      color: "faith-judaism", 
      bgColor: "faith-judaism-bg", 
      symbol: jewishStarImage,
      description: "Judaism is one of the oldest monotheistic religions, centered on the covenant between God and the Jewish people. It emphasizes the Torah, ethical living, justice, and the importance of community and tradition."
    },
    { 
      name: "Sikhism", 
      color: "faith-sikhism", 
      bgColor: "faith-sikhism-bg", 
      symbol: sikhKhandaImage,
      description: "Sikhism is a monotheistic religion founded in Punjab, India, by Guru Nanak. It emphasizes devotion to God, equality of all people, honest living, and selfless service to humanity through the teachings of the ten Gurus."
    },
    { 
      name: "Taoism", 
      color: "faith-taoism", 
      bgColor: "faith-taoism-bg", 
      symbol: taoistYinYangImage,
      description: "Taoism is an ancient Chinese philosophy and religion emphasizing living in harmony with the Tao (the Way). It promotes balance, simplicity, spontaneity, and the interconnectedness of all things through wu wei (effortless action)."
    },
    { 
      name: "Shinto", 
      color: "faith-shinto", 
      bgColor: "faith-shinto-bg", 
      symbol: shintoToriiImage,
      description: "Shinto is the indigenous spirituality of Japan, centered on the worship of kami (spirits or deities) found in nature. It emphasizes ritual purity, reverence for ancestors, and harmony with the natural world."
    },
    { 
      name: "Bahá'í", 
      color: "faith-bahai", 
      bgColor: "faith-bahai-bg", 
      symbol: bahaiStarImage,
      description: "The Bahá'í Faith is a monotheistic religion founded in 19th-century Persia, teaching the essential unity of all religions and humanity. It emphasizes the oneness of God, progressive revelation, and the equality of all people."
    },
    { 
      name: "Jainism", 
      color: "faith-jainism", 
      bgColor: "faith-jainism-bg", 
      symbol: jainHandImage,
      description: "Jainism is an ancient Indian religion emphasizing non-violence (ahimsa), truth, and asceticism. Jains believe in the eternal nature of the soul and seek liberation through right faith, right knowledge, and right conduct."
    },
    { 
      name: "Confucianism", 
      color: "faith-confucianism", 
      bgColor: "faith-confucianism-bg", 
      symbol: confuciusCharacterImage,
      description: "Confucianism is a philosophical and ethical system based on the teachings of Confucius. It emphasizes social harmony, filial piety, proper conduct (li), and the cultivation of virtue through education and ritual."
    },
    { 
      name: "Polytheism", 
      color: "faith-polytheism", 
      bgColor: "faith-polytheism-bg", 
      symbol: polytheismCircleImage,
      description: "Polytheism encompasses belief systems that worship multiple deities, each with specific domains and powers. Ancient traditions like Greek, Roman, Norse, and Egyptian religions honored diverse pantheons of gods and goddesses."
    },
  ];

  const toggleFaith = (faithName: string) => {
    setExpandedFaith(expandedFaith === faithName ? null : faithName);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
    >
      <Card 
        className="relative rounded-3xl hover:shadow-xl transition-all duration-500 text-white"
        style={{
          background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
          boxShadow: '0px 0px 0px 2px #a79a4c, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="p-5 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1e386e] flex items-center justify-center shadow-[0_4px_15px_rgba(30,56,110,0.5)]">
              <Palette className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
            <div>
              <h3 className="text-white font-semibold" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Faith Color System</h3>
              <p className="text-sm text-white/80" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                {createdGuide 
                  ? `Your guide's faith: ${createdGuide.faith}` 
                  : "Divinity's sacred color palette"}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {religionColors.map((religion, index) => {
              const isCurrentFaith = createdGuide && createdGuide.faith === religion.name;
              const isExpanded = expandedFaith === religion.name;
              
              return (
                <motion.div
                  key={religion.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-xl border backdrop-blur-sm relative bg-[#334155]/60 overflow-hidden transition-all duration-300 ${
                    isCurrentFaith 
                      ? 'border-[#a79a4c] shadow-[0_0_20px_rgba(167,154,76,0.6)] ring-2 ring-[#a79a4c]/50' 
                      : 'border-[#475569]/30'
                  }`}
                >
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleFaith(religion.name)}
                    className="w-full p-3 text-left hover:bg-white/5 transition-colors"
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                  >
                    {isCurrentFaith && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#a79a4c] rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(167,154,76,0.8)] z-10">
                        <Star className="w-3 h-3 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <ImageWithFallback 
                          src={religion.symbol} 
                          alt={`${religion.name} symbol`}
                          className="w-5 h-5 object-contain brightness-0 invert drop-shadow-lg"
                        />
                        <span className={`text-sm font-medium ${religion.color} ${isCurrentFaith ? 'drop-shadow-[0_1px_3px_rgba(167,154,76,0.8)]' : ''}`} style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                          {religion.name}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </motion.div>
                    </div>
                    <div className={`w-full h-2 rounded-full ${religion.color.replace('text-', 'bg-')} ${
                      isCurrentFaith ? 'shadow-[0_2px_8px_rgba(167,154,76,0.5)]' : ''
                    }`} />
                  </button>

                  {/* Expandable Description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-1 border-t border-[#475569]/30">
                          <p className="text-xs text-slate-300 leading-relaxed" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                            {religion.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

FaithColorSystem.displayName = 'FaithColorSystem';

// How It Works Slider Component - Memoized
const HowItWorksSlider = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = useMemo(() => [
    {
      icon: Globe,
      title: "Cultural Diversity",
      description: "12 faith traditions with authentic spiritual guidance rooted in ancient wisdom",
      color: "#7A4FFF",
      gradientFrom: "#7A4FFF",
      gradientVia: "#9D7FFF",
      gradientTo: "#B8A4FF",
      backgroundImage: "https://images.unsplash.com/photo-1762677701442-107de2533a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3Bpcml0dWFsJTIwY3VsdHVyZXMlMjB0ZW1wbGVzfGVufDF8fHx8MTc2NDg5MzkzMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Heart,
      title: "Universal Connections",
      description: "Shared wisdom across all spiritual traditions, bridging hearts and minds",
      color: "#FFD369",
      gradientFrom: "#F59E42",
      gradientVia: "#FFB84D",
      gradientTo: "#FFD369",
      backgroundImage: "https://images.unsplash.com/photo-1762344668789-0a49621cb4a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMHVuaXR5JTIwY29ubmVjdGlvbiUyMHRvZ2V0aGVyfGVufDF8fHx8MTc2NDg5MzkzMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Shield,
      title: "Ethical Intelligence",
      description: "Advanced AI with natural language understanding and ethical decision-making",
      color: "#4A90E2",
      gradientFrom: "#4A90E2",
      gradientVia: "#5BA3F5",
      gradientTo: "#7BB8FF",
      backgroundImage: "https://images.unsplash.com/photo-1762691386073-fbcf5d8dad18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDg5MzkzMnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ], []);

  // Infinite auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <motion.div 
      className="mb-24 relative mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      {/* Content Layer */}
      <div className="relative z-10 mt-[-42px] mr-[0px] mb-[0px] ml-[0px]">
        <div className="max-w-4xl px-6 pt-[0px] pr-[24px] pl-[24px] pb-[-24px] mx-[0px] my-[272px] mt-[299px] mr-[0px] mb-[81px] ml-[0px]">
          <div className="relative group cursor-pointer">
            {/* Card with hover effects - No background, just content */}
            <div className="relative rounded-3xl overflow-hidden border-0 transition-all duration-500">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={companionGroupPoster}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ minHeight: '550px', objectPosition: 'center 60%', transform: 'scale(1.12)' }}
              >
                <source src="https://divinityagi.com/wp-content/uploads/2026/01/Companion-Group-Pose-2.mp4" type="video/mp4" />
              </video>
              
              {/* Animated Content Within - Responsive height container */}
              <div className="relative px-4 py-8 sm:p-10 md:p-12 flex flex-col items-center justify-end pb-16" style={{ minHeight: '550px' }}>
                {/* Static Glass Card Container - Always rendered at bottom */}
                <div className="w-full flex justify-center items-end">
                  {/* Transparent Glass Window Container - Square - Responsive */}
                  <div 
                    className="backdrop-blur-md rounded-2xl border-2 border-[#a79a4c] shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(167,154,76,0.4)] flex flex-col items-center justify-center overflow-hidden w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]"
                    style={{
                      background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
                      minWidth: '280px',
                      minHeight: '280px',
                      maxWidth: '420px',
                      maxHeight: '420px',
                      willChange: 'auto'
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col items-center justify-center px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 w-full h-full"
                      >
                        {/* Icon Container - Responsive */}
                        <motion.div 
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-white/30 shadow-lg transition-transform group-hover:scale-110"
                        >
                          {React.createElement(slides[currentIndex].icon, {
                            className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg"
                          })}
                        </motion.div>
                        
                        {/* Title - Responsive */}
                        <h3 
                          className="text-[20px] sm:text-[22px] md:text-[24px] text-white mb-1.5 sm:mb-2 drop-shadow-lg text-center px-2"
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1.2 }}
                        >
                          {slides[currentIndex].title}
                        </h3>
                        
                        {/* Description - Responsive */}
                        <p 
                          className="text-white/95 text-[13px] sm:text-[14px] md:text-[15px] leading-snug max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto mb-2 sm:mb-3 text-center drop-shadow-md"
                          style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, lineHeight: 1.5 }}
                        >
                          {slides[currentIndex].description}
                        </p>

                        {/* Feature badges - Responsive */}
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white/90 text-[12px] sm:text-[13px] md:text-[14px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#a79a4c] shadow-[0_0_8px_rgba(167,154,76,0.6)]" />
                            <span>Unity</span>
                          </div>
                          <span className="text-white/40">•</span>
                          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#a79a4c] shadow-[0_0_8px_rgba(167,154,76,0.6)]" />
                            <span>Diversity</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              {/* Progress Indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="transition-all duration-300"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div 
                      className={`rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-8 h-2 bg-[#a79a4c] shadow-lg shadow-[#a79a4c]/50' 
                          : 'w-2 h-2 bg-[#a79a4c]/40 hover:bg-[#a79a4c]/60'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

HowItWorksSlider.displayName = 'HowItWorksSlider';

interface CircleOfFaithsProps {
  onOpenMission?: () => void;
  onNavigateToFaith?: (faithKey: string, faithName: string) => void;
  onNavigate?: (tab: string) => void;
}

export function CircleOfFaiths({ onOpenMission, onNavigateToFaith, onNavigate }: CircleOfFaithsProps) {
  const { visitFaithTradition, awardBadge } = useBadges();
  const prefersReducedMotion = useReducedMotion();
  const { toggleCrisisSupport } = useCrisisSupport();
  
  // Get faith-specific colors function
  const getFaithColors = (faithKey: string) => {
    const colorMap: Record<string, { primary: string }> = {
      christianity: { primary: '#E5756E' },
      islam: { primary: '#6BA96E' },
      judaism: { primary: '#6394C7' },
      hinduism: { primary: '#F68969' },
      buddhism: { primary: '#FACB6B' },
      taoism: { primary: '#5A5A5A' },
      daoism: { primary: '#5A5A5A' },
      shinto: { primary: '#EA7F6A' },
      sikhism: { primary: '#F9AB5C' },
      jainism: { primary: '#B45F75' },
      polytheism: { primary: '#9566B8' },
      confucianism: { primary: '#5873AD' },
      bahai: { primary: '#B862C4' }
    };
    return colorMap[faithKey] || { primary: '#9B82FF' };
  };
  
  // Calculate positions for faith icons around the circle using percentages
  const getIconPosition = useMemo(() => {
    return (index: number, total: number) => {
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
      // Use percentage positioning (50% = center, +/- 43% for radius)
      const x = 50 + 43 * Math.cos(angle); // 43% is approximately the radius relative to container
      const y = 50 + 43 * Math.sin(angle);
      return { x: `${x}%`, y: `${y}%` }; // Return as percentages
    };
  }, []);

  // Reduced animation config for performance
  const fastTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.3 };

  return (
    <div className="min-h-screen bg-white text-[#3D3D6B] pb-20 relative overflow-hidden">
      {/* Background Video - Scrolls with page */}
      <div className="absolute top-0 left-0 right-0 h-[95vh] sm:h-[85vh] z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={starryNightPoster}
          className="w-full h-full object-cover object-center"
        >
          <source src="https://divinityagi.com/wp-content/uploads/2026/01/Starry-night-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <section className="relative px-4 sm:px-6 py-6 sm:py-8 overflow-hidden pt-[35px] pr-[16px] pb-[24px] pl-[16px]">
          {/* Content container */}
          <div className="relative z-10 max-w-4xl text-center">
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={fastTransition}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-[40px] text-white mb-4 sm:mb-6" style={{ fontFamily: "Butler, serif", fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Circle of Faith
              </h1>
              
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#8b7a4a] via-[#b69e60] to-[#d4b87a] mx-auto rounded-full mb-4 sm:mb-6" />
              
              <p className="text-[14px] sm:text-[16px] text-white max-w-2xl mx-auto px-2" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.6 }}>
                Discover faith groups from around the globe.
              </p>
            </motion.div>

            {/* Main Circle Hub with Layered Card Design */}
            <motion.div 
              className="flex justify-center mb-12 sm:mb-16 px-2 sm:px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...fastTransition, delay: 0.1 }}
            >
              {/* Transparent Container for Circle */}
              <div className="relative w-full max-w-md">
                {/* Circle Container with responsive sizing */}
                <div className="relative p-4 sm:p-6 md:p-8 flex justify-center items-center">
                  <div className="relative w-full max-w-[280px] sm:max-w-[336px] aspect-square">
                    {/* Layered Background Circle Graphic - More Visible with Rotation Animation */}
                    <div 
                      className="absolute inset-0 bg-center bg-no-repeat pointer-events-none will-change-transform gpu-accelerated"
                      style={{ 
                        backgroundImage: `url(${circleBackgroundImage})`,
                        backgroundSize: '86% 86%',
                        backgroundPosition: 'center center',
                        opacity: 0.35,
                        filter: 'brightness(1.0) contrast(1.0)',
                        animation: 'rotate-continuous 120s linear infinite'
                      }}
                    />
                    
                    {/* Subtle circular glow behind symbols - Less Intense */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(122, 79, 255, 0.03) 0%, transparent 70%)',
                        transform: 'scale(0.95)'
                      }}
                    />
                    
                    {/* Outer Circle */}
                    <div className="absolute inset-0 rounded-full">
                      {/* Faith Icons with faith-specific colors */}
                      {faithTraditions.map((faith, index) => {
                        const position = getIconPosition(index, faithTraditions.length);
                        const faithColors = getFaithColors(faith.key);
                        
                        return (
                          <motion.div
                            key={faith.name}
                            className="absolute w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer group transition-all duration-500 z-20 -translate-x-1/2 -translate-y-1/2"
                            style={{ 
                              left: position.x, 
                              top: position.y,
                              backgroundColor: 'transparent',
                              borderColor: `${faithColors.primary}`,
                              borderWidth: '1.5px',
                              boxShadow: `0 0 25px ${faithColors.primary}80, 0 0 15px ${faithColors.primary}60, 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 3px rgba(255,255,255,0.4)`
                            }}
                            whileHover={{ 
                              scale: 1.3,
                              backgroundColor: 'transparent',
                              borderColor: faithColors.primary,
                              borderWidth: '2px',
                              boxShadow: `0 0 45px ${faithColors.primary}95, 0 0 30px ${faithColors.primary}70, 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.5)`
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1
                            }}
                            transition={{ 
                              delay: index * 0.05, 
                              type: "spring", 
                              bounce: 0.4, 
                              duration: 0.3
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onNavigateToFaith?.(faith.key, faith.name);
                              visitFaithTradition(faith.key, 15); // Award 15 minutes worth of session time
                              
                              // Award badge for interfaith exploration
                              awardBadge({
                                id: `faith_explorer_${faith.key}`,
                                name: `${faith.name} Explorer`,
                                description: `Explored the wisdom of ${faith.name}`,
                                icon: Star,
                                category: 'faith',
                                rarity: 'common',
                                tokenReward: 30,
                                faithTradition: faith.key,
                                wisdomGained: [`Explored the spiritual traditions of ${faith.name}`]
                              });
                              
                              toast.success(`Exploring ${faith.name} wisdom!`, {
                                description: "You've gained new spiritual insights."
                              });
                            }}
                          >
                            {/* Animated outer glow ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full pointer-events-none"
                              style={{
                                background: `radial-gradient(circle, ${faithColors.primary}20 0%, transparent 70%)`
                              }}
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: 999,
                                repeatType: "loop",
                                ease: "easeInOut",
                                delay: index * 0.15
                              }}
                            />

                            {faith.isImage ? (
                              <ImageWithFallback
                                src={faith.icon} 
                                alt={faith.name}
                                className="w-8 h-8 object-contain transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10" 
                                style={{
                                  filter: `brightness(1.2) contrast(1.3) saturate(1.4)`,
                                }}
                              />
                            ) : (
                              <Star 
                                className="w-8 h-8 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10"
                                style={{ 
                                  color: faithColors.primary,
                                }}
                              />
                            )}
                            
                            {/* Enhanced Faith-Specific Tooltip */}
                            <div 
                              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 backdrop-blur-sm border text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30 pointer-events-none shadow-lg"
                              style={{
                                backgroundColor: `${faithColors.primary}E6`,
                                borderColor: faithColors.primary
                              }}
                            >
                              {faith.name}
                              <div 
                                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                                style={{ backgroundColor: faithColors.primary }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Enhanced Center Hub - More Vibrant */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[#b69e60]/70 via-[#d4b87a]/60 to-[#8b7a4a]/70 backdrop-blur-md border-2 border-[#b69e60] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: [
                          '0 0 30px rgba(182, 158, 96, 0.5), 0 0 50px rgba(212, 184, 122, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)',
                          '0 0 45px rgba(182, 158, 96, 0.7), 0 0 70px rgba(212, 184, 122, 0.5), 0 4px 20px rgba(0, 0, 0, 0.2)',
                          '0 0 30px rgba(182, 158, 96, 0.5), 0 0 50px rgba(212, 184, 122, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)'
                        ]
                      }}
                      transition={{ 
                        opacity: { delay: 0.3, duration: 0.3 },
                        scale: { delay: 0.3, type: "spring", bounce: 0.3, duration: 0.3 },
                        boxShadow: { 
                          duration: 3, 
                          repeat: 999, 
                          ease: "easeInOut",
                          delay: 0.6
                        }
                      }}
                      onClick={() => onNavigate?.('universal')}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b69e60] via-[#d4b87a] to-[#8b7a4a] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
                        <Infinity className="w-9 h-9 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What is Divinity Section */}
            <div className="text-center px-6 mb-[-301px] mt-[359px] mr-[0px] ml-[0px]">
              <h2 className="text-[28px] sm:text-[32px] text-[#3D3D6B] mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                What is Divinity?
              </h2>
              
              <div className="w-20 sm:w-24 h-1 bg-[#a79a4c] mx-auto rounded-full mb-4 sm:mb-6 shadow-lg" />
              
              <p className="text-[14px] text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.6 }}>
                Explore shared wisdom across spiritual traditions, earn badges along your experience.
              </p>
            </div>

            {/* How DivinityAGI Works - Enhanced Slider Section */}
            <HowItWorksSlider />

            {/* Faith Color System Section */}
            <FaithColorSystem onNavigate={onNavigate} />

            {/* How Badges Work Section */}
            <HowBadgesWorkSection />

            {/* Badge Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 mb-12"
            >
              <AchievementSummary />
            </motion.div>

            {/* Accumulated Wisdom Section */}
            <AccumulatedWisdomSection />

            {/* Recent Achievements Section - Moved to bottom */}
            <RecentAchievementsSection onNavigate={onNavigate} />
          </div>
        </section>

        {/* Your Spiritual Path Section */}
        <SpiritualJourneySection onNavigate={onNavigate} className="mb-12" />

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    </div>
  );
}