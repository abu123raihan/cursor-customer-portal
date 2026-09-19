---
name: erp-security
description: Security audit for ERP scope
---
Scope: $ARGUMENTS

Review:
- authentication
- RBAC
- tenant isolation
- IDOR
- SQL injection
- XSS
- CSRF
- privilege escalation
- secrets
- API abuse
- file upload
- payment/webhooks
- sensitive data exposure

Be adversarial. Do not modify business logic to hide findings.
