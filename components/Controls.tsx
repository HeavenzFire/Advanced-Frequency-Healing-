import React from 'react';
import { FREQUENCIES, BRAINWAVE_FREQUENCIES, PLANETARY_FREQUENCIES, SCHUMANN_RESONANCE, RIFE_FREQUENCIES } from '../constants';

interface ControlsProps {
  onPlaySimple: (freq: number) => void;
  onPlayBinaural: (carrier: number, beat: number) => void;
  onPlayIsochronic: (carrier: number, pulse: number) => void;
  onPlayPEMF: () => void;
  onPlayChakraSequence: () => void;
  onPlaySolfeggioSequence: () => void;
  onStop: () => void;
  isAudioPlaying: boolean;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium text-cyan-200 bg-cyan-900/50 border border-cyan-500/50 rounded-lg hover:bg-cyan-800/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/10 ${className}`}
  >
    {children}
  </button>
);

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xs uppercase tracking-widest text-purple-300/60 font-semibold col-span-full text-center mb-1">{children}</h3>
);

const Controls: React.FC<ControlsProps> = ({
  onPlaySimple,
  onPlayBinaural,
  onPlayIsochronic,
  onPlayPEMF,
  onPlayChakraSequence,
  onPlaySolfeggioSequence,
  onStop,
  isAudioPlaying,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <SectionHeader>Harmonic Journeys</SectionHeader>
            <ControlButton onClick={onPlayChakraSequence}>Chakra Balance</ControlButton>
            <ControlButton onClick={onPlaySolfeggioSequence}>Solfeggio Scale</ControlButton>
            <ControlButton onClick={() => onPlayIsochronic(120, SCHUMANN_RESONANCE)}>Schumann Grounding</ControlButton>
            <ControlButton onClick={() => onPlaySimple(PLANETARY_FREQUENCIES.VENUS)}>Venus Attunement</ControlButton>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <SectionHeader>Targeted Frequencies (Rife)</SectionHeader>
            {RIFE_FREQUENCIES.map(item => (
                <ControlButton key={item.name} onClick={() => onPlaySimple(item.freq)}>{item.name}</ControlButton>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-3 w-full">
            <SectionHeader>Brainwave Entrainment</SectionHeader>
            <ControlButton onClick={() => onPlayIsochronic(FREQUENCIES.CLARITY, BRAINWAVE_FREQUENCIES.GAMMA)}>Gamma Focus</ControlButton>
            <ControlButton onClick={() => onPlayBinaural(FREQUENCIES.CLARITY, BRAINWAVE_FREQUENCIES.ALPHA)}>Deep Calm</ControlButton>
            <ControlButton onClick={() => onPlayBinaural(FREQUENCIES.INTUITION, BRAINWAVE_FREQUENCIES.THETA)}>Intuitive Insight</ControlButton>
        </div>
      
        <div className="grid grid-cols-4 gap-3 w-full">
            <SectionHeader>Core Tones</SectionHeader>
            <ControlButton onClick={() => onPlaySimple(FREQUENCIES.LOVE)}>528Hz</ControlButton>
            <ControlButton onClick={() => onPlaySimple(FREQUENCIES.CLARITY)}>432Hz</ControlButton>
            <ControlButton onClick={() => onPlaySimple(FREQUENCIES.INTUITION)}>963Hz</ControlButton>
            <ControlButton onClick={() => onPlayPEMF()}>40Hz PEMF</ControlButton>
        </div>
      
        <button
            onClick={onStop}
            disabled={!isAudioPlaying}
            className="w-full px-4 py-2 text-base font-medium text-red-200 bg-red-900/50 border border-red-500/50 rounded-lg hover:bg-red-800/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 shadow-lg shadow-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Stop
        </button>
    </div>
  );
};

export default Controls;