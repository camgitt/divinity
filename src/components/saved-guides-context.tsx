import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner@2.0.3";
import { GuideType } from "./guide-type-utils";
import { GUIDE_AVATAR_MAP } from "./guide-avatar-map";
import { guides as guideMatchingData } from "./guide-matching-data";

// Re-export for backward compatibility
export { GUIDE_AVATAR_MAP } from "./guide-avatar-map";

import popeImage from 'figma:asset/08703f745981cbf04ba9cef529022256063f6160.png';
import islamicGuideImage from 'figma:asset/c37a3e878b675cc69a1b2e3b8687a682107f5d44.png';
import jewishGuideImage from 'figma:asset/ef268f75ad551966f3af62b7c76d2d740e372be7.png';
import shaktiImage from 'figma:asset/ad52409fd304dfc7ba472dfc2851d8debfde00ac.png';
import buddhistGuideImage from 'figma:asset/19d28cea72c5744469adbe42b1cf6f10b7b4e933.png';
import taoistGuideImage from 'figma:asset/94ffd1b9364891348a495038b259e2935f25b0e3.png';
import shintoGuideImage from 'figma:asset/2125c1928ea040e5b5d01616e638dc5f18c5e669.png';
import jainGuideImage from 'figma:asset/316b450d04c4813b36fa5dd52105523a742d74ad.png';
import sageGuideImage from 'figma:asset/eb11c945b71144fc2108b42c7b42c664c859f023.png';
import odinImage from 'figma:asset/2c928b9beaa35a721a6e3ec55dc9849e4863dad6.png';
import harjitSinghImage from 'figma:asset/11334387f8ba8aad50f5f81aa6283c5ed43c7ed9.png';
import leilaFarzanImage from 'figma:asset/6af6457672e5e89ce643e60a8e48a95c34e32b62.png';

export interface SavedGuide {
  id: string;
  guideName: string;
  tradition: string;
  faithColor: string;
  topic?: string;
  avatar?: string;
  specialty?: string;
  description?: string;
  chatUrl?: string;
  savedAt: string;
  timestamp: string;
  isDefault?: boolean; // Track if this is a default guide
  guideType?: 'faith-page' | 'companion' | 'verified-leader'; // Track the type of guide
}

interface SavedGuidesContextType {
  savedGuides: SavedGuide[];
  saveGuide: (guide: Omit<SavedGuide, 'id' | 'savedAt' | 'timestamp'>) => void;
  removeGuide: (id: string) => void;
  isGuideSaved: (guideName: string, tradition: string) => boolean;
  clearAllGuides: () => void;
  clearCompanionGuides: () => void; // New method to clear only companion guides
}

const SavedGuidesContext = createContext<SavedGuidesContextType | undefined>(undefined);

const STORAGE_KEY = "divinityagi-saved-guides";
const VERSION_KEY = "divinityagi-saved-guides-version";
const CURRENT_VERSION = "19"; // Increment to regenerate guides with Father Brian as Christianity default

// Faith color mapping for traditions
const FAITH_COLOR_MAP: Record<string, string> = {
  "Christianity": "#E53935",
  "Sunni Islam": "#2E7D32",
  "Shia Islam": "#2E7D32",
  "Sufi Islam": "#2E7D32",
  "Islam": "#2E7D32",
  "Judaism": "#1565C0",
  "Hinduism": "#F4511E",
  "Buddhism": "#F9A825",
  "Taoism": "#212121",
  "Shinto": "#E64A19",
  "Jainism": "#FFB300",
  "Confucianism": "#5D4037",
  "Norse Polytheism": "#F59E0B",
  "Sikhism": "#F57F17",
  "Bahá'í Faith": "#9C27B0"
};

// Function to generate default guides dynamically from guide-matching-data.ts
// This ensures the slider always shows current guide information
function generateDefaultGuides(): Omit<SavedGuide, 'id' | 'savedAt' | 'timestamp'>[] {
  // Define which guide ID to use for each faith tradition (one per faith page)
  const defaultGuideIds = [
    "buddhism-vajrayana-lama-dorje",         // Buddhism - Lama Dorje (FIRST)
    "catholic-father-brian",                 // Christianity - Father Brian
    "sunni-sheikh-yusuf",                    // Islam - Sheikh Yusuf ibn Ahmad
    "conservative-rabbi-miriam",             // Judaism - Rabbi Miriam Levin  
    "hindu-anika",                           // Hinduism - Anika
    "taoist-master",                         // Taoism - Master Li Shen
    "shinto-priest",                         // Shinto - Hikari no Mori
    "jain-acharya",                          // Jainism - Ācārya Satyaprabha
    "confucianism-classical-kong-fuzi",      // Confucianism - Kong Fuzi (Confucius)
    "norse-odin",                            // Norse Polytheism - Odin Allfather
    "sikh-harjit-singh",                     // Sikhism - Bhai Harjit Singh
    "bahai-reform-leila-farzan"              // Bahá'í Faith - Dr. Leila Farzan
  ];

  const defaultGuides: Omit<SavedGuide, 'id' | 'savedAt' | 'timestamp'>[] = [];

  for (const guideId of defaultGuideIds) {
    const guide = guideMatchingData.find(g => g.id === guideId);
    if (guide) {
      // Normalize faith tradition name for consistency with spirit-guide-page.tsx
      // This ensures tradition names match what's displayed in the slider
      let traditionName = guide.faith;
      
      // Normalize Islam variants
      if (traditionName === "Sunni Islam" || traditionName === "Shia Islam" || traditionName === "Sufi Islam") {
        traditionName = "Islam";
      }
      
      // Normalize polytheism variants
      if (traditionName === "Greek Polytheism" || traditionName === "Egyptian Polytheism") {
        traditionName = "Norse Polytheism"; // Group all polytheism under Norse for now
      }
      
      // Normalize other special cases (keeping exact capitalization)
      // These should already match, but being explicit for clarity
      const faithNormalizationMap: Record<string, string> = {
        "Christianity": "Christianity",
        "Islam": "Islam",
        "Sunni Islam": "Islam",
        "Shia Islam": "Islam",
        "Sufi Islam": "Islam",
        "Judaism": "Judaism",
        "Hinduism": "Hinduism",
        "Buddhism": "Buddhism",
        "Taoism": "Taoism",
        "Shinto": "Shinto",
        "Jainism": "Jainism",
        "Confucianism": "Confucianism",
        "Norse Polytheism": "Norse Polytheism",
        "Greek Polytheism": "Norse Polytheism",
        "Egyptian Polytheism": "Norse Polytheism",
        "Sikhism": "Sikhism",
        "Bahá'í Faith": "Bahá'í Faith",
        "The Occult": "The Occult"
      };
      
      traditionName = faithNormalizationMap[traditionName] || traditionName;

      defaultGuides.push({
        guideName: guide.name,
        tradition: traditionName,
        faithColor: FAITH_COLOR_MAP[guide.faith] || "#7A4FFF",
        specialty: guide.specialties[0] || guide.role,
        description: guide.description,
        chatUrl: guide.chatUrl,
        avatar: guide.image, // Pull image from guide-matching-data
        isDefault: true,
        guideType: 'faith-page'
      });
      
      console.log(`✅ Added default guide: ${guide.name} (${traditionName})`);
    } else {
      console.error(`Guide not found in database: ${guideId}`);
    }
  }

  return defaultGuides;
}

// Generate default guides dynamically
const DEFAULT_GUIDES = generateDefaultGuides();

// Helper function to get heart color based on guide type
export function getHeartColorForGuideType(guideType?: 'faith-page' | 'companion' | 'verified-leader'): string {
  switch (guideType) {
    case 'companion':
      return '#3B82F6'; // Blue for companions
    case 'verified-leader':
      return '#10B981'; // Green for verified leaders
    case 'faith-page':
    default:
      return '#EF4444'; // Red for faith page guides (default)
  }
}

export function SavedGuidesProvider({ children }: { children: ReactNode }) {
  const [savedGuides, setSavedGuides] = useState<SavedGuide[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved guides from localStorage on mount, or initialize with defaults
  useEffect(() => {
    console.log('🔄 SavedGuidesProvider: Loading guides...');
    
    try {
      const storedVersion = localStorage.getItem(VERSION_KEY);
      const stored = localStorage.getItem(STORAGE_KEY);
      
      console.log('📦 Current version:', CURRENT_VERSION);
      console.log('📦 Stored version:', storedVersion);
      console.log('📦 Has stored data:', !!stored);
      
      // If version mismatch or no data, reinitialize with defaults
      if (storedVersion !== CURRENT_VERSION || !stored) {
        console.log('⚠️ Version mismatch or no data - reinitializing...');
        // Clear old data and initialize with default 12 guides
        const now = new Date();
        const defaultGuidesWithMeta = DEFAULT_GUIDES.map((guide, index) => ({
          ...guide,
          id: `default-${guide.tradition.toLowerCase().replace(/\s+/g, '-')}-${Date.now() + index}`,
          savedAt: now.toISOString(),
          timestamp: "Default",
          isDefault: true
        }));
        setSavedGuides(defaultGuidesWithMeta);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGuidesWithMeta));
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        console.log("✅ Initialized with 12 default guides");
        console.log('📋 Default guides:', defaultGuidesWithMeta.map(g => `${g.guideName} (${g.tradition})`).join(', '));
      } else {
        // Load existing data
        const parsed = JSON.parse(stored);
        setSavedGuides(parsed);
        console.log(`✅ Loaded ${parsed.length} saved guides from storage`);
        console.log('📋 Loaded guides:', parsed.map((g: SavedGuide) => `${g.guideName} (${g.tradition})`).join(', '));
      }
      setIsInitialized(true);
      console.log('✅ SavedGuidesProvider: Initialization complete');
    } catch (error) {
      console.error("❌ Failed to load saved guides:", error);
      // Fallback: initialize with defaults
      const now = new Date();
      const defaultGuidesWithMeta = DEFAULT_GUIDES.map((guide, index) => ({
        ...guide,
        id: `default-${guide.tradition.toLowerCase().replace(/\s+/g, '-')}-${Date.now() + index}`,
        savedAt: now.toISOString(),
        timestamp: "Default",
        isDefault: true
      }));
      setSavedGuides(defaultGuidesWithMeta);
      setIsInitialized(true);
      console.log('⚠️ Fallback: Initialized with 12 default guides');
    }
  }, []);

  // Save to localStorage whenever savedGuides changes
  useEffect(() => {
    // Only save if initialized to prevent overwriting on first render
    if (!isInitialized) {
      console.log('⏸️ Skipping save - not initialized yet');
      return;
    }
    
    console.log(`💾 Saving ${savedGuides.length} guides to localStorage`);
    console.log('📋 Saving:', savedGuides.map(g => `${g.guideName} (${g.tradition})`).join(', '));
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGuides));
      console.log('✅ Saved to localStorage successfully');
    } catch (error) {
      console.error("❌ Failed to save guides:", error);
    }
  }, [savedGuides, isInitialized]);

  const saveGuide = (guide: Omit<SavedGuide, 'id' | 'savedAt' | 'timestamp'>) => {
    // Check if this exact guide (same name and tradition) is already saved
    const existing = savedGuides.find(
      g => g.guideName === guide.guideName && g.tradition === guide.tradition
    );

    if (existing) {
      toast.info(`${guide.guideName} is already in your saved guides`);
      return;
    }

    // Allow multiple guides from the same faith tradition
    const now = new Date();
    const newGuide: SavedGuide = {
      ...guide,
      id: `${guide.guideName}-${guide.tradition}-${Date.now()}`,
      savedAt: now.toISOString(),
      timestamp: "Just now",
      isDefault: false
    };

    setSavedGuides(prev => [newGuide, ...prev]);
    toast.success(`${guide.guideName} saved to your guides`, {
      description: `You can find this guide in the Chat tab`,
      duration: 3000,
    });
  };

  const removeGuide = (id: string) => {
    const guide = savedGuides.find(g => g.id === id);
    setSavedGuides(prev => prev.filter(g => g.id !== id));
    
    if (guide?.isDefault) {
      toast.success(`${guide.guideName} removed from your guides`, {
        description: "You can re-add this guide anytime",
        duration: 2500,
      });
    } else {
      toast.success("Guide removed from saved conversations");
    }
  };

  const isGuideSaved = (guideName: string, tradition: string) => {
    return savedGuides.some(
      g => g.guideName === guideName && g.tradition === tradition
    );
  };

  const clearAllGuides = () => {
    setSavedGuides([]);
    toast.success("All saved guides cleared");
  };

  const clearCompanionGuides = () => {
    setSavedGuides(prev => prev.filter(g => g.guideType !== 'companion'));
    toast.success("All companion guides cleared");
  };

  return (
    <SavedGuidesContext.Provider
      value={{
        savedGuides,
        saveGuide,
        removeGuide,
        isGuideSaved,
        clearAllGuides,
        clearCompanionGuides
      }}
    >
      {children}
    </SavedGuidesContext.Provider>
  );
}

export function useSavedGuides() {
  const context = useContext(SavedGuidesContext);
  if (!context) {
    throw new Error("useSavedGuides must be used within a SavedGuidesProvider");
  }
  return context;
}