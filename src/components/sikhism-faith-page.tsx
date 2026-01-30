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
import { SikhismFaithGroups } from "./sikhism-faith-groups";
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
import heroImage from 'figma:asset/88069518cf21c2d562a9647d299e673a00dd0665.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import khandaSymbolImage from 'figma:asset/1cda2d7f6a67b44acf470f38cd964150e10093ee.png';
import sikhTempleImage from 'figma:asset/a556b53f93821a5a1daeadd0fa3ed2bb2dc1e614.png';
import harjitSinghImage from 'figma:asset/11334387f8ba8aad50f5f81aa6283c5ed43c7ed9.png';
import amritpalSinghImage from 'figma:asset/2dd4d19ff9433a75979013500c3a1b8781e760f5.png';
import ramSinghImage from 'figma:asset/e26e370b809b8a04e85aeb4b04854513758c90bc.png';
import babaDyalDasImage from 'figma:asset/d3ebf5eb0578d7a5b01ec30f761d11dae0368576.png';
import harjitKaurKhalsaImage from 'figma:asset/6c88828bba7e079611bac198ec6c6ab794f667f8.png';
import bhaiHarbhajanSinghImage from 'figma:asset/03e7807c9a814efea82729a13600c5be8f542fac.png';

// Sikhism-specific configuration with enhanced styling
const sikhismConfig = {
  name: "Sikhism",
  subtitle: "Walk the path of courage and devotion.",
  symbol: "⚔️",
  description: "Explore Sikh wisdom through AI guides inspired by spiritual teachers, community leaders, and mentors from diverse Sikh traditions.",
  heroImage: heroImage,
  primaryColor: "#D4895C", // Muted tangerine from wheel of faith
  lightColor: "rgba(212, 137, 92, 0.2)",
  hoverColor: "#c07a50",
  suggestedTopics: [
    "Guru Granth Sahib", "Five Ks", "Seva (Service)", "Naam Simran", 
    "Khalsa Path", "Langar", "Sarbat da Bhala", "Gurdwara Life"
  ],
  topicsWithQuestions: [
    {
      topic: "Guru Granth Sahib",
      icon: Book,
      questions: [
        "What is the Guru Granth Sahib?",
        "How do I read and understand Gurbani?",
        "What are the main teachings?",
        "How does the eternal Guru guide us?"
      ]
    },
    {
      topic: "Five Ks",
      icon: Shield,
      questions: [
        "What are the Five Ks?",
        "What is the significance of Kesh (uncut hair)?",
        "Why do Sikhs wear the Kara?",
        "What does the Kirpan represent?"
      ]
    },
    {
      topic: "Seva (Service)",
      icon: Heart,
      questions: [
        "What is the importance of seva?",
        "How do I practice selfless service?",
        "What is Langar and its significance?",
        "How does service connect us to God?"
      ]
    },
    {
      topic: "Naam Simran",
      icon: Sparkles,
      questions: [
        "What is Naam Simran (meditation)?",
        "How do I practice Naam Japna?",
        "What is the significance of Waheguru?",
        "How do I deepen my meditation practice?"
      ]
    },
    {
      topic: "Khalsa Path",
      icon: Star,
      questions: [
        "What is the Khalsa?",
        "What does Amrit Sanchar mean?",
        "What are the responsibilities of Khalsa?",
        "How do I live as a warrior-saint?"
      ]
    },
    {
      topic: "Langar",
      icon: Users,
      questions: [
        "What is Langar?",
        "Why is community kitchen important?",
        "How does Langar promote equality?",
        "What is the spiritual significance?"
      ]
    },
    {
      topic: "Sarbat da Bhala",
      icon: Heart,
      questions: [
        "What does Sarbat da Bhala mean?",
        "How do we pray for all humanity?",
        "What is the Sikh vision of justice?",
        "How do we serve the world?"
      ]
    },
    {
      topic: "Gurdwara Life",
      icon: Flower2,
      questions: [
        "What is a Gurdwara?",
        "What happens during congregational worship?",
        "What is Kirtan?",
        "How do I participate in Sangat?"
      ]
    }
  ],
  agents: [
    {
      id: "harjit-singh",
      name: "Bhai Harjit Singh",
      role: "Spiritual Guide",
      image: harjitSinghImage,
      description: "Follows the teachings of the ten Sikh Gurus, with the Guru Granth Sahib as the eternal Guru. Emphasizes devotion to the One God, equality, seva (service), honest living, and remembrance of the Divine Name; rejects caste and empty ritual.",
      denomination: "Mainstream Sikhism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-1",
      aiProfile: "Spiritual guide and community counsellor offering wisdom rooted in the Guru Granth Sahib and the teachings of Guru Nanak.",
      trainingData: "Guru Granth Sahib; Dasam Granth; Janamsakhis; Sikh Rehat Maryada; Varan Bhai Gurdas.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Gurbani, Naam Simran, equality, honest living (Kirat Karo), sharing (Vand Chakko), and devotion to Waheguru.",
      whatToExpected: "Profound wisdom on living as a Sikh, practicing devotion, serving humanity, and following the path of the Gurus."
    },
    {
      id: "amritpal-singh",
      name: "Bhai Amritpal Singh",
      role: "Senior Khalsa Mentor",
      image: amritpalSinghImage,
      description: "The initiated order was established by Guru Gobind Singh in 1699. Centers on commitment to the Five Ks, discipline, courage in defence of justice, and readiness to serve and protect.",
      denomination: "Khalsa Sikhs",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-2",
      aiProfile: "Senior Khalsa mentor and spiritual guide within the Panth.",
      trainingData: "Guru Granth Sahib; Dasam Granth; Janamsakhis; Sikh Rehat Maryada; Varan Bhai Gurdas.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Amrit Sanchar, the Five Ks, Khalsa discipline, warrior-saint path, and defending the oppressed.",
      whatToExpected: "Guidance on the path of the Khalsa, balancing spiritual devotion with courage and readiness to stand for justice."
    },
    {
      id: "ram-singh",
      name: "Satguru Ram Singh",
      role: "Community Elder",
      image: ramSinghImage,
      description: "A 19th-century reform community associated with Satguru Ram Singh (1857), noted for simplicity, white attire/turbans, emphasis on Naam, and distinctive devotional practices; holds a view of continuing living gurus after Guru Gobind Singh.",
      denomination: "Namdharis",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-3",
      aiProfile: "Respected elder and counsellor within the Namdhari community, offering guidance grounded in the Guru Granth Sahib, the compositions associated with Satguru Ram Singh, and Namdhari rehat.",
      trainingData: "Guru Granth Sahib; compositions and history linked to Satguru Ram Singh; Namdhari Rehat Maryada; teachings of successive Namdhari gurus.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study Namdhari practices, emphasis on Naam, simplicity, vegetarianism, and the living Guru tradition.",
      whatToExpected: "Wisdom on living a simple, devoted life with emphasis on Naam meditation and community practices."
    },
    {
      id: "baba-dyal-das",
      name: "Baba Dyal Das",
      role: "Counsellor",
      image: babaDyalDasImage,
      description: "A reform movement (1851) emphasizing devotion to the Nirankar (Formless God), inner spirituality, and personal responsibility over ritualism and institutionalism.",
      denomination: "Nirankaris",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-4",
      aiProfile: "Counsellor within the Nirankari sangat providing spiritual and practical guidance centred on worship of the Formless One.",
      trainingData: "Guru Granth Sahib; Dasam Granth; Janamsakhis; Sikh Rehat Maryada; Varan Bhai Gurdas.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore devotion to the Formless God (Nirankar), inner spirituality, personal responsibility, and rejection of ritualism.",
      whatToExpected: "Practical moral guidance on developing a direct, personal relationship with the Divine while rejecting formalism and emphasizing self-accountability."
    },
    {
      id: "harjit-kaur-khalsa",
      name: "Harjit Kaur Khalsa",
      role: "Counsellor",
      image: harjitKaurKhalsaImage,
      description: "Sikh Dharma International/3HO (founded in 1969 by Yogi Bhajan) blends Sikh teachings with Kundalini yoga-influenced lifestyle practices within a modern, largely Western context.",
      denomination: "3HO Sikhs",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-5",
      aiProfile: "Spiritual and lifestyle counsellor within the 3HO community, offering guidance that integrates Sikh devotion with healthy-living routines.",
      trainingData: "Guru Granth Sahib; Dasam Granth; Janamsakhis; Sikh Rehat Maryada; selected 3HO/Sikh Dharma materials.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Kundalini yoga, integrating Sikh devotion with lifestyle practices, healthy living routines, and modern Sikh practice in Western contexts.",
      whatToExpected: "Guidance on balancing spiritual practice with physical discipline, establishing daily routines, and applying Sikh principles to contemporary life."
    },
    {
      id: "bhai-harbhajan-singh",
      name: "Bhai Harbhajan Singh",
      role: "Kirtan Guide",
      image: bhaiHarbhajanSinghImage,
      description: "A kirtan-focused Sikh movement linked with Bhai Randhir Singh (early 20th c.), known for extensive kirtan programs and particular discipline emphases within the Rehat.",
      denomination: "Akhand Kirtani Jatha (AKJ)",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/sikh-6",
      aiProfile: "Spiritual counsellor and kirtan guide within AKJ.",
      trainingData: "Guru Granth Sahib; writings of Bhai Randhir Singh; AKJ Rehat Maryada.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about kirtan (devotional singing), continuous remembrance (Akhand Kirtan), AKJ Rehat Maryada, and spiritual discipline through music and worship.",
      whatToExpected: "Guidance on intensive devotional practice, strict code of discipline, and spiritual growth through music and continuous worship."
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
        <Card className="bg-white/70 backdrop-blur-xl border-[#D4895C]/30 border-2 hover:border-[#c07a50]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(212,137,92,0.12)] hover:shadow-[0_20px_50px_rgba(192,122,80,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/10 via-transparent to-[#D4895C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#D4895C]/20 group-hover:ring-[#c07a50]/40 shadow-[0_10px_40px_rgba(212,137,92,0.15)] group-hover:shadow-[0_20px_60px_rgba(192,122,80,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Khanda */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(212,137,92,0.3)] backdrop-blur-md border border-white/40 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={khandaSymbolImage} 
                  alt="Khanda"
                  className="relative w-6 h-6 object-contain"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#D4895C] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#D4895C]/15 hover:bg-[#D4895C]/25 text-[#D4895C] border border-[#D4895C]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4895C] to-[#c07a50] hover:from-[#c07a50] hover:to-[#D4895C] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(212,137,92,0.25)] hover:shadow-[0_8px_35px_rgba(192,122,80,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c07a50]/20 via-transparent to-white/20" />
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
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#D4895C]/30 hover:border-[#c07a50]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(212,137,92,0.1)] hover:shadow-[0_4px_20px_rgba(192,122,80,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#D4895C] group-hover/save:text-[#c07a50] transition-colors duration-300" />
                <span className="relative text-[#D4895C] group-hover/save:text-[#c07a50] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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

interface SikhismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function SikhismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: SikhismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = sikhismConfig.agents[selectedAgentIndex];

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
      tradition: sikhismConfig.name,
      faithColor: sikhismConfig.primaryColor,
      avatar: agent.image || sikhismConfig.symbol,
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
      id: 'first-sikhism-guide-interaction',
      name: 'First Sikh Guide Launched',
      description: 'Launched your first Sikh spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Sikhism-loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#D4895C]/30 hover:border-[#c07a50]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(212,137,92,0.15)] hover:shadow-[0_6px_25px_rgba(192,122,80,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#c07a50] group-hover:text-[#D4895C] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#c07a50] group-hover:text-[#D4895C] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(245,127,23,0.12)]"
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
                {/* Khanda Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#D4895C]/40 blur-3xl rounded-full scale-75" />
                    
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
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(212,137,92,0.3)]" />
                      <img 
                        src={khandaSymbolImage} 
                        alt="Khanda Symbol"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(212,137,92,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#D4895C]/30 rounded-full"
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

                <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] mb-6 sm:mb-8 bg-gradient-to-r from-[#D4895C] via-[#c07a50] to-[#D4895C] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(212,137,92,0.3)]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {sikhismConfig.name}
                </h1>
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[17px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {sikhismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={sikhismConfig.agents}
                faithColor="#D4895C"
                faithColorHover="#c07a50"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#D4895C]/30 border-2 hover:border-[#c07a50]/50 transition-all duration-500 p-8 shadow-[0_8px_30px_rgba(212,137,92,0.12)] rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/5 to-transparent opacity-80 rounded-2xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-gray-900 via-[#D4895C] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#D4895C] to-[#c07a50]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#c07a50] to-[#D4895C]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#D4895C] to-[#c07a50]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#D4895C]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#D4895C]/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#D4895C] group-hover:text-[#c07a50] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-gray-900 via-[#D4895C] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif", filter: 'drop-shadow(0 2px 6px rgba(255, 255, 255, 0.9))' }}>
                Explore Topics
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sikhismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#D4895C]/30 border-2 hover:border-[#c07a50]/60 transition-all duration-500 cursor-pointer group h-full p-6 shadow-[0_8px_30px_rgba(212,137,92,0.12)] hover:shadow-[0_20px_50px_rgba(192,122,80,0.25)] rounded-2xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4895C] to-[#c07a50] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#D4895C] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#D4895C]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#D4895C] transition-colors duration-200 cursor-pointer">
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
                    src={sikhTempleImage} 
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
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#D4895C]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#5B4636] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#D4895C]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#D4895C]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#c07a50]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#D4895C]" }
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
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#D4895C] to-[#c07a50] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#c07a50] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4895C] via-[#c07a50] to-[#D4895C] hover:from-[#c07a50] hover:via-[#D4895C] hover:to-[#c07a50] border-2 border-[#c07a50]/30 hover:border-[#c07a50]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(212,137,92,0.25)] hover:shadow-[0_8px_35px_rgba(192,122,80,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#c07a50]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#c07a50]/30 hover:border-[#D4895C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(192,122,80,0.15)] hover:shadow-[0_6px_25px_rgba(212,137,92,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4895C]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
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

        {/* Faith Groups Section for Sikhism */}
        <SikhismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#D4895C]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D4895C] animate-pulse shadow-lg shadow-[#D4895C]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#D4895C]/30 hover:border-[#D4895C] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4895C]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#D4895C]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#D4895C] border-t-transparent animate-spin"></div>
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