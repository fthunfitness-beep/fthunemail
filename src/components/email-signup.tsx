"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionReveal } from "@/components/section-reveal";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error);
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="waitlist" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-xl text-center">
        <SectionReveal>
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            Join Us
          </p>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal tracking-tight text-zinc-200">
            Be Part of the First Drop
          </h2>
          <p className="mt-4 text-sm text-zinc-500">
            We&apos;re building this together. Get early access when Collection 01
            lands, plus behind-the-scenes from the build.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="glass mx-auto mt-10 max-w-md p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-4"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-zinc-800">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">{message}</p>
                  <p className="mt-2 text-xs text-zinc-600">
                    Check your inbox for confirmation
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    size="default"
                    disabled={status === "loading"}
                    className="w-full"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <span>Count Me In</span>
                    )}
                  </Button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-400"
                      >
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
