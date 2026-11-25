---
title: T3 Code learning map
description: "T3 Code is the open-source 'control plane for coding agents' from T3 Tools, Inc. It ships no model of its own; it drives the coding agents already installed on your computer, such as Claude Code and Codex, and lets you continue from your phone after you walk away. This page gives the product family table, how to choose, and how to read the three pages in this directory."
domain: product
tags:
  - coding-agent
  - agent-workspace
  - remote-access
role: map
---

# T3 Code learning map

> **The short version:** T3 Code is an open-source local app, officially positioned as **The open-source control plane for coding agents**. It provides no model and replaces none of your subscriptions; it drives the coding agents already installed on your computer, puts them in one interface with one approval flow, and lets you continue from your phone after you leave the computer.
>
> This set of pages answers four things: what it is, how to install it and get it running, how to use it day to day, and how it works inside.

## Basic facts

| Item | Value |
|---|---|
| Official name | T3 Code |
| Company | T3 Tools, Inc. (as written in the site footer, the README and the App Store developer field) |
| GitHub organization and repository | `pingdotgg`; repository [`pingdotgg/t3code`](https://github.com/pingdotgg/t3code) |
| License | Source code under MIT. The name, logo and brand are not covered by MIT |
| Website and download | [t3.codes](https://t3.codes), [t3.codes/download](https://t3.codes/download) |
| Command-line package name | `t3`, for example `npx t3@latest`; packages inside the repository use the `@t3tools` scope |
| Earliest visible release record | `v0.0.0-alpha.3`, released 2026-03-02 ([GitHub Releases](https://github.com/pingdotgg/t3code/releases/tag/v0.0.0-alpha.3), as of 2026-11-24) |
| Where the docs live | In the GitHub repository: `docs/user/` covers usage, `docs/internals/` covers internal design |

When this page was checked, the t3.codes footer offered only these entries: GitHub, Discord, Download, iOS app, Android app, Terms, Privacy and Security. No separate documentation site was found.

<!-- TODO: needs verification — the official announcement of the first public release (a release post or blog) was not found. The available evidence is the earliest entry in GitHub Releases (v0.0.0-alpha.3, 2026-03-02) and the repository creation time returned by the GitHub API (2026-02-08); the GitHub Releases API, the site homepage and one round of Chinese and English searches were checked, and none yielded a first-hand announcement link, so 2026-03-02 is not treated as the confirmed first-release date -->

## Audience / prerequisites / non-goals

- **Who**: frontend or AI application developers who already have two or more coding agents, especially anyone who has not used an "agent workspace" product before.
- **Prerequisites**: a computer you control (macOS, Windows 10 / 11, Linux); at least one agent that is installed and signed in, such as Claude Code or Codex.
- **Non-goals**:
  - No teaching of Claude Code or Codex themselves; go to [Claude Code](../claude/) and [Codex](../codex/).
  - No running models locally. The official FAQ states that T3 Code does not support local models.
  - No setting up Tailscale; go to [Tailscale](../tailscale/).
  - No expansion of T3 Chat, a separate product.

## Product family

Official names are copied from official pages and repository docs. This directory has only three pages, so most family members land in a section of the tutorial.

| Official name | Official URL | On this site |
|---|---|---|
| **Desktop app** (macOS / Windows / Linux) | [t3.codes/download](https://t3.codes/download) | Own page: [tutorial](./t3code), sections 6 and 7 |
| **`t3` command** | Terminal block of the download page, [Install doc](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md) | Own page: [tutorial](./t3code), section 6 |
| **Web** (hosted web app) | [app.t3.codes](https://app.t3.codes) | Own page: [tutorial](./t3code), section 8, subsection 2 |
| **Mobile app** (iOS and Android) | [App Store](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824), [Google Play](https://play.google.com/store/apps/details?id=com.t3tools.t3code) | Own page: [tutorial](./t3code), step 4 of section 6 and section 8, subsection 2 |
| **Background service** | [Running in the background](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/background-service.md) | Own page: [tutorial](./t3code), section 8, subsection 7 |
| **T3 Connect** (including the relay) | [Remote access](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/remote-access.md), [T3 Connect design notes](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/06_t3-connect.md) | Own pages: [tutorial](./t3code) and [source code walkthrough](./source) |
| **Guest links** (beta) | [Guest links](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/guest-links.md) | Own page: [tutorial](./t3code), section 11 |
| **Managed policy** | [Managed policy](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/managed-policy.md) | Own page: [tutorial](./t3code), section 11 |
| **Outside agents** (T3 Code's MCP server) | [Outside agents](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/outside-agents.md) | One row in this map: lets Claude Code, Codex or ChatGPT in your terminal drive T3 Code threads the other way round |
| **ACP Registry agents** | [ACP providers](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/providers-acp.md) | One row in this map: for the concept see section 3 of the [tutorial](./t3code); for the steps to add one see the official page |
| **Workflows** (early feature, in Labs) | [Workflows](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/workflows.md) | One row in this map: chain agents, schedules and human approval into one resumable run with TypeScript |
| **Device panel** (simulator panel) | [Devices](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/devices.md) | One row in this map: view an iOS simulator or an Android emulator next to a thread |
| **Triage** | [Triage an issue](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/triage.md) | One row in this map: for what it is see section 3 of the [tutorial](./t3code) |
| **T3 Chat** (another product) | See the [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md) | One row in this map: the one use this page verified is that linking an account raises the T3 Connect machine limit |

### Names that collide

- **T3 Code ≠ T3 Chat.** The latter is another T3 product. This page verified one use for it in the T3 Code docs: after you link a paid T3 Chat account, T3 Connect can link more machines.
- **T3 Code ≠ Claude Code or Codex.** It is the driver; those two are the agents being driven. The official FAQ says: "T3 Code uses those harnesses. It is not a harness, and it does not work without one."
- **T3 Tools, Inc. and `pingdotgg`.** The former is the company name written on official pages; the latter is its GitHub organization name.
- **T3 Connect ≠ Tailscale.** The former is T3's own remote connection method; the latter is a third-party network, which T3 Code treats as another optional connection route.
- **The `t3` command and the desktop app are not two products.** They are two ways to start the same server, and the desktop app ships with `t3` as well.
- **The name is not in the open-source license.** MIT covers only the source code. The official team requires public forks to replace the T3 Code name and icon and to state that they are not affiliated with the official project.

## What problem it solves

### Without it and with it

The left column is the situation many readers are in. This page treats it as a premise and makes no claims about the details of any particular product.

| Task | A separate terminal or app for each | With T3 Code |
|---|---|---|
| Using two agents at once | Two windows, each with its own interface | Switch inside one interface. README: Every agent in one place |
| Wanting to switch models midway through a task | You carry the context over yourself | Switch provider inside the same thread; T3 Code carries the conversation context over within a budget |
| Running several tasks in parallel | Open your own terminals and manage your own branches | One worktree per thread, each with its own branch and working directory |
| Seeing what changed and committing | Each has its own way | A unified diff panel and Git operations |
| You are away from the computer | You can approve only when you are back at it | Approve from the phone and receive notifications |
| The agent process crashes | Depends on each tool's own recovery ability | The thread record is stored persistently; the official glossary states that it survives provider process exits |

### Versus the alternatives

Only what can be verified is written. For other vendors' products, links go to this site's own pages for each.

| Option | What it is | Evidence |
|---|---|---|
| Each agent's own interface | Claude Code and Codex each have their own terminal and desktop app | This site: [Claude Code](../claude/), [Codex](../codex/) |
| **T3 Code** | A cross-vendor driver; bring your own subscriptions, and it drives the agents already installed | README, FAQ |
| Codex desktop app, Conductor, Claude Desktop, Cursor Glass | The four products T3 Code officially names as having "inspired it"; the official docs say none of them met T3 Code's own bar | FAQ: Why use T3 Code instead of Claude Code or the Codex app? |
| [Cindy](../cindy/) | A multi-agent workspace product of the same kind | See the Cindy page for the comparison; this page has not verified its details |
| [Tailscale](../tailscale/) | A connection route that solves "how to connect back to your computer"; it does not drive agents | T3 Code's Remote access doc lists it as an option besides T3 Connect |

## Quick decision: which one should I use

| My situation | What to use |
|---|---|
| One agent only, used occasionally | Start with its own interface: [Claude Code](../claude/) or [Codex](../codex/) |
| Two or more agents at once, and you want to switch between them in one window | The T3 Code desktop app |
| Run several tasks in parallel, each on its own branch | T3 Code; choose **New worktree** when you start a thread |
| Often away from the computer, and you want to approve from the phone | T3 Code plus T3 Connect, plus the mobile app |
| The company network blocks T3 Connect's outbound ports | T3 Code plus a direct LAN connection, or [Tailscale](../tailscale/) |
| Run it on your own server and connect remotely most of the time | Install it as a background service with `t3 up`, then connect with [app.t3.codes](https://app.t3.codes) or the phone |
| Do not want to pass through any T3 service | Leave T3 Connect off, use only a direct LAN or Tailscale connection, and turn telemetry off |
| Set a permission ceiling for the team's machines | T3 Code's managed policy |
| Compare it with similar products | [Cindy](../cindy/) |

## How to read this directory

| Page | What you can do after reading | When to read |
|---|---|---|
| [Tutorial](./t3code) | Install it, run the first thread end to end, choose a permission mode by scenario, continue from the phone, and state three security boundaries | The first time you use it |
| [Source code walkthrough](./source) | Follow the data flow of one thread, see which code enforces the permission modes, and understand the trust model of T3 Connect | After you are comfortable with it, or when preparing to submit a PR to T3 Code |

Suggested order:

1. **Read the [tutorial](./t3code) first.** The 10-minute vertical slice is in section 7 and runs as soon as the install is done. When a concept is unclear, go back to section 3.
2. **Then read the [source code walkthrough](./source).** It assumes you can already start a thread and switch permission modes; otherwise the words "command", "event" and "effect" have nothing to attach to.
3. **Come back to the family table on this page.** The tutorial expands only the most used members of the family; look up guest links, managed policy, the MCP server and the rest as you need them.

## Official resources (further reading)

The documentation links in the repository are pinned to commit `d00aaac8`; to read the latest version, replace the commit hash with `main`.

- [Official site t3.codes](https://t3.codes): positioning, the download entry, and a one-sentence list of the agents it supports.
- [Download page](https://t3.codes/download): installers for the three desktop platforms, the command-line install method, and the mobile store entries.
- [app.t3.codes](https://app.t3.codes): the hosted web app, which only connects to your own environment.
- [Repository README](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/README.md): what it is, which agents it supports, how to install it, and the license and brand policy.
- [docs/README.md](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/README.md): the table of contents for all the documentation, split into three parts: usage, internal design and the operations handbook.
- [Install T3 Code](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md): installation on each platform and how to sign in to each provider.
- [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md): cost, quotas, remote access, account bans, and "is T3 Code a harness".
- [Architecture](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/01_architecture.md): ownership boundaries and the design constraint "write to the database first, run effects afterwards".
- [SECURITY.md](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/SECURITY.md): who is trusted, what counts as a vulnerability, and what is intentional.
- [GitHub Releases](https://github.com/pingdotgg/t3code/releases): change logs for stable releases and nightlies.
- [Ideas under Discussions](https://github.com/pingdotgg/t3code/discussions/categories/ideas): where to propose features. The README states that a feature must first have an accepted discussion.
- [Discord](https://discord.gg/jn4EGJjrvv): the help channel given in the README; the invite page shows the server as Theo's Typesafe Cult.
- [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness): the official blog post on how the work is divided between the model, the harness, the agent and T3 Code.
- [Agent Client Protocol](https://agentclientprotocol.com/overview/introduction): the official introduction to ACP.

## Related pages (on this site)

- [Tutorial](./t3code), [Source code walkthrough](./source): the other two pages in this directory.
- [Claude Code](../claude/), [Codex](../codex/): the two agents that T3 Code drives.
- [Codex Dot](../codex/dot): the always-on agent on OpenAI's side; read it alongside this page when comparing "who keeps pushing a task forward".
- [Cindy](../cindy/): a multi-agent workspace product of the same kind.
- [Tailscale](../tailscale/): a connection route other than T3 Connect.
- [UU Remote](../uu-remote/): another kind of approach to "the person is not at the computer"; work out which kind you need first.
