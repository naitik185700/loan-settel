import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session) {
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userEmail: session.email,
        action: "LOGOUT",
        entityType: "User",
        entityId: session.userId,
      },
    });
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  clearSessionCookie(response);
  return response;
}
