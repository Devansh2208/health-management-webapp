// backend/src/modules/auth/auth.repository.ts

import pool from "../../config/db";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

export const createUser = async (
  id: string,
  email: string,
  passwordHash: string | null,
  authProvider: string
) => {
  await pool.query(
    `
    INSERT INTO users (id, email, password_hash, auth_provider)
    VALUES ($1, $2, $3, $4)
    `,
    [id, email, passwordHash, authProvider]
  );
};
