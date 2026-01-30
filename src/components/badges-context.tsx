import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from "sonner@2.0.3";
import { 
  Star, 
  Cross, 
  Moon, 
  Sun, 
  Flower2, 
  Triangle, 
  Hexagon,
  Circle as CircleIcon,
  Infinity,
  Mountain,
  Leaf,
  Heart,
  Crown,
  Shield,
  Globe,
  Users,
  MessageCircle,
  Calendar,
  Zap,
  Award,
  BookOpen,
  Sparkles,
  Clock,
  Target
} from "lucide-react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'faith' | 'wisdom' | 'community' | 'journey' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  tokenReward: number;
  requirements: {
    type: 'faith_visit' | 'session_count' | 'streak' | 'special_action' | 'wisdom_points';
    target: string | number;
    current?: number;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  faithTradition?: string;
  wisdomGained?: string[];
}

export interface FaithWisdom {
  tradition: string;
  teachings: string[];
  coreValues: string[];
  practices: string[];
  visitCount: number;
  sessionMinutes: number;
  lastVisited?: Date;
}

export interface BadgesContextType {
  badges: Badge[];
  faithWisdom: Record<string, FaithWisdom>;
  totalWisdomPoints: number;
  unlockedBadges: Badge[];
  progressBadges: Badge[];
  visitFaithTradition: (tradition: string, sessionMinutes?: number) => void;
  completeAction: (actionType: string, data?: any) => void;
  checkForNewBadges: () => Badge[];
  getUserWisdomSummary: () => string;
  getBadgesByCategory: (category: string) => Badge[];
  getRecentAchievements: (days?: number) => Badge[];
  awardBadge: (customBadge: Partial<Badge>) => void;
}

const defaultFaithWisdom: Record<string, FaithWisdom> = {
  christianity: {
    tradition: 'Christianity',
    teachings: ['Love thy neighbor as thyself', 'Faith, Hope, and Charity', 'The Golden Rule'],
    coreValues: ['Love', 'Forgiveness', 'Compassion', 'Service'],
    practices: ['Prayer', 'Scripture Reading', 'Community Worship', 'Acts of Service'],
    visitCount: 0,
    sessionMinutes: 0
  },
  islam: {
    tradition: 'Islam',
    teachings: ['Five Pillars of Islam', 'Unity of God (Tawhid)', 'Compassion and Justice'],
    coreValues: ['Submission to Allah', 'Community (Ummah)', 'Justice', 'Mercy'],
    practices: ['Salah (Prayer)', 'Dhikr (Remembrance)', 'Quran Recitation', 'Charity (Zakat)'],
    visitCount: 0,
    sessionMinutes: 0
  },
  judaism: {
    tradition: 'Judaism',
    teachings: ['Torah Wisdom', 'Tikkun Olam (Repairing the World)', 'Ethical Monotheism'],
    coreValues: ['Learning', 'Community', 'Justice', 'Memory'],
    practices: ['Torah Study', 'Shabbat Observance', 'Prayer', 'Mitzvot (Good Deeds)'],
    visitCount: 0,
    sessionMinutes: 0
  },
  buddhism: {
    tradition: 'Buddhism',
    teachings: ['Four Noble Truths', 'Eightfold Path', 'Impermanence and Compassion'],
    coreValues: ['Compassion', 'Mindfulness', 'Non-attachment', 'Wisdom'],
    practices: ['Meditation', 'Mindfulness', 'Loving-kindness', 'Right Action'],
    visitCount: 0,
    sessionMinutes: 0
  },
  hinduism: {
    tradition: 'Hinduism',
    teachings: ['Dharma (Righteous Living)', 'Karma and Reincarnation', 'Unity in Diversity'],
    coreValues: ['Dharma', 'Ahimsa (Non-violence)', 'Devotion', 'Self-realization'],
    practices: ['Yoga', 'Meditation', 'Devotional Practices', 'Scriptural Study'],
    visitCount: 0,
    sessionMinutes: 0
  },
  sikhism: {
    tradition: 'Sikhism',
    teachings: ['Equality of All People', 'Service Before Self', 'One Divine Creator'],
    coreValues: ['Equality', 'Service', 'Honesty', 'Humility'],
    practices: ['Community Service', 'Daily Prayer', 'Sharing with Others', 'Honest Living'],
    visitCount: 0,
    sessionMinutes: 0
  },
  taoism: {
    tradition: 'Taoism',
    teachings: ['The Way (Tao)', 'Harmony with Nature', 'Wu Wei (Effortless Action)'],
    coreValues: ['Balance', 'Simplicity', 'Naturalness', 'Harmony'],
    practices: ['Meditation', 'Qigong', 'Nature Connection', 'Simple Living'],
    visitCount: 0,
    sessionMinutes: 0
  },
  indigenous: {
    tradition: 'Indigenous Spirituality',
    teachings: ['Connection to Earth', 'Ancestral Wisdom', 'Sacred Reciprocity'],
    coreValues: ['Respect for Nature', 'Community', 'Ancestral Honor', 'Balance'],
    practices: ['Ceremony', 'Nature Rituals', 'Storytelling', 'Community Gathering'],
    visitCount: 0,
    sessionMinutes: 0
  },
  secular: {
    tradition: 'Secular Spirituality',
    teachings: ['Human Dignity', 'Rational Compassion', 'Ethical Living'],
    coreValues: ['Reason', 'Compassion', 'Human Rights', 'Scientific Wonder'],
    practices: ['Meditation', 'Ethical Reflection', 'Community Service', 'Mindful Living'],
    visitCount: 0,
    sessionMinutes: 0
  },
  universal: {
    tradition: 'Universal Spirituality',
    teachings: ['Unity of All Paths', 'Universal Love', 'Interconnectedness'],
    coreValues: ['Unity', 'Inclusivity', 'Love', 'Understanding'],
    practices: ['Interfaith Dialogue', 'Universal Prayer', 'Compassionate Action', 'Bridge-building'],
    visitCount: 0,
    sessionMinutes: 0
  }
};

const defaultBadges: Badge[] = [
  // Faith Tradition Badges
  {
    id: 'christian_seeker',
    name: 'Christian Seeker',
    description: 'Explored Christian wisdom and teachings',
    icon: Cross,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'christianity' },
    unlocked: false,
    faithTradition: 'christianity',
    wisdomGained: ['Love and forgiveness are central to spiritual growth', 'Service to others reflects divine love']
  },
  {
    id: 'islamic_scholar',
    name: 'Islamic Scholar',
    description: 'Gained insights from Islamic teachings',
    icon: Moon,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'islam' },
    unlocked: false,
    faithTradition: 'islam',
    wisdomGained: ['Submission to the Divine brings peace', 'Community support strengthens faith']
  },
  {
    id: 'jewish_wisdom',
    name: 'Jewish Wisdom',
    description: 'Studied Jewish teachings and traditions',
    icon: Star,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'judaism' },
    unlocked: false,
    faithTradition: 'judaism',
    wisdomGained: ['Learning and questioning deepen understanding', 'Repairing the world is sacred work']
  },
  {
    id: 'buddhist_path',
    name: 'Buddhist Path',
    description: 'Walked the path of Buddhist enlightenment',
    icon: CircleIcon,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'buddhism' },
    unlocked: false,
    faithTradition: 'buddhism',
    wisdomGained: ['Mindfulness reduces suffering', 'Compassion for all beings brings peace']
  },
  {
    id: 'hindu_dharma',
    name: 'Hindu Dharma',
    description: 'Embraced Hindu philosophical wisdom',
    icon: Sun,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'hinduism' },
    unlocked: false,
    faithTradition: 'hinduism',
    wisdomGained: ['Dharma guides righteous living', 'Multiple paths lead to the Divine']
  },
  {
    id: 'sikh_equality',
    name: 'Sikh Equality',
    description: 'Learned from Sikh principles of equality',
    icon: Triangle,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'sikhism' },
    unlocked: false,
    faithTradition: 'sikhism',
    wisdomGained: ['All people are equal before the Divine', 'Service to others is spiritual practice']
  },
  {
    id: 'taoist_way',
    name: 'Taoist Way',
    description: 'Found harmony through Taoist wisdom',
    icon: Infinity,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'taoism' },
    unlocked: false,
    faithTradition: 'taoism',
    wisdomGained: ['Natural flow creates harmony', 'Simplicity reveals deeper truths']
  },
  {
    id: 'indigenous_connection',
    name: 'Indigenous Connection',
    description: 'Connected with indigenous spiritual wisdom',
    icon: Mountain,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'indigenous' },
    unlocked: false,
    faithTradition: 'indigenous',
    wisdomGained: ['Earth connection brings spiritual grounding', 'Ancestral wisdom guides present actions']
  },
  {
    id: 'secular_ethics',
    name: 'Secular Ethics',
    description: 'Explored secular spiritual principles',
    icon: Hexagon,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'secular' },
    unlocked: false,
    faithTradition: 'secular',
    wisdomGained: ['Reason and compassion guide ethical living', 'Human dignity transcends beliefs']
  },
  {
    id: 'universal_unity',
    name: 'Universal Unity',
    description: 'Embraced universal spiritual principles',
    icon: Globe,
    category: 'faith',
    rarity: 'common',
    tokenReward: 25,
    requirements: { type: 'faith_visit', target: 'universal' },
    unlocked: false,
    faithTradition: 'universal',
    wisdomGained: ['All spiritual paths share common truths', 'Unity consciousness transcends divisions']
  },

  // Wisdom Achievement Badges
  {
    id: 'interfaith_explorer',
    name: 'Interfaith Explorer',
    description: 'Visited 3 different faith traditions',
    icon: Heart,
    category: 'wisdom',
    rarity: 'rare',
    tokenReward: 75,
    requirements: { type: 'faith_visit', target: 3, current: 0 },
    unlocked: false,
    wisdomGained: ['Different paths lead to similar truths', 'Diversity enriches spiritual understanding']
  },
  {
    id: 'wisdom_seeker',
    name: 'Wisdom Seeker',
    description: 'Visited 5 different faith traditions',
    icon: BookOpen,
    category: 'wisdom',
    rarity: 'epic',
    tokenReward: 150,
    requirements: { type: 'faith_visit', target: 5, current: 0 },
    unlocked: false,
    wisdomGained: ['Comparative wisdom reveals universal principles', 'Open-mindedness accelerates growth']
  },
  {
    id: 'universal_sage',
    name: 'Universal Sage',
    description: 'Visited all 10 faith traditions',
    icon: Crown,
    category: 'wisdom',
    rarity: 'legendary',
    tokenReward: 500,
    requirements: { type: 'faith_visit', target: 10, current: 0 },
    unlocked: false,
    wisdomGained: ['All traditions offer valuable perspectives', 'True wisdom transcends boundaries', 'Unity underlies apparent diversity']
  },

  // Journey Badges
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Completed 10 spiritual sessions',
    icon: Award,
    category: 'journey',
    rarity: 'common',
    tokenReward: 50,
    requirements: { type: 'session_count', target: 10, current: 0 },
    unlocked: false,
    wisdomGained: ['Consistency deepens spiritual practice']
  },
  {
    id: 'spiritual_warrior',
    name: 'Spiritual Warrior',
    description: 'Completed 50 spiritual sessions',
    icon: Shield,
    category: 'journey',
    rarity: 'rare',
    tokenReward: 100,
    requirements: { type: 'session_count', target: 50, current: 0 },
    unlocked: false,
    wisdomGained: ['Persistence reveals deeper spiritual layers']
  },
  {
    id: 'enlightened_master',
    name: 'Enlightened Master',
    description: 'Completed 100 spiritual sessions',
    icon: Sparkles,
    category: 'journey',
    rarity: 'legendary',
    tokenReward: 300,
    requirements: { type: 'session_count', target: 100, current: 0 },
    unlocked: false,
    wisdomGained: ['Mastery comes through dedicated practice', 'Inner transformation guides outer action']
  },

  // Community Badges
  {
    id: 'community_builder',
    name: 'Community Builder',
    description: 'Engaged with verified leaders',
    icon: Users,
    category: 'community',
    rarity: 'rare',
    tokenReward: 75,
    requirements: { type: 'special_action', target: 'leader_engagement' },
    unlocked: false,
    wisdomGained: ['Community connection strengthens spiritual journey']
  },
  {
    id: 'daily_devotee',
    name: 'Daily Devotee',
    description: 'Maintained a 7-day spiritual practice streak',
    icon: Calendar,
    category: 'journey',
    rarity: 'rare',
    tokenReward: 100,
    requirements: { type: 'streak', target: 7, current: 0 },
    unlocked: false,
    wisdomGained: ['Daily practice creates lasting transformation']
  },

  // Comprehensive Achievement System
  {
    id: 'interfaith_master',
    name: 'Interfaith Master',
    description: 'Explored wisdom from 5 different faith traditions',
    icon: Globe,
    category: 'faith',
    rarity: 'epic',
    tokenReward: 200,
    requirements: { type: 'special_action', target: 'explore_5_faiths' },
    unlocked: false,
    wisdomGained: ['Understanding different paths reveals universal truths']
  },
  {
    id: 'wisdom_collector',
    name: 'Wisdom Collector',
    description: 'Accumulated 1000 wisdom points',
    icon: BookOpen,
    category: 'wisdom',
    rarity: 'rare',
    tokenReward: 150,
    requirements: { type: 'wisdom_points', target: 1000, current: 0 },
    unlocked: false,
    wisdomGained: ['Knowledge gathered through practice becomes true wisdom']
  },
  {
    id: 'time_master',
    name: 'Time Master',
    description: 'Spent 10 hours in spiritual practice',
    icon: Clock,
    category: 'journey',
    rarity: 'epic',
    tokenReward: 250,
    requirements: { type: 'session_time', target: 600, current: 0 }, // 600 minutes = 10 hours
    unlocked: false,
    wisdomGained: ['Time devoted to practice is never time lost']
  },
  {
    id: 'monthly_master',
    name: 'Monthly Master',
    description: 'Maintained a 30-day spiritual practice streak',
    icon: Award,
    category: 'journey',
    rarity: 'legendary',
    tokenReward: 500,
    requirements: { type: 'streak', target: 30, current: 0 },
    unlocked: false,
    wisdomGained: ['A month of devotion transforms the spirit']
  },
  {
    id: 'community_connector',
    name: 'Community Connector',
    description: 'Engaged with 10 different spiritual guides',
    icon: Users,
    category: 'community',
    rarity: 'rare',
    tokenReward: 175,
    requirements: { type: 'special_action', target: 'guide_interactions', current: 0 },
    unlocked: false,
    wisdomGained: ['Diverse spiritual connections enrich the journey']
  },
  {
    id: 'meditation_master',
    name: 'Meditation Master',
    description: 'Completed 50 meditation sessions',
    icon: Target,
    category: 'journey',
    rarity: 'epic',
    tokenReward: 300,
    requirements: { type: 'session_count', target: 50, current: 0 },
    unlocked: false,
    wisdomGained: ['Consistent meditation brings inner peace']
  },
  {
    id: 'wisdom_sage',
    name: 'Wisdom Sage',
    description: 'Accumulated 5000 wisdom points',
    icon: Crown,
    category: 'wisdom',
    rarity: 'legendary',
    tokenReward: 750,
    requirements: { type: 'wisdom_points', target: 5000, current: 0 },
    unlocked: false,
    wisdomGained: ['Great wisdom comes from sustained spiritual practice']
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Started 10 morning spiritual sessions',
    icon: Sun,
    category: 'journey',
    rarity: 'common',
    tokenReward: 75,
    requirements: { type: 'special_action', target: 'morning_sessions', current: 0 },
    unlocked: false,
    wisdomGained: ['Morning practice sets a peaceful tone for the day']
  },
  {
    id: 'night_owl',
    name: 'Night Owl', 
    description: 'Completed 10 evening reflection sessions',
    icon: Moon,
    category: 'journey',
    rarity: 'common',
    tokenReward: 75,
    requirements: { type: 'special_action', target: 'evening_sessions', current: 0 },
    unlocked: false,
    wisdomGained: ['Evening reflection brings closure and peace']
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Completed 100 spiritual sessions',
    icon: Award,
    category: 'journey',
    rarity: 'legendary',
    tokenReward: 1000,
    requirements: { type: 'session_count', target: 100, current: 0 },
    unlocked: false,
    wisdomGained: ['A hundred sessions mark the beginning of true mastery']
  }
];

const BadgesContext = createContext<BadgesContextType | undefined>(undefined);

export function BadgesProvider({ children }: { children: React.ReactNode }) {
  // Deduplicate default badges on initialization to prevent duplicate key warnings
  const uniqueDefaultBadges = defaultBadges.reduce((acc: Badge[], badge) => {
    if (!acc.find(b => b.id === badge.id)) {
      acc.push(badge);
    }
    return acc;
  }, []);
  
  const [badges, setBadges] = useState<Badge[]>(uniqueDefaultBadges);
  const [faithWisdom, setFaithWisdom] = useState<Record<string, FaithWisdom>>(defaultFaithWisdom);
  const [totalWisdomPoints, setTotalWisdomPoints] = useState(0);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedBadges = localStorage.getItem('divinityagi_badges');
    const savedWisdom = localStorage.getItem('divinityagi_faith_wisdom');
    const savedPoints = localStorage.getItem('divinityagi_wisdom_points');

    if (savedBadges) {
      try {
        const parsedBadges = JSON.parse(savedBadges);
        // Deduplicate badges by ID to prevent React key warnings
        const uniqueBadges = parsedBadges.reduce((acc: Badge[], badge: Badge) => {
          if (!acc.find(b => b.id === badge.id)) {
            acc.push(badge);
          }
          return acc;
        }, []);
        setBadges(uniqueBadges);
      } catch (error) {
        console.error('Error loading saved badges:', error);
      }
    }

    if (savedWisdom) {
      try {
        const parsedWisdom = JSON.parse(savedWisdom);
        setFaithWisdom(parsedWisdom);
      } catch (error) {
        console.error('Error loading saved wisdom:', error);
      }
    }

    if (savedPoints) {
      setTotalWisdomPoints(parseInt(savedPoints, 10) || 0);
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('divinityagi_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('divinityagi_faith_wisdom', JSON.stringify(faithWisdom));
  }, [faithWisdom]);

  useEffect(() => {
    localStorage.setItem('divinityagi_wisdom_points', totalWisdomPoints.toString());
  }, [totalWisdomPoints]);

  const visitFaithTradition = useCallback((tradition: string, sessionMinutes: number = 0) => {
    setFaithWisdom(prev => {
      const updated = { ...prev };
      if (updated[tradition]) {
        updated[tradition] = {
          ...updated[tradition],
          visitCount: updated[tradition].visitCount + 1,
          sessionMinutes: updated[tradition].sessionMinutes + sessionMinutes,
          lastVisited: new Date()
        };
      }
      return updated;
    });

    // Award wisdom points
    const pointsEarned = Math.floor(sessionMinutes / 5) + 10; // Base 10 points + bonus for time
    setTotalWisdomPoints(prev => prev + pointsEarned);

    // Check for new badges
    setTimeout(() => {
      checkForNewBadges();
    }, 500);
  }, []);

  const completeAction = useCallback((actionType: string, data?: any) => {
    setBadges(prev => {
      return prev.map(badge => {
        if (badge.requirements.type === actionType && !badge.unlocked) {
          const updatedBadge = { ...badge };
          
          if (actionType === 'session_count') {
            updatedBadge.requirements.current = (updatedBadge.requirements.current || 0) + 1;
          } else if (actionType === 'special_action' && badge.requirements.target === data) {
            updatedBadge.unlocked = true;
            updatedBadge.unlockedAt = new Date();
          }
          
          return updatedBadge;
        }
        return badge;
      });
    });

    setTimeout(() => {
      checkForNewBadges();
    }, 500);
  }, []);

  const checkForNewBadges = useCallback((): Badge[] => {
    const newlyUnlocked: Badge[] = [];

    setBadges(prev => {
      return prev.map(badge => {
        if (badge.unlocked) return badge;

        let shouldUnlock = false;

        // Check faith visit requirements
        if (badge.requirements.type === 'faith_visit') {
          if (typeof badge.requirements.target === 'string') {
            // Single faith tradition
            const tradition = faithWisdom[badge.requirements.target];
            if (tradition && tradition.visitCount > 0) {
              shouldUnlock = true;
            }
          } else if (typeof badge.requirements.target === 'number') {
            // Multiple faith traditions
            const visitedTraditions = Object.values(faithWisdom).filter(fw => fw.visitCount > 0).length;
            if (visitedTraditions >= badge.requirements.target) {
              shouldUnlock = true;
            }
          }
        }

        // Check session count requirements
        if (badge.requirements.type === 'session_count') {
          const currentSessions = badge.requirements.current || 0;
          if (currentSessions >= badge.requirements.target) {
            shouldUnlock = true;
          }
        }

        if (shouldUnlock) {
          const unlockedBadge = {
            ...badge,
            unlocked: true,
            unlockedAt: new Date()
          };
          newlyUnlocked.push(unlockedBadge);
          return unlockedBadge;
        }

        return badge;
      });
    });

    // Show notifications for newly unlocked badges
    newlyUnlocked.forEach(badge => {
      toast.success(`🏆 Badge Earned: ${badge.name}!`, {
        description: `+${badge.tokenReward} tokens awarded. ${badge.description}`,
        duration: 5000,
      });
    });

    return newlyUnlocked;
  }, [faithWisdom]);

  const getUserWisdomSummary = useCallback((): string => {
    const unlockedBadges = badges.filter(b => b.unlocked);
    const visitedTraditions = Object.values(faithWisdom).filter(fw => fw.visitCount > 0);
    
    if (unlockedBadges.length === 0) {
      return "You're just beginning your spiritual journey. Each tradition you explore will add to your wisdom.";
    }

    let summary = "Based on your spiritual journey, you have gained wisdom from ";
    
    const faithBadges = unlockedBadges.filter(b => b.category === 'faith');
    if (faithBadges.length > 0) {
      const traditions = faithBadges.map(b => b.faithTradition).join(', ');
      summary += `${traditions}. `;
    }

    const allWisdom = unlockedBadges.flatMap(b => b.wisdomGained || []);
    if (allWisdom.length > 0) {
      summary += "Key insights you've gained include: " + allWisdom.slice(0, 3).join(', ') + ".";
    }

    if (visitedTraditions.length >= 3) {
      summary += " Your interfaith exploration has given you a broad perspective on spiritual truths.";
    }

    return summary;
  }, [badges, faithWisdom]);

  const getBadgesByCategory = useCallback((category: string) => {
    const filtered = badges.filter(badge => badge.category === category);
    // Deduplicate by ID
    const unique = filtered.reduce((acc: Badge[], badge) => {
      if (!acc.find(b => b.id === badge.id)) {
        acc.push(badge);
      }
      return acc;
    }, []);
    return unique;
  }, [badges]);

  const getRecentAchievements = useCallback((days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return badges.filter(badge => 
      badge.unlocked && 
      badge.unlockedAt && 
      badge.unlockedAt > cutoffDate
    );
  }, [badges]);

  const awardBadge = useCallback((customBadge: Partial<Badge>) => {
    const newBadge: Badge = {
      id: customBadge.id || `custom_${Date.now()}`,
      name: customBadge.name || customBadge.title || 'Achievement Unlocked',
      description: customBadge.description || 'You earned a special achievement!',
      icon: customBadge.icon || Award,
      category: customBadge.category || 'special',
      rarity: customBadge.rarity || 'common',
      tokenReward: customBadge.tokenReward || 25,
      requirements: customBadge.requirements || { type: 'special_action', target: 'custom' },
      unlocked: true,
      unlockedAt: new Date(),
      faithTradition: customBadge.faithTradition,
      wisdomGained: customBadge.wisdomGained || [`Achievement: ${customBadge.name || customBadge.title}`]
    };

    setBadges(prev => {
      // Check if badge already exists
      const existingBadge = prev.find(b => b.id === newBadge.id);
      if (existingBadge && existingBadge.unlocked) {
        return prev; // Don't award the same badge twice
      }

      // Award tokens for the badge
      setTotalWisdomPoints(current => current + newBadge.tokenReward);

      // Update existing badge or add new one
      if (existingBadge) {
        return prev.map(b => b.id === newBadge.id ? { ...b, ...newBadge } : b);
      } else {
        return [...prev, newBadge];
      }
    });

    // Show success toast
    toast.success(`🏆 Badge Unlocked: ${newBadge.name}`, {
      description: `+${newBadge.tokenReward} wisdom points earned!`
    });
  }, []);

  // Deduplicate to prevent React key warnings
  const unlockedBadges = badges.filter(b => b.unlocked).reduce((acc: Badge[], badge) => {
    if (!acc.find(b => b.id === badge.id)) acc.push(badge);
    return acc;
  }, []);
  const progressBadges = badges.filter(b => !b.unlocked).reduce((acc: Badge[], badge) => {
    if (!acc.find(b => b.id === badge.id)) acc.push(badge);
    return acc;
  }, []);

  const value: BadgesContextType = {
    badges,
    faithWisdom,
    totalWisdomPoints,
    unlockedBadges,
    progressBadges,
    visitFaithTradition,
    completeAction,
    checkForNewBadges,
    getUserWisdomSummary,
    getBadgesByCategory,
    getRecentAchievements,
    awardBadge
  };

  return (
    <BadgesContext.Provider value={value}>
      {children}
    </BadgesContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgesContext);
  if (context === undefined) {
    throw new Error('useBadges must be used within a BadgesProvider');
  }
  return context;
}