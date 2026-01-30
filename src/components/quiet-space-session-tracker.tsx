/**
 * Quiet Space Session Tracker
 * Tracks and persists session history and preferences
 */

export interface QuietSpaceSession {
  id: string;
  timestamp: number;
  duration: number; // in minutes
  atmosphereMode?: string;
  microState?: string;
  faithAmbiance?: string;
  breathingPattern?: string;
  soundscape?: string;
  emotionalStateBefore?: string;
  emotionalStateAfter?: string;
  completed: boolean;
}

export interface QuietSpacePreferences {
  favoriteMode?: string;
  favoriteMicroState?: string;
  favoriteSoundscape?: string;
  favoriteBreathingPattern?: string;
  autoStartFaithAmbiance: boolean;
  affirmationInterval: number;
  sessionGoalMinutes: number;
}

const SESSIONS_KEY = 'divinityagi_quiet_space_sessions';
const PREFERENCES_KEY = 'divinityagi_quiet_space_preferences';
const MAX_SESSIONS_STORED = 100;

/**
 * Save a completed session
 */
export function saveSession(session: QuietSpaceSession): void {
  try {
    const sessions = getSessions();
    sessions.unshift(session); // Add to beginning
    
    // Keep only the most recent sessions
    const trimmedSessions = sessions.slice(0, MAX_SESSIONS_STORED);
    
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(trimmedSessions));
  } catch (error) {
    console.error('Failed to save quiet space session:', error);
  }
}

/**
 * Get all saved sessions
 */
export function getSessions(): QuietSpaceSession[] {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load quiet space sessions:', error);
  }
  return [];
}

/**
 * Get session statistics
 */
export function getSessionStats() {
  const sessions = getSessions();
  const completedSessions = sessions.filter(s => s.completed);
  
  const totalTime = completedSessions.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = completedSessions.length;
  const averageSessionLength = totalSessions > 0 ? totalTime / totalSessions : 0;
  
  // Get most used mode
  const modeCounts: Record<string, number> = {};
  completedSessions.forEach(s => {
    modeCounts[s.atmosphereMode] = (modeCounts[s.atmosphereMode] || 0) + 1;
  });
  const mostUsedMode = Object.keys(modeCounts).reduce((a, b) => 
    modeCounts[a] > modeCounts[b] ? a : b, '');
  
  // Calculate streak (consecutive days with at least one session)
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: string | null = null;
  
  const today = new Date().toDateString();
  const sortedSessions = [...completedSessions].sort((a, b) => b.timestamp - a.timestamp);
  
  sortedSessions.forEach(session => {
    const sessionDate = new Date(session.timestamp).toDateString();
    
    if (!lastDate) {
      tempStreak = 1;
      if (sessionDate === today) {
        currentStreak = 1;
      }
    } else {
      const dayDiff = (new Date(lastDate).getTime() - new Date(sessionDate).getTime()) / (1000 * 60 * 60 * 24);
      
      if (dayDiff === 1) {
        tempStreak++;
        if (sessionDate === today || new Date(lastDate).toDateString() === today) {
          currentStreak = tempStreak;
        }
      } else if (dayDiff > 1) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    
    lastDate = sessionDate;
  });
  
  longestStreak = Math.max(longestStreak, tempStreak);
  
  return {
    totalSessions,
    totalTimeMinutes: Math.round(totalTime),
    averageSessionMinutes: Math.round(averageSessionLength),
    mostUsedMode,
    currentStreak,
    longestStreak,
    sessionsThisWeek: completedSessions.filter(s => {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return s.timestamp > weekAgo;
    }).length,
    sessionsThisMonth: completedSessions.filter(s => {
      const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return s.timestamp > monthAgo;
    }).length
  };
}

/**
 * Save user preferences
 */
export function savePreferences(prefs: Partial<QuietSpacePreferences>): void {
  try {
    const current = getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save quiet space preferences:', error);
  }
}

/**
 * Get user preferences
 */
export function getPreferences(): QuietSpacePreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load quiet space preferences:', error);
  }
  
  // Default preferences
  return {
    autoStartFaithAmbiance: true,
    affirmationInterval: 20000,
    sessionGoalMinutes: 10
  };
}

/**
 * Clear all session data (for privacy/reset)
 */
export function clearAllSessions(): void {
  try {
    localStorage.removeItem(SESSIONS_KEY);
  } catch (error) {
    console.error('Failed to clear sessions:', error);
  }
}