---
name: erp-implement
description: Implement an approved Website portal UI task
---
Task: $ARGUMENTS

Implement only the approved UI task in cursor-customer-portal.

Before editing inspect existing Angular patterns and `ApiService`.

Required:

- UI only (pages, components, client state)
- typed HTTP via Agent API
- tests/typecheck when available

Do not implement database, migration, model, controller, or route work here.

If persistence or a contract change is needed, request **Agent API** and say **I am from the Website portal**.

Do not modify unrelated modules.
Run available typecheck.
Report files changed and remaining work.
