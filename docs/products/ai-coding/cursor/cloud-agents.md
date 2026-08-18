# Cloud Agents

Cloud Agents use the same [agent fundamentals](https://cursor.com/learn/agents) but run in **isolated VMs** with a full development environment: cloned repos, installed dependencies, secrets, startup commands, and network access.

> Official: [Cloud Agents](https://cursor.com/docs/cloud-agent). **Former name: Background Agents** — one product, not two.
>
> This page is the **form**: when to use it, how to start it, what differs from local. Task recipes stay in the [cookbook](./cursor-cookbook#run-work-on-cloud-agents).

## Prerequisites

- A **paid** Cursor plan
- An account **admin** has connected source control: [GitHub](https://cursor.com/docs/integrations/github), [GitLab](https://cursor.com/docs/integrations/gitlab), [Bitbucket Cloud](https://cursor.com/docs/integrations/bitbucket), or [Azure DevOps](https://cursor.com/docs/integrations/azure-devops)
- Read-write access to the repo (and any dependent repos or submodules)
- You accept that Cloud is officially the feature that requires Cursor to **store code**. If policy forbids storage, leave Cloud off

## Learning objectives

After this page you can:

1. Decide Cloud vs local Agent vs Bugbot vs CLI
2. Start a run from desktop, web, mobile / PWA, Slack, GitHub, Linear, or `agent` + `&`
3. Treat **environment setup** as the main lever
4. Know the official MCP / Hooks limits on the VM

---

## Why use Cloud Agents

- Run **as many agents as you want in parallel**
- Your laptop does **not** need to stay online
- The VM can **build, test, and interact** with the changed software, including desktop / browser computer use
- Team [MCP servers](https://cursor.com/docs/mcp) (HTTP and stdio; OAuth when the server needs it)
- **Multi-repo** environments: inspect the workspace, make coordinated changes, open a PR **per repo it changes**. Official: **long-running is not available for multi-repo yet**

Official wording: skipping environment setup is like not giving engineers a computer.

## How to start one

| Surface | How |
|---------|-----|
| **Cursor Desktop** | Agent input → **Cloud** in the dropdown |
| **Cursor Web** | [cursor.com/agents](https://cursor.com/agents) on any device |
| **Cursor for iOS** | Native app — [mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **Android** | Chrome → [cursor.com/agents](https://cursor.com/agents) → **Install App** (PWA) |
| **Slack / Linear** | `@cursor` (admin installs the app first) |
| **GitHub / Bitbucket** | Comment `@cursor` on a PR or (GitHub) issue |
| **API** | Cloud Agents API |
| **Cursor CLI** | Prefix a message with `&` — see [CLI](./cursor-cli) |

Do **not** send “three lines under the caret” here — that is Tab. Do **not** use Cloud as a PR reviewer — that is [Bugbot](./cursor-cookbook#review-prs-with-bugbot).

## How it works

1. Cloud clones from the connected provider onto a **separate branch**
2. The agent works in the configured environment
3. It pushes and hands off (often a merge-ready PR plus artifacts)

Configure the environment with agent-led setup, a saved snapshot, or a Dockerfile via `.cursor/environment.json`. See [Cloud agent setup](https://cursor.com/docs/cloud-agent/setup). [Builds](https://cursor.com/docs/cloud-agent/builds) prepare repos and dependencies in the background.

Hover the repository name on an agent page to see which environment and Build that run used.

Runtime controls (official): secrets, outbound domain allowlists, Tailscale / similar for private networks, private connectivity for supported SCM paths. Full set: [Security and network](https://cursor.com/docs/cloud-agent/security-network).

## MCP and Hooks (official limits)

**MCP:** team servers from the MCP dropdown on [cursor.com/agents](https://cursor.com/agents). HTTP and stdio. OAuth supported. Built-in [Cursor Cloud MCP](https://cursor.com/docs/cloud-agent/capabilities.md#cursor-cloud-mcp) for run diagnostics (transcripts, events, environment, setup logs).

**Hooks:** command-based hooks from **`.cursor/hooks.json` in the repo**. Enterprise also runs team hooks and enterprise-managed hooks. They do **not** run during early read-only exploratory turns; they start once the agent has a writable environment.

Not available on Cloud:

- User-level `~/.cursor/hooks.json` (the VM has no access to your home directory)
- IDE-specific hooks (Tab hooks, `workspaceOpen`)

Supported families include tool / file hooks (`preToolUse`, `beforeShellExecution`, `afterFileEdit`) and lifecycle hooks (`beforeSubmitPrompt`, `subagentStart` / `subagentStop`, `preCompact`, `afterAgentResponse` / `afterAgentThought`, `stop`). Matrix: [Hooks · Cloud agent support](https://cursor.com/docs/hooks.md#cloud-agent-support).

## Artifacts, desktop, and sharing

- **Artifacts:** screenshots, videos, logs — what changed and how the agent verified it
- **Remote desktop:** take control of the agent's desktop to test without checking out the branch; release control so it continues
- **Share:** send the agent URL. Viewers must be on the **same Cursor team** and must connect their **own** SCM account with access to that repo. Team membership alone is not enough. Viewing is read-only unless a team admin enables [team follow-ups](https://cursor.com/docs/cloud-agent/settings.md#team-follow-ups)

## Models and billing

Cloud Agents use a curated model list. You can select context-window size on supported models. Larger windows can increase tokens and cost.

Charged at **API pricing** for the selected [model](https://cursor.com/docs/models-and-pricing.md#model-pricing). You set a spend limit the first time you use them.

## Mobile, JetBrains, Plugins, Automations

Index-level only — official pages, not extra tutorials:

| Surface | Official one-liner |
|---------|-------------------|
| **iOS / PWA** | Native iOS app (beta, iOS / iPadOS 26+) starts and reviews Cloud Agents. Android: install the PWA. [Mobile](https://cursor.com/docs/cloud-agent/mobile) |
| **JetBrains** | ACP agent inside IntelliJ / PyCharm / WebStorm. Paid plan + AI Assistant 2025.1+. [JetBrains](https://cursor.com/docs/integrations/jetbrains) |
| **Xcode** | Xcode 26.3+ built-in MCP: build, test, SwiftUI previews, Apple docs. [Xcode](https://cursor.com/docs/integrations/xcode) |
| **Plugins** | Bundles of rules, skills, agents, commands, MCP, hooks. [Plugins](https://cursor.com/docs/plugins) |
| **Automations** | Cloud Agents on a schedule or events (GitHub, GitLab, Slack, webhooks, Linear, …). Bugbot, Security Agents, and PR Routing are the three Cursor-managed agents on that page. [Automations](https://cursor.com/docs/cloud-agent/automations) |

## When to use it

| Cloud | Stay local |
|-------|------------|
| Away, overnight, many parallel runs | You must watch the diff, edit a plan, or use Debug Mode |
| Isolated VM + tests + PR | Secrets / services that never left your machine |
| Coordinated multi-repo PRs | One repo you already have checked out |

Task recipes (environment.json, AGENTS.md heading, dispatch checklist): [Cookbook · Cloud](./cursor-cookbook#run-work-on-cloud-agents).

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| Skip environment setup | Agent-led setup or `.cursor/environment.json` + Secrets tab |
| Expect local `mcp.json` / `~/.cursor/hooks.json` | Team MCP on cursor.com/agents; **project** command hooks only |
| Use Cloud as the PR reviewer | [Bugbot](./cursor-cookbook#review-prs-with-bugbot) |
| Spin a VM for three lines | Tab or `Cmd+K` |
| Multi-repo **long-running** | Official: **not available yet** |
| Teammate cannot open your run | Same team **and** their own SCM access to that repo |
| Put `.env.local` in a snapshot and call it done | Official preference: **Secrets** tab |
| Document “Background Agents” as a second product | Same product; new name is Cloud Agents |

## Next steps

- [Cookbook · Cloud](./cursor-cookbook#run-work-on-cloud-agents) — recipes
- [Cursor CLI](./cursor-cli) — `&` handoff from a terminal
- [Security Agents](./security-agents) / [PR Routing](./pr-routing) — Automations that run on Cloud
- [Origin](./origin) — Cloud can work against Origin remotes
- Official: [Overview](https://cursor.com/docs/cloud-agent), [Setup](https://cursor.com/docs/cloud-agent/setup), [Capabilities](https://cursor.com/docs/cloud-agent/capabilities), [Security](https://cursor.com/docs/cloud-agent/security-network)
