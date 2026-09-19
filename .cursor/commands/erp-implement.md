---
name: erp-implement
description: Implement an approved ERP feature safely
---
Task: $ARGUMENTS

Implement only the approved task.

Before editing inspect existing patterns.

Required:
- database/migration if applicable
- model
- validation
- service
- controller
- route/API contract
- permissions
- tenant isolation
- tests
- documentation

Do not modify unrelated modules.
Run available typecheck/lint/tests.
Report files changed and remaining work.
