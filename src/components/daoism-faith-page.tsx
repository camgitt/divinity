import React, { useState, useEffect } from "react";
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
import { DaoismFaithGroups } from "./daoism-faith-groups";
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
import heroImage from 'figma:asset/df605e5b5c6388f31b80b8c1cc03f66e7fcd1fee.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import yinYangImage from 'figma:asset/51a7d0e6d1a6647dca02517899785892471e556b.png';
import taoBalancedStonesImage from 'figma:asset/ff866db98598a77de0c32804316cd6d954567583.png';
import liShenImage from 'figma:asset/6ec6a4d6a7fe0341a6108dafe9cd95e574616248.png';
import zhangWeiImage from 'figma:asset/f7dd0e72b91ec15e81bf16fd77081474e88fcdac.png';
import liangZhenImage from 'figma:asset/88f04c806141f782dc355ddebf0c8c77b3577e34.png';
import meiLingImage from 'figma:asset/540d0c043371871908ed10a80b4f9f54420a1c45.png';
import xuYunyaoImage from 'figma:asset/155cd3fd4f1d6fe03c353ddb7573ca0b6e914baf.png';
import gaoLianImage from 'figma:asset/dd9f8d40166b27bed037ffb1e7b65539c4e13ce5.png';
import weiChenImage from 'figma:asset/019d2cd41cb3dcd1c5e07b7596a8636e67fdcbfd.png';

// Taoism-specific configuration with enhanced styling
const taoismConfig = {
  name: "Taoism",
  subtitle: "Follow the natural flow of the Tao.",
  symbol: "☯️",
  description: "Explore Taoist wisdom through AI guides inspired by historical and contemporary Taoist masters, philosophers, and spiritual practitioners.",
  heroImage: heroImage,
  primaryColor: "#FFFFFF", // White for balance & unity
  secondaryColor: "#212121", // Black for duality
  lightColor: "rgba(255, 255, 255, 0.2)",
  hoverColor: "#E0E0E0",
  suggestedTopics: [
    "Tao Te Ching", "Wu Wei Practice", "Yin-Yang Philosophy", "Internal Alchemy", 
    "Meditation Techniques", "Natural Harmony", "Taoist Ethics", "Immortality Cultivation"
  ],
  topicsWithQuestions: [
    {
      topic: "Tao Te Ching",
      icon: Book,
      questions: [
        "What is the central message of the Tao Te Ching?",
        "How do I apply Lao Tzu's wisdom to modern life?",
        "What does 'the Tao that can be told is not the eternal Tao' mean?",
        "How can I study the Tao Te Ching effectively?"
      ]
    },
    {
      topic: "Wu Wei Practice",
      icon: Sparkles,
      questions: [
        "What is wu wei and how do I practice it?",
        "How is non-action different from inaction?",
        "Can wu wei apply to my work and relationships?",
        "How do I cultivate effortless action?"
      ]
    },
    {
      topic: "Yin-Yang Philosophy",
      icon: Flower2,
      questions: [
        "What is the relationship between yin and yang?",
        "How do I find balance in my life?",
        "What does duality teach us about harmony?",
        "How can I recognize yin and yang in nature?"
      ]
    },
    {
      topic: "Internal Alchemy",
      icon: Sparkles,
      questions: [
        "What is internal alchemy (neidan)?",
        "How do I cultivate my inner energy (qi)?",
        "What are the stages of spiritual transformation?",
        "How does meditation support alchemical practice?"
      ]
    },
    {
      topic: "Meditation Techniques",
      icon: Heart,
      questions: [
        "What are Taoist meditation methods?",
        "How do I practice sitting and forgetting (zuowang)?",
        "What is the microcosmic orbit meditation?",
        "How does breathing practice cultivate energy?"
      ]
    },
    {
      topic: "Natural Harmony",
      icon: Flower2,
      questions: [
        "How do I live in harmony with nature?",
        "What does it mean to follow the natural way?",
        "How can I simplify my life according to Taoist principles?",
        "What is the relationship between humans and the cosmos?"
      ]
    },
    {
      topic: "Taoist Ethics",
      icon: Users,
      questions: [
        "What are the core virtues in Taoism?",
        "How does Taoism approach morality?",
        "What is the Three Treasures teaching?",
        "How do I practice compassion and humility?"
      ]
    },
    {
      topic: "Immortality Cultivation",
      icon: Star,
      questions: [
        "What does spiritual immortality mean in Taoism?",
        "How do physical and spiritual cultivation relate?",
        "What are the practices for longevity?",
        "How does one transcend worldly attachments?"
      ]
    }
  ],
  agents: [
    {
      id: "li-shen",
      name: "Li Shen",
      role: "Philosopher",
      image: liShenImage,
      description: "Philosophical Taoism, or Daojia, is a tradition centered on harmonizing with the Tao, the universe's natural and spontaneous underlying flow.",
      denomination: "Philosophical Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-1",
      aiProfile: "A calm, grounding presence who supports others by teaching how to \"flow like water,\" reducing inner resistance and helping them reconnect with simplicity and authenticity.",
      trainingData: "Daodejing (道德經), Zhuangzi (莊子), Liezi (列子).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore philosophical concepts, wu wei practice, natural harmony, and the wisdom of the Tao Te Ching.",
      whatToExpected: "Guidance on living simply, naturally, and in harmony with the Tao's spontaneous flow."
    },
    {
      id: "zhang-wei",
      name: "Zhang Wei",
      role: "Priest / Sage Master",
      image: zhangWeiImage,
      description: "An umbrella term for organized Taoist religion, with a formal pantheon, priesthood, rituals, and scriptures aimed at achieving longevity, spiritual salvation, or immortality. It encompasses various schools and lineages.",
      denomination: "Religious Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-2",
      aiProfile: "Acts as a ritual leader, spiritual advisor, and bridge between community members and the Taoist pantheon. Offers blessings, healing, and guidance.",
      trainingData: "The Daozang (道藏) — key texts include the Daodejing, Taiping Jing (太平經), and various ritual manuals.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Taoist rituals, deities, religious practices, and community ceremonies.",
      whatToExpected: "Practical guidance on Taoist religious traditions, rituals, and spiritual protection."
    },
    {
      id: "liang-zhen",
      name: "Liang Zhen",
      role: "Sage Master / Monk",
      image: liangZhenImage,
      description: "A monastic school of Religious Taoism emphasizing internal alchemy (neidan 內丹), asceticism, and meditation to cultivate spiritual perfection and immortality.",
      denomination: "Quanzhen Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-4",
      aiProfile: "A celibate monastic who practices internal alchemy (neidan), meditation, and strict discipline. Offers counsel on moral purity, spiritual cultivation, and transcendence of worldly attachments.",
      trainingData: "Daodejing; Qingjing Jing (清靜經 — Scripture of Clarity and Stillness); Yinfujing (陰符經 — Scripture of the Hidden Accordance); Wang Chongyang.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore internal alchemy, monastic practices, meditation, and the path to spiritual immortality.",
      whatToExpected: "Deep guidance on internal cultivation, energy work, and transcending worldly desires."
    },
    {
      id: "mei-ling-zhengyi",
      name: "Mei Ling",
      role: "Spiritual Intermediary / Daoshi",
      image: meiLingImage,
      description: "A school of Religious Taoism focused on ritual, liturgy, and ceremonial magic performed by married priests (daoshi) who live in the community. They act as spiritual intermediaries, performing exorcisms, blessings, and funerals.",
      denomination: "Zhengyi Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-3",
      aiProfile: "Spiritual intermediary and ritual priest (daoshi) specializing in traditional rites, ceremonial magic, exorcisms, blessings, and life passage ceremonies. Guides individuals through understanding traditional rites, performing ceremonies for life events, and managing spiritual disruptions. Embodies the teachings of Zhang Daoling, founder of Zhengyi Taoism.",
      trainingData: "Zhengyi Jing (正一經 — Scriptures of Orthodox Unity), Xiang'er commentary on the Daodejing, Zhang Daoling's teachings",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Zhengyi rituals, ceremonial magic, exorcism practices, blessings for life events, and community-based Taoist practice.",
      whatToExpected: "Practical guidance on performing rituals, understanding ceremonial traditions, and navigating spiritual protection through Orthodox Unity practices."
    },
    {
      id: "xu-yunyao-shangqing",
      name: "Adept Xu Yunyao",
      role: "Spiritual Guide / Adept",
      image: xuYunyaoImage,
      description: "An aristocratic, esoteric school focused on individual salvation through meditative visualization of spirits and deities within the body, ecstatic journeys to celestial realms, and personal revelation.",
      denomination: "Shangqing Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-5",
      aiProfile: "A reclusive guide who aids seekers in spiritual refinement through meditation, visualization, and ecstatic communion with divine beings. Provides counsel on personal revelation and cultivating purity. Specializes in advanced internal cultivation and direct communion with celestial deities through meditative visualization.",
      trainingData: "Dadong Zhenjing (大洞真經 — True Scripture of the Great Cavern), Huangting Jing (黃庭經 — Yellow Court Scripture)",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Shangqing meditation practices, visualization of inner deities, ecstatic celestial journeys, personal revelation, and the path of spiritual refinement.",
      whatToExpected: "Esoteric guidance on advanced visualization techniques, communion with celestial beings, and cultivating spiritual purity through Highest Clarity practices."
    },
    {
      id: "gao-lian-shangqing",
      name: "Gao Lian",
      role: "Spiritual Guide",
      image: gaoLianImage,
      description: "A mature Shangqing Taoist spiritual guide specializing in nature-based internal alchemy for intermediate practitioners. He bridges foundational practice to Highest Clarity meditation through gentle energy refinement in natural settings.",
      denomination: "Shangqing Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-6",
      aiProfile: "Ritual leader and cosmic intercessor who conducts liturgies, prays for universal salvation, and guides compassion and celestial harmony. Specializes in communal spiritual practice, understanding complex ritual, and committing to universal spiritual redemption through the Lingbao tradition.",
      trainingData: "Wupian Zhenwen (五篇真文 — Five Tablets of True Script), Durenjing (度人經 — Scripture on the Salvation of Humanity)",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Lingbao communal liturgies, universal salvation practices, cosmic harmony rituals, Buddhist-Taoist synthesis, and the systematized Lingbao canon.",
      whatToExpected: "Compassionate guidance on performing complex rituals, understanding universal salvation, and cultivating harmony through Numinous Treasure practices."
    },
    {
      id: "wei-chen",
      name: "Wei Chen",
      role: "Guide / Instructor",
      image: weiChenImage,
      description: "A 24-year-old herbalist, tai chi instructor, and permaculture gardener who helps people navigate life through Daoist principles of wu wei and natural flow. Not an enlightened master, but a peer learning alongside users through video conversation.",
      denomination: "Taoism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/taoism-7",
      aiProfile: "Calm and grounded young guide offering guidance through Daoist principles and natural flow. Brings together wu wei (effortless action), natural flow, trust in process, burnout recovery, decision making, letting go, seasonal thinking, adaptation, control issues, natural rhythms, permaculture, tai chi, inner peace, stress management, life purpose, and wisdom through calm grounded patient guidance.",
      trainingData: "Daodejing (Tao Te Ching); Zhuangzi; Wu Wei philosophy; Natural flow principles; Seasonal thinking frameworks; Permaculture design principles; Tai Chi philosophy and practice; Herbalism and natural medicine; Adaptation and resilience strategies; Process-oriented thinking; Control release techniques; Natural rhythms and cycles; Burnout recovery resources; Decision-making wisdom; Letting go practices; Contemporary Daoism applications; Peer learning methodologies.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore wu wei (effortless action), natural flow, trust in process, burnout recovery, decision making, letting go, seasonal thinking, adaptation, control issues, natural rhythms, permaculture, tai chi, inner peace, stress management, life purpose, and wisdom through calm grounded patient guidance.",
      whatToExpected: "Calm, grounded, and patient guidance rooted in Daoist principles and natural flow. Expect adaptive and contemplative support through wu wei practice, natural rhythms, seasonal thinking, burnout recovery, letting go, and trust in process with the observant non-forcing care of a peer learning alongside you—integrating herbalism, permaculture, and tai chi wisdom to help you flow like water rather than fight against the current."
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
  initialAgentIndex?: number;
}

function AgentSlider({ agents, faithColor, faithColorHover, canAccessPremium, handleLaunchAgent, handleSaveGuide, handleOpenOverlay, initialAgentIndex = 0 }: AgentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialAgentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Update currentIndex when initialAgentIndex changes
  useEffect(() => {
    setCurrentIndex(initialAgentIndex);
  }, [initialAgentIndex]);

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
        <Card className="bg-white/70 backdrop-blur-xl border-[#5A5A5A]/30 border-2 hover:border-[#5A5A5A]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(90,90,90,0.12)] hover:shadow-[0_20px_50px_rgba(90,90,90,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5A5A5A]/10 via-transparent to-[#5A5A5A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
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
              {/* Faith symbol - Yin Yang */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(90,90,90,0.3)] backdrop-blur-md border border-[#5A5A5A]/40 overflow-hidden"
                style={{ backgroundColor: `rgba(90, 90, 90, 0.25)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={yinYangImage} 
                  alt="Yin Yang"
                  className="relative w-6 h-6 object-contain filter brightness-90 saturate-50"
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
              backgroundColor: actualIndex === index ? faithColor : `rgba(255, 255, 255, 0.25)`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface TaoismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
  selectedAgent?: string;
}

export function DaoismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate, selectedAgent: selectedAgentName }: TaoismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  // Auto-select agent when navigating from saved guides
  useEffect(() => {
    if (selectedAgentName) {
      const agentIndex = taoismConfig.agents.findIndex(
        agent => agent.name === selectedAgentName
      );
      if (agentIndex !== -1) {
        setSelectedAgentIndex(agentIndex);
      }
    }
  }, [selectedAgentName]);
  
  const selectedAgent = taoismConfig.agents[selectedAgentIndex];

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
      tradition: taoismConfig.name,
      faithColor: taoismConfig.primaryColor,
      avatar: agent.image || taoismConfig.symbol,
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
      id: 'first-taoist-guide-interaction',
      name: 'First Taoist Guide Launched',
      description: 'Launched your first Taoist spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Daoism-Loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-white/30 hover:border-white/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-gray-900 group-hover:text-gray-700 transition-colors duration-300" />
                <span className="text-[15px] font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image with Faith-specific styling */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.11)]" />
            </motion.div>

            {/* Enhanced Title Section with Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Yin Yang Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-75" />
                    
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
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(255,255,255,0.3)]" />
                      <img 
                        src={yinYangImage} 
                        alt="Yin Yang Symbol"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-white/30 rounded-full"
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

                <h1 className="text-[40px] mb-6 bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-[rgba(0,0,0,0.49)] leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                  {taoismConfig.name}
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-white via-slate-400 to-white mx-auto rounded-full mb-6" />
                <p className="text-[rgb(255,252,252)] max-w-2xl mx-auto leading-relaxed text-[16px]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {taoismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={taoismConfig.agents}
                faithColor="#5A5A5A"
                faithColorHover="#3A3A3A"
                canAccessPremium={canAccessPremium}
                handleLaunchAgent={handleLaunchAgent}
                handleSaveGuide={handleSaveGuide}
                handleOpenOverlay={handleOpenOverlay}
                initialAgentIndex={selectedAgentIndex}
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#5A5A5A]/30 border-2 hover:border-[#5A5A5A]/60 transition-all duration-500 shadow-[0_8px_30px_rgba(90,90,90,0.12)] p-8 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A5A5A]/10 via-transparent to-[#5A5A5A]/5 opacity-80" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-[#5A5A5A] mx-auto rounded-full" />
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
                      className="border-[#5A5A5A]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#5A5A5A]/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5A5A5A] to-[#3A3A3A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-gray-900 group-hover:text-[#5A5A5A] transition-colors duration-300">
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
              <div className="w-20 h-0.5 bg-[#5A5A5A] mx-auto rounded-full mb-6" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the profound wisdom of the Tao through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {taoismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#5A5A5A]/30 border-2 hover:border-[#5A5A5A]/60 transition-all duration-500 cursor-pointer group shadow-[0_8px_30px_rgba(90,90,90,0.12)] h-full p-6 rounded-3xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5A5A5A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5A5A5A] to-[#3A3A3A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#5A5A5A] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#5A5A5A]/20 mt-4 space-y-2">
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

        {/* Enhanced CTA Section */}
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
                    src={taoBalancedStonesImage} 
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
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#FFD369]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "gray-600" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "gray-700" },
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
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-gray-700 font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 border-2 border-gray-500/30 hover:border-gray-600/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(75,85,99,0.25)] hover:shadow-[0_8px_35px_rgba(55,65,81,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-700/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-gray-500/30 hover:border-gray-600/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(75,85,99,0.15)] hover:shadow-[0_6px_25px_rgba(75,85,99,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-400/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-gray-700 tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Faith Groups Section for Taoism */}
        <DaoismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-white/30 overflow-hidden [&>button]:hidden">
          {/* Accessible title and description - visually hidden */}
          <DialogTitle className="sr-only">
            AI Guide Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.
          </DialogDescription>

          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-lg shadow-white/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseOverlay}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-white/30 hover:border-white transition-all duration-300 hover:scale-110"
              aria-label="Close conversation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          
          {/* iframe container */}
          <div className="w-full h-full pt-12 sm:pt-16">
            {overlayUrl && (
              <iframe
                src={overlayUrl}
                className="w-full h-full border-0"
                title={`Chat with ${overlayAgentName}`}
                allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
                onLoad={() => setIsIframeLoading(false)}
                loading="eager"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}