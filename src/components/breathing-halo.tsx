/**
 * Breathing Halo Component
 * Animated breathing circle with glow that syncs to breath cycles
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAtmosphere, getAtmosphereGlow } from './atmosphere-context';
import { useHapticFeedback } from './hooks/use-haptic';

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  cycles: number;
}

interface BreathingHaloProps {
  pattern: BreathingPattern;
  isActive: boolean;
  onCycleComplete?: () => void;
  showGuidance?: boolean;
}

type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export function BreathingHalo({ 
  pattern, 
  isActive, 
  onCycleComplete,
  showGuidance = true 
}: BreathingHaloProps) {
  const { mode } = useAtmosphere();
  const { triggerHaptic } = useHapticFeedback();
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(pattern.inhale);

  const glowColor = getAtmosphereGlow(mode);

  // Breath cycle management
  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setCurrentCycle(0);
      setTimeRemaining(pattern.inhale);
      return;
    }

    let phaseTimer: NodeJS.Timeout;
    let countdownTimer: NodeJS.Timeout;

    const startPhase = (newPhase: BreathPhase, duration: number) => {
      setPhase(newPhase);
      setTimeRemaining(duration);

      // Haptic feedback on phase change
      if (newPhase === 'inhale' || newPhase === 'exhale') {
        triggerHaptic('light');
      }

      // Countdown
      let remaining = duration;
      countdownTimer = setInterval(() => {
        remaining -= 1;
        setTimeRemaining(remaining);
      }, 1000);

      // Move to next phase
      phaseTimer = setTimeout(() => {
        clearInterval(countdownTimer);
        
        if (newPhase === 'inhale') {
          if (pattern.hold1 > 0) {
            startPhase('hold1', pattern.hold1);
          } else {
            startPhase('exhale', pattern.exhale);
          }
        } else if (newPhase === 'hold1') {
          startPhase('exhale', pattern.exhale);
        } else if (newPhase === 'exhale') {
          if (pattern.hold2 > 0) {
            startPhase('hold2', pattern.hold2);
          } else {
            // Complete cycle
            completeCycle();
          }
        } else if (newPhase === 'hold2') {
          // Complete cycle
          completeCycle();
        }
      }, duration * 1000);
    };

    const completeCycle = () => {
      const nextCycle = currentCycle + 1;
      setCurrentCycle(nextCycle);

      if (nextCycle >= pattern.cycles) {
        // All cycles complete
        onCycleComplete?.();
      } else {
        // Start next cycle
        startPhase('inhale', pattern.inhale);
      }
    };

    // Start first phase
    startPhase('inhale', pattern.inhale);

    return () => {
      clearTimeout(phaseTimer);
      clearInterval(countdownTimer);
    };
  }, [isActive, pattern, currentCycle]);

  // Get animation values based on phase
  const getHaloScale = () => {
    if (phase === 'inhale') return 3;
    if (phase === 'exhale') return 1;
    return 2; // hold
  };

  const getHaloOpacity = () => {
    if (phase === 'inhale') return 0.9;
    if (phase === 'exhale') return 0.4;
    return 0.7; // hold
  };

  const getPhaseDuration = () => {
    if (phase === 'inhale') return pattern.inhale;
    if (phase === 'hold1') return pattern.hold1;
    if (phase === 'exhale') return pattern.exhale;
    return pattern.hold2;
  };

  const getPhaseLabel = () => {
    if (phase === 'inhale') return 'Breathe In';
    if (phase === 'exhale') return 'Breathe Out';
    return 'Hold';
  };

  if (!isActive) return null;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Breathing Halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '60px',
          height: '60px',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          boxShadow: `0 0 60px 20px ${glowColor}`,
        }}
        animate={{
          scale: getHaloScale(),
          opacity: getHaloOpacity(),
        }}
        transition={{
          duration: getPhaseDuration(),
          ease: 'easeInOut',
        }}
      />

      {/* Center circle with countdown */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          animate={{
            scale: phase === 'inhale' ? 1.1 : phase === 'exhale' ? 0.9 : 1,
          }}
          transition={{
            duration: getPhaseDuration(),
            ease: 'easeInOut',
          }}
        >
          <div className="text-center">
            <div className="text-3xl text-white/90" style={{ fontFamily: 'Raleway', fontWeight: 300 }}>
              {timeRemaining}
            </div>
          </div>
        </motion.div>

        {/* Phase guidance text */}
        <AnimatePresence mode="wait">
          {showGuidance && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-16 text-center"
            >
              <p 
                className="text-white/70" 
                style={{ 
                  fontFamily: 'Raleway', 
                  fontWeight: 300,
                  fontSize: '16px',
                  letterSpacing: '0.05em'
                }}
              >
                {getPhaseLabel()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cycle counter */}
      <div className="absolute top-8 text-white/50" style={{ fontFamily: 'Raleway', fontWeight: 300 }}>
        Cycle {currentCycle + 1} of {pattern.cycles}
      </div>
    </div>
  );
}
