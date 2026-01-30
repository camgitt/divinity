import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTimer } from "./timer-context";
import { useSubscription } from "./subscription-context";
import { useBadges } from "./badges-context";
import { useTheme } from "./theme-context";
import { useCreatedGuide } from "./created-guide-context";
import { useSound } from "./sound-context";
import { useHapticContext, useHapticFeedback } from "./hooks/use-haptic";
import { useAmbientSound } from "../contexts/ambient-sound-context";
import { AMBIENT_SOUNDS } from "./ambient-sound-grid";
import { EditGuideModal } from "./edit-guide-modal";
import { BadgeAchievementDashboard } from "./badge-achievement-dashboard";
import { AppFooter } from "./app-footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SpiritualJourneySection } from "./spiritual-journey-section";
import { LanguageSelector } from "./language-selector";
import { useSocialMedia } from "./social-media-context";
import { EditProfileModal } from "./edit-profile-modal";
import { UserPostsTab } from "./user-posts-tab";
import { MeditationReminderSystem } from "./meditation-reminder-system";
import { ProfileIntroModal } from "./profile-intro-modal";
import { EnhancedCommunityHub } from "./enhanced-community-hub";
import { toast } from "sonner@2.0.3";
import { BackgroundVideo } from "./background-video";
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import profileVideoPoster from 'figma:asset/e7666526a4e6c08cf53d1f7eb17c5d3e006578ed.png';
import meditationIconImage from 'figma:asset/1f8ee90910981e0e044eedee026a595ec4ad9964.png';
import profileHeaderImage2 from 'figma:asset/f2e5e8c9471e8691696658ee1254822e1b08cee3.png';
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
import planYourJourneyImage from 'figma:asset/936069199d8bf088e4dae0072f3271aa27baad55.png';
import diverseCommunityImage from 'figma:asset/653c65adae13c9cb2f905fce6f5d9fde272b47df.png';
import profileHeaderBgImage from 'figma:asset/d82f665e1af884412f36d96216424d41216cee3d.png';
import analyticsCardImage from 'figma:asset/a21e8d72c359b994e13c96cad7646a1351fa3873.png';
import journalCardImage from 'figma:asset/28ab99763eab4da9e77e4d355acc4fcb63ea593d.png';
import goalsCardImage from 'figma:asset/db2176288f42ef9fb4a61ee179dd1efc791bb740.png';
import communityCardImage from 'figma:asset/03199c684c1eade6068145e19c6ebea596c4fc94.png';
import { 
  Camera,
  BarChart3,
  Award,
  Crown,
  Timer,
  MessageSquare,
  Calendar,
  Target,
  Flame,
  Star,
  Heart,
  Brain,
  Compass,
  Zap,
  Trophy,
  Sparkles,
  Settings,
  TrendingUp,
  Activity,
  Users,
  Flower2,
  BookOpen,
  Shield,
  Lock,
  Globe,
  MessageCircle,
  X,
  Trash2,
  Save,
  CheckCircle2,
  Mail,
  Moon,
  Sun,
  Palette,
  Bell,
  Volume2,
  ChevronRight,
  VolumeX,
  User,
  Play,
  Square,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit,
  PlusCircle,
  Archive,
  RotateCcw,
  Clock,
  Vibrate
} from "lucide-react";

interface ProfilePageProps {
  onNavigate?: (tab: string) => void;
  onOpenMission?: () => void;
  initialTab?: "profile" | "badges" | "settings" | "social";
}

/**
 * Profile Page Component
 * Displays user profile, badges, settings, and social features
 * Includes 4 tabs: Profile, Social, Badges, Settings
 * 
 * Features:
 * - User avatar management (upload, presets, removal)
 * - Profile stats and tier badge display
 * - Created guide management (view, edit, archive, restore, delete)
 * - Badge collection and wisdom points tracking
 * - Settings (theme, sound, haptics, language)
 * - Social media integration with posts
 * 
 * @param onNavigate - Callback for navigation between pages
 * @param onOpenMission - Callback to open mission modal
 * @param initialTab - Initial tab to display (default: "profile")
 */
export function ProfilePage({ onNavigate, onOpenMission, initialTab = "profile" }: ProfilePageProps) {
  // ==================== STATE MANAGEMENT ====================
  
  const [activeTab, setActiveTab] = useState<"profile" | "badges" | "settings" | "social">(initialTab);
  const [showAchievementDashboard, setShowAchievementDashboard] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { currentUser, setCurrentUser } = useSocialMedia();
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const { currentTokens, totalTokensUsed, freeTokensUsed, maxFreeTokens, formatTime } = useTimer();
  const { currentSubscription, currentPlan, openSignupFlow, userEmail, tier } = useSubscription();
  const { unlockedBadges, totalWisdomPoints, getUserWisdomSummary } = useBadges();
  const { theme, toggleTheme } = useTheme();
  const { createdGuide, hasCreatedGuide, archivedGuides, archiveCurrentGuide, restoreArchivedGuide, deleteArchivedGuide } = useCreatedGuide();
  const { soundEnabled, soundVolume, toggleSound, setSoundVolume, playSound } = useSound();
  const { hapticsEnabled, setHapticsEnabled } = useHapticContext();
  const haptic = useHapticFeedback();
  const { 
    selectedSound: selectedAmbientSound, 
    isPlaying: ambientIsPlaying,
    ambientVolume,
    selectSound: selectAmbientSound,
    togglePlayPause: toggleAmbientPlayPause,
    setAmbientVolume
  } = useAmbientSound();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdvancedSoundTests, setShowAdvancedSoundTests] = useState(false);
  const [showAmbientSoundTests, setShowAmbientSoundTests] = useState(false);
  const [showArchivedGuides, setShowArchivedGuides] = useState(false);
  const [showProfileIntro, setShowProfileIntro] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Add scroll listener for parallax effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate parallax offset - adjust 0.3 to control parallax intensity
      setParallaxOffset(scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==================== HELPER FUNCTIONS ====================
  
  // Get user data from localStorage
  const getUserData = () => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
    return null;
  };

  const userData = getUserData();
  const userName = userData?.name || "Spiritual Seeker";
  const userRegistrationDate = userData?.registeredAt 
    ? new Date(userData.registeredAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Recently";

  // ==================== CONSTANTS ====================
  
  // Faith colors for guide display
  const faithColors: { [key: string]: string } = {
    Christianity: '#FF6B6B',
    Islam: '#4ECDC4',
    Judaism: '#45B7D1',
    Hinduism: '#FFA07A',
    Buddhism: '#98D8C8',
    Sikhism: '#FFD700',
    Taoism: '#9B59B6',
    Shinto: '#E74C3C',
    'Bahá\'í': '#3498DB',
    Jainism: '#2ECC71',
    Confucianism: '#F39C12',
    Polytheism: '#E67E22',
    'Secular/Philosophical': '#95A5A6',
  };

  const faithColor = createdGuide ? faithColors[createdGuide.faith] || '#497EBC' : '#497EBC';

  const religionColors = [
    { name: "Christianity", color: "faith-christian", bgColor: "faith-christian-bg", symbol: christianCrossImage },
    { name: "Islam", color: "faith-islam", bgColor: "faith-islam-bg", symbol: islamCrescentImage },
    { name: "Hinduism", color: "faith-hinduism", bgColor: "faith-hinduism-bg", symbol: hinduOmImage },
    { name: "Buddhism", color: "faith-buddhism", bgColor: "faith-buddhism-bg", symbol: buddhistDharmaWheelImage },
    { name: "Judaism", color: "faith-judaism", bgColor: "faith-judaism-bg", symbol: jewishStarImage },
    { name: "Sikhism", color: "faith-sikhism", bgColor: "faith-sikhism-bg", symbol: sikhKhandaImage },
    { name: "Taoism", color: "faith-taoism", bgColor: "faith-taoism-bg", symbol: taoistYinYangImage },
    { name: "Shinto", color: "faith-shinto", bgColor: "faith-shinto-bg", symbol: shintoToriiImage },
    { name: "Bahá'í", color: "faith-bahai", bgColor: "faith-bahai-bg", symbol: bahaiStarImage },
    { name: "Jainism", color: "faith-jainism", bgColor: "faith-jainism-bg", symbol: jainHandImage },
    { name: "Confucianism", color: "faith-confucianism", bgColor: "faith-confucianism-bg", symbol: confuciusCharacterImage },
    { name: "Polytheism", color: "faith-polytheism", bgColor: "faith-polytheism-bg", symbol: polytheismCircleImage },
  ];

  // Sound test types for advanced testing
  const testSounds = [
    { type: 'click' as const, label: 'Click', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'success' as const, label: 'Success', color: 'bg-green-500 hover:bg-green-600' },
    { type: 'badge' as const, label: 'Badge', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { type: 'notification' as const, label: 'Notification', color: 'bg-teal-500 hover:bg-teal-600' },
    { type: 'spiritual-bell' as const, label: 'Spiritual Bell', color: 'bg-pink-500 hover:bg-pink-600' },
    { type: 'modal-open' as const, label: 'Modal Open', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { type: 'tab-switch' as const, label: 'Tab Switch', color: 'bg-teal-500 hover:bg-teal-600' },
    { type: 'send-message' as const, label: 'Send Message', color: 'bg-cyan-500 hover:bg-cyan-600' },
  ];

  // Get tier-specific badge info
  const getTierBadgeInfo = () => {
    switch (tier) {
      case 'seeker':
        return {
          text: 'Free Explorer',
          gradient: 'from-slate-400/20 to-slate-500/20',
          borderColor: 'border-slate-400/40',
          icon: <Sparkles className="w-4 h-4 mr-2 text-slate-400" />
        };
      case 'subscriber':
        return {
          text: 'Subscriber',
          gradient: 'from-blue-500/20 to-cyan-500/20',
          borderColor: 'border-blue-400/40',
          icon: <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400" />
        };
      case 'devotee':
        return {
          text: 'Devotee Member',
          gradient: 'from-[#497EBC]/20 to-teal-600/20',
          borderColor: 'border-[#497EBC]/40',
          icon: <Crown className="w-4 h-4 mr-2 text-[#497EBC]" />
        };
      case 'enlightened':
        return {
          text: 'Enlightened Member',
          gradient: 'from-[#497EBC]/20 to-[#FFD369]/20',
          borderColor: 'border-[#FFD369]/40',
          icon: <Crown className="w-4 h-4 mr-2 text-[#FFD369]" />
        };
      default:
        return {
          text: 'Member',
          gradient: 'from-slate-400/20 to-slate-500/20',
          borderColor: 'border-slate-400/40',
          icon: <Sparkles className="w-4 h-4 mr-2 text-slate-400" />
        };
    }
  };

  const tierBadgeInfo = getTierBadgeInfo();

  // Profile avatar management - prioritize user's signup avatar
  const [profileAvatar, setProfileAvatar] = useState<string | null>(() => {
    try {
      // First check if user has an avatar from signup (social media context)
      if (currentUser?.avatar) {
        return currentUser.avatar;
      }
      // Fall back to localStorage
      return localStorage.getItem('divinityagi_avatar') || null;
    } catch (e) {
      return null;
    }
  });

  // Preset spiritual avatars
  const presetAvatars = [
    { id: 'lotus', emoji: '🪷', label: 'Lotus' },
    { id: 'om', emoji: '🕉️', label: 'Om' },
    { id: 'prayer', emoji: '🙏', label: 'Prayer' },
    { id: 'peace', emoji: '☮️', label: 'Peace' },
    { id: 'star', emoji: '⭐', label: 'Star' },
    { id: 'crescent', emoji: '☪️', label: 'Crescent' },
    { id: 'cross', emoji: '✝️', label: 'Cross' },
    { id: 'dharma', emoji: '☸️', label: 'Dharma' },
    { id: 'dove', emoji: '🕊️', label: 'Dove' },
    { id: 'candle', emoji: '🕯️', label: 'Candle' },
    { id: 'incense', emoji: '🪔', label: 'Light' },
    { id: 'meditation', emoji: '🧘', label: 'Meditation' },
  ];

  // Sync avatar with current user from social media context
  React.useEffect(() => {
    if (currentUser?.avatar && !profileAvatar) {
      // If current user has an avatar and profile avatar is not set, use the user's avatar
      setProfileAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (previewAvatar) {
      try {
        localStorage.setItem('divinityagi_avatar', previewAvatar);
        setProfileAvatar(previewAvatar);
        
        // Update social media context if user exists
        if (currentUser) {
          const updatedUser = { ...currentUser, avatar: previewAvatar };
          setCurrentUser(updatedUser);
        }
        
        setShowAvatarUpload(false);
        setPreviewAvatar(null);
        toast.success("Profile picture updated successfully!");
      } catch (e) {
        toast.error("Failed to save avatar. Image may be too large.");
      }
    }
  };

  const handleSelectPresetAvatar = (emoji: string) => {
    setPreviewAvatar(`preset:${emoji}`);
  };

  const handleRemoveAvatar = () => {
    localStorage.removeItem('divinityagi_avatar');
    setProfileAvatar(null);
    setPreviewAvatar(null);
    setShowAvatarUpload(false);
    toast.success("Profile picture removed");
  };

  // Stats data - Three key metrics in a single row
  const stats = [
    { label: "Past Chats", value: "47", icon: MessageSquare },
    { label: "Days Active", value: "7", icon: Calendar },
    { label: "Wisdom Gained", value: totalWisdomPoints.toString(), icon: Sparkles },
  ];

  // Show Achievement Dashboard if requested
  if (showAchievementDashboard) {
    return <BadgeAchievementDashboard onBack={() => setShowAchievementDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
      
      {/* Content Container */}
      <div className="relative max-w-md lg:max-w-7xl mx-auto">
        
        {/* Full Screen Header Section */}
        <section className="px-4 sm:px-6 pt-[30px] sm:pb-2 text-center relative z-10 mx-auto max-w-full sm:max-w-2xl min-h-screen sm:min-h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0 sm:rounded-3xl overflow-hidden -z-10">
            <img 
              src={profileHeaderBgImage} 
              alt="" 
              className="w-full h-full object-cover opacity-100"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-0 sm:mb-2 relative py-8"
          >
            {/* Icon */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            <h1 className="text-[40px] sm:text-[48px] text-white mb-1 sm:mb-3" style={{ fontFamily: "Butler, serif", fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              My Profile
            </h1>
            
            <div className="w-20 h-0.5 sm:h-1 sm:w-24 bg-gradient-to-r from-[#497EBC] to-[#b69e60] mx-auto rounded-full mb-1 sm:mb-3" />
            
            <p className="text-[15px] sm:text-[16px] text-white mb-0 sm:mb-3 px-8 sm:px-20" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, lineHeight: 1.5 }}>
              Monitor spiritual growth, track personal achievements or join a community.
            </p>
          </motion.div>
        </section>

        {/* Plan your Journey Section with Video Background */}
        <motion.section 
          className="px-4 sm:px-6 sm:mb-[32px] relative -mt-4 sm:mt-8 mr-[0px] mb-[24px] ml-[0px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md sm:max-w-sm mx-auto relative"
          >
            {/* Background Video Container */}
            <div className="relative rounded-3xl overflow-visible min-h-[700px] sm:min-h-[600px]">
              {/* Background Video */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <video 
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={profileVideoPoster}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center center' }}
                >
                  <source src="https://divinityagi.com/wp-content/uploads/2026/01/Profile-Group-Pose-Loop.mp4" type="video/mp4" />
                  {/* Fallback to poster image if video doesn't load */}
                  <img 
                    src={profileVideoPoster} 
                    alt="Profile Journey"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                  />
                </video>
              </div>
              
              {/* Glassmorphism Card Overlay - Positioned at bottom */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-end z-10 mx-[0px] my-[135px]">
                <Card 
                  onClick={(e) => {
                    e.stopPropagation();
                    haptic?.tap();
                    setShowProfileIntro(true);
                  }}
                  className="relative overflow-hidden rounded-2xl border-0 cursor-pointer group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 0 0 1px #b69e60, 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(182, 158, 96, 0.4)',
                    border: '1px solid #b69e60',
                    minWidth: '280px',
                    minHeight: '280px',
                    maxWidth: '380px',
                    maxHeight: '380px'
                  }}
                >
                  {/* Content */}
                  <div className="relative z-10 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                      
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg transition-transform group-hover:scale-110">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      <h2 className="text-[16px] sm:text-[18px] md:text-[20px] text-white mb-1.5 sm:mb-2 drop-shadow-lg px-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1.2 }}>
                        Plan your Journey
                      </h2>
                      
                      <p className="text-white/95 text-[11px] sm:text-[12px] mb-2 sm:mb-3 max-w-[220px] sm:max-w-[240px] md:max-w-[260px] mx-auto drop-shadow-md text-center" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, lineHeight: 1.5 }}>
                        Unlock unlimited spiritual guidance and premium features to elevate your path to enlightenment.
                      </p>
                      
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white/90 text-[10px] sm:text-[11px] mb-3 sm:mb-4" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                        <span>Unlimited Chat</span>
                        <span className="text-white/50">•</span>
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                        <span>Premium Guides</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#a79a4c] hover:bg-[#8b7a4a] backdrop-blur-sm border border-white/40 rounded-full text-white shadow-xl group-hover:shadow-2xl transition-all text-[13px] sm:text-[14px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                        Discover Your Profile
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Tab Switcher */}
      <section className="px-4 sm:px-6 pt-4 sm:pt-6 mb-8 sm:mb-12 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl p-1.5 sm:p-2 border border-gray-200 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] w-full max-w-2xl">
              <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                {[
                  { id: "profile", label: "Profile" },
                  { id: "social", label: "Social" },
                  { id: "badges", label: "Badges" },
                  { id: "settings", label: "Settings" }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    data-tab={tab.id}
                    className={`relative px-2 sm:px-6 py-2.5 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-[#6a7282] hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    style={{ fontWeight: activeTab === tab.id ? 600 : 500, fontFamily: "Helvetica, sans-serif" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeProfileTab"
                        className="absolute inset-0 bg-gradient-to-br from-[#497EBC] via-[#5B8DC3] to-[#4B7DB3] rounded-lg sm:rounded-xl shadow-[0px_4px_16px_0px_rgba(73,126,188,0.4)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative text-[11px] sm:text-[14px]">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div 
              className="px-4 sm:px-6 space-y-8 sm:space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced Profile Header */}
              <motion.div 
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="relative inline-block mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#497EBC] via-teal-600 to-[#FFD369] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-[0_8px_30px_rgba(73,126,188,0.3)] ring-4 ring-[#FFD369]/30 overflow-hidden">
                      {profileAvatar ? (
                        profileAvatar.startsWith('preset:') ? (
                          // Preset emoji avatar (from profile page preset selection)
                          <div className="w-full h-full bg-[#162844]/90 rounded-2xl flex items-center justify-center text-6xl">
                            {profileAvatar.replace('preset:', '')}
                          </div>
                        ) : profileAvatar.startsWith('data:image') ? (
                          // Uploaded photo (base64 data URL from signup or profile update)
                          <ImageWithFallback
                            src={profileAvatar}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : profileAvatar.includes('ui-avatars.com') ? (
                          // Default or emoji avatar from ui-avatars.com (from signup)
                          <ImageWithFallback
                            src={profileAvatar}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          // Any other URL format
                          <ImageWithFallback
                            src={profileAvatar}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        )
                      ) : (
                        // No avatar set - show default placeholder
                        <div className="w-28 h-28 bg-[#162844]/90 rounded-2xl flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-400/40 to-amber-400/40 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <motion.button 
                      onClick={() => setShowAvatarUpload(true)}
                      className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#FFD369] to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_4px_15px_rgba(255,211,105,0.5)] hover:shadow-[0_6px_20px_rgba(255,211,105,0.7)] transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 drop-shadow-lg" />
                    </motion.button>
                    {/* Status Ring */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-3 sm:border-4 border-white flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-300 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <h2 className="text-[24px] sm:text-[32px] text-[#3D3D6B]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        {userName}
                      </h2>
                      <Button
                        onClick={() => setShowEditProfile(true)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-[#497EBC] hover:bg-[#497EBC]/5"
                      >
                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    {currentUser?.username && (
                      <p className="text-gray-500 mb-2 text-[13px] sm:text-[14px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>@{currentUser.username}</p>
                    )}
                    {currentUser?.bio && (
                      <p className="text-gray-600 mb-3 sm:mb-4 max-w-lg mx-auto text-[13px] sm:text-[14px] px-4" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, lineHeight: 1.6 }}>{currentUser.bio}</p>
                    )}
                    <p className="text-gray-500 mb-4 sm:mb-6 text-[13px] sm:text-[14px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>Member since {userRegistrationDate}</p>
                    {/* Social Stats */}
                    {currentUser && currentUser.stats && (
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="text-center">
                          <div className="text-[28px] text-[#3D3D6B] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{currentUser.stats.posts}</div>
                          <div className="text-gray-500 text-[12px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Posts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[28px] text-[#3D3D6B] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{currentUser.stats.followers}</div>
                          <div className="text-gray-500 text-[12px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[28px] text-[#3D3D6B] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{currentUser.stats.following}</div>
                          <div className="text-gray-500 text-[12px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Following</div>
                        </div>
                      </div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Badge className="bg-[#a79a4c] text-white border-2 border-[#a79a4c] px-6 py-2 rounded-full shadow-[0_4px_15px_rgba(167,154,76,0.3)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                        {tierBadgeInfo.icon}
                        {tierBadgeInfo.text}
                      </Badge>
                      
                      {/* Show registration prompt for seeker tier */}
                      {tier === 'seeker' && !userEmail && (
                        <div className="mt-4">
                          <Button
                            onClick={() => onNavigate?.('registration')}
                            variant="outline"
                            className="bg-[#1e386e] hover:bg-[#2a4a7c] text-white border-0 shadow-[0_4px_15px_rgba(30,56,110,0.4)] hover:shadow-[0_6px_25px_rgba(30,56,110,0.6)] transition-all duration-300 hover:scale-105 px-6 py-2 rounded-full"
                            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Register to Unlock More Features
                          </Button>
                        </div>
                      )}
                      
                      {/* Show upgrade prompt for subscriber tier */}
                      {tier === 'subscriber' && (
                        <div className="mt-4">
                          <Button
                            onClick={() => openSignupFlow('devotee')}
                            variant="outline"
                            className="bg-[#1e386e]/20 border-2 border-[#a79a4c] text-[#3D3D6B] hover:bg-[#1e386e]/30 px-6 py-2 rounded-full"
                            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                          >
                            <Crown className="w-4 h-4 mr-2 text-[#a79a4c]" />
                            Upgrade to Premium
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Journal, Goals, Privacy, Language & Community Quick Access */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <h3 className="text-[20px] sm:text-[28px] text-[#3D3D6B] mb-4 sm:mb-8 text-center px-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Spiritual Growth & Community</h3>
                
                {/* Main Cards - 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 sm:mb-6 mt-[37px] mr-[0px] mb-[16px] ml-[0px]">
                  {/* Analytics Card */}
                  <Card 
                    className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                    onClick={() => onNavigate && onNavigate('analytics')}
                  >
                    {/* Background Image */}
                    <img 
                      src={analyticsCardImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 h-32 sm:h-40 flex flex-col justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white mb-0.5 sm:mb-1 text-[15px] sm:text-[18px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Analytics</h4>
                        <p className="text-white/80 text-[11px] sm:text-[13px] leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          Track your spiritual growth
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Journal Card */}
                  <Card 
                    className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                    onClick={() => onNavigate && onNavigate('journal')}
                  >
                    {/* Background Image */}
                    <img 
                      src={journalCardImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 h-32 sm:h-40 flex flex-col justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white mb-0.5 sm:mb-1 text-[15px] sm:text-[18px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Journal</h4>
                        <p className="text-white/80 text-[11px] sm:text-[13px] leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          Daily reflections & insights
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Goals Card */}
                  <Card 
                    className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                    onClick={() => onNavigate && onNavigate('goals')}
                  >
                    {/* Background Image */}
                    <img 
                      src={goalsCardImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 h-32 sm:h-40 flex flex-col justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white mb-0.5 sm:mb-1 text-[15px] sm:text-[18px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Goals</h4>
                        <p className="text-white/80 text-[11px] sm:text-[13px] leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          Set spiritual intentions
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Community Hub Card */}
                  <Card 
                    className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                    onClick={() => {
                      onNavigate && onNavigate('circle');
                      // Scroll to Global Community section after navigation
                      setTimeout(() => {
                        const element = document.querySelector('[data-section="global-community"]');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                  >
                    {/* Background Image */}
                    <img 
                      src={communityCardImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-6 h-32 sm:h-40 flex flex-col justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white mb-0.5 sm:mb-1 text-[15px] sm:text-[18px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>Community</h4>
                        <p className="text-white/80 text-[11px] sm:text-[13px] leading-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          Connect with seekers
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>


              </motion.div>

              {/* Your Subscription */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-4xl mx-auto mb-6 sm:mb-8"
              >
                <h3 className="text-[20px] sm:text-[24px] text-[#3D3D6B] mb-4 sm:mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Your Subscription
                </h3>
                
                <Card className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#a79a4c] shadow-xl" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  {/* Decorative elements - Removed */}
                  
                  <div className="relative p-5 sm:p-8">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#a79a4c]" />
                          <h4 className="text-white text-[17px] sm:text-[20px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                            Your Subscription
                          </h4>
                        </div>
                        <p className="text-slate-300 text-[12px] sm:text-[14px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          {tier === 'seeker' && 'Free Tier - Explore DivinityAGI'}
                          {tier === 'subscriber' && 'Subscriber Tier - Enhanced Access'}
                          {tier === 'devotee' && 'Devotee Tier - Premium Experience'}
                          {tier === 'enlightened' && 'Enlightened Tier - Ultimate Access'}
                        </p>
                      </div>
                      
                      {/* Tier Badge */}
                      <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#a79a4c] border-2 border-[#a79a4c] backdrop-blur-sm flex-shrink-0`}>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {tierBadgeInfo.icon}
                          <span className="text-white text-[10px] sm:text-[12px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                            {tierBadgeInfo.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-[#182238]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#a79a4c]/30">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a79a4c]" />
                          <p className="text-slate-300 text-[9px] sm:text-[11px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Tokens</p>
                        </div>
                        <p className="text-white text-[18px] sm:text-[24px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                          {currentPlan.tokenAllowance === -1 ? '∞' : currentPlan.tokenAllowance}
                        </p>
                        <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 sm:mt-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                          {currentPlan.tokenAllowance === -1 ? 'per day' : 'daily'}
                        </p>
                      </div>

                      <div className="bg-[#182238]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#a79a4c]/30">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a79a4c]" />
                          <p className="text-slate-300 text-[9px] sm:text-[11px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Wisdom</p>
                        </div>
                        <p className="text-white text-[18px] sm:text-[24px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{totalWisdomPoints}</p>
                        <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 sm:mt-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>points</p>
                      </div>

                      <div className="bg-[#182238]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#a79a4c]/30">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a79a4c]" />
                          <p className="text-slate-300 text-[9px] sm:text-[11px] uppercase tracking-wide" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>Badges</p>
                        </div>
                        <p className="text-white text-[18px] sm:text-[24px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{unlockedBadges.length}</p>
                        <p className="text-slate-400 text-[9px] sm:text-[10px] mt-0.5 sm:mt-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>earned</p>
                      </div>
                    </div>

                    {/* Tier Benefits */}
                    <div className="bg-[#182238]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#a79a4c]/30 mb-4 sm:mb-6">
                      <h5 className="text-white text-[14px] sm:text-[16px] mb-3 sm:mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        Your Benefits
                      </h5>
                      
                      <div className="space-y-2.5 sm:space-y-3">
                        {tier === 'seeker' && (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#a79a4c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#a79a4c]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>{currentPlan.tokenAllowance} Daily Tokens</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>Basic chat access</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#a79a4c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#a79a4c]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>1 Avatar Per Faith Group</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>Rotating selection</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#497EBC]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#497EBC]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Community Groups Access</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Join spiritual communities</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-slate-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Lock className="w-3 h-3 text-slate-500" />
                              </div>
                              <div>
                                <p className="text-slate-400 text-[13px]" style={{ fontWeight: 500 }}>Trial Personal Guide</p>
                                <p className="text-slate-500 text-[11px]" style={{ fontWeight: 400 }}>Limited features</p>
                              </div>
                            </div>
                          </>
                        )}

                        {tier === 'subscriber' && (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>{currentPlan.tokenAllowance} Daily Tokens</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Enhanced chat access</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Standard Avatar Access</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Chat with all standard avatars</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Token Top-Ups & Earning</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Earn tokens through wisdom</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Badge & Milestone System</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Track your spiritual growth</p>
                              </div>
                            </div>
                          </>
                        )}

                        {tier === 'devotee' && (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>{currentPlan.tokenAllowance} Daily Tokens</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Extended token allowance</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Chat with All Avatars</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Full avatar library access</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Extended Spirit Guide Library</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Access premium guides</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Special Reflections & Rituals</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Exclusive spiritual content</p>
                              </div>
                            </div>
                          </>
                        )}

                        {tier === 'enlightened' && (
                          <>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Unlimited Daily Tokens</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Chat without any limits</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Priority Avatar Access</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>First access to new avatars</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Exclusive Events & Workshops</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Live Q&A sessions included</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFD369]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Crown className="w-3 h-3 text-[#FFD369]" />
                              </div>
                              <div>
                                <p className="text-white text-[13px]" style={{ fontWeight: 500 }}>Priority Support</p>
                                <p className="text-slate-400 text-[11px]" style={{ fontWeight: 400 }}>Get help faster with priority queue</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    {tier === 'seeker' && (
                      <Button
                        onClick={() => onNavigate?.('registration')}
                        className="w-full bg-gradient-to-r from-[#497EBC] to-teal-600 hover:from-[#3E6A9F] hover:to-[#497EBC] text-white rounded-full h-11 sm:h-12 border-0 shadow-[0_4px_20px_rgba(73,126,188,0.5)] hover:shadow-[0_6px_30px_rgba(73,126,188,0.7)] transition-all duration-300 text-[13px] sm:text-[15px]"
                        style={{ fontWeight: 600 }}
                      >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                        <span className="hidden sm:inline">Register Free - Get More Tokens & Features</span>
                        <span className="sm:hidden">Register Free</span>
                      </Button>
                    )}

                    {tier === 'subscriber' && (
                      <Button
                        onClick={() => openSignupFlow('devotee')}
                        className="w-full bg-gradient-to-r from-[#FFD369] to-amber-500 hover:from-[#FFC359] hover:to-[#FFB84D] text-slate-900 rounded-full h-11 sm:h-12 border-0 shadow-[0_4px_20px_rgba(255,211,105,0.5)] hover:shadow-[0_6px_30px_rgba(255,211,105,0.7)] transition-all duration-300 text-[13px] sm:text-[15px]"
                        style={{ fontWeight: 600 }}
                      >
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                        <span className="hidden sm:inline">Upgrade to Devotee - $9.99/month</span>
                        <span className="sm:hidden">Upgrade - $9.99/mo</span>
                      </Button>
                    )}

                    {tier === 'devotee' && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/5 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 border border-white/10 gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white text-[13px] sm:text-[14px]" style={{ fontWeight: 500 }}>You're on the Premium Plan</span>
                        </div>
                        <Button
                          onClick={() => onNavigate?.('billing')}
                          variant="ghost"
                          size="sm"
                          className="text-[#FFD369] hover:text-[#FFC359] hover:bg-white/5 text-[12px] sm:text-[13px] w-full sm:w-auto"
                        >
                          Manage Billing
                        </Button>
                      </div>
                    )}

                    {tier === 'enlightened' && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-[#FFD369]/10 to-[#497EBC]/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 border border-[#FFD369]/30 gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD369] flex-shrink-0" />
                          <span className="text-white text-[13px] sm:text-[14px]" style={{ fontWeight: 500 }}>
                            <span className="hidden sm:inline">You're Enlightened - Maximum Access</span>
                            <span className="sm:hidden">Enlightened - Max Access</span>
                          </span>
                        </div>
                        <Button
                          onClick={() => onNavigate?.('billing')}
                          variant="ghost"
                          size="sm"
                          className="text-[#FFD369] hover:text-[#FFC359] hover:bg-white/5 text-[12px] sm:text-[13px] w-full sm:w-auto"
                        >
                          Manage Billing
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Spiritual Journey Section */}
              <SpiritualJourneySection 
                onNavigate={onNavigate}
                className="pb-16"
              />
            </motion.div>
          )}

          {activeTab === "badges" && (
            <motion.div 
              className="px-6 pb-20 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <BadgeAchievementDashboard />
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div 
              className="px-6 pb-20 pt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#497EBC] to-[#FFD369] mx-auto mb-6 shadow-[0_0_30px_rgba(73,126,188,0.4)]"
                  >
                    <img src={meditationIconImage} alt="Meditation Icon" className="w-12 h-12 object-contain" />
                  </motion.div>
                  <h2 className="text-[32px] text-[#3D3D6B] mb-3" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}>
                    Personalize Your Experience
                  </h2>
                  <p className="text-gray-600 text-[14px] max-w-md mx-auto" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 400, lineHeight: 1.6 }}>
                    Customize DivinityAGI to match your spiritual preferences and style.
                  </p>
                </div>

                {/* Settings Content */}
                <div className="space-y-6 pb-6">
                    {/* Update Your Guide Section */}
                    {hasCreatedGuide && createdGuide && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card 
                          className="relative rounded-3xl overflow-hidden"
                          style={{
                            background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                            boxShadow: '0px 0px 0px 2px #b69e60, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
                          }}
                        >
                          {/* Parallax Background Layer */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80 transition-transform duration-100"
                            style={{
                              transform: `translateY(${parallaxOffset}px)`,
                              willChange: 'transform'
                            }}
                          />
                          <div className="relative z-10">
                            {/* Decorative gradient header */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#497EBC]/10 via-[#FFD369]/10 to-[#497EBC]/10" />
                            
                            <div className="relative p-5">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                                  <User className="w-5 h-5 text-white drop-shadow-lg" />
                                </div>
                                <div>
                                  <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Your Personal Guide</h3>
                                  <p className="text-sm text-slate-300">Customize your spiritual companion</p>
                                </div>
                              </div>

                              {/* Guide Preview */}
                              <div className="bg-[#334155]/60 rounded-xl border border-[#475569]/30 p-4 mb-4">
                                <div className="flex items-center gap-4">
                                  {/* Guide Avatar */}
                                  <div className="relative flex-shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-pink-500 p-0.5">
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
                                        style={{ backgroundColor: `${faithColor}20`, color: faithColor, borderColor: `${faithColor}40` }}
                                        className="text-xs border"
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
                                  if (!onNavigate) {
                                    toast.error("Navigation not available");
                                    return;
                                  }
                                  
                                  toast.success(`Starting conversation with ${createdGuide.guideRole}`, { duration: 2000 });
                                  onNavigate('chat');
                                }}
                                className="w-full bg-gradient-to-r from-[#497EBC] via-teal-600 to-[#5A9BCE] hover:from-[#3E6A9F] hover:via-teal-700 hover:to-[#4A8BBE] text-white shadow-[0_4px_20px_rgba(73,126,188,0.6)] hover:shadow-[0_6px_30px_rgba(73,126,188,0.8)] transition-all duration-300 hover:scale-105"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                <span className="drop-shadow-lg">Chat Now</span>
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
                        </Card>
                      </motion.div>
                    )}

                    {/* Archived Guides Section */}

                    {/* Quick Settings */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-white text-lg px-2">Quick Settings</h3>
                      
                      {/* Sound Effects */}
                      <Card 
                        className="relative rounded-3xl"
                        style={{
                          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                          boxShadow: '0px 0px 0px 2px #b69e60, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                        <div className="p-5 relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                                {soundEnabled ? <Volume2 className="w-5 h-5 text-white drop-shadow-lg" /> : <VolumeX className="w-5 h-5 text-white drop-shadow-lg" />}
                              </div>
                              <div>
                                <h3 className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Sound Effects</h3>
                                <p className="text-sm text-slate-300">Audio feedback for interactions</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-[#FFD369]/20 text-[#FFD369] border-[#FFD369]/40">
                              {soundEnabled ? 'On' : 'Off'}
                            </Badge>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#334155]/60 rounded-xl border border-[#475569]/30">
                              <div className="flex items-center gap-3">
                                {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                                <span className="text-white">Sound Effects</span>
                              </div>
                              <Switch
                                checked={soundEnabled}
                                onCheckedChange={() => {
                                  toggleSound();
                                  if (!soundEnabled) {
                                    setTimeout(() => playSound('success', 0.3), 100);
                                  }
                                }}
                                className="data-[state=checked]:bg-[#497EBC]"
                              />
                            </div>

                            {soundEnabled && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3"
                              >
                                <div className="p-4 bg-[#334155]/60 rounded-xl border border-[#475569]/30">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-white">Volume</span>
                                    <span className="text-xs text-slate-400">{Math.round(soundVolume * 100)}%</span>
                                  </div>
                                  <Slider
                                    value={[soundVolume * 100]}
                                    onValueChange={(value) => {
                                      setSoundVolume(value[0] / 100);
                                    }}
                                    onValueCommit={() => {
                                      playSound('click', soundVolume);
                                    }}
                                    max={100}
                                    step={5}
                                    className="cursor-pointer"
                                  />
                                </div>

                                <Button
                                  variant="ghost"
                                  onClick={() => playSound('spiritual-bell', soundVolume)}
                                  className="w-full bg-[#334155]/60 hover:bg-[#475569]/60 text-white border border-[#475569]/30"
                                >
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Test Sound
                                </Button>

                                {/* Advanced Sound Testing */}
                                <div className="border-t border-slate-600/30 pt-3">
                                  <Button
                                    variant="ghost"
                                    onClick={() => setShowAdvancedSoundTests(!showAdvancedSoundTests)}
                                    className="w-full bg-[#334155]/60 hover:bg-[#475569]/60 text-slate-300 hover:text-white border border-[#475569]/30 justify-between"
                                  >
                                    <span className="text-xs">Advanced Sound Testing</span>
                                    {showAdvancedSoundTests ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </Button>

                                  {showAdvancedSoundTests && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-3 grid grid-cols-2 gap-2"
                                    >
                                      {testSounds.map((sound) => (
                                        <Button
                                          key={sound.type}
                                          size="sm"
                                          onClick={() => {
                                            playSound(sound.type, soundVolume);
                                          }}
                                          className={`${sound.color} text-white text-xs transition-all`}
                                        >
                                          <Play className="w-3 h-3 mr-1" />
                                          {sound.label}
                                        </Button>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>

                                {/* Ambient Sounds for Guided Meditations */}
                                <div className="border-t border-slate-600/30 pt-3">
                                  <Button
                                    variant="ghost"
                                    onClick={() => setShowAmbientSoundTests(!showAmbientSoundTests)}
                                    className="w-full bg-[#334155]/60 hover:bg-[#475569]/60 text-slate-300 hover:text-white border border-[#475569]/30 justify-between"
                                  >
                                    <span className="text-xs">Ambient Sounds (Meditation)</span>
                                    {showAmbientSoundTests ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </Button>

                                  {showAmbientSoundTests && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-3 space-y-3"
                                    >
                                      {/* Ambient Volume Slider */}
                                      <div className="p-3 bg-[#334155]/60 rounded-xl border border-[#475569]/30">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-white">Ambient Volume</span>
                                          <span className="text-xs text-slate-400">{ambientVolume}%</span>
                                        </div>
                                        <Slider
                                          value={[ambientVolume]}
                                          onValueChange={(value) => {
                                            setAmbientVolume(value[0]);
                                          }}
                                          max={100}
                                          step={5}
                                          className="cursor-pointer"
                                        />
                                      </div>

                                      {/* Ambient Sound Grid */}
                                      <div className="grid grid-cols-2 gap-2">
                                        {AMBIENT_SOUNDS.map((sound) => {
                                          const SoundIcon = sound.icon;
                                          const isActive = selectedAmbientSound?.id === sound.id && ambientIsPlaying;
                                          
                                          return (
                                            <Button
                                              key={sound.id}
                                              size="sm"
                                              onClick={() => {
                                                if (selectedAmbientSound?.id === sound.id) {
                                                  // Toggle play/pause for same sound
                                                  toggleAmbientPlayPause();
                                                  toast.success(ambientIsPlaying ? `${sound.name} stopped` : `${sound.name} playing`);
                                                } else {
                                                  // Select new sound (doesn't auto-play)
                                                  selectAmbientSound(sound);
                                                  toast.success(`${sound.name} selected`);
                                                }
                                              }}
                                              className={`text-white text-xs transition-all relative overflow-hidden ${
                                                isActive 
                                                  ? 'border-2 shadow-lg' 
                                                  : 'hover:opacity-90'
                                              }`}
                                              style={{
                                                background: isActive 
                                                  ? `linear-gradient(135deg, ${sound.color}80, ${sound.color}40)`
                                                  : `linear-gradient(135deg, ${sound.color}60, ${sound.color}30)`,
                                                borderColor: isActive ? sound.color : 'transparent'
                                              }}
                                            >
                                              <SoundIcon 
                                                className="w-3 h-3 mr-1" 
                                                style={{ color: 'white' }}
                                              />
                                              {sound.name}
                                              {isActive && (
                                                <motion.div
                                                  className="absolute inset-0 bg-white/10"
                                                  animate={{ opacity: [0.3, 0.1, 0.3] }}
                                                  transition={{ duration: 2, repeat: Infinity }}
                                                />
                                              )}
                                            </Button>
                                          );
                                        })}
                                      </div>

                                      {/* Play/Stop Button for selected sound */}
                                      {selectedAmbientSound && (
                                        <Button
                                          onClick={() => {
                                            toggleAmbientPlayPause();
                                            toast.success(
                                              ambientIsPlaying 
                                                ? `${selectedAmbientSound.name} stopped` 
                                                : `${selectedAmbientSound.name} playing`
                                            );
                                          }}
                                          className="w-full text-xs"
                                          style={{
                                            background: ambientIsPlaying
                                              ? `linear-gradient(135deg, ${selectedAmbientSound.color}80, ${selectedAmbientSound.color}40)`
                                              : 'linear-gradient(135deg, #475569, #334155)',
                                            color: 'white'
                                          }}
                                        >
                                          {ambientIsPlaying ? (
                                            <Square className="w-3 h-3 mr-2 fill-current" />
                                          ) : (
                                            <Play className="w-3 h-3 mr-2" />
                                          )}
                                          {ambientIsPlaying ? `Stop ${selectedAmbientSound.name}` : `Play ${selectedAmbientSound.name}`}
                                        </Button>
                                      )}
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </Card>

                      {/* Haptic Feedback */}
                      <Card 
                        className="relative rounded-3xl"
                        style={{
                          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                          boxShadow: '0px 0px 0px 2px #b69e60, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                        <div className="p-4 relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                                <Vibrate className={`w-5 h-5 ${hapticsEnabled ? 'text-white drop-shadow-lg' : 'text-slate-400'}`} />
                              </div>
                              <div>
                                <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Haptic Feedback</span>
                                <p className="text-xs text-slate-300">Tactile vibrations (mobile)</p>
                              </div>
                            </div>
                            <Switch
                              checked={hapticsEnabled}
                              onCheckedChange={() => {
                                setHapticsEnabled(!hapticsEnabled);
                                // Trigger a haptic test if enabling
                                if (!hapticsEnabled && navigator.vibrate) {
                                  navigator.vibrate(20);
                                }
                              }}
                              className="data-[state=checked]:bg-[#497EBC]"
                            />
                          </div>
                          <div className="text-xs text-slate-500 pl-[52px]">
                            Feel subtle vibrations when interacting with the app on mobile devices
                          </div>
                        </div>
                      </Card>

                      {/* Privacy & Data Dashboard */}
                      <Card 
                        className="relative rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-300"
                        onClick={() => onNavigate && onNavigate('privacy-dashboard')}
                        style={{
                          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                          boxShadow: '0px 0px 0px 2px #b69e60, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                        <div className="p-4 relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                                <Shield className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                              <div>
                                <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Privacy & Data</span>
                                <p className="text-xs text-slate-300">Control your data & privacy</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-[#4CAF50]/50 text-[#4CAF50] bg-[#4CAF50]/10">
                              Secure
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-400 pl-[52px] mb-3">
                            Manage privacy settings, export your data, and control how your information is used
                          </div>
                          <div className="flex items-center gap-2 text-sm pl-[52px]">
                            <Lock className="w-4 h-4 text-[#4CAF50]" />
                            <span className="text-slate-300">Tap to manage settings</span>
                          </div>
                        </div>
                      </Card>

                      {/* Language Settings */}
                      <Card 
                        className="relative rounded-3xl"
                        style={{
                          background: 'linear-gradient(to bottom, #0a3d4d 0%, #3a5f7d 30%, #2a3a5a 70%, #1a1a3a 100%)',
                          boxShadow: '0px 0px 0px 2px #b69e60, 0px 20px 50px 0px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/8 to-transparent opacity-80" />
                        <div className="p-4 relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#497EBC] to-[#FFD369] flex items-center justify-center shadow-[0_4px_15px_rgba(73,126,188,0.5)]">
                                <Globe className="w-5 h-5 text-white drop-shadow-lg" />
                              </div>
                              <div>
                                <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Language</span>
                                <p className="text-xs text-slate-300">Choose your preferred language</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-[#FFD369]/50 text-[#FFD369] bg-[#FFD369]/10">
                              Global
                            </Badge>
                          </div>
                          <div className="pl-[52px]">
                            <LanguageSelector variant="card" showLabel={false} />
                          </div>
                        </div>
                      </Card>

                      {/* Meditation Reminders */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        <MeditationReminderSystem />
                      </motion.div>
                    </motion.div>

                    {/* Footer Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center py-4"
                    >

                    </motion.div>
                  </div>
              </motion.div>
            </motion.div>
          )}

          {/* Social Tab - Community Circle */}
          {activeTab === "social" && (
            <motion.div
              className="px-6 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Community Circle Header Section */}
                <motion.div 
                  id="community-circle-section"
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {/* Section Header with Background Image */}
                  <div className="relative mb-12 rounded-3xl overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img
                        src={diverseCommunityImage}
                        alt="Community Circle"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative text-center py-20 sm:py-24 px-6 pt-[120px] pr-[24px] pb-[120px] pl-[24px] bg-[rgba(0,0,0,0.39)]">
                      {/* Decorative gradient orbs */}
                      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#497EBC]/30 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#a79a4c]/30 rounded-full blur-3xl" />
                      
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-[#1e386e]/60 backdrop-blur-md border-2 border-[#a79a4c] rounded-full px-5 py-2.5 mb-6 shadow-[0_8px_32px_rgba(167,154,76,0.3)]">
                          <Users className="w-4 h-4 text-white drop-shadow-lg" />
                          <span className="text-white text-[13px]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}>Global Spiritual Community</span>
                        </div>
                        
                        <h2 className="text-[24px] text-white mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                          Community Circle
                        </h2>
                        <p className="text-white/95 text-[15px] sm:text-[18px] max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 500, lineHeight: 1.7 }}>
                          Connect, share, and grow with seekers from all faith traditions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Full Enhanced Community Hub */}
                  <EnhancedCommunityHub onNavigate={onNavigate} embedded={true} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* Avatar Upload Dialog */}
      <Dialog open={showAvatarUpload} onOpenChange={setShowAvatarUpload}>
        <DialogContent className="bg-[#162844] border-[#1E3A5F] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
              Update Profile Picture
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Upload a custom image or choose from our spiritual preset avatars.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Preview Section */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#497EBC] via-teal-600 to-[#FFD369] rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/30 ring-4 ring-[#497EBC]/20 overflow-hidden">
                  {previewAvatar ? (
                    previewAvatar.startsWith('preset:') ? (
                      <div className="w-full h-full bg-[#162844]/90 rounded-2xl flex items-center justify-center text-6xl">
                        {previewAvatar.replace('preset:', '')}
                      </div>
                    ) : (
                      <ImageWithFallback
                        src={previewAvatar}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )
                  ) : profileAvatar ? (
                    profileAvatar.startsWith('preset:') ? (
                      <div className="w-full h-full bg-[#162844]/90 rounded-2xl flex items-center justify-center text-6xl">
                        {profileAvatar.replace('preset:', '')}
                      </div>
                    ) : (
                      <ImageWithFallback
                        src={profileAvatar}
                        alt="Current Avatar"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )
                  ) : (
                    <div className="w-28 h-28 bg-[#162844]/90 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Custom Image */}
            <div>
              <Label className="text-slate-300 mb-3 block">Upload Custom Image</Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#0B1426] border-2 border-dashed border-[#1E3A5F] hover:border-[#497EBC]/50 rounded-xl cursor-pointer transition-all duration-300 group"
                >
                  <Camera className="w-5 h-5 text-[#497EBC] group-hover:text-[#FFD369] transition-colors" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Choose an image (Max 2MB)
                  </span>
                </label>
              </div>
            </div>

            {/* Preset Avatars */}
            <div>
              <Label className="text-slate-300 mb-3 block">Or Choose a Preset Avatar</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {presetAvatars.map((preset) => (
                  <motion.button
                    key={preset.id}
                    onClick={() => handleSelectPresetAvatar(preset.emoji)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                      previewAvatar === `preset:${preset.emoji}`
                        ? 'bg-gradient-to-br from-[#497EBC] to-teal-600 ring-2 ring-[#FFD369]'
                        : 'bg-[#0B1426] border border-[#1E3A5F] hover:border-[#497EBC]/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-3xl">{preset.emoji}</span>
                    <span className="text-xs text-slate-400">{preset.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {(profileAvatar || previewAvatar) && (
                <Button
                  onClick={handleRemoveAvatar}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
              <Button
                onClick={() => {
                  setShowAvatarUpload(false);
                  setPreviewAvatar(null);
                }}
                variant="outline"
                className="flex-1 border-[#475569] text-slate-300 hover:bg-[#334155]/60"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveAvatar}
                disabled={!previewAvatar}
                className="flex-1 bg-gradient-to-r from-[#497EBC] to-teal-600 hover:from-teal-700 hover:to-teal-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} />

      {/* Edit Guide Modal */}
      <EditGuideModal open={showEditModal} onClose={() => setShowEditModal(false)} />

      {/* Profile Intro Modal */}
      <ProfileIntroModal 
        isOpen={showProfileIntro} 
        onClose={() => setShowProfileIntro(false)}
        onGetStarted={() => {
          // Scroll to the profile content or perform any action
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />
      
      </div> {/* End Content Container */}
    </div>
  );
}