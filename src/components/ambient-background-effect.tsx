import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAmbientSound } from '../contexts/ambient-sound-context';

interface AmbientBackgroundEffectProps {
  enabled?: boolean;
  opacity?: number;
}

export function AmbientBackgroundEffect({ 
  enabled = true, 
  opacity = 0.4 
}: AmbientBackgroundEffectProps) {
  const { selectedSound, isPlaying } = useAmbientSound();

  if (!enabled || !selectedSound || !isPlaying) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={selectedSound.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: selectedSound.bgGradient,
          mixBlendMode: 'overlay'
        }}
      />
    </AnimatePresence>
  );
}

interface AmbientBackgroundWrapperProps {
  children: React.ReactNode;
  enableBackgroundEffect?: boolean;
  backgroundOpacity?: number;
  className?: string;
}

export function AmbientBackgroundWrapper({ 
  children, 
  enableBackgroundEffect = true,
  backgroundOpacity = 0.3,
  className = ''
}: AmbientBackgroundWrapperProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Ambient Background Effect */}
      <AmbientBackgroundEffect 
        enabled={enableBackgroundEffect} 
        opacity={backgroundOpacity} 
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
