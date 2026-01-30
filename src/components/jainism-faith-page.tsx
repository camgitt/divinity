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
import { JainismFaithGroups } from "./jainism-faith-groups";
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
import heroImage from 'figma:asset/93a55c9837cd3d37439da278c2db152cb7774df3.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import ahimsaHandImage from 'figma:asset/7dc002689f83346c020bf1c6c800b3f09778f4cf.png';
import sadhviPratibhaImage from 'figma:asset/e70642aa48ddb261380d521db3963b94c6d21729.png';
import acharyaSatyaprabhaImage from 'figma:asset/8a1e2f91f2e4f57ad57f3a601d84930991f34b6b.png';
import acharyaPratibhaImage from 'figma:asset/230dadfa6e537a6b9af91d016e10d9d064c3bf05.png';
import acharyaAnandImage from 'figma:asset/dc4c58ad8945d1c31ceb963a763b1363494d40d6.png';
import aanyaMehtaImage from 'figma:asset/dc1aa5c2bc90c37dda1047d1d01488e43ba745f4.png';
import monkMeditationImage from 'figma:asset/0ec1d9c33dd7f7b2047d9efe8ad1802159b46faf.png';

// Jainism-specific configuration with enhanced styling
const jainismConfig = {
  name: "Jainism",
  subtitle: "Practice ahimsa and walk the path of non-violence.",
  symbol: "🖐️",
  description: "Explore Jain wisdom through AI guides inspired by historical and contemporary Jain acharyas, sadhvis, and spiritual practitioners.",
  heroImage: heroImage,
  primaryColor: "#B8858F", // Muted dusty maroon for non-violence & soul purity
  lightColor: "rgba(184, 133, 143, 0.2)",
  hoverColor: "#A6737D",
  suggestedTopics: [
    "Ahimsa (Non-violence)", "Anekantavada (Multiple Perspectives)", "Aparigraha (Non-attachment)", "Karma Theory", 
    "Meditation & Contemplation", "Ascetic Practices", "Spiritual Liberation", "Jain Ethics"
  ],
  topicsWithQuestions: [
    {
      topic: "Ahimsa (Non-violence)",
      icon: Heart,
      questions: [
        "What is ahimsa in Jainism?",
        "How do I practice non-violence in daily life?",
        "What is the connection between ahimsa and karma?",
        "How does ahimsa extend to thoughts and words?"
      ]
    },
    {
      topic: "Anekantavada (Multiple Perspectives)",
      icon: Sparkles,
      questions: [
        "What is anekantavada?",
        "How can truth have multiple perspectives?",
        "What is syadvada (conditional predication)?",
        "How does this philosophy promote tolerance?"
      ]
    },
    {
      topic: "Aparigraha (Non-attachment)",
      icon: Shield,
      questions: [
        "What does non-attachment mean in Jainism?",
        "How do I practice aparigraha?",
        "What is the relationship to material possessions?",
        "How does non-attachment lead to liberation?"
      ]
    },
    {
      topic: "Karma Theory",
      icon: Book,
      questions: [
        "How does Jain karma theory work?",
        "What are the types of karma?",
        "How can karma be shed?",
        "What is the goal of karmic purification?"
      ]
    },
    {
      topic: "Meditation & Contemplation",
      icon: Flower2,
      questions: [
        "What meditation practices exist in Jainism?",
        "How do I practice samayika?",
        "What is pratikramana (introspection)?",
        "How does meditation purify the soul?"
      ]
    },
    {
      topic: "Ascetic Practices",
      icon: Star,
      questions: [
        "What is the role of asceticism in Jainism?",
        "What are the five great vows?",
        "How do monks and nuns live?",
        "What is the significance of fasting?"
      ]
    },
    {
      topic: "Spiritual Liberation",
      icon: Sparkles,
      questions: [
        "What is moksha in Jainism?",
        "How does one achieve liberation?",
        "What is the nature of the liberated soul?",
        "What are the stages of spiritual development?"
      ]
    },
    {
      topic: "Jain Ethics",
      icon: Users,
      questions: [
        "What are the main Jain ethical principles?",
        "How do lay followers practice Jainism?",
        "What dietary practices are followed?",
        "How does Jain ethics guide business and life?"
      ]
    }
  ],
  agents: [
    {
      id: "acharya-satyaprabha",
      name: "Ācārya Satyaprabha",
      role: "Monk Figure / Cultural Figure",
      image: acharyaSatyaprabhaImage,
      description: "\"Sky-clad\" monks renounce all possessions, including clothing. Emphasizes strict asceticism and non-attachment.",
      denomination: "Digambara",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/jain-4",
      aiProfile: "Ācārya Satyaprabha is an ascetic counsellor and a highly respected teacher within his saṅgha. He is sought out for his unwavering commitment to the principles of Digambara Jainism, offering guidance to both monks and lay followers on the path to liberation.",
      trainingData: "Āgamas; Ṣaṭkhaṇḍāgama.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore strict asceticism, the five great vows, soul purification, non-attachment, and the Digambara path to liberation.",
      whatToExpected: "Deep wisdom on renunciation and the rigorous path of self-discipline leading to spiritual freedom."
    },
    {
      id: "sadhvi-pratibha",
      name: "Sādhvī Pratibha",
      role: "Monk Figure / Cultural Figure",
      image: sadhviPratibhaImage,
      description: "\"White-clad\"; monks and nuns wear simple white clothing. Allows both men and women to attain liberation. Dominant in western and northern India.",
      denomination: "Śvetāmbara",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/jain-3",
      aiProfile: "\"White-clad\" is a compassionate and wise spiritual counsellor within a Jain organization. Her character is defined by a deep commitment to the core tenets of Jainism, which she embodies through her personal conduct and her guidance to others.",
      trainingData: "Āgamas (preserved); Kalpa Sūtra; commentaries by Ācārya Hemacandra.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Śvetāmbara traditions, balanced asceticism, women's spiritual equality, and compassionate practice.",
      whatToExpected: "Compassionate guidance on living Jain principles with wisdom, balance, and dedication to ahimsa."
    },
    {
      id: "acharya-pratibha",
      name: "Ācārya Pratibha",
      role: "Monk Figure / Cultural Figure",
      image: acharyaPratibhaImage,
      description: "Reformist subsect of Śvetāmbara; rejects temple worship and idols, emphasizing meditation, study, ethical purity, and simplicity.",
      denomination: "Terāpanth",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/jain-2",
      aiProfile: "He was raised in a family of textile merchants in Surat, a city known for its Jain business acumen.",
      trainingData: "Terāpanth canonical texts explicitly reject any parts endorsing idol worship or related rituals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study meditation practices, non-idolatrous worship, ethical business, and the reformist approach to Jainism.",
      whatToExpected: "Practical wisdom on integrating Jain ethics into modern life with simplicity and inner devotion."
    },
    {
      id: "acharya-anand",
      name: "Ācārya Ānand",
      role: "Monk Figure / Cultural Figure",
      image: acharyaAnandImage,
      description: "Highly organized offshoot of Sthānakavāsī; strictly non-idolatrous, centralized leadership under a single Ācārya. Emphasis on discipline and scriptural study.",
      denomination: "Terāpanth",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/jain-1",
      aiProfile: "A senior disciple or Ācārya within the Terāpanth order. He serves as a compassionate guide and teacher, offering counsel to lay practitioners and seekers.",
      trainingData: "Śvetāmbara canonical texts with emphasis on centralized Terāpanth teachings and the writings of Ācārya Bhikṣu (founder).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore strict non-idolatry, centralized spiritual authority, rigorous discipline, scriptural study, inner purity, and ethical conduct under the Terāpanth path.",
      whatToExpected: "Disciplined guidance on following the centralized Terāpanth path with emphasis on purity, study, and adherence to the single Ācārya's authority."
    },
    {
      id: "aanya-mehta",
      name: "Aanya Mehta",
      role: "Guide / Companion",
      image: aanyaMehtaImage,
      description: "A 21-year-old Gujarati Jain woman and digital companion who helps people navigate Jain values in modern life. Not a nun or scholar, but a relatable peer figuring out how to practice ahimsa and Jain principles while living in the contemporary world.",
      denomination: "Jainism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/jainism-6",
      aiProfile: "Warm and relatable young guide offering guidance through Jainism and contemporary practice. Brings together ahimsa (non-violence), five anuvratas, modern Jain life, anekantavada (multiple perspectives), dietary guidance, practical practice, and community connection with non-judgmental compassionate honest care for seekers at beginner and intermediate levels.",
      trainingData: "Jain scriptures and Āgamas; Five Anuvratas (lesser vows for laypeople); Namokar Mantra; Pratikraman rituals; Samayika meditation; Paryushana traditions; Anekantavada philosophy; Gujarati Jain community practices; Vegetarian and lacto-vegetarian dietary guidelines; Temple community structures; YJP/YJA (Young Jains of America/Professionals) resources; Contemporary Jain practice; Modern ahimsa applications; Forgiveness practices; Compassionate accountability frameworks; Harm reduction approaches; Digital dharma for young Jains.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore ahimsa (non-violence), five anuvratas, modern Jain life, anekantavada (multiple perspectives), dietary guidance, practical practice, community connection, forgiveness, compassionate accountability, harm reduction, contemporary spirituality, vegetarian lifestyle, Namokar Mantra, Pratikraman, Samayika, Paryushana, temple community, and YJP/YJA through warm relatable non-judgmental guidance.",
      whatToExpected: "Warm, relatable, and non-judgmental guidance rooted in Jainism and contemporary practice. Expect practical and honest support through ahimsa practice, five anuvratas, modern Jain life, dietary guidance, community connection, forgiveness, compassionate accountability, and harm reduction with the validating peer-like care of a young Gujarati Jain woman navigating traditional values in the contemporary world—a practical idealist and digital companion helping you figure out how to live Jain principles in real life."
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
        <Card className="bg-white/70 backdrop-blur-xl border-[#B8858F]/30 border-2 hover:border-[#A6737D]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(184,133,143,0.12)] hover:shadow-[0_20px_50px_rgba(166,115,125,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F0]/10 via-transparent to-[#B8858F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#B8858F]/20 group-hover:ring-[#A6737D]/40 shadow-[0_10px_40px_rgba(184,133,143,0.15)] group-hover:shadow-[0_20px_60px_rgba(166,115,125,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Ahimsa Hand */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(184,133,143,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#B8858F25` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={ahimsaHandImage} 
                  alt="Ahimsa Hand"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#B8858F] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#B8858F]/15 hover:bg-[#B8858F]/25 text-[#B8858F] border border-[#B8858F]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B8858F] to-[#A6737D] hover:from-[#A6737D] hover:to-[#B8858F] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(184,133,143,0.25)] hover:shadow-[0_8px_35px_rgba(166,115,125,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#A6737D]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Premium Only</span>
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
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#B8858F]/30 hover:border-[#A6737D]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(184,133,143,0.15)] hover:shadow-[0_6px_25px_rgba(166,115,125,0.25)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F0]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#B8858F] group-hover/save:text-[#A6737D] transition-colors duration-300" />
                <span className="relative text-[#B8858F] group-hover/save:text-[#A6737D] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 border-[#B8858F]/30 hover:border-[#A6737D]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(184,133,143,0.2)] hover:shadow-[0_8px_30px_rgba(166,115,125,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6 text-[#B8858F]" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 border-[#B8858F]/30 hover:border-[#A6737D]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(184,133,143,0.2)] hover:shadow-[0_8px_30px_rgba(166,115,125,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
          >
            <ChevronRight className="w-6 h-6 text-[#B8858F]" />
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

interface JainismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function JainismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: JainismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = jainismConfig.agents[selectedAgentIndex];

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
      setOverlayAgentName('');
    }, 200);
  };

  const handleSaveGuide = (agent: any) => {
    saveGuide({
      guideName: agent.name,
      tradition: jainismConfig.name,
      faithColor: jainismConfig.primaryColor,
      avatar: agent.image || jainismConfig.symbol,
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
      id: 'first-jainism-guide-interaction',
      name: 'First Jainism Guide Launched',
      description: 'Launched your first Jain spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Jainism-loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#B8858F]/30 hover:border-[#A6737D]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(184,133,143,0.15)] hover:shadow-[0_6px_25px_rgba(166,115,125,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F0]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#A6737D] group-hover:text-[#B8858F] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#A6737D] group-hover:text-[#B8858F] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(142,21,55,0.12)]"
              style={{
                minHeight: '300px',
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
                {/* Ahimsa Hand Symbol above title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative group">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#B8858F]/30 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                    
                    {/* Symbol container */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      <img 
                        src={ahimsaHandImage} 
                        alt="Ahimsa Hand"
                        className="w-full h-full object-contain opacity-30 filter brightness-110 saturate-75 blur-[0.5px] drop-shadow-[0_0_25px_rgba(184,133,143,0.25)] group-hover:opacity-40 transition-all duration-700"
                      />
                      
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#B8858F]/25 rounded-full"
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

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#B8858F] via-[#A6737D] to-[#C99DA6] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(184,133,143,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {jainismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#B8858F] to-[#A6737D] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(184,133,143,0.4)]" />
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {jainismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto relative">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={jainismConfig.agents}
                faithColor="#B8858F"
                faithColorHover="#A6737D"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#B8858F]/30 hover:border-[#A6737D]/50 transition-all duration-500 shadow-[0_8px_30px_rgba(184,133,143,0.15)] rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B8858F]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#B8858F] via-[#A6737D] to-[#B8858F] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#B8858F] to-[#A6737D] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#B8858F] to-[#A6737D]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#A6737D] to-[#B8858F]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#B8858F] to-[#C99DA6]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#B8858F]/20 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#A6737D]/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#B8858F] group-hover:text-[#A6737D] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#B8858F] via-[#A6737D] to-[#B8858F] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#B8858F] to-[#A6737D] mx-auto rounded-full mb-6" />
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the path of ahimsa and spiritual liberation through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {jainismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#B8858F]/30 hover:border-[#A6737D]/60 transition-all duration-500 cursor-pointer group h-full p-6 rounded-xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B8858F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B8858F] to-[#A6737D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#B8858F] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#B8858F]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#B8858F] transition-colors duration-200 cursor-pointer">
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#B8858F]/30 border-2 hover:border-[#A6737D]/50 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(184,133,143,0.2)] hover:shadow-[0_12px_40px_rgba(184,133,143,0.3)] rounded-3xl overflow-hidden relative">
                {/* Monk Meditation Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={monkMeditationImage} 
                    alt="Monk Meditation"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.71)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-2xl sm:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-7 h-7 mr-4 text-[#B8858F]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-[#B8858F]/40 border-2 text-[#A6737D] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#B8858F]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#A6737D]" },
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
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#B8858F] to-[#FFD369] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#B8858F] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#B8858F] via-[#C99DA6] to-[#D4AAB0] hover:from-[#A6737D] hover:via-[#B8858F] hover:to-[#C99DA6] border-2 border-[#B8858F]/30 hover:border-[#B8858F]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(184,133,143,0.25)] hover:shadow-[0_8px_35px_rgba(166,115,125,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#A6737D]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#B8858F]/30 hover:border-[#B8858F]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(184,133,143,0.15)] hover:shadow-[0_6px_25px_rgba(184,133,143,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C99DA6]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#B8858F] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Faith Groups Section for Jainism */}
        <JainismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#00695C]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00695C] animate-pulse shadow-lg shadow-[#00695C]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#00695C]/30 hover:border-[#00695C] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#00695C]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#00695C]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#00695C] border-t-transparent animate-spin"></div>
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

// Explicit default export for compatibility
export default JainismFaithPage;