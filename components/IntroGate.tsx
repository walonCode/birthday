"use client";

import { motion } from "motion/react";
import { config } from "@/content/config";

export default function IntroGate({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Open your birthday surprise"
      className="fixed inset-0 z-50 flex h-svh w-full cursor-pointer flex-col items-center justify-center gap-8 bg-plum px-6"
      exit={{ opacity: 0, scale: 1.35 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
    >
      {/* Radial gold glow behind the gift */}
      <span
        aria-hidden="true"
        className="absolute h-80 w-80 rounded-full bg-gold/15 blur-3xl animate-glow-pulse"
      />

      <motion.span
        aria-hidden="true"
        className="relative text-8xl md:text-9xl"
        animate={{ rotate: [-4, 4, -4], y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        whileTap={{ scale: 0.85 }}
      >
        🎁
      </motion.span>

      <span className="relative flex flex-col items-center gap-3 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm italic text-cream/60 md:text-base"
        >
          {config.introEyebrow}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="btn-shimmer rounded-full border border-gold/40 px-6 py-3 font-serif text-xl text-gold-light md:text-2xl"
        >
          {config.introText} 🎀
        </motion.span>
      </span>
    </motion.button>
  );
}
