"use client";

import { useMemo, useState, useTransition } from "react";
import { Trash2, Search } from "lucide-react";
import { deleteSignupAction } from "./actions";

type Signup = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

export function SignupsTable({ signups }: { signups: Signup[] }) {
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return signups;
    return signups.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.source ?? "").toLowerCase().includes(q),
    );
  }, [signups, query]);

  function handleDelete(id: string, email: string) {
    if (!confirm(`Remove ${email} from the waitlist?`)) return;
    setDeletingId(id);
    startTransition(async () => {
      await deleteSignupAction(id);
      setDeletingId(null);
    });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email or source"
            className="w-full rounded-none border border-zinc-800 bg-zinc-950 py-2 pl-10 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
          />
        </div>
        <p className="text-xs text-zinc-500">
          {filtered.length} of {signups.length}
        </p>
      </div>

      <div className="overflow-hidden border border-zinc-900">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-left text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-normal">Email</th>
              <th className="px-4 py-3 font-normal">Source</th>
              <th className="px-4 py-3 font-normal">Joined</th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-zinc-600">
                  No signups{query ? " match your search" : " yet"}.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-zinc-900 hover:bg-zinc-950/50"
                >
                  <td className="px-4 py-3 font-mono text-xs">{s.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{s.source ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id, s.email)}
                      disabled={pending && deletingId === s.id}
                      aria-label={`Delete ${s.email}`}
                      className="text-zinc-600 transition-colors hover:text-red-400 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
