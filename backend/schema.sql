CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "password_hash" text,
  "auth_provider" text,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "health_profiles" (
  "user_id" uuid PRIMARY KEY,
  "age" int,
  "height_cm" int,
  "weight_kg" float,
  "goal" text,
  "activity_level" text,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "dietary_constraints" (
  "user_id" uuid PRIMARY KEY,
  "gluten_free" boolean DEFAULT false,
  "vegan" boolean DEFAULT false,
  "lactose_free" boolean DEFAULT false,
  "diabetic_safe" boolean DEFAULT false,
  "other_constraints" text 
);

CREATE TABLE "daily_health_logs" (
  "user_id" uuid,
  "log_date" date,
  "steps" int,
  "sleep_hours" float,
  "weight_kg" float,
  "mood" int,
  "stress" int,
  "symptoms" text[],
  "created_at" timestamptz DEFAULT (now()),
  PRIMARY KEY ("user_id", "log_date")
);

CREATE TABLE "foods" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "calories" text,
  "proteins" int,
  "carbs" float,
  "fat" float,
  "glycemic_index" float,
  "tags" text[]
);

CREATE TABLE "recommendations" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "recommendation_date" date,
  "recommended_foods" uuid[],
  "avoided_foods" uuid[],
  "explanation" jsonb,
  "confidence_score" float,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "alerts" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "alert_type" text,
  "message" text,
  "severity" text,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "admin_logs" (
  "id" uuid PRIMARY KEY,
  "action" text,
  "metadata" jsonb,
  "created_at" timestamptz DEFAULT (now())
);

ALTER TABLE "health_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "dietary_constraints" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "daily_health_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "recommendations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "alerts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE daily_health_logs
ADD CONSTRAINT mood_range CHECK (mood BETWEEN 1 AND 5);

ALTER TABLE daily_health_logs
ADD CONSTRAINT stress_range CHECK (stress BETWEEN 1 AND 5);
ALTER TABLE daily_health_logs
ALTER COLUMN log_date SET NOT NULL;

ALTER TABLE foods
ALTER COLUMN name SET NOT NULL;
CREATE INDEX idx_daily_logs_user_date
ON daily_health_logs(user_id, log_date DESC);

CREATE INDEX idx_recommendations_user_date
ON recommendations(user_id, recommendation_date DESC);


COMMENT ON COLUMN "health_profiles"."activity_level" IS 'low | medium | high';

COMMENT ON COLUMN "daily_health_logs"."mood" IS '1–5';

COMMENT ON COLUMN "daily_health_logs"."stress" IS '1–5';
