"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { config } from "@/content/config";

export default function MusicToggle({
  autoPlay = false,
}: {
  autoPlay?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const song = config.songs[track];

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 2500);
  };

  const play = (announce = true) => {
    audioRef.current
      ?.play()
      .then(() => {
        setPlaying(true);
        if (announce) showToast(`🎶 ${config.songs[track].title}`);
      })
      .catch(() => {
        // Missing file or autoplay blocked — never crash.
        showToast("Music unavailable 🎶");
      });
  };

  // Start the song right after the gift is opened — the gate tap counts as
  // the user gesture browsers require. Fail silently if blocked.
  useEffect(() => {
    if (!autoPlay) return;
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, [autoPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    play();
  };

  const nextTrack = () => {
    const next = (track + 1) % config.songs.length;
    setTrack(next);
    showToast(`🎶 ${config.songs[next].title}`);
    // src change needs a tick before play()
    requestAnimationFrame(() => {
      audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    });
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: background music, no dialogue */}
      <audio ref={audioRef} src={song.src} preload="none" onEnded={nextTrack} />

      <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-60 truncate rounded-full border border-gold/30 bg-plum-light/90 px-3 py-1 text-cream/80 text-xs backdrop-blur"
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {playing && config.songs.length > 1 && (
              <motion.button
                type="button"
                onClick={nextTrack}
                aria-label="Next song"
                initial={{ opacity: 0, scale: 0.5, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 10 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9, y: 2 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-plum-light/80 text-sm shadow-[0_0_15px_rgba(212,162,78,0.2)] backdrop-blur"
              >
                ⏭️
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggle}
            aria-label={
              playing ? "Pause background music" : "Play background music"
            }
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9, y: 2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-plum-light/80 text-xl shadow-[0_0_20px_rgba(212,162,78,0.3)] backdrop-blur transition-shadow hover:shadow-[0_0_30px_rgba(212,162,78,0.5)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={playing ? "on" : "off"}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {playing ? "🎵" : "🔇"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  );
}
