/**
 * Session Complete Modal
 * Shown after completing a quiet space session
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { getSessionStats } from './quiet-space-session-tracker';

interface SessionCompleteModalProps {
  onClose: () => void;
}

export function SessionCompleteModal({
  onClose
}: SessionCompleteModalProps) {
  // Get current session stats
  const stats = getSessionStats();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1a3a] to-[#0f0f23] rounded-3xl p-8 max-w-md w-full border border-white/10"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#05DF72] to-[#04b35e] flex items-center justify-center">
            <CheckCircle2 size={40} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-white text-center mb-2"
          style={{ fontFamily: 'Raleway', fontWeight: 500, fontSize: '28px' }}
        >
          Session Complete
        </h3>
        
        <p 
          className="text-white/60 text-center mb-8"
          style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
        >
          Well done. You honored your practice.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Total Sessions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Sparkles size={20} className="text-[#FFD369] mb-2" />
            <div className="text-white text-2xl mb-1" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
              {stats.totalSessions}
            </div>
            <div className="text-white/50 text-xs" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
              Total Sessions
            </div>
          </div>

          {/* Total Time */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Clock size={20} className="text-[#497EBC] mb-2" />
            <div className="text-white text-2xl mb-1" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
              {stats.totalTimeMinutes}m
            </div>
            <div className="text-white/50 text-xs" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
              Total Time
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Flame size={20} className="text-[#FF6B35] mb-2" />
            <div className="text-white text-2xl mb-1" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
              {stats.currentStreak}
            </div>
            <div className="text-white/50 text-xs" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
              Day Streak
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <TrendingUp size={20} className="text-[#05DF72] mb-2" />
            <div className="text-white text-2xl mb-1" style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
              {stats.sessionsThisWeek}
            </div>
            <div className="text-white/50 text-xs" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
              This Week
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#497EBC] to-[#1E3A5F] text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          style={{ fontFamily: 'Poppins', fontWeight: 500 }}
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}