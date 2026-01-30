import React from 'react';
import { motion } from 'motion/react';
import { CloudRain, Waves, Bird, Wind, BellIcon, Music } from 'lucide-react';
import { useAmbientSound, AmbientSound } from '../contexts/ambient-sound-context';
import { useHapticFeedback } from './hooks/use-haptic';
import { toast } from 'sonner@2.0.3';
import { RingWaveform } from './ambient-waveform-visualizer';

// ==================== SOUND DEFINITIONS ====================

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: CloudRain,
    color: '#60A5FA', // blue-400
    bgGradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #0F172A 100%)', // Deep blue
    url: '',
    image: 'https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwbmF0dXJlfGVufDF8fHx8MTc2MzI2NTc4OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: Waves,
    color: '#22D3EE', // cyan-400
    bgGradient: 'linear-gradient(135deg, #164E63 0%, #0E7490 50%, #0F172A 100%)', // Deep cyan
    url: '',
    image: 'https://images.unsplash.com/photo-1514747975201-4715db583da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc2MzI1MDg0MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: Bird,
    color: '#34D399', // emerald-400
    bgGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #0F172A 100%)', // Deep emerald
    url: '',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzYzMjI1MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: Wind,
    color: '#94A3B8', // slate-400
    bgGradient: 'linear-gradient(135deg, #334155 0%, #475569 50%, #0F172A 100%)', // Deep slate
    url: '',
    image: 'https://images.unsplash.com/photo-1656533211917-2756e9d4790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwY2xvdWRzJTIwc2t5fGVufDF8fHx8MTc2MzMxMjA3OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bells',
    name: 'Singing Bowls',
    icon: BellIcon,
    color: '#FBBF24', // yellow-400
    bgGradient: 'linear-gradient(135deg, #78350F 0%, #92400E 50%, #0F172A 100%)', // Deep amber
    url: '',
    image: 'https://images.unsplash.com/photo-1621789938983-a9543075f0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5naW5nJTIwYm93bHMlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc2MzMxMjA3OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'music',
    name: 'Synth Pad',
    icon: Music,
    color: '#A78BFA', // purple-400
    bgGradient: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 50%, #0F172A 100%)', // Deep purple
    url: '',
    image: 'https://images.unsplash.com/photo-1579792685643-a4bb28186899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGNvc21vc3xlbnwxfHx8fDE3NjMzMTIwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

// ==================== GLASS CARD GRID COMPONENT ====================

interface AmbientSoundGridProps {
  className?: string;
}

export function AmbientSoundGrid({ className = '' }: AmbientSoundGridProps) {
  const { selectedSound, isPlaying, analyserNode, selectSound, setViewMode } = useAmbientSound();
  const haptic = useHapticFeedback();

  const handleSoundClick = (sound: AmbientSound) => {
    haptic?.lightTap();
    
    if (selectedSound?.id === sound.id) {
      // Deselect
      selectSound(null);
      toast.success('Sound stopped');
    } else {
      // Select new sound
      selectSound(sound);
      toast.success(`Playing: ${sound.name}`);
      
      // Switch to mini-player mode after selection
      setTimeout(() => {
        setViewMode('mini-player');
      }, 300);
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
        {AMBIENT_SOUNDS.map((sound, index) => {
          const SoundIcon = sound.icon;
          const isActive = selectedSound?.id === sound.id && isPlaying;
          
          return (
            <motion.button
              key={sound.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleSoundClick(sound)}
              className="relative group"
            >
              {/* Glass Card Container */}
              <div
                className={`
                  relative h-40 rounded-2xl overflow-hidden
                  backdrop-blur-xl border-2 transition-all duration-500
                  ${isActive 
                    ? 'border-white/40 shadow-2xl' 
                    : 'border-white/10 hover:border-white/20 shadow-lg'
                  }
                `}
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`
                    : `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                  boxShadow: isActive
                    ? `0 8px 32px ${sound.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${sound.image})` }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(to top, rgba(15,23,42,0.95) 0%, ${sound.color}60 50%, rgba(15,23,42,0.3) 100%)`
                    }}
                  />
                </div>

                {/* Animated Border Glow (Active State) */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, ${sound.color}00, ${sound.color}80, ${sound.color}00)`,
                      backgroundSize: '200% 100%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                )}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                  {/* Icon with Waveform */}
                  <div className="relative">
                    {/* Waveform Ring */}
                    {isActive && (
                      <div className="absolute inset-0 -m-2">
                        <RingWaveform
                          analyserNode={analyserNode}
                          isPlaying={isActive}
                          size={80}
                          color={sound.color}
                        />
                      </div>
                    )}
                    
                    {/* Icon */}
                    <div 
                      className={`
                        relative w-12 h-12 rounded-xl flex items-center justify-center
                        transition-all duration-300
                        ${isActive ? 'scale-110' : 'scale-100'}
                      `}
                      style={{
                        background: isActive
                          ? `radial-gradient(circle, ${sound.color}40, transparent)`
                          : 'rgba(255,255,255,0.1)',
                        boxShadow: isActive 
                          ? `0 0 20px ${sound.color}80, 0 0 40px ${sound.color}40`
                          : 'none'
                      }}
                    >
                      <SoundIcon 
                        className="w-6 h-6 transition-all duration-300"
                        style={{ 
                          color: isActive ? sound.color : '#fff',
                          filter: isActive ? `drop-shadow(0 0 8px ${sound.color})` : 'none',
                          strokeWidth: 1.5
                        }}
                      />
                    </div>
                  </div>

                  {/* Sound Name */}
                  <div className="text-center">
                    <p 
                      className={`
                        text-sm tracking-wide transition-all duration-300
                        ${isActive ? 'text-white font-semibold' : 'text-white/90 font-medium'}
                      `}
                      style={{ 
                        fontFamily: "'Raleway', sans-serif",
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {sound.name}
                    </p>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 flex items-center justify-center gap-1"
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: sound.color }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span 
                          className="text-xs tracking-wider uppercase"
                          style={{ 
                            color: sound.color,
                            fontFamily: "'Raleway', sans-serif",
                            fontWeight: 600
                          }}
                        >
                          Playing
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Glass Shine Effect */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
                    opacity: isActive ? 0.3 : 0.15
                  }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}