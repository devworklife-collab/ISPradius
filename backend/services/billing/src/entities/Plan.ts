import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PlanType {
  RESIDENTIAL = "residential",
  BUSINESS = "business",
  RESELLER = "reseller"
}

@Entity({ name: "plans" })
export class Plan {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: "enum", enum: PlanType, default: PlanType.RESIDENTIAL })
  type!: PlanType;

  @Column({ name: "monthly_price_cents", type: "bigint" })
  monthlyPriceCents!: number;

  @Column({ name: "speed_mbps", type: "int", default: 10 })
  speedMbps!: number;

  @Column({ name: "data_quota_gb", type: "int", nullable: true })
  dataQuotaGb?: number;

  @Column({ name: "is_trial", type: "boolean", default: false })
  isTrial!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
