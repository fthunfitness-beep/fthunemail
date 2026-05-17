"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { sendBroadcastAction } from "./actions";

export function BroadcastForm({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    kind: "ok" | "err";
    message: string;
  } | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !confirm(
        `Send this email to ${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}? This cannot be undone.`,
      )
    ) {
      return;
    }
    const fd = new FormData();
    fd.set("subject", subject);
    fd.set("html", html);
    setResult(null);
    startTransition(async () => {
      const res = await sendBroadcastAction(fd);
      if (res?.error) {
        setResult({ kind: "err", message: res.error });
      } else {
        setResult({
          kind: "ok",
          message: `Sent to ${res?.sent ?? 0} of ${res?.total ?? 0}. ${res?.failures ? `${res.failures} failed.` : ""}`,
        });
        setSubject("");
        setHtml("");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Collection 01 drops Friday"
          required
          className="w-full rounded-none border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
          Body (HTML supported)
        </label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={10}
          placeholder="<p>Plain text works fine. Or paste any HTML.</p>"
          required
          className="w-full rounded-none border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-xs text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
        />
      </div>
      {result && (
        <p
          className={`text-xs ${result.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}
        >
          {result.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending || !subject.trim() || !html.trim()}
        className="inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        <Send className="h-3.5 w-3.5" />
        {pending ? "Sending…" : `Send to ${subscriberCount}`}
      </button>
    </form>
  );
}
