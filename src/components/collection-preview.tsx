"use client";

import { motion } from "framer-motion";

const drops = [
  {
    title: "Steel Training Tee",
    tag: "Dry-touch jersey",
    images: [
      {
        src: "/sneak-peek/steel-tee-profile.jpg",
        alt: "FTHUN steel training tee side profile",
        position: "50% 34%",
      },
      {
        src: "/sneak-peek/steel-training-lunge.jpg",
        alt: "FTHUN steel tee and training short in motion",
        position: "50% 45%",
      },
    ],
  },
  {
    title: "Ivory Training Tee",
    tag: "Mesh texture",
    images: [
      {
        src: "/sneak-peek/ivory-tee-jogger-full.jpg",
        alt: "FTHUN ivory training tee and jogger fit",
        position: "42% 24%",
      },
      {
        src: "/sneak-peek/ivory-tee-back-detail.jpg",
        alt: "FTHUN ivory tee back neck detail",
        position: "58% 34%",
      },
    ],
  },
  {
    title: "Training Jogger",
    tag: "Zipped pocket",
    images: [
      {
        src: "/sneak-peek/jogger-pocket-detail.jpg",
        alt: "FTHUN jogger pocket and logo detail",
        position: "42% 52%",
      },
      {
        src: "/sneak-peek/ivory-tee-jogger-full.jpg",
        alt: "FTHUN jogger full fit preview",
        position: "50% 58%",
      },
    ],
  },
  {
    title: "2-in-1 Training Short",
    tag: "Layered movement",
    images: [
      {
        src: "/sneak-peek/short-logo-detail.jpg",
        alt: "FTHUN two-in-one short logo detail",
        position: "52% 48%",
      },
      {
        src: "/sneak-peek/steel-tee-short-full.jpg",
        alt: "FTHUN steel tee and training short full fit",
        position: "50% 42%",
      },
    ],
  },
];

export function CollectionPreview() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            Collection 01
          </p>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-tight text-zinc-200">
            What&apos;s Dropping
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-[2px] lg:grid-cols-4">
          {drops.map((drop) => (
            <motion.div
              key={drop.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-zinc-950"
            >
              <div className="absolute inset-0">
                {drop.images.map((image, imageIndex) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="sneak-peek-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      objectPosition: image.position,
                      animationDelay: imageIndex === 0 ? "0s" : "4.4s",
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.72))]" />
              <div className="sneak-peek-grain absolute inset-0 opacity-25 mix-blend-overlay" />
              <div className="absolute inset-x-4 top-4 h-px bg-white/20" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  {drop.tag}
                </p>
                <h3 className="font-display text-base font-normal text-white">
                  {drop.title}
                </h3>
                <p className="mt-2 translate-y-2 text-[9px] font-medium uppercase tracking-[0.1em] text-zinc-500 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  Sneak Peek
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
