"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { config } from "@/content/config";

const SHOW_MS = 4200;
const GAP_MS = 9000;
const FIRST_DELAY_MS = 6000;

/** Sweet little notes that pop in from the corner while the visitor scrolls. */
export default function LoveNotes() {
  const reduced = useReducedMotion();
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;

    let index = 0;
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      setNote(config.loveNotes[index % config.loveNotes.length]);
      index++;
      hideTimer = setTimeout(() => setNote(null), SHOW_MS);
    };

    const first = setTimeout(show, FIRST_DELAY_MS);
    const loop = setInterval(show, SHOW_MS + GAP_MS);

    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, [reduced]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-4 z-40 max-w-[70vw] sm:max-w-xs"
    >
      <AnimatePresence>
        {note && (
          <motion.p
            key={note}
            initial={{ opacity: 0, y: 24, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="rounded-2xl rounded-bl-sm border border-gold/30 bg-plum-light/90 px-4 py-3 font-serif text-sm italic text-cream/90 shadow-[0_0_25px_rgba(212,162,78,0.25)] backdrop-blur md:text-base"
          >
            {note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
