import React, { useRef, useEffect, useState } from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  videoStyle?: React.CSSProperties;
  volume?: number; // 0-1 scale
}

export function BackgroundVideo({ videoSrc, posterSrc, className = '', muted = true, loop = true, videoStyle, volume = 1.0 }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Set volume
      video.volume = volume;
      
      // Set mobile-specific attributes
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      video.setAttribute('x5-video-player-type', 'h5');
      video.setAttribute('x5-video-player-fullscreen', 'false');
      video.muted = muted; // Use prop value
      
      // Aggressive autoplay function
      const attemptPlay = () => {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('✅ Video autoplay successful');
              setVideoLoaded(true);
            })
            .catch((error) => {
              console.log('❌ Video autoplay prevented:', error);
              // Try again on any user interaction
              const playOnInteraction = () => {
                video.play()
                  .then(() => {
                    console.log('✅ Video playing after interaction');
                    setVideoLoaded(true);
                  })
                  .catch(e => console.log('Touch play failed:', e));
              };
              
              document.addEventListener('touchstart', playOnInteraction, { once: true });
              document.addEventListener('click', playOnInteraction, { once: true });
              document.addEventListener('scroll', playOnInteraction, { once: true });
            });
        }
      };

      // Multiple play attempt strategies
      const handleLoadedMetadata = () => {
        console.log('📹 Video metadata loaded');
        attemptPlay();
      };

      const handleCanPlay = () => {
        console.log('🎬 Video can play');
        attemptPlay();
      };

      // Handle video end based on loop prop
      const handleEnded = () => {
        if (loop) {
          console.log('🔄 Video ended, restarting...');
          video.currentTime = 0;
          video.play().catch(e => console.log('Loop restart failed:', e));
        } else {
          console.log('⏹️ Video ended, not looping');
        }
      };

      // Handle visibility change - restart video when page becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden && video.paused && loop) {
          console.log('👁️ Page visible, restarting video');
          video.play().catch(e => console.log('Visibility play failed:', e));
        }
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('ended', handleEnded);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Try to load and play immediately
      video.load();
      
      // Attempt to play after a short delay (helps on some mobile browsers)
      setTimeout(() => {
        attemptPlay();
      }, 100);
      
      // Another attempt after page is fully loaded
      setTimeout(() => {
        attemptPlay();
      }, 500);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return (
    <div 
      className={`fixed inset-0 ${className}`} 
      style={{ zIndex: 0 }}
    >
      {/* Poster image as background - shows immediately */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            zIndex: 0,
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      )}
      
      {/* Video element - shows immediately if no poster, otherwise fades in when loaded */}
      <video
        ref={videoRef}
        autoPlay
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          zIndex: 1,
          opacity: posterSrc ? (videoLoaded ? 1 : 0) : 1,
          transition: posterSrc ? 'opacity 0.5s ease-in-out' : 'none',
          ...videoStyle
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}