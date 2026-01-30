/**
 * Atmosphere Context for Quiet Space
 * Manages ambient atmosphere modes, emotional states, and adaptive settings
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

console.log('✅ AtmosphereContext module loading...');

export type AtmosphereMode = 'dawn' | 'day' | 'twilight' | 'night' | 'void';
export type MicroState = 'still-water' | 'rising-light' | 'inner-fire' | 'vast-sky' | 'hidden-forest' | null;
export type EmotionalState = 'stress' | 'sadness' | 'anxiety' | 'calm' | 'joy' | 'neutral';

interface AtmosphereContextType {
  mode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
  autoMode: boolean;
  setAutoMode: (auto: boolean) => void;
  emotionalState: EmotionalState;
  setEmotionalState: (state: EmotionalState) => void;
  microState: MicroState;
  setMicroState: (state: MicroState) => void;
  faithAmbiance: string | null;
  setFaithAmbiance: (faith: string | null) => void;
}

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (!context) {
    throw new Error('useAtmosphere must be used within AtmosphereProvider');
  }
  return context;
}

interface AtmosphereProviderProps {
  children: ReactNode;
}

/**
 * Get time-based atmosphere mode
 */
function getTimeBasedMode(): AtmosphereMode {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return 'dawn';
  if (hour >= 9 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'twilight';
  return 'night';
}

export function AtmosphereProvider({ children }: AtmosphereProviderProps) {
  const [mode, setMode] = useState<AtmosphereMode>(getTimeBasedMode());
  const [autoMode, setAutoMode] = useState(true);
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('neutral');
  const [microState, setMicroState] = useState<MicroState>(null);
  const [faithAmbiance, setFaithAmbiance] = useState<string | null>(null);

  // Auto-update mode based on time if autoMode is enabled
  useEffect(() => {
    if (!autoMode) return;

    const updateMode = () => {
      setMode(getTimeBasedMode());
    };

    // Update every minute
    const interval = setInterval(updateMode, 60000);
    updateMode(); // Initial update

    return () => clearInterval(interval);
  }, [autoMode]);

  const value = {
    mode,
    setMode,
    autoMode,
    setAutoMode,
    emotionalState,
    setEmotionalState,
    microState,
    setMicroState,
    faithAmbiance,
    setFaithAmbiance,
  };

  return (
    <AtmosphereContext.Provider value={value}>
      {children}
    </AtmosphereContext.Provider>
  );
}

/**
 * Get gradient style for atmosphere mode
 */
export function getAtmosphereGradient(mode: AtmosphereMode): string {
  switch (mode) {
    case 'dawn':
      return 'linear-gradient(135deg, #FFE5B4 0%, #FFD369 25%, #E5B8F4 60%, #C8A1E0 100%)';
    case 'day':
      return 'linear-gradient(135deg, #E3F2FD 0%, #B3E5FC 40%, #81D4FA 70%, #4FC3F7 100%)';
    case 'twilight':
      return 'linear-gradient(135deg, #E1BEE7 0%, #9C27B0 30%, #7A4FFF 60%, #512DA8 100%)';
    case 'night':
      return 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 40%, #0a0a1f 70%, #000000 100%)';
    case 'void':
      return 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)';
  }
}

/**
 * Get glow color for atmosphere mode
 */
export function getAtmosphereGlow(mode: AtmosphereMode): string {
  switch (mode) {
    case 'dawn':
      return 'rgba(255, 211, 105, 0.6)';
    case 'day':
      return 'rgba(129, 212, 250, 0.6)';
    case 'twilight':
      return 'rgba(122, 79, 255, 0.6)';
    case 'night':
      return 'rgba(184, 184, 209, 0.6)';
    case 'void':
      return 'rgba(255, 255, 255, 0.4)';
  }
}

/**
 * Get particle color for atmosphere mode
 */
export function getAtmosphereParticleColor(mode: AtmosphereMode): string {
  switch (mode) {
    case 'dawn':
      return '#FFD369';
    case 'day':
      return '#E3F2FD';
    case 'twilight':
      return '#E1BEE7';
    case 'night':
      return '#B8B8D1';
    case 'void':
      return '#FFFFFF';
  }
}