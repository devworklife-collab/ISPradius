import { DataSource } from "typeorm";
import { config } from "./config";
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { Permission } from "./entities/Permission";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Role, Permission],
  migrations: ["src/migrations/*.ts"],
});
