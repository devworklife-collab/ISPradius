import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 4002),
  DATABASE_URL: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/ispradius",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info"
};
