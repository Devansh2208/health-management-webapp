import * as dietaryRepo from "./dietary.repository";
import { DietaryConstraintsInput } from "./dietary.types";

export const saveConstraints = async (
  userId: string,
  constraints: DietaryConstraintsInput
) => {
  await dietaryRepo.upsertDietaryConstraints(userId, constraints);

  return { message: "Dietary constraints saved successfully" };
};

export const fetchConstraints = async (userId: string) => {
  const constraints = await dietaryRepo.getDietaryConstraints(userId);

  return constraints || {
    gluten_free: false,
    vegan: false,
    lactose_free: false,
    diabetic_safe: false
  };
};
