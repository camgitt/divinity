/**
 * Leader Matching Process Component
 * 
 * This component helps users find the perfect Verified Leader based on:
 * - Leader onboarding criteria (faith background, expertise, role, experience)
 * - User's specific needs for guidance
 * 
 * Matching is based on the verified leader application attributes:
 * - Faith tradition/background
 * - Areas of expertise (Prayer, Mental Health, Life Transitions, etc.)
 * - Years of service/experience
 * - Current role (Faith Leader, Spiritual Teacher, Life Coach, etc.)
 * - Language preferences
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BackgroundVideo } from "./background-video";
import newVerificationHeroImage from 'figma:asset/48a4d00d482a72f4e4712027db9ca6884d643948.png';
import timSteinruckImage from 'figma:asset/04507b36ab8e9c59649d0e274d1c40c9c083178a.png';
import flamingEagleImage from 'figma:asset/d9247b89f6edf2ba435fc7cdfe5bc6a8495ecdd0.png';

// Faith symbol imports
import christianCrossImage from 'figma:asset/4f05d38222fad7a295a249e1c5585d22b9c9ee33.png';
import jewishStarImage from 'figma:asset/b69db2b5d663e554055f9374a5a9ad8456cde58c.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import taoistYinYangImage from 'figma:asset/c397d643e112416d09d7db13091a278ced73b15a.png';
import buddhistDharmaWheelImage from 'figma:asset/608e0bda2ef24ff5c6c2c3db58bc2977a2999739.png';
import shintoToriiImage from 'figma:asset/cbedb086a3581eacb3cd37924ce6d70079a0d267.png';
import jainHandImage from 'figma:asset/a2eee3f20602ba33f4e72f04d7c55725d6773e30.png';
import polytheismCircleImage from 'figma:asset/9ff2251323feab51585b09eb603462a37f34b643.png';
import islamCrescentImage from 'figma:asset/a5ab3d839924023949cf4fb780ffed4eed18db88.png';
import confuciusCharacterImage from 'figma:asset/6597d1c24da1b3fb6d3682910db9c7d838ef88c5.png';
import bahaiStarImage from 'figma:asset/6a635cafe9ba90b87d513400d449fe13e3c2f63b.png';
import sikhKhandaImage from 'figma:asset/96952c71f84ce0599cc3e18fecf53302df4e862c.png';

import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Heart, 
  Star, 
  Sparkles,
  CheckCircle,
  Users,
  BookOpen,
  Brain,
  HeartPulse,
  Compass,
  HandHeart,
  Wind,
  TreePine,
  Home,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Languages,
  Award,
  Clock,
  ChevronDown
} from "lucide-react";

import { toast } from "sonner@2.0.3";

interface LeaderMatchingProcessProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

interface MatchingFormData {
  faithPreference: string;
  expertiseNeeds: string[];
  leaderRole: string;
  languagePreference: string;
  guidanceType: string;
  hasReligiousPreference: boolean | null;
}

const initialFormData: MatchingFormData = {
  faithPreference: "",
  expertiseNeeds: [],
  leaderRole: "",
  languagePreference: "English",
  guidanceType: "",
  hasReligiousPreference: null
};

// Mock leader data (in production, this would come from your database)
const verifiedLeaders = [
  {
    id: "steinruck",
    name: "Master Tim Steinruck",
    role: "Life Coach, Author",
    avatar: timSteinruckImage,
    faithBackground: "Christian",
    yearsOfService: 15,
    expertise: ["Mental Health & Spirituality", "Personal Growth & Transformation", "Life Transitions & Change"],
    languages: ["English"],
    rating: 4.9,
    sessions: "8.4K",
    bio: "Accelerated Evolution (AE) techniques eliminate ANY of your non-serving beliefs or emotional / mental blocks."
  },
  {
    id: "flaming-eagle",
    name: "James Warren \"Flaming Eagle\" Mooney",
    role: "Seminole Medicine Man & Elder",
    avatar: flamingEagleImage,
    faithBackground: "Indigenous Spirituality",
    yearsOfService: 40,
    expertise: ["Cultural Preservation", "Sacred Ceremony", "Community & Relationships", "End-of-Life & Grief"],
    languages: ["English"],
    rating: 4.9,
    sessions: "6.2K",
    bio: "Founder and spiritual leader of the Oklevueha Native American Church (ONAC), teaching harmony with creation."
  }
];

export function LeaderMatchingProcess({ onNavigate, onClose }: LeaderMatchingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<MatchingFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof MatchingFormData, string>>>({});
  const [matchedLeaders, setMatchedLeaders] = useState<typeof verifiedLeaders>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [showAllExpertise, setShowAllExpertise] = useState(false);

  const updateFormData = useCallback((field: keyof MatchingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const handleExpertiseChange = useCallback((value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expertiseNeeds: checked
        ? [...prev.expertiseNeeds, value]
        : prev.expertiseNeeds.filter(g => g !== value)
    }));
    setErrors(prev => ({ ...prev, expertiseNeeds: undefined }));
  }, []);

  const nextStep = useCallback(() => {
    // Validation
    if (currentStep === 1 && formData.hasReligiousPreference === null) {
      setErrors({ hasReligiousPreference: "Please select an option" } as any);
      return;
    }
    if (currentStep === 2 && formData.hasReligiousPreference === true && !formData.faithPreference) {
      setErrors({ faithPreference: "Please select a faith tradition" });
      return;
    }
    if (currentStep === 3 && formData.expertiseNeeds.length === 0) {
      setErrors({ expertiseNeeds: "Please select at least one area of guidance" });
      return;
    }
    if (currentStep === 4 && !formData.leaderRole) {
      setErrors({ leaderRole: "Please select a leader type" });
      return;
    }

    // If user selects "No" to religious preference, skip faith symbols step
    if (currentStep === 1 && formData.hasReligiousPreference === false) {
      updateFormData("faithPreference", "Universal");
      setCurrentStep(3); // Skip to expertise needs
      return;
    }

    setCurrentStep(prev => prev + 1);
  }, [currentStep, formData, updateFormData]);

  const prevStep = useCallback(() => {
    // If going back from expertise step and user selected "No" preference, go back to preference question
    if (currentStep === 3 && formData.hasReligiousPreference === false) {
      setCurrentStep(1);
      return;
    }
    setCurrentStep(prev => prev - 1);
  }, [currentStep, formData.hasReligiousPreference]);

  const performMatching = useCallback(() => {
    setIsMatching(true);
    
    // Simulate matching algorithm
    setTimeout(() => {
      // In production, this would be a sophisticated algorithm matching:
      // - Faith background
      // - Expertise areas
      // - Role type
      // - Experience level
      // - Language
      const matches = verifiedLeaders.filter(leader => {
        // Faith matching
        if (formData.faithPreference && formData.faithPreference !== "Universal") {
          const faithMatch = leader.faithBackground.toLowerCase().includes(formData.faithPreference.toLowerCase()) ||
                            formData.faithPreference.toLowerCase().includes(leader.faithBackground.toLowerCase());
          if (!faithMatch && formData.faithPreference !== "Universal") {
            return false;
          }
        }
        
        // Expertise matching
        if (formData.expertiseNeeds.length > 0) {
          const hasExpertise = formData.expertiseNeeds.some(need =>
            leader.expertise.some(exp => exp.toLowerCase().includes(need.toLowerCase()))
          );
          if (!hasExpertise) return false;
        }
        
        return true;
      });

      setMatchedLeaders(matches);
      setIsMatching(false);
      setCurrentStep(6);
    }, 2000);
  }, [formData]);

  // Step 0: Welcome
  if (currentStep === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Background Video */}
        <BackgroundVideo
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Find-a-Verified-Leader-2.mp4"
          className="fixed inset-0"
          muted={false}
          loop={false}
          videoStyle={{
            transform: 'scale(1.5)',
            objectPosition: 'center 20%'
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" style={{ zIndex: 1 }} />

        {/* Content Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden"
        >
          {/* Header with Back Button */}
          <div className="p-6 flex items-center flex-shrink-0">
            <button
              onClick={() => onClose ? onClose() : onNavigate("leaders")}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-[52px] mt-[-48px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[16px] pl-[16px]">
            <div className="flex flex-col min-h-full mt-[0px] mr-[0px] mb-[4px] ml-[0px]">
              {/* Title Section */}
              <div className="text-center sm:pt-4 mt-[9px] mr-[0px] mb-[-5px] ml-[0px] pt-[276px] pr-[0px] pb-[0px] pl-[0px]">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-500/30 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse">
                    <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <h1 
                  className="text-white text-[24px] sm:text-[28px] mb-1.5" 
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
                >
                  Find a Verified Leader
                </h1>
                <p 
                  className="text-white/80 text-[12px] sm:text-[13px] max-w-xs mx-auto px-4"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                >
                  Connect with experienced faith leaders
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-2.5 sm:space-y-3 sm:mt-6 mt-[51px] mr-[0px] mb-[0px] ml-[0px]">
                {/* Feature 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                        >
                          Verified Experts
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Real faith leaders with years of experience
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                        >
                          Personalized Match
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Find a leader who aligns with your needs
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                        >
                          AI-Powered Access
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Connect anytime through their AI agent
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 mb-4"
              >
                <Button
                  onClick={() => setCurrentStep(1)}
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#2d5a8f] text-white rounded-full border-0 shadow-[0_10px_40px_rgba(73,126,188,0.5)] hover:shadow-[0_15px_50px_rgba(73,126,188,0.6)] transition-all duration-300 text-[16px] sm:text-[18px]"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                >
                  Start Matching
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Step 1: Religious Preference
  if (currentStep === 1) {
    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Step 1 of 5</span>
              <span className="text-sm text-white/60">20% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3]"
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-gradient-to-br from-[#1a2d4a]/40 to-[#0f1a2e]/40 border-[#497EBC]/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-3xl text-white mb-2">
                  Do you have a religious preference?
                </h2>
                <p className="text-sm md:text-base text-white/70">
                  We'll match you with a verified leader from your tradition
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <motion.button
                  key="yes"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData("hasReligiousPreference", true)}
                  className={`
                    p-3 md:p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]
                    ${formData.hasReligiousPreference === true
                      ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                      : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50'
                    }
                  `}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#497EBC]" />
                  </div>
                  <div className="text-xs md:text-sm text-white text-center leading-tight">Yes</div>
                </motion.button>
                <motion.button
                  key="no"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData("hasReligiousPreference", false)}
                  className={`
                    p-3 md:p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]
                    ${formData.hasReligiousPreference === false
                      ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                      : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50'
                    }
                  `}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#497EBC]" />
                  </div>
                  <div className="text-xs md:text-sm text-white text-center leading-tight">No</div>
                </motion.button>
              </div>

              {errors.hasReligiousPreference && (
                <p className="text-red-400 text-sm">{errors.hasReligiousPreference}</p>
              )}

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={() => setCurrentStep(0)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#2d5a8f] text-white flex-1 md:flex-none"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: Faith Preference
  if (currentStep === 2) {
    const faithOptions = [
      { label: "Christianity", value: "Christianity", image: christianCrossImage },
      { label: "Islam", value: "Islam", image: islamCrescentImage },
      { label: "Judaism", value: "Judaism", image: jewishStarImage },
      { label: "Hinduism", value: "Hinduism", image: hinduOmImage },
      { label: "Buddhism", value: "Buddhism", image: buddhistDharmaWheelImage },
      { label: "Taoism", value: "Taoism", image: taoistYinYangImage },
      { label: "Shinto", value: "Shinto", image: shintoToriiImage },
      { label: "Sikhism", value: "Sikhism", image: sikhKhandaImage },
      { label: "Jainism", value: "Jainism", image: jainHandImage },
      { label: "Bahá'í Faith", value: "Bahai", image: bahaiStarImage },
      { label: "Confucianism", value: "Confucianism", image: confuciusCharacterImage },
      { label: "Indigenous Spirituality", value: "Indigenous", image: polytheismCircleImage },
      { label: "Universal/Interfaith", value: "Universal", image: null },
    ];

    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Step 2 of 5</span>
              <span className="text-sm text-white/60">40% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3]"
                initial={{ width: "20%" }}
                animate={{ width: "40%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-gradient-to-br from-[#1a2d4a]/40 to-[#0f1a2e]/40 border-[#497EBC]/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-3xl text-white mb-2">
                  Which faith tradition do you practice?
                </h2>
                <p className="text-sm md:text-base text-white/70">
                  We'll match you with a verified leader from your tradition
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {faithOptions.map((faith) => (
                  <motion.button
                    key={faith.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("faithPreference", faith.value)}
                    className={`
                      p-3 md:p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]
                      ${formData.faithPreference === faith.value
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50'
                      }
                    `}
                  >
                    {faith.image ? (
                      <div className="w-10 h-10 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                        <ImageWithFallback
                          src={faith.image}
                          alt={faith.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 mb-2 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#497EBC]" />
                      </div>
                    )}
                    <div className="text-xs md:text-sm text-white text-center leading-tight">{faith.label}</div>
                  </motion.button>
                ))}
              </div>

              {errors.faithPreference && (
                <p className="text-red-400 text-sm">{errors.faithPreference}</p>
              )}

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={() => setCurrentStep(0)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#2d5a8f] text-white flex-1 md:flex-none"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Areas of Guidance Needed
  if (currentStep === 3) {
    const expertiseOptions = [
      { value: "Prayer & Spiritual Doubt", icon: BookOpen, color: "purple" },
      { value: "Mental Health & Spirituality", icon: Brain, color: "blue" },
      { value: "Life Transitions & Change", icon: Compass, color: "green" },
      { value: "Relationship & Marriage", icon: Heart, color: "pink" },
      { value: "Community & Relationships", icon: Users, color: "cyan" },
      { value: "Personal Growth & Transformation", icon: Sparkles, color: "amber" },
      { value: "End-of-Life & Grief", icon: HeartPulse, color: "rose" },
      { value: "Social Justice & Ethics", icon: Shield, color: "indigo" },
      { value: "Cultural Preservation", icon: TreePine, color: "green" },
      { value: "Family & Parenting", icon: Home, color: "orange" },
      { value: "Career & Purpose", icon: Briefcase, color: "violet" },
      { value: "Scripture & Theology", icon: GraduationCap, color: "blue" },
    ];

    // Show first 6 options initially, all options when expanded
    const visibleOptions = showAllExpertise ? expertiseOptions : expertiseOptions.slice(0, 6);

    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2.5 md:p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 md:p-8">
          <div className="mb-4 md:mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-white/60">Step 3 of 5</span>
              <span className="text-xs md:text-sm text-white/60">60% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3]"
                initial={{ width: "40%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-gradient-to-br from-[#1a2d4a]/40 to-[#0f1a2e]/40 border-[#497EBC]/30 backdrop-blur-sm">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-lg md:text-xl md:text-3xl text-white mb-1.5 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                  What areas do you need guidance in?
                </h2>
                <p className="text-xs md:text-sm md:text-base text-white/70" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                  Select all areas where you&apos;re seeking support (choose at least one)
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={showAllExpertise ? 'all' : 'limited'}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3"
                >
                  {visibleOptions.map((option) => (
                    <motion.label
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        flex items-center gap-2.5 md:gap-3 p-3.5 md:p-4 rounded-lg border-2 cursor-pointer transition-all min-h-[56px] md:min-h-[64px]
                        ${formData.expertiseNeeds.includes(option.value)
                          ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                          : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:bg-white/10'
                        }
                      `}
                    >
                      <Checkbox
                        checked={formData.expertiseNeeds.includes(option.value)}
                        onCheckedChange={(checked) => handleExpertiseChange(option.value, checked as boolean)}
                        className="data-[state=checked]:bg-[#497EBC] data-[state=checked]:border-[#497EBC] flex-shrink-0"
                      />
                      <option.icon className="w-5 h-5 md:w-6 md:h-6 md:w-7 md:h-7 text-[#497EBC] flex-shrink-0" />
                      <span className="text-xs md:text-sm md:text-base text-white leading-tight" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>{option.value}</span>
                    </motion.label>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Show More/Less Button */}
              <motion.button
                onClick={() => setShowAllExpertise(!showAllExpertise)}
                className="w-full py-3 px-4 rounded-lg border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#497EBC]/50 transition-all flex items-center justify-center gap-2 text-white/80 hover:text-white"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="text-sm md:text-base" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>
                  {showAllExpertise ? 'Show Less' : `Show More (${expertiseOptions.length - 6} more options)`}
                </span>
                <motion.div
                  animate={{ rotate: showAllExpertise ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {errors.expertiseNeeds && (
                <p className="text-red-400 text-xs md:text-sm">{errors.expertiseNeeds}</p>
              )}

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none text-sm md:text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#497EBC] to-[#3a6ba3] hover:from-[#3a6ba3] hover:to-[#2d5a8f] text-white flex-1 md:flex-none text-sm md:text-base"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 4: Type of Leader
  if (currentStep === 4) {
    const roleOptions = [
      { value: "Faith Leader", icon: Shield, description: "Ordained clergy, pastors, imams, rabbis" },
      { value: "Spiritual Teacher", icon: BookOpen, description: "Spiritual directors, wisdom teachers" },
      { value: "Life Coach", icon: Compass, description: "Certified life & mindset coaches" },
      { value: "Counselor", icon: HeartPulse, description: "Licensed counselors & therapists" },
      { value: "Faith Influencer", icon: Star, description: "Authors, speakers, content creators" },
      { value: "Any", icon: Sparkles, description: "Open to any type of verified leader" },
    ];

    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2.5 md:p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 md:p-8">
          <div className="mb-4 md:mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-white/60">Step 4 of 5</span>
              <span className="text-xs md:text-sm text-white/60">80% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#497EBC] to-[#3a6ba3]"
                initial={{ width: "60%" }}
                animate={{ width: "80%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-gradient-to-br from-[#1a2d4a]/40 to-[#0f1a2e]/40 border-[#497EBC]/30 backdrop-blur-sm">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-lg md:text-xl md:text-3xl text-white mb-1.5 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                  What type of leader are you looking for?
                </h2>
                <p className="text-xs md:text-sm md:text-base text-white/70" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                  Choose the role that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                {roleOptions.map((role) => (
                  <motion.button
                    key={role.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("leaderRole", role.value)}
                    className={`
                      p-3.5 md:p-4 rounded-lg border-2 transition-all text-left min-h-[72px] md:min-h-[80px]
                      ${formData.leaderRole === role.value
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <role.icon className="w-5 h-5 md:w-6 md:h-6 text-[#497EBC] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white mb-0.5 md:mb-1 text-sm md:text-base" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{role.value}</div>
                        <div className="text-white/60 text-xs md:text-sm leading-tight" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>{role.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {errors.leaderRole && (
                <p className="text-red-400 text-xs md:text-sm">{errors.leaderRole}</p>
              )}

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none text-sm md:text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex-1 md:flex-none text-sm md:text-base"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 5: Language & Final Preferences
  if (currentStep === 5) {
    const languageOptions = ["English", "Spanish", "Arabic", "Hebrew", "Hindi", "Mandarin", "French", "Any"];

    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2.5 md:p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 md:p-8">
          <div className="mb-4 md:mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-white/60">Step 5 of 5</span>
              <span className="text-xs md:text-sm text-white/60">100% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: "80%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-lg md:text-xl md:text-3xl text-white mb-1.5 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                  Language Preference
                </h2>
                <p className="text-xs md:text-sm md:text-base text-white/70" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                  Which language do you prefer for guidance?
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
                {languageOptions.map((lang) => (
                  <motion.button
                    key={lang}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("languagePreference", lang)}
                    className={`
                      p-3 md:p-4 rounded-lg border-2 transition-all min-h-[80px] md:min-h-[96px] flex flex-col items-center justify-center
                      ${formData.languagePreference === lang
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-purple-500/50 active:bg-white/10'
                      }
                    `}
                  >
                    <Languages className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mb-1.5 md:mb-2 flex-shrink-0" />
                    <div className="text-white text-xs md:text-sm leading-tight text-center" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>{lang}</div>
                  </motion.button>
                ))}
              </div>

              <div className="bg-white/5 p-3.5 md:p-4 rounded-lg border border-white/10 mt-4 md:mt-6">
                <h3 className="text-white mb-2 md:mb-3 flex items-center text-sm md:text-base" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 flex-shrink-0" />
                  Your Preferences Summary
                </h3>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/70" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                  <div className="leading-relaxed">• Faith Tradition: <span className="text-white">{formData.faithPreference}</span></div>
                  <div className="leading-relaxed">• Areas of Guidance: <span className="text-white">{formData.expertiseNeeds.join(", ")}</span></div>
                  <div className="leading-relaxed">• Leader Type: <span className="text-white">{formData.leaderRole}</span></div>
                  <div className="leading-relaxed">• Language: <span className="text-white">{formData.languagePreference}</span></div>
                </div>
              </div>

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none text-sm md:text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={performMatching}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex-1 md:flex-none text-sm md:text-base"
                >
                  Find My Leader <Star className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 6: Results
  if (currentStep === 6) {
    return (
      <div className="min-h-screen cosmic-texture-bg pb-24 md:pb-8">
        <button
          onClick={() => onClose ? onClose() : onNavigate("leaders")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 md:p-10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl md:text-4xl text-white mb-2">
                  {matchedLeaders.length > 0 ? "We Found Your Match!" : "Expanding Search..."}
                </h2>
                <p className="text-white/70">
                  {matchedLeaders.length > 0 
                    ? `${matchedLeaders.length} verified leader${matchedLeaders.length > 1 ? 's' : ''} match your preferences`
                    : "We're working on bringing more leaders to DivinityAGI"}
                </p>
              </div>

              {matchedLeaders.length > 0 ? (
                <div className="space-y-4">
                  {matchedLeaders.map((leader) => (
                    <div
                      key={leader.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <ImageWithFallback
                          src={leader.avatar}
                          alt={leader.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-white text-lg flex items-center">
                                {leader.name}
                                <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              </h3>
                              <p className="text-white/60 text-sm">{leader.role}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-amber-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-white text-sm">{leader.rating}</span>
                            </div>
                          </div>

                          <p className="text-white/70 text-sm mb-3">{leader.bio}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              {leader.faithBackground}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {leader.yearsOfService}+ years
                            </Badge>
                            {leader.expertise.slice(0, 2).map((exp) => (
                              <Badge key={exp} className="bg-white/10 text-white/70 border-white/20">
                                {exp}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            onClick={() => {
                              toast.success(`Connecting you with ${leader.name}...`);
                              setTimeout(() => onNavigate(`leader-${leader.id}`), 500);
                            }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                          >
                            Connect Now <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/70 mb-4">
                    We're actively onboarding more verified leaders. In the meantime, explore our AI spiritual guides!
                  </p>
                  <Button
                    onClick={() => onNavigate("guides")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Explore AI Guides <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Button
                  onClick={() => onNavigate("leaders")}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Browse All Leaders
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}