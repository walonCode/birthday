"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Spark = { id: number; x: number; y: number; hue: string };

const HUES = ["#d4a24e", "#f3d9a4", "#e8788a", "#fdf6ec"];

/**
 * A soft gold sparkle trail that follows the cursor. Desktop-only (fine
 * pointer) and disabled for reduced-motion. Non-interactive overlay; each spark
 * drifts up and fades, then removes itself.
 */
export default function CursorSparkles() {
  const reduced = useReducedMotion();
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (reduced) return;
    // Skip touch devices — there's no hovering cursor to trail.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 35) return; // throttle
      lastSpawn.current = now;
      const id = nextId.current++;
      const hue = HUES[id % HUES.length];
      // Small random-ish scatter around the cursor, seeded from id (no hydration
      // concerns — this only ever runs on the client).
      const jitter = (id * 41) % 16;
      const spark: Spark = {
        id,
        x: e.clientX + jitter - 8,
        y: e.clientY + ((id * 29) % 16) - 8,
        hue,
      };
      setSparks((prev) => [...prev.slice(-18), spark]);
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: s.x,
              top: s.y,
              background: s.hue,
              boxShadow: `0 0 8px 2px ${s.hue}`,
            }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2, y: -22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
