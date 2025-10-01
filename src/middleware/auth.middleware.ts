import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  user?: { sub: string; role: string; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing auth token" });

  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Malformed auth header" });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
