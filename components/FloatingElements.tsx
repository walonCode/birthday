"use client";

import { useReducedMotion } from "motion/react";

const EMOJIS = [
  "🎈",
  "❤️",
  "✨",
  "🌹",
  "🎈",
  "💛",
  "✨",
  "🎈",
  "🩷",
  "🌹",
  "✨",
  "🎈",
  "❤️",
  "💛",
];

// Deterministic pseudo-random layout (no Math.random — avoids hydration mismatch).
const FLOATERS = EMOJIS.map((emoji, i) => ({
  emoji,
  left: (i * 37 + 11) % 100,
  size: 1 + ((i * 13) % 10) / 8, // 1rem – ~2.1rem
  duration: 14 + ((i * 7) % 12), // 14s – 25s
  delay: -((i * 5) % 18), // negative = already mid-flight on mount
  opacity: 0.25 + ((i * 11) % 5) / 12,
}));

export default function FloatingElements() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {FLOATERS.map((f, i) => (
        <span
          key={`${f.emoji}-${i}`}
          className="absolute animate-float"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}rem`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}
