import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { useCreatedGuide } from "./created-guide-context";
import { matchUserToGuide, type MatchingPreferences } from "./guide-matching-data";
import { toast } from "sonner@2.0.3";
import { X, Save, Upload, Camera, Sparkles, RefreshCw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Import faith symbols for faith selection
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

interface EditGuideModalProps {
  open: boolean;
  onClose: () => void;
}

// Match the onboarding process spiritual goals
const spiritualGoalsOptions = [
  "Inner Peace",
  "Spiritual Growth",
  "Prayer & Meditation",
  "Life Purpose",
  "Emotional Healing",
  "Wisdom & Guidance",
  "Community Connection",
  "Stress Management"
];

// Match the onboarding process guide roles
const guideRoleOptions = [
  { value: "Advisor", label: "Advisor", description: "Wise counsel" },
  { value: "Healer", label: "Healer", description: "Spiritual healing" },
  { value: "Scholar", label: "Scholar", description: "Deep knowledge" },
  { value: "Celebrant", label: "Celebrant", description: "Joy & celebration" }
];

// Match the onboarding process age preferences
const agePreferenceOptions = [
  { value: "young", label: "Young", description: "Vibrant energy" },
  { value: "middle-aged", label: "Mature", description: "Experienced wisdom" },
  { value: "elder", label: "Elder", description: "Ancient wisdom" }
];

// Faith options matching onboarding
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
  { label: "Bahá'í Faith", value: "Bahá'í Faith", image: bahaiStarImage },
  { label: "Polytheism", value: "Polytheism", image: polytheismCircleImage },
  { label: "Confucianism", value: "Confucianism", image: confuciusCharacterImage },
  { label: "Open to All", value: "Universal", image: null }
];

// Life situation options (from onboarding step 4)
const lifeSituationOptions = [
  { value: "seeking-peace", label: "Seeking Inner Peace" },
  { value: "life-transition", label: "Going Through Life Transition" },
  { value: "spiritual-growth", label: "On a Spiritual Growth Journey" },
  { value: "facing-challenges", label: "Facing Personal Challenges" },
  { value: "exploring", label: "Exploring Spirituality" },
  { value: "daily-practice", label: "Building Daily Practice" }
];

// Usage frequency options (from onboarding step 4)
const usageFrequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "few-times-week", label: "Few Times a Week" },
  { value: "weekly", label: "Weekly" },
  { value: "as-needed", label: "As Needed" }
];

export function EditGuideModal({ open, onClose }: EditGuideModalProps) {
  const { createdGuide, updateGuide, saveCreatedGuide } = useCreatedGuide();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [hasCustomImage, setHasCustomImage] = useState(false); // Track if user uploaded custom image
  
  const [formData, setFormData] = useState({
    faith: createdGuide?.faith || "",
    spiritualGoals: createdGuide?.spiritualGoals || [],
    guideRole: createdGuide?.guideRole || "",
    agePreference: createdGuide?.agePreference || "",
    lifeSituation: "",
    usageFrequency: createdGuide?.usageFrequency || "",
    customImageUrl: "", // Store custom uploaded image separately
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(createdGuide?.generatedImageUrl || null);

  // Update form data when guide changes
  useEffect(() => {
    if (createdGuide) {
      setFormData({
        faith: createdGuide.faith || "",
        spiritualGoals: createdGuide.spiritualGoals || [],
        guideRole: createdGuide.guideRole || "",
        agePreference: createdGuide.agePreference || "",
        lifeSituation: "",
        usageFrequency: createdGuide.usageFrequency || "",
        customImageUrl: "",
      });
      setImagePreview(createdGuide.generatedImageUrl || null);
      setHasCustomImage(false); // Reset custom image flag
    }
  }, [createdGuide]);

  const handleSpiritualGoalsChange = (goal: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      spiritualGoals: checked 
        ? [...prev.spiritualGoals, goal]
        : prev.spiritualGoals.filter(g => g !== goal)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, customImageUrl: result }));
      setHasCustomImage(true); // Mark that user uploaded a custom image
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, customImageUrl: "" }));
    setHasCustomImage(false); // Clear custom image flag
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Custom image removed. The matched guide's image will be used.");
  };

  const handleSave = () => {
    if (!createdGuide) return;

    // Validate required fields
    if (!formData.faith) {
      toast.error("Please select a faith tradition");
      return;
    }
    if (formData.spiritualGoals.length === 0) {
      toast.error("Please select at least one spiritual goal");
      return;
    }
    if (!formData.guideRole) {
      toast.error("Please select a guide role");
      return;
    }
    if (!formData.agePreference) {
      toast.error("Please select an age preference");
      return;
    }

    setIsRegenerating(true);

    // Create matching preferences from form data
    const matchingPreferences: MatchingPreferences = {
      faithPreference: formData.faith,
      spiritualGoals: formData.spiritualGoals,
      guideRole: formData.guideRole,
      agePreference: formData.agePreference,
      lifeSituation: formData.lifeSituation
    };

    // Match user to a new guide based on updated preferences
    const matchedGuide = matchUserToGuide(matchingPreferences);

    // Simulate processing time for better UX
    setTimeout(() => {
      // Update the guide with new matched data, but preserve conversation history
      const updatedGuide = {
        ...createdGuide,
        guideName: matchedGuide.name,
        faith: formData.faith,
        guideRole: formData.guideRole,
        agePreference: formData.agePreference,
        spiritualGoals: formData.spiritualGoals,
        usageFrequency: formData.usageFrequency,
        // Use custom uploaded image if available, otherwise use matched guide's image
        generatedImageUrl: hasCustomImage ? formData.customImageUrl : matchedGuide.image,
        description: matchedGuide.description,
        welcomeMessage: matchedGuide.welcomeMessage,
        isMatched: true,
        matchedGuideId: matchedGuide.id,
        specialties: matchedGuide.specialties,
        personality: matchedGuide.personality,
        sect: matchedGuide.sect,
        archetypeRoles: matchedGuide.archetypeRoles,
        journeyLevel: matchedGuide.journeyLevel,
        // Preserve existing conversation history
        conversationHistory: createdGuide.conversationHistory || []
      };

      // Use updateGuide instead of saveCreatedGuide to preserve createdAt timestamp
      updateGuide(updatedGuide);

      setIsRegenerating(false);

      toast.success(
        `Your guide has been updated to ${matchedGuide.name}!`,
        {
          description: `A ${matchedGuide.role.toLowerCase()} from ${matchedGuide.faith} who specializes in ${matchedGuide.specialties.slice(0, 2).join(' and ')}`,
          duration: 5000,
        }
      );
      
      onClose();
    }, 1500);
  };

  if (!createdGuide) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] bg-gradient-to-b from-slate-900 to-slate-900/95 border-purple-500/30 overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Edit Your Guide
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Customize your spiritual guide's characteristics and focus areas. We'll match you with a new guide based on your preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Guide Image Upload */}
          <div className="space-y-3">
            <Label className="text-white">Guide Avatar (Optional)</Label>
            <div className="flex flex-col items-center gap-4">
              {/* Image Preview */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 bg-slate-800/50">
                  {imagePreview ? (
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Guide Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Camera className="w-12 h-12" />
                    </div>
                  )}
                </div>
                {imagePreview && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex gap-2 w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="guide-image-upload"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800 hover:border-purple-500/50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imagePreview ? "Change Image" : "Upload Custom Image"}
                </Button>
              </div>
              <p className="text-xs text-slate-400 text-center">
                Optional: Upload a custom avatar or we'll use your matched guide's image
              </p>
            </div>
          </div>

          {/* Faith Preference */}
          <div className="space-y-3">
            <Label className="text-white">Faith Tradition *</Label>
            <Select value={formData.faith} onValueChange={(value) => setFormData(prev => ({ ...prev, faith: value }))}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Select your faith tradition" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                {faithOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Spiritual Goals */}
          <div className="space-y-3">
            <Label className="text-white">Spiritual Goals *</Label>
            <p className="text-sm text-slate-400">Select all that resonate with you (at least one)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {spiritualGoalsOptions.map(goal => (
                <div key={goal} className="flex items-center space-x-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                  <Checkbox
                    id={`goal-${goal}`}
                    checked={formData.spiritualGoals.includes(goal)}
                    onCheckedChange={(checked) => handleSpiritualGoalsChange(goal, checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <label htmlFor={`goal-${goal}`} className="text-slate-200 cursor-pointer flex-1 text-sm">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Role */}
          <div className="space-y-3">
            <Label className="text-white">Guide Role *</Label>
            <p className="text-sm text-slate-400">What type of guidance do you need?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {guideRoleOptions.map(role => (
                <motion.button
                  key={role.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, guideRole: role.value }))}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${formData.guideRole === role.value
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                    }
                  `}
                >
                  <div className="text-sm text-white font-semibold mb-1">{role.label}</div>
                  <div className="text-xs text-white/60">{role.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Age Preference */}
          <div className="space-y-3">
            <Label className="text-white">Age Preference *</Label>
            <p className="text-sm text-slate-400">What age range resonates with you?</p>
            <div className="grid grid-cols-3 gap-3">
              {agePreferenceOptions.map(age => (
                <motion.button
                  key={age.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, agePreference: age.value }))}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${formData.agePreference === age.value
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                    }
                  `}
                >
                  <div className="text-sm text-white font-semibold mb-1">{age.label}</div>
                  <div className="text-xs text-white/60">{age.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Life Situation (Optional) */}
          <div className="space-y-3">
            <Label className="text-white">Life Situation (Optional)</Label>
            <Select value={formData.lifeSituation} onValueChange={(value) => setFormData(prev => ({ ...prev, lifeSituation: value }))}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="What best describes your current journey?" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {lifeSituationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Usage Frequency (Optional) */}
          <div className="space-y-3">
            <Label className="text-white">Usage Frequency (Optional)</Label>
            <Select value={formData.usageFrequency} onValueChange={(value) => setFormData(prev => ({ ...prev, usageFrequency: value }))}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="How often do you plan to connect?" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {usageFrequencyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700/50">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800"
              disabled={isRegenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              disabled={isRegenerating}
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Matching Guide...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}