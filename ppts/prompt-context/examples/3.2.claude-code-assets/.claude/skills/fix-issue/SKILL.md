---
name: fix-issue
description: Fix a GitHub issue with exploration, implementation, and verification.
---

# Fix Issue Workflow

Use this when fixing an issue from an external tracker.

1. Read the issue and summarize the reported symptom.
2. Search the codebase for the smallest relevant area.
3. Write or identify a failing test that reproduces the issue.
4. Implement the smallest fix that addresses the root cause.
5. Run focused tests, then run lint or typecheck if the touched area requires it.
6. Report changed files, verification output, and remaining risks.
