# Website Agent — cursor-customer-portal

Read `.cursor/rules` before editing.

This repository is the **AK Fusion customer website / storefront**. This agent works only in this folder.

Always identify as **Website portal** when talking to Agent API.

## Boundary

- Do not connect to the database.
- Do not store database information (credentials, schema, SQL, migrations, dumps).
- Get and save data only through **Agent API** (`cursor-node-api`) over HTTP (`ApiService`).
- If API, persistence, or contract work is needed, do not do it here. Request Agent API: **I am from the Website portal**.

## Repositories

- **cursor-node-api** — Agent API. Sole owner of MySQL and business logic.
- **cursor-admin-ui** — out of scope.
- **cursor-customer-portal** — this Website portal.
