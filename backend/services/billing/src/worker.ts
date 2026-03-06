import { billingQueue } from "./queue";
import { BillingService } from "./services/billing.service";
import { AppDataSource } from "./db";
import { Invoice } from "./entities/Invoice";
import { Payment } from "./entities/Payment";
import { Subscription } from "./entities/Subscription";
import { Plan } from "./entities/Plan";
import { Customer } from "../customers/src/entities/Customer";
import { EventBus } from "ispradius-event-bus";

export function startBillingWorker(eventBus: EventBus) {
  const invoiceRepo = AppDataSource.getRepository(Invoice);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const subscriptionRepo = AppDataSource.getRepository(Subscription);
  const planRepo = AppDataSource.getRepository(Plan);
  const customerRepo = AppDataSource.getRepository(Customer);

  const billingService = new BillingService(invoiceRepo, paymentRepo, subscriptionRepo, planRepo, customerRepo, eventBus);

  billingQueue.createWorker(async (job) => {
    switch (job.name) {
      case "generate-invoices":
        await billingService.generateInvoiceForSubscription(job.data.subscription);
        break;
      case "process-overdue":
        await billingService.processOverdueInvoices();
        break;
      default:
        console.warn("[billing] Unknown job", job.name);
    }
  });
}
