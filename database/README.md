# Database

This folder is reserved for shared database artifacts and migration coordination.

Each microservice contains its own migrations to manage its schema independently. The platform uses PostgreSQL as the primary data store.

## Recommended Setup

- Create a `ispradius` database
- Enable `pgcrypto` / `uuid-ossp` extensions for UUID generation (or use `gen_random_uuid()` from `pgcrypto`)

Example:

```sql
CREATE DATABASE ispradius;
\c ispradius;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```
