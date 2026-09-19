---
name: erp-qa
description: Test an ERP feature
---
Scope: $ARGUMENTS

Test:
- happy path
- validation
- permissions
- tenant isolation
- duplicate data
- boundary conditions
- transactions
- inventory impact
- accounting impact
- error handling

Return defects with reproduction, expected, actual, severity and affected module.
