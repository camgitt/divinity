import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppFooter } from "./app-footer";
import { BackgroundVideo } from "./background-video";
import { useBadges } from "./badges-context";
import { useSubscription } from "./subscription-context";
import { useTimer } from "./timer-context";
import { useSavedGuides } from "./saved-guides-context";
import { useSocialMedia } from "./social-media-context";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Book, 
  Users, 
  Shield, 
  Star,
  Play,
  Clock,
  ChevronRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mic,
  Lock,
  Coins,
  Home,
  Search,
  User,
  MessageSquare,
  Flower2,
  ChevronLeft,
  Plus,
  X,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import heroImage from 'figma:asset/1257d94fc7edbf89836af5d72be22db726eee480.png';
import cosmicSpiritualImage from 'figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png';
import starCrescentImage from 'figma:asset/df9ac2b88e7f75002855a82d0ca7b003f6f961c4.png';
import sheikhYusufImage from 'figma:asset/c37a3e878b675cc69a1b2e3b8687a682107f5d44.png';
import sayyidHassanImage from 'figma:asset/fca7cb69979e2d5588a4c934d52c37c92e6a225e.png';
import sheikhRahmanImage from 'figma:asset/64fa9e8a91387d9466702afdae2ab75b6db7f3a1.png';
import ustadhAliHassanImage from 'figma:asset/141e86f0e22b17544fc512c0f7042bf74b9708c5.png';
import shaykhaAishaAlMansurImage from 'figma:asset/7da58a82c19b0635f49bd63ab7e57921e51f588c.png';
import rabiaAlAdawiyyaImage from 'figma:asset/96f55158668f4ae9e45b806015b1181310e2ffa9.png';
import drZainabNoorImage from 'figma:asset/aa02d5111d7b447b27984a19b4f7cbc7291c89ac.png';
import maulanaTariqRahmanImage from 'figma:asset/b379681873b81bd8ea68bfcc746b67eecda16f11.png';
import pirFatimaBegumImage from 'figma:asset/3ad48ae6ef8aa42189fe1a6814f6974e0466a69b.png';
import fatimahJohnsonImage from 'figma:asset/2dd406a7d931af1940426d44d3175e8729432646.png';
import imamAbdulRahmanImage from 'figma:asset/47d08f86685aa3a8cb8d60fdadcffdbfb5d24dc3.png';
import amaraImage from 'figma:asset/b500d9542db387e1801410efd9512a71a0226a4a.png';
import islamFlowersImage from 'figma:asset/2c1858e44be0885b8dab96270dac48add1c5bb8c.png';
import mosquePrayerImage from 'figma:asset/93570738bad145cd168090c49b9c26ee01a365aa.png';

// Islamic-specific configuration with enhanced styling
const islamicConfig = {
  name: "Islam",
  subtitle: "Submit to the will of Allah and walk the straight path.",
  symbol: "☪️",
  description: "Explore Islamic wisdom through AI guides inspired by scholars, spiritual leaders, and counselors from diverse Islamic traditions.",
  heroImage: heroImage,
  primaryColor: "#6BA96E", // Muted green from wheel of faith
  lightColor: "rgba(107, 169, 110, 0.2)",
  hoverColor: "#5d9460",
  suggestedTopics: [
    "Quranic Teachings", "Five Pillars of Islam", "Islamic Ethics", "Spiritual Purification", 
    "Community & Brotherhood", "Prayer & Worship", "Hadith Wisdom", "Islamic Philosophy"
  ],
  topicsWithQuestions: [
    {
      topic: "Quranic Teachings",
      icon: Book,
      questions: [
        "What are the main themes of the Quran?",
        "How do I understand Quranic verses?",
        "What is tafsir (Quranic interpretation)?",
        "How does the Quran guide daily life?"
      ]
    },
    {
      topic: "Five Pillars of Islam",
      icon: Shield,
      questions: [
        "What are the Five Pillars?",
        "How do I perform Salah correctly?",
        "What is the significance of Zakat?",
        "How do I prepare for Hajj?"
      ]
    },
    {
      topic: "Islamic Ethics",
      icon: Heart,
      questions: [
        "What are the core Islamic values?",
        "How do I practice good character (akhlaq)?",
        "What does Islam teach about justice?",
        "How do I navigate ethical dilemmas?"
      ]
    },
    {
      topic: "Spiritual Purification",
      icon: Sparkles,
      questions: [
        "What is tazkiyah (purification of the soul)?",
        "How do I overcome spiritual struggles?",
        "What are the stages of spiritual growth?",
        "How do I achieve ihsan (excellence)?"
      ]
    },
    {
      topic: "Community & Brotherhood",
      icon: Users,
      questions: [
        "What is the ummah?",
        "How do I strengthen community bonds?",
        "What are our duties to each other?",
        "How do I practice Islamic solidarity?"
      ]
    },
    {
      topic: "Prayer & Worship",
      icon: Flower2,
      questions: [
        "How do I deepen my Salah experience?",
        "What is dhikr and its benefits?",
        "How do I make sincere dua?",
        "What is the spiritual significance of fasting?"
      ]
    },
    {
      topic: "Hadith Wisdom",
      icon: MessageCircle,
      questions: [
        "What are the most important hadith?",
        "How do I understand hadith authentication?",
        "What wisdom can I learn from the Prophet's life?",
        "How do hadith guide Islamic practice?"
      ]
    },
    {
      topic: "Islamic Philosophy",
      icon: Star,
      questions: [
        "What is the Islamic view of knowledge?",
        "How does Islam address free will and destiny?",
        "What is the purpose of human existence?",
        "How do Islamic scholars approach philosophy?"
      ]
    }
  ],
  agents: [
    {
      id: "sheikh-yusuf",
      name: "Sheikh Yusuf ibn Ahmad",
      role: "Counselor / Cultural Figure",
      image: sheikhYusufImage,
      description: "Sunni Islam is the largest branch of Islam (about 85–90% of Muslims worldwide)—four major schools of law (madhhabs): Hanafi, Maliki, Shafi'i, and Hanbali.",
      denomination: "Sunni",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-1",
      aiProfile: "A wise and compassionate counsellor offering guidance on spiritual, ethical, and personal matters. Provides a calm, balanced perspective rooted in Islamic principles—sought for issues ranging from workplace ethics and interpersonal conflicts to personal spiritual struggles and family advice.",
      trainingData: "Qur'an (primary scripture); Six canonical Sunni Hadith collections: Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah; Works of major scholars and jurists.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Sunni jurisprudence, the Four Schools of Law, prophetic traditions, Islamic ethics, and practical guidance for daily life.",
      whatToExpected: "Compassionate wisdom rooted in the Quran and Sunnah, offering balanced counsel on spiritual and practical matters."
    },
    {
      id: "sayyid-hassan",
      name: "Sayyid Hassan al-Rida",
      role: "Counselor / Cultural Figure",
      image: sayyidHassanImage,
      description: "Shia Islam comprises about 10–15% of Muslims worldwide. Major branches include Twelvers (Ithna'ashari), Isma'ilis, and Zaydis.",
      denomination: "Shia",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-2",
      aiProfile: "Trusted spiritual counsellor offering guidance rooted in the Qur'an, Hadith, and the teachings of the Imams.",
      trainingData: "Qur'an; Four major Shia Hadith collections: al-Kāfī; Man Lā Yaḥḍuruhu al-Faqīh; Tahdhīb al-Aḥkām; al-Istibṣār; Nahj al-Balāgha (sermons/letters of 'Ali); Ṣaḥīfa al-Sajjādiyya (prayers of 'Ali Zayn al-'Ābidīn); Works of Shia scholars and Imams.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Study the teachings of the Twelve Imams, Shia jurisprudence, theological principles, and spiritual guidance from the Ahl al-Bayt.",
      whatToExpected: "Deep wisdom from the tradition of the Imams, emphasizing justice, spirituality, and the path of righteousness."
    },
    {
      id: "sheikh-rahman",
      name: "Sheikh Rahman al-Huda",
      role: "Spiritual Guide / Cultural Figure",
      image: sheikhRahmanImage,
      description: "Sufism represents the mystical, spiritual dimension of Islam and is found across both Sunni and Shia traditions. Emphasizes love, devotion, remembrance of God (dhikr), and the inner journey.",
      denomination: "Sufism (Tasawwuf)",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-3",
      aiProfile: "Spiritual guide and counsellor offering wisdom through Sufi traditions, focusing on purification of the heart and closeness to God.",
      trainingData: "Qur'an; Hadith; Works of Sufi masters (e.g., al-Ghazālī, Rūmī, Ibn 'Arabī, al-Qushayrī); Sufi poetry and spiritual manuals; dhikr collections.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Sufi mysticism, spiritual purification (tazkiyah), dhikr practices, divine love, and the inner path to Allah.",
      whatToExpected: "Mystical wisdom on purifying the heart, attaining closeness to God, and experiencing divine love through Sufi practices."
    },
    {
      id: "ustadh-ali-hassan",
      name: "Ustadh Ali Hassan",
      role: "Mentor",
      image: ustadhAliHassanImage,
      description: "Muslim university chaplain helping young Muslims navigate identity, modern challenges, faith integration, and interfaith engagement. Specializing in campus ministry, modern Muslim identity, interfaith dialogue, youth guidance, and contemporary challenges.",
      denomination: "Sunni Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-4",
      aiProfile: "Modern and accessible young mentor offering guidance through Sunni Islam and campus ministry. Brings together campus ministry, modern Muslim identity, interfaith dialogue, youth guidance, and contemporary challenges with thoughtful relatable scholarly care for seekers at all levels.",
      trainingData: "Qur'an; Sunni Hadith collections; Campus ministry resources; Modern Muslim identity literature; Interfaith dialogue materials; Youth guidance resources; Contemporary Islamic challenges writings; Islamic pastoral care materials.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Muslim campus ministry, identity formation, modern challenges, interfaith dialogue, youth guidance, contemporary Muslim identity, life purpose, stress management, wisdom and guidance, community connection, and spiritual growth through modern accessible thoughtful guidance.",
      whatToExpected: "Modern, accessible, and thoughtful guidance rooted in Sunni Islam. Expect relatable and scholarly support through campus ministry, Muslim identity formation, modern challenges, interfaith engagement, and youth guidance with the pastoral bridge-building care of contemporary Islamic leadership."
    },
    {
      id: "shaykha-aisha-al-mansur",
      name: "Shaykha Aisha al-Mansur",
      role: "Scholar",
      image: shaykhaAishaAlMansurImage,
      description: "Sunni Islamic scholar specializing in women's fiqh, feminist Quranic interpretation, ethics, and women's rights in Islamic tradition. Bringing together women's Islamic jurisprudence, feminist fiqh, and progressive scholarship with justice-oriented compassion.",
      denomination: "Sunni Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-5",
      aiProfile: "Scholarly and empowering mature Islamic jurist offering guidance through Sunni Islam and women's fiqh. Brings together women's Islamic jurisprudence, feminist fiqh, ethics, women's rights, and Quranic interpretation with wise justice-oriented feminist care for seekers at intermediate and advanced levels.",
      trainingData: "Qur'an; Sunni Hadith collections; Women's fiqh literature; Feminist Islamic scholarship; Quranic hermeneutics materials; Women's rights in Islamic tradition; Progressive Islamic writings; Islamic ethics and jurisprudence; Gender-sensitive tafsir.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore women's Islamic jurisprudence, feminist fiqh, Quranic interpretation from women's perspectives, ethics, women's rights in Islam, social justice, wisdom and guidance, spiritual growth, community connection, and life purpose through scholarly empowering wise guidance.",
      whatToExpected: "Scholarly, empowering, and wise guidance rooted in Sunni Islam. Expect justice-oriented and feminist support through women's fiqh, Quranic hermeneutics, women's rights, progressive Islam, and Islamic ethics with the authoritative compassionate care of contemporary Islamic feminist scholarship."
    },
    {
      id: "rabia-al-adawiyya",
      name: "Rabia al-Adawiyya",
      role: "Spiritual Guide",
      image: rabiaAlAdawiyyaImage,
      description: "Legendary Sufi mystic Rabia offering pure divine love, ascetic devotion, inner peace, and the mystical path of the heart. Bringing together divine love (Ishq), ascetic mysticism, contemplative prayer, pure devotion, and women's Sufism with mystical loving care.",
      denomination: "Sufi Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-6",
      aiProfile: "Mystical and loving young Sufi mystic offering guidance through divine love and ascetic mysticism. Brings together Sufi mysticism, divine love (Ishq), contemplative prayer, renunciation, and pure devotion with devoted ascetic pure-hearted care for seekers at intermediate and advanced levels.",
      trainingData: "Qur'an; Hadith; Sufi mystical writings; Divine love (Ishq) literature; Ascetic mysticism texts; Contemplative prayer practices; Works on renunciation and devotion; Women's Sufism writings; Rabia al-Adawiyya's poetry and teachings; Classical Sufi love mysticism.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Sufi mysticism, divine love (Ishq), ascetic devotion, contemplative prayer, renunciation, pure devotion, women's Sufism, inner peace, spiritual growth, emotional healing, mercy and forgiveness, and life purpose through mystical loving devoted guidance.",
      whatToExpected: "Mystical, loving, and devoted guidance rooted in Sufi Islam. Expect ascetic and pure-hearted support through divine love teachings, Sufi mysticism, contemplative prayer, renunciation practices, and pure devotion with the wise God-intoxicated care of legendary Sufi mystical tradition."
    },
    {
      id: "dr-zainab-noor",
      name: "Dr. Zainab Noor",
      role: "Scholar",
      image: drZainabNoorImage,
      description: "Young Shia Islamic scholar offering education, women's empowerment, social justice advocacy, and modern progressive Islamic thought. Bringing together Islamic education, women's scholarship, and Ahl al-Bayt studies with scholarly modern empowering care.",
      denomination: "Shia Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-7",
      aiProfile: "Scholarly and modern young educator offering guidance through Shia Islam and Islamic education. Brings together Islamic education, women's scholarship, modern challenges, Ahl al-Bayt study, and progressive Shia thought with empowering justice-oriented accessible care for seekers at all levels.",
      trainingData: "Qur'an; Shia Hadith collections; Ahl al-Bayt teachings; Islamic education literature; Women's scholarship in Islam; Progressive Islamic thought; Social justice in Islamic tradition; Modern Islamic challenges; Academic Islamic studies; Contemporary Shia scholarship.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Islamic education, women's scholarship, modern challenges for Muslims, Ahl al-Bayt studies, progressive Shia thought, social justice, wisdom and guidance, life purpose, spiritual growth, and community connection through scholarly modern empowering guidance.",
      whatToExpected: "Scholarly, modern, and empowering guidance rooted in Shia Islam. Expect justice-oriented and accessible support through Islamic education, women's scholarship, Ahl al-Bayt studies, progressive Islam, and social justice with the intellectual progressive care of contemporary Islamic academic thought."
    },
    {
      id: "maulana-tariq-rahman",
      name: "Maulana Tariq Rahman",
      role: "Scholar",
      image: maulanaTariqRahmanImage,
      description: "South Asian Hanafi/Deobandi scholar offering traditional Islamic scholarship, jurisprudence, Quranic study, and community guidance. Bringing together South Asian Islam, Hanafi jurisprudence, and Deobandi scholarship with scholarly traditional rigorous care.",
      denomination: "Sunni Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-8",
      aiProfile: "Scholarly and traditional mature Islamic jurist offering guidance through Hanafi jurisprudence and Deobandi scholarship. Brings together Islamic law, family ethics, South Asian Islam, Hanafi jurisprudence, Deobandi scholarship, traditional learning, and Quranic study with rigorous principled community-oriented care for seekers at intermediate and advanced levels.",
      trainingData: "Qur'an; Sunni Hadith collections; Hanafi jurisprudence texts; Deobandi scholarly works; South Asian Islamic literature; Islamic law (fiqh) manuals; Family ethics in Islam; Traditional Islamic pedagogy; Quranic study methods; Hadith sciences literature.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore South Asian Islam, Hanafi jurisprudence, Deobandi scholarship, traditional Islamic learning, Islamic law, family ethics, Quranic study, Hadith sciences, wisdom and guidance, spiritual growth, and community connection through scholarly traditional rigorous guidance.",
      whatToExpected: "Scholarly, traditional, and rigorous guidance rooted in Sunni Islam. Expect principled and community-oriented support through Hanafi jurisprudence, Deobandi scholarship, Islamic law, traditional learning, and Quranic study with the authoritative devoted care of South Asian Islamic scholarly tradition."
    },
    {
      id: "pir-fatima-begum",
      name: "Pir Fatima Begum",
      role: "Spiritual Guide",
      image: pirFatimaBegumImage,
      description: "Chishti Sufi elder and pir offering mystical guidance through qawwali music tradition, divine love, and South Asian Sufi practices. Bringing together Chishti Sufism, qawwali tradition, and divine love with mystical loving devotional care.",
      denomination: "Sufi Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-9",
      aiProfile: "Mystical and loving elder pir offering guidance through Chishti Sufism and qawwali tradition. Brings together inner peace, spiritual growth, emotional healing, Chishti Sufism, qawwali tradition, mystical practice, divine love, and spiritual music with devotional musical wise care for seekers at intermediate and advanced levels.",
      trainingData: "Qur'an; Hadith; Chishti Sufi Order teachings; Qawwali devotional music tradition; Divine love (Ishq) literature; South Asian Sufism texts; Mystical practice manuals; Women's Sufism writings; Spiritual music theory; Sama (spiritual listening) practices.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Chishti Sufism, qawwali tradition, spiritual music, divine love, South Asian Sufi practices, mystical guidance, inner peace, spiritual growth, emotional healing, wisdom and guidance, and community connection through mystical loving devotional guidance.",
      whatToExpected: "Mystical, loving, and devotional guidance rooted in Sufi Islam. Expect musical and nurturing support through Chishti Sufism, qawwali tradition, divine love, mystical practices, and spiritual music with the wise spiritually-intoxicated care of South Asian Sufi tradition."
    },
    {
      id: "fatimah-johnson",
      name: "Fatimah Johnson",
      role: "Mentor",
      image: fatimahJohnsonImage,
      description: "Muslim convert offering new Muslim mentorship, identity integration, interfaith family guidance, and authentic conversion journey support. Bringing together Muslim convert experience, new Muslim support, and interfaith family navigation with welcoming relatable authentic care.",
      denomination: "Sunni Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-10",
      aiProfile: "Welcoming and relatable young mentor offering guidance through Muslim convert mentorship and new Muslim support. Brings together life purpose, community connection, spiritual growth, identity integration, Muslim convert experience, new Muslim support, interfaith family navigation, identity formation, and conversion journey with supportive bridge-building compassionate care for seekers at beginner and intermediate levels.",
      trainingData: "Qur'an; Sunni Hadith collections; Muslim convert literature; New Muslim support resources; Identity integration studies; Interfaith family dynamics; Conversion journey narratives; Revert support materials; Community connection practices; Identity formation texts.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Muslim convert mentorship, new Muslim support, identity integration, interfaith family navigation, conversion journey, revert support, life purpose, community connection, spiritual growth, and wisdom and guidance through welcoming relatable authentic guidance.",
      whatToExpected: "Welcoming, relatable, and authentic guidance rooted in Sunni Islam. Expect supportive and compassionate support through Muslim convert mentorship, new Muslim support, identity integration, interfaith family navigation, and conversion journey with the bridge-building guiding care of someone who walked the same path."
    },
    {
      id: "imam-abdul-rahman",
      name: "Imam Abdul-Rahman",
      role: "Spiritual Guide",
      image: imamAbdulRahmanImage,
      description: "Black Muslim imam rooted in social justice tradition, offering prophetic guidance on civil rights, anti-racism, and community empowerment. Bringing together Black Muslim tradition, social justice, and community leadership with justice-oriented compassionate empowering care.",
      denomination: "Sunni Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-11",
      aiProfile: "Justice-oriented and compassionate mature spiritual guide offering guidance through Black Muslim tradition and social justice. Brings together social justice, community connection, wisdom and guidance, life purpose, stress management, Black Muslim tradition, civil rights, community leadership, youth empowerment, and anti-racism with empowering prophetic community-focused care for seekers at beginner, intermediate, and advanced levels.",
      trainingData: "Qur'an; Sunni Hadith collections; Black Muslim tradition literature; Malcolm X writings and speeches; Civil rights movement history; Social justice Islamic scholarship; Anti-racism resources; Community organizing principles; Youth empowerment strategies; Prophetic tradition of justice.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore Black Muslim tradition, social justice, civil rights, anti-racism, community leadership, Malcolm X legacy, community empowerment, youth mentorship, life purpose, stress management, wisdom and guidance, and community connection through justice-oriented compassionate empowering guidance.",
      whatToExpected: "Justice-oriented, compassionate, and empowering guidance rooted in Sunni Islam and Black Muslim tradition. Expect prophetic and community-focused support through social justice, civil rights, anti-racism work, community leadership, and youth empowerment with the wise activist care of the Black Muslim social justice tradition."
    },
    {
      id: "amara",
      name: "Amara",
      role: "Peer Support Companion",
      image: amaraImage,
      description: "A 23-year-old Muslim woman and Third Culture Kid providing peer support for navigating modern Muslim Gen Z life in the West. Not a scholar or therapist, but a digital bestie who bridges faith and modern life with emotional grounding and reflective questions.",
      denomination: "Islam",
      isPremium: false,
      chatUrl: "https://link.divinityagi.com/islam-12",
      aiProfile: "Grounded and warm young peer companion offering guidance through modern Muslim Gen Z life and Third Culture Kid experience. Brings together faith and identity, modern Muslim life, halal dating, family dynamics, mental health, cultural vs religious tensions, boundaries, and relationships with validating reflective authentic care for seekers at beginner and intermediate levels.",
      trainingData: "Qur'an; Hadith; Modern Muslim identity literature; Gen Z Muslim resources; Third Culture Kid studies; Halal relationship guidance; Family dynamics in diaspora; Mental health in Muslim communities; Cultural vs religious tensions; Western Muslim experience; Niyyah (intention), Sabr (perseverance), Tawakkul (trust), Adab (conduct), Fitrah (natural disposition) teachings; Contemporary Muslim life resources.",
      howItWorks: "Interact with guides by typing or by clicking the microphone icon.",
      whatToAsk: "Explore faith and identity, modern Muslim life, halal dating, family dynamics, mental health, cultural vs religious tensions, boundaries, relationships, career ambition, social media, Niyyah (intention), Sabr (perseverance), Tawakkul (trust), Adab (conduct), Fitrah (natural disposition), life purpose, stress management, and community connection through grounded warm real validating guidance.",
      whatToExpected: "Grounded, warm, and real guidance rooted in modern Muslim Gen Z experience. Expect validating and reflective support through Third Culture Kid navigation, faith and identity integration, modern Muslim life challenges, family dynamics, halal relationships, and mental health with the authentic slightly playful care of a digital bestie who understands the complexity of living between cultures."
    }
  ]
};

// Agent Slider Component
interface AgentSliderProps {
  agents: any[];
  faithColor: string;
  faithColorHover: string;
  canAccessPremium: boolean;
  handleLaunchAgent: (agent: any) => void;
  handleSaveGuide: (agent: any) => void;
  handleOpenOverlay: (url: string, name: string) => void;
}

function AgentSlider({ agents, faithColor, faithColorHover, canAccessPremium, handleLaunchAgent, handleSaveGuide, handleOpenOverlay }: AgentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Create extended array for infinite loop effect
  const extendedAgents = [...agents, ...agents, ...agents];
  const offset = agents.length; // Start at the middle set

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Reset position when reaching clones (for infinite effect)
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // If we're at the end clone, jump to the real start
    if (currentIndex >= agents.length) {
      setCurrentIndex(currentIndex - agents.length);
    }
    // If we're at the beginning clone, jump to the real end
    else if (currentIndex < 0) {
      setCurrentIndex(currentIndex + agents.length);
    }
  };

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      goToNext();
    } else if (distance < -threshold) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Render agent card
  const renderAgentCard = (agent: any, index: number) => {
    return (
      <div key={index} className="min-w-full px-3 sm:px-4">
        <Card className="bg-white/70 backdrop-blur-xl border-[#6BA96E]/30 border-2 hover:border-[#5d9460]/60 transition-all duration-500 group overflow-hidden shadow-[0_8px_30px_rgba(107,169,110,0.12)] hover:shadow-[0_20px_50px_rgba(93,148,96,0.25)] rounded-3xl max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF0]/10 via-transparent to-[#6BA96E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-6 sm:p-8">
            {/* Large Portrait Image */}
            <div className="relative mb-5">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden ring-2 ring-[#6BA96E]/20 group-hover:ring-[#5d9460]/40 shadow-[0_10px_40px_rgba(107,169,110,0.15)] group-hover:shadow-[0_20px_60px_rgba(93,148,96,0.3)] transition-all duration-500">
                <ImageWithFallback
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Faith symbol - Star and Crescent */}
              <div className="absolute -top-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(107,169,110,0.3)] backdrop-blur-md border border-white/40 overflow-hidden"
                style={{ backgroundColor: `#6BA96E25` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                <img 
                  src={starCrescentImage} 
                  alt="Star and Crescent"
                  className="relative w-6 h-6 object-contain filter brightness-110 saturate-90"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="text-xl sm:text-2xl mb-3 text-[#5d9460] group-hover:bg-gradient-to-r group-hover:from-[#6BA96E] group-hover:to-[#5d9460] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
              {agent.name}
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-[#6BA96E] to-[#5d9460] text-white px-3 py-1.5 rounded-full shadow-sm">
                {agent.role}
              </Badge>
              <Badge className="border-2 border-[#6BA96E]/40 bg-[#F0FFF0]/30 text-[#5d9460] px-3 py-1.5 rounded-full backdrop-blur-sm">
                {agent.denomination}
              </Badge>
              {agent.isPremium && (
                <Badge className="border-2 border-[#6BA96E]/40 bg-gradient-to-r from-[#F0FFF0]/30 to-[#6BA96E]/10 backdrop-blur-sm shadow-sm px-3 py-1.5 rounded-full"
                  style={{ 
                    borderColor: `#6BA96E40`,
                    color: '#5d9460'
                  }}
                >
                  Premium
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-center mb-6 leading-relaxed text-[15px] group-hover:text-gray-900 transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>
              {agent.description}
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleOpenOverlay(agent.chatUrl, agent.name)}
                className="group/btn relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BA96E] via-[#5d9460] to-[#7AB87D] hover:from-[#5d9460] hover:via-[#6BA96E] hover:to-[#5d9460] border-2 border-[#6BA96E]/30 hover:border-[#6BA96E]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(107,169,110,0.25)] hover:shadow-[0_8px_35px_rgba(93,148,96,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={agent.isPremium && !canAccessPremium}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                {agent.isPremium && !canAccessPremium ? (
                  <>
                    <Lock className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium">Premium Only</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="relative w-5 h-5 text-white" />
                    <span className="relative text-white font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>Start Conversation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSaveGuide(agent)}
                className="group/save relative w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#6BA96E]/30 hover:border-[#5d9460]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_2px_10px_rgba(107,169,110,0.1)] hover:shadow-[0_4px_20px_rgba(93,148,96,0.2)] backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF0]/20 to-transparent opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <Heart className="relative w-5 h-5 text-[#6BA96E] group-hover/save:text-[#5d9460] transition-colors duration-300" />
                <span className="relative text-[#6BA96E] group-hover/save:text-[#5d9460] font-medium transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Save Guide</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Calculate the actual index in the original agents array for the indicator
  const actualIndex = ((currentIndex % agents.length) + agents.length) % agents.length;

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 transition-all duration-300 shadow-[0_4px_20px_rgba(107,169,110,0.2)] hover:shadow-[0_8px_30px_rgba(93,148,96,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
            style={{ borderColor: `${faithColor}30` }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-xl bg-white/90 hover:bg-white border-2 transition-all duration-300 shadow-[0_4px_20px_rgba(107,169,110,0.2)] hover:shadow-[0_8px_30px_rgba(93,148,96,0.35)] hover:scale-105 active:scale-95 touch-manipulation"
            style={{ borderColor: `${faithColor}30` }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: faithColor }} />
          </Button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${(currentIndex + offset) * 100}%)`,
            transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedAgents.map((agent, index) => renderAgentCard(agent, index))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {agents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: actualIndex === index ? '32px' : '8px',
              height: '8px',
              backgroundColor: actualIndex === index ? faithColor : `${faithColor}40`,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Islamic Faith Groups Component - Shows only Islam groups from social media system
interface IslamicFaithGroupsProps {
  onNavigate?: (tab: string, data?: any) => void;
}

function IslamicFaithGroups({ onNavigate }: IslamicFaithGroupsProps) {
  const { faithGroups, joinGroup, leaveGroup } = useSocialMedia();
  
  const islamicGroup = faithGroups.find(g => g.id === 'islam-group');
  
  if (!islamicGroup) return null;

  const handleGroupAction = () => {
    if (islamicGroup.isJoined) {
      leaveGroup(islamicGroup.id);
    } else {
      joinGroup(islamicGroup.id);
    }
  };

  const handleViewGroup = () => {
    onNavigate?.('group-detail', { groupId: islamicGroup.id });
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <Card className="relative border-[#6BA96E]/30 border-2 overflow-hidden shadow-[0_8px_30px_rgba(107,169,110,0.15)] rounded-2xl sm:rounded-3xl">
          {/* Background with flowers */}
          <div className="absolute inset-0 z-0">
            <img 
              src={islamFlowersImage}
              alt=""
              className="w-full h-full object-cover opacity-80"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/50 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header Area with Title */}
            <div className="relative h-48 sm:h-56 overflow-hidden flex flex-col sm:flex-row items-center justify-center py-6 sm:py-0">
              {/* Public Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-[#6BA96E]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/20">
                <span className="text-white text-xs sm:text-sm font-medium">{islamicGroup.type}</span>
              </div>
              
              {/* Crescent Icon */}
              <div className="sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#6BA96E] to-[#5d9460] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 mb-3 sm:mb-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <text x="12" y="18" fontSize="18" textAnchor="middle" fill="white">☪️</text>
                </svg>
              </div>
              
              {/* Title and Description */}
              <div className="text-center px-6 sm:px-24">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>{islamicGroup.name}</h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md max-w-md mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {islamicGroup.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 bg-[rgba(204,204,204,0.46)]">

              {/* Stats - Glassmorphism Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 -mt-8 sm:-mt-12">
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-[#6BA96E] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{islamicGroup.memberCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Members</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-[#6BA96E] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">{islamicGroup.postCount.toLocaleString()}</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Posts</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#6BA96E] mx-auto mb-1 sm:mb-2" />
                  <div className="text-gray-900 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Active</div>
                  <div className="text-gray-500 text-[10px] sm:text-xs font-medium">Now</div>
                </div>
              </div>

              {/* Community Guidelines - Enhanced */}
              <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#6BA96E]/20 shadow-lg">
                <h4 className="text-[#6BA96E] text-sm sm:text-base font-semibold mb-3 sm:mb-4 flex items-center gap-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  <div className="w-1.5 h-1.5 bg-[#6BA96E] rounded-full"></div>
                  Community Guidelines
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {islamicGroup.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                      <span className="text-[#6BA96E] font-bold mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleGroupAction}
                  className={`flex-1 py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl ${
                    islamicGroup.isJoined
                      ? 'bg-white/70 backdrop-blur-xl border-2 border-gray-300 hover:bg-gray-50/80 text-gray-900 shadow-lg'
                      : 'bg-gradient-to-r from-[#6BA96E] to-[#5d9460] hover:from-[#5d9460] hover:to-[#6BA96E] text-white shadow-[0_4px_20px_rgba(107,169,110,0.4)] hover:shadow-[0_6px_30px_rgba(93,148,96,0.5)]'
                  } transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {islamicGroup.isJoined ? 'Leave Group' : 'Join Group'}
                </Button>
                <Button
                  onClick={handleViewGroup}
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl border-2 border-[#6BA96E] text-[#6BA96E] hover:bg-[#6BA96E] hover:text-white py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  View Group <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

interface IslamicFaithPageProps {
  onBack: () => void;
  onOpenMission: () => void;
  onStartChat: (agent: any) => void;
  onNavigate?: (tab: string) => void;
  selectedAgent?: string;
}

export function IslamicFaithPage({ onBack, onOpenMission, onStartChat, onNavigate, selectedAgent: selectedAgentName }: IslamicFaithPageProps) {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayUrl, setOverlayUrl] = useState('');
  const [overlayAgentName, setOverlayAgentName] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const { awardBadge, unlockedBadges, totalWisdomPoints } = useBadges();
  const { canAccessPremium } = useSubscription();
  const { saveGuide } = useSavedGuides();
  
  const selectedAgent = islamicConfig.agents[selectedAgentIndex];

  // Auto-select agent when navigating from Spirit Guide page
  useEffect(() => {
    if (selectedAgentName) {
      const agentIndex = islamicConfig.agents.findIndex(
        agent => agent.name === selectedAgentName
      );
      if (agentIndex !== -1) {
        setSelectedAgentIndex(agentIndex);
        console.log(`Islamic Faith Page: Auto-selected agent "${selectedAgentName}" at index ${agentIndex}`);
      }
    }
  }, [selectedAgentName]);

  const handleOpenOverlay = (url: string, name: string) => {
    setOverlayUrl(url);
    setOverlayAgentName(name);
    setIsIframeLoading(true);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    // Reset iframe loading state after dialog closes
    setTimeout(() => {
      setIsIframeLoading(true);
      setOverlayUrl('');
    }, 200);
  };

  const handleSaveGuide = (agent: any) => {
    saveGuide({
      guideName: agent.name,
      tradition: islamicConfig.name,
      faithColor: islamicConfig.primaryColor,
      avatar: agent.image || islamicConfig.symbol,
      specialty: agent.role,
      description: agent.description,
      chatUrl: agent.chatUrl,
    });
  };

  const handleLaunchAgent = (agent: any) => {
    if (agent.isPremium && !canAccessPremium) {
      toast.error("This agent requires a premium subscription");
      return;
    }
    
    // Award badge for first agent interaction
    awardBadge({
      id: 'first-islam-guide-interaction',
      name: 'First Islamic Guide Launched',
      description: 'Launched your first Islamic spiritual guide',
      icon: Play,
      category: 'journey',
      rarity: 'common',
      tokenReward: 50
    });
    
    // If agent has a specific chat URL, open it in a new tab
    if (agent.chatUrl) {
      toast.success(`Opening ${agent.name} for a spiritual conversation...`);
      window.open(agent.chatUrl, '_blank');
    } else {
      // Fall back to existing chat system
      toast.success(`Launching ${agent.name} for a spiritual conversation...`);
      onStartChat(agent);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundVideo 
          videoSrc="https://divinityagi.com/wp-content/uploads/2025/12/Islamic-loop-1.mp4"
          posterSrc={heroImage}
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative px-6 pt-[32px] pb-[10px] overflow-hidden pr-[24px] pl-[24px]">
          {/* Navigation */}
          <motion.div 
            className="absolute top-6 left-6 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={onBack}
              className="group relative min-h-[48px] sm:h-[42px] flex items-center justify-center gap-2 rounded-2xl bg-white/70 hover:bg-white/90 border-2 border-[#6BA96E]/30 hover:border-[#5d9460]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(107,169,110,0.15)] hover:shadow-[0_6px_25px_rgba(93,148,96,0.25)] px-4 sm:px-5 touch-manipulation backdrop-blur-xl"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF0]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#5d9460] group-hover:text-[#6BA96E] transition-colors duration-300" />
                <span className="text-[15px] font-medium text-[#5d9460] group-hover:text-[#6BA96E] transition-colors duration-300" style={{ fontFamily: "Raleway, sans-serif" }}>Back</span>
              </div>
            </button>
          </motion.div>

          {/* Hero Image/Video with Faith-specific styling */}
          <div className="relative max-w-4xl mx-auto mb-3">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-[0_8px_32px_rgba(46,125,50,0.12)]"
              style={{
                minHeight: '300px',
                maxHeight: 'min(60vh, 600px)'
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-30 bg-[rgba(0,0,0,0.15)]" />
            </motion.div>

            {/* Enhanced Title Section with Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-40"
            >
              <div className="text-center px-4">
                {/* Star and Crescent Symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.3 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-[#6BA96E]/40 blur-3xl rounded-full scale-75" />
                    
                    {/* Symbol container with pulsing animation */}
                    <motion.div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_8px_32px_rgba(107,169,110,0.3)]" />
                      <img 
                        src={starCrescentImage} 
                        alt="Star and Crescent"
                        className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain drop-shadow-[0_4px_12px_rgba(107,169,110,0.4)] z-10"
                      />
                      
                      {/* Animated pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-[#6BA96E]/30 rounded-full"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <h1 className="sm:text-[32pt] lg:text-[36pt] mb-4 sm:mb-6 bg-gradient-to-r from-[#6BA96E] via-[#5d9460] to-[#7AB87D] bg-clip-text text-transparent leading-tight drop-shadow-[0_2px_8px_rgba(107,169,110,0.3)] text-[40px]" style={{ fontFamily: "Playfair Display, serif" }}>
                  {islamicConfig.name}
                </h1>
                <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-[#6BA96E] to-[#5d9460] mx-auto rounded-full mb-4 sm:mb-6 shadow-[0_0_10px_rgba(107,169,110,0.4)]" />
                <p className="text-[#1a1a1a] max-w-2xl mx-auto leading-relaxed text-[15px] sm:text-[16px] px-6 sm:px-12 lg:px-[78px] font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {islamicConfig.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Spiritual Guides Section - Optimized spacing to prevent overlap */}
        <section className="px-6 mb-20 relative mt-8 sm:mt-4 md:-mt-4">
          <div className="max-w-6xl mx-auto relative">
            {/* Agent Slider */}
            <div className="relative z-10">
              <AgentSlider 
                agents={islamicConfig.agents}
                faithColor="#6BA96E"
                faithColorHover="#5d9460"
                canAccessPremium={canAccessPremium}
                handleLaunchAgent={handleLaunchAgent}
                handleSaveGuide={handleSaveGuide}
                handleOpenOverlay={handleOpenOverlay}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Agent Interaction Guide */}
        <section className="px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-[#6BA96E]/30 hover:border-[#5d9460]/50 transition-all duration-500 shadow-[0_8px_30px_rgba(107,169,110,0.15)] rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6BA96E]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-[#6BA96E] via-[#5d9460] to-[#6BA96E] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                    Agent Interaction Guide
                  </h3>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#6BA96E] to-[#5d9460] mx-auto rounded-full" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    { 
                      value: "how-it-works", 
                      icon: Sparkles, 
                      title: "HOW IT WORKS", 
                      content: selectedAgent.howItWorks,
                      gradient: "from-[#6BA96E] to-[#5d9460]" 
                    },
                    { 
                      value: "what-to-ask", 
                      icon: MessageCircle, 
                      title: "WHAT TO ASK", 
                      content: selectedAgent.whatToAsk,
                      gradient: "from-[#5d9460] to-[#6BA96E]" 
                    },
                    { 
                      value: "what-to-expect", 
                      icon: Star, 
                      title: "WHAT TO EXPECT", 
                      content: selectedAgent.whatToExpected,
                      gradient: "from-[#6BA96E] to-[#7AB87D]" 
                    }
                  ].map((item) => (
                    <AccordionItem 
                      key={item.value} 
                      value={item.value}
                      className="border-[#6BA96E]/20 bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden hover:border-[#5d9460]/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm tracking-widest text-[#6BA96E] group-hover:text-[#5d9460] transition-colors duration-300">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-gray-700 leading-relaxed">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Explore Topics Section */}
        <section className="px-6 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-[#6BA96E] via-[#5d9460] to-[#6BA96E] bg-clip-text text-transparent" style={{ fontFamily: "Playfair Display, serif" }}>
                Explore Topics
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#6BA96E] to-[#5d9460] mx-auto rounded-full mb-6" />
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Raleway, sans-serif" }}>
                Discover the wisdom of Islam through the Quran, Hadith, and scholarly traditions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {islamicConfig.topicsWithQuestions.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Card 
                    className="bg-white/70 backdrop-blur-xl border-[#6BA96E]/30 hover:border-[#5d9460]/60 transition-all duration-500 cursor-pointer group shadow-[0_4px_20px_rgba(107,169,110,0.1)] hover:shadow-[0_8px_30px_rgba(107,169,110,0.2)] rounded-2xl h-full p-6"
                    onClick={() => setSelectedTopic(selectedTopic === topic.topic ? null : topic.topic)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6BA96E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6BA96E] to-[#5d9460] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-3 group-hover:text-[#6BA96E] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
                        {topic.topic}
                      </h3>
                      
                      <AnimatePresence>
                        {selectedTopic === topic.topic && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-[#6BA96E]/20 mt-4 space-y-2">
                              {topic.questions.map((question, qIndex) => (
                                <p key={qIndex} className="text-sm text-gray-700 hover:text-[#6BA96E] transition-colors duration-200 cursor-pointer">
                                  • {question}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section - Your Spiritual Journey */}
        <section className="px-4 sm:px-6 mb-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-white/40 border-2 hover:border-white/60 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] rounded-3xl overflow-hidden relative">
                {/* Mosque Prayer Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={mosquePrayerImage} 
                    alt="Mosque Prayer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 z-10" />
                
                {/* Light gradient overlay for glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-80 z-20 bg-[rgba(250,250,250,0.77)]" />
                
                <div className="relative z-30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h3 className="text-[22px] sm:text-2xl lg:text-3xl text-gray-900 flex items-center" style={{ fontFamily: "Playfair Display, serif" }}>
                      <Star className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4 text-[#FFD369]" />
                      Your Spiritual Journey
                    </h3>
                    <Badge variant="outline" className="border-white/40 border-2 text-[#6BA96E] bg-white/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                      Level {Math.floor(unlockedBadges.length / 3) + 1}
                    </Badge>
                  </div>
                  
                  {/* Enhanced Stats Grid - Mobile optimized */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
                    {[
                      { icon: MessageSquare, value: "47", label: "Conversations", color: "[#6BA96E]" },
                      { icon: Star, value: unlockedBadges.length, label: "Badges", color: "[#FFD369]" },
                      { icon: Flower2, value: totalWisdomPoints, label: "Wisdom Points", color: "[#5d9460]" },
                      { icon: Heart, value: "7", label: "Day Streak", color: "[#FFD369]" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                        className="text-center p-4 sm:p-5 lg:p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 group shadow-sm hover:shadow-md touch-manipulation"
                      >
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color} mx-auto mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300`} />
                        <div className="text-xl sm:text-2xl text-gray-900 font-medium mb-1">{stat.value}</div>
                        <div className="text-[13px] sm:text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Latest Achievement - Contemporary design */}
                  {unlockedBadges.length > 0 && unlockedBadges[unlockedBadges.length - 1] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/40 border-2 border-white/50 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-md shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-[#6BA96E] to-[#FFD369] rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-md">
                          {unlockedBadges[unlockedBadges.length - 1].icon && typeof unlockedBadges[unlockedBadges.length - 1].icon === 'function' ? 
                            React.createElement(unlockedBadges[unlockedBadges.length - 1].icon, { className: "w-5 h-5 text-white" }) :
                            <Star className="w-5 h-5 text-white" />
                          }
                        </div>
                        <span className="text-[#6BA96E] font-medium text-[15px] sm:text-[16px]">Latest Achievement</span>
                      </div>
                      <div className="text-xl text-gray-900 font-medium mb-2">{unlockedBadges[unlockedBadges.length - 1].name}</div>
                      <div className="text-gray-700 leading-relaxed">{unlockedBadges[unlockedBadges.length - 1].description}</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                      className="bg-white/50 border-2 border-white/40 rounded-xl p-6 mb-8 backdrop-blur-sm"
                    >
                      <div className="text-gray-700 text-center leading-relaxed">
                        Begin your spiritual journey by exploring different faith traditions
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons - Mobile optimized */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <button 
                      className="group/profile relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BA96E] via-[#7AB87D] to-[#8AC78C] hover:from-[#5d9460] hover:via-[#6BA96E] hover:to-[#7AB87D] border-2 border-[#6BA96E]/30 hover:border-[#6BA96E]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_20px_rgba(107,169,110,0.25)] hover:shadow-[0_8px_35px_rgba(93,148,96,0.4)] touch-manipulation"
                      onClick={() => onNavigate?.("profile")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5d9460]/10 via-transparent to-white/30" />
                      <div className="absolute top-0 left-0 right-0 h-[20px] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-white tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>View Profile</span>
                    </button>
                    <button 
                      className="group/explore relative flex-1 min-h-[48px] sm:h-12 flex items-center justify-center gap-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-[#6BA96E]/30 hover:border-[#6BA96E]/50 transition-all duration-300 active:scale-[0.97] overflow-hidden shadow-[0_4px_15px_rgba(107,169,110,0.15)] hover:shadow-[0_6px_25px_rgba(107,169,110,0.25)] touch-manipulation backdrop-blur-sm"
                      onClick={() => onNavigate?.("circle")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7AB87D]/15 to-transparent opacity-0 group-hover/explore:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/60 rounded-2xl" />
                      <span className="relative font-semibold text-[14px] sm:text-[15px] text-[#6BA96E] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>Explore Faiths</span>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Islamic Faith Groups */}
        <IslamicFaithGroups onNavigate={onNavigate} />
      </div>

      {/* Enhanced Footer */}
      <AppFooter onOpenMission={onOpenMission} onNavigate={onNavigate} />

      {/* AI Guide Overlay Dialog */}
      <Dialog open={isOverlayOpen} onOpenChange={handleCloseOverlay}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] sm:h-[95vh] p-0 bg-[#0B1426] border-[#2E7D32]/30 overflow-hidden [&>button]:hidden">
          {/* Accessible title and description - visually hidden */}
          <DialogTitle className="sr-only">
            AI Guide Conversation with {overlayAgentName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Interactive chat interface for conversing with {overlayAgentName}. This window contains an embedded chat application. Press Escape or click the close button to exit.
          </DialogDescription>

          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-[#0B1426] via-[#0B1426]/95 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-[#6BA96E] animate-pulse shadow-lg shadow-[#6BA96E]/50" />
              <span className="text-white text-sm sm:text-base">Conversing with {overlayAgentName}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseOverlay}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#162844]/80 hover:bg-[#162844] border border-[#6BA96E]/30 hover:border-[#6BA96E] transition-all duration-300 hover:scale-110"
              aria-label="Close conversation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#6BA96E]" />
            </Button>
          </div>
          
          {/* Loading indicator */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1426] z-40">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#6BA96E]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#6BA96E] border-t-transparent animate-spin"></div>
                </div>
                <p className="text-slate-300 text-sm">Connecting to {overlayAgentName}...</p>
              </div>
            </div>
          )}
          
          {/* iframe container */}
          <div className="w-full h-full pt-12 sm:pt-16">
            {overlayUrl && (
              <iframe
                src={overlayUrl}
                className="w-full h-full border-0"
                title={`Chat with ${overlayAgentName}`}
                allow="microphone *; camera *; autoplay; encrypted-media; fullscreen"
                onLoad={() => setIsIframeLoading(false)}
                loading="eager"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}