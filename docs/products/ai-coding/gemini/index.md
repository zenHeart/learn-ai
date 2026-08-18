# The Gemini family

> Google's AI coding product line. This page tells you **what each of the seven products solves, and in what order to learn them**.
>
> **Since 2026-06-18**: individual accounts and Google AI Pro / Ultra can no longer use [Gemini CLI](./gemini-cli) or the [Code Assist](./code-assist) IDE extensions via **Login with Google**. Move to the [Antigravity](./antigravity) family. Standard / Enterprise licences and paid API keys are unchanged. Official sources: [consumer-account deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) and the [transition announcement](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli).

## Why this page exists

The family has many products, similar names and overlapping capabilities. The most common confusion is not "how do I use this product" but "which one should I use for this job".

Start from one dividing line: **who is driving.**

```
you type, AI completes                      → Code Assist
you give an instruction, AI runs it in your terminal → Gemini CLI
you set a goal, AI plans and executes       → Antigravity
you hand over a task, AI works in the cloud and returns a PR → Jules
```

The other three are off that main line: AI Studio controls the model itself, Canvas is for prototyping, and the Google AI subscription decides how much you can use.

## The seven products

### Core products

| Product | In one line | When to use it |
|---|---|---|
| [Gemini CLI](./gemini-cli) | an AI agent in your terminal | you want AI in pipes and scripts; the family's entry point |
| [Antigravity](./antigravity) | agent-first development platform | large cross-module changes you want to verify as they happen |
| [Jules](./jules) | asynchronous cloud coding agent | clearly bounded, time-consuming work you hand off and collect as a PR |

### More products and extensions

| Product | In one line | When to use it |
|---|---|---|
| [Canvas](./canvas) | an interactive workspace beside the conversation | a clickable prototype, fast |
| [Code Assist](./code-assist) | IDE integration | you do not want to change editor; your team has hard compliance requirements |
| [AI Studio](./ai-studio) | model and parameter console | tuning temperature, pinning a system prompt, large-context audits, API integration |
| [Google AI subscriptions](./google-pro) | tiers and quota | deciding which tier to pay for |

### Reference

| Page | Purpose |
|---|---|
| [Cookbook](./gemini-cookbook) | look up a recipe by "what I want to do" |
| [Cheatsheet](./gemini-cheatsheet) | decision tables, model status, subscription tiers, configuration paths |
| [Glossary](./gemini-glossary) | what Rules / Skill / Subagent / Artifact actually mean |

## Suggested learning order

The order above is not alphabetical and not by popularity. It follows **concept dependency** plus **audience complexity**:

1. **Start with [Gemini CLI](./gemini-cli).** It is the only complete tool in the family with no prerequisites, and it is where `.gemini/settings.json`, `gemini extensions install` and `GEMINI.md` are first introduced — all three are reused repeatedly later. Individual / Pro / Ultra accounts should do daily work in [Antigravity CLI](./antigravity); this page still starts at the CLI because it is the conceptual entry point, not because consumer **Login with Google** still works.
2. **Then [Antigravity](./antigravity).** It reuses those three concepts and adds rules, skills and subagents. After 2026-06-18 this is the daily entry point for individual developers. Skip the CLI and you will get stuck on "what is this configuration file".
3. **Then [Jules](./jules).** It layers a GitHub repository and PR workflow on top of autonomous agents.
4. After that, read Canvas / Code Assist / AI Studio / subscription tiers as you need them. They are independent of each other and do not form a chain.

**[Code Assist](./code-assist) comes later not because it is harder**, but because its official positioning targets "organizations with strict data security and compliance requirements", which is usually not an individual developer's first need. **[Subscription tiers](./google-pro)** come last because they answer "which tier should I pay for", a question that only makes sense once you know which tool you want.

## Quick decision

| My situation | Use |
|---|---|
| Want to try AI coding in the terminal | [Gemini CLI](./gemini-cli) |
| Have to change something spanning five modules | [Antigravity](./antigravity) |
| Have to upgrade React from 18 to 19 | [Jules](./jules) |
| Do not want to leave VS Code | [Code Assist](./code-assist) |
| Want AI to read the whole repository for an audit | [AI Studio](./ai-studio) |
| Need to show a product manager a prototype within half an hour | [Canvas](./canvas) |
| Want to know whether the free quota is enough | [Subscription tiers](./google-pro) |

The full decision table is in the [cheatsheet](./gemini-cheatsheet#which-tool).

## Shared concepts

A few things are reused across products. Recognising them up front saves a lot of repeated learning:

| Concept | Products |
|---|---|
| `GEMINI.md` | Gemini CLI, Antigravity (global rules) |
| `AGENTS.md` | Jules |
| MCP | Gemini CLI, Antigravity, Code Assist |
| Subscription quota | one subscription affects the available volume of several products |

Exact paths and differences are in the [glossary](./gemini-glossary) and [configuration in the cheatsheet](./gemini-cheatsheet#configuration).

## Subscriptions and quota

Subscriptions come in four tiers, AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x — **not two**. Model multipliers, storage and Google Cloud credit per tier are in [subscription tiers in the cheatsheet](./gemini-cheatsheet#subscription-tiers) and are not duplicated here.

<!-- TODO: needs verification — the actual prices of each tier. The official comparison page returns localised content per region and swallows the currency amounts, so no stably citable official price was found; check the official page for your region. -->

## Official resources

- [Gemini CLI documentation](https://geminicli.com/docs/)
- [Antigravity documentation](https://antigravity.google/docs/home)
- [Jules documentation](https://jules.google/docs/)
- [Code Assist documentation](https://developers.google.com/gemini-code-assist/docs/overview)
- [Gemini API model list](https://ai.google.dev/gemini-api/docs/models)
- [Google AI plan comparison](https://one.google.com/about/google-ai-plans/)
