# cursor-customer-portal

Angular 22 storefront for **AK Fusion** (Website portal). Consumes **Agent API** (`cursor-node-api`) only.

Never connect this app to MySQL. Never store database information here. Persistence and contracts belong to Agent API. Identify as **Website portal** when requesting API work.

## Setup

Requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` (Angular 22). TypeScript 6.0.x. The app is zoneless (no `zone.js`).

```
npm install
npm start
```

Dev server: `http://localhost:4300`  
API base URL: `http://localhost:3000` (`src/environments/environment.development.ts`)

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
