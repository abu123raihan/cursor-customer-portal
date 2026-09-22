# cursor-customer-portal

Angular 22 storefront for **AK Fussion** (Website portal). Consumes **Agent API** (`cursor-node-api`) only.

Never connect this app to MySQL. Never store database information here. Persistence and contracts belong to Agent API. Identify as **Website portal** when requesting API work.

## Setup

Requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` (Angular 22). TypeScript 6.0.x. The app is zoneless (no `zone.js`).

```
npm install
copy .env.example .env
npm start
```

Put local config and any secrets in `.env`. That file is gitignored and must not be committed. `.env.example` is the committed template (no real credentials).

Dev server: `http://localhost:4300`  
API base URL: from `.env` (`API_BASE_URL`, default `http://localhost:3000`)

This portal talks to Agent API over HTTP only. Do not put database credentials here.

## Layout

```
src/app/
  core/api/          typed API client
  core/layout/       responsive shell
  pages/             home, shop, product, cart, account
```

Do not invent endpoints. After Agent API ships a contract, consume it with typed `ApiService` methods.

## Documentation

UI notes: [docs/README.md](docs/README.md)  
API / database: Agent API repo `cursor-node-api`
