"use client";

import confetti from "canvas-confetti";

// Warm celebration palette — matches the gold/rose/cream theme tokens.
const COLORS = ["#d4a24e", "#f3d9a4", "#e8788a", "#b83b5e", "#fdf6ec"];

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Multi-origin barrage fired when the surprise gate opens. */
export function fireRevealBurst() {
  if (reducedMotion()) return;

  const bursts: Array<[number, confetti.Options]> = [
    [0, { particleCount: 120, spread: 100, origin: { x: 0.5, y: 0.6 } }],
    [
      180,
      { particleCount: 70, spread: 70, angle: 60, origin: { x: 0, y: 0.7 } },
    ],
    [
      320,
      { particleCount: 70, spread: 70, angle: 120, origin: { x: 1, y: 0.7 } },
    ],
    [
      520,
      {
        particleCount: 90,
        spread: 130,
        startVelocity: 40,
        origin: { x: 0.5, y: 0.4 },
      },
    ],
  ];

  for (const [delay, options] of bursts) {
    setTimeout(() => confetti({ colors: COLORS, ...options }), delay);
  }
}

/** Small localized puff where a candle was blown out (normalized coords). */
export function fireCandleBurst(x: number, y: number) {
  if (reducedMotion()) return;

  confetti({
    particleCount: 30,
    spread: 55,
    startVelocity: 22,
    scalar: 0.8,
    colors: COLORS,
    origin: { x, y },
  });
}

/** Tiny hearts blooming where the visitor taps. */
export function fireTapHearts(x: number, y: number) {
  if (reducedMotion()) return;

  confetti({
    particleCount: 8,
    spread: 60,
    startVelocity: 14,
    gravity: 0.4,
    decay: 0.92,
    scalar: 1.6,
    shapes: [confetti.shapeFromText({ text: "💛", scalar: 1.6 })],
    origin: { x, y },
  });
}

/** Gentle ambient sparkle drifting down from the top edge. */
export function fireAmbientSparkle() {
  if (reducedMotion()) return;

  confetti({
    particleCount: 14,
    spread: 160,
    startVelocity: 8,
    gravity: 0.35,
    decay: 0.96,
    ticks: 400,
    scalar: 0.7,
    colors: COLORS,
    origin: { x: 0.1 + Math.random() * 0.8, y: -0.05 },
  });
}

/** Heart storm for the final letter reveal. */
export function fireHeartStorm() {
  if (reducedMotion()) return;

  const hearts = ["💛", "🩷", "❤️"].map((text) =>
    confetti.shapeFromText({ text, scalar: 2 }),
  );
  for (let i = 0; i < 4; i++) {
    setTimeout(
      () =>
        confetti({
          particleCount: 40,
          spread: 100,
          startVelocity: 35,
          gravity: 0.6,
          decay: 0.93,
          scalar: 2,
          shapes: hearts,
          origin: { x: 0.2 + Math.random() * 0.6, y: 0.6 },
        }),
      i * 350,
    );
  }
}

/** Sharp little pop where a balloon bursts. */
export function fireBalloonPop(x: number, y: number, color: string) {
  if (reducedMotion()) return;

  confetti({
    particleCount: 24,
    spread: 360,
    startVelocity: 18,
    gravity: 0.5,
    decay: 0.9,
    scalar: 0.9,
    colors: [color, "#fdf6ec", "#f3d9a4"],
    origin: { x, y },
  });
}

/** Candy explosion when the piñata finally breaks. */
export function fireCandyBurst() {
  if (reducedMotion()) return;

  const candy = ["🍬", "🍭", "🧁", "🍫"].map((text) =>
    confetti.shapeFromText({ text, scalar: 2 }),
  );
  for (let i = 0; i < 3; i++) {
    setTimeout(
      () =>
        confetti({
          particleCount: 35,
          spread: 110,
          startVelocity: 38,
          gravity: 0.8,
          decay: 0.94,
          scalar: 2,
          shapes: candy,
          origin: { x: 0.35 + Math.random() * 0.3, y: 0.45 },
        }),
      i * 250,
    );
  }
}

/** A staged fireworks show across the top of the sky. */
export function fireFireworksShow(durationMs = 4500) {
  if (reducedMotion()) return;

  const end = Date.now() + durationMs;
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }
    confetti({
      particleCount: 60,
      spread: 360,
      startVelocity: 25,
      gravity: 0.7,
      decay: 0.92,
      ticks: 120,
      scalar: 1,
      colors: COLORS,
      origin: { x: 0.15 + Math.random() * 0.7, y: 0.1 + Math.random() * 0.3 },
    });
  }, 320);
}

/** Big finale when every candle is out. */
export function fireFinaleBurst() {
  if (reducedMotion()) return;

  const end = 5;
  for (let i = 0; i < end; i++) {
    setTimeout(
      () =>
        confetti({
          particleCount: 90,
          spread: 120,
          startVelocity: 45,
          scalar: 1.2,
          shapes: ["circle", "square"],
          colors: COLORS,
          origin: { x: 0.2 + (0.6 * i) / (end - 1), y: 0.55 },
        }),
      i * 220,
    );
  }
}
