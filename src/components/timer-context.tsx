import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { toast } from "sonner@2.0.3";
import { Clock, Zap, Calendar, Target } from "lucide-react";

interface TimerContextType {
  currentTokens: number;
  isActiveSession: boolean;
  sessionStartTime: Date | null;
  sessionDuration: number; // in seconds
  totalTokensUsed: number;
  totalTokensEarned: number; // NEW: Track earned tokens
  freeTokensUsed: number;
  maxFreeTokens: number;
  startSession: () => void;
  endSession: () => void;
  purchaseTokens: (amount: number) => void;
  addTokens: (amount: number) => void; // NEW: Add earned tokens
  formatTime: (seconds: number) => string;
  getTimeRemaining: () => string;
  canStartSession: () => boolean;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export function TimerProvider({ children }: TimerProviderProps) {
  // Note: We'll access badges context using a hook inside the provider
  // This creates a circular dependency that we'll handle carefully
  const [currentTokens, setCurrentTokens] = useState(250);
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [totalTokensUsed, setTotalTokensUsed] = useState(150);
  const [totalTokensEarned, setTotalTokensEarned] = useState(0); // NEW: Track earned tokens
  const [freeTokensUsed, setFreeTokensUsed] = useState(150);
  const maxFreeTokens = 500;

  // Timer effect for active sessions
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActiveSession && sessionStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
        setSessionDuration(elapsed);
        
        // Consume a token every minute (60 seconds)
        const tokensConsumed = Math.floor(elapsed / 60);
        if (tokensConsumed > 0) {
          setCurrentTokens(prevTokens => {
            const newTokenCount = Math.max(0, 250 - tokensConsumed);
            if (newTokenCount !== prevTokens && prevTokens > 0) {
              // Show warning when tokens are running low
              if (newTokenCount === 10) {
                toast.warning("Only 10 minutes remaining in your session!");
              } else if (newTokenCount === 0) {
                toast.error("Session ended - no tokens remaining");
                // End session directly by setting state
                setIsActiveSession(false);
                setSessionStartTime(null);
                setSessionDuration(0);
              }
            }
            return newTokenCount;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActiveSession, sessionStartTime]);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startSession = useCallback(() => {
    if (currentTokens <= 0) {
      toast.error("No tokens available. Please purchase more to start a session.");
      return;
    }
    
    setIsActiveSession(true);
    setSessionStartTime(new Date());
    setSessionDuration(0);
    toast.success("Spiritual guidance session started");
  }, [currentTokens]);

  const endSession = useCallback(() => {
    setIsActiveSession(false);
    setSessionStartTime(null);
    
    if (sessionDuration > 0) {
      const tokensUsed = Math.ceil(sessionDuration / 60);
      setTotalTokensUsed(prev => prev + tokensUsed);
      
      toast.success(`Session ended. Used ${tokensUsed} token(s) for ${formatTime(sessionDuration)}`);
    }
    
    setSessionDuration(0);
  }, [sessionDuration, formatTime]);

  const purchaseTokens = useCallback((amount: number) => {
    setCurrentTokens(prev => prev + amount);
    toast.success(`${amount} tokens added to your balance!`);
  }, []);

  // NEW: Add earned tokens (from engagement)
  const addTokens = useCallback((amount: number) => {
    setCurrentTokens(prev => prev + amount);
    setTotalTokensEarned(prev => prev + amount);
  }, []);

  const getTimeRemaining = useCallback((): string => {
    if (currentTokens <= 0) return "0:00";
    
    if (isActiveSession) {
      const tokensUsedThisSession = Math.floor(sessionDuration / 60);
      const remainingTokens = Math.max(0, currentTokens - tokensUsedThisSession);
      const remainingSeconds = remainingTokens * 60 - (sessionDuration % 60);
      return formatTime(Math.max(0, remainingSeconds));
    }
    
    return formatTime(currentTokens * 60);
  }, [currentTokens, isActiveSession, sessionDuration, formatTime]);

  const canStartSession = useCallback((): boolean => {
    return currentTokens > 0 && !isActiveSession;
  }, [currentTokens, isActiveSession]);

  const value: TimerContextType = {
    currentTokens,
    isActiveSession,
    sessionStartTime,
    sessionDuration,
    totalTokensUsed,
    totalTokensEarned,
    freeTokensUsed,
    maxFreeTokens,
    startSession,
    endSession,
    purchaseTokens,
    addTokens,
    formatTime,
    getTimeRemaining,
    canStartSession
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}