"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config, type Photo } from "@/content/config";
import { fireCandleBurst } from "@/lib/confetti";

// Screen-heights of scroll per photo. Lower this if the deck feels too long.
const SCROLL_PER_CARD_VH = 70;

function PhotoContent({ photo, big = false }: { photo: Photo; big?: boolean }) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={big ? "90vw" : "(min-width: 768px) 40vw, 80vw"}
        // Slow cinematic drift on the deck; the lightbox stays still.
        className={`object-cover ${big ? "" : "animate-kenburns"}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${photo.gradient}`}
    >
      <span
        aria-hidden="true"
        className={big ? "text-8xl" : "text-6xl md:text-7xl"}
      >
        {photo.emoji}
      </span>
      <span className="sr-only">{photo.alt}</span>
    </div>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/95 to-transparent px-4 pb-4 pt-12 text-center font-serif text-sm text-cream/90 italic md:text-base">
      {text}
    </span>
  );
}

/** One photo in the scroll-driven deck. The pile is visible: the focused card
 *  sits centered on top while the ones behind it peek out, tilted and scaled
 *  down, for a casual "stack of photos" look. As you scroll, the top card
 *  slides straight up and off (−135% of its height) and the next eases forward
 *  to center. The last card holds so the section never ends on empty space. */
function DeckCard({
  photo,
  index,
  total,
  progress,
  active,
  onOpen,
}: {
  photo: Photo;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  onOpen: () => void;
}) {
  const isLast = index === total - 1;

  // Deterministic per-card tilt/offset direction so the pile looks casually
  // stacked (not a rigid grid) but is identical on every render — no scatter.
  const seed = (s: number) => {
    const v = Math.sin((index + 1) * 12.9898 + s * 78.233) * 43758.5453;
    return (v - Math.floor(v)) * 2 - 1; // -1..1
  };
  const dirX = seed(1);
  const dirY = seed(2);
  const dirR = seed(3);

  // Depth below the top of the pile, straight from scroll: 0 = focused top card,
  // >0 = still stacked behind, <0 = sliding off. The last card can't go below 0
  // so it holds at the end.
  const depth = (p: number) => {
    const u = index - p * total;
    return isLast ? Math.max(u, 0) : u;
  };

  const x = useTransform(progress, (p) => {
    const u = depth(p);
    return u < 0 ? "0%" : `${dirX * 5 * Math.min(u, 3)}%`;
  });
  const y = useTransform(progress, (p) => {
    const u = depth(p);
    // Below 0 the card slides up and off; capped at -135% once fully gone.
    return u < 0
      ? `${-135 * Math.min(1, -u)}%`
      : `${dirY * 4 * Math.min(u, 3)}%`;
  });
  const rotate = useTransform(progress, (p) => {
    const u = depth(p);
    return u < 0 ? 0 : dirR * 4 * Math.min(u, 3);
  });
  const scale = useTransform(
    progress,
    (p) => 1 - 0.05 * Math.max(0, Math.min(depth(p), 3)),
  );
  const opacity = useTransform(progress, (p) => {
    const u = depth(p);
    if (u < 0) return Math.max(0, 1 + u); // fade as it leaves (u: 0→-1)
    return u > 2.6 ? Math.max(0, 1 - (u - 2.6)) : 1; // hide the deepest cards
  });

  return (
    <motion.div
      // Snap to the scroll-driven values on mount instead of animating to them.
      initial={false}
      style={{ x, y, rotate, scale, opacity, zIndex: total - index }}
      className="absolute inset-0"
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={!active}
        aria-hidden={!active}
        tabIndex={active ? 0 : -1}
        aria-label={`View photo: ${photo.alt}`}
        className={`group relative block h-full w-full overflow-hidden rounded-3xl border border-gold/20 transition-shadow duration-300 ${
          active
            ? "gradient-border pointer-events-auto cursor-pointer shadow-[0_0_45px_rgba(212,162,78,0.4)]"
            : "pointer-events-none"
        }`}
      >
        <PhotoContent photo={photo} />
        {photo.caption && <Caption text={photo.caption} />}
      </button>
    </motion.div>
  );
}

function ScrollDeck({ onOpen }: { onOpen: (photo: Photo) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = config.photos.length;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const peakFired = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
    // Sparkle once each time a new card takes focus (no spam scrolling back up).
    if (idx > peakFired.current) {
      peakFired.current = idx;
      fireCandleBurst(0.5, 0.42);
    }
  });

  return (
    <div
      ref={trackRef}
      style={{ height: `${total * SCROLL_PER_CARD_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* Ambient glow behind the deck */}
        <div
          aria-hidden="true"
          className="absolute h-80 w-80 rounded-full bg-gold/15 blur-3xl animate-glow-pulse"
        />
        <div className="relative aspect-[4/5] w-[min(80vw,340px)]">
          {config.photos.map((photo, i) => (
            <DeckCard
              key={photo.alt}
              photo={photo}
              index={i}
              total={total}
              progress={scrollYProgress}
              active={i === activeIndex}
              onOpen={() => onOpen(photo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Accessible, non-pinned fallback for reduced-motion users. */
function GridDeck({ onOpen }: { onOpen: (photo: Photo) => void }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {config.photos.map((photo) => (
        <button
          key={photo.alt}
          type="button"
          onClick={() => onOpen(photo)}
          aria-label={`View photo: ${photo.alt}`}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gold/20 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(212,162,78,0.35)]"
        >
          <PhotoContent photo={photo} />
          {photo.caption && <Caption text={photo.caption} />}
        </button>
      ))}
    </div>
  );
}

/** The enlarged lightbox frame — leans in 3D toward the cursor. */
function TiltFrame({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 12 });
  const sry = useSpring(ry, { stiffness: 150, damping: 12 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="gradient-border relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-video"
    >
      {children}
    </motion.div>
  );
}

export default function PhotoGallery() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<Photo | null>(null);

  // Close the lightbox with Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section aria-labelledby="gallery-heading" className="px-6 pt-20 md:pt-28">
      <SectionHeading
        id="gallery-heading"
        title={config.galleryTitle}
        subtitle={config.gallerySubtitle}
        emoji="📸"
      />

      {reduced ? (
        <GridDeck onOpen={setSelected} />
      ) : (
        <ScrollDeck onOpen={setSelected} />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-plum/90 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.figure
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-2xl"
            >
              <TiltFrame>
                <PhotoContent photo={selected} big />
              </TiltFrame>
              <figcaption className="mt-4 text-center font-serif text-lg text-cream/90 italic">
                {selected.caption ?? selected.alt}
              </figcaption>
              <button
                type="button"
                aria-label="Close photo"
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-plum-light text-cream shadow-lg"
              >
                ✕
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
