"use client";

import { SectionReveal } from "@/components/section-reveal";

export function BrandStatement() {
  return (
    <section className="relative px-6 py-32 lg:px-8 lg:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <p className="mb-8 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            The Movement
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-normal leading-[1.1] tracking-tight text-zinc-200">
            We&apos;re not selling a look.
            <br className="hidden sm:block" />
            We&apos;re building something
            <br className="hidden sm:block" />
            for everyone who shows up.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-zinc-500">
            For the 5AM sessions. The slow comebacks. The long runs nobody sees.
            Made in Pakistan, made for the long haul — and made with you in mind.
            You&apos;re not just buying kit. You&apos;re joining the run.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
