import { Response, NextFunction } from "express";
import * as healthService from "./health.service";
import { AuthenticatedRequest } from "../../shared/middleware/auth.middleware";

export const addLog = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;

    const result = await healthService.addOrUpdateLog(
      userId,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getLogs = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const { from, to } = req.query as { from: string; to: string };

    const logs = await healthService.getLogs(userId, from, to);

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};
