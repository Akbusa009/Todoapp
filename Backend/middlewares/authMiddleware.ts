import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const payload = jwt.verify(token, secret) as TokenPayload;

    if (!payload.id || !payload.email || !payload.name) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: payload.id, email: payload.email, name: payload.name };

    next();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Auth error:", message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

