import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { useMeditation, MeditationSession } from "./meditation-context";
import { MeditationLibrary } from "./meditation-library";
import { MeditationAudioPlayer } from "./meditation-audio-player";
import { MeditationReminderSystem } from "./meditation-reminder-system";
import { AppFooter } from "./app-footer";
import { useAmbientSound } from "../contexts/ambient-sound-context";
import { useMeditationAmbient } from "./hooks/use-meditation-ambient";
import { AMBIENT_SOUNDS } from "./ambient-sound-grid";
import meditationGroupImage from "figma:asset/14a049346d5ae8a42a12b308f26af3521f4028ac.png";
import { 
  Play, 
  Pause,
  Square,
  Volume2,
  VolumeX,
  Clock,
  TrendingUp,
  Flame,
  Award,
  ChevronRight,
  Library,
  Target,
  BarChart3,
  Settings,
  Wind
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useHapticFeedback } from "./hooks/use-haptic";

interface EnhancedQuietSpaceProps {
  onNavigate?: (tab: string) => void;
  onOpenMission?: () => void;
}

// Breathing exercise patterns
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

export function EnhancedQuietSpace({ onNavigate, onOpenMission }: EnhancedQuietSpaceProps) {
  const {
    activeSession,
    isPlaying,
    currentTime,
    stats,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    endSession,
    getStreakInfo
  } = useMeditation();
  
  const { selectedSound, selectSound, togglePlayPause, isPlaying: ambientIsPlaying } = useAmbientSound();
  const haptic = useHapticFeedback();

  // Auto-play ambient sound when meditation session starts
  useMeditationAmbient();

  const [view, setView] = useState<'home' | 'library' | 'breathing' | 'player' | 'reminders'>('home');
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  
  // Breathing exercise state
  const [breathingPattern, setBreathingPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingCycle, setBreathingCycle] = useState(0);

  const streakInfo = getStreakInfo();

  // Breathing exercise timer
  useEffect(() => {
    if (!breathingActive) return;

    const phasedurations = {
      inhale: breathingPattern.inhale,
      hold1: breathingPattern.hold1,
      exhale: breathingPattern.exhale,
      hold2: breathingPattern.hold2
    };

    const currentPhaseDuration = phasedurations[breathingPhase];
    
    if (breathingCount >= currentPhaseDuration) {
      // Move to next phase
      const phases: Array<'inhale' | 'hold1' | 'exhale' | 'hold2'> = ['inhale', 'hold1', 'exhale', 'hold2'];
      const currentIndex = phases.indexOf(breathingPhase);
      const nextIndex = (currentIndex + 1) % 4;
      
      // Check if we completed a full cycle
      if (nextIndex === 0) {
        const nextCycle = breathingCycle + 1;
        if (nextCycle >= breathingPattern.cycles) {
          // Completed all cycles
          setBreathingActive(false);
          setBreathingCycle(0);
          setBreathingCount(0);
          setBreathingPhase('inhale');
          toast.success('Breathing exercise completed!', {
            description: `Completed ${breathingPattern.cycles} cycles`
          });
          return;
        }
        setBreathingCycle(nextCycle);
      }
      
      setBreathingPhase(phases[nextIndex]);
      setBreathingCount(0);
    } else {
      const timer = setTimeout(() => {
        setBreathingCount(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [breathingActive, breathingCount, breathingPhase, breathingCycle, breathingPattern]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    if (!activeSession) return 0;
    return (currentTime / activeSession.duration) * 100;
  };

  // Handle session start from library
  const handleStartSession = (session: MeditationSession) => {
    startSession(session);
    setView('player');
  };

  // Breathing phase instructions
  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold1':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'hold2':
        return 'Hold';
    }
  };

  // Breathing circle animation
  const getBreathingCircleScale = () => {
    const phaseProgress = breathingCount / (breathingPattern[breathingPhase] || 1);
    
    switch (breathingPhase) {
      case 'inhale':
        return 1 + (phaseProgress * 0.5); // Expand
      case 'hold1':
        return 1.5; // Stay large
      case 'exhale':
        return 1.5 - (phaseProgress * 0.5); // Contract
      case 'hold2':
        return 1; // Stay small
    }
  };

  // Render Home View
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-white text-gray-900 pb-24">
        {/* Hero Section with Background Image */}
        <div className="relative px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 text-center overflow-hidden">
          {/* Background Image - positioned at top */}
          <div 
            className="absolute top-0 left-0 right-0 h-[300px] sm:h-[400px] bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${meditationGroupImage})` }}
          />
          
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <h1 
              className="text-[40px] sm:text-[48px] md:text-[56px] mb-4 sm:mb-6 bg-gradient-to-r from-[#497EBC] via-[#7FB8E5] to-[#497EBC] bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: '1.2' }}
            >
              Quiet Space
            </h1>
            <p 
              className="text-gray-600 max-w-md mx-auto text-[16px] sm:text-[18px] px-4"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
            >
              Find peace through meditation, breathing, and mindfulness
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100/60 border-orange-200/50 p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>{streakInfo.current}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Raleway', sans-serif" }}>Day Streak</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200/50 p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD369] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>{stats.totalMinutes}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Raleway', sans-serif" }}>Minutes</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-green-100/60 border-green-200/50 p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>{stats.totalSessions}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Raleway', sans-serif" }}>Sessions</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100/60 border-blue-200/50 p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>{streakInfo.longest}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Raleway', sans-serif" }}>Best Streak</div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 sm:px-6 mb-16 sm:mb-24">
          <h2 
            className="text-[24px] sm:text-[28px] mb-6 text-center text-gray-900" 
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            Begin Your Practice
          </h2>
          <div className="grid gap-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card 
                className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                onClick={() => setView('meditation')}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwemVuJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzY0Njk1MzYwfDA&ixlib=rb-4.1.0&q=80&w=1080)` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b69e60]/90 via-[#a88e56]/85 to-[#8f7744]/90" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-40 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Library className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1 text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Guided Meditations</h4>
                      <p className="text-white/80 text-[13px] leading-tight" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                        17 sessions available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card 
                className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                onClick={() => setView('breathing')}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1508193638397-1c4234db14d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzYzMjI1MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080)` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#A7D7E8]/90 via-[#8BC8DC]/85 to-[#6FB9D0]/90" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-40 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Wind className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1 text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Breathing Exercises</h4>
                      <p className="text-white/80 text-[13px] leading-tight" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                        4 techniques available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card 
                className="relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0"
                onClick={() => setView('reminders')}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1535117156854-d5c5243361a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBncm93dGglMjBsaWdodHxlbnwxfHx8fDE3NjQ2OTUzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080)` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#497EBC]/90 via-[#5A8CC7]/85 to-[#3A6B9E]/90" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-40 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Settings className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1 text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Meditation Reminders</h4>
                      <p className="text-white/80 text-[13px] leading-tight" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}>
                        Set daily notifications
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Ambient Sounds */}
        <div className="px-6 mb-8">
          <h2 className="text-2xl mb-6 text-center text-white">Ambient Sounds</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {AMBIENT_SOUNDS.map((sound, index) => {
              const SoundIcon = sound.icon;
              const isActive = selectedSound === sound.id;
              
              return (
                <motion.div
                  key={sound.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <button
                    onClick={() => {
                      selectSound(isActive ? null : sound.id);
                      toast.success(isActive ? 'Sound stopped' : `Playing: ${sound.name}`);
                    }}
                    className={`relative w-full h-28 rounded-lg overflow-hidden flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${
                      isActive
                        ? 'border-[#497EBC] shadow-lg shadow-[#497EBC]/30 scale-105'
                        : 'border-[#1E3A5F]/60 hover:border-[#497EBC]/50 hover:scale-102'
                    }`}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${sound.image})` }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-t from-[#497EBC]/90 via-[#497EBC]/70 to-transparent'
                        : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent'
                    }`} />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                      <SoundIcon className={`w-6 h-6 ${isActive ? sound.color : 'text-white'} drop-shadow-lg`} />
                      <span className="text-sm text-white drop-shadow-md">{sound.name}</span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Audio Player */}
          {selectedSound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <MeditationAudioPlayer
                tracks={AMBIENT_SOUNDS}
                selectedTrackId={selectedSound}
                onTrackSelect={selectSound}
                volume={ambientVolume}
                onVolumeChange={setAmbientVolume}
                isMuted={isMuted}
                onMuteToggle={() => setIsMuted(!isMuted)}
              />
            </motion.div>
          )}
        </div>

        <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />
      </div>
    );
  }

  // Render Library View
  if (view === 'library') {
    return (
      <MeditationLibrary
        onStartSession={handleStartSession}
        onBack={() => setView('home')}
      />
    );
  }

  // Render Reminders View
  if (view === 'reminders') {
    return (
      <div className="min-h-screen bg-[#0B1426] text-white pb-24">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => setView('home')}
            className="mb-6 text-slate-400 hover:text-white"
          >
            ← Back
          </Button>

          <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
            Meditation Reminders
          </h1>
          <p className="text-slate-300 text-center mb-8">
            Build a consistent meditation practice with daily reminders
          </p>

          <MeditationReminderSystem />
        </div>
      </div>
    );
  }

  // Render Breathing Exercise View
  if (view === 'breathing') {
    return (
      <div className="min-h-screen bg-[#0B1426] text-white pb-24">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => setView('home')}
            className="mb-6 text-slate-400 hover:text-white"
          >
            ← Back
          </Button>

          <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-white via-[#FFD369] to-white bg-clip-text text-transparent">
            Breathing Exercises
          </h1>
          <p className="text-slate-300 text-center mb-8">
            Regulate your nervous system through mindful breathing
          </p>

          {!breathingActive ? (
            <>
              {/* Pattern Selection */}
              <div className="space-y-4 mb-8">
                {breathingPatterns.map((pattern) => (
                  <Card
                    key={pattern.id}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      breathingPattern.id === pattern.id
                        ? 'bg-[#497EBC]/20 border-[#497EBC]'
                        : 'bg-[#162844]/60 border-[#b69e60]/30 hover:border-[#497EBC]/50'
                    }`}
                    onClick={() => setBreathingPattern(pattern)}
                  >
                    <h3 className="text-lg text-white mb-2">{pattern.name}</h3>
                    <p className="text-slate-300 text-sm mb-3">{pattern.description}</p>
                    <div className="flex gap-2 text-xs text-slate-400">
                      <span>Inhale: {pattern.inhale}s</span>
                      {pattern.hold1 > 0 && <span>• Hold: {pattern.hold1}s</span>}
                      <span>• Exhale: {pattern.exhale}s</span>
                      {pattern.hold2 > 0 && <span>• Hold: {pattern.hold2}s</span>}
                      <span>• {pattern.cycles} cycles</span>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                onClick={() => {
                  setBreathingActive(true);
                  setBreathingCycle(0);
                  setBreathingCount(0);
                  setBreathingPhase('inhale');
                }}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 h-14 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Exercise
              </Button>
            </>
          ) : (
            <>
              {/* Breathing Animation */}
              <div className="relative h-[400px] flex items-center justify-center mb-8">
                <motion.div
                  className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-4 border-cyan-400/50 flex items-center justify-center"
                  animate={{
                    scale: getBreathingCircleScale()
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl text-white mb-2">{getBreathingInstruction()}</div>
                    <div className="text-6xl text-cyan-300 font-mono">
                      {breathingPattern[breathingPhase] - breathingCount}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Cycle {breathingCycle + 1} of {breathingPattern.cycles}</span>
                  <span>{breathingPattern.name}</span>
                </div>
                <Progress value={((breathingCycle + 1) / breathingPattern.cycles) * 100} className="h-2" />
              </div>

              <Button
                onClick={() => {
                  setBreathingActive(false);
                  setBreathingCycle(0);
                  setBreathingCount(0);
                  setBreathingPhase('inhale');
                }}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 h-14"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop Exercise
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Render Player View
  if (view === 'player' && activeSession) {
    return (
      <div className="min-h-screen bg-[#0B1426] text-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Session Info */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl mb-2 text-white">{activeSession.title}</h1>
            <p className="text-slate-300 mb-4">{activeSession.description}</p>
            {activeSession.instructor && (
              <p className="text-slate-400 text-sm">Guided by {activeSession.instructor}</p>
            )}
          </motion.div>

          {/* Timer Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-80 h-80 mb-12"
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="rgba(122, 79, 255, 0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - getProgress() / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#497EBC" />
                  <stop offset="100%" stopColor="#b69e60" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl text-white mb-2 font-mono">
                  {formatTime(activeSession.duration - currentTime)}
                </div>
                <div className="text-slate-400">remaining</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={isPlaying ? pauseSession : resumeSession}
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-[#497EBC] to-[#b69e60] hover:opacity-90"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button
              onClick={() => {
                endSession();
                setView('home');
                toast.info('Meditation ended');
              }}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <Square className="w-6 h-6" />
            </Button>
          </div>

          {/* Ambient Sound Control */}
          {selectedSound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <Volume2 className="w-5 h-5 text-[#497EBC]" />
              <div className="flex-1">
                <div className="text-sm text-white mb-1">
                  {selectedSound.name} {ambientIsPlaying ? 'playing' : 'paused'}
                </div>
                <div className="text-xs text-slate-400">
                  Ambient background sound
                </div>
              </div>
              <Button
                onClick={() => {
                  togglePlayPause();
                  toast.success(ambientIsPlaying ? 'Ambient sound stopped' : 'Ambient sound playing');
                }}
                size="sm"
                variant="outline"
                className={ambientIsPlaying 
                  ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                  : "border-green-500/50 text-green-400 hover:bg-green-500/10"
                }
              >
                {ambientIsPlaying ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-1" />
                    Stop Sound
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Play Sound
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return null;
}