---
listed: false
title: How to write prompts
description: "Write prompts for coding assistants and in-product models. Mechanisms live on Learn LLM chapter 15. This page is practice."
outline: [2, 3]
pageClass: catalog-page
prev: false
next:
  text: Be clear · Claude official
  link: /tech/prompt/claude-prompt-best-practices
domain: tech
tags:
  - prompt
navOrder: 1
llm:
  - 15
---

# How to write prompts

**Bottom line:** a vague prompt stays vague on a better model. Write the **task, constraints, output, and examples** first. Then XML / JSON / agents.

Why the tactics work (four-part system prompt, few-shot following the example, three JSON tiers, memory modes) lives on Learn LLM [chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory). This site only teaches **how to write, which tool to put it in, and how to check it in the repo**.

## Audience and non-goals

| | |
|---|---|
| **For** | Engineers who already open Cursor / Claude Code / Copilot, or who will call a model from a product |
| **Prerequisites** | [LLM basics](/tech/fundamentals/LLM) and the [context window](/tech/fundamentals/context) |
| **You will be able to** | Turn "please fix this" into an executable task; send product output through a schema; land an `AGENTS.md` the assistant will run |
| **Not this page** | Product click-paths → [Products](/products/). Attention / training / memory implementations → Learn LLM. Multi-tool loops → [Agents](/tech/patterns/agent/) |

## One concept table

| Remember | In engineering | Why (Learn LLM) |
|---|---|---|
| Standing rules in system / developer; this turn's data in user | Do not mix today's ticket with "how we always classify" | [Ch.15 A1](https://llm.zenheart.site/chapters/15-prompt-memory) |
| Examples must match the instructed format | JSON in the rules + prose examples → the model copies prose | [Ch.15 A2](https://llm.zenheart.site/chapters/15-prompt-memory) |
| JSON that must parse goes through the API schema | Do not rely on "please return valid JSON" | [Ch.15 A3](https://llm.zenheart.site/chapters/15-prompt-memory) |
| Production prompts live in code | Types, review, regression | [Ch.15 A4](https://llm.zenheart.site/chapters/15-prompt-memory) |
| Over-window history must be trimmed on purpose | Naive slices break tool pairings | [Ch.15 A5](https://llm.zenheart.site/chapters/15-prompt-memory) |

## How to read this section

```
This page (20 minutes: assistant first, then product)
  → 1. Claude official              XML / few-shot
  → 2. AGENTS.md                    one contract per repo
  → 3. Agent engineering            when the assistant must act
  → Appendix                        other products' system prompts
```

| You are stuck on | Read |
|---|---|
| Still typing "please fix this" | **Finish the assistant section below** |
| Official XML examples | [Be clear · Claude official](/tech/prompt/claude-prompt-best-practices) |
| Every assistant guesses the package manager | [AGENTS.md](/tech/prompt/agents-doc) |
| Product output must survive `JSON.parse` | [ZH JSON note](/zh/tech/prompt/json-prompt-best-practices) (schema how-to) |
| Compare vendor system prompts | [Appendix · System prompts](/tech/prompt/system-prompts-collection) |

## Coding assistant: a prompt you can send today

Do not send:

```text
please fix the settings page
```

Send:

```text
Task: fix the Save button on Settings in dark mode (white-on-white, clickable, invisible).
Files: read src/pages/Settings.vue first. Touch only this file and the tokens it uses.
Constraints: do not change light mode; do not add a CSS framework.
Done when: the button is readable in dark theme; pnpm test stays green.
Do not: rewrite Settings.
```

| Tool | Where the prompt lives | Product page |
|---|---|---|
| Cursor | This chat / agent; repeating rules in `.cursor/rules` or root `AGENTS.md` | [Cursor](/products/cursor/) |
| Claude Code | This chat; repo rules in `CLAUDE.md` + `AGENTS.md` | [Claude Code](/products/claude/claude-code) |
| Codex / Copilot Agent | This chat; cross-tool minimum is `AGENTS.md` | [Codex](/products/codex/) · [Copilot](/products/copilot/) |

The current task stays in the chat. `AGENTS.md` only holds rules that are always true for the repo.

## In-product model: the prompt is code

```ts
const system = `# Identity
You turn user feedback into a ticket a duty engineer can file.

# Instructions
- Use only the user's words. Do not invent repro steps.
- If repro is missing, nextAction must start with "Ask the user for:".

# Examples
<example>
<input>Forgot-password on login does nothing. Chrome 128.</input>
<output>
{"severity":"high","area":"auth","summary":"Forgot-password does not respond (Chrome 128)","nextAction":"Ask the user for: console error after the click"}
</output>
</example>`

const user = `<input>
${feedback}
</input>`
```

Keep `system` in a `buildTicketPrompt()` next to the feature. OpenAI is shutting down reusable prompt objects (`v1/prompts`, planned 2026-11-30). Do not treat the vendor console as the source of truth. For parseable JSON use a schema (see the [ZH JSON note](/zh/tech/prompt/json-prompt-best-practices)).

## Practice in this repo

Open the root `AGENTS.md` / `Claude.md`: `pnpm` only at the root, docs in Chinese, commit messages in English, `pnpm docs:build` before commit. That is the smallest landed prompt, not another theory page.

## Common pitfalls

- Eating the paper catalog (CoT / ToT) before the task is clear.
- Only writing bans.
- Nailing JSON with English instead of a schema.
- Reading leaked system prompts as a course.
- Rewriting everything on a model bump — usually you only retune initiative, verbosity, and stop conditions.

## Next

1. [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
2. [Claude official](/tech/prompt/claude-prompt-best-practices) → [AGENTS.md](/tech/prompt/agents-doc)
3. Wire a model from [Integrate](/integration/apis/)

## Go deeper

| Kind | Resource |
|---|---|
| Mechanisms | Learn LLM [chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) |
| Official | [Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) · [OpenAI](https://developers.openai.com/api/docs/guides/prompt-engineering) · [Gemini](https://ai.google.dev/gemini-api/docs/prompting-strategies) · [AGENTS.md](https://agents.md/) · [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) |
| Practice | [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [Cookbook](https://developers.openai.com/cookbook) |
| Notes | [brexhq/prompt-engineering](https://github.com/brexhq/prompt-engineering) |

Skip [Awesome ChatGPT Prompts](https://github.com/f/prompts.chat) as a first lesson.
