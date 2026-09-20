import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword } from "@/lib/auth/crypto";
import { createSession, getRoleDashboardUrl } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName, role = "student" } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const validRoles = ["student", "parent", "teacher"];
    const assignedRole = validRoles.includes(role) ? role : "student";

    const { hash, salt } = hashPassword(password);
    const newUser = createUser({
      email,
      passwordHash: hash,
      salt,
      role: assignedRole,
      fullName: fullName.trim(),
    });

    await createSession(newUser);

    return NextResponse.json({
      success: true,
      redirectUrl: getRoleDashboardUrl(newUser.role),
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        fullName: newUser.full_name,
      },
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
