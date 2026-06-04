import { createClient } from "@supabase/supabase-js";

function cleanEnv(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "");
}

function normalizeSupabaseUrl(value: string | undefined) {
  const cleaned = cleanEnv(value);
  if (!cleaned || cleaned.includes("your-project")) return null;

  const withProtocol = cleaned.startsWith("http")
    ? cleaned
    : `https://${cleaned}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function normalizeSupabaseKey(value: string | undefined) {
  const cleaned = cleanEnv(value);
  if (!cleaned || cleaned.startsWith("your-")) return null;
  return cleaned;
}

function getSupabaseConfig() {
  const url =
    normalizeSupabaseUrl(process.env.SUPABASE_URL) ??
    normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key =
    normalizeSupabaseKey(process.env.SUPABASE_SERVICE_ROLE_KEY) ??
    normalizeSupabaseKey(process.env.SUPABASE_ANON_KEY) ??
    normalizeSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createClient(config.url, config.key);
}

export function requireSupabaseClient() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Missing Supabase config");
  }

  return client;
}
