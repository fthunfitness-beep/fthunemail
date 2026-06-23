"use client";

import { SectionReveal } from "@/components/section-reveal";

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden px-6 py-32 lg:px-8 lg:py-48">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <p className="mb-8 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            The Movement
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-normal leading-[1.1] tracking-tight text-zinc-200">
            Not made for the mirror.
            <br className="hidden sm:block" />
            Made for the days
            <br className="hidden sm:block" />
            you refuse to quit.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-zinc-500">
            FTHUN is built for the unfinished set, the slow comeback, and the
            session nobody sees. Made in Pakistan for movement that keeps going
            after motivation leaves.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
