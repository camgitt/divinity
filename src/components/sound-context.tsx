import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SoundType, getSoundSynthesizer } from './hooks/use-sound';

interface SoundContextType {
  soundEnabled: boolean;
  soundVolume: number;
  toggleSound: () => void;
  setSoundVolume: (volume: number) => void;
  playSound: (type: SoundType, volume?: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Load sound preferences from localStorage
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('divinityagi_sound_enabled');
      return saved !== null ? saved === 'true' : true; // Default to enabled
    }
    return true;
  });

  const [soundVolume, setSoundVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('divinityagi_sound_volume');
      return saved !== null ? parseFloat(saved) : 0.3;
    }
    return 0.3;
  });

  // Save sound preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('divinityagi_sound_enabled', soundEnabled.toString());
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('divinityagi_sound_volume', soundVolume.toString());
    }
  }, [soundVolume]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const setSoundVolume = useCallback((volume: number) => {
    setSoundVolumeState(Math.max(0, Math.min(1, volume)));
  }, []);

  const playSound = useCallback(async (type: SoundType, customVolume?: number) => {
    if (!soundEnabled) return;

    const volume = customVolume !== undefined ? customVolume : soundVolume;
    const synthesizer = getSoundSynthesizer();

    try {
      // Map sound types to synthesizer methods
      switch (type) {
        case 'click':
        case 'tab-switch':
          synthesizer.playClick(volume * 0.8);
          break;
        case 'success':
        case 'badge':
        case 'unlock':
        case 'level-up':
          synthesizer.playSuccess(volume);
          break;
        case 'notification':
        case 'receive-message':
          synthesizer.playNotification(volume);
          break;
        case 'spiritual-bell':
        case 'ethereal':
          synthesizer.playSpiritualBell(volume * 0.7);
          break;
        case 'modal-open':
          synthesizer.playClick(volume * 0.6);
          break;
        case 'modal-close':
          synthesizer.playClick(volume * 0.5);
          break;
        case 'send-message':
          synthesizer.playClick(volume * 0.9);
          break;
        case 'swipe':
          synthesizer.playClick(volume * 0.4);
          break;
        default:
          synthesizer.playClick(volume * 0.7);
      }
    } catch (error) {
      console.debug('Sound playback failed:', error);
    }
  }, [soundEnabled, soundVolume]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        soundVolume,
        toggleSound,
        setSoundVolume,
        playSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
