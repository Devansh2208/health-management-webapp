import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { RegisterRequest, LoginRequest } from "./auth.types";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: RegisterRequest = req.body;

    const result = await authService.register(payload);

    res.status(201).json({
      message: "Registration successful",
      userId: result.userId
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: LoginRequest = req.body;

    const result = await authService.login(payload);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body;

    const result = await authService.googleAuth(idToken);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
