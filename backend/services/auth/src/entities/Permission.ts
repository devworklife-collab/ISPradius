import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity({ name: "permissions" })
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  key!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
