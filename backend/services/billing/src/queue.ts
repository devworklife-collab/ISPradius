import { QueueManager } from "ispradius-queue";
import { config } from "./config";

export const billingQueue = new QueueManager({
  name: "billing",
  redisUrl: config.REDIS_URL
});
