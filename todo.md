# Learn-AI Tasks

> Immediate tasks focused on final verification and deployment.

---

## 🔴 P0: AI Automation Verification (IMMEDIATE)

### Task 93: GitHub App Integration

- [ ] Install [Gemini Code Assist](https://github.com/marketplace/google-gemini-code-assist)
- [ ] Install [Jules (CI Fixer)](https://github.com/marketplace/jules)
- [ ] Authorize Pro account access for both apps

### Task 94: End-to-End Verification

- [ ] Create test PR to verify `.github/workflows/pr-check.yml`
- [ ] Verify Gemini Code Assist comments based on `.gemini/review-rules.md`
- [ ] Verify multi-language support (ZH for `docs/zh/`, EN for others)
- [ ] Verify Jules auto-fix on build failure

### Task 95: Retroactive Review

- [ ] Run `/gemini review` on existing open PRs

---

## 🟡 P1: Quality Assurance (HIGH PRIORITY)

### Task 85: Verify All Path Links

- [ ] Check links in `/docs/paths/productivity.md`
- [ ] Check links in `/docs/paths/integration.md`
- [ ] Check links in `/docs/paths/mastery.md`
- [ ] Check links in `/docs/paths/index.md`

### Task 86: Prerequisite Context

- [ ] Add "New to this concept?" callouts with links to [LLM Fundamentals](../tech/fundamentals/LLM.md)
- [ ] Link [API Integration Guide](../integration/apis/index.md) when APIs first mentioned
- [ ] Link [Streaming Guide](../tech/frontend/streaming.md) when streaming first mentioned

---

## 🟢 P2: Final Polish & Delivery

### Task 89: Final Site Build

- [ ] Run `pnpm docs:build` (zero error goal)
- [ ] Verify Mermaid diagrams rendering
- [ ] Mobile responsiveness check
- [ ] Final homepage CTA review
