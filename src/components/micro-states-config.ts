/**
 * Micro-States Configuration
 * Preset ambient vibes for different experiences
 */

import { AtmosphereMode, MicroState } from './atmosphere-context';

export interface MicroStateConfig {
  id: MicroState;
  name: string;
  description: string;
  gradient: string;
  particlePattern: 'default' | 'wave' | 'beams' | 'fire' | 'stars';
  soundscape: string;
  breathPattern: string;
  affirmation: string;
  particleColor: string;
  atmosphereOverride?: AtmosphereMode;
}

export const microStates: MicroStateConfig[] = [
  {
    id: 'still-water',
    name: 'Still Water',
    description: 'Like a calm lake at dawn',
    gradient: 'linear-gradient(90deg, #0a4d68 0%, #05bfa0 50%, #0a4d68 100%)',
    particlePattern: 'wave',
    soundscape: 'ocean',
    breathPattern: 'resonance',
    affirmation: 'Like water, I am fluid and at peace',
    particleColor: '#05bfa0'
  },
  {
    id: 'rising-light',
    name: 'Rising Light',
    description: 'Awakening with clarity',
    gradient: 'linear-gradient(180deg, #FFE5B4 0%, #FFD369 40%, #FFA500 100%)',
    particlePattern: 'beams',
    soundscape: 'bells',
    breathPattern: 'energizing',
    affirmation: 'I rise with clarity and purpose',
    particleColor: '#FFD369',
    atmosphereOverride: 'dawn'
  },
  {
    id: 'inner-fire',
    name: 'Inner Fire',
    description: 'Your spirit burns bright',
    gradient: 'radial-gradient(circle, #FF6B35 0%, #F7931E 40%, #C1440E 100%)',
    particlePattern: 'fire',
    soundscape: 'music',
    breathPattern: 'energizing',
    affirmation: 'My spirit burns bright',
    particleColor: '#FF6B35'
  },
  {
    id: 'vast-sky',
    name: 'Vast Sky',
    description: 'Infinite and limitless',
    gradient: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3a 40%, #2a2a5a 70%, #3a3a7a 100%)',
    particlePattern: 'stars',
    soundscape: 'wind',
    breathPattern: 'calm',
    affirmation: 'I am infinite. I am limitless.',
    particleColor: '#B8B8D1',
    atmosphereOverride: 'night'
  },
  {
    id: 'hidden-forest',
    name: 'Hidden Forest',
    description: 'Grounded in earth\'s embrace',
    gradient: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 50%, #0f2419 100%)',
    particlePattern: 'default',
    soundscape: 'forest',
    breathPattern: 'box',
    affirmation: 'I am rooted. I am whole.',
    particleColor: '#4d8c5f'
  }
];

export function getMicroState(id: MicroState): MicroStateConfig | undefined {
  return microStates.find(state => state.id === id);
}
