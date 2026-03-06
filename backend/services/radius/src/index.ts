import "reflect-metadata";
import { AppDataSource } from "./db";
import { createApp } from "./app";
import { config } from "./config";
import { startRadiusSync } from "./scheduler";

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("[radius] database connected");

  const app = createApp();
  const port = config.PORT;
  app.listen(port, () => {
    console.log(`[radius] Listening on http://localhost:${port}`);
  });

  startRadiusSync(config.SYNC_CRON, config.FREERADIUS_USERS_PATH);
}

bootstrap().catch((err) => {
  console.error("[radius] Fatal error", err);
  process.exit(1);
});
