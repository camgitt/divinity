import { useState, useCallback } from "react";
import { PanInfo } from "motion/react";

interface UseGuideSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface UseGuideSwipeReturn {
  dragX: number;
  isDragging: boolean;
  handleDragStart: () => void;
  handleDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export function useGuideSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 100
}: UseGuideSwipeProps): UseGuideSwipeReturn {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragX(info.offset.x);
  }, []);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = threshold;
    
    if (info.offset.x > swipeThreshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -swipeThreshold && onSwipeLeft) {
      onSwipeLeft();
    }
    
    setDragX(0);
    setIsDragging(false);
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return {
    dragX,
    isDragging,
    handleDragStart,
    handleDrag,
    handleDragEnd
  };
}
