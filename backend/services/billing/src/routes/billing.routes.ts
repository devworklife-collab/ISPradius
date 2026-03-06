import { Router } from "express";
import { BillingController } from "../controllers/billing.controller";
import { BillingService } from "../services/billing.service";
import { AppDataSource } from "../db";
import { Invoice } from "../entities/Invoice";
import { Payment } from "../entities/Payment";
import { Subscription } from "../entities/Subscription";
import { Plan } from "../entities/Plan";
import { Customer } from "../../customers/src/entities/Customer";
import { EventBus } from "ispradius-event-bus";

const invoiceRepo = AppDataSource.getRepository(Invoice);
const paymentRepo = AppDataSource.getRepository(Payment);
const subscriptionRepo = AppDataSource.getRepository(Subscription);
const planRepo = AppDataSource.getRepository(Plan);
const customerRepo = AppDataSource.getRepository(Customer);

const eventBus = new EventBus({ redisUrl: process.env.REDIS_URL });
const billingService = new BillingService(
  invoiceRepo,
  paymentRepo,
  subscriptionRepo,
  planRepo,
  customerRepo,
  eventBus
);
const controller = new BillingController(billingService);

const router = Router();

router.get("/invoices/pending", (req, res) => controller.listPendingInvoices(req, res));
router.post("/payments", (req, res) => controller.recordPayment(req, res));

export { router as billingRouter };
