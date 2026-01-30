import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMeditation } from './meditation-context';
import { useJournal } from './journal-context';
import { useBadges } from './badges-context';
import { useCommunity } from './community-context';
import { useSubscription } from './subscription-context';

// Analytics data types
export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface ActivityHeatmap {
  day: number; // 0-6 (Sunday-Saturday)
  hour: number; // 0-23
  count: number;
}

export interface MeditationAnalytics {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionLength: number;
  completionRate: number;
  favoriteTechnique: string;
  favoriteFaith: string;
  sessionsThisWeek: number;
  sessionsThisMonth: number;
  weeklyTrend: TimeSeriesData[];
  monthlyTrend: TimeSeriesData[];
  timeOfDayDistribution: { hour: number; count: number }[];
  durationDistribution: { range: string; count: number }[];
}

export interface CommunityAnalytics {
  postsCreated: number;
  repliesGiven: number;
  likesReceived: number;
  likesGiven: number;
  reputationScore: number;
  topContributions: any[];
  engagementRate: number;
  favoriteCircle: string;
  postsThisWeek: number;
  postsThisMonth: number;
  weeklyEngagement: TimeSeriesData[];
  monthlyEngagement: TimeSeriesData[];
}

export interface JournalAnalytics {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  averageEntryLength: number;
  entriesThisWeek: number;
  entriesThisMonth: number;
  weeklyTrend: TimeSeriesData[];
  monthlyTrend: TimeSeriesData[];
  moodDistribution: { mood: string; count: number }[];
  topTags: { tag: string; count: number }[];
}

export interface GoalAnalytics {
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  completionRate: number;
  averageCompletionTime: number;
  categoryDistribution: { category: string; count: number }[];
  upcomingDeadlines: any[];
}

export interface BadgeAnalytics {
  totalBadges: number;
  badgesThisWeek: number;
  badgesThisMonth: number;
  rarityDistribution: { rarity: string; count: number }[];
  categoryDistribution: { category: string; count: number }[];
  recentBadges: any[];
}

export interface OverallAnalytics {
  spiritualGrowthScore: number; // 0-100
  activityStreak: number;
  longestActivityStreak: number;
  totalEngagementMinutes: number;
  weeklyActivityHeatmap: ActivityHeatmap[];
  overallTrend: 'improving' | 'stable' | 'declining';
  strengths: string[];
  areasForGrowth: string[];
}

export interface WeeklySummary {
  week: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  meditation: {
    sessions: number;
    minutes: number;
    streak: number;
  };
  community: {
    posts: number;
    engagement: number;
  };
  journal: {
    entries: number;
    streak: number;
  };
  badges: {
    earned: number;
    names: string[];
  };
  insights: string[];
}

export interface MonthlySummary {
  month: string;
  year: number;
  highlights: string[];
  meditation: {
    sessions: number;
    minutes: number;
    topTechnique: string;
  };
  community: {
    posts: number;
    replies: number;
    reputation: number;
  };
  journal: {
    entries: number;
    longestStreak: number;
  };
  goals: {
    completed: number;
    active: number;
  };
  badges: {
    earned: number;
    rarest: any[];
  };
  insights: string[];
  comparison: {
    vsLastMonth: 'better' | 'similar' | 'less';
    changePercentage: number;
  };
}

interface AnalyticsContextType {
  meditation: MeditationAnalytics | null;
  community: CommunityAnalytics | null;
  journal: JournalAnalytics | null;
  goals: GoalAnalytics | null;
  badges: BadgeAnalytics | null;
  overall: OverallAnalytics | null;
  weeklySummary: WeeklySummary | null;
  monthlySummary: MonthlySummary | null;
  isLoading: boolean;
  refreshAnalytics: () => void;
  exportToPDF: () => Promise<void>;
  exportToCSV: () => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const meditationContext = useMeditation();
  const journalContext = useJournal();
  const badgesContext = useBadges();
  const communityContext = useCommunity();
  const subscriptionContext = useSubscription();

  const [meditation, setMeditation] = useState<MeditationAnalytics | null>(null);
  const [community, setCommunity] = useState<CommunityAnalytics | null>(null);
  const [journal, setJournal] = useState<JournalAnalytics | null>(null);
  const [goals, setGoals] = useState<GoalAnalytics | null>(null);
  const [badges, setBadges] = useState<BadgeAnalytics | null>(null);
  const [overall, setOverall] = useState<OverallAnalytics | null>(null);
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate meditation analytics
  const calculateMeditationAnalytics = (): MeditationAnalytics => {
    const stats = meditationContext?.stats || {
      totalSessions: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      favoriteTechnique: '',
      sessionsThisWeek: 0,
      sessionsThisMonth: 0
    };
    const history = Array.isArray(meditationContext?.history) ? meditationContext.history : [];

    // Calculate weekly trend (last 7 days)
    const weeklyTrend: TimeSeriesData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const sessions = history.filter(h => {
        if (!h?.date) return false;
        const hDate = h.date instanceof Date ? h.date.toISOString() : h.date;
        return hDate.split('T')[0] === dateStr;
      }).length;
      weeklyTrend.push({ date: dateStr, value: sessions });
    }

    // Calculate monthly trend (last 30 days)
    const monthlyTrend: TimeSeriesData[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const sessions = history.filter(h => {
        if (!h?.date) return false;
        const hDate = h.date instanceof Date ? h.date.toISOString() : h.date;
        return hDate.split('T')[0] === dateStr;
      }).length;
      monthlyTrend.push({ date: dateStr, value: sessions });
    }

    // Time of day distribution
    const timeOfDayMap = new Map<number, number>();
    history.forEach(h => {
      if (h?.date) {
        const hour = new Date(h.date).getHours();
        timeOfDayMap.set(hour, (timeOfDayMap.get(hour) || 0) + 1);
      }
    });
    const timeOfDayDistribution = Array.from(timeOfDayMap.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour - b.hour);

    // Duration distribution
    const durationRanges = [
      { range: '0-5 min', min: 0, max: 5 },
      { range: '5-10 min', min: 5, max: 10 },
      { range: '10-20 min', min: 10, max: 20 },
      { range: '20-30 min', min: 20, max: 30 },
      { range: '30+ min', min: 30, max: Infinity }
    ];
    const durationDistribution = durationRanges.map(range => ({
      range: range.range,
      count: history.filter(h => h?.duration !== undefined && h.duration >= range.min && h.duration < range.max).length
    }));

    const averageSessionLength = stats.totalSessions > 0 
      ? Math.round(stats.totalMinutes / stats.totalSessions) 
      : 0;

    const completionRate = history.length > 0
      ? Math.round((history.filter(h => h.completed).length / history.length) * 100)
      : 0;

    return {
      totalSessions: stats.totalSessions,
      totalMinutes: stats.totalMinutes,
      currentStreak: stats.currentStreak,
      longestStreak: stats.longestStreak,
      averageSessionLength,
      completionRate,
      favoriteTechnique: stats.favoriteTechnique || 'None yet',
      favoriteFaith: 'Universal', // Could be calculated from session data
      sessionsThisWeek: stats.sessionsThisWeek || 0,
      sessionsThisMonth: stats.sessionsThisMonth || 0,
      weeklyTrend,
      monthlyTrend,
      timeOfDayDistribution,
      durationDistribution
    };
  };

  // Calculate community analytics
  const calculateCommunityAnalytics = (): CommunityAnalytics => {
    const { posts, userReputation } = communityContext;
    
    // Safety check: ensure posts is an array
    const safePosts = Array.isArray(posts) ? posts : [];
    
    // Filter user posts with safe access to author
    const userPosts = safePosts.filter(p => p?.author?.id === 'current-user'); // TODO: Use actual user ID

    const postsCreated = userPosts.length;
    
    // Calculate replies with safe access to nested properties
    const repliesGiven = safePosts.reduce((sum, post) => {
      if (!post?.replies || !Array.isArray(post.replies)) return sum;
      return sum + post.replies.filter(r => r?.author?.id === 'current-user').length;
    }, 0);
    
    const likesReceived = userPosts.reduce((sum, post) => sum + (post?.likes || 0), 0);
    const likesGiven = 0; // TODO: Track from like actions

    // Weekly engagement (last 7 days)
    const weeklyEngagement: TimeSeriesData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const activity = userPosts.filter(p => p?.timestamp && p.timestamp.split('T')[0] === dateStr).length;
      weeklyEngagement.push({ date: dateStr, value: activity });
    }

    // Monthly engagement (last 30 days)
    const monthlyEngagement: TimeSeriesData[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const activity = userPosts.filter(p => p?.timestamp && p.timestamp.split('T')[0] === dateStr).length;
      monthlyEngagement.push({ date: dateStr, value: activity });
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const postsThisWeek = userPosts.filter(p => p?.timestamp && new Date(p.timestamp) >= weekAgo).length;
    const postsThisMonth = userPosts.filter(p => p?.timestamp && new Date(p.timestamp) >= monthAgo).length;

    return {
      postsCreated,
      repliesGiven,
      likesReceived,
      likesGiven,
      reputationScore: userReputation || 0,
      topContributions: userPosts.slice(0, 5),
      engagementRate: postsCreated > 0 ? Math.round((likesReceived / postsCreated) * 100) / 100 : 0,
      favoriteCircle: 'General', // TODO: Calculate from post distribution
      postsThisWeek,
      postsThisMonth,
      weeklyEngagement,
      monthlyEngagement
    };
  };

  // Calculate journal analytics
  const calculateJournalAnalytics = (): JournalAnalytics => {
    const entries = Array.isArray(journalContext?.entries) ? journalContext.entries : [];

    // Weekly trend
    const weeklyTrend: TimeSeriesData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = entries.filter(e => {
        if (!e?.date) return false;
        const eDate = e.date instanceof Date ? e.date.toISOString() : e.date;
        return eDate.split('T')[0] === dateStr;
      }).length;
      weeklyTrend.push({ date: dateStr, value: count });
    }

    // Monthly trend
    const monthlyTrend: TimeSeriesData[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = entries.filter(e => {
        if (!e?.date) return false;
        const eDate = e.date instanceof Date ? e.date.toISOString() : e.date;
        return eDate.split('T')[0] === dateStr;
      }).length;
      monthlyTrend.push({ date: dateStr, value: count });
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const averageEntryLength = entries.length > 0
      ? Math.round(entries.reduce((sum, e) => sum + (e?.content?.length || 0), 0) / entries.length)
      : 0;

    return {
      totalEntries: entries.length,
      currentStreak: journalContext?.currentStreak || 0,
      longestStreak: journalContext?.longestStreak || 0,
      averageEntryLength,
      entriesThisWeek: entries.filter(e => e?.date && new Date(e.date) >= weekAgo).length,
      entriesThisMonth: entries.filter(e => e?.date && new Date(e.date) >= monthAgo).length,
      weeklyTrend,
      monthlyTrend,
      moodDistribution: [],
      topTags: []
    };
  };

  // Calculate goal analytics
  const calculateGoalAnalytics = (): GoalAnalytics => {
    try {
      const storedGoals = localStorage.getItem('divinityagi_spiritual_goals');
      const goals = storedGoals ? JSON.parse(storedGoals) : [];

      const completedGoals = goals.filter((g: any) => g.completed).length;
      const activeGoals = goals.filter((g: any) => !g.completed).length;
      const completionRate = goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;

      // Category distribution
      const categoryMap = new Map<string, number>();
      goals.forEach((g: any) => {
        categoryMap.set(g.category, (categoryMap.get(g.category) || 0) + 1);
      });
      const categoryDistribution = Array.from(categoryMap.entries())
        .map(([category, count]) => ({ category, count }));

      return {
        totalGoals: goals.length,
        completedGoals,
        activeGoals,
        completionRate,
        averageCompletionTime: 0, // TODO: Calculate from completion dates
        categoryDistribution,
        upcomingDeadlines: []
      };
    } catch (e) {
      return {
        totalGoals: 0,
        completedGoals: 0,
        activeGoals: 0,
        completionRate: 0,
        averageCompletionTime: 0,
        categoryDistribution: [],
        upcomingDeadlines: []
      };
    }
  };

  // Calculate badge analytics
  const calculateBadgeAnalytics = (): BadgeAnalytics => {
    const allBadges = Array.isArray(badgesContext?.badges) ? badgesContext.badges : [];
    const earnedBadges = allBadges.filter(b => b?.unlocked);

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const badgesThisWeek = earnedBadges.filter(b => b?.unlockedAt && new Date(b.unlockedAt) >= weekAgo).length;
    const badgesThisMonth = earnedBadges.filter(b => b?.unlockedAt && new Date(b.unlockedAt) >= monthAgo).length;

    // Rarity distribution
    const rarityMap = new Map<string, number>();
    earnedBadges.forEach(b => {
      if (b?.rarity) {
        rarityMap.set(b.rarity, (rarityMap.get(b.rarity) || 0) + 1);
      }
    });
    const rarityDistribution = Array.from(rarityMap.entries())
      .map(([rarity, count]) => ({ rarity, count }));

    // Category distribution
    const categoryMap = new Map<string, number>();
    earnedBadges.forEach(b => {
      if (b?.category) {
        categoryMap.set(b.category, (categoryMap.get(b.category) || 0) + 1);
      }
    });
    const categoryDistribution = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }));

    return {
      totalBadges: earnedBadges.length,
      badgesThisWeek,
      badgesThisMonth,
      rarityDistribution,
      categoryDistribution,
      recentBadges: earnedBadges.slice(0, 5)
    };
  };

  // Calculate overall analytics
  const calculateOverallAnalytics = (
    med: MeditationAnalytics,
    comm: CommunityAnalytics,
    jour: JournalAnalytics,
    goal: GoalAnalytics,
    badge: BadgeAnalytics
  ): OverallAnalytics => {
    // Spiritual growth score (0-100) based on multiple factors
    const meditationScore = Math.min(100, (med.totalSessions / 50) * 25); // Max 25 points for 50+ sessions
    const communityScore = Math.min(100, (comm.reputationScore / 1000) * 25); // Max 25 points for 1000 reputation
    const journalScore = Math.min(100, (jour.totalEntries / 30) * 25); // Max 25 points for 30+ entries
    const goalScore = Math.min(100, goal.completionRate * 0.25); // Max 25 points for 100% completion
    
    const spiritualGrowthScore = Math.round(meditationScore + communityScore + journalScore + goalScore);

    // Activity streak (max from all sources)
    const activityStreak = Math.max(med.currentStreak, jour.currentStreak);
    const longestActivityStreak = Math.max(med.longestStreak, jour.longestStreak);

    // Total engagement minutes (meditation + estimated community time)
    const totalEngagementMinutes = med.totalMinutes + (comm.postsCreated * 5) + (jour.totalEntries * 10);

    // Determine overall trend
    const recentActivity = med.sessionsThisWeek + comm.postsThisWeek + jour.entriesThisWeek;
    const previousActivity = (med.totalSessions - med.sessionsThisWeek) / 4; // Weekly average
    let overallTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentActivity > previousActivity * 1.2) overallTrend = 'improving';
    if (recentActivity < previousActivity * 0.8) overallTrend = 'declining';

    // Identify strengths
    const strengths: string[] = [];
    if (med.currentStreak >= 7) strengths.push('Consistent meditation practice');
    if (comm.reputationScore >= 500) strengths.push('Active community member');
    if (jour.currentStreak >= 7) strengths.push('Regular journaling');
    if (goal.completionRate >= 70) strengths.push('Strong goal achievement');
    if (badge.totalBadges >= 10) strengths.push('Achievement hunter');

    // Identify areas for growth
    const areasForGrowth: string[] = [];
    if (med.currentStreak < 3) areasForGrowth.push('Build meditation consistency');
    if (comm.postsCreated < 5) areasForGrowth.push('Engage more with community');
    if (jour.totalEntries < 10) areasForGrowth.push('Start journaling regularly');
    if (goal.activeGoals === 0) areasForGrowth.push('Set spiritual goals');

    return {
      spiritualGrowthScore,
      activityStreak,
      longestActivityStreak,
      totalEngagementMinutes,
      weeklyActivityHeatmap: [],
      overallTrend,
      strengths,
      areasForGrowth
    };
  };

  // Generate weekly summary
  const generateWeeklySummary = (
    med: MeditationAnalytics,
    comm: CommunityAnalytics,
    jour: JournalAnalytics,
    badge: BadgeAnalytics
  ): WeeklySummary => {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const highlights: string[] = [];
    if (med.sessionsThisWeek >= 5) highlights.push(`Completed ${med.sessionsThisWeek} meditation sessions`);
    if (comm.postsThisWeek >= 3) highlights.push(`Created ${comm.postsThisWeek} community posts`);
    if (jour.entriesThisWeek >= 5) highlights.push(`Wrote ${jour.entriesThisWeek} journal entries`);
    if (badge.badgesThisWeek > 0) highlights.push(`Earned ${badge.badgesThisWeek} new badges`);

    const insights: string[] = [];
    if (med.currentStreak >= 7) insights.push('Your meditation consistency is excellent!');
    if (comm.postsThisWeek > comm.postsCreated / 4) insights.push('Your community engagement is trending up');
    if (jour.entriesThisWeek >= 7) insights.push('Daily journaling habit established!');

    return {
      week: `Week of ${weekStart.toLocaleDateString()}`,
      startDate: weekStart.toISOString(),
      endDate: now.toISOString(),
      highlights,
      meditation: {
        sessions: med.sessionsThisWeek,
        minutes: med.weeklyTrend.reduce((sum, d) => sum + d.value, 0) * med.averageSessionLength,
        streak: med.currentStreak
      },
      community: {
        posts: comm.postsThisWeek,
        engagement: comm.likesReceived
      },
      journal: {
        entries: jour.entriesThisWeek,
        streak: jour.currentStreak
      },
      badges: {
        earned: badge.badgesThisWeek,
        names: badge.recentBadges.slice(0, 3).map(b => b.name)
      },
      insights
    };
  };

  // Generate monthly summary
  const generateMonthlySummary = (
    med: MeditationAnalytics,
    comm: CommunityAnalytics,
    jour: JournalAnalytics,
    goal: GoalAnalytics,
    badge: BadgeAnalytics
  ): MonthlySummary => {
    const now = new Date();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();

    const highlights: string[] = [];
    highlights.push(`Meditated for ${med.totalMinutes} minutes`);
    highlights.push(`Engaged with ${comm.postsCreated} community discussions`);
    highlights.push(`Wrote ${jour.totalEntries} journal entries`);
    if (goal.completedGoals > 0) highlights.push(`Completed ${goal.completedGoals} spiritual goals`);

    const insights: string[] = [];
    if (med.currentStreak > 14) insights.push('Your meditation practice is becoming a strong habit');
    if (comm.reputationScore > 100) insights.push('You\'re making a positive impact in the community');
    if (jour.longestStreak > 14) insights.push('Your journaling consistency is impressive');

    return {
      month,
      year,
      highlights,
      meditation: {
        sessions: med.sessionsThisMonth,
        minutes: med.totalMinutes,
        topTechnique: med.favoriteTechnique
      },
      community: {
        posts: comm.postsThisMonth,
        replies: comm.repliesGiven,
        reputation: comm.reputationScore
      },
      journal: {
        entries: jour.entriesThisMonth,
        longestStreak: jour.longestStreak
      },
      goals: {
        completed: goal.completedGoals,
        active: goal.activeGoals
      },
      badges: {
        earned: badge.badgesThisMonth,
        rarest: badge.recentBadges.filter(b => b.rarity === 'legendary' || b.rarity === 'epic')
      },
      insights,
      comparison: {
        vsLastMonth: 'similar', // TODO: Calculate actual comparison
        changePercentage: 0
      }
    };
  };

  // Refresh analytics
  const refreshAnalytics = () => {
    setIsLoading(true);
    
    try {
      const medAnalytics = calculateMeditationAnalytics();
      const commAnalytics = calculateCommunityAnalytics();
      const jourAnalytics = calculateJournalAnalytics();
      const goalAnalytics = calculateGoalAnalytics();
      const badgeAnalytics = calculateBadgeAnalytics();
      const overallAnalytics = calculateOverallAnalytics(
        medAnalytics,
        commAnalytics,
        jourAnalytics,
        goalAnalytics,
        badgeAnalytics
      );
      const weekly = generateWeeklySummary(medAnalytics, commAnalytics, jourAnalytics, badgeAnalytics);
      const monthly = generateMonthlySummary(medAnalytics, commAnalytics, jourAnalytics, goalAnalytics, badgeAnalytics);

      setMeditation(medAnalytics);
      setCommunity(commAnalytics);
      setJournal(jourAnalytics);
      setGoals(goalAnalytics);
      setBadges(badgeAnalytics);
      setOverall(overallAnalytics);
      setWeeklySummary(weekly);
      setMonthlySummary(monthly);
    } catch (error) {
      console.error('Error calculating analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Export to PDF
  const exportToPDF = async () => {
    // TODO: Implement PDF export using jsPDF or similar library
    console.log('PDF export not yet implemented');
  };

  // Export to CSV
  const exportToCSV = async () => {
    if (!meditation || !community || !journal || !goals || !badges) return;

    const csvData = [
      ['DivinityAGI Analytics Export'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Meditation Stats'],
      ['Total Sessions', meditation.totalSessions],
      ['Total Minutes', meditation.totalMinutes],
      ['Current Streak', meditation.currentStreak],
      ['Longest Streak', meditation.longestStreak],
      [''],
      ['Community Stats'],
      ['Posts Created', community.postsCreated],
      ['Replies Given', community.repliesGiven],
      ['Reputation Score', community.reputationScore],
      [''],
      ['Journal Stats'],
      ['Total Entries', journal.totalEntries],
      ['Current Streak', journal.currentStreak],
      [''],
      ['Goal Stats'],
      ['Total Goals', goals.totalGoals],
      ['Completed Goals', goals.completedGoals],
      ['Completion Rate', `${goals.completionRate}%`],
      [''],
      ['Badge Stats'],
      ['Total Badges', badges.totalBadges]
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divinityagi-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Initial analytics calculation
  useEffect(() => {
    refreshAnalytics();
  }, [
    meditationContext.stats,
    journalContext.entries,
    badgesContext.badges,
    communityContext.posts
  ]);

  const value: AnalyticsContextType = {
    meditation,
    community,
    journal,
    goals,
    badges,
    overall,
    weeklySummary,
    monthlySummary,
    isLoading,
    refreshAnalytics,
    exportToPDF,
    exportToCSV
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};