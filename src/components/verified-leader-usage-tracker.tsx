/**
 * Verified Leader Usage Tracker
 * 
 * Tracks time spent with verified leaders during chat sessions
 * to calculate affiliate earnings based on agreements.
 * 
 * Features:
 * - Real-time session tracking
 * - Automatic earnings calculation
 * - Leader-specific analytics
 * - LocalStorage persistence
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { toast } from "sonner@2.0.3";

// Earnings rate: $0.10 per minute (configurable per leader)
const DEFAULT_EARNINGS_RATE = 0.10;

export interface VerifiedLeaderSession {
  sessionId: string;
  leaderId: string;
  leaderName: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  durationMinutes: number;
  earningsGenerated: number;
  topic?: string;
  rating?: number;
  feedback?: string;
}

export interface LeaderEarningsData {
  leaderId: string;
  leaderName: string;
  totalSessions: number;
  totalMinutes: number;
  totalEarnings: number;
  averageRating: number;
  lastSessionDate: Date | null;
  earningsRate: number; // Custom rate per leader
  sessions: VerifiedLeaderSession[];
}

interface VerifiedLeaderUsageContextType {
  activeSession: VerifiedLeaderSession | null;
  startLeaderSession: (leaderId: string, leaderName: string, userId?: string) => void;
  endLeaderSession: (rating?: number, feedback?: string, topic?: string) => void;
  getLeaderEarnings: (leaderId: string) => LeaderEarningsData | null;
  getAllLeadersEarnings: () => LeaderEarningsData[];
  updateSessionRating: (sessionId: string, rating: number, feedback?: string) => void;
  isLeaderSession: boolean;
}

const VerifiedLeaderUsageContext = createContext<VerifiedLeaderUsageContextType | undefined>(undefined);

const STORAGE_KEY = "divinityagi_leader_usage_data";
const ACTIVE_SESSION_KEY = "divinityagi_active_leader_session";

interface VerifiedLeaderUsageProviderProps {
  children: ReactNode;
}

export function VerifiedLeaderUsageProvider({ children }: VerifiedLeaderUsageProviderProps) {
  const [activeSession, setActiveSession] = useState<VerifiedLeaderSession | null>(null);
  const [leaderEarningsData, setLeaderEarningsData] = useState<Map<string, LeaderEarningsData>>(new Map());

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      // Load earnings data
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const dataMap = new Map<string, LeaderEarningsData>();
        
        // Convert stored data back to Map with Date objects
        Object.entries(parsed).forEach(([leaderId, data]: [string, any]) => {
          dataMap.set(leaderId, {
            ...data,
            lastSessionDate: data.lastSessionDate ? new Date(data.lastSessionDate) : null,
            sessions: data.sessions.map((session: any) => ({
              ...session,
              startTime: new Date(session.startTime),
              endTime: session.endTime ? new Date(session.endTime) : undefined,
            }))
          });
        });
        
        setLeaderEarningsData(dataMap);
      }

      // Load active session if exists
      const storedSession = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        setActiveSession({
          ...parsed,
          startTime: new Date(parsed.startTime),
        });
      }
    } catch (error) {
      console.error("Failed to load verified leader usage data:", error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      // Convert Map to object for storage
      const dataObject: Record<string, LeaderEarningsData> = {};
      leaderEarningsData.forEach((value, key) => {
        dataObject[key] = value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
    } catch (error) {
      console.error("Failed to save verified leader usage data:", error);
    }
  }, [leaderEarningsData]);

  // Save active session to localStorage
  useEffect(() => {
    try {
      if (activeSession) {
        localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(activeSession));
      } else {
        localStorage.removeItem(ACTIVE_SESSION_KEY);
      }
    } catch (error) {
      console.error("Failed to save active leader session:", error);
    }
  }, [activeSession]);

  // Start a new leader session
  const startLeaderSession = useCallback((leaderId: string, leaderName: string, userId: string = "guest") => {
    if (activeSession) {
      toast.warning("Please end the current session before starting a new one");
      return;
    }

    const newSession: VerifiedLeaderSession = {
      sessionId: `leader_session_${Date.now()}`,
      leaderId,
      leaderName,
      userId,
      startTime: new Date(),
      durationMinutes: 0,
      earningsGenerated: 0,
    };

    setActiveSession(newSession);
    
    console.log(`[Leader Tracking] Started session with ${leaderName} (ID: ${leaderId})`);
    toast.success(`Session with ${leaderName} started`, {
      description: "Time tracking has begun for earnings calculation"
    });
  }, [activeSession]);

  // End the current leader session
  const endLeaderSession = useCallback((rating?: number, feedback?: string, topic?: string) => {
    if (!activeSession) {
      console.warn("[Leader Tracking] No active session to end");
      return;
    }

    const endTime = new Date();
    const durationMs = endTime.getTime() - activeSession.startTime.getTime();
    const durationMinutes = Math.max(1, Math.floor(durationMs / 60000)); // Minimum 1 minute
    
    // Get leader's custom rate or use default
    const existingData = leaderEarningsData.get(activeSession.leaderId);
    const earningsRate = existingData?.earningsRate || DEFAULT_EARNINGS_RATE;
    const earningsGenerated = parseFloat((durationMinutes * earningsRate).toFixed(2));

    const completedSession: VerifiedLeaderSession = {
      ...activeSession,
      endTime,
      durationMinutes,
      earningsGenerated,
      rating,
      feedback,
      topic,
    };

    // Update leader earnings data
    setLeaderEarningsData(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(activeSession.leaderId);

      if (existing) {
        // Update existing leader data
        const updatedSessions = [...existing.sessions, completedSession];
        const totalRatings = updatedSessions.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0);
        const ratedSessionsCount = updatedSessions.filter(s => s.rating).length;

        newMap.set(activeSession.leaderId, {
          ...existing,
          totalSessions: existing.totalSessions + 1,
          totalMinutes: existing.totalMinutes + durationMinutes,
          totalEarnings: parseFloat((existing.totalEarnings + earningsGenerated).toFixed(2)),
          averageRating: ratedSessionsCount > 0 ? parseFloat((totalRatings / ratedSessionsCount).toFixed(1)) : 0,
          lastSessionDate: endTime,
          sessions: updatedSessions,
        });
      } else {
        // Create new leader data
        newMap.set(activeSession.leaderId, {
          leaderId: activeSession.leaderId,
          leaderName: activeSession.leaderName,
          totalSessions: 1,
          totalMinutes: durationMinutes,
          totalEarnings: earningsGenerated,
          averageRating: rating || 0,
          lastSessionDate: endTime,
          earningsRate,
          sessions: [completedSession],
        });
      }

      return newMap;
    });

    console.log(`[Leader Tracking] Ended session with ${activeSession.leaderName}:`, {
      duration: `${durationMinutes} minutes`,
      earnings: `$${earningsGenerated}`,
      rating: rating || 'Not rated'
    });

    toast.success(`Session ended: ${durationMinutes} min`, {
      description: `$${earningsGenerated} earned for ${activeSession.leaderName}`
    });

    setActiveSession(null);
  }, [activeSession, leaderEarningsData]);

  // Get earnings data for a specific leader
  const getLeaderEarnings = useCallback((leaderId: string): LeaderEarningsData | null => {
    return leaderEarningsData.get(leaderId) || null;
  }, [leaderEarningsData]);

  // Get all leaders' earnings data
  const getAllLeadersEarnings = useCallback((): LeaderEarningsData[] => {
    return Array.from(leaderEarningsData.values())
      .sort((a, b) => b.totalEarnings - a.totalEarnings); // Sort by highest earnings
  }, [leaderEarningsData]);

  // Update rating for a specific session
  const updateSessionRating = useCallback((sessionId: string, rating: number, feedback?: string) => {
    setLeaderEarningsData(prev => {
      const newMap = new Map(prev);
      
      // Find the leader with this session
      for (const [leaderId, data] of newMap.entries()) {
        const sessionIndex = data.sessions.findIndex(s => s.sessionId === sessionId);
        
        if (sessionIndex !== -1) {
          const updatedSessions = [...data.sessions];
          updatedSessions[sessionIndex] = {
            ...updatedSessions[sessionIndex],
            rating,
            feedback: feedback || updatedSessions[sessionIndex].feedback,
          };

          // Recalculate average rating
          const totalRatings = updatedSessions.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0);
          const ratedSessionsCount = updatedSessions.filter(s => s.rating).length;

          newMap.set(leaderId, {
            ...data,
            sessions: updatedSessions,
            averageRating: ratedSessionsCount > 0 ? parseFloat((totalRatings / ratedSessionsCount).toFixed(1)) : 0,
          });

          toast.success("Rating updated successfully");
          break;
        }
      }
      
      return newMap;
    });
  }, []);

  const value: VerifiedLeaderUsageContextType = {
    activeSession,
    startLeaderSession,
    endLeaderSession,
    getLeaderEarnings,
    getAllLeadersEarnings,
    updateSessionRating,
    isLeaderSession: activeSession !== null,
  };

  return (
    <VerifiedLeaderUsageContext.Provider value={value}>
      {children}
    </VerifiedLeaderUsageContext.Provider>
  );
}

export function useVerifiedLeaderUsage() {
  const context = useContext(VerifiedLeaderUsageContext);
  if (!context) {
    throw new Error("useVerifiedLeaderUsage must be used within a VerifiedLeaderUsageProvider");
  }
  return context;
}

/**
 * Utility function to format earnings for display
 */
export function formatEarnings(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Utility function to format duration
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Export leader earnings data for reporting
 */
export function exportLeaderEarningsCSV(data: LeaderEarningsData[]): string {
  const headers = ["Leader ID", "Leader Name", "Total Sessions", "Total Minutes", "Total Earnings", "Average Rating", "Last Session"];
  const rows = data.map(leader => [
    leader.leaderId,
    leader.leaderName,
    leader.totalSessions,
    leader.totalMinutes,
    leader.totalEarnings.toFixed(2),
    leader.averageRating.toFixed(1),
    leader.lastSessionDate ? leader.lastSessionDate.toLocaleDateString() : "N/A"
  ]);

  return [headers, ...rows].map(row => row.join(",")).join("\n");
}
