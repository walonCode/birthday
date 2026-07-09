"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config, type Photo } from "@/content/config";

function PhotoContent({ photo, big = false }: { photo: Photo; big?: boolean }) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={big ? "90vw" : "(min-width: 768px) 33vw, 50vw"}
        className="object-cover"
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${photo.gradient}`}
    >
      <span
        aria-hidden="true"
        className={big ? "text-8xl" : "text-5xl md:text-6xl"}
      >
        {photo.emoji}
      </span>
      <span className="sr-only">{photo.alt}</span>
    </div>
  );
}

export default function PhotoGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  // Close the lightbox with Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section aria-labelledby="gallery-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="gallery-heading"
        title={config.galleryTitle}
        subtitle={config.gallerySubtitle}
        emoji="📸"
      />

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {config.photos.map((photo, i) => (
          <motion.button
            key={photo.alt}
            type="button"
            onClick={() => setSelected(photo)}
            aria-label={`View photo: ${photo.alt}`}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: (i % 3) * 0.12,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.04,
              rotate: i % 2 === 0 ? 1 : -1,
              transition: { type: "spring", stiffness: 260, damping: 18 },
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-gold/20 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(212,162,78,0.35)]"
          >
            <PhotoContent photo={photo} />

            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-plum/90 to-transparent px-3 pb-2 pt-8 text-xs text-cream/90 transition-transform duration-300 group-hover:translate-y-0 md:text-sm">
                {photo.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

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
              <div className="gradient-border relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-video">
                <PhotoContent photo={selected} big />
              </div>
              <figcaption className="mt-4 text-center font-serif text-lg italic text-cream/90">
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
