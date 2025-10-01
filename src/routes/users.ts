import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import * as userService from "../services/user.service";

const router = Router();

// Get user by id (admin or self)
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const requester = req.user!;
  const { id } = req.params;
  if (requester.role !== "ADMIN" && requester.sub !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await userService.findUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { password, ...safe } = user as any;
  res.json(safe);
});

router.get("/", authMiddleware, requireRole("ADMIN"), async (_req, res) => {
  const users = await userService.listUsers();
  res.json(users.map(u => {
    const { password, ...safe } = u as any;
    return safe;
  }));
});

// Block user (admin or self)
router.post("/:id/block", authMiddleware, async (req: AuthRequest, res) => {
  const requester = req.user!;
  const { id } = req.params;

  if (requester.role !== "ADMIN" && requester.sub !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await userService.findUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const updated = await userService.updateUser(id, { isActive: false });
  const { password, ...safe } = updated as any;
  res.json(safe);
});

export default router;
