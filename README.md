# ISPradius

ISPradius is an open-source **ISP Operations Platform** designed for self-hosting by Internet Service Providers. It combines customer management, billing, network automation, monitoring, ticketing, and analytics into a modular, scalable, and secure platform.

## Key Features

- ✅ Modular microservice architecture
- ✅ Authentication + RBAC + audit logs
- ✅ Customer CRM with branch/reseller support
- ✅ Billing engine with recurring invoices, usage billing, and event-driven scheduler
- ✅ RADIUS sync (FreeRADIUS users generation)
- ✅ Monitoring with Prometheus + Grafana dashboards
- ✅ Ticketing and SLA tracking
- ✅ Notifications (Email, SMS, in-app)
- ✅ Reporting, analytics, and accounting
- ✅ Multi-branch / reseller support
- ✅ Frontend admin dashboard (React + Vite)

## Project Structure

- `backend/` — microservices, APIs, event bus, and domain logic
- `frontend/` — admin UI and dashboards
- `infrastructure/` — Docker Compose and Kubernetes manifests
- `database/` — migrations, seeds, and schema definitions
- `docs/` — architecture and deployment documentation

## Getting Started

This repository is a starting point for building the complete platform. It is organized in phases to allow incremental delivery:

1. **Core backend architecture**
2. **Customer CRM + billing engine**
3. **Network & RADIUS integration**
4. **Ticketing + notifications**
5. **Monitoring, analytics & accounting**

> Note: The current scaffold provides the core architecture and foundational services. Implementations of each module are in progress and intended to be extended by contributors.

## Deployment

### Docker Compose (Local / Self-hosted)

1. Ensure Docker and Docker Compose are installed.
2. Configure environment variables by copying `.env.example` inside each service folder and updating values.
3. Start the stack:

```sh
docker compose -f infrastructure/docker/docker-compose.yml up --build
```

The stack will start:
- API Gateway: `http://localhost:4000`
- Auth service: `http://localhost:4001`
- Customers service: `http://localhost:4002`
- Billing service: `http://localhost:4003`
- Radius service: `http://localhost:4004`
- Frontend: `http://localhost:5173`

### GitHub Actions Auto Deploy

A CI workflow is available at `.github/workflows/ci-deploy.yml`. It runs on push to `main` and:

- Installs deps, runs tests, and builds packages
- Builds and pushes Docker images to GitHub Container Registry (GHCR)
- Optionally deploys to Kubernetes when `KUBE_CONFIG_DATA` secret is configured

#### Required secrets (Kubernetes deployment)

- `KUBE_CONFIG_DATA` — base64 encoded kubeconfig

### Kubernetes

Kubernetes manifests are in `infrastructure/kubernetes/`. Use them as a baseline and customize for your environment.
