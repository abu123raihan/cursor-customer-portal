---
name: erp-plan
description: Plan one Website portal UI feature (no database, no API implementation)
---
Task: $ARGUMENTS

Inspect existing website UI and current Agent API contracts first.

Produce:

- user workflow on the storefront
- screens, routes, and components
- existing `ApiService` methods to reuse
- gaps that Agent API must fill
- loading / empty / error / validation states
- tests
- Definition of Done for the UI only

If API, schema, or persistence is required, do not design it here. List a handoff for Agent API that starts with **I am from the Website portal**.

Do not modify production code in planning mode.
