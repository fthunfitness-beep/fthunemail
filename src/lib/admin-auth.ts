import { cookies } from "next/headers";

// HMAC-signed session cookie. The password itself is the HMAC key, so
// rotating ADMIN_PASSWORD invalidates every existing session.

export const ADMIN_COOKIE = "fthun_admin";
const COOKIE_VALUE = "ok";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("Missing ADMIN_PASSWORD env var");
  }
  return secret;
}

async function hmac(key: string, value: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(value));
  const bytes = new Uint8Array(sig);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export async function buildSessionToken(): Promise<string> {
  const sig = await hmac(getSecret(), COOKIE_VALUE);
  return `${COOKIE_VALUE}.${sig}`;
}

export async function isValidSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const value = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (value !== COOKIE_VALUE) return false;
  let expected: string;
  try {
    expected = await hmac(getSecret(), value);
  } catch {
    return false;
  }
  if (expected.length !== sig.length) return false;
  // timing-safe compare
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyPassword(submitted: string): boolean {
  const expected = getSecret();
  if (submitted.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ submitted.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return isValidSessionToken(token);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
