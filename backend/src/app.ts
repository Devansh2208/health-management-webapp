import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./shared/middleware/auth.middleware";
import { AuthenticatedRequest } from "./shared/middleware/auth.middleware";

// Route imports
import authRoutes from "./modules/auth/auth.routes";

dotenv.config();

const app: Application = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// CORS configuration (tighten later)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});


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

app.use("/auth", authRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Error:", err.message);

    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
);

export default app;
