# Codex Cloud

> A **tutorial** — run a coding task in an isolated hosted environment, review the diff, then open a PR. Cloud is one Codex surface, not a second product. Sandbox, approval, and `AGENTS.md` still apply.
>
> Official landing: [learn.chatgpt.com/codex/cloud](https://learn.chatgpt.com/codex/cloud). Docs: [Codex cloud](https://learn.chatgpt.com/docs/cloud). Entry: [chatgpt.com/codex](https://chatgpt.com/codex).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Account | A ChatGPT plan that includes Codex. Limits live on the [pricing page](https://learn.chatgpt.com/docs/pricing) |
| GitHub | A GitHub account you can authorize, plus the repos Codex should see |
| Browser | [chatgpt.com/codex](https://chatgpt.com/codex) |
| Optional CLI | Installed [Codex CLI](./codex-cli) for `codex cloud` / `codex cloud exec` |

**Learning objectives**: stand up one Cloud environment; start a task from the web or CLI; review the summary and diff; know when Cloud beats the laptop.

**Non-goals**: local sandbox setup ([CLI](./codex-cli)); IDE first chat ([IDE](./codex-ide)); security scans ([Security](./codex-security)); plan numbers ([Plans](./chatgpt-plus)).

## What Cloud is — and is not

Cloud runs Codex on OpenAI-hosted machines against a **reproducible environment** you configure per repository. Each task gets its own isolated env. Several tasks can run at once. You review when they finish.

It is **not**:

- A fourth product. Hosted code review / QA is a Cloud workflow.
- A replacement for the laptop. Local CLI / IDE stay faster for a focused edit.
- ChatGPT Work Cloud. Work Cloud finishes a deck or research job; Codex Cloud writes code and opens a PR.

Desktop Codex stays in the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app). That surface is mapped on the [product line](./codex-ai) and in [Work vs Codex](./chatgpt-work#work-vs-codex-on-desktop) — do not look for a second desktop tutorial here.

## When to use Cloud

Official “use Cloud when…” list:

| Situation | Why Cloud |
| --- | --- |
| The job should run in the background | The laptop stays free |
| You want several attempts in parallel | `--attempts` / multiple chats, then pick |
| Work starts in **GitHub, Linear, or Slack** | Official integrations dispatch into Cloud |
| You are away from the development machine | Web UI or `codex cloud exec` |

Stay local when you need this machine’s files, a debugger attached to the current process, or a 30-second edit on the file you already have open ([IDE](./codex-ide)).

## First 15 minutes

### 1. Open Codex and sign in

Go to [chatgpt.com/codex](https://chatgpt.com/codex) and sign in with the same ChatGPT account you use for the CLI.

### 2. Connect GitHub

Authorize GitHub when prompted. Grant only the repositories Codex should see.

### 3. Create an environment

Open [environment settings](https://chatgpt.com/codex/settings/environments). Create an environment for the repo. Configure dependencies, tools, environment variables, and secrets the task needs.

Details: [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment). Internet: [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access).

### 4. Start a task

Back on [chatgpt.com/codex](https://chatgpt.com/codex), pick the environment and describe the **result**, not the vibe:

```text
Add a failing test for the date parser in packages/core, then make it pass.
Do not touch packages/legacy. Open a draft PR when tests are green.
```

Watch the logs, or leave it running.

### 5. Review, then merge on your terms

Read the summary and the diff. Ask for a follow-up, or open a pull request when the work is ready. Do not merge on “looks plausible.”

## From the CLI

```bash
codex cloud                                            # browse environments (Ctrl+O reveals IDs)
codex cloud exec --env <ENV_ID> "run the migration dry run"
codex cloud exec --env <ENV_ID> --attempts 3 "..."     # 1-4 attempts
```

`--attempts` is for nondeterministic tasks. Pick the best result; do not average them.

## Dispatch from GitHub, Linear, or Slack

Start a Cloud task without leaving the pull request, issue, channel, or thread.

| From | Official page |
| --- | --- |
| GitHub | [Use Codex with GitHub](https://learn.chatgpt.com/docs/third-party/github) |
| Linear | [Use Codex in Linear](https://learn.chatgpt.com/docs/third-party/linear) |
| Slack | [Use Codex in Slack](https://learn.chatgpt.com/docs/third-party/slack) |

The IDE can also hand a long task to Cloud and return you to the same chat: [delegate from the IDE](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension).

## Hosted review is Cloud, not a fourth product

| Surface | What it does |
| --- | --- |
| Local `/review` | Base-branch or uncommitted diff; does not change the tree |
| Cloud code review / QA | Review and QA in the hosted environment. Eligible customers get **GPT-5.6 Sol**; Cloud selects the model |
| Codex Security Review | PR + repo context + threat model. Research preview; see [Security](./codex-security) |

Local `/review` is a session command. Do not reuse the hosted-review name for it.

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Skipping the environment | Missing deps, failed installs, empty diffs | Configure the env before the first real task |
| Treating Cloud as a second laptop | Secrets and local-only tools are not there | Put secrets in the env; keep machine-local work local |
| Merging the first plausible PR | Tests never ran, or ran against the wrong tree | Read the diff; require the test output |
| Confusing Cloud with Work Cloud | You get a deck instead of a PR | Switch to **Codex** at [chatgpt.com/codex](https://chatgpt.com/codex) |
| Expecting Cloud while the laptop sleeps for Remote | Different products | [Remote](./codex-remote) drives a **connected computer**; Cloud does not need that machine |

## Real-world use

A frontend monorepo: three Cloud chats try the same flaky migration with `--attempts 3`. You keep editing the design-system package in the [IDE](./codex-ide). The winning Cloud attempt opens a draft PR. You review it on the phone with [Remote](./codex-remote) only if the laptop is still the review host — otherwise stay on the web Cloud UI.

## Next steps

1. Environment knobs → [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
2. Internet policy → [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
3. Editor handoff → [IDE](./codex-ide)
4. Phone approvals on a **local** host → [Remote](./codex-remote)
5. Wiring CI on your runners → [Project Integration](./integration)

## Official sources

- [Codex cloud (landing)](https://learn.chatgpt.com/codex/cloud)
- [Codex cloud (docs)](https://learn.chatgpt.com/docs/cloud)
- [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
- [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
- [GitHub](https://learn.chatgpt.com/docs/third-party/github) · [Linear](https://learn.chatgpt.com/docs/third-party/linear) · [Slack](https://learn.chatgpt.com/docs/third-party/slack)
- [Code review](https://learn.chatgpt.com/docs/code-review)
- [What's new](https://learn.chatgpt.com/docs/whats-new)
