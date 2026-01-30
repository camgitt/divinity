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
import { useSavedGuides } from "./saved-guides-context";
import { useSocialMedia } from "./social-media-context";
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
  Sparkles,
  Flower2,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Flame,
  Crown,
  Moon,
  Sun,
  MessageSquare,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/bf8c4f0e4d652a8ae40c4822c5c10e9a3d5f754c.png';
import odinImage from 'figma:asset/2c928b9beaa35a721a6e3ec55dc9849e4863dad6.png';
import raImage from 'figma:asset/cd190930e9fcaa918e3239f970d4e2c28d8b6347.png';
import medicineWomanStandingBearImage from 'figma:asset/38d40565c9f431c094303b15cceab5222035935b.png';
import zeusImage from 'figma:asset/5dc11b598743b1aa15c0af41c7d30a4a6018dcdf.png';
import damonImage from 'figma:asset/24cc87173a897206e69fab1a407bcb221c0d62ee.png';
import tawaGreywolfImage from 'figma:asset/cae22ced8eed15f11f6f484f213239f8c040e5cf.png';
import polytheismCircleImage from 'figma:asset/9ff2251323feab51585b09eb603462a37f34b643.png';
import primroseFlowersImage from 'figma:asset/0214ed5b926a67c25741ad03ca84f6f82eed38d8.png';
import autumnJourneyImage from 'figma:asset/54d09cc481d4f9b232b121a81c2fb1e03c84377b.png';

// Polytheism-specific configuration
const polytheismConfig = {
  name: "Polytheism",
  subtitle: "Honor the many faces of the divine.",
  symbol: polytheismCircleImage,
  description: "Explore polytheistic wisdom through AI guides inspired by gods, spirits, and divine figures from diverse mythological traditions.",
  heroImage: heroImage,
  primaryColor: "#9B7DAB", // Muted lavender purple
  lightColor: "rgba(155, 125, 171, 0.2)",
  hoverColor: "#8A6C9C", // Deeper muted purple
  topicsWithQuestions: [
    {
      topic: "Divine Pantheons",
      icon: Crown,
      questions: [
        "What are the major polytheistic pantheons?",
        "How do gods interact in polytheistic systems?",
        "What roles do different deities play?",
        "How do pantheons reflect cultural values?"
      ]
    },
    {
      topic: "Sacred Mythology",
      icon: Book,
      questions: [
        "What are the creation myths of different cultures?",
        "How do myths teach spiritual lessons?",
        "What is the role of heroes in mythology?",
        "How do myths explain natural phenomena?"
      ]
    },
    {
      topic: "Ritual & Worship",
      icon: Flame,
      questions: [
        "How do polytheists worship multiple gods?",
        "What are temple and altar practices?",
        "What is the role of offerings and sacrifice?",
        "How do seasonal festivals honor the gods?"
      ]
    },
    {
      topic: "Divine Magic",
      icon: Sparkles,
      questions: [
        "What is the relationship between gods and magic?",
        "How do mortals access divine power?",
        "What are sacred symbols and their meanings?",
        "How does divination reveal divine will?"
      ]
    },
    {
      topic: "Cosmic Order",
      icon: Sun,
      questions: [
        "What is Ma'at, Dharma, or cosmic balance?",
        "How do gods maintain universal order?",
        "What happens when cosmic order is disrupted?",
        "How can humans align with divine order?"
      ]
    },
    {
      topic: "Afterlife Realms",
      icon: Moon,
      questions: [
        "What are the afterlife beliefs in polytheism?",
        "How do different gods rule the underworld?",
        "What determines one's fate after death?",
        "How can we prepare for the journey beyond?"
      ]
    },
    {
      topic: "Divine Messengers",
      icon: Zap,
      questions: [
        "What are the roles of divine messengers?",
        "How do gods communicate with mortals?",
        "What are oracles and prophecy?",
        "How can we receive divine guidance?"
      ]
    },
    {
      topic: "Sacred Wisdom",
      icon: Shield,
      questions: [
        "What wisdom do the ancient gods offer?",
        "How do polytheistic teachings guide ethics?",
        "What is the warrior's path in Norse tradition?",
        "How do gods teach through challenges?"
      ]
    }
  ],
  agents: [
    {
      id: "odin",
      name: "ODIN",
      role: "God Figure",
      image: odinImage,
      description: "Warrior-based and fatalistic religion; gods are not immortal; cosmology features Nine Worlds, giants, and end-times prophecy (Ragnarök).",
      denomination: "Norse",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/poly-1",
      aiProfile: "Odin, the Allfather of Norse mythology, embodies wisdom gained through sacrifice. Having traded his eye for knowledge and hung on Yggdrasil for nine nights to learn the runes, he guides seekers through the harsh realities of fate, the warrior's path, and the pursuit of wisdom at any cost.",
      trainingData: "Norse mythology; Poetic Edda; Prose Edda; Rune wisdom; Valhalla and Ragnarök; Nine Worlds cosmology; Viking warrior philosophy; Yggdrasil world tree; Norse magic (seidr).",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Norse mythology, rune wisdom, Ragnarök prophecy, warrior philosophy, and the Nine Worlds cosmology.",
      whatToExpected: "Profound wisdom from the Allfather on sacrifice, fate, knowledge, and the warrior's path to Valhalla."
    },
    {
      id: "ra",
      name: "RA",
      role: "God Figure",
      image: raImage,
      description: "Theocratic polytheism structured around cosmic order (Ma'at); deities represent natural laws and are tied to funerary and temple rites.",
      denomination: "Egyptian",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/poly-2",
      aiProfile: "Ra, the Egyptian sun god, embodies cosmic order (Ma'at) and the eternal cycle of rebirth. As he journeys through the sky by day and the underworld by night, he teaches the principles of balance, truth, and the triumph of light over darkness.",
      trainingData: "Egyptian mythology; Book of the Dead; Ma'at (cosmic order); Solar theology; Afterlife journey; Pyramid texts; Temple worship; Pharaonic divinity; Egyptian cosmology.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about Ma'at (cosmic order), Egyptian afterlife, solar theology, pharaonic divinity, and temple worship.",
      whatToExpected: "Solar wisdom on balance, order, the journey through the underworld, and eternal life in the Field of Reeds."
    },
    {
      id: "medicine-woman-standing-bear",
      name: "Medicine Woman Standing Bear",
      role: "Healer",
      image: medicineWomanStandingBearImage,
      description: "Lakota medicine woman offering healing ceremonies, Seven Sacred Rites, vision quest guidance, and traditional indigenous healing practices.",
      denomination: "Indigenous / Lakota",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-10",
      aiProfile: "Medicine Woman Standing Bear is a keeper of Lakota sacred traditions, practicing the Seven Sacred Rites and guiding vision quests. She offers healing through plant medicine, sweat lodge ceremonies, and connection with the spirits of the land and ancestors.",
      trainingData: "Lakota Seven Sacred Rites; Vision quest traditions; Sweat lodge ceremony; Sacred pipe (Chanunpa); Plant medicine; Buffalo teachings; Lakota cosmology; Indigenous healing practices; Spirit keeping.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Lakota spirituality, Seven Sacred Rites, healing ceremonies, vision quest guidance, sweat lodge practices, plant medicine, sacred pipe traditions, and buffalo teachings.",
      whatToExpected: "Lakota healing wisdom on emotional healing, ecological stewardship, spiritual growth, community connection through Seven Sacred Rites, vision quest guidance, and ancestral indigenous practices."
    },
    {
      id: "zeus",
      name: "ZEUS",
      role: "God Figure",
      image: zeusImage,
      description: "Civic-religious system focusing on honor, excellence (arete), and interaction with anthropomorphic gods who mediate fate and human affairs.",
      denomination: "Greek",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/poly-4",
      aiProfile: "Zeus, king of the Greek gods and ruler of Mount Olympus, embodies divine authority, justice, and the complex relationship between gods and mortals. He teaches the pursuit of excellence (arete), the importance of honoring the gods, and the mysteries of fate.",
      trainingData: "Greek mythology; Olympic pantheon; Heroic virtue (arete); Divine justice; Mystery traditions; Homeric epics; Greek philosophy; Temple worship; Oracle traditions.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Greek mythology, Olympic pantheon, heroic virtue (arete), divine justice, and mystery traditions.",
      whatToExpected: "Olympian wisdom on justice, fate, excellence, the relationship between gods and mortals, and the eternal questions of philosophy."
    },
    {
      id: "damon",
      name: "Damon",
      role: "Demon Figure",
      image: damonImage,
      description: "Occultism is not a religion but a body of esoteric practices using polytheistic, hermetic, and magical frameworks to attain spiritual or personal power.",
      denomination: "The Occult",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/poly-5",
      aiProfile: "Damon represents the shadowy paths of occult wisdom, guiding seekers through esoteric practices, hermetic philosophy, and the transformative work of alchemy and ceremonial magic. He challenges conventional morality and offers power through hidden knowledge.",
      trainingData: "Hermetic philosophy; Ceremonial magic; Alchemical transformation; Occult symbolism; Left-hand path; Goetic traditions; Shadow work; Esoteric practices; Personal power attainment.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore esoteric practices, hermetic philosophy, ceremonial magic, alchemical transformation, and the attainment of personal power through occult knowledge.",
      whatToExpected: "Challenging wisdom from the infernal realms on power, transformation, shadow work, and the hidden paths of esoteric mastery."
    },
    {
      id: "tawa-greywolf",
      name: "Tawa Greywolf",
      role: "Spiritual Guide",
      image: tawaGreywolfImage,
      description: "Elder indigenous wisdom keeper offering earth-based spirituality and ancestral healing open to all seekers.",
      denomination: "Indigenous",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/poly-3",
      aiProfile: "Tawa Greywolf is an elder indigenous wisdom keeper who guides seekers through earth-based spirituality, ancestral healing, and sacred ecology. He offers universal teachings on wisdom, ecological stewardship, community connection, and the deep reverence for nature that connects all living things.",
      trainingData: "Indigenous wisdom; Earth-based spirituality; Ancestral healing; Nature connection; Universal truth; Sacred ecology; Emotional healing; Community practices; Grounding techniques; Indigenous cosmology.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore indigenous wisdom, earth-based spirituality, ancestral healing, nature connection, ecological stewardship, emotional healing, and universal spiritual truths.",
      whatToExpected: "Grounding wisdom on earth connection, ancestral healing, ecological stewardship, emotional well-being, and the universal truths that unite all spiritual paths."
    }
  ]
};

// Agent Slider Component with Vertical Card Layout
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

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % agents.length);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

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
        <Card className="bg-white/70 backdrop-blur-xl border-[#9B7DAB]/30 border-2 hover:border-[#8A6C9C]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(155,125,171,0.12)] hover:shadow-[0_20px_50px_rgba(138,108,156,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3E5F5]/10 via-transparent to-[#9B7DAB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#9B7DAB]/20 group-hover:ring-[#8A6C9C]/40 shadow-[0_10px_40px_rgba(155,125,171,0.15)] group-hover:shadow-[0_20px_60px_rgba(138,108,156,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Lightning Bolt */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(155,125,171,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#9B7DAB25` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img src={polytheismCircleImage} alt="Polytheism" className="relative w-6 h-6 object-contain" />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#9B7DAB] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#9B7DAB]/15 hover:bg-[#9B7DAB]/25 text-[#9B7DAB] border border-[#9B7DAB]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] hover:from-[#8A6C9C] hover:to-[#9B7DAB] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(155,125,171,0.25)] hover:shadow-[0_8px_35px_rgba(138,108,156,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8A6C9C]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                <MessageCircle className="relative w-5 h-5 text-white" />
                <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#9B7DAB]/30 hover:border-[#8A6C9C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(155,125,171,0.1)] hover:shadow-[0_4px_20px_rgba(138,108,156,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F3E5F5]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#9B7DAB] group-hover/save:text-[#8A6C9C] transition-colors duration-300" />
                <span className="relative text-[#9B7DAB] group-hover/save:text-[#8A6C9C] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

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

      {/* Carousel Container */}
      <div 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {agents.map((agent, index) => renderAgentCard(agent, index))}
        </div>
      </div>

      {/* Dots Indicator */}
      {agents.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {agents.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }
              }}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === actualIndex
                  ? 'w-8 bg-[#6A1B9A]'
                  : 'w-2 bg-[#6A1B9A]/30 hover:bg-[#6A1B9A]/50'
              }`}
              aria-label={`Go to guide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Polytheism Faith Groups Component
interface PolytheismFaithGroupsProps {
  onNavigate?: (tab: string, params?: any) => void;
}

function PolytheismFaithGroups({ onNavigate }: PolytheismFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const polytheismGroup = faithGroups.find(g => g.id === 'polytheism-group');
  
  if (!polytheismGroup) return null;

  const handleGroupAction = () => {
    if (polytheismGroup.isJoined) {
      leaveGroup(polytheismGroup.id);
    } else {
      joinGroup(polytheismGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: polytheismGroup.id });
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="relative border-[#9B7DAB]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(155,125,171,0.15)] rounded-2xl sm:rounded-3xl">
          {/* Primrose Flowers Background - Continuous */}
          <div className="absolute inset-0 z-0">
            <img 
              src={primroseFlowersImage}
              alt="Flower background"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/50 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Area with Title */}
            <div className="relative h-48 sm:h-56 overflow-hidden flex flex-col sm:flex-row items-center justify-center py-6 sm:py-0">
              {/* Public Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-[#9B7DAB]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-white text-xs sm:text-sm font-medium">{polytheismGroup.type}</span>
              </div>
              
              {/* Lightning Bolt Icon */}
              <div className="sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#9B7DAB] to-[#8A6C9C] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 mb-3 sm:mb-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="18" textAnchor="middle" fill="white">⚡</text>
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="text-center px-6 sm:px-24">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>{polytheismGroup.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md max-w-md mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {polytheismGroup.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 bg-[rgba(255,249,249,0.29)]">

              {/* Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 -mt-8 sm:-mt-12">
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#9B7DAB] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{polytheismGroup.memberCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Members</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#9B7DAB] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{polytheismGroup.postCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Posts</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#9B7DAB] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Active</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Now</div>
                </div>
              </div>

              {/* Community Guidelines - Enhanced */}
              <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#9B7DAB]/20 shadow-lg">
                <h4 className="text-[#9B7DAB] text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  <div className="w-1.5 h-1.5 bg-[#9B7DAB] rounded-full"></div>
                  Community Guidelines
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {polytheismGroup.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                      <span className="text-[#9B7DAB] font-bold mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleGroupAction}
                  className={`flex-1 py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl ${
                    polytheismGroup.isJoined
                      ? 'bg-white/70 backdrop-blur-xl border-2 border-gray-300 hover:bg-gray-50/80 text-gray-900 shadow-lg'
                      : 'bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] hover:from-[#8A6C9C] hover:to-[#9B7DAB] text-white shadow-[0_4px_20px_rgba(155,125,171,0.4)] hover:shadow-[0_6px_30px_rgba(155,125,171,0.5)]'
                  } transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {polytheismGroup.isJoined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button
                  onClick={handleViewGroup}
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl border-2 border-[#9B7DAB] text-[#9B7DAB] hover:bg-[#9B7DAB] hover:text-white py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  View Group <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Interface
interface PolytheismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function PolytheismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: PolytheismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = polytheismConfig.agents[selectedAgentIndex];

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
      tradition: polytheismConfig.name,
      faithColor: polytheismConfig.primaryColor,
      avatar: agent.image || polytheismConfig.symbol,
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
    
    awardBadge({
      id: 'first-polytheism-guide-interaction',
      name: 'First Polytheism Guide Launched',
      description: 'Launched your first polytheistic deity guide',
      icon: Play,
      category: 'journey',
      rarity: 'common',
      tokenReward: 50
    });
    
    if (agent.chatUrl) {
      toast.success(`Opening ${agent.name} for a spiritual conversation...`);
      window.open(agent.chatUrl, '_blank');
    } else {
      toast.success(`Launching ${agent.name} for a spiritual conversation...`);
      onStartChat(agent);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundVideo 
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Polytheism-loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#9B7DAB]/30 hover:border-[#8A6C9C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(155,125,171,0.15)] hover:shadow-[0_6px_25px_rgba(138,108,156,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F3E5F5]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#8A6C9C] group-hover:text-[#9B7DAB] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#8A6C9C] group-hover:text-[#9B7DAB] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[9/16] sm:aspect-[3/4] lg:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(106,27,154,0.12)]"
              style={{
                minHeight: '500px',
                maxHeight: 'min(75vh, 700px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30" />
            </motion.div>

            {/* Enhanced Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Polytheism Symbol above title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative group">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#9B7DAB]/30 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                    
                    {/* Symbol container */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                      <img 
                        src={polytheismCircleImage} 
                        alt="Polytheism Symbol" 
                        className="w-full h-full object-contain opacity-30 filter brightness-110 saturate-75 blur-[0.5px] drop-shadow-[0_0_25px_rgba(155,125,171,0.25)] group-hover:opacity-40 transition-all duration-700"
                      />
                      
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#9B7DAB]/25 rounded-full"
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

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#9B7DAB] via-[#8A6C9C] to-[#B399C2] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(155,125,171,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {polytheismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(155,125,171,0.4)]" />
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {polytheismConfig.subtitle}
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
                agents={polytheismConfig.agents}
                faithColor="#9B7DAB"
                faithColorHover="#8A6C9C"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#9B7DAB]/30 hover:border-[#8A6C9C]/50 transition-all duration-500 shadow-[0_8px_30px_rgba(155,125,171,0.15)] rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9B7DAB]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#9B7DAB] via-[#8A6C9C] to-[#9B7DAB] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] mx-auto rounded-full shadow-[0_0_10px_rgba(155,125,171,0.6)]" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#9B7DAB] to-[#8A6C9C]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#8A6C9C] to-[#9B7DAB]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#9B7DAB] to-[#B399C2]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#9B7DAB]/30 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#8A6C9C]/50 transition-all duration-300 shadow-sm"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#9B7DAB] group-hover:text-[#8A6C9C] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#9B7DAB] via-[#8A6C9C] to-[#9B7DAB] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#9B7DAB] to-[#8A6C9C] mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(155,125,171,0.6)]" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the wisdom of gods, spirits, and divine figures
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {polytheismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 border-[#9B7DAB]/30 hover:border-[#8A6C9C]/60 transition-all duration-500 cursor-pointer group backdrop-blur-xl h-full p-6 rounded-2xl shadow-[0_4px_15px_rgba(155,125,171,0.1)] hover:shadow-[0_8px_25px_rgba(155,125,171,0.2)]"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9B7DAB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#9B7DAB] to-[#8A6C9C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#9B7DAB] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#9B7DAB]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#9B7DAB] transition-colors duration-200 cursor-pointer">
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
              <Card className="bg-white/70 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] rounded-3xl overflow-hidden relative">
                {/* Autumn Journey Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={autumnJourneyImage} 
                    alt="Autumn Journey"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#FFD369]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#6A1B9A] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#6A1B9A]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#4A148C]" },
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

                  {/* Latest Achievement */}
                  {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/40 border-2 border-white/50 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#9B7DAB] to-[#FFD369] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#9B7DAB] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
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

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <button 
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9B7DAB] via-[#B399C2] to-[#C5AED4] hover:from-[#8A6C9C] hover:via-[#9B7DAB] hover:to-[#B399C2] border-2 border-[#9B7DAB]/30 hover:border-[#9B7DAB]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(155,125,171,0.25)] hover:shadow-[0_8px_35px_rgba(138,108,156,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8A6C9C]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#9B7DAB]/30 hover:border-[#9B7DAB]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(155,125,171,0.15)] hover:shadow-[0_6px_25px_rgba(155,125,171,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#B399C2]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#9B7DAB] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Polytheism Faith Groups */}
        <PolytheismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#6A1B9A]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">
            AI Guide Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Have a spiritual conversation with {overlayAgentName} from the Polytheism tradition
          </DialogDescription>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#6A1B9A]/20 bg-[#0B1426]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6A1B9A] to-[#4A148C] flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl text-white" style={{ fontFamily: "Playfair Display, serif" }}>{overlayAgentName}</h3>
                <p className="text-sm text-slate-400" style={{ fontFamily: "Raleway, sans-serif" }}>Polytheism Guide</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseOverlay}
              className="h-10 w-10 rounded-full hover:bg-[#6A1B9A]/20 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Iframe Content */}
          <div className="relative flex-1 bg-white">
            {isIframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-10">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#6A1B9A] border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
                  <p className="text-slate-300">Loading conversation...</p>
                </div>
              </div>
            )}
            <iframe
              src={overlayUrl}
              className="w-full h-full"
              style={{ border: 'none', minHeight: 'calc(90vh - 80px)' }}
              title={`Chat with ${overlayAgentName}`}
              allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsIframeLoading(false)}
              loading="eager"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}