/**
 * Affirmation Display Component
 * Shows rotating affirmations based on atmosphere mode and emotional state
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAtmosphere } from './atmosphere-context';
import { getFaithAmbiance } from './faith-ambiance-config';
import { getMicroState } from './micro-states-config';

interface AffirmationDisplayProps {
  showAffirmations: boolean;
  interval?: number; // milliseconds between affirmations
}

// Universal affirmations by atmosphere mode
const modeAffirmations = {
  dawn: [
    'Each breath is a new beginning',
    'You awaken to infinite possibility',
    'The light within you is rising',
    'New mercies greet this day'
  ],
  day: [
    'You are present. You are here.',
    'Clarity flows through you',
    'Your spirit is radiant',
    'You walk in light and peace'
  ],
  twilight: [
    'Release what no longer serves you',
    'Gratitude fills your heart',
    'You honor the journey',
    'Peace settles like evening light'
  ],
  night: [
    'You are held in cosmic stillness',
    'Rest in the sacred dark',
    'Stars guide you home',
    'The universe breathes with you'
  ],
  void: [
    'In silence, you are whole',
    'The void holds all potential',
    'You exist beyond thought',
    'Pure awareness is your nature'
  ]
};

export function AffirmationDisplay({ showAffirmations, interval = 20000 }: AffirmationDisplayProps) {
  const { mode, emotionalState, faithAmbiance, microState } = useAtmosphere();
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!showAffirmations) {
      setShowText(false);
      return;
    }

    // Get affirmations based on priority: micro-state > faith > emotional state > mode
    let affirmations: string[] = [];
    
    if (microState) {
      const stateConfig = getMicroState(microState);
      if (stateConfig) {
        affirmations = [stateConfig.affirmation];
      }
    } else if (faithAmbiance) {
      const faithConfig = getFaithAmbiance(faithAmbiance);
      if (faithConfig) {
        affirmations = faithConfig.affirmations;
      }
    } else if (emotionalState) {
      affirmations = getEmotionalAffirmations(emotionalState);
    } else {
      affirmations = modeAffirmations[mode];
    }

    // Show first affirmation immediately
    setCurrentAffirmation(affirmations[0]);
    setShowText(true);

    // Cycle through affirmations
    let affirmationIndex = 0;
    const affirmationTimer = setInterval(() => {
      setShowText(false);
      
      setTimeout(() => {
        affirmationIndex = (affirmationIndex + 1) % affirmations.length;
        setCurrentAffirmation(affirmations[affirmationIndex]);
        setShowText(true);
      }, 1000); // 1s fade out before next affirmation
    }, interval);

    return () => {
      clearInterval(affirmationTimer);
    };
  }, [showAffirmations, mode, emotionalState, faithAmbiance, microState, interval]);

  return (
    <AnimatePresence>
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="fixed bottom-32 left-0 right-0 flex justify-center pointer-events-none z-30"
        >
          <div className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 max-w-2xl">
            <p 
              className="text-white/80 text-center"
              style={{ 
                fontFamily: 'Raleway', 
                fontWeight: 300, 
                fontSize: '16px',
                letterSpacing: '0.03em'
              }}
            >
              {currentAffirmation}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Get affirmations based on emotional state
function getEmotionalAffirmations(emotion: string): string[] {
  const emotionalAffirmations: Record<string, string[]> = {
    peaceful: [
      'You are exactly where you need to be',
      'Peace flows through you',
      'This stillness is sacred',
      'You rest in divine presence'
    ],
    anxious: [
      'You are safe. You are held.',
      'This breath calms your spirit',
      'Anxiety passes like clouds',
      'You are stronger than this moment'
    ],
    grateful: [
      'Your heart overflows with blessing',
      'Gratitude multiplies joy',
      'You recognize the gifts around you',
      'Thankfulness is your foundation'
    ],
    seeking: [
      'The answers you seek are within',
      'Your path is unfolding perfectly',
      'Trust the journey',
      'Guidance comes in stillness'
    ],
    joyful: [
      'Your joy is a sacred gift',
      'Light radiates from your spirit',
      'Celebrate this divine moment',
      'Joy is your natural state'
    ]
  };

  return emotionalAffirmations[emotion] || modeAffirmations.day;
}