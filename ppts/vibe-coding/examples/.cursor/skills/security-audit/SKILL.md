---
name: security-audit
description: Run a security audit on the codebase. Scan the dependency tree and report CVE vulnerabilities. Use when the user asks for a security scan or dependency audit.
---

# Security Audit

## When to Use

- Use when the user asks for a security audit, dependency check, or CVE scan
- Use when preparing for release or compliance review

## Instructions

1. **Dependency audit**
   - Inspect `package.json` (and lockfiles) for direct and transitive dependencies
   - Check for known vulnerabilities (e.g. via `npm audit` or similar)
   - Report findings: package name, severity, and recommendation

2. **Code security**
   - Review code for common issues: hardcoded secrets, unsafe eval, path traversal, injection
   - Note any authentication/authorization or data-handling concerns

3. **Report**
   - Summarize findings with severity
   - Suggest updates or mitigations; do not modify code unless the user asks
