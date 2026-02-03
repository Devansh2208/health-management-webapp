export const average = (values: number[]) => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

export const trendDirection = (
  recent: number,
  previous: number,
  threshold = 0.3
): "improving" | "stable" | "declining" => {
  if (recent > previous + threshold) return "improving";
  if (recent < previous - threshold) return "declining";
  return "stable";
};

export const variability = (
  values: number[]
): "low" | "medium" | "high" => {
  if (values.length < 2) return "low";

  const mean = average(values);
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;

  if (variance < 0.5) return "low";
  if (variance < 1.5) return "medium";
  return "high";
};
