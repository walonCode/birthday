"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";

export default function VideoSection() {
  return (
    <section aria-labelledby="videos-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="videos-heading"
        title={config.videosTitle}
        emoji="🎬"
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        {config.videos.map((video, i) => (
          <motion.div
            key={video.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className="gradient-border relative aspect-video overflow-hidden rounded-2xl"
          >
            {video.src ? (
              // biome-ignore lint/a11y/useMediaCaption: personal home videos have no caption tracks
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br ${video.gradient} px-6 text-center`}
              >
                <span aria-hidden="true" className="text-6xl md:text-7xl">
                  {video.emoji}
                </span>
                <p className="font-serif text-lg italic text-cream md:text-xl">
                  {video.title}
                </p>
                <p className="text-xs uppercase tracking-widest text-cream/60">
                  video coming soon
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
