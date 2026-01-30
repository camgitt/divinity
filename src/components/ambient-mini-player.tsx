import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronUp, X } from 'lucide-react';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { WaveformVisualizer } from './ambient-waveform-visualizer';
import { useHapticFeedback } from './hooks/use-haptic';

interface AmbientMiniPlayerProps {
  className?: string;
}

export function AmbientMiniPlayer({ className = '' }: AmbientMiniPlayerProps) {
  const {
    selectedSound,
    isPlaying,
    analyserNode,
    togglePlayPause,
    selectSound,
    setShowMixer,
    setViewMode
  } = useAmbientSound();
  
  const haptic = useHapticFeedback();

  if (!selectedSound) return null;

  const SoundIcon = selectedSound.icon;

  const handlePlayPause = () => {
    haptic?.lightTap();
    togglePlayPause();
  };

  const handleOpenMixer = () => {
    haptic?.lightTap();
    setShowMixer(true);
  };

  const handleClose = () => {
    haptic?.lightTap();
    selectSound(null);
  };

  const handleExpand = () => {
    haptic?.lightTap();
    setViewMode('grid');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
        style={{
          background: `linear-gradient(to right, ${selectedSound.color}15, rgba(15,23,42,0.98), ${selectedSound.color}15)`,
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${selectedSound.color}40`,
          boxShadow: `0 -4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
        }}
      >
        {/* Ambient Glow Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: selectedSound.color }}
          animate={{
            opacity: isPlaying ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0
          }}
        />

        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Left: Icon + Waveform + Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Waveform + Icon Container */}
            <div className="relative flex-shrink-0">
              {/* Waveform Visualizer */}
              <div className="absolute inset-0 -m-1">
                <WaveformVisualizer
                  analyserNode={analyserNode}
                  isPlaying={isPlaying}
                  size={56}
                  color={selectedSound.color}
                  lineWidth={1.5}
                />
              </div>

              {/* Icon */}
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${selectedSound.color}30, rgba(15,23,42,0.8))`,
                  border: `1px solid ${selectedSound.color}40`,
                  boxShadow: isPlaying ? `0 0 16px ${selectedSound.color}60` : 'none'
                }}
              >
                <SoundIcon 
                  className="w-5 h-5"
                  style={{ 
                    color: selectedSound.color,
                    filter: `drop-shadow(0 0 6px ${selectedSound.color})`,
                    strokeWidth: 1.5
                  }}
                />
              </div>
            </div>

            {/* Sound Info */}
            <button 
              onClick={handleExpand}
              className="flex flex-col min-w-0 text-left group"
            >
              <p 
                className="text-sm font-semibold text-white truncate group-hover:text-white/80 transition-colors"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {selectedSound.name}
              </p>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: selectedSound.color }}
                  animate={{ 
                    opacity: isPlaying ? [1, 0.3, 1] : 0.5,
                    scale: isPlaying ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span 
                  className="text-xs tracking-wide"
                  style={{ 
                    color: isPlaying ? selectedSound.color : '#94A3B8',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 500
                  }}
                >
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${selectedSound.color}, ${selectedSound.color}CC)`,
              boxShadow: isPlaying 
                ? `0 4px 16px ${selectedSound.color}60, 0 0 24px ${selectedSound.color}40`
                : `0 2px 8px ${selectedSound.color}40`
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" strokeWidth={2.5} />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" strokeWidth={2.5} />
            )}
          </motion.button>

          {/* Right: Mixer + Close Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mixer Button */}
            <motion.button
              onClick={handleOpenMixer}
              whileTap={{ scale: 0.9 }}
              className="px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronUp 
                className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" 
                strokeWidth={2}
              />
              <span 
                className="text-xs font-medium text-white/70 group-hover:text-white transition-colors"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Mixer
              </span>
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <X className="w-4 h-4 text-white/50 hover:text-white/80 transition-colors" strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        {/* Bottom Safe Area (for mobile devices) */}
        <div className="h-safe-area-inset-bottom bg-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}