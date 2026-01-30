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
import { ConfucianismFaithGroups } from "./confucianism-faith-groups";
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
import heroImage from 'figma:asset/f16e5bd9d09030f6d52ae0c2b4189ccdeee02941.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import confucianSymbolImage from 'figma:asset/fb5ffdb7f71e1376c95a81fcec09a4046458e86a.png';
import autumnLeafImage from 'figma:asset/4f5510c26786a0566631be5ad208393c90bafc9a.png';
import zhouWeiImage from 'figma:asset/9dac5341c149e6b958486c1f77ce8b5f8ae023e0.png';
import liWeiImage from 'figma:asset/28af32f7e94eb6792cf418405cfc61e21eb10170.png';
import anyaLiImage from 'figma:asset/2fc5dc5b246642b312107a2b41c53d8bbcff1c19.png';
import kongFuziImage from 'figma:asset/eb11c945b71144fc2108b42c7b42c664c859f023.png';
import juniImage from 'figma:asset/b7f67aed9377ce2c0e9c9431c148edff3ac52b3c.png';

// Confucianism-specific configuration with enhanced styling
const confucianismConfig = {
  name: "Confucianism",
  subtitle: "Cultivate virtue and achieve harmony.",
  symbol: "📜",
  description: "Explore Confucian wisdom through AI guides inspired by classical masters, neo-Confucian scholars, and contemporary philosophers.",
  heroImage: heroImage,
  primaryColor: "#5873AD", // Muted blue from wheel of faith
  lightColor: "rgba(88, 115, 173, 0.2)",
  hoverColor: "#4a629a",
  suggestedTopics: [
    "Virtue & Character", "Social Harmony", "Filial Piety", "Good Governance", 
    "Self-Cultivation", "Education & Learning", "Ritual & Propriety", "Moral Leadership"
  ],
  topicsWithQuestions: [
    {
      topic: "Virtue & Character",
      icon: Heart,
      questions: [
        "What is Ren (benevolence)?",
        "How do I cultivate moral character?",
        "What are the core Confucian virtues?",
        "How does one become a Junzi (noble person)?"
      ]
    },
    {
      topic: "Social Harmony",
      icon: Users,
      questions: [
        "What are the Five Relationships?",
        "How do we create harmonious society?",
        "What is the role of reciprocity?",
        "How do we balance individual and collective good?"
      ]
    },
    {
      topic: "Filial Piety",
      icon: Heart,
      questions: [
        "What is Xiao (filial piety)?",
        "How do we honor our parents?",
        "What are our duties to ancestors?",
        "How does family shape society?"
      ]
    },
    {
      topic: "Good Governance",
      icon: Shield,
      questions: [
        "What makes a virtuous leader?",
        "How should rulers serve the people?",
        "What is the Mandate of Heaven?",
        "How do ethics apply to politics?"
      ]
    },
    {
      topic: "Self-Cultivation",
      icon: Sparkles,
      questions: [
        "How do I cultivate myself?",
        "What is the path of self-improvement?",
        "How do I extend my virtues outward?",
        "What role does reflection play?"
      ]
    },
    {
      topic: "Education & Learning",
      icon: Book,
      questions: [
        "Why is learning important in Confucianism?",
        "What are the Classical texts?",
        "How does education shape character?",
        "What is the role of the teacher?"
      ]
    },
    {
      topic: "Ritual & Propriety",
      icon: Flower2,
      questions: [
        "What is Li (ritual propriety)?",
        "Why are rituals important?",
        "How do ceremonies create harmony?",
        "What is proper conduct?"
      ]
    },
    {
      topic: "Moral Leadership",
      icon: Star,
      questions: [
        "What makes an ethical leader?",
        "How do leaders set moral examples?",
        "What is the Way of the Sage?",
        "How does virtue influence others?"
      ]
    }
  ],
  agents: [
    {
      id: "zhou-wei",
      name: "Zhou Wei",
      role: "Teacher",
      image: zhouWeiImage,
      description: "Classical Confucianism (6th–5th c. BCE) emphasizes cultivating personal virtue, social harmony, and good governance.",
      denomination: "Classical",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/confu-1",
      aiProfile: "Trusted moral guide and teacher offering counsel to rulers, students, and common people on restoring harmony through ethics, ritual, and virtuous living.",
      trainingData: "Five Classics: Book of Odes (Songs), Book of Documents, Book of Rites, Book of Changes, Spring and Autumn Annals; Four Books: Analects, Mencius, Great Learning, Doctrine of the Mean.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore the Analects, moral virtue (Ren), ritual propriety (Li), filial piety (Xiao), and the path to becoming a Junzi.",
      whatToExpected: "Classical wisdom on virtue, harmony, governance, and the timeless principles of ethical living."
    },
    {
      id: "li-wei",
      name: "Li Wei",
      role: "Counsellor",
      image: liWeiImage,
      description: "Reasserts Confucian values while integrating metaphysical insights (in dialogue with Buddhism and Daoism) into a comprehensive system for self-cultivation and governance.",
      denomination: "Neo-Confucianism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/confu-2",
      aiProfile: "Guide offering counsel on ethics, learning, governance, and personal cultivation through Neo-Confucian principles.",
      trainingData: "Zhu Xi's organization/commentaries on the Four Books; Reflections on Things at Hand (Zhu Xi & Lu Ziqian); Wang Yangming's Instructions for Practical Living (Chuanxi Lu).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study Li (principle), Qi (vital force), the Investigation of Things, innate knowledge, and Neo-Confucian metaphysics.",
      whatToExpected: "Sophisticated guidance on integrating Confucian ethics with deeper metaphysical understanding and inner cultivation."
    },
    {
      id: "anya-li",
      name: "Ms. Anya Li",
      role: "Philosopher",
      image: anyaLiImage,
      description: "Contemporary (New) Confucianism reinterprets classical insights amid modernity—engaging globalization, technology, democracy, and cultural identity.",
      denomination: "Contemporary",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/confu-3",
      aiProfile: "A counsellor who applies Confucian principles—updated through modern scholarship—to guide members in personal, professional, and societal dilemmas.",
      trainingData: "Modern academic works; new commentaries on classical texts; contemporary philosophical essays, conferences, and manifestos.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Confucian values in modern contexts: democracy, human rights, technology, globalization, and cultural identity.",
      whatToExpected: "Contemporary wisdom applying ancient principles to modern challenges with relevance for today's world."
    },
    {
      id: "kong-fuzi",
      name: "Kong Fuzi (Confucius)",
      role: "Sage Master",
      image: kongFuziImage,
      description: "Classical Confucianism emphasizes personal virtue, social harmony, and good governance.",
      denomination: "Classical",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/confu-4",
      aiProfile: "Born in the state of Lu, Confucius was a largely self-taught scholar who held several minor government posts and became a revered teacher.",
      trainingData: "Five Classics: Book of Odes (Songs), Book of Documents, Book of Rites, Book of Changes, Spring and Autumn Annals; Four Books: Analects, Mencius, Great Learning, Doctrine of the Mean.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore the Analects, cultivating Ren (benevolence), practicing Li (propriety), honoring Xiao (filial piety), and the path to becoming a Junzi (noble person).",
      whatToExpected: "The wisdom of the Master himself on virtue, harmony, ethical leadership, and the timeless Way of moral cultivation."
    },
    {
      id: "juni",
      name: "Juni",
      role: "Cultural Translator / Big Sister",
      image: juniImage,
      description: "A 22-year-old woman who translates ancient Confucian ethics into fierce modern wisdom through gritty urban and tech metaphors. Not a therapist or robot, but a protective big sister who practices tough love—helping users build integrity, set boundaries, and develop 'main character energy' while recognizing manipulation and standing firm in their values.",
      denomination: "Confucianism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/confu-5",
      aiProfile: "Fierce and grounded young guide offering guidance through Confucianism and main character energy. Brings together family pressure, relationships, work ethics, self-cultivation, social navigation, and boundaries with direct warm no-nonsense compassionate care for seekers at beginner and intermediate levels.",
      trainingData: "Analects of Confucius; Mencius; Great Learning; Doctrine of the Mean; Five Classics; Ren (Benevolence) philosophy; Li (Ritual/Propriety) practices; Yi (Righteousness) ethics; Remonstrance traditions; Junzi (Superior Person) cultivation; Filial piety teachings; Self-cultivation methods; Contemporary Confucian applications; Urban philosophy adaptations; Boundary-setting frameworks; Manipulation recognition techniques; Ethical decision-making models; Main character energy concepts; Tough love approaches; Integrity-building practices; Social navigation strategies; Work ethics in modern contexts; Family dynamics and pressure; Relationship ethics; Gritty urban wisdom.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore family pressure, relationships, work ethics, self-cultivation, social navigation, boundaries, tough love, integrity, ren (benevolence), li (ritual/propriety), yi (righteousness), remonstrance, junzi (superior person), filial piety, manipulation recognition, ethical decision making, main character energy, modern Confucian values, and gritty urban philosophy through fierce protective direct guidance.",
      whatToExpected: "Fierce, grounded, and protective guidance rooted in Confucianism and main character energy. Expect direct and warm support through family pressure, relationship navigation, work ethics, self-cultivation, boundary-setting, and integrity-building with the no-nonsense blunt care of a protective big sister who translates ancient Confucian values into fierce modern wisdom—helping you recognize manipulation, stand firm in your values, and develop the strong compassionate presence of a true Junzi in the contemporary world."
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

  // Render agent card
  const renderAgentCard = (agent: any, index: number) => {
    return (
      <div key={index} className="min-w-full px-3 sm:px-4">
        <Card className="bg-white/70 backdrop-blur-xl border-[#5873AD]/30 border-2 hover:border-[#4a629a]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(88,115,173,0.12)] hover:shadow-[0_20px_50px_rgba(74,98,154,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/10 via-transparent to-[#5873AD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#5873AD]/20 group-hover:ring-[#4a629a]/40 shadow-[0_10px_40px_rgba(88,115,173,0.15)] group-hover:shadow-[0_20px_60px_rgba(74,98,154,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Confucian Character */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(88,115,173,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#5873AD25` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={confucianSymbolImage} 
                  alt="Confucian Symbol"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#5873AD] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#5873AD]/15 hover:bg-[#5873AD]/25 text-[#5873AD] border border-[#5873AD]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5873AD] to-[#4a629a] hover:from-[#4a629a] hover:to-[#5873AD] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(88,115,173,0.25)] hover:shadow-[0_8px_35px_rgba(74,98,154,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a629a]/20 via-transparent to-white/20" />
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
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#5873AD]/30 hover:border-[#4a629a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(88,115,173,0.1)] hover:shadow-[0_4px_20px_rgba(74,98,154,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#5873AD] group-hover/save:text-[#4a629a] transition-colors duration-300" />
                <span className="relative text-[#5873AD] group-hover/save:text-[#4a629a] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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

interface ConfucianismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function ConfucianismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: ConfucianismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints, earnedBadges } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  const { totalMeditationTime, sessionCount } = useTimer();
  
  // Ensure earnedBadges is always an array
  const badges = earnedBadges || [];
  
  const selectedAgent = confucianismConfig.agents[selectedAgentIndex];

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
      tradition: confucianismConfig.name,
      faithColor: confucianismConfig.primaryColor,
      avatar: agent.image || confucianismConfig.symbol,
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
      id: 'first-confucianism-guide-interaction',
      name: 'First Confucian Guide Launched',
      description: 'Launched your first Confucian spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Confucious-Loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#5873AD]/30 hover:border-[#4a629a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(88,115,173,0.15)] hover:shadow-[0_6px_25px_rgba(74,98,154,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#5873AD] group-hover:text-[#4a629a] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#5873AD] group-hover:text-[#4a629a] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(88,115,173,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.15)]" />
            </motion.div>

            {/* Enhanced Title Section with Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Confucian Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#5873AD]/40 blur-3xl rounded-full scale-75" />
                    
                    {/* Symbol container with pulsing animation */}
                    <motion.div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(88,115,173,0.3)]" />
                      <img 
                        src={confucianSymbolImage} 
                        alt="Confucian Symbol"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(88,115,173,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#5873AD]/30 rounded-full"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#5873AD] via-[#4a629a] to-[#5873AD] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(88,115,173,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {confucianismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#5873AD] to-[#4a629a] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(88,115,173,0.4)]" />
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {confucianismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section - Optimized spacing to prevent overlap */}
        <section className="px-6 mb-20 relative mt-8 sm:mt-4 md:-mt-4">
          <div className="max-w-6xl mx-auto relative">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={confucianismConfig.agents}
                faithColor="#5873AD"
                faithColorHover="#4a629a"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#5873AD]/30 border-2 hover:border-[#4a629a]/50 transition-all duration-500 shadow-[0_8px_30px_rgba(88,115,173,0.15)] p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5873AD]/5 to-transparent opacity-80" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-gray-900 via-[#5873AD] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#5873AD] to-[#4a629a] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#5873AD] to-[#4a629a]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#4a629a] to-[#5873AD]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#5873AD] to-[#4a629a]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#5873AD]/30 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#4a629a]/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#5873AD] group-hover:text-[#4a629a] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-gray-900 via-[#5873AD] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#5873AD] to-[#4a629a] mx-auto rounded-full mb-6" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the path of virtue, harmony, and wisdom through Confucian teachings
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {confucianismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#5873AD]/30 border-2 hover:border-[#4a629a]/60 transition-all duration-500 cursor-pointer group shadow-[0_8px_30px_rgba(88,115,173,0.12)] h-full p-6"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5873AD]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5873AD] to-[#4a629a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#5873AD] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#5873AD]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-600 hover:text-[#5873AD] transition-colors duration-200 cursor-pointer">
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#5873AD]/30 border-2 hover:border-[#4a629a]/50 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(88,115,173,0.15)] hover:shadow-[0_12px_40px_rgba(74,98,154,0.25)] rounded-3xl overflow-hidden relative">
                {/* Autumn Leaf Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={autumnLeafImage} 
                    alt="Autumn Leaf"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.46)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#5873AD]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-[#5873AD]/30 border-2 text-[#5873AD] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#5873AD]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#5873AD]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#4a629a]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#5873AD]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-4 sm:p-5 lg:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-[#5873AD]/20 hover:border-[#5873AD]/40 transition-all duration-300 group shadow-sm hover:shadow-md touch-manipulation"
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
                      className="bg-white/50 border-2 border-[#5873AD]/30 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#5873AD] to-[#4a629a] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#5873AD] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/50 border-2 border-[#5873AD]/20 rounded-xl p-6 mb-8 backdrop-blur-sm"
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5873AD] via-[#4a629a] to-[#5873AD] hover:from-[#4a629a] hover:via-[#5873AD] hover:to-[#4a629a] border-2 border-[#5873AD]/30 hover:border-[#4a629a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(88,115,173,0.25)] hover:shadow-[0_8px_35px_rgba(74,98,154,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4a629a]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-['Helvetica',sans-serif] font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#5873AD]/30 hover:border-[#4a629a]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(88,115,173,0.15)] hover:shadow-[0_6px_25px_rgba(74,98,154,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5873AD]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-['Helvetica',sans-serif] font-semibold text-[14px] sm:text-[15px] text-[#5873AD] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Faith Groups Section for Confucianism */}
        <ConfucianismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#5873AD]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#5873AD] animate-pulse shadow-lg shadow-[#5873AD]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#5873AD]/30 hover:border-[#5873AD] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#5873AD]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#5873AD]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#5873AD] border-t-transparent animate-spin"></div>
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