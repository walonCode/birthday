"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { config } from "@/content/config";
import { fireHeartStorm } from "@/lib/confetti";

// The birthday number being celebrated (turns 23 in 2026 → born 2003).
const TURNING_AGE =
  new Date().getFullYear() - new Date(config.birthDate).getFullYear();

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

/** Counts from 0 up to `to` once, easing out. Honors reduced motion. */
function CountUp({ to }: { to: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) return;
    const duration = 1600;
    const startAt = performance.now() + 900; // let the name land first
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / duration));
      setValue(Math.round(to * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, reduced]);

  return <span className="tabular-nums">{value}</span>;
}

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
  const [secret, setSecret] = useState(false);
  const taps = useRef(0);

  // Easter egg: tap her name five times to reveal a hidden note.
  const onNameTap = () => {
    taps.current += 1;
    if (taps.current >= 5) {
      taps.current = 0;
      setSecret(true);
      fireHeartStorm();
    }
  };

  // Auto-dismiss the secret after a few seconds.
  useEffect(() => {
    if (!secret) return;
    const id = window.setTimeout(() => setSecret(false), 6500);
    return () => window.clearTimeout(id);
  }, [secret]);

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

        <motion.div
          variants={item}
          className="mt-7 flex items-center gap-3 rounded-full border border-gold/40 bg-plum-light/50 px-6 py-2.5 backdrop-blur-sm"
        >
          <span aria-hidden="true" className="text-2xl md:text-3xl">
            🎂
          </span>
          <span className="font-serif text-lg text-cream/90 md:text-2xl">
            Happy{" "}
            <span className="text-shimmer font-semibold">
              <CountUp to={TURNING_AGE} />
              {ordinal(TURNING_AGE).replace(String(TURNING_AGE), "")}
            </span>{" "}
            Birthday
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl font-serif text-lg italic text-cream/85 md:text-2xl text-pretty"
        >
          {config.subheadline}
        </motion.p>

        <motion.p
          variants={item}
          onClick={onNameTap}
          className="mt-4 cursor-default select-none text-sm tracking-widest text-gold-light/70 md:text-base"
        >
          {config.name}
        </motion.p>
      </motion.div>

      {/* Easter-egg reveal */}
      <AnimatePresence>
        {secret && (
          <motion.div
            key="secret"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSecret(false)}
            className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-plum/92 p-6 backdrop-blur-sm"
          >
            <motion.p
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="max-w-lg text-center font-serif text-2xl text-cream italic md:text-3xl"
            >
              {config.secretMessage}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

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
