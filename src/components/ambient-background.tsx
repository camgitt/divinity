/**
 * Ambient Background Component
 * Dynamic gradient background that transitions based on atmosphere mode
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAtmosphere, getAtmosphereGradient } from './atmosphere-context';

interface AmbientBackgroundProps {
  breathPhase?: 'inhale' | 'exhale' | 'hold' | null;
  children?: React.ReactNode;
}

export function AmbientBackground({ breathPhase = null, children }: AmbientBackgroundProps) {
  const { mode } = useAtmosphere();
  const [gradient, setGradient] = useState(getAtmosphereGradient(mode));

  // Update gradient when mode changes
  useEffect(() => {
    setGradient(getAtmosphereGradient(mode));
  }, [mode]);

  // Breathing affects environment brightness
  const getBrightness = () => {
    if (breathPhase === 'inhale') return 1.05; // 5% brighter
    if (breathPhase === 'exhale') return 0.95; // 5% darker
    return 1.0;
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: gradient,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      />

      {/* Breathing brightness overlay */}
      {breathPhase && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
          animate={{
            filter: `brightness(${getBrightness()})`,
          }}
          transition={{
            duration: breathPhase === 'hold' ? 0 : 1,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * Volumetric Light Beams Component (for Dawn/Cathedral effects)
 */
export function LightBeams({ count = 5, mode = 'vertical' }: { count?: number; mode?: 'vertical' | 'radial' }) {
  const beams = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: mode === 'vertical' ? `${(i / count) * 100}%` : '50%',
    top: mode === 'radial' ? '50%' : '0',
    rotation: mode === 'radial' ? (i / count) * 360 : 0,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute"
          style={{
            left: beam.left,
            top: beam.top,
            width: mode === 'vertical' ? '2px' : '200%',
            height: mode === 'vertical' ? '200%' : '2px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
            opacity: beam.opacity,
            transform: `rotate(${beam.rotation}deg)`,
            transformOrigin: 'center',
          }}
          animate={{
            opacity: [beam.opacity, beam.opacity * 0.5, beam.opacity],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
