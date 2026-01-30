import { useEffect, useCallback } from "react";
import { useEngagement } from "../engagement-tracker";

/**
 * Hook to automatically track engagement in chat conversations
 * 
 * Usage in Chat component:
 * ```tsx
 * const { trackMessage, trackResponse } = useChatEngagement();
 * 
 * // When user sends a message:
 * trackMessage();
 * 
 * // When guide responds:
 * trackResponse();
 * ```
 */
export function useChatEngagement() {
  const { 
    recordActivity, 
    startEngagement, 
    stopEngagement,
    isEngaged 
  } = useEngagement();

  // Start engagement tracking when component mounts
  useEffect(() => {
    startEngagement();
    
    // Stop tracking when component unmounts
    return () => {
      stopEngagement();
    };
  }, [startEngagement, stopEngagement]);

  // Track user sending a message
  const trackMessage = useCallback(() => {
    recordActivity();
  }, [recordActivity]);

  // Track guide responding (also counts as engagement)
  const trackResponse = useCallback(() => {
    recordActivity();
  }, [recordActivity]);

  // Track any other interaction (scrolling, clicking, etc.)
  const trackInteraction = useCallback(() => {
    recordActivity();
  }, [recordActivity]);

  return {
    trackMessage,
    trackResponse,
    trackInteraction,
    isEngaged
  };
}
