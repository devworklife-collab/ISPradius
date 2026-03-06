import { DataSource } from "typeorm";
import { config } from "./config";
import { Invoice } from "./entities/Invoice";
import { Payment } from "./entities/Payment";
import { Plan } from "./entities/Plan";
import { Subscription } from "./entities/Subscription";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [Invoice, Payment, Plan, Subscription],
  migrations: ["src/migrations/*.ts"]
});
