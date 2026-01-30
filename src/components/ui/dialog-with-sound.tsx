import React, { useEffect } from "react";
import { Dialog, DialogProps } from "./dialog";
import { useSound } from "../sound-context";
import { useHapticFeedback } from "../hooks/use-haptic";

export interface DialogWithSoundProps extends DialogProps {
  soundEnabled?: boolean;
  hapticEnabled?: boolean;
}

export function DialogWithSound({ open, onOpenChange, soundEnabled = true, hapticEnabled = true, children, ...props }: DialogWithSoundProps) {
  const { playSound } = useSound();
  const haptic = useHapticFeedback();
  const [prevOpen, setPrevOpen] = React.useState(open);

  useEffect(() => {
    if (open !== prevOpen) {
      if (soundEnabled) {
        playSound(open ? 'modal-open' : 'modal-close', 0.25);
      }
      if (hapticEnabled) {
        haptic.vibrate(open ? 'medium' : 'light');
      }
      setPrevOpen(open);
    }
  }, [open, prevOpen, soundEnabled, hapticEnabled, playSound, haptic]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog>
  );
}
