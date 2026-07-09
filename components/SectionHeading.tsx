"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  id,
  title,
  subtitle,
  emoji,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  emoji?: string;
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {emoji && (
        <span aria-hidden="true" className="mb-3 block text-3xl md:text-4xl">
          {emoji}
        </span>
      )}
      <h2
        id={id}
        className="font-serif text-3xl text-gold-light md:text-5xl text-balance"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-cream/70 md:text-base">{subtitle}</p>
      )}
      <div
        aria-hidden="true"
        className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </motion.div>
  );
}
