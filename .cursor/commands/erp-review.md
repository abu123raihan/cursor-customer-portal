---
name: erp-review
description: Review a Website portal UI change
---
Scope: $ARGUMENTS

Inspect the actual diff.

Review:

- UI module boundaries
- typed `ApiService` usage (no invented endpoints)
- no database access or stored database information
- loading/empty/error states
- documentation of any Agent API handoff

Migration safety, SQL, and server transactions belong to Agent API.

Return APPROVE only if the change stays inside the website portal boundary.
Otherwise return CHANGES REQUESTED with severity, file, and required fix.
