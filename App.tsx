import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import { useAudioController } from './hooks/useAudioController';
import { AppState, AudioMode } from './types';
import { AFFIRMATIONS, FREQUENCIES, INITIAL_AFFIRMATION, BRAINWAVE_FREQUENCIES, CHAKRA_FREQUENCIES, SOLFEGGIO_SCALE } from './constants';

type SequenceStepInfo = {
  name: string;
  color?: string;
};

interface GenerativeSessionConfig {
    primaryFrequency: number;
    modality: 'Binaural' | 'Isochronic';
    brainwaveFrequency: number;
    visualizerColor: string;
    affirmations: string[];
}

const App: React.FC = () => {
  const [heartRate, setHeartRate] = useState(70);
  const [appState, setAppState] = useState<AppState>(AppState.Calm);
  const [audioMode, setAudioMode] = useState<AudioMode>(AudioMode.Stopped);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [affirmation, setAffirmation] = useState(INITIAL_AFFIRMATION);
  const [sequenceStep, setSequenceStep] = useState<SequenceStepInfo | null>(null);
  
  const [intention, setIntention] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionConfig, setSessionConfig] = useState<GenerativeSessionConfig | null>(null);

  const biofeedbackIntervalRef = useRef<number | null>(null);
  const affirmationIntervalRef = useRef<number | null>(null);

  const { playSimpleTone, playBinauralBeat, playIsochronicTone, playPEMF, playFrequencySequence, stopAllAudio, adjustPEMFIntensity } = useAudioController();

  const handleStop = useCallback(() => {
    stopAllAudio();
    if (biofeedbackIntervalRef.current) clearInterval(biofeedbackIntervalRef.current);
    if (affirmationIntervalRef.current) clearInterval(affirmationIntervalRef.current);
    setIsAudioPlaying(false);
    setAudioMode(AudioMode.Stopped);
    setAffirmation(INITIAL_AFFIRMATION);
    setHeartRate(70);
    setSequenceStep(null);
    setSessionConfig(null);
    setIntention('');
  }, [stopAllAudio]);

  const handleStartGenerativeSession = async () => {
    if (!intention.trim()) {
        setAffirmation("Please enter your intention to begin.");
        return;
    }
    handleStop();
    setIsGenerating(true);
    setAffirmation("Crafting your personalized healing session...");
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `The user's intention is: "${intention}". Based on this, generate a healing session. For the primary frequency, choose a relevant value from the Solfeggio, Planetary, or Schumann scales. For the modality, choose 'Binaural' for introspective or calming intentions, and 'Isochronic' for focus or energy-clearing intentions. The brainwave frequency should correspond to the goal (e.g., Alpha for calm, Theta for intuition, Gamma for focus). Generate 3-5 short, positive affirmations that directly relate to the user's intention.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        primaryFrequency: { type: Type.NUMBER, description: "The main carrier frequency for the session." },
                        modality: { type: Type.STRING, description: "Either 'Binaural' or 'Isochronic'." },
                        brainwaveFrequency: { type: Type.NUMBER, description: "The beat or pulse frequency." },
                        visualizerColor: { type: Type.STRING, description: "A hex color code for the visualizer." },
                        affirmations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "An array of 3 to 5 personalized affirmation strings."
                        }
                    },
                    required: ["primaryFrequency", "modality", "brainwaveFrequency", "visualizerColor", "affirmations"]
                },
            },
        });

        const config = JSON.parse(response.text) as GenerativeSessionConfig;
        setSessionConfig(config);
        setAudioMode(AudioMode.Luminary);
        setIsAudioPlaying(true);
        
        if (config.modality === 'Binaural') {
            playBinauralBeat(config.primaryFrequency, config.brainwaveFrequency);
        } else {
            playIsochronicTone(config.primaryFrequency, config.brainwaveFrequency);
        }
        playPEMF(0.5);

        let affIndex = 0;
        const cycleAffirmations = () => {
            setAffirmation(config.affirmations[affIndex]);
            affIndex = (affIndex + 1) % config.affirmations.length;
        };
        cycleAffirmations();
        affirmationIntervalRef.current = window.setInterval(cycleAffirmations, 6000);

    } catch (error) {
        console.error("Error generating session:", error);
        setAffirmation("Could not create a session. Please try again.");
        setAudioMode(AudioMode.Stopped);
    } finally {
        setIsGenerating(false);
    }
  };

  const commonPlaySetup = (mode: AudioMode) => {
    handleStop();
    setIsAudioPlaying(true);
    setAudioMode(mode);
  };

  const handlePlaySimple = useCallback((freq: number) => {
    commonPlaySetup(AudioMode.Simple);
    playSimpleTone(freq);
  }, [playSimpleTone, handleStop]);

  const handlePlayBinaural = useCallback((carrier: number, beat: number) => {
    commonPlaySetup(AudioMode.Binaural);
    playBinauralBeat(carrier, beat);
  }, [playBinauralBeat, handleStop]);

  const handlePlayIsochronic = useCallback((carrier: number, pulse: number) => {
    commonPlaySetup(AudioMode.Isochronic);
    playIsochronicTone(carrier, pulse);
  }, [playIsochronicTone, handleStop]);

  const handlePlayPEMF = useCallback(() => {
    commonPlaySetup(AudioMode.PEMF);
    playPEMF();
  }, [playPEMF, handleStop]);

  const handlePlayChakraSequence = useCallback(() => {
    commonPlaySetup(AudioMode.Sequence);
    const sequence = CHAKRA_FREQUENCIES.map(chakra => ({ freq: chakra.freq, duration: 15 }));
    playFrequencySequence(sequence, (index) => {
        const currentChakra = CHAKRA_FREQUENCIES[index];
        setSequenceStep({ name: currentChakra.name, color: currentChakra.color });
        setAffirmation(`Balancing the ${currentChakra.name}...`);
    });
  }, [playFrequencySequence, handleStop]);

  const handlePlaySolfeggioSequence = useCallback(() => {
    commonPlaySetup(AudioMode.Sequence);
    const sequence = SOLFEGGIO_SCALE.map(solfeggio => ({ freq: solfeggio.freq, duration: 20 }));
    playFrequencySequence(sequence, (index) => {
        const currentSolfeggio = SOLFEGGIO_SCALE[index];
        setSequenceStep({ name: currentSolfeggio.name });
        setAffirmation(currentSolfeggio.name);
    });
  }, [playFrequencySequence, handleStop]);

  const getVisualizerColor = () => {
      if (audioMode === AudioMode.Luminary && sessionConfig) return sessionConfig.visualizerColor;
      if (audioMode === AudioMode.Sequence && sequenceStep) return sequenceStep.color;
      return undefined;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 font-sans space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">LuminaryLabs</h1>
        <p className="text-cyan-200/80 mt-1">Personalized Generative Healing</p>
      </header>

      <Visualizer appState={appState} heartRate={heartRate} audioMode={audioMode} sequenceColor={getVisualizerColor()} />

      <main className="flex flex-col items-center space-y-6 w-full px-4 max-w-2xl">
        <div className="w-full space-y-3 bg-black/20 p-4 rounded-lg">
            <label htmlFor="intention-input" className="block text-center text-purple-200 text-sm font-medium">What is your intention for this session?</label>
            <input 
                id="intention-input"
                type="text"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="e.g., release anxiety, boost creativity..."
                className="w-full bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-purple-400 focus:border-purple-400"
                disabled={isGenerating || isAudioPlaying}
            />
            <button
                onClick={handleStartGenerativeSession}
                disabled={isGenerating || isAudioPlaying}
                className="w-full px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a23] focus:ring-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? 'Generating...' : 'Begin Healing Journey'}
            </button>
        </div>

        {!isAudioPlaying && !isGenerating && (
            <Controls
              onPlaySimple={handlePlaySimple}
              onPlayBinaural={handlePlayBinaural}
              onPlayIsochronic={handlePlayIsochronic}
              onPlayPEMF={handlePlayPEMF}
              onPlayChakraSequence={handlePlayChakraSequence}
              onPlaySolfeggioSequence={handlePlaySolfeggioSequence}
              onStop={handleStop}
              isAudioPlaying={isAudioPlaying}
            />
        )}
        
        {isAudioPlaying && (
             <button
                onClick={handleStop}
                className="w-full px-4 py-2 text-base font-medium text-red-200 bg-red-900/50 border border-red-500/50 rounded-lg hover:bg-red-800/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 shadow-lg shadow-red-500/10"
            >
                Stop Session
            </button>
        )}

        <div className="text-center w-full max-w-2xl min-h-[3rem]">
          <p className="text-xl italic text-purple-200/90">"{affirmation}"</p>
        </div>
      </main>
    </div>
  );
};

export default App;