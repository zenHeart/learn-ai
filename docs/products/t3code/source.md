---
title: "T3 Code source code walkthrough: how one sentence becomes one agent turn"
description: "Read the T3 Code source against a pinned commit of pingdotgg/t3code: a repository map with measured size, the data flow of one thread from command, database write and agent start to the approval coming back to the interface, the few pieces of code that actually enforce the permission modes, the trust model of T3 Connect, and what packages/tailscale really uses Tailscale for."
domain: product
tags:
  - coding-agent
  - source-code
  - agent-workspace
role: deep-dive
pageClass: wide-figures readable-tables
source_revision: d00aaac85fc71195f133a8580c3f0f2e29ac33a2
---

# T3 Code source code walkthrough: how one sentence becomes one agent turn

> **The short version:** The T3 Code server is a "record first, work afterwards" machine. Each of your actions is first worked out as events and written to the database in one database transaction; only then does another piece of code start or respond to the agent process. The four permission modes come down to one three-way decision inside the adapter, and the T3 Connect relay only helps with the pairing and never touches your traffic.
>
> Every conclusion on this page was checked against `pingdotgg/t3code` at commit [`d00aaac8`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/README.md); later changes are out of scope. The end of the page has three lists: verified / inferred / unknown.

## 1. Who it is for / who it is not for

- **Who**: people who can already start threads and switch permission modes in T3 Code and want to know how it works inside (if you have not used it, read the [tutorial](./t3code) first); people preparing to submit a PR to T3 Code who need a map of "where to start reading"; people evaluating "is it safe to let it drive my agents" who want to see code rather than slogans.
- **Who it is not for**: people who want to learn Effect (the TypeScript framework T3 Code uses across the stack) itself; this page uses only its syntax. People looking for complete API documentation; this page picks only the few pieces of code related to "what must be made clear". People who expect to replicate a T3 Code after reading; the repository has an Orchestrator of more than ten thousand lines, and this page walks only one main path.

The code excerpts on this page all come from the commit above, and the links point to the exact lines. In the excerpts, the comments marked "omitted" were added by this page; everything else is copied verbatim.

## 2. Repository map: directories, responsibilities, where to start reading

It is a pnpm monorepo whose root package is named `@t3tools/monorepo`. The bulk is TypeScript, the core framework is Effect, and native modules use Swift, C and other languages.

| Directory | Responsibility | Which file to start from |
|---|---|---|
| `apps/desktop` | The desktop app, an Electron shell that bundles a server | [`src/boot.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/desktop/src/boot.ts) |
| `apps/server` | The server: orchestration, providers, terminals, Git, checkpoints, persistence. The npm package it publishes is `t3` | [`src/bin.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/bin.ts), then go into `src/orchestration-v2/Orchestrator.ts` |
| `apps/web` | The web app, React plus Vite. It is also the desktop app's interface | [`src/hostedPairing.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/web/src/hostedPairing.ts) (how the hosted web app connects to environments); for the interface, start from `src/components/` |
| `apps/mobile` | The mobile app, React Native built on Expo | [`README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/mobile/README.md) |
| `apps/marketing` | The t3.codes site, built with Astro | `src/pages/index.astro` |
| `packages/client-runtime` | Connection management and domain state shared by web, desktop and mobile | `src/connection/supervisor.ts`, `src/connection/registry.ts` |
| `packages/contracts` | The typed wire contracts between client and server | [`src/providerPolicy.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/contracts/src/providerPolicy.ts) (the permission mode definitions); also `src/orchestrationV2.ts`, `src/relay.ts` |
| `packages/provider-core` | The interface and utilities shared by all provider adapters | [`src/server/ProviderAdapter.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts) |
| `packages/provider-*` (11 directories) | One adapter package per agent. The three first-party adapters for Claude, Codex and Antigravity are not in packages; they are in `apps/server/src/orchestration-v2/Adapters/` | Use [`packages/provider-pi/src/server/adapter.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-pi/src/server/adapter.ts) as the reference (the example the official docs designate) |
| `packages/effect-acp`, `packages/effect-codex-app-server` | Effect implementations of two protocols: ACP, and the Codex App Server | `src/client.ts` in each |
| `packages/secret-provider-*` (3) | The secret provider interface, the 1Password implementation, the registry | `secret-provider-core/src/server/SecretResolver.ts` |
| `packages/source-control-*` (11) | Integrations with Git hosting providers and issue trackers | `source-control-core/src/server/SourceControlHost.ts` |
| `packages/ssh`, `packages/tailscale` | Start or reuse a server remotely over SSH; call the local `tailscale` command line | `packages/ssh/src/command.ts`; [`packages/tailscale/src/tailscale.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts) |
| `infra/relay` | The T3 Connect relay, a Cloudflare Worker | [`README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/infra/relay/README.md), then go into `src/environments/EnvironmentConnector.ts` |

Three places are easy to get wrong. **`.repos/` is not product code**; the repository's AGENTS.md defines it as vendored read-only references and requires that you neither edit it nor import from it. **The official docs are in `docs/`**: `docs/user/` is the user documentation, `docs/internals/` the design constraints, and `docs/operations/` the maintainers' operations handbook; AGENTS.md lists "which document to read before changing which code" as a table. **The security model is its own document**: the root [`SECURITY.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/SECURITY.md) defines who is trusted, what counts as a vulnerability and what is intentional, and lists the file where each rule is enforced.

## 3. Repository map: size figures (measured with commands)

The numbers come from running `git ls-files` and line counts at that commit.

| Area | Files under version control | Of which test files | Non-test TS / TSX lines |
|---|---:|---:|---:|
| `apps/desktop` | 346 | 128 | 49,310 |
| `apps/server` | 1,830 | 560 | 322,038 |
| `apps/web` | 2,220 | 671 | 361,635 |
| `apps/mobile` | 1,927 | 373 | 178,182 |
| `apps/marketing` | 105 | 2 | 1,584 |
| `packages/` (33 packages) | 1,543 | 521 | 369,895 |
| `infra/` (relay and task-cache) | 199 | 48 | 21,806 |

How it was counted: the whole repository has 33,443 files under version control, of which 24,488 are under `.repos/` (`alchemy-effect` 21,119, `effect` 3,369), which is why it is not in the table. Test files are those whose path contains `.test.`, `.spec.`, `__tests__`, `/test/` or `/tests/`; line counts cover only `.ts` and `.tsx`, and additionally exclude `testkit`, `testFixtures` and `testUtils`.

- **The Orchestrator is a single file of 17,658 lines** (`Orchestrator.ts`). `EventSink.ts` and `EffectWorker.ts` in the same directory are 1,338 and 1,127 lines, and the whole `orchestration-v2/` directory has 638 files (including tests and replay fixtures).
- **The desktop app is the smallest**, about 49,000 lines of non-test code. It wraps the web app's interface and bundles a server; the interface and service logic stay in `apps/web` and `apps/server` respectively.
- **The shared packages are the largest block**, about 370,000 lines, more than the web app or the server; `shared` (289 files) and `client-runtime` (473 files) make up half of it. This matches the official statement that "the three interfaces share one connection and state layer".
- **The adapter packages are all small**. `provider-core` has 73 files; the other 10 `provider-*` packages have no more than 46 each.

## 4. Four ownership boundaries and the data flow of one thread

The official architecture doc draws four lines first; keep them in mind before reading any piece of code.

| Boundary | What it owns | What it does not do |
|---|---|---|
| Server (`apps/server`) | Agent processes, terminals, Git, checkpoints, persistent state, project files | Does not trust the file system, credentials or machine state sent by a client |
| Client runtime (`packages/client-runtime`) | Connection management and domain state shared by the three interfaces | Does not decide business on its own |
| Contracts (`packages/contracts`) | The typed wire boundary between client and server | Carries no heavy logic |
| Provider adapters (`packages/provider-*` and others) | Each agent's protocol and quirks | Does not let the Orchestrator know what it is called |

Look at the diagram below with one question in mind: **how do the desktop, web and mobile interfaces drive separate external agent processes through the same server and the same adapter layer?**

<DocDiagram src="/diagrams/t3code-architecture.en.svg" alt="This layered architecture diagram answers one question: how do the desktop, web, and mobile interfaces drive separate external agent processes through the same server and the same adapter layer? It has four layers from top to bottom, and every arrow points one way. Layer 1 is the application layer: three clients, the desktop app, the web app, and the mobile app. They depend on only two shared packages: client-runtime, the connection and state layer shared by all three clients, and contracts, the typed wire contracts. All three reach the server over authenticated HTTP and WebSocket RPC. Layer 2 is the server, apps/server. It holds the Orchestrator, the EventSink that writes to the database, the EffectWorker that runs effects after commit, plus the terminal, Git, and checkpoints. The desktop app bundles a server, but its UI obeys the same boundary. The server reads only the capabilities an adapter declares and never the provider name. Layer 3 is the Provider adapters. The arrow goes from the server to the adapters and then from the adapters to layer 4, the external agent processes such as Claude Code, Codex, Cursor, and OpenCode. The adapters translate T3 Code operations into each agent's native protocol, and agent events are translated back along the same line; the external agent processes never depend back on the T3 Code interface. In its own column on the right is infra/relay, the T3 Connect relay. It has only a control relationship with the clients and the server, drawn as a dashed line: it helps with environment linking and credential issuing. Business traffic between the clients and the server never passes through it. This diagram leaves out the model itself, further modules inside the server, and optional external network paths such as Tailscale; T3 Code runs no model of its own." :width="960" lang="en" />

> **What the diagram is based on:** The layers and the direction of the dependencies come from the official architecture doc [`01_architecture.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/01_architecture.md); "the relay only handles helping with environment linking and credential issuing" comes from [`06_t3-connect.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/internals/06_t3-connect.md); "the server reads only the capabilities an adapter declares and does not recognize the provider name" was checked against [`ProviderAdapter.ts` L765–L903](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L765-L903); all at commit `d00aaac8`. The diagram keeps the objects of the four layers, the one-way dependency arrows, and the control relationship between the relay and the other two sides (gray dashed line); it leaves out the model itself, further modules inside the server, and optional external network channels such as Tailscale (`packages/tailscale` only calls the local tailscale command line; it is not an internal component). T3 Code does not run a model itself.

The one top-to-bottom relationship to grasp in the diagram is: **the server talks only to the adapters, and the adapters talk only to the agent processes.** The main path of one thread is walked along this line below.

### Stage 1: a command arrives and the Orchestrator works out events and effects

Every action you take in the interface reaches the server as a **command** (a request "to change state"). Sending a message maps to `message.dispatch`; the entry point is `dispatchMessage` starting at [`Orchestrator.ts` L7281](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L7281-L7285). It reads the current state, validates, and then adds to two drafts: one of events, one of effects. The first events to appear are "a run was opened" (`run.created`, [L8383-L8391](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8383-L8391)) and "your message" (`message.updated`, [L8443-L8451](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8443-L8451)). Both are in the same draft, so your message is written to the database together with "a run was opened", without waiting for the agent to start.

The effects side holds only one intent, with no process information attached:

```ts
// Orchestrator.ts L8988-L8997
const pendingEffect = {
  id: `effect:${command.commandId}:provider-turn.start:${runId}`,
  commandId: command.commandId,
  threadId: command.threadId,
  request: { type: "provider-turn.start", runId },
} satisfies PendingOrchestrationEffectV2;
if (dispatchMode.type !== "defer_start") {
  yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
}
return;
```

The Orchestrator starts nothing itself. AGENTS.md describes the Orchestrator as "serializing commands and deciding events without doing I/O", and the architecture doc adds one constraint: an acknowledged command means only that the intent has been committed.

### Stage 2: one transaction writes to the database

Once the drafts are worked out, [`dispatchWithReceiptEffect`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L16509-L16513) finishes the job. It first looks up the receipt of this command; if it has already been handled, it replays according to the receipt, which guarantees that a retry does not execute twice. It then works out the plan (`dispatchOnce`) and immediately checks the planned events against the permission ceiling the administrator set (`refuseAboveRuntimeModeCeiling` at [L16565-L16566](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L16565-L16566)), rejecting anything above it. Only then does it hand over to `commitCommand` in [`EventSink.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EventSink.ts#L788-L872):

```ts
// EventSink.ts L846-L872, excerpt
const storedEvents = yield* eventStore.append({
  commandId: input.commandId,
  events: normalized,
});
// (omitted: take the sequence number of the last event; error if there are none)
const outcomes = yield* applyStoredEvents(storedEvents);
yield* effectOutbox.enqueue(input.effects);
const receipt: CommandReceiptStore.CommandReceiptV2 = {
  commandId: input.commandId,
  threadId: input.threadId,
  commandType: input.commandType,
  acceptedAt: input.acceptedAt,
  resultSequence: sequence,
  status: "accepted",
  error: null,
};
yield* commandReceipts.upsert(receipt);
```

Four things are written together: the events, the projections (`applyStoredEvents`), the pending effects and the command receipt. This code runs in one database transaction and notifies subscribers only after the commit; by then the interface can already see your message.

### Stage 3: an effect starts the agent

After the database write it is the turn of [`EffectWorker.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L239-L249). It is one big `switch` with one branch per kind of effect; the `provider-turn.start` branch calls `providerTurnStart.start` ([L120-L125](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L120-L125)), and only further down does it reach the adapter's entry point `session.startTurn` ([`ProviderTurnStartService.ts` L427-L431](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/ProviderTurnStartService.ts#L427-L431)). `startTurn` is a method on the [`ProviderAdapterV2SessionRuntime`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L765-L880) interface; the `runtimePolicy` in its input carries the thread's permission mode, and the adapter translates it into each agent's own switches.

### Stage 4: the agent's events and approval requests come back

The native events emitted by the agent process are first translated by the adapter into the unified `ProviderAdapterV2Event` ([`ProviderAdapter.ts` L101-L250](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-core/src/server/ProviderAdapter.ts#L101-L250) is its full set of values), then turned by [`ProviderEventIngestor.ts` L620-L628](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/ProviderEventIngestor.ts#L620-L628) into domain events and sent back to the Orchestrator as commands. When the agent asks for permission, it goes through `runtime_request.updated`, one of these.

Your approval or rejection is another command, `runtime-request.respond`. The Orchestrator first confirms that the request is still waiting for you and errors if it is not ([L11589-L11595](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L11589-L11595)), marks it resolved, queues an effect to deliver the answer ([L11946-L11962](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L11946-L11962)), and finally [`RuntimeRequestService.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimeRequestService.ts#L78-L124) hands it to the adapter:

```ts
// RuntimeRequestService.ts L89-L123, excerpt
// Dispatch persists resolution before this effect runs; pending requests are not executable.
if (request.status !== "resolved") {
  return yield* new RuntimeRequestResponseExecutionError({
    reason: "request-not-ready",
    threadId: input.threadId,
    providerSessionId: input.providerSessionId,
    requestId: input.requestId,
  });
}
// (omitted: confirm the request can still be answered and the session is still active)
yield* session.value.respondToRuntimeRequest({
  requestId: input.requestId,
  ...(input.decision === undefined ? {} : { decision: input.decision }),
  ...(input.feedback === undefined ? {} : { feedback: input.feedback }),
  ...(input.answers === undefined ? {} : { answers: input.answers }),
});
```

The comment puts it precisely: "resolved" is written to the database first, and only then is the answer delivered. So the same request cannot be approved twice, and replying to a request that is no longer waiting is rejected as well. When the turn ends the adapter emits `turn.terminal` and the run is marked complete; the architecture doc explains that the checkpoint after this is captured afterwards as an effect, and until that capture is committed, readers treat it as still pending.

## 5. Three key mechanisms in depth

### Mechanism 1: how the permission modes are enforced in code

**The problem to solve**: the interface has only four levels, but behind them are a dozen or more agents, each with its own permission system, plus the ceiling set by the administrator. The code is split into three layers, each managing one thing.

The first layer, **definition and ordering**. The four levels and their order from strict to permissive are hard-coded in the contracts ([`providerPolicy.ts` L25-L43](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/contracts/src/providerPolicy.ts#L25-L43)): `approval-required` is 0, `auto-accept-edits` is 1, `auto` is 2, `full-access` is 3, and the value of `DEFAULT_RUNTIME_MODE` is `"full-access"`, which is exactly the thing the tutorial keeps warning about. With numbers attached, "above the ceiling or not" is a single comparison.

The second layer, **checking against the ceiling at the entrance**. [`DispatchModeLimit.ts` L79-L92](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/DispatchModeLimit.ts#L79-L92) does not look at the type of the command but at which events the command intends to produce: as long as one `thread.created`, `thread.runtime-mode-updated`, `run.created` or `run-attempt.created` would push the thread's mode above the ceiling, it is rejected. It is called by that line of check in stage 2, so no matter whether a command comes from the interface, an agent or a scheduled task, none gets past it. There is one more safety net: when the provider does not support a level, `providerRuntimeMode` in [`RuntimePolicy.ts` L82-L91](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimePolicy.ts#L82-L91) falls straight back to `approval-required`, matching the rule in the official docs, Never emulate missing permission modes: T3 Code does not fake a mode by clicking 'allow' for you.

The third layer, **translation and interception**. The adapter first translates the level into the agent's own switches. The Codex translation is in [`CodexAdapterV2.ts` L856-L898](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/CodexAdapterV2.ts#L856-L898):

| T3 Code level | Codex approval policy | Reviewer | Sandbox |
|---|---|---|---|
| `approval-required` | `untrusted` | user | read-only |
| `auto-accept-edits` | `on-request` | user | writable workspace |
| `auto` | `on-request` | automatic review | writable workspace |
| `full-access` | a set of fine-grained switches, of which only `mcp_elicitations` stays on | user | full access |

The Claude translation is in [`ClaudeAdapterV2.ts` L3682-L3691](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L3682-L3691): the four levels map in order to `default`, `acceptEdits`, `auto` and `bypassPermissions`. The code right after it, [L3716-L3722](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L3716-L3722), also checks: when your Claude settings disable skipping permissions, `bypassPermissions` is downgraded to `auto` or `default`. This is the same thing the official docs say with "under Full access, Claude may still ask you".

The code that really **intercepts at the moment a request arrives** is in the generic ACP adapter. The decision function is `acpOperationDisposition` in [`clientPolicy.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/clientPolicy.ts#L145-L188), and it returns one of three:

```ts
// clientPolicy.ts L149-L187, excerpt
const toolKind = operation.kind ?? "other";
if (isAcpReadKind(toolKind)) {
  return acpReadDisposition(runtimePolicy);
}
if (acpPolicyRequiresApproval(runtimePolicy)) {
  return "ask";
}

const sandboxPolicy = unknownRecord(runtimePolicy.sandboxPolicy);
switch (sandboxPolicy?.type) {
  // (omitted: the checks for the readOnly and workspaceWrite sandboxes)
  case "dangerFullAccess":
  case "externalSandbox":
    return "allow";
  case undefined:
    if (runtimePolicy.runtimeMode === "approval-required") return "deny";
    if (
      runtimePolicy.runtimeMode === "auto-accept-edits" &&
      runtimePolicy.approvalPolicy === undefined &&
      !isAcpMutationKind(toolKind)
    ) {
      return "ask";
    }
    return "allow";
  default:
    return "deny";
}
```

The place that calls it is `handleRequestPermission`, registered in [`adapter.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/adapter.ts#L7513-L7611):

```ts
// adapter.ts L7583-L7611, excerpt
if (disposition === "allow") {
  const optionId = selectAutoApprovedPermissionOption(answerableParams);
  return {
    _tag: "Immediate" as const,
    response:
      optionId === undefined
        ? ({ outcome: { outcome: "cancelled" } } as const)
        : ({ outcome: { outcome: "selected", optionId } } as const),
  };
}
// (omitted: the branch where disposition is deny, which also answers at once, only choosing the reject option)
return {
  _tag: "Pending" as const,
  pending: yield* beginApprovalRequest(
    yield* activeContext,
    params,
    handlerGeneration,
    transportRequestId,
  ),
};
```

**What this means for you.** The step that asks you is decided on the spot in the adapter: `allow` and `deny` answer the agent directly, and only `ask` becomes that `runtime_request.updated` from stage 4, appearing in your conversation. Reading files does not ask you: `isAcpReadKind` lets read, search and thinking operations through separately, consistent with the official docs, File reads and searches never wait for approval. The permission mode is not a sandbox either; it decides which set of rules T3 Code asks the agent to use, and the one enforcing the rules is the agent itself. SECURITY.md states at the start that the environment is not a sandbox; it runs agents and terminals with the permissions of your system user.

### Mechanism 2: remote access and the trust model of T3 Connect

**The problem to solve**: you are away and need to connect back to the machine at home, without opening a hole in the router and without letting your code pass through someone else's server. A table answers five questions first; the evidence is the internal docs, SECURITY.md and the server code.

| Question | Answer |
|---|---|
| Who holds the provider's login credentials | The environment's machine. The agent reads its own configuration, for example Claude's configuration directory |
| Who issues the session a client uses to connect to the server | The environment itself. Internal doc: A relay token is never an environment login |
| Who manages the cloud identity | T3 Connect uses Clerk. The internal docs list it in a separate trust boundary |
| Where business traffic goes | The client connects directly to the environment's tunnel hostname. The tunnel is the `cloudflared` process on the host, started by the server |
| Is the relay in the business traffic | No. `infra/relay/README.md`: The relay is intentionally not in the hot path for normal T3 Code traffic |

The relay takes part in only one thing: helping a signed-in client obtain a connection credential from the environment. The function on the environment side that issues it is `mintCredential` in [`CloudLink.ts`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/CloudLink.ts#L1585-L1688). It first verifies the signature of the credential proof forwarded by the relay, then runs the six checks below plus replay protection:

```ts
// CloudLink.ts L1626-L1647
if (
  Option.isNone(proofOption) ||
  proofOption.value.environmentId !== environmentId ||
  proofOption.value.sub !== linkedCloudUserId ||
  proofOption.value.cnf.jkt !== proofOption.value.clientProofKeyThumbprint ||
  !hasBoundedCloudProofLifetime({ ...proofOption.value, nowSeconds }) ||
  !hasExactScope({ scopes: proofOption.value.scope, expected: "environment:connect" })
) {
  return yield* new CloudLinkProofRejectedError({ request: "mint" });
}
const proof = proofOption.value;

const jtiSecretName = yield* replayMarkerName(CLOUD_MINT_JTI_PREFIX, proof.jti);
const nonceSecretName = yield* replayMarkerName(CLOUD_MINT_NONCE_PREFIX, proof.nonce);
const consumedReplayGuards = yield* consumeCloudReplayGuards({
  secrets,
  names: [jtiSecretName, nonceSecretName],
  value: stringToBytes(DateTime.formatIso(now)),
});
if (!consumedReplayGuards) {
  return yield* new CloudLinkProofReplayedError({ request: "mint" });
}
```

Read the six conditions one by one: the signature is valid; the target is this environment; the account is the one this environment is linked to; the proof is bound to the client's own key thumbprint (`cnf.jkt`); the lifetime has an upper bound; the scope is exactly `environment:connect`. After that, two replay markers must be consumed, so the same proof cannot be used twice. The launch arguments of the tunnel process are in [`ManagedEndpointRuntime.ts` L785-L805](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/ManagedEndpointRuntime.ts#L785-L805): just one `cloudflared tunnel --no-autoupdate ... run`, not through a shell. The tunnel exposes only the server's own loopback address; the reason is in the comments at [`CloudLink.ts` L586-L599](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/cloud/CloudLink.ts#L586-L599): the tunnel must be able to reach this server, so the source address used for signing is the server's own loopback address, never an address supplied by the caller.

**What the relay can see.** Putting the docs and the code together:

| Handled by the relay | Not handled by the relay |
|---|---|
| Environment link records, the assignment of managed tunnels | Your code and prompts, which go from your machine straight to the provider |
| Coordination while a credential is issued. Internal doc: The relay never sees session tokens | The HTTP and WebSocket traffic between client and server |
| Project and thread titles, model names and activity status, after you turn on Publish agent activity | Environment session tokens |
| Connection diagnostic traces and phone crash reports, both sent to Axiom | File contents |

**What this means for you.** The trust assumption is written in the open: the "intentional, not a vulnerability" list in SECURITY.md has an entry saying that once the relay's signing key is compromised, credentials can be issued on behalf of linked environments, and the mitigation the official docs give is to turn on **Require approval for new devices**, moving the trust from "the relay has not been compromised" to "the device keys you have approved". If you do not want to trust the relay, there are routes that skip it: direct LAN connections and Tailscale HTTPS both bypass the relay, and the FAQ also reminds you that you can self-host. In addition, phone push depends on Publish agent activity; the titles and model names it sends belong to a separate data flow, and turning off telemetry does not turn it off.

### Mechanism 3: what `packages/tailscale` uses Tailscale for

**The problem to solve**: the user already has a Tailscale network and wants to access their own T3 Code server over it at an `https://` address.

**How the code does it**: the package is small, with 5 files under version control (including 1 test), and the main file `tailscale.ts` is 781 lines. Its dependencies are only `@t3tools/contracts`, `@t3tools/shared` and `effect`; **there is no Tailscale SDK**. What it does is launch the local `tailscale` command line and read the output, in four kinds:

| What it does | Command it runs | Where in the code |
|---|---|---|
| Read status: whether it is running, the MagicDNS name, the Tailscale address, whether HTTPS is enabled on the tailnet | `tailscale status --json` | [`tailscale.ts` L307-L309](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L307-L309), [`L215-L242`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L215-L242) |
| Read preferences: whether Tailscale SSH is on | `tailscale debug prefs` | L381-L383 |
| Publish a local port as an HTTPS address on Tailscale, and revoke it | `tailscale serve ...` | [`L466-L485`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L466-L485) |
| Check which forwarding routes point to this server | `tailscale serve status --json` | [`L627-L687`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/tailscale/src/tailscale.ts#L627-L687) |

The core is the third kind, the function `ensureTailscaleServe`:

```ts
// tailscale.ts L477-L484
const status = yield* Effect.option(readTailscaleStatus);
if (Option.isSome(status) && status.value.httpsServeEnabled === false) {
  return yield* new TailscaleServeHttpsDisabledError();
}
const servePort = input.servePort ?? DEFAULT_TAILSCALE_SERVE_PORT;
const localHost = input.localHost ?? "127.0.0.1";
const args = ["serve", "--bg", `--https=${servePort}`, `http://${localHost}:${input.localPort}`];
return yield* runTailscaleCommand(args, TAILSCALE_SERVE_TIMEOUT);
```

It first reads the status and errors straight away if HTTPS is not enabled on the tailnet, because in that case `tailscale serve` configures nothing yet returns success. It then runs a command equivalent to `tailscale serve --bg --https=443 http://127.0.0.1:<port>`.

**What this means for you.** Tailscale is not a built-in component of T3 Code. You have to install Tailscale yourself, add the devices to the same tailnet, and enable MagicDNS and HTTPS certificates on the tailnet; these prerequisites are what the official Remote access doc describes. Pairing and authentication are not Tailscale's job either; the internal docs say Tailscale supplies an endpoint for normal pairing; auth remains the environment's responsibility. The code has one more layer of caution: it parses `tailscale serve status` to judge whether an existing forward on a port is its own, someone else's, or left over from a previous run that did not exit cleanly, and it leaves other people's routes alone.

## 6. Run from source and run the tests

The following is paraphrased from the [official development doc](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/operations/00_development.md); **it was not actually run when this page was written**.

### First checkout

T3 Code uses Vite+ to provide a pinned version of Node; the command is `vp`. On Windows, clone with `-c core.longpaths=true`, otherwise `.repos/` does not check out completely; the Windows way to install Vite+ is `irm https://vite.plus/ps1 | iex`.

```sh
curl -fsSL https://vite.plus | bash
git clone https://github.com/pingdotgg/t3code.git
cd t3code
vp i
vp run dev
```

`vp run dev` starts the server and the web app and prints a **pairing link**. Open this link; visiting the root address directly does not get a new browser through authentication. Do not point the server at `~/.t3/userdata` during development, as that is your real data directory; a normal clone uses `~/.t3/dev` by default. It also registers a provider called `Replay (dev)` that replays recorded conversations and calls no paid model. Use it while developing, unless what you are changing happens to be some real provider's protocol.

### Common checks

| To do this | Command |
|---|---|
| Run the checks related to your changes before pushing | `vp run check:changed` |
| Run the specified test files | `vp test run <files>` |
| Lint the specified files | `vp lint <files>` |
| Type-check only one package | `vp run --filter <pkg> typecheck` |
| Find unused exports | `vp run knip:check` |
| Test the relay | `vp test run` in the `infra/relay` directory |

AGENTS.md explicitly requires that you **do not run the whole-repository checks yourself** (`vp check`, `vp run -r test`, `vp run -r typecheck`); the full test run belongs to CI. When reading the tests, know the two rules in the internal doc `15_testing.md`: the server is event-sourced and effects run only after the command is committed, so in a test you must either drain the effect executor or wait for the event that marks the milestone, and **sleep or polling is not allowed**; adapters are tested with replay fixtures recorded from real providers, going through the real Orchestrator, adapter and projections, because hand-written protocol frames are a guess at the behavior on the wire.

## 7. Verified / inferred / unknown

### Verified

| Conclusion | Evidence |
|---|---|
| The pinned commit is `d00aaac8`, with the commit message `fix(antigravity): a tool's own arguments no longer mark it as a T3 MCP call (#41978)` | Local `git rev-parse HEAD` and `git log -1`, matching what the GitHub API returns |
| All the size figures in section 3 | Running `git ls-files` and `wc -l` at that commit |
| A command is first worked out as events and effects, and the effects run only after the database write | `Orchestrator.ts` L16565-L16566, L16689-L16695; `EventSink.ts` L846-L872; `docs/internals/01_architecture.md` |
| The four levels, their order from strict to permissive, and `full-access` as the default | `packages/contracts/src/providerPolicy.ts` L25-L43 |
| The permission ceiling is checked before every commit against "the events that will be produced" | `Orchestrator.ts` L16565-L16566; `DispatchModeLimit.ts` L79-L92 |
| A level the provider does not support falls back to `approval-required` | `RuntimePolicy.ts` L82-L91 |
| The ACP adapter judges every permission request as allow, ask or deny, and read operations do not ask | `clientPolicy.ts` L145-L202; `adapter.ts` L7555-L7611 |
| The level translation for Codex and Claude | `CodexAdapterV2.ts` L856-L898; `ClaudeAdapterV2.ts` L3682-L3691, L3716-L3722 |
| Before issuing a connection credential, the environment checks the six conditions of the relay proof and protects against replay | `CloudLink.ts` L1619-L1647 |
| The tunnel process is started by the server, and the source address is fixed to the server's own loopback address | `ManagedEndpointRuntime.ts` L785-L805; `CloudLink.ts` L586-L599 |
| The relay is not on the path of business traffic | `docs/internals/06_t3-connect.md`; `infra/relay/README.md` |
| `packages/tailscale` only calls the `tailscale` command line and contains no Tailscale SDK | `packages/tailscale/package.json`; `src/tailscale.ts` |
| The telemetry switch is on by default, and the endpoint defaults to `ingest.t3.codes` | `apps/server/src/telemetry/AnalyticsService.ts` L71-L74 |
| The signature of a guest link is a truncated HMAC | `apps/server/src/guest/GuestShareService.ts` L242-L249 |
| The web, mobile and desktop apps each have a `zh.json` translation directory | `git ls-files`, three `src/i18n/translations` directories |

### Inferred

- **Approving on the phone and approving on the computer go through the same flow.** The evidence is that both end up as `runtime-request.respond` commands. I did not read the code on the client side that sends the commands.
- **The call order in which the relay asks the environment to issue a credential** is taken from the internal docs. I read `mintCredential` on the server side; `EnvironmentConnector.ts` on the relay side was not read line by line.
- **The concrete recovery logic behind "work can continue after a restart"** is in files such as `ProviderRuntimeRecoveryService.ts`, which this page did not read. The architecture doc only says that the effects belonging to a lost provider process are voided during recovery rather than replayed.

### Unknown

- The default port of the `t3` server. The docs only show the example value `T3CODE_PORT=3773`; no original text saying "what the default is" was found.
- The complete list of fields in `t3.json`. The repository's own `t3.json` references `https://t3.codes/schema/t3.json`, which this page did not open.
- The deployment details of the relay (Clerk's configuration, differences between environments). `docs/operations/02_connect-setup.md` was not read for this page.
- How far the `zh.json` translation reaches, and where the interface switches languages.
- How `.repos/` is updated into the repository. AGENTS.md mentions only a sync command, which this page does not expand.

<!-- TODO: needs verification — the five "unknown" items above all lack a first-hand source; in addition, a comparison made while this page was being written found that main's docs/user/permission-modes.md already differs from the pinned commit (for example Antigravity has been added to the "fall back to asking you" list, and the levels available to fx have changed too), so when citing permission mode details defer to the docs of the version the reader uses -->

## 8. What to read next

- [Tutorial](./t3code) and [learning map](./index): learn to use it first, then come back to read the code.
- The official [`docs/README.md`](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/README.md): start from the Glossary and read the 18 internal docs in the order it gives.
- [Tailscale](../tailscale/): the thing `packages/tailscale` calls, itself.
- [Cindy](../cindy/): a multi-agent workspace product of the same kind; you can compare its architecture with this page.
- [Claude Code](../claude/), [Codex](../codex/): the two main agents being driven; only by looking at their permission systems can you understand what the adapters are translating.
