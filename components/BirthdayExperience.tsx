"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import BalloonPop from "@/components/BalloonPop";
import BirthdayStats from "@/components/BirthdayStats";
import CakeCandles from "@/components/CakeCandles";
import DelightLayer from "@/components/DelightLayer";
import FinalSurprise from "@/components/FinalSurprise";
import Fireworks from "@/components/Fireworks";
import FloatingElements from "@/components/FloatingElements";
import Hero from "@/components/Hero";
import IntroGate from "@/components/IntroGate";
import LoveNotes from "@/components/LoveNotes";
import MusicToggle from "@/components/MusicToggle";
import PhotoGallery from "@/components/PhotoGallery";
import Pinata from "@/components/Pinata";
import Poem from "@/components/Poem";
import VideoSection from "@/components/VideoSection";
import WishesWall from "@/components/WishesWall";
import { config } from "@/content/config";
import { fireRevealBurst } from "@/lib/confetti";

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
          <FloatingElements />
          <DelightLayer />
          <LoveNotes />
          <MusicToggle autoPlay />
          <main className="relative">
            <Hero />
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
            <footer className="px-6 pb-12 pt-4 text-center text-sm text-cream/50">
              {config.footerText}
            </footer>
          </main>
        </>
      )}
    </>
  );
}
