import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { setupAdminSchema } from "@/lib/validations";
import { signSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, setupKey } = setupAdminSchema.parse(body);

    // Require setup key matching environment or secure default
    const expectedKey = process.env.SETUP_KEY || "SettleLoanExpert@Init2026";
    if (setupKey !== expectedKey) {
      return NextResponse.json(
        { error: "Invalid master setup authorization key" },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    const passwordHash = await bcrypt.hash(password, 10);

    let user;
    if (existingUser) {
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          passwordHash,
          role: "SUPER_ADMIN",
          isActive: true,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          passwordHash,
          role: "SUPER_ADMIN",
          isActive: true,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: "SYSTEM_SETUP",
        entityType: "User",
        entityId: user.id,
        details: "Super Admin configured via setup wizard",
      },
    });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin account configured successfully",
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
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
