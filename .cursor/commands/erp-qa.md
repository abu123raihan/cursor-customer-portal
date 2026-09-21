---
name: erp-qa
description: Test a Website portal UI feature
---
Scope: $ARGUMENTS

Test:

- happy path in the storefront
- validation and error/empty/loading states
- routing and shared state across screens
- that the UI only calls Agent API (no direct data store)

Do not test database, migrations, or SQL here. That belongs to Agent API.

Return defects with reproduction, expected, actual, severity and affected screen.
