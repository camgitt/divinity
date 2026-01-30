import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useTimer } from "./timer-context";
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
  Flower2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import exampleImage from 'figma:asset/86b5904d827d93f516545630778fcbede069a854.png';
import shepherdImage from 'figma:asset/6511e93f04d926a2d8cbee184d9911903da52bbe.png';
import popefrancisImage from 'figma:asset/08703f745981cbf04ba9cef529022256063f6160.png';
import pastorDavidImage from 'figma:asset/27331835e1a742b309f522a88a740468dd24cd78.png';
import elderSmithImage from 'figma:asset/a02b31530ab23e6c769f913e698f4c7eea311465.png';
import saintFrancisImage from 'figma:asset/8e0f79f40d81ba2ef7d12ee0a384c99c0268c81e.png';
import sisterIsabellaRossiImage from 'figma:asset/075a94010de869694a73d3f09efa56d6985ce825.png';
import fatherBrianImage from 'figma:asset/4e7543e6a3986a83db0c3a2e941aaba01a0562bb.png';
import christianCrossImage from 'figma:asset/4f05d38222fad7a295a249e1c5585d22b9c9ee33.png';

// Faith-specific configurations
const faithConfigs = {
  christianity: {
    name: "Christian",
    subtitle: "Scroll through archetypes of the Christian faith.",
    symbol: "✝️",
    description: "Explore Christian wisdom through AI guides inspired by historical and contemporary Christian leaders, theologians, and spiritual advisors.",
    heroImage: shepherdImage,
    suggestedTopics: [
      "Prayer & Worship", "Biblical Studies", "Theology", "Church History", 
      "Ethics & Morality", "Spiritual Growth", "Social Justice", "Evangelism"
    ],
    agents: [
      {
        id: "pope-francis",
        name: "Pope Francis",
        role: "Catholic (Pope Francis)",
        image: popefrancisImage,
        description: "Roman Catholicism, the largest Christian denomination, is characterized by its hierarchical structure, with the Pope as its head.",
        denomination: "Roman Catholicism",
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-1",
        aiProfile: "Born Jorge Mario Bergoglio, served as the head of the Catholic Church and sovereign of the Vatican City State from 2013 until his death in 2025.",
        trainingData: "The Holy Bible (Catholic Canon), Catechism of the Catholic Church, Papal Encyclicals (e.g., Laudato Si'), Apostolic Exhortations, and various addresses.",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
        whatToExpect: "Guides utilize natural language processing to comprehend your text or voice input, and then provide relevant responses."
      },
      {
        id: "pastor-david",
        name: "Pastor David",
        role: "Youth Leader",
        image: pastorDavidImage,
        description: "Martin Luther (1483–1546) - A German monk, theologian, and university professor who spearheaded the Protestant Reformation.",
        denomination: "Protestantism", 
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-2",
        aiProfile: "Youth Leader: Specializing in working with teenagers and young adults, youth ministers offer counsel related to faith, life challenges, and transitions young people face.",
        trainingData: "Romans (especially 1:17; 3:21-28; 5:1)\n\nGalatians (especially 2:16)\n\nThe entire Bible: Sola Scriptural influences all Protestant traditions.",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
        whatToExpect: "Guides use natural language processing to understand your text or voice input and then provide relevant responses."
      },
      {
        id: "elder-smith",
        name: "Elder Smith Jr.",
        role: "Councillor",
        image: elderSmithImage,
        description: "The Latter-day Saint movement, most prominently represented by The Church of Jesus Christ of Latter-day Saints, believes in ongoing revelation through modern prophets, additional sacred scriptures alongside the Bible, and distinct theological tenets.",
        denomination: "Latter-day Saints",
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-3",
        aiProfile: "Joseph Smith Jr. (1805–1844) was the founder of the Latter Day Saint movement. He organized the Church of Christ (later renamed The Church of Jesus Christ of Latter-day Saints) in 1830, claiming it was a restoration of Christ's ancient church.",
        trainingData: "The King James Version of the Bible (accepted as scripture)\n\nThe Book of Mormon — presented as \"Another Testament of Jesus Christ\"\n\nDoctrine and Covenants — a collection of revelations and inspired writings\n\nPearl of Great Price — including the Book of Moses and the Book of Abraham",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
        whatToExpect: "Guides use natural language processing to understand your text or voice input and then provide relevant responses."
      },
      {
        id: "saint-francis",
        name: "Saint Francis",
        role: "Saint Figure",
        image: saintFrancisImage,
        description: "Evangelical Christianity is a worldwide, trans-denominational movement within Protestant Christianity that emphasizes the need for a personal conversion experience, which evangelicals refer to as being \"born again\".",
        denomination: "Evangelical",
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-4",
        aiProfile: "Saint Francis of Assisi was an Italian Catholic friar and preacher renowned for his love of animals, nature, and commitment to poverty and humility.",
        trainingData: "Pauline Epistles: Thirteen letters bearing his name (Romans, 1 & 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 & 2 Thessalonians, 1 & 2 Timothy, Titus, Philemon)\n\nActs of the Apostles",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "Guides are excellent for engagement on a variety of related study topics.",
        whatToExpect: "Guides use natural language processing to understand your text or voice input and then provide relevant responses."
      },
      {
        id: "sister-isabella-rossi",
        name: "Sister Isabella Rossi",
        role: "Nun Figure",
        image: sisterIsabellaRossiImage,
        description: "Eastern Orthodoxy comprises a communion of autocephalous (self-governing) churches, primarily in Eastern Europe, the Middle East, and parts of Asia and Africa.",
        denomination: "Orthodox",
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-5",
        aiProfile: "Sister Isabella Rossi is known throughout her region for her profound humility. Her life exemplified the Catholic ideal of holiness achieved through ascetic discipline, fervent prayer, and selfless charitable works, leaving a legacy of spiritual inspiration.",
        trainingData: "John 1:14 — \"The Word became flesh and made his dwelling among us.\"\n\nLuke 1:43 — \"And why has this happened to me, that the mother of my Lord comes to me?\"\n\nPhilippians 2:6-7 — \"Who, being in very nature God, did not consider equality with God something to be used to his advantage.\"",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "DivinityAGI Spirit Guides are excellent for engagement on a variety of Bible study topics. Our AI are also available to support moral dilemmas or crisis-related situations.",
        whatToExpect: "Guides use natural language processing to understand your text or voice input and then provide relevant responses."
      },
      {
        id: "father-brian",
        name: "Father Brian",
        role: "Priest Figure",
        image: fatherBrianImage,
        description: "Oriental Orthodoxy: Major churches include the Coptic Orthodox, Ethiopian Orthodox, and Armenian Apostolic Churches.",
        denomination: "Oriental Orthodoxy",
        isPremium: false,
        chatUrl: "https://link.divinityagi.com/christian-6",
        aiProfile: "Father Brian was born in the USA in 1971 and later migrated to Ethiopia to embrace the Oriental Orthodox sect.",
        trainingData: "John 1:14 — \"The Word became flesh and made his dwelling among us.\"\n\nLuke 1:43 — \"And why has this happened to me, that the mother of my Lord comes to me?\"\n\nPhilippians 2:6-7 — \"Who, being in very nature God, did not consider equality with God something to be used to his advantage.\"",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
        whatToAsk: "DivinityAGI Spirit Guides are excellent for engagement on a variety of Bible study topics. Our AI are also available to support moral dilemmas or crisis-related situations.",
        whatToExpect: "Guides use natural language processing to understand your text or voice input and then provide relevant responses."
      }
    ]
  }
};

interface FaithSpecificPageProps {
  faithKey: string;
  faithName: string;
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
}

export function FaithSpecificPage({ faithKey, faithName, onBack, onOpenMission, onStartChat, onNavigate }: FaithSpecificPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  
  // Get the configuration for this faith
  const config = faithConfigs[faithKey as keyof typeof faithConfigs];
  
  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Faith configuration not found</h2>
          <Button onClick={onBack} variant="ghost" className="text-white/80 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  const selectedAgent = config.agents[selectedAgentIndex];

  const handleLaunchAgent = (agent: any) => {
    if (agent.isPremium && !canAccessPremium) {
      toast.error("This agent requires a premium subscription");
      return;
    }
    
    // Award badge for first agent interaction
    awardBadge({
      id: 'first-agent-interaction',
      name: 'First Guide Launched',
      description: 'Launched your first spiritual guide',
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
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D2B] via-[#1a1a3a] to-[#2a2a4a] text-white">
      <div className="relative overflow-hidden">
        {/* Hero Section with Faith Image */}
        <div className="relative w-full aspect-square max-h-[85vh] mb-4">
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={config.heroImage}
                alt={config.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 overflow-hidden">
              {/* Enhanced Animated Background Effects */}
              <div className="absolute inset-0">
                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-white via-purple-200 to-gold-200 rounded-full"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${15 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.8,
                    }}
                  />
                ))}
                
                {/* Glowing Orbs */}
                <motion.div
                  className="absolute top-[20%] left-[15%] w-4 h-4 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute top-[60%] right-[20%] w-6 h-6 bg-gradient-to-r from-gold-400/20 to-amber-400/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Enhanced Sparkle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className={`absolute ${i % 2 === 0 ? 'top-[22%] left-[70%]' : 'top-[32%] left-[12%]'}`}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className={`w-${2 + (i % 2)} h-${2 + (i % 2)} text-white/${40 + i * 5}`} />
                  </motion.div>
                ))}
                
                {/* Multiple shooting star effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    className={`absolute ${i === 0 ? 'top-[10%]' : i === 1 ? 'top-[30%]' : 'top-[50%]'} w-12 h-0.5 bg-gradient-to-r from-white via-purple-200 to-transparent rounded-full`}
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "120vw", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatDelay: 12 + i * 3,
                      ease: "easeOut",
                      delay: i * 4
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="text-white hover:text-white p-0 h-auto backdrop-blur-md bg-black/40 hover:bg-black/60 rounded-lg px-3 py-2 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Enhanced Title & Subtitle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div style={{ 
                fontFamily: "'Caveat', cursive", 
                fontWeight: 700, 
                fontSize: '3.5rem', 
                marginBottom: '1rem', 
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2',
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
              }}>Christian</div>
              <motion.p 
                className="text-white max-w-md mx-auto text-lg backdrop-blur-md bg-black/40 rounded-lg px-4 py-2 border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {config.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </div>



        {/* Enhanced Agent Detail Cards Slider */}
        <div className="px-4 mb-12 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h3 className="text-white mb-6 drop-shadow-lg">
                Meet Your Spiritual Guides
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-gold-500 mx-auto rounded-full" />
            </motion.div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-8 pb-8" style={{ width: 'max-content' }}>
                {/* Enhanced Agent Cards */}
                {config.agents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="flex-shrink-0 w-96 group"
                  >
                    <Card className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-purple-950/80 border-purple-500/50 backdrop-blur-lg hover:border-[#7A4FFF]/70 transition-all duration-500 h-[660px] shadow-2xl shadow-purple-900/20 hover:shadow-purple-500/30 relative overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-gold-400/20"
                          animate={{
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>

                      <div className="p-4 h-[630px] flex flex-col relative z-10 bg-black/20 backdrop-blur-sm rounded-xl">
                        {/* Floating Cross Icon */}
                        <motion.div 
                          className="absolute top-3 right-3 w-5 h-5 opacity-60"
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <img 
                            src={christianCrossImage} 
                            alt="Christian Cross"
                            className="w-full h-full object-contain filter brightness-110 drop-shadow-lg" 
                          />
                        </motion.div>
                        
                        {/* Enhanced Agent Image */}
                        <div className="flex justify-center mb-4 flex-shrink-0">
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-purple-500/40 shadow-2xl shadow-purple-500/30 relative group-hover:ring-purple-400/60 transition-all duration-300">
                              {/* Glowing Effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              <motion.div
                                animate={agent.id === "pope-francis" ? {
                                  rotateX: [0, -8, 0, -5, 0, -3, 0],
                                  scaleY: [1, 1.03, 1, 1.02, 1, 1.01, 1],
                                  y: [0, -1, 0, -0.5, 0]
                                } : {}}
                                transition={agent.id === "pope-francis" ? {
                                  duration: 5,
                                  repeat: Infinity,
                                  repeatDelay: 4,
                                  ease: "easeInOut"
                                } : {}}
                                className="w-full h-full"
                                style={{
                                  transformOrigin: "center center",
                                  perspective: "1000px"
                                }}
                              >
                                <ImageWithFallback
                                  src={agent.image}
                                  alt={agent.name}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </div>
                            {/* Floating particles around image */}
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-gold-400/60 rounded-full"
                                style={{
                                  top: `${20 + i * 30}%`,
                                  left: `${-10 + i * 10}%`,
                                }}
                                animate={{
                                  y: [-5, 5, -5],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 3 + i,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: i * 0.5
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>

                        {/* Enhanced Agent Info */}
                        <div className="text-center mb-4 flex-shrink-0">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <h4 className="text-white text-lg truncate max-w-[200px] drop-shadow-sm">{agent.name}</h4>
                            {agent.isPremium && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                              >
                                <Badge className="bg-gradient-to-r from-[#FFD369]/30 to-amber-400/30 text-[#FFD369] border-[#FFD369]/50 text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                                  Premium
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-slate-200 mb-2 font-medium">{agent.role}</p>
                          <p className="text-slate-300 text-sm leading-relaxed px-2 line-clamp-2">{agent.description}</p>
                        </div>

                        {/* Enhanced Details Section with Glassmorphism */}
                        <div className="flex-1 overflow-y-auto">
                          <div className="space-y-4 pb-4">
                            {[
                              { icon: Users, label: "AI Profile", content: agent.aiProfile, color: "purple-400" },
                              { icon: Book, label: "Training Data", content: agent.trainingData, color: "blue-400" },
                              { icon: Star, label: "Specialization", content: "Compassionate guidance rooted in Christian values and biblical wisdom", color: "amber-400" }
                            ].map((detail, detailIndex) => (
                              <motion.div
                                key={detail.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + detailIndex * 0.1 }}
                                className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-300 group/detail"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <detail.icon className={`w-4 h-4 text-${detail.color} group-hover/detail:scale-110 transition-transform duration-200`} />
                                  <span className="text-xs text-slate-200 uppercase tracking-wider font-medium">{detail.label}</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">{detail.content}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <motion.div 
                          className="mt-auto flex-shrink-0 space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {agent.chatUrl && (!agent.isPremium || canAccessPremium) ? (
                            <a
                              href={agent.chatUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center w-full h-12 text-sm rounded-2xl relative overflow-hidden group/btn touch-manipulation select-none cursor-pointer no-underline ${
                                agent.isPremium && !canAccessPremium
                                  ? "bg-slate-600/80 hover:bg-slate-600 text-slate-300 border border-slate-500/50"
                                  : "bg-gradient-to-r from-[#7A4FFF] via-purple-600 to-indigo-600 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-500 text-white shadow-xl hover:shadow-purple-500/40 border border-purple-500/40"
                              } transition-all duration-400 transform hover:scale-[1.02] active:scale-95 active:transition-none`}
                              style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Start Conversation
                            </a>
                          ) : (
                            <Button 
                              onClick={() => handleLaunchAgent(agent)}
                              className={`w-full h-12 text-sm rounded-2xl relative overflow-hidden group/btn touch-manipulation select-none cursor-pointer ${
                                agent.isPremium && !canAccessPremium
                                  ? "bg-slate-600/80 hover:bg-slate-600 text-slate-300 border border-slate-500/50"
                                  : "bg-gradient-to-r from-[#7A4FFF] via-purple-600 to-indigo-600 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-500 text-white shadow-xl hover:shadow-purple-500/40 border border-purple-500/40"
                              } transition-all duration-400 transform hover:scale-[1.02] active:scale-95 active:transition-none`}
                              disabled={agent.isPremium && !canAccessPremium}
                              role="button"
                              aria-label={`Start conversation with ${agent.name}`}
                              style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                              {agent.isPremium && !canAccessPremium ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Upgrade to Chat
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  Start Conversation
                                </>
                              )}
                            </Button>
                          )}
                          <div className="flex gap-3">
                            <Button 
                              variant="outline"
                              size="sm"
                              className="flex-1 h-10 text-xs border-purple-400/30 text-[#7A4FFF] hover:bg-purple-500/10 hover:text-white hover:border-purple-400/50 backdrop-blur-sm font-medium rounded-xl transition-all duration-300"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="flex-1 h-10 text-xs border-purple-400/30 text-[#7A4FFF] hover:bg-purple-500/10 hover:text-white hover:border-purple-400/50 backdrop-blur-sm font-medium rounded-xl transition-all duration-300"
                            >
                              <Users className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Agent Interaction Guide */}
        <div className="px-4 mb-16 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-purple-900/60 to-slate-900/80 backdrop-blur-xl rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-gold-500/20 rounded-2xl" />
              
              <div className="relative z-10 border border-purple-500/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-purple-900/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-white mb-6">
                    Agent Interaction Guide
                  </h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-gold-500 mx-auto rounded-full" />
                </motion.div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { value: "how-it-works", icon: Sparkles, title: "HOW IT WORKS", content: selectedAgent.howItWorks, gradient: "from-purple-500 to-indigo-500" },
                    { value: "what-to-ask", icon: MessageCircle, title: "WHAT TO ASK", content: selectedAgent.whatToAsk, gradient: "from-blue-500 to-cyan-500" },
                    { value: "what-to-expect", icon: Star, title: "WHAT TO EXPECT", content: selectedAgent.whatToExpect, gradient: "from-amber-500 to-orange-500" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <AccordionItem value={item.value} className="border-slate-600/60 bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
                        <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-all duration-300 px-6 py-4 hover:bg-slate-700/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium tracking-wide">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-200 px-6 pb-4 leading-relaxed bg-slate-900/40">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Suggested Topics */}
        <div className="px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h3 className="text-white mb-6">
                Explore These Topics
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-gold-500 mx-auto rounded-full" />
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {config.suggestedTopics.map((topic, index) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Card className="bg-gradient-to-br from-[#7A4FFF]/30 via-purple-900/50 to-[#FFD369]/20 border-[#7A4FFF]/40 hover:border-[#7A4FFF]/70 transition-all duration-300 cursor-pointer backdrop-blur-sm overflow-hidden relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    
                    <div className="p-4 text-center relative z-10 h-20 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg">
                      <motion.p 
                        className="text-white text-sm font-medium leading-relaxed group-hover:text-purple-100 transition-colors duration-200"
                        initial={{ opacity: 1 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {topic}
                      </motion.p>
                    </div>
                    
                    {/* Subtle particle effect */}
                    <motion.div
                      className="absolute top-2 right-2 w-1 h-1 bg-gold-400/60 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Your Spiritual Journey */}
        <div className="px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {/* Enhanced Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-purple-900/60 to-slate-900/80 backdrop-blur-xl rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-gold-500/20 rounded-2xl" />
              
              <Card className="relative z-10 border border-purple-500/50 backdrop-blur-sm bg-black/20 p-8 sm:p-10 shadow-2xl shadow-purple-900/20 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <motion.h3 
                    className="text-xl sm:text-2xl text-white flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Star className="w-7 h-7 mr-4 text-gold-400" />
                    </motion.div>
                    <span className="text-white">
                      Your Spiritual Journey
                    </span>
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Badge variant="outline" className="border-purple-400/70 text-purple-200 bg-purple-900/50 backdrop-blur-sm px-4 py-2">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </motion.div>
                </div>
                
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: MessageSquare, value: "47", label: "Conversations", color: "blue-400", gradient: "from-blue-500 to-cyan-500" },
                    { icon: Star, value: unlockedBadges.length, label: "Badges", color: "gold-400", gradient: "from-amber-500 to-orange-500" },
                    { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "purple-400", gradient: "from-purple-500 to-indigo-500" },
                    { icon: Heart, value: "7", label: "Day Streak", color: "red-400", gradient: "from-pink-500 to-red-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-5 bg-white/15 backdrop-blur-sm rounded-xl border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 group relative overflow-hidden"
                    >
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        >
                          <stat.icon className={`w-6 h-6 text-${stat.color} mx-auto mb-3`} />
                        </motion.div>
                        <div className="text-2xl text-white font-medium mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-300">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Achievement Display */}
                {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="bg-gradient-to-r from-purple-600/20 via-gold-600/20 to-purple-600/20 border border-gold-400/40 rounded-xl p-6 mb-8 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-gold-500/10 to-purple-500/10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-gold-500 rounded-full flex items-center justify-center mr-4"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </motion.div>
                        <span className="text-base text-gold-300 font-medium text-[rgba(255,205,205,1)]">Latest Achievement</span>
                      </div>
                      <div className="text-lg text-white font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-base text-slate-300 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="bg-slate-700/60 border border-slate-600/50 rounded-xl p-6 mb-8 backdrop-blur-sm"
                  >
                    <div className="text-base text-slate-200 text-center leading-relaxed">
                      Begin your spiritual journey by exploring different faith traditions
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Action Buttons */}
                <motion.div 
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <Button 
                    variant="outline" 
                    className="flex-1 border-purple-400/70 text-purple-200 hover:bg-purple-400/30 hover:text-white text-sm h-12 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                    onClick={() => onNavigate?.("profile")}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-gold-400/70 text-gold-200 hover:bg-gold-400/30 hover:text-white text-sm h-12 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-gold-300"
                    onClick={() => onNavigate?.("circle")}
                  >
                    Explore Faiths
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
    </div>
  );
}