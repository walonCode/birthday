"use client";

import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import BackgroundJourney from "@/components/BackgroundJourney";
import BalloonPop from "@/components/BalloonPop";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import BirthdayStats from "@/components/BirthdayStats";
import CakeCandles from "@/components/CakeCandles";
import CursorSparkles from "@/components/CursorSparkles";
import DelightLayer from "@/components/DelightLayer";
import FinalSurprise from "@/components/FinalSurprise";
import Fireworks from "@/components/Fireworks";
import FloatingElements from "@/components/FloatingElements";
import Hero from "@/components/Hero";
import IntroGate from "@/components/IntroGate";
import LoveNotes from "@/components/LoveNotes";
import PhotoGallery from "@/components/PhotoGallery";
import Pinata from "@/components/Pinata";
import Poem from "@/components/Poem";
import Starfield from "@/components/Starfield";
import VideoSection from "@/components/VideoSection";
import WishesWall from "@/components/WishesWall";
import { config } from "@/content/config";
import { fireRevealBurst } from "@/lib/confetti";

// WebGL ambient layer — client-only (needs the browser) and lazy so it never
// blocks first paint. ssr:false is allowed here because this is a Client Component.
const FloatingScene = dynamic(() => import("@/components/FloatingScene"), {
  ssr: false,
});

export default function BirthdayExperience() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    fireRevealBurst();
    setOpened(true);
  };

  return (
    <>
      <AnimatePresence>
        {!opened && <IntroGate key="gate" onOpen={open} />}
      </AnimatePresence>

      {opened && (
        <>
          <BackgroundJourney />
          <FloatingScene />
          <FloatingElements />
          <CursorSparkles />
          <DelightLayer />
          <LoveNotes />
          <main className="relative">
            <Hero />
            <BirthdayCountdown />
            <Poem />
            <PhotoGallery />
            <BalloonPop />
            <VideoSection />
            <WishesWall />
            <BirthdayStats />
            <Pinata />
            <CakeCandles />
            <FinalSurprise />
            <Fireworks />
            <Starfield />
            <footer className="px-6 pb-12 pt-4 text-center text-sm text-cream/50">
              {config.footerText}
            </footer>
          </main>
        </>
      )}
    </>
  );
}
