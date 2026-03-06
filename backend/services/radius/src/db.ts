import { DataSource } from "typeorm";
import { config } from "./config";
import { Customer } from "../customers/src/entities/Customer";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [Customer],
  migrations: []
});
