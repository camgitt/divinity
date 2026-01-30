import React from 'react';
import { AmbientBackgroundWrapper } from './ambient-background-effect';
import { AmbientSoundSystem } from './ambient-sound-system';
import { AmbientMiniPlayer } from './ambient-mini-player';
import { useAmbientSound } from '../contexts/ambient-sound-context';

/**
 * Ambient Sound Showcase Component
 * 
 * Demonstrates the full ambient sound system with:
 * 1. Dynamic background gradients
 * 2. Glass card grid (Discovery Mode)
 * 3. Persistent mini-player
 * 4. Volume mixer overlay
 */

interface AmbientSoundShowcaseProps {
  className?: string;
  enableBackgroundEffect?: boolean;
}

export function AmbientSoundShowcase({ 
  className = '', 
  enableBackgroundEffect = true 
}: AmbientSoundShowcaseProps) {
  const { viewMode } = useAmbientSound();

  return (
    <AmbientBackgroundWrapper 
      enableBackgroundEffect={enableBackgroundEffect}
      backgroundOpacity={0.3}
      className="bg-[#0F172A]"
    >
      <div className={`min-h-screen ${className}`}>
        {/* Main Content Area */}
        <div className="max-w-md mx-auto px-4 py-8">
          <AmbientSoundSystem className={viewMode === 'grid' ? 'block' : 'hidden'} />
        </div>

        {/* Persistent Mini-Player (floats at bottom) */}
        <AmbientMiniPlayer />
      </div>
    </AmbientBackgroundWrapper>
  );
}
