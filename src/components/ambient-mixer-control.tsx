/**
 * Ambient Mixer Control
 * 
 * Minimal floating control panel for ambient sound volume during guided meditations.
 * Shows only when ambient sound is playing - provides quick access to volume without
 * taking up screen space with the full grid.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { 
  Volume2, 
  VolumeX,
  ChevronUp,
  ChevronDown,
  Music,
  Settings,
  Mic
} from 'lucide-react';

interface AmbientMixerControlProps {
  className?: string;
  showSoundName?: boolean;
  compact?: boolean;
}

export function AmbientMixerControl({ 
  className = '',
  showSoundName = true,
  compact = false
}: AmbientMixerControlProps) {
  const { 
    selectedSound,
    isPlaying,
    ambientVolume,
    isMuted,
    setAmbientVolume,
    toggleMute,
    togglePlayPause,
    setShowMixer,
    isDucking,
    setDucking
  } = useAmbientSound();

  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if no sound is selected
  if (!selectedSound) return null;

  // Compact mode - just icon and volume slider
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={className}
      >
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl p-3">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="p-2"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4" style={{ color: selectedSound.color }} />
              )}
            </Button>
            
            <div className="w-32">
              <Slider
                value={[isMuted ? 0 : ambientVolume]}
                onValueChange={(values) => {
                  setAmbientVolume(values[0]);
                  if (isMuted && values[0] > 0) {
                    toggleMute();
                  }
                }}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <span className="text-[11px] font-mono text-gray-600 w-8 text-right">
              {ambientVolume}%
            </span>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Full mode - expandable control panel
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl overflow-hidden">
        {/* Header - Always Visible */}
        <div className="w-full px-4 py-3 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
            style={{ 
              backgroundColor: `${selectedSound.color}20`,
              border: `2px solid ${selectedSound.color}40`
            }}
          >
            <selectedSound.icon 
              className="w-5 h-5" 
              style={{ color: selectedSound.color }}
            />
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 text-left hover:opacity-80 transition-opacity"
          >
            {showSoundName && (
              <div className="text-[13px] leading-tight" style={{ 
                fontFamily: "'Poppins', sans-serif", 
                fontWeight: 600,
                color: '#3D3D6B'
              }}>
                {selectedSound.name}
              </div>
            )}
            <div className="text-[11px] text-gray-500" style={{ 
              fontFamily: "'Raleway', sans-serif", 
              fontWeight: 400
            }}>
              {isPlaying ? 'Playing' : 'Paused'} · {ambientVolume}%
            </div>
          </button>
          
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="p-2"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4" style={{ color: selectedSound.color }} />
              )}
            </Button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pb-4 pt-2 space-y-4 border-t border-gray-100">
                {/* Volume Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px]" style={{ 
                      fontFamily: "'Raleway', sans-serif", 
                      fontWeight: 600,
                      color: '#6B7280'
                    }}>
                      Ambient Volume
                    </span>
                    <span className="text-[12px] font-mono" style={{ 
                      fontFamily: "'Poppins', sans-serif", 
                      fontWeight: 600,
                      color: selectedSound.color
                    }}>
                      {ambientVolume}%
                    </span>
                  </div>
                  <Slider
                    value={[isMuted ? 0 : ambientVolume]}
                    onValueChange={(values) => {
                      setAmbientVolume(values[0]);
                      if (isMuted && values[0] > 0) {
                        toggleMute();
                      }
                    }}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex gap-2">
                  {[25, 50, 75, 100].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmbientVolume(preset);
                        if (isMuted) toggleMute();
                      }}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] transition-all ${
                        ambientVolume === preset && !isMuted
                          ? 'text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontWeight: 600,
                        ...(ambientVolume === preset && !isMuted ? {
                          backgroundColor: selectedSound.color,
                        } : {})
                      }}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>

                {/* Voice Focus (Ducking Control) */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-gray-400" />
                      <span className="text-[12px]" style={{ 
                        fontFamily: "'Raleway', sans-serif", 
                        fontWeight: 600,
                        color: '#6B7280'
                      }}>
                        Voice Focus
                      </span>
                    </div>
                    <span 
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ 
                        fontFamily: "'Raleway', sans-serif",
                        fontWeight: 600,
                        backgroundColor: isDucking ? `${selectedSound.color}20` : '#F3F4F6',
                        color: isDucking ? selectedSound.color : '#9CA3AF'
                      }}
                    >
                      {isDucking ? 'Active' : 'Off'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400" style={{ 
                      fontFamily: "'Raleway', sans-serif", 
                      fontWeight: 500
                    }}>
                      Background
                    </span>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => setDucking(!isDucking)}
                      className="relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner"
                      style={{ 
                        backgroundColor: isDucking ? selectedSound.color : '#E5E7EB'
                      }}
                    >
                      <motion.div
                        animate={{ x: isDucking ? 20 : 2 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                    <span className="text-[10px] text-gray-400" style={{ 
                      fontFamily: "'Raleway', sans-serif", 
                      fontWeight: 500
                    }}>
                      Prominent
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 mt-2 leading-snug" style={{ 
                    fontFamily: "'Raleway', sans-serif", 
                    fontWeight: 400
                  }}>
                    Enhances guide voice by automatically lowering ambient sounds during meditation narration.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={togglePlayPause}
                    className="flex-1 h-9 text-[12px]"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowMixer(true)}
                    className="flex-1 h-9 text-[12px]"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Full Mixer
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

/**
 * Minimal Icon-Only Control
 * Super compact - just volume icon with tooltip-style slider on hover
 */
export function AmbientMixerIconControl({ className = '' }: { className?: string }) {
  const { 
    selectedSound,
    ambientVolume,
    isMuted,
    setAmbientVolume,
    toggleMute
  } = useAmbientSound();

  const [showSlider, setShowSlider] = useState(false);

  if (!selectedSound) return null;

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <Button
        size="sm"
        variant="ghost"
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-white/50 hover:bg-white"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-400" />
        ) : (
          <Volume2 className="w-5 h-5" style={{ color: selectedSound.color }} />
        )}
      </Button>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-12 top-1/2 -translate-y-1/2"
          >
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl p-3">
              <div className="flex items-center gap-3">
                <Slider
                  value={[isMuted ? 0 : ambientVolume]}
                  onValueChange={(values) => {
                    setAmbientVolume(values[0]);
                    if (isMuted && values[0] > 0) {
                      toggleMute();
                    }
                  }}
                  max={100}
                  step={1}
                  className="w-32"
                />
                <span className="text-[11px] font-mono text-gray-600 w-8">
                  {ambientVolume}%
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}