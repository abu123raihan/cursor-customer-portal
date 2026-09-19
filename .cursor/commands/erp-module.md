---
name: erp-module
description: Implement one approved ERP domain module after planning
---
Task: $ARGUMENTS

Implement only the approved domain module.

Inspect existing patterns, documentation, and API contracts first.

Required when applicable:
- database/migration
- model
- validation
- repository
- service
- controller
- route/API contract
- permissions
- tenant isolation from authenticated context
- audit logging for financial operations
- inventory ledger movement for stock-changing operations
- tests
- documentation

Controllers stay thin. Business logic stays in services. Database access stays in repositories/models inside cursor-node-api.

Do not:
- modify unrelated modules
- invent frontend endpoints
- connect Angular to MySQL
- change posted accounting or inventory history silently
- trust client-supplied company_id

Run available typecheck/lint/tests.
Report files changed and remaining work.
