import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';

console.log('✅ AmbientSoundContext module loading...');
console.log('✅ createContext:', createContext);

// ==================== TYPES ====================

export interface AmbientSound {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGradient: string; // Background gradient when active
  url: string;
  image: string;
}

export type AmbientViewMode = 'grid' | 'mini-player' | 'mixer';

interface AmbientSoundContextType {
  // Sound state
  selectedSound: AmbientSound | null;
  isPlaying: boolean;
  ambientVolume: number;
  voiceVolume: number;
  isMuted: boolean;
  isDucking: boolean; // Track ducking state in context
  
  // View state
  viewMode: AmbientViewMode;
  showMixer: boolean;
  
  // Audio analysis
  analyserNode: AnalyserNode | null;
  audioContext: AudioContext | null;
  
  // Actions
  selectSound: (sound: AmbientSound | null) => void;
  togglePlayPause: () => void;
  setAmbientVolume: (volume: number) => void;
  setVoiceVolume: (volume: number) => void;
  toggleMute: () => void;
  setViewMode: (mode: AmbientViewMode) => void;
  setShowMixer: (show: boolean) => void;
  setDucking: (active: boolean) => void; // Enable/disable ducking for voice narration
  
  // Internal
  soundGenerator: AmbientSoundGenerator | null;
}

const AmbientSoundContext = createContext<AmbientSoundContextType | undefined>(undefined);

// ==================== SOUND GENERATOR ====================

export class AmbientSoundGenerator {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private filters: BiquadFilterNode[] = [];
  private masterVolume: number = 0.5; // Track the base volume before ducking
  private isDucking: boolean = false; // Track ducking state

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.analyserNode = this.audioContext.createAnalyser();
      
      // Configure analyzer for waveform visualization
      this.analyserNode.fftSize = 256;
      this.analyserNode.smoothingTimeConstant = 0.8;
      
      // Connect: source → analyser → gain → destination
      this.gainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.audioContext.destination);
    }
  }

  getAnalyserNode(): AnalyserNode | null {
    return this.analyserNode;
  }

  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  private createNoiseBuffer(duration: number = 2): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.5;
    }
    
    return buffer;
  }

  setVolume(volume: number) {
    this.masterVolume = volume; // Store the master volume
    if (this.gainNode && this.audioContext) {
      // If ducking is active, apply the ducked volume; otherwise use master volume
      const targetVolume = this.isDucking ? this.masterVolume * 0.3 : this.masterVolume;
      this.gainNode.gain.setTargetAtTime(targetVolume, this.audioContext.currentTime, 0.1);
    }
  }

  /**
   * Enable or disable audio ducking (volume reduction for voice narration)
   * @param active - True to duck (reduce volume to 30%), false to restore normal volume
   */
  public setDucking(active: boolean) {
    if (!this.gainNode || !this.audioContext) return;
    
    this.isDucking = active;
    const targetVolume = active ? this.masterVolume * 0.3 : this.masterVolume;
    
    // Smooth exponential ramp to avoid clicking (1.5 second transition)
    // Use Math.max to ensure we never ramp to 0 (which would cause exponentialRampToValueAtTime to fail)
    const safeTargetVolume = Math.max(0.001, targetVolume);
    
    try {
      this.gainNode.gain.exponentialRampToValueAtTime(
        safeTargetVolume,
        this.audioContext.currentTime + 1.5
      );
    } catch (e) {
      // Fallback to setTargetAtTime if exponentialRamp fails
      console.warn('[AmbientSound] Exponential ramp failed, using setTargetAtTime:', e);
      this.gainNode.gain.setTargetAtTime(targetVolume, this.audioContext.currentTime, 0.5);
    }
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch (e) {}
      this.noiseNode = null;
    }

    this.filters.forEach(filter => {
      try {
        filter.disconnect();
      } catch (e) {}
    });
    this.filters = [];
  }

  playRain(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume);

    const noiseBuffer = this.createNoiseBuffer(2);
    if (!noiseBuffer) return;

    // Create multiple layers for more realistic rain
    // Layer 1: Light rain (high frequency)
    const noise1 = this.audioContext.createBufferSource();
    noise1.buffer = noiseBuffer;
    noise1.loop = true;

    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.value = 2000;
    filter1.Q.value = 0.3;

    const gain1 = this.audioContext.createGain();
    gain1.gain.value = 0;
    // Soft attack - fade in over 3 seconds
    gain1.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 3);

    // Layer 2: Medium rain drops
    const noise2 = this.audioContext.createBufferSource();
    noise2.buffer = noiseBuffer;
    noise2.loop = true;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.value = 800;
    filter2.Q.value = 0.5;

    const gain2 = this.audioContext.createGain();
    gain2.gain.value = 0;
    // Staggered attack
    gain2.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + 4);

    // Layer 3: Heavy rain (low frequency)
    const noise3 = this.audioContext.createBufferSource();
    noise3.buffer = noiseBuffer;
    noise3.loop = true;

    const filter3 = this.audioContext.createBiquadFilter();
    filter3.type = 'lowpass';
    filter3.frequency.value = 400;
    filter3.Q.value = 0.4;

    const gain3 = this.audioContext.createGain();
    gain3.gain.value = 0;
    gain3.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 2.5);

    // Add subtle variation with LFO on filter frequency
    const lfo = this.audioContext.createOscillator();
    lfo.frequency.value = 0.3;
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = 100;
    lfo.connect(lfoGain);
    lfoGain.connect(filter2.frequency);

    // Additional modulation on gain for intensity variation
    const gainLfo = this.audioContext.createOscillator();
    gainLfo.frequency.value = 0.15;
    const gainLfoGain = this.audioContext.createGain();
    gainLfoGain.gain.value = 0.1;
    gainLfo.connect(gainLfoGain);
    gainLfoGain.connect(gain2.gain);

    // Slow Q modulation for texture
    const qLfo = this.audioContext.createOscillator();
    qLfo.frequency.value = 0.08;
    const qLfoGain = this.audioContext.createGain();
    qLfoGain.gain.value = 0.2;
    qLfo.connect(qLfoGain);
    qLfoGain.connect(filter1.Q);

    // Connect all layers
    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.gainNode);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.gainNode);

    noise3.connect(filter3);
    filter3.connect(gain3);
    gain3.connect(this.gainNode);

    // Start all sources
    noise1.start();
    noise2.start();
    noise3.start();
    lfo.start();
    gainLfo.start();
    qLfo.start();

    this.noiseNode = noise1; // Store first one for reference
    this.filters.push(filter1, filter2, filter3);
    this.oscillators.push(lfo, gainLfo, qLfo);
  }

  playOcean(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume);

    const noiseBuffer = this.createNoiseBuffer(2);
    if (!noiseBuffer) return;

    // Layer 1: Deep ocean rumble
    const noise1 = this.audioContext.createBufferSource();
    noise1.buffer = noiseBuffer;
    noise1.loop = true;

    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.value = 200;
    filter1.Q.value = 0.7;

    const gain1 = this.audioContext.createGain();
    gain1.gain.value = 0;
    // Very slow attack for ocean depth
    gain1.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 5);

    // Layer 2: Wave crash (mid frequency)
    const noise2 = this.audioContext.createBufferSource();
    noise2.buffer = noiseBuffer;
    noise2.loop = true;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.value = 500;
    filter2.Q.value = 0.4;

    const gain2 = this.audioContext.createGain();
    gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 4);

    // Slow wave motion LFO (8 second cycles)
    const waveLfo = this.audioContext.createOscillator();
    waveLfo.frequency.value = 0.125; // 8 second wave cycles
    const waveLfoGain = this.audioContext.createGain();
    waveLfoGain.gain.value = 200; // Increased modulation depth
    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(filter2.frequency);

    // Volume swell LFO for natural ebb and flow
    const volumeLfo = this.audioContext.createOscillator();
    volumeLfo.frequency.value = 0.1;
    const volumeLfoGain = this.audioContext.createGain();
    volumeLfoGain.gain.value = 0.2; // Increased for more dynamic waves
    volumeLfo.connect(volumeLfoGain);
    volumeLfoGain.connect(gain2.gain);

    // Add filter sweep for wave motion
    const sweepLfo = this.audioContext.createOscillator();
    sweepLfo.frequency.value = 0.07;
    const sweepLfoGain = this.audioContext.createGain();
    sweepLfoGain.gain.value = 80;
    sweepLfo.connect(sweepLfoGain);
    sweepLfoGain.connect(filter1.frequency);

    // Connect layers
    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.gainNode);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.gainNode);

    // Start all
    noise1.start();
    noise2.start();
    waveLfo.start();
    volumeLfo.start();
    sweepLfo.start();

    this.noiseNode = noise1;
    this.oscillators.push(waveLfo, volumeLfo, sweepLfo);
    this.filters.push(filter1, filter2);
  }

  playForest(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume);

    const noiseBuffer = this.createNoiseBuffer(2);
    if (!noiseBuffer) return;

    // Layer 1: Gentle wind through trees
    const noise1 = this.audioContext.createBufferSource();
    noise1.buffer = noiseBuffer;
    noise1.loop = true;

    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.value = 600;
    filter1.Q.value = 0.2;

    const gain1 = this.audioContext.createGain();
    gain1.gain.value = 0;
    // Gentle fade in
    gain1.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + 3.5);

    // Layer 2: Rustling leaves (higher frequency)
    const noise2 = this.audioContext.createBufferSource();
    noise2.buffer = noiseBuffer;
    noise2.loop = true;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.value = 1200;
    filter2.Q.value = 0.3;

    const gain2 = this.audioContext.createGain();
    gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 4);

    // Gentle breeze variation
    const breezeLfo = this.audioContext.createOscillator();
    breezeLfo.frequency.value = 0.15;
    const breezeLfoGain = this.audioContext.createGain();
    breezeLfoGain.gain.value = 120; // Increased modulation
    breezeLfo.connect(breezeLfoGain);
    breezeLfoGain.connect(filter1.frequency);

    // Secondary breeze for more organic movement
    const breeze2Lfo = this.audioContext.createOscillator();
    breeze2Lfo.frequency.value = 0.09;
    const breeze2LfoGain = this.audioContext.createGain();
    breeze2LfoGain.gain.value = 0.12;
    breeze2Lfo.connect(breeze2LfoGain);
    breeze2LfoGain.connect(gain1.gain);

    // Subtle bird chirps (very low frequency oscillators)
    const bird1 = this.audioContext.createOscillator();
    bird1.type = 'sine';
    bird1.frequency.value = 2200;
    const bird1Gain = this.audioContext.createGain();
    bird1Gain.gain.value = 0;

    // Randomly modulate bird volume for occasional chirps
    const birdLfo = this.audioContext.createOscillator();
    birdLfo.frequency.value = 0.05;
    const birdLfoGain = this.audioContext.createGain();
    birdLfoGain.gain.value = 0.03;
    birdLfo.connect(birdLfoGain);
    birdLfoGain.connect(bird1Gain.gain);

    // Connect all layers
    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.gainNode);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.gainNode);

    bird1.connect(bird1Gain);
    bird1Gain.connect(this.gainNode);

    // Start all
    noise1.start();
    noise2.start();
    breezeLfo.start();
    breeze2Lfo.start();
    bird1.start();
    birdLfo.start();

    this.noiseNode = noise1;
    this.filters.push(filter1, filter2);
    this.oscillators.push(breezeLfo, breeze2Lfo, bird1, birdLfo);
  }

  playWind(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume);

    const noiseBuffer = this.createNoiseBuffer(2);
    if (!noiseBuffer) return;

    // Layer 1: Deep wind
    const noise1 = this.audioContext.createBufferSource();
    noise1.buffer = noiseBuffer;
    noise1.loop = true;

    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.value = 500;
    filter1.Q.value = 0.4;

    const gain1 = this.audioContext.createGain();
    gain1.gain.value = 0;
    // Slow build up
    gain1.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 4);

    // Layer 2: Mid wind whistles
    const noise2 = this.audioContext.createBufferSource();
    noise2.buffer = noiseBuffer;
    noise2.loop = true;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.value = 1200;
    filter2.Q.value = 0.3;

    const gain2 = this.audioContext.createGain();
    gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 3);

    // Wind gust variation (slow changes)
    const gustLfo = this.audioContext.createOscillator();
    gustLfo.frequency.value = 0.08;
    const gustLfoGain = this.audioContext.createGain();
    gustLfoGain.gain.value = 0.25; // Increased for more dramatic gusts
    gustLfo.connect(gustLfoGain);
    gustLfoGain.connect(gain1.gain);

    // Frequency variation for natural wind movement
    const freqLfo = this.audioContext.createOscillator();
    freqLfo.frequency.value = 0.2;
    const freqLfoGain = this.audioContext.createGain();
    freqLfoGain.gain.value = 200; // Increased modulation depth
    freqLfo.connect(freqLfoGain);
    freqLfoGain.connect(filter2.frequency);

    // Additional Q modulation for texture
    const qLfo = this.audioContext.createOscillator();
    qLfo.frequency.value = 0.12;
    const qLfoGain = this.audioContext.createGain();
    qLfoGain.gain.value = 0.15;
    qLfo.connect(qLfoGain);
    qLfoGain.connect(filter1.Q);

    // Connect layers
    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.gainNode);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.gainNode);

    // Start all
    noise1.start();
    noise2.start();
    gustLfo.start();
    freqLfo.start();
    qLfo.start();

    this.noiseNode = noise1;
    this.filters.push(filter1, filter2);
    this.oscillators.push(gustLfo, freqLfo, qLfo);
  }

  playBells(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume * 0.25);

    // Solfeggio frequencies for healing/meditation
    const fundamentals = [
      { freq: 396, name: 'Liberation' },
      { freq: 528, name: 'Transformation' },
      { freq: 639, name: 'Connection' },
      { freq: 852, name: 'Awakening' }
    ];
    
    fundamentals.forEach((note, i) => {
      // Fundamental tone
      const osc1 = this.audioContext!.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = note.freq;

      // Add harmonics for bell-like quality
      const osc2 = this.audioContext!.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = note.freq * 2.4; // Non-harmonic overtone

      const osc3 = this.audioContext!.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.value = note.freq * 3.76; // Another overtone

      // Mix the oscillators with soft attack
      const gain1 = this.audioContext!.createGain();
      gain1.gain.value = 0;
      gain1.gain.linearRampToValueAtTime(0.12 / (i + 1), this.audioContext!.currentTime + 2 + (i * 0.5));

      const gain2 = this.audioContext!.createGain();
      gain2.gain.value = 0;
      gain2.gain.linearRampToValueAtTime(0.04 / (i + 1), this.audioContext!.currentTime + 2.5 + (i * 0.5));

      const gain3 = this.audioContext!.createGain();
      gain3.gain.value = 0;
      gain3.gain.linearRampToValueAtTime(0.02 / (i + 1), this.audioContext!.currentTime + 3 + (i * 0.5));

      // Add subtle vibrato for organic feel
      const vibrato = this.audioContext!.createOscillator();
      vibrato.frequency.value = 3 + (i * 0.5);
      const vibratoGain = this.audioContext!.createGain();
      vibratoGain.gain.value = 2.5; // Increased modulation depth
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc1.frequency);

      // Add tremolo (amplitude modulation)
      const tremolo = this.audioContext!.createOscillator();
      tremolo.frequency.value = 0.5 + (i * 0.2);
      const tremoloGain = this.audioContext!.createGain();
      tremoloGain.gain.value = 0.02;
      tremolo.connect(tremoloGain);
      tremoloGain.connect(gain1.gain);

      // Connect oscillators
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(this.gainNode!);
      gain2.connect(this.gainNode!);
      gain3.connect(this.gainNode!);

      // Start all
      osc1.start();
      osc2.start();
      osc3.start();
      vibrato.start();
      tremolo.start();

      this.oscillators.push(osc1, osc2, osc3, vibrato, tremolo);
    });
  }

  playSynthPad(volume: number = 0.5) {
    this.stop();
    if (!this.audioContext || !this.gainNode) return;

    this.setVolume(volume * 0.35);

    // A minor chord (A, C, E) with rich harmonics
    const baseFreqs = [
      { freq: 110, ratio: 1.0 },    // A2
      { freq: 130.81, ratio: 0.8 }, // C3
      { freq: 164.81, ratio: 0.6 }  // E3
    ];

    baseFreqs.forEach((note, noteIndex) => {
      // Create multiple harmonics for warmth
      [1, 2, 3, 4, 5, 6].forEach((harmonic, i) => {
        const osc = this.audioContext!.createOscillator();
        
        // Mix sine and triangle for warmth
        osc.type = i < 2 ? 'triangle' : 'sine';
        osc.frequency.value = note.freq * harmonic;

        // Create gentle filter for each harmonic
        const filter = this.audioContext!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        filter.Q.value = 0.5;

        const oscGain = this.audioContext!.createGain();
        // Soft attack with staggered timing
        const targetGain = (note.ratio * 0.08) / (i + 1);
        oscGain.gain.value = 0;
        oscGain.gain.linearRampToValueAtTime(
          targetGain, 
          this.audioContext!.currentTime + 3 + (noteIndex * 0.5) + (i * 0.2)
        );

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start();

        this.oscillators.push(osc);
        this.filters.push(filter);
      });

      // Add slow LFO for subtle filter movement
      const filterLfo = this.audioContext!.createOscillator();
      filterLfo.frequency.value = 0.03 + (noteIndex * 0.01);
      const filterLfoGain = this.audioContext!.createGain();
      filterLfoGain.gain.value = 200; // Modulate filter frequency
      filterLfo.connect(filterLfoGain);
      
      // Connect to all filters of this note
      this.filters.slice(-6).forEach(filter => {
        filterLfoGain.connect(filter.frequency);
      });
      
      filterLfo.start();

      // Add amplitude LFO for breathing effect
      const ampLfo = this.audioContext!.createOscillator();
      ampLfo.frequency.value = 0.05 + (noteIndex * 0.02);
      const ampLfoGain = this.audioContext!.createGain();
      ampLfoGain.gain.value = 0.015; // Subtle breathing
      ampLfo.connect(ampLfoGain);
      ampLfo.start();

      this.oscillators.push(filterLfo, ampLfo);
    });
  }

  destroy() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// ==================== PROVIDER ====================

interface AmbientSoundProviderProps {
  children: ReactNode;
}

export function AmbientSoundProvider({ children }: AmbientSoundProviderProps) {
  const [selectedSound, setSelectedSound] = useState<AmbientSound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientVolume, setAmbientVolumeState] = useState(50);
  const [voiceVolume, setVoiceVolumeState] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isDuckingState, setIsDuckingState] = useState(false); // Track ducking state
  const [viewMode, setViewMode] = useState<AmbientViewMode>('grid');
  const [showMixer, setShowMixer] = useState(false);

  const generatorRef = useRef<AmbientSoundGenerator | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize sound generator
  useEffect(() => {
    if (!generatorRef.current) {
      generatorRef.current = new AmbientSoundGenerator();
      setAnalyserNode(generatorRef.current.getAnalyserNode());
      setAudioContext(generatorRef.current.getAudioContext());
    }

    return () => {
      if (generatorRef.current) {
        generatorRef.current.destroy();
        generatorRef.current = null;
      }
    };
  }, []);

  // Play sound when selected
  useEffect(() => {
    if (!selectedSound || !isPlaying || !generatorRef.current) {
      if (generatorRef.current) {
        generatorRef.current.stop();
      }
      return;
    }

    const volume = isMuted ? 0 : ambientVolume / 100;
    const generator = generatorRef.current;

    switch (selectedSound.id) {
      case 'rain':
        generator.playRain(volume);
        break;
      case 'ocean':
        generator.playOcean(volume);
        break;
      case 'wind':
        generator.playWind(volume);
        break;
      case 'bells':
        generator.playBells(volume);
        break;
      case 'forest':
        generator.playForest(volume);
        break;
      case 'music':
        generator.playSynthPad(volume);
        break;
    }
  }, [selectedSound, isPlaying, ambientVolume, isMuted]);

  // Update volume in real-time
  useEffect(() => {
    if (generatorRef.current && isPlaying) {
      const volume = isMuted ? 0 : ambientVolume / 100;
      generatorRef.current.setVolume(volume);
    }
  }, [ambientVolume, isMuted, isPlaying]);

  // Memoized action functions to prevent unnecessary re-renders
  const selectSound = useCallback((sound: AmbientSound | null) => {
    setSelectedSound(sound);
    // Removed auto-play - user must explicitly press play
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const setAmbientVolume = useCallback((volume: number) => {
    setAmbientVolumeState(volume);
  }, []);

  const setVoiceVolume = useCallback((volume: number) => {
    setVoiceVolumeState(volume);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const setDuckingCallback = useCallback((active: boolean) => {
    if (generatorRef.current) {
      generatorRef.current.setDucking(active);
    }
    setIsDuckingState(active); // Update ducking state in context
  }, []);

  const value: AmbientSoundContextType = {
    selectedSound,
    isPlaying,
    ambientVolume,
    voiceVolume,
    isMuted,
    isDucking: isDuckingState, // Include ducking state in context
    viewMode,
    showMixer,
    analyserNode,
    audioContext,
    selectSound,
    togglePlayPause,
    setAmbientVolume,
    setVoiceVolume,
    toggleMute,
    setViewMode,
    setShowMixer,
    setDucking: setDuckingCallback,
    soundGenerator: generatorRef.current
  };

  return (
    <AmbientSoundContext.Provider value={value}>
      {children}
    </AmbientSoundContext.Provider>
  );
}

export function useAmbientSound() {
  const context = useContext(AmbientSoundContext);
  if (context === undefined) {
    throw new Error('useAmbientSound must be used within an AmbientSoundProvider');
  }
  return context;
}