# Auth Service

The Auth Service provides authentication and authorization for ISPradius.

## Features

- JWT access and refresh tokens
- Role-Based Access Control (RBAC)
- Basic user management
- Audit-friendly structure

## Running Locally

1. Copy `.env.example` to `.env`
2. Configure `DATABASE_URL` to point to a PostgreSQL instance
3. Run `npm install` (from repo root, workspace install)
4. Run `npm run --workspace ispradius-auth-service dev`

### Seeding roles & permissions

Use the seed script to bootstrap roles and permissions:

```sh
npm --workspace ispradius-auth-service exec ts-node -- src/scripts/seedRoles.ts
```

## Endpoints

- `POST /api/v1/auth/login` — Log in with email/password
- `GET /api/v1/auth/me` — Get current user (requires Bearer token)
