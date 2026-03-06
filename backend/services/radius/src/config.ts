import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 4004),
  DATABASE_URL: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/ispradius",
  FREERADIUS_USERS_PATH: process.env.FREERADIUS_USERS_PATH ?? "/data/freeradius/users",
  SYNC_CRON: process.env.SYNC_CRON ?? "*/5 * * * *",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info"
};
