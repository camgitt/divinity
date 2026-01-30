import React from 'react';
import { Button, ButtonProps } from './button';
import { useSound } from '../sound-context';
import { useHapticFeedback } from '../hooks/use-haptic';

export interface ButtonWithSoundProps extends ButtonProps {
  soundType?: 'click' | 'success' | 'error' | 'soft';
  soundEnabled?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'error';
  hapticEnabled?: boolean;
}

export const ButtonWithSound = React.forwardRef<HTMLButtonElement, ButtonWithSoundProps>(
  ({ onClick, soundType = 'click', soundEnabled = true, hapticType = 'medium', hapticEnabled = true, ...props }, ref) => {
    const { playSound } = useSound();
    const haptic = useHapticFeedback();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEnabled) {
        playSound(soundType);
      }
      if (hapticEnabled) {
        haptic.vibrate(hapticType);
      }
      onClick?.(e);
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);

ButtonWithSound.displayName = 'ButtonWithSound';
