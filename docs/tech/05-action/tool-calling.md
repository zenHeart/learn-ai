---
title: Tool Calling Contract
description: "The model only 'wants to call'; execution always lives in your code: tool schema definition, selection, parameter validation, result-return format — this separation is the foundation of the security boundary."
domain: tech
tags: [contracts, tool-calling, function-calling]
navOrder: 50
topicId: tool-calling
layer: "5"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [structured-output]
next: [model-api, tool-execution]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Tool Calling Contract

> **Group**: 5 · Action (writing the world)  |  **Previous group exit**: write and validate input/output schemas (group 3), and deliver a cancellable, observable end-to-end interaction (group 2)  |  **This page exit**: define tool schemas, draw the minimal message flow, validate tool name and parameters before execution, and return results (including errors) in the contract format
> **Prerequisites**: [structured-output](../02-inference-interface/structured-output.md)  |  **Next**: [model-api](../02-inference-interface/model-api.md), [tool-execution](../05-action/tool-execution.md)

## 1. Overview

**Bottom line**: the engineering essence of tool calling (OpenAI calls it function calling) is an **action-request contract**: after reading the tool list, the model may produce one structured request (tool name + arguments JSON); **your code executes it**. The separation between "the model wants to call" and "the system actually executes" is not an implementation detail — it is the foundation of the security boundary; every permission control is built on that seam.

This page covers only the contract: schema definition, selection, parameter validation, result-return format. Execution engineering (idempotency, timeouts, retries, permissions, human approval) lives in [Tool Execution Engineering](../05-action/tool-execution.md), later in this group.

**Group boundary**: this group (Action, writing the world) delivers the **primitives** of writing to the world—one controlled single-step action (contract + executor); the **closed loops** of multi-step composition, pause/resume, and approval queues belong to the [Agent Systems group](../06-agent-systems/agent-runtime.md) (group 6). The test: if your failure case is "this one action executed wrongly", stay here; if it is "it ran eight steps and cannot stop or recover", go to group 6.

### Mental model: the minimal message flow

```text
  You                          Model
  │  ① tools list + user question │
  │ ─────────────────────────▶ │
  │                            │ Assesses: need a tool? which one? what arguments?
  │  ② assistant message          │
  │    [tool_use: name/input]     │
  │ ◀───────────────────────── │   ← the model stops here; it only produces a "request"
  │ ③ your code: whitelist + parameter validation + execution
  │ ④ user message                │
  │    [tool_result: matching id] │
  │ ─────────────────────────▶ │
  │  ⑤ assistant final reply      │
  │ ◀───────────────────────── │   (or a new tool_use — the loop continues)
```

OpenAI's official summary is a five-step flow (retrieved 2026-09-01): request with tools → receive a tool call → execute application-side → re-request with the tool output → receive the final reply (or more tool calls). Anthropic's version is isomorphic, marking ② with `stop_reason: "tool_use"`. Steps ③④ are implemented by your code—provider APIs do not execute functions; OpenAI states "When the model calls a function, you must execute it and return the result" (retrievedAt 2026-09-01).

### When to use / when not to

| | |
|---|---|
| **Audience** | Application and agent developers letting models query data, trigger actions, or drive UI |
| **When to use** | Answers need state beyond training data (orders, weather, private stores); actions must run (send email, file an issue) |
| **When not to use** | Text only → no tools; structured data only → [structured-output](../02-inference-interface/structured-output.md) (OpenAI's official split: function calling to connect to your systems, response_format to structure the user-facing reply); knowledge is static → try the prompt first |
| **Not this page** | Safety and reliability of execution → [tool-execution](../05-action/tool-execution.md); multi-step / recoverable / approval loops → [agent-runtime](../06-agent-systems/agent-runtime.md); the protocolized tool ecosystem → [MCP](../07-interoperability/mcp.md) |

### Decision table: structured-output vs tool-calling

| | structured-output | tool-calling |
|---|---|---|
| **Direction** | constrains "what the model says" (final reply shape) | constrains "what the model wants to do" (action-request shape) |
| **Control** | schema + decoder | schema + your execution gates |
| **State** | one generation | multi-step loop (call → result → …) |
| **Trust domain** | shape trusted, semantics still validated | **trusted request ≠ reasonable execution**; execution must pass whitelist and permissions |
| **Minimum complexity** | low | medium (loop and pairing to manage) |
| **Failure surface** | refusal / truncation / schema 400 | hallucinated tool names / wrong argument types / broken pairing / execution failure |

**Historical milestones** (officially documented, retrieved 2026-09-01): OpenAI strict mode "works by leveraging our structured outputs feature" and is officially recommended to always be enabled; parallel function calls may issue multiple calls in one turn on supported models, and `parallel_tool_calls: false` enforces "exactly zero or one". Anthropic's tool-use system prompt tokens are **per model**: Opus 5 is 286 (`auto`/`none`) / 406 (`any`/`tool`), Sonnet 5 is 354/474, the previous generation 4 models 313/315 (pricing-table figures, retrievedAt 2026-09-01). Other timelines: unverified.

## 2. Usage

### Minimal hands-on: two gates + one full message-flow round (zero key)

15 minutes, Node 22 LTS. Define two tool schemas, have a mock model return a fixed tool call, and demonstrate the two pre-execution gates (tool-name whitelist, parameter schema validation) and the result-return format. Three cases: a legal call, a hallucinated tool name, a wrong argument type.

**Setup**: save as `tool-calling.ts`, run `npx tsx@4 tool-calling.ts`.

```ts
// fixture: the minimal message flow from the contract viewpoint; fields isomorphic to provider APIs
type JsonSchemaProperty = {
  type: 'string' | 'number'
  enum?: string[]
  description: string
}

type ToolDefinition = {
  name: string
  description: string
  input_schema: {
    type: 'object'
    properties: Record<string, JsonSchemaProperty>
    required: string[]
    additionalProperties: false
  }
}

const tools: ToolDefinition[] = [
  {
    name: 'search_orders',
    description:
      'Search the customer-order database by customer name or keyword, optionally filtered by status. Use when the user asks about order history or order status.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Customer name or order keyword' },
        status: {
          type: 'string',
          enum: ['pending', 'shipped', 'delivered'],
          description: 'Filter by status; omit when unsure'
        }
      },
      required: ['query'],
      additionalProperties: false
    }
  },
  {
    name: 'refund_order',
    description: 'Issue a refund for an order (amount in base currency). Use only when the user explicitly requests a refund.',
    input_schema: {
      type: 'object',
      properties: {
        orderId: { type: 'string', description: 'Order ID like ORD-123' },
        amount: { type: 'number', description: 'Refund amount; must be a number' }
      },
      required: ['orderId', 'amount'],
      additionalProperties: false
    }
  }
]

// Deterministic mock model: each scenario returns one fixed tool_use
type ToolUseBlock = { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }

const MOCK_GOOD_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_001', name: 'search_orders',
  input: { query: 'Alice', status: 'shipped' }
}
const MOCK_HALLUCINATED_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_002', name: 'delete_all_orders',
  input: { customerId: 42 }
}
const MOCK_BAD_TYPE_CALL: ToolUseBlock = {
  type: 'tool_use', id: 'toolu_demo_003', name: 'refund_order',
  input: { orderId: 'ORD-77', amount: '9.9' } // amount must be number; the model sent a string
}

function mockModelTurn(scenario: 'good' | 'hallucinated-name' | 'bad-type'): ToolUseBlock {
  if (scenario === 'good') return MOCK_GOOD_CALL
  if (scenario === 'hallucinated-name') return MOCK_HALLUCINATED_CALL
  return MOCK_BAD_TYPE_CALL
}

// The two pre-execution gates: whitelist + parameter validation
type CallIssue = string

function validateToolCall(call: ToolUseBlock, registry: ToolDefinition[]): CallIssue[] {
  const issues: CallIssue[] = []
  const tool = registry.find((t) => t.name === call.name)
  if (!tool) {
    issues.push(`unknown tool "${call.name}" — model request rejected, nothing was executed`)
    return issues
  }
  for (const key of Object.keys(call.input)) {
    if (!(key in tool.input_schema.properties)) {
      issues.push(`${call.name}.${key}: additional property not allowed`)
    }
  }
  for (const key of tool.input_schema.required) {
    if (!(key in call.input)) {
      issues.push(`${call.name}.${key}: required parameter is missing`)
    }
  }
  for (const [key, value] of Object.entries(call.input)) {
    const prop = tool.input_schema.properties[key]
    if (!prop) continue
    if (prop.enum) {
      if (typeof value !== 'string' || !prop.enum.includes(value)) {
        issues.push(`${call.name}.${key}: expected one of ${prop.enum.join(' | ')}, got ${JSON.stringify(value)}`)
      }
    } else if (typeof value !== prop.type) {
      issues.push(`${call.name}.${key}: expected ${prop.type}, got ${typeof value}`)
    }
  }
  return issues
}

// Real execution bodies (mock implementations, fixed returns)
const executions: Record<string, (input: Record<string, unknown>) => unknown> = {
  search_orders: (input) => ({
    matched: 1,
    orders: [{ orderId: 'ORD-101', customer: 'Alice', status: 'shipped', total: 129 }],
    echo: input
  }),
  refund_order: (input) => ({ refunded: true, orderId: input.orderId, amount: input.amount })
}

// One full message-flow round
function runToolTurn(scenario: 'good' | 'hallucinated-name' | 'bad-type'): void {
  const call = mockModelTurn(scenario)
  console.log(`\n=== scenario: ${scenario} ===`)
  console.log(`assistant  → tool_use   name=${call.name} input=${JSON.stringify(call.input)}`)

  const issues = validateToolCall(call, tools)
  if (issues.length > 0) {
    console.error('gate       → REJECTED before execution:')
    for (const issue of issues) console.error(`  ✗ ${issue}`)
    // Contract: rejection is not swallowing — return the error as a tool_result
    // so the model can self-correct next turn
    console.log(
      `user       → tool_result (error) tool_use_id=${call.id} content=${JSON.stringify({
        error: 'tool call rejected by contract validation',
        issues
      })}`
    )
    return
  }

  console.log('gate       → PASS (name whitelisted, params match schema)')
  const result = executions[call.name](call.input)
  console.log(`user       → tool_result tool_use_id=${call.id} content=${JSON.stringify(result)}`)
  console.log('assistant  → "Alice has 1 shipped order ORD-101, totaling 129." (mock final reply)')
}

runToolTurn('good')
runToolTurn('hallucinated-name')
runToolTurn('bad-type')
```

**Normal output** (one full legal message-flow round):

```text
=== scenario: good ===
assistant  → tool_use   name=search_orders input={"query":"Alice","status":"shipped"}
gate       → PASS (name whitelisted, params match schema)
user       → tool_result tool_use_id=toolu_demo_001 content={"matched":1,"orders":[...],"echo":{...}}
assistant  → "Alice has 1 shipped order ORD-101, totaling 129." (mock final reply)
```

**Negative output** (hallucinated tool name and wrong type are both rejected before execution, and the error is returned as a tool_result):

```text
=== scenario: hallucinated-name ===
assistant  → tool_use   name=delete_all_orders input={"customerId":42}
gate       → REJECTED before execution:
  ✗ unknown tool "delete_all_orders" — model request rejected, nothing was executed
user       → tool_result (error) tool_use_id=toolu_demo_002 content={"error":"tool call rejected by contract validation","issues":[...]}

=== scenario: bad-type ===
assistant  → tool_use   name=refund_order input={"orderId":"ORD-77","amount":"9.9"}
gate       → REJECTED before execution:
  ✗ refund_order.amount: expected number, got string
user       → tool_result (error) tool_use_id=toolu_demo_003 content={...}
```

**Acceptance command**:

```bash
npx tsx@4 tool-calling.ts && echo CONTRACT-OK
```

**Cleanup**: delete temporary files.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: single-tool query | "Alice's orders" | one call/result round | text reply + data | Query-style tasks | Multi-step dependencies |
| Common: sequential chain | look up the user's email, then send the report | the previous step's output becomes the next step's arguments | multi-round loop | tasks with dependencies (the model calls step by step; do not rush it to call everything at once) | independent steps (see combined) |
| Combined: parallel calls | "weather in New York and London" | multiple tool_use blocks in one assistant message; all results returned paired **in one** user message | multiple results at once | mutually independent operations | dependent steps (parallel calls guess arguments) |

## 3. Principles

### The three contract elements: name / description / input_schema

- **name**: the whitelist key. Descriptive naming (`search_orders`, not `func1`).
- **description**: the selection basis the model reads — it is the tool's "prompt". Stating **when to use it** ("use when the user asks about order history") sharply reduces mis-selection.
- **input_schema**: JSON Schema, the same language as [structured-output](../02-inference-interface/structured-output.md). Force fixed option sets with `enum`; describe every parameter.

Anthropic's tool-design principles (retrieved 2026-09-01): tools should be self-contained, robust to error, and unambiguous about intended use; the most common failure mode is a **bloated tool set** — "if a human engineer can't definitively say which tool should be used, an AI agent can't be expected to do better". Both providers converge the same way: Anthropic recommends 3–4 sentences per tool description and consolidating related operations into fewer tools with an `action` parameter; OpenAI recommends **fewer than 20** initially available functions per turn (a soft suggestion), deferring larger tool surfaces with `defer_loading` / `tool_search` instead of mounting everything (both retrievedAt 2026-09-01).

### Why "wants to call" and "executes" must be separated

Model output is only text (which happens to be JSON-shaped requests). Provider APIs do not execute your functions — execution happens inside your process. The separation yields three controllable points:

1. **Whitelist**: any tool name outside the list is rejected (negative case two). This is the only hard defense against hallucinated calls.
2. **Parameter validation**: even with a correct tool name, arguments may still have wrong types or be missing (negative case three). Strict mode (OpenAI `strict: true` / Anthropic tool `strict: true` beta) moves that guarantee into the decoder, but caller-side validation remains the last line.
3. **Permission and side-effect review**: the hook point before execution. Refund-class tools attach permission checks and human approval here — the subject of [tool-execution](../05-action/tool-execution.md).

### The pairing invariant and parallel semantics

- Every `tool_use` carries a unique `id` (Anthropic `toolu_*` / OpenAI `call_id`); the returned `tool_result` must carry the matching id. **Broken pairing → next round 400.**
- Parallel calls: one assistant message may contain multiple `tool_use` blocks; **all results must return in one user message, each with its own id** (Anthropic's explicit rule). OpenAI can disable parallelism with `parallel_tool_calls: false` ("ensures exactly zero or one tool is called").
- Tool definitions themselves count as input tokens: Anthropic's tool-use system prompt tokens are per model (Opus 5: 286/406; Sonnet 5: 354/474), and tool schemas and tool_results bill too — more tools, more cost, harder choice.

### The error-handling contract

When a tool execution fails (API down, invalid order ID), **do not throw and kill the conversation**: return the error as the `tool_result` content; the model can usually self-correct or explain to the user. Make it semantic (`{"error": "...", "hint": "..."}`), never swallow it into an empty string — the model will confabulate when it sees an empty result.

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| Five-step flow (request → call → execute → return → reply) | `runToolTurn` prints each step in the isomorphic order |
| stop_reason: tool_use marks the model stopping at the call | The mock returns the tool_use block directly; under a real API, check stop_reason before entering the execution branch |
| Parallel results must return fully paired in one message | The fixture is single-call; the pairing check is demonstrated in the [context](../03-context/context-engineering.md) fixture |
| Tool failures should be returned as results | The rejection path returning an `(error) tool_result` is exactly that pattern |

### Key invariants

1. **Two gates before execution, always**: whitelist + parameter schema validation. No exceptions.
2. **Pairing integrity**: tool_use and tool_result map one-to-one; history trimming must not sever them (see [context](../03-context/context-engineering.md) I2).
3. **Rejections are returnable**: a validation failure is not the end; the error enters a tool_result so the model gets a chance to correct.
4. **Minimal tool set**: mount only what this task needs; ambiguous choice is itself a failure signal.

## 4. Development

### Integration points

1. **Schema and implementation in one repo**: the `ToolDefinition`'s TypeScript type is the execution's argument type; changing a parameter is a breaking change.
2. **Strict first**: OpenAI officially recommends always enabling `strict: true`; Anthropic uses tool `strict: true` (beta). Even with it on, keep caller-side validation (the last gate).
3. **Bound the loop**: the call → result loop gets a maximum round count; at the limit, degrade or escalate to a human — no infinite spinning.
4. **Missing-information behavior differs**: officials state that weaker models may "guess a reasonable value" for missing parameters (e.g. guessing New York); stronger ones tend to ask back. For easily-guessed-wrong parameters, use a CoT-style instruction guiding "check required parameters are inferable first; if missing, ask the user".

### Debug runbooks

#### R1 The model called a tool that does not exist

**Symptom**: logs show tool names outside the list, or argument fields matching no definition.
**Evidence**: diff the request's tools list against the response's tool_use block; determine whether it is list drift (two unsynchronized definitions) or model hallucination.
**Action**: the gate rejects and returns an error result (fixture negative case two); if drift, collapse tool definitions to a single source; if hallucination, rewrite the tool description to state "when to use / when not to use".
**Done when**: unknown-tool executions equal zero; rejection counts are observable and trending to zero.

#### R2 Next-round 400: broken pairing

**Symptom**: the request carrying tool results is rejected with a message-structure error.
**Evidence**: dump the full messages; run an id-pairing check. Common root cause in parallel scenarios: multiple tool_use with only one result returned, or results split across multiple user messages.
**Action**: merge all results into one user message, each with its id; switch history trimming to a pair-preserving implementation.
**Done when**: no 400s; the pairing check joins CI.

#### R3 The conversation spins after a tool execution failure

**Symptom**: the same tool is called repeatedly, the error recurs, the task never converges.
**Evidence**: the trace shows consecutive calls of the same tool name with similar arguments; the tool_result confirms the error was returned but the model did not correct.
**Action**: add an actionable hint to the returned error ("order ID invalid; confirm with the user"); add a max-rounds circuit breaker; if needed, write into system "after N failures, explain to the user instead".
**Done when**: loop length is bounded; the failure path ends in explicit termination or escalation, not spinning.

### Anti-patterns

- **Pushing execution into a "model callback"**: it conflates request and execution, leaving the gates nowhere to live.
- **Prefix- or fuzzy-matching whitelists**: letting `delete_*` through is having no whitelist.
- **Swallowing errors into empty-string returns**: the model confabulates, and the error amplifies into hallucination.
- **Stuffing whole pages into tool results**: raw HTML / full JSON straight into the window — a double loss for budget and rot (see [context](../03-context/context-engineering.md)).
- **Mounting dozens of tools**: ambiguous choice and doubled tokens; open the minimal set per task.
- **Rushing the model to "call everything at once" on dependent steps**: it will guess downstream parameters whose upstream results are unknown.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | [Anthropic Tool use overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)  |  [OpenAI Function calling guide](https://developers.openai.com/api/docs/guides/function-calling) | The two providers' five-step flow and terminology (tools / tool calls / outputs) |
| Builder | Wire this page's fixture to a real provider  |  [Anthropic: Writing tools for AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | Run the contract loop first, then learn tool-design principles |
| Operator | Anthropic's tool token-cost table (Pricing section of the Tool use overview)  |  the parallel-calling implementation guide | The metering basis of tools and the parallel return format |
| Researcher | [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)  |  [MCP](https://modelcontextprotocol.io/specification/latest) | What sits above the tool loop (agent shapes and the protocolized tool ecosystem) |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| Anthropic Tool use overview | L1 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | Contract fields and flow | input_schema, stop_reason, parallel pairing, per-model tool-system-prompt token table | Read the implementation guide |
| OpenAI Function calling | L1 | https://developers.openai.com/api/docs/guides/function-calling | Five-step flow and strict | strict is built on Structured Outputs, parallel_tool_calls switch, tool_search (gpt-5.4+) | Run the official examples |
| Writing tools for AI agents | L1 | https://www.anthropic.com/engineering/writing-tools-for-agents | Tool-design principles | Self-contained / minimal set / description-as-prompt | Rewrite your own tool descriptions |
| Building effective agents | L1 | https://www.anthropic.com/engineering/building-effective-agents | Agent-shape overview | The workflow-vs-agent boundary above the tool loop | Proceed to group 6 |
| MCP specification | L4 | https://modelcontextprotocol.io/specification/latest | The tool-ecosystem protocol | Standardized tool integration | Group 7 [mcp](../07-interoperability/mcp.md) |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- The fixture's mock produces no real stop_reason; after wiring a real provider, first verify the actual field names for "check stop_reason before entering the execution branch" in both SDKs (Anthropic `stop_reason` / OpenAI `finish_reason`).
- The quantified benefit of "description-as-prompt" (how much a good description reduces mis-selection) has no public benchmark; it is an official qualitative recommendation.
- Open: how the "minimal tool set" principle interacts with `tool_search` (OpenAI, gpt-5.4+) once tool discovery is also delegated to the model — under observation.

### Where learn-ai stops / where to continue

- Above the contract, the safety engineering of execution (idempotency / permissions / approval) → [tool-execution](../05-action/tool-execution.md).
- Wiring the tool loop into a product API → [model-api](../02-inference-interface/model-api.md).
- The protocolized tool ecosystem → [mcp](../07-interoperability/mcp.md).
- Agent = model + context + tools + state + loop → [agent-runtime](../06-agent-systems/agent-runtime.md).
