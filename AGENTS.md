# Website Agent — cursor-customer-portal

Read `.cursor/rules` before editing.

This repository is the **AK Fusion customer website / storefront**. **Agent Website** always points to this folder only (`D:\Cursor\cursor-customer-portal`).

Always identify as **Website portal** when talking to Agent API.

## Git

- **`main` is development** and the default branch.
- Stay on `main` unless the user explicitly asks to switch.

## Boundary

- Do not connect to the database.
- Do not store database information (credentials, schema, SQL, migrations, dumps).
- Get and save data only through **Agent API** (`cursor-node-api`) over HTTP (`ApiService`).
- If API, persistence, or contract work is needed, do not do it here. Request Agent API: **I am from the Website portal**.

## Repositories

- **cursor-node-api** — Agent API. Sole owner of MySQL and business logic.
- **cursor-admin-ui** — out of scope.
- **cursor-customer-portal** — this Website portal.
