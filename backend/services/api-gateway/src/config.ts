import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT ?? 4000),
  AUTH_URL: process.env.AUTH_URL ?? "http://localhost:4001",
  CUSTOMERS_URL: process.env.CUSTOMERS_URL ?? "http://localhost:4002"
};
