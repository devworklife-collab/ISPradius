import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Customer } from "./Customer";

export enum InvoiceStatus {
  DRAFT = "draft",
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled"
}

@Entity({ name: "invoices" })
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "invoice_number", unique: true })
  invoiceNumber!: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices, { nullable: false })
  customer!: Customer;

  @Column({ name: "amount_cents", type: "bigint" })
  amountCents!: number;

  @Column({ name: "currency", default: "USD" })
  currency!: string;

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus;

  @Column({ name: "due_date", type: "timestamp with time zone", nullable: true })
  dueDate?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
