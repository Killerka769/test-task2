import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function requireRole(role: "ADMIN") {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "No auth" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
