# Deployment Guide

This guide describes how to deploy ISPradius in production.

## Deployment Options

### Docker Compose
A reference Docker Compose stack is provided under `infrastructure/docker/`.

Services included:

- `api-gateway` (API routing)
- `auth` (authentication + RBAC)
- `customers` (CRM + customer management)
- `billing` (billing engine + scheduler)
- `radius` (FreeRADIUS sync)
- `frontend` (admin dashboard)
- `postgres` (primary database)
- `redis` (cache + job queue + event pub/sub)
- `prometheus` (monitoring)
- `grafana` (dashboards)

### Kubernetes
A set of Kubernetes manifests are provided under `infrastructure/kubernetes/`.

Use the manifests as a base and customize them for your cluster, secrets, and storage.

### GitHub Actions Auto Deploy
A GitHub Actions workflow is included at `.github/workflows/ci-deploy.yml`.

It performs:

- Builds & tests the code
- Builds Docker images for each service
- Pushes images to GitHub Container Registry (GHCR)
- Optionally deploys to Kubernetes when `KUBE_CONFIG_DATA` is configured

#### Required secrets (for Kubernetes auto deploy)

- `KUBE_CONFIG_DATA` — base64-encoded kubeconfig file

## Environment Variables
Each microservice reads configuration from environment variables. A shared `.env.example` is included in the repository.

Key variables include:

- `DATABASE_URL` — Postgres connection string
- `REDIS_URL` — Redis connection string
- `JWT_SECRET` — Secret for signing JWT tokens
- `ADMIN_EMAIL` — Bootstrap admin user

## Backups
Automated backups are handled by the `backup` service (or a cron job). Backups should include:

- PostgreSQL dump
- Encryption of backup artifacts before upload
- Retention policies (e.g., 30 days)

## Monitoring
The platform exposes Prometheus metrics on `/metrics` for all services. Grafana dashboards are available under `infrastructure/grafana/`.

## High Availability
For high availability:

- Run services across multiple nodes
- Use managed PostgreSQL with replication
- Use Redis in cluster mode
- Use a load balancer (NGINX, HAProxy, etc.)
