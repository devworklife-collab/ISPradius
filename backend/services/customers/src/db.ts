import { DataSource } from "typeorm";
import { config } from "./config";
import { Customer } from "./entities/Customer";
import { Branch } from "./entities/Branch";
import { Reseller } from "./entities/Reseller";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [Customer, Branch, Reseller],
  migrations: ["src/migrations/*.ts"]
});
