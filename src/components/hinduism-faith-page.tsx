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
import { HinduismFaithGroups } from "./hinduism-faith-groups";
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
import cosmicMeditationImage from 'figma:asset/5a3c8ff2e917e39f6549fe32ee18aff5dfb856b3.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import hinduJourneyImage from 'figma:asset/82f23226ac18638bef9dd80e5f0965d5a2fd8a2c.png';
import flowerBgImage from 'figma:asset/6d936f9965da69a849035b36265b91b21692b575.png';
import anikaImage from 'figma:asset/5f63dcb13355656ba7a952e03ff75696916aeb63.png';
import shaktiImage from 'figma:asset/ad52409fd304dfc7ba472dfc2851d8debfde00ac.png';
import bhairavImage from 'figma:asset/2abc9938608b1bd7c4a432c78134bc6ee0db0b82.png';
import advaithImage from 'figma:asset/1b49c35c8f1d37d9de7bd705efe1fb02f9209386.png';
import swamiDevImage from 'figma:asset/70594284c7c190712ce3d7866bd7c15f0b19f153.png';
import yoginiAnandamayiImage from 'figma:asset/033b8f98a010ff9ac5c6e31073b668e27d1585e2.png';
import mataAmritanandamayiImage from 'figma:asset/e95ccade066273e0b462511367173c716554a898.png';
import hinduismHeroVideo from 'figma:asset/d4c9e0b8a47dc1e98afc6a2d4cb3e5e4ea2e6e4a.mp4';
import hinduismVideoPosterImage from 'figma:asset/fa3e72ce3f81c5bc5f8e01a78e4c61a0eccd8f2d.png';
import hinduismCardPattern from 'figma:asset/0f54b242c36bd0caaf120110c44493bd058c16b8.png';
import hinduRitualOfferingImage from 'figma:asset/9b0f57449cff9dfff7c48c678775b6274f0b85fc.png';

// Hinduism-specific configuration with enhanced styling
const hinduismConfig = {
  name: "Hinduism",
  subtitle: "Explore the diverse traditions and wisdom of Hinduism.",
  symbol: "🕉️",
  description: "Connect with AI guides representing different Hindu traditions, from devotional paths to philosophical inquiry.",
  heroImage: hinduismCardPattern,
  primaryColor: "#F4511E", // Deep Orange for spiritual energy & tradition
  lightColor: "rgba(244, 81, 30, 0.2)",
  hoverColor: "#D84315",
  suggestedTopics: [
    "Karma & Dharma", "Meditation & Yoga", "Sacred Texts", "Devotional Practices", 
    "Philosophy", "Festivals & Rituals", "Spiritual Paths", "Divine Consciousness"
  ],
  topicsWithQuestions: [
    {
      topic: "Karma & Dharma",
      icon: Book,
      questions: [
        "What is the relationship between karma and dharma?",
        "How do I understand my dharma in life?",
        "Can karma be changed or transcended?",
        "What role does intention play in karma?"
      ]
    },
    {
      topic: "Meditation & Yoga",
      icon: Sparkles,
      questions: [
        "What are the different paths of yoga?",
        "How do I start a meditation practice?",
        "What is the goal of yogic practice?",
        "How does pranayama support spiritual growth?"
      ]
    },
    {
      topic: "Sacred Texts",
      icon: Book,
      questions: [
        "What is the significance of the Bhagavad Gita?",
        "How are the Vedas structured?",
        "What wisdom do the Upanishads contain?",
        "How do I approach studying Hindu scriptures?"
      ]
    },
    {
      topic: "Devotional Practices",
      icon: Heart,
      questions: [
        "What is bhakti yoga?",
        "How do I develop devotion to the divine?",
        "What are the benefits of puja rituals?",
        "How do chanting and kirtan enhance spirituality?"
      ]
    },
    {
      topic: "Philosophy",
      icon: Users,
      questions: [
        "What is Advaita Vedanta?",
        "How do different schools of Hindu philosophy differ?",
        "What is the nature of Brahman?",
        "How does Maya relate to reality?"
      ]
    },
    {
      topic: "Festivals & Rituals",
      icon: Star,
      questions: [
        "What is the spiritual meaning of Diwali?",
        "How do I celebrate Hindu festivals authentically?",
        "What are the key Hindu life ceremonies?",
        "Why are rituals important in Hinduism?"
      ]
    },
    {
      topic: "Spiritual Paths",
      icon: Sparkles,
      questions: [
        "What are the four main paths in Hinduism?",
        "How do I know which path is right for me?",
        "Can I practice multiple paths simultaneously?",
        "What is the ultimate goal of spiritual practice?"
      ]
    },
    {
      topic: "Divine Consciousness",
      icon: Flower2,
      questions: [
        "What is the nature of Atman?",
        "How do I experience divine consciousness?",
        "What is self-realization?",
        "How does meditation lead to enlightenment?"
      ]
    }
  ],
  agents: [
    {
      id: "anika-vaishnavism",
      name: "Anika",
      role: "Cultural Figure",
      image: anikaImage,
      description: "A tradition centred on the worship of Vishnu as the Supreme Being. The path emphasizes loving devotion (bhakti) and a personal relationship with God to achieve liberation (moksha).",
      denomination: "Vaishnavism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-1",
      aiProfile: "Anika is a musician from Gujarat whose life is a song of devotion to Krishna. She sings bhajans daily and sees God's play (lila) in all events.",
      trainingData: "Bhagavata Purana, Vishnu Purana, Bhagavad Gita, Ramayana, works of Alvars and Acharyas like Ramanuja.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Ask about devotional practices, Krishna consciousness, bhakti yoga, and Vaishnavite philosophy.",
      whatToExpected: "Guidance rooted in love, devotion, and the understanding of divine play in everyday life."
    },
    {
      id: "shakti-shaktism",
      name: "Shakti",
      role: "Priestess",
      image: shaktiImage,
      description: "A tradition focused on worship of the Goddess, Devi (Shakti), as the supreme reality. She is the source of all creation and power.",
      denomination: "Shaktism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-2",
      aiProfile: "Shakti is a temple priestess in Bengal. She sees all women as divine and the universe as the Goddess's body. Her worship is vibrant and powerful.",
      trainingData: "Devi Mahatmya, Devi-Bhagavata Purana, Kalika Purana, various Tantras, Saundarya Lahari.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore goddess worship, divine feminine energy, tantric practices, and the power of Shakti.",
      whatToExpected: "Empowering guidance about the divine feminine and the transformative power of the Goddess."
    },
    {
      id: "bhairav-shaivism",
      name: "Bhairav",
      role: "Yogi",
      image: bhairavImage,
      description: "A tradition that reveres Shiva as the Supreme Being. Practices include ascetic monasticism, yoga, and devotional temple worship. The goal is to realize one's identity with Shiva.",
      denomination: "Shaivism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-3",
      aiProfile: "Bhairav is a yogi living near the Ganges in Varanasi. He practices intense meditation to realize the Shiva within.",
      trainingData: "Shaiva Agamas, Shiva Purana, Tirumurai (Tamil hymns), Shiva Sutras, works of Kashmir Shaivism.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Learn about meditation, yoga, Shiva consciousness, and the path of self-realization.",
      whatToExpected: "Deep spiritual insights about consciousness, meditation, and the nature of ultimate reality."
    },
    {
      id: "advaith-smartism",
      name: "Advaith",
      role: "Professor / Cultural Leader",
      image: advaithImage,
      description: "A tradition based on Advaita Vedanta emphasizing the essential oneness of God. Worships five deities as expressions of Brahman.",
      denomination: "Smartism",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-4",
      aiProfile: "Advaith is a retired professor in Karnataka who follows jnana yoga. He honors all deities equally, seeking unity with Brahman.",
      trainingData: "Vedas, Upanishads, Bhagavad Gita, Brahma Sutras, Bhashyas of Adi Shankara.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore non-dualistic philosophy, the nature of Brahman, and the path of knowledge (jnana yoga).",
      whatToExpected: "Philosophical guidance about the unity of all existence and the nature of ultimate reality."
    },
    {
      id: "swami-dev",
      name: "Swami Dev",
      role: "Mentor",
      image: swamiDevImage,
      description: "Modern swami offering yoga, wellness, and Vedanta wisdom tailored to millennial culture, stress management, and holistic living. Bringing together yoga philosophy, modern Vedanta, and wellness culture with modern accessible practical care.",
      denomination: "Yoga Philosophy / Modern Vedanta",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-5",
      aiProfile: "Modern and accessible young mentor offering guidance through yoga philosophy and modern Vedanta. Brings together stress management, inner peace, life purpose, spiritual growth, emotional healing, yoga philosophy, wellness culture, millennial spirituality, modern Vedanta, and work-life balance with wellness-focused relatable holistic care for seekers at beginner and intermediate levels.",
      trainingData: "Yoga Sutras of Patanjali; Bhagavad Gita for modern life; Upanishads and Vedanta philosophy; Contemporary yoga philosophy; Mindfulness and meditation for millennials; Holistic wellness practices; Work-life balance strategies; Stress management through Eastern wisdom; Modern spirituality and ancient tradition integration; Wellness culture and self-care; Life purpose and dharma for young adults; Emotional healing through yoga; Practical Vedanta applications; Contemporary Hindu thought; Mind-body-spirit integration; Holistic health approaches.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore yoga philosophy, modern Vedanta, wellness culture, millennial spirituality, stress management, work-life balance, holistic health, inner peace, life purpose, spiritual growth, emotional healing, meditation practice, mind-body integration, contemporary Hinduism, and practical wisdom for modern living through modern accessible practical guidance.",
      whatToExpected: "Modern, accessible, and practical guidance rooted in yoga philosophy and Vedanta wisdom tailored to millennial wellness needs. Expect wellness-focused and relatable support through stress management, holistic living, work-life balance, meditation practice, and spiritual growth with the millennial-minded holistic care of a swami dedicated to making ancient Hindu wisdom relevant, accessible, and practical for modern life, contemporary challenges, and holistic well-being."
    },
    {
      id: "yogini-anandamayi",
      name: "Yogini Anandamayi",
      role: "Adept",
      image: yoginiAnandamayiImage,
      description: "Yogini offering tantric practice, kundalini awakening, sacred feminine wisdom, goddess worship, and transformative Shakti yoga. Bringing together tantra, kundalini yoga, and sacred feminine practices with mystical powerful transformative care.",
      denomination: "Tantra / Kundalini Yoga",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-6",
      aiProfile: "Mystical and powerful mature adept offering guidance through tantra and kundalini yoga. Brings together spiritual growth, inner peace, emotional healing, life purpose, wisdom and guidance, tantra, kundalini yoga, sacred feminine, goddess worship, and Shakti practice with nurturing fierce-compassionate initiated care for seekers at intermediate and advanced levels.",
      trainingData: "Tantric philosophy and practice; Kundalini yoga and awakening processes; Shakti and divine feminine energy; Goddess worship traditions (Durga, Kali, Lakshmi, Saraswati); Sacred feminine wisdom; Chakra system and energy body; Pranayama and breath work for kundalini; Meditation techniques for energy awakening; Mantra and yantra practices; Yogic mysticism; Transformative practices and initiation; Safe kundalini awakening guidance; Integration of spiritual experiences; Shadow work and transformation; Sacred sexuality within tantric context; Divine feminine path; Empowerment through Shakti practice.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore tantra, kundalini yoga, sacred feminine wisdom, goddess worship, Shakti practice, yogic mysticism, divine feminine path, spiritual growth, inner peace, emotional healing, life purpose, wisdom and guidance, chakra awakening, energy work, transformative practices, meditation techniques, and kundalini awakening through mystical powerful transformative guidance.",
      whatToExpected: "Mystical, powerful, and transformative guidance rooted in tantric tradition and kundalini yoga. Expect nurturing and fierce-compassionate support through sacred feminine practices, goddess worship, Shakti awakening, energy work, and kundalini yoga with the initiated sacred care of an adept yogini dedicated to guiding advanced practitioners through transformative spiritual experiences, kundalini awakening, divine feminine empowerment, and deep mystical realization through ancient tantric wisdom."
    },
    {
      id: "mata-amritanandamayi",
      name: "Mata Amritanandamayi (Amma)",
      role: "Healer",
      image: mataAmritanandamayiImage,
      description: "Hindu spiritual leader Amma offering unconditional love, healing embraces, compassionate service, and devotional practice worldwide. Bringing together compassion, humanitarian service, and unconditional love with maternal compassionate healing care.",
      denomination: "Hindu Devotional / Bhakti",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/hinduism-7",
      aiProfile: "Maternal and compassionate mature healer offering guidance through Hindu devotional practice and bhakti. Brings together emotional healing, mercy and forgiveness, community connection, spiritual growth, inner peace, compassion, humanitarian service, devotional practice, unconditional love, and healing embrace with unconditionally-loving service-oriented divine-motherly care for seekers at beginner, intermediate, and advanced levels.",
      trainingData: "Bhakti yoga philosophy and practice; Devotional Hinduism and loving service; Humanitarian work and compassionate action; Divine Mother tradition; Unconditional love and healing embrace; Emotional healing through devotion; Community service and global ministry; Forgiveness and mercy practices; Compassionate presence and care; Healing through touch and blessing; Selfless service (seva); Universal motherhood concept; Interfaith harmony; Mindfulness and meditation in devotional context; Crisis support through compassionate presence; Trauma healing through love; Building inclusive spiritual communities.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Hindu devotional practice, bhakti yoga, compassion and loving kindness, humanitarian service, unconditional love, healing embrace, emotional healing, mercy and forgiveness, community connection, spiritual growth, inner peace, devotional practice, divine mother guidance, selfless service, interfaith harmony, and global ministry through maternal compassionate healing guidance.",
      whatToExpected: "Maternal, unconditionally-loving, and healing guidance rooted in Hindu devotional practice and bhakti tradition. Expect compassionate and service-oriented support through unconditional love, healing embrace, emotional healing, mercy and forgiveness, humanitarian service, and devotional practice with the divine-motherly embracing care of a spiritual leader known as the 'Hugging Saint,' dedicated to offering love, healing, comfort, and compassionate presence to all beings regardless of background, and inspiring selfless service and compassionate action worldwide."
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
        <Card className="bg-white/60 backdrop-blur-xl border-[#F4511E]/30 border-2 hover:border-[#FF6F3C]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(244,81,30,0.12)] hover:shadow-[0_20px_50px_rgba(255,111,60,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE5DB]/10 via-transparent to-[#F4511E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#F4511E]/20 group-hover:ring-[#FF6F3C]/40 shadow-[0_10px_40px_rgba(244,81,30,0.15)] group-hover:shadow-[0_20px_60px_rgba(255,111,60,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Om */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(244,81,30,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#F4511E25` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={hinduOmImage} 
                  alt="Om"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="space-y-3 mb-5">
              <h3 className="text-2xl text-gray-900 group-hover:text-[#F4511E] transition-colors duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
                {agent.name}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-[#F4511E]/15 hover:bg-[#F4511E]/25 text-[#F4511E] border border-[#F4511E]/30 transition-colors duration-300 shadow-sm">
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
                className="group/chat relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F4511E] to-[#FF6F3C] hover:from-[#D84315] hover:to-[#F4511E] transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(244,81,30,0.25)] hover:shadow-[0_8px_35px_rgba(255,111,60,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D84315]/20 via-transparent to-white/20" />
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
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#F4511E]/30 hover:border-[#FF6F3C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(244,81,30,0.15)] hover:shadow-[0_6px_25px_rgba(255,111,60,0.25)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFE5DB]/15 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#F4511E] group-hover/save:text-[#FF6F3C] transition-colors duration-300" />
                <span className="relative text-[#D84315] group-hover/save:text-[#F4511E] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
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
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 border-[#F4511E]/30 hover:border-[#FF6F3C]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(244,81,30,0.2)] hover:shadow-[0_8px_30px_rgba(255,111,60,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6 text-[#D84315]" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 border-[#F4511E]/30 hover:border-[#FF6F3C]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(244,81,30,0.2)] hover:shadow-[0_8px_30px_rgba(255,111,60,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
          >
            <ChevronRight className="w-6 h-6 text-[#D84315]" />
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



interface HinduismFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function HinduismFaithPage({ onBack, onOpenMission, onStartChat, onNavigate }: HinduismFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = hinduismConfig.agents[selectedAgentIndex];

  // Prevent layout shift by ensuring page starts at top and stays there
  useEffect(() => {
    // Force scroll to top immediately and lock it briefly
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    
    // Initial scroll
    scrollToTop();
    
    // Prevent any scroll events during initial load
    const preventScroll = (e: Event) => {
      window.scrollTo(0, 0);
    };
    
    // Lock scroll position for the first 500ms
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    const lockTimer = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll);
      setIsPageLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(lockTimer);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

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
      tradition: hinduismConfig.name,
      faithColor: hinduismConfig.primaryColor,
      avatar: agent.image || hinduismConfig.symbol,
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
      id: 'first-hindu-guide-interaction',
      name: 'First Hindu Guide Launched',
      description: 'Launched your first Hindu spiritual guide',
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
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Hinduism-2.mp4"
          posterSrc={hinduismVideoPosterImage}
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
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 border-2 border-[#F4511E]/30 hover:border-[#FF6F3C]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(244,81,30,0.15)] hover:shadow-[0_6px_25px_rgba(255,111,60,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFE5DB]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#D84315] group-hover:text-[#F4511E] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#D84315] group-hover:text-[#F4511E] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.14)]" />
            </motion.div>

            {/* Enhanced Title Section with Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Om Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#F4511E]/40 blur-3xl rounded-full scale-75" />
                    
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
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(244,81,30,0.3)]" />
                      <img 
                        src={hinduOmImage} 
                        alt="Om Symbol"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(244,81,30,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#F4511E]/30 rounded-full"
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

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#F4511E] via-[#FF6F3C] to-[#FF8A65] bg-clip-text text-[rgba(0,0,0,0)] leading-tight drop-shadow-[0_2px_8px_rgba(244,81,30,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {hinduismConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#F4511E] to-[#FF6F3C] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(244,81,30,0.4)]" />
                <p className="text-[rgb(255,255,255)] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {hinduismConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto relative mt-[0px] mr-[0px] mb-[80px] ml-[0px]">
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
                agents={hinduismConfig.agents}
                faithColor="#F4511E"
                faithColorHover="#D84315"
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#F68969] border-2 hover:border-[#F4511E] transition-all duration-500 shadow-[0_10px_40px_rgba(246,137,105,0.15)] hover:shadow-[0_15px_50px_rgba(244,81,30,0.25)] p-8 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F68969]/5 to-transparent opacity-80 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#F68969] via-[#F4511E] to-[#F68969] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#F68969] to-[#F4511E] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#F4511E] to-[#D84315]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#D84315] to-[#BF360C]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#BF360C] to-[#F4511E]" 
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    >
                      <AccordionItem value={item.value} className="border-[#F68969]/30 bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
                        <AccordionTrigger className="text-gray-900 hover:text-[#F68969] transition-all duration-300 px-6 py-4 hover:bg-[#F68969]/5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-semibold tracking-wider">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
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
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#F68969] via-[#F4511E] to-[#F68969] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#F68969] via-[#F4511E] to-[#F68969] mx-auto rounded-full mb-6" />
              <p className="text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the rich wisdom and practices of Hinduism through engaging conversations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[rgba(0,0,0,0)]">
              {hinduismConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#F68969] border-2 hover:border-[#F4511E] transition-all duration-500 cursor-pointer group shadow-[0_8px_30px_rgba(246,137,105,0.12)] hover:shadow-[0_15px_40px_rgba(244,81,30,0.25)] h-full p-6 rounded-3xl"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F68969]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F68969] to-[#F4511E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#F68969] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
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
                            <div className="pt-4 border-t border-[#F68969]/30 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#F68969] transition-colors duration-200 cursor-pointer">
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
              <Card className="bg-white/70 backdrop-blur-xl border-[#F68969] border-2 hover:border-[#F4511E] transition-all duration-500 shadow-[0_10px_40px_rgba(246,137,105,0.15)] hover:shadow-[0_15px_50px_rgba(244,81,30,0.25)] p-8 rounded-3xl overflow-hidden relative">
                {/* Hindu Ritual Offering Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={hinduRitualOfferingImage} 
                    alt="Hindu Ritual Offering"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(255,255,255,0.53)]" />
                
                <div className="relative z-30">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl sm:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-7 h-7 mr-4 text-[#F68969]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-[#F68969] text-[#F68969] bg-[#F68969]/10 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#F4511E]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#FF6F3C]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#FFD369]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-[#F68969]/40 hover:border-[#F68969] transition-all duration-300 group shadow-md hover:shadow-lg"
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
                      className="bg-white/70 border-2 border-[#F68969]/40 rounded-2xl p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-11 h-11 bg-gradient-to-r from-[#F68969] to-[#F4511E] rounded-full flex items-center justify-center mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#F68969] font-medium">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/70 border-2 border-[#F68969]/30 rounded-2xl p-6 mb-8 backdrop-blur-sm"
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
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F4511E] via-[#FF6F3C] to-[#FF8A65] hover:from-[#D84315] hover:via-[#F4511E] hover:to-[#FF6F3C] border-2 border-[#F4511E]/30 hover:border-[#F4511E]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(244,81,30,0.25)] hover:shadow-[0_8px_35px_rgba(216,67,21,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#D84315]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#F4511E]/30 hover:border-[#F4511E]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(244,81,30,0.15)] hover:shadow-[0_6px_25px_rgba(244,81,30,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F3C]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#D84315] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Hindu Faith Groups Section */}
        <HinduismFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#F4511E]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#F4511E] animate-pulse shadow-lg shadow-[#F4511E]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#F4511E]/30 hover:border-[#F4511E] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4511E]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#F4511E]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#F4511E] border-t-transparent animate-spin"></div>
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