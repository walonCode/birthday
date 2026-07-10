"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { config } from "@/content/config";

/** This year's birthday at midnight, from the month/day of `birthDate`. */
function targetMs() {
  const b = new Date(config.birthDate);
  const now = new Date();
  return new Date(now.getFullYear(), b.getMonth(), b.getDate()).getTime();
}

function Tile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center gap-1 rounded-2xl border border-gold/25 bg-cream/5 px-4 py-3 backdrop-blur-sm md:min-w-[5.5rem]">
      <span className="font-serif text-3xl text-gold-light tabular-nums md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[0.65rem] uppercase tracking-widest text-cream/60">
        {label}
      </span>
    </div>
  );
}

export default function BirthdayCountdown() {
  // Null until mounted so server and first client paint agree (no clock flash).
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(targetMs() - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (ms === null) return null;

  const celebrating = ms <= 0;
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86_400);
  const hours = Math.floor((s % 86_400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  return (
    <section
      aria-label="Birthday countdown"
      className="flex flex-col items-center px-6 py-12 text-center md:py-16"
    >
      {celebrating ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="text-shimmer font-serif text-3xl md:text-5xl"
        >
          {config.countdownCelebrate}
        </motion.p>
      ) : (
        <>
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-gold-light/80">
            {config.countdownLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Tile value={days} label={days === 1 ? "day" : "days"} />
            <Tile value={hours} label="hrs" />
            <Tile value={mins} label="min" />
            <Tile value={secs} label="sec" />
          </div>
        </>
      )}
    </section>
  );
}
