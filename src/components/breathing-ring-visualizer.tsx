/**
 * Breathing Ring Visualizer
 * 
 * Lightweight animated visualizer using CSS/Motion animations.
 * Use this when you want a simple visual indicator without real-time audio analysis.
 * 
 * For real-time audio-reactive visualizations, use WaveformVisualizer or RingWaveform
 * from ambient-waveform-visualizer.tsx instead.
 */

import { motion } from 'motion/react';

interface BreathingRingVisualizerProps {
  isPlaying: boolean;
  color?: string; // Tailwind class e.g., 'bg-cyan-400'
  dotSize?: 'sm' | 'md' | 'lg';
  ringIntensity?: 'subtle' | 'normal' | 'intense';
}

const DOT_SIZES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

const RING_CONFIGS = {
  subtle: {
    duration: 3,
    scaleMax: 1.3,
    opacity: [0.4, 0, 0.4]
  },
  normal: {
    duration: 2,
    scaleMax: 1.5,
    opacity: [0.6, 0, 0.6]
  },
  intense: {
    duration: 1.5,
    scaleMax: 1.8,
    opacity: [0.8, 0, 0.8]
  }
};

export function BreathingRingVisualizer({ 
  isPlaying, 
  color = 'bg-white',
  dotSize = 'md',
  ringIntensity = 'normal'
}: BreathingRingVisualizerProps) {
  const config = RING_CONFIGS[ringIntensity];
  const textColor = color.replace('bg-', 'text-');

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      {/* Core Dot */}
      <div 
        className={`${DOT_SIZES[dotSize]} rounded-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10`} 
      />
      
      {/* Breathing Ring 1 */}
      {isPlaying && (
        <motion.div
          animate={{ 
            scale: [1, config.scaleMax, 1], 
            opacity: config.opacity 
          }}
          transition={{ 
            duration: config.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`absolute w-full h-full rounded-full border border-current ${textColor} opacity-30`}
        />
      )}
      
      {/* Breathing Ring 2 (Delayed for layered effect) */}
      {isPlaying && (
        <motion.div
          animate={{ 
            scale: [1, config.scaleMax, 1], 
            opacity: [config.opacity[0] * 0.7, 0, config.opacity[0] * 0.7] 
          }}
          transition={{ 
            duration: config.duration, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: config.duration / 2 // Half-cycle delay
          }}
          className={`absolute w-full h-full rounded-full border border-current ${textColor} opacity-20`}
        />
      )}
    </div>
  );
}
