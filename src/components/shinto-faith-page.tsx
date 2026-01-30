import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { BackgroundVideo } from "./background-video";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useTimer } from "./timer-context";
import { useSavedGuides } from "./saved-guides-context";
import { ShintoFaithGroups } from "./shinto-faith-groups";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Book, 
  Users, 
  Shield, 
  Star,
  Play,
  Clock,
  ChevronRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mic,
  Lock,
  Coins,
  Home,
  Search,
  User,
  MessageSquare,
  Flower2,
  ChevronLeft,
  Plus,
  X
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/a4156881eae7bb5ce46183f57e19026a9879cd60.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import toriiGateImage from 'figma:asset/bde1450d9d31d6ac819fc94a7943e467402ce923.png';
import toriiSunsetImage from 'figma:asset/7bb3725150efb3797eb4be58126ad8c641de5d46.png';
import hikariNoMoriImage from 'figma:asset/2125c1928ea040e5b5d01616e638dc5f18c5e669.png';
import harutoTakamoriImage from 'figma:asset/1c8b2d5c032f2ee082d59fd5b881e876ca2957a9.png';
import ayakaHoshinoImage from 'figma:asset/ef7830f3a861814f74333c2e739f7e372cfc94b7.png';
import kentaMoriyamaImage from 'figma:asset/924425c2009b6ceb479338a9a50ea37169b67167.png';
import emperorMeijiImage from 'figma:asset/3d19e3e7639b25a2aef49230ac4f9c3f5e991d3c.png';

// Shinto-specific configuration with enhanced styling
const shintoConfig = {
  name: "Shinto",
  subtitle: "Honor the kami and embrace sacred harmony.",
  symbol: "⛩️",
  description: "Explore Shinto wisdom through AI guides inspired by historical and contemporary Shinto priests, emperors, and spiritual practitioners.",
  heroImage: heroImage,
  primaryColor: "#EA7F6A", // Muted color from wheel of faith
  lightColor: "rgba(234, 127, 106, 0.2)",
  hoverColor: "#D86F5A",
  suggestedTopics: [
    "Kami Veneration", "Shrine Rituals", "Matsuri Festivals", "Nature Harmony", 
    "Purification Rites", "Imperial Ceremonies", "Sacred Sites", "Community Traditions"
  ],
  topicsWithQuestions: [
    {
      topic: "Kami Veneration",
      icon: Sparkles,
      questions: [
        "What are kami and how do we honor them?",
        "How do I connect with the kami in nature?",
        "What is the relationship between kami and ancestors?",
        "How do different kami influence our lives?"
      ]
    },
    {
      topic: "Shrine Rituals",
      icon: Heart,
      questions: [
        "What is the proper way to visit a shrine?",
        "How do I perform purification rituals?",
        "What is the significance of torii gates?",
        "How do offerings honor the kami?"
      ]
    },
    {
      topic: "Matsuri Festivals",
      icon: Star,
      questions: [
        "What is the purpose of matsuri festivals?",
        "How do communities celebrate together?",
        "What are the major Shinto festivals?",
        "How do festivals strengthen our connection to kami?"
      ]
    },
    {
      topic: "Nature Harmony",
      icon: Flower2,
      questions: [
        "How does Shinto view the natural world?",
        "What makes certain places sacred?",
        "How do I practice harmony with nature?",
        "What can we learn from natural cycles?"
      ]
    },
    {
      topic: "Purification Rites",
      icon: Sparkles,
      questions: [
        "What is misogi purification?",
        "How do purification rituals cleanse us?",
        "What is the role of water in Shinto?",
        "How do I practice daily purification?"
      ]
    },
    {
      topic: "Imperial Ceremonies",
      icon: Shield,
      questions: [
        "What is the role of the Emperor in Shinto?",
        "How do imperial rituals preserve tradition?",
        "What is the spiritual significance of the chrysanthemum?",
        "How does imperial Shinto connect to the divine?"
      ]
    },
    {
      topic: "Sacred Sites",
      icon: Book,
      questions: [
        "What makes Ise Jingu so sacred?",
        "How do sacred mountains connect to kami?",
        "What are the most important Shinto shrines?",
        "How do pilgrimage sites deepen faith?"
      ]
    },
    {
      topic: "Community Traditions",
      icon: Users,
      questions: [
        "How does Shinto strengthen communities?",
        "What is the role of local shrines?",
        "How are traditions passed down generations?",
        "What does it mean to live in harmony?"
      ]
    }
  ],
  agents: [
    {
      id: "hikari-no-mori",
      name: "Hikari no Mori",
      role: "Counsellor",
      image: hikariNoMoriImage,
      description: "Prehistoric, animistic beliefs centred on nature worship and veneration of local kami. Rituals focused on sacred natural sites; no formal shrines or priesthood.",
      denomination: "Koshintō",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/shinto-1",
      aiProfile: "Nature-oriented guide and counsellor offering wisdom through deep reverence for kami (spirits of nature). Preserves harmony between people, nature, and community.",
      trainingData: "Kojiki (712, compiled by Ō no Yasumaro); Nihon Shoki (720), and oral traditions recorded therein.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore kami veneration, nature worship, sacred sites, and living in harmony with spirits of nature.",
      whatToExpected: "Deep wisdom on animistic traditions and the spiritual essence of natural places."
    },
    {
      id: "haruto-takamori",
      name: "Haruto Takamori",
      role: "Counsellor",
      image: harutoTakamoriImage,
      description: "The institutional form of Shinto organized around public shrines and rituals performed by priests for local kami.",
      denomination: "Shrine Shinto",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/shinto-2",
      aiProfile: "Shrine-based counsellor and guide. Teaches the importance of matsuri (festivals), shrine etiquette, and priestly leadership in upholding harmony between kami, community, and tradition.",
      trainingData: "Engishiki (927), shrine registers; Yoshida Shinto texts.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about shrine rituals, matsuri festivals, proper etiquette, and the role of priests in Shinto.",
      whatToExpected: "Practical guidance on shrine worship, community ceremonies, and maintaining sacred traditions."
    },
    {
      id: "ayaka-hoshino",
      name: "Ayaka Hoshino",
      role: "Faith Leader",
      image: ayakaHoshinoImage,
      description: "Shinto-derived new religious movements (e.g., Tenrikyō, Konkōkyō, Ōmoto) with distinct founders, doctrines, and practices centered on prayer, faith healing, and ritual.",
      denomination: "Sect Shinto",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/shinto-3",
      aiProfile: "A supportive counsellor who embodies the spiritual warmth and optimism of Shinto-derived sects. Guides others through the founders' teachings and demonstrates how prayer, faith healing, and ritual can restore harmony.",
      trainingData: "Ofudesaki (Tenrikyō); Konkō Daijin Oboegaki (Konkōkyō); Ōmoto Shūshin (Ōmoto).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore new religious movements, faith healing practices, founder's teachings, and modern Shinto spirituality.",
      whatToExpected: "Supportive guidance on prayer, healing, and applying Shinto principles to contemporary life."
    },
    {
      id: "kenta-moriyama",
      name: "Kenta Moriyama",
      role: "Counsellor",
      image: kentaMoriyamaImage,
      description: "Centered on village life, family, and household altars. No single doctrine or organization.",
      denomination: "Folk Shinto",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/shinto-4",
      aiProfile: "A community-rooted counsellor who embodies the everyday, familial spirit of Shinto. He supports others by emphasizing ancestral respect, seasonal traditions, and local kami worship in family and community life.",
      trainingData: "Shinto traditions, household altar practices, seasonal festivals, and community rituals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about ancestral respect, household altars (kamidana), seasonal traditions, local kami worship, community harmony, and everyday spiritual practice.",
      whatToExpected: "Warm, practical guidance on establishing household spiritual practices, honoring family traditions, and integrating Shinto values into daily community life."
    },
    {
      id: "emperor-meiji",
      name: "Emperor Meiji",
      role: "Faith Leader",
      image: emperorMeijiImage,
      description: "Ceremonies performed by the Emperor—spiritual head of the nation—for the well-being of the country.",
      denomination: "Imperial Shinto",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/shinto-5",
      aiProfile: "Emperor Meiji modernized the imperial institution, reasserted the emperor's sacred role, and formalized State Shinto rites. He guides on national identity, civic duty, and the sacred relationship between the Emperor and the people.",
      trainingData: "Kojiki; Nihon Shoki; official imperial ritual manuals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore imperial ceremonies, national harmony, civic duty, sacred leadership, State Shinto rites, and the spiritual role of the Emperor in Japanese tradition.",
      whatToExpected: "Regal, authoritative guidance on national identity, centralized rituals, modernization of spiritual institutions, and the sacred duties of leadership and citizenship."
    }
  ]
};

// Agent Slider Component
interface AgentSliderProps {
  agents: any[];
  faithColor: string;
  faithColorHover: string;
  canAccessPremium: boolean;
  handleLaunchAgent: (agent: any) => void;
  handleSaveGuide: (agent: any) => void;
  handleOpenOverlay: (url: string, name: string) => void;
}

function AgentSlider({ agents, faithColor, faithColorHover, canAccessPremium, handleLaunchAgent, handleSaveGuide, handleOpenOverlay }: AgentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Create extended array for infinite loop effect
  const extendedAgents = [...agents, ...agents, ...agents];
  const offset = agents.length; // Start at the middle set

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Reset position when reaching clones (for infinite effect)
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // If we're at the end clone, jump to the real start
    if (currentIndex >= agents.length) {
      setCurrentIndex(currentIndex - agents.length);
    }
    // If we're at the beginning clone, jump to the real end
    else if (currentIndex < 0) {
      setCurrentIndex(currentIndex + agents.length);
    }
  };

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      goToNext();
    } else if (distance < -threshold) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Render agent card with vertical layout
  const renderAgentCard = (agent: any, index: number) => {
    return (
      <div key={index} className="min-w-full px-3 sm:px-4">
        <Card className="bg-white/70 backdrop-blur-xl border-[#EA7F6A]/30 border-2 hover:border-[#EA7F6A]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(234,127,106,0.12)] hover:shadow-[0_20px_50px_rgba(234,127,106,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EA7F6A]/10 via-transparent to-[#EA7F6A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-white/20 group-hover:ring-white/40 shadow-[0_10px_40px_rgba(255,255,255,0.15)] group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Torii Gate */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(234,127,106,0.3)] backdrop-blur-md border border-[#EA7F6A]/40 overflow-hidden"
                style={{ backgroundColor: `rgba(234, 127, 106, 0.25)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={toriiGateImage} 
                  alt="Torii Gate"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-white transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors duration-300 shadow-sm">
                  {agent.role}
                </Badge>
                <Badge variant="outline" className="bg-white/20 border-white/40 text-gray-100 shadow-sm text-xs">
                  {agent.denomination}
                </Badge>
                {agent.isPremium && (
                  <Badge className="bg-gradient-to-r from-[#FFD369] to-[#FFA726] text-gray-900 border-0 shadow-md">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed text-[14px] text-center px-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                {agent.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleOpenOverlay(agent.chatUrl, agent.name)}
                disabled={agent.isPremium && !canAccessPremium}
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 active:scale-[0.97] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: faithColor,
                  boxShadow: `0 4px 20px rgba(255, 255, 255, 0.25)`
                }}
                onMouseEnter={(e) => {
                  if (!agent.isPremium || canAccessPremium) {
                    e.currentTarget.style.backgroundColor = faithColorHover;
                    e.currentTarget.style.boxShadow = `0 8px 35px rgba(255, 255, 255, 0.4)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = faithColor;
                  e.currentTarget.style.boxShadow = `0 4px 20px rgba(255, 255, 255, 0.25)`;
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-[#0B1426]" />
                    <span className="relative text-[#0B1426] font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Premium Only</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="relative w-5 h-5 text-[#0B1426]" />
                    <span className="relative text-[#0B1426] font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#162844]/30 hover:bg-[#162844]/40 border-2 border-white/50 hover:border-white/80 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.25)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-white group-hover/save:text-white transition-colors duration-300" />
                <span className="relative text-white group-hover/save:text-white font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Calculate the actual index in the original agents array for the indicator
  const actualIndex = ((currentIndex % agents.length) + agents.length) % agents.length;

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-[#162844]/80 hover:bg-[#162844] border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            style={{ borderColor: `rgba(255, 255, 255, 0.2)` }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-[#162844]/80 hover:bg-[#162844] border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            style={{ borderColor: `rgba(255, 255, 255, 0.2)` }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${(currentIndex + offset) * 100}%)`,
            transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedAgents.map((agent, index) => renderAgentCard(agent, index))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {agents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: actualIndex === index ? '32px' : '8px',
              height: '8px',
              backgroundColor: actualIndex === index ? faithColor : `${faithColor}40`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface ShintoFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function ShintoFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: ShintoFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = shintoConfig.agents[selectedAgentIndex];

  const handleOpenOverlay = (url: string, name: string) => {
    setOverlayUrl(url);
    setOverlayAgentName(name);
    setIsIframeLoading(true);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setTimeout(() => {
      setIsIframeLoading(true);
      setOverlayUrl('');
    }, 200);
  };

  const handleSaveGuide = (agent: any) => {
    saveGuide({
      guideName: agent.name,
      tradition: shintoConfig.name,
      faithColor: shintoConfig.primaryColor,
      avatar: agent.image || shintoConfig.symbol,
      specialty: agent.role,
      description: agent.description,
      chatUrl: agent.chatUrl,
    });
  };

  const handleLaunchAgent = (agent: any) => {
    if (agent.isPremium && !canAccessPremium) {
      toast.error("This agent requires a premium subscription");
      return;
    }
    
    // Award badge for first agent interaction
    awardBadge({
      id: 'first-shinto-guide-interaction',
      name: 'First Shinto Guide Launched',
      description: 'Launched your first Shinto spiritual guide',
      icon: Play,
      category: 'journey',
      rarity: 'common',
      tokenReward: 50
    });
    
    // If agent has a specific chat URL, open it in a new tab
    if (agent.chatUrl) {
      toast.success(`Opening ${agent.name} for a spiritual conversation...`);
      window.open(agent.chatUrl, '_blank');
    } else {
      // Fall back to existing chat system
      toast.success(`Launching ${agent.name} for a spiritual conversation...`);
      onStartChat(agent);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundVideo 
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Shinto-loop.mp4"
          posterSrc={heroImage}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative px-6 pt-8 pb-12 overflow-hidden">
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#EA7F6A]/30 hover:border-[#D86F5A]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(234,127,106,0.15)] hover:shadow-[0_6px_25px_rgba(216,111,90,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFEAE5]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#D86F5A] group-hover:text-[#EA7F6A] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#D86F5A] group-hover:text-[#EA7F6A] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(122,79,255,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.12)]" />
            </motion.div>

            {/* Enhanced Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center">
                {/* Torii Gate - Above Title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.7, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative group">
                    {/* Subtle glowing background effect */}
                    <div className="absolute inset-0 bg-[#EA7F6A]/15 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                    
                    {/* Torii Gate container */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#EA7F6A] to-[#D86F5A] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                      <img 
                        src={toriiGateImage} 
                        alt="Torii Gate"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter brightness-0 invert"
                      />
                      
                      {/* Subtle animated ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#EA7F6A]/20 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                <h1 className="font-bold sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#EA7F6A] via-[#D86F5A] to-[#EA7F6A] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(234,127,106,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {shintoConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#EA7F6A] to-[#D86F5A] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(234,127,106,0.4)]" />
                <p className="text-[rgb(255,255,255)] max-w-2xl mx-auto leading-relaxed sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] text-[16px]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {shintoConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Torii Gate Symbol Section */}
        <section className="px-6 mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, type: "spring", bounce: 0.3 }}
            className="max-w-md mx-auto flex justify-center"
          >
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-[#E64A19]/30 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
              
            </div>
          </motion.div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative -mt-4">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
            {/* Torii Gate Background Layer - Smaller */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 pointer-events-none z-0"
            >
              <div className="relative group">
                {/* Subtle glowing background effect */}
                <div className="absolute inset-0 bg-[#E64A19]/15 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                
                {/* Symbol container - smaller size */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img 
                    src={toriiGateImage} 
                    alt="Torii Gate"
                    className="w-full h-full object-contain opacity-25 filter brightness-110 saturate-50 blur-[0.5px] drop-shadow-[0_0_20px_rgba(230,74,25,0.2)] transition-all duration-700"
                  />
                  
                  {/* Subtle animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#E64A19]/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Heading Layer - Enhanced with strong drop shadow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12 relative z-10"
            >
            </motion.div>

            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={shintoConfig.agents}
                faithColor="#EA7F6A"
                faithColorHover="#D86F5A"
                canAccessPremium={canAccessPremium}
                handleLaunchAgent={handleLaunchAgent}
                handleSaveGuide={handleSaveGuide}
                handleOpenOverlay={handleOpenOverlay}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Agent Interaction Guide */}
        <section className="px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#EA7F6A]/30 border-2 hover:border-[#EA7F6A]/60 transition-all duration-500 shadow-[0_8px_30px_rgba(234,127,106,0.12)] p-8 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EA7F6A]/10 via-transparent to-[#EA7F6A]/5 opacity-80" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-[#EA7F6A] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-white to-slate-300" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-slate-300 to-slate-400" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-slate-400 to-white" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#EA7F6A]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#EA7F6A]/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EA7F6A] to-[#D86F5A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-gray-900 group-hover:text-[#EA7F6A] transition-colors duration-300">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-gray-700 leading-relaxed">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Explore Topics Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-[#EA7F6A] mx-auto rounded-full mb-6" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the sacred traditions and practices of Shinto through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shintoConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#EA7F6A]/30 border-2 hover:border-[#EA7F6A]/60 transition-all duration-500 cursor-pointer group shadow-[0_8px_30px_rgba(234,127,106,0.12)] h-full p-6 rounded-3xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EA7F6A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EA7F6A] to-[#D86F5A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#EA7F6A] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
                        {topic.topic}
                      </h3>
                      
                      <AnimatePresence>
                        {selectedTopic === topic.topic && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-[#EA7F6A]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer">
                                  • {question}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section - Your Spiritual Journey */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/60 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] rounded-3xl overflow-hidden relative">
                {/* Torii Sunset Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={toriiSunsetImage} 
                    alt="Torii Gate at Sunset"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.48)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#FFD369]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#C62828] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#E64A19]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#D84315]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#FFD369]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-4 sm:p-5 lg:p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 group shadow-sm hover:shadow-md touch-manipulation"
                      >
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color} mx-auto mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300`} />
                        <div className="text-xl sm:text-2xl text-gray-900 font-medium mb-1">{stat.value}</div>
                        <div className="text-[13px] sm:text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Latest Achievement - Contemporary design */}
                  {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/40 border-2 border-white/50 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#E64A19] to-[#FFD369] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#E64A19] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/50 border-2 border-white/40 rounded-xl p-6 mb-8 backdrop-blur-sm"
                    >
                      <div className="text-gray-700 text-center leading-relaxed">
                        Begin your spiritual journey by exploring different faith traditions
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons - Mobile optimized */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <button 
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E64A19] via-[#FF5722] to-[#FF6F43] hover:from-[#D84315] hover:via-[#E64A19] hover:to-[#FF5722] border-2 border-[#E64A19]/30 hover:border-[#E64A19]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(230,74,25,0.25)] hover:shadow-[0_8px_35px_rgba(216,67,21,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#D84315]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#E64A19]/30 hover:border-[#E64A19]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(230,74,25,0.15)] hover:shadow-[0_6px_25px_rgba(230,74,25,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#C62828] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Faith Groups Section for Shinto */}
        <ShintoFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#E64A19]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E64A19] animate-pulse shadow-lg shadow-[#E64A19]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#E64A19]/30 hover:border-[#E64A19] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#E64A19]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#E64A19]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#E64A19] border-t-transparent animate-spin"></div>
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
    </div>
  );
}