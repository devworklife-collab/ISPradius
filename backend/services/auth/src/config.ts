import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 4001),
  DATABASE_URL: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/ispradius",
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",
  JWT_SECRET: process.env.JWT_SECRET ?? "change-me",
  JWT_EXPIRY: process.env.JWT_EXPIRY ?? "15m",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY ?? "7d",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info"
};
