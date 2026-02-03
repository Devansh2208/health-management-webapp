export interface TrendInputLog {
  log_date: string;
  steps?: number;
  sleep_hours?: number;
  weight_kg?: number;
  mood?: number;
  stress?: number;
}

export interface HealthTrends {
  avg_sleep_7d: number;
  sleep_trend: "improving" | "stable" | "declining";

  avg_steps_7d: number;
  activity_consistency: "low" | "moderate" | "high";

  stress_avg_7d: number;
  mood_variability: "low" | "medium" | "high";

  weight_change_30d: number;
  energy_state: "low" | "normal" | "high";
}
