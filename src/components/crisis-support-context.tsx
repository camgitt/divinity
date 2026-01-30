import React, { createContext, useContext, useState, useCallback } from "react";

interface CrisisResource {
  name: string;
  description: string;
  phone: string;
  sms?: string;
  website: string;
  region: string;
  available: string;
}

interface CrisisSupportContextType {
  showCrisisResources: boolean;
  openCrisisResources: () => void;
  closeCrisisResources: () => void;
  checkForCrisisKeywords: (message: string) => boolean;
  getResourcesByRegion: (region: string) => CrisisResource[];
}

const CrisisSupportContext = createContext<CrisisSupportContextType | undefined>(undefined);

// Crisis keywords that may indicate someone needs help
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'no reason to live', 'better off dead', 'self harm', 'hurt myself',
  'cutting', 'overdose', 'hopeless', 'worthless', 'can\'t go on',
  'give up', 'no hope', 'end it all', 'severe depression'
];

// Global crisis resources
const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support 24/7 for people in distress",
    phone: "988",
    sms: "988",
    website: "https://988lifeline.org",
    region: "United States",
    available: "24/7"
  },
  {
    name: "Crisis Text Line",
    description: "Free, 24/7 crisis support via text",
    phone: "",
    sms: "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    region: "United States, Canada, UK, Ireland",
    available: "24/7"
  },
  {
    name: "International Association for Suicide Prevention",
    description: "Find crisis centers worldwide",
    phone: "",
    website: "https://www.iasp.info/resources/Crisis_Centres",
    region: "Worldwide",
    available: "Varies by location"
  },
  {
    name: "Samaritans",
    description: "Emotional support for anyone struggling",
    phone: "116 123",
    sms: "",
    website: "https://www.samaritans.org",
    region: "United Kingdom, Ireland",
    available: "24/7"
  },
  {
    name: "Lifeline Australia",
    description: "Crisis support and suicide prevention",
    phone: "13 11 14",
    sms: "Text 0477 13 11 14",
    website: "https://www.lifeline.org.au",
    region: "Australia",
    available: "24/7"
  },
  {
    name: "Crisis Services Canada",
    description: "Support for people in crisis",
    phone: "1-833-456-4566",
    sms: "Text 45645",
    website: "https://www.crisisservicescanada.ca",
    region: "Canada",
    available: "24/7"
  },
  {
    name: "NAMI Helpline",
    description: "Mental health support and resources",
    phone: "1-800-950-6264",
    sms: "Text NAMI to 741741",
    website: "https://www.nami.org/help",
    region: "United States",
    available: "Mon-Fri 10am-10pm ET"
  }
];

export function CrisisSupportProvider({ children }: { children: React.ReactNode }) {
  const [showCrisisResources, setShowCrisisResources] = useState(false);

  const openCrisisResources = useCallback(() => {
    setShowCrisisResources(true);
  }, []);

  const closeCrisisResources = useCallback(() => {
    setShowCrisisResources(false);
  }, []);

  const checkForCrisisKeywords = useCallback((message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  }, []);

  const getResourcesByRegion = useCallback((region: string): CrisisResource[] => {
    if (region === 'all') return CRISIS_RESOURCES;
    return CRISIS_RESOURCES.filter(
      resource => resource.region.toLowerCase().includes(region.toLowerCase()) || 
                  resource.region === 'Worldwide'
    );
  }, []);

  return (
    <CrisisSupportContext.Provider
      value={{
        showCrisisResources,
        openCrisisResources,
        closeCrisisResources,
        checkForCrisisKeywords,
        getResourcesByRegion,
      }}
    >
      {children}
    </CrisisSupportContext.Provider>
  );
}

export function useCrisisSupport() {
  const context = useContext(CrisisSupportContext);
  if (!context) {
    throw new Error("useCrisisSupport must be used within a CrisisSupportProvider");
  }
  return context;
}
