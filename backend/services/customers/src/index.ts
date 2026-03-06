import "reflect-metadata";
import { AppDataSource } from "./db";
import { createApp } from "./app";
import { config } from "./config";

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("[customers] database connected");

  const app = createApp();
  const port = config.PORT;
  app.listen(port, () => {
    console.log(`[customers] Listening on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("[customers] Fatal error", err);
  process.exit(1);
});
