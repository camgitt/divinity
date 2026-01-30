/**
 * Dark Ambient Mixer Control
 * 
 * Modern dark-themed floating pill design with expandable mixer popup.
 * Features voice focus ducking toggle and breathing ring visualizer.
 * Alternative to the light-themed AmbientMixerControl component.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2, X, Pause, Volume2, Mic } from 'lucide-react';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { BreathingRingVisualizer } from './breathing-ring-visualizer';

// Sound color themes for visualizer
const SOUND_THEMES: Record<string, string> = {
  rain: 'bg-blue-400',
  forest: 'bg-emerald-400',
  wind: 'bg-slate-400',
  ocean: 'bg-cyan-500',
  bells: 'bg-amber-300',
  music: 'bg-purple-400',
};

export function DarkAmbientMixerControl() {
  const { 
    selectedSound,
    isPlaying,
    ambientVolume,
    setAmbientVolume,
    togglePlayPause,
    selectSound,
    isDucking,
    setDucking
  } = useAmbientSound();

  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if no sound is selected
  if (!selectedSound) return null;

  const themeColor = SOUND_THEMES[selectedSound.id] || 'bg-white';
  const themeText = themeColor.replace('bg-', 'text-');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* EXPANDED MIXER POPUP */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-72 p-5 mb-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <span 
                className="text-xs tracking-wider text-slate-400 uppercase"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700 }}
              >
                Audio Balance
              </span>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={16} className="text-slate-400" />
              </button>
            </div>

            {/* AMBIENT VOLUME SLIDER */}
            <div className="mb-6 group">
              <div 
                className="flex justify-between text-sm mb-2 text-slate-200"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
              >
                <span className="flex items-center gap-2">
                  <BreathingRingVisualizer 
                    isPlaying={isPlaying} 
                    color={themeColor}
                    dotSize="sm"
                    ringIntensity="normal"
                  />
                  {selectedSound.name}
                </span>
                <span>{Math.round(ambientVolume)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={ambientVolume}
                onChange={(e) => setAmbientVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
              />
            </div>

            {/* VOICE FOCUS (DUCKING) TOGGLE */}
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-2 text-slate-200" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                <span className="flex items-center gap-2">
                  <Mic size={16} className="text-slate-400" />
                  Voice Focus
                </span>
                <span 
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isDucking ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700 text-slate-400'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
                >
                  {isDucking ? 'Active' : 'Off'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>
                  Background
                </span>
                {/* Custom Toggle Switch */}
                <button
                  onClick={() => setDucking(!isDucking)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    isDucking ? 'bg-indigo-500' : 'bg-slate-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: isDucking ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <span className="text-xs text-slate-500" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>
                  Prominent
                </span>
              </div>
              <p 
                className="text-[10px] text-slate-500 mt-2 leading-tight"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
              >
                Enhances the guide's voice by automatically lowering background sounds when they speak.
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* MINI PLAYER PILL (Always Visible) */}
      <motion.div 
        layout
        className="flex items-center gap-3 p-2 pr-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:shadow-cyan-500/10 hover:border-white/20 transition-all"
      >
        {/* Play/Pause Toggle */}
        <button
          onClick={togglePlayPause}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${themeColor} text-slate-900 shadow-lg hover:scale-105 transition-transform`}
        >
          <Pause size={18} fill="currentColor" />
        </button>

        {/* Info Text */}
        <div 
          className="flex flex-col cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span 
            className="text-xs text-white tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
          >
            {selectedSound.name}
          </span>
          <span 
            className={`text-[10px] ${themeText} flex items-center gap-1`}
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
          >
            <Volume2 size={10} />
            {ambientVolume}%
          </span>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
            isExpanded ? 'text-white' : 'text-slate-400'
          }`}
        >
          <Settings2 size={18} />
        </button>
      </motion.div>

    </div>
  );
}
