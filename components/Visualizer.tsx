import React, { useRef, useEffect } from 'react';
import { AppState, AudioMode } from '../types';
import { BRAINWAVE_FREQUENCIES } from '../constants';

interface VisualizerProps {
  appState: AppState;
  heartRate: number;
  audioMode: AudioMode;
  sequenceColor?: string;
}

const STATE_COLORS: { [key in AppState]: string } = {
  [AppState.Stressed]: '#ff4500', // OrangeRed
  [AppState.Calm]: '#1e90ff',     // DodgerBlue
  [AppState.Intuitive]: '#00ff7f', // SpringGreen
};

const Visualizer: React.FC<VisualizerProps> = ({ appState, heartRate, audioMode, sequenceColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = sequenceColor || STATE_COLORS[appState];
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 50 + Math.sin(timeRef.current * 0.05) * (heartRate / 5);

      const drawFlowerOfLife = (x: number, y: number, r: number, phase = 0) => {
        const numCircles = 6;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();

        for (let i = 0; i < numCircles; i++) {
          const angle = (i * 2 * Math.PI) / numCircles + phase;
          const circleX = x + Math.cos(angle) * r;
          const circleY = y + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(circleX, circleY, r, 0, 2 * Math.PI);
          ctx.stroke();
        }
      };

      if (audioMode === AudioMode.Binaural) {
        ctx.lineWidth = 1;
        drawFlowerOfLife(centerX, centerY, baseRadius, timeRef.current * 0.01);
        ctx.globalAlpha = 0.6;
        drawFlowerOfLife(centerX, centerY, baseRadius * 0.95, -timeRef.current * 0.01 + Math.PI / 6);
        ctx.globalAlpha = 1.0;
      } else if (audioMode === AudioMode.Isochronic) {
        const pulse = (Math.sin(timeRef.current * (BRAINWAVE_FREQUENCIES.GAMMA / 10)) + 1) / 2; // Sync with 40Hz
        ctx.lineWidth = 1 + pulse * 2;
        ctx.shadowBlur = 10 + pulse * 15;
        drawFlowerOfLife(centerX, centerY, baseRadius);
      } else {
        ctx.lineWidth = 1.5;
        drawFlowerOfLife(centerX, centerY, baseRadius);
      }

      timeRef.current++;
      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [appState, heartRate, audioMode, sequenceColor]);

  return <canvas ref={canvasRef} width="500" height="500" className="border-2 border-blue-400/30 rounded-full" />;
};

export default Visualizer;