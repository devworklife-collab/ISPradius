import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { customerRouter } from "./routes/customer.routes";
import { errorHandler } from "./middleware/error.middleware";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));

  app.use("/api/v1/customers", customerRouter);

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  app.use(errorHandler);

  return app;
}
