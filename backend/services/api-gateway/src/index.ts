import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: config.AUTH_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/auth": "/api/v1/auth" }
  })
);

app.use(
  "/api/v1/customers",
  createProxyMiddleware({
    target: config.CUSTOMERS_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/customers": "/api/v1/customers" }
  })
);

app.use(
  "/api/v1/dashboard",
  createProxyMiddleware({
    target: config.CUSTOMERS_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/dashboard": "/api/v1/customers" }
  })
);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const port = config.PORT;
app.listen(port, () => {
  console.log(`[api-gateway] listening on http://localhost:${port}`);
});
