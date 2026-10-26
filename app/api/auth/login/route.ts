import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations";
import { signSessionToken, setSessionCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    // 5 attempts per 15 minutes to prevent brute-force
    const limiter = rateLimit(`login_${ip}`, 5, 15 * 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error:
            "Too many login attempts. Account temporarily locked for security. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid email address or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email address or password" },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "LOGIN",
        entityType: "User",
        entityId: user.id,
        ipAddress: ip.split(",")[0].trim(),
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
