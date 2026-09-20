import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { hashPassword } from "./auth/crypto";

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  role: "student" | "teacher" | "parent" | "admin";
  full_name: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  country?: string;
  status?: string;
}

export interface DbSession {
  id: string;
  user_id: string;
  token: string;
  role: "student" | "teacher" | "parent" | "admin";
  expires_at: string;
  created_at: string;
}

export type SupportStatus = "Open" | "In Progress" | "Waiting for User" | "Resolved" | "Closed";
export type SupportPriority = "Low" | "Normal" | "High" | "Urgent";

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  category: string;
  priority: SupportPriority;
  status: SupportStatus;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_email?: string;
  user_role?: DbUser["role"];
}

export interface SupportMessage {
  id: string;
  ticket_id: string;
  author_id: string;
  message: string;
  created_at: string;
  author_name?: string;
  author_role?: DbUser["role"];
}

export interface CourseRecord {
  id: string;
  name: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentRecord {
  id: string;
  student_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
  student_name?: string;
  course_name?: string;
}

export interface ClassRecord {
  id: string;
  title: string;
  course_id: string;
  teacher_id: string;
  student_id: string;
  starts_at: string;
  status: string;
  course_name?: string;
  teacher_name?: string;
  student_name?: string;
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  class_id: string;
  student_id: string;
  date: string;
  status: string;
  class_title?: string;
  student_name?: string;
}

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dbDir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "noor_academy.db");
  const db = new DatabaseSync(dbPath);

  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      role TEXT NOT NULL,
      full_name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

    CREATE TABLE IF NOT EXISTS support_tickets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      category TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'Normal',
      status TEXT NOT NULL DEFAULT 'Open',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS support_messages (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL,
      author_id TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
    CREATE INDEX IF NOT EXISTS idx_support_messages_ticket_id ON support_messages(ticket_id);

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT '',
      duration TEXT NOT NULL DEFAULT '',
      price REAL NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'Active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Active',
      enrolled_at TEXT NOT NULL,
      UNIQUE(student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      course_id TEXT NOT NULL,
      teacher_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      starts_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Scheduled',
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      read_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      class_id TEXT NOT NULL,
      student_id TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL,
      UNIQUE(class_id, student_id, date),
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
    CREATE INDEX IF NOT EXISTS idx_classes_student_id ON classes(student_id);
    CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
  `);

  for (const column of ["phone", "country", "status"]) {
    try { db.exec(`ALTER TABLE users ADD COLUMN ${column} TEXT`); } catch { /* Existing databases already have this column. */ }
  }

  // Check if we need to seed initial accounts
  const countRow = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (countRow.count === 0) {
    seedInitialUsers(db);
  }

  dbInstance = db;
  return db;
}

function seedInitialUsers(db: DatabaseSync) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password_hash, salt, role, full_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;

  const seedData = [{
    id: `usr_admin_${Date.now()}`,
    email: adminEmail,
    password: adminPassword,
    role: "admin",
    fullName: "Academy Administrator",
  }];

  for (const item of seedData) {
    const { hash, salt } = hashPassword(item.password);
    insertUser.run(item.id, item.email, hash, salt, item.role, item.fullName, now, now);
  }
}

export function createSupportTicket(data: {
  userId: string;
  subject: string;
  category: string;
  priority: SupportPriority;
  message: string;
}): SupportTicket {
  const db = getDatabase();
  const id = `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const messageId = `message_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  db.prepare("INSERT INTO support_tickets (id, user_id, subject, category, priority, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'Open', ?, ?)")
    .run(id, data.userId, data.subject, data.category, data.priority, now, now);
  db.prepare("INSERT INTO support_messages (id, ticket_id, author_id, message, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(messageId, id, data.userId, data.message, now);
  return getSupportTicket(id)!;
}

export function getSupportTickets(userId?: string): SupportTicket[] {
  const db = getDatabase();
  const query = `SELECT t.*, u.full_name AS user_name, u.email AS user_email, u.role AS user_role
    FROM support_tickets t JOIN users u ON u.id = t.user_id ${userId ? "WHERE t.user_id = ?" : ""}
    ORDER BY t.updated_at DESC`;
  return (userId ? db.prepare(query).all(userId) : db.prepare(query).all()) as unknown as SupportTicket[];
}

export function getSupportTicket(id: string): SupportTicket | null {
  const db = getDatabase();
  return db.prepare(`SELECT t.*, u.full_name AS user_name, u.email AS user_email, u.role AS user_role
    FROM support_tickets t JOIN users u ON u.id = t.user_id WHERE t.id = ?`).get(id) as SupportTicket | undefined ?? null;
}

export function getSupportMessages(ticketId: string): SupportMessage[] {
  const db = getDatabase();
  return db.prepare(`SELECT m.*, u.full_name AS author_name, u.role AS author_role
    FROM support_messages m JOIN users u ON u.id = m.author_id WHERE m.ticket_id = ? ORDER BY m.created_at ASC`).all(ticketId) as unknown as SupportMessage[];
}

export function addSupportMessage(ticketId: string, authorId: string, message: string): SupportMessage {
  const db = getDatabase();
  const id = `message_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  db.prepare("INSERT INTO support_messages (id, ticket_id, author_id, message, created_at) VALUES (?, ?, ?, ?, ?)").run(id, ticketId, authorId, message, now);
  db.prepare("UPDATE support_tickets SET status = CASE WHEN status IN ('Resolved', 'Closed') THEN 'Open' ELSE status END, updated_at = ? WHERE id = ?").run(now, ticketId);
  return db.prepare(`SELECT m.*, u.full_name AS author_name, u.role AS author_role FROM support_messages m JOIN users u ON u.id = m.author_id WHERE m.id = ?`).get(id) as unknown as SupportMessage;
}

export function updateSupportTicket(id: string, updates: { status?: SupportStatus; priority?: SupportPriority }): SupportTicket | null {
  const db = getDatabase();
  const current = getSupportTicket(id);
  if (!current) return null;
  const status = updates.status ?? current.status;
  const priority = updates.priority ?? current.priority;
  db.prepare("UPDATE support_tickets SET status = ?, priority = ?, updated_at = ? WHERE id = ?").run(status, priority, new Date().toISOString(), id);
  return getSupportTicket(id);
}

export function getUserByEmail(email: string): DbUser | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email.trim().toLowerCase()) as DbUser | undefined;
  return row ?? null;
}

export function getUserById(id: string): DbUser | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as DbUser | undefined;
  return row ?? null;
}

export function createUser(data: {
  email: string;
  passwordHash: string;
  salt: string;
  role: "student" | "teacher" | "parent" | "admin";
  fullName: string;
}): DbUser {
  const db = getDatabase();
  const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO users (id, email, password_hash, salt, role, full_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.email.trim().toLowerCase(), data.passwordHash, data.salt, data.role, data.fullName, now, now);

  return {
    id,
    email: data.email.trim().toLowerCase(),
    password_hash: data.passwordHash,
    salt: data.salt,
    role: data.role,
    full_name: data.fullName,
    created_at: now,
    updated_at: now,
  };
}

export function createDbSession(data: {
  userId: string;
  token: string;
  role: "student" | "teacher" | "parent" | "admin";
  expiresAt: string;
}): DbSession {
  const db = getDatabase();
  const id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO sessions (id, user_id, token, role, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, data.userId, data.token, data.role, data.expiresAt, now);

  return {
    id,
    user_id: data.userId,
    token: data.token,
    role: data.role,
    expires_at: data.expiresAt,
    created_at: now,
  };
}

export function getDbSession(token: string): DbSession | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM sessions WHERE token = ?").get(token) as DbSession | undefined;
  if (!row) return null;

  if (new Date(row.expires_at).getTime() < Date.now()) {
    deleteDbSession(token);
    return null;
  }

  return row;
}

export function deleteDbSession(token: string): void {
  const db = getDatabase();
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function deleteUserSessions(userId: string): void {
  const db = getDatabase();
  db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

export function listUsers(role?: DbUser["role"]): DbUser[] {
  const db = getDatabase();
  const rows = role ? db.prepare("SELECT * FROM users WHERE role = ? ORDER BY created_at DESC").all(role) : db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
  return rows as unknown as DbUser[];
}

export function updateUser(id: string, data: Partial<Pick<DbUser, "full_name" | "email" | "phone" | "country" | "status" | "role">>): DbUser | null {
  const db = getDatabase();
  const current = getUserById(id);
  if (!current) return null;
  const next = { ...current, ...data };
  db.prepare("UPDATE users SET full_name = ?, email = ?, phone = ?, country = ?, status = ?, role = ?, updated_at = ? WHERE id = ?")
    .run(next.full_name, next.email, next.phone ?? "", next.country ?? "", next.status ?? "Active", next.role, new Date().toISOString(), id);
  return getUserById(id);
}

export function createCourse(data: Omit<CourseRecord, "id" | "created_at" | "updated_at">): CourseRecord {
  const db = getDatabase();
  const id = `course_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  db.prepare("INSERT INTO courses (id, name, description, level, duration, price, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(id, data.name, data.description, data.level, data.duration, data.price, data.status, now, now);
  return getCourse(id)!;
}

export function getCourse(id: string): CourseRecord | null {
  return getDatabase().prepare("SELECT * FROM courses WHERE id = ?").get(id) as unknown as CourseRecord | null;
}

export function listCourses(): CourseRecord[] {
  return getDatabase().prepare("SELECT * FROM courses ORDER BY created_at DESC").all() as unknown as CourseRecord[];
}

export function listEnrollments(studentId?: string): EnrollmentRecord[] {
  const query = `SELECT e.*, u.full_name AS student_name, c.name AS course_name FROM enrollments e JOIN users u ON u.id = e.student_id JOIN courses c ON c.id = e.course_id ${studentId ? "WHERE e.student_id = ?" : ""} ORDER BY e.enrolled_at DESC`;
  return (studentId ? getDatabase().prepare(query).all(studentId) : getDatabase().prepare(query).all()) as unknown as EnrollmentRecord[];
}

export function createEnrollment(studentId: string, courseId: string): EnrollmentRecord {
  const db = getDatabase();
  const id = `enrollment_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  db.prepare("INSERT INTO enrollments (id, student_id, course_id, status, enrolled_at) VALUES (?, ?, ?, 'Active', ?)").run(id, studentId, courseId, new Date().toISOString());
  return listEnrollments(studentId).find((item) => item.id === id)!;
}

export function listClasses(filters: { studentId?: string; teacherId?: string } = {}): ClassRecord[] {
  const conditions: string[] = [];
  const values: string[] = [];
  if (filters.studentId) { conditions.push("cl.student_id = ?"); values.push(filters.studentId); }
  if (filters.teacherId) { conditions.push("cl.teacher_id = ?"); values.push(filters.teacherId); }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return getDatabase().prepare(`SELECT cl.*, c.name AS course_name, t.full_name AS teacher_name, s.full_name AS student_name FROM classes cl JOIN courses c ON c.id = cl.course_id JOIN users t ON t.id = cl.teacher_id JOIN users s ON s.id = cl.student_id ${where} ORDER BY cl.starts_at ASC`).all(...values) as unknown as ClassRecord[];
}

export function createClass(data: Omit<ClassRecord, "course_name" | "teacher_name" | "student_name">): ClassRecord {
  getDatabase().prepare("INSERT INTO classes (id, title, course_id, teacher_id, student_id, starts_at, status) VALUES (?, ?, ?, ?, ?, ?, ?)").run(data.id, data.title, data.course_id, data.teacher_id, data.student_id, data.starts_at, data.status);
  return listClasses().find((item) => item.id === data.id)!;
}

export function listNotifications(userId: string): NotificationRecord[] {
  return getDatabase().prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC").all(userId) as unknown as NotificationRecord[];
}

export function listAttendance(studentId?: string): AttendanceRecord[] {
  const query = `SELECT a.*, cl.title AS class_title, u.full_name AS student_name FROM attendance a JOIN classes cl ON cl.id = a.class_id JOIN users u ON u.id = a.student_id ${studentId ? "WHERE a.student_id = ?" : ""} ORDER BY a.date DESC`;
  return (studentId ? getDatabase().prepare(query).all(studentId) : getDatabase().prepare(query).all()) as unknown as AttendanceRecord[];
}
