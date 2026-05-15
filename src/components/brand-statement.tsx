"use client";

import { SectionReveal } from "@/components/section-reveal";

export function BrandStatement() {
  return (
    <section className="relative px-6 py-32 lg:px-8 lg:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <p className="mb-8 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            The Philosophy
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-normal leading-[1.1] tracking-tight text-zinc-200">
            We don&apos;t make athleisure.
            <br className="hidden sm:block" />
            We engineer performance wear
            <br className="hidden sm:block" />
            for people who show up.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-zinc-600">
            Every thread, every seam — built for the 5AM sessions, the cold
            mornings, the extra reps nobody sees. Designed in Pakistan. Tested
            in the gym.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
