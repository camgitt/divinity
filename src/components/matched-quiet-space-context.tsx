import React, { createContext, useContext, useState, useEffect } from "react";

export interface MatchedQuietSpace {
  id: string;
  name: string;
  faithTradition: string;
  description: string;
  benefits: string[];
  practices: string[];
  ambientSound: string;
  meditationType: string;
  duration: number; // recommended duration in minutes
  imageUrl: string;
  matchScore?: number;
  matchedAt: string;
  // User preferences that led to this match
  userPreferences?: {
    spiritualGoals: string[];
    experienceLevel: string;
    preferredDuration: string;
    focusArea: string;
    breathingPreference: string;
  };
}

interface MatchedQuietSpaceContextType {
  matchedSpace: MatchedQuietSpace | null;
  saveMatchedSpace: (space: Omit<MatchedQuietSpace, 'matchedAt'>) => void;
  clearMatchedSpace: () => void;
  hasMatchedSpace: boolean;
}

const MatchedQuietSpaceContext = createContext<MatchedQuietSpaceContextType | undefined>(undefined);

const STORAGE_KEY = "divinityagi-matched-quiet-space";

export function MatchedQuietSpaceProvider({ children }: { children: React.ReactNode }) {
  const [matchedSpace, setMatchedSpace] = useState<MatchedQuietSpace | null>(null);

  // Load matched space from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMatchedSpace(parsed);
      }
    } catch (error) {
      console.error("Failed to load matched quiet space:", error);
    }
  }, []);

  // Save to localStorage whenever matchedSpace changes
  useEffect(() => {
    try {
      if (matchedSpace) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matchedSpace));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save matched quiet space:", error);
    }
  }, [matchedSpace]);

  const saveMatchedSpace = (space: Omit<MatchedQuietSpace, 'matchedAt'>) => {
    const newSpace: MatchedQuietSpace = {
      ...space,
      matchedAt: new Date().toISOString(),
    };
    setMatchedSpace(newSpace);
  };

  const clearMatchedSpace = () => {
    setMatchedSpace(null);
  };

  return (
    <MatchedQuietSpaceContext.Provider
      value={{
        matchedSpace,
        saveMatchedSpace,
        clearMatchedSpace,
        hasMatchedSpace: !!matchedSpace,
      }}
    >
      {children}
    </MatchedQuietSpaceContext.Provider>
  );
}

export function useMatchedQuietSpace() {
  const context = useContext(MatchedQuietSpaceContext);
  if (!context) {
    throw new Error("useMatchedQuietSpace must be used within a MatchedQuietSpaceProvider");
  }
  return context;
}
