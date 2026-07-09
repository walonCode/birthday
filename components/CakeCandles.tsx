"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { config } from "@/content/config";
import { fireCandleBurst, fireFinaleBurst } from "@/lib/confetti";

export default function CakeCandles() {
  const [lit, setLit] = useState<boolean[]>(() =>
    Array(config.candleCount).fill(true),
  );
  const allOut = lit.every((l) => !l);

  const blowOut = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!lit[index]) return;

    fireCandleBurst(
      e.clientX / window.innerWidth,
      e.clientY / window.innerHeight,
    );

    const next = lit.map((l, i) => (i === index ? false : l));
    setLit(next);
    if (next.every((l) => !l)) {
      setTimeout(fireFinaleBurst, 350);
    }
  };

  const relight = () => setLit(Array(config.candleCount).fill(true));

  return (
    <section aria-labelledby="cake-heading" className="px-6 py-20 md:py-28">
      <SectionHeading
        id="cake-heading"
        title={config.cakeTitle}
        subtitle={config.cakeSubtitle}
        emoji="✨"
      />

      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Candles */}
        <div className="z-10 flex items-end gap-4 sm:gap-6">
          {lit.map((isLit, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: candles are positional and never reorder
              key={i}
              type="button"
              onClick={(e) => blowOut(i, e)}
              disabled={!isLit}
              aria-label={
                isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`
              }
              className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {/* Flame / smoke */}
              <span className="relative flex h-8 w-6 items-end justify-center">
                <AnimatePresence>
                  {isLit ? (
                    <motion.span
                      key="flame"
                      exit={{ opacity: 0, scale: 0.2, y: -14 }}
                      transition={{ duration: 0.35 }}
                      className="block h-5 w-3.5 rounded-full bg-gradient-to-t from-gold via-amber-300 to-yellow-100 animate-flicker shadow-[0_0_16px_6px_rgba(243,217,164,0.45)]"
                    />
                  ) : (
                    <motion.span
                      key="smoke"
                      initial={{ opacity: 0.9, y: 0 }}
                      animate={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1.2 }}
                      className="text-sm"
                      aria-hidden="true"
                    >
                      💨
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {/* Candle body */}
              <span
                className={`block h-12 w-2.5 rounded-sm bg-[repeating-linear-gradient(45deg,#e8788a_0px,#e8788a_5px,#fdf6ec_5px,#fdf6ec_10px)] transition-opacity sm:h-14 ${
                  isLit ? "" : "opacity-60"
                } group-active:translate-y-px`}
              />
            </button>
          ))}
        </div>

        {/* Cake */}
        <div aria-hidden="true" className="flex w-full flex-col items-center">
          <div className="-mt-1 h-14 w-3/5 rounded-t-2xl border-t-4 border-gold-light/80 bg-gradient-to-b from-rose to-rose-deep sm:h-16" />
          <div className="h-16 w-4/5 rounded-t-xl border-t-4 border-gold-light/80 bg-gradient-to-b from-cream/90 to-gold-light/70 sm:h-20" />
          <div className="h-3 w-[95%] rounded-full bg-plum-light shadow-[0_10px_30px_rgba(212,162,78,0.2)]" />
        </div>

        {/* Finale message */}
        <div className="mt-10 flex min-h-24 flex-col items-center justify-start text-center">
          <AnimatePresence>
            {allOut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="font-serif text-2xl italic text-gold-light md:text-3xl text-balance">
                  {config.cakeDoneMessage}
                </p>
                <button
                  type="button"
                  onClick={relight}
                  className="btn-shimmer rounded-full border border-gold/40 bg-plum-light/80 px-5 py-2 text-sm text-cream/90 backdrop-blur transition-shadow hover:shadow-[0_0_25px_rgba(212,162,78,0.4)] active:translate-y-px"
                >
                  {config.relightLabel} 🕯️
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
