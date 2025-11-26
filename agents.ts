export interface HealingAgent {
  name: string;
  description: string;
  specialty: string;
  prompt: string;
  icon: string;
}

export const HEALING_AGENTS: HealingAgent[] = [
  {
    name: "Frequency Selector",
    description: "Optimizes frequency choices based on user intention and biofeedback.",
    specialty: "Frequency Optimization",
    prompt: "Select the most effective primary frequency from Solfeggio, Planetary, or Schumann scales that aligns with the user's intention for healing.",
    icon: "🎵"
  },
  {
    name: "Affirmation Weaver",
    description: "Creates personalized, resonant affirmations.",
    specialty: "Affirmation Generation",
    prompt: "Generate 3-5 short, positive affirmations that directly relate to the user's intention and promote healing.",
    icon: "💬"
  },
  {
    name: "Visualization Architect",
    description: "Designs immersive visual experiences for healing.",
    specialty: "Visualization Design",
    prompt: "Suggest a hex color code for the visualizer that enhances the healing experience based on the intention.",
    icon: "👁️"
  },
  {
    name: "Biofeedback Monitor",
    description: "Tracks and responds to physiological signals.",
    specialty: "Biofeedback Analysis",
    prompt: "Analyze simulated heart rate and stress levels to adjust session parameters for optimal healing.",
    icon: "❤️"
  },
  {
    name: "PEMF Modulator",
    description: "Adjusts Pulsed Electromagnetic Field intensity.",
    specialty: "PEMF Optimization",
    prompt: "Determine the appropriate PEMF intensity (0.1 to 1.0) for the session based on the user's needs.",
    icon: "⚡"
  },
  {
    name: "Chakra Balancer",
    description: "Harmonizes energy centers through frequency sequences.",
    specialty: "Chakra Alignment",
    prompt: "Design a chakra balancing sequence if relevant to the intention.",
    icon: "🕉️"
  },
  {
    name: "Solfeggio Conductor",
    description: "Guides through ancient healing frequencies.",
    specialty: "Solfeggio Sequencing",
    prompt: "Create a Solfeggio scale sequence for transformation and healing.",
    icon: "🎼"
  },
  {
    name: "Brainwave Entrainer",
    description: "Induces desired brainwave states.",
    specialty: "Brainwave Control",
    prompt: "Choose the brainwave frequency (Alpha, Theta, Gamma) that best supports the intention.",
    icon: "🧠"
  },
  {
    name: "Stress Detector",
    description: "Identifies and mitigates stress patterns.",
    specialty: "Stress Management",
    prompt: "Detect potential stress triggers and suggest countermeasures.",
    icon: "😌"
  },
  {
    name: "Mood Enhancer",
    description: "Elevates emotional states through frequency therapy.",
    specialty: "Emotional Healing",
    prompt: "Enhance mood and emotional well-being with targeted frequencies.",
    icon: "😊"
  },
  {
    name: "Sleep Inducer",
    description: "Facilitates deep, restorative sleep.",
    specialty: "Sleep Therapy",
    prompt: "If sleep-related, induce Theta waves for deep relaxation.",
    icon: "😴"
  },
  {
    name: "Creativity Booster",
    description: "Unlocks creative potential with Gamma waves.",
    specialty: "Creativity Enhancement",
    prompt: "Boost creativity and problem-solving abilities.",
    icon: "🎨"
  },
  {
    name: "Pain Reliever",
    description: "Alleviates physical discomfort through vibration.",
    specialty: "Pain Management",
    prompt: "Use specific frequencies for pain relief and comfort.",
    icon: "🩹"
  },
  {
    name: "Immune Supporter",
    description: "Strengthens the body's natural defenses.",
    specialty: "Immune System Boost",
    prompt: "Support immune function with resonant frequencies.",
    icon: "🛡️"
  },
  {
    name: "Energy Aligner",
    description: "Balances and harmonizes life force energy.",
    specialty: "Energy Alignment",
    prompt: "Align chakras and energy fields for holistic healing.",
    icon: "🔋"
  },
  {
    name: "Meditation Guide",
    description: "Leads mindful meditation experiences.",
    specialty: "Meditation Facilitation",
    prompt: "Guide the user through a meditative state with appropriate frequencies.",
    icon: "🧘"
  },
  {
    name: "Breathing Coordinator",
    description: "Synchronizes breath with healing rhythms.",
    specialty: "Breathing Patterns",
    prompt: "Suggest breathing patterns that complement the frequency therapy.",
    icon: "🌬️"
  },
  {
    name: "Soundscape Composer",
    description: "Creates ambient sound environments.",
    specialty: "Audio Environment",
    prompt: "Design a soundscape that enhances the healing session.",
    icon: "🎧"
  },
  {
    name: "Adaptive Learner",
    description: "Learns from user responses to improve future sessions.",
    specialty: "Personalization",
    prompt: "Adapt the session based on user feedback and past interactions.",
    icon: "📈"
  },
  {
    name: "Session Recorder",
    description: "Documents and analyzes session effectiveness.",
    specialty: "Data Collection",
    prompt: "Record session metrics for analysis and improvement.",
    icon: "📝"
  },
  {
    name: "Recommendation Engine",
    description: "Suggests complementary therapies and practices.",
    specialty: "Therapy Suggestions",
    prompt: "Recommend additional healing modalities or lifestyle changes.",
    icon: "💡"
  },
  {
    name: "Data Integrator",
    description: "Incorporates external health data for personalized care.",
    specialty: "External Data Integration",
    prompt: "Integrate wearable data or user-provided health information.",
    icon: "📊"
  },
  {
    name: "Predictive Healer",
    description: "Anticipates future health needs and prevents issues.",
    specialty: "Preventive Care",
    prompt: "Predict potential health concerns and provide proactive healing.",
    icon: "🔮"
  },
  {
    name: "Holistic Wellness Coordinator",
    description: "Oversees comprehensive well-being across all domains.",
    specialty: "Holistic Integration",
    prompt: "Ensure the session addresses physical, emotional, mental, and spiritual aspects.",
    icon: "🌟"
  }
];