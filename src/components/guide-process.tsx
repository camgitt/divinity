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
import cosmicWomanImage from 'figma:asset/fbae540c57588e37cf791b8b8d2d349ad04604cf.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
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
  Loader2
} from "lucide-react";
import { useSubscription } from "./subscription-context";
import { useCreatedGuide } from "./created-guide-context";
import { toast } from "sonner@2.0.3";
import { matchUserToGuide, type MatchingPreferences, guides } from "./guide-matching-data";

interface GuideProcessProps {
  onNavigate: (page: string) => void;
  onOpenMission: () => void;
  initialStep?: number;
}

interface FormData {
  guideRole: string;
  faith: string;
  agePreference: string;
  spiritualGoals: string[];
  usageFrequency: string;
}

const initialFormData: FormData = {
  guideRole: "",
  faith: "",
  agePreference: "",
  spiritualGoals: [],
  usageFrequency: "",
};

export function GuideProcess({ onNavigate, onOpenMission, initialStep = 0 }: GuideProcessProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState<string>("");
  const { tierName, openPortal } = useSubscription();
  const { saveCreatedGuide, createdGuide } = useCreatedGuide();

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1: // Guide Role
        if (!formData.guideRole) newErrors.guideRole = "Please select a guide role";
        break;
      case 2: // Faith
        if (!formData.faith) newErrors.faith = "Please select your faith or philosophy";
        break;
      case 3: // Age Preference
        if (!formData.agePreference) newErrors.agePreference = "Please select an age preference";
        break;
      case 4: // Spiritual Goals
        if (formData.spiritualGoals.length === 0) newErrors.spiritualGoals = ["Please select at least one spiritual goal"];
        if (!formData.usageFrequency) newErrors.usageFrequency = "Please select usage frequency";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (currentStep >= 1 && !validateStep(currentStep)) {
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
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
  }, []);

  const handleGenerateGuide = async () => {
    if (!validateStep(4)) {
      // Show specific error messages
      if (formData.spiritualGoals.length === 0) {
        toast.error('Please select at least one spiritual goal');
      } else if (!formData.usageFrequency) {
        toast.error('Please select how often you plan to engage');
      }
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create matching preferences from form data
      const matchingPreferences: MatchingPreferences = {
        faithPreference: formData.faith,
        spiritualGoals: formData.spiritualGoals,
        guideRole: formData.guideRole,
        agePreference: formData.agePreference,
        lifeSituation: "Exploring" // Default to exploring for new users
      };

      // Match user to one of the official spiritual guides
      const matchedGuide = matchUserToGuide(matchingPreferences);
      
      console.log(`[Guide Matching] Matched to: ${matchedGuide.name} (${matchedGuide.faith}, ${matchedGuide.role})`);
      
      // Use the matched guide's image instead of generating a new one
      setGeneratedAvatarUrl(matchedGuide.image);
      
      // CRITICAL: Always re-verify chatUrl from the master database
      // This ensures we get the most up-to-date URL even if cached data is stale
      const freshGuideData = guides.find(g => g.id === matchedGuide.id || g.name === matchedGuide.name);
      const verifiedChatUrl = freshGuideData?.chatUrl || matchedGuide.chatUrl;
      
      console.log('✅ Chat URL Verification:', {
        guideName: matchedGuide.name,
        guideId: matchedGuide.id,
        originalUrl: matchedGuide.chatUrl,
        verifiedUrl: verifiedChatUrl,
        fromDatabase: !!freshGuideData
      });
      
      // Create the new guide with matched data
      const newGuide = {
        guideName: matchedGuide.name, // Use the actual guide name from the database
        guideRole: formData.guideRole,
        faith: formData.faith,
        agePreference: formData.agePreference,
        spiritualGoals: formData.spiritualGoals,
        usageFrequency: formData.usageFrequency,
        generatedImageUrl: matchedGuide.image, // Use the official guide's image
        description: matchedGuide.description,
        welcomeMessage: matchedGuide.welcomeMessage,
        chatUrl: verifiedChatUrl, // Use verified chatUrl from master database
        isMatched: true,
        matchedGuideId: matchedGuide.id,
        specialties: matchedGuide.specialties,
        personality: matchedGuide.personality,
      };

      // Check if user is subscribed
      const isSubscribed = tierName !== 'seeker';
      
      if (isSubscribed) {
        // Save guide for subscribed members
        saveCreatedGuide(newGuide);
        toast.success(`Matched you with ${matchedGuide.name}!`);
      } else {
        // Don't save for non-subscribed users, but still create for session
        saveCreatedGuide(newGuide);
        toast.info(`Matched you with ${matchedGuide.name}! Subscribe to save permanently.`, {
          duration: 5000,
        });
      }
      
      // Move to completion step
      setCurrentStep(5);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error creating guide:', error);
      toast.error('Failed to match guide. Please try again.');
      setIsGenerating(false);
    }
  };

  const FooterElement = ({ showPrivacy = false, showLiability = false }) => (
    <footer className="px-4 sm:px-6 pb-6 sm:pb-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-slate-400">
          {showPrivacy && (
            <button 
              onClick={() => onNavigate('privacy')}
              className="hover:text-purple-300 transition-colors underline"
            >
              Privacy Policy
            </button>
          )}
          {showLiability && (
            <button 
              onClick={onOpenMission}
              className="hover:text-purple-300 transition-colors underline"
            >
              Terms & Liability
            </button>
          )}
        </div>
      </div>
    </footer>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Welcome & Privacy
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-lg"
              >
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <ImageWithFallback
                    src={cosmicSpiritualImage}
                    alt="Spiritual Guide"
                    className="w-full h-full object-cover rounded-full border-2 border-purple-500/30"
                  />
                </div>
                
                <h1 className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Create Your Personal Guide
                </h1>
                
                <p className="text-white/80 mb-8">
                  Answer a few questions and we'll match you with an authentic spiritual guide from your chosen tradition.
                </p>

                <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6 mb-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-white mb-1">Privacy First</h3>
                        <p className="text-sm text-white/70">
                          Your spiritual journey is private. No personal information required.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-white mb-1">Smart Matching</h3>
                        <p className="text-sm text-white/70">
                          We'll match you with an authentic guide based on your preferences and spiritual goals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-white mb-1">Subscribers Only Saving</h3>
                        <p className="text-sm text-white/70">
                          Subscribe to save your guides permanently in your profile.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button 
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12"
                >
                  Begin Creation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
            <FooterElement showPrivacy={true} showLiability={true} />
          </motion.div>
        );

      case 1: // Guide Role
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 px-6 py-8">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={prevStep}
                  className="flex items-center text-purple-300 hover:text-purple-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>

                <div className="text-center mb-6">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-4">
                    Step 1 of 4
                  </Badge>
                  <h1 className="text-3xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Choose Your Guide's Role
                  </h1>
                </div>

                <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6">
                  <div className="space-y-4">
                    <Heart className="w-12 h-12 text-purple-400 mx-auto" />
                    
                    <Label className="text-white">What role should your guide embody?</Label>
                    <RadioGroup 
                      value={formData.guideRole} 
                      onValueChange={(value) => updateFormData('guideRole', value)}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                        <RadioGroupItem value="Advisor" id="advisor" className="border-purple-400" />
                        <Label htmlFor="advisor" className="flex-1 cursor-pointer text-white">
                          <div>
                            <div className="font-semibold">Advisor</div>
                            <div className="text-sm text-white/70">Wise counsel for life's decisions</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                        <RadioGroupItem value="Healer" id="healer" className="border-purple-400" />
                        <Label htmlFor="healer" className="flex-1 cursor-pointer text-white">
                          <div>
                            <div className="font-semibold">Healer</div>
                            <div className="text-sm text-white/70">Compassionate support for emotional wellbeing</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                        <RadioGroupItem value="Scholar" id="scholar" className="border-purple-400" />
                        <Label htmlFor="scholar" className="flex-1 cursor-pointer text-white">
                          <div>
                            <div className="font-semibold">Scholar</div>
                            <div className="text-sm text-white/70">Deep wisdom and spiritual knowledge</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                        <RadioGroupItem value="Celebrant" id="celebrant" className="border-purple-400" />
                        <Label htmlFor="celebrant" className="flex-1 cursor-pointer text-white">
                          <div>
                            <div className="font-semibold">Celebrant</div>
                            <div className="text-sm text-white/70">Joyful companion for spiritual celebration</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.guideRole && <p className="text-red-400 text-sm mt-1">{errors.guideRole}</p>}
                  </div>
                </Card>

                <Button 
                  onClick={nextStep}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Faith/Philosophy
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 px-6 py-8">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={prevStep}
                  className="flex items-center text-purple-300 hover:text-purple-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>

                <div className="text-center mb-6">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-4">
                    Step 2 of 4
                  </Badge>
                  <h1 className="text-3xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Faith / Philosophy
                  </h1>
                </div>

                <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6">
                  <div className="space-y-4">
                    <Compass className="w-12 h-12 text-purple-400 mx-auto" />
                    
                    <Label className="text-white">Select your spiritual path</Label>
                    <Select value={formData.faith} onValueChange={(value) => updateFormData('faith', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Choose your faith tradition" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="Christianity">Christianity</SelectItem>
                        <SelectItem value="Buddhism">Buddhism</SelectItem>
                        <SelectItem value="Hinduism">Hinduism</SelectItem>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Judaism">Judaism</SelectItem>
                        <SelectItem value="Taoism">Taoism</SelectItem>
                        <SelectItem value="Sikhism">Sikhism</SelectItem>
                        <SelectItem value="Jainism">Jainism</SelectItem>
                        <SelectItem value="Bahai">Bahá'í Faith</SelectItem>
                        <SelectItem value="Shinto">Shinto</SelectItem>
                        <SelectItem value="Confucianism">Confucianism</SelectItem>
                        <SelectItem value="Spirituality">General Spirituality</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.faith && <p className="text-red-400 text-sm mt-1">{errors.faith}</p>}
                  </div>
                </Card>

                <Button 
                  onClick={nextStep}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 3: // Age Preference
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 px-6 py-8">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={prevStep}
                  className="flex items-center text-purple-300 hover:text-purple-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>

                <div className="text-center mb-6">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-4">
                    Step 3 of 4
                  </Badge>
                  <h1 className="text-3xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Guide's Presence
                  </h1>
                </div>

                <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6">
                  <div className="space-y-6">
                    <div>
                      <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <Label className="text-white">What age presence resonates with you?</Label>
                      <RadioGroup 
                        value={formData.agePreference} 
                        onValueChange={(value) => updateFormData('agePreference', value)}
                        className="mt-3"
                      >
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                          <RadioGroupItem value="young" id="young" className="border-purple-400" />
                          <Label htmlFor="young" className="flex-1 cursor-pointer text-white">
                            <div>
                              <div className="font-semibold">Youthful Guide</div>
                              <div className="text-sm text-white/70">Fresh perspective and vibrant energy</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                          <RadioGroupItem value="middle-aged" id="middle" className="border-purple-400" />
                          <Label htmlFor="middle" className="flex-1 cursor-pointer text-white">
                            <div>
                              <div className="font-semibold">Mature Guide</div>
                              <div className="text-sm text-white/70">Balanced wisdom and life experience</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                          <RadioGroupItem value="elder" id="elder" className="border-purple-400" />
                          <Label htmlFor="elder" className="flex-1 cursor-pointer text-white">
                            <div>
                              <div className="font-semibold">Elder Guide</div>
                              <div className="text-sm text-white/70">Deep wisdom from years of practice</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.agePreference && <p className="text-red-400 text-sm mt-1">{errors.agePreference}</p>}
                    </div>
                  </div>
                </Card>

                <Button 
                  onClick={nextStep}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Spiritual Goals
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 px-6 py-8">
              <div className="max-w-md mx-auto">
                <button 
                  onClick={prevStep}
                  className="flex items-center text-purple-300 hover:text-purple-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>

                <div className="text-center mb-6">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-4">
                    Step 4 of 4
                  </Badge>
                  <h1 className="text-3xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                    Your Spiritual Journey
                  </h1>
                </div>

                <Card className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm p-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-white flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 text-amber-400" />
                        What are your spiritual goals? (Select all that apply)
                      </Label>
                      <div className="space-y-2">
                        {[
                          "Find Inner Peace",
                          "Build Community",
                          "Deepen Practice",
                          "Explore Teachings",
                          "Overcome Challenges",
                          "Cultivate Gratitude"
                        ].map((goal) => (
                          <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                            <Checkbox
                              id={goal}
                              checked={formData.spiritualGoals.includes(goal)}
                              onCheckedChange={(checked) => handleSpiritualGoalsChange(goal, checked as boolean)}
                              className="border-purple-400"
                            />
                            <Label htmlFor={goal} className="flex-1 cursor-pointer text-white">
                              {goal}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.spiritualGoals && <p className="text-red-400 text-sm mt-1">{errors.spiritualGoals[0]}</p>}
                    </div>

                    <div>
                      <Label className="text-white flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        How often do you plan to engage?
                      </Label>
                      <RadioGroup 
                        value={formData.usageFrequency} 
                        onValueChange={(value) => updateFormData('usageFrequency', value)}
                      >
                        {["daily", "weekly", "monthly", "as-needed"].map((freq) => (
                          <div key={freq} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                            <RadioGroupItem value={freq} id={freq} className="border-purple-400" />
                            <Label htmlFor={freq} className="flex-1 cursor-pointer text-white capitalize">
                              {freq.replace('-', ' ')}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.usageFrequency && <p className="text-red-400 text-sm mt-1">{errors.usageFrequency}</p>}
                    </div>
                  </div>
                </Card>

                <Button 
                  onClick={handleGenerateGuide}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white h-12 shadow-lg shadow-purple-500/30 hover:shadow-amber-500/30 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Your Guide...
                    </>
                  ) : (
                    <>
                      Generate My Guide
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                <p className="text-center text-sm text-white/60 mt-4">
                  Select your goals and frequency above to continue
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 5: // Completion
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 text-white flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center max-w-lg"
              >
                {/* AI Generated Avatar Display */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="relative mx-auto mb-6"
                >
                  <div className="w-40 h-40 mx-auto relative">
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-amber-500 to-purple-500 animate-pulse blur-xl opacity-60"></div>
                    
                    {/* Avatar container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50">
                      <ImageWithFallback
                        src={generatedAvatarUrl || createdGuide?.generatedImageUrl || cosmicSpiritualImage}
                        alt="Your AI-generated guide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Success checkmark badge */}
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Sparkle effects around avatar */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <Sparkles className="absolute top-0 right-8 w-6 h-6 text-amber-400" />
                    <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-purple-400" />
                    <Sparkles className="absolute top-8 left-0 w-5 h-5 text-blue-400" />
                  </motion.div>
                </motion.div>
                
                <h1 className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Your Guide is Ready!
                </h1>
                
                <p className="text-white/80 mb-2">
                  {createdGuide?.guideName && (
                    <span className="text-2xl text-white block mb-3">{createdGuide.guideName}</span>
                  )}
                  Your {formData.guideRole} guide from the {formData.faith} tradition is here to support your spiritual journey.
                </p>

                {tierName === 'seeker' && (
                  <Card className="bg-gradient-to-r from-purple-900/40 to-amber-900/40 border-purple-500/20 backdrop-blur-sm mb-8 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="w-6 h-6 text-amber-400" />
                      <h3 className="text-white text-lg">Save Your Guides</h3>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      Subscribe to save your created guides permanently and access them from your profile anytime.
                    </p>
                    <Button 
                      onClick={() => openPortal('guide-completion')}
                      className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white"
                    >
                      View Subscription Plans
                    </Button>
                  </Card>
                )}

                {tierName !== 'seeker' && (
                  <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/20 backdrop-blur-sm mb-8 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h3 className="text-white text-lg">Guide Saved!</h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      Your guide has been saved to your profile and is ready to use.
                    </p>
                  </Card>
                )}

                <div className="space-y-3">
                  <Button 
                    onClick={() => onNavigate('chat')}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12"
                  >
                    Start Conversation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => onNavigate('guides')}
                    variant="outline"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10 h-12"
                  >
                    View All Guides
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderStep()}
    </AnimatePresence>
  );
}