import React, { useEffect, useRef } from 'react';

interface VoiceflowChatProps {
  versionID: string;
  agentName: string;
  faithColor?: string;
}

export function VoiceflowChat({ versionID, agentName, faithColor = '#7A4FFF' }: VoiceflowChatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;

    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.onload = () => {
      // Initialize Voiceflow after script loads
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: versionID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: versionID,
          assistant: {
            title: agentName,
            color: faithColor,
            avatar: '',
            spacing: {
              side: 24,
              bottom: 24
            }
          },
          render: {
            mode: 'embedded',
            target: containerRef.current
          },
          autostart: false
        });
        scriptLoadedRef.current = true;
      }
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [versionID, agentName, faithColor]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-[#0B1426]"
      style={{ minHeight: '100%' }}
    />
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: any) => void;
        open: () => void;
        close: () => void;
      };
    };
  }
}
