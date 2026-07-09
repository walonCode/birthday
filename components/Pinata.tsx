"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireCandyBurst } from "@/lib/confetti";

export default function Pinata() {
  const [hits, setHits] = useState(0);
  const broken = hits >= config.pinataHits;

  const whack = () => {
    if (broken) return;
    const next = hits + 1;
    setHits(next);
    if (next >= config.pinataHits) {
      fireCandyBurst();
    }
  };

  const reset = () => setHits(0);

  return (
    <section aria-labelledby="pinata-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="pinata-heading"
        title={config.pinataTitle}
        subtitle={config.pinataSubtitle}
        emoji="🪅"
      />

      <div className="mx-auto flex max-w-md flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {!broken ? (
            <motion.button
              key="pinata"
              type="button"
              onClick={whack}
              aria-label={`Whack the piñata (${hits} of ${config.pinataHits} hits)`}
              exit={{
                scale: 1.6,
                opacity: 0,
                rotate: 30,
                transition: { duration: 0.25 },
              }}
              className="relative cursor-pointer"
            >
              {/* String it hangs from */}
              <span
                aria-hidden="true"
                className="absolute -top-16 left-1/2 h-16 w-px -translate-x-1/2 bg-cream/40"
              />
              <motion.span
                // Swing harder and jolt as it takes damage
                key={hits}
                aria-hidden="true"
                className="block text-8xl md:text-9xl"
                initial={
                  hits > 0
                    ? { rotate: hits % 2 === 0 ? -25 : 25, scale: 0.92 }
                    : false
                }
                animate={{
                  rotate: [hits % 2 === 0 ? -6 : 6, hits % 2 === 0 ? 6 : -6],
                  scale: 1,
                }}
                transition={{
                  rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: Math.max(0.6, 1.6 - hits * 0.12),
                    ease: "easeInOut",
                  },
                  scale: { type: "spring", stiffness: 300, damping: 10 },
                }}
              >
                🪅
              </motion.span>
            </motion.button>
          ) : (
            <motion.div
              key="burst"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 13 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span aria-hidden="true" className="text-6xl">
                🍬🍭🧁
              </span>
              <p className="font-serif text-2xl italic text-gold-light md:text-3xl">
                {config.pinataMessage}
              </p>
              <button
                type="button"
                onClick={reset}
                className="btn-shimmer rounded-full border border-gold/40 bg-plum-light/80 px-5 py-2 text-cream/90 text-sm backdrop-blur transition-shadow hover:shadow-[0_0_25px_rgba(212,162,78,0.4)] active:translate-y-px"
              >
                Hang another one 🪅
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Damage meter */}
        {!broken && (
          <div
            role="progressbar"
            aria-valuenow={hits}
            aria-valuemin={0}
            aria-valuemax={config.pinataHits}
            aria-label="Piñata damage"
            className="h-2 w-48 overflow-hidden rounded-full bg-cream/10"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-rose"
              animate={{ width: `${(hits / config.pinataHits) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
