import "reflect-metadata";
import { DataSource } from "typeorm";
import { createApp } from "./app";
import { config } from "./config";
import { AppDataSource } from "./db";

async function bootstrap() {
  const app = createApp();

  await AppDataSource.initialize();
  console.log("[auth] Database connected");

  const port = config.PORT;
  app.listen(port, () => {
    console.log(`[auth] Listening on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("[auth] Fatal error", err);
  process.exit(1);
});
