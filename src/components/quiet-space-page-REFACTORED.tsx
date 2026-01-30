import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useMeditation, MeditationSession } from "./meditation-context";
import { MeditationLibrary } from "./meditation-library";
import { MeditationReminderSystem } from "./meditation-reminder-system";
import { SpiritualJourneySection } from "./spiritual-journey-section";
import { useBadges } from "./badges-context";
import { useSavedGuides } from "./saved-guides-context";
import { useCreatedGuide } from "./created-guide-context";
import { useMatchedQuietSpace } from "./matched-quiet-space-context";
import { useArchivedQuietSpaces } from "./archived-quiet-spaces-context";
import { QuietSpaceMatchingProcess } from "./quiet-space-matching-process";
import { AppFooter } from "./app-footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getMantrasForFaith, getRandomMantra, type FaithMantra } from "./faith-mantras-config";
import { useFavoriteMantras } from "./favorite-mantras-context";
import { MANTRA_PLAYLISTS, getPlaylistById, getRandomMantraFromPlaylist, type MantraPlaylist } from "./mantra-playlists-config";
import meditationDiverseImage from 'figma:asset/4e76a58a692a35e081aba31c0497dab4a645f5ef.png';
import quietSpaceBackgroundImage from 'figma:asset/23a7d89bdbc101cda39db99bc5d6108a3ab2a28a.png';
import meditationGroupImage from 'figma:asset/14a049346d5ae8a42a12b308f26af3521f4028ac.png';
import quietSpaceVideoPoster from 'figma:asset/9426bbc63eea9946a8c5a2625fb719da63ab91f7.png';
import quietSpaceHeaderBg from 'figma:asset/27732ba45ab29f1808402bdec4138641a2757705.png';
import christianContemplationImage from 'figma:asset/9f6754668eba3ff6da371d33abd3e218e3073837.png';
import buddhistMindfulnessImage from 'figma:asset/6bdd4875f9abb3ecceccea209e1f4c70bb124d24.png';
import islamicDhikrImage from 'figma:asset/1088743f62e37bdc93c313f56608ea2a5022f256.png';
import hinduMeditationImage from 'figma:asset/05a62742b466817fc20564c7cb977a8b38f233fa.png';
import jewishReflectionImage from 'figma:asset/ee5e99e5ece2491f574fa1f4ec0961940aab57e1.png';
import universalPracticeImage from 'figma:asset/75bd714f368e2239571d58749b74eee5698aa0ec.png';
import meditationReminderImage from 'figma:asset/ee94485a89652b04097c5c626b9562a88ae80068.png';
import getVerifiedImage from 'figma:asset/9eaaa4635eafcc4f15faea5e5d0cb1a85dd10da4.png';
import trackJourneyBgImage from 'figma:asset/9b7d1bca02337a322f5da0cb293766e3a1f88fd8.png';
import { AmbientSoundSystem } from "./ambient-sound-system";
import { AmbientMiniPlayer } from "./ambient-mini-player";
import { AmbientBackgroundEffect } from "./ambient-background-effect";
import { useAmbientSound } from "../contexts/ambient-sound-context";
import { AmbientMixerControl } from "./ambient-mixer-control";
import { useMeditationAmbient } from "./hooks/use-meditation-ambient";
import { 
  Play, 
  Pause,
  Square,
  Clock,
  TrendingUp,
  Flame,
  Award,
  ChevronRight,
  Library,
  Target,
  BarChart3,
  Settings,
  Sparkles,
  Trees,
  Trophy,
  MessageCircle,
  X,
  Edit2,
  CheckCircle2,
  Heart,
  Wind,
  Volume2,
  VolumeX,
  Flower2,
  Shield
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useHapticFeedback } from "./hooks/use-haptic";

interface QuietSpacePageProps {
  onNavigate?: (tab: string) => void;
  onOpenMission?: () => void;
}

// ==================== CONSTANTS ====================

/**
 * Reusable card style for journey/achievement cards
 * Updated with glassy transparent effect
 */
const JOURNEY_CARD_STYLE = {
  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
};



/**
 * Faith tradition to background image URL mapping for meditation player
 */
const FAITH_TRADITION_IMAGES: Record<string, string> = {
  'christianity': 'https://images.unsplash.com/photo-1705608604329-49335be66661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBwcmF5ZXIlMjBjYW5kbGVzfGVufDF8fHx8MTc2MzMzNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'buddhism': 'https://images.unsplash.com/photo-1642980522170-4dc3d6851c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzYzMzM2ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'islam': 'https://images.unsplash.com/photo-1720205888671-ec64f89447ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzMzNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'hinduism': 'https://images.unsplash.com/photo-1761471676242-6ec2e8cecc8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGxvdHVzfGVufDF8fHx8MTc2MzMzNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'judaism': 'https://images.unsplash.com/photo-1538599462720-b466e1ce73d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdpc2glMjBtZW5vcmFoJTIwcHJheWVyfGVufDF8fHx8MTc2MzMzNzAxOHww&ixlib=rb-4.1.0&q=80&w=1080',
  'taoism': 'https://images.unsplash.com/photo-1735151055127-73c610ae901f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjMyODYwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'universal': 'https://images.unsplash.com/photo-1599744403700-b7330f3c4dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzYzMzM3MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080'
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get gradient colors for badge rarity levels
 * @param rarity - Badge rarity level
 * @returns Tailwind gradient class string
 */
function getRarityGradient(rarity: string): string {
  switch (rarity) {
    case 'legendary': return 'from-[#FFD369] to-amber-600';
    case 'epic': return 'from-purple-500 to-pink-600';
    case 'rare': return 'from-blue-500 to-cyan-500';
    default: return 'from-slate-500 to-slate-600';
  }
}

/**
 * Create meditation stats cards configuration
 * @param streakInfo - Streak information from meditation context
 * @param stats - Meditation statistics
 * @returns Array of stat card configurations
 */
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
      color: "#FFD369",
      bgGradient: "from-yellow-500/10 to-yellow-600/10",
      borderColor: "border-yellow-500/20"
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

/**
 * Get background image URL for a faith tradition
 * @param tradition - Faith tradition name (case-insensitive)
 * @returns Image URL for the tradition, or universal meditation background as fallback
 */
function getFaithTraditionImage(tradition?: string): string {
  if (!tradition) return FAITH_TRADITION_IMAGES.universal;
  
  const traditionLower = tradition.toLowerCase();
  return FAITH_TRADITION_IMAGES[traditionLower] || FAITH_TRADITION_IMAGES.universal;
}

// ==================== TRACK YOUR JOURNEY COMPONENT ====================

/**
 * Track Your Journey Section
 * Displays user's meditation statistics, recent badges, and progress
 */
function TrackYourJourneySection({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { unlockedBadges, totalWisdomPoints, faithWisdom, getRecentAchievements } = useBadges();
  const { savedGuides } = useSavedGuides();
  const { createdGuide } = useCreatedGuide();
  const { stats: meditationStats, getStreakInfo } = useMeditation();
  
  // Calculate stats
  const stats = {
    totalBadges: unlockedBadges.length,
    visitedFaiths: Object.values(faithWisdom).filter(fw => fw.visitCount > 0).length,
    totalConversations: savedGuides.length + (createdGuide ? 1 : 0),
    totalMinutes: Object.values(faithWisdom).reduce((sum, fw) => sum + fw.sessionMinutes, 0),
    wisdomPoints: totalWisdomPoints,
    totalMessages: createdGuide?.conversationHistory?.length || 0
  };

  const streakInfo = getStreakInfo();
  const recentBadges = getRecentAchievements(30).slice(0, 3);
  
  // Generate meditation stats cards using helper function
  const meditationStatsCards = createMeditationStatsCards(streakInfo, meditationStats);
  
  // Get recent chats (currently unused but kept for potential future enhancement)
  const recentChats = (() => {
    const guides = [];
    
    if (createdGuide) {
      const lastMessage = createdGuide.conversationHistory?.[createdGuide.conversationHistory.length - 1];
      const lastTimestamp = lastMessage?.timestamp 
        ? new Date(lastMessage.timestamp)
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
    
    savedGuides.slice(0, 3).forEach(guide => {
      guides.push({
        id: guide.id,
        name: guide.guideName,
        faith: guide.tradition,
        lastMessage: 'Continue your spiritual journey',
        messageCount: 0,
        timestamp: new Date(guide.savedAt),
        isCreatedGuide: false
      });
    });
    
    return guides.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 3);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="px-4 sm:px-6 pb-6 sm:pb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#a79a4c] rounded-xl flex items-center justify-center mr-2.5 sm:mr-3 shadow-[0_4px_15px_rgba(167,154,76,0.5)]">
            <Trophy className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-[20px] sm:text-[24px] text-[#3D3D6B]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Track Your Journey
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onNavigate?.("profile")}
          className="text-[#8E8E93] hover:text-[#1e386e] hover:bg-[#1e386e]/5 rounded-xl px-3 sm:px-4 py-2 text-[12px] sm:text-[14px]"
          style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
        >
          View All
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
        </Button>
      </div>

      <Card className="relative rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden" style={JOURNEY_CARD_STYLE}>
        {/* Background Image with 80% opacity */}
        <div className="absolute inset-0">
          <img 
            src={trackJourneyBgImage} 
            alt="Track Your Journey Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
        
        <div className="relative p-4 sm:p-6 bg-[rgba(0,0,0,0)]">
          {/* Engagement Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="bg-[#1e386e]/40 border-2 border-[#a79a4c]/60 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center hover:border-[#a79a4c] transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(167,154,76,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-0.5 sm:mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{stats.totalBadges}</div>
              <div className="text-[10px] sm:text-xs text-[#a79a4c] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(167,154,76,0.4)]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Badges</div>
            </div>
            
            <div className="bg-[#1e386e]/40 border-2 border-[#a79a4c]/60 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center hover:border-[#a79a4c] transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(167,154,76,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-0.5 sm:mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{stats.visitedFaiths}</div>
              <div className="text-[10px] sm:text-xs text-[#a79a4c] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(167,154,76,0.4)]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Faiths</div>
            </div>
            
            <div className="bg-[#1e386e]/40 border-2 border-[#a79a4c]/60 backdrop-blur-md rounded-xl p-2.5 sm:p-3 text-center hover:border-[#a79a4c] transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(167,154,76,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-0.5 sm:mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{stats.totalConversations}</div>
              <div className="text-[10px] sm:text-xs text-[#a79a4c] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(167,154,76,0.4)]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Chats</div>
            </div>
          </div>

          {/* Meditation Stats Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {meditationStatsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="bg-[#1e386e]/40 border-2 border-[#a79a4c]/60 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center hover:border-[#a79a4c] transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(167,154,76,0.4)]"
                >
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${stat.bgGradient} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-[24px] sm:text-[28px] text-white mb-0.5 sm:mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#a79a4c] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(167,154,76,0.4)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Badges */}
          {recentBadges.length > 0 ? (
            <div className="space-y-3">
              <div className="text-sm text-slate-300 uppercase tracking-wider mb-3" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>Latest Unlocked</div>
              {recentBadges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-2 border-[#a79a4c]/50 backdrop-blur-md rounded-xl p-3"
                    style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getRarityGradient(badge.rarity)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {BadgeIcon && <BadgeIcon className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-base text-white truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{badge.name}</h4>
                          <Badge className={`bg-gradient-to-r ${getRarityGradient(badge.rarity)} text-white border-0 text-xs px-2 py-0.5`} style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-300 mb-1" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>{badge.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#1e386e] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-base text-slate-300 mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Start Your Journey</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
                Explore different faith traditions and unlock achievements as you grow spiritually
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          {stats.totalBadges > 0 && (
            <div className="mt-6 pt-6 border-t border-[#1E3A5F]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>Spiritual Journey Progress</span>
                <span className="text-sm text-[#a79a4c]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>{stats.totalBadges} / 20 Milestones</span>
              </div>
              <div className="w-full bg-[#1E3A5F]/30 rounded-full h-2">
                <div 
                  className="bg-[#a79a4c] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((stats.totalBadges / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Upgrade Your Journey Button */}
          <div className="mt-6 pt-6 border-t border-[#1E3A5F]/30">
            <Button
              onClick={() => onNavigate?.('subscription')}
              className="w-full h-12 bg-[#1e386e] hover:bg-[#2a4a7c] text-white border-0 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade Your Journey
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================

export function QuietSpacePage({ onNavigate, onOpenMission }: QuietSpacePageProps) {
  const {
    activeSession,
    isPlaying,
    currentTime,
    stats,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    endSession,
    getStreakInfo,
    getSessionsByFaith,
    getAllSessions
  } = useMeditation();
  const haptic = useHapticFeedback();
  const { matchedSpace, clearMatchedSpace, hasMatchedSpace, saveMatchedSpace } = useMatchedQuietSpace();
  const { archivedSpaces, archiveSpace, removeArchivedSpace } = useArchivedQuietSpaces();
  const { favoriteMantras, isFavorite, toggleFavorite } = useFavoriteMantras();
  const { selectedSound: selectedAmbientSound, setDucking, selectSound, togglePlayPause, isPlaying: ambientIsPlaying } = useAmbientSound();

  // Auto-play ambient sound when meditation session starts
  useMeditationAmbient();

  // Video ref for meditation sessions with videos
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Responsive video positioning
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [view, setView] = useState<'home' | 'library' | 'breathing' | 'player' | 'reminders' | 'faith-space' | 'matching'>('home');
  const [selectedFaith, setSelectedFaith] = useState<string | null>(null);
  
  // Mantra/Prayer state
  const [currentMantra, setCurrentMantra] = useState<FaithMantra | null>(null);
  const [showMantra, setShowMantra] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [mantraMode, setMantraMode] = useState<'time' | 'breath' | 'favorites' | 'playlist'>('time');
  const [breathCycleCount, setBreathCycleCount] = useState(0);
  const [showMantraSettings, setShowMantraSettings] = useState(false);
  


  const streakInfo = getStreakInfo();

  // Sync video playback with meditation state
  useEffect(() => {
    if (videoRef.current && activeSession?.videoUrl) {
      if (isPlaying) {
        videoRef.current.play().catch(err => console.error('Video play error:', err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeSession]);

  // Audio ducking: Automatically reduce ambient sound volume during guided meditation
  useEffect(() => {
    if (view === 'player' && activeSession && isPlaying) {
      // Enable ducking when meditation session is playing
      setDucking(true);
    } else {
      // Restore normal volume when not in player view or paused
      setDucking(false);
    }

    // Cleanup: Restore volume when component unmounts
    return () => setDucking(false);
  }, [view, activeSession, isPlaying, setDucking]);

  // Rotate mantra based on mode (time/breath/favorites/playlist)
  useEffect(() => {
    if (activeSession && isPlaying && view === 'player') {
      const faith = activeSession.faithTradition || 'Universal';
      
      // Function to get next mantra based on mode
      const getNextMantra = (): FaithMantra => {
        if (mantraMode === 'favorites' && favoriteMantras.length > 0) {
          // Use favorites
          return favoriteMantras[Math.floor(Math.random() * favoriteMantras.length)];
        } else if (mantraMode === 'playlist' && selectedPlaylist) {
          // Use playlist
          const mantra = getRandomMantraFromPlaylist(selectedPlaylist);
          return mantra || getRandomMantra(faith);
        } else {
          // Use faith-based mantras
          const mantras = getMantrasForFaith(faith);
          return mantras[Math.floor(Math.random() * mantras.length)];
        }
      };
      
      // Set initial mantra
      if (!currentMantra) {
        const initialMantra = getNextMantra();
        setCurrentMantra(initialMantra);
        haptic?.lightTap(); // Haptic feedback on initial mantra
      }
      
      // For breath-synced mode, change on breath cycles
      if (mantraMode === 'breath') {
        // Change mantra every 4 breath cycles (inhale + exhale = 1 cycle)
        if (breathCycleCount > 0 && breathCycleCount % 4 === 0) {
          const nextMantra = getNextMantra();
          setCurrentMantra(nextMantra);
          haptic?.lightTap(); // Haptic feedback on mantra change
        }
      } else {
        // Time-based rotation every 15 seconds
        const interval = setInterval(() => {
          const nextMantra = getNextMantra();
          setCurrentMantra(nextMantra);
          haptic?.lightTap(); // Haptic feedback on mantra change
        }, 15000);
        
        return () => clearInterval(interval);
      }
    }
  }, [activeSession, isPlaying, view, mantraMode, breathCycleCount, favoriteMantras, selectedPlaylist]);

  // Helper function to map quiet space to meditation ID
  const getMeditationIdFromSpace = (space: typeof matchedSpace): string => {
    if (!space) return 'mindfulness-1';
    
    // Map faith tradition and meditation type to specific meditation IDs
    const faithLower = space.faithTradition.toLowerCase();
    const typeLower = space.meditationType.toLowerCase();
    
    // Buddhism meditations
    if (faithLower.includes('buddhism') || faithLower.includes('buddhist')) {
      if (typeLower.includes('loving') || typeLower.includes('compassion')) {
        return 'metta-1';
      }
      return 'metta-2';
    }
    
    // Christianity meditations
    if (faithLower.includes('christian')) {
      if (typeLower.includes('centering') || typeLower.includes('prayer')) {
        return 'contemplative-1';
      }
      return 'lectio-1';
    }
    
    // Islam meditations
    if (faithLower.includes('islam')) {
      return 'dhikr-1';
    }
    
    // Hinduism meditations
    if (faithLower.includes('hindu')) {
      if (typeLower.includes('chakra') || typeLower.includes('energy')) {
        return 'chakra-1';
      }
      return 'om-meditation-1';
    }
    
    // Judaism meditations
    if (faithLower.includes('jewish') || faithLower.includes('judaism')) {
      return 'hitbodedut-1';
    }
    
    // Taoism meditations
    if (faithLower.includes('tao')) {
      return 'taoist-1';
    }
    
    // Breathing exercises
    if (typeLower.includes('breath')) {
      if (typeLower.includes('box')) {
        return 'box-breathing-1';
      }
      return '478-breathing-1';
    }
    
    // Body scan
    if (typeLower.includes('body') || typeLower.includes('relaxation')) {
      return 'body-scan-1';
    }
    
    // Visualization
    if (typeLower.includes('visual')) {
      return 'chakra-1';
    }
    
    // Universal meditations
    if (typeLower.includes('gratitude')) {
      return 'gratitude-1';
    }
    
    if (typeLower.includes('walking')) {
      return 'walking-meditation-1';
    }
    
    // Default to mindfulness
    return 'mindfulness-1';
  };

  // Faith tradition meditation spaces
  const faithSpaces = [
    {
      id: 'christianity',
      name: 'Christian Contemplation',
      description: 'Centering prayer and sacred reading',
      image: christianContemplationImage,
      color: '#FFD369',
      sessions: 2
    },
    {
      id: 'buddhism',
      name: 'Buddhist Mindfulness',
      description: 'Loving-kindness and awareness',
      image: buddhistMindfulnessImage,
      color: '#FF8904',
      sessions: 2
    },
    {
      id: 'islam',
      name: 'Islamic Dhikr',
      description: 'Remembrance of the Divine',
      image: islamicDhikrImage,
      color: '#05DF72',
      sessions: 1
    },
    {
      id: 'hinduism',
      name: 'Hindu Meditation',
      description: 'Mantras and chakra balancing',
      image: hinduMeditationImage,
      color: '#497EBC',
      sessions: 2
    },
    {
      id: 'judaism',
      name: 'Jewish Reflection',
      description: 'Meditative conversation',
      image: jewishReflectionImage,
      color: '#51A2FF',
      sessions: 1
    },
    {
      id: 'universal',
      name: 'Universal Practice',
      description: 'Mindfulness for all traditions',
      image: universalPracticeImage,
      color: '#9810FA',
      sessions: 5
    }
  ];



  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    if (!activeSession) return 0;
    return (currentTime / activeSession.duration) * 100;
  };

  // Handle session start from library
  const handleStartSession = (session: MeditationSession) => {
    startSession(session);
    setView('player');
  };



  // Generate stats cards using helper function
  const statsCards = createMeditationStatsCards(streakInfo, stats);

  // ==================== HOME VIEW ====================
  if (view === 'home') {
    return (
      <>
        {/* Dynamic Background Effect */}
        <AmbientBackgroundEffect enabled={true} opacity={0.15} />
        
        {/* Parent container with white background */}
        <div className="min-h-screen pb-20 bg-white relative">
          
          <div className="max-w-md mx-auto relative z-10">
          
          {/* Header Section with Background Image */}
          <section className="px-4 sm:px-6 pt-[30px] sm:pb-2 text-center relative z-10 mx-auto max-w-full min-h-screen sm:min-h-[500px]">
            {/* Background Image - Full width bleed */}
            <div className="absolute inset-0 left-[calc(-50vw+50%)] right-[calc(-50vw+50%)] w-screen overflow-hidden -z-10">
              <img 
                src={quietSpaceHeaderBg} 
                alt="" 
                className="w-full h-full object-cover opacity-100"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-0 sm:mb-2 relative py-8"
            >
              {/* Flower Icon */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <Flower2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <h1 className="text-[40px] sm:text-[48px] text-white mb-1 sm:mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Quiet Space
              </h1>
              
              <div className="w-20 h-0.5 sm:h-1 sm:w-24 bg-[#a79a4c] mx-auto rounded-full mb-1 sm:mb-3" />
              
              <p className="text-[15px] sm:text-[16px] text-white mb-0 sm:mb-3 px-8 sm:px-20" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.5 }}>
                Find a meditation space tailored to your wellness goals or traditions.
              </p>
            </motion.div>
          </section>

          {/* Find a Quiet Space Button - Only show when no space is matched */}
          {!hasMatchedSpace && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="px-4 sm:px-6 pb-6 sm:pb-6 pt-12 lg:grid lg:grid-cols-2 lg:gap-6 relative z-20"
            >
              {/* Discover a Space - Background Image Container with Glassmorphism Card */}
              <div className="relative rounded-3xl overflow-visible min-h-[650px] sm:min-h-[700px] md:min-h-[750px]">
                {/* Background Video - Full height, no crop */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={quietSpaceVideoPoster}
                    className="w-full h-full object-contain"
                    style={{ objectPosition: 'center top' }}
                  >
                    <source src="https://divinityagi.com/wp-content/uploads/2026/01/Quiet-space-sq.mp4" type="video/mp4" />
                    {/* Fallback to poster image if video doesn't load */}
                    <img 
                      src={quietSpaceVideoPoster} 
                      alt="Meditation Group"
                      className="w-full h-full object-contain"
                      style={{ objectPosition: 'center top' }}
                    />
                  </video>
                </div>
                
                {/* Glassmorphism Card Overlay - Centered at bottom */}
                <div className="absolute inset-x-0 bottom-6 sm:bottom-6 flex justify-center px-3 sm:px-4 mx-[0px] my-[202px]">
                  <div 
                    className="cursor-pointer group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px]"
                    onClick={() => {
                      haptic?.tap();
                      setView('matching');
                    }}
                  >
                    <Card
                      className="relative overflow-hidden rounded-2xl border-2 border-[#a79a4c] shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(167,154,76,0.4)] backdrop-blur-md w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] mx-auto"
                      style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}
                    >
                      {/* Content */}
                      <div className="relative z-10 p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center h-full">
                        <div className="text-center">
                          
                          <div className="flex justify-center mb-1.5 sm:mb-2">
                            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/50 shadow-lg">
                              <Flower2 className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-white" />
                            </div>
                          </div>
                          
                          <h3 className="text-[20px] sm:text-[24px] md:text-[26px] text-white mb-1 sm:mb-1.5 drop-shadow-lg leading-tight" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                            Discover a Space
                          </h3>
                          
                          <p className="text-white text-[12px] sm:text-[14px] md:text-[15px] mb-2 sm:mb-3 max-w-xs mx-auto drop-shadow px-2 sm:px-0" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, lineHeight: '1.5' }}>
                            Find a personalized meditation space tailored to your spiritual journey and wellness goals
                          </p>
                          
                          <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-[10px] sm:text-[13px] md:text-[14px] mb-3 sm:mb-4 flex-wrap px-2" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                              <span>Personalized matching</span>
                            </div>
                            <span className="text-white/70 hidden sm:inline">•</span>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                              <span>Faith-centered</span>
                            </div>
                          </div>
                          
                          <div className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#a79a4c] hover:bg-[#8b7a4a] rounded-full text-white shadow-[0_4px_20px_rgba(167,154,76,0.4),0_0_30px_rgba(167,154,76,0.2)] hover:shadow-[0_6px_30px_rgba(167,154,76,0.6),0_0_40px_rgba(167,154,76,0.3)] transition-all text-[12px] sm:text-[15px] md:text-[16px] touch-manipulation active:scale-95" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                            Begin Your Journey
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Matched Quiet Space Section */}
          {hasMatchedSpace && matchedSpace && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="px-4 sm:px-6 pb-4 sm:pb-6 pt-12 sm:pt-16 relative z-10"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-[32px] sm:text-[40px] text-[#3D3D6B]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Your Quiet Space
                </h2>
              </div>

              <Card className="relative overflow-hidden border-2 border-[#a79a4c] shadow-lg backdrop-blur-xl" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${matchedSpace.imageUrl})` }}
                />
                
                {/* Gradient Overlay - Removed */}

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge className="bg-[#a79a4c] text-white border-0 text-xs px-2 py-0.5" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                          {matchedSpace.faithTradition}
                        </Badge>
                        {matchedSpace.matchScore && matchedSpace.matchScore >= 90 && (
                          <Badge className="bg-[#1e386e] text-white border-0 text-xs px-2 py-0.5" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                            <Sparkles className="w-3 h-3 mr-1" />
                            Perfect Match
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-[20px] sm:text-[24px] text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        {matchedSpace.name}
                      </h3>
                      <p className="text-white/90 text-[13px] sm:text-[14px] mb-4 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                        {matchedSpace.description}
                      </p>
                    </div>
                  </div>

                  {/* Practices */}
                  <div className="mb-4">
                    <div className="text-[12px] text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                      Practices Include
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchedSpace.practices.map((practice, idx) => (
                        <span 
                          key={idx}
                          className="text-[12px] px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white"
                          style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <div className="text-[12px] text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                      Key Benefits
                    </div>
                    <div className="space-y-1">
                      {matchedSpace.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#05DF72] flex-shrink-0 mt-0.5" />
                          <span className="text-[13px] text-white/90" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                      <Clock className="w-5 h-5 text-[#a79a4c] mx-auto mb-1" />
                      <div className="text-[18px] text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        {matchedSpace.duration} min
                      </div>
                      <div className="text-[11px] text-white/70" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                        Recommended
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                      <Target className="w-5 h-5 text-[#51A2FF] mx-auto mb-1" />
                      <div className="text-[14px] text-white truncate" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                        {matchedSpace.meditationType}
                      </div>
                      <div className="text-[11px] text-white/70" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}>
                        Focus Type
                      </div>
                    </div>
                  </div>

                  {/* Launch Button */}
                  <Button
                    onClick={() => {
                      haptic?.tap();
                      if (matchedSpace) {
                        // Get the meditation ID from the matched space
                        const meditationId = getMeditationIdFromSpace(matchedSpace);
                        
                        // Find the meditation from the library
                        const meditation = getAllSessions().find(m => m.id === meditationId);
                        
                        if (meditation) {
                          handleStartSession(meditation);
                          toast.success(`Starting ${meditation.title}`);
                        } else {
                          toast.error('Meditation not found');
                        }
                      }
                    }}
                    className="w-full h-12 bg-[#a79a4c] hover:bg-[#8b7a4a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all border-0 mb-3"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Launch Your Quiet Space →
                  </Button>

                  {/* Exit as Guest Button - Archive and Reset */}
                  <Button
                    onClick={() => {
                      haptic?.tap();
                      if (matchedSpace) {
                        // Archive current matched space
                        const meditationId = getMeditationIdFromSpace(matchedSpace);
                        archiveSpace({
                          ...matchedSpace,
                          meditationId
                        });
                        toast.success(`${matchedSpace.name} saved to Your Quiet Spaces`);
                        
                        // Clear the matched space to reset to default state
                        clearMatchedSpace();
                        
                        // Show success message
                        setTimeout(() => {
                          toast.info('Returned to home. Your space is saved below.');
                        }, 300);
                      }
                    }}
                    className="w-full h-12 bg-[#1e386e] hover:bg-[#2a4a7c] text-white border-0 rounded-xl shadow-lg text-[14px] transition-all mb-3"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Exit Space (Save for Later)
                  </Button>

                  {/* Rematch Button */}
                  <Button
                    onClick={() => {
                      haptic?.lightTap();
                      // Archive current match before finding a new one
                      if (matchedSpace) {
                        // Find the corresponding meditation ID from the library
                        const meditationId = getMeditationIdFromSpace(matchedSpace);
                        archiveSpace({
                          ...matchedSpace,
                          meditationId
                        });
                        toast.success(`${matchedSpace.name} saved to Your Quiet Spaces`);
                        
                        // Clear the matched space
                        clearMatchedSpace();
                      }
                      setView('matching');
                    }}
                    className="w-full h-12 bg-[#1e386e] hover:bg-[#2a4a7c] text-white border-0 rounded-xl shadow-lg text-[14px] transition-all"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Find a Different Space
                  </Button>
                </div>
              </Card>
            </motion.section>
          )}

          {/* Your Quiet Spaces Section */}
          {archivedSpaces.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="px-4 sm:px-6 pb-4 sm:pb-6 relative z-10"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-[20px] sm:text-[24px] text-[#3D3D6B]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Your Saved Spaces
                </h2>
                <span className="text-[11px] sm:text-[12px] text-gray-500" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                  {archivedSpaces.length} saved
                </span>
              </div>

              <div className="space-y-3">
                {archivedSpaces.slice(0, 5).map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="relative overflow-hidden border-2 border-[#a79a4c]/60 hover:border-[#a79a4c] transition-all group" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                      {/* Compact background image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ backgroundImage: `url(${space.imageUrl})` }}
                      />
                      
                      {/* Gradient overlay - Removed */}

                      {/* Content */}
                      <div className="relative z-10 p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white text-[14px] sm:text-[16px] mb-1 truncate" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                              {space.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-white/80">
                              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                                {space.faithTradition}
                              </span>
                              <span>•</span>
                              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                                {space.duration} min
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              haptic?.lightTap();
                              removeArchivedSpace(space.id);
                              toast.success('Space removed');
                            }}
                            className="h-8 w-8 bg-[#1e386e] hover:bg-[#2a4a7c] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              haptic?.tap();
                              const session: MeditationSession = {
                                id: space.meditationId,
                                title: space.name,
                                description: space.description,
                                duration: space.duration * 60,
                                faithTradition: space.faithTradition,
                                instructor: space.meditationType,
                                category: 'mindfulness',
                                difficulty: 'beginner'
                              };
                              handleStartSession(session);
                              toast.success(`Starting ${space.name}`);
                            }}
                            className="h-9 bg-[#a79a4c] hover:bg-[#8b7a4a] text-white border-0 rounded-lg text-[12px]"
                            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Start
                          </Button>
                          
                          <Button
                            size="sm"
                            onClick={() => {
                              haptic?.tap();
                              // Set this archived space as the featured/matched space
                              const matchedSpaceData: Omit<MatchedQuietSpace, 'matchedAt'> = {
                                id: space.id,
                                name: space.name,
                                faithTradition: space.faithTradition,
                                description: space.description,
                                benefits: space.benefits,
                                practices: space.practices,
                                ambientSound: space.ambientSound,
                                meditationType: space.meditationType,
                                duration: space.duration,
                                imageUrl: space.imageUrl,
                                matchScore: 95 // Set high match score for saved spaces
                              };
                              saveMatchedSpace(matchedSpaceData);
                              // Remove from archived since it's now the active matched space
                              removeArchivedSpace(space.id);
                              toast.success(`${space.name} is now your featured Quiet Space!`);
                            }}
                            className="h-9 bg-[#1e386e] hover:bg-[#2a4a7c] text-white border-0 rounded-lg text-[12px]"
                            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Feature
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {archivedSpaces.length > 5 && (
                <p className="text-center text-[12px] text-gray-500 mt-3" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400 }}>
                  Showing 5 of {archivedSpaces.length} saved spaces
                </p>
              )}
            </motion.section>
          )}

          {/* Faith Traditions Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-4 sm:px-6 pb-6 sm:pb-8 pt-6 sm:pt-8 relative z-30"
          >
            <h2 className="text-[26px] sm:text-[36px] text-[#3D3D6B] mb-5 sm:mb-7 text-center px-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              Guided Meditations
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {faithSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                >
                  <Card
                    onClick={() => {
                      haptic?.lightTap();
                      setView('library');
                      toast.success(`Explore ${space.name}`);
                    }}
                    className="relative h-36 sm:h-48 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${space.image})` }}
                    />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 bg-[rgba(0,0,0,0.4)]">
                      <div className="flex justify-end">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Library className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <h3 className="text-white text-[15px] sm:text-[18px] mb-0.5 sm:mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                          {space.name}
                        </h3>
                        <p className="text-white/90 text-[11px] sm:text-[13px] mb-2 leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          {space.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge 
                            className="text-[9px] sm:text-[10px] px-2 py-0.5 border-white/30"
                            style={{ 
                              backgroundColor: `${space.color}40`,
                              color: 'white',
                              borderColor: space.color,
                              fontFamily: 'Raleway, sans-serif',
                              fontWeight: 600
                            }}
                          >
                            {space.sessions} session{space.sessions !== 1 ? 's' : ''}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Favorite Mantras Section */}
          {favoriteMantras.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="px-6 pb-6 relative z-10"
            >
              <h2 
                className="text-[20px] mb-4 flex items-center gap-2" 
                style={{ 
                  fontFamily: "Playfair Display, serif", 
                  fontWeight: 700,
                  color: '#FF6B9D'
                }}
              >
                <Heart className="w-5 h-5 fill-[#FF6B9D]" />
                Favorite Mantras ({favoriteMantras.length})
              </h2>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {favoriteMantras.map((mantra, index) => (
                  <motion.div
                    key={mantra.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  >
                    <Card className="bg-white border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="text-[10px] bg-[#a79a4c]/20 text-[#a79a4c] border-[#a79a4c]/40" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                              {mantra.category}
                            </Badge>
                            <Badge className="text-[10px] bg-[#1e386e]/20 text-[#1e386e] border-[#1e386e]/40" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
                              {mantra.tradition}
                            </Badge>
                          </div>
                          <p className="text-gray-900 text-sm mb-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                            {mantra.text}
                          </p>
                          {mantra.translation && (
                            <p className="text-gray-500 text-xs italic" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                              {mantra.translation}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => {
                            toggleFavorite(mantra);
                            haptic?.lightTap();
                            toast.success('Removed from favorites');
                          }}
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 rounded-full hover:bg-red-50 flex-shrink-0"
                        >
                          <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Find Your Quiet Space Actions */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="px-4 sm:px-6 pb-4 sm:pb-6 relative z-10"
          >
            <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-6"
              >
                <Card 
                  onClick={() => {
                    haptic?.lightTap();
                    setView('reminders');
                  }}
                  className="relative overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[160px] sm:min-h-[180px] border-2 border-[#a79a4c] rounded-2xl"
                  style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}
                >
                  {/* Content */}
                  <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                          <Settings className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white text-base sm:text-lg mb-0.5" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                            Meditation Reminders
                          </h3>
                          <p className="text-white/70 text-[11px] sm:text-xs" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                            Build a consistent daily practice
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4.5 h-4.5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-white/15">
                      <div className="flex items-center gap-3 text-white/80 text-[10px] sm:text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                            Custom schedules
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                            Gentle notifications
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Track Your Journey Section */}
          <TrackYourJourneySection onNavigate={onNavigate} />

          {/* Your Spiritual Path Section */}
          <SpiritualJourneySection 
            onNavigate={onNavigate}
            className="mt-2"
          />

          {/* Footer */}
          <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
          </div>
        
        {/* Persistent Mini-Player */}
        <AmbientMiniPlayer />
      </div>
      </>
    );
  }

  // ==================== MATCHING PROCESS VIEW ====================
  if (view === 'matching') {
    return (
      <QuietSpaceMatchingProcess
        onComplete={() => {
          setView('home');
          toast.success('Your perfect quiet space awaits!');
        }}
        onCancel={() => setView('home')}
      />
    );
  }

  // ==================== LIBRARY VIEW ====================
  if (view === 'library') {
    return (
      <MeditationLibrary
        onStartSession={handleStartSession}
        onBack={() => setView('home')}
      />
    );
  }

  // ==================== REMINDERS VIEW ====================
  if (view === 'reminders') {
    return (
      <div className="min-h-screen bg-[#F5F7FA] pb-24">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => setView('home')}
            className="mb-6 text-gray-600 hover:text-[#3D3D6B]"
          >
            ← Back
          </Button>

          <h1 className="text-3xl mb-2 text-center text-[#3D3D6B]" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}>
            Meditation Reminders
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Build a consistent meditation practice with daily reminders
          </p>

          <MeditationReminderSystem />
        </div>
      </div>
    );
  }



  // ==================== PLAYER VIEW ====================
  if (view === 'player') {
    // If no active session, go back to home
    if (!activeSession) {
      setView('home');
      return null;
    }

    return (
      <div className="min-h-screen relative flex flex-col pb-24 overflow-hidden">
        {/* Background Video or Image */}
        {activeSession.videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={activeSession.videoUrl}
              poster={activeSession.posterUrl}
              loop
              playsInline
              autoPlay={isPlaying}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </>
        ) : (
          <>
            {/* Background Image with Blur */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${getFaithTraditionImage(activeSession.faithTradition)})`,
                filter: 'blur(8px)',
                transform: 'scale(1.1)'
              }}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl mb-2 text-white drop-shadow-lg" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}>
              {activeSession.title}
            </h1>
            <p className="text-white/90 text-sm sm:text-base mb-4 drop-shadow-md px-4">{activeSession.description}</p>
            {activeSession.instructor && (
              <p className="text-white/80 text-sm drop-shadow-md">Guided by {activeSession.instructor}</p>
            )}
          </motion.div>

          {/* Playlist Selector */}
          <AnimatePresence>
            {showMantraSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 max-w-md mx-auto px-4"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-xl">
                  <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                    <Library className="w-4 h-4" />
                    Select Playlist
                  </h3>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {MANTRA_PLAYLISTS.map(playlist => (
                      <Button
                        key={playlist.id}
                        onClick={() => {
                          setSelectedPlaylist(playlist.id);
                          setMantraMode('playlist');
                          setShowMantraSettings(false);
                          haptic?.lightTap();
                          toast.success(`Playing: ${playlist.name}`);
                        }}
                        size="sm"
                        variant={selectedPlaylist === playlist.id && mantraMode === 'playlist' ? 'default' : 'outline'}
                        className={`text-xs justify-start ${
                          selectedPlaylist === playlist.id && mantraMode === 'playlist'
                            ? 'bg-[#497EBC] text-white'
                            : 'bg-white/5 text-white border-white/20'
                        }`}
                      >
                        <span className="mr-1">{playlist.icon}</span>
                        {playlist.name}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer Circle - Mobile Optimized */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 sm:mb-12"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - getProgress() / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#497EBC" />
                  <stop offset="100%" stopColor="#b69e60" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl text-white mb-2 font-mono drop-shadow-lg">
                  {formatTime(activeSession.duration - currentTime)}
                </div>
                <div className="text-white/80 text-sm sm:text-base drop-shadow-md">remaining</div>
              </div>
            </div>
          </motion.div>

          {/* Controls - Mobile Optimized */}
          <div className="flex gap-4 items-center">
            {/* Mantra Toggle */}
            <Button
              onClick={() => {
                haptic?.lightTap();
                setShowMantra(!showMantra);
                toast.success(showMantra ? 'Mantra hidden' : 'Mantra shown');
              }}
              size="lg"
              variant="outline"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-xl backdrop-blur-sm"
              title={showMantra ? 'Hide mantra' : 'Show mantra'}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            
            {/* Play/Pause */}
            <Button
              onClick={() => {
                haptic?.lightTap();
                isPlaying ? pauseSession() : resumeSession();
              }}
              size="lg"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#497EBC] to-[#b69e60] hover:opacity-90 shadow-xl"
            >
              {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />}
            </Button>
            
            {/* Stop */}
            <Button
              onClick={() => {
                haptic?.lightTap();
                endSession();
                setView('home');
                toast.info('Meditation ended');
              }}
              size="lg"
              variant="outline"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-red-500/50 bg-white/10 text-white hover:bg-red-500/20 shadow-xl backdrop-blur-sm"
            >
              <Square className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>

          {/* Mantra/Prayer Display - Mobile Optimized */}
          <AnimatePresence mode="wait">
            {currentMantra && showMantra && (
              <motion.div
                key={currentMantra.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="mt-6 max-w-md mx-auto px-4"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6 rounded-2xl shadow-2xl relative">
                  {/* Favorite Button */}
                  <Button
                    onClick={() => {
                      toggleFavorite(currentMantra);
                      haptic?.lightTap();
                      toast.success(isFavorite(currentMantra.id) ? 'Removed from favorites' : 'Added to favorites');
                    }}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full hover:bg-white/20"
                  >
                    <Heart 
                      className={`w-4 h-4 ${isFavorite(currentMantra.id) ? 'fill-red-400 text-red-400' : 'text-white/60'}`} 
                    />
                  </Button>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge className="bg-[#FFD369]/20 text-[#FFD369] border-[#FFD369]/40 text-xs">
                        {currentMantra.category.charAt(0).toUpperCase() + currentMantra.category.slice(1)}
                      </Badge>
                      {mantraMode === 'breath' && (
                        <Badge className="bg-[#51A2FF]/20 text-[#51A2FF] border-[#51A2FF]/40 text-xs">
                          Breath-Synced
                        </Badge>
                      )}
                      {mantraMode === 'playlist' && selectedPlaylist && (
                        <Badge className="bg-[#497EBC]/20 text-[#497EBC] border-[#497EBC]/40 text-xs">
                          {getPlaylistById(selectedPlaylist)?.name}
                        </Badge>
                      )}
                    </div>
                    <p 
                      className="text-white text-lg sm:text-2xl mb-2 leading-relaxed" 
                      style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 500 }}
                    >
                      {currentMantra.text}
                    </p>
                    {currentMantra.translation && (
                      <p className="text-white/70 text-sm sm:text-base italic">
                        {currentMantra.translation}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ambient Sound Control - Stop Sound Button */}
          {selectedAmbientSound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl max-w-md mx-auto"
            >
              <Volume2 className="w-5 h-5 text-[#497EBC]" />
              <div className="flex-1">
                <div className="text-sm text-white drop-shadow-md" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 600 }}>
                  {selectedAmbientSound.name} {ambientIsPlaying ? 'playing' : 'paused'}
                </div>
                <div className="text-xs text-white/70 drop-shadow-sm" style={{ fontFamily: "Helvetica, sans-serif" }}>
                  Ambient background sound
                </div>
              </div>
              <Button
                onClick={() => {
                  togglePlayPause();
                  haptic?.lightTap();
                  toast.success(ambientIsPlaying ? 'Ambient sound stopped' : 'Ambient sound playing');
                }}
                size="sm"
                variant="outline"
                className={ambientIsPlaying 
                  ? "border-red-500/50 bg-white/10 text-white hover:bg-red-500/20 backdrop-blur-sm"
                  : "border-green-500/50 bg-white/10 text-white hover:bg-green-500/20 backdrop-blur-sm"
                }
              >
                {ambientIsPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-1" />
                    Stop Sound
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Play Sound
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Ambient Sound Mixer Control - Bottom Right Overlay */}
        {selectedAmbientSound && (
          <div className="absolute bottom-4 right-4 z-50">
            <AmbientMixerControl showSoundName={true} />
          </div>
        )}
      </div>
    );
  }

  // Fallback to home view
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
