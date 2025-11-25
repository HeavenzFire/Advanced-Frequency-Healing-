export interface HealingAgent {
  name: string;
  description: string;
  icon: string;
  prompt: string;
}

export const HEALING_AGENTS: HealingAgent[] = [
  {
    name: "Anxiety Relief",
    description: "Calm anxious thoughts and promote inner peace",
    icon: "🧘",
    prompt: "Generate a healing session focused on anxiety relief. Choose frequencies that promote relaxation and calm, such as Theta waves. Modality should be Binaural for deep introspection. Affirmations should address fear, worry, and trust in the present moment."
  },
  {
    name: "Stress Reduction",
    description: "Release tension and restore balance",
    icon: "🌿",
    prompt: "Create a session for stress reduction. Use Alpha brainwaves for relaxation. Prefer Isochronic for active stress release. Affirmations should focus on letting go of tension and embracing calm."
  },
  {
    name: "Sleep Improvement",
    description: "Enhance sleep quality and restful nights",
    icon: "🌙",
    prompt: "Design a session for better sleep. Incorporate Delta brainwaves. Use Binaural beats for gentle transition to sleep. Affirmations should promote relaxation and peaceful rest."
  },
  {
    name: "Energy Boost",
    description: "Increase vitality and motivation",
    icon: "⚡",
    prompt: "Generate an energizing session. Use Beta brainwaves for alertness. Isochronic modality for stimulation. Affirmations should inspire energy, motivation, and vitality."
  },
  {
    name: "Creativity Enhancement",
    description: "Unlock imagination and artistic flow",
    icon: "🎨",
    prompt: "Craft a session for creativity. Gamma brainwaves for insight. Binaural for intuitive flow. Affirmations should encourage innovation, inspiration, and creative expression."
  },
  {
    name: "Focus and Concentration",
    description: "Sharpen mental clarity and attention",
    icon: "🔍",
    prompt: "Create a focus-enhancing session. Beta waves for concentration. Isochronic for precision. Affirmations should reinforce clarity, discipline, and mental sharpness."
  },
  {
    name: "Emotional Healing",
    description: "Heal emotional wounds and foster resilience",
    icon: "💖",
    prompt: "Design an emotional healing session. Theta for emotional processing. Binaural for deep healing. Affirmations should address forgiveness, self-compassion, and emotional strength."
  },
  {
    name: "Physical Pain Relief",
    description: "Alleviate physical discomfort and promote healing",
    icon: "🩹",
    prompt: "Generate a pain relief session. Use frequencies known for pain management, like 528Hz. Isochronic for targeted relief. Affirmations should focus on healing, comfort, and body restoration."
  },
  {
    name: "Immune System Boost",
    description: "Strengthen immunity and overall health",
    icon: "🛡️",
    prompt: "Create an immunity-boosting session. Incorporate Solfeggio frequencies for healing. Binaural for systemic support. Affirmations should promote health, vitality, and immune resilience."
  },
  {
    name: "Chakra Balancing",
    description: "Align and balance the body's energy centers",
    icon: "🔮",
    prompt: "Design a chakra balancing session. Use chakra-specific frequencies in sequence. Modality based on balance needs. Affirmations should address each chakra's qualities."
  },
  {
    name: "Meditation Aid",
    description: "Deepen meditation practice and mindfulness",
    icon: "🧘‍♀️",
    prompt: "Craft a meditation support session. Theta or Alpha waves. Binaural for focus. Affirmations should guide mindfulness, presence, and inner peace."
  },
  {
    name: "Self-Love and Confidence",
    description: "Build self-esteem and inner confidence",
    icon: "🌟",
    prompt: "Generate a self-love session. Alpha for self-acceptance. Isochronic for empowerment. Affirmations should reinforce worthiness, confidence, and self-compassion."
  },
  {
    name: "Relationship Healing",
    description: "Heal relationships and foster connection",
    icon: "🤝",
    prompt: "Create a relationship healing session. Theta for emotional bonds. Binaural for harmony. Affirmations should promote love, understanding, and healthy connections."
  },
  {
    name: "Abundance and Prosperity",
    description: "Attract abundance and positive opportunities",
    icon: "💰",
    prompt: "Design an abundance session. Gamma for manifestation. Isochronic for action. Affirmations should focus on prosperity, gratitude, and openness to abundance."
  },
  {
    name: "Spiritual Awakening",
    description: "Deepen spiritual connection and awareness",
    icon: "✨",
    prompt: "Craft a spiritual awakening session. Theta for intuition. Binaural for transcendence. Affirmations should encourage spiritual growth, enlightenment, and divine connection."
  },
  {
    name: "Detoxification",
    description: "Support body detoxification and cleansing",
    icon: "🌊",
    prompt: "Generate a detox session. Use frequencies for cellular cleansing. Isochronic for process support. Affirmations should promote release, purification, and renewal."
  },
  {
    name: "Weight Loss Support",
    description: "Aid in healthy weight management",
    icon: "⚖️",
    prompt: "Create a weight loss support session. Beta for motivation. Isochronic for discipline. Affirmations should address healthy habits, self-control, and body positivity."
  },
  {
    name: "Addiction Recovery",
    description: "Support recovery from addictive behaviors",
    icon: "🚫",
    prompt: "Design an addiction recovery session. Theta for subconscious reprogramming. Binaural for healing. Affirmations should reinforce freedom, strength, and new beginnings."
  },
  {
    name: "Grief Healing",
    description: "Process grief and find peace",
    icon: "🌹",
    prompt: "Craft a grief healing session. Delta for comfort. Binaural for gentle processing. Affirmations should honor loss, promote healing, and embrace life."
  },
  {
    name: "PTSD Recovery",
    description: "Heal from trauma and build resilience",
    icon: "🕊️",
    prompt: "Generate a PTSD recovery session. Theta for trauma release. Isochronic for grounding. Affirmations should focus on safety, healing, and inner strength."
  },
  {
    name: "ADHD Management",
    description: "Improve focus and executive function",
    icon: "🧠",
    prompt: "Create an ADHD management session. Beta for attention. Isochronic for structure. Affirmations should encourage focus, organization, and self-regulation."
  },
  {
    name: "Depression Relief",
    description: "Lift mood and restore hope",
    icon: "☀️",
    prompt: "Design a depression relief session. Alpha for mood elevation. Binaural for emotional uplift. Affirmations should promote joy, hope, and self-worth."
  },
  {
    name: "Intuition Development",
    description: "Enhance intuitive abilities and insight",
    icon: "🔮",
    prompt: "Craft an intuition development session. Gamma for insight. Binaural for inner guidance. Affirmations should trust intuition, wisdom, and inner knowing."
  },
  {
    name: "Manifestation",
    description: "Align with desires and manifest goals",
    icon: "🎯",
    prompt: "Generate a manifestation session. Gamma for intention. Isochronic for focus. Affirmations should align with goals, belief, and manifestation power."
  }
];