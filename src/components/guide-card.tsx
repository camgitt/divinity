import React, { useState, memo } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Bookmark } from "lucide-react";
import { getFaithSymbol } from "./faith-symbols-config";
import { useGuideSwipe } from "./hooks/use-guide-swipe";
import { useHapticFeedback } from "./hooks/use-haptic";

export interface Guide {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tradition: string;
}

interface GuideCardProps {
  guide: Guide;
  isPinned: boolean;
  onTogglePin: () => void;
  onConnect: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  useOverlay?: boolean;
}

export const GuideCard = memo(function GuideCard({
  guide,
  isPinned,
  onTogglePin,
  onConnect,
  onSwipeLeft,
  onSwipeRight,
  className = "",
  useOverlay = false
}: GuideCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const faithConfig = getFaithSymbol(guide.id);
  const haptic = useHapticFeedback();

  const { dragX, isDragging, handleDragStart, handleDrag, handleDragEnd } = useGuideSwipe({
    onSwipeLeft,
    onSwipeRight,
    threshold: 100
  });

  const handleConnect = () => {
    haptic.tap();
    if (useOverlay) {
      // Use overlay mode - just call onConnect, parent handles overlay
      onConnect();
    } else {
      // Use new tab mode - open in new window
      const url = faithConfig.chatUrl;
      
      try {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        try {
          window.open(url, '_blank', 'noopener,noreferrer');
        } catch (secondError) {
          window.location.href = url;
        }
      }
      
      onConnect();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      whileTap={{ cursor: "grabbing" }}
    >
      <Card 
        className="bg-white border border-[#E8E5FF] rounded-2xl overflow-hidden h-full elevation-2 hover:elevation-hover-2 hover:border-[#6B5DD3]/30 transition-all duration-500"
        role="article"
        aria-label={`${guide.name} - ${guide.tradition} spiritual guide`}
      >
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-b from-[#F5F7FA] to-white">
          <ImageWithFallback
            src={guide.image}
            alt={`${guide.name} - ${guide.tradition} guide`}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5F7FA] to-[#E8E5FF] animate-pulse" />
          )}
          
          {/* Gradient Overlay - subtle for light theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
          
          {/* Faith Symbol Badge */}
          {faithConfig.image && (
            <div 
              className={`absolute bottom-4 right-4 w-12 h-12 ${faithConfig.bgColor} rounded-full flex items-center justify-center elevation-2 hover:elevation-hover-1 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/50`}
              aria-label={`${faithConfig.alt} symbol`}
            >
              <img 
                src={faithConfig.image} 
                alt={faithConfig.alt}
                className="w-7 h-7 object-contain"
              />
            </div>
          )}
          
          {/* Tradition Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#FFB84D]/40 elevation-1">
              <span className="text-[#FFB84D] text-xs tracking-wide" style={{ fontWeight: 600 }}>
                {guide.tradition}
              </span>
            </div>
          </div>

          {/* Save/Pin Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              haptic.lightTap();
              onTogglePin();
            }}
            className={`absolute top-4 left-4 group transition-all duration-300 backdrop-blur-sm px-4 py-2 rounded-full border ${
              isPinned
                ? 'bg-white/95 text-[#6B5DD3] border-[#6B5DD3]/50 elevation-1'
                : 'bg-white/70 text-[#5D5D7D] border-[#C5C5D0] hover:text-[#6B5DD3] hover:border-[#6B5DD3]/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPinned ? `Remove ${guide.name} from saved guides` : `Save ${guide.name} to your guides`}
            aria-pressed={isPinned}
          >
            <div className="flex items-center gap-2">
              <Bookmark 
                className={`w-4 h-4 transition-all duration-300 ${
                  isPinned ? 'fill-current' : ''
                }`} 
              />
              <span className="text-xs tracking-wide" style={{ fontWeight: 600 }}>
                {isPinned ? 'SAVED' : 'SAVE'}
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#3D3D6B] text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none elevation-2 border border-white/10 z-10">
              {isPinned ? 'Click to unsave guide' : 'Save to your guides'}
            </div>
          </motion.button>

          {/* Swipe Indicators */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ 
              opacity: Math.abs(dragX) > 50 ? 1 : 0,
              scale: Math.abs(dragX) > 50 ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
          >
            {dragX > 50 && (
              <div className="bg-green-500/20 border-2 border-green-500 text-green-700 px-6 py-3 rounded-full backdrop-blur-sm elevation-2" style={{ fontWeight: 600 }}>
                ← PREVIOUS
              </div>
            )}
            {dragX < -50 && (
              <div className="bg-blue-500/20 border-2 border-blue-500 text-blue-700 px-6 py-3 rounded-full backdrop-blur-sm elevation-2" style={{ fontWeight: 600 }}>
                NEXT →
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <h3 className="text-2xl text-[#3D3D6B] mb-2" style={{ fontWeight: 600 }}>
              {guide.name}
            </h3>
            <p className="text-[#5D5D7D] leading-relaxed" style={{ fontWeight: 400 }}>
              {guide.subtitle}
            </p>
          </div>
          
          {/* Action Button */}
          <div className="mt-auto">
            <Button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-[#6B5DD3] to-[#FFB84D] hover:from-[#5B4DC3] hover:to-[#F5A83D] text-white py-4 rounded-2xl elevation-2 hover:elevation-hover-2 transition-all duration-300 hover:scale-[1.02] btn-md"
              aria-label={`Connect with ${guide.name}`}
              style={{ fontWeight: 600 }}
            >
              <span className="text-lg mr-2" aria-hidden="true">
                {faithConfig.emoji}
              </span>
              Connect with {guide.name}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});