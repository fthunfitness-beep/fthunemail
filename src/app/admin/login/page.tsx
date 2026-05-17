import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  buildSessionToken,
  isAuthenticated,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const token = await buildSessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, sessionCookieOptions());
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.3em] text-zinc-500">FTHUN</p>
          <h1 className="mt-3 font-serif text-2xl">Admin</h1>
        </div>
        <form action={login} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-none border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
          />
          {hasError && (
            <p className="text-xs text-red-400">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="w-full bg-white py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
