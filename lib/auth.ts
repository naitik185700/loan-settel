import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "settle_loan_expert_super_secure_jwt_secret_token_key_2026_xyz"
);

export const COOKIE_NAME = "sle_admin_token";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "LEAD_MANAGER" | "CONTENT_MANAGER";
  [key: string]: unknown;
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return {
    id: session.userId,
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
  };
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function hasPermission(
  userRole: string,
  requiredRole: "SUPER_ADMIN" | "ADMIN" | "LEAD_MANAGER" | "CONTENT_MANAGER"
): boolean {
  if (userRole === "SUPER_ADMIN") return true;
  if (userRole === "ADMIN") {
    return requiredRole !== "SUPER_ADMIN";
  }
  if (requiredRole === "LEAD_MANAGER") {
    return userRole === "LEAD_MANAGER";
  }
  if (requiredRole === "CONTENT_MANAGER") {
    return userRole === "CONTENT_MANAGER";
  }
  return false;
}
