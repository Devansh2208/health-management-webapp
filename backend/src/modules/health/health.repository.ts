import pool from "../../config/db";
import { DailyHealthLogInput } from "./health.types";

export const upsertDailyLog = async (
  userId: string,
  log: DailyHealthLogInput
) => {
  const {
    log_date,
    steps,
    sleep_hours,
    weight_kg,
    mood,
    stress,
    symptoms
  } = log;

  await pool.query(
    `
    INSERT INTO daily_health_logs
    (user_id, log_date, steps, sleep_hours, weight_kg, mood, stress, symptoms)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (user_id, log_date)
    DO UPDATE SET
      steps = EXCLUDED.steps,
      sleep_hours = EXCLUDED.sleep_hours,
      weight_kg = EXCLUDED.weight_kg,
      mood = EXCLUDED.mood,
      stress = EXCLUDED.stress,
      symptoms = EXCLUDED.symptoms
    `,
    [
      userId,
      log_date,
      steps,
      sleep_hours,
      weight_kg,
      mood,
      stress,
      symptoms
    ]
  );
};

export const getLogsByDateRange = async (
  userId: string,
  from: string,
  to: string
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM daily_health_logs
    WHERE user_id = $1
      AND log_date BETWEEN $2 AND $3
    ORDER BY log_date DESC
    `,
    [userId, from, to]
  );

  return result.rows;
};
