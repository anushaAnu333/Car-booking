import jwt from "jsonwebtoken";
import { config } from "./config";

export interface JWTPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

export function generateToken(payload: JWTPayload): string {
  // @ts-ignore - JWT types are conflicting
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

export function verifyToken(token: string): JWTPayload {
  try {
    // @ts-ignore - JWT types are conflicting
    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

// Helper function to extract token from Authorization header
export function extractTokenFromHeader(
  authHeader: string | null
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Middleware helper for API routes
export async function authenticateToken(
  request: Request
): Promise<JWTPayload | null> {
  const authHeader = request.headers.get("Authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
