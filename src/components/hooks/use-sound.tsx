import { useCallback, useEffect, useRef } from 'react';

// Sound effect types
export type SoundType =
  | 'click'
  | 'hover'
  | 'success'
  | 'error'
  | 'notification'
  | 'badge'
  | 'modal-open'
  | 'modal-close'
  | 'swipe'
  | 'tab-switch'
  | 'send-message'
  | 'receive-message'
  | 'unlock'
  | 'level-up'
  | 'soft-chime'
  | 'ethereal'
  | 'spiritual-bell';

// Sound URLs - using free sound effects from reputable sources
const SOUND_URLS: Record<SoundType, string> = {
  'click': 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  'hover': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  'success': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  'error': 'https://assets.mixkit.co/active_storage/sfx/1454/1454-preview.mp3',
  'notification': 'https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3',
  'badge': 'https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3',
  'modal-open': 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  'modal-close': 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
  'swipe': 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  'tab-switch': 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  'send-message': 'https://assets.mixkit.co/active_storage/sfx/1440/1440-preview.mp3',
  'receive-message': 'https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3',
  'unlock': 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  'level-up': 'https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3',
  'soft-chime': 'https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3',
  'ethereal': 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  'spiritual-bell': 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
};

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  enabled?: boolean;
}

export function useSound(type: SoundType, options: UseSoundOptions = {}) {
  const {
    volume = 0.3,
    playbackRate = 1.0,
    enabled = true,
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isLoadedRef = useRef(false);

  // Preload audio
  useEffect(() => {
    if (!enabled) return;

    try {
      const audio = new Audio(SOUND_URLS[type]);
      audio.volume = volume;
      audio.playbackRate = playbackRate;
      audio.preload = 'auto';

      // Add error handler to prevent console errors
      audio.addEventListener('error', (e) => {
        console.debug('Sound preload failed (silently handled):', type);
        isLoadedRef.current = false;
      });

      // Attempt to preload
      audio.load();

      audioRef.current = audio;
      isLoadedRef.current = true;

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    } catch (error) {
      console.debug('Audio initialization failed:', error);
      isLoadedRef.current = false;
    }
  }, [type, volume, playbackRate, enabled]);

  const play = useCallback(async () => {
    if (!enabled || !audioRef.current || !isLoadedRef.current) return;

    try {
      // Reset audio to start
      audioRef.current.currentTime = 0;
      
      // Play with promise handling for better browser compatibility
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      // Silently fail if autoplay is blocked or other issues occur
      console.debug('Sound play failed (silently handled):', error);
    }
  }, [enabled]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}

// Utility hook for playing sounds without preloading
export function useSoundEffect() {
  const soundEnabledRef = useRef(true);

  const playSound = useCallback(async (
    type: SoundType,
    options: UseSoundOptions = {}
  ) => {
    const {
      volume = 0.3,
      playbackRate = 1.0,
      enabled = soundEnabledRef.current,
    } = options;

    if (!enabled) return;

    try {
      const audio = new Audio(SOUND_URLS[type]);
      audio.volume = volume;
      audio.playbackRate = playbackRate;
      
      // Add error handler to prevent console errors
      audio.addEventListener('error', () => {
        console.debug('Sound effect load failed (silently handled)');
      });
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.debug('Sound effect failed (silently handled):', error);
    }
  }, []);

  const toggleSounds = useCallback((enabled: boolean) => {
    soundEnabledRef.current = enabled;
  }, []);

  return { playSound, toggleSounds };
}

// Web Audio API synthesized sounds for lightweight alternative
export class SoundSynthesizer {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  private getContext(): AudioContext | null {
    if (!this.audioContext && typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  // Gentle click sound
  playClick(volume: number = 0.2) {
    const ctx = this.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Success chime
  playSuccess(volume: number = 0.25) {
    const ctx = this.getContext();
    if (!ctx) return;

    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }

  // Spiritual bell sound
  playSpiritualBell(volume: number = 0.2) {
    const ctx = this.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filterNode = ctx.createBiquadFilter();

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz - "healing frequency"
    oscillator.type = 'sine';

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 2);
  }

  // Notification sound
  playNotification(volume: number = 0.25) {
    const ctx = this.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }
}

// Global sound synthesizer instance
let globalSynthesizer: SoundSynthesizer | null = null;

export function getSoundSynthesizer(): SoundSynthesizer {
  if (!globalSynthesizer) {
    globalSynthesizer = new SoundSynthesizer();
  }
  return globalSynthesizer;
}
