/**
 * Radial Settings Wheel Component
 * Circular settings menu activated by long-press
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAtmosphere } from './atmosphere-context';
import { 
  Volume2, 
  Wind, 
  Palette, 
  Clock, 
  BookOpen, 
  Sparkles,
  X
} from 'lucide-react';

interface RadialSettingsWheelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSoundscape: () => void;
  onSelectBreathing: () => void;
  onSelectTheme: () => void;
  onSelectDuration: () => void;
  onSelectMode: () => void;
  onSelectFaith: () => void;
}

const settingsOptions = [
  { id: 'soundscape', label: 'Soundscape', icon: Volume2, color: '#4FC3F7', angle: 0 },
  { id: 'breathing', label: 'Breathing', icon: Wind, color: '#81D4FA', angle: 60 },
  { id: 'theme', label: 'Atmosphere', icon: Palette, color: '#7A4FFF', angle: 120 },
  { id: 'duration', label: 'Duration', icon: Clock, color: '#FFD369', angle: 180 },
  { id: 'mode', label: 'Guidance', icon: BookOpen, color: '#05DF72', angle: 240 },
  { id: 'faith', label: 'Sacred', icon: Sparkles, color: '#E1BEE7', angle: 300 },
];

export function RadialSettingsWheel({ 
  isOpen, 
  onClose,
  onSelectSoundscape,
  onSelectBreathing,
  onSelectTheme,
  onSelectDuration,
  onSelectMode,
  onSelectFaith
}: RadialSettingsWheelProps) {
  const handleOptionClick = (id: string) => {
    switch (id) {
      case 'soundscape':
        onSelectSoundscape();
        break;
      case 'breathing':
        onSelectBreathing();
        break;
      case 'theme':
        onSelectTheme();
        break;
      case 'duration':
        onSelectDuration();
        break;
      case 'mode':
        onSelectMode();
        break;
      case 'faith':
        onSelectFaith();
        break;
    }
    onClose();
  };

  const radius = 120; // Distance from center

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Center Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#7A4FFF] to-[#9C27B0] flex items-center justify-center shadow-2xl border-2 border-white/20"
            >
              <button
                onClick={onClose}
                className="w-full h-full flex items-center justify-center"
                aria-label="Close settings"
              >
                <X size={24} className="text-white" />
              </button>
            </motion.div>

            {/* Radial Options */}
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              const angleInRadians = (option.angle * Math.PI) / 180;
              const x = Math.cos(angleInRadians) * radius;
              const y = Math.sin(angleInRadians) * radius;

              return (
                <motion.button
                  key={option.id}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x, y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 25,
                    delay: index * 0.05
                  }}
                  onClick={() => handleOptionClick(option.id)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                  style={{
                    boxShadow: `0 0 20px ${option.color}50`,
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <Icon size={20} style={{ color: option.color }} />
                    <span 
                      className="text-[10px] text-white/70 mt-1"
                      style={{ fontFamily: 'Poppins', fontWeight: 300 }}
                    >
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            {/* Connection Lines */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width={radius * 2.5} height={radius * 2.5}>
              {settingsOptions.map((option, index) => {
                const angleInRadians = (option.angle * Math.PI) / 180;
                const x = Math.cos(angleInRadians) * radius + radius * 1.25;
                const y = Math.sin(angleInRadians) * radius + radius * 1.25;
                
                return (
                  <motion.line
                    key={`line-${option.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    x1={radius * 1.25}
                    y1={radius * 1.25}
                    x2={x}
                    y2={y}
                    stroke={option.color}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
