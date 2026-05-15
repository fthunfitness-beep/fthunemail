"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-noise">
      {/* Cinematic background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950" />
        <div className="spotlight absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,120,120,0.06),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-24 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600"
          >
            Collection 01 — Coming Soon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.9] tracking-tight"
          >
            <span className="text-gradient">The Drop</span>
            <br />
            <span className="text-gradient">Is Coming</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500"
          >
            Performance wear engineered for the grind. Designed in Pakistan.
            No fluff. Pure function.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10"
          >
            <Button size="lg" asChild>
              <a href="#waitlist">
                <span>Get Early Access</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-zinc-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}
