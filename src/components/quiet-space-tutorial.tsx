/**
 * Quiet Space Tutorial Component
 * First-time user onboarding for gesture controls
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hand, ChevronUp, Clock, Sparkles, X } from 'lucide-react';

interface QuietSpaceTutorialProps {
  onClose: () => void;
}

const tutorialSteps = [
  {
    id: 1,
    icon: Hand,
    title: 'Welcome to Your Sacred Space',
    description: 'A sanctuary of breath, light, and peace tailored to your spiritual journey.',
    gesture: 'none'
  },
  {
    id: 2,
    icon: ChevronUp,
    title: 'Swipe Up to Transform',
    description: 'Swipe upward to cycle through atmospheric modes—from dawn to twilight to cosmic void.',
    gesture: 'swipe'
  },
  {
    id: 3,
    icon: Clock,
    title: 'Long Press for Settings',
    description: 'Press and hold anywhere for 1 second to open the radial settings wheel.',
    gesture: 'press'
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Choose Your Experience',
    description: 'Select micro-states, faith ambiances, soundscapes, and breathing patterns.',
    gesture: 'none'
  }
];

export function QuietSpaceTutorial({ onClose }: QuietSpaceTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setShow(false);
    // Mark tutorial as completed in localStorage
    localStorage.setItem('divinityagi_quiet_space_tutorial_completed', 'true');
    setTimeout(() => onClose(), 300);
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-8 max-w-md w-full border border-white/10 relative"
          >
            {/* Skip button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-white/50 hover:text-white/80 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Step indicator */}
            <div className="flex gap-2 mb-6">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= currentStep ? 'bg-[#497EBC]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#497EBC] to-[#1E3A5F] flex items-center justify-center">
                <Icon size={32} className="text-white" />
              </div>
            </div>

            {/* Content */}
            <h3 
              className="text-white text-center mb-3"
              style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '24px' }}
            >
              {step.title}
            </h3>
            <p 
              className="text-white/70 text-center mb-6"
              style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', lineHeight: '1.6' }}
            >
              {step.description}
            </p>

            {/* Gesture demonstration */}
            {step.gesture === 'swipe' && (
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-white/40"
                >
                  <ChevronUp size={40} />
                </motion.div>
              </div>
            )}
            {step.gesture === 'press' && (
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Hand size={28} className="text-white/40" />
                </motion.div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
                  style={{ fontFamily: 'Poppins', fontWeight: 300 }}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Begin'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Check if tutorial should be shown
export function shouldShowTutorial(): boolean {
  try {
    const completed = localStorage.getItem('divinityagi_quiet_space_tutorial_completed');
    return completed !== 'true';
  } catch {
    return true;
  }
}