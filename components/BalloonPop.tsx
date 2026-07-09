"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireBalloonPop } from "@/lib/confetti";

export default function BalloonPop() {
  const [popped, setPopped] = useState<boolean[]>(() =>
    Array(config.balloons.length).fill(false),
  );

  const pop = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (popped[i]) return;
    fireBalloonPop(
      e.clientX / window.innerWidth,
      e.clientY / window.innerHeight,
      config.balloons[i].color,
    );
    setPopped((prev) => prev.map((p, j) => (j === i ? true : p)));
  };

  return (
    <section aria-labelledby="balloons-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="balloons-heading"
        title={config.balloonsTitle}
        subtitle={config.balloonsSubtitle}
        emoji="🎈"
      />

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
        {config.balloons.map((balloon, i) => (
          <motion.div
            key={balloon.message}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.15 }}
            className="flex min-h-40 items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {!popped[i] ? (
                <motion.button
                  key="balloon"
                  type="button"
                  onClick={(e) => pop(i, e)}
                  aria-label={`Pop balloon ${i + 1}`}
                  exit={{
                    scale: 1.5,
                    opacity: 0,
                    transition: { duration: 0.15 },
                  }}
                  animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (i % 3),
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative cursor-pointer"
                >
                  {/* Balloon body */}
                  <span
                    className="block h-24 w-20 rounded-full shadow-[inset_-8px_-10px_20px_rgba(0,0,0,0.25),inset_8px_10px_20px_rgba(255,255,255,0.25)] sm:h-28 sm:w-24"
                    style={{ backgroundColor: balloon.color }}
                  />
                  {/* Knot + string */}
                  <span
                    className="mx-auto block h-3 w-3 [clip-path:polygon(50%_0,0_100%,100%_100%)]"
                    style={{ backgroundColor: balloon.color }}
                  />
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-10 w-px bg-cream/40"
                  />
                </motion.button>
              ) : (
                <motion.p
                  key="message"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="rounded-2xl border border-gold/25 bg-cream/5 p-4 text-center font-serif text-sm italic text-cream/90 backdrop-blur-sm md:text-base"
                >
                  {balloon.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
