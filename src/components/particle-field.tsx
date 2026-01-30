/**
 * Particle Field Component
 * Renders floating ambient particles that drift based on atmosphere mode
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useAtmosphere, getAtmosphereParticleColor } from './atmosphere-context';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ParticleFieldProps {
  breathPhase?: 'inhale' | 'exhale' | 'hold' | null;
  count?: number;
  pattern?: 'default' | 'wave' | 'beams' | 'fire' | 'stars' | 'lotus' | 'geometry' | 'crescents';
  color?: string;
}

/**
 * Generate random particles
 */
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1, // 1-4px
    duration: Math.random() * 40 + 40, // 40-80s
    delay: Math.random() * -20, // Stagger start times
    opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
  }));
}

export function ParticleField({ breathPhase = null, count, pattern = 'default', color }: ParticleFieldProps) {
  const { mode } = useAtmosphere();
  
  // Adaptive particle count based on screen size
  const particleCount = count ?? (typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 50);
  
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);
  const particleColor = color || getAtmosphereParticleColor(mode);

  // Determine particle movement based on breath phase
  const getParticleYOffset = (baseY: number) => {
    if (breathPhase === 'inhale') return baseY - 10; // Float up
    if (breathPhase === 'exhale') return baseY + 10; // Drift down
    return baseY; // Hold position
  };

  // Render based on pattern
  if (pattern === 'wave') {
    return <WaveParticles particles={particles} color={particleColor} breathPhase={breathPhase} />;
  }
  
  if (pattern === 'fire') {
    return <FireParticles particles={particles} color={particleColor} />;
  }
  
  if (pattern === 'lotus') {
    return <LotusParticles particles={particles} color={particleColor} />;
  }

  if (pattern === 'beams') {
    return <BeamParticles particles={particles} color={particleColor} />;
  }

  if (pattern === 'geometry') {
    return <GeometryParticles particles={particles} color={particleColor} />;
  }

  if (pattern === 'crescents') {
    return <CrescentParticles particles={particles} color={particleColor} />;
  }

  if (pattern === 'stars') {
    return <StarField count={particles.length} />;
  }

  // Default floating particles
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
          }}
          animate={{
            y: [0, getParticleYOffset(-20), getParticleYOffset(-40), 0],
            x: [0, Math.sin(particle.id) * 10, 0],
            opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Wave Pattern (for Still Water micro-state)
 */
function WaveParticles({ particles, color, breathPhase }: { particles: Particle[], color: string, breathPhase?: 'inhale' | 'exhale' | 'hold' | null }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${color}`,
          }}
          animate={{
            y: [0, Math.sin(particle.id) * 5, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration * 0.5,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Fire Pattern (for Inner Fire micro-state)
 */
function FireParticles({ particles, color }: { particles: Particle[], color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 20 - 10],
            scale: [1, 0.5],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration * 0.1,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Lotus Pattern (for Buddhism/Jainism)
 */
function LotusParticles({ particles, color }: { particles: Particle[], color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        >
          {/* Simple lotus petal shape */}
          <div
            style={{
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: color,
              opacity: particle.opacity,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Beam Pattern (for Light/Beam micro-state)
 */
function BeamParticles({ particles, color }: { particles: Particle[], color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: '0%',
            width: `${particle.size * 1.5}px`,
            height: '100%',
            background: `linear-gradient(180deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
            opacity: particle.opacity * 0.5,
          }}
          animate={{
            opacity: [particle.opacity * 0.3, particle.opacity * 0.6, particle.opacity * 0.3],
          }}
          transition={{
            duration: particle.duration * 0.3,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Geometry Pattern (for Islamic geometric patterns)
 */
function GeometryParticles({ particles, color }: { particles: Particle[], color: string }) {
  const shapes = ['square', 'diamond', 'hexagon'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const shape = shapes[particle.id % shapes.length];
        const rotation = shape === 'diamond' ? 45 : 0;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size * 2}px`,
              height: `${particle.size * 2}px`,
              backgroundColor: 'transparent',
              border: `1px solid ${color}`,
              opacity: particle.opacity,
              transform: `rotate(${rotation}deg)`,
            }}
            animate={{
              y: [0, -30, -60, 0],
              rotate: [rotation, rotation + 180, rotation + 360],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Crescent Pattern (for Islamic faith)
 */
function CrescentParticles({ particles, color }: { particles: Particle[], color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, 0],
            opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Crescent shape using border radius */}
          <div
            style={{
              width: `${particle.size * 3}px`,
              height: `${particle.size * 3}px`,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: particle.opacity,
              boxShadow: `inset ${particle.size}px 0 0 ${particle.size * 0.5}px rgba(0,0,0,0.8)`,
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Star Field Variant (for Night/Void mode)
 */
export function StarField({ count = 100 }: { count?: number }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 0.5}px`,
            height: `${particle.size * 0.5}px`,
            backgroundColor: '#FFFFFF',
            opacity: particle.opacity,
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration * 0.1, // Faster twinkle
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}