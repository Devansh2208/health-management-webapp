import { Response, NextFunction } from "express";
import * as dietaryService from "./dietary.service";
import { AuthenticatedRequest } from "../../shared/middleware/auth.middleware";

export const saveDietaryConstraints = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;

    const result = await dietaryService.saveConstraints(
      userId,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getDietaryConstraints = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;

    const constraints =
      await dietaryService.fetchConstraints(userId);

    res.status(200).json(constraints);
  } catch (error) {
    next(error);
  }
};
