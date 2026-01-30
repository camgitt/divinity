import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useBadges } from "./badges-context";
import { useHapticFeedback } from "./hooks/use-haptic";
import { Sparkles, Heart, Wind, Mountain, Leaf, Waves } from "lucide-react";

export interface MeditationSession {
  id: string;
  title: string;
  duration: number; // in seconds
  category: 'mindfulness' | 'loving-kindness' | 'body-scan' | 'breathing' | 'visualization' | 'mantra';
  faithTradition?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  audioUrl?: string;
  instructor?: string;
  completedAt?: Date;
  suggestedAmbient?: 'rain' | 'ocean' | 'forest' | 'wind' | 'bells' | 'music' | 'none';
  videoUrl?: string;
  posterUrl?: string;
}

export interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  favoriteTechnique: string;
  lastMeditated?: Date;
  sessionsThisWeek: number;
  sessionsThisMonth: number;
}

export interface MeditationHistory {
  date: Date;
  sessionId: string;
  duration: number;
  completed: boolean;
}

interface MeditationContextType {
  // Session state
  activeSession: MeditationSession | null;
  isPlaying: boolean;
  currentTime: number;
  
  // Statistics
  stats: MeditationStats;
  history: MeditationHistory[];
  
  // Actions
  startSession: (session: MeditationSession) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  completeSession: () => void;
  endSession: () => void;
  
  // Library
  getAllSessions: () => MeditationSession[];
  getSessionsByFaith: (faith: string) => MeditationSession[];
  getSessionsByDuration: (maxMinutes: number) => MeditationSession[];
  getSessionsByCategory: (category: MeditationSession['category']) => MeditationSession[];
  
  // Tracking
  updateCurrentTime: (time: number) => void;
  getStreakInfo: () => { currentStreak: number; longestStreak: number };
}

const MeditationContext = createContext<MeditationContextType | undefined>(undefined);

export function useMeditation() {
  const context = useContext(MeditationContext);
  if (!context) {
    throw new Error("useMeditation must be used within MeditationProvider");
  }
  return context;
}

const STORAGE_KEY = 'divinityagi_meditation';

// Meditation library data
const meditationLibrary: MeditationSession[] = [
  // Mindfulness
  {
    id: 'mindfulness-1',
    title: 'Morning Mindfulness',
    duration: 180, // 3:00 minutes
    category: 'mindfulness',
    difficulty: 'beginner',
    description: 'Start your day with gentle awareness and presence.',
    instructor: 'Pastor Sarah Chen',
    suggestedAmbient: 'forest',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2025/12/Christian-Morning-Meditation-1-2.mp4'
  },
  {
    id: 'mindfulness-2',
    title: 'Present Moment Awareness',
    duration: 600, // 10 minutes
    category: 'mindfulness',
    difficulty: 'intermediate',
    description: 'Deepen your connection to the present moment.',
    instructor: 'Venerable Ananda',
    suggestedAmbient: 'bells',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2025/12/Mindful-Presence-Buddhism-v2.mp4',
    posterUrl: 'figma:asset/5e17576a123d013531b244a8e46ec244917ba1f6.png'
  },
  
  // Loving-kindness (Metta)
  {
    id: 'metta-1',
    title: 'Loving-Kindness Meditation',
    duration: 600, // 10 minutes
    category: 'loving-kindness',
    faithTradition: 'Buddhism',
    difficulty: 'beginner',
    description: 'Cultivate compassion for yourself and others.',
    instructor: 'Daishi Ren',
    suggestedAmbient: 'bells',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Loving-Kindness-10min.mp4',
    posterUrl: 'figma:asset/d5755840b3207008deb24d21fc20249562a6c3a5.png'
  },
  {
    id: 'metta-2',
    title: 'Universal Compassion',
    duration: 600, // 10 minutes
    category: 'loving-kindness',
    faithTradition: 'Buddhism',
    difficulty: 'advanced',
    description: 'Extend loving-kindness to all beings without exception.',
    instructor: 'Ven. Tenzin Palmo',
    suggestedAmbient: 'music',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Universal-Compassion-10min.mp4',
    posterUrl: 'figma:asset/1b6a98f9be1363661182eac67cce3eea18c179f5.png'
  },
  
  // Christian Contemplative
  {
    id: 'contemplative-1',
    title: 'Centering Prayer',
    duration: 300, // 5 minutes
    category: 'mantra',
    faithTradition: 'Christianity',
    difficulty: 'intermediate',
    description: 'Silent prayer opening yourself to God\'s presence.',
    instructor: 'Sister Isabella Rossi',
    suggestedAmbient: 'bells',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Centering-Prayer-5-min.mp4',
    posterUrl: 'figma:asset/ceab5ccdee5dddc1b1a3009df5953a8e025e4be8.png'
  },
  {
    id: 'lectio-1',
    title: 'Lectio Divina',
    duration: 300, // 5 minutes
    category: 'mindfulness',
    faithTradition: 'Christianity',
    difficulty: 'beginner',
    description: 'Sacred reading and contemplative prayer with Scripture.',
    instructor: 'Sister Isabella Rossi',
    suggestedAmbient: 'wind',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Lectio-Divina-5-min.mp4',
    posterUrl: 'figma:asset/2e66d1f17222cb04d04c7fabe590cd9ef691ae60.png'
  },
  
  // Islamic Dhikr
  {
    id: 'dhikr-1',
    title: 'Dhikr: Remembrance of Allah',
    duration: 480, // 8 minutes
    category: 'mantra',
    faithTradition: 'Islam',
    difficulty: 'beginner',
    description: 'Remembrance through repetition of sacred phrases.',
    instructor: 'Ustadh Ali Hassan (University Chaplain)',
    suggestedAmbient: 'wind',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Dhikr-Remembrance-of-Allah-8min.mp4',
    posterUrl: 'figma:asset/5bd5e5a827bcc47a5cce185f46e5cecc4050411d.png'
  },
  
  // Hindu Meditation
  {
    id: 'om-meditation-1',
    title: 'The Primordial Sound (Om Meditation)',
    duration: 480, // 8 minutes
    category: 'mantra',
    faithTradition: 'Hinduism',
    difficulty: 'intermediate',
    description: 'Chanting the primordial sound of the universe.',
    instructor: 'Instructor Anika',
    suggestedAmbient: 'bells',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/The-Primordial-Sound-Om-Meditation-8min.mp4',
    posterUrl: 'figma:asset/6804e269746c32f9f6ce0397375c56ee925762fb.png'
  },
  {
    id: 'chakra-balancing-1',
    title: 'Awakening the Serpent (Chakra Balancing)',
    duration: 720, // 12 minutes
    category: 'visualization',
    faithTradition: 'Hinduism',
    difficulty: 'advanced',
    description: 'Journey through the seven energy centers.',
    instructor: 'Yogini Anandamayi (Tantric Adept)',
    suggestedAmbient: 'bells',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Awakening-the-Serpent-Chakra-Balancing-1.mp4',
    posterUrl: 'figma:asset/5e9fc179c38c1dc40d5ee2ddcf3c017f22f29e0a.png'
  },
  
  // Jewish Meditation
  {
    id: 'hitbodedut-1',
    title: 'Hitbodedut: Self-Reflection',
    duration: 420, // 7 minutes
    category: 'mindfulness',
    faithTradition: 'Judaism',
    difficulty: 'beginner',
    description: 'Meditative conversation with the Divine.',
    instructor: 'Rabbi Miriam Levin',
    suggestedAmbient: 'forest',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Hitbodedut-The-Hearts-Conversation-1.mp4'
  },
  
  // Breathing Exercises
  {
    id: 'box-breathing-1',
    title: 'Box Breathing',
    duration: 315, // 5:15 minutes
    category: 'breathing',
    difficulty: 'beginner',
    description: 'Four-part breathing technique for calm and focus.',
    instructor: 'Guided By Maestro Javier Santos',
    suggestedAmbient: 'wind',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Box-Breathing-Guided-Meditation.mp4',
    posterUrl: 'figma:asset/24f0a1ea89780987cb188a9ac95b060c326b513d.png'
  },
  
  // Body Scan
  {
    id: 'body-scan-1',
    title: 'Progressive Relaxation',
    duration: 625, // 10:25 minutes
    category: 'body-scan',
    difficulty: 'beginner',
    description: 'Systematic relaxation from head to toe.',
    instructor: 'Guided by Gao Lian',
    suggestedAmbient: 'ocean',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/The-Universal-Body-Progressive-Relaxation.mp4',
    posterUrl: 'figma:asset/519de63f5105922570691b96b5438c3d6b1dc76f.png'
  },
  
  // Taoist Meditation
  {
    id: 'taoist-1',
    title: 'Inner Smile Meditation',
    duration: 630, // 10:30 minutes
    category: 'visualization',
    faithTradition: 'Taoism',
    difficulty: 'intermediate',
    description: 'Cultivate internal harmony and positive energy.',
    instructor: 'Guided by Adept Xu Yunyao',
    suggestedAmbient: 'forest',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Preparation_-The-Body-as-a-Landscape-1.mp4',
    posterUrl: 'figma:asset/df4e18b635ee0497b885700e09fb8f58fa2ecb45.png'
  },
  
  // Universal
  {
    id: 'gratitude-1',
    title: 'Gratitude Meditation',
    duration: 300, // 5 minutes
    category: 'mindfulness',
    difficulty: 'beginner',
    description: 'Cultivate thankfulness and appreciation.',
    instructor: 'Pastor Sarah Chen',
    suggestedAmbient: 'forest',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2025/12/Christian-Graditude-Meditation-5min.mp4',
    posterUrl: 'figma:asset/de9fd3f0d629c0adda335e3d63e6e23f34facaed.png'
  },
  {
    id: 'walking-meditation-1',
    title: 'Walking Meditation',
    duration: 300, // 5 minutes
    category: 'mindfulness',
    difficulty: 'beginner',
    description: 'Mindful movement and awareness in motion.',
    instructor: 'Sister Chan Khong',
    suggestedAmbient: 'forest',
    videoUrl: 'https://divinityagi.com/wp-content/uploads/2026/01/Walking-Meditation-5min.mp4'
  }
];

export function MeditationProvider({ children }: { children: ReactNode }) {
  const { awardBadge } = useBadges();
  const haptic = useHapticFeedback();
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [stats, setStats] = useState<MeditationStats>({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    favoriteTechnique: 'mindfulness',
    sessionsThisWeek: 0,
    sessionsThisMonth: 0
  });
  const [history, setHistory] = useState<MeditationHistory[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setStats(data.stats || stats);
        setHistory(data.history?.map((h: any) => ({
          ...h,
          date: new Date(h.date)
        })) || []);
      }
    } catch (error) {
      console.error('Failed to load meditation data:', error);
    }
  }, []);

  // Save to localStorage whenever stats or history change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        stats,
        history
      }));
    } catch (error) {
      console.error('Failed to save meditation data:', error);
    }
  }, [stats, history]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeSession) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= activeSession.duration) {
            completeSession();
            return activeSession.duration;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSession]);

  // Calculate streak
  const calculateStreak = (): { current: number; longest: number } => {
    if (history.length === 0) return { current: 0, longest: 0 };

    const sortedHistory = [...history].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if user meditated today or yesterday
    const lastSession = sortedHistory[0];
    const lastDate = new Date(lastSession.date);
    lastDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 1) {
      return { current: 0, longest: stats.longestStreak };
    }
    
    // Calculate current streak
    let checkDate = new Date(today);
    for (const session of sortedHistory) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      
      const diff = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diff === 0 || diff === 1) {
        currentStreak++;
        checkDate = sessionDate;
      } else {
        break;
      }
    }
    
    longestStreak = Math.max(currentStreak, stats.longestStreak);
    
    return { current: currentStreak, longest: longestStreak };
  };

  const startSession = (session: MeditationSession) => {
    haptic.heavyTap(); // Important action - strong feedback
    setActiveSession(session);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const pauseSession = () => {
    haptic.tap(); // Standard feedback
    setIsPlaying(false);
  };

  const resumeSession = () => {
    haptic.tap(); // Standard feedback
    setIsPlaying(true);
  };

  const completeSession = () => {
    if (!activeSession) return;

    haptic.success(); // Achievement pattern - double tap celebration
    const minutesCompleted = Math.floor(currentTime / 60);
    const newHistory: MeditationHistory = {
      date: new Date(),
      sessionId: activeSession.id,
      duration: currentTime,
      completed: currentTime >= activeSession.duration
    };

    setHistory(prev => [...prev, newHistory]);

    // Update stats
    const streakInfo = calculateStreak();
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + minutesCompleted,
      currentStreak: streakInfo.current,
      longestStreak: streakInfo.longest,
      lastMeditated: new Date(),
      sessionsThisWeek: prev.sessionsThisWeek + 1,
      sessionsThisMonth: prev.sessionsThisMonth + 1
    }));

    // Award badges - deferred to avoid state update warnings
    setTimeout(() => {
      if (stats.totalSessions === 0) {
        awardBadge({
          id: 'first_meditation',
          name: 'First Meditation',
          description: 'Completed your first meditation session',
          icon: Sparkles,
          category: 'meditation',
          rarity: 'common',
          tokenReward: 50
        });
      }

      if (stats.totalSessions + 1 === 10) {
        awardBadge({
          id: 'meditation_novice',
          name: 'Meditation Novice',
          description: 'Completed 10 meditation sessions',
          icon: Leaf,
          category: 'meditation',
          rarity: 'common',
          tokenReward: 100
        });
      }

      if (stats.totalSessions + 1 === 50) {
        awardBadge({
          id: 'meditation_adept',
          name: 'Meditation Adept',
          description: 'Completed 50 meditation sessions',
          icon: Mountain,
          category: 'meditation',
          rarity: 'rare',
          tokenReward: 200
        });
      }

      if (streakInfo.current === 7) {
        awardBadge({
          id: 'week_streak',
          name: 'Week of Mindfulness',
          description: 'Meditated for 7 consecutive days',
          icon: Waves,
          category: 'meditation',
          rarity: 'rare',
          tokenReward: 150
        });
      }

      if (streakInfo.current === 30) {
        awardBadge({
          id: 'month_streak',
          name: 'Month of Peace',
          description: 'Meditated for 30 consecutive days',
          icon: Heart,
          category: 'meditation',
          rarity: 'epic',
          tokenReward: 500
        });
      }

      if (minutesCompleted >= 30) {
        awardBadge({
          id: 'deep_meditation',
          name: 'Deep Meditation',
          description: 'Completed a 30+ minute meditation',
          icon: Wind,
          category: 'meditation',
          rarity: 'rare',
          tokenReward: 100
        });
      }
    }, 0);

    setIsPlaying(false);
    setActiveSession(null);
    setCurrentTime(0);
  };

  const endSession = () => {
    setIsPlaying(false);
    setActiveSession(null);
    setCurrentTime(0);
  };

  const getAllSessions = () => meditationLibrary;

  const getSessionsByFaith = (faith: string) => {
    return meditationLibrary.filter(session => 
      session.faithTradition?.toLowerCase() === faith.toLowerCase() || !session.faithTradition
    );
  };

  const getSessionsByDuration = (maxMinutes: number) => {
    return meditationLibrary.filter(session => session.duration <= maxMinutes * 60);
  };

  const getSessionsByCategory = (category: MeditationSession['category']) => {
    return meditationLibrary.filter(session => session.category === category);
  };

  const updateCurrentTime = (time: number) => {
    setCurrentTime(time);
  };

  const getStreakInfo = () => calculateStreak();

  const value: MeditationContextType = {
    activeSession,
    isPlaying,
    currentTime,
    stats,
    history,
    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    endSession,
    getAllSessions,
    getSessionsByFaith,
    getSessionsByDuration,
    getSessionsByCategory,
    updateCurrentTime,
    getStreakInfo
  };

  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
}