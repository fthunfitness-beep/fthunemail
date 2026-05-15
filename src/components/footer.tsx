"use client";

import { SectionReveal } from "@/components/section-reveal";

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <p className="font-display text-lg tracking-[0.2em] text-white">
              FTHUN
            </p>
            <p className="mt-3 text-xs text-zinc-600">
              Made in Pakistan. Made for the movement.
            </p>

            {/* Social */}
            <div className="mt-8 flex gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-12 h-px w-full max-w-xs bg-zinc-900" />

            {/* Legal */}
            <div className="mt-8 flex gap-6">
              <a
                href="#"
                className="text-[10px] text-zinc-700 transition-colors hover:text-zinc-400"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-[10px] text-zinc-700 transition-colors hover:text-zinc-400"
              >
                Terms
              </a>
            </div>

            <p className="mt-6 text-[10px] text-zinc-800">
              &copy; {new Date().getFullYear()} FTHUN. All rights reserved.
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}
