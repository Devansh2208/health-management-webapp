import pool from "../../config/db";
import { DietaryConstraintsInput } from "./dietary.types";

export const upsertDietaryConstraints = async (
  userId: string,
  constraints: DietaryConstraintsInput
) => {
  const {
    gluten_free = false,
    vegan = false,
    lactose_free = false,
    diabetic_safe = false
  } = constraints;

  await pool.query(
    `
    INSERT INTO dietary_constraints
      (user_id, gluten_free, vegan, lactose_free, diabetic_safe)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id)
    DO UPDATE SET
      gluten_free = EXCLUDED.gluten_free,
      vegan = EXCLUDED.vegan,
      lactose_free = EXCLUDED.lactose_free,
      diabetic_safe = EXCLUDED.diabetic_safe
    `,
    [userId, gluten_free, vegan, lactose_free, diabetic_safe]
  );
};

export const getDietaryConstraints = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT gluten_free, vegan, lactose_free, diabetic_safe
    FROM dietary_constraints
    WHERE user_id = $1
    `,
    [userId]
  );

  return result.rows[0] || null;
};
