import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, Mic, Music2 } from 'lucide-react';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { Slider } from './ui/slider';
import { useHapticFeedback } from './hooks/use-haptic';
import { RingWaveform } from './ambient-waveform-visualizer';

interface AmbientMixerOverlayProps {
  className?: string;
}

export function AmbientMixerOverlay({ className = '' }: AmbientMixerOverlayProps) {
  const {
    selectedSound,
    isPlaying,
    ambientVolume,
    voiceVolume,
    isMuted,
    showMixer,
    analyserNode,
    setAmbientVolume,
    setVoiceVolume,
    toggleMute,
    setShowMixer
  } = useAmbientSound();

  const haptic = useHapticFeedback();

  if (!showMixer || !selectedSound) return null;

  const SoundIcon = selectedSound.icon;

  const handleClose = () => {
    haptic?.lightTap();
    setShowMixer(false);
  };

  const handleMuteToggle = () => {
    haptic?.lightTap();
    toggleMute();
  };

  return (
    <AnimatePresence>
      {showMixer && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100]"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Mixer Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 z-[101] ${className}`}
            style={{
              maxHeight: '80vh',
              background: 'linear-gradient(to bottom, #0F172A, #1E293B)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: `0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
              borderTop: `2px solid ${selectedSound.color}40`
            }}
          >
            {/* Ambient Glow */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(to right, transparent, ${selectedSound.color}, transparent)`,
                filter: 'blur(8px)'
              }}
              animate={{
                opacity: isPlaying ? [0.5, 1, 0.5] : 0.3
              }}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0
              }}
            />

            {/* Drag Handle */}
            <div className="pt-4 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Icon with Waveform */}
                  <div className="relative">
                    <div className="absolute inset-0 -m-2">
                      <RingWaveform
                        analyserNode={analyserNode}
                        isPlaying={isPlaying}
                        size={80}
                        color={selectedSound.color}
                      />
                    </div>
                    <div 
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${selectedSound.color}30, rgba(15,23,42,0.8))`,
                        border: `2px solid ${selectedSound.color}40`,
                        boxShadow: isPlaying ? `0 0 24px ${selectedSound.color}60` : 'none'
                      }}
                    >
                      <SoundIcon 
                        className="w-7 h-7"
                        style={{ 
                          color: selectedSound.color,
                          filter: `drop-shadow(0 0 8px ${selectedSound.color})`,
                          strokeWidth: 1.5
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Audio Mixer
                    </h2>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: selectedSound.color,
                        fontFamily: "'Raleway', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {selectedSound.name} • {isPlaying ? 'Playing' : 'Paused'}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" strokeWidth={2} />
                </button>
              </div>

              {/* Volume Sliders Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Voice Volume */}
                <VolumeSlider
                  label="Voice Volume"
                  icon={Mic}
                  volume={voiceVolume}
                  onVolumeChange={setVoiceVolume}
                  color="#7A4FFF"
                  accentColor="#7A4FFF"
                />

                {/* Ambience Volume */}
                <VolumeSlider
                  label="Ambience Volume"
                  icon={Music2}
                  volume={ambientVolume}
                  onVolumeChange={setAmbientVolume}
                  color={selectedSound.color}
                  accentColor={selectedSound.color}
                />
              </div>

              {/* Global Mute Toggle */}
              <motion.button
                onClick={handleMuteToggle}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  background: isMuted 
                    ? 'linear-gradient(135deg, #DC2626, #991B1B)'
                    : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isMuted ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isMuted 
                    ? '0 4px 24px rgba(220,38,38,0.4)'
                    : 'none'
                }}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" strokeWidth={2} />
                ) : (
                  <Volume2 className="w-6 h-6 text-white/70" strokeWidth={2} />
                )}
                <span 
                  className="text-lg font-semibold"
                  style={{ 
                    color: isMuted ? '#fff' : 'rgba(255,255,255,0.7)',
                    fontFamily: "'Raleway', sans-serif"
                  }}
                >
                  {isMuted ? 'Unmute Audio' : 'Mute All Audio'}
                </span>
              </motion.button>

              {/* Info Text */}
              <p 
                className="mt-6 text-center text-xs text-white/40"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Adjust voice and ambient sound levels independently for your ideal meditation experience
              </p>
            </div>

            {/* Bottom Safe Area */}
            <div className="h-safe-area-inset-bottom bg-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ==================== VOLUME SLIDER COMPONENT ====================

interface VolumeSliderProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  volume: number;
  onVolumeChange: (volume: number) => void;
  color: string;
  accentColor: string;
}

function VolumeSlider({ 
  label, 
  icon: Icon, 
  volume, 
  onVolumeChange, 
  color,
  accentColor 
}: VolumeSliderProps) {
  return (
    <div 
      className="p-6 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* Icon + Label */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `${accentColor}20`,
              border: `1px solid ${accentColor}30`
            }}
          >
            <Icon 
              className="w-5 h-5"
              style={{ color: accentColor, strokeWidth: 1.5 }}
            />
          </div>
          <span 
            className="font-semibold text-white/90"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Volume Display */}
      <div 
        className="text-center mb-6 py-4 rounded-xl"
        style={{
          background: `${accentColor}10`,
          border: `1px solid ${accentColor}20`
        }}
      >
        <p 
          className="text-4xl font-bold"
          style={{ 
            color: accentColor,
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          {volume}%
        </p>
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <Slider
          value={[volume]}
          onValueChange={(values) => onVolumeChange(values[0])}
          max={100}
          step={1}
          className="w-full"
        />

        {/* Preset Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => onVolumeChange(preset)}
              className="py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: volume === preset 
                  ? `${accentColor}30`
                  : 'rgba(255,255,255,0.05)',
                border: volume === preset 
                  ? `1px solid ${accentColor}`
                  : '1px solid rgba(255,255,255,0.1)',
                color: volume === preset ? accentColor : 'rgba(255,255,255,0.5)',
                fontFamily: "'Raleway', sans-serif"
              }}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}