---
paths:
  - "src/api/**/*.ts"
---

# API Rules

- Validate all external input at the boundary.
- Return typed error results instead of throwing raw infrastructure errors.
- Add or update focused tests for changed behavior.
- Do not log tokens, passwords, emails, phone numbers, or customer identifiers.
