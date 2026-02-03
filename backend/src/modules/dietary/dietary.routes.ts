import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import * as dietaryController from "./dietary.controller";

const router = Router();

router.post("/", authenticate, dietaryController.saveDietaryConstraints);
router.get("/", authenticate, dietaryController.getDietaryConstraints);

export default router;
