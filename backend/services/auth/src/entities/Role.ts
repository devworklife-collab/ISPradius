import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
  permissions!: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
