import React, { createContext, useContext, useState, useEffect } from "react";

export interface ArchivedQuietSpace {
  id: string;
  name: string;
  faithTradition: string;
  description: string;
  benefits: string[];
  practices: string[];
  ambientSound: string;
  meditationType: string;
  duration: number;
  imageUrl: string;
  matchScore?: number;
  archivedAt: string;
  meditationId: string; // Link to one of the 17 default meditations
}

interface ArchivedQuietSpacesContextType {
  archivedSpaces: ArchivedQuietSpace[];
  archiveSpace: (space: Omit<ArchivedQuietSpace, 'archivedAt'>) => void;
  removeArchivedSpace: (id: string) => void;
  clearAllArchivedSpaces: () => void;
}

const ArchivedQuietSpacesContext = createContext<ArchivedQuietSpacesContextType | undefined>(undefined);

const STORAGE_KEY = "divinityagi-archived-quiet-spaces";

export function ArchivedQuietSpacesProvider({ children }: { children: React.ReactNode }) {
  const [archivedSpaces, setArchivedSpaces] = useState<ArchivedQuietSpace[]>([]);

  // Load archived spaces from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setArchivedSpaces(parsed);
      }
    } catch (error) {
      console.error("Failed to load archived quiet spaces:", error);
    }
  }, []);

  // Save to localStorage whenever archivedSpaces changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(archivedSpaces));
    } catch (error) {
      console.error("Failed to save archived quiet spaces:", error);
    }
  }, [archivedSpaces]);

  const archiveSpace = (space: Omit<ArchivedQuietSpace, 'archivedAt'>) => {
    const newSpace: ArchivedQuietSpace = {
      ...space,
      archivedAt: new Date().toISOString(),
    };
    
    // Check if this space already exists (by id)
    const exists = archivedSpaces.find(s => s.id === space.id);
    if (exists) {
      // Update the archived date
      setArchivedSpaces(prev => 
        prev.map(s => s.id === space.id ? newSpace : s)
      );
    } else {
      // Add new space at the beginning
      setArchivedSpaces(prev => [newSpace, ...prev]);
    }
  };

  const removeArchivedSpace = (id: string) => {
    setArchivedSpaces(prev => prev.filter(s => s.id !== id));
  };

  const clearAllArchivedSpaces = () => {
    setArchivedSpaces([]);
  };

  return (
    <ArchivedQuietSpacesContext.Provider
      value={{
        archivedSpaces,
        archiveSpace,
        removeArchivedSpace,
        clearAllArchivedSpaces,
      }}
    >
      {children}
    </ArchivedQuietSpacesContext.Provider>
  );
}

export function useArchivedQuietSpaces() {
  const context = useContext(ArchivedQuietSpacesContext);
  if (!context) {
    throw new Error("useArchivedQuietSpaces must be used within an ArchivedQuietSpacesProvider");
  }
  return context;
}
