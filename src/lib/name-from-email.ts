/**
 * Derive a display name from an email address.
 *
 * Rules (matches user spec):
 *  - Take everything before the "@"
 *  - Strip Gmail-style "+tag" aliases
 *  - Strip trailing digits ("abrarzain10" -> "abrarzain")
 *  - Fall back to "there" if nothing usable remains
 *
 * Examples:
 *   rockstar@gmail.com    -> "rockstar"
 *   abrarzain10@x.com     -> "abrarzain"
 *   user+promo@x.com      -> "user"
 *   123@x.com             -> "there"
 */
export function nameFromEmail(email: string): string {
  if (!email) return "there";
  const local = email.split("@")[0] ?? "";
  const noTag = local.split("+")[0] ?? "";
  const stripped = noTag.replace(/\d+$/, "");
  return stripped.trim() || "there";
}
