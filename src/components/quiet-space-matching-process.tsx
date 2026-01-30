/**
 * Quiet Space Matching Process Component
 * 
 * This component collects user meditation preferences through a questionnaire
 * and matches them with the ideal quiet space meditation environment
 * based on their spiritual goals, experience level, and preferences.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import meditationDiverseImage from 'figma:asset/4e76a58a692a35e081aba31c0497dab4a645f5ef.png';
import crossSymbolImage from 'figma:asset/b44167e6091487c7bc1ff72e9a70c5c1154c0a0a.png';
import dharmaWheelImage from 'figma:asset/4a1c4d32bad39322659f08685efcfd135dd2b561.png';
import starCrescentImage from 'figma:asset/df9ac2b88e7f75002855a82d0ca7b003f6f961c4.png';
import hinduOmImage from 'figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png';
import jewishStarImage from 'figma:asset/e2020c35261f80ef64b0d52af9babc23f58c0f26.png';
import yinYangImage from 'figma:asset/51a7d0e6d1a6647dca02517899785892471e556b.png';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Loader2,
  Target,
  Clock,
  Wind,
  Heart,
  Brain,
  Flame,
  Mountain,
  Waves,
  CloudRain,
  Bird,
  Music,
  TreePine,
  Sun
} from "lucide-react";
import { useMatchedQuietSpace } from "./matched-quiet-space-context";
import { toast } from "sonner@2.0.3";

interface QuietSpaceMatchingProcessProps {
  onComplete: () => void;
  onCancel: () => void;
}

interface QuietSpaceFormData {
  faithTradition: string;
  spiritualGoals: string[];
  experienceLevel: string;
}

// Available quiet space templates
const quietSpaceTemplates = [
  {
    id: "christian-contemplation",
    name: "Christian Contemplative Prayer",
    faithTradition: "Christianity",
    description: "A sacred space for centering prayer, lectio divina, and silent contemplation in the presence of the Divine.",
    benefits: [
      "Deepens relationship with God through silence",
      "Reduces anxiety and promotes inner peace",
      "Enhances spiritual discernment",
      "Cultivates listening prayer"
    ],
    practices: ["Centering Prayer", "Lectio Divina", "Jesus Prayer", "Silent Contemplation"],
    ambientSound: "bells",
    meditationType: "Contemplative",
    imageUrl: "https://images.unsplash.com/photo-1705608604329-49335be66661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBwcmF5ZXIlMjBjYW5kbGVzfGVufDF8fHx8MTc2MzMzNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["peace", "prayer", "contemplation", "divine", "scripture"]
  },
  {
    id: "buddhist-mindfulness",
    name: "Buddhist Mindfulness Sanctuary",
    faithTradition: "Buddhism",
    description: "A tranquil environment for practicing mindfulness, loving-kindness meditation, and cultivating compassion.",
    benefits: [
      "Develops present-moment awareness",
      "Cultivates compassion and loving-kindness",
      "Reduces suffering through understanding",
      "Promotes emotional balance"
    ],
    practices: ["Vipassana", "Metta Meditation", "Walking Meditation", "Breath Awareness"],
    ambientSound: "bells",
    meditationType: "Mindfulness",
    imageUrl: "https://images.unsplash.com/photo-1642980522170-4dc3d6851c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzYzMzM2ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["mindfulness", "awareness", "compassion", "peace", "balance"]
  },
  {
    id: "islamic-dhikr",
    name: "Islamic Dhikr Chamber",
    faithTradition: "Islam",
    description: "A peaceful retreat for remembrance of Allah through dhikr, meditation on divine names, and spiritual reflection.",
    benefits: [
      "Strengthens connection with Allah",
      "Purifies the heart through remembrance",
      "Brings tranquility to the soul",
      "Deepens understanding of divine attributes"
    ],
    practices: ["Dhikr Meditation", "Muraqaba", "Tasbih Recitation", "Quranic Reflection"],
    ambientSound: "wind",
    meditationType: "Devotional",
    imageUrl: "https://images.unsplash.com/photo-1720205888671-ec64f89447ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzMzNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["devotion", "remembrance", "prayer", "peace", "divine"]
  },
  {
    id: "hindu-meditation",
    name: "Hindu Meditation Ashram",
    faithTradition: "Hinduism",
    description: "A sacred space for mantra meditation, chakra balancing, and union with the Divine Self.",
    benefits: [
      "Awakens spiritual energy (Kundalini)",
      "Balances chakras and energy centers",
      "Promotes self-realization",
      "Connects with universal consciousness"
    ],
    practices: ["Mantra Meditation", "Chakra Meditation", "Pranayama", "Japa"],
    ambientSound: "bells",
    meditationType: "Yogic",
    imageUrl: "https://images.unsplash.com/photo-1761471676242-6ec2e8cecc8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGxvdHVzfGVufDF8fHx8MTc2MzMzNzAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["energy", "chakra", "mantra", "consciousness", "enlightenment"]
  },
  {
    id: "jewish-reflection",
    name: "Jewish Contemplative Space",
    faithTradition: "Judaism",
    description: "A quiet sanctuary for hitbodedut (meditative conversation with God) and contemplative study.",
    benefits: [
      "Deepens personal relationship with HaShem",
      "Promotes spiritual clarity",
      "Enhances Torah understanding",
      "Cultivates gratitude and wonder"
    ],
    practices: ["Hitbodedut", "Meditation on Divine Names", "Contemplative Prayer", "Mindful Study"],
    ambientSound: "wind",
    meditationType: "Contemplative",
    imageUrl: "https://images.unsplash.com/photo-1538599462720-b466e1ce73d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdpc2glMjBtZW5vcmFoJTIwcHJheWVyfGVufDF8fHx8MTc2MzMzNzAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["prayer", "study", "contemplation", "divine", "wisdom"]
  },
  {
    id: "taoist-harmony",
    name: "Taoist Harmony Garden",
    faithTradition: "Taoism",
    description: "A serene space for wu wei meditation, breath cultivation, and harmonizing with the Tao.",
    benefits: [
      "Cultivates inner stillness",
      "Harmonizes with natural flow",
      "Balances yin and yang energies",
      "Promotes longevity and vitality"
    ],
    practices: ["Qigong Meditation", "Breath Cultivation", "Inner Alchemy", "Sitting Meditation"],
    ambientSound: "forest",
    meditationType: "Energy Cultivation",
    imageUrl: "https://images.unsplash.com/photo-1735151055127-73c610ae901f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjMyODYwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["balance", "energy", "nature", "harmony", "flow"]
  },
  {
    id: "universal-mindfulness",
    name: "Universal Mindfulness Sanctuary",
    faithTradition: "Universal",
    description: "An inclusive meditation space welcoming all spiritual paths, focused on breath, presence, and inner peace.",
    benefits: [
      "Accessible to all faith traditions",
      "Reduces stress and anxiety",
      "Improves focus and clarity",
      "Promotes overall wellbeing"
    ],
    practices: ["Breath Meditation", "Body Scan", "Loving-Kindness", "Open Awareness"],
    ambientSound: "ocean",
    meditationType: "Mindfulness",
    imageUrl: "https://images.unsplash.com/photo-1599744403700-b7330f3c4dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzYzMzM3MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["mindfulness", "peace", "stress", "clarity", "wellbeing"]
  },
  {
    id: "nature-connection",
    name: "Nature Connection Retreat",
    faithTradition: "Universal",
    description: "Connect with the natural world through meditation surrounded by sounds of rain, ocean, and forest.",
    benefits: [
      "Reconnects with nature",
      "Grounds and centers energy",
      "Reduces stress naturally",
      "Enhances environmental awareness"
    ],
    practices: ["Nature Meditation", "Earth Grounding", "Elemental Awareness", "Forest Bathing"],
    ambientSound: "rain",
    meditationType: "Nature-Based",
    imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzYzMjI1MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    matchingKeywords: ["nature", "earth", "grounding", "forest", "elements"]
  }
];

export function QuietSpaceMatchingProcess({ onComplete, onCancel }: QuietSpaceMatchingProcessProps) {
  const { saveMatchedSpace } = useMatchedQuietSpace();
  const [currentStep, setCurrentStep] = useState(1);
  const [isMatching, setIsMatching] = useState(false);
  const totalSteps = 3;

  const [formData, setFormData] = useState<QuietSpaceFormData>({
    faithTradition: "",
    spiritualGoals: [],
    experienceLevel: ""
  });

  // Faith traditions with symbol images
  const faithTraditions = [
    { id: "christianity", name: "Christianity", symbolImage: crossSymbolImage },
    { id: "buddhism", name: "Buddhism", symbolImage: dharmaWheelImage },
    { id: "islam", name: "Islam", symbolImage: starCrescentImage },
    { id: "hinduism", name: "Hinduism", symbolImage: hinduOmImage },
    { id: "judaism", name: "Judaism", symbolImage: jewishStarImage },
    { id: "taoism", name: "Taoism", symbolImage: yinYangImage },
    { id: "universal", name: "Universal/Non-denominational", symbolImage: null }
  ];

  // Spiritual goals
  const spiritualGoalOptions = [
    { id: "peace", label: "Find Inner Peace", icon: Heart },
    { id: "stress", label: "Reduce Stress & Anxiety", icon: Wind },
    { id: "clarity", label: "Mental Clarity & Focus", icon: Brain },
    { id: "divine", label: "Connect with Divine", icon: Sparkles },
    { id: "compassion", label: "Cultivate Compassion", icon: Heart },
    { id: "energy", label: "Balance Energy", icon: Flame },
    { id: "awareness", label: "Increase Self-Awareness", icon: Target },
    { id: "nature", label: "Connect with Nature", icon: TreePine }
  ];

  // Experience levels
  const experienceLevels = [
    { id: "beginner", label: "Beginner", description: "New to meditation" },
    { id: "intermediate", label: "Intermediate", description: "Some meditation experience" },
    { id: "advanced", label: "Advanced", description: "Regular meditation practice" }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.faithTradition !== "";
      case 2:
        return formData.spiritualGoals.length > 0;
      case 3:
        return formData.experienceLevel !== "";
      default:
        return false;
    }
  };

  const calculateMatch = (): typeof quietSpaceTemplates[0] & { matchScore: number; duration: number } => {
    let bestMatch = quietSpaceTemplates[0];
    let highestScore = 0;

    quietSpaceTemplates.forEach(space => {
      let score = 0;

      // Faith tradition match (60 points)
      if (space.faithTradition.toLowerCase() === formData.faithTradition.toLowerCase()) {
        score += 60;
      } else if (space.faithTradition === "Universal") {
        score += 35;
      }

      // Spiritual goals match (40 points)
      const goalKeywords = formData.spiritualGoals.join(" ").toLowerCase();
      space.matchingKeywords.forEach(keyword => {
        if (goalKeywords.includes(keyword)) {
          score += 8;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = space;
      }
    });

    // Default duration based on experience level
    const defaultDuration = formData.experienceLevel === "beginner" ? 10 
                          : formData.experienceLevel === "intermediate" ? 15 
                          : 20;

    return {
      ...bestMatch,
      matchScore: highestScore,
      duration: defaultDuration
    };
  };

  const handleSubmit = async () => {
    setIsMatching(true);

    // Simulate matching process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const matchedSpace = calculateMatch();

    saveMatchedSpace({
      id: matchedSpace.id,
      name: matchedSpace.name,
      faithTradition: matchedSpace.faithTradition,
      description: matchedSpace.description,
      benefits: matchedSpace.benefits,
      practices: matchedSpace.practices,
      ambientSound: matchedSpace.ambientSound,
      meditationType: matchedSpace.meditationType,
      duration: matchedSpace.duration,
      imageUrl: matchedSpace.imageUrl,
      matchScore: matchedSpace.matchScore,
      userPreferences: formData
    });

    toast.success("Perfect match found!", {
      description: `We've found your ideal quiet space: ${matchedSpace.name}`
    });

    setIsMatching(false);
    onComplete();
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      spiritualGoals: prev.spiritualGoals.includes(goalId)
        ? prev.spiritualGoals.filter(g => g !== goalId)
        : [...prev.spiritualGoals, goalId]
    }));
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pb-24">
      {/* Background Video Layer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ zIndex: 0 }}>
        <video
          autoPlay
          playsInline
          muted={false}
          poster="figma:asset/e8c616b4e24d9021bf486e12b8051c40771ffaa5.png"
          className="w-full h-auto object-cover"
          style={{ objectPosition: 'center top' }}
        >
          <source src="https://divinityagi.com/wp-content/uploads/2026/01/Quiet-Space-Group-Intro.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="mb-4 text-black/80 hover:text-[#1e386e] hover:bg-transparent"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quiet Space
          </Button>

          <div className="text-center mb-6">
            <h1 className="text-[36px] text-[#3d3d6b] mb-2 drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              Your Quiet Space
            </h1>
            <p className="text-black/70 mx-[0px] my-[104px] mt-[104px] mr-[0px] mb-[37px] ml-[0px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
              Answer a few questions to discover your perfect meditation environment
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-[-26px] mt-[-22px] mr-[0px] ml-[0px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black/70" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-[#a79a4c]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-[#0B1426]/60 rounded-full h-2 border border-[#a79a4c]/20">
              <div
                className="bg-[#a79a4c] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isMatching ? (
            <motion.div
              key="matching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Sparkles className="w-32 h-32 text-[#497EBC]" />
                </motion.div>
              </div>
              <h2 className="text-2xl text-black mb-2" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 700 }}>
                Finding Your Perfect Space...
              </h2>
              <p className="text-black/70">
                Analyzing your preferences and matching you with the ideal meditation environment
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Faith Tradition */}
              {currentStep === 1 && (
                <Card className="p-6 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-2 border-[#a79a4c] mt-[62px] mr-[0px] mb-[0px] ml-[0px]" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    What is your faith tradition?
                  </h2>
                  <p className="text-white/70 mb-6" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    We'll recommend a meditation space aligned with your spiritual path
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {faithTraditions.map(faith => (
                      <button
                        key={faith.id}
                        onClick={() => setFormData({ ...formData, faithTradition: faith.id })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.faithTradition === faith.id
                            ? 'border-[#a79a4c] bg-[#1e386e]/40 shadow-[0_0_20px_rgba(167,154,76,0.4)]'
                            : 'border-[#a79a4c]/20 bg-[#182238]/40 hover:border-[#a79a4c]/50 hover:bg-[#182238]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {faith.symbolImage && <ImageWithFallback src={faith.symbolImage} alt={faith.name} className="w-5 h-5" />}
                          <span className={`${formData.faithTradition === faith.id ? 'text-[#a79a4c]' : 'text-white'}`} style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                            {faith.name}
                          </span>
                          {formData.faithTradition === faith.id && (
                            <CheckCircle className="w-5 h-5 text-[#a79a4c] ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Step 2: Spiritual Goals */}
              {currentStep === 2 && (
                <Card className="p-6 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-2 border-[#a79a4c]" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    What are your meditation goals?
                  </h2>
                  <p className="text-white/70 mb-6" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    Select all that apply
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {spiritualGoalOptions.map(goal => {
                      const Icon = goal.icon;
                      const isSelected = formData.spiritualGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#a79a4c] bg-[#1e386e]/40 shadow-[0_0_20px_rgba(167,154,76,0.4)]'
                              : 'border-[#a79a4c]/20 bg-[#182238]/40 hover:border-[#a79a4c]/50'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 mx-auto ${isSelected ? 'text-[#a79a4c]' : 'text-white/70'}`} />
                          <div className={`text-sm text-center ${isSelected ? 'text-[#a79a4c]' : 'text-white'}`} style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}>
                            {goal.label}
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-[#a79a4c] mt-2 mx-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Step 3: Experience Level */}
              {currentStep === 3 && (
                <Card className="p-6 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-2 border-[#a79a4c]" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
                  <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    What's your meditation experience?
                  </h2>
                  <p className="text-white/70 mb-6" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
                    This helps us recommend the right practices
                  </p>

                  <div className="space-y-3">
                    {experienceLevels.map(level => (
                      <button
                        key={level.id}
                        onClick={() => setFormData({ ...formData, experienceLevel: level.id })}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          formData.experienceLevel === level.id
                            ? 'border-[#a79a4c] bg-[#1e386e]/40 shadow-[0_0_20px_rgba(167,154,76,0.4)]'
                            : 'border-[#a79a4c]/20 bg-[#182238]/40 hover:border-[#a79a4c]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`mb-1 ${formData.experienceLevel === level.id ? 'text-[#a79a4c]' : 'text-white'}`} style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                              {level.label}
                            </div>
                            <div className="text-sm text-white/70" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>{level.description}</div>
                          </div>
                          {formData.experienceLevel === level.id && (
                            <CheckCircle className="w-5 h-5 text-[#a79a4c]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!isMatching && (
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 border-2 border-[#1e386e] text-white bg-[#1e386e]/20 hover:bg-[#1e386e] hover:border-[#1e386e] hover:text-white"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex-1 h-12 bg-[#a79a4c] hover:bg-[#8b7a4a] text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
            >
              {currentStep === totalSteps ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Find My Space
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}