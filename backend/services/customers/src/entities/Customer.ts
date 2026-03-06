import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Invoice } from "./Invoice";
import { Branch } from "./Branch";
import { Reseller } from "./Reseller";

export enum CustomerState {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  EXPIRED = "expired",
  DISCONNECTED = "disconnected"
}

@Entity({ name: "customers" })
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "full_name" })
  fullName!: string;

  @Column({ name: "email", unique: true })
  email!: string;

  @Column({ name: "phone", nullable: true })
  phone?: string;

  @Column({ name: "address", nullable: true })
  address?: string;

  @ManyToOne(() => Branch, { nullable: true })
  @JoinColumn({ name: "branch_id" })
  branch?: Branch;

  @ManyToOne(() => Reseller, { nullable: true })
  @JoinColumn({ name: "reseller_id" })
  reseller?: Reseller;

  @Column({ name: "state", type: "enum", enum: CustomerState, default: CustomerState.ACTIVE })
  state!: CustomerState;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices!: Invoice[];
}
