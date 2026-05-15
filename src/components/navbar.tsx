"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="/"
          className="font-display text-lg tracking-[0.2em] text-white"
        >
          FTHUN
        </a>
        <a
          href="#waitlist"
          className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:text-white"
        >
          Join Waitlist
        </a>
      </div>
    </motion.nav>
  );
}
