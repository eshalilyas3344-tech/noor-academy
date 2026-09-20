import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running admin:create.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("ADMIN_PASSWORD must be at least 12 characters long.");
  process.exit(1);
}

const dbDir = path.join(process.cwd(), ".data");
fs.mkdirSync(dbDir, { recursive: true });
const db = new DatabaseSync(path.join(dbDir, "noor_academy.db"));
db.exec(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, salt TEXT NOT NULL, role TEXT NOT NULL, full_name TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);`);
const existing = db.prepare("SELECT role FROM users WHERE email = ?").get(email) as { role: string } | undefined;
if (existing) {
  if (existing.role !== "admin") {
    console.error("That email already belongs to a non-admin account.");
    process.exit(1);
  }
  console.log("The admin account already exists.");
  process.exit(0);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
const now = new Date().toISOString();
db.prepare("INSERT INTO users (id, email, password_hash, salt, role, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, 'admin', ?, ?, ?)").run(`usr_admin_${Date.now()}`, email, hash, salt, "Academy Administrator", now, now);
console.log(`Admin account created for ${email}.`);
