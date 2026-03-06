# Backend Services

This folder contains microservices that power the ISPradius platform.

Each service is designed to be independently deployable, with its own database schema and configuration.

## Services

- **api-gateway** — Route requests to individual services
- **auth** — Authentication, authorization, and RBAC
- **customers** — Customer CRM, customer profiles, and invoicing

## Conventions

- Each service uses TypeScript + Express
- Each service has its own `package.json`, `tsconfig.json`, and `.env.example`
- Database schema is managed with TypeORM migrations
- Services expose `/health` endpoints for monitoring.
