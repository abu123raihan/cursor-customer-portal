---
name: erp-done
description: Verify Website portal UI Definition of Done
---
Feature: $ARGUMENTS

Inspect actual UI implementation.

Verify applicable:

- screens and navigation
- typed Agent API calls only
- loading, empty, error, validation
- no database connection or stored database information
- Agent API requested (as Website portal) for any missing contract

Return PASS only if UI requirements are satisfied and no API/DB work leaked into this folder.
Otherwise return BLOCKED with missing items. Database/API completeness is Agent API's gate, not this one.
