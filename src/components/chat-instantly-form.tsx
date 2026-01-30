import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BackgroundVideo } from "./background-video";
import logoImage from 'figma:asset/5578f3fb8f7a6eebd6ae362650e8c82d141005db.png';
import whiteDivinityLogo from 'figma:asset/3a80ad2751f347b22d1a22214bdaa63d4171359e.png';
import guestIntroPoster from 'figma:asset/70c570454b479dbd937090b3cc32f11ed7ff0eeb.png';
import { ArrowLeft, Sparkles, MessageSquare } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useGuestMode } from "./guest-mode-context";

interface ChatInstantlyFormProps {
  onNavigate: (page: string) => void;
  onStartChat?: (data: ChatFormData) => void;
}

export interface ChatFormData {
  faithTradition: string;
  ageConfirmed: boolean;
}

export function ChatInstantlyForm({ onNavigate, onStartChat }: ChatInstantlyFormProps) {
  const { startGuestSession } = useGuestMode();
  const [formData, setFormData] = useState<ChatFormData>({
    faithTradition: "",
    ageConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.faithTradition) {
      toast.error("Please select your faith tradition");
      return;
    }
    
    if (!formData.ageConfirmed) {
      toast.error("You must be 13 years or older to use DivinityAGI");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save user to localStorage (similar to Create Account form)
      localStorage.setItem('divinityagi_user', JSON.stringify({
        id: `guest-${Date.now()}`,
        email: "guest@example.com",
        name: "Guest User",
        username: "guestuser",
        faithTradition: formData.faithTradition,
        registeredAt: new Date().toISOString()
      }));
      
      // Start the 10-minute guest session
      startGuestSession();
      
      // Call the callback if provided
      if (onStartChat) {
        await onStartChat(formData);
      }
      
      toast.success(`Welcome! You have 10 minutes to explore.`);
      
      // Navigate to guides page (with faith preference)
      setTimeout(() => {
        onNavigate("guides");
      }, 1000);
    } catch (error) {
      console.error("Error starting chat:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#121212]">
      {/* Background Video */}
      <BackgroundVideo
        videoSrc="https://divinityagi.com/wp-content/uploads/2026/01/Guest-Intro.mp4"
        posterSrc={guestIntroPoster}
        className="fixed inset-0"
        muted={false}
        loop={false}
        videoStyle={{ objectPosition: 'top' }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

      {/* Logo */}
      <div className="sticky top-4 md:top-8 z-10 mb-4 md:mb-8 flex justify-center">
        <ImageWithFallback 
          src={whiteDivinityLogo}
          alt="DivinityAGI Logo"
          className="w-48 md:w-64 h-16 md:h-20 object-contain"
        />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md mx-auto px-3 sm:px-4 pb-6 md:pb-8"
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate("chat2")}
          className="absolute top-[-60px] md:top-[-80px] left-3 sm:left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Form Card */}
        <Card className="backdrop-blur-md border-2 border-[#a79a4c] rounded-3xl shadow-[0px_8px_30px_0px_rgba(167,154,76,0.3)] p-4 sm:p-6 md:p-8 mt-[280px] sm:mt-[220px] md:mt-[264px]" style={{ background: 'linear-gradient(180deg, #182238 0%, #1e386e 50%, #182238 100%)' }}>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="text-center space-y-2 mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a79a4c]/20 backdrop-blur-md border border-[#a79a4c]/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-[#a79a4c]" />
                </div>
              </div>
              <h1 
                className="text-white text-[20px] sm:text-[22px] md:text-[24px]" 
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
              >
                Start Your Free Guest Trial
              </h1>
              <p 
                className="text-white/70 text-[13px] sm:text-[14px]"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}
              >
                10-minute trial • No account needed
              </p>
            </div>

            {/* Faith Tradition */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label 
                htmlFor="faithTradition"
                className="text-white/90 text-[13px] sm:text-[14px] font-medium"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Faith Tradition *
              </Label>
              <Select 
                value={formData.faithTradition} 
                onValueChange={(value) => setFormData({ ...formData, faithTradition: value })}
              >
                <SelectTrigger 
                  className="bg-[rgba(11,20,38,0.6)] border-2 border-[#a79a4c]/30 rounded-[14px] h-11 sm:h-12 text-white text-[15px] sm:text-base touch-manipulation"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  <SelectValue placeholder="Select your tradition" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b1426] border-[#a79a4c]/30">
                  <SelectItem value="christianity">Christianity</SelectItem>
                  <SelectItem value="islam">Islam</SelectItem>
                  <SelectItem value="judaism">Judaism</SelectItem>
                  <SelectItem value="hinduism">Hinduism</SelectItem>
                  <SelectItem value="buddhism">Buddhism</SelectItem>
                  <SelectItem value="sikhism">Sikhism</SelectItem>
                  <SelectItem value="bahai">Bahá'í Faith</SelectItem>
                  <SelectItem value="jainism">Jainism</SelectItem>
                  <SelectItem value="taoism">Taoism</SelectItem>
                  <SelectItem value="shinto">Shinto</SelectItem>
                  <SelectItem value="confucianism">Confucianism</SelectItem>
                  <SelectItem value="other">Other/Interfaith</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age Confirmation */}
            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="ageConfirm"
                checked={formData.ageConfirmed}
                onCheckedChange={(checked) => setFormData({ ...formData, ageConfirmed: checked as boolean })}
                className="bg-[rgba(41,41,41,0.3)] border-2 border-[#a79a4c]/50 data-[state=checked]:bg-[#a79a4c] data-[state=checked]:border-[#a79a4c] mt-0.5 touch-manipulation min-w-[20px] min-h-[20px]"
              />
              <Label 
                htmlFor="ageConfirm"
                className="text-white/80 text-[13px] sm:text-[14px] cursor-pointer leading-tight"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                I confirm that I am 13 years or older
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 sm:h-12 bg-[#a79a4c] hover:bg-[#8b7a4a] text-white font-semibold text-[15px] sm:text-[16px] rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all touch-manipulation border-0"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  Starting Chat...
                </span>
              ) : (
                "Start Free Chat Now"
              )}
            </Button>

            {/* Privacy Note */}
            <p 
              className="text-white/50 text-[11px] sm:text-[12px] text-center leading-tight"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              No personal information required • Create a free account for unlimited access
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}