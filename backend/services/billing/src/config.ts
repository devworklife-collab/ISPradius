import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 4003),
  DATABASE_URL: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/ispradius",
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",
  BILLING_SCHEDULE: process.env.BILLING_SCHEDULE ?? "0 2 * * *", // daily at 02:00
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info"
};
