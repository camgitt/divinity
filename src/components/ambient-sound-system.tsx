import React from 'react';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { AmbientSoundGrid } from './ambient-sound-grid';
import { AmbientMiniPlayer } from './ambient-mini-player';
import { AmbientMixerOverlay } from './ambient-mixer-overlay';

/**
 * Master Ambient Sound System
 * 
 * Manages three UI variants:
 * - Grid: Discovery mode with glass cards (Variant A)
 * - Mini-player: Persistent floating bottom bar (Variant B)
 * - Mixer: Full-screen volume control overlay (Variant C)
 */

interface AmbientSoundSystemProps {
  className?: string;
}

export function AmbientSoundSystem({ className = '' }: AmbientSoundSystemProps) {
  const { viewMode, selectedSound } = useAmbientSound();

  return (
    <>
      {/* Variant A: Glass Card Grid (Discovery Mode) */}
      {/* Removed - Instant Ambience section */}

      {/* Variant B: Mini-Player (Persistent Bottom Bar) */}
      {viewMode === 'mini-player' && selectedSound && (
        <AmbientMiniPlayer />
      )}

      {/* Variant C: Mixer Overlay (Volume Control) */}
      <AmbientMixerOverlay />
    </>
  );
}