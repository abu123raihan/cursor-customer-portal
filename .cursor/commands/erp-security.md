---
name: erp-security
description: Security review for Website portal UI
---
Scope: $ARGUMENTS

Review this repo only:

- auth token handling
- XSS
- CSRF as it applies to the browser client
- secrets in the frontend
- sensitive data shown in the UI
- no database credentials or schema stored in this folder

SQL injection, tenant isolation in MySQL, and API authorization implementation belong to Agent API. If found missing, request Agent API as **Website portal**.

Be adversarial. Do not modify business logic to hide findings.
