"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";

function Counter({
  target,
  label,
  emoji,
}: {
  target: number;
  label: string;
  emoji: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3; // easeOutCubic
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-gold/25 bg-cream/5 p-6 text-center backdrop-blur-sm"
    >
      <span aria-hidden="true" className="text-3xl">
        {emoji}
      </span>
      <span className="font-serif text-3xl text-gold-light tabular-nums md:text-4xl">
        {value.toLocaleString()}
      </span>
      <span className="text-cream/70 text-sm">{label}</span>
    </motion.div>
  );
}

export default function BirthdayStats() {
  // Computed client-side so the numbers are current on the day it's viewed
  const [stats, setStats] = useState<
    { target: number; label: string; emoji: string }[] | null
  >(null);

  useEffect(() => {
    const days = Math.floor(
      (Date.now() - new Date(config.birthDate).getTime()) / 86_400_000,
    );
    setStats([
      {
        target: Math.floor(days / 365.25),
        label: "trips around the sun",
        emoji: "🌞",
      },
      { target: days, label: "days of making the world brighter", emoji: "🌍" },
      {
        target: Math.floor(days / 29.53),
        label: "full moons watched over you",
        emoji: "🌕",
      },
      {
        target: days * 115_200,
        label: "heartbeats — every one a gift",
        emoji: "💓",
      },
    ]);
  }, []);

  if (!stats) return null;

  return (
    <section aria-labelledby="stats-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="stats-heading"
        title={config.statsTitle}
        subtitle={config.statsSubtitle}
        emoji="🧮"
      />

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {stats.map((stat) => (
          <Counter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
