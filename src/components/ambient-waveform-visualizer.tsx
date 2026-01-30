import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
  size?: number;
  color?: string;
  lineWidth?: number;
  className?: string;
}

export function WaveformVisualizer({
  analyserNode,
  isPlaying,
  size = 48,
  color = '#7A4FFF',
  lineWidth = 2,
  className = ''
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!analyserNode || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyserNode.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw circular waveform
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - lineWidth * 2;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      // Create circular waveform using frequency data
      const sliceCount = 64; // Number of points around circle
      for (let i = 0; i < sliceCount; i++) {
        const angle = (i / sliceCount) * Math.PI * 2 - Math.PI / 2;
        
        // Sample frequency data
        const dataIndex = Math.floor((i / sliceCount) * bufferLength);
        const amplitude = dataArray[dataIndex] / 255;
        
        // Add variation to make it more dynamic
        const r = radius + amplitude * 8;
        
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.stroke();

      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode, isPlaying, size, color, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
    />
  );
}

interface RingWaveformProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
  size?: number;
  color?: string;
  className?: string;
}

export function RingWaveform({
  analyserNode,
  isPlaying,
  size = 64,
  color = '#7A4FFF',
  className = ''
}: RingWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!analyserNode || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Draw static ring when not playing
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 4;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color + '40'; // 25% opacity
      ctx.lineWidth = 2;
      ctx.stroke();
      
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyserNode.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const baseRadius = size / 2 - 6;

      // Draw multiple concentric rings with varying thickness based on frequency
      const rings = 3;
      for (let ring = 0; ring < rings; ring++) {
        ctx.beginPath();
        
        const ringRadius = baseRadius - ring * 3;
        const points = 72;
        
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
          
          // Sample different frequency ranges for each ring
          const dataIndex = Math.floor(((i / points) + ring * 0.2) * bufferLength) % bufferLength;
          const amplitude = dataArray[dataIndex] / 255;
          
          // Modulate radius based on amplitude
          const r = ringRadius + amplitude * (6 - ring * 2);
          
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        
        // Vary opacity by ring
        const opacity = 1 - ring * 0.3;
        ctx.strokeStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2 - ring * 0.3;
        ctx.stroke();
      }

      // Add outer glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode, isPlaying, size, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
    />
  );
}
