/**
 * Ducking Test Panel
 * 
 * A demonstration component showing how audio ducking works.
 * Use this to test and verify the ducking implementation.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { useAmbientSound } from '../contexts/ambient-sound-context';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Info,
  Mic,
  Music
} from 'lucide-react';

export function DuckingTestPanel() {
  const { 
    selectedSound,
    isPlaying,
    ambientVolume,
    setAmbientVolume,
    togglePlayPause,
    setDucking 
  } = useAmbientSound();
  
  const [isDucking, setIsDucking] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  
  // Toggle ducking state
  const handleDuckToggle = () => {
    const newState = !isDucking;
    setIsDucking(newState);
    setDucking(newState);
  };
  
  // Calculate actual output volume
  const actualVolume = isDucking ? ambientVolume * 0.3 : ambientVolume;
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[32px] mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#3D3D6B' }}>
          Audio Ducking Test Panel
        </h2>
        <p className="text-[14px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400, color: '#6B7280' }}>
          Test how ambient sounds automatically reduce when voice narration plays
        </p>
      </div>
      
      {/* Info Banner */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 border border-purple-200 rounded-xl p-4 relative"
        >
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-2 right-2 text-purple-400 hover:text-purple-600"
          >
            ×
          </button>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, color: '#7A4FFF' }}>
                <strong>How it works:</strong> When you enable "Voice Narration", ambient sounds smoothly reduce to 30% volume over 1.5 seconds, 
                ensuring voice clarity while maintaining atmospheric presence.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main Control Card */}
      <Card className="p-6 bg-white border-2 border-[#E5E7EB] shadow-lg">
        <div className="space-y-6">
          {/* Ambient Sound Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#7A4FFF]" />
                <span className="text-[16px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#3D3D6B' }}>
                  Ambient Sound
                </span>
              </div>
              {selectedSound ? (
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  {selectedSound.name} {isPlaying ? 'Playing' : 'Paused'}
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-600 border-gray-300">
                  No sound selected
                </Badge>
              )}
            </div>
            
            {!selectedSound && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", color: '#92400E' }}>
                <strong>Note:</strong> Please select an ambient sound from the Quiet Space to test ducking.
              </div>
            )}
          </div>
          
          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, color: '#3D3D6B' }}>
                Ambient Volume
              </span>
              <span className="text-[14px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, color: '#7A4FFF' }}>
                {ambientVolume}%
              </span>
            </div>
            <Slider
              value={[ambientVolume]}
              onValueChange={(values) => setAmbientVolume(values[0])}
              max={100}
              step={1}
              className="w-full"
              disabled={!selectedSound}
            />
          </div>
          
          {/* Ducking Control */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#7A4FFF]" />
                <span className="text-[16px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#3D3D6B' }}>
                  Voice Narration
                </span>
              </div>
              {isDucking && (
                <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                  Ducking Active
                </Badge>
              )}
            </div>
            
            <Button
              onClick={handleDuckToggle}
              disabled={!selectedSound || !isPlaying}
              className={`w-full h-14 ${
                isDucking 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                  : 'bg-gradient-to-r from-[#7A4FFF] to-[#9F7FFF] hover:from-[#6A3FEF] hover:to-[#8F6FEF]'
              } text-white transition-all`}
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
            >
              {isDucking ? (
                <>
                  <VolumeX className="w-5 h-5 mr-2" />
                  Stop Voice Narration
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Simulate Voice Narration
                </>
              )}
            </Button>
            
            {(!selectedSound || !isPlaying) && (
              <p className="text-[12px] text-center mt-2" style={{ fontFamily: "'Raleway', sans-serif", color: '#9CA3AF' }}>
                Select and play an ambient sound first
              </p>
            )}
          </div>
        </div>
      </Card>
      
      {/* Volume Visualization */}
      {selectedSound && isPlaying && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
          <h3 className="text-[18px] mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#3D3D6B' }}>
            Volume Output Visualization
          </h3>
          
          <div className="space-y-4">
            {/* User Set Volume */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, color: '#6B7280' }}>
                  User Volume Setting
                </span>
                <span className="text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700, color: '#7A4FFF' }}>
                  {ambientVolume}%
                </span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-purple-200">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                  style={{ width: `${ambientVolume}%` }}
                />
              </div>
            </div>
            
            {/* Actual Output Volume */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, color: '#6B7280' }}>
                  Actual Output Volume {isDucking && '(30% of user setting)'}
                </span>
                <span className="text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700, color: isDucking ? '#EF4444' : '#10B981' }}>
                  {actualVolume.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-purple-200">
                <div 
                  className={`h-full transition-all duration-[1500ms] ease-out ${
                    isDucking 
                      ? 'bg-gradient-to-r from-red-400 to-red-600' 
                      : 'bg-gradient-to-r from-green-400 to-green-600'
                  }`}
                  style={{ width: `${actualVolume}%` }}
                />
              </div>
            </div>
            
            {/* Calculation Formula */}
            <div className="bg-white/50 rounded-lg p-3 border border-purple-200">
              <p className="text-[12px] text-center" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, color: '#6B7280' }}>
                {isDucking ? (
                  <>
                    <span className="font-mono text-purple-700">
                      {actualVolume.toFixed(1)}% = {ambientVolume}% × 0.3
                    </span>
                    <br />
                    <span className="text-[11px]">Voice narration active - ambient sound ducked to 30%</span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-green-700">
                      {actualVolume.toFixed(1)}% = {ambientVolume}% × 1.0
                    </span>
                    <br />
                    <span className="text-[11px]">Normal playback - no ducking applied</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Technical Info */}
      <Card className="p-6 bg-white border border-gray-200">
        <h3 className="text-[16px] mb-3 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#3D3D6B' }}>
          <Info className="w-4 h-4 text-[#7A4FFF]" />
          Technical Details
        </h3>
        <ul className="space-y-2 text-[13px]" style={{ fontFamily: "'Raleway', sans-serif", color: '#6B7280' }}>
          <li className="flex items-start gap-2">
            <span className="text-[#7A4FFF] flex-shrink-0">•</span>
            <span><strong>Transition:</strong> 1.5 second exponential ramp using Web Audio API</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A4FFF] flex-shrink-0">•</span>
            <span><strong>Duck Ratio:</strong> 30% (0.3x) of original volume for voice clarity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A4FFF] flex-shrink-0">•</span>
            <span><strong>Implementation:</strong> exponentialRampToValueAtTime() with setTargetAtTime() fallback</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7A4FFF] flex-shrink-0">•</span>
            <span><strong>User Control:</strong> Volume slider changes respected during ducking</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
