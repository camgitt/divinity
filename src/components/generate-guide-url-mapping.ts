/**
 * Generate Guide URL Mapping from Master CSV
 * 
 * This utility reads the DivinityAGI_Master_Guide_Database.csv and generates
 * a complete mapping of all guides to their D-ID chat URLs.
 * 
 * URL Pattern: https://link.divinityagi.com/{faith-tradition}-{number}
 * 
 * Example: 
 * - christianity-1, christianity-2, christianity-3...
 * - hinduism-1, hinduism-2, hinduism-3...
 * - buddhism-1, buddhism-2, buddhism-3...
 */

import { GuideChatMapping } from './guide-chat-url-mapping';

/**
 * Faith tradition to URL prefix mapping
 */
const FAITH_URL_PREFIX_MAP: Record<string, string> = {
  'Christianity': 'christianity',
  'Sunni Islam': 'islam',
  'Sufi Islam': 'islam',
  'Shia Islam': 'islam',
  'Islam': 'islam',
  'Judaism': 'judaism',
  'Buddhism': 'buddhism',
  'Hinduism': 'hinduism',
  'Sikhism': 'sikhism',
  'Bahá\'í Faith': 'bahai',
  'Taoism': 'taoism',
  'Daoism': 'taoism',
  'Confucianism': 'confucianism',
  'Shinto': 'shinto',
  'Jainism': 'jainism',
  'Norse Polytheism': 'norse',
  'Greek Polytheism': 'greek',
  'Egyptian Polytheism': 'egyptian',
  'Yoruba / Ifa': 'yoruba',
  'Indigenous': 'indigenous',
  'Universal': 'universal',
  'Universal / Indigenous': 'universal',
  'Polytheism': 'polytheism'
};

/**
 * Counter for each faith tradition to assign sequential numbers
 */
const faithCounters: Record<string, number> = {};

/**
 * Generate chat URL for a guide based on faith tradition
 * Uses sequential numbering per faith tradition
 */
export function generateChatUrl(faith: string): string {
  // Normalize the faith name
  const urlPrefix = FAITH_URL_PREFIX_MAP[faith] || faith.toLowerCase().replace(/\s+/g, '-');
  
  // Initialize counter for this faith if it doesn't exist
  if (!faithCounters[urlPrefix]) {
    faithCounters[urlPrefix] = 1;
  }
  
  // Generate URL with sequential number
  const url = `https://link.divinityagi.com/${urlPrefix}-${faithCounters[urlPrefix]}`;
  
  // Increment counter for next guide in this faith
  faithCounters[urlPrefix]++;
  
  return url;
}

/**
 * Reset all faith counters (useful for re-generation)
 */
export function resetFaithCounters(): void {
  Object.keys(faithCounters).forEach(key => {
    delete faithCounters[key];
  });
}

/**
 * Master guide database entries from CSV
 * This should match the structure of DivinityAGI_Master_Guide_Database.csv
 */
export const MASTER_GUIDE_CSV_ENTRIES: Array<{
  id: string;
  name: string;
  faith: string;
  role: string;
  chatUrl?: string;
}> = [
  // CHRISTIANITY
  { id: 'christian-pope', name: 'Pope Francis', faith: 'Christianity', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/christianity-1' },
  { id: 'pastor-david', name: 'Pastor David', faith: 'Christianity', role: 'Mentor', chatUrl: 'https://link.divinityagi.com/christianity-2' },
  { id: 'sister-isabella-rossi', name: 'Sister Isabella Rossi', faith: 'Christianity', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/christianity-3' },
  { id: 'lds-elder-smith', name: 'Elder Smith Jr.', faith: 'Christianity', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/christianity-4' },
  { id: 'catholic-father-brian', name: 'Father Brian', faith: 'Christianity', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/christianity-5' },
  { id: 'saint-francis-assisi', name: 'Saint Francis', faith: 'Christianity', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/christianity-6' },
  
  // JUDAISM
  { id: 'orthodox-rabbi-eliyahu', name: 'Rabbi Eliyahu Stein', faith: 'Judaism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/judaism-1' },
  { id: 'conservative-rabbi-miriam', name: 'Rabbi Miriam Levin', faith: 'Judaism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/judaism-2' },
  { id: 'hasidic-rabbi-shmuel', name: 'Rabbi Shmuel Ben Eliezer', faith: 'Judaism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/judaism-3' },
  { id: 'reform-rabbi-david', name: 'Rabbi David Levin', faith: 'Judaism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/judaism-4' },
  { id: 'reconstructionist-leah-brenner', name: 'Leah Brenner', faith: 'Judaism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/judaism-5' },
  
  // ISLAM
  { id: 'sunni-sheikh-yusuf', name: 'Sheikh Yusuf ibn Ahmad', faith: 'Sunni Islam', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/islam-1' },
  { id: 'sufi-sheikh-rahman', name: 'Sheikh Rahman al-Huda', faith: 'Sufi Islam', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/islam-2' },
  { id: 'shia-sayyid-hassan', name: 'Sayyid Hassan al-Rida', faith: 'Shia Islam', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/islam-3' },
  
  // BUDDHISM
  { id: 'buddhism-pure-land-sensei-shinran', name: 'Sensei Shinran', faith: 'Buddhism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/buddhism-1' },
  { id: 'buddhism-nichiren-daishi-ren', name: 'Daishi Ren', faith: 'Buddhism', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/buddhism-2' },
  { id: 'buddhism-theravada-venerable-ananda', name: 'Venerable Ananda', faith: 'Buddhism', role: 'Teacher', chatUrl: 'https://link.divinityagi.com/buddhism-3' },
  { id: 'buddhism-mahayana-lama-ananda', name: 'Lama Ananda', faith: 'Buddhism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/buddhism-4' },
  { id: 'buddhism-vajrayana-lama-dorje', name: 'Lama Dorje', faith: 'Buddhism', role: 'Adept', chatUrl: 'https://link.divinityagi.com/buddhism-5' },
  { id: 'buddhism-zen-roshi-koan', name: 'Roshi Koan', faith: 'Buddhism', role: 'Teacher', chatUrl: 'https://link.divinityagi.com/buddhism-6' },
  
  // HINDUISM
  { id: 'hindu-anika', name: 'Anika', faith: 'Hinduism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/hinduism-1' },
  { id: 'hindu-shakti', name: 'Shakti Devi', faith: 'Hinduism', role: 'Healer', chatUrl: 'https://link.divinityagi.com/hinduism-2' },
  { id: 'hindu-bhairav', name: 'Bhairav', faith: 'Hinduism', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/hinduism-3' },
  { id: 'hindu-advaith', name: 'Advaith', faith: 'Hinduism', role: 'Scholar', chatUrl: 'https://link.divinityagi.com/hinduism-4' },
  { id: 'mata-amritanandamayi', name: 'Mata Amritanandamayi (Amma)', faith: 'Hinduism', role: 'Healer', chatUrl: 'https://link.divinityagi.com/hindu-amma-1' },
  
  // BAHA'I FAITH
  { id: 'bahai-reform-leila-farzan', name: 'Dr. Leila Farzan', faith: 'Bahá\'í Faith', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/bahai-1' },
  { id: 'bahai-traditional-navid-rahmani', name: 'Navid Rahmani', faith: 'Bahá\'í Faith', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/bahai-2' },
  { id: 'bahai-abdulbaha-farid-anvari', name: 'Farid Anvari', faith: 'Bahá\'í Faith', role: 'Mentor', chatUrl: 'https://link.divinityagi.com/bahai-3' },
  
  // SIKHISM
  { id: 'sikh-harjit-singh', name: 'Bhai Harjit Singh', faith: 'Sikhism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/sikhism-1' },
  { id: 'sikh-amritpal-singh', name: 'Bhai Amritpal Singh', faith: 'Sikhism', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/sikhism-2' },
  { id: 'namdhari-satguru-ram-singh', name: 'Satguru Ram Singh', faith: 'Sikhism', role: 'Servant-Leader', chatUrl: 'https://link.divinityagi.com/sikhism-3' },
  
  // TAOISM
  { id: 'taoist-master', name: 'Master Li Shen', faith: 'Taoism', role: 'Mentor', chatUrl: 'https://link.divinityagi.com/taoism-1' },
  { id: 'taoist-mei-ling', name: 'Mei Ling', faith: 'Taoism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/taoism-2' },
  { id: 'taoist-xu-yunyao', name: 'Xu Yunyao', faith: 'Taoism', role: 'Adept', chatUrl: 'https://link.divinityagi.com/taoism-5' },
  { id: 'taoist-gao-lian', name: 'Gao Lian', faith: 'Taoism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/taoism-6' },
  { id: 'taoist-liang-zhen', name: 'Liang Zhen', faith: 'Taoism', role: 'Sage Master', chatUrl: 'https://link.divinityagi.com/taoism-4' },
  
  // CONFUCIANISM
  { id: 'confucian-scholar', name: 'Zhou Wei', faith: 'Confucianism', role: 'Teacher', chatUrl: 'https://link.divinityagi.com/confucianism-1' },
  
  // SHINTO
  { id: 'shinto-priest', name: 'Hikari no Mori', faith: 'Shinto', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/shinto-1' },
  { id: 'shinto-institutional-haruto-takamori', name: 'Haruto Takamori', faith: 'Shinto', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/shinto-2' },
  { id: 'shinto-new-religions-ayaka-hoshino', name: 'Ayaka Hoshino', faith: 'Shinto', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/shinto-3' },
  { id: 'shinto-folk-kenta-moriyama', name: 'Kenta Moriyama', faith: 'Shinto', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/shinto-4' },
  { id: 'shinto-imperial-emperor-meiji', name: 'Emperor Meiji', faith: 'Shinto', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/shinto-5' },
  
  // JAINISM
  { id: 'jain-acharya', name: 'Ācārya Satyaprabha', faith: 'Jainism', role: 'Scholar', chatUrl: 'https://link.divinityagi.com/jainism-1' },
  { id: 'jain-sadhvi-pratibha', name: 'Sādhvī Pratibha', faith: 'Jainism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/jainism-2' },
  { id: 'jainism-terapanth-acharya-anand', name: 'Ācārya Ānand', faith: 'Jainism', role: 'Scholar', chatUrl: 'https://link.divinityagi.com/jainism-3' },
  { id: 'jain-terapanth-acharya-pratibha', name: 'Ācārya Pratibha', faith: 'Jainism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/jainism-4' },
  
  // POLYTHEISM / UNIVERSAL
  { id: 'norse-odin', name: 'Odin Allfather', faith: 'Norse Polytheism', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/norse-1' },
  { id: 'greek-zeus', name: 'Zeus King of Olympus', faith: 'Greek Polytheism', role: 'Warrior-Guide', chatUrl: 'https://link.divinityagi.com/greek-1' },
  { id: 'egyptian-ra', name: 'Ra Lord of the Sun', faith: 'Egyptian Polytheism', role: 'Spiritual Guide', chatUrl: 'https://link.divinityagi.com/egyptian-1' },
  { id: 'priestess-oshun', name: 'Priestess Oshun', faith: 'Yoruba / Ifa', role: 'Healer', chatUrl: 'https://link.divinityagi.com/universal-2' },
];

/**
 * Build the complete guide chat URL mapping from the master CSV
 */
export function buildCompleteMappingFromCSV(): Record<string, GuideChatMapping> {
  const mapping: Record<string, GuideChatMapping> = {};
  
  MASTER_GUIDE_CSV_ENTRIES.forEach(entry => {
    mapping[entry.id] = {
      guideId: entry.id,
      guideName: entry.name,
      faith: entry.faith,
      chatUrl: entry.chatUrl || generateChatUrl(entry.faith)
    };
  });
  
  return mapping;
}
