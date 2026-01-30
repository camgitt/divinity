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
import becomeGuideImage from 'figma:asset/56a585418dfd71f64aeaf8de0bb38ef029792954.png';
import affiliateHeroImage from 'figma:asset/2c28ff9ec024b835fd031fc7800556ed5373e12a.png';
import affiliateVideoPoster from 'figma:asset/7e3b8187da4693cea4c1bc42dd84ed3059b975dc.png';
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
  DollarSign,
  Zap,
  Building2,
  TrendingUp,
  Target,
  Award,
  Gift,
  Handshake
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { LeaderSignInModal } from "./leader-sign-in-modal";
import { isLeaderSignedIn, signOutLeader } from "./leader-auth-utils";

// Affiliate Program configuration with enhanced styling
const affiliateConfig = {
  name: "Verified Leader Affiliate Program",
  subtitle: "Join our faith-based affiliate network and earn through multiple revenue streams as a Spiritual Innovator.",
  symbol: "🤝",
  description: "Partner with DivinityAGI to earn through 4 revenue streams while helping others on their spiritual journey through AI-powered guidance.",
  primaryColor: "#C9A882", // Brassy gold for prosperity & partnership
  lightColor: "rgba(201, 168, 130, 0.2)",
  hoverColor: "#B89872",
  benefits: [
    {
      icon: DollarSign,
      title: "Multiple Revenue Streams",
      description: "Earn through 4 streams: Affiliates (25%), Engagement (40%), Donations, Virtual Spaces",
      color: "#10B981"
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Grow your spiritual community with AI guidance",
      color: "#3B82F6"
    },
    {
      icon: Zap,
      title: "AI-Powered Tools",
      description: "Access cutting-edge spiritual AI technology",
      color: "#F59E0B"
    },
    {
      icon: Shield,
      title: "Verified Partnership",
      description: "Green Heart Badge and verified status",
      color: "#8B5CF6"
    },
    {
      icon: TrendingUp,
      title: "Command Center Dashboard",
      description: "Professional analytics and revenue tracking",
      color: "#EF4444"
    },
    {
      icon: Target,
      title: "NeoBanking Suite",
      description: "Manage donations, tithes, and all earnings in one place",
      color: "#06B6D4"
    }
  ],
  affiliateTypes: [
    {
      id: "ministry",
      title: "Ministry Partner",
      icon: Building2,
      description: "Partner your ministry with DivinityAGI to offer AI-powered spiritual guidance. Earn through 4 revenue streams with institutional benefits.",
      gradient: "from-[#3B82F6] to-[#1D4ED8]",
      features: ["25% Affiliate Commission", "40% Engagement Revenue", "Donations/Tithes", "Virtual Worship Spaces"],
      commission: "$800-$3,600/month avg",
      applicationFee: "$99"
    },
    {
      id: "influencer",
      title: "Spiritual Innovator",
      icon: User,
      description: "Join as a spiritual leader to create your AI avatar, build your digital ministry, and earn through multiple streams. Perfect for ordained clergy, spiritual teachers, and faith influencers.",
      gradient: "from-[#8B5CF6] to-[#7C3AED]",
      features: ["25% Affiliate Commission", "40% Engagement Revenue", "Donations/Tithes", "Virtual Worship Spaces"],
      commission: "$800-$3,600/month avg",
      applicationFee: "$99"
    }
  ],
  suggestedTopics: [
    "Partnership Benefits", "4 Revenue Streams", "Application Fee ($99)", "Performance Analytics", 
    "Payment Methods", "Verification Process", "Success Stories", "Support Resources"
  ]
};

interface AffiliateProgramPageProps {
  onBack: () => void;
  onOpenMission?: () => void;
  onNavigate?: (route: string) => void;
}

export function AffiliateProgramPage({
  onBack,
  onOpenMission,
  onNavigate
}: AffiliateProgramPageProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(isLeaderSignedIn());
  const { canAccessPremium } = useSubscription();
  const { remainingMinutes } = useTimer();
  const { unlockedBadges, totalWisdomPoints } = useBadges();

  const handleApplyNow = (typeId: string) => {
    setSelectedType(typeId);
    const typeName = affiliateConfig.affiliateTypes.find(t => t.id === typeId)?.title;
    toast.success(`Starting application for ${typeName}`);
    
    // Navigate to contributors page with the appropriate type pre-selected
    if (typeId === "ministry" || typeId === "influencer") {
      // Store the initial type in localStorage so Contributors can pick it up
      // Ministry goes to ministry form, influencer goes to individual form
      localStorage.setItem('divinityagi_contributor_initial_type', typeId === "ministry" ? "ministry" : "individual");
      onNavigate?.("contributors");
    }
  };

  const handleGetStarted = () => {
    toast.success("Welcome to the DivinityAGI Affiliate Program!");
    // Navigate to application or contact form
  };

  const handleSignInSuccess = () => {
    setIsSignedIn(true);
    // Navigate to leader dashboard
    simulatePortalView('dashboard');
  };

  const handleSignOut = () => {
    signOutLeader();
    setIsSignedIn(false);
    toast.success("Signed out successfully");
  };

  // Demo portal preview functionality
  const simulatePortalView = (view: 'pending' | 'dashboard') => {
    if (view === 'pending') {
      toast.info("Preview: Your application is under review. You'll be notified once approved!");
    } else if (view === 'dashboard') {
      // Check if leader is signed in before accessing dashboard
      if (isLeaderSignedIn()) {
        onNavigate?.('verified-leader-dashboard');
      } else {
        toast.info("Please sign in to access your Leader Dashboard");
        setShowSignInModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white pb-20 relative overflow-hidden">
      {/* Simplified Dark Blue Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426] via-[#1E3A5F] to-[#0B1426]" />
        
        {/* Teal and gold accent overlays - reduced opacity */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(73,126,188,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(201,168,130,0.1),_transparent_60%)]" />
        
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(73,126,188,0.2) 1px, transparent 0)
            `,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative px-6 pt-[52px] pb-[16px] overflow-hidden pr-[24px] pl-[24px] bg-[#162844]/40 backdrop-blur-sm border-b border-[#1E3A5F]/40">
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="text-white hover:text-[#C9A882] p-0 h-auto backdrop-blur-md bg-[#162844]/60 hover:bg-[#162844]/80 rounded-xl px-4 py-3 transition-all duration-300 border border-[#497EBC]/30 hover:border-[#497EBC]/70 shadow-[0_2px_10px_rgba(73,126,188,0.15)] hover:shadow-[0_4px_15px_rgba(73,126,188,0.25)]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Leader Sign In Button */}
          <motion.div 
            className="absolute top-6 right-6 z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSignedIn ? (
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                className="text-white hover:text-[#C9A882] p-0 h-auto backdrop-blur-md bg-[#162844]/60 hover:bg-[#162844]/80 rounded-xl px-4 py-3 transition-all duration-300 border border-green-500/30 hover:border-green-500/50 shadow-[0_2px_10px_rgba(34,197,94,0.15)] hover:shadow-[0_4px_15px_rgba(34,197,94,0.25)]"
              >
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Sign Out
              </Button>
            ) : (
              <Button 
                onClick={() => setShowSignInModal(true)}
                variant="ghost" 
                className="text-white hover:text-[#C9A882] p-0 h-auto backdrop-blur-md bg-[#162844]/60 hover:bg-[#162844]/80 rounded-xl px-4 py-3 transition-all duration-300 border border-[#497EBC]/30 hover:border-[#497EBC]/70 shadow-[0_2px_10px_rgba(73,126,188,0.15)] hover:shadow-[0_4px_15px_rgba(73,126,188,0.25)]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Leader Sign In
              </Button>
            )}
          </motion.div>

          {/* Hero Image with dark cosmic aesthetics */}
          <div className="relative max-w-4xl mx-auto mb-8">
            {/* Square Video Container */}
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(122,79,255,0.3)] aspect-square max-w-2xl mx-auto"
            >
              {/* Background Video */}
              <video
                autoPlay
                muted={false}
                playsInline
                poster={affiliateVideoPoster}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://divinityagi.com/wp-content/uploads/2026/01/App-BG-Vefified-Leader.mp4" type="video/mp4" />
              </video>
              
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/95 via-[#162844]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/20 via-transparent to-[#C9A882]/20" />
              
              {/* Elegant floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i % 2 === 0 
                        ? 'linear-gradient(135deg, #497EBC, #5A8ECC)' 
                        : 'linear-gradient(135deg, #C9A882, #B89872)',
                      left: `${8 + i * 8}%`,
                      top: `${10 + (i % 4) * 20}%`,
                      boxShadow: i % 2 === 0 
                        ? '0 0 10px rgba(73,126,188,0.6)' 
                        : '0 0 10px rgba(201,168,130,0.6)',
                    }}
                    animate={{
                      y: [-15, 15, -15],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.6,
                    }}
                  />
                ))}
              </div>

              {/* Title Section - Overlaid on video */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center px-6"
              >
                <div className="text-center px-[0px] py-[9px] pt-[123px] pr-[0px] pb-[9px] pl-[0px]">
                  <h1 className="mb-6 bg-gradient-to-r from-white via-[#497EBC] to-[#C9A882] bg-clip-text text-transparent leading-tight text-[32px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {affiliateConfig.name}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] mx-auto rounded-full mb-6 shadow-[0_2px_15px_rgba(73,126,188,0.6)]" />
                  <p className="text-white/90 max-w-2xl mx-auto leading-relaxed text-[15px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, lineHeight: 1.6 }}>
                    {affiliateConfig.subtitle}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Demo Portal Preview Section */}
        <section className="px-6 mb-[64px] relative mt-[30px] mr-[0px] ml-[0px]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card 
                className="border border-green-500/30 p-8 backdrop-blur-sm shadow-[0_0_0_2px_#a79a4c,0_4px_20px_rgba(30,58,95,0.4)] rounded-3xl"
                style={{
                  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)'
                }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-400/30 border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    <Shield className="w-10 h-10 text-green-400 fill-green-500/20" />
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl text-green-400 mb-3 flex items-center justify-center gap-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    <span>Verified</span>
                  </h3>
                  <p className="text-white/80 text-lg" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                    Your profile is approved.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={() => simulatePortalView('dashboard')} 
                    className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white px-8 py-3 shadow-[0_4px_20px_rgba(167,154,76,0.35)] hover:shadow-[0_6px_30px_rgba(167,154,76,0.45)] transition-all duration-300 hover:scale-[1.02]"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Access Dashboard
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4 bg-gradient-to-r from-white via-[#497EBC] to-[#C9A882] bg-clip-text text-transparent text-[24px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                Partnership Benefits
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] mx-auto rounded-full shadow-[0_2px_12px_rgba(73,126,188,0.5)]" />
            </motion.div>

            {/* Enhanced Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {affiliateConfig.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                >
                  <Card className="bg-[#2C4A6B]/70 border-[#497EBC]/20 hover:border-[#497EBC]/40 transition-all duration-500 cursor-pointer group backdrop-blur-sm overflow-hidden h-full p-6 shadow-[0_2px_15px_rgba(30,58,95,0.3)] hover:shadow-[0_4px_20px_rgba(73,126,188,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/5 via-[#C9A882]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-[0_2px_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
                          style={{ backgroundColor: benefit.color }}
                        >
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white group-hover:text-[#C9A882] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                        {benefit.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Affiliate Types Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4 bg-gradient-to-r from-white via-[#497EBC] to-[#C9A882] bg-clip-text text-transparent text-[24px]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                Choose Your Partnership
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] mx-auto rounded-full shadow-[0_2px_12px_rgba(73,126,188,0.5)]" />
            </motion.div>

            {/* Enhanced Partnership Types Grid */}
            <div className="grid lg:grid-cols-1 gap-8">
              {affiliateConfig.affiliateTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
                >
                  <Card className="bg-[#162844]/60 border-[#7A4FFF]/30 hover:border-[#7A4FFF]/60 transition-all duration-500 cursor-pointer group backdrop-blur-sm overflow-hidden shadow-[0_4px_20px_rgba(122,79,255,0.2)] hover:shadow-[0_8px_30px_rgba(122,79,255,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/10 via-[#C9A882]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-8">
                      <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Enhanced Icon */}
                        <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.gradient} flex items-center justify-center shadow-[0_4px_20px_rgba(122,79,255,0.4)] group-hover:shadow-[0_6px_25px_rgba(122,79,255,0.5)] group-hover:scale-110 transition-all duration-500`}>
                            <type.icon className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        {/* Enhanced Content */}
                        <div className="flex-1 min-w-0 text-center lg:text-left">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="mb-4 lg:mb-0">
                              <h3 className="text-white mb-2 group-hover:text-[#C9A882] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                                {type.title}
                              </h3>
                              <Badge className="bg-gradient-to-r from-[#C9A882]/30 to-[#B89872]/40 border-[#C9A882]/50 text-[#C9A882] px-3 py-1 mb-3 shadow-[0_2px_12px_rgba(201,168,130,0.3)]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                                {type.commission} Commission
                              </Badge>
                            </div>
                          </div>

                          <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                            {type.description}
                          </p>

                          {/* Features List */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {type.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#497EBC] to-[#C9A882] rounded-full mr-2 shadow-[0_0_6px_rgba(73,126,188,0.5)]" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* Enhanced Action Button */}
                          <Button 
                            onClick={() => handleApplyNow(type.id)}
                            className="w-full lg:w-auto h-12 bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white rounded-xl shadow-[0_4px_20px_rgba(167,154,76,0.35)] hover:shadow-[0_6px_30px_rgba(167,154,76,0.45)] transition-all duration-300 hover:scale-[1.02]"
                            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                          >
                            <Handshake className="w-5 h-5 mr-2" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Suggested Topics */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="text-center mb-12"
            >
              <h3 className="mb-4 bg-gradient-to-r from-white via-[#497EBC] to-[#C9A882] bg-clip-text text-transparent text-[24px]" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}>
                Learn More About
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#497EBC] via-[#C9A882] to-[#497EBC] mx-auto rounded-full shadow-[0_2px_12px_rgba(73,126,188,0.5)]" />
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {affiliateConfig.suggestedTopics.map((topic, index) => {
                // Map topics to navigation actions
                const handleTopicClick = () => {
                  switch(topic) {
                    case "Partnership Benefits":
                      toast.info("View our comprehensive partnership benefits above");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      break;
                    case "4 Revenue Streams":
                      toast.info("Commission rates: Ministry 50%, Influencer 40%, Educator 35%");
                      break;
                    case "Application Fee ($99)":
                      toast.info("Application fee is $99 for all partnership types");
                      break;
                    case "Performance Analytics":
                      if (onNavigate) {
                        toast.success("Navigating to your profile dashboard");
                        onNavigate("profile");
                      }
                      break;
                    case "Payment Methods":
                      if (onNavigate) {
                        toast.success("View payment options in billing");
                        onNavigate("billing");
                      }
                      break;
                    case "Verification Process":
                      toast.info("Scroll down to view application forms for each partnership type");
                      break;
                    case "Success Stories":
                      if (onNavigate) {
                        toast.success("View verified leaders and their success");
                        onNavigate("leaders");
                      }
                      break;
                    case "Support Resources":
                      if (onNavigate) {
                        toast.success("Access support in settings");
                        onNavigate("settings");
                      }
                      break;
                    default:
                      toast.info(`Learn more about ${topic}`);
                  }
                };

                return (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.8 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={handleTopicClick}
                  >
                    <Card className="bg-[#162844]/60 border-[#7A4FFF]/30 hover:border-[#7A4FFF]/60 transition-all duration-300 group backdrop-blur-sm overflow-hidden relative p-4 h-20 flex items-center justify-center shadow-[0_2px_15px_rgba(122,79,255,0.2)] hover:shadow-[0_4px_20px_rgba(122,79,255,0.3)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7A4FFF]/10 via-[#C9A882]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <p className="text-white text-sm leading-relaxed group-hover:text-[#C9A882] transition-colors duration-200 text-center relative z-10" style={{ fontWeight: 500 }}>
                        {topic}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      
      {/* Leader Sign-In Modal */}
      <AnimatePresence>
        {showSignInModal && (
          <LeaderSignInModal
            onClose={() => setShowSignInModal(false)}
            onSignInSuccess={handleSignInSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}