import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Customer } from "../../customers/src/entities/Customer";
import { Invoice } from "./Invoice";

export enum PaymentMethod {
  STRIPE = "stripe",
  PAYPAL = "paypal",
  MANUAL = "manual"
}

@Entity({ name: "payments" })
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, { nullable: false })
  customer!: Customer;

  @ManyToOne(() => Invoice, { nullable: false })
  invoice!: Invoice;

  @Column({ name: "amount_cents", type: "bigint" })
  amountCents!: number;

  @Column({ name: "currency", default: "USD" })
  currency!: string;

  @Column({ type: "enum", enum: PaymentMethod, default: PaymentMethod.MANUAL })
  method!: PaymentMethod;

  @Column({ name: "transaction_reference", nullable: true })
  transactionReference?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
