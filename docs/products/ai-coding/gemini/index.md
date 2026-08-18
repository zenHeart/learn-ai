# The Gemini family

> Google's AI coding and creative product line. This page is the **product map plus a decision tree**: first "what am I trying to do → which product", then the individual pages.
>
> **Since 2026-06-18**: individual accounts and Google AI Pro / Ultra can no longer use [Gemini CLI](./gemini-cli) or the [Code Assist](./code-assist) IDE extensions via **Login with Google**. Move to the [Antigravity](./antigravity) family. Standard / Enterprise licences and paid API keys are unchanged. Official sources: [consumer-account deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) and the [transition announcement](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli).

## Product map

The coding line is split by **who is driving**. Film and prototypes sit where Claude Design sits in that family — they do not compete with the terminal.

```
Gemini family
├── Coding line (who is driving)
│   ├── you type, AI completes                         → Code Assist
│   ├── you instruct, AI runs it in your terminal      → Gemini CLI
│   ├── you set a goal, AI plans and executes          → Antigravity
│   └── you hand over a task, AI returns a PR          → Jules
├── Prototypes and film (Claude Design counterpart)
│   ├── a clickable interactive prototype              → Canvas
│   └── landing-page / launch / product-demo video     → Google Flow
├── Models and subscription
│   ├── tune the model, call the API                   → AI Studio
│   └── which tier, how much quota                     → Google AI plans
└── Also in Pro, no standalone tutorial
    ├── Gemini Spark (US, personal agent)
    ├── Gemini Notebook (research / writing)
    ├── Gemini app + Deep Research
    ├── Gemini in Chrome auto browse (US)
    ├── Gemini in Android Studio
    └── Google Flow Music (flowmusic.app; credits separate from Flow)
```

Dreambeans, Health Premium, Home Premium, TV Create Hub, Earth and Photos Remix travel with the same subscription and are **irrelevant to coding**. This site does not document them. One line lives on the [subscription page](./google-pro#what-else-the-plan-includes).

### Quick decision: which one?

```
What am I trying to do?
├── Write / debug / refactor / open a PR
│   ├── In the terminal, into a pipe?
│   │   ├── personal account → Antigravity CLI
│   │   └── Standard / Enterprise or an API key → Gemini CLI
│   ├── Cross-module, watch it as it works? → Antigravity
│   ├── Clearly bounded, hand it off for a PR? → Jules
│   └── Stay in the IDE, or the team has a hard compliance need? → Code Assist
├── Interactive prototype / a page you can click
│   └── → Canvas
│       └── once you pick a direction → Antigravity writes it into the repo
├── Landing-page film / product demo / storyboard
│   └── → Google Flow
│       └── songs / music videos → Flow Music (separate credits; no extra tutorial)
├── Temperature, pinned system prompt, large context, API
│   └── → AI Studio
└── Which tier to buy, is the quota enough
    └── → Google AI plans (the table lives only in the cheatsheet)
```

The full comparison is in the [cheatsheet](./gemini-cheatsheet#which-tool).

## Core products

Tutorials stay expanded. The Cookbook sits next to them and stays expanded too.

| Product | In one line | When to use it |
|---|---|---|
| [Gemini CLI](./gemini-cli) | an AI agent in your terminal | you want AI in pipes and scripts; the family's conceptual entry point |
| [Antigravity](./antigravity) | agent-first development platform | large cross-module changes you want to verify as they happen |
| [Jules](./jules) | asynchronous cloud coding agent | clearly bounded, time-consuming work you hand off and collect as a PR |
| [Cookbook](./gemini-cookbook) | look up a recipe by "what I want to do" | after the main tutorials, when you start doing the work |

## More products and extensions

Collapsed by default. Axis A: no prerequisite concepts. Axis B: relevance to frontend engineers — [Flow](./flow) is the Claude Design counterpart, and sits next to [Canvas](./canvas).

| Product | In one line | When to use it |
|---|---|---|
| [Canvas](./canvas) | an interactive workspace beside the conversation | a clickable prototype, fast |
| [Google Flow](./flow) | AI creative studio (Veo 3.1 / Nano Banana / Gemini Omni) | landing-page, launch and product-demo video |
| [Code Assist](./code-assist) | IDE integration | you do not want to change editor; your team has hard compliance requirements |
| [AI Studio](./ai-studio) | model and parameter console | tuning temperature, pinning a system prompt, large-context audits, API integration |
| [Google AI subscriptions](./google-pro) | tiers and quota | deciding which tier to pay for; drawing Pro entitlements onto the family map |

## Reference

Cheatsheet / Glossary stay expanded. Shared tables are written once; other pages only link here.

| Page | Purpose |
|---|---|
| [Cheatsheet](./gemini-cheatsheet) | decision tables, model status, subscription tiers, configuration paths |
| [Glossary](./gemini-glossary) | what Rules / Skill / Subagent / Artifact / Flow actually mean |

## Suggested learning order

The order follows **concept dependency (axis A)** plus **audience complexity (axis B)**. It is not alphabetical and not by popularity:

1. **Start with [Gemini CLI](./gemini-cli).** It is the only complete tool in the family with no prerequisites, and it is where `.gemini/settings.json`, `gemini extensions install` and `GEMINI.md` are first introduced — all three are reused repeatedly later. Individual / Pro / Ultra accounts should do daily work in [Antigravity CLI](./antigravity); this page still starts at the CLI because it is the conceptual entry point, not because consumer **Login with Google** still works.
2. **Then [Antigravity](./antigravity).** It reuses those three concepts and adds rules, skills and subagents. After 2026-06-18 this is the daily entry point for individual developers. Skip the CLI and you will get stuck on "what is this configuration file".
3. **Then [Jules](./jules).** It layers a GitHub repository and PR workflow on top of autonomous agents.
4. **When you start doing the work, use the [Cookbook](./gemini-cookbook).** Look up parameters in the [cheatsheet](./gemini-cheatsheet); when two concepts blur, open the [glossary](./gemini-glossary).
5. After that, read Canvas / Flow / Code Assist / AI Studio / subscription tiers as you need them. They are independent of each other and do not form a chain. Flow has no axis-A prerequisite; on axis B it is mid-to-high relevance for frontend engineers (you will need it when you present a feature), so it belongs in "more products", not in the core group.

**[Code Assist](./code-assist) comes later not because it is harder**, but because its official positioning targets "organizations with strict data security and compliance requirements", which is usually not an individual developer's first need. **[Subscription tiers](./google-pro)** come last because they answer "which tier should I pay for", a question that only makes sense once you know which tool you want.

## Quick decision

| My situation | Use |
|---|---|
| Want to try AI coding in the terminal | [Gemini CLI](./gemini-cli) (enterprise / API key) or [Antigravity](./antigravity) (individual) |
| Have to change something spanning five modules | [Antigravity](./antigravity) |
| Have to upgrade React from 18 to 19 | [Jules](./jules) |
| Do not want to leave VS Code | [Code Assist](./code-assist) |
| Want AI to read the whole repository for an audit | [AI Studio](./ai-studio) |
| Need to show a product manager a prototype within half an hour | [Canvas](./canvas) |
| Need a video for a landing page, launch film or product demo | [Google Flow](./flow) |
| Want to know whether the free quota is enough | [Subscription tiers](./google-pro) |

## Shared concepts

A few things are reused across products. Recognising them up front saves a lot of repeated learning:

| Concept | Products |
|---|---|
| `GEMINI.md` | Gemini CLI, Antigravity (global rules) |
| `AGENTS.md` | Jules |
| MCP | Gemini CLI, Antigravity, Code Assist |
| Subscription quota | one subscription affects the available volume of several products |
| Flow credits | [Google Flow](./flow) only; not the same ledger as Flow Music or Antigravity AI credits |

Exact paths and differences are in the [glossary](./gemini-glossary) and [configuration in the cheatsheet](./gemini-cheatsheet#configuration).

## Subscriptions and quota

Subscriptions come in four tiers, AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x — **not two**. Model multipliers, storage and Google Cloud credit per tier are in [subscription tiers in the cheatsheet](./gemini-cheatsheet#subscription-tiers) and are not duplicated here. Flow's daily / monthly credits are on [Flow](./flow#credits). Coding-relevant Pro entitlements are on the [subscription page](./google-pro).

<!-- TODO: needs verification — the actual prices of each tier. The official comparison page returns localised content per region and swallows the currency amounts, so no stably citable official price was found; check the official page for your region. -->

## Official resources

- [Gemini CLI documentation](https://geminicli.com/docs/)
- [Antigravity documentation](https://antigravity.google/docs/home)
- [Jules documentation](https://jules.google/docs/)
- [Code Assist documentation](https://developers.google.com/gemini-code-assist/docs/overview)
- [Gemini API model list](https://ai.google.dev/gemini-api/docs/models)
- [Google Flow](https://labs.google/fx/tools/flow)
- [Google AI Pro benefits](https://support.google.com/googleone/answer/14534406)
- [Google AI plan comparison](https://one.google.com/about/google-ai-plans/)
