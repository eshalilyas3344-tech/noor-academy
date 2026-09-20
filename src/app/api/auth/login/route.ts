import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/crypto";
import { createSession, getRoleDashboardUrl } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, portalRole } = body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = verifyPassword(password, user.password_hash, user.salt);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Role check if logging in from a dedicated portal
    if (portalRole && typeof portalRole === "string") {
      const normalizedPortalRole = portalRole.toLowerCase();
      if (user.role !== normalizedPortalRole) {
        const portalLabels: Record<string, string> = {
          student: "Student Portal",
          teacher: "Teacher Portal",
          parent: "Parent Portal",
          admin: "Admin Portal",
        };
        const correctPortal = portalLabels[user.role] ?? user.role;
        return NextResponse.json(
          {
            error: `This account is registered for the ${correctPortal}. Please log in through your designated portal.`,
          },
          { status: 403 }
        );
      }
    }

    await createSession(user);

    return NextResponse.json({
      success: true,
      redirectUrl: getRoleDashboardUrl(user.role),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
