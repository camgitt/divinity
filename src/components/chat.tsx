import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ActiveSessionTimer } from "./active-session-timer";
import { SubscriptionPromotionBanner } from "./subscription-promotion-banner";
import { AppFooter } from "./app-footer";
import { MeditationStatsWidget } from "./meditation-stats-widget";
import { EditGuideModal } from "./edit-guide-modal";
import { toast } from "sonner@2.0.3";
import { useBadges } from "./badges-context";
import { useSavedGuides } from "./saved-guides-context";
import { useSubscription } from "./subscription-context";
import { useCreatedGuide } from "./created-guide-context";
import { getFaithSymbol } from "./faith-symbols-config";
import { useSound } from "./sound-context";
import spiritualBackgroundImage from 'figma:asset/d88ee8d6bf275d6548494707f228150e8905bb7b.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import timSteinruckImage from 'figma:asset/48b12ef0b6370f5ebfae5ad3819479fd7b6afcff.png';
import flamingEagleImage from 'figma:asset/341a4bc4b33138de77876dfe60a41b4c3e40e611.png';
import { 
  Play,
  Eye,
  Maximize,
  ArrowRight,
  MessageCircle,
  MessageSquare,
  Clock,
  Infinity,
  Users,
  BookOpen,
  Church,
  Scroll,
  Headphones,
  Heart,
  Globe,
  Shield,
  ChevronRight,
  Star,
  Archive,
  Search,
  MoreVertical,
  Plus,
  Award,
  Sparkles,
  Flower2,
  ChevronDown,
  X,
  Send,
  Minimize2,
  Download,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Meh,
  Frown,
  Trophy,
  Compass,
  Crown,
  Share2,
  Copy,
  QrCode,
  Link as LinkIcon,
  ExternalLink,
  User,
  Edit,
  PlusCircle
} from "lucide-react";

// Helper function to get faith symbol emoji based on tradition
const getFaithSymbolEmoji = (tradition: string): string => {
  const traditionLower = tradition.toLowerCase();
  
  // Map tradition names to faith symbol keys
  const traditionToKeyMap: Record<string, string> = {
    'christianity': 'christian',
    'islam': 'islamic',
    'judaism': 'jewish',
    'buddhism': 'buddhist',
    'hinduism': 'shakti',
    'shinto': 'shinto',
    'jainism': 'jain',
    'taoism': 'taoist',
    'daoism': 'taoist',
    'sikhism': 'sikhism',
    "bahá'í": 'bahai',
    'bahai': 'bahai',
    'confucianism': 'sage',
    'polytheism': 'polytheism',
    'universal': 'sage',
    'personal guide': 'sage'
  };
  
  // Find matching key
  const faithKey = traditionToKeyMap[traditionLower] || 'sage';
  
  // Get the faith symbol config and return emoji
  const faithConfig = getFaithSymbol(faithKey);
  return faithConfig.emoji;
};

interface ChatCategory {
  id: string;
  title: string;
  image: string;
  icon: any;
}

const chatCategories: ChatCategory[] = [
  {
    id: "spirit-guides",
    title: "Spirit Guides",
    image: "https://images.unsplash.com/photo-1626324568189-c09445b2a481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHNwaXJpdHVhbCUyMGF2YXRhciUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4ODU3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Users
  },
  {
    id: "learning-growth",
    title: "Learning & Growth",
    image: "https://images.unsplash.com/photo-1752920299210-0b727800ea50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTg4NTczMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: BookOpen
  },
  {
    id: "virtual-worship",
    title: "Virtual Worship Spaces",
    image: "https://images.unsplash.com/photo-1578668189974-f7525881ae9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3JzaGlwJTIwc3BhY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg4NTczMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Church
  },
  {
    id: "scripture-archives",
    title: "Scripture Archives",
    image: "https://images.unsplash.com/photo-1474645303019-23542b4c63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBtZWRpdGF0aW9uJTIwc3BhY2V8ZW58MXx8fHwxNzU4ODU3MzAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Scroll
  },
  {
    id: "meditation-zone",
    title: "Meditation Zone",
    image: "https://images.unsplash.com/photo-1694614513690-25cfb8e764f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx6ZW4lMjBnYXJkZW4lMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1ODg1NzMwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Headphones
  },
  {
    id: "community-connection",
    title: "Community Connection",
    image: "https://images.unsplash.com/photo-1758549803229-6f83ec216c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU4ODU3MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Heart
  },
  {
    id: "divinityverse",
    title: "DivinityVerse",
    image: "https://images.unsplash.com/photo-1728756666032-d0b5552b6384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMHVuaXZlcnNlJTIwc3BhY2V8ZW58MXx8fHwxNzU4ODU3MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Globe
  },
  {
    id: "council-care",
    title: "Council and Care",
    image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4Nzk5MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Shield
  }
];

// Archived chats data
const archivedChats = [
  {
    id: 1,
    guideName: "Sister Mary Catherine",
    tradition: "Christianity",
    topic: "Finding Peace in Difficult Times",
    lastMessage: "Remember, even in our darkest moments, there is always hope. The light within you cannot be extinguished.",
    timestamp: "2 days ago",
    duration: "32 min",
    avatar: "🕊️",
    rating: 5
  },
  {
    id: 2,
    guideName: "Rabbi David Cohen",
    tradition: "Judaism", 
    topic: "Understanding Purpose Through Torah",
    lastMessage: "Your questions show wisdom beyond your years. Continue to seek understanding in the sacred texts.",
    timestamp: "1 week ago",
    duration: "45 min",
    avatar: "✡️",
    rating: 5
  },
  {
    id: 3,
    guideName: "Imam Abdullah Hassan",
    tradition: "Islam",
    topic: "Balancing Faith and Daily Life",
    lastMessage: "May Allah's peace be upon you. Your dedication to maintaining faith while navigating modern challenges is admirable.",
    timestamp: "2 weeks ago",
    duration: "28 min",
    avatar: "☪️",
    rating: 4
  }
];

// Recent Achievements Section Component (copied from Circle page)
function RecentAchievementsSection({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { unlockedBadges, totalWisdomPoints, faithWisdom, getRecentAchievements } = useBadges();
  const { savedGuides } = useSavedGuides();
  const { createdGuide } = useCreatedGuide();
  
  // Get engagement statistics
  const getEngagementStats = () => {
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
  };

  const stats = getEngagementStats();
  const recentBadges = getRecentAchievements(30).slice(0, 3); // Show top 3 recent badges
  
  // Get recent chat guides (including created guide and saved guides)
  const getRecentChatGuides = () => {
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
        avatar: guide.avatar, // Include avatar property
        lastMessage: 'Continue your spiritual journey',
        messageCount: 0,
        timestamp: new Date(guide.savedAt), // Ensure it's a Date object
        isCreatedGuide: false
      });
    });
    
    // Sort by most recent - now all timestamps are Date objects
    return guides.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 3);
  };
  
  const recentChats = getRecentChatGuides();

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 mt-20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-500 to-[#FFD369] rounded-xl flex items-center justify-center mr-3 flex-shrink-0 shadow-[0_4px_15px_rgba(255,211,105,0.5)]">
            <Trophy className="w-5 h-5 sm:w-4 sm:h-4 text-slate-900 drop-shadow-lg" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,211,105,0.4)]">
            Recent Achievements
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onNavigate?.("profile")}
          className="text-slate-400 hover:text-white hover:bg-[#162844]/50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 self-start sm:self-auto"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 backdrop-blur-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(122,79,255,0.3)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/8 to-transparent opacity-80" />
        
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* Engagement Stats Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#FFD369]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,105,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{stats.totalBadges}</div>
              <div className="text-xs text-[#FFD369] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(255,211,105,0.4)]">Badges</div>
            </div>
            
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#7A4FFF]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(122,79,255,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{stats.visitedFaiths}</div>
              <div className="text-xs text-[#7A4FFF] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(122,79,255,0.4)]">Faiths</div>
            </div>
            
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#FFD369]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,105,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{stats.totalConversations}</div>
              <div className="text-xs text-[#FFD369] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(255,211,105,0.4)]">Chats</div>
            </div>
            
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#7A4FFF]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(122,79,255,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{Math.floor(stats.totalMinutes / 60)}h</div>
              <div className="text-xs text-[#7A4FFF] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(122,79,255,0.4)]">Time</div>
            </div>
            
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#FFD369]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,211,105,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{stats.wisdomPoints}</div>
              <div className="text-xs text-[#FFD369] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(255,211,105,0.4)]">Wisdom</div>
            </div>
            
            <div className="bg-[#1E3A5F]/40 border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 text-center hover:border-[#7A4FFF]/70 transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(122,79,255,0.4)]">
              <div className="text-xl sm:text-2xl text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{stats.totalMessages}</div>
              <div className="text-xs text-[#7A4FFF] uppercase tracking-wide drop-shadow-[0_0_8px_rgba(122,79,255,0.4)]">Messages</div>
            </div>
          </div>

          {/* Recent Chat History - Mobile Optimized */}
          {recentChats.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-slate-400 uppercase tracking-wider mb-3">Recent Conversations</div>
              <div className="space-y-3">
                {recentChats.map((chat, index) => {
                  // Get faith-specific colors
                  const getFaithColors = (faith: string) => {
                    const colorMap: Record<string, { primary: string, light: string }> = {
                      Christianity: { primary: '#E53935', light: 'rgba(229, 57, 53, 0.2)' },
                      Islam: { primary: '#2E7D32', light: 'rgba(46, 125, 50, 0.2)' },
                      Hinduism: { primary: '#F4511E', light: 'rgba(244, 81, 30, 0.2)' },
                      Buddhism: { primary: '#F9A825', light: 'rgba(249, 168, 37, 0.2)' },
                      Taoism: { primary: '#212121', light: 'rgba(33, 33, 33, 0.2)' },
                      Daoism: { primary: '#212121', light: 'rgba(33, 33, 33, 0.2)' },
                      Shinto: { primary: '#E64A19', light: 'rgba(230, 74, 25, 0.2)' },
                      Judaism: { primary: '#1565C0', light: 'rgba(21, 101, 192, 0.2)' },
                      Sikhism: { primary: '#F57F17', light: 'rgba(245, 127, 23, 0.2)' },
                      Jainism: { primary: '#8E1537', light: 'rgba(142, 21, 55, 0.2)' },
                      Polytheism: { primary: '#6A1B9A', light: 'rgba(106, 27, 154, 0.2)' },
                      Confucianism: { primary: '#1E3A8A', light: 'rgba(30, 58, 138, 0.2)' },
                      'Bahá\'í': { primary: '#9C27B0', light: 'rgba(156, 39, 176, 0.2)' }
                    };
                    return colorMap[faith] || { primary: '#7A4FFF', light: 'rgba(122, 79, 255, 0.2)' };
                  };

                  const faithColors = getFaithColors(chat.faith);
                  const faithSymbol = getFaithSymbol(chat.faith.toLowerCase());
                  
                  return (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        // Open guide directly in inline chat overlay
                        if (!showInlineChat) {
                          const newSessionId = `session_${Date.now()}`;
                          setCurrentSessionId(newSessionId);
                          setLoadedSessionGuide(null);
                          setShowInlineChat(true);
                          playSound('spiritual-bell', 0.3);
                          toast.success(`Opening chat with ${chat.name}...`, { duration: 2000 });
                          // Scroll to inline chat
                          setTimeout(() => {
                            const chatElement = document.querySelector('[data-inline-chat]');
                            chatElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 100);
                        }
                      }}
                      className="bg-gradient-to-r from-[#1E3A5F]/50 to-transparent border border-[#1E3A5F]/60 rounded-xl p-3 sm:p-4 hover:border-[#7A4FFF]/70 transition-all duration-300 cursor-pointer group shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(122,79,255,0.3)]"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Guide Avatar/Icon */}
                        <div 
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden"
                          style={{
                            backgroundColor: faithColors.light,
                            borderColor: `${faithColors.primary}80`,
                            borderWidth: '2px'
                          }}
                        >
                          {chat.avatar ? (
                            <ImageWithFallback
                              src={chat.avatar}
                              alt={chat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : faithSymbol && faithSymbol.type === 'emoji' ? (
                            <div className="text-2xl sm:text-3xl">{faithSymbol.symbol}</div>
                          ) : faithSymbol && faithSymbol.type === 'svg' ? (
                            <img 
                              src={faithSymbol.symbol} 
                              alt={chat.faith}
                              className="w-7 h-7 sm:w-8 sm:h-8 object-contain filter brightness-125" 
                            />
                          ) : (
                            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: faithColors.primary }} />
                          )}
                        </div>
                        
                        {/* Chat Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-base sm:text-lg text-white truncate group-hover:text-[#FFD369] transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                              {chat.name}
                            </h4>
                            {chat.isCreatedGuide && (
                              <Badge className="bg-[#7A4FFF]/20 text-[#7A4FFF] border border-[#7A4FFF]/30 text-xs px-2 py-0.5 flex-shrink-0">
                                Personal
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              className="text-xs px-2 py-0.5 border"
                              style={{
                                backgroundColor: faithColors.light,
                                color: faithColors.primary,
                                borderColor: faithColors.primary
                              }}
                            >
                              {chat.faith}
                            </Badge>
                            {chat.messageCount > 0 && (
                              <span className="text-xs text-slate-400">
                                {chat.messageCount} {chat.messageCount === 1 ? 'message' : 'messages'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-200 truncate mb-1">{chat.lastMessage}</p>
                          <div className="text-xs text-slate-400">
                            {new Date(chat.timestamp).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#FFD369] transition-colors flex-shrink-0" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Badges - Mobile Optimized */}
          {recentBadges.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-sm text-slate-400 uppercase tracking-wider mb-3">Latest Unlocked</div>
              {recentBadges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-[#1E3A5F]/40 to-transparent border border-[#1E3A5F]/50 rounded-xl p-3 sm:p-4 hover:border-[#7A4FFF]/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        {BadgeIcon && <BadgeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                          <h4 className="text-base sm:text-lg text-white truncate">{badge.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white border-0 text-xs px-2 py-0.5`}>
                              {badge.rarity}
                            </Badge>
                            <Badge className="bg-[#FFD369]/20 text-[#FFD369] border border-[#FFD369]/30 text-xs px-2 py-0.5">
                              +{badge.tokenReward}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{badge.description}</p>
                        {badge.unlockedAt && (
                          <div className="text-xs text-slate-500">
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1E3A5F] to-[#0F2346] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
              </div>
              <p className="text-base sm:text-lg text-slate-300 mb-2">Start Your Journey</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto px-4">
                Explore different faith traditions and unlock achievements as you grow spiritually
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          {stats.totalBadges > 0 && (
            <div className="mt-6 pt-6 border-t border-[#1E3A5F]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-slate-400">Spiritual Journey Progress</span>
                <span className="text-xs sm:text-sm text-[#FFD369]">{stats.totalBadges} / 20 Milestones</span>
              </div>
              <div className="w-full bg-[#1E3A5F]/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#497EBC] to-[#FFD369] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((stats.totalBadges / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

interface ChatProps {
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

// Helper function to safely format timestamps
const formatTimestamp = (timestamp: any): string => {
  try {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
};

export function Chat({ onOpenMission, onNavigate }: ChatProps) {
  const [customizationStep, setCustomizationStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [userName, setUserName] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [overlayFaithColor, setOverlayFaithColor] = useState('#7A4FFF');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [recentGuideOpens, setRecentGuideOpens] = useState<Array<{ guideName: string; faith: string; timestamp: Date }>>([]);
  const [showEditModal, setShowEditModal] = useState(false);

  // Get badges context for wisdom tracking
  const { 
    unlockedBadges, 
    faithWisdom, 
    totalWisdomPoints,
    getUserWisdomSummary,
    getBadgesByCategory 
  } = useBadges();

  // Get saved guides context
  const { savedGuides, removeGuide } = useSavedGuides();

  // Get subscription context
  const { tier, currentPlan, currentSubscription, openSignupFlow } = useSubscription();

  // Get created guide context
  const { hasCreatedGuide, createdGuide, addMessage, archiveCurrentGuide } = useCreatedGuide();
  const { playSound } = useSound();

  // Load recent guide opens from localStorage
  useEffect(() => {
    try {
      const storedOpens = localStorage.getItem('divinityagi_recent_guide_opens');
      if (storedOpens) {
        const parsedOpens = JSON.parse(storedOpens);
        const opensWithDates = parsedOpens.map((open: any) => ({
          ...open,
          timestamp: open.timestamp ? new Date(open.timestamp) : new Date()
        }));
        setRecentGuideOpens(opensWithDates);
      }
    } catch (e) {
      console.error('Failed to load recent guide opens:', e);
      localStorage.removeItem('divinityagi_recent_guide_opens');
      setRecentGuideOpens([]);
    }
  }, []);

  // Track guide open
  const trackGuideOpen = (guideName: string, faith: string) => {
    try {
      const newOpen = {
        guideName,
        faith,
        timestamp: new Date()
      };
      
      const updatedOpens = [newOpen, ...recentGuideOpens].slice(0, 10); // Keep last 10
      setRecentGuideOpens(updatedOpens);
      localStorage.setItem('divinityagi_recent_guide_opens', JSON.stringify(updatedOpens));
    } catch (e) {
      console.error('Failed to track guide open:', e);
    }
  };

  // Check onboarding status and user registration on component mount
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('divinityagi-onboarding-complete');
    setIsOnboardingComplete(onboardingStatus === 'true');

    // Check if user is registered
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserName(userData.name || '');
        setIsRegistered(true);
      }
    } catch (e) {
      console.error('Failed to load user data:', e);
    }

    // Check for pending guide open from spirit guides page
    try {
      const pendingGuide = localStorage.getItem('divinityagi_pending_guide_open');
      if (pendingGuide) {
        const guide = JSON.parse(pendingGuide);
        localStorage.removeItem('divinityagi_pending_guide_open'); // Clear it immediately
        
        // Open the guide in overlay after a short delay to ensure component is ready
        setTimeout(() => {
          setOverlayUrl(guide.chatUrl);
          setOverlayAgentName(guide.name);
          setOverlayFaithColor(guide.faithColor || '#7A4FFF');
          setIsIframeLoading(true);
          setIsOverlayOpen(true);
          
          toast.success(`Opening conversation with ${guide.name}`, { duration: 2000 });
          playSound('modal-open', 0.3);
        }, 300);
      }
    } catch (e) {
      console.error('Failed to process pending guide open:', e);
      localStorage.removeItem('divinityagi_pending_guide_open');
    }
  }, [playSound]);

  // Filter saved guides based on search
  const filteredSavedGuides = savedGuides.filter(guide =>
    guide.guideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.tradition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (guide.specialty && guide.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-white/30"
            }`}
          />
        ))}
      </div>
    );
  };

  const totalSteps = 6;
  const progressPercentage = (customizationStep / totalSteps) * 100;

  // Handler for Create Guide (onboarding not complete)
  const handleCreateGuide = () => {
    playSound('success', 0.3);
    toast.success("Welcome to DivinityAGI! Let's create your personalized spiritual guide.", { duration: 3000 });
    // Mark onboarding as complete and save to localStorage
    localStorage.setItem('divinityagi-onboarding-complete', 'true');
    setIsOnboardingComplete(true);
    
    // Navigate to guide creation process or start chat immediately
    toast.success("Your spiritual guide has been created! You can now start conversations.", { duration: 4000 });
  };



  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Delete a conversation from history
  const handleDeleteConversation = (sessionId: string) => {
    try {
      const updatedHistory = chatHistory.filter(s => s.id !== sessionId);
      setChatHistory(updatedHistory);
      localStorage.setItem('divinityagi_chat_history', JSON.stringify(updatedHistory));
      toast.success('Conversation deleted', { duration: 2000 });
      playSound('success', 0.2);
    } catch (e) {
      console.error('Failed to delete conversation:', e);
      toast.error('Failed to delete conversation');
    }
  };

  // Export conversation as text or JSON
  const handleExportConversation = (sessionId: string, format: 'txt' | 'json') => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (!session) return;

    try {
      let content: string;
      let filename: string;
      let mimeType: string;

      if (format === 'json') {
        content = JSON.stringify(session, null, 2);
        filename = `conversation-${session.id}.json`;
        mimeType = 'application/json';
      } else {
        // Text format
        const lines = [
          `Conversation with ${session.guideName}`,
          `${session.tradition} • ${session.guideRole}`,
          `Date: ${new Date(session.timestamp).toLocaleString()}`,
          `Duration: ${session.duration}`,
          session.topic ? `Topic: ${session.topic}` : '',
          session.summary ? `Summary: ${session.summary}` : '',
          session.rating ? `Rating: ${'⭐'.repeat(session.rating)}` : '',
          session.feedback ? `Feedback: ${session.feedback}` : '',
          '',
          '─'.repeat(50),
          '',
          ...session.messages.map((msg: any) => {
            const time = new Date(msg.timestamp).toLocaleTimeString();
            const sender = msg.sender === 'user' ? 'You' : session.guideName;
            return `[${time}] ${sender}:\n${msg.text}\n`;
          })
        ].filter(Boolean).join('\n');

        content = lines;
        filename = `conversation-${session.guideName.replace(/\s+/g, '-')}-${new Date(session.timestamp).toLocaleDateString().replace(/\//g, '-')}.txt`;
        mimeType = 'text/plain';
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Conversation exported as ${format.toUpperCase()}`, { duration: 2000 });
      playSound('success', 0.3);
    } catch (e) {
      console.error('Failed to export conversation:', e);
      toast.error('Failed to export conversation');
    }
  };

  // Handle rating submission
  const handleSubmitRating = () => {
    if (pendingRatingSessionId) {
      saveChatSession(inlineChatMessages, sessionRating, sessionFeedback);
    }
    
    setShowRatingDialog(false);
    setShowInlineChat(false);
    setPendingRatingSessionId(null);
    setSessionRating(0);
    setSessionFeedback('');
    setLoadedSessionGuide(null);
    
    toast.success("Thank you for your feedback!", { duration: 2000 });
    playSound('success', 0.3);
  };

  // Skip rating
  const handleSkipRating = () => {
    if (pendingRatingSessionId) {
      saveChatSession(inlineChatMessages);
    }
    
    setShowRatingDialog(false);
    setShowInlineChat(false);
    setPendingRatingSessionId(null);
    setSessionRating(0);
    setSessionFeedback('');
    setLoadedSessionGuide(null);
  };

  // Export all conversations
  const handleExportAllConversations = () => {
    const personalConversations = chatHistory.filter(s => s.type === 'personal');
    
    if (personalConversations.length === 0) {
      toast.error('No conversations to export');
      return;
    }

    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        totalConversations: personalConversations.length,
        conversations: personalConversations
      };

      const content = JSON.stringify(exportData, null, 2);
      const filename = `divinityagi-conversations-${new Date().toISOString().split('T')[0]}.json`;
      const mimeType = 'application/json';

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${personalConversations.length} conversations`, { duration: 2000 });
      playSound('success', 0.3);
    } catch (e) {
      console.error('Failed to export all conversations:', e);
      toast.error('Failed to export conversations');
    }
  };

  // Handler for opening saved guide in overlay
  const handleOpenGuideOverlay = (savedGuideId: string, guideName: string, faithColor?: string) => {
    playSound('modal-open', 0.3);
    
    // Find the saved guide to get its tradition and chat URL
    const savedGuide = savedGuides.find(g => g.id === savedGuideId);
    
    if (!savedGuide) {
      toast.error('Guide not found');
      return;
    }
    
    let url = savedGuide.chatUrl;
    
    // If no chat URL is stored, derive it from tradition
    if (!url) {
      // Map tradition name to faith symbol key
      const traditionToKeyMap: Record<string, string> = {
        'Christianity': 'christian',
        'Islam': 'islamic',
        'Judaism': 'jewish',
        'Buddhism': 'buddhist',
        'Hinduism': 'shakti',
        'Shinto': 'shinto',
        'Jainism': 'jain',
        'Taoism': 'taoist',
        'Daoism': 'taoist',
        'Sikhism': 'sikhism',
        'Bahá\'í': 'bahai',
        'Bahai': 'bahai',
        'Confucianism': 'sage',
        'Polytheism': 'polytheism',
        'Universal': 'sage'
      };
      
      const faithKey = traditionToKeyMap[savedGuide.tradition] || 'sage';
      
      // Get the chat URL from faith-symbols-config
      const faithConfig = getFaithSymbol(faithKey);
      url = faithConfig.chatUrl;
    }
    
    setOverlayUrl(url);
    setOverlayAgentName(guideName);
    setOverlayFaithColor(faithColor || '#7A4FFF');
    setIsIframeLoading(true);
    setIsOverlayOpen(true);
    
    toast.success(`Opening conversation with ${guideName}`, { duration: 2000 });
  };

  const handleCloseOverlay = () => {
    playSound('modal-close', 0.25);
    setIsOverlayOpen(false);
    setTimeout(() => {
      setIsIframeLoading(true);
      setOverlayUrl('');
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-20 relative overflow-hidden touch-pan-y">
      {/* Enhanced Textured Cosmic Background - Optimized for Mobile */}
      <div className="absolute inset-0 pointer-events-none will-change-transform">
        {/* Cosmic spiritual image - enhanced with better blending */}
        <div className="absolute inset-0 -top-20 h-[120vh] sm:h-[120vh]">
          <ImageWithFallback
            src={cosmicSpiritualImage}
            alt="Cosmic Spiritual Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20 sm:opacity-30 mix-blend-multiply scale-105"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
        </div>
        
        {/* Enhanced accent overlays using brand colors - Reduced on mobile */}
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(122,79,255,0.15),_transparent_70%)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,211,105,0.12),_transparent_60%)]" />
        
        {/* Atmospheric depth layers - Reduced on mobile */}
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(30,64,108,0.18),_transparent_70%)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,_rgba(15,35,70,0.15),_transparent_60%)]" />
        
        {/* Enhanced multi-layer texture system - Simplified on mobile for performance */}
        {/* Primary diagonal grain texture */}
        <div 
          className="hidden sm:block absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.15) 2px,
                rgba(255, 255, 255, 0.15) 4px
              )
            `
          }}
        />
        
        {/* Counter-diagonal texture for complexity - enhanced - Desktop only */}
        <div 
          className="hidden sm:block absolute inset-0 opacity-[0.1] mix-blend-soft-light"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(122, 79, 255, 0.15) 3px,
                rgba(122, 79, 255, 0.15) 6px
              )
            `
          }}
        />
        
        {/* Fine dot pattern texture - enhanced - Desktop only */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
            `,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Organic noise texture - enhanced */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,211,105,0.2) 1px, transparent 0),
              radial-gradient(circle at 16px 16px, rgba(122,79,255,0.15) 1px, transparent 0)
            `,
            backgroundSize: '32px 32px, 28px 28px'
          }}
        />
        
        {/* Subtle crosshatch pattern - enhanced */}
        <div 
          className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 8px,
                rgba(255, 255, 255, 0.08) 8px,
                rgba(255, 255, 255, 0.08) 9px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 8px,
                rgba(255, 255, 255, 0.08) 8px,
                rgba(255, 255, 255, 0.08) 9px
              )
            `
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section - Divinity Mode */}
        <section 
          className="px-4 py-8 text-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${spiritualBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Enhanced textured overlay for stronger contrast and better blending */}
          <div className="absolute inset-0">
            {/* Main gradient overlay - enhanced */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D2B]/50 via-[#0D0D2B]/30 to-[#0B1426]/60" />
            
            {/* Additional glow layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A4FFF]/5 via-transparent to-transparent" />
            
            {/* Diagonal grain texture - enhanced */}
            <div 
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.2) 2px,
                    rgba(255, 255, 255, 0.2) 4px
                  )
                `
              }}
            />
            
            {/* Counter-diagonal texture for complexity - enhanced */}
            <div 
              className="absolute inset-0 opacity-[0.1] mix-blend-soft-light"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 3px,
                    rgba(122, 79, 255, 0.15) 3px,
                    rgba(122, 79, 255, 0.15) 6px
                  )
                `
              }}
            />
            
            {/* Fine dot pattern texture - enhanced */}
            <div 
              className="absolute inset-0 opacity-[0.08] mix-blend-screen"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Subtle crosshatch pattern - enhanced */}
            <div 
              className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 6px,
                    rgba(255, 255, 255, 0.08) 6px,
                    rgba(255, 255, 255, 0.08) 7px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 6px,
                    rgba(255, 255, 255, 0.08) 6px,
                    rgba(255, 255, 255, 0.08) 7px
                  )
                `
              }}
            />
          </div>
          
          {/* Sophisticated content container */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Elegant page title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="alt-font text-[55px] mb-4 bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent leading-none drop-shadow-[0_2px_10px_rgba(255,211,105,0.5)] px-[33px] py-[0px] py-[-1px]">
                {hasCreatedGuide && createdGuide ? createdGuide.guideName || 'Divinity Guide' : 'Divinity Guide'}
              </h1>
              
              <p className="text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] text-[20px]">
                {hasCreatedGuide && createdGuide 
                  ? `Your ${createdGuide.guideRole} ${createdGuide.faith} Companion` 
                  : 'Personal Companion'}
              </p>
            </motion.div>

            {/* Enhanced Avatar Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mx-auto mb-12 w-48 h-48"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#497EBC] to-[#FFD369] rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-[#497EBC] to-[#FFD369] rounded-full flex items-center justify-center border-4 border-[#1E3A5F]/60 shadow-[0_0_40px_rgba(73,126,188,0.6),0_10px_30px_rgba(0,0,0,0.6)]">
                <div className="w-[90%] h-[90%] rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={hasCreatedGuide && createdGuide?.generatedImageUrl ? createdGuide.generatedImageUrl : cosmicSpiritualImage}
                    alt={hasCreatedGuide && createdGuide ? `${createdGuide.fullName}'s Spiritual Guide` : "Your Spiritual Avatar"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/20 to-transparent rounded-full scale-[1.2]"></div>
                {!hasCreatedGuide && (
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="absolute inset-0 flex items-center justify-center bg-transparent rounded-full transition-colors text-[16px] text-[rgba(255,255,255,1)]"
                  >
                    <Play className="w-[42px] h-[42px] text-white ml-1" fill="white" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Action Button - Create Guide or Launch Chat Overlay */}
        <section className="px-6 -mt-8 mb-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto flex justify-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white px-10 py-4 text-lg border-0 shadow-[0_4px_20px_rgba(122,79,255,0.5),0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_30px_rgba(122,79,255,0.7),0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:scale-[1.05] active:scale-95 active:transition-none touch-manipulation select-none cursor-pointer min-h-[52px] rounded-full"
              onClick={() => {
                if (hasCreatedGuide && createdGuide) {
                  // User has a guide - open D-ID link in overlay
                  playSound('modal-open', 0.3);
                  
                  // Get the chat URL from the guide or derive it from faith
                  let chatUrl = (createdGuide as any).chatUrl;
                  
                  if (!chatUrl) {
                    // Map faith to chat URL using faith symbols config
                    const faithToKeyMap: Record<string, string> = {
                      'Christianity': 'christian',
                      'Sunni Islam': 'islamic',
                      'Islam': 'islamic',
                      'Shia Islam': 'islamic',
                      'Sufi Islam': 'islamic',
                      'Judaism': 'jewish',
                      'Buddhism': 'buddhist',
                      'Mahayana Buddhism': 'buddhist',
                      'Vajrayana Buddhism': 'buddhist',
                      'Zen Buddhism': 'buddhist',
                      'Theravada Buddhism': 'buddhist',
                      'Hinduism': 'shakti',
                      'Shinto': 'shinto',
                      'Jinja Shinto': 'shinto',
                      'Koshinto': 'shinto',
                      'Kyoha Shinto': 'shinto',
                      'Jainism': 'jain',
                      'Digambara Jainism': 'jain',
                      'Svetambara Jainism': 'jain',
                      'Sthanakvasi Jainism': 'jain',
                      'Taoism': 'taoist',
                      'Daoism': 'taoist',
                      'Sikhism': 'sikhism',
                      'Bahá\'í': 'bahai',
                      'Bahai': 'bahai',
                      'Confucianism': 'sage',
                      'Neo-Confucianism': 'sage',
                      'Classical Confucianism': 'sage',
                      'Contemporary Confucianism': 'sage',
                      'Norse Mythology': 'polytheism',
                      'Greek Mythology': 'polytheism',
                      'Egyptian Mythology': 'polytheism',
                      'Indigenous Spirituality': 'polytheism',
                      'Universal': 'sage'
                    };
                    
                    const faithKey = faithToKeyMap[createdGuide.faith] || 'sage';
                    const faithConfig = getFaithSymbol(faithKey);
                    chatUrl = faithConfig.chatUrl;
                  }
                  
                  setOverlayUrl(chatUrl);
                  setOverlayAgentName(createdGuide.guideName || createdGuide.guideRole);
                  setOverlayFaithColor('#7A4FFF');
                  setIsIframeLoading(true);
                  setIsOverlayOpen(true);
                  
                  // Track this as a recent conversation
                  trackGuideOpen(createdGuide.guideName || createdGuide.guideRole, createdGuide.faith);
                  
                  toast.success(`Opening conversation with ${createdGuide.guideName || createdGuide.guideRole}`, { duration: 2000 });
                } else {
                  // No guide - start matching process
                  if (onNavigate) {
                    onNavigate('guide-process-privacy');
                  } else {
                    toast.success("Starting guide creation process...");
                  }
                }
              }}
              role="button"
              aria-label={hasCreatedGuide ? "Launch your spiritual guide" : "Create your spiritual guide"}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {hasCreatedGuide ? "Launch Guide" : "Create Guide"}
              {!hasCreatedGuide && (
                <ArrowRight className="w-6 h-6 ml-3" />
              )}
            </Button>
          </motion.div>
        </section>

        {/* Daily Reflection Section */}
        <section className="px-6 py-6 relative">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm overflow-hidden">
              <div className="pt-[9px] pr-[32px] pb-[32px] pl-[32px]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A5F]/40 to-[#FFD369]/20 flex items-center justify-center mr-4">
                    <Flower2 className="w-6 h-6 text-[#FFD369]" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white mb-1 text-[20px]">Daily Reflection</h3>
                    <p className="text-slate-400 text-sm">
                      {hasCreatedGuide && createdGuide 
                        ? `Wisdom from your ${createdGuide.faith} guide` 
                        : 'Wisdom for your spiritual practice'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#7A4FFF]/5 to-[#FFD369]/5 border border-[#7A4FFF]/20 rounded-2xl p-6">
                  <p className="text-slate-200 text-lg leading-relaxed italic">
                    {hasCreatedGuide && createdGuide 
                      ? `"As you walk your ${createdGuide.faith} path, remember that each step brings you closer to understanding. Today, reflect on the harmony between your spiritual goals and daily actions."` 
                      : '"Today, take a moment to reflect on the gifts of compassion you\'ve both given and received."'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Guide Profile Section - Display guide attributes and details */}
        {hasCreatedGuide && createdGuide && (
          <section className="px-6 py-6 relative">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm overflow-hidden">
                <div className="pt-[9px] pr-[32px] pb-[32px] pl-[32px]">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A4FFF]/40 to-[#FFD369]/20 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#7A4FFF]" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-white mb-1 text-[20px]">Guide Profile</h3>
                      <p className="text-slate-400 text-sm">
                        {createdGuide.guideRole} • {createdGuide.faith}
                      </p>
                    </div>
                  </div>
                  
                  {/* Guide Description */}
                  {createdGuide.description && (
                    <div className="mb-6">
                      <p className="text-slate-200 leading-relaxed">
                        {createdGuide.description}
                      </p>
                    </div>
                  )}

                  {/* Welcome Message */}
                  {createdGuide.welcomeMessage && (
                    <div className="bg-gradient-to-r from-[#7A4FFF]/10 to-[#FFD369]/10 border border-[#7A4FFF]/20 rounded-2xl p-5 mb-6">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-[#7A4FFF] mt-1 flex-shrink-0" />
                        <p className="text-slate-200 italic">
                          "{createdGuide.welcomeMessage}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Guide Specialties (from matched guides) */}
                  {(createdGuide as any).specialties && (createdGuide as any).specialties.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-[#FFD369]" />
                        <h4 className="text-white">Areas of Expertise</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(createdGuide as any).specialties.map((specialty: string, idx: number) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-[#FFD369]/50 bg-[#FFD369]/10 text-[#FFD369] hover:bg-[#FFD369]/20 transition-colors"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guide Personality Traits (from matched guides) */}
                  {(createdGuide as any).personality && (createdGuide as any).personality.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-5 h-5 text-[#7A4FFF]" />
                        <h4 className="text-white">Personality Traits</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(createdGuide as any).personality.map((trait: string, idx: number) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-[#7A4FFF]/50 bg-[#7A4FFF]/10 text-white hover:bg-[#7A4FFF]/20 transition-colors capitalize"
                          >
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Spiritual Goals / Specialties */}
                  {createdGuide.spiritualGoals && createdGuide.spiritualGoals.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 text-[#FFD369]" />
                        <h4 className="text-white">Your Spiritual Focus Areas</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {createdGuide.spiritualGoals.map((goal, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-[#7A4FFF]/50 bg-[#7A4FFF]/10 text-[#FFD369] hover:bg-[#7A4FFF]/20 transition-colors"
                          >
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sect/Tradition Focus (from matched guides) */}
                  {(createdGuide as any).sect && (createdGuide as any).sect.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-[#FFD369]" />
                        <h4 className="text-white">Tradition Focus</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(createdGuide as any).sect.map((tradition: string, idx: number) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-slate-400/50 bg-slate-400/10 text-slate-300 hover:bg-slate-400/20 transition-colors"
                          >
                            {tradition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Journey Level (from matched guides) */}
                  {(createdGuide as any).journeyLevel && (createdGuide as any).journeyLevel.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Compass className="w-5 h-5 text-[#7A4FFF]" />
                        <h4 className="text-white">Suitable For</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(createdGuide as any).journeyLevel.map((level: string, idx: number) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-emerald-400/50 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 transition-colors"
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guide Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age Preference */}
                    {createdGuide.agePreference && (
                      <div className="bg-[#1E3A5F]/20 border border-[#1E3A5F]/40 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="w-4 h-4 text-[#FFD369]" />
                          <span className="text-slate-400 text-sm">Guide Age</span>
                        </div>
                        <p className="text-white capitalize">{createdGuide.agePreference}</p>
                      </div>
                    )}

                    {/* Usage Frequency */}
                    {createdGuide.usageFrequency && (
                      <div className="bg-[#1E3A5F]/20 border border-[#1E3A5F]/40 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-[#7A4FFF]" />
                          <span className="text-slate-400 text-sm">Connection Frequency</span>
                        </div>
                        <p className="text-white">{createdGuide.usageFrequency}</p>
                      </div>
                    )}
                  </div>

                  {/* Your Personal Guide Section */}
                  <div className="mt-8 pt-6 border-t border-[#1E3A5F]/40">
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 backdrop-blur-xl rounded-2xl overflow-hidden">
                      <div className="relative">
                        {/* Decorative gradient header */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20" />
                        
                        <div className="relative p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7A4FFF] to-purple-600 flex items-center justify-center shadow-[0_4px_15px_rgba(122,79,255,0.5)]">
                              <User className="w-5 h-5 text-white drop-shadow-lg" />
                            </div>
                            <div>
                              <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Quick Actions</h3>
                              <p className="text-sm text-slate-300">Manage your spiritual companion</p>
                            </div>
                          </div>

                          {/* Guide Preview */}
                          <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-4 mb-4">
                            <div className="flex items-center gap-4">
                              {/* Guide Avatar */}
                              <div className="relative flex-shrink-0">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                                    <ImageWithFallback
                                      src={createdGuide.generatedImageUrl || cosmicSpiritualImage}
                                      alt="Your Guide"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
                              </div>

                              {/* Guide Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white truncate mb-1">{createdGuide.guideRole}</h4>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <Badge 
                                    className="text-xs border bg-[#7A4FFF]/20 text-[#7A4FFF] border-[#7A4FFF]/40"
                                  >
                                    {createdGuide.faith}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                                    {createdGuide.guideRole}
                                  </Badge>
                                </div>
                                <div className="text-xs text-slate-400">
                                  {createdGuide.spiritualGoals.slice(0, 2).join(', ')}
                                  {createdGuide.spiritualGoals.length > 2 && ` +${createdGuide.spiritualGoals.length - 2} more`}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Chat Now Button - Primary Action */}
                          <Button
                            onClick={() => {
                              toast.success(`Opening conversation with ${createdGuide.guideRole}`, { duration: 2000 });
                              // Scroll to top to access chat interface
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full bg-gradient-to-r from-[#7A4FFF] via-purple-600 to-[#AD46FF] hover:from-[#6A3FEF] hover:via-purple-700 hover:to-[#9D36EF] text-white shadow-[0_4px_20px_rgba(122,79,255,0.6)] hover:shadow-[0_6px_30px_rgba(122,79,255,0.8)] transition-all duration-300 hover:scale-105"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            <span className="drop-shadow-lg">Scroll to Chat</span>
                          </Button>

                          {/* Update Button */}
                          <Button
                            onClick={() => setShowEditModal(true)}
                            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-105"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            <span className="drop-shadow-lg">Update Your Guide</span>
                          </Button>

                          {/* Make New Guide Button */}
                          <Button
                            onClick={() => {
                              if (!onNavigate) {
                                toast.error("Navigation not available");
                                return;
                              }
                              
                              // Archive current guide
                              archiveCurrentGuide();
                              toast.success("Current guide archived. Creating new guide...");
                              
                              // Navigate to guide creation process
                              onNavigate('guide-process');
                            }}
                            className="w-full mt-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-[0_4px_15px_rgba(217,119,6,0.4)] hover:shadow-[0_6px_25px_rgba(217,119,6,0.6)] transition-all duration-300 hover:scale-105"
                          >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            <span className="drop-shadow-lg">Make New</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  {createdGuide.createdAt && (
                    <div className="mt-6 pt-4 border-t border-[#1E3A5F]/40">
                      <p className="text-slate-500 text-sm text-center">
                        Guide created on {new Date(createdGuide.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Meditation Practice Section */}
        <section className="px-6 py-6 relative">
          <div className="max-w-4xl mx-auto">
            <MeditationStatsWidget onNavigate={onNavigate} />
          </div>
        </section>

        {/* Recent Achievements Section */}
        <RecentAchievementsSection onNavigate={onNavigate} />

        {/* Combined Journey & Growth Section */}
        <section className="px-6 py-8 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-[#162844]/60 border-[#1E3A5F]/60 backdrop-blur-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/8 to-transparent opacity-80" />
                
                <div className="relative">
                  {/* Header with tier and level */}
                  <div className="p-6 sm:p-8 pb-6 border-b border-[#1E3A5F]/30">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A4FFF] to-[#FFD369] flex items-center justify-center mr-4 shadow-[0_4px_15px_rgba(122,79,255,0.5)]">
                          <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl text-white mb-1">
                            {isRegistered && userName ? `${userName}'s Journey` : 'Your Spiritual Path'}
                          </h3>
                          <p className="text-slate-300 text-sm">
                            {isRegistered ? 'Tracking your growth across traditions' : 'Begin your personalized spiritual journey'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-3">
                        <div className={`
                          rounded-2xl px-4 py-2 border shadow-lg
                          ${tier === 'enlightened' ? 'bg-gradient-to-r from-[#FFD369]/30 to-[#7A4FFF]/30 border-[#FFD369]/50 shadow-[#FFD369]/20' :
                            tier === 'devotee' ? 'bg-gradient-to-r from-[#7A4FFF]/25 to-[#1E3A5F]/25 border-[#7A4FFF]/40 shadow-[#7A4FFF]/20' :
                            tier === 'subscriber' ? 'bg-[#1E3A5F]/30 border-[#1E3A5F]/50' :
                            'bg-slate-700/20 border-slate-600/40'}
                        `}>
                          <div className="text-xs text-slate-400 mb-0.5">Tier</div>
                          <div className={`
                            text-sm
                            ${tier === 'enlightened' ? 'text-[#FFD369] drop-shadow-[0_0_8px_rgba(255,211,105,0.4)]' :
                              tier === 'devotee' ? 'text-[#7A4FFF] drop-shadow-[0_0_8px_rgba(122,79,255,0.4)]' :
                              tier === 'subscriber' ? 'text-blue-300' :
                              'text-slate-300'}
                          `}>
                            {currentPlan.name}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#7A4FFF]/25 to-[#FFD369]/25 border border-[#7A4FFF]/40 rounded-2xl px-4 py-2 shadow-[0_4px_15px_rgba(255,211,105,0.3)]">
                          <div className="text-xs text-slate-300 mb-0.5">Level</div>
                          <div className="text-[#FFD369] text-sm drop-shadow-[0_0_8px_rgba(255,211,105,0.4)]">{Math.floor(unlockedBadges.length / 3) + 1}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area - Different based on registration status */}
                  <div className="p-6 sm:p-8">
                    {!isRegistered ? (
                      /* Non-registered: Sign up CTA */
                      <div className="text-center py-6">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7A4FFF] to-[#FFD369] flex items-center justify-center shadow-[0_8px_30px_rgba(122,79,255,0.4)]">
                          <Star className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                        <h4 className="text-white text-xl mb-3">Unlock Your Spiritual Potential</h4>
                        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                          Create a free account to access AI-powered insights, track your progress across traditions, and save your spiritual journey.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                          <Button
                            onClick={() => onNavigate?.('registration')}
                            className="bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white border-0 shadow-[0_4px_15px_rgba(122,79,255,0.4)] hover:shadow-[0_6px_25px_rgba(122,79,255,0.6)] transition-all duration-300 hover:scale-105"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Create Free Account
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => onNavigate?.('subscription')}
                            className="border-[#7A4FFF]/50 text-[#7A4FFF] hover:bg-[#7A4FFF]/10"
                          >
                            View Premium Plans
                          </Button>
                        </div>
                        <p className="text-xs text-slate-400">
                          Currently: <span className="text-slate-300">{currentPlan.name}</span> - Limited features, no progress saving
                        </p>
                      </div>
                    ) : tier === 'seeker' || tier === 'subscriber' ? (
                      /* Registered but free tier: Upgrade CTA */
                      <div>
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#7A4FFF] to-[#FFD369] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_rgba(122,79,255,0.5)]">
                            <Award className="w-6 h-6 text-white drop-shadow-lg" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-lg mb-2">Unlock Premium Features</h4>
                            <p className="text-slate-300 text-sm mb-4">
                              {tier === 'subscriber' 
                                ? 'Upgrade to Devotee for unlimited access, all avatars, and deeper AI-powered spiritual insights.'
                                : 'Upgrade to unlock unlimited conversations, exclusive content, and advanced AI-powered journey tracking.'}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="bg-[#1E3A5F]/30 px-3 py-2 rounded-lg border border-[#1E3A5F]/40">
                                <div className="text-[#FFD369] text-xs mb-1">✨ All Avatars</div>
                                <div className="text-slate-400 text-xs">50+ spiritual guides</div>
                              </div>
                              <div className="bg-[#1E3A5F]/30 px-3 py-2 rounded-lg border border-[#1E3A5F]/40">
                                <div className="text-[#7A4FFF] text-xs mb-1">∞ Unlimited Tokens</div>
                                <div className="text-slate-400 text-xs">Never run out</div>
                              </div>
                              <div className="bg-[#1E3A5F]/30 px-3 py-2 rounded-lg border border-[#1E3A5F]/40">
                                <div className="text-[#FFD369] text-xs mb-1">📊 Advanced Analytics</div>
                                <div className="text-slate-400 text-xs">Deep insights</div>
                              </div>
                              <div className="bg-[#1E3A5F]/30 px-3 py-2 rounded-lg border border-[#1E3A5F]/40">
                                <div className="text-[#7A4FFF] text-xs mb-1">🎯 Priority Support</div>
                                <div className="text-slate-400 text-xs">24/7 assistance</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={() => onNavigate?.('subscription')}
                            className="flex-1 bg-gradient-to-r from-[#7A4FFF] to-[#1E3A5F] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white border-0 shadow-[0_4px_15px_rgba(122,79,255,0.4)] hover:shadow-[0_6px_25px_rgba(122,79,255,0.6)] transition-all duration-300 hover:scale-105"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Upgrade Now
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => onNavigate?.('profile')}
                            className="flex-1 border-[#1E3A5F]/50 text-slate-300 hover:bg-[#1E3A5F]/30"
                          >
                            View Journey
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Premium user: Journey summary */
                      <div>
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#FFD369] to-[#7A4FFF] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_rgba(255,211,105,0.5)]">
                            <Award className="w-6 h-6 text-white drop-shadow-lg" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white text-lg">{tier === 'enlightened' ? 'Enlightened Member' : 'Devotee Member'}</h4>
                              <Badge className="bg-[#FFD369]/25 text-[#FFD369] border-[#FFD369]/40 shadow-[0_0_12px_rgba(255,211,105,0.3)]">Premium</Badge>
                            </div>
                            <p className="text-slate-300 text-sm mb-4">
                              {tier === 'enlightened' 
                                ? 'You have unlimited access to all features, advanced AI insights, priority support, and exclusive events. Thank you for being an Enlightened member!'
                                : 'You have full access to all avatars, AI-powered insights, and exclusive content. Thank you for your support!'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="bg-[#1E3A5F]/30 p-3 rounded-xl border border-[#1E3A5F]/40 text-center">
                            <div className="text-2xl text-white mb-1">{unlockedBadges.length}</div>
                            <div className="text-xs text-slate-400">Badges</div>
                          </div>
                          <div className="bg-[#1E3A5F]/30 p-3 rounded-xl border border-[#1E3A5F]/40 text-center">
                            <div className="text-2xl text-white mb-1">{savedGuides.length + (createdGuide ? 1 : 0)}</div>
                            <div className="text-xs text-slate-400">Guides</div>
                          </div>
                          <div className="bg-[#1E3A5F]/30 p-3 rounded-xl border border-[#1E3A5F]/40 text-center">
                            <div className="text-2xl text-white mb-1">{totalWisdomPoints}</div>
                            <div className="text-xs text-slate-400">Wisdom</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={() => onNavigate?.('profile')}
                            className="flex-1 bg-[#1E3A5F]/40 hover:bg-[#1E3A5F]/60 text-white border border-[#1E3A5F]/50"
                          >
                            View Full Journey
                          </Button>
                          {tier !== 'enlightened' && (
                            <Button
                              variant="outline"
                              onClick={() => onNavigate?.('subscription')}
                              className="flex-1 border-[#FFD369]/50 text-[#FFD369] hover:bg-[#FFD369]/10"
                            >
                              Explore Enlightened
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-md w-[95vw] h-[85vh] max-h-[900px] bg-slate-900/95 border-slate-700 p-0 flex flex-col">
          <DialogHeader className="p-4 pb-2 shrink-0">
            <DialogTitle className="text-white text-xl">
              Guide Creation Tutorial
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-sm mt-1">
              Watch this tutorial to create your personalized AI spiritual guide.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 px-4 pb-4 min-h-0">
            <div className="w-full h-full bg-slate-800/50 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* YouTube Shorts Embed - Optimized for vertical video */}
              <iframe
                src="https://www.youtube.com/embed/AN-8Sp4AyB8?autoplay=1&mute=1&rel=0"
                title="Guide Creation Tutorial"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Close button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm border border-white/10"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent 
          className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] overflow-hidden [&>button]:hidden touch-pan-y"
          style={{ borderColor: `${overlayFaithColor}30` }}
        >
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-2 h-2 rounded-full animate-pulse shadow-lg" 
                style={{ backgroundColor: overlayFaithColor, boxShadow: `0 0 20px ${overlayFaithColor}50` }}
              />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCloseOverlay} 
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] transition-all duration-300 hover:scale-110" 
              style={{ 
                borderColor: `${overlayFaithColor}30`,
                color: overlayFaithColor
              }}
              aria-label="Close conversation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div 
                    className="absolute inset-0 rounded-full border-4"
                    style={{ borderColor: `${overlayFaithColor}20` }}
                  ></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                    style={{ borderColor: overlayFaithColor }}
                  ></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          <div className="w-full h-full pt-12 sm:pt-16">
            {overlayUrl && <iframe src={overlayUrl} className="w-full h-full border-0" title={`Chat with ${overlayAgentName}`} allow="microphone *; camera *; autoplay; encrypted-media; fullscreen" onLoad={() => setIsIframeLoading(false)} loading="eager" />}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Guide Modal */}
      {hasCreatedGuide && createdGuide && (
        <EditGuideModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}