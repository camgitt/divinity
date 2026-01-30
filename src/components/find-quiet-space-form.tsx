import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface FindQuietSpaceFormProps {
  onBack?: () => void;
  onComplete?: (faithTradition: string) => void;
}

const faithOptions = [
  { id: 'christianity', emoji: '✝️', label: 'Christianity' },
  { id: 'buddhism', emoji: '☸️', label: 'Buddhism' },
  { id: 'islam', emoji: '☪️', label: 'Islam' },
  { id: 'hinduism', emoji: '🕉️', label: 'Hinduism' },
  { id: 'judaism', emoji: '✡️', label: 'Judaism' },
  { id: 'universal', emoji: '✨', label: 'Universal/Non-denominational' },
];

export function FindQuietSpaceForm({ onBack, onComplete }: FindQuietSpaceFormProps) {
  const [selectedFaith, setSelectedFaith] = useState<string | null>(null);
  const [currentStep] = useState(1);
  const totalSteps = 6;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  const handleFaithSelect = (faithId: string) => {
    setSelectedFaith(faithId);
    // Auto-continue after selection
    setTimeout(() => {
      if (onComplete) {
        onComplete(faithId);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0B1426] relative overflow-hidden">
      {/* Dark Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cosmic background image */}
        <div className="absolute inset-0 -top-20 h-[120vh]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1711994872230-e3cb2690b54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBzdGFycyUyMGdhbGF4eSUyMHVuaXZlcnNlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzU5ODc5NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cosmic Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25 mix-blend-multiply scale-105"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/40 via-[#0B1426]/60 via-[#162844]/70 to-[#0B1426]/95" />
        </div>
        
        {/* Purple and gold accent overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(122,79,255,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,211,105,0.12),_transparent_60%)]" />
        
        {/* Atmospheric depth layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(122,79,255,0.08),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,_rgba(255,211,105,0.06),_transparent_60%)]" />
        
        {/* Enhanced multi-layer texture system */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(122, 79, 255, 0.15) 2px,
                rgba(122, 79, 255, 0.15) 4px
              )
            `
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(255, 211, 105, 0.1) 3px,
                rgba(255, 211, 105, 0.1) 6px
              )
            `
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(122,79,255,0.2) 1px, transparent 0)
            `,
            backgroundSize: '24px 24px'
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(122,79,255,0.15) 1px, transparent 0),
              radial-gradient(circle at 16px 16px, rgba(255,211,105,0.1) 1px, transparent 0)
            `,
            backgroundSize: '32px 32px, 28px 28px'
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 8px,
                rgba(122, 79, 255, 0.05) 8px,
                rgba(122, 79, 255, 0.05) 9px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 8px,
                rgba(122, 79, 255, 0.05) 8px,
                rgba(122, 79, 255, 0.05) 9px
              )
            `
          }}
        />

        {/* Floating spiritual elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#497EBC] rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-[#FFD369] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-['Raleway',sans-serif] font-medium text-sm">Back to Quiet Space</span>
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 
            className="text-4xl mb-2 text-white leading-tight max-w-[290px]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900 }}
          >
            Find Your Quiet Space
          </h1>
          <p 
            className="text-white/70 text-base max-w-[300px]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Answer a few questions to discover your perfect meditation environment
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm font-['Raleway',sans-serif]">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-[#497EBC] text-sm font-['Raleway',sans-serif]">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#0B1426]/60 rounded-full overflow-hidden border border-[#b69e60]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#497EBC] to-[#b69e60]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#162844]/60 backdrop-blur-sm border border-[#b69e60]/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(73,126,188,0.3)] mb-6">
          <h2 
            className="text-2xl mb-2 text-white"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
          >
            What is your faith tradition?
          </h2>
          <p 
            className="text-white/70 text-base"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            We'll recommend a meditation space aligned with your spiritual path
          </p>
        </div>

        {/* Faith Options Grid */}
        <div className="flex flex-col gap-3 mb-6">
          {faithOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleFaithSelect(option.id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 ${
                selectedFaith === option.id
                  ? 'bg-[#497EBC]/30 border-[#497EBC] shadow-[0_0_20px_rgba(73,126,188,0.4)]'
                  : 'bg-[#162844]/40 border-[#b69e60]/20 hover:border-[#497EBC]/50 hover:bg-[#162844]/60'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.emoji}</span>
                <span 
                  className={`text-base font-semibold ${
                    selectedFaith === option.id ? 'text-[#b69e60]' : 'text-white'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {option.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          onClick={() => selectedFaith && onComplete?.(selectedFaith)}
          disabled={!selectedFaith}
          className={`w-full h-12 rounded-xl transition-all ${
            selectedFaith
              ? 'bg-gradient-to-r from-[#497EBC] to-[#b69e60] hover:from-[#3A6BA5] hover:to-[#a88e56] text-white shadow-lg'
              : 'bg-[#162844]/40 text-white/40 cursor-not-allowed border border-[#b69e60]/20'
          }`}
        >
          <span className="font-['Raleway',sans-serif] font-medium">Continue</span>
        </Button>

        {/* Spacer for bottom navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
}