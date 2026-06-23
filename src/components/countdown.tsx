"use client";

import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/section-reveal";
import { getLaunchDate } from "@/lib/launch";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeRemaining(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (86400000)),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = getLaunchDate();

    setTime(getTimeRemaining(target));

    const interval = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const blocks: { label: string; value: string }[] = time
    ? [
        { label: "Days", value: pad(time.days) },
        { label: "Hours", value: pad(time.hours) },
        { label: "Minutes", value: pad(time.minutes) },
        { label: "Seconds", value: pad(time.seconds) },
      ]
    : [
        { label: "Days", value: "--" },
        { label: "Hours", value: "--" },
        { label: "Minutes", value: "--" },
        { label: "Seconds", value: "--" },
      ];

  return (
    <section className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <SectionReveal>
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            Forty Days Out
          </p>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-tight text-zinc-200">
            The First Drop Is Being Earned
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
            Forty days to sharpen the fit, the fabric, and the standard.
          </p>
          <div className="mx-auto mt-10 flex max-w-lg justify-center gap-3 sm:gap-6">
            {blocks.map((block) => (
              <div
                key={block.label}
                className="glass flex-1 px-4 py-6 transition-colors duration-300 hover:border-brand/30 sm:px-6 sm:py-8"
              >
                <p className="font-display text-[clamp(1.8rem,4vw,3rem)] font-normal tracking-tight text-white tabular-nums">
                  {block.value}
                </p>
                <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                  {block.label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
