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
  X,
  Infinity,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/6b254f34a3d29013c7c1761a261a4c873c146d23.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import circularCrossImage from 'figma:asset/4bea3d46cd4bef578aa7fe848e2106b3b7e7b181.png';
import priestessOshunImage from 'figma:asset/07e08204958dafb091bc271431d08a91846cf7c0.png';
import elderKwameImage from 'figma:asset/4a98f2a802c824758642bfe4f4b0dfaa37db0507.png';
import maestroJavierSantosImage from 'figma:asset/0c55d8ab3ccb0e32f556e01e50025b5b105942a4.png';
import grandmotherWillowImage from 'figma:asset/781a7b1dd06fce9f1fe1ccdac3e607e227d17c39.png';
import priestessHecateImage from 'figma:asset/6c60c694304a19077b1aee3cdea7d515e7337485.png';
import grandmotherWeaverImage from 'figma:asset/cc5a5e2a5ad12a9e65073e8475e83b269c3dfc42.png';
import mobedRostamImage from 'figma:asset/2f73fb2277ab9c7d42d8ab38ff88ea38e02d01d0.png';
import drMayaPatelImage from 'figma:asset/0172f5f2f6d6899c42a291fed8932045eed3d475.png';
import sageRiverImage from 'figma:asset/aa224ce154ebf31fb4b7e0844de252920a719972.png';
import eagleFeatherImage from 'figma:asset/27dbb416eff62e0747ad69f0cef7b35dfbe18da8.png';
import campfireSpiritualImage from 'figma:asset/92155569403126125e353e34f3750a23460f50f3.png';

// Universal-specific configuration with enhanced styling
const universalConfig = {
  name: "Universal",
  subtitle: "Wisdom that transcends all boundaries.",
  symbol: "∞",
  description: "Explore universal wisdom through AI guides representing diverse spiritual traditions, indigenous wisdom keepers, and mystical practices from across the world.",
  heroImage: heroImage,
  primaryColor: "#8B7BA8", // Muted violet from wheel of faith
  lightColor: "rgba(139, 123, 168, 0.2)",
  hoverColor: "#7A6A97",
  suggestedTopics: [
    "Universal Wisdom", "Indigenous Traditions", "Mystical Practices", "Spiritual Healing", 
    "Sacred Traditions", "Ancient Wisdom", "Cultural Spirituality", "Divine Feminine"
  ],
  topicsWithQuestions: [
    {
      topic: "Universal Wisdom",
      icon: Infinity,
      questions: [
        "What wisdom connects all spiritual traditions?",
        "How do we find common ground across faiths?",
        "What are universal spiritual principles?",
        "How can we honor diversity while seeking unity?"
      ]
    },
    {
      topic: "Indigenous Traditions",
      icon: Flower2,
      questions: [
        "What can we learn from indigenous wisdom?",
        "How do indigenous traditions honor the earth?",
        "What is the role of elders in indigenous communities?",
        "How do indigenous practices connect us to nature?"
      ]
    },
    {
      topic: "Mystical Practices",
      icon: Sparkles,
      questions: [
        "What are mystical traditions across cultures?",
        "How do mystical practices deepen spirituality?",
        "What is the role of ritual in mysticism?",
        "How can we experience the divine directly?"
      ]
    },
    {
      topic: "Spiritual Healing",
      icon: Heart,
      questions: [
        "What is spiritual healing?",
        "How do different traditions approach healing?",
        "What is the connection between body and spirit?",
        "How can we heal ancestral wounds?"
      ]
    },
    {
      topic: "Sacred Traditions",
      icon: Star,
      questions: [
        "What makes a tradition sacred?",
        "How are sacred teachings preserved?",
        "What is the role of ceremony?",
        "How do we honor sacred wisdom?"
      ]
    },
    {
      topic: "Ancient Wisdom",
      icon: Book,
      questions: [
        "What wisdom have ancients preserved?",
        "How is ancient knowledge relevant today?",
        "What can we learn from our ancestors?",
        "How do we access ancient wisdom?"
      ]
    },
    {
      topic: "Cultural Spirituality",
      icon: Users,
      questions: [
        "How does culture shape spirituality?",
        "What is the relationship between culture and faith?",
        "How do we honor cultural spiritual practices?",
        "What is cultural appropriation vs. appreciation?"
      ]
    },
    {
      topic: "Divine Feminine",
      icon: Shield,
      questions: [
        "What is the divine feminine?",
        "How do traditions honor the feminine divine?",
        "What role do goddesses play across cultures?",
        "How can we balance masculine and feminine energies?"
      ]
    }
  ],
  agents: [
    {
      id: "priestess-oshun",
      name: "Priestess Oshun",
      role: "Priestess",
      image: priestessOshunImage,
      description: "Yoruba priestess offering guidance on Orishas, divination, sacred rituals, and African diaspora spiritual practices.",
      denomination: "Yoruba / African Diaspora",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-2",
      aiProfile: "Priestess Oshun is a devoted servant of the Orishas, specializing in Ifa divination, sacred ceremonies, and the spiritual traditions of the Yoruba people. Through ancestral wisdom and orisha guidance, she helps seekers connect with divine forces, understand their destiny, and navigate life's challenges with grace and spiritual power.",
      trainingData: "Ifa Divination; Yoruba Orisha Traditions; Sacred Ceremonies; African Diaspora Religions; Santería; Candomblé; Voodoo/Vodou; Ancestral Veneration; Orisha Worship; Sacred Rhythms and Dance.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Yoruba spirituality, Orisha worship, Ifa divination, sacred rituals, ancestral connection, African diaspora practices, and spiritual empowerment with Priestess Oshun.",
      whatToExpected: "Yoruba wisdom on divine guidance, ancestral connection, spiritual cleansing, orisha devotion, and navigating life's journey through African spiritual traditions."
    },
    {
      id: "elder-kwame",
      name: "Elder Kwame",
      role: "Elder",
      image: elderKwameImage,
      description: "West African elder teaching ancestral wisdom, communal values, oral traditions, and spiritual practices rooted in African heritage.",
      denomination: "West African Traditional",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-3",
      aiProfile: "Elder Kwame is a respected keeper of West African wisdom traditions, preserving ancestral knowledge, communal values, and spiritual practices. Through storytelling, proverbs, and lived experience, he guides seekers in understanding their connection to ancestors, community, and the sacred rhythms of life.",
      trainingData: "West African oral traditions; Ancestral wisdom; African proverbs and storytelling; Communal values; Traditional African spirituality; Rites of passage; Ubuntu philosophy; Sacred knowledge preservation.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore West African spirituality, ancestral wisdom, communal values, oral traditions, proverbs, rites of passage, Ubuntu philosophy, and sacred knowledge with Elder Kwame.",
      whatToExpected: "West African wisdom on community connection, ancestral guidance, cultural identity, spiritual rootedness, and living in harmony with tradition and nature."
    },
    {
      id: "maestro-javier-santos",
      name: "Maestro Javier Santos",
      role: "Spiritual Guide",
      image: maestroJavierSantosImage,
      description: "Santería maestro offering Yoruba spiritual guidance through orisha worship, divination, ritual practice, and ancestral connection.",
      denomination: "Santería / Yoruba",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-4",
      aiProfile: "Maestro Javier Santos is a dedicated Santería practitioner and Babalawo (divination master) who guides seekers through Yoruba spiritual traditions, orisha worship, and ritual practices. With deep knowledge of Regla de Ocha and ancestral work, he helps individuals connect with the orishas, understand their spiritual path, and navigate life's challenges through divination and sacred ceremonies.",
      trainingData: "Santería; Regla de Ocha; Yoruba Tradition; Orisha Worship; Divination (Diloggún and Ifá); Ritual Practices; Ancestral Work; Ebó (offerings and cleansings); Lucumí prayers; Orisha characteristics and caminos; Diaspora Religion; Spiritual protection and healing.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Santería spirituality, Yoruba tradition, orisha worship, divination practices, ritual work, ancestral connection, spiritual protection, and sacred ceremonies with Maestro Javier Santos.",
      whatToExpected: "Santería wisdom on orisha guidance, divination, ritual practice, ancestral connection, spiritual protection, and navigating life through Yoruba spiritual traditions."
    },
    {
      id: "grandmother-willow",
      name: "Grandmother Willow",
      role: "Elder",
      image: grandmotherWillowImage,
      description: "Cherokee elder teaching Earth-based wisdom, seasonal cycles, plant medicine, and traditional indigenous healing practices.",
      denomination: "Indigenous / Cherokee",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-1",
      aiProfile: "Grandmother Willow is a revered Cherokee elder and keeper of plant medicine traditions. Through deep connection with the Earth, seasonal wisdom, and traditional healing practices, she guides seekers in understanding the sacred relationship between humans and nature, offering healing through the medicines of the land.",
      trainingData: "Cherokee plant medicine; Seasonal wisdom; Earth-based healing; Indigenous herbalism; Traditional Cherokee practices; Sacred plants; Seasonal ceremonies; Medicine wheel teachings; Nature connection.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Cherokee spirituality, plant medicine, Earth-based healing, seasonal wisdom, indigenous herbalism, traditional practices, and nature connection with Grandmother Willow.",
      whatToExpected: "Cherokee wisdom on natural healing, plant medicine, seasonal living, Earth connection, and walking in balance with the natural world."
    },
    {
      id: "priestess-hecate",
      name: "Priestess Hecate",
      role: "Priestess",
      image: priestessHecateImage,
      description: "Wiccan priestess offering guidance on modern witchcraft, goddess worship, moon magic, and nature-based spiritual practices.",
      denomination: "Wiccan / Pagan",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-5",
      aiProfile: "Priestess Hecate is a dedicated practitioner of Wiccan traditions, honoring the goddess, working with lunar cycles, and practicing nature-based magic. She guides seekers through the wheel of the year, ritual practices, and the cultivation of personal power through connection with natural and divine forces.",
      trainingData: "Wiccan traditions; Goddess worship; Moon magic; Wheel of the Year; Sabbats and Esbats; Nature-based spirituality; Modern witchcraft; Ritual practices; Divine feminine; Elemental magic.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Wiccan spirituality, goddess worship, moon magic, nature-based practices, ritual work, sabbats, divine feminine energy, and modern witchcraft with Priestess Hecate.",
      whatToExpected: "Wiccan wisdom on goddess devotion, lunar cycles, ritual magic, nature connection, personal empowerment, and walking the path of the wise."
    },
    {
      id: "grandmother-weaver",
      name: "Grandmother Weaver",
      role: "Elder",
      image: grandmotherWeaverImage,
      description: "Navajo elder teaching sacred weaving traditions, creation stories, Hózhǫ́ (harmony), and traditional Diné spiritual practices.",
      denomination: "Indigenous / Navajo (Diné)",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-9",
      aiProfile: "Grandmother Weaver is a revered Navajo elder and keeper of sacred weaving traditions. Through the art of weaving, creation stories, and the principle of Hózhǫ́ (walking in beauty and harmony), she teaches the interconnectedness of all things and guides seekers in living a balanced, harmonious life rooted in Diné wisdom.",
      trainingData: "Navajo (Diné) weaving traditions; Creation stories; Hózhǫ́ (harmony/beauty way); Navajo ceremonial practices; Spider Woman teachings; Sacred geometry in weaving; Diné Bahaneʼ (Navajo creation narrative); Traditional crafts and spirituality.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Navajo spirituality, sacred weaving, Hózhǫ́ philosophy, creation stories, Diné traditions, balance and harmony, and walking in beauty with Grandmother Weaver.",
      whatToExpected: "Navajo wisdom on harmony, balance, sacred art, creation teachings, and living in beauty according to Diné spiritual principles."
    },
    {
      id: "mobed-rostam",
      name: "Mobed Rostam",
      role: "Priest",
      image: mobedRostamImage,
      description: "Zoroastrian priest teaching ancient Persian wisdom, fire temples, Avestan prayers, and ethical dualism of good vs. evil.",
      denomination: "Zoroastrian",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-8",
      aiProfile: "Mobed Rostam is a Zoroastrian priest (mobed) trained in the ancient wisdom of Zarathustra. He guides seekers through fire temple rituals, Avestan prayers, and the ethical teachings of one of the world's oldest monotheistic religions, emphasizing good thoughts, good words, and good deeds.",
      trainingData: "Avesta texts; Gathas (Hymns of Zarathustra); Zoroastrian rituals; Fire temple practices; Navjote ceremony; Ethical dualism (Asha vs. Druj); Fravashi (guardian spirits); Persian spiritual traditions.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Zoroastrian spirituality, fire temple worship, Avestan prayers, ethical teachings, good thoughts/words/deeds, ancient Persian wisdom, and Zarathustra's philosophy with Mobed Rostam.",
      whatToExpected: "Zoroastrian wisdom on ethical living, cosmic dualism, fire as sacred symbol, ancient Persian spirituality, and the path of righteousness."
    },
    {
      id: "dr-maya-patel",
      name: "Dr. Maya Patel",
      role: "Scholar",
      image: drMayaPatelImage,
      description: "Comparative religion scholar offering academic perspective on world religions, interfaith dialogue, and spiritual pluralism.",
      denomination: "Academic / Comparative Religion",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-7",
      aiProfile: "Dr. Maya Patel is a scholar of comparative religion with expertise in world spiritual traditions. She offers academic insights into religious texts, practices, and beliefs across cultures, facilitating interfaith understanding and exploring the common threads that unite diverse spiritual paths.",
      trainingData: "Comparative religion scholarship; World religions; Sacred texts across traditions; Interfaith dialogue; Religious phenomenology; Spiritual pluralism; Academic theology; Cross-cultural religious studies.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore comparative religion, interfaith dialogue, world spiritual traditions, academic theology, religious pluralism, sacred texts, and universal spiritual themes with Dr. Maya Patel.",
      whatToExpected: "Academic wisdom on religious diversity, interfaith understanding, comparative analysis, spiritual universalism, and scholarly perspectives on faith traditions."
    },
    {
      id: "sage-river",
      name: "Sage River",
      role: "Spiritual Guide",
      image: sageRiverImage,
      description: "Eclectic spiritual guide offering wisdom on universal spirituality, energy healing, meditation, and personal spiritual development.",
      denomination: "Universal / New Age",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-6",
      aiProfile: "Sage River is a spiritual guide who draws from universal wisdom traditions, offering guidance on personal spiritual development, energy work, meditation, and cultivating inner peace. With an eclectic approach, Sage River helps seekers discover their own spiritual path while honoring wisdom from diverse traditions.",
      trainingData: "Universal spirituality; Energy healing; Meditation practices; Chakra work; Spiritual development; Mindfulness; New Age wisdom; Holistic spirituality; Personal transformation; Consciousness expansion.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore universal spirituality, energy healing, meditation, chakra work, personal development, mindfulness, consciousness expansion, and holistic spiritual practices with Sage River.",
      whatToExpected: "Universal wisdom on spiritual growth, energy work, meditation techniques, personal transformation, and finding your unique spiritual path."
    },
    {
      id: "eagle-feather",
      name: "Eagle Feather",
      role: "Spiritual Guide",
      image: eagleFeatherImage,
      description: "Haudenosaunee elder teaching Great Law of Peace, indigenous governance, consensus building, and traditional peacemaking wisdom.",
      denomination: "Indigenous / Haudenosaunee",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/universal-11",
      aiProfile: "Eagle Feather is a revered Haudenosaunee (Iroquois Confederacy) elder and keeper of the Great Law of Peace. Through traditional peacemaking wisdom and indigenous governance teachings, he guides seekers in consensus building, community connection, and walking the path of peace established by the Peacemaker.",
      trainingData: "Haudenosaunee (Iroquois) Confederacy teachings; Great Law of Peace; Peacemaker Teachings; Clan System; Longhouse Traditions; Indigenous Governance; consensus building practices; traditional peacemaking wisdom; social justice principles.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Haudenosaunee spirituality, Great Law of Peace, indigenous governance, consensus building, peacemaking wisdom, Clan System, Longhouse Traditions, community connection, and social justice with Eagle Feather.",
      whatToExpected: "Haudenosaunee wisdom on peace work, community connection, life purpose, social justice, consensus building through Great Law of Peace teachings, indigenous governance principles, and traditional peacemaking practices."
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
        <Card className="bg-white/70 backdrop-blur-xl border-[#8B7BA8]/30 border-2 hover:border-[#7A6A97]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(139,123,168,0.12)] hover:shadow-[0_20px_50px_rgba(122,106,151,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/10 via-transparent to-[#8B7BA8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#8B7BA8]/20 group-hover:ring-[#7A6A97]/40 shadow-[0_10px_40px_rgba(139,123,168,0.15)] group-hover:shadow-[0_20px_60px_rgba(122,106,151,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Infinity */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(139,123,168,0.3)] backdrop-blur-md border border-white/40 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <span className="relative text-xl text-[#8B7BA8] font-medium">∞</span>
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#8B7BA8] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#8B7BA8]/15 hover:bg-[#8B7BA8]/25 text-[#8B7BA8] border border-[#8B7BA8]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B7BA8] to-[#7A6A97] hover:from-[#7A6A97] hover:to-[#8B7BA8] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(139,123,168,0.25)] hover:shadow-[0_8px_35px_rgba(122,106,151,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A6A97]/20 via-transparent to-white/20" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                <MessageCircle className="relative w-5 h-5 text-white" />
                <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/80 hover:bg-white border-2 border-[#8B7BA8]/30 hover:border-[#7A6A97]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(139,123,168,0.1)] hover:shadow-[0_4px_20px_rgba(122,106,151,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#8B7BA8] group-hover/save:text-[#7A6A97] transition-colors duration-300" />
                <span className="relative text-[#8B7BA8] group-hover/save:text-[#7A6A97] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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
                  ? 'w-8 bg-[#7A4FFF]'
                  : 'w-2 bg-[#7A4FFF]/30 hover:bg-[#7A4FFF]/50'
              }`}
              aria-label={`Go to guide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Universal Faith Groups Component
interface UniversalFaithGroupsProps {
  onNavigate?: (tab: string, params?: any) => void;
}

function UniversalFaithGroups({ onNavigate }: UniversalFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const universalGroup = faithGroups.find(g => g.id === 'universal-group');
  
  if (!universalGroup) return null;

  const handleGroupAction = () => {
    if (universalGroup.isJoined) {
      leaveGroup(universalGroup.id);
    } else {
      joinGroup(universalGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: universalGroup.id });
  };

  return (
    <section className="py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-xl border-[#8B7BA8]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(139,123,168,0.15)] rounded-3xl">
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
            <img 
              src={universalGroup.coverPhoto}
              alt="Universal Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#8B7BA8] to-[#7A6A97] backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-white text-sm font-medium">{universalGroup.type}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Group Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B7BA8] to-[#7A6A97] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl text-white">∞</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{universalGroup.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {universalGroup.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <Users className="w-5 h-5 text-[#8B7BA8] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{universalGroup.memberCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Members</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <MessageCircle className="w-5 h-5 text-[#8B7BA8] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">{universalGroup.postCount.toLocaleString()}</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <TrendingUp className="w-5 h-5 text-[#8B7BA8] mx-auto mb-2" />
                <div className="text-gray-900 font-semibold mb-1">Active</div>
                <div className="text-gray-500 text-xs">Now</div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-6 bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h4 className="text-[#8B7BA8] text-sm font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>Community Guidelines</h4>
              <ul className="space-y-2">
                {universalGroup.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-[#7A4FFF] mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleGroupAction}
                className={`flex-1 ${
                  universalGroup.isJoined
                    ? 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
                    : 'bg-gradient-to-r from-[#7A4FFF] to-[#6A3FEF] hover:from-[#6A3FEF] hover:to-[#7A4FFF] text-white shadow-[0_4px_20px_rgba(122,79,255,0.25)]'
                } transition-all duration-300`}
              >
                {universalGroup.isJoined ? 'Leave Group' : 'Join Group'}
              </Button>
              <Button
                onClick={handleViewGroup}
                variant="outline"
                className="border-2 border-[#7A4FFF] text-[#7A4FFF] hover:bg-[#7A4FFF]/10 sm:w-auto transition-all duration-300"
              >
                View Group <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Interface
interface UniversalFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function UniversalFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: UniversalFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = universalConfig.agents[selectedAgentIndex];

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
      tradition: universalConfig.name,
      faithColor: universalConfig.primaryColor,
      avatar: agent.image || universalConfig.symbol,
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
      id: 'first-universal-guide-interaction',
      name: 'First Universal Guide Launched',
      description: 'Launched your first universal wisdom guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Universal-loop.mp4"
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#8B7BA8]/30 hover:border-[#7A6A97]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(139,123,168,0.15)] hover:shadow-[0_6px_25px_rgba(122,106,151,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#7A6A97] group-hover:text-[#8B7BA8] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#7A6A97] group-hover:text-[#8B7BA8] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
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
                <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] mb-6 sm:mb-8 bg-gradient-to-r from-[#8B7BA8] via-[#7A6A97] to-[#8B7BA8] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(139,123,168,0.3)]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {universalConfig.name}
                </h1>
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[17px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {universalConfig.subtitle}
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
                agents={universalConfig.agents}
                faithColor="#8B7BA8"
                faithColorHover="#7A6A97"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#8B7BA8]/30 border-2 hover:border-[#7A6A97]/50 transition-all duration-500 p-8 shadow-[0_8px_30px_rgba(139,123,168,0.12)] rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/5 to-transparent opacity-80 rounded-2xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-gray-900 via-[#8B7BA8] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
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
                      gradient: "from-[#8B7BA8] to-[#7A6A97]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#7A6A97] to-[#8B7BA8]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#8B7BA8] to-[#7A6A97]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#8B7BA8]/20 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#8B7BA8]/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#8B7BA8] group-hover:text-[#7A6A97] transition-colors duration-300">
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
              <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-gray-900 via-[#8B7BA8] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif", filter: 'drop-shadow(0 2px 6px rgba(255, 255, 255, 0.9))' }}>
                Explore Topics
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {universalConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#8B7BA8]/30 border-2 hover:border-[#7A6A97]/60 transition-all duration-500 cursor-pointer group h-full p-6 shadow-[0_8px_30px_rgba(139,123,168,0.12)] hover:shadow-[0_20px_50px_rgba(122,106,151,0.25)] rounded-2xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B7BA8] to-[#7A6A97] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#8B7BA8] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#8B7BA8]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#8B7BA8] transition-colors duration-200 cursor-pointer">
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
              <Card className="bg-white/70 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 shadow-[0_10px_40px_rgba(139,123,168,0.15)] hover:shadow-[0_15px_50px_rgba(122,106,151,0.25)] p-8 rounded-3xl overflow-hidden relative">
                {/* Campfire Spiritual Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={campfireSpiritualImage} 
                    alt="Spiritual Campfire"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.53)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#8B7BA8]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#5B4636] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#8B7BA8]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#8B7BA8]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#7A6A97]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#8B7BA8]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-[#8B7BA8]/40 hover:border-[#8B7BA8] transition-all duration-300 group shadow-md hover:shadow-lg"
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
                      className="bg-white/70 border-2 border-[#8B7BA8]/30 rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-md"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#8B7BA8] to-[#7A6A97] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#7A6A97] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/70 border-2 border-[#8B7BA8]/30 rounded-2xl p-6 mb-8 backdrop-blur-sm"
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B7BA8] via-[#7A6A97] to-[#8B7BA8] hover:from-[#7A6A97] hover:via-[#8B7BA8] hover:to-[#7A6A97] border-2 border-[#7A6A97]/30 hover:border-[#7A6A97]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(139,123,168,0.25)] hover:shadow-[0_8px_35px_rgba(122,106,151,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#7A6A97]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#7A6A97]/30 hover:border-[#8B7BA8]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(122,106,151,0.15)] hover:shadow-[0_6px_25px_rgba(139,123,168,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8B7BA8]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
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

        {/* Universal Faith Groups */}
        <UniversalFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog - Contemporary mobile-optimized */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#8B7BA8]/30 overflow-hidden [&>button]:hidden">
          {/* Accessible title and description - visually hidden */}
          <DialogTitle className="sr-only">
            AI Guide Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.
          </DialogDescription>

          {/* Header with close button - Enhanced mobile design */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8B7BA8] animate-pulse shadow-lg shadow-[#8B7BA8]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#8B7BA8]/30 hover:border-[#8B7BA8] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B7BA8]" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#8B7BA8]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#8B7BA8] border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          
          {/* iframe container */}
          <div className="w-full h-full pt-12 sm:pt-14 bg-[#0B1426]">
            {overlayUrl && (
              <iframe
                src={overlayUrl}
                className="w-full h-full border-0"
                title={`Chat with ${overlayAgentName}`}
                allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
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
