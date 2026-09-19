---
name: build-erp
description: Master ERP command. First run plans and scaffolds docs; later runs implement the next approved module only.
---
Task: $ARGUMENTS

Inspect the current repository, documentation, and sibling ERP repositories first.

This command is designed for three independent repositories:
- cursor-node-api
- cursor-admin-ui
- cursor-customer-portal

Do not combine the repositories.
Do not let frontend applications access MySQL.
Do not trust a client-supplied company_id for authorization.

## First run

If architecture docs, command pack completeness, or repo skeletons are missing:

1. PLAN the system: architecture, tenancy, security, database, API conventions, modules, inventory/accounting rules, frontend split, Definition of Done.
2. SCAFFOLD documentation before large feature implementation.
3. Complete missing Cursor commands if the pack is incomplete.
4. Scaffold independent repo tooling only (health, config, folder layout). No business modules.

Stop after documentation and scaffolding unless an approved module is explicitly in scope.

## Later runs

If first-run documentation and repo skeletons already exist:

1. Identify the next approved module from `docs/05-modules-and-build-order.md`.
2. Implement only that module in the correct repository.
3. Follow: inspect existing patterns, then routes -> controllers -> services -> repositories -> models.
4. Include migrations, validation, permissions, tenant isolation, tests, and documentation.
5. Do not modify unrelated modules.

Required gates after a module:
/erp-plan -> /erp-module -> /erp-qa -> /erp-security -> /erp-review -> /erp-done

Do not mark a business module complete without tests and documentation.
