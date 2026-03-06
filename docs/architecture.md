# ISPradius Architecture

## Overview

ISPradius is built as a **modular microservice platform** designed to support real-world ISP operations at scale. Services communicate via REST APIs and an internal event bus (event-driven architecture) to ensure loose coupling and extensibility.

### High-level Components

- **API Gateway / Backend API** - Provides unified entrypoints and request routing.
- **Authentication Service** - JWT auth, refresh tokens, MFA, RBAC, audit logging.
- **Customer Service** - CRM, customer profile and lifecycle management.
- **Billing Service** - Recurring billing, usage pricing, invoice generation.
- **Payment Service** - Integrations with payment gateways (Stripe, PayPal, etc.).
- **Network Service** - Device provisioning, bandwidth profiles, RADIUS sync.
- **RADIUS Integration Service** - FreeRADIUS synchronization and accounting.
- **Billing Service** - Recurring invoices, payment tracking, scheduler, and queue jobs.
- **Ticketing Service** - Helpdesk, SLAs, assignments.
- **Monitoring Service** - Prometheus metrics, health checks, Grafana dashboards.
- **Reporting Service** - Revenue and network usage analytics.
- **Accounting Service** - Ledger, P&L, bank reconciliation.
- **Notification Service** - Email/SMS/alerts channels.

### Event Bus & Job Queue

Services publish and consume domain events to stay in sync.
Events can be delivered in-process or via Redis pub/sub for cross-service communication.

Core events:

- `InvoiceCreated`
- `PaymentReceived`
- `UserSuspended`
- `TicketOpened`
- `DeviceOffline`

A job queue (BullMQ + Redis) is used for background processing such as recurring invoice generation and overdue checks.

## Security

- JWT authentication with refresh tokens
- Role-Based Access Control (RBAC) with configurable permissions per module
- Audit logs and session management
- HTTPS enforcement
- Password hashing using strong algorithms (bcrypt/argon2)

## Datastore

PostgreSQL is the primary datastore. The recommended setup includes:

- Primary relational data store
- Redis for caching, session storage, and rate limiting

## Scalability

- Horizontal scaling of services
- Stateless services where possible
- Shared caching via Redis
- Background workers for billing, notifications, and sync tasks
