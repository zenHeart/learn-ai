---
title: Prompt Engineering
description: "Turn intent into an executable instruction contract: task, constraints, examples, output format; a prompt is code — versioned, typed, testable."
domain: tech
tags: [contracts, prompt]
navOrder: 31
topicId: prompt
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [tech-map]
next: [context-window]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Prompt Engineering

> **Group**: Context group ｜ **Previous group exit**: locate your problem domain, audience, and next entry point ｜ **This topic exit**: rewrite a vague request into a four-element, acceptance-testable prompt, and manage that prompt as versioned, tested code
> **Prerequisites**: [tech-map](../index.md) ｜ **Next**: [Context Window](context-window.md)

## 1. Overview

**Bottom line**: a poorly written prompt cannot be rescued by switching models. A prompt is an instruction contract: the four elements — **task, constraints, examples, output format** — are the minimum basis for reproducible behavior. Prompts answer "how to express intent"; "what content the model sees this turn" is [context](context-engineering.md); "the output shape must parse" is [structured-output](../02-inference-interface/structured-output.md).

### Mental model: the developer message is a function definition, the user message is its arguments

OpenAI's official analogy (retrieved 2026-09-01): developer / system messages are like a **function definition** in a programming language (system rules and business logic), while user messages are the **arguments** passed to that function. This explains why "rules that always hold" belong in system / developer and "this turn's data" belongs in user — a ticket body should not be kneaded into the classification rules.

```text
┌────────────────────── the instruction contract of one request ──────────────────────┐
│ system / developer (function definition, higher priority)                           │
│   # Task        what to do, which object, desired end state                          │
│   # Constraints boundaries: what may change, what must not                          │
│   # Examples    input→output pairs (the model imitates the examples' format)         │
│   # Output      code-bound → schema; human-bound → format requirements               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ user (arguments, changes every turn)                                                 │
│   <input>this turn's raw data</input>                                                │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### When to use / when not to

| | |
|---|---|
| **Audience** | Engineers using coding assistants (Cursor / Claude Code / Copilot) or wiring models into products |
| **When to use** | The starting point of "make the model behave per intent"; the other three topics of this layer build on a clear prompt |
| **When prompt is not enough** | Needs external facts → [context](context-engineering.md) and [RAG](../04-grounding/rag.md); needs actions → [tool-calling](../05-action/tool-calling.md); output must parse reliably → [structured-output](../02-inference-interface/structured-output.md); style / domain knowledge must be baked into weights → fine-tuning (see decision table) |
| **Not this page** | Mechanisms of attention / few-shot → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory); vendor-specific product phrasing → Products |

### Decision table: change the prompt, the context, or fine-tune

| | Change the prompt | Change input content (context) | Fine-tune |
|---|---|---|---|
| **Direction** | "How it is said" | "What is shown" | "The model itself" |
| **Control** | Fully yours (text) | Fully yours (assembly) | Partly handed to training |
| **State** | Carried per request | Assembled per request, dynamic | Baked into weights, hard to roll back |
| **Trust domain** | Versionable, diffable | Data freshness needs governance | Needs datasets and evaluation gates |
| **Minimum complexity** | Lowest, always try first | Medium (manage sources and budget) | Highest, after the first two fail |
| **Typical symptom** | Unstable behavior, missing the point | Answers lack private / fresh facts | Format and style never stick |

**Version milestones**: unverified (no primary evidence for the timeline of prompting techniques; OpenAI has deprecated reusable Prompt objects — creation de-emphasized from 2026-06-03, `v1/prompts` scheduled to shut down 2026-11-30 — these are official documented dates, retrieved 2026-09-01).

## 2. Usage

### Minimal hands-on: four-element lint + prompt renderer (zero key)

15 minutes, Node 22 LTS. Demonstrates two things: missing four-element pieces are machine-detectable, and prompts rendered from a typed spec are **deterministic** — hence diffable and CI-able.

**Setup**: save as `prompt.ts`, run `npx tsx@4 prompt.ts`.

```ts
// fixture: prompt spec (the type is the contract) + deterministic rendering + lint
type PromptSpec = {
  task: string
  constraints: string[]
  acceptance: string[]
  nonGoals: string[]
  example?: { input: string; output: string }
}

/** The same spec always renders the same prompt text (diffable, cacheable, regression-testable). */
function renderPrompt(spec: PromptSpec): string {
  const sections: string[] = [
    '# Task', spec.task, '',
    '# Constraints', ...spec.constraints.map((c) => `- ${c}`), '',
    '# Acceptance', ...spec.acceptance.map((a) => `- ${a}`)
  ]
  if (spec.nonGoals.length > 0) {
    sections.push('', '# Non-goals', ...spec.nonGoals.map((n) => `- ${n}`))
  }
  if (spec.example) {
    sections.push('', '# Example',
      `<input>${spec.example.input}</input>`,
      `<output>${spec.example.output}</output>`)
  }
  return sections.join('\n')
}

// Contract lint: missing four-element pieces are machine-detectable
function lintPromptSpec(spec: PromptSpec): string[] {
  const issues: string[] = []
  if (spec.task.trim().length < 20 || !spec.task.includes(':')) {
    issues.push('task: no target object and symptom (should read "object: symptom -> outcome"); the assistant cannot locate the file')
  }
  if (spec.constraints.length === 0) {
    issues.push('constraints: empty — no boundaries, the assistant may rewrite the whole module')
  }
  if (spec.acceptance.length === 0) {
    issues.push('acceptance: empty — no decidable definition of "done", cannot be accepted')
  }
  if (spec.nonGoals.length === 0) {
    issues.push('nonGoals: empty — without declared non-goals everything is fair game')
  }
  return issues
}

const vagueSpec: PromptSpec = {
  task: 'Please fix the settings page',
  constraints: [],
  acceptance: [],
  nonGoals: []
}

const preciseSpec: PromptSpec = {
  task: 'Fix the Save button on the settings page: white-on-white text in dark mode, clickable but invisible → restore visible contrast',
  constraints: ['Only touch src/pages/Settings.vue and the tokens it references', 'Do not change light mode', 'Do not introduce a new CSS framework'],
  acceptance: ['Button contrast clearly visible under the dark theme', 'pnpm test still green'],
  nonGoals: ['Do not rewrite the entire settings page'],
  example: {
    input: 'In dark mode I clicked Save and nothing appeared, but it did save.',
    output: 'Located the hardcoded #fff background in Settings.vue; replaced with the --color-surface token; contrast restored.'
  }
}

for (const [name, spec] of [
  ['vague (before)', vagueSpec],
  ['precise (after)', preciseSpec]
] as const) {
  console.log(`\n=== ${name} ===`)
  const issues = lintPromptSpec(spec)
  if (issues.length === 0) {
    console.log('lint: PASS (four elements present)')
  } else {
    console.error('lint: FAIL')
    for (const issue of issues) console.error(`  ✗ ${issue}`)
  }
}

console.log('\n=== renderPrompt(preciseSpec) output (the final prompt that enters version control) ===')
console.log(renderPrompt(preciseSpec))
```

**Normal output** (excerpt):

```text
=== precise (after) ===
lint: PASS (four elements present)

=== renderPrompt(preciseSpec) output (the final prompt that enters version control) ===
# Task
Fix the Save button on the settings page: white-on-white text in dark mode, clickable but invisible → restore visible contrast
...
```

**Negative output** (missing four-element pieces detected):

```text
=== vague (before) ===
lint: FAIL
  ✗ task: no target object and symptom (should read "object: symptom -> outcome"); the assistant cannot locate the file
  ✗ constraints: empty — no boundaries, the assistant may rewrite the whole module
  ✗ acceptance: empty — no decidable definition of "done", cannot be accepted
  ✗ nonGoals: empty — without declared non-goals everything is fair game
```

**Acceptance command**: render twice and diff to empty (determinism; stderr FAIL lines do not enter the file, stdout is identical across runs):

```bash
npx tsx@4 prompt.ts > a.txt && npx tsx@4 prompt.ts > b.txt && diff a.txt b.txt && echo STABLE
```

**Cleanup**: delete `a.txt` / `b.txt`.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: single coding-assistant task | "please fix the settings page" | Rewrite with four elements, send | Acceptable change | Daily development | Cross-repo long tasks |
| Common: product prompt function | user-feedback stream | `buildTicketPrompt(feedback)` + schema | Stable ticket object | Production pipelines | One-off use (faster to write inline) |
| Combined: repo-level conventions | team invariants | Land an `AGENTS.md` (see [context](context-engineering.md)); the current task still goes in chat | Consistent cross-tool behavior | Team collaboration | Per-task details |

## 3. Principles

### Why this order of the four elements

1. **Task** first: the model must locate "which object, what symptom, what end state". A task without an object produces repo-wide wandering.
2. **Constraints** bound the blast radius: what may change, what must not.
3. **Examples** align format: models imitate example format and style — **examples must share the instruction's format**; when the instruction demands JSON but the example is prose, the model follows the example. Anthropic's advice (retrieved 2026-09-01): curate a few diverse, canonical examples rather than stuffing a laundry list of edge cases; the official phrasing calls examples "the pictures worth a thousand words for an LLM".
4. **Output contract** closes: format requirements for humans; schema for code ([structured-output](../02-inference-interface/structured-output.md)).

### Role hierarchy and "right altitude"

- Message priority: developer / system > user > assistant (consistent across the OpenAI model spec and Anthropic docs). Rules go high, data goes in user.
- **Right altitude** is Anthropic's rule for system prompts (retrieved 2026-09-01): overly specific (if-else logic hardcoded into prompts) is brittle and unmaintainable; overly abstract (vague high-level guidance) gives no behavioral signal. The sweet spot: specific enough to guide behavior, general enough to act as a heuristic — write "how to think when a problem arises", not "what to do in every case".
- **Minimal information set**: start with the strongest model and a minimal prompt, then add examples and rules based on observed failure modes. Minimal does not mean short.

### Prompt-as-code: why prompts live in code

OpenAI's official guidance (retrieved 2026-09-01): store production prompts in application code rather than the console / reusable Prompt objects — code-managed prompts get typed inputs, code review, tests, and your normal deployment process; the official deprecation of Prompt objects is announced (creation de-emphasized from 2026-06-03, `v1/prompts` scheduled to shut down 2026-11-30). Companion requirements: **pin model snapshots** and build tests / eval suites so behavior drift is visible on upgrades.

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| developer messages take priority over user | The fixture renders rules into the system section and data into `<input>` — same structure |
| Examples share the instruction's format | preciseSpec's example matches the output phrasing; lint does not check this (human review) |
| Production prompts live in code | `renderPrompt(spec)` is the minimal implementation of "prompts rendered from specs" |

### Key invariants

1. **One prompt, one owner**: a business has exactly one `renderPrompt`; hand-typed chat copies and console copies will drift.
2. **Changing a prompt = changing code**: PR, review, regression — no hot-editing in production.
3. **Acceptance must be decidable**: "done" inside a prompt must translate into a command or observable condition, or it is not acceptable.

## 4. Development

### Integration points

1. **Prompt builders live near the feature**: small module, typed arguments; dynamic values (user data, task options) go through parameters, not string concatenation.
2. **What changes when switching models**: usually three knobs — proactiveness (ask more?), verbosity (output length?), stopping condition (when to finish?); the four-element skeleton stays.
3. **Prompts and evals pair up**: every prompt change must answer "how do I prove it did not break" — minimal form is a fixed-input + expected-assertion regression set (advanced → [evaluation](../08-production/evaluation.md) bridge).

### Debug runbooks

#### R1 Behavior drift after a model swap

**Symptom**: after an upgrade the same prompt produces a new style: more verbose, eager to search, ignores format requirements.
**Evidence**: output diff of a fixed input set on old / new snapshots; classify the drift first (format / length / tool preference).
**Action**: adjust the matching section per class — format → strengthen examples and output contract; length → add length / paragraph constraints; behavior → tighten the task description. The four-element skeleton stays.
**Done when**: the regression set is green on the new model; the drift attribution is recorded in the PR description.

#### R2 The same rule exists twice; one copy was edited

**Symptom**: production behavior changes only partially, or alternates between normal and abnormal.
**Evidence**: grep the rule's key sentence repo-wide; a second copy shows up (hand-typed template / old script / console leftover).
**Action**: merge back into the single `renderPrompt`; delete the copy or turn it into a reference; add CI lint (the `lintPromptSpec` idea) so spec fields cannot regress to empty.
**Done when**: the rule text is repo-unique; behavior reproduces stably after deletion.

#### R3 Stale few-shot examples drag the format off course

**Symptom**: the output format slowly becomes the example's old format although the instruction was updated long ago.
**Evidence**: diff current output against example format — high similarity means "following the example, not the instruction".
**Action**: update examples to match the instruction's format; keep a small set of canonical pairs; add "examples must share the instruction's format" to the review checklist.
**Done when**: output returns to the instructed format; regression assertions cover the format check.

### Anti-patterns

- **Technique names as the main course**: CoT / ToT / ReAct are paper catalogs. When the task itself is unclear, techniques do not rescue it.
- **Only writing prohibitions**: besides `Do not use markdown`, write "answer in coherent paragraphs".
- **Wrestling JSON with natural language**: three guarantee tiers in [structured-output](../02-inference-interface/structured-output.md).
- **Treating leaked system prompts as textbooks**: they are appendix samples, not your contract.
- **Rewriting the whole prompt on a model swap**: run the regression set to classify drift first; usually only three knobs change (see R1).
- **Editing production prompts in the console**: no version, no review, no regression — exactly why Prompt objects were deprecated.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [Anthropic prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) ｜ [OpenAI prompt engineering guide](https://developers.openai.com/api/docs/guides/prompt-engineering) | The two official first entries: clarity, examples, role hierarchy |
| Builder | [Anthropic interactive tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) (official order: clarity first, XML only in chapter 4) ｜ [OpenAI Cookbook](https://github.com/openai/openai-cookbook) | Hands-on by chapter; the officials say practice "being clear" before format tricks |
| Operator | OpenAI guide's "prompt as code" and model-pinning sections ｜ Learn LLM [Chapter 15 A4](https://llm.zenheart.site/chapters/15-prompt-memory) | The operational face of versioning / regression / model swaps |
| Researcher | [OpenAI Model Spec](https://model-spec.openai.com/) (the normative source of message priority) ｜ Anthropic's "right altitude" argument ([context engineering article](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)) | The principle layer of behavior priority and prompt design |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| Anthropic prompt engineering overview | L1 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | Official tactics entry | Clarity / examples / XML / roles | Drill into single pages |
| OpenAI prompt engineering guide | L1 | https://developers.openai.com/api/docs/guides/prompt-engineering | Official tactics entry | developer-user analogy, prompt-as-code, snapshot pinning, Prompt object deprecation timeline | Read Structured Outputs |
| Anthropic interactive tutorial | L1 | https://github.com/anthropics/prompt-eng-interactive-tutorial | Hands-on practice | Official teaching order | Finish each chapter before the next |
| OpenAI Cookbook | L1 | https://github.com/openai/openai-cookbook | Example library | Official examples exist | Look up specific patterns |
| OpenAI Model Spec | L4 | https://model-spec.openai.com/ | Message-priority spec | developer > user priority | The arbiter for behavior priority |
| Learn LLM Chapter 15 | L2 | https://llm.zenheart.site/chapters/15-prompt-memory | Mechanism layer | Four-part structure / few-shot / JSON tiers / memory | When you need the "why" |

(retrievedAt: 2026-09-01; the two OpenAI URLs are the post-301 domain of platform.openai.com.)

### Active falsification and open questions

- This page's lint demonstrates "checking your own convention"; its heuristics (e.g. task must contain a colon) are not universal — re-define the rules per language / team, and do not ship it as a generic gate.
- "Three knobs on model swaps" comes from this repo's maintenance experience, not an official claim; re-evaluate on major model-generation shifts.
- Open: whether XML-tag benefits keep shrinking as models improve (Anthropic docs already say formatting importance "is likely becoming less important"; no quantified evidence).

### Where learn-ai stops / where to continue

- Prompts govern "how to say"; the next question is "what the model sees this turn" → [context](context-engineering.md).
- Output enters code → [structured-output](../02-inference-interface/structured-output.md).
- How prompt regressions become release evidence → [evaluation](../08-production/evaluation.md) (bridges to evals.zenheart.site).
- Attention and few-shot mechanisms → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).
