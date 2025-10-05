import { useRef, useCallback, useEffect } from 'react';

type SequenceStep = {
  freq: number;
  duration: number; // in seconds
};

export const useAudioController = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainOscillatorRef = useRef<OscillatorNode | null>(null);
  const secondaryOscillatorRef = useRef<OscillatorNode | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pemfOscillatorRef = useRef<OscillatorNode | null>(null);
  const pemfGainRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const stopMainSound = useCallback(() => {
    if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
        sequenceTimeoutRef.current = null;
    }
    mainOscillatorRef.current?.stop();
    secondaryOscillatorRef.current?.stop();
    mainOscillatorRef.current?.disconnect();
    secondaryOscillatorRef.current?.disconnect();
    mainGainRef.current?.disconnect();
    mainOscillatorRef.current = null;
    secondaryOscillatorRef.current = null;
    mainGainRef.current = null;
  }, []);

  const stopPEMF = useCallback(() => {
    pemfOscillatorRef.current?.stop();
    pemfOscillatorRef.current?.disconnect();
    pemfGainRef.current?.disconnect();
    pemfOscillatorRef.current = null;
    pemfGainRef.current = null;
  }, []);

  const playSimpleTone = useCallback((freq: number) => {
    stopMainSound();
    const audioCtx = getAudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    mainOscillatorRef.current = oscillator;
  }, [getAudioContext, stopMainSound]);

  const playBinauralBeat = useCallback((carrierFreq: number, beatFreq: number) => {
    stopMainSound();
    const audioCtx = getAudioContext();
    const leftOsc = audioCtx.createOscillator();
    const rightOsc = audioCtx.createOscillator();
    const merger = audioCtx.createChannelMerger(2);
    
    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(carrierFreq - beatFreq / 2, audioCtx.currentTime);
    leftOsc.connect(merger, 0, 0);
    
    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(carrierFreq + beatFreq / 2, audioCtx.currentTime);
    rightOsc.connect(merger, 0, 1);
    
    merger.connect(audioCtx.destination);
    
    leftOsc.start();
    rightOsc.start();

    mainOscillatorRef.current = leftOsc;
    secondaryOscillatorRef.current = rightOsc;
  }, [getAudioContext, stopMainSound]);

  const playIsochronicTone = useCallback((carrierFreq: number, pulseFreq: number) => {
    stopMainSound();
    const audioCtx = getAudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const lfo = audioCtx.createOscillator();

    lfo.type = 'square';
    lfo.frequency.setValueAtTime(pulseFreq, audioCtx.currentTime);
    lfo.connect(gainNode.gain);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(carrierFreq, audioCtx.currentTime);
    oscillator.connect(gainNode).connect(audioCtx.destination);
    
    oscillator.start();
    lfo.start();

    mainOscillatorRef.current = oscillator;
    secondaryOscillatorRef.current = lfo;
    mainGainRef.current = gainNode;
  }, [getAudioContext, stopMainSound]);
  
  const playFrequencySequence = useCallback((sequence: SequenceStep[], onStepChange: (index: number) => void) => {
    stopMainSound();
    const audioCtx = getAudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    mainOscillatorRef.current = oscillator;
    
    let currentIndex = 0;
    
    function scheduleNext() {
      if (currentIndex >= sequence.length) {
        stopMainSound();
        return;
      }
      
      const step = sequence[currentIndex];
      onStepChange(currentIndex);
      oscillator.frequency.setValueAtTime(step.freq, audioCtx.currentTime);
      
      sequenceTimeoutRef.current = setTimeout(() => {
        currentIndex++;
        scheduleNext();
      }, step.duration * 1000);
    }
    
    scheduleNext();
  }, [getAudioContext, stopMainSound]);

  const playPEMF = useCallback((intensity = 0.5) => {
    stopPEMF();
    const audioCtx = getAudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(40, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(intensity, audioCtx.currentTime);
    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();
    pemfOscillatorRef.current = oscillator;
    pemfGainRef.current = gainNode;
  }, [getAudioContext, stopPEMF]);
  
  const playSoundEffect = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.15) => {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    const effectOscillator = audioCtx.createOscillator();
    const effectGain = audioCtx.createGain();

    effectOscillator.type = type;
    effectOscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    effectGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    effectGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    effectOscillator.connect(effectGain).connect(audioCtx.destination);
    effectOscillator.start(audioCtx.currentTime);
    effectOscillator.stop(audioCtx.currentTime + duration);
  }, [getAudioContext]);

  const stopAllAudio = useCallback(() => {
    stopMainSound();
    stopPEMF();
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, [stopMainSound, stopPEMF]);

  const adjustPEMFIntensity = useCallback((intensity: number) => {
    if (pemfGainRef.current && audioCtxRef.current) {
      pemfGainRef.current.gain.setValueAtTime(intensity, audioCtxRef.current.currentTime);
    }
  }, []);

  useEffect(() => {
    return () => stopAllAudio();
  }, [stopAllAudio]);

  return { playSimpleTone, playBinauralBeat, playIsochronicTone, playPEMF, playFrequencySequence, stopAllAudio, adjustPEMFIntensity, playSoundEffect };
};