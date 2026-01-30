import React, { createContext, useContext, useState, useEffect } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'guide';
  timestamp: Date;
}

export interface CreatedGuide {
  guideName?: string;
  guideRole: string;
  faith: string;
  agePreference: string;
  spiritualGoals: string[];
  usageFrequency: string;
  generatedImageUrl?: string; // AI-generated avatar image or matched guide image
  createdAt: string;
  conversationHistory?: ChatMessage[];
  archivedAt?: string;
  // Additional fields for matched guides
  description?: string; // Guide's bio/description
  welcomeMessage?: string; // Personalized welcome message
  isMatched?: boolean; // Flag to indicate if guide was matched vs created
  matchedGuideId?: string; // ID of the matched guide from database
  chatUrl?: string; // D-ID agent link for this guide
  // Extended matched guide attributes for profile display
  specialties?: string[]; // Guide's areas of expertise
  personality?: string[]; // Guide's personality traits
  sect?: string[]; // Specific sect or tradition focus
  archetypeRoles?: string[]; // Guide archetype roles
  journeyLevel?: string[]; // Suitable journey levels
}

interface CreatedGuideContextType {
  createdGuide: CreatedGuide | null;
  archivedGuides: CreatedGuide[];
  saveCreatedGuide: (guide: Omit<CreatedGuide, 'createdAt'>) => void;
  updateGuide: (updates: Partial<CreatedGuide>) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearConversation: () => void;
  clearCreatedGuide: () => void;
  archiveCurrentGuide: () => void;
  restoreArchivedGuide: (archivedGuide: CreatedGuide) => void;
  deleteArchivedGuide: (createdAt: string) => void;
  hasCreatedGuide: boolean;
}

const CreatedGuideContext = createContext<CreatedGuideContextType | undefined>(undefined);

const STORAGE_KEY = "divinityagi-created-guide";
const ARCHIVED_STORAGE_KEY = "divinityagi-archived-guides";

export function CreatedGuideProvider({ children }: { children: React.ReactNode }) {
  const [createdGuide, setCreatedGuide] = useState<CreatedGuide | null>(null);
  const [archivedGuides, setArchivedGuides] = useState<CreatedGuide[]>([]);

  // Load created guide from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCreatedGuide(parsed);
      }
    } catch (error) {
      console.error("Failed to load created guide:", error);
    }
  }, []);

  // Load archived guides from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ARCHIVED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setArchivedGuides(parsed);
      }
    } catch (error) {
      console.error("Failed to load archived guides:", error);
    }
  }, []);

  // Save to localStorage whenever createdGuide changes
  useEffect(() => {
    try {
      if (createdGuide) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(createdGuide));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save created guide:", error);
    }
  }, [createdGuide]);

  // Save archived guides to localStorage whenever they change
  useEffect(() => {
    try {
      if (archivedGuides.length > 0) {
        localStorage.setItem(ARCHIVED_STORAGE_KEY, JSON.stringify(archivedGuides));
      } else {
        localStorage.removeItem(ARCHIVED_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save archived guides:", error);
    }
  }, [archivedGuides]);

  // Listen for localStorage changes (e.g., when app is reset)
  // This ensures context stays in sync when data is cleared externally
  useEffect(() => {
    const handleStorageChange = () => {
      const storedGuide = localStorage.getItem(STORAGE_KEY);
      const storedArchived = localStorage.getItem(ARCHIVED_STORAGE_KEY);
      
      // If localStorage was cleared but we still have state, clear it
      if (!storedGuide && createdGuide) {
        console.log('CreatedGuideContext: Detected guide data cleared from localStorage');
        setCreatedGuide(null);
      }
      
      if (!storedArchived && archivedGuides.length > 0) {
        console.log('CreatedGuideContext: Detected archived guides cleared from localStorage');
        setArchivedGuides([]);
      }
    };

    // Check every 2 seconds for localStorage changes
    const intervalId = setInterval(handleStorageChange, 2000);

    // Also listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [createdGuide, archivedGuides]);

  const saveCreatedGuide = (guide: Omit<CreatedGuide, 'createdAt'>) => {
    const newGuide: CreatedGuide = {
      ...guide,
      createdAt: new Date().toISOString(),
    };
    setCreatedGuide(newGuide);
  };

  const updateGuide = (updates: Partial<CreatedGuide>) => {
    if (!createdGuide) return;
    
    setCreatedGuide({
      ...createdGuide,
      ...updates,
    });
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    if (!createdGuide) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...message,
    };

    const updatedHistory = [...(createdGuide.conversationHistory || []), newMessage];
    
    setCreatedGuide({
      ...createdGuide,
      conversationHistory: updatedHistory,
    });
  };

  const clearConversation = () => {
    if (!createdGuide) return;
    
    setCreatedGuide({
      ...createdGuide,
      conversationHistory: [],
    });
  };

  const clearCreatedGuide = () => {
    setCreatedGuide(null);
  };

  const archiveCurrentGuide = () => {
    if (!createdGuide) return;
    
    // Check if this guide is already archived (by createdAt timestamp)
    const alreadyArchived = archivedGuides.some(g => g.createdAt === createdGuide.createdAt);
    
    if (alreadyArchived) {
      // Guide is already in archive, just clear current guide
      console.log('Guide already archived, skipping duplicate');
      setCreatedGuide(null);
      return;
    }
    
    // Add archivedAt timestamp to current guide
    const archivedGuide: CreatedGuide = {
      ...createdGuide,
      archivedAt: new Date().toISOString(),
    };
    
    // Add to archived guides array
    setArchivedGuides(prev => [archivedGuide, ...prev]);
    
    // Clear current guide
    setCreatedGuide(null);
  };

  const restoreArchivedGuide = (archivedGuide: CreatedGuide) => {
    // Archive current guide if one exists
    if (createdGuide) {
      archiveCurrentGuide();
    }
    
    // Remove archivedAt and restore as current guide
    const { archivedAt, ...restoredGuide } = archivedGuide;
    setCreatedGuide(restoredGuide as CreatedGuide);
    
    // Remove from archived guides
    setArchivedGuides(prev => prev.filter(g => g.createdAt !== archivedGuide.createdAt));
  };

  const deleteArchivedGuide = (createdAt: string) => {
    setArchivedGuides(prev => prev.filter(g => g.createdAt !== createdAt));
  };

  return (
    <CreatedGuideContext.Provider
      value={{
        createdGuide,
        archivedGuides,
        saveCreatedGuide,
        updateGuide,
        addMessage,
        clearConversation,
        clearCreatedGuide,
        archiveCurrentGuide,
        restoreArchivedGuide,
        deleteArchivedGuide,
        hasCreatedGuide: !!createdGuide,
      }}
    >
      {children}
    </CreatedGuideContext.Provider>
  );
}

export function useCreatedGuide() {
  const context = useContext(CreatedGuideContext);
  if (!context) {
    throw new Error("useCreatedGuide must be used within a CreatedGuideProvider");
  }
  return context;
}