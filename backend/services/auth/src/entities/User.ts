import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  UpdateDateColumn
} from "typeorm";
import { Role } from "./Role";

export enum UserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  DISABLED = "disabled"
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @Column({ name: "display_name", nullable: true })
  displayName?: string;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" }
  })
  roles!: Role[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
