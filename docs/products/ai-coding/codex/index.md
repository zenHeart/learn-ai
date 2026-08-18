# Codex Family Learning Map

> Codex is OpenAI’s coding agent. It lives alongside ChatGPT Chat and ChatGPT Work in the same web and desktop app, plus CLI, IDE, and cloud. This page is the family map: the product tree first, then “what do I want to do?”
>
> Docs live at `learn.chatgpt.com/docs`. Older `developers.openai.com/codex/*` URLs 308 there.

## Product map

This is not “a CLI”. It is one account and several products. On 2026-07-09 the standalone Codex app merged into the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app): Chat, Work, and Codex in one window.

```
OpenAI coding & agent family
├── ChatGPT Chat (conversation) — questions, writing, comparing options
│   ├── Web chatgpt.com
│   ├── Desktop app (macOS / Windows; Linux preview)
│   └── Mobile (Remote continues a host session)
├── ChatGPT Work (knowledge-work agent) — finish a reviewable deliverable
│   ├── Cloud (default on the web; keeps running if you close the laptop)
│   ├── Local (desktop Work locally: files / apps on this machine)
│   ├── Scheduled tasks
│   ├── Plugins (Slack / Drive / SharePoint…)
│   └── Sites (hosted websites / internal tools, public beta)
├── Codex (coding agent) — write, debug, open a PR
│   ├── Terminal CLI         — most flexible, the CI entry
│   ├── IDE extension        — editor context, inline diffs
│   ├── Codex in the desktop app — visual diffs, PR sidebar, multi-repo
│   ├── Web chatgpt.com/codex
│   ├── Cloud                — isolated envs; GitHub / Linear / Slack
│   └── Remote               — phone continues local or cloud work
└── Retired: Atlas standalone browser
    └── Officially stopped 2026-08-09; browser-agent work moved into ChatGPT / Codex
```

One agent, one configuration model, several doors. Sandbox, approval policy, and `AGENTS.md` learned in the CLI apply in the IDE, desktop Codex, and Cloud. Work and Codex **share usage limits**.

### Decision tree: what do I want to do?

```
What do I want to do?
├── Write / debug / refactor / open a PR
│   └── → Codex
│       ├── Terminal or CI? → CLI (`codex` / `codex exec`)
│       ├── Anchored to the file I have open? → IDE extension
│       ├── Visual diff / PR sidebar? → Codex in the desktop app
│       ├── Away from the laptop / several parallel attempts? → Codex Cloud
│       └── Dispatch from GitHub / Linear / Slack? → Cloud + official integrations
├── Ask, write, compare, settle a design
│   └── → ChatGPT Chat (web, desktop, or mobile)
│       ├── Persistent topic context? → Project
│       ├── Hands-free? → desktop / iOS Voice
│       └── Ready to change the repo? → write the brief, hand it to Codex
├── A deck / sheet / brief / recurring update someone can open
│   └── → ChatGPT Work
│       ├── Sources in Drive / Slack? → install the plugin, `@mention` it
│       ├── Needs local files or apps? → desktop Work locally
│       ├── Must run after the laptop sleeps? → Cloud / web Work
│       └── Need a hosted internal page? → Sites (save a version, then deploy)
├── Connect an external service
│   └── → two layers
│       ├── Everyday SaaS (Drive / Slack / Notion-class) → Work / Chat plugins
│       └── Repo, CI, custom tools → Codex MCP (see Project Integration)
└── Still looking for the Atlas browser?
    └── → Standalone Atlas has stopped. Use the in-app browser, the Chrome
        extension, or Work’s cloud browser.
```

## Concepts you need early

Full definitions live in the [Glossary](./codex-glossary).

| Concept | One line | Where it shows up |
| --- | --- | --- |
| **Chat / Work / Codex** | Three ways to work in one app: talk, finish, code | Everywhere |
| **Sandbox** | Hard boundary on files and network | Codex |
| **Approval policy** | Whether it asks before acting | Codex |
| **`AGENTS.md`** | Project briefing loaded on every run | Every Codex surface |
| **MCP / Plugins** | Tools outside the repo; Work calls them plugins | Codex / Work |
| **Sites** | ChatGPT-hosted websites and apps (public beta) | Work / web |
| **Codex Cloud** | Parallel coding jobs in a hosted environment | Codex |
| **Atlas** | Retired standalone browser; capabilities moved into ChatGPT / Codex | Historical |

## Learning path

### Stage 1 — Tell Chat, Work, and Codex apart

Build the “one account, three modes” model before you touch the terminal.

**Goal**: switch Chat / Work / Codex, know what the plan includes, know where numbers live.

| Step | What | Link |
| --- | --- | --- |
| 1 | Product line: four Codex surfaces + the desktop merge | [Codex Product Line](./codex-ai) |
| 2 | Plans, login, pairing Chat with Codex | [ChatGPT Plans and Access](./chatgpt-plus) |
| 3 | Work: deliverables, local vs cloud, plugins, Sites | [ChatGPT Work](./chatgpt-work) |

### Stage 2 — Get the CLI working

The frontend-engineer path.

**Goal**: a read-only run on a repo you already know, with sandbox and `AGENTS.md` set.

| Step | What | Link |
| --- | --- | --- |
| 1 | Install, sign in, first read-only session | [Codex CLI](./codex-cli), steps 1–3 |
| 2 | TUI keys and slash commands | [CLI](./codex-cli) |
| 3 | `sandbox_mode` and `approval_policy` | [CLI](./codex-cli) step 6 |
| 4 | `/init` → `AGENTS.md` | [CLI](./codex-cli) step 7 |
| 5 | Task recipes | [Cookbook](./codex-cookbook) |
| 6 | Flags and config keys | [Cheatsheet](./codex-cheatsheet) |
| 7 | Definitions when words blur | [Glossary](./codex-glossary) |

If you only read two pages: [CLI](./codex-cli), then pin the [Cheatsheet](./codex-cheatsheet).

### Stage 3 — Real project and CI

**Goal**: a committed `AGENTS.md` and `.codex/config.toml`; `codex exec` in CI.

| Step | What | Link |
| --- | --- | --- |
| 1 | Instruction chain, trust, project config | [Project Integration](./integration) |
| 2 | MCP, hooks, subagents | [Integration](./integration) |
| 3 | `codex exec` + GitHub Action | [Integration](./integration) |

### Stage 4 — Cloud, hosted review, remote

**Goal**: stand up a Cloud environment; know which model hosted review uses.

| Step | What | Link |
| --- | --- | --- |
| 1 | When to use Cloud; `codex cloud exec` | [Product line · Cloud](./codex-ai#cloud-web-and-hosted-review) |
| 2 | Dispatch from GitHub / Linear / Slack | [Codex cloud](https://learn.chatgpt.com/docs/cloud) |
| 3 | Local `/review` vs hosted code review | [Code review](https://learn.chatgpt.com/docs/code-review) |

### Stage 5 — Work automation (knowledge work)

Axis B: Work sits after the Codex path. Frontend engineers still use it for agendas, Sites, and Slack.

| Step | What | Link |
| --- | --- | --- |
| 1 | Positioning and three official starter tasks | [ChatGPT Work](./chatgpt-work) |
| 2 | Local vs cloud, scheduled tasks | [Work](./chatgpt-work#2-choose-local-or-cloud) |
| 3 | Plugin and Sites boundaries | [Work](./chatgpt-work#plugins-the-connector-layer) |

## Feature lookup

### ChatGPT Chat

| Feature | For | Read |
| --- | --- | --- |
| Chat | Questions, drafts, settling a design | [Plans and access](./chatgpt-plus#chatgpt-chat-conversation) |
| Projects | Chats, files, and instructions under one topic | [Projects](https://learn.chatgpt.com/docs/projects) |
| Voice | Desktop / iOS, including files and Projects | [Voice](https://learn.chatgpt.com/docs/features/voice) |
| Library | Reuse saved files | [Plans and access](./chatgpt-plus) |

### ChatGPT Work

| Feature | For | Read |
| --- | --- | --- |
| Reviewable files | Decks / sheets / docs / PDFs | [ChatGPT Work](./chatgpt-work) |
| Local / cloud | Local files vs keep-running | [ChatGPT Work](./chatgpt-work#2-choose-local-or-cloud) |
| Plugins | Drive / Slack / SharePoint… | [ChatGPT Work](./chatgpt-work#plugins-the-connector-layer) |
| Sites | Hosted websites and apps (public beta) | [ChatGPT Work](./chatgpt-work#sites-when-you-need-a-hosted-page) |
| Scheduled tasks | Recurring research, agendas, watches | [ChatGPT Work](./chatgpt-work#a-recurring-update) |

### Codex

| Feature | For | Read |
| --- | --- | --- |
| CLI | Interactive in the repo; `codex exec` in CI | [CLI](./codex-cli) |
| IDE extension | Current file / selection | [Product line](./codex-ai) |
| Desktop Codex | Diffs, PR sidebar, multi-repo, Computer Use | [Product line](./codex-ai) |
| Web / Cloud | Hosted envs, parallelism, `--attempts` | [Product line](./codex-ai#cloud-web-and-hosted-review) |
| Hosted review | Cloud code review / QA; GPT-5.6 Sol for eligible customers | [Product line](./codex-ai#cloud-web-and-hosted-review) |
| `AGENTS.md` | Project briefing | [Integration](./integration) |
| MCP / Hooks / Skills / Plugins | Extension points | [Glossary](./codex-glossary) |
| Recipes | Refactors, tests, debugging | [Cookbook](./codex-cookbook) |
| Config lookup | Flags, keys, decision tables | [Cheatsheet](./codex-cheatsheet) |

## Models

As of August 2026 the recommended 5.6 family is **Sol / Terra / Luna**. The default **Power** setting is Sol at medium reasoning. Names move; [Models](https://learn.chatgpt.com/docs/models) wins.

| Model | Official role | How this guide uses it |
| --- | --- | --- |
| GPT-5.6 Sol | Flagship: hard coding, computer use, research, security | Cloud code review / QA selects Sol for eligible customers |
| GPT-5.6 Terra | Capability / cost balance | Everyday local and web work |
| GPT-5.6 Luna | Fastest, cheapest | Small edits, subagents, volume |
| GPT-5.3-Codex-Spark | ChatGPT Pro research preview | Pro only; see the pricing page |

`config.toml` samples still say `model = "gpt-5.6"`. The Chat-only Sol slider does **not** change Work or Codex. GPT-5.4 / 5.4 mini retire from ChatGPT-signed-in Codex on 2026-08-31.

## Honest limits

- **Read the diff and the generated file.** Plausible is not correct.
- **`danger-full-access` is named accurately.** Do not use it on unread code.
- **Search is cached by default.** Pass bare `--search` for a fast-moving library.
- **A Sites deploy URL is production.** Save a version first.
- **Details drift.** Stable releases land about weekly. When this guide disagrees with `learn.chatgpt.com/docs`, the docs win.

## Among the alternatives

| If you want | Consider |
| --- | --- |
| A terminal / cloud agent on an OpenAI plan | **Codex** |
| The knowledge-work agent on the same plan | [ChatGPT Work](./chatgpt-work) |
| The Anthropic-family counterpart | [Claude Code](../claude/) |
| An editor built around AI | [Cursor](../cursor) |
| Inline completion in an existing editor | [GitHub Copilot](../copilot) |

## Official sources

| Source | Use it for |
| --- | --- |
| [Codex docs root](https://learn.chatgpt.com/docs) | Everything |
| [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) | Chat / Work / Codex |
| [Get started with Work](https://learn.chatgpt.com/docs/get-started-with-work) | Work |
| [Codex cloud](https://learn.chatgpt.com/docs/cloud) | Hosted coding environments |
| [What's new](https://learn.chatgpt.com/docs/whats-new) | Weekly capability changes |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | The only authority on plans and quotas |
| [Evolving Atlas](https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work) | Atlas retirement (official) |
| [openai/codex](https://github.com/openai/codex) | Source and releases |

> Docs pages use `?surface=cli|app|ide`. If a page looks like another product, check the surface selector.
