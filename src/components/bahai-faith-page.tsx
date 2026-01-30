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
import { BahaiFaithGroups } from "./bahai-faith-groups";
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
import heroImage from 'figma:asset/8e34072a6ce6716f24f3ed2de131cd4dd0d19a41.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import ninePointedStarImage from 'figma:asset/a13a3708168a7e3e76185b69927e1442dff12a8c.png';
import bahaiJourneyImage from 'figma:asset/47f957e6e9db62149b254f00dd86afa54b81c470.png';
import leilaFarzanImage from 'figma:asset/6af6457672e5e89ce643e60a8e48a95c34e32b62.png';
import navidRahmaniImage from 'figma:asset/bd2eec02873abf0d2e92919b3edeab64d57f9095.png';
import faridAnvariImage from 'figma:asset/0937e2ecb36cdb4cca0c4ea8c995fedf82e5632c.png';
import amatulHaqqRahmanImage from 'figma:asset/60430578e633e40c95f7a1a90464a21789f479e0.png';
import hadiRahmaniImage from 'figma:asset/bda0bf8e6babff26df036424a6353589d91205ec.png';

// Bahá'í Faith-specific configuration with enhanced styling
const bahaiConfig = {
  name: "Bahá'í Faith",
  subtitle: "Embrace the oneness of humanity.",
  symbol: "✨",
  description: "Explore Bahá'í wisdom through AI guides inspired by community leaders, counselors, and spiritual teachers from diverse Bahá'í traditions.",
  heroImage: heroImage,
  primaryColor: "#9370B0", // Muted violet purple from wheel of faith
  lightColor: "rgba(147, 112, 176, 0.2)",
  hoverColor: "#7d5c9a",
  suggestedTopics: [
    "Unity of Humanity", "Progressive Revelation", "Spiritual Development", "World Peace", 
    "Justice & Equality", "Devotional Life", "Community Building", "Service to Humanity"
  ],
  topicsWithQuestions: [
    {
      topic: "Unity of Humanity",
      icon: Users,
      questions: [
        "What is the principle of oneness?",
        "How do we build unity in diversity?",
        "What is the purpose of human existence?",
        "How can we overcome prejudice and division?"
      ]
    },
    {
      topic: "Progressive Revelation",
      icon: Sparkles,
      questions: [
        "What is progressive revelation?",
        "How are all religions connected?",
        "What is the role of Manifestations of God?",
        "How does revelation unfold through history?"
      ]
    },
    {
      topic: "Spiritual Development",
      icon: Heart,
      questions: [
        "How do I cultivate spiritual qualities?",
        "What is the nature of the soul?",
        "How do I practice daily prayer?",
        "What is the path of spiritual growth?"
      ]
    },
    {
      topic: "World Peace",
      icon: Shield,
      questions: [
        "How can we achieve world peace?",
        "What is collective security?",
        "What role does unity play in peace?",
        "How do we build a peaceful civilization?"
      ]
    },
    {
      topic: "Justice & Equality",
      icon: Star,
      questions: [
        "What is Bahá'í vision of justice?",
        "How do we promote equality of men and women?",
        "What is the elimination of extremes of wealth?",
        "How do we build a just society?"
      ]
    },
    {
      topic: "Devotional Life",
      icon: Flower2,
      questions: [
        "What are Bahá'í devotional practices?",
        "How do I deepen my prayer life?",
        "What is the purpose of the Nineteen Day Feast?",
        "How do we connect with the divine?"
      ]
    },
    {
      topic: "Community Building",
      icon: Users,
      questions: [
        "What is the Bahá'í community structure?",
        "How do we serve our communities?",
        "What is the role of consultation?",
        "How do we create vibrant communities?"
      ]
    },
    {
      topic: "Service to Humanity",
      icon: Heart,
      questions: [
        "What is the importance of service?",
        "How do we contribute to society?",
        "What is social and economic development?",
        "How do we work for the betterment of the world?"
      ]
    }
  ],
  agents: [
    {
      id: "leila-farzan",
      name: "Dr. Leila Farzan",
      role: "Community Leader",
      image: leilaFarzanImage,
      description: "A liberal movement that emphasizes broader individual interpretation, inclusivity, and adapting Bahá'í teachings to contemporary contexts.",
      denomination: "Reform Bahá'í Faith",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/baha-1",
      aiProfile: "Respected member and organizer in a Reform Bahá'í context, offering inclusive, dialogic guidance to seekers and community groups.",
      trainingData: "Writings of the Báb; Bahá'u'lláh; 'Abdu'l-Bahá; Shoghi Effendi, with an emphasis on contemporary interpretation and application.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore inclusive interpretations, contemporary applications, unity in diversity, social justice, and progressive Bahá'í perspectives.",
      whatToExpected: "Progressive wisdom emphasizing inclusivity, dialogue, and adapting Bahá'í principles to modern contexts."
    },
    {
      id: "navid-rahmani",
      name: "Navid Rahmani",
      role: "Counsellor",
      image: navidRahmaniImage,
      description: "Not a sect; this focuses on the authoritative interpretations and guidance provided by Shoghi Effendi, regarded as a definitive exposition of Bahá'í texts.",
      denomination: "Writings of Shoghi Effendi",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/baha-2",
      aiProfile: "Seasoned Bahá'í counsellor blending scholarly precision with pastoral care; helps individuals and institutions apply Shoghi Effendi's guidance.",
      trainingData: "God Passes By; The World Order of Bahá'u'lláh; The Advent of Divine Justice; selected letters and messages.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study the World Order of Bahá'u'lláh, administrative principles, divine civilization, and Shoghi Effendi's interpretations.",
      whatToExpected: "Scholarly guidance on institutional development, divine civilization, and the unfolding of Bahá'u'lláh's world order."
    },
    {
      id: "farid-anvari",
      name: "Farid Anvari",
      role: "Counsellor",
      image: faridAnvariImage,
      description: "Not a sect; focuses on the authoritative writings and interpretations of 'Abdu'l-Bahá (Center of the Covenant, 1892–1921), elucidating Bahá'u'lláh's teachings.",
      denomination: "Writings of 'Abdu'l-Bahá",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/baha-4",
      aiProfile: "Veteran community member serving as a spiritual counsellor; supports Local Spiritual Assemblies, youth, and families with practical, compassionate guidance.",
      trainingData: "Some Answered Questions; Tablets of the Divine Plan; The Secret of Divine Civilization; selected talks and tablets.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about spiritual principles, divine civilization, community development, and 'Abdu'l-Bahá's practical teachings.",
      whatToExpected: "Compassionate wisdom on practical application of Bahá'í teachings, community service, and spiritual education."
    },
    {
      id: "amatul-haqq-rahman",
      name: "Amatu'l-Haqq Rahman",
      role: "Counsellor",
      image: amatulHaqqRahmanImage,
      description: "A group founded by Dr. Leland Jensen that advances specific prophetic interpretations and a view of continued Guardianship distinct from the mainstream Bahá'í administration.",
      denomination: "Provisions of the Covenant (BUPC)",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/baha-3",
      aiProfile: "Community counsellor within the BUPC milieu, offering guidance aligned with that movement's teachings and priorities.",
      trainingData: "Writings of the Báb; Bahá'u'lláh; 'Abdu'l-Bahá; Shoghi Effendi; and interpretations/writings associated with Dr. Leland Jensen.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore specific prophetic interpretations, continued Guardianship view, BUPC administrative orthodoxy, and Dr. Leland Jensen's teachings.",
      whatToExpected: "Rigorous theological guidance on prophetic texts, administrative structure, and the BUPC perspective on Bahá'í covenant continuity."
    },
    {
      id: "hadi-rahmani",
      name: "Hadi Rahmani",
      role: "Community Elder",
      image: hadiRahmaniImage,
      description: "A group asserting continuity of the Guardianship after Shoghi Effendi and not recognizing the authority of the mainstream Universal House of Justice.",
      denomination: "Orthodox Bahá'í",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/baha-5",
      aiProfile: "Respected elder and teacher in an Orthodox Bahá'í context; provides mentorship, study support, and community counsel.",
      trainingData: "Writings of the Báb; Bahá'u'lláh; 'Abdu'l-Bahá; Shoghi Effendi; related interpretations (e.g., Marangella).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore continuity of Guardianship, study of authorized interpretations (e.g., Marangella), Orthodox Bahá'í administration, and mentorship counsel.",
      whatToExpected: "Elder wisdom on continuity of the Guardianship, deep textual study, and adherence to the Orthodox Bahá'í administrative view."
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
        <Card className="bg-white/70 backdrop-blur-xl border-[#9370B0]/30 border-2 hover:border-[#7d5c9a]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(147,112,176,0.12)] hover:shadow-[0_20px_50px_rgba(125,92,154,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/10 via-transparent to-[#9370B0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#9370B0]/20 group-hover:ring-[#7d5c9a]/40 shadow-[0_10px_40px_rgba(147,112,176,0.15)] group-hover:shadow-[0_20px_60px_rgba(125,92,154,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Nine-Pointed Star */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(147,112,176,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#9370B025` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={ninePointedStarImage} 
                  alt="Nine-Pointed Star"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#9370B0] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#9370B0]/15 hover:bg-[#9370B0]/25 text-[#9370B0] border border-[#9370B0]/30 transition-colors duration-300 shadow-sm">
                  {agent.role}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/60 text-gray-700 shadow-sm text-xs">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] hover:from-[#7d5c9a] hover:to-[#9370B0] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(147,112,176,0.25)] hover:shadow-[0_8px_35px_rgba(125,92,154,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7d5c9a]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium">Premium Only</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#9370B0]/30 hover:border-[#7d5c9a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(147,112,176,0.1)] hover:shadow-[0_4px_20px_rgba(125,92,154,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#9370B0] group-hover/save:text-[#7d5c9a] transition-colors duration-300" />
                <span className="relative text-[#9370B0] group-hover/save:text-[#7d5c9a] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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
            style={{ borderColor: `${faithColor}30` }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-md bg-[#162844]/80 hover:bg-[#162844] border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            style={{ borderColor: `${faithColor}30` }}
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

interface BahaiFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function BahaiFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: BahaiFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = bahaiConfig.agents[selectedAgentIndex];

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
      tradition: bahaiConfig.name,
      faithColor: bahaiConfig.primaryColor,
      avatar: agent.image || bahaiConfig.symbol,
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
      id: 'first-bahai-guide-interaction',
      name: 'First Bahá\'í Guide Launched',
      description: 'Launched your first Bahá\'í spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Bahai-faith-loop.mp4"
          posterSrc={heroImage}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative px-6 pt-[32px] pb-[10px] overflow-hidden pr-[24px] pl-[24px]">
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#9370B0]/30 hover:border-[#7d5c9a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(147,112,176,0.15)] hover:shadow-[0_6px_25px_rgba(125,92,154,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#9370B0] group-hover:text-[#7d5c9a] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#9370B0] group-hover:text-[#7d5c9a] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(147,112,176,0.12)]"
              style={{
                minHeight: '400px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.15)]" />
            </motion.div>

            {/* Enhanced Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Nine-Pointed Star Symbol - Repositioned above title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, type: "spring", bounce: 0.3 }}
                  className="flex justify-center mb-3 sm:mb-4"
                >
                  <div className="relative group">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#9370B0]/30 blur-2xl sm:blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                    
                    {/* Symbol container - Smaller on mobile */}
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                      <img 
                        src={ninePointedStarImage} 
                        alt="Nine-Pointed Star"
                        className="w-full h-full object-contain opacity-60 sm:opacity-70 filter brightness-110 saturate-75 blur-[0.5px] drop-shadow-[0_0_20px_rgba(147,112,176,0.4)] sm:drop-shadow-[0_0_25px_rgba(147,112,176,0.5)] group-hover:opacity-80 transition-all duration-700"
                      />
                      
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#9370B0]/25 rounded-full"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.2, 0.35, 0.2],
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

                <h1 className="text-[32px] sm:text-[40px] lg:text-[56px] mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-[#9370B0] via-[#7d5c9a] to-[#9370B0] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(147,112,176,0.3)]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {bahaiConfig.name}
                </h1>
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[14px] sm:text-[15px] lg:text-[17px] px-4 sm:px-6 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {bahaiConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section - Moved up to reduce dead space */}
        <section className="px-6 mb-20 relative mt-4 sm:-mt-12">
          <div className="max-w-6xl mx-auto relative">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={bahaiConfig.agents}
                faithColor="#9370B0"
                faithColorHover="#7d5c9a"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#9370B0]/30 border-2 hover:border-[#7d5c9a]/50 transition-all duration-500 p-8 shadow-[0_8px_30px_rgba(147,112,176,0.12)] hover:shadow-[0_20px_50px_rgba(125,92,154,0.25)] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9370B0]/5 to-transparent opacity-80" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#9370B0] to-[#7d5c9a]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#7d5c9a] to-[#9370B0]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#9370B0] to-[#7d5c9a]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#9370B0]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#7d5c9a]/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#9370B0] group-hover:text-[#7d5c9a] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-gray-900 via-[#9370B0] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif", filter: 'drop-shadow(0 2px 6px rgba(255, 255, 255, 0.9))' }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] mx-auto rounded-full shadow-[0_0_10px_rgba(147,112,176,0.6)]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bahaiConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#9370B0]/30 border-2 hover:border-[#7d5c9a]/60 transition-all duration-500 cursor-pointer group h-full p-6 shadow-[0_8px_30px_rgba(147,112,176,0.12)] hover:shadow-[0_20px_50px_rgba(125,92,154,0.25)] rounded-2xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9370B0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#9370B0] to-[#7d5c9a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#9370B0] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#9370B0]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-600 hover:text-[#9370B0] transition-colors duration-200 cursor-pointer">
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

        {/* Enhanced Stats Section - Your Spiritual Journey - Contemporary mobile-optimized */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/60 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] rounded-3xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-40">
                  <img 
                    src={bahaiJourneyImage} 
                    alt="" 
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/10 to-transparent rounded-3xl" />
                {/* Light gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80" />
                
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#9370B0]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#5B4636] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#9370B0]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#9370B0]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#7d5c9a]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#9370B0]" }
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
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#9370B0] to-[#7d5c9a] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#7d5c9a] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9370B0] via-[#8062a3] to-[#9370B0] hover:from-[#7d5c9a] hover:via-[#9370B0] hover:to-[#8062a3] border-2 border-[#7d5c9a]/30 hover:border-[#7d5c9a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(147,112,176,0.25)] hover:shadow-[0_8px_35px_rgba(125,92,154,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#7d5c9a]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#7d5c9a]/30 hover:border-[#9370B0]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(125,92,154,0.15)] hover:shadow-[0_6px_25px_rgba(147,112,176,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9370B0]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#5B4636] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Faith Groups Section for Bahá'í Faith */}
        <BahaiFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#9370B0]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#9370B0] animate-pulse shadow-lg shadow-[#9370B0]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#9370B0]/30 hover:border-[#9370B0] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#9370B0]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#9370B0]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#9370B0] border-t-transparent animate-spin"></div>
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