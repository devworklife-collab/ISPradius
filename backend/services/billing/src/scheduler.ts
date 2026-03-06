import cron from "node-cron";
import { AppDataSource } from "./db";
import { Subscription } from "./entities/Subscription";
import { billingQueue } from "./queue";

export function startBillingScheduler(cronExpression: string) {
  const subscriptionRepo = AppDataSource.getRepository(Subscription);

  cron.schedule(cronExpression, async () => {
    console.log("[billing] Scheduling invoice generation jobs");

    try {
      const subscriptions = await subscriptionRepo.find({ relations: ["customer", "plan"] });

      for (const subscription of subscriptions) {
        if (!subscription.nextBillingDate || subscription.nextBillingDate <= new Date()) {
          billingQueue.addJob("generate-invoices", { subscription });
          subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await subscriptionRepo.save(subscription);
        }
      }

      billingQueue.addJob("process-overdue", {});
    } catch (err) {
      console.error("[billing] Scheduler error", err);
    }
  });
}
