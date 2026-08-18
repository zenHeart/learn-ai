# Codex Security

> A **tutorial** — run one read-only scan on a repo you own, then read the report. Codex Security is an application-security agent with **three doors**: desktop plugin, CLI/SDK, and Cloud. This page is the map and the first scan, not a copy of every official workflow.
>
> Official landing: [learn.chatgpt.com/codex/security](https://learn.chatgpt.com/codex/security). Docs: [Codex Security](https://learn.chatgpt.com/docs/security).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Permission | Scan **only** code you own or have authorization to assess |
| Account | Codex Security access. Best results: [Trusted Access for Cyber](https://chatgpt.com/cyber) |
| Desktop plugin | [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) with Codex |
| CLI / SDK | Node for `npx`; optional TypeScript app |
| Cloud | A GitHub repo already visible in [Codex Cloud](./codex-cloud) |

**Learning objectives**: tell the three doors apart; install the plugin or run the CLI help; complete one read-only first scan; know that Cloud Security is a research preview.

**Non-goals**: writing exploit payloads; a full SARIF/CI cookbook (see official CI docs); agent sandbox theory ([CLI](./codex-cli)).

## Three doors, one scanner

```
Codex Security
├── Plugin          desktop workbench + CLI `/plugins`
│                   Scans · Findings · Repositories
├── CLI / SDK       @openai/codex-security
│                   local, bulk, CI, TypeScript
└── Cloud           research preview
                    connected GitHub repos via Codex Cloud
```

The desktop **Security** workbench and the Codex CLI both use the **Codex Security plugin**. Cloud scans GitHub through Codex Cloud. Sandbox, approvals, and admin policy are still the [agent security](https://learn.chatgpt.com/docs/agent-approvals-security) model — Security does not replace them.

| Door | Use when | Start here |
| --- | --- | --- |
| Plugin | Interactive triage in the desktop app | [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin) |
| CLI / SDK | Repeatable local scans, bulk inventory, CI | [CLI quickstart](https://learn.chatgpt.com/docs/security/cli) · [SDK](https://learn.chatgpt.com/docs/security/sdk) |
| Cloud | Hosted scans of connected GitHub repos | [Cloud setup](https://learn.chatgpt.com/docs/security/setup) |

Install the plugin from ChatGPT: [plugin share link](https://chatgpt.com/plugins/share/676aca3811d54fa7bcdef5255236b3c4).

## First local scan (plugin)

Official first-scan path: [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin). Quality default: `gpt-5.6-sol` with `xhigh` reasoning.

### Desktop

1. Open Codex in the ChatGPT desktop app.
2. **Plugins** → search **Codex Security** → install and enable.
3. Open **Security** in the sidebar. If it is missing, update the app and plugin.
4. **Scans → + Scan**. Pick a repo or folder. Leave **Deep scan** off for the first run.
5. Start the scan. Review **Findings**, coverage, and `report.md`.

Workbench panes: **Scans** (progress and saved results), **Findings** (issues and evidence), **Repositories** (history). Details: [Security workbench](https://learn.chatgpt.com/docs/security/plugin/workbench).

### CLI session via the plugin

```bash
cd ~/code/your-repo
codex
```

Then `/plugins` → install **Codex Security** → `/new`, and send:

```text
Run a Codex Security scan on this repository.
```

Keep the task running until it finishes. Read the terminal summary, then `report.md`. Approve any config change only after you read the exact patch.

## CLI and SDK package

Public package: [`@openai/codex-security`](https://github.com/openai/codex-security).

```bash
npx @openai/codex-security --help
```

Use the same scanner across repos and over time: discover GitHub repos, resume bulk scans, track findings, record false-positive feedback, set a cost limit, or run in CI. The TypeScript SDK embeds scanning, progress, and cancel into a tool.

| Job | Official page |
| --- | --- |
| First terminal scan | [CLI quickstart](https://learn.chatgpt.com/docs/security/cli) |
| Bulk / CSV inventory | [Bulk scans](https://learn.chatgpt.com/docs/security/cli/bulk-scans) |
| PR / MR in CI, SARIF | [CLI in CI](https://learn.chatgpt.com/docs/security/cli/ci) |
| Flags and exit codes | [CLI reference](https://learn.chatgpt.com/docs/security/cli/reference) |
| From application code | [TypeScript SDK](https://learn.chatgpt.com/docs/security/sdk) |

This is **not** the general [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) (`@openai/codex-sdk`). Use the Security SDK only for structured security findings.

## Cloud (research preview)

Codex Security cloud scans connected GitHub repositories commit by commit. It builds a repo-specific threat model, validates high-signal issues in an isolated environment, then surfaces ranked findings with evidence and suggested patches.

If a repo is missing, confirm it is visible in your Codex Cloud workspace, or contact your OpenAI account team.

Threat-model edits: [Improving the threat model](https://learn.chatgpt.com/docs/security/threat-model). PR reviews: [Security Review](https://learn.chatgpt.com/docs/security/security-review).

## After the first scan

| Next | Official page |
| --- | --- |
| Deep scan (slower, broader) | [Deep scans](https://learn.chatgpt.com/docs/security/plugin/deep-scans) |
| Review a PR / branch / patch | [Code changes](https://learn.chatgpt.com/docs/security/plugin/code-changes) |
| Triage an existing backlog | [Triage](https://learn.chatgpt.com/docs/security/plugin/triage-backlog) |
| Bounded fix + verify | [Fix findings](https://learn.chatgpt.com/docs/security/plugin/fix-findings) |
| Export / track | [Export findings](https://learn.chatgpt.com/docs/security/plugin/export-findings) |

A completed scan typically writes `report.md`, optional `findings/<slug>/` and `hardening/`, plus `scan-manifest.json`, `findings.json`, and `coverage.json`. Keep the directory together so links from `report.md` still resolve.

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Scanning a repo you do not own | Policy and legal problem | Stop. Assess only authorized code |
| Treating findings as proof | False positives still happen | Read evidence; Cloud/plugin validate, you still decide |
| Asking for a working exploit | Out of scope for this guide | Review official evidence; do not write exploit PoCs here |
| Mixing Security SDK with Codex SDK | Wrong package | `@openai/codex-security` vs `@openai/codex-sdk` |
| Skipping Trusted Access | Weaker scans | [chatgpt.com/cyber](https://chatgpt.com/cyber) when you qualify |

## Real-world use

Before a release, run a **read-only** plugin scan on `packages/api`. Accept one finding, ask for a bounded patch, and re-run the related test. Put CI on the Security CLI for pull-request diffs. Leave Cloud on for the GitHub org if your workspace has the research preview.

## Next steps

1. Plugin first scan → [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin)
2. Repeatable CLI → [CLI quickstart](https://learn.chatgpt.com/docs/security/cli)
3. Hosted GitHub → [Cloud setup](https://learn.chatgpt.com/docs/security/setup)
4. Agent sandbox (separate layer) → [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)

## Official sources

- [Codex Security (landing)](https://learn.chatgpt.com/codex/security)
- [Codex Security (docs)](https://learn.chatgpt.com/docs/security)
- [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin) · [Workbench](https://learn.chatgpt.com/docs/security/plugin/workbench)
- [CLI](https://learn.chatgpt.com/docs/security/cli) · [SDK](https://learn.chatgpt.com/docs/security/sdk)
- [Cloud setup](https://learn.chatgpt.com/docs/security/setup) · [Cloud FAQ](https://learn.chatgpt.com/docs/security/faq)
- [Security Review](https://learn.chatgpt.com/docs/security/security-review)
- [openai/codex-security](https://github.com/openai/codex-security)
