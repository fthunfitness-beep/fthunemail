"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">
      {/* Full-screen video background — contain so nothing is cropped */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Minimal bottom-gradient overlay — keeps video readable but lets it breathe */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Content — sits as a slim strip across the bottom */}
      <div className="relative z-10 w-full px-6 pb-10 lg:px-8 lg:pb-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-brand"
            >
              FTHUN · Collection 01
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
            >
              For the rep you almost skipped.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="shrink-0"
          >
            <Button size="lg" asChild>
              <a href="#waitlist">
                <span>Get Early Access</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Sound toggle (browsers block autoplay-with-sound, so user has to tap) */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-6 top-20 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 lg:right-8"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
