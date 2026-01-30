import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useTimer } from "./timer-context";
import { useSubscription } from "./subscription-context";
import { toast } from "sonner@2.0.3";
import { Zap, TrendingUp } from "lucide-react";

/**
 * Engagement Tracker - Monitors active user engagement and rewards tokens
 * 
 * Core Concept: "Time = Tokens"
 * - Users EARN tokens through active engagement with guides
 * - Different earning rates based on subscription tier
 * - Only active engagement counts (not idle time)
 * 
 * Earning Rates (per minute of active engagement):
 * - Seeker: 1 token per 10 minutes (0.1/min)
 * - Subscriber: 1 token per 5 minutes (0.2/min)
 * - Devotee: 1 token per 3 minutes (0.33/min)
 * - Enlightened: 1 token per 2 minutes (0.5/min)
 */

interface EngagementContextType {
  // Engagement state
  isEngaged: boolean;
  engagementDuration: number; // Total active engagement time in seconds
  tokensEarnedThisSession: number;
  lastActivityTime: Date | null;
  
  // Engagement tracking
  recordActivity: () => void; // Call when user interacts (sends message, etc.)
  startEngagement: () => void;
  stopEngagement: () => void;
  resetSession: () => void;
  
  // Stats
  getEngagementStats: () => EngagementStats;
}

interface EngagementStats {
  totalEngagementMinutes: number;
  tokensEarned: number;
  earningRate: number; // Tokens per minute for current tier
  nextTokenIn: number; // Seconds until next token earned
}

const EngagementContext = createContext<EngagementContextType | undefined>(undefined);

interface EngagementProviderProps {
  children: ReactNode;
}

// Idle timeout - if no activity for this duration, stop counting engagement
const IDLE_TIMEOUT_MS = 120000; // 2 minutes

// Token earning rates by tier (tokens earned per second of active engagement)
const EARNING_RATES = {
  seeker: 1 / 600,      // 1 token per 10 minutes (0.00167 per second)
  subscriber: 1 / 300,   // 1 token per 5 minutes (0.00333 per second)
  devotee: 1 / 180,      // 1 token per 3 minutes (0.00556 per second)
  enlightened: 1 / 120   // 1 token per 2 minutes (0.00833 per second)
};

export function EngagementProvider({ children }: EngagementProviderProps) {
  const { addTokens } = useTimer();
  const { tier } = useSubscription();
  
  const [isEngaged, setIsEngaged] = useState(false);
  const [engagementDuration, setEngagementDuration] = useState(0);
  const [tokensEarnedThisSession, setTokensEarnedThisSession] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState<Date | null>(null);
  const [accumulatedTokenProgress, setAccumulatedTokenProgress] = useState(0);

  // Get earning rate for current tier
  const earningRate = EARNING_RATES[tier] || EARNING_RATES.seeker;

  // Track engagement time and award tokens
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isEngaged && lastActivityTime) {
      interval = setInterval(() => {
        const now = new Date();
        const timeSinceLastActivity = now.getTime() - lastActivityTime.getTime();
        
        // Check if user has been idle too long
        if (timeSinceLastActivity > IDLE_TIMEOUT_MS) {
          setIsEngaged(false);
          toast.info("Engagement paused due to inactivity", {
            description: "Continue chatting to keep earning tokens!"
          });
          return;
        }
        
        // Increment engagement duration
        setEngagementDuration(prev => prev + 1);
        
        // Calculate token progress
        setAccumulatedTokenProgress(prev => {
          const newProgress = prev + earningRate;
          
          // Award a token when we've accumulated enough progress
          if (newProgress >= 1) {
            const tokensToAward = Math.floor(newProgress);
            setTokensEarnedThisSession(prevTokens => prevTokens + tokensToAward);
            addTokens(tokensToAward);
            
            // Show toast notification for token earned
            toast.success(`You earned ${tokensToAward} token${tokensToAward > 1 ? 's' : ''}!`, {
              description: "Keep engaging to earn more",
              icon: <Zap className="w-4 h-4 text-yellow-400" />
            });
            
            return newProgress - tokensToAward; // Keep the fractional part
          }
          
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isEngaged, lastActivityTime, earningRate, addTokens]);

  const recordActivity = useCallback(() => {
    setLastActivityTime(new Date());
    
    // If not currently engaged, start engagement
    if (!isEngaged) {
      setIsEngaged(true);
    }
  }, [isEngaged]);

  const startEngagement = useCallback(() => {
    setIsEngaged(true);
    setLastActivityTime(new Date());
    toast.success("Engagement tracking started!", {
      description: "You'll earn tokens as you chat with guides",
      icon: <TrendingUp className="w-4 h-4 text-green-400" />
    });
  }, []);

  const stopEngagement = useCallback(() => {
    setIsEngaged(false);
    
    if (tokensEarnedThisSession > 0) {
      toast.success(`Session complete! Earned ${tokensEarnedThisSession} tokens`, {
        description: `${Math.floor(engagementDuration / 60)} minutes of active engagement`
      });
    }
  }, [tokensEarnedThisSession, engagementDuration]);

  const resetSession = useCallback(() => {
    setEngagementDuration(0);
    setTokensEarnedThisSession(0);
    setAccumulatedTokenProgress(0);
    setIsEngaged(false);
    setLastActivityTime(null);
  }, []);

  const getEngagementStats = useCallback((): EngagementStats => {
    const tokensPerMinute = earningRate * 60;
    const secondsUntilNextToken = accumulatedTokenProgress > 0 
      ? Math.ceil((1 - accumulatedTokenProgress) / earningRate)
      : Math.ceil(1 / earningRate);
    
    return {
      totalEngagementMinutes: Math.floor(engagementDuration / 60),
      tokensEarned: tokensEarnedThisSession,
      earningRate: tokensPerMinute,
      nextTokenIn: secondsUntilNextToken
    };
  }, [engagementDuration, tokensEarnedThisSession, earningRate, accumulatedTokenProgress]);

  const value: EngagementContextType = {
    isEngaged,
    engagementDuration,
    tokensEarnedThisSession,
    lastActivityTime,
    recordActivity,
    startEngagement,
    stopEngagement,
    resetSession,
    getEngagementStats
  };

  return (
    <EngagementContext.Provider value={value}>
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (context === undefined) {
    throw new Error("useEngagement must be used within an EngagementProvider");
  }
  return context;
}
