"use client";

import { motion } from "framer-motion";

const drops = [
  {
    title: "Training Tee + Short",
    tag: "Opening Signal",
    src: "/sneak-peek/final-black-short-tee.png",
    alt: "FTHUN black training tee and short teaser",
  },
  {
    title: "Training Trouser",
    tag: "Built to Move",
    src: "/sneak-peek/final-trouser-teaser.png",
    alt: "FTHUN training trouser pocket and logo teaser",
  },
  {
    title: "Ivory Training Tee",
    tag: "Next Opening",
    src: "/sneak-peek/final-ivory-tee-teaser.png",
    alt: "FTHUN ivory training tee teaser",
  },
  {
    title: "2-in-1 Training Short",
    tag: "Range Without Drag",
    src: "/sneak-peek/final-short-teaser.png",
    alt: "FTHUN two-in-one training short teaser",
  },
];

export function CollectionPreview() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
              Collection 01
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-tight text-zinc-200">
              What&apos;s Dropping
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-[10px] uppercase leading-5 tracking-[0.18em] text-zinc-600 sm:block">
            Four forms. One opening.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {drops.map((drop, index) => (
            <motion.div
              key={drop.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-white/[0.06] bg-zinc-950"
            >
              <div className="absolute inset-0">
                <img
                  src={drop.src}
                  alt={drop.alt}
                  loading="lazy"
                  decoding="async"
                  className="sneak-peek-image absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28),transparent_28%,transparent_72%,rgba(0,0,0,0.36))]" />
              <div className="sneak-peek-grain absolute inset-0 opacity-15 mix-blend-overlay" />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between border-t border-white/15 pt-3">
                <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                  0{index + 1}
                </p>
                <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  {drop.tag}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="font-display text-sm font-normal text-white">
                  {drop.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
