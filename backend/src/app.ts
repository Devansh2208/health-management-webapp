import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import healthRoutes from "./modules/health/health.routes";
import { authenticate } from "./shared/middleware/auth.middleware";
import { AuthenticatedRequest } from "./shared/middleware/auth.middleware";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Public health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

// Protected test route
app.get(
  "/protected",
  authenticate,
  (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({
      message: "You are authenticated",
      userId: req.user?.userId
    });
  }
);

// 🚀 REAL ROUTES (MUST COME BEFORE 404)
app.use("/auth", authRoutes);
app.use("/health", healthRoutes);

// ❌ 404 — MUST BE LAST
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// ❌ Error handler — LAST LAST
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Error:", err.message);

    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
);

export default app;
