---
name: build-erp
description: Website portal master command. UI only. API and database work go to Agent API.
---
Task: $ARGUMENTS

This command runs in **cursor-customer-portal** (Website portal).

Do not connect to the database.
Do not store database information.
Do not implement routes, controllers, migrations, or models.

If the task needs persistence or a new/changed HTTP contract:

1. Stop implementing it here.
2. Request **Agent API** and open with: **I am from the Website portal** (`cursor-customer-portal`).
3. Write the request to `D:\Cursor\cursor-node-api\docs\requests\`.
4. After Agent API ships the contract, implement the UI against `ApiService`.

Implement only website UI: pages, components, routing, client state, and typed HTTP calls.

Required gates after a UI slice:
/erp-plan -> /erp-module -> /erp-qa -> /erp-security -> /erp-review -> /erp-done
