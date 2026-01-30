import React from 'react';
import flamingEagleImage from 'figma:asset/d9247b89f6edf2ba435fc7cdfe5bc6a8495ecdd0.png';
import newVerificationHeroImage from 'figma:asset/48a4d00d482a72f4e4712027db9ca6884d643948.png';
import leaderWomanImage from 'figma:asset/936069199d8bf088e4dae0072f3271aa27baad55.png';
import threePeopleImage from 'figma:asset/ab9246794239dcd99b270f4339c7a5ad8992f59e.png';
import timSteinruckImage from 'figma:asset/04507b36ab8e9c59649d0e274d1c40c9c083178a.png';
import verifiedLeaderVideoPoster from 'figma:asset/69d2c6cd1cc1a505a6a7435d86246c36fcb510f6.png';
import verifiedLeadersHeaderBg from 'figma:asset/e3ea943ab692bea9bbdd3bdfa22774ddd1eae083.png';
import getVerifiedLeadersImage from 'figma:asset/7425bb5118d944f815abfa4ff5a636767677042d.png';

import { useState, memo } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SpiritualJourneySection } from "./spiritual-journey-section";
import { AppFooter } from "./app-footer";
import { LeaderMatchingProcess } from "./leader-matching-process";
import { 
  Shield, 
  Search, 
  Star, 
  Users, 
  Globe,
  MessageCircle,
  Eye,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  Sparkles,
  ChevronDown,
  Brain,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

// ==================== CONSTANTS ====================

/**
 * Leader card background gradient style
 * Updated to match new design system with Blue Pantone gradient
 */
const LEADER_CARD_STYLE = {
  background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)',
  boxShadow: '0 0 0 2px #a79a4c, 0 20px 50px rgba(0, 0, 0, 0.4)'
};

/**
 * Faith tradition filter options
 * Note: Counts are placeholder values for future leader additions
 * Actual current counts are lower (1-2 per category)
 */
const faithFilters = [
  { id: "all", name: "All Leaders", count: 12 },
  { id: "christian", name: "Christian", count: 12 },
  { id: "buddhist", name: "Buddhist", count: 8 },
  { id: "islamic", name: "Islamic", count: 6 },
  { id: "jewish", name: "Jewish", count: 4 },
  { id: "hindu", name: "Hindu", count: 5 },
  { id: "other", name: "Other", count: 3 }
];

/**
 * How AI Agents Work feature cards
 */
const howItWorksItems = [
  {
    icon: Users,
    title: "Authentic Profiles",
    description: "Leaders train their AI agents with their wisdom and teachings."
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "AI-powered guidance available anytime you need support."
  },
  {
    icon: DollarSign,
    title: "Included with Subscription",
    description: "Engage with verified faith leaders at no extra cost."
  }
];

/**
 * Featured spiritual leaders data
 * Active leaders have full profiles available
 */
const featuredLeaders = [
  {
    id: "steinruck",
    name: "Master Tim Steinruck",
    role: "Life Coach, Author",
    avatar: timSteinruckImage,
    followers: "2.5M",
    rating: 4.9,
    bio: "Accelerated Evolution (AE) techniques eliminate ANY of your non-serving beliefs or emotional / mental blocks.",
    tags: ["Transformation", "Personal Growth", "Mindset", "AE Techniques"],
    sessions: "8.4K",
    languages: ["English"],
    tradition: "Christian",
    isActive: true
  },
  {
    id: "flaming-eagle",
    name: "James Warren \"Flaming Eagle\" Mooney",
    role: "Seminole Medicine Man & Elder",
    avatar: flamingEagleImage,
    followers: "1.8M",
    rating: 4.9,
    bio: "Founder and spiritual leader of the Oklevueha Native American Church (ONAC), teaching harmony with creation, sacred ceremony, and the seven guiding values of faith, humility, charity, respect, honor, forgiveness, and gratitude.",
    tags: ["Native Spirituality", "Sacred Ceremony", "Cultural Preservation", "Harmony"],
    sessions: "6.2K",
    languages: ["English"],
    tradition: "Other",
    isActive: true
  }
];

// ==================== INTERFACES ====================

interface VerifiedLeadersProps {
  onNavigate?: (tab: string) => void;
  onOpenMission?: () => void;
}

// ==================== MAIN COMPONENT ====================

/**
 * Verified Leaders Page
 * Displays faith leaders available through AI-powered conversations
 * Includes filtering, search, and profile access
 * 
 * @param onNavigate - Callback for page navigation
 * @param onOpenMission - Callback to open mission modal
 */
export const VerifiedLeaders = memo(function VerifiedLeaders({ onNavigate, onOpenMission }: VerifiedLeadersProps = {}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMatchingProcess, setShowMatchingProcess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter leaders by faith tradition and search query
  const filteredLeaders = featuredLeaders.filter(leader => {
    // Faith tradition filter with improved matching logic
    // Handles "Other" category for traditions not in main filters
    const matchesFilter = activeFilter === "all" || 
      leader.tradition.toLowerCase().includes(activeFilter) ||
      (activeFilter === "other" && !["christian", "buddhist", "islamic", "jewish", "hindu"].includes(leader.tradition.toLowerCase()));
    
    // Search query matches name or tags
    const matchesSearch = leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         leader.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Show matching process overlay when active */}
      {showMatchingProcess && (
        <div className="fixed inset-0 z-50">
          <LeaderMatchingProcess 
            onNavigate={(page) => {
              setShowMatchingProcess(false);
              if (onNavigate) onNavigate(page);
            }}
            onClose={() => setShowMatchingProcess(false)}
          />
        </div>
      )}

      <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
        <div className="relative z-10">
          {/* Header Section with Background Image */}
          <section className="px-4 sm:px-6 pt-[30px] sm:pb-2 text-center relative z-10 mx-auto max-w-full min-h-screen sm:min-h-[450px]">
            {/* Background Image - Full width on mobile, rounded on desktop */}
            <div className="absolute inset-0 sm:rounded-3xl overflow-hidden -z-10">
              <img 
                src={verifiedLeadersHeaderBg} 
                alt="" 
                className="w-full h-full object-cover opacity-100"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-0 sm:mb-2 relative py-8"
            >
              {/* Verified Shield Icon */}
              <div className="mb-6 sm:mb-8 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <h1 className="text-[40px] sm:text-[48px] text-white mb-1 sm:mb-3" style={{ fontFamily: "Butler, serif", fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Verified Leaders
              </h1>
              
              <div className="w-20 h-0.5 sm:h-1 sm:w-24 bg-gradient-to-r from-[#497EBC] to-[#b69e60] mx-auto rounded-full mb-1 sm:mb-3" />
              
              <p className="text-[13px] sm:text-[14px] text-white mb-0 sm:mb-3 px-8 sm:px-20" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.5 }}>
                Make a 24-7 connection with a real-life pro.
              </p>
            </motion.div>
          </section>

          {/* Get Verified Call-to-Action with Video Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="px-4 sm:px-6 pb-6 sm:pb-6 pt-4 relative z-20"
          >
            <div className="w-full max-w-sm mx-auto relative flex justify-center">
              {/* Background Image Container */}
              <div className="relative rounded-3xl overflow-hidden min-h-[700px] sm:min-h-[800px] w-full">
                {/* Background Video */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center">
                  <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={verifiedLeaderVideoPoster}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  >
                    <source src="https://divinityagi.com/wp-content/uploads/2026/01/Verified-Ledaer-Group-Loop.mp4" type="video/mp4" />
                    {/* Fallback to poster image if video doesn't load */}
                    <img 
                      src={verifiedLeaderVideoPoster} 
                      alt="Verified Leaders"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center top' }}
                    />
                  </video>
                </div>
                
                {/* Glassmorphism Card Overlay - Positioned at bottom */}
                <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center items-end z-10 px-4 sm:px-0 mx-[0px] my-[116px]">
                  <div 
                    className="cursor-pointer group w-full max-w-[280px] sm:max-w-sm"
                    onClick={() => setShowMatchingProcess(true)}
                  >
                    <div className="relative backdrop-blur-md bg-white/10 rounded-2xl border border-[#b69e60] shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(182,158,96,0.4)] w-full aspect-square mx-auto transition-all duration-300 active:scale-[0.98] sm:hover:scale-[1.02] flex flex-col items-center justify-center p-4 sm:p-5" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
                      <h3 className="text-[26px] sm:text-[30px] md:text-[34px] text-white mb-2 sm:mb-2 leading-tight text-center" style={{ fontFamily: "Butler, serif", fontWeight: 700 }}>
                        Search for a Leader
                      </h3>
                      
                      <p className="text-center text-white text-[12px] sm:text-[13px] md:text-[14px] mb-3 sm:mb-4 md:mb-5 max-w-[240px] sm:max-w-sm mx-auto" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, lineHeight: '1.6' }}>
                        Meet a verified spiritual leader who aligns with your faith tradition and personal journey.
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-[11px] sm:text-[12px] md:text-[13px] mb-4 sm:mb-5 md:mb-6 flex-wrap" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, textShadow: '0 2px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.7)' }}>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                          <span className="font-[Raleway]">Personalized matching</span>
                        </div>
                        <span className="text-white/70 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-lg flex-shrink-0" />
                          <span className="font-[Raleway]">24/7 Access</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center w-full">
                        <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#b69e60] to-[#a88e56] hover:from-[#c4ab6d] hover:to-[#b69e60] rounded-full text-white shadow-[0_4px_20px_rgba(182,158,96,0.4),0_0_30px_rgba(182,158,96,0.2)] hover:shadow-[0_6px_30px_rgba(182,158,96,0.6),0_0_40px_rgba(182,158,96,0.3)] transition-all text-[13px] sm:text-[14px] md:text-[15px] touch-manipulation active:scale-95" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                          Start Matching
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Leaders Section */}
          <section className="px-6 pt-8 mb-10">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-[32px] text-[#3D3D6B] mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 1.2 }}>
                  Featured Leaders
                </h2>
                <p className="text-[14px] text-gray-600" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, lineHeight: 1.6 }}>
                  Choose a Guide to Chat Instantly
                </p>
              </motion.div>

              {/* Faith Tradition Filter Chips */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {faithFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-full text-[12px] whitespace-nowrap transition-all duration-300 ${
                          activeFilter === filter.id
                            ? 'bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {filter.name} ({filter.count})
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Leaders Grid */}
              <div className="space-y-4">
                {filteredLeaders.map((leader, index) => (
                  <motion.div
                    key={leader.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <Card 
                      onClick={() => {
                        if (leader.isActive && onNavigate) {
                          onNavigate(`leader-${leader.id}`);
                        }
                      }}
                      className={`border-0 rounded-3xl transition-all duration-300 overflow-hidden text-white ${
                        leader.isActive 
                          ? 'cursor-pointer hover:scale-[1.02]'
                          : 'cursor-default opacity-75'
                      }`}
                      style={LEADER_CARD_STYLE}
                    >
                      {/* Coming Soon Badge for Inactive Profiles */}
                      {!leader.isActive && (
                        <div className="absolute top-4 right-4 z-20">
                          <Badge className="bg-slate-700/60 text-slate-300 border border-slate-600/40 px-3 py-1 text-[10px]" style={{ fontWeight: 500 }}>
                            <Clock className="w-3 h-3 mr-1" />
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-start gap-6">
                          {/* Leader Avatar */}
                          <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                            <div className="relative">
                              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg">
                                <ImageWithFallback
                                  src={leader.avatar}
                                  alt={leader.name}
                                  className="w-full h-full object-contain"
                                />
                                {!leader.isActive && (
                                  <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[1px]" />
                                )}
                              </div>
                              {/* Active Status Indicator */}
                              {leader.isActive && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFD369] rounded-full border-2 border-[#0a3d4d] flex items-center justify-center shadow-[0_0_12px_rgba(255,211,105,0.6)]">
                                  <div className="w-2 h-2 bg-[#FFB84D] rounded-full animate-pulse" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Leader Information */}
                          <div className="flex-1 min-w-0 w-full text-center lg:text-left">
                            {/* Header with Name, Role, and Rating */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                              <div className="min-w-0 flex-1 mb-3 lg:mb-0">
                                <h3 className="text-[18px] text-white mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                                  {leader.name}
                                </h3>
                                <p className="text-[12px] text-slate-300 mb-2" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>{leader.role}</p>
                                {/* Followers Count */}
                                <div className="flex items-center justify-center lg:justify-start text-[11px] text-slate-400" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                                  <Users className="w-3 h-3 mr-1" />
                                  <span>{leader.followers} followers</span>
                                </div>
                              </div>
                              
                              {/* Rating Badge */}
                              <div className="flex items-center justify-center lg:justify-end">
                                <div className="bg-[#FFD369]/25 border border-[#FFD369]/40 rounded-full px-3 py-1 flex items-center gap-1 shadow-[0_0_12px_rgba(255,211,105,0.3)]">
                                  <Star className="w-3 h-3 text-[#FFD369] fill-current" />
                                  <span className="text-[12px] text-[#FFD369]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>{leader.rating}</span>
                                </div>
                              </div>
                            </div>

                            {/* Bio */}
                            <p className="text-[13px] text-slate-300 mb-4 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                              {leader.bio}
                            </p>

                            {/* Expertise Tags */}
                            <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                              {leader.tags.slice(0, 4).map((tag, tagIndex) => (
                                <Badge 
                                  key={tag} 
                                  className="px-3 py-1 rounded-full bg-[#a79a4c]/20 border border-[#a79a4c]/40 text-[#a79a4c] text-[10px]"
                                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Meta Information (Sessions and Languages) */}
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 text-[11px] text-slate-400" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{leader.sessions} sessions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                <span>{leader.languages.join(", ")}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              {leader.isActive ? (
                                <>
                                  <Button className="flex-1 bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white h-10 rounded-full shadow-[0_4px_15px_rgba(167,154,76,0.4)] hover:shadow-[0_6px_25px_rgba(167,154,76,0.6)] transition-all duration-300" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Connect Now
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="flex-1 sm:flex-initial h-10 border-[#1e386e]/50 bg-[#1e386e]/40 text-slate-300 hover:bg-[#1e386e]/60 rounded-full px-6"
                                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  disabled
                                  className="flex-1 bg-slate-700/40 text-slate-400 h-10 rounded-full cursor-not-allowed border border-slate-600/40"
                                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Profile Coming Soon
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Get Verified Section */}
          <section className="px-6 mb-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="max-w-sm mx-auto"
              >
                {/* Get Verified Card */}
                <Card
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('affiliate');
                    }
                  }}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={getVerifiedLeadersImage} 
                      alt="Get Verified"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 sm:p-12 min-h-[550px] sm:min-h-[650px] flex flex-col justify-center bg-[rgba(45,74,107,0.76)]">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/25 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      
                      <h3 className="text-[28px] sm:text-[32px] text-white mb-3 sm:mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                        Get Verified
                      </h3>
                      
                      <p className="text-white/95 text-[15px] sm:text-[16px] mb-6 sm:mb-8 max-w-xs mx-auto px-2 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                        Share your wisdom with the world as a verified spiritual leader on DivinityAGI
                      </p>
                      
                      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-white/90 text-[13px] sm:text-[14px] mb-6 sm:mb-8 px-2" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                          <span>Reach thousands of seekers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                          <span>Build your legacy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                          <span>Earn passive income</span>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#a79a4c] hover:bg-[#b8a85d] rounded-full text-white shadow-[0_8px_30px_rgba(167,154,76,0.5)] hover:shadow-[0_10px_40px_rgba(167,154,76,0.7)] transition-all text-[15px] sm:text-[17px] group-hover:scale-105" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                        Apply Now
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* FAQ Section - How AI Agents Work & What to Expect */}
          <section className="px-6 mb-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-3xl p-8 shadow-xl border border-blue-100">
                  {/* FAQ Header */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#497EBC] to-[#b69e60] rounded-2xl mb-4 shadow-lg">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-[32px] text-[#3D3D6B] mb-3" style={{ fontFamily: "Butler, serif", fontWeight: 700, lineHeight: 1.2 }}>
                      Frequently Asked Questions
                    </h2>
                    <p className="text-[14px] text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                      Everything you need to know about AI Agents and Verified Leaders
                    </p>
                  </div>
                  
                  {/* FAQ Accordion */}
                  <div className="space-y-3">
                    {[
                      {
                        question: "How do AI Agents work?",
                        answer: "AI Agents are powered by advanced language models trained on each Verified Leader's personal wisdom, teachings, and communication style. Leaders provide extensive input through questionnaires, writings, and training materials, allowing the AI to reflect their authentic voice and guidance philosophy. Think of it as having 24/7 access to a leader's wisdom.",
                        icon: Brain
                      },
                      {
                        question: "What is a Verified Leader?",
                        answer: "Verified Leaders are real faith leaders, spiritual teachers, life coaches, and counselors who have been vetted by DivinityAGI. They include ordained clergy, experienced teachers with 10+ years of service, published authors, and recognized influencers in their faith traditions. Each leader creates an AI agent trained on their personal teachings and approach.",
                        icon: Shield
                      },
                      {
                        question: "Are AI Agents the same as talking to the real leader?",
                        answer: "AI Agents provide guidance based on the leader's teachings and philosophy, but they are not a replacement for direct human connection. They're perfect for daily reflection, quick questions, and ongoing spiritual support. For deeper, more personal matters, leaders may offer live sessions (coming soon).",
                        icon: Users
                      },
                      {
                        question: "Can I talk to AI Agents 24/7?",
                        answer: "Yes! That's the beauty of AI Agents. Whether it's 3 AM and you need guidance, or you're traveling across time zones, your chosen leader's AI agent is always available. No appointments needed, no waiting - instant spiritual support whenever you need it.",
                        icon: Clock
                      },
                      {
                        question: "What can I expect from a conversation?",
                        answer: "Conversations are personalized, compassionate, and rooted in the leader's authentic teachings. You can ask about faith questions, seek guidance on life decisions, request prayer or meditation practices, discuss ethical dilemmas, or simply have a reflective conversation. The AI adapts to your needs while staying true to the leader's approach.",
                        icon: MessageCircle
                      },
                      {
                        question: "How much does it cost?",
                        answer: "Verified Leader AI Agents are included with your DivinityAGI subscription at no extra cost! Subscriptions start with our Seeker plan. All verified leaders are accessible to subscribers, giving you the flexibility to connect with multiple leaders across different traditions.",
                        icon: DollarSign
                      },
                      {
                        question: "What's the difference between AI Guides and Verified Leaders?",
                        answer: "AI Guides (available on the Guides page) are created by our team to represent various faith traditions and spiritual archetypes. Verified Leaders are real people who have trained their own AI agents with their personal wisdom and teachings. Both offer valuable guidance, but Verified Leaders provide authentic insights from experienced spiritual professionals.",
                        icon: Sparkles
                      },
                      {
                        question: "How do I know the guidance is trustworthy?",
                        answer: "All Verified Leaders undergo a thorough verification process including credential checks, experience validation, and content review. Leaders must have significant experience (typically 10+ years), verifiable credentials, and a demonstrated commitment to ethical spiritual guidance. We also monitor AI responses to ensure quality and safety.",
                        icon: CheckCircle
                      }
                    ].map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      const Icon = faq.icon;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6 + index * 0.05, duration: 0.5 }}
                          className="group"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                            className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                              isOpen 
                                ? 'bg-white shadow-lg border-2 border-[#497EBC]' 
                                : 'bg-white/70 hover:bg-white shadow-sm border-2 border-transparent hover:border-blue-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                  isOpen 
                                    ? 'bg-gradient-to-br from-[#497EBC] to-[#b69e60] shadow-lg' 
                                    : 'bg-gradient-to-br from-blue-100 to-amber-100'
                                }`}>
                                  <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-[#497EBC]'}`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className={`text-[16px] mb-1 transition-colors duration-300 ${
                                    isOpen ? 'text-[#497EBC]' : 'text-[#3D3D6B] group-hover:text-[#497EBC]'
                                  }`} style={{ fontWeight: 600 }}>
                                    {faq.question}
                                  </h3>
                                  <motion.div
                                    initial={false}
                                    animate={{ 
                                      height: isOpen ? 'auto' : 0,
                                      opacity: isOpen ? 1 : 0,
                                      marginTop: isOpen ? 12 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="text-[14px] text-gray-600 leading-relaxed" style={{ fontWeight: 400 }}>
                                      {faq.answer}
                                    </p>
                                  </motion.div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <motion.div
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                    isOpen 
                                      ? 'bg-[#497EBC] text-white' 
                                      : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-[#497EBC]'
                                  }`}
                                >
                                  <ChevronDown className="w-5 h-5" />
                                </motion.div>
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Call to Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.5 }}
                    className="mt-8 p-6 bg-gradient-to-r from-[#497EBC]/10 to-[#b69e60]/10 rounded-2xl border-2 border-dashed border-[#497EBC]/30"
                  >
                    <div className="text-center">
                      <p className="text-[14px] text-gray-700 mb-4" style={{ fontWeight: 500 }}>
                        Still have questions? We're here to help!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={() => setShowMatchingProcess(true)}
                          className="bg-gradient-to-r from-[#497EBC] to-[#5A8ECC] hover:from-[#3A6EAC] hover:to-[#4A7EBC] text-white rounded-full px-6 shadow-lg"
                          style={{ fontWeight: 600 }}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Find Your Leader
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onNavigate && onNavigate('guides')}
                          className="border-[#497EBC] text-[#497EBC] hover:bg-[#497EBC]/10 rounded-full px-6"
                          style={{ fontWeight: 600 }}
                        >
                          Explore AI Guides
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Spiritual Journey Section */}
          <SpiritualJourneySection onNavigate={onNavigate} />

          {/* Footer */}
          <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
});