/**
 * Faith-based Mantras and Prayers Configuration
 * Provides culturally appropriate mantras, prayers, and affirmations for each faith tradition
 */

export interface FaithMantra {
  id: string;
  text: string;
  translation?: string;
  tradition: string;
  category: 'mantra' | 'prayer' | 'affirmation';
}

/**
 * Comprehensive collection of faith-based mantras and prayers
 */
export const FAITH_MANTRAS: Record<string, FaithMantra[]> = {
  Buddhism: [
    {
      id: 'om-mani',
      text: 'Om Mani Padme Hum',
      translation: 'The jewel is in the lotus',
      tradition: 'Buddhism',
      category: 'mantra'
    },
    {
      id: 'gate-gate',
      text: 'Gate Gate Paragate Parasamgate Bodhi Svaha',
      translation: 'Gone, gone, gone beyond, awakening',
      tradition: 'Buddhism',
      category: 'mantra'
    },
    {
      id: 'breathing-buddha',
      text: 'Breathing in, I calm my body. Breathing out, I smile.',
      tradition: 'Buddhism',
      category: 'affirmation'
    },
    {
      id: 'present-moment',
      text: 'I am present in this moment',
      tradition: 'Buddhism',
      category: 'affirmation'
    }
  ],
  
  Christianity: [
    {
      id: 'jesus-prayer',
      text: 'Lord Jesus Christ, have mercy on me',
      tradition: 'Christianity',
      category: 'prayer'
    },
    {
      id: 'lords-prayer-short',
      text: 'Our Father, who art in heaven, hallowed be thy name',
      tradition: 'Christianity',
      category: 'prayer'
    },
    {
      id: 'peace-prayer',
      text: 'Peace be with me, peace be with all',
      tradition: 'Christianity',
      category: 'prayer'
    },
    {
      id: 'psalm-23',
      text: 'The Lord is my shepherd, I shall not want',
      tradition: 'Christianity',
      category: 'prayer'
    }
  ],
  
  Islam: [
    {
      id: 'dhikr-allah',
      text: 'Allāhu Akbar',
      translation: 'God is the Greatest',
      tradition: 'Islam',
      category: 'mantra'
    },
    {
      id: 'subhanallah',
      text: 'SubḥānAllāh',
      translation: 'Glory be to God',
      tradition: 'Islam',
      category: 'mantra'
    },
    {
      id: 'alhamdulillah',
      text: 'Alḥamdulillāh',
      translation: 'All praise is due to God',
      tradition: 'Islam',
      category: 'mantra'
    },
    {
      id: 'la-ilaha',
      text: 'Lā ilāha illā Allāh',
      translation: 'There is no god but God',
      tradition: 'Islam',
      category: 'mantra'
    }
  ],
  
  Hinduism: [
    {
      id: 'om',
      text: 'Om',
      translation: 'The sound of the universe',
      tradition: 'Hinduism',
      category: 'mantra'
    },
    {
      id: 'gayatri',
      text: 'Om Bhur Bhuvaḥ Swaḥ',
      translation: 'We meditate on the glory of the Creator',
      tradition: 'Hinduism',
      category: 'mantra'
    },
    {
      id: 'om-shanti',
      text: 'Om Shanti Shanti Shanti',
      translation: 'Om, peace, peace, peace',
      tradition: 'Hinduism',
      category: 'mantra'
    },
    {
      id: 'so-ham',
      text: 'So Ham',
      translation: 'I am That',
      tradition: 'Hinduism',
      category: 'mantra'
    }
  ],
  
  Judaism: [
    {
      id: 'shema',
      text: 'Shema Yisrael, Adonai Eloheinu, Adonai Echad',
      translation: 'Hear O Israel, the Lord is our God, the Lord is One',
      tradition: 'Judaism',
      category: 'prayer'
    },
    {
      id: 'modeh-ani',
      text: 'Modeh Ani Lefanecha',
      translation: 'I give thanks before You',
      tradition: 'Judaism',
      category: 'prayer'
    },
    {
      id: 'shalom',
      text: 'Shalom, Shalom',
      translation: 'Peace, Peace',
      tradition: 'Judaism',
      category: 'prayer'
    },
    {
      id: 'baruch',
      text: 'Baruch Atah Adonai',
      translation: 'Blessed are You, Lord',
      tradition: 'Judaism',
      category: 'prayer'
    }
  ],
  
  Sikhism: [
    {
      id: 'waheguru',
      text: 'Waheguru',
      translation: 'Wonderful Lord',
      tradition: 'Sikhism',
      category: 'mantra'
    },
    {
      id: 'ik-onkar',
      text: 'Ik Onkar',
      translation: 'One Universal Creator',
      tradition: 'Sikhism',
      category: 'mantra'
    },
    {
      id: 'sat-nam',
      text: 'Sat Nam',
      translation: 'Truth is my identity',
      tradition: 'Sikhism',
      category: 'mantra'
    },
    {
      id: 'waheguru-ji-ka',
      text: 'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh',
      translation: 'The Khalsa belongs to God, Victory belongs to God',
      tradition: 'Sikhism',
      category: 'mantra'
    }
  ],
  
  Taoism: [
    {
      id: 'tao-te',
      text: 'The Tao that can be told is not the eternal Tao',
      tradition: 'Taoism',
      category: 'affirmation'
    },
    {
      id: 'wu-wei',
      text: 'I flow with effortless action',
      tradition: 'Taoism',
      category: 'affirmation'
    },
    {
      id: 'yin-yang',
      text: 'In stillness, I find balance',
      tradition: 'Taoism',
      category: 'affirmation'
    },
    {
      id: 'naturalness',
      text: 'I return to my natural state',
      tradition: 'Taoism',
      category: 'affirmation'
    }
  ],
  
  Shinto: [
    {
      id: 'purification',
      text: 'Harae-do, cleanse and purify',
      tradition: 'Shinto',
      category: 'prayer'
    },
    {
      id: 'gratitude',
      text: 'I give thanks to the kami',
      tradition: 'Shinto',
      category: 'prayer'
    },
    {
      id: 'harmony',
      text: 'I live in harmony with nature',
      tradition: 'Shinto',
      category: 'affirmation'
    },
    {
      id: 'purity',
      text: 'May my heart be pure',
      tradition: 'Shinto',
      category: 'prayer'
    }
  ],
  
  Jainism: [
    {
      id: 'navkar',
      text: 'Namo Arihantānam',
      translation: 'I bow to the enlightened souls',
      tradition: 'Jainism',
      category: 'mantra'
    },
    {
      id: 'ahimsa',
      text: 'I practice non-violence in thought, word, and deed',
      tradition: 'Jainism',
      category: 'affirmation'
    },
    {
      id: 'forgiveness',
      text: 'Micchāmi Dukkaḍam - May all my wrongdoings be forgiven',
      tradition: 'Jainism',
      category: 'prayer'
    },
    {
      id: 'peace',
      text: 'Shanti, Shanti, Shanti',
      translation: 'Peace, Peace, Peace',
      tradition: 'Jainism',
      category: 'mantra'
    }
  ],
  
  Confucianism: [
    {
      id: 'jen',
      text: 'I cultivate benevolence and compassion',
      tradition: 'Confucianism',
      category: 'affirmation'
    },
    {
      id: 'li',
      text: 'I act with propriety and respect',
      tradition: 'Confucianism',
      category: 'affirmation'
    },
    {
      id: 'harmony',
      text: 'In harmony with others, I find peace',
      tradition: 'Confucianism',
      category: 'affirmation'
    },
    {
      id: 'virtue',
      text: 'I walk the path of virtue',
      tradition: 'Confucianism',
      category: 'affirmation'
    }
  ],
  
  'Bahá\'í': [
    {
      id: 'greatest-name',
      text: 'Yá Bahá\'u\'l-Abhá',
      translation: 'O Glory of Glories',
      tradition: 'Bahá\'í',
      category: 'prayer'
    },
    {
      id: 'unity',
      text: 'All are leaves of one tree, all are drops of one ocean',
      tradition: 'Bahá\'í',
      category: 'affirmation'
    },
    {
      id: 'remover-difficulties',
      text: 'Is there any Remover of difficulties save God?',
      tradition: 'Bahá\'í',
      category: 'prayer'
    },
    {
      id: 'light',
      text: 'I am a light in this world',
      tradition: 'Bahá\'í',
      category: 'affirmation'
    }
  ],
  
  Universal: [
    {
      id: 'breath',
      text: 'Breathing in peace, breathing out love',
      tradition: 'Universal',
      category: 'affirmation'
    },
    {
      id: 'present',
      text: 'I am here, I am now, I am enough',
      tradition: 'Universal',
      category: 'affirmation'
    },
    {
      id: 'gratitude',
      text: 'I am grateful for this moment',
      tradition: 'Universal',
      category: 'affirmation'
    },
    {
      id: 'peace',
      text: 'Peace begins with me',
      tradition: 'Universal',
      category: 'affirmation'
    },
    {
      id: 'love',
      text: 'I am love, I am light',
      tradition: 'Universal',
      category: 'affirmation'
    }
  ]
};

/**
 * Get mantras for a specific faith tradition
 */
export function getMantrasForFaith(faith: string): FaithMantra[] {
  // Try exact match first
  if (FAITH_MANTRAS[faith]) {
    return FAITH_MANTRAS[faith];
  }
  
  // Try partial match (e.g., "Sunni Islam" matches "Islam")
  for (const [key, mantras] of Object.entries(FAITH_MANTRAS)) {
    if (faith.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(faith.toLowerCase())) {
      return mantras;
    }
  }
  
  // Default to Universal
  return FAITH_MANTRAS.Universal;
}

/**
 * Get a random mantra from a faith tradition
 */
export function getRandomMantra(faith: string): FaithMantra {
  const mantras = getMantrasForFaith(faith);
  return mantras[Math.floor(Math.random() * mantras.length)];
}

/**
 * Get all available faith traditions that have mantras
 */
export function getAvailableFaithsWithMantras(): string[] {
  return Object.keys(FAITH_MANTRAS);
}
