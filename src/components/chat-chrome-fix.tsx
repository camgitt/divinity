import React from 'react';
import { Chat } from './chat';
import { useCrisisSupport } from './crisis-support-context';
import { toast } from 'sonner@2.0.3';

interface ChatChromeFixProps {
  onOpenMission?: () => void;
  onNavigate?: (tab: string) => void;
}

/**
 * Chrome Mobile Fix Wrapper for Chat Component
 * 
 * This wrapper ensures the Chat component renders properly on all browsers.
 * Handles client-side hydration and data sanitization for cross-browser compatibility.
 */
export function ChatChromeFix({ onOpenMission, onNavigate }: ChatChromeFixProps) {
  const [isClient, setIsClient] = React.useState(false);
  const { checkForCrisisKeywords, openCrisisResources } = useCrisisSupport();

  React.useEffect(() => {
    setIsClient(true);
    
    // Sanitize chat history and check for crisis keywords
    try {
      const chatHistory = localStorage.getItem('divinityagi_chat_history');
      if (chatHistory) {
        const parsed = JSON.parse(chatHistory);
        
        // Validate and sanitize all data to ensure no objects are rendered as text
        const sanitized = parsed.map((session: any) => ({
          ...session,
          timestamp: session.timestamp ? new Date(session.timestamp).toISOString() : new Date().toISOString(),
          messages: Array.isArray(session.messages) 
            ? session.messages.map((msg: any) => {
                const messageText = String(msg.text || '');
                
                // Check for crisis keywords in user messages
                if (msg.sender === 'user' && checkForCrisisKeywords(messageText)) {
                  // Show crisis support resources (only once per session)
                  const shownCrisisAlert = sessionStorage.getItem('divinityagi_crisis_alert_shown');
                  if (!shownCrisisAlert) {
                    sessionStorage.setItem('divinityagi_crisis_alert_shown', 'true');
                    setTimeout(() => {
                      toast.error('We noticed you might be struggling. Please reach out for help.', {
                        duration: 10000,
                        action: {
                          label: 'Get Support',
                          onClick: () => openCrisisResources()
                        }
                      });
                    }, 1000);
                  }
                }
                
                return {
                  text: messageText,
                  sender: msg.sender,
                  timestamp: msg.timestamp ? new Date(msg.timestamp).toISOString() : new Date().toISOString()
                };
              })
            : []
        }));
        
        localStorage.setItem('divinityagi_chat_history', JSON.stringify(sanitized));
      }
    } catch (e) {
      console.error('[DivinityAGI] Failed to sanitize chat history:', e);
      // Clear corrupted data
      localStorage.removeItem('divinityagi_chat_history');
    }
  }, [checkForCrisisKeywords, openCrisisResources]);

  // Don't render on server - prevents hydration mismatches
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-white">Loading Chat...</div>
      </div>
    );
  }

  return <Chat onOpenMission={onOpenMission} onNavigate={onNavigate} />;
}
