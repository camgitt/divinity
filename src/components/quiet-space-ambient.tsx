/**
 * Quiet Space Ambient - Enhanced Sanctuary Experience
 * A serene, adaptive sanctuary for meditation, breath work, and spiritual reflection
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useAtmosphere, AtmosphereMode } from './atmosphere-context';
import { AmbientBackground, LightBeams } from './ambient-background';
import { ParticleField, StarField } from './particle-field';
import { BreathingHalo } from './breathing-halo';
import { AffirmationDisplay } from './affirmation-display';
import { EmotionalCheckIn } from './emotional-check-in';
import { useMeditation } from './meditation-context';
import { MeditationAudioPlayer, AMBIENT_SOUND_URLS } from './meditation-audio-player';
import { useHapticFeedback } from './hooks/use-haptic';
import { 
  Play, 
  Pause, 
  X,
  ChevronUp,
  Settings as SettingsIcon,
  Volume2,
  Wind
} from 'lucide-react';

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

const breathingPatterns: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal parts inhale, hold, exhale, hold',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 4
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Natural tranquilizer for the nervous system',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 4
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Extended exhale for relaxation',
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 2,
    cycles: 5
  },
  {
    id: 'resonance',
    name: 'Resonance Breathing',
    description: 'Optimal breathing for heart coherence',
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    cycles: 6
  }
];

interface QuietSpaceAmbientProps {
  onBack?: () => void;
}

export function QuietSpaceAmbient({ onBack }: QuietSpaceAmbientProps) {
  const { mode, setMode, autoMode, setAutoMode, emotionalState } = useAtmosphere();
  const { startSession, endSession, pauseSession, resumeSession } = useMeditation();
  const { triggerHaptic } = useHapticFeedback();

  // State
  const [showCheckIn, setShowCheckIn] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ambientSound, setAmbientSound] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale' | 'hold' | null>(null);

  // Handle session start
  const handleStartSession = () => {
    setSessionActive(true);
    startSession({
      title: 'Quiet Space Session',
      duration: 10,
      type: 'breathing'
    });
    triggerHaptic('medium');
  };

  // Handle session end
  const handleEndSession = () => {
    setSessionActive(false);
    setBreathingActive(false);
    endSession();
    triggerHaptic('medium');
  };

  // Handle breathing start
  const handleStartBreathing = () => {
    setBreathingActive(true);
    if (!sessionActive) {
      handleStartSession();
    }
    triggerHaptic('light');
  };

  // Handle breathing complete
  const handleBreathingComplete = () => {
    setBreathingActive(false);
    triggerHaptic('success');
  };

  // Cycle through atmosphere modes
  const cycleAtmosphereMode = () => {
    const modes: AtmosphereMode[] = ['dawn', 'day', 'twilight', 'night', 'void'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
    setAutoMode(false);
    triggerHaptic('light');
  };

  // Get mode display name
  const getModeDisplayName = (m: AtmosphereMode) => {
    const names = {
      dawn: 'Dawn',
      day: 'Daylight',
      twilight: 'Twilight',
      night: 'Night Sanctuary',
      void: 'Void Silence'
    };
    return names[m];
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Emotional Check-In Modal */}
      <AnimatePresence>
        {showCheckIn && !sessionActive && (
          <EmotionalCheckIn
            onComplete={() => setShowCheckIn(false)}
            onSkip={() => setShowCheckIn(false)}
          />
        )}
      </AnimatePresence>

      {/* Ambient Background */}
      <AmbientBackground breathPhase={breathPhase}>
        {/* Particle Field */}
        {mode === 'night' || mode === 'void' ? (
          <StarField count={mode === 'void' ? 50 : 100} />
        ) : (
          <ParticleField breathPhase={breathPhase} />
        )}

        {/* Light Beams (for dawn mode) */}
        {mode === 'dawn' && <LightBeams count={6} mode="vertical" />}

        {/* Main Content */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6">
            {/* Back Button */}
            {onBack && (
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <X size={20} className="text-white/80" />
              </motion.button>
            )}

            {/* Mode Indicator */}
            <motion.button
              onClick={() => setShowModeSelector(!showModeSelector)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span 
                className="text-white/70 text-sm"
                style={{ fontFamily: 'Raleway', fontWeight: 300 }}
              >
                {getModeDisplayName(mode)}
              </span>
            </motion.button>

            {/* Settings Button */}
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <SettingsIcon size={20} className="text-white/80" />
            </motion.button>
          </div>

          {/* Center - Breathing Halo or Welcome */}
          <div className="flex-1 flex items-center justify-center">
            {breathingActive ? (
              <BreathingHalo
                pattern={selectedPattern}
                isActive={breathingActive}
                onCycleComplete={handleBreathingComplete}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center px-6"
              >
                <h1 
                  className="text-white/90 mb-4"
                  style={{ 
                    fontFamily: 'Raleway', 
                    fontWeight: 300, 
                    fontSize: '36px',
                    letterSpacing: '0.05em'
                  }}
                >
                  Your Sacred Space
                </h1>
                <p 
                  className="text-white/60 mb-8 max-w-md mx-auto"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontWeight: 300, 
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}
                >
                  A sanctuary of stillness, breath, and peace
                </p>

                {/* Start Breathing Button */}
                <motion.button
                  onClick={handleStartBreathing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] text-white shadow-lg"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <div className="flex items-center gap-2">
                    <Wind size={20} />
                    Begin Breathing
                  </div>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Bottom Controls */}
          {sessionActive && (
            <div className="p-6 flex flex-col items-center gap-4">
              {/* Ambient Sound Toggle */}
              {ambientSound ? (
                <MeditationAudioPlayer
                  url={AMBIENT_SOUND_URLS[ambientSound as keyof typeof AMBIENT_SOUND_URLS]}
                  autoPlay={true}
                  onEnded={() => setAmbientSound(null)}
                />
              ) : (
                <motion.button
                  onClick={() => setAmbientSound('ocean')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex items-center gap-2 text-white/70">
                    <Volume2 size={18} />
                    <span style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}>
                      Add Ambient Sound
                    </span>
                  </div>
                </motion.button>
              )}

              {/* End Session Button */}
              <motion.button
                onClick={handleEndSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70"
                style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
              >
                End Session
              </motion.button>
            </div>
          )}

          {/* Swipe Up Indicator (when not in session) */}
          {!sessionActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="pb-8 flex flex-col items-center"
            >
              <ChevronUp size={24} className="text-white/40 animate-bounce" />
              <p 
                className="text-white/40 text-xs mt-2"
                style={{ fontFamily: 'Raleway', fontWeight: 300 }}
              >
                Swipe up to change atmosphere
              </p>
            </motion.div>
          )}
        </div>

        {/* Affirmation Display */}
        <AffirmationDisplay showAffirmations={sessionActive} />

        {/* Mode Selector Modal */}
        <AnimatePresence>
          {showModeSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center px-6"
              onClick={() => setShowModeSelector(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-6 max-w-sm w-full border border-white/10"
              >
                <h3 
                  className="text-white/90 mb-4 text-center"
                  style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '20px' }}
                >
                  Atmosphere
                </h3>

                <div className="space-y-2">
                  {(['dawn', 'day', 'twilight', 'night', 'void'] as AtmosphereMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setAutoMode(false);
                        setShowModeSelector(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl border transition-all ${
                        mode === m 
                          ? 'bg-white/20 border-white/30' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span 
                        className="text-white/80"
                        style={{ fontFamily: 'Poppins', fontWeight: 300 }}
                      >
                        {getModeDisplayName(m)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AmbientBackground>
    </div>
  );
}
