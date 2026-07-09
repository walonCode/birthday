"use client";

import { motion } from "motion/react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireFireworksShow } from "@/lib/confetti";

const SHOW_MS = 4500;

export default function Fireworks() {
  const [showing, setShowing] = useState(false);

  const launch = () => {
    if (showing) return;
    setShowing(true);
    fireFireworksShow(SHOW_MS);
    setTimeout(() => setShowing(false), SHOW_MS + 800);
  };

  return (
    <section
      aria-labelledby="fireworks-heading"
      className="relative overflow-hidden px-6 py-20 md:py-28"
    >
      {/* Night-sky stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative stars
            key={i}
            className="absolute h-px w-px rounded-full bg-cream animate-glow-pulse"
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 23 + 11) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
              boxShadow: "0 0 4px 1px rgba(253,246,236,0.6)",
            }}
          />
        ))}
      </div>

      <SectionHeading
        id="fireworks-heading"
        title={config.fireworksTitle}
        emoji="🎆"
      />

      <div className="relative flex justify-center">
        <motion.button
          type="button"
          onClick={launch}
          disabled={showing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          className="btn-shimmer rounded-full border border-gold/40 bg-plum-light/70 px-8 py-4 font-serif text-gold-light text-xl backdrop-blur transition-shadow hover:shadow-[0_0_40px_rgba(212,162,78,0.45)] disabled:opacity-60 md:text-2xl"
        >
          {showing ? "Ooooh… 🌌" : config.fireworksButton}
        </motion.button>
      </div>
    </section>
  );
}
