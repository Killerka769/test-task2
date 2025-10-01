import { Router } from "express";
import { z } from "zod";
import * as userService from "../services/user.service";
import { hashPassword, comparePassword } from "../utils/hash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  birthDate: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
});

router.post("/register", async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const exists = await userService.findUserByEmail(parsed.email);
    if (exists) return res.status(400).json({ error: "Email already used" });

    const hashed = await hashPassword(parsed.password);
    const user = await userService.createUser({
      fullName: parsed.fullName,
      birthDate: new Date(parsed.birthDate),
      email: parsed.email,
      password: hashed
    });

    const { password, ...rest } = user as any;
    res.status(201).json(rest);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? "Invalid data" });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    if (!user.isActive) return res.status(403).json({ error: "User is blocked" });

    const token = jwt.sign(
      { sub: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? "Invalid data" });
  }
});

export default router;
