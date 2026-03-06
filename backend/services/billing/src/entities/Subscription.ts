import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Customer } from "../../customers/src/entities/Customer";
import { Plan } from "./Plan";

export enum SubscriptionStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  CANCELLED = "cancelled"
}

@Entity({ name: "subscriptions" })
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  @ManyToOne(() => Plan, { nullable: false })
  @JoinColumn({ name: "plan_id" })
  plan!: Plan;

  @Column({ type: "enum", enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status!: SubscriptionStatus;

  @Column({ name: "next_billing_date", type: "timestamp with time zone", nullable: true })
  nextBillingDate?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
