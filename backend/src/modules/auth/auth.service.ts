import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse
} from "./auth.types";
import * as authRepo from "./auth.repository";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const register = async (
  payload: RegisterRequest
): Promise<{ userId: string }> => {
  const { email, password } = payload;

  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  await authRepo.createUser(
    userId,
    email,
    passwordHash,
    "local"
  );

  return { userId };
};

export const login = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const { email, password } = payload;

  const user = await authRepo.findUserByEmail(email);
  if (!user || !user.password_hash) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    userId: user.id,
    accessToken,
    refreshToken
  };
};

export const googleAuth = async (
  idToken: string
): Promise<AuthResponse> => {
  /**
   * Placeholder:
   * Google token verification logic will be added later
   * using google-auth-library
   */
  throw new Error("Google OAuth not implemented yet");
};
