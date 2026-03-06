import { Request, Response } from "express";
import { z } from "zod";
import { BillingService } from "../services/billing.service";

const recordPaymentSchema = z.object({
  customerId: z.string().uuid(),
  invoiceId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  method: z.string().optional(),
  reference: z.string().optional()
});

export class BillingController {
  constructor(private billingService: BillingService) {}

  async listPendingInvoices(req: Request, res: Response) {
    const invoices = await this.billingService.listPendingInvoices();
    res.json(invoices);
  }

  async recordPayment(req: Request, res: Response) {
    const result = recordPaymentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const { customerId, invoiceId, amountCents, method, reference } = result.data;

    const customer = { id: customerId } as any;
    const invoice = { id: invoiceId } as any;

    const payment = await this.billingService.recordPayment(customer, invoice, amountCents, method ?? "manual", reference);
    res.json(payment);
  }
}
