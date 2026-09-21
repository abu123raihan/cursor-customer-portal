---
name: erp-module
description: Implement one approved Website portal UI module
---
Task: $ARGUMENTS

Implement only the approved website UI module in this repo.

Inspect existing pages, `ApiService`, and Agent API contracts first.

Required when applicable:

- Angular page/component
- typed `ApiService` usage
- loading, empty, error, and validation states
- responsive / mobile-friendly layout

Do not:

- connect to the database or store database information
- add migrations, models, controllers, or routes
- invent frontend endpoints
- trust client-supplied company_id

If the UI is blocked on API work, request Agent API as **Website portal** and stop.

Run available typecheck. Report files changed and remaining Agent API requests.
