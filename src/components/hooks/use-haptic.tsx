import { useCallback } from 'react';

/**
 * Haptic Feedback Hook for Mobile Tactile Effects
 * Uses the Vibration API to provide physical feedback on user interactions
 */

export type HapticPattern = 
  | 'light'      // Subtle tap (10ms) - for simple interactions
  | 'medium'     // Standard tap (20ms) - for buttons, cards
  | 'heavy'      // Strong tap (30ms) - for important actions
  | 'success'    // Success pattern (10ms, pause, 10ms)
  | 'error'      // Error pattern (30ms, pause, 30ms)
  | 'warning'    // Warning pattern (20ms, pause, 20ms, pause, 20ms)
  | 'selection'  // Selection pattern (5ms) - very light
  | 'impact';    // Impact pattern (15ms) - for swipes/gestures

interface HapticOptions {
  enabled?: boolean;
}

export function useHaptic(options: HapticOptions = {}) {
  const { enabled = true } = options;

  const vibrate = useCallback((pattern: HapticPattern) => {
    // Check if haptics are enabled and Vibration API is supported
    if (!enabled || !navigator.vibrate) {
      return;
    }

    // Define vibration patterns (in milliseconds)
    const patterns: Record<HapticPattern, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10],
      error: [30, 100, 30],
      warning: [20, 50, 20, 50, 20],
      selection: 5,
      impact: 15,
    };

    try {
      navigator.vibrate(patterns[pattern]);
    } catch (error) {
      // Silently fail if vibration is not supported or blocked
      console.debug('Haptic feedback not available:', error);
    }
  }, [enabled]);

  // Convenience methods for common patterns
  const tap = useCallback(() => vibrate('medium'), [vibrate]);
  const lightTap = useCallback(() => vibrate('light'), [vibrate]);
  const heavyTap = useCallback(() => vibrate('heavy'), [vibrate]);
  const success = useCallback(() => vibrate('success'), [vibrate]);
  const error = useCallback(() => vibrate('error'), [vibrate]);
  const warning = useCallback(() => vibrate('warning'), [vibrate]);
  const select = useCallback(() => vibrate('selection'), [vibrate]);
  const impact = useCallback(() => vibrate('impact'), [vibrate]);

  return {
    vibrate,
    tap,
    lightTap,
    heavyTap,
    success,
    error,
    warning,
    select,
    impact,
  };
}

// Context for global haptic settings
import React, { createContext, useContext, useState, useEffect } from 'react';

interface HapticContextType {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
}

const HapticContext = createContext<HapticContextType | undefined>(undefined);

export function HapticProvider({ children }: { children: React.ReactNode }) {
  const [hapticsEnabled, setHapticsEnabled] = useState(() => {
    // Check localStorage for user preference
    try {
      const stored = localStorage.getItem('divinityagi_haptics_enabled');
      return stored !== null ? JSON.parse(stored) : true; // Default to enabled
    } catch {
      return true;
    }
  });

  useEffect(() => {
    // Save preference to localStorage
    try {
      localStorage.setItem('divinityagi_haptics_enabled', JSON.stringify(hapticsEnabled));
    } catch (error) {
      console.debug('Failed to save haptics preference:', error);
    }
  }, [hapticsEnabled]);

  return (
    <HapticContext.Provider value={{ hapticsEnabled, setHapticsEnabled }}>
      {children}
    </HapticContext.Provider>
  );
}

export function useHapticContext() {
  const context = useContext(HapticContext);
  if (!context) {
    throw new Error('useHapticContext must be used within HapticProvider');
  }
  return context;
}

// Hook that respects global haptic settings
export function useHapticFeedback() {
  const { hapticsEnabled } = useHapticContext();
  return useHaptic({ enabled: hapticsEnabled });
}
