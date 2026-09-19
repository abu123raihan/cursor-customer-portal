# ERP PROJECT AGENT INSTRUCTIONS

Read `.cursor/rules` before editing.

This is a multi-tenant ERP + E-commerce SaaS.

Repositories:

- **cursor-node-api** — the API. Only this talks to the database (MySQL). All business logic and DB access live here. ERP-API is cursor-node-api; it owns the database.
- **cursor-admin-ui** — the admin portal.
- **cursor-customer-portal** — the customer website / storefront.

Frontends must never access MySQL. They call cursor-node-api only.

Never bypass tenant isolation.

Never trust a client-supplied `company_id` for authorization.

Use modular domain architecture.

Use the project's Cursor commands for planning, implementation, testing, security and completion gates.
