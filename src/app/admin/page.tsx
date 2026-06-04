import { Download, LogOut } from "lucide-react";
import { requireSupabaseClient } from "@/lib/supabase";
import { logoutAction } from "./actions";
import { SignupsTable } from "./signups-table";
import { BroadcastForm } from "./broadcast-form";

export const dynamic = "force-dynamic";

type Signup = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

type Broadcast = {
  id: string;
  subject: string;
  recipient_count: number;
  sent_at: string;
};

async function getData() {
  const supabase = requireSupabaseClient();
  const [signupsRes, broadcastsRes] = await Promise.all([
    supabase
      .from("waitlist")
      .select("id, email, source, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("broadcasts")
      .select("id, subject, recipient_count, sent_at")
      .order("sent_at", { ascending: false })
      .limit(10),
  ]);

  const signups: Signup[] = signupsRes.data ?? [];
  const broadcasts: Broadcast[] = broadcastsRes.data ?? [];

  const now = Date.now();
  const last24h = signups.filter(
    (s) => now - new Date(s.created_at).getTime() < 24 * 3600 * 1000,
  ).length;
  const last7d = signups.filter(
    (s) => now - new Date(s.created_at).getTime() < 7 * 24 * 3600 * 1000,
  ).length;

  return {
    signups,
    broadcasts,
    stats: { total: signups.length, last24h, last7d },
  };
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-zinc-900 bg-zinc-950 p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 font-serif text-3xl text-white">{value}</p>
    </div>
  );
}

export default async function AdminPage() {
  const { signups, broadcasts, stats } = await getData();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500">FTHUN</p>
            <h1 className="mt-1 font-serif text-xl">Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              className="inline-flex items-center gap-2 border border-zinc-800 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-zinc-900"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-zinc-500 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-6 py-10">
        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total signups" value={stats.total} />
          <StatCard label="Last 24h" value={stats.last24h} />
          <StatCard label="Last 7 days" value={stats.last7d} />
        </section>

        {/* Signups table */}
        <section>
          <h2 className="mb-4 font-serif text-lg">Waitlist</h2>
          <SignupsTable signups={signups} />
        </section>

        {/* Broadcast composer */}
        <section>
          <h2 className="mb-1 font-serif text-lg">Broadcast email</h2>
          <p className="mb-4 text-xs text-zinc-500">
            Sends from{" "}
            <span className="font-mono text-zinc-400">noreply@fthun.xyz</span>{" "}
            to every subscriber. Use sparingly — Resend free tier is 100/day,
            3,000/month.
          </p>
          <BroadcastForm subscriberCount={stats.total} />
        </section>

        {/* Broadcast history */}
        <section>
          <h2 className="mb-4 font-serif text-lg">Recent broadcasts</h2>
          {broadcasts.length === 0 ? (
            <p className="text-sm text-zinc-600">No broadcasts sent yet.</p>
          ) : (
            <div className="overflow-hidden border border-zinc-900">
              <table className="w-full text-sm">
                <thead className="bg-zinc-950 text-left text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-normal">Subject</th>
                    <th className="px-4 py-3 font-normal">Recipients</th>
                    <th className="px-4 py-3 font-normal">Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {broadcasts.map((b) => (
                    <tr key={b.id} className="border-t border-zinc-900">
                      <td className="px-4 py-3">{b.subject}</td>
                      <td className="px-4 py-3 text-zinc-400">
                        {b.recipient_count}
                      </td>
                      <td className="px-4 py-3 text-zinc-400">
                        {new Date(b.sent_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
