const AUTH_SECRET = process.env.AUTH_SECRET || "noor-academy-secure-session-key-2026-secret";

export interface SessionPayload {
  userId: string;
  email: string;
  role: "student" | "teacher" | "parent" | "admin";
  fullName: string;
  expiresAt: number;
}

function base64UrlEncode(bytes: Uint8Array | ArrayBuffer): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) {
    binary += String.fromCharCode(arr[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const enc = new TextEncoder();
  const payloadEncoded = base64UrlEncode(enc.encode(JSON.stringify(payload)));
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payloadEncoded));
  return `${payloadEncoded}.${base64UrlEncode(signature)}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadEncoded, signatureEncoded] = parts;
    const key = await getHmacKey();
    const enc = new TextEncoder();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      Uint8Array.from(base64UrlDecode(signatureEncoded)),
      enc.encode(payloadEncoded)
    );

    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadEncoded))) as SessionPayload;
    return payload.expiresAt < Date.now() ? null : payload;
  } catch {
    return null;
  }
}
