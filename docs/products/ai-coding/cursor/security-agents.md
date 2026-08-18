# Security Agents

Security Agents scan your code for **security bugs, risky patterns, and vulnerabilities**. They are Cursor-managed agents on [Automations](https://cursor.com/automations/from-cursor/security), and they **require Cloud Agents**.

> Official: [Security Agents](https://cursor.com/docs/security-agents).
>
> Two types: **Security Reviewer** (pull / merge requests) and **Vulnerability Scanner** (cron). Local skill: `/review-security`. Team usage pool — not your personal quota.

## Prerequisites

- Cloud Agents available on the account (paid plan; admin has connected source control)
- Access to [Automations](https://cursor.com/automations/from-cursor/security)
- Cursor **3.7+** if you want `/review-security` / `/review` in the editor or on [cursor.com/agents](https://cursor.com/agents)
- **Team or Enterprise** if another product (PR Routing) will consume Security Review Context

## Learning objectives

After this page you can:

1. Tell Security Reviewer apart from Vulnerability Scanner — and from Bugbot
2. Configure a trigger, at least one tool / MCP, and custom instructions
3. Run `/review-security` on your branch before you push
4. Know that usage is billed to the **team pool**, not to you

---

## Two agent types

| Type | Trigger | Job |
|------|---------|-----|
| **Security Reviewer** | Git-based Automations triggers: pull request and merge request events | Catch vulnerabilities **during** code review |
| **Vulnerability Scanner** | Cron | Scan the codebase **at rest** — pre-existing issues, long-standing bugs, things PR review missed |

Both run on the Automations platform. Both need Cloud Agents. You can use Cursor's cloud with no extra VM setup.

This is **not** Bugbot. Bugbot reviews a PR diff for bugs / security / quality and comments. Security Agents are a separate Cursor-managed automation family. PR Routing can **read** both: [Bugbot Review Context](./pr-routing) and Security Review Context.

## Setup

Open [Security Agents in Automations](https://cursor.com/automations/from-cursor/security).

1. Pick **Security Reviewer** or **Vulnerability Scanner**
2. Set **triggers** (PR / MR events vs cron)
3. Enable or disable built-in **security checks**
4. Add **custom instructions**: what to prioritize, project-specific expectations, how the agent should behave
5. Attach **tools and MCPs** — each agent needs **at least one** tool or MCP to run
6. Save. Runs appear in Automations history

Use tools / MCPs to send findings to Slack or an issue tracker, to tell the agent when to call each MCP, and to give extra context before it reports.

## Run in your agent

Use `/review-security` or `/review` **before you push**.

| Knob | Official default |
|------|------------------|
| **What diff** | Your **branch** vs the base: committed **and** uncommitted changes |
| **Which base** | The default base branch. If that is not `main`, tell the agent which branch to compare, or let it infer |

Ask it to review **only uncommitted** changes when you want a narrower pass.

`/review` and `/review-security` are available in **Cursor 3.7+** and at [cursor.com/agents](https://cursor.com/agents). **CLI support is coming soon** — do not document a working `agent /review-security` yet.

## Billing

Security Agents are billed at the **team usage** level:

- Charged to the team's **usage pool**
- They run under a **shared team service account**
- They do **not** consume any individual user's usage

Automations create Cloud Agents; see [Cloud agent pricing](https://cursor.com/docs/models-and-pricing.md#model-pricing) for the underlying model rates.

## Analytics and runs

Three metrics across runs:

| Metric | Meaning |
|--------|---------|
| **Vulnerabilities found** | Security findings reported |
| **Issues fixed** | Findings later resolved |
| **Resolution rate** | Percentage of reported findings that were fixed |

Cursor uses **LLMs on incremental diffs** to decide whether a flagged issue was actually fixed.

Every run is tracked in Automations: when it ran, which tools it used, final status, duration. Open a run to inspect the underlying Cloud Agent.

## When to use it

- PR gate: Security Reviewer on pull / merge request events
- Recurring baseline: Vulnerability Scanner on a cron, independent of PR traffic
- Local pre-push: `/review-security` on the current branch
- Feed PR Routing: enable **Security Review Context** so low-risk auto-approve waits on these findings

Stay on Bugbot alone when you want a general bug / quality pass, not a dedicated security agent.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| Treat this as Bugbot with a new name | Different product. Bugbot comments on a diff; this is a managed Security Agent |
| Forget a tool / MCP | Official: each agent needs **at least one** to run |
| Expect it on the CLI today | Official: **CLI support is coming soon** |
| Assume it bills your personal quota | Team usage pool + shared service account |
| Ask `/review-security` for “only the last commit” without saying so | Default is **the whole branch**, committed and uncommitted |
| Skip Cloud Agents / source-control setup | These agents **require** Cloud Agents |

## Next steps

- [Cloud Agents](./cloud-agents) — the runtime
- [PR Routing](./pr-routing) — can wait on Security Review Context
- [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) — general PR review
- Official: [Security Agents](https://cursor.com/docs/security-agents), [Automations](https://cursor.com/docs/cloud-agent/automations)
