import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner@2.0.3';

interface GuestModeContextType {
  isGuestMode: boolean;
  guestSessionActive: boolean;
  guestTimeRemaining: number; // in seconds
  startGuestSession: () => void;
  endGuestSession: () => void;
  canEarnTokens: () => boolean;
  canPurchaseTokens: () => boolean;
  promptUpgrade: (feature: 'tokens' | 'data-retention' | 'earning') => void;
}

const GuestModeContext = createContext<GuestModeContextType | undefined>(undefined);

interface GuestModeProviderProps {
  children: ReactNode;
}

const GUEST_SESSION_DURATION = 10 * 60; // 10 minutes in seconds

export function GuestModeProvider({ children }: GuestModeProviderProps) {
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [guestSessionActive, setGuestSessionActive] = useState(false);
  const [guestTimeRemaining, setGuestTimeRemaining] = useState(GUEST_SESSION_DURATION);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Check if user is in guest mode on mount
  useEffect(() => {
    const checkGuestMode = () => {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const isGuest = userData.id && userData.id.startsWith('guest-');
          setIsGuestMode(isGuest);
          
          if (isGuest) {
            console.log('👤 Guest mode detected');
            // Check if there's an active guest session
            const storedSessionStart = localStorage.getItem('divinityagi_guest_session_start');
            if (storedSessionStart) {
              const startTime = new Date(storedSessionStart);
              const now = new Date();
              const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
              
              if (elapsed < GUEST_SESSION_DURATION) {
                // Resume session
                setSessionStartTime(startTime);
                setGuestSessionActive(true);
                setGuestTimeRemaining(GUEST_SESSION_DURATION - elapsed);
                console.log('🔄 Resuming guest session with', GUEST_SESSION_DURATION - elapsed, 'seconds remaining');
              } else {
                // Session expired
                endGuestSession();
              }
            }
          }
        } catch (e) {
          console.error('Failed to parse guest user data:', e);
        }
      }
    };
    
    checkGuestMode();
  }, []);

  // Timer countdown for guest session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (guestSessionActive && guestTimeRemaining > 0) {
      interval = setInterval(() => {
        setGuestTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Show warnings
          if (newTime === 120) { // 2 minutes
            toast.warning('2 minutes remaining in your guest trial. Sign up to continue!', {
              duration: 5000,
              action: {
                label: 'Sign Up',
                onClick: () => promptUpgrade('data-retention')
              }
            });
          } else if (newTime === 30) { // 30 seconds
            toast.error('30 seconds remaining! Sign up now to save your progress.', {
              duration: 5000,
              action: {
                label: 'Sign Up Now',
                onClick: () => promptUpgrade('data-retention')
              }
            });
          } else if (newTime === 0) {
            // Session ended
            toast.error('Guest trial ended. Sign up to continue your spiritual journey!');
            endGuestSession();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [guestSessionActive, guestTimeRemaining]);

  // Auto-cleanup on page unload/close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isGuestMode && guestSessionActive) {
        console.log('👋 Guest session ending due to page close');
        endGuestSession();
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden && isGuestMode && guestSessionActive) {
        // Save session state when tab becomes hidden
        localStorage.setItem('divinityagi_guest_session_start', sessionStartTime?.toISOString() || '');
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isGuestMode, guestSessionActive, sessionStartTime]);

  const startGuestSession = useCallback(() => {
    const now = new Date();
    setSessionStartTime(now);
    setGuestSessionActive(true);
    setGuestTimeRemaining(GUEST_SESSION_DURATION);
    localStorage.setItem('divinityagi_guest_session_start', now.toISOString());
    console.log('🎉 Guest session started - 10 minutes trial');
    toast.success('Welcome! You have 10 minutes to explore DivinityAGI.', {
      duration: 5000,
      description: 'Sign up anytime to save your progress and unlock unlimited access!'
    });
  }, []);

  const endGuestSession = useCallback(() => {
    setGuestSessionActive(false);
    setSessionStartTime(null);
    setGuestTimeRemaining(0);
    localStorage.removeItem('divinityagi_guest_session_start');
    
    // Clear guest user data
    localStorage.removeItem('divinityagi_user');
    
    // Dispatch event to clear all guest data
    window.dispatchEvent(new CustomEvent('divinityagi:guest-mode-end'));
    
    console.log('🔚 Guest session ended');
  }, []);

  const canEarnTokens = useCallback(() => {
    return !isGuestMode; // Guests cannot earn tokens
  }, [isGuestMode]);

  const canPurchaseTokens = useCallback(() => {
    return !isGuestMode; // Guests cannot purchase tokens
  }, [isGuestMode]);

  const promptUpgrade = useCallback((feature: 'tokens' | 'data-retention' | 'earning') => {
    let message = '';
    let description = '';
    
    switch (feature) {
      case 'tokens':
        message = 'Purchase tokens with a free account';
        description = 'Sign up to unlock token purchases and extend your spiritual journey!';
        break;
      case 'data-retention':
        message = 'Save your spiritual journey';
        description = 'Create a free account to keep your progress, badges, and connections!';
        break;
      case 'earning':
        message = 'Earn tokens through engagement';
        description = 'Sign up to unlock the wisdom token system and earn rewards!';
        break;
    }
    
    toast.info(message, {
      duration: 7000,
      description,
      action: {
        label: 'Sign Up Free',
        onClick: () => {
          // Navigate to signup
          window.dispatchEvent(new CustomEvent('divinityagi:open-signup'));
        }
      }
    });
  }, []);

  const value: GuestModeContextType = {
    isGuestMode,
    guestSessionActive,
    guestTimeRemaining,
    startGuestSession,
    endGuestSession,
    canEarnTokens,
    canPurchaseTokens,
    promptUpgrade
  };

  return (
    <GuestModeContext.Provider value={value}>
      {children}
    </GuestModeContext.Provider>
  );
}

export function useGuestMode() {
  const context = useContext(GuestModeContext);
  if (context === undefined) {
    throw new Error('useGuestMode must be used within a GuestModeProvider');
  }
  return context;
}
