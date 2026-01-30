/**
 * Meditation Ambient Sound Integration Hook
 * 
 * Automatically plays suggested ambient sounds when meditation sessions start.
 * This hook bridges the MeditationContext and AmbientSoundContext.
 */

import { useEffect } from 'react';
import { useMeditation } from '../meditation-context';
import { useAmbientSound } from '../../contexts/ambient-sound-context';
import { AMBIENT_SOUNDS } from '../ambient-sound-grid';
import { toast } from 'sonner@2.0.3';

export function useMeditationAmbient() {
  const { activeSession } = useMeditation();
  const { selectSound } = useAmbientSound();

  useEffect(() => {
    // Auto-play suggested ambient sound when meditation starts
    if (activeSession?.suggestedAmbient && activeSession.suggestedAmbient !== 'none') {
      const sound = AMBIENT_SOUNDS.find(s => s.id === activeSession.suggestedAmbient);
      if (sound) {
        console.log('[useMeditationAmbient] Auto-playing ambient sound:', sound.name);
        selectSound(sound);
        toast.success(`${sound.name} started`, {
          icon: '🎵',
          duration: 2000
        });
      }
    }
    // Note: selectSound is intentionally excluded from deps array
    // It's memoized in AmbientSoundContext and won't cause re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id]);

  return null;
}