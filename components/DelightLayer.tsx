"use client";

import { useEffect } from "react";
import { fireAmbientSparkle, fireTapHearts } from "@/lib/confetti";

const SPARKLE_EVERY_MS = 11000;

/**
 * Invisible layer of pure delight:
 * - tap/click anywhere → little hearts bloom at your fingertip
 * - every so often, gold sparkles drift down from the top
 * (both are no-ops under prefers-reduced-motion — guarded in lib/confetti)
 */
export default function DelightLayer() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      fireTapHearts(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
    };

    window.addEventListener("pointerdown", onPointerDown);
    const sparkle = setInterval(fireAmbientSparkle, SPARKLE_EVERY_MS);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      clearInterval(sparkle);
    };
  }, []);

  return null;
}
