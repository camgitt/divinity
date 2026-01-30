import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { useSavedGuides } from "./saved-guides-context";
import { toast } from "sonner@2.0.3";
import timSteinruckImage from 'figma:asset/48b12ef0b6370f5ebfae5ad3819479fd7b6afcff.png';
import flamingEagleImage from 'figma:asset/341a4bc4b33138de77876dfe60a41b4c3e40e611.png';
import { 
  ArrowLeft,
  Shield, 
  MessageCircle,
  GraduationCap,
  Award,
  Calendar,
  Globe,
  Sparkles,
  Heart,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  Leaf,
  Sun,
  Mountain,
  X
} from "lucide-react";

interface LeaderProfilePageProps {
  leaderId?: string;
  onNavigate?: (tab: string) => void;
  onBack?: () => void;
  onOpenMission?: () => void;
}

// Leader data structure
const leadersData = {
  steinruck: {
    id: "steinruck",
    name: "Master Steinruck",
    title: "Psycho-Spiritual Counsellor",
    faith: "Other Christian",
    role: "Faith Influencer",
    yearsOfService: 20,
    image: timSteinruckImage,
    credentials: "Accelerated Evolution Certified Psycho-spiritual coach",
    chatUrl: "https://link.divinityagi.com/tim-steinruck",
    expertise: [
      "Prayer & Spiritual Doubt",
      "Mental Health & Spirituality",
      "Family Relationships & Conflict Resolution",
      "Spirituality in Modern World",
      "Science & Faith Integration"
    ],
    agentProfile: {
      language: "English",
      personality: "Wise and compassionate",
      description: "Provides spiritual and life guidance from deep intuition. He does not provide the answers to the questioner but guides the individual to seek deeper meaning, purpose and realization of their own truth. He is wise, kind, compassionate yet clear and firm. He values integrity and blunt honesty more than flowery words and dogma."
    },
    insights: [
      {
        question: "How can I maintain faith in God amidst personal suffering and global crises?",
        answer: "All the answers you need already exist in the God that lives within you"
      },
      {
        question: "How can prayer help me in times of doubt?",
        answer: "Prayer adjusts your frequency to receive direction from the Universal Mind of God"
      },
      {
        question: "What does the Church say about why bad things happen to good people?",
        answer: "When we do not clear our subconscious negative programming it will show up as challenges in our lives to learn from"
      },
      {
        question: "What are three core values that guide your decisions and actions in life?",
        answer: "Discipline, surrender and self commitment"
      },
      {
        question: "Can you describe a time when your beliefs were challenged, and how you responded?",
        answer: "As a child I questioned the Old Testament Yahweh and his direction to fear him. I became a self identified victim of that fear. Once I realized that I AM the God within me I set myself free"
      },
      {
        question: "How do you define \"purpose\" in your own life?",
        answer: "To feed healing, light and transformation into the infinite field of human consciousness"
      },
      {
        question: "In what ways do you find community and connection with others?",
        answer: "When I live in coherence with myself the right people come into my life at the right time to support my purposes"
      },
      {
        question: "What gives you hope or a sense of optimism about the future?",
        answer: "Through music, frequency and divine creativity"
      },
      {
        question: "How can I balance personal desires with God's plan for me?",
        answer: "Listen to my divine intuition"
      },
      {
        question: "How do you approach moments of doubt or uncertainty?",
        answer: "With my divine intuition"
      },
      {
        question: "What role does compassion play in your interactions with others?",
        answer: "Compassion and empathy are the key to meaningful communication"
      },
      {
        question: "Can you share an experience where you felt a sense of awe or wonder?",
        answer: "Reach states of pleroma and bliss through deep self processing using the psycho-spiritual processes I have mastered"
      }
    ]
  },
  "flaming-eagle": {
    id: "flaming-eagle",
    name: "James Warren \"Flaming Eagle\" Mooney",
    title: "Seminole Medicine Man & Elder",
    faith: "Native American Spirituality",
    role: "Spiritual Leader & Cultural Advocate",
    birthDate: "January 3, 1944",
    yearsOfService: 50,
    image: flamingEagleImage,
    mission: "To Unearth the Creator's Spirit in our Hearts and Heritage for All Our Relations",
    ancestry: "Great-grandson of James Mooney (Smithsonian ethnologist); direct descendant of Osceola, the Seminole War Chief and Medicine Man",
    tribalHeritage: "Seminole–Creek lineage",
    organization: "Oklevueha Native American Church (ONAC)",
    guidingValues: [
      {
        value: "Faith",
        expression: "Trusts divine guidance in every decision; sees challenges as sacred tests"
      },
      {
        value: "Humility",
        expression: "Rejects ego; speaks as a servant of Spirit, not a master"
      },
      {
        value: "Charity",
        expression: "Offers wisdom freely to all who seek it; extends help without judgment"
      },
      {
        value: "Respect",
        expression: "Honors all traditions and perspectives as paths to the Creator"
      },
      {
        value: "Honor",
        expression: "Upholds ancestral legacies and protects the integrity of sacred ceremonies"
      },
      {
        value: "Forgiveness",
        expression: "Encourages reconciliation as a path to healing intergenerational trauma"
      },
      {
        value: "Gratitude",
        expression: "Gives daily thanks for life, ancestors, and the opportunity to serve"
      }
    ],
    spiritualPhilosophy: [
      {
        principle: "Unity with the Creator",
        description: "The Creator's spirit exists in all relations—people, animals, plants, and the earth"
      },
      {
        principle: "Healing Through Ceremony",
        description: "Sacred ceremonies such as the Sweat Lodge, Half Moon, and Green Corn are paths to purification and rebirth"
      },
      {
        principle: "Freedom of Sacred Practice",
        description: "Every person has a divine right to access their spiritual heritage, including the ceremonial use of plant medicines"
      },
      {
        principle: "Faith Through Adversity",
        description: "His own near-death experience as a child—revived through prayer in a sweat lodge—symbolizes the rebirth that comes through faith and ancestral connection"
      }
    ],
    agentProfile: {
      language: "English",
      personality: "Empathetic, inclusive, and protective of truth",
      approach: "Responds to conflict with patience and storytelling rather than confrontation. Guides users toward introspection: \"What lesson might the Creator be showing you through this?\" Uses metaphorical language referencing the natural world—eagles, rivers, fire, and wind—as symbols of spirit and transformation. Ends messages with gratitude, often invoking blessing: \"Walk in beauty.\""
    },
    keyThemes: [
      "Cultural Preservation and Truth-Telling",
      "Freedom of Religion",
      "Integration of Traditions",
      "Healing the People"
    ],
    legacy: "James W. F. Mooney's legacy stands at the crossroads of spiritual freedom, cultural preservation, and human rights. Through ONAC and interfaith alliances, his teachings continue to affirm that the Creator's spirit unites all people, regardless of origin or creed.",
    chatUrl: "https://link.divinityagi.com/flaming-eagle"
  }
};

export function LeaderProfilePage({ leaderId = "steinruck", onNavigate, onBack, onOpenMission }: LeaderProfilePageProps) {
  const [activeSection, setActiveSection] = useState<"about" | "insights">(leaderId === "flaming-eagle" ? "about" : "about");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Get leader data
  const leaderData = leadersData[leaderId as keyof typeof leadersData] || leadersData.steinruck;
  const isNativeLeader = leaderId === "flaming-eagle";

  // Saved guides integration
  const { savedGuides, saveGuide, removeGuide, isGuideSaved } = useSavedGuides();
  const [isSaved, setIsSaved] = useState(false);

  // Check if this leader is saved on mount and when savedGuides changes
  useEffect(() => {
    setIsSaved(isGuideSaved(leaderData.name, leaderData.faith));
  }, [savedGuides, leaderData.name, leaderData.faith, isGuideSaved]);

  // Handle overlay open/close for Master Steinruck
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

  // Handle save/unsave profile
  const handleToggleSave = () => {
    if (isSaved) {
      // Find and remove the guide
      const guideToRemove = savedGuides.find(
        g => g.guideName === leaderData.name && g.tradition === leaderData.faith
      );
      if (guideToRemove) {
        removeGuide(guideToRemove.id);
        toast.success(`${leaderData.name} removed from your guides`, {
          description: 'This leader will no longer appear in the Guides slider',
        });
      }
    } else {
      // Save the guide
      saveGuide({
        guideName: leaderData.name,
        tradition: leaderData.faith,
        faithColor: '#7A4FFF', // DivinityAGI brand purple
        avatar: leaderData.image,
        specialty: leaderData.title,
        description: leaderData.credentials,
        chatUrl: leaderData.chatUrl,
        guideType: 'verified-leader', // Mark as verified leader for green heart
      });
      toast.success(`${leaderData.name} saved to your guides!`, {
        description: 'You can now find this leader in the Guides slider',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D2B] via-[#0B1426] to-[#0D0D2B]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(122, 79, 255, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 211, 105, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="px-6 pt-6">
          <Button
            onClick={onBack || (() => onNavigate?.("leaders"))}
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-[#1E3A5F]/50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Leaders
          </Button>
        </div>

        {/* Hero Section */}
        <section className="px-6 pt-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-[#162844]/60 to-[#1E3A5F]/40 border-[#497EBC]/30 backdrop-blur-lg overflow-hidden">
                <div className="relative">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/10 via-transparent to-[#b69e60]/10" />
                  
                  <div className="relative p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      {/* Profile Image */}
                      <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-[#497EBC]/50 shadow-2xl shadow-[#497EBC]/30">
                            <ImageWithFallback
                              src={leaderData.image}
                              alt={leaderData.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Verified badge */}
                          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] p-2 rounded-full shadow-lg border-2 border-[#0B1426]">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                          <h1 className="bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
                            {leaderData.name}
                          </h1>
                          <Badge className="bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] text-white border-0">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>

                        <p className="text-xl text-[#FFD369] mb-4">{leaderData.title}</p>

                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Award className="w-4 h-4 text-[#497EBC]" />
                            <span className="text-sm">{leaderData.role}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Globe className="w-4 h-4 text-[#497EBC]" />
                            <span className="text-sm">{leaderData.faith}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Clock className="w-4 h-4 text-[#497EBC]" />
                            <span className="text-sm">{leaderData.yearsOfService} years of service</span>
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                          <Button
                            onClick={() => {
                              if (leaderData.chatUrl) {
                                handleOpenOverlay(leaderData.chatUrl, leaderData.name);
                              } else {
                                onNavigate?.("chat");
                              }
                            }}
                            className="bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] hover:from-[#3A6EAC] hover:to-[#4A7EBC] text-white shadow-lg hover:shadow-[#497EBC]/50 transition-all duration-300"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Connect with {leaderData.name.split(' ')[0] === "James" ? "Flaming Eagle" : leaderData.name.split(' ')[0]}
                          </Button>
                          <Button
                            onClick={handleToggleSave}
                            variant={isSaved ? "default" : "outline"}
                            className={isSaved 
                              ? "bg-green-500 hover:bg-green-600 text-white border-0" 
                              : "border-[#497EBC]/50 text-white hover:bg-[#497EBC]/10"}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current text-white' : ''}`} />
                            {isSaved ? 'Saved' : 'Save Profile'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveSection("about")}
                className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === "about"
                    ? "bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] text-white shadow-lg"
                    : "bg-[#162844]/40 text-slate-300 hover:bg-[#1E3A5F]/50"
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                {isNativeLeader ? "About & Philosophy" : "About & Expertise"}
              </button>
              <button
                onClick={() => setActiveSection("insights")}
                className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === "insights"
                    ? "bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] text-white shadow-lg"
                    : "bg-[#162844]/40 text-slate-300 hover:bg-[#1E3A5F]/50"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                {isNativeLeader ? "Guiding Values" : "Spiritual Insights"}
              </button>
            </div>

            {/* Content Sections */}
            {isNativeLeader ? (
              // Flaming Eagle Content
              <>
                {activeSection === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Mission Statement */}
                    <Card className="bg-gradient-to-br from-[#162844]/60 to-[#1E3A5F]/40 border-[#FFD369]/30 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-[#FFD369]/20 to-[#F59E0B]/20 rounded-lg">
                            <Sun className="w-6 h-6 text-[#FFD369]" />
                          </div>
                          <h2 className="text-white">Mission Statement</h2>
                        </div>
                        <p className="text-[#FFD369] italic leading-relaxed text-lg">
                          "{('mission' in leaderData) ? leaderData.mission : ''}"
                        </p>
                      </div>
                    </Card>

                    {/* Ancestry & Heritage */}
                    <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-[#497EBC]/20 rounded-lg">
                            <Mountain className="w-6 h-6 text-[#497EBC]" />
                          </div>
                          <h2 className="text-white">Ancestry & Heritage</h2>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-slate-400">Lineage:</span>
                            <p className="text-slate-200 leading-relaxed mt-1">
                              {('ancestry' in leaderData) ? leaderData.ancestry : ''}
                            </p>
                          </div>
                          <Separator className="bg-[#1E3A5F]/50" />
                          <div>
                            <span className="text-sm text-slate-400">Tribal Heritage:</span>
                            <p className="text-slate-200 mt-1">
                              {('tribalHeritage' in leaderData) ? leaderData.tribalHeritage : ''}
                            </p>
                          </div>
                          {('birthDate' in leaderData) && (
                            <>
                              <Separator className="bg-[#1E3A5F]/50" />
                              <div>
                                <span className="text-sm text-slate-400">Born:</span>
                                <p className="text-slate-200 mt-1">{leaderData.birthDate}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>

                    {/* Spiritual Philosophy */}
                    <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-[#FFD369]/20 rounded-lg">
                            <Leaf className="w-6 h-6 text-[#FFD369]" />
                          </div>
                          <h2 className="text-white">Spiritual Philosophy</h2>
                        </div>
                        <div className="space-y-4">
                          {('spiritualPhilosophy' in leaderData) && leaderData.spiritualPhilosophy.map((philosophy, index) => (
                            <div key={index}>
                              {index > 0 && <Separator className="bg-[#1E3A5F]/50 my-4" />}
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-[#7A4FFF]" />
                                  <span className="text-slate-200">{philosophy.principle}</span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed ml-6">
                                  {philosophy.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    {/* AI Agent Profile */}
                    <Card className="bg-gradient-to-br from-[#162844]/60 to-[#1E3A5F]/40 border-[#7A4FFF]/30 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-[#7A4FFF]/20 to-purple-700/20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-[#7A4FFF]" />
                          </div>
                          <h2 className="text-white">AI Agent Profile</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Language</span>
                            </div>
                            <p className="text-slate-200">{leaderData.agentProfile.language}</p>
                          </div>

                          <Separator className="bg-[#1E3A5F]/50" />

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Personality</span>
                            </div>
                            <p className="text-slate-200">{leaderData.agentProfile.personality}</p>
                          </div>

                          <Separator className="bg-[#1E3A5F]/50" />

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Approach</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed italic">
                              "{('approach' in leaderData.agentProfile) ? leaderData.agentProfile.approach : leaderData.agentProfile.description}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Legacy */}
                    {('legacy' in leaderData) && (
                      <Card className="bg-gradient-to-br from-[#162844]/60 to-[#1E3A5F]/40 border-[#7A4FFF]/30 backdrop-blur-sm">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-[#FFD369]/20 to-purple-700/20 rounded-lg">
                              <Star className="w-6 h-6 text-[#FFD369]" />
                            </div>
                            <h2 className="text-white">Legacy</h2>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{leaderData.legacy}</p>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                )}

                {activeSection === "insights" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Seven Guiding Values */}
                    {('guidingValues' in leaderData) && leaderData.guidingValues.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/30 transition-all duration-300 backdrop-blur-sm">
                          <div className="p-6">
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#FFD369]/30 flex items-center justify-center border border-[#7A4FFF]/40">
                                <Star className="w-5 h-5 text-[#FFD369]" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-[#FFD369] mb-2">{item.value}</h3>
                                <p className="text-slate-300 leading-relaxed">{item.expression}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              // Master Steinruck Content
              <>
                {activeSection === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Credentials */}
                    {('credentials' in leaderData) && (
                      <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#7A4FFF]/20 rounded-lg">
                              <GraduationCap className="w-6 h-6 text-[#7A4FFF]" />
                            </div>
                            <h2 className="text-white">Education & Credentials</h2>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{leaderData.credentials}</p>
                        </div>
                      </Card>
                    )}

                    {/* Areas of Expertise */}
                    {('expertise' in leaderData) && (
                      <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 backdrop-blur-sm">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#FFD369]/20 rounded-lg">
                              <Star className="w-6 h-6 text-[#FFD369]" />
                            </div>
                            <h2 className="text-white">Areas of Expertise</h2>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {leaderData.expertise.map((area, index) => (
                              <Badge
                                key={index}
                                className="bg-[#1E3A5F]/50 text-slate-200 border-[#7A4FFF]/30 hover:bg-[#7A4FFF]/20 transition-colors"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* AI Agent Profile */}
                    <Card className="bg-gradient-to-br from-[#162844]/60 to-[#1E3A5F]/40 border-[#7A4FFF]/30 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-[#7A4FFF]/20 to-purple-700/20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-[#7A4FFF]" />
                          </div>
                          <h2 className="text-white">AI Agent Profile</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Language</span>
                            </div>
                            <p className="text-slate-200">{leaderData.agentProfile.language}</p>
                          </div>

                          <Separator className="bg-[#1E3A5F]/50" />

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Personality</span>
                            </div>
                            <p className="text-slate-200">{leaderData.agentProfile.personality}</p>
                          </div>

                          <Separator className="bg-[#1E3A5F]/50" />

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-[#FFD369]" />
                              <span className="text-sm text-slate-400">Approach</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed italic">
                              "{('description' in leaderData.agentProfile) ? leaderData.agentProfile.description : ''}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {activeSection === "insights" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {('insights' in leaderData) && leaderData.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        <Card className="bg-[#162844]/40 border-[#1E3A5F]/40 hover:border-[#7A4FFF]/30 transition-all duration-300 backdrop-blur-sm">
                          <div className="p-6">
                            <div className="flex gap-3 mb-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A4FFF]/20 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-[#7A4FFF]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-slate-200 mb-3 leading-relaxed">{insight.question}</p>
                                <div className="pl-4 border-l-2 border-[#FFD369]/50">
                                  <p className="text-[#FFD369] italic leading-relaxed">"{insight.answer}"</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-[#7A4FFF]/20 to-purple-700/20 border-[#7A4FFF]/40 backdrop-blur-lg">
                <div className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-[#FFD369] mx-auto mb-4" />
                  <h2 className="text-white mb-3">Ready to begin your spiritual journey?</h2>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    Connect with {leaderData.name.split(' ')[0] === "James" ? "Flaming Eagle" : leaderData.name.split(' ')[0]} for personalized guidance, deep insights, and compassionate support on your path.
                  </p>
                  <Button
                    onClick={() => {
                      if (leaderId === "steinruck") {
                        handleOpenOverlay("https://link.divinityagi.com/tim-steinruck", "Master Steinruck");
                      } else {
                        onNavigate?.("chat");
                      }
                    }}
                    className="bg-gradient-to-r from-[#7A4FFF] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-xl hover:shadow-purple-500/50 transition-all duration-300 h-12 px-8"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Your Session
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#7A4FFF]/30 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">AI Guide Conversation with {overlayAgentName}</DialogTitle>
          <DialogDescription className="sr-only">Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.</DialogDescription>
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#7A4FFF] animate-pulse shadow-lg shadow-[#7A4FFF]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseOverlay} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#7A4FFF]/30 hover:border-[#7A4FFF] transition-all duration-300 hover:scale-110" aria-label="Close conversation">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#7A4FFF]" />
            </Button>
          </div>
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#7A4FFF]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#7A4FFF] border-t-transparent animate-spin"></div>
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