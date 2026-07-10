"use client";

import { motion, useScroll, useTransform } from "motion/react";

/**
 * A fixed backdrop whose hue warms as you scroll — deep plum night at the top,
 * drifting toward warm ember by the finale. Stops stay dark so cream text keeps
 * its contrast; the shift is felt more than seen, tying every section together.
 * Sits behind the 3D layer (-z-20 < FloatingScene's -z-10).
 */
export default function BackgroundJourney() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["#1d1023", "#241026", "#2a1220", "#2b1a17"],
  );
  const glow = useTransform(scrollYProgress, [0, 1], [0.12, 0.4]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ backgroundColor: background }}
      className="pointer-events-none fixed inset-0 -z-20"
    >
      {/* Warm light rising from below, brightening toward the end */}
      <motion.div
        style={{ opacity: glow }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/25 to-transparent"
      />
    </motion.div>
  );
}
