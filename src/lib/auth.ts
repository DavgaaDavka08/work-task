//  verifyToken, generateJWT, RBAC helpers
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(payload: object, expiresIn: string = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
