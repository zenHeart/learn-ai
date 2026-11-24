---
title: Cindy learning map
description: "Cindy is an open-source AI agent app for desktop and phone. It puts three harnesses, Claude Code, Codex and Pi, in one workspace, so that tasks, models and skills work across devices. This page is the product overview plus a decision table: it first answers 'what do I want to do, and should I use it', then points to the tutorial and the source code walkthrough."
domain: product
tags:
  - multi-agent
  - coding-agent
  - device-link
role: map
---

# Cindy learning map

> **The short version:** Cindy is an open-source AI agent app run by 心动 (XD), built for people who already use Claude Code or Codex:
> it puts three agent engines in one workspace, so that the same task and the same memory carry on across several engines and several devices.
> **If you want to use several coding agents together on one device, or pick up on your phone the work you started on the computer, read this directory.**
> If you use only one agent and need no second device, the original tool is simpler.

## Audience / prerequisites / non-goals

- **Who**: frontend engineers who already use, or plan to use, Claude Code or Codex, and want to know whether to install Cindy and how it relates to the tools they already have.
- **Prerequisites**: it is enough to know that "an agent can read files and run commands". Every term is explained the first time it appears in the [tutorial](./cindy).
- **Non-goals**:
  - No teaching of Claude Code, Codex or Pi themselves; see [Claude](../claude/), [Codex](../codex/) and [Pi](../pi-coding-agent).
  - No teaching of how to self-host a Cindy backend. The README states that the backend is "Not in this repo".
  - No coverage of procurement details for the Team and Enterprise editions; neither is open yet.

## Product family

The "Official name" column is copied from the official sites, the README and the repository docs opened on 2026-11-24. Rows marked "In-app" have no standalone page on the official site.

| Official name | Official URL | On this site |
|---|---|---|
| Cindy (open-source client, Apache-2.0) | [cindy.app](https://cindy.app) · [cindy.cn](https://cindy.cn) · [GitHub](https://github.com/makecindy/cindy/releases) | This directory: [tutorial](./cindy), [source code walkthrough](./source) |
| Mainland China edition / international edition | [cindy.cn/download](https://cindy.cn/download) · [cindy.app/download](https://cindy.app/download) | [Install section of the tutorial](./cindy) |
| Cindy's official model service (called Cindy AI in the interface) | [Mainland China pricing](https://cindy.cn/pricing) · [International edition pricing](https://cindy.app/pricing) | "Pricing" section of the tutorial |
| Mobile (iOS, iPadOS, Android) | Download page | "Connect a second computer and a phone" section of the tutorial |
| Linux desktop | International edition download page · [Installation guide](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/linux.md) | "Install" section of the tutorial |
| Device Link | In-app | "Connect a second computer and a phone" section of the tutorial; source code walkthrough |
| Remote desktop | In-app (phone app) | "Connect a second computer and a phone" section of the tutorial |
| Agent-Net (Beta) | In-app switch, off by default | Source code walkthrough |
| Companion | In-app | "Build a companion" section of the tutorial |
| Automation | In-app | "Set up automations" section of the tutorial |
| Chat channels (Slack, Telegram, Feishu and others) | In-app | "Connect chat channels" section of the tutorial |
| Orca (collaboration) | In-app | "Use Orca to split the work between several agents" section of the tutorial; source code walkthrough |
| SkillHub | In-app | "Make experience stick with memory and Skills" section of the tutorial |
| Official plugin repository cindy-official-plugins | [GitHub](https://github.com/makecindy/cindy-official-plugins) | One row in this map: the source of the official plugins and the listing process |
| Plugin engines (cindy-dsh-plugin, cindy-antigravity-plugin, cindy-zcode-plugin) | [GitHub organization](https://github.com/makecindy) | One row in this map: plugins that bring DeepSeek Harness, Antigravity CLI and ZCode in as engines |
| Cindy Host (`cindy-host`) | No public page; see `docs/host/README.md` in the repository | Source code walkthrough; experimental |
| Cindy Headless | No public page; see `apps/cindy-headless/README.md` in the repository | Source code walkthrough; built for containers and evaluation |
| Team and Enterprise editions (Team & Enterprise) | "Waitlist" on the official home page | One row in this map: the status is "coming soon" and "contact us" |
| Privacy policy, terms of service | [cindy.cn/privacy](https://cindy.cn/privacy) · [cindy.app/privacy](https://cindy.app/privacy) · [cindy.cn/terms](https://cindy.cn/terms) | "Security and privacy essentials" section of the tutorial |

<!-- TODO: needs verification — how the three plugin-engine repositories are installed and where they are available. I only confirmed that these three repositories exist under the organization and read their descriptions; I did not read their READMEs -->

### Names that collide and common misunderstandings

- **Check where Cindy comes from.** The repository is under the `makecindy` organization, and the only two official sites are `cindy.app` and `cindy.cn`.
- **The Mainland China edition is not the international edition.** Two official sites, two account systems. The README warns, for development: "Mainland China accounts must use `cn`; international edition accounts must use `global`".
- **A harness is not a model.** The harness is the execution engine (Claude Code, Codex, Pi); the model is a separate choice on another layer.
- **Pi is a harness, not a subscription.** The official site says: "Pi is a Harness. You do not need to buy another subscription."
- **The "task" in the interface is the session.** The official documentation switches between the Chinese word, "session" and "task"; they all refer to the same thing.
- **Device Link is not Agent-Net.** The first is the existing device-to-device connection; the second is the new version labeled Beta and turned off by default.
- **A companion is not a subagent.** A companion is a role that exists across tasks; a subagent is a one-off subtask executor inside one agent.
- **A Skill is not a plugin.** A Skill is a set of instructions; a plugin is a `.cindy` package that can bring its own UI and new tools.
- **"Skip Sign-In" is not a self-hosted server.** It only skips signing in to a Cindy account; the client still connects to the address of the official cloud service.
- **The source code carries a batch of old names.** Inside the repository the product is called `xdt-maker`, plugins are called Ghost, collaboration is called Orca, and environment variables are prefixed `XDT_`. Search by these names when you search the code.
- **`cindy-host` and `cindy-headless` are two different things.** The first is the general-purpose background service in `apps/host`; the second is the runtime for containers and evaluation in `apps/cindy-headless`.
- **The version numbers are easy to read backwards.** The earliest Release on GitHub is called `v1.0.0` (2026-07-25), while the versions released after it are numbered `v0.1.x`. `v1.0.0` has no installers attached; its notes say it "marks the open-source client source snapshot of the 1.0.0 release period". As of 2026-11-24, the latest stable release is `v0.1.144`.

## What problem it solves

The README describes the problem in one sentence: "Connect your computers and phone, bring the models and subscriptions you already use".
In daily work, it comes down to these recurring friction points:

| Scenario | Without Cindy | With Cindy |
|---|---|---|
| Using Claude Code and Codex at the same time | Switching to another agent means explaining the background from scratch | Switch harness inside the same task and carry on; Cindy carries the context over in a handoff text |
| You are away from the computer | The work stops on the computer | Open the same task on the phone or on another computer, continue the conversation and reach the files |
| Chat cannot handle it, and you must click through the software yourself | You have to go back to the computer | Remote desktop is built into the phone app |
| A model configured on one computer | Every other device has to be configured again | Once remote calls are allowed, other devices can borrow it |
| Working methods you have built up | Scattered across each tool's own configuration | Memory, Skills and companions are managed by Cindy in one place and shared across engines |
| Repetitive work | Started by hand every time | Make it an automation, or send one @-mention in a chat channel |
| One agent cannot keep up | You carry results between several tools by hand | Orca: one Lead with several Workers, each choosing its own harness and model |

There is one thing it does **not** do, and the official FAQ is clear about it: after the computer shuts down, the phone cannot keep a task running.
Remote tasks are executed by the computer; the phone "does not automatically move the work of an offline computer to the cloud to run".

### Compared with the alternatives

The table below states only the facts about Cindy's side that can be verified; for the details of other products, their own pages are authoritative.

| Tool | What it covers | Relation to Cindy | Who it suits |
|---|---|---|---|
| Claude Code, Codex, Pi | Each is a harness | Cindy puts all three inside; it does not replace them | People who use only one harness and need no second device: use the original tool |
| [T3 Code](../t3code/) | A multi-agent workspace of the same kind | Similar positioning; compare them item by item when choosing | People choosing between the two |
| [Tailscale](../tailscale/), [UU Remote](../uu-remote/) | Remote control and networking | Cindy's Device Link connects only the Cindy devices under your account, and remote desktop is built into the phone app only; it is not a general networking tool | People who need to connect to any device or service |
| [Codex cloud agent](../codex/dot) | Tasks run permanently in the cloud | Cindy lets your own computer act as the server; tasks and files stay on that machine, and the computer has to be online | People who do not want to maintain an always-on computer |
| Running agents on a server you build yourself | You deploy it and maintain it yourself | The README's wording is "no server rental or self-hosting setup" | People who need self-hosting and can accept that the server is not open source |

<!-- TODO: needs verification — the item-by-item differences between Cindy and T3 Code (which agents each supports, how each handles multiple devices, what each open-sources). This page does not research T3 Code; come back and fill in the comparison once that page is finished -->

## Quick decision: should you use it, and where to start

| My situation | What to use |
|---|---|
| I use only Claude Code, on only one computer | You do not need Cindy |
| I use two or more coding agents, and repeating the background each time is tedious | Use Cindy; first read "Switch harness and carry on" in the [tutorial](./cindy) |
| I am often away from the computer and want to see tasks on the phone | Use Cindy and sign in; read "Connect a second computer and a phone" |
| I want to operate the software on the computer from the phone | Use Cindy's remote desktop; first make sure the computer can stay online |
| The model is configured on one computer, and other devices want to borrow it | Use Cindy's model sharing; allow remote calls on that computer |
| I want to use it on one computer only and do not want the device to stay online | Use the local mode of "Skip Sign-In", with your own API key |
| I do not want to configure models myself | Sign in and use Cindy's official model service, paid per usage or by the month |
| I want several agents to each handle part of a large task | Use Orca; each Worker can choose a different harness |
| I have an always-on computer and want other devices to connect back to it | Use Cindy and sign in; turn on "Allow same-account devices to control this machine" on the computer |
| I have a fixed daily routine of checks and reports | Use automations and push the results to a chat channel |
| I need to audit the code or change it myself | The client is Apache-2.0; read the [source code walkthrough](./source) |
| I need a self-hosted backend or a private deployment | Not a fit for the personal edition; for self-deploying the Enterprise edition's Gateway, the official site says "contact us" |

## How to read this directory

| Page | What you can do after reading | When to read |
|---|---|---|
| [Tutorial](./cindy) | Install Cindy, run a first task in 10 minutes, connect the phone, set the privacy switches | The first time you come across it |
| [Source code walkthrough](./source) | Explain the data flow of one task, where Codex plugs in, the boundary of phone-to-computer control, and how Orca is implemented | When you want to audit the code or contribute, or when the tutorial does not make "why is it this way" clear |

Suggested order:

1. **Read the tutorial first, and complete the first task as it describes.** Reading the source before you have run it gets you blocked by a pile of terms.
2. **Then read "Security and privacy essentials" in the tutorial.** It decides whether you choose sign-in or Skip Sign-In.
3. **Read the source code walkthrough last, as needed.** It answers "why trust it"; it does not answer "how do I use it".

## Official resources

- [Chinese README in the repository](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/README.zh-CN.md): the official description of the features, the two running modes, privacy and telemetry; the first source for the facts.
- [Official site](https://cindy.cn): positioning, the difference between Harness and model, FAQ.
- [Download page](https://cindy.cn/download): system requirements for each platform.
- [Pricing page](https://cindy.cn/pricing): four price tiers, the rollover rules and eight billing rules, as of 2026-11-24.
- [Privacy policy](https://cindy.cn/privacy): the use of each kind of data, heartbeat and usage statistics, retention periods.
- [Terms of service](https://cindy.cn/terms): where responsibility lies in bring-your-own-key mode and in official gateway mode.
- [GitHub Releases](https://github.com/makecindy/cindy/releases): release notes version by version.
- [Official plugin repository](https://github.com/makecindy/cindy-official-plugins): the source of the official plugins, the review criteria and the automatic listing process.
- [Usage support](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/SUPPORT.md): where to look first when you hit a problem, and how to file an issue.

## Related pages

- [Tutorial](./cindy), [source code walkthrough](./source): the other two pages in this directory.
- [Claude](../claude/), [Codex](../codex/), [Pi](../pi-coding-agent): the three harnesses Cindy puts inside.
- [T3 Code](../t3code/): a multi-agent workspace of the same kind.
- [Tailscale](../tailscale/), [UU Remote](../uu-remote/): remote control and networking tools.
- [Codex cloud agent](../codex/dot): another approach, with tasks running permanently in the cloud.
