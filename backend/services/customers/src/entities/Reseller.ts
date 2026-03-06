import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity({ name: "resellers" })
export class Reseller {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  contactEmail?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => Customer, (customer) => customer.reseller)
  customers!: Customer[];
}
