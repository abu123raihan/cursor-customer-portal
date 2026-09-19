---
name: erp-review
description: Architecture and code review gate for an ERP feature
---
Scope: $ARGUMENTS

Inspect the actual diff and documentation.

Review:
- module boundaries and layering
- tenant isolation
- authorization vs UI-only permission checks
- API contract stability
- migration safety
- transaction boundaries
- inventory ledger integrity
- posted accounting immutability
- audit coverage
- error handling
- test coverage of isolation and money/stock paths
- documentation completeness

Be strict. Do not modify business logic to hide findings.

Return APPROVE only if the change matches architecture rules and the approved plan.
Otherwise return CHANGES REQUESTED with severity, file, and required fix.
