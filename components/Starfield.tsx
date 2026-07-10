"use client";

import { motion } from "motion/react";
import { config } from "@/content/config";

// Deterministic star layout (no Math.random — stable across renders).
const STARS = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  top: (i * 29 + 7) % 100,
  size: 1 + ((i * 13) % 6) / 2, // ~1–4px
  delay: (i % 10) * 0.3,
  duration: 2.4 + (i % 5) * 0.5,
  base: 0.25 + ((i * 7) % 6) / 12,
}));

export default function Starfield() {
  return (
    <section
      aria-label={`A sky full of ${config.name.split(" ")[1]}`}
      className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Twinkling stars */}
      <div aria-hidden="true" className="absolute inset-0">
        {STARS.map((star, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative field
            key={i}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              height: `${star.size}px`,
              width: `${star.size}px`,
              opacity: star.base,
              boxShadow: `0 0 ${star.size * 2}px rgba(253,246,236,0.7)`,
              animation: `glow-pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Soft glow behind the name */}
      <div
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <span aria-hidden="true" className="text-3xl">
          ✨
        </span>
        <h2 className="text-shimmer font-serif text-4xl leading-tight text-balance md:text-6xl">
          {config.name}
        </h2>
        <p className="max-w-md font-serif text-lg text-cream/80 italic md:text-xl">
          {config.starfieldTagline}
        </p>
      </motion.div>
    </section>
  );
}
