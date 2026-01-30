import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
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
  User
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import exampleImage from 'figma:asset/86b5904d827d93f516545630778fcbede069a854.png';
import shepherdImage from 'figma:asset/6511e93f04d926a2d8cbee184d9911903da52bbe.png';

// Faith-specific configurations
const faithConfigs = {
  christianity: {
    name: "Christian",
    subtitle: "Scroll through archetypes of the Christian faith.",
    symbol: "✝️",
    description: "Explore Christian wisdom through AI guides inspired by historical and contemporary Christian leaders, theologians, and spiritual advisors.",
    heroImage: exampleImage,
    suggestedTopics: [
      "Prayer & Worship", "Biblical Studies", "Theology", "Church History", 
      "Ethics & Morality", "Spiritual Growth", "Social Justice", "Evangelism"
    ],
    agents: [
      {
        id: "easter-day-saints",
        name: "Elder Johnson",
        role: "Latter-Day Saints",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NTkyNjIwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Modern-day apostolic leadership with emphasis on restored gospel principles and family values.",
        denomination: "The Church of Jesus Christ of Latter-day Saints",
        isPremium: false,
        aiProfile: "Elder Johnson represents the modern apostolic tradition with deep knowledge of restored gospel principles, emphasizing family, service, and personal revelation.",
        trainingData: "The Book of Mormon, Doctrine and Covenants, Pearl of Great Price, Bible (KJV), General Conference talks, and modern prophetic teachings.",
        howItWorks: "Interact with guides by typing or by clicking the microphone icon. Elder Johnson provides guidance rooted in latter-day saint doctrine and modern revelation.",
        whatToAsk: "Questions about restored gospel principles, family life, personal revelation, missionary work, temple worship, and modern prophetic guidance.",
        whatToExpected: "Faith-centered guidance emphasizing personal revelation, family values, and the restored gospel of Jesus Christ."
      },
      {
        id: "parish-priest",
        name: "Father David",
        role: "Parish Priest",
        image: "https://images.unsplash.com/photo-1661448836587-f9ea11d601ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMHByaWVzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTI2MjEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Community-focused pastoral care and biblical wisdom for everyday Christian living.",
        denomination: "Roman Catholic",
        isPremium: false,
        aiProfile: "Father David represents the pastoral heart of local parish ministry, offering guidance rooted in scripture and traditional Catholic teaching with a focus on community life and practical spiritual guidance.",
        trainingData: "The Holy Bible, Catholic liturgical texts, pastoral care manuals, community ministry resources, and traditional Catholic teachings on parish life.",
        howItWorks: "Interact with Father David by typing your questions or using voice input. He provides practical spiritual guidance for everyday Christian living with a pastoral heart.",
        whatToAsk: "Parish life questions, biblical interpretation, moral guidance, spiritual development, sacraments, and practical Christian living.",
        whatToExpect: "Compassionate responses grounded in Catholic tradition and practical pastoral experience, with a focus on community and everyday faith."
      },
      {
        id: "contemplative-monk",
        name: "Brother Thomas",
        role: "Contemplative Monk",
        image: "https://images.unsplash.com/photo-1566826048268-82d52695518e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBtb25hc3RlcnklMjBtb25rfGVufDF8fHx8MTc1OTI2MjEwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Deep contemplative wisdom for prayer, meditation, and spiritual discipline.",
        denomination: "Benedictine",
        isPremium: true,
        aiProfile: "Brother Thomas embodies the monastic tradition of contemplative prayer and spiritual discipline practiced in Christian monasteries for centuries, offering deep insights into the mystical life.",
        trainingData: "Desert Fathers writings, monastic rules (especially Rule of St. Benedict), contemplative prayer guides, mystical Christian texts, and writings of contemplative masters.",
        howItWorks: "Brother Thomas responds to your spiritual inquiries with the depth and silence of monastic wisdom. Engage through text or voice for contemplative guidance.",
        whatToAsk: "Contemplative prayer, spiritual disciplines, silence, solitude, mystical experiences, monastic life, and deepening your relationship with God.",
        whatToExpect: "Profound insights into the inner spiritual life and practices for deepening your relationship with God through contemplative prayer and monastic wisdom."
      },
      {
        id: "sister-maria",
        name: "Sister Isabella Rodriguez",
        role: "Social Justice Advocate",
        image: "https://images.unsplash.com/photo-1682133911124-c511d890d479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMG51biUyMHNpc3RlcnxlbnwxfHx8fDE3NTkyNjIxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Faith-based social action and service to the marginalized communities.",
        denomination: "Franciscan",
        isPremium: true,
        aiProfile: "Sister Isabella Rodriguez devoted her life to serving the poor and advocating for social justice through the lens of Catholic social teaching, following the Franciscan tradition of service.",
        trainingData: "Catholic social teaching documents, liberation theology texts, community organizing resources, social justice writings, and Franciscan spirituality texts.",
        howItWorks: "Sister Isabella guides you through questions of social justice, community organizing, and faith-based activism with the compassion of Franciscan spirituality.",
        whatToAsk: "Social justice issues, community organizing, serving the poor, faith-based activism, Catholic social teaching, and Franciscan spirituality.",
        whatToExpect: "Guidance that combines deep spiritual roots with practical social action, emphasizing service to the marginalized and systemic change."
      },
      {
        id: "youth-pastor",
        name: "Pastor Mike",
        role: "Youth Pastor",
        image: "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBhc3RvciUyMG1hbiUyMGNoYXJpc21hdGljfGVufDF8fHx8MTc1OTI2MjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Contemporary Christian guidance for young adults and modern faith challenges.",
        denomination: "Non-denominational",
        isPremium: false,
        aiProfile: "Pastor Mike brings youthful energy and contemporary perspective to traditional Christian wisdom, helping bridge modern life with timeless faith principles.",
        trainingData: "Contemporary Christian music and culture, youth ministry resources, modern apologetics, social media and faith, and relevant biblical teachings for modern life.",
        howItWorks: "Pastor Mike speaks your language while staying rooted in biblical truth. Chat about faith in the context of modern life, relationships, and contemporary challenges.",
        whatToAsk: "Modern faith challenges, relationships, social media and faith, contemporary Christian living, young adult issues, and relevant biblical guidance.",
        whatToExpect: "Relatable, contemporary guidance that connects biblical truth with the realities of modern life and culture."
      },
      {
        id: "theological-scholar",
        name: "Dr. Sarah Williams",
        role: "Theological Scholar",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVvbG9naWFuJTIwc2Nob2xhciUyMHdvbWFufGVufDF8fHx8MTc1OTI2MjExNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Advanced theological study and academic approach to Christian doctrine.",
        denomination: "Methodist",
        isPremium: true,
        aiProfile: "Dr. Sarah Williams brings rigorous academic study to Christian theology, offering deep scholarly insights into doctrine, church history, and biblical interpretation.",
        trainingData: "Academic theological texts, systematic theology works, church history sources, biblical commentaries, and scholarly religious studies materials.",
        howItWorks: "Dr. Williams provides in-depth theological analysis and academic perspective on complex questions of faith, doctrine, and biblical interpretation.",
        whatToAsk: "Complex theological questions, doctrine interpretation, church history, biblical scholarship, systematic theology, and academic religious studies.",
        whatToExpect: "Scholarly, well-researched responses that provide deep theological insight and academic rigor to complex questions of faith and doctrine."
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
}

export function FaithSpecificPage({ faithKey, faithName, onBack, onOpenMission, onStartChat }: FaithSpecificPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const { awardBadge } = useBadges();
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
      title: 'First Guide Launched',
      description: 'Launched your first spiritual guide',
      icon: '🚀',
      category: 'interaction'
    });
    
    toast.success(`Launching ${agent.name} for a spiritual conversation...`);
    onStartChat(agent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D2B] via-[#1a1a3a] to-[#2a2a4a] text-white">
      <div className="relative">
        {/* Hero Section with Faith Image */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={config.heroImage}
              alt={config.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="text-white/80 hover:text-white p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Title & Subtitle */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div style={{ 
              fontFamily: "'Caveat', cursive", 
              fontWeight: 700, 
              fontSize: '2.925rem', 
              marginBottom: '0.75rem', 
              color: 'white',
              lineHeight: '1.2'
            }}>Christian</div>
            <p className="text-slate-300 max-w-md mx-auto text-lg">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Archetype Cards Carousel */}
        <div className="px-4 py-8">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {config.agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  className={`flex-shrink-0 w-72 cursor-pointer transition-all duration-300 ${
                    selectedAgentIndex === index ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setSelectedAgentIndex(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className={`bg-gradient-to-br from-slate-800/60 to-slate-900/60 border overflow-hidden ${
                    selectedAgentIndex === index ? 'border-[#7A4FFF] ring-2 ring-[#7A4FFF]/50' : 'border-purple-500/30'
                  }`}>
                    {/* Text Section Above Image */}
                    {agent.id === "easter-day-saints" ? (
                      <div className="p-4 bg-gradient-to-br from-[#7A4FFF]/10 to-[#FFD369]/5 border-b border-[#7A4FFF]/20">
                        <h3 className="text-white text-sm mb-2 leading-tight">
                          The Church of Jesus Christ of Latter-day Saints
                        </h3>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          Modern-day apostolic leadership with emphasis on restored gospel principles and family values.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gradient-to-br from-[#7A4FFF]/10 to-[#FFD369]/5 border-b border-[#7A4FFF]/20">
                        <h3 className="text-white text-sm mb-2 leading-tight">
                          {agent.denomination || agent.name}
                        </h3>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {agent.description}
                        </p>
                      </div>
                    )}
                    
                    <div className="relative h-40">
                      <ImageWithFallback
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {agent.isPremium && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[#FFD369]/20 text-[#FFD369] border-[#FFD369]/40">
                            Premium
                          </Badge>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white text-base mb-1">{agent.name}</h4>
                        <p className="text-slate-300 text-xs">{agent.role}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchAgent(agent);
                        }}
                        className={`w-full ${
                          agent.isPremium && !canAccessPremium
                            ? "bg-slate-600 hover:bg-slate-700 text-slate-300"
                            : "bg-gradient-to-r from-[#7A4FFF] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                        } border-0`}
                        disabled={agent.isPremium && !canAccessPremium}
                      >
                        {agent.isPremium && !canAccessPremium ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Launch Agent
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Launch Agent
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Archetype Detail Area */}
        <div className="px-4 mb-12">
          <motion.div
            key={selectedAgentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 border-purple-500/30 backdrop-blur-sm">
              <div className="p-6">
                {/* Agent Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={selectedAgent.image}
                      alt={selectedAgent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white text-xl">{selectedAgent.name}</h3>
                      {selectedAgent.isPremium && (
                        <Badge className="bg-[#FFD369]/20 text-[#FFD369] border-[#FFD369]/40">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{selectedAgent.role}</p>
                    <p className="text-slate-400 text-sm">{selectedAgent.description}</p>
                  </div>
                </div>

                {/* Expandable Details */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="ai-profile" className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-colors">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        AI Profile
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 pt-2">
                      {selectedAgent.aiProfile}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="training-data" className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-colors">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        Training Data
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 pt-2">
                      {selectedAgent.trainingData}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="how-it-works" className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-colors">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        How It Works
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 pt-2">
                      {selectedAgent.howItWorks}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="what-to-ask" className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-colors">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        What to Ask
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 pt-2">
                      {selectedAgent.whatToAsk}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="what-to-expect" className="border-slate-700">
                    <AccordionTrigger className="text-white hover:text-[#7A4FFF] transition-colors">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        What to Expect
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 pt-2">
                      {selectedAgent.whatToExpect}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Launch Button */}
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={() => handleLaunchAgent(selectedAgent)}
                    className={`px-8 py-3 ${
                      selectedAgent.isPremium && !canAccessPremium
                        ? "bg-slate-600 hover:bg-slate-700 text-slate-300"
                        : "bg-gradient-to-r from-[#7A4FFF] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    } border-0`}
                    disabled={selectedAgent.isPremium && !canAccessPremium}
                  >
                    {selectedAgent.isPremium && !canAccessPremium ? (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Launch {selectedAgent.name}
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Launch {selectedAgent.name}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Suggested Topics */}
        <div className="px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-white text-xl mb-6 text-center">Explore These Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {config.suggestedTopics.map((topic, index) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#7A4FFF]/10 to-[#FFD369]/5 border-[#7A4FFF]/20 hover:border-[#7A4FFF]/40 transition-colors cursor-pointer">
                    <div className="p-3 text-center">
                      <p className="text-white text-sm">{topic}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
    </div>
  );
}