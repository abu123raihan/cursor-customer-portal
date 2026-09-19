---
name: erp-done
description: Verify ERP feature Definition of Done
---
Feature: $ARGUMENTS

Inspect actual implementation.

Verify applicable:
database, migration, model, validation, API, permissions, tenant isolation, business logic, errors, audit logging, tests, documentation.

Return PASS only if all applicable requirements are satisfied.
Otherwise return BLOCKED with missing items.
