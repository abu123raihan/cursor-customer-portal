# cursor-customer-portal

Angular 22 storefront for **AK Fusion**. Consumes **cursor-node-api** only. Never connect this app to MySQL.

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
  pages/             home, health
```

Do not invent endpoints. Catalog, cart, and checkout wait for the Website module after sales and payments exist.

## Documentation

Master docs: `F:\Cursor\Project\docs`  
Local pointer: [docs/README.md](docs/README.md)
