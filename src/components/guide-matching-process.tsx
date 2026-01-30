/**
 * Guide Matching Process Component - FIXED Accurate Matching
 * 
 * This component collects user preferences through an onboarding questionnaire
 * and matches them with the ideal spiritual guide from the Circle of Faiths
 * using a FAITH-FIRST filtering approach with 100-point scoring.
 * 
 * CRITICAL: Faith is now a FILTER, not just a scoring factor
 * - First filters guides by faith tradition
 * - Then scores filtered guides on other attributes (100 points total)
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BackgroundVideo } from "./background-video";
import cosmicWomanImage from 'figma:asset/fbae540c57588e37cf791b8b8d2d349ad04604cf.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import taliaVideoPoster from 'figma:asset/8dbc58a2227b3812dbb69f6fac910999aaec2c93.png';

// Faith symbol imports from Circle of Faiths
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
  Play, 
  Shield, 
  Heart, 
  Star, 
  Crown,
  Sparkles,
  CheckCircle,
  Users,
  BookOpen,
  Compass,
  Eye,
  Loader2,
  Search,
  Flower2,
  Sprout,
  Flame,
  Target,
  HeartPulse,
  Lightbulb,
  HandHeart,
  Wind,
  Zap,
  TreePine,
  Map,
  Mountain,
  HelpCircle,
  Gift,
  Sun,
  CalendarDays,
  CalendarCheck,
  Bell,
  Sword,
  Book,
  Brain,
  Smile,
  User,
  Edit,
  PlusCircle
} from "lucide-react";
import { useSubscription } from "./subscription-context";
import { useCreatedGuide } from "./created-guide-context";
import { guides, type SpiritualGuide } from "./guide-matching-data";
import { getFaithSymbol } from "./faith-symbols-config";
import { generateGuideSummary, getAgeDisplay } from "./guide-description-utils";
import { toast } from "sonner@2.0.3";
import { updateGuideUrl, validateGuideUrl, logValidationReport } from "./guide-matching-url-validator";

interface GuideMatchingProcessProps {
  onNavigate: (page: string) => void;
  onOpenMission: () => void;
  initialStep?: number;
}

interface EnhancedMatchingFormData {
  faithPreference: string;
  spiritualGoals: string[];
  guideArchetype: string;
  agePreference: string;
  journeyLevel: string;
  sectFocus: string[];
}

const initialFormData: EnhancedMatchingFormData = {
  faithPreference: "",
  spiritualGoals: [],
  guideArchetype: "",
  agePreference: "",
  journeyLevel: "",
  sectFocus: [],
};

/**
 * Helper function to check if a guide matches the selected faith
 */
function guideFaithMatches(guideFaith: string, userSelection: string): boolean {
  // Exact match
  if (guideFaith === userSelection) {
    return true;
  }
  
  // Universal selector matches everything
  if (userSelection === "Universal") {
    return true;
  }
  
  // Fuzzy matching for faith variants
  // e.g., "Islam" matches "Sunni Islam", "Shia Islam", "Sufi Islam"
  const guideLower = guideFaith.toLowerCase();
  const userLower = userSelection.toLowerCase();
  
  if (guideLower.includes(userLower) || userLower.includes(guideLower)) {
    return true;
  }
  
  // Special case: Bahá'í Faith variants
  if ((userSelection === "Bahá'í Faith" || userSelection === "Bahai Faith") &&
      (guideFaith === "Bahá'í Faith" || guideFaith === "Bahai Faith")) {
    return true;
  }
  
  // Special case: Polytheism variants (Norse, Greek, Egyptian, etc.)
  if (userSelection === "Polytheism" && 
      (guideLower.includes("mythology") || guideLower.includes("polytheism"))) {
    return true;
  }
  
  return false;
}

/**
 * OPTIMIZED: Enhanced matching algorithm with FAITH-FIRST filtering
 * 
 * STEP 1: Filter guides by faith tradition (REQUIRED)
 * STEP 2: Score filtered guides on 120-point scale:
 *   - Spiritual Goals: 30 points (HIGHEST PRIORITY - user's explicit preferences)
 *   - Guide Archetype/Role: 25 points (NO partial credit)
 *   - Age Preference: 25 points (NO partial credit)
 *   - Journey Level: 25 points (smart cross-level matching)
 *   - Specialized Sect/Focus: 15 points (REDUCED - less critical)
 *   + Universal Bonus: 20 points (if Universal faith selected)
 * 
 * TOTAL: 120-point base scale + 20 bonus = 140 max
 */
function matchUserToGuideEnhanced(formData: EnhancedMatchingFormData): { guide: SpiritualGuide; score: number; breakdown: Record<string, number> } {
  
  // ============================================================
  // STEP 1: FILTER BY FAITH (REQUIRED)
  // ============================================================
  const faithMatchedGuides = guides.filter(guide => 
    guideFaithMatches(guide.faith, formData.faithPreference)
  );
  
  console.log(`Faith Filter: ${formData.faithPreference}`);
  console.log(`Matched ${faithMatchedGuides.length} guides:`, faithMatchedGuides.map(g => g.name));
  
  if (faithMatchedGuides.length === 0) {
    console.warn('No guides found for faith:', formData.faithPreference);
    // Fallback to Universal guide
    const universalGuide = guides.find(g => g.faith === "Universal");
    if (universalGuide) {
      return {
        guide: universalGuide,
        score: 50,
        breakdown: { fallback: 50 }
      };
    }
    // Ultimate fallback: return first guide
    return {
      guide: guides[0],
      score: 25,
      breakdown: { emergency: 25 }
    };
  }
  
  // ============================================================
  // STEP 2: SCORE FILTERED GUIDES (100 points total)
  // ============================================================
  const scoredGuides = faithMatchedGuides.map(guide => {
    let score = 0;
    const breakdown: Record<string, number> = {};

    // 1. SPIRITUAL GOALS MATCH (30 points max - HIGHEST PRIORITY)
    let goalsScore = 0;
    if (formData.spiritualGoals.length > 0) {
      const goalMatches = formData.spiritualGoals.filter(goal => {
        return guide.specialties.some(spec =>
          spec.toLowerCase().includes(goal.toLowerCase()) ||
          goal.toLowerCase().includes(spec.toLowerCase())
        );
      });
      // Award 6 points per match (up to 5 goals = 30 points)
      goalsScore = Math.min(goalMatches.length * 6, 30);
    }
    score += goalsScore;
    breakdown.goals = goalsScore;

    // 2. SPECIALIZED SECT/FOCUS MATCH (15 points max - REDUCED)
    let sectScore = 0;
    if (formData.sectFocus.length > 0) {
      const sectMatches = formData.sectFocus.filter(userSect => {
        // Check against guide's sect array
        const sectMatch = guide.sect?.some(guideSect => 
          guideSect.toLowerCase().includes(userSect.toLowerCase()) ||
          userSect.toLowerCase().includes(guideSect.toLowerCase())
        );
        
        // Also check against specialties for broader matching
        const specialtyMatch = guide.specialties.some(spec =>
          spec.toLowerCase().includes(userSect.toLowerCase()) ||
          userSect.toLowerCase().includes(spec.toLowerCase())
        );
        
        return sectMatch || specialtyMatch;
      });
      
      // Award 5 points per match (up to 3 matches = 15 points)
      sectScore = Math.min(sectMatches.length * 5, 15);
    }
    // NO PARTIAL CREDIT - if user didn't select sect, score is 0
    score += sectScore;
    breakdown.sect = sectScore;

    // 3. GUIDE ARCHETYPE/ROLE MATCH (25 points max)
    let archetypeScore = 0;
    
    // Check archetypeRoles array first (preferred method)
    if (guide.archetypeRoles?.some(archetype => {
      const archetypeLower = archetype.toLowerCase();
      const userLower = formData.guideArchetype.toLowerCase();
      return archetypeLower.includes(userLower) || userLower.includes(archetypeLower);
    })) {
      archetypeScore = 25;
    }
    // Fallback to role field if no archetype match
    else if (
      guide.role.toLowerCase() === formData.guideArchetype.toLowerCase() ||
      guide.role.toLowerCase().includes(formData.guideArchetype.toLowerCase()) ||
      formData.guideArchetype.toLowerCase().includes(guide.role.toLowerCase())
    ) {
      archetypeScore = 20; // Slightly lower for role-only match
    }
    // NO PARTIAL CREDIT - if archetype doesn't match, score is 0
    
    score += archetypeScore;
    breakdown.archetype = archetypeScore;

    // 4. JOURNEY LEVEL MATCH (25 points max)
    let journeyScore = 0;
    
    if (guide.journeyLevel) {
      // Direct match
      if (guide.journeyLevel.includes(formData.journeyLevel)) {
        journeyScore = 25;
      }
      // Advanced users can also benefit from Crisis Navigation guides
      else if (formData.journeyLevel === "Advanced" && guide.journeyLevel.includes("Crisis Navigation")) {
        journeyScore = 20;
      }
      // Intermediate users can also benefit from Advanced guides if they're inclusive
      else if (formData.journeyLevel === "Intermediate" && guide.journeyLevel.includes("Advanced") && guide.journeyLevel.includes("Intermediate")) {
        journeyScore = 20;
      }
      // Beginner users can benefit from Beginner/Intermediate guides
      else if (formData.journeyLevel === "Beginner" && guide.journeyLevel.includes("Intermediate")) {
        journeyScore = 15;
      }
      // NO PARTIAL CREDIT - if journey doesn't match, score is 0
    }
    
    score += journeyScore;
    breakdown.journey = journeyScore;

    // 5. AGE PREFERENCE MATCH (25 points max)
    let ageScore = 0;
    
    if (guide.ageGroup === formData.agePreference) {
      ageScore = 25;
    }
    // NO PARTIAL CREDIT - if age doesn't match, score is 0
    
    score += ageScore;
    breakdown.age = ageScore;

    // Special bonus for Universal guides when user selects Universal
    if (formData.faithPreference === "Universal" && guide.faith === "Universal") {
      score += 20;
      breakdown.universalBonus = 20;
    }

    return {
      guide,
      score: Math.min(score, 140), // Cap at 140 (120 base + 20 universal bonus)
      breakdown
    };
  });

  // Sort by score (highest first)
  scoredGuides.sort((a, b) => b.score - a.score);

  // Log top 3 matches for debugging
  console.log('Top 3 matches:');
  scoredGuides.slice(0, 3).forEach((match, idx) => {
    console.log(`${idx + 1}. ${match.guide.name} (${match.guide.faith}): ${match.score} points`, match.breakdown);
  });

  // Return the best match with validated chat URL
  const bestMatch = scoredGuides[0];
  const guideWithCorrectUrl = updateGuideUrl(bestMatch.guide);
  
  // Validate the URL
  const urlValidation = validateGuideUrl(guideWithCorrectUrl);
  if (!urlValidation.isValid && urlValidation.correctUrl) {
    console.warn(`Updated guide ${guideWithCorrectUrl.name} URL from ${urlValidation.currentUrl} to ${urlValidation.correctUrl}`);
  }
  
  return {
    ...bestMatch,
    guide: guideWithCorrectUrl
  };
}

export function GuideMatchingProcess({ onNavigate, onOpenMission, initialStep = 0 }: GuideMatchingProcessProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<EnhancedMatchingFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof EnhancedMatchingFormData, string>>>({});
  const [isMatching, setIsMatching] = useState(false);
  const [matchedGuide, setMatchedGuide] = useState<SpiritualGuide | null>(null);
  const [matchScore, setMatchScore] = useState<number>(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const { tierName, openPortal } = useSubscription();
  const { saveCreatedGuide } = useCreatedGuide();

  // Validate guide URLs on mount (development only)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logValidationReport(guides);
    }
  }, []);

  // Auto-navigate to chat2 when matching is complete (Step 6)
  React.useEffect(() => {
    if (currentStep === 6 && matchedGuide) {
      const timer = setTimeout(() => {
        onNavigate("chat2");
        toast.success(`${matchedGuide.name} is now your guide! Click "Launch Guide" to begin.`, { duration: 4000 });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, matchedGuide, onNavigate]);

  const updateFormData = useCallback((field: keyof EnhancedMatchingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts selecting
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Partial<Record<keyof EnhancedMatchingFormData, string>> = {};
    
    switch (step) {
      case 1: // Faith preference
        if (!formData.faithPreference) newErrors.faithPreference = "Please select a faith tradition";
        break;
      case 2: // Spiritual goals
        if (formData.spiritualGoals.length === 0) newErrors.spiritualGoals = "Please select at least one spiritual goal";
        break;
      case 3: // Sect/focus areas
        // Optional - no validation required
        break;
      case 4: // Guide archetype and age
        if (!formData.guideArchetype) newErrors.guideArchetype = "Please select a guide type";
        if (!formData.agePreference) newErrors.agePreference = "Please select an age preference";
        break;
      case 5: // Journey level
        if (!formData.journeyLevel) newErrors.journeyLevel = "Please select your journey level";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (currentStep >= 1 && !validateStep(currentStep)) {
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 6));
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleSpiritualGoalsChange = useCallback((goal: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      spiritualGoals: checked 
        ? [...prev.spiritualGoals, goal]
        : prev.spiritualGoals.filter(g => g !== goal)
    }));
    // Clear errors when user makes a selection
    if (checked && errors.spiritualGoals) {
      setErrors(prev => ({ ...prev, spiritualGoals: undefined }));
    }
  }, [errors.spiritualGoals]);

  const handleSectFocusChange = useCallback((sect: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sectFocus: checked 
        ? [...prev.sectFocus, sect]
        : prev.sectFocus.filter(s => s !== sect)
    }));
  }, []);

  const handleFindMyGuide = async () => {
    if (!validateStep(5)) {
      if (!formData.journeyLevel) {
        toast.error('Please select where you are in your spiritual journey');
      }
      return;
    }

    setIsMatching(true);
    
    try {
      // Simulate matching delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Match user to ideal guide using enhanced algorithm
      const matchResult = matchUserToGuideEnhanced(formData);
      
      setMatchedGuide(matchResult.guide);
      // Normalize score to 100 scale for display
      const displayScore = Math.min(Math.round((matchResult.score / 120) * 100), 100);
      setMatchScore(displayScore);
      
      // Log matching details for debugging
      console.log('Match Result:', {
        guide: matchResult.guide.name,
        faith: matchResult.guide.faith,
        rawScore: matchResult.score,
        displayScore: displayScore,
        breakdown: matchResult.breakdown,
        userPreferences: formData
      });
      
      // Save matched guide to context
      // Get the chatUrl from faith symbols config
      const faithToKeyMap: Record<string, string> = {
        'Christianity': 'christian',
        'Sunni Islam': 'islamic',
        'Islam': 'islamic',
        'Shia Islam': 'islamic',
        'Sufi Islam': 'islamic',
        'Judaism': 'jewish',
        'Buddhism': 'buddhist',
        'Mahayana Buddhism': 'buddhist',
        'Vajrayana Buddhism': 'buddhist',
        'Zen Buddhism': 'buddhist',
        'Theravada Buddhism': 'buddhist',
        'Hinduism': 'shakti',
        'Shinto': 'shinto',
        'Jinja Shinto': 'shinto',
        'Koshinto': 'shinto',
        'Kyoha Shinto': 'shinto',
        'Jainism': 'jain',
        'Digambara Jainism': 'jain',
        'Svetambara Jainism': 'jain',
        'Sthanakvasi Jainism': 'jain',
        'Taoism': 'taoist',
        'Daoism': 'taoist',
        'Sikhism': 'sikhism',
        'Bahá\'í': 'bahai',
        'Bahai': 'bahai',
        'Confucianism': 'sage',
        'Neo-Confucianism': 'sage',
        'Classical Confucianism': 'sage',
        'Contemporary Confucianism': 'sage',
        'Norse Mythology': 'polytheism',
        'Greek Mythology': 'polytheism',
        'Egyptian Mythology': 'polytheism',
        'Indigenous Spirituality': 'polytheism',
        'Universal': 'sage'
      };
      
      const faithKey = faithToKeyMap[matchResult.guide.faith] || 'sage';
      const faithConfig = getFaithSymbol(faithKey);

      // CRITICAL: Use the validated chatUrl from matchResult
      // The guide has already been validated by matchUserToGuideEnhanced()
      // which uses the centralized URL mapping system
      const verifiedChatUrl = matchResult.guide.chatUrl;
      
      console.log('✅ Chat URL Verification:', {
        guideName: matchResult.guide.name,
        guideId: matchResult.guide.id,
        chatUrl: verifiedChatUrl,
        fromMapping: true
      });

      const guideData = {
        guideName: matchResult.guide.name,
        guideRole: matchResult.guide.role,
        faith: matchResult.guide.faith,
        agePreference: matchResult.guide.ageGroup,
        spiritualGoals: formData.spiritualGoals,
        usageFrequency: "Regular", // Default value
        generatedImageUrl: matchResult.guide.image,
        description: generateGuideSummary(matchResult.guide),
        welcomeMessage: matchResult.guide.welcomeMessage,
        isMatched: true, // Flag to indicate this was matched, not created
        matchedGuideId: matchResult.guide.id,
        guideId: matchResult.guide.id, // Explicit guide ID for URL mapping
        id: matchResult.guide.id, // Also save as 'id' for compatibility
        chatUrl: verifiedChatUrl, // Use verified chatUrl from master database
        // Additional matched guide attributes for profile display
        specialties: matchResult.guide.specialties,
        personality: matchResult.guide.personality,
        sect: matchResult.guide.sect,
        archetypeRoles: matchResult.guide.archetypeRoles,
        journeyLevel: matchResult.guide.journeyLevel,
      } as any;

      // Check if user is subscribed
      const isSubscribed = tierName !== 'seeker';

      if (isSubscribed) {
        // Subscribed users: Save permanently
        saveCreatedGuide(guideData);
        toast.success(`Perfect match! ${matchResult.guide.name} is now your spiritual guide (${displayScore}% match).`);
        
        // Move to completion screen
        setCurrentStep(6);
      } else {
        // Non-subscribed users: Save temporarily (in-session only)
        saveCreatedGuide(guideData);
        toast.info(`${matchResult.guide.name} is your guide for this session. Subscribe to save permanently!`, {
          duration: 5000,
          action: {
            label: 'Subscribe',
            onClick: () => openPortal('guide-creation-limit')
          }
        });
        
        // Move to completion screen
        setCurrentStep(6);
      }
    } catch (error) {
      console.error('Error matching guide:', error);
      toast.error('Failed to find your perfect guide. Please try again.');
    } finally {
      setIsMatching(false);
    }
  };

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
          videoSrc="https://divinityagi.com/wp-content/uploads/2026/01/Spirit-Guide-Match-Intro.mp4"
          posterSrc="figma:asset/aeab6ffe8ac13103e915a8292e981d580e5a3fb4.png"
          className="fixed inset-0"
          muted={false}
          loop={false}
          volume={0.7}
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
              onClick={() => onNavigate("chat2")}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-[52px] mt-[-48px] mr-[0px] mb-[0px] ml-[0px] pt-[0px] pr-[16px] pl-[16px]">
            <div className="flex flex-col min-h-full mt-[87px] mr-[0px] mb-[4px] ml-[0px]">
              {/* Title Section */}
              <div className="text-center pt-2 sm:pt-4 mt-[161px] mr-[0px] mb-[-15px] ml-[0px]">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1e386e]/30 backdrop-blur-md border border-white/30 flex items-center justify-center animate-pulse">
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <h1 
                  className="text-white text-[24px] sm:text-[28px] mb-1.5" 
                  style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                >
                  Find Your Perfect Guide
                </h1>
                <p 
                  className="text-white/80 text-[12px] sm:text-[13px] max-w-xs mx-auto px-4"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                >
                  Discover your ideal spiritual companion
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-2.5 sm:space-y-3 sm:mt-6 mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
                {/* Feature 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#05DF72] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                        >
                          Faith-First Matching
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Guaranteed match from your chosen tradition
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
                      <div className="w-10 h-10 rounded-xl bg-[#1e386e] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                        >
                          100+ Spirit Guides
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Trained in authentic spiritual traditions
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
                      <div className="w-10 h-10 rounded-xl bg-[#FF1493] flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-white text-[14px] sm:text-[15px] mb-0.5" 
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                        >
                          24/7 Support
                        </h3>
                        <p 
                          className="text-white/70 text-[11px] sm:text-[12px]"
                          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                        >
                          Your guide is always there when you need them
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
                  className="w-full h-12 sm:h-14 bg-[#a79a4c] hover:bg-[#b8a85d] text-white rounded-full border-2 border-[#a79a4c] shadow-[0_10px_40px_rgba(167,154,76,0.5)] hover:shadow-[0_15px_50px_rgba(167,154,76,0.6)] transition-all duration-300 text-[16px] sm:text-[18px]"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  Begin Matching
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Step 1: Faith Preference
  if (currentStep === 1) {
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
      { label: "Bahá'í Faith", value: "Bahai Faith", image: bahaiStarImage },
      { label: "Confucianism", value: "Confucianism", image: confuciusCharacterImage },
      { label: "Polytheism", value: "Polytheism", image: polytheismCircleImage },
      { label: "The Occult", value: "The Occult", image: null },
      { label: "Open to All", value: "Universal", image: null },
    ];

    return (
      <div className="min-h-screen cosmic-texture-bg pb-32 sm:pb-24 md:pb-8">
        {/* Back Button - Fixed at top left */}
        <button
          onClick={() => onNavigate("chat2")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 md:p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Go back to Chat"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 pt-20 sm:pt-6">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-white/80 font-medium">Step 1 of 5</span>
              <span className="text-sm sm:text-base text-white/80 font-medium">20% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e386e]"
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-5 sm:p-6 md:p-8 bg-[#182238]/40 border-[#1e386e]/30 backdrop-blur-sm">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Which faith tradition resonates with you?
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                  We'll match you with a guide from this tradition, or select "Open to All" for a universal guide
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {faithOptions.map((faith) => (
                  <motion.button
                    key={faith.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("faithPreference", faith.value)}
                    className={`
                      p-4 sm:p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[110px] sm:min-h-[120px]
                      ${formData.faithPreference === faith.value
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:scale-95'
                      }
                    `}
                  >
                    {faith.image ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                        <ImageWithFallback
                          src={faith.image}
                          alt={faith.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#497EBC]" />
                      </div>
                    )}
                    <div className="text-sm sm:text-base text-white text-center leading-tight font-medium">{faith.label}</div>
                  </motion.button>
                ))}
              </div>

              {errors.faithPreference && (
                <p className="text-red-400 text-sm">{errors.faithPreference}</p>
              )}

              <div className="flex justify-between pt-5 sm:pt-6 gap-3">
                <Button
                  onClick={() => setCurrentStep(0)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none h-12 sm:h-11 text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white flex-1 md:flex-none h-12 sm:h-11 text-base"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
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

  // Step 2: Spiritual Goals
  if (currentStep === 2) {
    const goalOptions = [
      { value: "Inner Peace", icon: Flower2, color: "blue" },
      { value: "Spiritual Growth", icon: Sprout, color: "green" },
      { value: "Prayer & Meditation", icon: Flame, color: "purple" },
      { value: "Life Purpose", icon: Target, color: "orange" },
      { value: "Emotional Healing", icon: HeartPulse, color: "emerald" },
      { value: "Wisdom & Guidance", icon: Lightbulb, color: "amber" },
      { value: "Community Connection", icon: HandHeart, color: "pink" },
      { value: "Stress Management", icon: Wind, color: "cyan" },
      { value: "Social Justice", icon: Users, color: "rose" },
      { value: "Mercy & Forgiveness", icon: Heart, color: "pink" },
      { value: "Pastoral Guidance", icon: Shield, color: "indigo" },
      { value: "Ecological Stewardship", icon: TreePine, color: "green" },
    ];

    return (
      <div className="min-h-screen cosmic-texture-bg pb-32 sm:pb-24 md:pb-8">
        {/* Back Button - Fixed at top left */}
        <button
          onClick={() => onNavigate("chat2")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Go back to Chat"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 pt-20 sm:pt-6">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-white/80 font-medium">Step 2 of 5</span>
              <span className="text-sm sm:text-base text-white/80 font-medium">40% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e386e]"
                initial={{ width: "20%" }}
                animate={{ width: "40%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-5 sm:p-6 md:p-8 bg-[#182238]/40 border-[#1e386e]/30 backdrop-blur-sm">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  What are your spiritual goals?
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Select all that resonate with you (choose at least one)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {goalOptions.map((goal) => (
                  <motion.label
                    key={goal.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[56px]
                      ${formData.spiritualGoals.includes(goal.value)
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:scale-95'
                      }
                    `}
                  >
                    <Checkbox
                      checked={formData.spiritualGoals.includes(goal.value)}
                      onCheckedChange={(checked) => handleSpiritualGoalsChange(goal.value, checked as boolean)}
                      className="data-[state=checked]:bg-[#497EBC] data-[state=checked]:border-[#497EBC] h-5 w-5 sm:h-6 sm:w-6"
                    />
                    <goal.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#497EBC] flex-shrink-0" />
                    <span className="text-base sm:text-lg text-white font-medium">{goal.value}</span>
                  </motion.label>
                ))}
              </div>

              {errors.spiritualGoals && (
                <p className="text-red-400 text-sm">{errors.spiritualGoals}</p>
              )}

              <div className="flex justify-between pt-5 sm:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none h-12 sm:h-11 text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white flex-1 md:flex-none h-12 sm:h-11 text-base"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
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

  // Step 3: Specialized Sect/Focus (Optional)
  if (currentStep === 3) {
    // Dynamically generate sect options based on selected faith
    const getSectOptions = () => {
      const sectOptions: { value: string; label: string; icon: any }[] = [];

      switch (formData.faithPreference) {
        case "Christianity":
          sectOptions.push(
            { value: "Pastoral Guide", label: "Pastoral Guidance", icon: Shield },
            { value: "Mercy & Forgiveness", label: "Mercy & Forgiveness", icon: Heart },
            { value: "Social Justice", label: "Social Justice", icon: Users },
            { value: "Franciscan Spirituality", label: "Franciscan Spirituality", icon: TreePine },
            { value: "Charismatic Renewal", label: "Charismatic Renewal", icon: Flame },
            { value: "Catholic Tradition", label: "Catholic Tradition", icon: BookOpen }
          );
          break;
        case "Islam":
          sectOptions.push(
            { value: "Five Pillars", label: "Five Pillars of Islam", icon: Star },
            { value: "Fiqh", label: "Islamic Law (Fiqh)", icon: BookOpen },
            { value: "Sufism", label: "Sufism (Mysticism)", icon: Heart },
            { value: "Tazkiyah", label: "Spiritual Purification", icon: Flower2 },
            { value: "Family Ethics", label: "Family Ethics", icon: HandHeart }
          );
          break;
        case "Judaism":
          sectOptions.push(
            { value: "Torah Study", label: "Torah Study", icon: BookOpen },
            { value: "Talmudic Wisdom", label: "Talmudic Wisdom", icon: Brain },
            { value: "Kabbalah", label: "Kabbalah (Mysticism)", icon: Star },
            { value: "Hasidism", label: "Hasidic Tradition", icon: Flame },
            { value: "Social Justice", label: "Tikkun Olam (Repair the World)", icon: Users }
          );
          break;
        case "Hinduism":
          sectOptions.push(
            { value: "Advaita Vedanta", label: "Advaita Vedanta", icon: Brain },
            { value: "Bhakti", label: "Bhakti (Devotion)", icon: Heart },
            { value: "Shaktism", label: "Shaktism (Divine Feminine)", icon: Sparkles },
            { value: "Shaivism", label: "Shaivism (Shiva Devotion)", icon: Flame },
            { value: "Yoga", label: "Yoga & Meditation", icon: Flower2 }
          );
          break;
        case "Buddhism":
          sectOptions.push(
            { value: "Theravada", label: "Theravada Buddhism", icon: BookOpen },
            { value: "Mahayana", label: "Mahayana Buddhism", icon: Heart },
            { value: "Vajrayana", label: "Vajrayana/Tibetan", icon: Star },
            { value: "Zen", label: "Zen Buddhism", icon: Flower2 },
            { value: "Mindfulness", label: "Mindfulness Practice", icon: Wind }
          );
          break;
        case "Sikhism":
          sectOptions.push(
            { value: "Khalsa", label: "Khalsa Tradition", icon: Sword },
            { value: "Naam Simran", label: "Naam Simran (Meditation)", icon: Flower2 },
            { value: "Seva", label: "Seva (Selfless Service)", icon: HandHeart },
            { value: "Five Ks", label: "Living the Five Ks", icon: Star },
            { value: "Guru Granth Sahib", label: "Guru Granth Sahib Study", icon: BookOpen }
          );
          break;
        case "Jainism":
          sectOptions.push(
            { value: "Digambara", label: "Digambara Tradition", icon: Mountain },
            { value: "Svetambara", label: "Svetambara Tradition", icon: Star },
            { value: "Ahimsa", label: "Ahimsa (Non-Violence)", icon: Heart },
            { value: "Meditation", label: "Jain Meditation", icon: Flower2 },
            { value: "Anekantavada", label: "Multiple Perspectives", icon: Brain }
          );
          break;
        case "Taoism":
          sectOptions.push(
            { value: "Wu Wei", label: "Wu Wei (Effortless Action)", icon: Wind },
            { value: "Quanzhen", label: "Quanzhen Taoism", icon: Mountain },
            { value: "Daojiao", label: "Religious Taoism", icon: Star },
            { value: "Internal Alchemy", label: "Internal Alchemy", icon: Flame },
            { value: "Nature Harmony", label: "Nature Harmony", icon: TreePine }
          );
          break;
        case "Shinto":
          sectOptions.push(
            { value: "Jinja", label: "Jinja Shinto (Shrine)", icon: Star },
            { value: "Kyoha", label: "Kyoha Shinto (Sectarian)", icon: BookOpen },
            { value: "Koshinto", label: "Koshinto (Ancient)", icon: Mountain },
            { value: "Kami Connection", label: "Kami Connection", icon: Sparkles },
            { value: "Purification", label: "Purification Rituals", icon: Flower2 }
          );
          break;
        case "Confucianism":
          sectOptions.push(
            { value: "Classical", label: "Classical Confucianism", icon: BookOpen },
            { value: "Neo-Confucianism", label: "Neo-Confucianism", icon: Brain },
            { value: "Contemporary", label: "Contemporary Practice", icon: Users },
            { value: "Ren", label: "Ren (Benevolence)", icon: Heart },
            { value: "Li", label: "Li (Proper Conduct)", icon: Shield }
          );
          break;
        case "Bahai Faith":
          sectOptions.push(
            { value: "Unity", label: "Unity of Humanity", icon: Users },
            { value: "Progressive Revelation", label: "Progressive Revelation", icon: Lightbulb },
            { value: "Social Justice", label: "Social Justice", icon: Shield },
            { value: "Interfaith", label: "Interfaith Dialogue", icon: HandHeart },
            { value: "Spiritual Development", label: "Spiritual Development", icon: Sprout }
          );
          break;
        case "Polytheism":
          sectOptions.push(
            { value: "Greek", label: "Greek Mythology", icon: Crown },
            { value: "Norse", label: "Norse Tradition", icon: Sword },
            { value: "Egyptian", label: "Egyptian Tradition", icon: Sun },
            { value: "Nature Worship", label: "Nature Worship", icon: TreePine },
            { value: "Ancestral", label: "Ancestral Connection", icon: Users }
          );
          break;
        default:
          sectOptions.push(
            { value: "General Spirituality", label: "General Spirituality", icon: Sparkles },
            { value: "Meditation", label: "Meditation", icon: Flower2 },
            { value: "Personal Growth", label: "Personal Growth", icon: Sprout },
            { value: "Wisdom", label: "Wisdom Traditions", icon: Lightbulb }
          );
      }

      return sectOptions;
    };

    const sectOptions = getSectOptions();

    return (
      <div className="min-h-screen cosmic-texture-bg pb-32 sm:pb-24 md:pb-8">
        {/* Back Button - Fixed at top left */}
        <button
          onClick={() => onNavigate("chat2")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Go back to Chat"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 pt-20 sm:pt-6">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-white/80 font-medium">Step 3 of 5</span>
              <span className="text-sm sm:text-base text-white/80 font-medium">60% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e386e]"
                initial={{ width: "40%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-4 md:p-8 bg-[#182238]/40 border-[#1e386e]/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-3xl text-white mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Any specific focus areas? (Optional)
                </h2>
                <p className="text-sm md:text-base text-white/70" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Select specialized practices or traditions within {formData.faithPreference === "Universal" ? "spirituality" : formData.faithPreference}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sectOptions.map((sect) => (
                  <motion.label
                    key={sect.value}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      flex items-center space-x-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.sectFocus.includes(sect.value)
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50'
                      }
                    `}
                  >
                    <Checkbox
                      checked={formData.sectFocus.includes(sect.value)}
                      onCheckedChange={(checked) => handleSectFocusChange(sect.value, checked as boolean)}
                      className="data-[state=checked]:bg-[#497EBC] data-[state=checked]:border-[#497EBC]"
                    />
                    <sect.icon className="w-6 h-6 md:w-7 md:h-7 text-[#497EBC]" />
                    <span className="text-sm md:text-base text-white">{sect.label}</span>
                  </motion.label>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">
                    These selections help us find a guide with specialized expertise in your areas of interest. You can skip this step if you prefer a general guide.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4 md:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white flex-1 md:flex-none"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
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

  // Step 4: Guide Archetype & Age Preference
  if (currentStep === 4) {
    return (
      <div className="min-h-screen cosmic-texture-bg pb-32 sm:pb-24 md:pb-8">
        {/* Back Button - Fixed at top left */}
        <button
          onClick={() => onNavigate("chat2")}
          className="fixed left-4 md:left-6 top-4 md:top-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Go back to Chat"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-[-2px] transition-transform" />
        </button>

        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 pt-20 sm:pt-6">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-white/80 font-medium">Step 4 of 5</span>
              <span className="text-sm sm:text-base text-white/80 font-medium">80% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e386e]"
                initial={{ width: "60%" }}
                animate={{ width: "80%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-5 sm:p-6 md:p-8 bg-[#182238]/40 border-[#1e386e]/30 backdrop-blur-sm">
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              {/* Guide Archetype */}
              <div>
                <h2 className="text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  What type of guide do you need?
                </h2>
                <p className="text-base sm:text-lg text-white/80 mb-5 sm:mb-6 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Choose the role that best matches your needs
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: "Spiritual Guide", icon: Compass, description: "Holistic guidance" },
                    { value: "Teacher", icon: BookOpen, description: "Deep knowledge" },
                    { value: "Healer", icon: Heart, description: "Spiritual healing" },
                    { value: "Advisor", icon: Lightbulb, description: "Wise counsel" },
                    { value: "Scholar", icon: Brain, description: "Academic depth" },
                    { value: "Mentor", icon: HandHeart, description: "Personal growth" },
                    { value: "Warrior-Guide", icon: Sword, description: "Strength & courage" },
                    { value: "Servant-Leader", icon: Shield, description: "Leading by serving" },
                    { value: "Listener", icon: Eye, description: "Compassionate presence" },
                  ].map((role) => (
                    <motion.button
                      key={role.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateFormData("guideArchetype", role.value)}
                      className={`
                        p-4 sm:p-5 rounded-xl border-2 transition-all min-h-[110px] sm:min-h-[120px] flex flex-col items-center justify-center
                        ${formData.guideArchetype === role.value
                          ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                          : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:scale-95'
                        }
                      `}
                    >
                      <role.icon className="w-8 h-8 sm:w-9 sm:h-9 mx-auto mb-2 text-[#497EBC]" />
                      <div className="text-sm sm:text-base text-white font-semibold mb-1 text-center">{role.value}</div>
                      <div className="text-xs sm:text-sm text-white/60 text-center">{role.description}</div>
                    </motion.button>
                  ))}
                </div>

                {errors.guideArchetype && (
                  <p className="text-red-400 text-sm mt-2">{errors.guideArchetype}</p>
                )}
              </div>

              {/* Age Preference */}
              <div>
                <h3 className="text-xl sm:text-2xl text-white mb-4 sm:mb-5">
                  Age preference for your guide
                </h3>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: "young", label: "Young", icon: Zap, description: "Vibrant energy" },
                    { value: "mature", label: "Mature", icon: Star, description: "Experienced" },
                    { value: "elder", label: "Elder", icon: Crown, description: "Deep wisdom" },
                  ].map((age) => (
                    <motion.button
                      key={age.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateFormData("agePreference", age.value)}
                      className={`
                        p-4 sm:p-5 rounded-xl border-2 transition-all min-h-[110px] sm:min-h-[120px] flex flex-col items-center justify-center
                        ${formData.agePreference === age.value
                          ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                          : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:scale-95'
                        }
                      `}
                    >
                      <age.icon className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 text-[#497EBC]" />
                      <div className="text-sm sm:text-base text-white font-semibold mb-1 text-center">{age.label}</div>
                      <div className="text-xs sm:text-sm text-white/60 text-center">{age.description}</div>
                    </motion.button>
                  ))}
                </div>

                {errors.agePreference && (
                  <p className="text-red-400 text-sm mt-2">{errors.agePreference}</p>
                )}
              </div>

              <div className="flex justify-between pt-5 sm:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none h-12 sm:h-11 text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white flex-1 md:flex-none h-12 sm:h-11 text-base"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
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

  // Step 5: Journey Level
  if (currentStep === 5) {
    return (
      <div className="min-h-screen cosmic-texture-bg pb-32 sm:pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6 md:p-8 pt-6">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-white/80 font-medium">Step 5 of 5</span>
              <span className="text-sm sm:text-base text-white/80 font-medium">100% Complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1e386e]"
                initial={{ width: "80%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card className="p-5 sm:p-6 md:p-8 bg-[#182238]/40 border-[#1e386e]/30 backdrop-blur-sm">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                  Where are you in your spiritual journey?
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                  This helps us match you with a guide suited to your experience level
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { 
                    value: "Beginner", 
                    icon: Sprout, 
                    label: "Beginner / Foundational", 
                    description: "Just starting to explore spirituality or returning after a break" 
                  },
                  { 
                    value: "Intermediate", 
                    icon: Mountain, 
                    label: "Intermediate / Practice Deepening", 
                    description: "Have some experience and want to deepen your practice" 
                  },
                  { 
                    value: "Advanced", 
                    icon: Crown, 
                    label: "Advanced / Crisis Navigation", 
                    description: "Experienced practitioner seeking deeper wisdom or navigating challenges" 
                  },
                ].map((level) => (
                  <motion.button
                    key={level.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("journeyLevel", level.value)}
                    className={`
                      w-full p-5 sm:p-6 rounded-xl border-2 transition-all text-left min-h-[90px]
                      ${formData.journeyLevel === level.value
                        ? 'border-[#497EBC] bg-[#497EBC]/20 shadow-lg shadow-[#497EBC]/20'
                        : 'border-white/10 bg-white/5 hover:border-[#497EBC]/50 active:scale-[0.99]'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <level.icon className="w-11 h-11 sm:w-12 sm:h-12 text-[#497EBC] flex-shrink-0" />
                      <div>
                        <div className="text-base sm:text-lg text-white font-semibold mb-2">{level.label}</div>
                        <div className="text-sm sm:text-base text-white/70 leading-relaxed">{level.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {errors.journeyLevel && (
                <p className="text-red-400 text-sm">{errors.journeyLevel}</p>
              )}

              <div className="flex justify-between pt-5 sm:pt-6 gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-none h-12 sm:h-11 text-base"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleFindMyGuide}
                  disabled={isMatching}
                  className="bg-[#a79a4c] hover:bg-[#b8a85d] border-2 border-[#a79a4c] text-white flex-1 md:flex-none disabled:opacity-50 h-12 sm:h-11 text-base"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  {isMatching ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Finding...
                    </>
                  ) : (
                    <>
                      Find My Guide <Sparkles className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 6: Results - Auto navigate to chat2
  if (currentStep === 6 && matchedGuide) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] pb-24 md:pb-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#05DF72] mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl text-[#3D3D6B] mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}>
            Perfect Match Found!
          </h1>
          
          <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: "'Raleway', sans-serif" }}>
            We found {matchedGuide.name} for you
          </p>
          
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Redirecting to your chat...
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
}
