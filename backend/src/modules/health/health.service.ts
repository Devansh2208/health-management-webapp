import * as healthRepo from "./health.repository";
import { DailyHealthLogInput } from "./health.types";

export const addOrUpdateLog = async (
  userId: string,
  log: DailyHealthLogInput
) => {
  if (!log.log_date) {
    throw new Error("log_date is required");
  }

  await healthRepo.upsertDailyLog(userId, log);

  return { message: "Health log saved successfully" };
};

export const getLogs = async (
  userId: string,
  from: string,
  to: string
) => {
  if (!from || !to) {
    throw new Error("from and to dates are required");
  }

  return await healthRepo.getLogsByDateRange(userId, from, to);
};
