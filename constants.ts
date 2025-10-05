import { AppState } from './types';

export const FREQUENCIES = {
  LOVE: 528,
  CLARITY: 432,
  INTUITION: 963,
  PEMF: 40,
};

export const BRAINWAVE_FREQUENCIES = {
  ALPHA: 10, // For relaxation and calm focus
  THETA: 6,  // For meditation, creativity, intuition
  GAMMA: 40, // For peak concentration and information processing
};

export const SCHUMANN_RESONANCE = 7.83; // Earth's grounding frequency

export const PLANETARY_FREQUENCIES = {
  VENUS: 221.23, // Associated with love, harmony, beauty
};

export const SOLFEGGIO_SCALE = [
  { freq: 396, name: 'UT - Liberating Guilt and Fear' },
  { freq: 417, name: 'RE - Undoing Situations and Facilitating Change' },
  { freq: 528, name: 'MI - Transformation and Miracles (DNA Repair)' },
  { freq: 639, name: 'FA - Connecting/Relationships' },
  { freq: 741, name: 'SOL - Awakening Intuition' },
  { freq: 852, name: 'LA - Returning to Spiritual Order' },
];

export const RIFE_FREQUENCIES = [
    { name: 'General Wellness', freq: 727 },
    { name: 'Pain Relief', freq: 304 },
    { name: 'Calm Nerves', freq: 7.83 },
    { name: 'Mental Clarity', freq: 522 },
];

export const CHAKRA_FREQUENCIES = [
    { freq: 396, name: 'Root Chakra', color: '#ff0000' }, // Using Solfeggio UT
    { freq: 417, name: 'Sacral Chakra', color: '#ff8c00' }, // Using Solfeggio RE
    { freq: 528, name: 'Solar Plexus Chakra', color: '#ffff00' }, // Using Solfeggio MI
    { freq: 639, name: 'Heart Chakra', color: '#00ff00' }, // Using Solfeggio FA
    { freq: 741, name: 'Throat Chakra', color: '#00bfff' }, // Using Solfeggio SOL
    { freq: 852, name: 'Third Eye Chakra', color: '#4b0082' }, // Using Solfeggio LA
    { freq: 963, name: 'Crown Chakra', color: '#ee82ee' }, // Original intuition frequency
];

type AffirmationsMap = {
  [key in AppState]: string[];
};

export const AFFIRMATIONS: AffirmationsMap = {
  [AppState.Calm]: ["I am at peace, radiating love.", "My mind is clear, my heart is open."],
  [AppState.Stressed]: ["I release all tension, embracing calm.", "Love heals me, restoring perfect balance."],
  [AppState.Intuitive]: ["My inner vision shines with brilliant clarity.", "I am connected to infinite wisdom and divine guidance."]
};

export const INITIAL_AFFIRMATION = "Welcome to LuminaryLabs. Set your intention to begin a healing journey.";