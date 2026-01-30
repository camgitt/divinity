/**
 * Emotional Check-In Component
 * Pre-session mood selector that adapts the Quiet Space experience
 */

import React from 'react';
import { motion } from 'motion/react';
import { useAtmosphere, type EmotionalState } from './atmosphere-context';
import { Smile, Flame, CloudRain, Wind, Heart, Sparkles } from 'lucide-react';

interface EmotionalCheckInProps {
  onComplete: () => void;
  onSkip: () => void;
}

const emotions: Array<{
  state: EmotionalState;
  label: string;
  icon: typeof Smile;
  color: string;
  bgColor: string;
}> = [
  {
    state: 'calm',
    label: 'Peaceful',
    icon: Smile,
    color: '#05DF72',
    bgColor: 'from-green-500/20 to-green-600/10'
  },
  {
    state: 'stress',
    label: 'Stressed',
    icon: Flame,
    color: '#FF8904',
    bgColor: 'from-orange-500/20 to-orange-600/10'
  },
  {
    state: 'sadness',
    label: 'Sad',
    icon: CloudRain,
    color: '#4FC3F7',
    bgColor: 'from-blue-500/20 to-blue-600/10'
  },
  {
    state: 'anxiety',
    label: 'Anxious',
    icon: Wind,
    color: '#9C27B0',
    bgColor: 'from-purple-500/20 to-purple-600/10'
  },
  {
    state: 'joy',
    label: 'Joyful',
    icon: Heart,
    color: '#FFD369',
    bgColor: 'from-yellow-500/20 to-yellow-600/10'
  },
  {
    state: 'neutral',
    label: 'Neutral',
    icon: Sparkles,
    color: '#B8B8D1',
    bgColor: 'from-slate-500/20 to-slate-600/10'
  }
];

export function EmotionalCheckIn({ onComplete, onSkip }: EmotionalCheckInProps) {
  const { setEmotionalState } = useAtmosphere();

  const handleSelect = (state: EmotionalState) => {
    setEmotionalState(state);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
    >
      <div className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 
            className="text-white/90 mb-2"
            style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '24px' }}
          >
            How are you feeling?
          </h3>
          <p 
            className="text-white/60"
            style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
          >
            Your Quiet Space will adapt to support you
          </p>
        </div>

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <motion.button
                key={emotion.state}
                onClick={() => handleSelect(emotion.state)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-4 rounded-2xl bg-gradient-to-br ${emotion.bgColor} border border-white/10 transition-all hover:border-white/30`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon size={32} style={{ color: emotion.color }} />
                  <span 
                    className="text-white/80"
                    style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px' }}
                  >
                    {emotion.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="w-full text-white/50 hover:text-white/70 transition-colors py-2"
          style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
        >
          Skip for now
        </button>
      </div>
    </motion.div>
  );
}
