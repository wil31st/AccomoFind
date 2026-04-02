// Server-side in-memory token store (resets on server restart — fine for MVP)
// Replace with a DB (e.g. Redis, Postgres) for production

interface TokenEntry {
  email: string;
  expires: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __verificationTokens: Map<string, TokenEntry> | undefined;
}

// Persist across HMR reloads in dev
const tokens: Map<string, TokenEntry> =
  global.__verificationTokens ?? (global.__verificationTokens = new Map());

export function createVerificationToken(email: string): string {
  const token = crypto.randomUUID();
  tokens.set(token, { email, expires: Date.now() + 24 * 60 * 60 * 1000 }); // 24 h
  return token;
}

export function consumeVerificationToken(token: string): string | null {
  const entry = tokens.get(token);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    tokens.delete(token);
    return null;
  }
  tokens.delete(token);
  return entry.email;
}
