/**
 * Mantra Playlists Configuration
 * Themed collections of mantras organized by purpose and energy
 */

import { FAITH_MANTRAS, FaithMantra } from "./faith-mantras-config";

export interface MantraPlaylist {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  mantras: FaithMantra[];
}

/**
 * Get mantras by IDs from the faith mantras collection
 */
function getMantrasByIds(ids: string[]): FaithMantra[] {
  const allMantras: FaithMantra[] = [];
  
  // Flatten all mantras from all faiths
  Object.values(FAITH_MANTRAS).forEach(faithMantras => {
    allMantras.push(...faithMantras);
  });
  
  // Filter by IDs
  return ids.map(id => allMantras.find(m => m.id === id)).filter(Boolean) as FaithMantra[];
}

/**
 * Curated mantra playlists organized by theme
 */
export const MANTRA_PLAYLISTS: MantraPlaylist[] = [
  {
    id: 'peace-calm',
    name: 'Peace & Calm',
    description: 'Mantras for inner peace and tranquility',
    color: '#51A2FF',
    icon: '🕊️',
    mantras: getMantrasByIds([
      'om-shanti',
      'shalom',
      'peace',
      'breathing-buddha',
      'present-moment',
      'peace-prayer',
      'naturalness',
      'purity',
      'present',
      'wu-wei'
    ])
  },
  
  {
    id: 'gratitude',
    name: 'Gratitude & Thanks',
    description: 'Express thankfulness and appreciation',
    color: '#FFD369',
    icon: '🙏',
    mantras: getMantrasByIds([
      'alhamdulillah',
      'modeh-ani',
      'gratitude',
      'gratitude'
    ])
  },
  
  {
    id: 'compassion-love',
    name: 'Compassion & Love',
    description: 'Cultivate loving-kindness and compassion',
    color: '#FF6B9D',
    icon: '💖',
    mantras: getMantrasByIds([
      'om-mani',
      'breathing-buddha',
      'unity',
      'love',
      'jen'
    ])
  },
  
  {
    id: 'energy-focus',
    name: 'Energy & Focus',
    description: 'Mantras for alertness and concentration',
    color: '#FF8904',
    icon: '⚡',
    mantras: getMantrasByIds([
      'om',
      'waheguru',
      'dhikr-allah',
      'sat-nam',
      'ik-onkar'
    ])
  },
  
  {
    id: 'protection',
    name: 'Protection & Safety',
    description: 'Mantras for spiritual protection',
    color: '#7A4FFF',
    icon: '🛡️',
    mantras: getMantrasByIds([
      'psalm-23',
      'shema',
      'baruch',
      'remover-difficulties',
      'navkar'
    ])
  },
  
  {
    id: 'healing',
    name: 'Healing & Wellness',
    description: 'Mantras for physical and spiritual healing',
    color: '#05DF72',
    icon: '✨',
    mantras: getMantrasByIds([
      'om-shanti',
      'forgiveness',
      'remover-difficulties',
      'purification',
      'breath'
    ])
  },
  
  {
    id: 'divine-connection',
    name: 'Divine Connection',
    description: 'Deepen your connection with the Divine',
    color: '#9810FA',
    icon: '🌟',
    mantras: getMantrasByIds([
      'jesus-prayer',
      'subhanallah',
      'la-ilaha',
      'gayatri',
      'so-ham',
      'waheguru-ji-ka',
      'greatest-name'
    ])
  },
  
  {
    id: 'breath-awareness',
    name: 'Breath Awareness',
    description: 'Mantras synchronized with breathing',
    color: '#00D9FF',
    icon: '🌬️',
    mantras: getMantrasByIds([
      'so-ham',
      'breathing-buddha',
      'breath',
      'present'
    ])
  },
  
  {
    id: 'morning',
    name: 'Morning Practice',
    description: 'Start your day with intention',
    color: '#FFA500',
    icon: '🌅',
    mantras: getMantrasByIds([
      'modeh-ani',
      'om',
      'alhamdulillah',
      'gratitude',
      'light'
    ])
  },
  
  {
    id: 'evening',
    name: 'Evening Reflection',
    description: 'Wind down and reflect',
    color: '#4A5568',
    icon: '🌙',
    mantras: getMantrasByIds([
      'shalom',
      'om-shanti',
      'peace',
      'naturalness',
      'present'
    ])
  },
  
  {
    id: 'universal',
    name: 'Universal Wisdom',
    description: 'Non-denominational spiritual affirmations',
    color: '#9810FA',
    icon: '🌍',
    mantras: getMantrasByIds([
      'breath',
      'present',
      'gratitude',
      'peace',
      'love'
    ])
  },
  
  {
    id: 'forgiveness',
    name: 'Forgiveness & Release',
    description: 'Let go and find peace',
    color: '#B794F4',
    icon: '🕊️',
    mantras: getMantrasByIds([
      'forgiveness',
      'lords-prayer-short',
      'peace-prayer',
      'remover-difficulties'
    ])
  }
];

/**
 * Get a playlist by ID
 */
export function getPlaylistById(id: string): MantraPlaylist | undefined {
  return MANTRA_PLAYLISTS.find(p => p.id === id);
}

/**
 * Get all playlists
 */
export function getAllPlaylists(): MantraPlaylist[] {
  return MANTRA_PLAYLISTS;
}

/**
 * Get playlists by color/mood
 */
export function getPlaylistsByMood(mood: 'calm' | 'energetic' | 'reflective'): MantraPlaylist[] {
  const moodMap = {
    calm: ['peace-calm', 'evening', 'breath-awareness'],
    energetic: ['energy-focus', 'morning', 'divine-connection'],
    reflective: ['gratitude', 'compassion-love', 'forgiveness']
  };
  
  const playlistIds = moodMap[mood] || [];
  return MANTRA_PLAYLISTS.filter(p => playlistIds.includes(p.id));
}

/**
 * Get random mantra from a playlist
 */
export function getRandomMantraFromPlaylist(playlistId: string): FaithMantra | null {
  const playlist = getPlaylistById(playlistId);
  if (!playlist || playlist.mantras.length === 0) return null;
  
  return playlist.mantras[Math.floor(Math.random() * playlist.mantras.length)];
}
