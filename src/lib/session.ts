/**
 * Edge- and Node-compatible HMAC-SHA256 session token signing and verification.
 */

export interface SessionPayload {
  email: string;
  name: string;
  role: string;
  exp: number;
}

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "alphabreeze-local-session-secret-key"
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Sign a session payload into a compact `<payload>.<signature>` token. */
export async function signSessionToken(
  user: Omit<SessionPayload, "exp">
): Promise<string> {
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await importHmacKey();
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(encodedPayload)
  );
  const encodedSig = toBase64Url(new Uint8Array(sigBuffer));
  return `${encodedPayload}.${encodedSig}`;
}

/** Verify a signed session token and return its payload, or null if invalid/expired. */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token || !token.includes(".")) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, encodedSig] = parts;
  try {
    const key = await importHmacKey();
    const sigBytes = fromBase64Url(encodedSig);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(encodedPayload)
    );
    if (!valid) return null;

    const payloadJson = new TextDecoder().decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadJson) as SessionPayload;
    if (!payload.email || !payload.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
