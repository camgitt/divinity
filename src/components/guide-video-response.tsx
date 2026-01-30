/**
 * Guide Video Response Component
 * 
 * This component demonstrates how to use D-ID API to create talking avatar videos
 * for guide responses in the chat interface.
 * 
 * Features:
 * - Generates talking avatar videos from guide images
 * - Displays loading state during video generation
 * - Plays video automatically when ready
 * - Falls back to text if video fails
 * - Supports multiple languages based on faith
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Volume2, VolumeX, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { generateTalkingAvatarVideo, selectVoiceForGuide } from './services/did-api-service';

interface GuideVideoResponseProps {
  guideImageUrl: string;
  message: string;
  guideFaith: string;
  guideGender?: 'male' | 'female';
  onVideoReady?: (videoUrl: string) => void;
  onError?: (error: Error) => void;
  autoPlay?: boolean;
  showControls?: boolean;
}

export function GuideVideoResponse({
  guideImageUrl,
  message,
  guideFaith,
  guideGender = 'female',
  onVideoReady,
  onError,
  autoPlay = true,
  showControls = true,
}: GuideVideoResponseProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    generateVideo();
  }, [guideImageUrl, message]);

  const generateVideo = async () => {
    if (!guideImageUrl || !message) {
      setError('Missing image or message');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Select appropriate voice based on guide's faith
      const voiceId = selectVoiceForGuide(guideFaith, guideGender);
      
      console.log(`Generating video for ${guideFaith} guide with voice ${voiceId}...`);

      // Generate talking avatar video using D-ID API
      const url = await generateTalkingAvatarVideo(
        guideImageUrl,
        message,
        voiceId
      );

      setVideoUrl(url);
      
      if (onVideoReady) {
        onVideoReady(url);
      }

      toast.success('Your guide\'s message is ready');
    } catch (err) {
      const error = err as Error;
      console.error('Failed to generate guide video:', error);
      setError(error.message);
      
      if (onError) {
        onError(error);
      }

      toast.error('Failed to generate video response. Showing text instead.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    const video = document.getElementById('guide-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg text-white/90">
                Your guide is preparing their message...
              </h3>
              <p className="text-sm text-white/60">
                Generating personalized video response
              </p>
            </div>

            {/* Cosmic loading animation */}
            <div className="flex space-x-2">
              <motion.div
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="p-4 bg-red-900/20 border-red-500/30">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <p className="text-sm text-white/80">{message}</p>
              <p className="text-xs text-red-400 mt-2">
                Video generation unavailable - showing text message
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={generateVideo}
              className="text-purple-400 hover:text-purple-300"
            >
              Retry
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!videoUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <video
            id="guide-video"
            src={videoUrl}
            autoPlay={autoPlay}
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Video Controls Overlay */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/10"
                >
                  {isPlaying ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-4 bg-white" />
                      <div className="w-1 h-4 bg-white" />
                    </div>
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                {/* Mute/Unmute */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/10"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Message Text (for accessibility and context) */}
        <div className="p-4 bg-black/20">
          <p className="text-sm text-white/80 italic">
            "{message}"
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Simple Video Message Component
 * For displaying pre-generated guide video messages
 */
interface SimpleVideoMessageProps {
  videoUrl: string;
  message: string;
  autoPlay?: boolean;
}

export function SimpleVideoMessage({ 
  videoUrl, 
  message, 
  autoPlay = true 
}: SimpleVideoMessageProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
    >
      <video
        src={videoUrl}
        autoPlay={autoPlay}
        loop
        muted={isMuted}
        playsInline
        className="w-full aspect-video object-cover"
      />
      
      <div className="p-3 bg-black/20 flex items-center justify-between">
        <p className="text-sm text-white/70 italic flex-1">
          {message}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="text-white/70 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>
    </motion.div>
  );
}

/**
 * Example Usage in Chat Component:
 * 
 * ```tsx
 * import { GuideVideoResponse } from './guide-video-response';
 * 
 * // In your chat component
 * <GuideVideoResponse
 *   guideImageUrl={guide.generatedImageUrl}
 *   message="Peace be with you. Take a moment to breathe and center yourself."
 *   guideFaith={guide.faith}
 *   guideGender="female"
 *   onVideoReady={(url) => console.log('Video ready:', url)}
 *   onError={(error) => console.error('Video error:', error)}
 * />
 * ```
 */
