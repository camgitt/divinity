/**
 * Faith-Specific Ambiance Configuration
 * Optional sacred atmospheres for different faith traditions
 */

export interface FaithAmbianceConfig {
  id: string;
  name: string;
  description: string;
  gradientOverlay: string;
  particlePattern: 'beams' | 'geometry' | 'lotus' | 'fire' | 'stars' | 'crescents';
  particleColor: string;
  audioLayer?: string;
  affirmations: string[];
}

export const faithAmbiances: Record<string, FaithAmbianceConfig> = {
  christianity: {
    id: 'christianity',
    name: 'Cathedral Light',
    description: 'Vertical light beams like stained glass rays',
    gradientOverlay: 'linear-gradient(180deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 50%, transparent 100%)',
    particlePattern: 'beams',
    particleColor: '#FFD700',
    audioLayer: 'bells',
    affirmations: [
      'You are blessed and beloved',
      'Grace surrounds you',
      'Peace be with you',
      'You are held in divine love'
    ]
  },
  islam: {
    id: 'islam',
    name: 'Sacred Geometry',
    description: 'Subtle Islamic geometric patterns',
    gradientOverlay: 'linear-gradient(135deg, rgba(0,128,128,0.1) 0%, rgba(255,215,0,0.1) 100%)',
    particlePattern: 'crescents',
    particleColor: '#008080',
    audioLayer: 'wind',
    affirmations: [
      'Allah is with you',
      'Peace and blessings upon you',
      'Trust in the divine plan',
      'You are protected and guided'
    ]
  },
  buddhism: {
    id: 'buddhism',
    name: 'Temple Stillness',
    description: 'Lotus petals and temple atmosphere',
    gradientOverlay: 'linear-gradient(135deg, rgba(255,111,0,0.1) 0%, rgba(139,69,19,0.1) 100%)',
    particlePattern: 'lotus',
    particleColor: '#FF6F00',
    audioLayer: 'bells',
    affirmations: [
      'Be present in this moment',
      'Release attachment, find peace',
      'Compassion flows through you',
      'The path unfolds before you'
    ]
  },
  hinduism: {
    id: 'hinduism',
    name: 'Sacred Fire',
    description: 'Warm glow like diya lamps',
    gradientOverlay: 'radial-gradient(circle, rgba(255,140,0,0.15) 0%, rgba(255,69,0,0.1) 50%, transparent 100%)',
    particlePattern: 'fire',
    particleColor: '#FF8C00',
    audioLayer: 'bells',
    affirmations: [
      'You are divine consciousness',
      'Om - the universe resides within',
      'Your soul is eternal light',
      'Namaste - the divine in me honors the divine in all'
    ]
  },
  judaism: {
    id: 'judaism',
    name: 'Shabbat Candles',
    description: 'Soft blue-white candlelight',
    gradientOverlay: 'linear-gradient(180deg, rgba(100,149,237,0.15) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
    particlePattern: 'stars',
    particleColor: '#6495ED',
    audioLayer: 'wind',
    affirmations: [
      'Shalom - peace be upon you',
      'You are chosen and cherished',
      'Rest in sacred stillness',
      'The divine presence surrounds you'
    ]
  },
  taoism: {
    id: 'taoism',
    name: 'Flowing Tao',
    description: 'Balance of yin and yang energies',
    gradientOverlay: 'radial-gradient(circle, rgba(100,100,100,0.1) 0%, rgba(200,200,200,0.05) 100%)',
    particlePattern: 'geometry',
    particleColor: '#808080',
    audioLayer: 'wind',
    affirmations: [
      'Flow with the Tao',
      'Balance in all things',
      'Effortless action, natural harmony',
      'The way is within you'
    ]
  },
  sikhism: {
    id: 'sikhism',
    name: 'Divine Light',
    description: 'Golden radiance of the divine',
    gradientOverlay: 'linear-gradient(135deg, rgba(255,165,0,0.15) 0%, rgba(255,215,0,0.1) 100%)',
    particlePattern: 'beams',
    particleColor: '#FFA500',
    audioLayer: 'music',
    affirmations: [
      'Waheguru - the divine teacher guides you',
      'One light illuminates all',
      'Service, humility, devotion',
      'You are blessed beyond measure'
    ]
  },
  jainism: {
    id: 'jainism',
    name: 'Path of Ahimsa',
    description: 'Pure white light of non-violence',
    gradientOverlay: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(240,240,240,0.1) 100%)',
    particlePattern: 'lotus',
    particleColor: '#FFFFFF',
    audioLayer: 'bells',
    affirmations: [
      'Ahimsa - non-violence in thought and action',
      'You are a soul seeking liberation',
      'Purity and peace within',
      'Compassion for all living beings'
    ]
  },
  shinto: {
    id: 'shinto',
    name: 'Sacred Nature',
    description: 'Spirit of the natural world',
    gradientOverlay: 'linear-gradient(135deg, rgba(220,20,60,0.1) 0%, rgba(255,255,255,0.1) 100%)',
    particlePattern: 'stars',
    particleColor: '#DC143C',
    audioLayer: 'forest',
    affirmations: [
      'The kami are present',
      'Harmony with nature and spirit',
      'Purify your heart and mind',
      'Respect and reverence for all'
    ]
  },
  universal: {
    id: 'universal',
    name: 'Cosmic Oneness',
    description: 'Universal spiritual essence',
    gradientOverlay: 'radial-gradient(circle, rgba(122,79,255,0.15) 0%, rgba(156,39,176,0.1) 50%, transparent 100%)',
    particlePattern: 'stars',
    particleColor: '#7A4FFF',
    audioLayer: 'music',
    affirmations: [
      'We are all connected',
      'Love is the universal truth',
      'You are part of the infinite',
      'Spirit transcends all boundaries'
    ]
  }
};

export function getFaithAmbiance(faithId: string): FaithAmbianceConfig | undefined {
  const normalized = faithId.toLowerCase();
  return faithAmbiances[normalized] || faithAmbiances.universal;
}
