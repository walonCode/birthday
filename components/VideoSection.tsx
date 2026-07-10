"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config, type Video } from "@/content/config";
import { fireCandleBurst } from "@/lib/confetti";

// Each clip ships a lightweight webp poster alongside it (public/videos/*.webp).
const posterFor = (src?: string) => src?.replace(/\.(mp4|webm|mov)$/i, ".webp");

// A strip of marquee bulbs across the top of the proscenium.
const BULBS = Array.from({ length: 18 });

// Velvet, with vertical pleats and depth shading toward the center seam.
const VELVET =
  "repeating-linear-gradient(90deg, #5c1626 0px, #7a2038 7px, #45101f 15px)";

// Film-strip sprocket perforations.
const PERFS =
  "repeating-linear-gradient(90deg, transparent 0 9px, rgba(243,217,164,0.45) 9px 15px)";

function Perforations() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full rounded-sm"
      style={{ backgroundImage: PERFS }}
    />
  );
}

/** One frame in the film strip — click to load it onto the main screen. */
function FilmFrame({
  video,
  active,
  onSelect,
}: {
  video: Video;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Play: ${video.title}`}
      aria-pressed={active}
      className={`group relative aspect-video w-full overflow-hidden rounded-md border transition-all duration-300 ${
        active
          ? "border-gold opacity-100 shadow-[0_0_18px_rgba(212,162,78,0.65)]"
          : "border-gold/20 opacity-60 hover:opacity-90"
      }`}
    >
      {video.src ? (
        <Image
          src={posterFor(video.src) ?? ""}
          alt=""
          fill
          sizes="(min-width: 768px) 230px, 30vw"
          className="object-cover"
        />
      ) : (
        <div className={`h-full w-full bg-gradient-to-br ${video.gradient}`} />
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-plum/30 text-cream text-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        ▶
      </span>
    </button>
  );
}

export default function VideoSection() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const sparkled = useRef(false);

  // Curtains part as the stage scrolls up into the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start center"],
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-102%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "102%"]);
  const spill = useTransform(scrollYProgress, [0, 1], [0.1, 0.55]);

  // The moment the curtains finish parting: open the stage + a "ta-da" sparkle.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.96 && !sparkled.current) {
      sparkled.current = true;
      setOpened(true);
      fireCandleBurst(0.5, 0.55);
    }
  });

  // Reduced-motion users have no curtains, so the stage is open from the start.
  useEffect(() => {
    if (reduced) setOpened(true);
  }, [reduced]);

  // Bring the featured clip to life (muted) once the stage is open, and whenever
  // she picks a different clip from the strip (which remounts the <video>).
  // biome-ignore lint/correctness/useExhaustiveDependencies: replay on clip switch (active)
  useEffect(() => {
    const v = videoRef.current;
    if (v && opened) v.play().catch(() => {});
  }, [opened, active]);

  const activeVideo = config.videos[active];

  return (
    <section aria-labelledby="videos-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="videos-heading"
        title={config.videosTitle}
        emoji="🎬"
      />

      <div ref={stageRef} className="relative mx-auto max-w-3xl">
        {/* Marquee bulbs along the top of the frame */}
        <div className="pointer-events-none absolute -top-2 right-3 left-3 z-30 flex justify-between">
          {BULBS.map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative strip
              key={i}
              className="h-2 w-2 rounded-full bg-gold-light shadow-[0_0_8px_2px_rgba(212,162,78,0.7)] animate-glow-pulse"
              style={{ animationDelay: `${(i % 6) * 0.18}s` }}
            />
          ))}
        </div>

        {/* Proscenium: clips the curtains as they slide off behind the frame */}
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-plum-light/25 p-4 md:p-6">
          {/* Warm light spilling from the stage, brightening as it opens */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: reduced ? 0.4 : spill }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute top-1/2 left-1/2 h-[65%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-3xl" />
          </motion.div>

          {/* The stage: one cinema screen + a film-strip selector */}
          <div className="relative z-10">
            <p className="mb-3 text-center text-[0.7rem] uppercase tracking-[0.3em] text-cream/70">
              <span className="text-gold">Now Showing</span>
              <span className="mx-2 text-gold/40">·</span>
              <span className="font-serif text-sm text-cream/90 normal-case italic tracking-normal">
                {activeVideo.title}
              </span>
            </p>

            {/* Featured screen */}
            <div className="gradient-border relative aspect-video w-full overflow-hidden rounded-2xl bg-plum shadow-[0_0_50px_rgba(212,162,78,0.3)]">
              {activeVideo.src ? (
                <video
                  ref={videoRef}
                  key={active}
                  src={activeVideo.src}
                  poster={posterFor(activeVideo.src)}
                  loop
                  playsInline
                  muted={muted}
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br ${activeVideo.gradient} px-6 text-center`}
                >
                  <span aria-hidden="true" className="text-6xl md:text-7xl">
                    {activeVideo.emoji}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-cream/60">
                    video coming soon
                  </p>
                </div>
              )}

              {/* Tap-to-unmute — shown while the reveal is playing silently */}
              {activeVideo.src && muted && (
                <button
                  type="button"
                  onClick={() => {
                    setMuted(false);
                    videoRef.current?.play().catch(() => {});
                  }}
                  className="absolute top-3 right-3 rounded-full border border-gold/40 bg-plum/80 px-3 py-1.5 text-cream text-xs shadow-lg backdrop-blur-sm transition-colors hover:bg-plum-light"
                >
                  🔇 Tap to unmute
                </button>
              )}
            </div>

            {/* Film strip */}
            <div className="mt-4 rounded-lg border border-gold/15 bg-black/50 px-3 py-2">
              <Perforations />
              <div className="my-2 grid grid-cols-3 gap-2">
                {config.videos.map((video, i) => (
                  <FilmFrame
                    key={video.title}
                    video={video}
                    active={i === active}
                    onSelect={() => setActive(i)}
                  />
                ))}
              </div>
              <Perforations />
            </div>
          </div>

          {/* Velvet curtains (skipped for reduced-motion — stage shown open) */}
          {!reduced && (
            <>
              <motion.div
                aria-hidden="true"
                style={{
                  x: leftX,
                  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.3), transparent 35%, rgba(0,0,0,0.5)), ${VELVET}`,
                }}
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[52%] border-gold/30 border-r shadow-2xl"
              />
              <motion.div
                aria-hidden="true"
                style={{
                  x: rightX,
                  backgroundImage: `linear-gradient(270deg, rgba(0,0,0,0.3), transparent 35%, rgba(0,0,0,0.5)), ${VELVET}`,
                }}
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[52%] border-gold/30 border-l shadow-2xl"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
