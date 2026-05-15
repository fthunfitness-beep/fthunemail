"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/section-reveal";

const categories = [
  {
    title: "Performance Tees",
    tag: "Engineered to Move",
    gradient: "from-zinc-800 via-zinc-900 to-zinc-950",
  },
  {
    title: "Training Tanks",
    tag: "No Sleeves No Limits",
    gradient: "from-zinc-700 via-zinc-800 to-zinc-950",
  },
  {
    title: "Training Joggers",
    tag: "Built for the Grind",
    gradient: "from-zinc-800 via-zinc-900 to-zinc-950",
  },
  {
    title: "Training Shorts",
    tag: "Move Without Limits",
    gradient: "from-zinc-700 via-zinc-800 to-zinc-950",
  },
];

export function CollectionPreview() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="mb-12">
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
              Collection 01
            </p>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-tight text-zinc-200">
              The First Drop
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-[2px] lg:grid-cols-4">
          {categories.map((cat, i) => (
            <SectionReveal key={cat.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
              >
                {/* Gradient placeholder for product images */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${cat.gradient}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    {cat.tag}
                  </p>
                  <h3 className="font-display text-base font-normal text-white">
                    {cat.title}
                  </h3>
                  <p className="mt-2 translate-y-2 text-[9px] font-medium uppercase tracking-[0.1em] text-zinc-500 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    Coming Soon
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
