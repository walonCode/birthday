"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";

export default function WishesWall() {
  return (
    <section aria-labelledby="wishes-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="wishes-heading"
        title={config.wishesTitle}
        emoji="💛"
      />

      <div className="mx-auto max-w-5xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {config.wishes.map((wish, i) => (
          <motion.blockquote
            key={wish.from}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: i % 2 === 0 ? -1 : 1,
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: (i % 3) * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="mb-5 break-inside-avoid rounded-2xl border border-gold/25 bg-cream/5 p-5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(212,162,78,0.25)]"
          >
            <span aria-hidden="true" className="mb-2 block text-2xl">
              {wish.emoji}
            </span>
            <p className="font-serif italic leading-relaxed text-cream/90">
              {wish.message}
            </p>
            <footer className="mt-3 text-sm font-medium text-gold-light">
              — {wish.from}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
