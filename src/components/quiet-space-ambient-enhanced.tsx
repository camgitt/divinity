/**
 * Quiet Space Ambient Enhanced - Complete Sanctuary Experience
 * Full implementation with radial settings, micro-states, faith ambiances, and gestures
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useAtmosphere, AtmosphereMode } from './atmosphere-context';
import { AmbientBackground, LightBeams } from './ambient-background';
import { ParticleField, StarField } from './particle-field';
import { BreathingHalo } from './breathing-halo';
import { AffirmationDisplay } from './affirmation-display';
import { EmotionalCheckIn } from './emotional-check-in';
import { RadialSettingsWheel } from './radial-settings-wheel';
import { microStates, getMicroState, MicroStateConfig } from './micro-states-config';
import { faithAmbiances, getFaithAmbiance } from './faith-ambiance-config';
import { useMeditation } from './meditation-context';
import { MeditationAudioPlayer, AMBIENT_SOUND_URLS } from './meditation-audio-player';
import { useHapticFeedback } from './hooks/use-haptic';
import { QuietSpaceTutorial, shouldShowTutorial } from './quiet-space-tutorial';
import { SessionCompleteModal } from './quiet-space-session-complete';
import { 
  saveSession, 
  savePreferences, 
  getPreferences, 
  getSessionStats,
  QuietSpaceSession 
} from './quiet-space-session-tracker';
import { 
  Play, 
  Pause, 
  X,
  ChevronUp,
  Settings as SettingsIcon,
  Volume2,
  Wind,
  Waves,
  Bird,
  CloudRain,
  Music,
  Bell as BellIcon
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Quick rhythm for alertness',
    inhale: 3,
    hold1: 0,
    exhale: 3,
    hold2: 0,
    cycles: 8
  }
];

const ambientSounds = [
  { id: 'rain', name: 'Rain', icon: CloudRain, url: AMBIENT_SOUND_URLS.rain },
  { id: 'ocean', name: 'Ocean Waves', icon: Waves, url: AMBIENT_SOUND_URLS.ocean },
  { id: 'forest', name: 'Forest', icon: Bird, url: AMBIENT_SOUND_URLS.forest },
  { id: 'wind', name: 'Wind', icon: Wind, url: AMBIENT_SOUND_URLS.wind },
  { id: 'bells', name: 'Singing Bowls', icon: BellIcon, url: AMBIENT_SOUND_URLS.bells },
  { id: 'music', name: 'Synth Pad', icon: Music, url: AMBIENT_SOUND_URLS.music }
];

interface QuietSpaceAmbientEnhancedProps {
  onBack?: () => void;
}

export function QuietSpaceAmbientEnhanced({ onBack }: QuietSpaceAmbientEnhancedProps) {
  const { mode, setMode, autoMode, setAutoMode, emotionalState, microState, setMicroState, faithAmbiance, setFaithAmbiance } = useAtmosphere();
  const { startSession, endSession } = useMeditation();
  const { triggerHaptic } = useHapticFeedback();

  // State
  const [showCheckIn, setShowCheckIn] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [showRadialSettings, setShowRadialSettings] = useState(false);
  const [showSoundscapeSelector, setShowSoundscapeSelector] = useState(false);
  const [showBreathingSelector, setShowBreathingSelector] = useState(false);
  const [showMicroStatesSelector, setShowMicroStatesSelector] = useState(false);
  const [showFaithSelector, setShowFaithSelector] = useState(false);
  const [ambientSound, setAmbientSound] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale' | 'hold' | null>(null);
  const [sessionDuration, setSessionDuration] = useState(10); // minutes

  // Tutorial and session tracking
  const [showTutorial, setShowTutorial] = useState(shouldShowTutorial());
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const sessionStartTimeRef = useRef<number | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Long press detection
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  // Swipe detection
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);

  // Get user's faith preference
  const getUserFaith = () => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return userData.faithTradition?.toLowerCase() || null;
      }
    } catch (e) {
      console.error('Failed to get faith preference:', e);
    }
    return null;
  };

  // Set faith ambiance based on user's faith on mount
  useEffect(() => {
    if (!faithAmbiance) {
      const userFaith = getUserFaith();
      if (userFaith) {
        setFaithAmbiance(userFaith);
      }
    }
  }, []);

  // Get current micro-state config
  const currentMicroState = microState ? getMicroState(microState) : null;

  // Get current faith ambiance config
  const currentFaithAmbiance = faithAmbiance ? getFaithAmbiance(faithAmbiance) : null;

  // Handle session start
  const handleStartSession = () => {
    setSessionActive(true);
    startSession({
      title: 'Quiet Space Session',
      duration: sessionDuration,
      type: 'breathing'
    });
    triggerHaptic('medium');
    sessionStartTimeRef.current = Date.now();
    sessionIdRef.current = Math.random().toString(36).substr(2, 9);
  };

  // Handle session end
  const handleEndSession = () => {
    // Save session before ending
    if (sessionIdRef.current && sessionStartTimeRef.current) {
      const sessionDurationSeconds = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);
      const session: QuietSpaceSession = {
        id: sessionIdRef.current,
        timestamp: sessionStartTimeRef.current,
        duration: Math.round(sessionDurationSeconds / 60), // Convert to minutes
        atmosphereMode: mode,
        microState: microState || undefined,
        faithAmbiance: faithAmbiance || undefined,
        breathingPattern: selectedPattern.id,
        soundscape: ambientSound || undefined,
        emotionalStateBefore: emotionalState || undefined,
        completed: true
      };
      saveSession(session);
    }
    
    setSessionActive(false);
    setBreathingActive(false);
    endSession();
    triggerHaptic('medium');
    setShowSessionComplete(true);
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
    toast.success('Breathing exercise complete');
  };

  // Long press handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      setShowRadialSettings(true);
      triggerHaptic('medium');
    }, 800); // 800ms for long press
    
    // Track swipe start
    touchStartRef.current = {
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Check for swipe up
    if (touchStartRef.current) {
      const deltaY = touchStartRef.current.y - e.changedTouches[0].clientY;
      const deltaTime = Date.now() - touchStartRef.current.time;
      
      // Swipe up detected (moved up more than 50px in less than 300ms)
      if (deltaY > 50 && deltaTime < 300) {
        cycleAtmosphereMode();
      }
    }
    
    touchStartRef.current = null;
  };

  const handleTouchCancel = () => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    touchStartRef.current = null;
  };

  // Mouse long press (for desktop testing)
  const handleMouseDown = () => {
    setIsPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      setShowRadialSettings(true);
      triggerHaptic('medium');
    }, 800);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  // Cycle through atmosphere modes
  const cycleAtmosphereMode = () => {
    const modes: AtmosphereMode[] = ['dawn', 'day', 'twilight', 'night', 'void'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
    setAutoMode(false);
    triggerHaptic('light');
    toast.success(getModeDisplayName(modes[nextIndex]), { duration: 1500 });
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

  // Apply micro-state
  const applyMicroState = (stateConfig: MicroStateConfig) => {
    setMicroState(stateConfig.id);
    if (stateConfig.atmosphereOverride) {
      setMode(stateConfig.atmosphereOverride);
      setAutoMode(false);
    }
    // Auto-select matching soundscape
    const soundMatch = ambientSounds.find(s => s.id === stateConfig.soundscape);
    if (soundMatch) {
      setAmbientSound(soundMatch.id);
    }
    // Auto-select matching breathing pattern
    const breathMatch = breathingPatterns.find(p => p.id === stateConfig.breathPattern);
    if (breathMatch) {
      setSelectedPattern(breathMatch);
    }
    toast.success(`${stateConfig.name} activated`, { duration: 2000 });
    triggerHaptic('medium');
  };

  // Determine particle pattern
  const getParticlePattern = () => {
    if (currentFaithAmbiance) return currentFaithAmbiance.particlePattern;
    if (currentMicroState) return currentMicroState.particlePattern;
    return 'default';
  };

  // Determine particle color
  const getParticleColor = () => {
    if (currentFaithAmbiance) return currentFaithAmbiance.particleColor;
    if (currentMicroState) return currentMicroState.particleColor;
    return undefined;
  };

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Emotional Check-In Modal */}
      <AnimatePresence>
        {showCheckIn && !sessionActive && (
          <EmotionalCheckIn
            onComplete={() => setShowCheckIn(false)}
            onSkip={() => setShowCheckIn(false)}
          />
        )}
      </AnimatePresence>

      {/* Ambient Background with micro-state override */}
      <div className="fixed inset-0">
        {currentMicroState ? (
          <div
            className="absolute inset-0"
            style={{ background: currentMicroState.gradient }}
          />
        ) : (
          <AmbientBackground breathPhase={breathPhase} />
        )}

        {/* Faith Ambiance Overlay */}
        {currentFaithAmbiance && (
          <div
            className="absolute inset-0"
            style={{ background: currentFaithAmbiance.gradientOverlay }}
          />
        )}

        {/* Particle Field */}
        {mode === 'night' || mode === 'void' ? (
          <StarField count={mode === 'void' ? 50 : 100} />
        ) : (
          <ParticleField 
            breathPhase={breathPhase} 
            pattern={getParticlePattern()}
            color={getParticleColor()}
          />
        )}

        {/* Light Beams */}
        {(mode === 'dawn' || currentFaithAmbiance?.particlePattern === 'beams') && (
          <LightBeams count={6} mode="vertical" />
        )}

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

            {/* Mode/State Indicator */}
            <motion.div
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span 
                className="text-white/70 text-sm"
                style={{ fontFamily: 'Raleway', fontWeight: 300 }}
              >
                {currentMicroState ? currentMicroState.name : getModeDisplayName(mode)}
              </span>
            </motion.div>

            {/* Settings Hint */}
            <motion.div
              animate={{ opacity: isPressing ? 0.5 : 1 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <SettingsIcon size={20} className="text-white/80" />
            </motion.div>
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
                  {currentMicroState ? currentMicroState.name : 'Your Sacred Space'}
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
                  {currentMicroState ? currentMicroState.description : 'A sanctuary of stillness, breath, and peace'}
                </p>

                {/* Start Breathing Button */}
                <motion.button
                  onClick={handleStartBreathing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] text-white shadow-lg mb-4"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <div className="flex items-center gap-2">
                    <Wind size={20} />
                    Begin Breathing
                  </div>
                </motion.button>

                {/* Micro States Quick Access */}
                <button
                  onClick={() => setShowMicroStatesSelector(true)}
                  className="text-white/50 hover:text-white/70 text-sm transition-colors"
                  style={{ fontFamily: 'Poppins', fontWeight: 300 }}
                >
                  Choose an Experience
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Controls */}
          {sessionActive && (
            <div className="p-6 flex flex-col items-center gap-4">
              {/* Ambient Sound Player */}
              {ambientSound && (
                <div className="w-full max-w-sm">
                  <MeditationAudioPlayer
                    url={ambientSounds.find(s => s.id === ambientSound)?.url || ''}
                    autoPlay={true}
                    onEnded={() => setAmbientSound(null)}
                  />
                </div>
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

          {/* Swipe Up Indicator */}
          {!sessionActive && !showRadialSettings && (
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
                Swipe up to change • Long press for settings
              </p>
            </motion.div>
          )}
        </div>

        {/* Affirmation Display */}
        <AffirmationDisplay showAffirmations={sessionActive} />

        {/* Radial Settings Wheel */}
        <RadialSettingsWheel
          isOpen={showRadialSettings}
          onClose={() => setShowRadialSettings(false)}
          onSelectSoundscape={() => setShowSoundscapeSelector(true)}
          onSelectBreathing={() => setShowBreathingSelector(true)}
          onSelectTheme={() => cycleAtmosphereMode()}
          onSelectDuration={() => toast.info('Duration: 10 minutes')}
          onSelectMode={() => setShowMicroStatesSelector(true)}
          onSelectFaith={() => setShowFaithSelector(true)}
        />

        {/* Soundscape Selector Modal */}
        <AnimatePresence>
          {showSoundscapeSelector && (
            <SoundscapeSelector
              onClose={() => setShowSoundscapeSelector(false)}
              onSelect={(soundId) => {
                setAmbientSound(soundId);
                setShowSoundscapeSelector(false);
              }}
              currentSound={ambientSound}
            />
          )}
        </AnimatePresence>

        {/* Breathing Pattern Selector Modal */}
        <AnimatePresence>
          {showBreathingSelector && (
            <BreathingSelector
              onClose={() => setShowBreathingSelector(false)}
              onSelect={(pattern) => {
                setSelectedPattern(pattern);
                setShowBreathingSelector(false);
              }}
              currentPattern={selectedPattern}
            />
          )}
        </AnimatePresence>

        {/* Micro States Selector Modal */}
        <AnimatePresence>
          {showMicroStatesSelector && (
            <MicroStatesSelector
              onClose={() => setShowMicroStatesSelector(false)}
              onSelect={(stateConfig) => {
                applyMicroState(stateConfig);
                setShowMicroStatesSelector(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* Faith Ambiance Selector Modal */}
        <AnimatePresence>
          {showFaithSelector && (
            <FaithSelector
              onClose={() => setShowFaithSelector(false)}
              onSelect={(faithId) => {
                setFaithAmbiance(faithId);
                setShowFaithSelector(false);
                toast.success(`${getFaithAmbiance(faithId)?.name} activated`);
              }}
              currentFaith={faithAmbiance}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <QuietSpaceTutorial
            onClose={() => setShowTutorial(false)}
          />
        )}
      </AnimatePresence>

      {/* Session Complete Modal */}
      <AnimatePresence>
        {showSessionComplete && (
          <SessionCompleteModal
            onClose={() => setShowSessionComplete(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Soundscape Selector Component
function SoundscapeSelector({ onClose, onSelect, currentSound }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-6 max-w-sm w-full border border-white/10"
      >
        <h3 className="text-white/90 mb-4 text-center" style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '20px' }}>
          Ambient Soundscape
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {ambientSounds.map((sound) => {
            const Icon = sound.icon;
            return (
              <button
                key={sound.id}
                onClick={() => onSelect(sound.id)}
                className={`p-4 rounded-xl border transition-all ${
                  currentSound === sound.id 
                    ? 'bg-white/20 border-white/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon size={24} className="text-white/70 mx-auto mb-2" />
                <span className="text-white/70 text-sm" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
                  {sound.name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Breathing Pattern Selector Component
function BreathingSelector({ onClose, onSelect, currentPattern }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-6 max-w-md w-full border border-white/10"
      >
        <h3 className="text-white/90 mb-4 text-center" style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '20px' }}>
          Breathing Pattern
        </h3>
        <div className="space-y-2">
          {breathingPatterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => onSelect(pattern)}
              className={`w-full p-4 rounded-xl border transition-all text-left ${
                currentPattern.id === pattern.id 
                  ? 'bg-white/20 border-white/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="text-white/80 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                {pattern.name}
              </div>
              <div className="text-white/50 text-sm" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
                {pattern.description}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Micro States Selector Component
function MicroStatesSelector({ onClose, onSelect }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-6 max-w-md w-full border border-white/10 max-h-[80vh] overflow-y-auto"
      >
        <h3 className="text-white/90 mb-4 text-center" style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '20px' }}>
          Choose Your Experience
        </h3>
        <div className="space-y-3">
          {microStates.map((state) => (
            <button
              key={state.id}
              onClick={() => onSelect(state)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), transparent), ${state.gradient}` }}
            >
              <div className="text-white/90 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                {state.name}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
                {state.description}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Faith Ambiance Selector Component
function FaithSelector({ onClose, onSelect, currentFaith }: any) {
  const faithOptions = Object.values(faithAmbiances);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-6 max-w-md w-full border border-white/10 max-h-[80vh] overflow-y-auto"
      >
        <h3 className="text-white/90 mb-4 text-center" style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '20px' }}>
          Sacred Ambiance
        </h3>
        <div className="space-y-2">
          {faithOptions.map((faith) => (
            <button
              key={faith.id}
              onClick={() => onSelect(faith.id)}
              className={`w-full p-4 rounded-xl border transition-all text-left ${
                currentFaith === faith.id 
                  ? 'bg-white/20 border-white/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="text-white/80 mb-1" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                {faith.name}
              </div>
              <div className="text-white/50 text-sm" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
                {faith.description}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}