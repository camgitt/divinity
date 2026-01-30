import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useSubscription } from "./subscription-context";
import { useBadges } from "./badges-context";
import { useSavedGuides } from "./saved-guides-context";
import { useCreatedGuide } from "./created-guide-context";
import { Sparkles, Star, Award } from "lucide-react";

interface SpiritualJourneySectionProps {
  onNavigate?: (tab: string) => void;
  className?: string;
}

/**
 * Combined Journey & Growth Section
 * Displays user's spiritual journey with tier information and subscription upgrade prompts
 * Dynamically adapts based on registration status and subscription tier
 */
export function SpiritualJourneySection({ 
  onNavigate, 
  className = "" 
}: SpiritualJourneySectionProps) {
  const { currentSubscription, tier, currentPlan } = useSubscription();
  const { unlockedBadges, totalWisdomPoints } = useBadges();
  const { savedGuides } = useSavedGuides();
  const { createdGuide } = useCreatedGuide();

  // Check if user is registered
  const isRegistered = React.useMemo(() => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      return !!storedUser;
    } catch (e) {
      return false;
    }
  }, []);

  // Get user name if registered
  const userName = React.useMemo(() => {
    try {
      const storedUser = localStorage.getItem('divinityagi_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.name || '';
      }
    } catch (e) {
      return '';
    }
    return '';
  }, []);

  return null;
}
