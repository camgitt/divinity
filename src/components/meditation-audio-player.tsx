import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAmbientSound, AmbientSound } from "../contexts/ambient-sound-context";

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface MeditationAudioPlayerProps {
  tracks: AudioTrack[];
  selectedTrackId: string | null;
  onTrackSelect: (trackId: string | null) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export function MeditationAudioPlayer({
  tracks,
  selectedTrackId,
  onTrackSelect,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle
}: MeditationAudioPlayerProps) {
  // Use global ambient sound context instead of local state
  const { 
    selectSound, 
    togglePlayPause,
    isPlaying: contextIsPlaying,
    selectedSound: contextSelectedSound
  } = useAmbientSound();

  const [isLoading, setIsLoading] = useState(false);

  // Get currently selected track
  const selectedTrack = tracks.find(t => t.id === selectedTrackId);

  // Sync track selection with global context
  useEffect(() => {
    if (selectedTrackId && selectedTrack) {
      // Map local track to AmbientSound format for context
      const ambientSound: AmbientSound = {
        id: selectedTrack.id,
        name: selectedTrack.name,
        icon: selectedTrack.icon,
        color: selectedTrack.color,
        bgGradient: `linear-gradient(135deg, ${selectedTrack.color}20, transparent)`,
        url: selectedTrack.url,
        image: ''
      };
      
      // Select sound in global context (this will auto-play)
      selectSound(ambientSound);
      setIsLoading(false);
    } else {
      // Deselect sound
      selectSound(null);
      setIsLoading(false);
    }
    // Note: selectSound is intentionally excluded from deps array
    // It's memoized in AmbientSoundContext and won't cause re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrackId, selectedTrack]);

  // Check if currently playing
  const isPlaying = contextIsPlaying && contextSelectedSound?.id === selectedTrackId;

  // Play/Pause toggle
  const handleTogglePlayPause = () => {
    if (!selectedTrackId) return;
    togglePlayPause();
  };

  if (!selectedTrack) return null;

  const TrackIcon = selectedTrack.icon;

  // Color mapping for track icons - maps text color to background color
  const getBackgroundColor = (textColor: string): string => {
    const colorMap: Record<string, string> = {
      'text-blue-400': 'bg-blue-500/20',
      'text-cyan-400': 'bg-cyan-500/20',
      'text-green-400': 'bg-green-500/20',
      'text-slate-400': 'bg-slate-500/20',
      'text-yellow-400': 'bg-yellow-500/20',
      'text-purple-400': 'bg-purple-500/20'
    };
    return colorMap[textColor] || 'bg-blue-500/20';
  };

  return (
    <Card className="bg-gradient-to-br from-[#162844]/80 to-[#0B1426]/80 border-[#7A4FFF]/30 backdrop-blur-sm overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7A4FFF]/5 via-transparent to-[#FFD369]/5 animate-pulse" />
      
      <div className="relative p-6">
        {/* Header with Track Info */}
        <div className="flex items-center gap-4 mb-6">
          {/* Animated Track Icon */}
          <div className="relative">
            <div className={`w-16 h-16 rounded-2xl ${getBackgroundColor(selectedTrack.color)} flex items-center justify-center relative overflow-hidden`}>
              {/* Ripple effect when playing */}
              {isPlaying && (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }} />
                </>
              )}
              <TrackIcon className={`w-8 h-8 ${selectedTrack.color} relative z-10 drop-shadow-lg`} />
            </div>
            {/* Status indicator */}
            {isPlaying && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#162844] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </div>

          {/* Track Details */}
          <div className="flex-1">
            <h3 className="text-xl text-white mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {selectedTrack.name}
            </h3>
            <div className="flex items-center gap-2">
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <div className="w-3 h-3 border-2 border-[#7A4FFF] border-t-transparent rounded-full animate-spin" />
                  <span>Loading audio...</span>
                </div>
              )}
              {!isLoading && !isPlaying && (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span>Ready to play</span>
                </div>
              )}
              {!isLoading && isPlaying && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-pulse">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span>Now Playing</span>
                </div>
              )}
            </div>
          </div>

          {/* Play/Pause Button - Large & Prominent */}
          <Button
            onClick={handleTogglePlayPause}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-[#7A4FFF] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white w-14 h-14 rounded-full p-0 shadow-lg shadow-[#7A4FFF]/30 hover:shadow-xl hover:shadow-[#7A4FFF]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Volume Control Section */}
        <div className="bg-[#0B1426]/40 rounded-xl p-4 border border-[#1E3A5F]/30">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4 text-[#7A4FFF]" />
            <span className="text-sm text-slate-300">Volume</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mute Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMuteToggle}
              className={`p-0 h-9 w-9 rounded-lg transition-all duration-300 ${
                isMuted 
                  ? 'text-red-400 bg-red-500/10 hover:bg-red-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            
            {/* Volume Slider */}
            <div className="flex-1 relative">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => onVolumeChange(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
            
            {/* Volume Percentage */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white min-w-[3rem] text-right bg-[#7A4FFF]/20 px-3 py-1.5 rounded-lg border border-[#7A4FFF]/30">
                {isMuted ? 0 : volume}%
              </span>
            </div>
          </div>
        </div>

        {/* Stop Button - Bottom */}
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleTogglePlayPause}
            variant="ghost"
            size="sm"
            className={isPlaying 
              ? "text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
              : "text-green-400 hover:text-green-300 hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            }
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-4 h-4 mr-1" />
                Stop Sound
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Play Sound
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Ambient Sound URLs - Kept for backward compatibility
// All sounds are now generated synthetically via the global AmbientSoundContext
export const AMBIENT_SOUND_URLS = {
  rain: '',
  ocean: '',
  forest: '',
  wind: '',
  bells: '',
  music: ''
};