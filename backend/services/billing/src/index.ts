import "reflect-metadata";
import { AppDataSource } from "./db";
import { createApp } from "./app";
import { config } from "./config";
import { startBillingScheduler } from "./scheduler";
import { startBillingWorker } from "./worker";
import { EventBus } from "ispradius-event-bus";

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("[billing] database connected");

  const eventBus = new EventBus({ redisUrl: config.REDIS_URL });
  startBillingWorker(eventBus);

  const app = createApp();
  const port = config.PORT;
  app.listen(port, () => {
    console.log(`[billing] Listening on http://localhost:${port}`);
  });

  startBillingScheduler(config.BILLING_SCHEDULE);
}

bootstrap().catch((err) => {
  console.error("[billing] Fatal error", err);
  process.exit(1);
});
