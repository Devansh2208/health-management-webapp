import { TrendInputLog, HealthTrends } from "./trend.types";
import { average, trendDirection, variability } from "./trend.utils";

export const analyzeTrends = (
  logs: TrendInputLog[]
): HealthTrends => {
  const last7 = logs.slice(0, 7);
  const prev7 = logs.slice(7, 14);
  const last30 = logs.slice(0, 30);

  const sleep7 = last7.map(l => l.sleep_hours ?? 0);
  const sleepPrev = prev7.map(l => l.sleep_hours ?? 0);

  const steps7 = last7.map(l => l.steps ?? 0);
  const stress7 = last7.map(l => l.stress ?? 0);
  const mood7 = last7.map(l => l.mood ?? 0);

  const weight30 = last30.map(l => l.weight_kg ?? 0);

  const avgSleep7 = average(sleep7);
  const avgSleepPrev = average(sleepPrev);

  const avgSteps7 = average(steps7);
  const stressAvg7 = average(stress7);

  const weightChange =
    weight30.length > 1
      ? weight30[0] - weight30[weight30.length - 1]
      : 0;

  return {
    avg_sleep_7d: avgSleep7,
    sleep_trend: trendDirection(avgSleep7, avgSleepPrev),

    avg_steps_7d: avgSteps7,
    activity_consistency:
      avgSteps7 > 8000 ? "high" : avgSteps7 > 4000 ? "moderate" : "low",

    stress_avg_7d: stressAvg7,
    mood_variability: variability(mood7),

    weight_change_30d: weightChange,
    energy_state:
      avgSleep7 < 6 || stressAvg7 > 4 ? "low" : "normal"
  };
};
