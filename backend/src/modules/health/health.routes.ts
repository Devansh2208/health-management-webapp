import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import * as healthController from "./health.controller";

const router = Router();

router.post("/log", authenticate, healthController.addLog);
router.get("/logs", authenticate, healthController.getLogs);

export default router;
