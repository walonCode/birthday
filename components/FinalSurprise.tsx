"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireHeartStorm } from "@/lib/confetti";

export default function FinalSurprise() {
  const [open, setOpen] = useState(false);

  const openLetter = () => {
    fireHeartStorm();
    setOpen(true);
  };

  return (
    <section aria-labelledby="final-heading" className="px-6 py-20 md:py-28">
      <SectionHeading id="final-heading" title={config.finalTitle} emoji="💌" />

      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={openLetter}
              exit={{ opacity: 0, scale: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="btn-shimmer flex flex-col items-center gap-5 rounded-3xl border border-gold/40 bg-plum-light/60 px-10 py-8 backdrop-blur transition-shadow hover:shadow-[0_0_40px_rgba(212,162,78,0.4)]"
            >
              <motion.span
                aria-hidden="true"
                className="text-7xl"
                animate={{ rotate: [-3, 3, -3], y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeInOut",
                }}
              >
                💌
              </motion.span>
              <span className="font-serif text-xl text-gold-light md:text-2xl">
                {config.finalButtonLabel}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              className="gradient-border rounded-3xl bg-plum-light/70 p-7 backdrop-blur md:p-10"
            >
              {config.finalLetter.map((paragraph, i) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.5, duration: 0.8 }}
                  className={`font-serif italic leading-relaxed text-cream/90 md:text-lg ${
                    i === 0 ? "text-gold-light md:text-xl" : "mt-4"
                  } ${i === config.finalLetter.length - 1 ? "text-right text-gold-light" : ""}`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
