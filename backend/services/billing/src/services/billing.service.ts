import { Repository } from "typeorm";
import { Invoice, InvoiceStatus } from "../entities/Invoice";
import { Payment } from "../entities/Payment";
import { Subscription, SubscriptionStatus } from "../entities/Subscription";
import { Plan } from "../entities/Plan";
import { Customer, CustomerState } from "../../customers/src/entities/Customer";
import { EventBus, EventType } from "ispradius-event-bus";

export class BillingService {
  constructor(
    private invoiceRepo: Repository<Invoice>,
    private paymentRepo: Repository<Payment>,
    private subscriptionRepo: Repository<Subscription>,
    private planRepo: Repository<Plan>,
    private customerRepo: Repository<Customer>,
    private eventBus: EventBus
  ) {}

  async generateInvoiceForSubscription(subscription: Subscription) {
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      return null;
    }

    const customer = subscription.customer;
    const plan = subscription.plan;
    const invoiceNumber = `INV-${Date.now()}-${customer.id.slice(0, 6)}`;

    const invoice = this.invoiceRepo.create({
      invoiceNumber,
      customer,
      amountCents: plan.monthlyPriceCents,
      currency: "USD",
      status: InvoiceStatus.PENDING,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    const result = await this.invoiceRepo.save(invoice);

    this.eventBus.publish({
      type: EventType.InvoiceCreated,
      timestamp: new Date().toISOString(),
      payload: { invoiceId: result.id, customerId: customer.id, amountCents: result.amountCents }
    });

    return result;
  }

  async recordPayment(customer: Customer, invoice: Invoice, amountCents: number, method: string, reference?: string) {
    const payment = this.paymentRepo.create({
      customer,
      invoice,
      amountCents,
      currency: invoice.currency,
      method: method as any,
      transactionReference: reference
    });

    const result = await this.paymentRepo.save(payment);

    invoice.status = InvoiceStatus.PAID;
    await this.invoiceRepo.save(invoice);

    this.eventBus.publish({
      type: EventType.PaymentReceived,
      timestamp: new Date().toISOString(),
      payload: { paymentId: result.id, invoiceId: invoice.id, customerId: customer.id }
    });

    return result;
  }

  async listPendingInvoices() {
    return this.invoiceRepo.find({ where: { status: InvoiceStatus.PENDING }, relations: ["customer"] });
  }

  async processOverdueInvoices() {
    const overdue = await this.invoiceRepo.find({
      where: { status: InvoiceStatus.PENDING },
      relations: ["customer"]
    });

    const now = new Date();
    for (const invoice of overdue) {
      if (invoice.dueDate && invoice.dueDate < now) {
        invoice.status = InvoiceStatus.OVERDUE;
        await this.invoiceRepo.save(invoice);

        if (invoice.customer) {
          invoice.customer.state = CustomerState.SUSPENDED;
          await this.customerRepo.save(invoice.customer);

          this.eventBus.publish({
            type: EventType.UserSuspended,
            timestamp: new Date().toISOString(),
            payload: { customerId: invoice.customer.id }
          });
        }
      }
    }
  }

  async getSubscriptionForCustomer(customerId: string) {
    return this.subscriptionRepo.findOne({ where: { customer: { id: customerId } }, relations: ["customer", "plan"] });
  }
}
