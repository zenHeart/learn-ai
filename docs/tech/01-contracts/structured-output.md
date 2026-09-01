---
title: Structured Output
description: "If output enters code, use a JSON Schema constrained-decoding contract plus a caller-side validation layer; yelling 'must be valid JSON' in a prompt is not a contract. Includes a zero-key runnable validation loop."
domain: tech
tags: [contracts, structured-output, json-schema]
navOrder: 13
topicId: structured-output
layer: "1"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [prompt]
next: [tool-calling]
specVersion: "JSON Schema (draft-07 subset per provider)"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Structured Output

> **Layer**: 1 · Interaction Contracts ｜ **Previous layer exit**: locate your problem domain, audience, and next entry point ｜ **This topic exit**: write a JSON Schema output contract, add a caller-side validation layer with failure retry, and know how the two failure classes (refusal and truncation) are accepted
> **Prerequisites**: [prompt](prompt.md), [context](context.md) ｜ **Next**: [tool-calling](tool-calling.md)

## 1. Overview

**Bottom line**: whenever model output flows into code past `JSON.parse`, define the output shape as a **JSON Schema** (a spec language for describing JSON structure) contract, enforce it with the provider's constrained decoding, and keep an independent validation layer in the caller. Writing "please output valid JSON" in a prompt is not a contract — it has no machine-decidable failure condition.

This page is the pilot chapter of Layer 1: the full validation loop runs with zero API keys, and the negative cases (missing field, extra field, wrong type) are all demonstrated.

### Mental model: two routes, one invariant

```text
Route A: prompt convention (soft constraint)
  prompt "please output JSON" ──free sampling──▶ arbitrary text ──▶ JSON.parse ──▶ ❌ may carry ```json fences, missing commas, pleasantries

Route B: schema-constrained decoding (hard constraint)
  json_schema + strict ──samples per schema during decoding──▶ text necessarily matching the schema ──▶ JSON.parse ──▶ ✅ shape guaranteed

Invariant (holds on both routes):
  the caller-side validation layer always exists — the provider guarantees "shape";
  semantics (is the date sensible, are fields mutually consistent) stay yours
```

The two routes are not a binary choice but three guarantee tiers: prompt convention (no guarantee), JSON mode (parseable only), schema constraint (shape guaranteed). The engineering meaning of each tier is in the decision table below.

### When to use / when not to

| | |
|---|---|
| **Audience** | Frontend and full-stack engineers wiring model output into TypeScript / databases / downstream APIs |
| **When to use** | Data extraction, classification and labeling, any field that enters code, segmented data for UI generation |
| **When not to use** | Prose answers for humans (free text is fine); action requests to execute → [tool-calling](tool-calling.md); needs external facts first → [RAG](../03-grounding/rag.md) |
| **Not this page** | Why models can be grammar-constrained (sampling and decoding mechanics) → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory); output quality evaluation → [evaluation](../05-operations/evaluation.md) |

### Decision table: choosing among three guarantee tiers

| | "Output JSON" in prompt | JSON mode | Schema-constrained decoding |
|---|---|---|---|
| **What is guaranteed** | Nothing. Common: ```json fences, missing commas, surrounding pleasantries | Only that `JSON.parse` succeeds | Fields, types, and required keys match the schema |
| **Where control lives** | Entirely in sampling probability | Provider decoder (bracket pairing only) | Provider decoder + your schema |
| **State** | Re-gambled per request | Same | Deterministic contract, CI-able |
| **Trust domain** | Untrusted | Trust only "it is JSON" | Trust the shape, not the semantics |
| **Minimum complexity** | Lowest, with uncontrolled failure rate | Low; officially marked as the legacy path (OpenAI recommends always using Structured Outputs instead of JSON mode) | Slightly higher (maintain a schema); the product default tier |

**Version milestones** (all from official docs, retrieved 2026-09-01): OpenAI Structured Outputs supports `response_format: json_schema` from `gpt-4o-mini-2024-07-18` and `gpt-4o-2024-08-06` onward; Anthropic structured outputs is a public beta (beta header `structured-outputs-2025-11-13`) covering Sonnet 4.5, Opus 4.1, Opus 4.5, and Haiku 4.5. Any other adoption or timeline claims: unverified.

## 2. Usage

### Minimal hands-on: a zero-key "schema → mock model → validate → retry on failure" loop

15 minutes, Node 22 LTS, no dependencies, no keys. The mock model is deterministic (fixed input, fixed output): the first attempt returns a bad output and a corrected one after receiving validation-error feedback — demonstrating why the validation layer must exist and how retry closes the loop.

**Setup**: create a directory, save the code below as `structured-output.ts` (fixture provenance: `npx tsx@4 structured-output.ts`).

```ts
// fixture: isomorphic to the real API's json_schema parameter; the mock is deterministic
type Ticket = {
  severity: 'low' | 'medium' | 'high'
  area: 'ui' | 'api' | 'auth' | 'other'
  summary: string
  nextAction: string
}

const ticketSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    severity: { type: 'string', enum: ['low', 'medium', 'high'] },
    area: { type: 'string', enum: ['ui', 'api', 'auth', 'other'] },
    summary: { type: 'string' },
    nextAction: { type: 'string' }
  },
  required: ['severity', 'area', 'summary', 'nextAction']
} as const

// In a real system, swap this for the provider call passing the same schema:
//   openai.chat.completions.create({ response_format: { type: 'json_schema',
//     json_schema: { name: 'ticket', strict: true, schema: ticketSchema } } })
//   or Anthropic's output_format. The mock deliberately "fails on the first try":
//   it demonstrates that the validation layer must exist.
const RAW_BAD_ATTEMPT =
  '{"severity": 2, "area": "auth", "summary": "Forgot-password button unresponsive on Chrome 128", "confidence": "high"}'
const RAW_GOOD_ATTEMPT =
  '{"severity": "high", "area": "auth", "summary": "Forgot-password button unresponsive on Chrome 128", "nextAction": "Ask the user for: the console error and a network-panel screenshot after clicking"}'

/** No retry feedback → bad output; with validation-error feedback → corrected output. Fixed input, fixed output, reproducible. */
function mockModelCall(retryFeedback: string | null): string {
  if (retryFeedback === null) return RAW_BAD_ATTEMPT
  return RAW_GOOD_ATTEMPT
}

// Caller-side validation layer (minimal; use Zod / ajv in production)
type ValidationIssue = { path: string; problem: string }

function validateTicket(candidate: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (typeof candidate !== 'object' || candidate === null || Array.isArray(candidate)) {
    return [{ path: '$', problem: 'expected a JSON object' }]
  }
  const obj = candidate as Record<string, unknown>
  const allowedKeys = Object.keys(ticketSchema.properties)

  for (const key of Object.keys(obj)) {
    if (!allowedKeys.includes(key)) {
      issues.push({ path: `$.${key}`, problem: 'additional property not allowed by schema' })
    }
  }
  for (const key of allowedKeys) {
    if (!(key in obj)) {
      issues.push({ path: `$.${key}`, problem: 'required field is missing' })
      continue
    }
    const value = obj[key]
    if (key === 'severity' || key === 'area') {
      const enumValues = [...ticketSchema.properties[key].enum]
      if (typeof value !== 'string' || !enumValues.includes(value)) {
        issues.push({
          path: `$.${key}`,
          problem: `expected one of ${enumValues.join(' | ')}, got ${JSON.stringify(value)}`
        })
      }
    } else if (typeof value !== 'string') {
      issues.push({ path: `$.${key}`, problem: `expected string, got ${typeof value}` })
    }
  }
  return issues
}

function buildRetryFeedback(issues: ValidationIssue[]): string {
  return issues.map((i) => `- ${i.path}: ${i.problem}`).join('\n')
}

// generate → validate → retry-on-failure loop
function extractTicket(maxAttempts = 3): Ticket {
  let retryFeedback: string | null = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const raw = mockModelCall(retryFeedback)
    console.log(`[attempt ${attempt}] raw model output:`)
    console.log(raw)

    const candidate: unknown = JSON.parse(raw)
    const issues = validateTicket(candidate)
    if (issues.length === 0) {
      console.log(`[attempt ${attempt}] schema validation: PASS`)
      return candidate as Ticket
    }

    console.error(`[attempt ${attempt}] schema validation: REJECTED`)
    for (const issue of issues) console.error(`  ✗ ${issue.path}: ${issue.problem}`)

    retryFeedback = buildRetryFeedback(issues)
    console.log(`[attempt ${attempt}] retry prompt will carry:\n${retryFeedback}\n`)
  }
  throw new Error(`schema validation still failing after ${maxAttempts} attempts — escalate, do not parse`)
}

const ticket = extractTicket()
console.log('\naccepted ticket:')
console.log(JSON.stringify(ticket, null, 2))
```

**Run command**:

```bash
npx tsx@4 structured-output.ts
```

**Normal output** (excerpt; the negative output is demonstrated in the same run — the first attempt is rejected):

```text
[attempt 1] raw model output:
{"severity": 2, "area": "auth", "summary": "Forgot-password button unresponsive on Chrome 128", "confidence": "high"}
[attempt 1] schema validation: REJECTED
  ✗ $.confidence: additional property not allowed by schema
  ✗ $.severity: expected one of low | medium | high, got 2
  ✗ $.nextAction: required field is missing
[attempt 1] retry prompt will carry:
- $.confidence: additional property not allowed by schema
...

[attempt 2] raw model output:
{"severity": "high", "area": "auth", "summary": "Forgot-password button unresponsive on Chrome 128", "nextAction": "Ask the user for: ..."}
[attempt 2] schema validation: PASS

accepted ticket:
{
  "severity": "high",
  "area": "auth",
  "summary": "Forgot-password button unresponsive on Chrome 128",
  "nextAction": "Ask the user for: the console error and a network-panel screenshot after clicking"
}
```

All three negative classes are visible in one output: **extra field** (`confidence`), **wrong type** (`severity` is a number, not an enum string), **missing field** (`nextAction`). All three are rejected by the validation layer and enter retry.

**Acceptance command**: run twice and byte-diff (deterministic mock) — the minimal form of turning "controllable output" into a regression test:

```bash
npx tsx@4 structured-output.ts > run1.txt && npx tsx@4 structured-output.ts > run2.txt && diff run1.txt run2.txt && echo DETERMINISTIC
```

**Cleanup**: delete the temporary directory and `run1.txt` / `run2.txt`.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: ticket extraction | user-feedback text | schema + system prompt | a `Ticket` object | forms, labeling, routing | long-form prose answers |
| Common: nested structure | multi-step reasoning task | nested schema of `steps[]` + `final_answer` | stepwise structure | tutored explanations, chain descriptions | wide tables with hundreds of keys |
| Combined: extraction + action | triage a ticket and file an issue | this page's schema + a [tool-calling](tool-calling.md) tool schema | structured reply + tool call | agent workflows (Anthropic explicitly allows both in one request) | do not enable both when you need only one |

## 3. Principles

### What constrained decoding is

The provider compiles your schema into a grammar constraint at the **decoding stage**, allowing only token sequences that satisfy the grammar during sampling. OpenAI's phrasing: it "will always generate responses that adhere to your supplied JSON Schema"; Anthropic's: "constrained sampling with compiled grammar artifacts". This is not "prompting harder" — the contract has been pushed down into the sampler.

Why this works (grammar → automaton → masking) is model-internals; this repo stops here — continue at [Learn LLM Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).

### Provider difference table (per official docs retrieved 2026-09-01)

| Dimension | OpenAI | Anthropic |
|---|---|---|
| Output-format parameter | `response_format: { type: 'json_schema', json_schema: { name, strict: true, schema } }` (Chat Completions); `text.format` (Responses API) | `output_format: { type: 'json_schema', schema }`, requires beta header `structured-outputs-2025-11-13` |
| Tool-parameter constraint | `strict: true` on the function definition (officially recommended to always enable) | `strict: true` on the tool definition (same beta) |
| Supported keywords | Types + `enum` + `anyOf`; string `pattern` / `format` (date-time, email, uuid, …); number `minimum` / `maximum` etc.; array `minItems` / `maxItems` | JSON Schema subset; the Python/TS SDKs automatically strip unsupported keywords (e.g. `minimum`, `maxLength`), rewrite the constraint into the field description, then validate client-side against your original schema |
| Hard limits | Root must be an object (no `anyOf`); all fields must be `required` (emulate optional with `type: ['string', 'null']`); objects must set `additionalProperties: false`; ≤5000 properties, ≤10 nesting levels, ≤1000 enum values | Overly complex or excessively recursive schemas → 400 (`Schema is too complex` / `Too many recursive definitions in schema`) |
| Explicitly unsupported | `allOf` / `not` / `if` / `then` / `else` / `dependentRequired` / `dependentSchemas`; fine-tuned models do not yet support `pattern` / `format` / numeric and array constraints | 400 when combined with Citations; incompatible with assistant-message prefill |
| Failure semantics | Safety refusals are programmatically detectable; `max_tokens` truncation may leave output incomplete | `stop_reason: 'refusal'` (HTTP 200, billed normally, output may violate the schema); `stop_reason: 'max_tokens'` truncation |
| Other traits | Output key order follows the schema | First request compiles the grammar (extra latency); compiled-grammar cache lasts 24 hours; changing only `name` / `description` does not invalidate it |

The open-model ecosystem has its own constrained-decoding implementations ([outlines](https://dottxt-ai.github.io/outlines/), [xgrammar](https://github.com/mlc-ai/xgrammar), both returned 200 on 2026-09-01); framework layers (e.g. [Vercel AI SDK `generateObject`](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)) abstract provider differences behind one schema parameter. **Supported subsets drift per provider** — any row above may change within months; verify against the official docs on your integration day.

### Spec claims vs local measurement

| Spec / official claim | Our fixture's measurement (zero-key mock) |
|---|---|
| Constrained decoding guarantees shape | The mock does not call a real provider; the validation-layer logic is isomorphic to real responses (missing / extra / wrong-type all trigger rejection) |
| OpenAI: all fields must be required, optional via null-union | The fixture's schema is all-required, consistent with that constraint |
| Anthropic: refusal returns 200 and still bills | Not measured (needs a real API); the engineering implication is written into runbook R1's evidence step |
| Failed retries should carry machine-readable error feedback | The fixture's `buildRetryFeedback` is the minimal implementation of that pattern |

### Key invariants

1. **The shape contract lives in API parameters, not in the prompt.** The prompt states behavior ("ask when information is missing"); the field contract is the schema. Re-drawing the schema in the prompt creates a second source of truth.
2. **The validation layer always lives in the caller.** Providers guarantee shape; cross-field semantics (`startDate < endDate`) and business constraints (positive amounts) still need local validation.
3. **Failures must be explicit.** Three exits: retry (with error feedback), escalate (log + human), terminate (explicit error). "Parse failed so continue with an empty object" is forbidden.

## 4. Development

### Integration points

1. **Schemas are code**: same repo, same PR, same review as the TypeScript types that consume them. Renaming a field is a breaking change; tests must go red.
2. **Pin model snapshots**: capabilities and supported keyword sets follow the model; pin exact snapshot IDs in production instead of floating aliases.
3. **Compatibility matrix**: when crossing providers, collapse the table above into your own adapter — one business schema, stripped per provider of unsupported keywords (the Anthropic SDK does this natively; OpenAI needs manual checking against the supported table).
4. **Rollback**: schema changes ship dual-write (old and new fields coexist for one version) with backward-compatible downstream reads — safer than deleting fields outright.

### Debug runbooks

#### R1 Intermittent parse failures in production

**Symptom**: `JSON.parse` exceptions or missing-field alerts appear sporadically; most requests are fine.
**Evidence**: sampled raw response bodies plus `stop_reason` / `finish_reason`. Separate three root causes: output carries fences or surrounding prose (you are on the prompt-convention route or legacy JSON mode); `refusal` (Anthropic returns 200 and bills; OpenAI has a programmatically detectable refusal field); `max_tokens` truncation (incomplete output).
**Action**: fences → switch to the strict `json_schema` route; refusal → route to human review or rework the triggering input per business rules, do not retry the same content; truncation → raise the output-token budget or split the output.
**Done when**: the parse-failure rate drops to zero or is fully attributed to explainable classes; CI keeps a "bad output must be rejected" fixture regression.

#### R2 Immediate 400: schema rejected

**Symptom**: after changing the schema every request 400s before a single token is generated.
**Evidence**: the error body. OpenAI names the unsupported keyword (e.g. `allOf`); Anthropic reports `Schema is too complex` or `Too many recursive definitions in schema`.
**Action**: remove `allOf` / `not` / `if-then`, flatten, or use `anyOf`; split the schema; reduce the number of strict-mode tools (an Anthropic-documented remedy).
**Done when**: 200s return for the same business fields; record the rejected keywords in the team's schema conventions.

#### R3 Right shape, wrong semantics

**Symptom**: schema validation is all green, but downstream finds `endDate` before `startDate`, or a negative amount.
**Evidence**: failure samples from local semantic validation (proof that the validation layer covers shape only).
**Action**: add semantic assertions in the caller; on failure retry with the semantic error attached (reuse the fixture's retry-feedback pattern); escalate if it still fails.
**Done when**: semantic-validation failure rate is observable; post-retry pass rate recovers; the class enters the regression set.

#### R4 Abnormally high first-request latency

**Symptom**: a latency spike at p99 after a new schema ships, only on the first request.
**Evidence**: latency distribution grouped by schema (Anthropic: the first request compiles the grammar, then caches for 24 hours).
**Action**: keep schema and toolset stable to reuse the cache; changing only `name` / `description` does not recompile; warm up (send one request right after release).
**Done when**: p99 returns to steady state; the alert closes.

### Anti-patterns

- **Treating JSON mode as a schema**: parseable ≠ has the `area` field. OpenAI officially recommends always replacing JSON mode with Structured Outputs.
- **Re-drawing the schema in the prompt**: a second source of truth; drift is only a matter of time.
- **Assuming both providers behave identically on every JSON Schema keyword**: `pattern` is supported by OpenAI while Anthropic's SDK strips it and falls back client-side — verify per provider, not from memory.
- **Forcing `{` with assistant prefill**: Anthropic explicitly marks prefill incompatible with JSON outputs.
- **Silently swallowing parse failures and returning empty objects**: degrades "controllable output" into "invisible errors".
- **Treating "passed once" as a contract**: a single pass is sampling luck; deterministic fixtures + CI regression are the contract.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [JSON Schema getting started](https://json-schema.org/learn/getting-started-step-by-step) ｜ [OpenAI Structured Outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs) | Speak the schema language first (type/properties/required), then see how providers enforce it |
| Builder | [Anthropic Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) ｜ [Vercel AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) ｜ wire the fixture to a real provider after it passes | The two providers' parameter differences + the framework's unified entry |
| Operator | [OpenAI's full supported-schema table](https://developers.openai.com/api/docs/guides/structured-outputs) (Supported schemas section) ｜ [Anthropic beta notes and compatibility](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) (Important considerations section) | The per-keyword checklist before launch; official semantics of refusal / truncation / 400 |
| Researcher | [JSON Schema specification](https://json-schema.org/specification) ｜ [outlines](https://dottxt-ai.github.io/outlines/) ｜ [xgrammar](https://github.com/mlc-ai/xgrammar) ｜ Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory) | The spec source and open implementations of constrained decoding; why samplers can be grammar-bound |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| OpenAI Structured Outputs | L1 | https://developers.openai.com/api/docs/guides/structured-outputs | Official route-B parameters and supported subset | strict json_schema, tier comparison, refusal, key order | Replace the fixture's mock with a real API |
| Anthropic Structured outputs | L1 | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | The output_format + strict-tool-use dual track | beta header, SDK stripping strategy, 400 semantics, 24h grammar cache | Same |
| JSON Schema getting started | E | https://json-schema.org/learn/getting-started-step-by-step | Schema-language crash course | type / properties / required basics | Write your first business schema |
| JSON Schema specification | L4 | https://json-schema.org/specification | Authoritative keyword definitions | Keyword semantics | The arbiter in keyword disputes |
| Vercel AI SDK structured data | L1 | https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data | Framework-layer unification | generateObject / schema parameter | Adopt when switching providers |
| outlines | L2 | https://dottxt-ai.github.io/outlines/ | Constrained decoding for open models | Active open-source implementation exists | Evaluate when self-hosting |
| xgrammar | L2 | https://github.com/mlc-ai/xgrammar | High-performance grammar constraints | Active open-source implementation exists | Same |

(All URLs retrieved **retrievedAt: 2026-09-01**, all returning 200 that day.)

### Active falsification and open questions

- This page's mock is not wired to a real provider. Refusal's 200-and-bill behavior and the grammar-compile first-request latency rest on official docs only — run one refusal and one truncation sample with a real key before trusting them.
- OpenAI's support for `pattern` / `minimum` was added later; older sources (including the superseded page in this repo) still say "accepted but not enforced" — corrected here per the 2026-09-01 docs. The subset will keep drifting; re-verify at most every 6 months.
- Open: the officially recommended rewrite for nested anyOf root objects (both providers forbid a root anyOf; no single canonical equivalent exists).

### Where learn-ai stops / where to continue

- The output contract solves "shape"; next let the model initiate **action requests** → [tool-calling](tool-calling.md).
- Output must cite private / fresh facts → [RAG](../03-grounding/rag.md).
- Turning schema regressions into release evidence → [evaluation](../05-operations/evaluation.md) (bridges to evals.zenheart.site).
- Sampling mechanics of constrained decoding → Learn LLM [Chapter 15](https://llm.zenheart.site/chapters/15-prompt-memory).
