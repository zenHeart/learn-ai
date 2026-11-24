---
title: "Cindy source code walkthrough: how the three harnesses are wired into one workspace"
description: "Read the source of makecindy/cindy to make four things clear: Codex is implemented directly in maker-core rather than as a separate package; phone-to-computer control relies on a deny-by-default allowlist; Orca uses MCP to let one Lead direct several Workers; the various model protocols are translated for each other by a local loopback proxy. Includes a repository map, the steps to run it from source, and three lists: verified, inferred and unknown."
domain: product
tags:
  - source-code
  - electron
  - harness
  - device-link
role: deep-dive
pageClass: wide-figures
source_revision: 6fdec7fb89b955be548c3f5cc9a42d83bf174aa3
---

# Cindy source code walkthrough: how the three harnesses are wired into one workspace

> **The short version:** the core of Cindy is not yet another agent, but a layer of "session plus adapters". `packages/maker-core` translates three mutually different process protocols, those of Claude Code, Codex and Pi, into the same event stream, and the interface, the local database and the phone's remote control above it all recognize only this event stream.
> **Codex has no separate `maker-codex-manager` package**; it is implemented directly in `packages/maker-core/src/agents/codex/` and driven by a `codex app-server` subprocess.
>
> Every conclusion on this page is checked against `makecindy/cindy` commit `6fdec7fb` (full hash [`6fdec7fb89b955be548c3f5cc9a42d83bf174aa3`](https://github.com/makecindy/cindy/tree/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3)); later changes are outside the scope of this page. For the **Verified / inferred / unknown** layering, see the end of the page.

## Who it is for / who it is not for

- **Who it is for**: people who want to audit Cindy and need to know whose hands tasks and files pass through and what the phone can do to the computer; people who want to submit a PR and first need to know where the code lives; people who have used it and have questions, such as why switching harness loses context.
- **Who it is not for**: if you only want to install it and use it, read the [tutorial](./cindy); if you want to read the server side, the README states that the backend is "Not in this repo"; if you want an introduction to Electron, this page assumes you already know that the main process and the renderer process are two different things.

## Repository map

### Size: measured with commands

The numbers below were counted on the pinned commit and **include test files**. The commands are equivalent to the ones I ran in my clone, and all of them are read-only:

```bash
git -C <clone-dir> rev-parse HEAD            # outputs 6fdec7fb89b955be548c3f5cc9a42d83bf174aa3
git -C <clone-dir> ls-files | wc -l           # outputs 22991
git -C <clone-dir> ls-files | awk -F/ '{print $1}' | sort | uniq -c | sort -rn
git -C <clone-dir> ls-files apps | awk -F/ '{print $1"/"$2}' | sort | uniq -c | sort -rn
git -C <clone-dir> ls-files packages | awk -F/ '{print $1"/"$2}' | sort | uniq -c | sort -rn
```

| Top-level directory | Files | What is inside |
|---|---:|---|
| `apps/` | 16,227 | The desktop app, the mobile app, the Node background service, and three very small directories |
| `packages/` | 5,313 | 41 shared packages |
| `docs/` | 1,025 | Engineering rules, product rules, design rules, legal material |
| `scripts/`, `tools/`, `prototypes/` | 242, 31, 69 | Repository-level scripts, version pinning of engine binaries, prototypes |

| Under `apps/` | Files | Responsibility | Which file to start from |
|---|---:|---|---|
| `desktop` | 12,682 | The desktop client (Electron). `src/main` is the main process, which handles business logic, task IPC, the local database, device-link and the plugin runtime; `src/renderer` is the interface; `src/preload` is the bridge layer | `src/main/maker-host/index.ts`, where the three harness instances are created |
| `mobile` | 3,165 | The mobile client (Expo / React Native). A pure controller, with no local agent or database | `src/device-link/mobileMakerTransport.ts` |
| `host` | 294 | The Node background service `cindy-host`, which shares one main body of business logic with the desktop app. Experimental | `src/main.ts`, `src/agent/runtime.ts` |
| `cindy-headless` | 82 | A headless runtime for containers and evaluation, with a CLI and a Harbor adapter | `README.md`, `src/cli.ts` |
| `web` | 2 | The `shim.js` used by the browser side and a guard for one statistics region; not a standalone web app | `shim.js` |
| `android-platform-tools-bin` | 2 | Tools such as adb, downloaded only before Windows packaging and not committed | None |

The packages with the most files in `packages/` are `opencli-vendor` (1,443 files; not read for this page, responsibility not verified) and `agent-net-core` (1,032 files, of which 975 are simulation results under `sim/results`).
Third is `maker-core` (445 files), followed by `lizi-mcps` (428 files), `browser-control-runtime` (419 files), `maker-shared` (311 files) and `device-link` (161 files).
The collaboration package `orca-workflow` has only 9 files.

### Find a package by responsibility

| Concern | Packages | Which file to start from |
|---|---|---|
| Task orchestration | `maker-core` | `src/maker.ts`, `src/session.ts`, `src/agents/` |
| Model providers and protocol compatibility | `model-providers`, `model-compat` | `model-compat/README.md` |
| Protocol translation | `anthropic-compat-proxy`, `anthropic-responses-bridge`, `responses-anthropic-bridge`, `responses-chat-bridge` | The `description` in each `package.json` |
| Device connection V1 | `device-link`, `device-link-protocol`, `device-link-relay`, `device-link-sharing` | `device-link/README.md` |
| Device connection V2 (Agent-Net) | `agent-net`, `agent-net-core`, `agent-net-relay`, `agent-net-native`, `agent-net-protocol` | `docs/product-rules/agent-net.md` |
| SSH remote daemon | `maker-cc-manager`, `maker-pi-manager`, `maker-remote-ssh`, `remote-file-service` | The `description` in each `package.json` |
| Collaboration and scheduled tasks | `orca-workflow`, `maker-scheduler` | `orca-workflow/src/orca-bridge-prompt.ts` |
| Plugins and tools | `plugin-protocol`, `cindy-tools`, `lizi-mcps`, `browser-control-runtime` | `docs/dev-rules/plugin-security-and-authoring.md` |
| Chat channels | `lizi-im`, `slack-hook-protocol`, `wechat-ilink` | `docs/dev-rules/im-turn-flow.md` |
| Account, heartbeat, vectors | `auth-client`, `heartbeat-client`, `embedding-client` | The `package.json` of `heartbeat-client` |

### Three counterintuitive facts

**First, the largest single file is the Codex adapter.** Non-test line counts of the three adapters: `agents/codex/index.ts` 16,738 lines, `agents/pi/index.ts` 10,437 lines, `agents/claude-code/index.ts` 8,740 lines.
**Second, `maker-cc-manager` is not the driver of the local Claude Code.** Its package description states that it is an NDJSON RPC daemon "spawned on remote SSH machine". The driver of the local Claude Code is in `maker-core` and calls the official SDK directly.
**Third, `maker-ipc/register.ts` in the desktop main process is 23,761 lines in one file**, with 174 calls to `ipcMain.handle` or `ipcMain.on`. Phone remote control can reuse these handlers, and not because they were refactored one by one; see Mechanism 2 below.

## Architecture and data flow: the complete round trip of one task request

Read on with this question: **the interface sends only one IPC call, so how does the message reach an external process that knows nothing about Cindy?**

### Outbound: from the interface to the subprocess

The renderer process does not touch tasks directly. It calls an IPC channel through preload: `ipcRenderer.invoke('maker:send', sessionId, message, createOpts, sendOpts)`
([`apps/desktop/src/preload/preload.ts`, line 7859](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/preload/preload.ts#L7859)).
The entry on the main-process side is `sendToSessionInternal` ([`register.ts`, line 12284](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/register.ts#L12284));
queueing and saving to the database are handled by `AgentInputCoordinator` in the same directory. Its file-header comment explains why this layer exists:

> One user input crosses four state owners: the queue projection, the visible bubble, the SQLite message row, and the maker-core dispatch boundary.
> This coordinator makes the state transitions explicit and routes every pre-dispatch failure through a rollback path.

Source: [`agent-input-coordinator.ts`, lines 19 to 42](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/agent-input-coordinator.ts#L19-L42).

The center of `maker-core` is `Maker` and `Session`. `Maker` holds all active tasks in one map ([`maker.ts`, lines 534 to 539](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/maker.ts#L534-L539)).
`Session.send` hands the actual send to `dispatchSend`. The latter runs a long list of guards: wait for the previous turn to end completely, wait for a permission switch to land, confirm that no other send has already reserved the slot, and only then push the message to the harness:

```ts
          await this.handle.send(msg, bindSessionSendOwner({
            ...handleOpts,
            [AUTO_REVIEW_SOURCE_CONTENT]: autoReviewSourceContent,
            signal: reservation.abortController.signal,
          }, reservedTurnGeneration, () => {
            if (reservedTurnGeneration !== this.turnGeneration) return undefined;
            return this.terminalEventObservedGeneration === reservedTurnGeneration
              && this.unsolicitedTurnGeneration !== reservedTurnGeneration ? 'settled' : 'unsettled';
          }));
```

Source: [`packages/maker-core/src/session.ts`, lines 1145 to 1153](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L1145-L1153).
Here `handle` is a very thin interface, `AgentSessionHandle`; `Session` knows only its `send(message, opts)` and no concrete harness ([`base-agent.ts`, lines 2641 to 2642](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/base-agent.ts#L2641-L2642)).

Taking Codex as the example, `handle.send` ends at one JSON-RPC request:

```ts
      await host.request(Method.TurnStart, {
        threadId,
        input: [{ type: 'text', text: prompt }],
      } as TurnStartParams);
```

Source: [`packages/maker-core/src/agents/codex/index.ts`, lines 3624 to 3627](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/index.ts#L3624-L3627).
It is written to the standard input of the `codex app-server` subprocess. The subprocess is started like this:

```ts
  const args = ['app-server', ...(opts.extraArgs ?? [])];
  const child: ChildProcessWithoutNullStreams = spawn(opts.binaryPath, args, {
    cwd: opts.cwd,
    env: opts.env,
    // All three streams are piped: we write to stdin, read stdout, and stderr goes to onStderr (for diagnostics).
    stdio: ['pipe', 'pipe', 'pipe'],
    // Windows: no shell, go straight to the binary; going through a shell brings env injection risk
    // and makes the stdio piping behavior uncontrollable.
    shell: false,
    // On Windows the app-server and its console handle should not interrupt the desktop UI.
    windowsHide: true,
    // Do not create a separate process group; close() must still explicitly wait for and confirm the child's exit.
    detached: false,
  });
```

Source: [`packages/maker-core/src/agents/codex/app-server/stdioTransport.ts`, lines 77 to 90](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/stdioTransport.ts#L77-L90).
Note three conservative choices: no shell, no separate process group for the subprocess, and closing must wait until it has really exited.

<DocDiagram src="/diagrams/cindy-session-flow.en.svg" alt="This sequence diagram answers one question by number: when you send a message from the UI, which objects does it pass through, in what order, before the harness runs it, and how does the result come back to the UI. There are six vertical lanes, left to right: the UI, that is the Renderer; the preload bridge, that is preload; the main process, whose lane names both the IPC handler and the input coordinator; Maker and Session, both in maker-core; the harness adapter; and the harness subprocess. The local SQLite database is the ninth object, drawn as a callout box inside the main-process lane. The number in each round badge is the order; when one number has several arrows, that step is relayed through several objects. Solid arrows are commands or calls; dashed arrows are events, broadcasts and returns. Step 1: the UI invokes maker:send through the preload bridge, carrying the sessionId and the message, and the call reaches the handler registered with ipcMain.handle in the main process. Step 2: the main process hands the input to the input coordinator, which queues it, saves it to the database and checks whether this task already has a running turn. Step 3: the coordinator gets or resumes the matching Session through Maker. Step 4: Session.send enters dispatchSend, which confirms that no turn is running and reserves an id for this turn. Step 5: Session calls handle.send and enters the harness adapter. Step 6: the adapter translates the message into that harness's own protocol and sends it to the subprocess: turn/start for Codex, SDK query for Claude Code, RPC for Pi. Step 7: the subprocess runs: it calls the model, reads and writes files, and runs commands. Step 8: the raw harness output reaches the adapter, which translates it into unified events such as text, tool_use, tool_result and turn_diff and passes them to Session. Step 9: Session dispatches the events to listeners; the main process writes the message to the local SQLite database and broadcasts the events back to the UI. Step 10: an action that needs confirmation travels as interaction_request through Session and the main process back to the UI, where it waits for the user's decision; the decision then goes through the main process and Session to the adapter, which passes it back to the subprocess; when no matching subscriber is found it is treated as a rejection. Step 11: the subprocess reports that the turn ended, Session receives done, and the UI is enabled for input again. This diagram omits: the server or cloud, because a local task turn does not go through the Cindy service; the phone and Device Link, which are a separate path; any timing numbers; and the specific database functions and table layout." :width="1020" lang="en" />

> **What the diagram is based on:** the entry point `maker:send` is checked against [`preload.ts` L7859](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/preload/preload.ts#L7859) and [`register.ts` L12284](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/register.ts#L12284); `dispatchSend` and "no running turn" against [`session.ts` L925–L930](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L925-L930) and [L1145–L1153](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/session.ts#L1145-L1153); the adapter's `send` against [`base-agent.ts` L2641–L2642](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/base-agent.ts#L2641-L2642); Codex's `turn/start` against [`codex/index.ts` L3624–L3627](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/index.ts#L3624-L3627) and [`host.ts` L796–L811](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L796-L811); the unified event types against [`events.ts` L30–L47](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/types/events.ts#L30-L47), all at commit `6fdec7fb`. The diagram keeps the 9 objects, the order and direction of the 11 steps, and the difference between solid lines (commands or calls) and dashed lines (events, broadcasts and returns). Two points stated as they are: for the return path of steps 10 and 11 only the two ends were verified, and the middle is drawn hop by hop along the path already given by steps 1 and 9, so it is inferred; the arrows between the UI and the main process cross the preload-bridge lane directly, because only step 1 states that it passes through it. The diagram omits the server and the cloud, the phone and Device Link, any timing, and the database functions and table layout.

### Return: unified events and confirmation requests in the reverse direction

Each of the three adapters has its own `translator.ts` that turns the harness's raw output into unified events. There are 17 event types in all
([`packages/maker-core/src/types/events.ts`, lines 30 to 47](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/types/events.ts#L30-L47)); the ones the interface cares about are these:

| Event type | Meaning |
|---|---|
| `text`, `thinking` | Streaming body text and reasoning text |
| `tool_use`, `tool_result` | A tool call starting, and its condensed result |
| `turn_diff` | The harness's cumulative unified diff of this turn's workspace changes |
| `interaction_request` | Needs a user decision: permission, a question, plan review |
| `status` | A state change, with a usage snapshot |
| `done`, `error` | A turn ended, or an error |

The confirmation card travels as a **reverse** request. When Codex wants to run a command, it is the app-server that sends a request to Cindy. Cindy's handling has a fallback: when no matching subscriber is found, it always declines.

```ts
      if (!handlers?.commandExecutionApproval) {
        this.logger.warn('commandExecution approval without subscriber → decline', {
          threadId: params.threadId,
          itemId: params.itemId,
        });
        return { decision: 'decline' };
      }
```

Source: [`packages/maker-core/src/agents/codex/app-server/host.ts`, lines 796 to 811](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L796-L811).
The `catch` block right after it also returns a decline when the handler throws. In this direction the rule is "block on error", not "allow on error".

## Key mechanism 1: how Cindy drives the three harnesses

**The problem to solve**: the three harnesses speak three languages, and Cindy wants the layers above to need no knowledge of which one is underneath.

| Harness | Adapter | How the process is started and how it talks | Evidence |
|---|---|---|---|
| Claude Code | `agents/claude-code/index.ts` | Through `query` and `forkSession` of `@anthropic-ai/claude-agent-sdk` 0.3.321 | [Lines 35 to 38](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/claude-code/index.ts#L35-L38), [line 1124](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/claude-code/index.ts#L1124) |
| Codex | `agents/codex/index.ts` and `app-server/` | Starts a `codex app-server` subprocess and runs NDJSON JSON-RPC over stdio | The two excerpts in the previous section |
| Pi | `agents/pi/index.ts` | `pi --mode rpc`, with JSONL over stdio | [Lines 9 to 28](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/pi/index.ts#L9-L28) |

**Where Codex plugs in: the most frequently asked point about this page.** The answer:

1. There is **no** `maker-codex-manager` under `packages/`; it is not in the output of `ls packages`.
2. The Codex adapter is in `packages/maker-core/src/agents/codex/`: one `CodexAgent` class plus an `app-server/` subdirectory.
3. The helper code for accounts and sign-in is on the Node background service side: eight files under `apps/host/src/agent/`, including `codex-runtime.ts`, `codex-credentials.ts`, `codex-system-login.ts`, `codex-thread-storage.ts` and `codex-token-reader.ts`.
4. The three instances are created in two places: on the desktop side at [`maker-host/index.ts`, line 1453 and line 1768](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-host/index.ts#L1768) and [`maker-host/pi-host.ts`, line 268](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-host/pi-host.ts#L268); on the Node background service side at [`runtime.ts`, lines 702, 774 and 860](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/host/src/agent/runtime.ts#L774).

One place is easy to get wrong: the "`mcp-integrations` codex MCP" mentioned in the repository map and the Orca document is where the collaboration feature attaches an MCP bridge to Codex; it is **not** the entry that drives Codex.

The Codex side has one more design that differs from the others. The file header of `AppServerHost` states ([lines 1 to 14](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/agents/codex/app-server/host.ts#L1-L14)):
one `CodexAgent` starts only one app-server, each task maps to one thread on the server side, and inbound notifications are routed back to the matching task by `threadId`.
The same file also leaves a note for Windows: "Windows child processes do not die with the parent", so it must be closed explicitly before the app exits.

**What happens when you switch harness.** The desktop main process has a dedicated handler, and its file header states the flow plainly:

```ts
 * The send transaction (applyPendingAgentSwitchIfIdle → applyNow=true) runs once:
 *   validate → look up the target engine's docked binding (Phase 2) → build the handoff text (pure code,
 *   agentHandoff.buildHandoffText: with a docked binding = incremental mode, otherwise full)
 *   → close the old live session → DB commit (agent_kind + model + provider_id + effort/fast;
 *   sdk_session_id lands on the migration / docking id or null) → insert the agent_switch boundary row (the full handoff text is persisted
 *   here, and the UI can expand it) → register the pending injection → (on resume) immediately rebuild the new engine's session.
```

Source: [`apps/desktop/src/main/maker-ipc/sessionAgentSwitchHandler.ts`, lines 6 to 11](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/maker-ipc/sessionAgentSwitchHandler.ts#L6-L11).

**What it means for users:**

- **Losing context when you switch harness is by design.** The new engine gets a piece of handoff text plus a rebuilt session, not the old engine's internal state. This is the code behind the README sentence "rather than making their internal states identical".
- **Switching back to the original harness loses a little less.** A comment in the same file states that each engine's native session is "docked" when it leaves, and when you switch back it is restored with only the increment filled in.
- **Codex's confirmation card would rather block wrongly.** A missing subscriber or a handler that throws both end in a decline.

## Key mechanism 2: device connection, how devices find each other and where the traffic goes

**The problem to solve**: the phone has no agent, yet it must be able to operate tasks on the computer; at the same time the phone must not get all of the computer's capabilities.

**How they discover each other.** After a device connects to the service it sends one `hello` frame, carrying the device name, platform, app version, whether it allows being controlled, and whether it is busy; the server broadcasts state changes of devices on the same account as `presence-changed`.
The device list has a separate REST endpoint, `GET /api/device-link/devices`. These are written in the "Connection lifecycle" section of [`packages/device-link/README.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/README.md).

**Whether the traffic passes through a relay.** Device Link has two routes: a direct connection over WebRTC, and a relayed connection over WebSocket. There are four kinds of line, which the product rules list as: the official relay, deployed on my server, this computer as the relay, and joining someone else's relay.
**The core of a self-hosted relay is in this repository**: the package description of `packages/device-link-relay` says it "can run both inside Cindy and standalone with Node on a server".

**Can the relay see the content.** In two layers. The protocol envelope is `Envelope` in `packages/device-link-protocol/src/protocol.ts` ([lines 51 to 65](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link-protocol/src/protocol.ts#L51-L65));
the `payload` field has the type `unknown`, and the whole interface has **no encryption or signature field at all**. In other words, on the V1 wire protocol the relay can get the business content. The self-hosted relay core in the repository declares that it does not look:

```ts
 * Only understands connection-layer frames and routing headers; tunnel-layer payloads (the channel/args of invoke, push content) are forwarded as is, not parsed.
```

Source: [`packages/device-link-relay/src/hub.ts`, line 3](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link-relay/src/hub.ts#L3).
That is the behavior of the open-source core. **The official relay is closed source; whether it reads or retains content cannot be verified on this page.**

**Who can see what.** The controlled computer does not hand over the whole main process; it opens only one allowlist:

```ts
 * Two-layer validation: before the controller sends (fail fast) + before the controlled end executes (authoritative).
 * A new channel that is not added to the table is naturally not remotely callable (the code guarantees determinism).
```

Source: [`packages/device-link/src/allowlist.ts`, lines 19 to 20](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/src/allowlist.ts#L19-L20).
The full set is `REMOTE_INVOKE_ALLOWLIST` in the same file ([line 832](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/src/allowlist.ts#L832)), deny by default.
The file header also lists the categories that are "never allowed": application windows and UI, local dialogs, shell side effects, accounts and keys, writes to the controlled end's global settings, raw writes to the local database, and the updater.
The implementation has a clever shortcut: `apps/desktop/src/main/device-link/invoke-registry.ts` replaces `ipcMain.handle` before any handler is registered and records the whole mapping from channel name to handler,
so a remote call can use a synthetic event to call the handlers that already exist on the computer, with zero changes to the registration points in more than forty files.

**Agent-Net (Beta) adds encryption.** The product rules position it as "the next generation of device-link: replacing the transport layer and the identity layer"; the first hard rule is "end-to-end encryption", and it also requires that "users can use their own relay" and that "the LAN does not depend on a server".
Its transport core, `packages/agent-net-core`, is a general reliable UDP protocol. The rules also state that it is "off by default", and that when off its behavior must be exactly the same as the existing Device Link.

**Remote desktop uses a separate media channel.** The developer document states: Device Link's WebSocket remains the signaling and control channel, the picture and input go over WebRTC's ICE, and when the video cannot connect it falls back to the original JPEG picture channel;
the ICE configuration (including TURN credentials) is requested by the controlled end and the viewer separately from `GET /api/device-link/ice-servers`.

**What it means for users:**

- **Under V1, your task content is visible to the relay at the protocol level.** If you mind, turn on Agent-Net (Beta), self-host a relay, or use local mode only.
- **The phone cannot get your keys, and it cannot change the computer's global settings.** This is not done by hiding them in the interface; the allowlist simply has no such channels.
- **A task that can run remotely does not have small permissions.** The allowlist's own comment puts it clearly: with the same account and being controlled explicitly turned on, the controller can already run an agent in the working directory, and so can run arbitrary commands.
  So the "Allow same-account devices to control this machine" switch amounts to handing the shell of the working directory to the other devices signed in to your account.

## Key mechanism 3: Orca, one Lead directing several Workers over MCP

**The problem to solve**: one agent has limited context and can use only its own kind of model. A large task needs several agents with different strengths working in parallel.

**How the code does it.** Orca is "one Lead task plus several Worker tasks". The collaboration architecture document in the repository defines it precisely: the Lead is responsible for splitting the task, assigning work, acceptance and summary; the Workers are responsible for execution; "a Worker is a complete session, not a one-off subagent".
The Lead directs Workers through a set of MCP tools, on a server named `cindy_orca`. The Lead's system prompt lists them directly:

```ts
    'Tools: get_workspace_info, create_worker, create_workers, send_to_worker, interrupt_worker, get_worker_queue_status, update_queued_message, cancel_queued_message, merge_queued_messages, steer_queued_message, move_queued_message, update_worker.',
    '(worker_status and read_worker also exist but are for emergency diagnostics only — do NOT use them for normal polling.)',
```

Source: [`packages/orca-workflow/src/orca-bridge-prompt.ts`, lines 32 to 33](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/orca-workflow/src/orca-bridge-prompt.ts#L32-L33).

- **Assigning work is asynchronous.** The same prompt states that a Worker calls `send_to_lead` to report when it is done, the Lead "is woken up automatically", and no polling is needed.
- **Each Worker has its own queue.** The queue is first in, first out; the Lead can jump the queue, merge, and cancel instructions that have not run yet.
- **Workers and native subagents are deliberately kept apart.** The prompt requires the Lead to use the native mechanism only when the user explicitly says "subagent", and not to use the native subagent lifecycle tools to wait for a Worker. The Worker side has its own bridge, on a server named `orca_worker_bridge`.

**What it means for users:** each Worker is a real task, with its own harness, model, permissions and history; you can see it in the interface and take it over on its own.
The Lead's harness can differ from the Workers'; this is what the official site's example of "one kind each for planning, execution and review" is built on. The document's "current boundaries" state that a team is bound strictly to one Lead, sharing Workers across Leads is not supported, and switching focus only changes what is displayed rather than showing them side by side.

## Appendix: what problem model protocol bridging solves

Each harness speaks only one model protocol: Claude Code speaks Anthropic Messages, Codex speaks OpenAI Responses, Pi goes through its own SDK. To let any harness use any provider, someone has to translate.
Cindy's approach is to start a proxy on the local machine that listens only on the loopback address, and translate inside the proxy. The third column below is the beginning of the `description` in each package's `package.json`; where there is an ellipsis only the first half of the sentence is kept, and the source is authoritative for the full description:

| Package | What it does | Package description, verbatim |
|---|---|---|
| `anthropic-compat-proxy` | Strips the Anthropic-only fields when Claude Code uses a non-Anthropic model | Loopback HTTP proxy that strips Anthropic-only request fields when the target model is non-Anthropic… |
| `anthropic-responses-bridge` | Translates between Anthropic Messages and OpenAI Responses, so that Claude Code can drive a ChatGPT subscription or xAI models | Loopback HTTP bridge that translates Anthropic Messages API <-> OpenAI Responses API… |
| `responses-anthropic-bridge` | Translates Responses requests for Anthropic-compatible providers | In-process bridge that translates OpenAI Responses requests and events to and from Anthropic Messages compatible providers |
| `responses-chat-bridge` | Translates Responses for Chat Completions-compatible providers | In-process bridge that translates OpenAI Responses requests and streaming events to and from OpenAI Chat Completions compatible providers |

`packages/model-compat/README.md` has a table showing who consumes these fixes; the last row of the table is "Mobile / remote UI": the interface side uses the selected desktop execution path and does not bring a second model transport into the interface client.

There are two points for users. First, **"running domestic Chinese models with the Claude Code harness" works through translation**; wherever the translation does not reach shows up as a compatibility problem, which is why the official site says the available combinations "depend on the connected service, authorization and model capability".
Second, **model requests are sent from the computer that runs the task**, not from the phone.

## How to run it from source and run the tests

The commands are authoritative in the repository's [`CONTRIBUTING.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/CONTRIBUTING.md) and the [`docs/dev-rules/environment-setup.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/environment-setup.md) it points to. What follows is a paraphrase, checked item by item against the root `package.json`.

### Prerequisites

The README lists three items; the corresponding values in the root `package.json` are:

| Requirement | What the README says | Actual value in `package.json` |
|---|---|---|
| Node.js | **Node.js** >= 22.13 (see `engines.node` in the root `package.json`) | `engines.node` is `>=22.13`; `.nvmrc` is `22.22.3` |
| pnpm | **pnpm** 11.x (`>=11.25 <12`, see `engines.pnpm` and `packageManager` in the root `package.json`) | `engines.pnpm` is `>=11.25 <12`; `packageManager` is `pnpm@11.28.9` |
| Git LFS | **Git LFS** | The `git lfs pull` in the installation steps |

Compiling the native parts of the mobile app also needs **Rust 1.88 or later** (the "Mobile native build" section of the environment document). You do not need it to run the desktop app only.

### Minimal entry point and launch

```bash
git clone https://github.com/makecindy/cindy.git
cd cindy
git lfs pull
pnpm install
```

**Know what `pnpm install` does before you run it.** The environment document states that postinstall does its best to download the Desktop runtime binaries for the current platform automatically: claude, codex, ripgrep and pi, none of which go into git; a failure only warns and does not block. It also re-checks that the Electron binary is installed.

```bash
pnpm restart:desktop:remote --region=cn      # Mainland China Cindy account
pnpm restart:desktop:remote --region=global  # Global Cindy account
```

Two things are easy to trip over. **Do not rely on the default region**: the README says "do not rely on the internal default". **The default is an isolated dev sandbox**: the desktop development document explains that the restart command is equivalent to automatically appending `--isolated=dev` by default, and does not share the account sign-in state or business data of your stable build; add `--shared` only when you explicitly want to reuse them.
The experimental web version is previewed with `pnpm preview:host`: it always listens on `http://127.0.0.1:3466`, is for local access only, and uses a separate data directory. The document is restrained: until permission confirmation, stopping, reconnection recovery and desktop regression are done, it is "to be called a local experimental preview only, not a release-ready product".

### Run the tests and submit

| Command | What it does |
|---|---|
| `pnpm test:unit` | Unit tests for the whole repository |
| `pnpm test:unit:related` | Runs only the tests related to your changes. The repository rules say to use this by default |
| `pnpm --filter @cindy/host test` | Tests of the Node background service. You must run it after changing the main body shared by the desktop app and the background service |
| `pnpm check:dev-docs` | Documentation check. Run this for documentation-only changes |
| `pnpm check:dco` | Checks locally whether your commits carry a DCO sign-off |

Changes go into `main` through pull requests, not by pushing directly. Every commit needs a DCO sign-off (`git commit -s`); no CLA is required. The PR title has the format `<type>(<scope>): <short description>`, and the PR must state which validation commands were actually run and their results.

## Verified, inferred and unknown

### Verified (read from the original text or run by hand)

| Conclusion | Evidence |
|---|---|
| Size figures: 22,991 tracked files in total, plus the counts for each directory | Ran `git ls-files` on the pinned commit |
| No `maker-codex-manager` under `packages/`; 41 packages in all | The output of `ls packages` |
| Codex is driven by a `codex app-server` subprocess, one process per instance, reused by several tasks; approvals are declined when no subscriber is found | `app-server/stdioTransport.ts`, lines 77 to 90; `app-server/host.ts`, lines 1 to 14 and lines 796 to 811 |
| Claude Code goes through `query` of `@anthropic-ai/claude-agent-sdk` 0.3.321 | `claude-code/index.ts`, lines 35 to 38; `maker-core/package.json` |
| Pi goes through `pi --mode rpc` | `pi/index.ts`, lines 9 to 28 |
| `maker-cc-manager` is a daemon that runs on a remote SSH machine | The `description` in that package's `package.json` |
| Switching harness follows the "intent, handoff text, docking" flow | `sessionAgentSwitchHandler.ts`, lines 6 to 11 and the comments after them |
| There are 17 unified event types in all | `types/events.ts`, lines 30 to 47 |
| The phone is a pure controller; the remotely callable channels are a deny-by-default allowlist | `device-link/README.md`; `allowlist.ts`, lines 19 to 20 and line 832 |
| The V1 envelope has no encryption field; the self-hosted relay core in the repository declares that it forwards as is and does not parse the payload | `device-link-protocol/src/protocol.ts`, lines 51 to 65; `device-link-relay/src/hub.ts`, line 3 |
| Agent-Net is end-to-end encrypted and off by default | `docs/product-rules/agent-net.md` |
| The online heartbeat starts only under a verified cloud sign-in state, at 60-second intervals | `apps/desktop/src/main/heartbeatService.ts`, lines 6 to 10 and line 35 |
| dev builds do not initialize TapDB by default | The "Usage statistics (TapDB) are not reported in dev" section of `docs/dev-rules/desktop-development.md` |
| The version requirements for Node and pnpm | `engines` and `packageManager` in the root `package.json` |
| The server is not in this repository | The "What's in this repo" section of `README.zh-CN.md` |

### Inferred (there is a basis, but it was not read or verified directly)

| Conclusion | Evidence and gap |
|---|---|
| When events return to the interface, the main process writes to SQLite and broadcasts | `PUSH_FORWARD_ALLOWLIST` in `allowlist.ts` contains `maker:event` and `local-db:messages:created`; the file header of the input coordinator mentions the "SQLite message row". I did not read the specific function in the main process that does this |
| Model requests of local tasks go out through the on-machine loopback proxy | The package description of `anthropic-compat-proxy`, and "baseUrl = Cindy gateway / local proxy" in the file header of `pi/index.ts`. I did not read the assembly code on the desktop side line by line |
| The business content of default Device Link is visible to the relay | The envelope has no encryption field; `agent-net.md` describes V1 as possibly "unable to encrypt". Not verified by packet capture |
| In local mode, no task-related traffic is sent to Cindy's services | The privacy policy and `heartbeatService.ts` state that local mode sends no heartbeat. Gap: other network requests, such as update checks and endpoint manifest fetching, were not checked one by one, and the README states that desktop auto-updates come from the official CDN |

### Unknown (not found, or not investigated)

| Question | Sources checked |
|---|---|
| Whether the official relay reads or retains content | The server is not in the repository; the repository has only the self-hosted relay core |
| When Cindy Host and the basic web version will be released publicly | The documents under `docs/host/` say "experimental" and "not yet fully implemented"; `systemd.md` in the same directory still says "the HTTP API and the web front end are not yet implemented", which disagrees with the acceptance record in `basic-web.md` |
| How `apps/cindy-headless` and `apps/host` relate, and the release channel of each | The two READMEs do not describe each other |
| What `packages/opencli-vendor` is responsible for | The package with the most files; not read for this page |
| How to obtain the plugin engines (ACP) publicly | A source comment points to `docs/plans/acp-plugin-bridge.md`, not read; there are three plugin repositories under the organization, and the installation method was not verified |
| Which regions and editions can see which chat channels | The README names Slack and Telegram (the Chinese version says Slack and Feishu); `im-turn-flow.md` lists more channels |
| How conversations and files are encrypted in local storage | `docs/dev-rules/credentials-and-local-storage.md` not read |
| Which system permissions remote desktop needs on macOS and on Windows | `docs/dev-rules/macos-system-permissions.md` had an encoding problem when read and could not be checked |
| The minimum macOS version | The download page says macOS 13 or later; "the minimum system is macOS 12" appears in the repository's developer documents |

## What to read next

- [`packages/maker-core/AGENTS.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/AGENTS.md): the entry point to the rules you must read before changing orchestration and prompts.
- [`docs/dev-rules/orca-team-architecture.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/orca-team-architecture.md): the only authoritative document on Orca, with many pitfalls and invariants.
- [`docs/dev-rules/remote-and-mobile-adaptation.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/remote-and-mobile-adaptation.md): the gate for the remote and mobile versions, including the "three blast-radius questions" for the recovery path.
- [`docs/dev-rules/protocol-compatibility.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/protocol-compatibility.md): the compatibility rules for when the client and the server each maintain their own protocol implementation.
- [`docs/dev-rules/credentials-and-local-storage.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/dev-rules/credentials-and-local-storage.md): security rules for credentials and local data; one of the items under "Unknown" above can be filled in from here.
- [`docs/host/README.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/host/README.md): the goals, current state and unfinished items of the Node background service.

On this site: for usage see the [tutorial](./cindy), for choosing it see the [learning map](./index). For the documentation of each of the three harnesses see [Claude](../claude/), [Codex](../codex/) and [Pi](../pi-coding-agent).
