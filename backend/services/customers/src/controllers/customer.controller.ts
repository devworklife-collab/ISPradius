import { Request, Response } from "express";
import { z } from "zod";
import { CustomerService } from "../services/customer.service";

const createCustomerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  branchId: z.string().uuid().optional(),
  resellerId: z.string().uuid().optional()
});

export class CustomerController {
  constructor(private service: CustomerService) {}

  async list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const perPage = Number(req.query.perPage ?? 25);
    const customers = await this.service.list(page, perPage);
    res.json(customers);
  }

  async get(req: Request, res: Response) {
    const customer = await this.service.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  }

  async create(req: Request, res: Response) {
    const result = createCustomerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const customer = await this.service.create(result.data);
    res.status(201).json(customer);
  }

  async update(req: Request, res: Response) {
    const customer = await this.service.update(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  }

  async stats(req: Request, res: Response) {
    const stats = await this.service.getStats();
    res.json({
      totalCustomers: stats.totalCustomers,
      activeSubscriptions: stats.activeCustomers,
      pendingInvoices: 0
    });
  }
}
