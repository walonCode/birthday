"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";

export default function Poem() {
  return (
    <section aria-labelledby="poem-heading" className="px-6 py-20 md:py-28">
      <SectionHeading id="poem-heading" title={config.poemTitle} emoji="💌" />

      <div className="mx-auto max-w-2xl text-center">
        {config.poemLines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: (i % 4) * 0.12,
              ease: "easeOut",
            }}
            className="font-serif text-xl italic leading-relaxed text-cream/90 md:text-2xl md:leading-loose"
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            delay: 0.3,
          }}
          className="mt-10 text-3xl"
        >
          🌹
        </motion.div>
      </div>
    </section>
  );
}
