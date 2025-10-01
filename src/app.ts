import express from "express";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.get("/", (_req, res) => res.json({ ok: true, service: "users-service" }));

export default app;
