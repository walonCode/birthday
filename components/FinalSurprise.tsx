"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireHeartStorm } from "@/lib/confetti";

/** Types the letter out line by line, like it's being written right now. */
function TypewriterLetter({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  const total = lines.reduce((n, l) => n + l.length, 0);
  const [count, setCount] = useState(reduced ? total : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2; // characters per tick
      setCount(i);
      if (i >= total) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [total, reduced]);

  let remaining = count;
  return (
    <>
      {lines.map((line, i) => {
        const shown = Math.max(0, Math.min(line.length, remaining));
        remaining -= line.length;
        const typing = shown > 0 && shown < line.length;
        return (
          <p
            key={line}
            className={`min-h-[1.2em] font-serif italic leading-relaxed text-cream/90 md:text-lg ${
              i === 0 ? "text-gold-light md:text-xl" : "mt-4"
            } ${i === lines.length - 1 ? "text-right text-gold-light" : ""}`}
          >
            {line.slice(0, shown)}
            {typing && (
              <motion.span
                aria-hidden="true"
                className="ml-0.5 inline-block text-gold"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              >
                ▍
              </motion.span>
            )}
          </p>
        );
      })}
    </>
  );
}

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
            <Magnetic key="envelope" strength={0.35}>
              <motion.button
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
                    repeat: Number.POSITIVE_INFINITY,
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
            </Magnetic>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              className="gradient-border w-full rounded-3xl bg-plum-light/70 p-7 backdrop-blur md:p-10"
            >
              <TypewriterLetter lines={config.finalLetter} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
