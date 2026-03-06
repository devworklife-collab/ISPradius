# API Documentation

This document outlines the public APIs exposed by ISPradius. APIs are versioned and follow REST conventions.

## Authentication

### POST /api/v1/auth/login
Authenticate user and issue access/refresh tokens.

### POST /api/v1/auth/refresh
Refresh access token using a refresh token.

### POST /api/v1/auth/logout
Revoke session and refresh token.

## Customers

### GET /api/v1/customers
List customers (supports pagination, filtering).

### GET /api/v1/customers/{id}
Get customer details.

### POST /api/v1/customers
Create a new customer profile.

### PUT /api/v1/customers/{id}
Update customer details.

## Billing

### GET /api/v1/billing/invoices
List invoices.

### POST /api/v1/billing/invoices
Create an invoice.

### POST /api/v1/billing/payments
Record a payment.

## Tickets

### GET /api/v1/tickets
List support tickets.

### POST /api/v1/tickets
Open a new ticket.

---

> 📌 This documentation is generated from the OpenAPI schema. See `backend/services/api/openapi.yaml` for the full schema.
