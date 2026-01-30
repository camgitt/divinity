import React, { useEffect, useRef } from "react";
import { useTimer } from "./timer-context";
import { useBadges } from "./badges-context";
import { Clock, Target, Zap, Calendar, Award } from "lucide-react";

export function TimerBadgeIntegration() {
  const { sessionDuration, isActiveSession, totalTokensUsed } = useTimer();
  const { awardBadge, completeAction } = useBadges();
  
  const previousSessionDuration = useRef(0);
  const dailyStreakRef = useRef<number>(0);
  const sessionCountRef = useRef<number>(0);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('divinityagi_daily_streak');
    const savedSessionCount = localStorage.getItem('divinityagi_session_count');
    const lastSessionDate = localStorage.getItem('divinityagi_last_session_date');
    
    if (savedStreak) dailyStreakRef.current = parseInt(savedStreak, 10) || 0;
    if (savedSessionCount) sessionCountRef.current = parseInt(savedSessionCount, 10) || 0;
    
    // Check if streak should be reset (missed a day)
    if (lastSessionDate) {
      const lastDate = new Date(lastSessionDate);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 1) {
        dailyStreakRef.current = 0;
        localStorage.setItem('divinityagi_daily_streak', '0');
      }
    }
  }, []);

  // Monitor session completion and award badges
  useEffect(() => {
    if (!isActiveSession && sessionDuration > previousSessionDuration.current && sessionDuration > 0) {
      // Session just ended, award badges based on duration
      handleSessionCompletion(sessionDuration);
    }
    previousSessionDuration.current = sessionDuration;
  }, [isActiveSession, sessionDuration]);

  const handleSessionCompletion = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    
    // Increment session count
    sessionCountRef.current += 1;
    localStorage.setItem('divinityagi_session_count', sessionCountRef.current.toString());
    
    // Update daily streak
    updateDailyStreak();
    
    // Award time-based badges
    if (minutes >= 5) {
      awardBadge({
        id: 'first_session_5min',
        name: 'Mindful Moment',
        description: 'Completed a 5-minute spiritual session',
        icon: Clock,
        category: 'journey',
        rarity: 'common',
        tokenReward: 25,
        wisdomGained: ['Even short moments of reflection can bring clarity']
      });
    }

    if (minutes >= 15) {
      awardBadge({
        id: 'session_15min',
        name: 'Deep Reflection',
        description: 'Completed a 15-minute spiritual session',
        icon: Target,
        category: 'journey',
        rarity: 'common',
        tokenReward: 50,
        wisdomGained: ['Deeper contemplation brings greater understanding']
      });
    }

    if (minutes >= 30) {
      awardBadge({
        id: 'session_30min',
        name: 'Extended Contemplation',
        description: 'Completed a 30-minute spiritual session',
        icon: Clock,
        category: 'journey',
        rarity: 'rare',
        tokenReward: 100,
        wisdomGained: ['Extended practice deepens spiritual connection']
      });
    }

    if (minutes >= 60) {
      awardBadge({
        id: 'session_60min',
        name: 'Hour of Devotion',
        description: 'Completed a full hour of spiritual practice',
        icon: Award,
        category: 'journey',
        rarity: 'epic',
        tokenReward: 200,
        wisdomGained: ['Sustained practice transforms the spirit']
      });
    }

    // Award session count badges
    if (sessionCountRef.current === 1) {
      awardBadge({
        id: 'first_session',
        name: 'First Steps',
        description: 'Completed your first spiritual session',
        icon: Zap,
        category: 'journey',
        rarity: 'common',
        tokenReward: 75,
        wisdomGained: ['Every journey begins with a single step']
      });
    }

    if (sessionCountRef.current === 5) {
      awardBadge({
        id: 'sessions_5',
        name: 'Regular Seeker',
        description: 'Completed 5 spiritual sessions',
        icon: Target,
        category: 'journey',
        rarity: 'common',
        tokenReward: 100,
        wisdomGained: ['Consistency in practice builds spiritual strength']
      });
    }

    if (sessionCountRef.current === 10) {
      awardBadge({
        id: 'sessions_10',
        name: 'Dedicated Practitioner',
        description: 'Completed 10 spiritual sessions',
        icon: Calendar,
        category: 'journey',
        rarity: 'rare',
        tokenReward: 150,
        wisdomGained: ['Regular practice creates lasting transformation']
      });
    }

    if (sessionCountRef.current === 25) {
      awardBadge({
        id: 'sessions_25',
        name: 'Spiritual Devotee',
        description: 'Completed 25 spiritual sessions',
        icon: Award,
        category: 'journey',
        rarity: 'epic',
        tokenReward: 250,
        wisdomGained: ['Dedication to practice reveals deeper truths']
      });
    }

    if (sessionCountRef.current === 50) {
      awardBadge({
        id: 'sessions_50',
        name: 'Enlightened Seeker',
        description: 'Completed 50 spiritual sessions',
        icon: Award,
        category: 'journey',
        rarity: 'legendary',
        tokenReward: 500,
        wisdomGained: ['Sustained commitment leads to spiritual awakening']
      });
    }

    // Update badges context with session completion
    completeAction('session_count', { duration: minutes });
  };

  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    const lastSessionDate = localStorage.getItem('divinityagi_last_session_date');
    
    if (lastSessionDate !== today) {
      // First session today
      if (lastSessionDate) {
        const lastDate = new Date(lastSessionDate);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day
          dailyStreakRef.current += 1;
        } else if (daysDiff > 1) {
          // Streak broken
          dailyStreakRef.current = 1;
        }
      } else {
        // First session ever
        dailyStreakRef.current = 1;
      }
      
      localStorage.setItem('divinityagi_daily_streak', dailyStreakRef.current.toString());
      localStorage.setItem('divinityagi_last_session_date', today);
      
      // Award streak badges
      if (dailyStreakRef.current === 3) {
        awardBadge({
          id: 'streak_3',
          name: 'Three Day Journey',
          description: 'Maintained a 3-day spiritual practice streak',
          icon: Calendar,
          category: 'journey',
          rarity: 'common',
          tokenReward: 75,
          wisdomGained: ['Consistency builds spiritual momentum']
        });
      }

      if (dailyStreakRef.current === 7) {
        awardBadge({
          id: 'streak_7',
          name: 'Weekly Devotion',
          description: 'Maintained a 7-day spiritual practice streak',
          icon: Calendar,
          category: 'journey',
          rarity: 'rare',
          tokenReward: 150,
          wisdomGained: ['A week of dedication strengthens the soul']
        });
      }

      if (dailyStreakRef.current === 14) {
        awardBadge({
          id: 'streak_14',
          name: 'Fortnight of Faith',
          description: 'Maintained a 14-day spiritual practice streak',
          icon: Calendar,
          category: 'journey',
          rarity: 'epic',
          tokenReward: 300,
          wisdomGained: ['Two weeks of practice creates lasting habits']
        });
      }

      if (dailyStreakRef.current === 30) {
        awardBadge({
          id: 'streak_30',
          name: 'Monthly Master',
          description: 'Maintained a 30-day spiritual practice streak',
          icon: Award,
          category: 'journey',
          rarity: 'legendary',
          tokenReward: 500,
          wisdomGained: ['A month of devotion transforms the spirit']
        });
      }

      // Update badges context with streak achievement
      completeAction('streak', { days: dailyStreakRef.current });
    }
  };

  // This component doesn't render anything visible
  return null;
}