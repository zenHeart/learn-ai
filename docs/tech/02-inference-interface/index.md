---
title: "Group 2 · Inference & Interface"
description: One line from the prefill/decode stages to the user-visible interface — the physical structure of latency and cost, the serving cost levers, and a seven-topic guide covering the API contract, structured output, streaming, generative UI, and on-device access.
domain: tech
tags: [inference, interface, navigation]
navOrder: 19
topicId: integration
layer: "2"
status: canonical
nodeType: problem
owner: learn-ai
prerequisites: [model-lifecycle-bridge]
next: [model-api, streaming, session-state]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Group 2 · Inference & Interface

> **Group**: 2 · Inference & Interface  |  **Previous group exit**: can explain how the model lifecycle shapes engineering decisions (the model is a replaceable capability with three interface properties: behavior, budget, capability boundary)  |  **This group exit**: can deliver a user-visible interaction that is attributable (latency decomposes into segments), observable (usage is visible), and cancellable
> **Prerequisites**: [Model Lifecycle (bridge)](../01-model-lifecycle/)  |  **Next**: [Session and State](../03-context/session-memory.md), [Embeddings and Retrieval](../04-grounding/rag)

## 1. Overview

This group answers one question: **how do parameters become an online service and a contract?** It is a single line that runs from the two-stage prefill/decode generation all the way to the user-visible interface — the first half explains where latency and cost come from (the TTFT and the bill you get are outputs of a pipeline, not magic), and the second half wires model capability into a product interaction (calling contract, output shape, presentation cadence, access point).

The first half used to be missing: an engineer who only learns "how to call the API" cannot explain why the first token is slow, why cached input is cheaper, or when to self-host serving. This group closes the gap with seven topics:

- **Serving side** (what happens inside the model): [Inference Fundamentals](inference-fundamentals.md) decomposes the latency structure; [Efficient Serving](efficient-serving.md) decomposes the cost structure.
- **Interface side** (how you connect): [Model API Contract](model-api.md) stabilizes the call, [Structured Output](structured-output.md) stabilizes the shape, [Streaming](streaming.md) stabilizes the cadence, [Generative UI](ui.md) upgrades the presentation, [Browser and Edge Inference](browser-edge.md) changes the access point.

```mermaid
flowchart LR
    A[Model lifecycle<br/>(group 1 bridge exit)] --> B[inference-fundamentals<br/>latency structure]
    B --> C[efficient-serving<br/>cost mechanisms]
    C --> D[model-api<br/>calling contract]
    D --> E[structured-output<br/>output shape]
    E --> F[streaming<br/>presentation cadence]
    F --> G[ui structured interface]
    D --> H[browser-edge on-device access]
    G --> I[Group exit: attributable, observable, cancellable interaction]
    H --> I
```

### When to enter this group / when not to

- **Enter**: you are building a product on a model — read the first two pages to build the latency/cost mental model, then enter the interface side; or you already maintain an AI feature and need to attribute latency and cost.
- **Do not enter**: training and attention math — go back to the Learn LLM links in [Model Lifecycle (bridge)](../01-model-lifecycle/); answers lack private facts — go to [Embeddings and Retrieval](../04-grounding/rag); the system must take actions — go to [Tool Calling Contract](../05-action/tool-calling).

### Symptom → topic navigation

| Symptom | Go to | After reading you can |
| --- | --- | --- |
| Cannot say why the first token is slow or the bill is rising | [Inference Fundamentals](inference-fundamentals.md) | Decompose one latency into queue / prefill / decode / network and attribute it |
| Cannot read why cached input has one price and regular input another | [Efficient Serving](efficient-serving.md) | Map quantization and prefix caching onto billing fields; restructure prompts and sessions |
| First request not sent yet / falls over on 429 | [Model API Contract](model-api.md) | Write a calling loop with error-family classification and retries |
| Answers are stable but cannot enter a program (parsing by regex) | [Structured Output](structured-output.md) | Constrain and validate model output with a schema |
| Endpoint works, but UI waits for the full answer | [Streaming](streaming.md) | Consume an SSE stream; cancel and recover from interruption |
| Want components in answers, not just text | [Generative UI](ui.md) | Render model output through a component whitelist |
| Need lower latency / privacy / offline | [Browser and Edge Inference](browser-edge.md) | Pick the right on-device runtime and fallback chain |

### Decision table: interface-side access modes

| Mode | Direction | Control | State | Trust domain | Minimum complexity |
| --- | --- | --- | --- | --- | --- |
| Direct fetch to a vendor API | Outbound request/response | Fully self-managed | None (rebuilt per turn) | Keys server-side | One runnable file |
| Official SDK | Outbound request/response | SDK handles retries and types | None | Keys server-side | +1 dependency |
| Frontend AI framework | Request + stream + UI bundled | Framework takes over | Framework session model | Keys server-side | A framework contract |
| On-device inference | Runs in the device | Fully self-managed | Device-local | Data never leaves | Model distribution + runtime |

The serving-side mode decision (API / self-hosted / on-device) is in the decision table of [Inference Fundamentals](inference-fundamentals.md). The selection principle is the same: **start at minimum complexity**, add layers only when blocked.

### Historical milestones

Vendor API shapes keep evolving (e.g. OpenAI from Chat Completions to the Responses API, Anthropic sampling parameters shrinking across model generations, both vendors shipping prefix caching). This group maintains no vendor timeline; specific fields defer to the official docs at the time of reading, and decision-relevant claims in this repo carry retrievedAt stamps. This page was rewritten in 2026-09 from the v5 "application integration" layer guide into the v6 "Inference & Interface" group guide as part of Issue #116.

## 2. Usage

The group's minimal hands-on is the zero-key two-stage simulator in [Inference Fundamentals](inference-fundamentals.md):

```bash
# Save that page's full example as inference-sim.mts, then:
node inference-sim.mts
```

Acceptance: three output sections — the cost structure with KV cache, the no-cache negative case (identical TTFT, decode amplified 12×), and the savings percentage. Once it runs you have personally verified the attribution rule "prompt hits TTFT, output hits total duration".

The cost-side counterpart is the prefix cache calculator in [Efficient Serving](efficient-serving.md) (hit / miss / below-minimum-length scenarios). Every topic's usage section in this group follows the same constraints: zero API keys, single self-contained file, deterministic output, and positive/negative paths in pairs.

## 3. Principles

On the capability-transformation chain, this group turns "one replaceable external capability" into "one operable interaction chain":

```text
User action → request assembly (structured-output schema + session state)
           → serving (inference fundamentals: queue/prefill/decode; efficient serving: caching and quantization)
           → API call (model-api: error families, retries, usage)
           → streaming presentation (SSE, accumulation, cancellation)
           → structured rendering (ui: whitelisted components)
```

- **Invariant 1**: the model API is stateless. Every request resends all needed history; "conversational memory" is an integration-layer construct (→ [Session and State](../03-context/session-memory.md)).
- **Invariant 2**: model output is untrusted input. It must pass a schema and a whitelist before rendering.
- **Invariant 3**: interactions must be cancellable and observable. Cancellation depends on AbortController reaching the server to stop generation; observation depends on usage (including cache-hit fields) reaching the cost dashboard.
- **Invariant 4**: latency and cost are attributable. TTFT, ITL, input/output tokens, and cache hits are instrumented separately — what cannot be decomposed cannot be optimized.

**Exit criteria**: you can deliver a user-visible interaction that is attributable (latency decomposes into segments), observable (usage and hit rates are visible), and cancellable (stops mid-flight with consistent state afterwards).

## 4. Development

Before entering the interface side, use three diagnostics to locate the page you need.

### Symptom → Evidence → Action → Done when
**Symptom**: users report "forever until the first token", then it flows.
**Evidence**: streaming metrics split TTFT from ITL; prompt token distribution and cache-hit fields.
**Action**: work the TTFT runbook in [Inference Fundamentals](inference-fundamentals.md) across queue / prefill / cache invalidation.
**Done when**: TTFT p50/p95 return to baseline and you can name the slow segment from the data.

### Symptom → Evidence → Action → Done when
**Symptom**: the bill spikes while traffic is flat.
**Evidence**: per-turn input tokens inflate linearly with turns; hit rates fall.
**Action**: fix cache-friendly structure and history trimming per [Efficient Serving](efficient-serving.md) and [Session and State](../03-context/session-memory.md).
**Done when**: the per-session cost slope falls and hit rates return to baseline.

### Symptom → Evidence → Action → Done when
**Symptom**: the demo works perfectly, production fails intermittently.
**Evidence**: HTTP status code distribution across failure samples; 429/5xx share.
**Action**: add error-family classification and backoff retries per [Model API Contract](model-api.md); fix quotas before retrying quota errors.
**Done when**: under the same traffic, retries converge and no error is left unclassified.

## 5. Resource Library

### Four-level reading route

- **Beginner**: [Inference Fundamentals](inference-fundamentals.md) (run the simulator) → [Model API Contract](model-api.md) (send the first call).
- **Builder**: [Efficient Serving](efficient-serving.md) → [Structured Output](structured-output.md) → [Streaming](streaming.md).
- **Operator**: each topic's development-section runbooks → [Observability](../08-production/observability), [Cost and Performance](../08-production/cost-performance).
- **Researcher**: [Generative UI](ui.md) → [Browser and Edge Inference](browser-edge.md) → the papers and engine docs linked from this group's resource tables (FlashAttention, vLLM).

### Active falsification and open questions

- The claim "perceived latency is dominated by TTFT" comes from general streaming engineering experience; thresholds for a specific product must be measured.
- The cost units and prices in this group's two fixtures are teaching constants that verify structure and attribution methods, not any vendor's real numbers.
- Vendor field names, cache tiers, and error codes change with versions; this group's tables keep only verified versions and defer to the official docs.

### Where learn-ai stops / where to go next

This group answers "how to turn a model into an online service and interface", not "what the model sees this turn" (→ [Session and State](../03-context/session-memory.md)), "how to bring in knowledge beyond parameters" (→ [Embeddings and Retrieval](../04-grounding/rag)), "how to take controlled actions" (→ [Tool Calling Contract](../05-action/tool-calling)), or "evidence for launch" (→ [Observability](../08-production/observability)).
