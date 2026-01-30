import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Pause, Volume2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

// Simple audio test component to debug playback issues
export function AudioTestDebug() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStatus, setAudioStatus] = useState("Not loaded");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Test URLs - trying multiple sources
  const testUrls = [
    {
      name: "Pixabay Rain (Direct)",
      url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4037f48241.mp3"
    },
    {
      name: "Pixabay Ocean (Direct)",
      url: "https://cdn.pixabay.com/audio/2022/03/24/audio_c3a7274058.mp3"
    },
    {
      name: "Sample MP3 (HTTP Archive)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
  ];

  const [selectedUrl, setSelectedUrl] = useState(testUrls[0]);

  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      
      // Add event listeners for debugging
      audioRef.current.addEventListener('loadstart', () => {
        setAudioStatus('Loading...');
        console.log('Audio: loadstart');
      });
      
      audioRef.current.addEventListener('canplay', () => {
        setAudioStatus('Can play');
        console.log('Audio: canplay');
      });
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setAudioStatus('Ready');
        console.log('Audio: canplaythrough');
      });
      
      audioRef.current.addEventListener('playing', () => {
        setAudioStatus('Playing');
        console.log('Audio: playing');
      });
      
      audioRef.current.addEventListener('pause', () => {
        setAudioStatus('Paused');
        console.log('Audio: paused');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        const error = audioRef.current?.error;
        let errorMsg = 'Unknown error';
        if (error) {
          switch (error.code) {
            case 1:
              errorMsg = 'MEDIA_ERR_ABORTED - Fetching process aborted';
              break;
            case 2:
              errorMsg = 'MEDIA_ERR_NETWORK - Network error';
              break;
            case 3:
              errorMsg = 'MEDIA_ERR_DECODE - Decoding error';
              break;
            case 4:
              errorMsg = 'MEDIA_ERR_SRC_NOT_SUPPORTED - Audio format not supported';
              break;
          }
        }
        setAudioStatus(`Error: ${errorMsg}`);
        console.error('Audio error:', errorMsg, e);
        toast.error(errorMsg);
      });
    }
  };

  const testAudio = async (url: string, name: string) => {
    try {
      initAudio();
      
      if (!audioRef.current) {
        toast.error('Failed to initialize audio');
        return;
      }

      // Stop any current playback
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);

      // Set new source
      setAudioStatus(`Loading ${name}...`);
      audioRef.current.src = url;
      audioRef.current.load();

      // Wait a bit for the audio to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Try to play
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioStatus('Playing successfully!');
            toast.success(`Playing: ${name}`);
          })
          .catch(error => {
            setIsPlaying(false);
            setAudioStatus(`Play failed: ${error.message}`);
            console.error('Play error:', error);
            toast.error(`Failed to play: ${error.message}`);
          });
      }
    } catch (error: any) {
      setAudioStatus(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Play error:', error);
          toast.error(`Play failed: ${error.message}`);
        });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setAudioStatus('Stopped');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] text-white p-8">
      <Card className="max-w-2xl mx-auto bg-[#162844]/60 border-[#1E3A5F]/60 p-6">
        <h1 className="text-2xl mb-4 text-center">🔊 Audio Playback Debug Tool</h1>
        
        {/* Status */}
        <div className="mb-6 p-4 bg-purple-900/20 rounded-lg">
          <div className="text-sm text-slate-400 mb-1">Status:</div>
          <div className="text-lg font-mono text-white">{audioStatus}</div>
        </div>

        {/* Test URLs */}
        <div className="mb-6">
          <div className="text-sm text-slate-400 mb-2">Test Audio Sources:</div>
          <div className="space-y-2">
            {testUrls.map((urlInfo) => (
              <Button
                key={urlInfo.url}
                onClick={() => {
                  setSelectedUrl(urlInfo);
                  testAudio(urlInfo.url, urlInfo.name);
                }}
                className={`w-full justify-start ${
                  selectedUrl.url === urlInfo.url
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-[#1E3A5F] hover:bg-[#2A4A6F]'
                }`}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {urlInfo.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Current URL */}
        <div className="mb-6 p-3 bg-slate-900/50 rounded text-xs break-all">
          <div className="text-slate-400 mb-1">Current URL:</div>
          <div className="text-slate-300 font-mono">{selectedUrl.url}</div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            onClick={togglePlay}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={stopAudio}
            variant="outline"
            className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Stop
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg text-sm">
          <div className="font-medium mb-2">📋 Debug Instructions:</div>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>Click a test source to load audio</li>
            <li>Watch the status updates above</li>
            <li>Check browser console for detailed logs</li>
            <li>Try all three sources to find working ones</li>
            <li>If none work, check browser autoplay settings</li>
          </ul>
        </div>

        {/* Browser Info */}
        <div className="mt-4 p-3 bg-slate-900/50 rounded text-xs">
          <div className="text-slate-400 mb-1">Browser Info:</div>
          <div className="text-slate-300">
            User Agent: {navigator.userAgent.substring(0, 100)}...
          </div>
        </div>
      </Card>
    </div>
  );
}
