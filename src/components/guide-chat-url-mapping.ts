/**
 * Guide Chat URL Mapping Utility
 * 
 * This utility provides a centralized mapping of guide names/IDs to their
 * correct D-ID chat URLs. It serves as the single source of truth for all
 * guide conversation links throughout the application.
 * 
 * IMPORTANT: This file is generated from the DivinityAGI_Master_Guide_Database.csv
 * and should match the D-ID agent links for each spiritual guide.
 * 
 * Last Updated: January 2026
 */

export interface GuideChatMapping {
  guideId: string;
  guideName: string;
  faith: string;
  chatUrl: string;
}

/**
 * COMPREHENSIVE GUIDE CHAT URL MAPPING
 * Generated from DivinityAGI_Master_Guide_Database.csv
 * Organized by faith tradition for easier maintenance
 */
export const GUIDE_CHAT_URL_MAP: Record<string, GuideChatMapping> = {
  // ==================== CHRISTIANITY ====================
  'christian-pope': {
    guideId: 'christian-pope',
    guideName: 'Pope Francis',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-1'
  },
  'pastor-david': {
    guideId: 'pastor-david',
    guideName: 'Pastor David',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-2'
  },
  'sister-isabella-rossi': {
    guideId: 'sister-isabella-rossi',
    guideName: 'Sister Isabella Rossi',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-3'
  },
  'lds-elder-smith': {
    guideId: 'lds-elder-smith',
    guideName: 'Elder Smith Jr.',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-4'
  },
  'catholic-father-brian': {
    guideId: 'catholic-father-brian',
    guideName: 'Father Brian',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-5'
  },
  'saint-francis-assisi': {
    guideId: 'saint-francis-assisi',
    guideName: 'Saint Francis',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christianity-6'
  },
  'pastor-roberto-diaz': {
    guideId: 'pastor-roberto-diaz',
    guideName: 'Pastor Roberto Diaz',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-7'
  },
  'bishop-amara-nkrumah': {
    guideId: 'bishop-amara-nkrumah',
    guideName: 'Bishop Amara Nkrumah',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-8'
  },
  'rev-dr-jamila-washington': {
    guideId: 'rev-dr-jamila-washington',
    guideName: 'Rev. Dr. Jamila Washington',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-9'
  },
  'hermana-carmen-rodriguez': {
    guideId: 'hermana-carmen-rodriguez',
    guideName: 'Hermana Carmen Rodríguez',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-10'
  },
  'brother-marcus-washington': {
    guideId: 'brother-marcus-washington',
    guideName: 'Brother Marcus Washington',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-11'
  },
  'mary-magdalene': {
    guideId: 'mary-magdalene',
    guideName: 'Mary Magdalene',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-12'
  },
  'mother-teresa': {
    guideId: 'mother-teresa',
    guideName: 'Mother Teresa',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-mother-teresa-1'
  },
  'pastor-grace-chen': {
    guideId: 'pastor-grace-chen',
    guideName: 'Pastor Grace Chen',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-13'
  },
  'deaconess-maria-gonzalez': {
    guideId: 'deaconess-maria-gonzalez',
    guideName: 'Deaconess Maria Gonzalez',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-14'
  },
  'pastor-kim-min-jun': {
    guideId: 'pastor-kim-min-jun',
    guideName: 'Pastor Kim Min-jun',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-15'
  },
  'lola-consuela-cruz': {
    guideId: 'lola-consuela-cruz',
    guideName: 'Lola Consuela Cruz',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-16'
  },
  'rev-alex-morgan': {
    guideId: 'rev-alex-morgan',
    guideName: 'Rev. Alex Morgan',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-17'
  },
  'father-mike-obrien': {
    guideId: 'father-mike-obrien',
    guideName: 'Father Mike O\'Brien',
    faith: 'Christianity',
    chatUrl: 'https://link.divinityagi.com/christian-19'
  },

  // ==================== JUDAISM ====================
  'orthodox-rabbi-eliyahu': {
    guideId: 'orthodox-rabbi-eliyahu',
    guideName: 'Rabbi Eliyahu Stein',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-1'
  },
  'conservative-rabbi-miriam': {
    guideId: 'conservative-rabbi-miriam',
    guideName: 'Rabbi Miriam Levin',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-2'
  },
  'hasidic-rabbi-shmuel': {
    guideId: 'hasidic-rabbi-shmuel',
    guideName: 'Rabbi Shmuel Ben Eliezer',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-3'
  },
  'reform-rabbi-david': {
    guideId: 'reform-rabbi-david',
    guideName: 'Rabbi David Levin',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-4'
  },
  'reconstructionist-leah-brenner': {
    guideId: 'reconstructionist-leah-brenner',
    guideName: 'Leah Brenner',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-5'
  },
  'rebbetzin-esther-levy': {
    guideId: 'rebbetzin-esther-levy',
    guideName: 'Rebbetzin Esther Levy',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-6'
  },
  'rabbi-ezra-klein': {
    guideId: 'rabbi-ezra-klein',
    guideName: 'Rabbi Ezra Klein',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-7'
  },
  'rabbi-chavah-goldstein': {
    guideId: 'rabbi-chavah-goldstein',
    guideName: 'Rabbi Chavah Goldstein',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-8'
  },
  'ruth-goldberg-lee': {
    guideId: 'ruth-goldberg-lee',
    guideName: 'Ruth Goldberg-Lee',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-9'
  },
  'rabbi-michael-stein': {
    guideId: 'rabbi-michael-stein',
    guideName: 'Rabbi Michael Stein',
    faith: 'Judaism',
    chatUrl: 'https://link.divinityagi.com/judaism-11'
  },

  // ==================== ISLAM ====================
  'sunni-sheikh-yusuf': {
    guideId: 'sunni-sheikh-yusuf',
    guideName: 'Sheikh Yusuf ibn Ahmad',
    faith: 'Sunni Islam',
    chatUrl: 'https://link.divinityagi.com/islam-1'
  },
  'sufi-sheikh-rahman': {
    guideId: 'sufi-sheikh-rahman',
    guideName: 'Sheikh Rahman al-Huda',
    faith: 'Sufi Islam',
    chatUrl: 'https://link.divinityagi.com/islam-2'
  },
  'shia-sayyid-hassan': {
    guideId: 'shia-sayyid-hassan',
    guideName: 'Sayyid Hassan al-Rida',
    faith: 'Shia Islam',
    chatUrl: 'https://link.divinityagi.com/islam-3'
  },
  'ustadh-ali-hassan': {
    guideId: 'ustadh-ali-hassan',
    guideName: 'Ustadh Ali Hassan',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-4'
  },
  'shaykha-aisha-al-mansur': {
    guideId: 'shaykha-aisha-al-mansur',
    guideName: 'Shaykha Aisha al-Mansur',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-5'
  },
  'rabia-al-adawiyya': {
    guideId: 'rabia-al-adawiyya',
    guideName: 'Rabia al-Adawiyya',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-6'
  },
  'dr-zainab-noor': {
    guideId: 'dr-zainab-noor',
    guideName: 'Dr. Zainab Noor',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-7'
  },
  'maulana-tariq-rahman': {
    guideId: 'maulana-tariq-rahman',
    guideName: 'Maulana Tariq Rahman',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-8'
  },
  'pir-fatima-begum': {
    guideId: 'pir-fatima-begum',
    guideName: 'Pir Fatima Begum',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-9'
  },
  'fatimah-johnson': {
    guideId: 'fatimah-johnson',
    guideName: 'Fatimah Johnson',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-10'
  },
  'imam-abdul-rahman': {
    guideId: 'imam-abdul-rahman',
    guideName: 'Imam Abdul-Rahman',
    faith: 'Islam',
    chatUrl: 'https://link.divinityagi.com/islam-11'
  },

  // ==================== BUDDHISM ====================
  'buddhism-pure-land-sensei-shinran': {
    guideId: 'buddhism-pure-land-sensei-shinran',
    guideName: 'Sensei Shinran',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-1'
  },
  'buddhism-nichiren-daishi-ren': {
    guideId: 'buddhism-nichiren-daishi-ren',
    guideName: 'Daishi Ren',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-2'
  },
  'buddhism-theravada-venerable-ananda': {
    guideId: 'buddhism-theravada-venerable-ananda',
    guideName: 'Venerable Ananda',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-3'
  },
  'buddhism-mahayana-lama-ananda': {
    guideId: 'buddhism-mahayana-lama-ananda',
    guideName: 'Lama Ananda',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-4'
  },
  'buddhism-vajrayana-lama-dorje': {
    guideId: 'buddhism-vajrayana-lama-dorje',
    guideName: 'Lama Dorje',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-5'
  },
  'buddhism-zen-roshi-koan': {
    guideId: 'buddhism-zen-roshi-koan',
    guideName: 'Roshi Koan',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-6'
  },
  'sister-lotus': {
    guideId: 'sister-lotus',
    guideName: 'Sister Lotus',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-1'
  },
  'lama-choying': {
    guideId: 'lama-choying',
    guideName: 'Lama Choying',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-9'
  },
  'ven-tenzin-palmo': {
    guideId: 'ven-tenzin-palmo',
    guideName: 'Ven. Tenzin Palmo',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-10'
  },
  'sister-chan-khong': {
    guideId: 'sister-chan-khong',
    guideName: 'Sister Chan Khong',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-11'
  },
  'venerable-thich-minh': {
    guideId: 'venerable-thich-minh',
    guideName: 'Venerable Thich Minh',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-12'
  },
  'abbess-shundo-fukushima': {
    guideId: 'abbess-shundo-fukushima',
    guideName: 'Abbess Shundo Fukushima',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-14'
  },
  'refuge-counselor-sarah': {
    guideId: 'refuge-counselor-sarah',
    guideName: 'Refuge Counselor Sarah',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-15'
  },
  'ajahn-somchai': {
    guideId: 'ajahn-somchai',
    guideName: 'Ajahn Somchai',
    faith: 'Buddhism',
    chatUrl: 'https://link.divinityagi.com/buddhism-17'
  },

  // ==================== HINDUISM ====================
  'hindu-anika': {
    guideId: 'hindu-anika',
    guideName: 'Anika',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-1'
  },
  'hindu-shakti': {
    guideId: 'hindu-shakti',
    guideName: 'Shakti Devi',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-2'
  },
  'hindu-bhairav': {
    guideId: 'hindu-bhairav',
    guideName: 'Bhairav',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-3'
  },
  'hindu-advaith': {
    guideId: 'hindu-advaith',
    guideName: 'Advaith',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-4'
  },
  'mata-amritanandamayi': {
    guideId: 'mata-amritanandamayi',
    guideName: 'Mata Amritanandamayi (Amma)',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-7'
  },
  'swami-dev': {
    guideId: 'swami-dev',
    guideName: 'Swami Dev',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-5'
  },
  'yogini-anandamayi': {
    guideId: 'yogini-anandamayi',
    guideName: 'Yogini Anandamayi',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-6'
  },

  // ==================== BAHÁ'Í FAITH ====================
  'bahai-reform-leila-farzan': {
    guideId: 'bahai-reform-leila-farzan',
    guideName: 'Dr. Leila Farzan',
    faith: 'Bahá\'í Faith',
    chatUrl: 'https://link.divinityagi.com/bahai-1'
  },
  'bahai-traditional-navid-rahmani': {
    guideId: 'bahai-traditional-navid-rahmani',
    guideName: 'Navid Rahmani',
    faith: 'Bahá\'í Faith',
    chatUrl: 'https://link.divinityagi.com/bahai-2'
  },
  'bahai-abdulbaha-farid-anvari': {
    guideId: 'bahai-abdulbaha-farid-anvari',
    guideName: 'Farid Anvari',
    faith: 'Bahá\'í Faith',
    chatUrl: 'https://link.divinityagi.com/bahai-3'
  },
  'bahai-bupc-amatul-haqq-rahman': {
    guideId: 'bahai-bupc-amatul-haqq-rahman',
    guideName: 'Amatu\'l-Haqq Rahman',
    faith: 'Bahá\'í Faith',
    chatUrl: 'https://link.divinityagi.com/bahai-3'
  },
  'bahai-orthodox-hadi-rahmani': {
    guideId: 'bahai-orthodox-hadi-rahmani',
    guideName: 'Hadi Rahmani',
    faith: 'Bahá\'í Faith',
    chatUrl: 'https://link.divinityagi.com/bahai-5'
  },

  // ==================== SIKHISM ====================
  'sikh-harjit-singh': {
    guideId: 'sikh-harjit-singh',
    guideName: 'Bhai Harjit Singh',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikhism-1'
  },
  'sikh-amritpal-singh': {
    guideId: 'sikh-amritpal-singh',
    guideName: 'Bhai Amritpal Singh',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikhism-2'
  },
  'namdhari-satguru-ram-singh': {
    guideId: 'namdhari-satguru-ram-singh',
    guideName: 'Satguru Ram Singh',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikhism-3'
  },
  'sikhism-nirankari-baba-dyal-das': {
    guideId: 'sikhism-nirankari-baba-dyal-das',
    guideName: 'Baba Dyal Das',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikh-4'
  },
  'sikhism-3ho-harjit-kaur-khalsa': {
    guideId: 'sikhism-3ho-harjit-kaur-khalsa',
    guideName: 'Harjit Kaur Khalsa',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikh-5'
  },
  'sikhism-akj-bhai-harbhajan-singh': {
    guideId: 'sikhism-akj-bhai-harbhajan-singh',
    guideName: 'Bhai Harbhajan Singh',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikh-6'
  },
  'bibi-harpreet-kaur': {
    guideId: 'bibi-harpreet-kaur',
    guideName: 'Bibi Harpreet Kaur',
    faith: 'Sikhism',
    chatUrl: 'https://link.divinityagi.com/sikh-7'
  },

  // ==================== TAOISM ====================
  'taoist-master': {
    guideId: 'taoist-master',
    guideName: 'Master Li Shen',
    faith: 'Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-1'
  },
  'taoist-mei-ling': {
    guideId: 'taoist-mei-ling',
    guideName: 'Mei Ling',
    faith: 'Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-2'
  },
  'taoist-xu-yunyao': {
    guideId: 'taoist-xu-yunyao',
    guideName: 'Xu Yunyao',
    faith: 'Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-5'
  },
  'taoist-gao-lian': {
    guideId: 'taoist-gao-lian',
    guideName: 'Gao Lian',
    faith: 'Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-6'
  },
  'taoist-liang-zhen': {
    guideId: 'taoist-liang-zhen',
    guideName: 'Liang Zhen',
    faith: 'Taoism',
    chatUrl: 'https://link.divinityagi.com/taoism-5'
  },

  // ==================== CONFUCIANISM ====================
  'confucian-scholar': {
    guideId: 'confucian-scholar',
    guideName: 'Zhou Wei',
    faith: 'Confucianism',
    chatUrl: 'https://link.divinityagi.com/confucianism-1'
  },
  'confucianism-classical-kong-fuzi': {
    guideId: 'confucianism-classical-kong-fuzi',
    guideName: 'Kong Fuzi (Confucius)',
    faith: 'Confucianism',
    chatUrl: 'https://link.divinityagi.com/confu-4'
  },
  'confucian-li-wei': {
    guideId: 'confucian-li-wei',
    guideName: 'Li Wei',
    faith: 'Confucianism',
    chatUrl: 'https://link.divinityagi.com/confu-2'
  },
  'confucian-anya-li': {
    guideId: 'confucian-anya-li',
    guideName: 'Ms. Anya Li',
    faith: 'Confucianism',
    chatUrl: 'https://link.divinityagi.com/confu-3'
  },

  // ==================== SHINTO ====================
  'shinto-priest': {
    guideId: 'shinto-priest',
    guideName: 'Hikari no Mori',
    faith: 'Shinto',
    chatUrl: 'https://link.divinityagi.com/shinto-1'
  },
  'shinto-folk-kenta-moriyama': {
    guideId: 'shinto-folk-kenta-moriyama',
    guideName: 'Kenta Moriyama',
    faith: 'Shinto',
    chatUrl: 'https://link.divinityagi.com/shinto-4'
  },
  'shinto-institutional-haruto-takamori': {
    guideId: 'shinto-institutional-haruto-takamori',
    guideName: 'Haruto Takamori',
    faith: 'Shinto',
    chatUrl: 'https://link.divinityagi.com/shinto-2'
  },
  'shinto-imperial-emperor-meiji': {
    guideId: 'shinto-imperial-emperor-meiji',
    guideName: 'Emperor Meiji',
    faith: 'Shinto',
    chatUrl: 'https://link.divinityagi.com/shinto-5'
  },
  'shinto-new-religions-ayaka-hoshino': {
    guideId: 'shinto-new-religions-ayaka-hoshino',
    guideName: 'Ayaka Hoshino',
    faith: 'Shinto',
    chatUrl: 'https://link.divinityagi.com/shinto-3'
  },

  // ==================== JAINISM ====================
  'jain-acharya': {
    guideId: 'jain-acharya',
    guideName: 'Ācārya Satyaprabha',
    faith: 'Jainism',
    chatUrl: 'https://link.divinityagi.com/jainism-1'
  },
  'jain-sadhvi-pratibha': {
    guideId: 'jain-sadhvi-pratibha',
    guideName: 'Sādhvī Pratibha',
    faith: 'Jainism',
    chatUrl: 'https://link.divinityagi.com/jainism-2'
  },
  'jainism-terapanth-acharya-anand': {
    guideId: 'jainism-terapanth-acharya-anand',
    guideName: 'Ācārya Ānand',
    faith: 'Jainism',
    chatUrl: 'https://link.divinityagi.com/jainism-3'
  },
  'jain-terapanth-acharya-pratibha': {
    guideId: 'jain-terapanth-acharya-pratibha',
    guideName: 'Ācārya Pratibha',
    faith: 'Jainism',
    chatUrl: 'https://link.divinityagi.com/jainism-4'
  },

  // ==================== POLYTHEISM & UNIVERSAL ====================
  'norse-odin': {
    guideId: 'norse-odin',
    guideName: 'Odin Allfather',
    faith: 'Norse Polytheism',
    chatUrl: 'https://link.divinityagi.com/norse-1'
  },
  'greek-zeus': {
    guideId: 'greek-zeus',
    guideName: 'Zeus King of Olympus',
    faith: 'Greek Polytheism',
    chatUrl: 'https://link.divinityagi.com/greek-1'
  },
  'egyptian-ra': {
    guideId: 'egyptian-ra',
    guideName: 'Ra Lord of the Sun',
    faith: 'Egyptian Polytheism',
    chatUrl: 'https://link.divinityagi.com/egyptian-1'
  },
  'priestess-oshun': {
    guideId: 'priestess-oshun',
    guideName: 'Priestess Oshun',
    faith: 'Yoruba / Ifa',
    chatUrl: 'https://link.divinityagi.com/universal-2'
  },
  'elder-kwame': {
    guideId: 'elder-kwame',
    guideName: 'Elder Kwame',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-3'
  },
  'grandmother-willow': {
    guideId: 'grandmother-willow',
    guideName: 'Grandmother Willow',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-1'
  },
  'priestess-hecate': {
    guideId: 'priestess-hecate',
    guideName: 'Priestess Hecate',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-5'
  },
  'sage-river': {
    guideId: 'sage-river',
    guideName: 'Sage River',
    faith: 'Universal / Nature Spirituality',
    chatUrl: 'https://link.divinityagi.com/universal-6'
  },
  'grandmother-weaver': {
    guideId: 'grandmother-weaver',
    guideName: 'Grandmother Weaver',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-9'
  },
  'mobed-rostam': {
    guideId: 'mobed-rostam',
    guideName: 'Mobed Rostam',
    faith: 'Zoroastrianism',
    chatUrl: 'https://link.divinityagi.com/universal-8'
  },
  'dr-maya-patel': {
    guideId: 'dr-maya-patel',
    guideName: 'Dr. Maya Patel',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-7'
  },
  'maestro-javier-santos': {
    guideId: 'maestro-javier-santos',
    guideName: 'Maestro Javier Santos',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-4'
  },
  'medicine-woman-standing-bear': {
    guideId: 'medicine-woman-standing-bear',
    guideName: 'Medicine Woman Standing Bear',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-10'
  },
  'eagle-feather': {
    guideId: 'eagle-feather',
    guideName: 'Eagle Feather',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-11'
  },
  'indigenous-tawa-greywolf': {
    guideId: 'indigenous-tawa-greywolf',
    guideName: 'Tawa Greywolf',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-1'
  },
  'curandera-elena-morales': {
    guideId: 'curandera-elena-morales',
    guideName: 'Curandera Elena Morales',
    faith: 'Universal',
    chatUrl: 'https://link.divinityagi.com/universal-12'
  },
  'occult-damon': {
    guideId: 'occult-damon',
    guideName: 'Damon',
    faith: 'The Occult',
    chatUrl: 'https://link.divinityagi.com/occult-1'
  },
};

/**
 * Get the correct chat URL for a guide by ID
 * This is the primary lookup method - use guide ID when available
 * 
 * @param guideId - The unique identifier for the guide (e.g., "hindu-bhairav")
 * @returns The chat URL for the guide, or null if not found
 */
export function getGuideChatUrlById(guideId: string): string | null {
  const mapping = GUIDE_CHAT_URL_MAP[guideId];
  if (!mapping) {
    console.warn(`No chat URL found for guide ID: "${guideId}"`);
    return null;
  }
  return mapping.chatUrl;
}

/**
 * Get the correct chat URL for a guide by name and/or faith
 * This is a fallback method when ID is not available
 * 
 * @param guideName - The name of the guide (e.g., "Bhairav", "Pope Francis")
 * @param faith - Optional faith tradition to narrow down the search
 * @returns The chat URL for the guide, or null if not found
 */
export function getGuideChatUrl(guideName: string, faith?: string): string | null {
  // Try exact match by name first
  const exactMatch = Object.values(GUIDE_CHAT_URL_MAP).find(
    mapping => mapping.guideName.toLowerCase() === guideName.toLowerCase()
  );

  if (exactMatch) {
    // If faith is provided, verify it matches
    if (faith && exactMatch.faith.toLowerCase() !== faith.toLowerCase()) {
      console.warn(
        `Guide name "${guideName}" found but faith mismatch: expected "${faith}", found "${exactMatch.faith}"`
      );
    }
    return exactMatch.chatUrl;
  }

  // Try partial match (for names like "Mata Amritanandamayi (Amma)" vs "Amma")
  const partialMatch = Object.values(GUIDE_CHAT_URL_MAP).find(
    mapping => {
      const nameMatches = mapping.guideName.toLowerCase().includes(guideName.toLowerCase()) ||
                         guideName.toLowerCase().includes(mapping.guideName.toLowerCase());
      const faithMatches = !faith || mapping.faith.toLowerCase() === faith.toLowerCase();
      return nameMatches && faithMatches;
    }
  );

  if (partialMatch) {
    return partialMatch.chatUrl;
  }

  console.error(`No chat URL found for guide: "${guideName}" (faith: "${faith || 'N/A'}")`);
  return null;
}

/**
 * Get guide mapping by guide ID
 * 
 * @param guideId - The unique identifier for the guide (e.g., "hindu-bhairav")
 * @returns The guide mapping or null if not found
 */
export function getGuideMappingById(guideId: string): GuideChatMapping | null {
  const mapping = GUIDE_CHAT_URL_MAP[guideId];
  if (!mapping) {
    console.error(`No mapping found for guide ID: "${guideId}"`);
    return null;
  }
  return mapping;
}

/**
 * Validate that a matched guide has a valid chat URL
 * Logs warnings if URL is missing or seems incorrect
 * 
 * @param guide - The guide object from matching
 * @returns boolean indicating if the guide has a valid chatUrl
 */
export function validateGuideChatUrl(guide: any): boolean {
  if (!guide.chatUrl) {
    console.error(`Guide "${guide.name}" (${guide.faith}) is missing a chatUrl!`);
    return false;
  }

  if (!guide.chatUrl.includes('link.divinityagi.com')) {
    console.warn(
      `Guide "${guide.name}" has an unusual chatUrl: ${guide.chatUrl}. ` +
      `Expected format: https://link.divinityagi.com/...`
    );
    return false;
  }

  return true;
}

/**
 * Get fallback chat URL by faith tradition
 * Used only when guide-specific URL cannot be found
 * 
 * @param faith - The faith tradition
 * @returns A default chat URL for that faith tradition
 */
export function getFallbackChatUrlByFaith(faith: string): string {
  const faithLower = faith.toLowerCase();

  // Map to the first guide in each faith as fallback
  if (faithLower.includes('christian')) {
    return 'https://link.divinityagi.com/christianity-1';
  } else if (faithLower.includes('islam') || faithLower.includes('muslim')) {
    return 'https://link.divinityagi.com/islam-1';
  } else if (faithLower.includes('buddhis')) {
    return 'https://link.divinityagi.com/buddhism-1';
  } else if (faithLower.includes('hindu')) {
    return 'https://link.divinityagi.com/hinduism-1';
  } else if (faithLower.includes('jewish') || faithLower.includes('judais')) {
    return 'https://link.divinityagi.com/judaism-1';
  } else if (faithLower.includes('tao') || faithLower.includes('dao')) {
    return 'https://link.divinityagi.com/taoism-1';
  } else if (faithLower.includes('sikh')) {
    return 'https://link.divinityagi.com/sikhism-1';
  } else if (faithLower.includes('bahai') || faithLower.includes('bahá')) {
    return 'https://link.divinityagi.com/bahai-1';
  } else if (faithLower.includes('jain')) {
    return 'https://link.divinityagi.com/jainism-1';
  } else if (faithLower.includes('shinto')) {
    return 'https://link.divinityagi.com/shinto-1';
  } else if (faithLower.includes('confuc')) {
    return 'https://link.divinityagi.com/confucianism-1';
  } else if (faithLower.includes('norse')) {
    return 'https://link.divinityagi.com/norse-1';
  } else if (faithLower.includes('greek')) {
    return 'https://link.divinityagi.com/greek-1';
  } else if (faithLower.includes('egyptian')) {
    return 'https://link.divinityagi.com/egyptian-1';
  } else if (faithLower.includes('yoruba') || faithLower.includes('ifa')) {
    return 'https://link.divinityagi.com/yoruba-1';
  }

  // Ultimate fallback - Christian guide
  console.warn(`No fallback URL found for faith: "${faith}". Using Christian fallback.`);
  return 'https://link.divinityagi.com/christianity-1';
}