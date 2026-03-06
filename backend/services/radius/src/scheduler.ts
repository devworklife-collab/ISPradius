import cron from "node-cron";
import { AppDataSource } from "./db";
import { Customer } from "../customers/src/entities/Customer";
import { RadiusSyncService } from "./services/radius-sync.service";

export function startRadiusSync(cronExpression: string, usersPath: string) {
  const customerRepo = AppDataSource.getRepository(Customer);
  const syncService = new RadiusSyncService(customerRepo, usersPath);

  cron.schedule(cronExpression, async () => {
    console.log("[radius] Running FreeRADIUS sync");
    try {
      await syncService.sync();
    } catch (err) {
      console.error("[radius] Sync failed", err);
    }
  });
}
