import crypto from "node:crypto";

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const candidate = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");
    const original = Buffer.from(hash, "hex");
    if (candidate.length !== original.length) return false;
    return crypto.timingSafeEqual(candidate, original);
  } catch {
    return false;
  }
}
