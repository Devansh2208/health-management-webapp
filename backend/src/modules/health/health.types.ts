export interface DailyHealthLogInput {
  log_date: string;       // YYYY-MM-DD
  steps?: number;
  sleep_hours?: number;
  weight_kg?: number;
  mood?: number;          // 1–5
  stress?: number;        // 1–5
  symptoms?: string[];
}

export interface HealthLogQuery {
  from: string;
  to: string;
}
