"use client";

import { motion } from "motion/react";
import { config } from "@/content/config";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Glow blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl animate-glow-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-rose-deep/25 blur-3xl animate-glow-pulse [animation-delay:1.5s]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-rose/15 blur-3xl animate-glow-pulse [animation-delay:0.7s]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={item}
          className="mb-6 text-sm uppercase tracking-[0.35em] text-gold-light/80 md:text-base"
        >
          🎉 It&apos;s your special day 🎉
        </motion.p>

        {/* Letter-by-letter reveal; screen readers get the whole headline */}
        <motion.h1
          variants={item}
          aria-label={config.headline}
          className="text-shimmer font-serif text-5xl leading-tight text-balance sm:text-6xl md:text-8xl"
        >
          {config.headline.split(" ").map((word, wi) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static headline text, never reorders
              key={`${word}-${wi}`}
              aria-hidden="true"
              className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0"
            >
              {word.split("").map((char, ci) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static headline text, never reorders
                  key={`${char}-${ci}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, rotate: -8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 14,
                    delay: 0.6 + wi * 0.25 + ci * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl font-serif text-lg italic text-cream/85 md:text-2xl text-pretty"
        >
          {config.subheadline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 text-sm tracking-widest text-gold-light/70 md:text-base"
        >
          {config.name}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 text-2xl text-gold-light/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 2 },
        }}
      >
        ↓
      </motion.div>
    </section>
  );
}
