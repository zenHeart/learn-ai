---
title: "T3 Code getting started: install it, run your first thread, continue from your phone"
description: "T3 Code is an open-source local app that ships no model of its own. It drives the coding agents already installed and signed in on your computer, lets them share one interface, one approval flow and one change view, and lets you continue from your phone after you leave the computer. This page walks you through installing it, running your first thread, learning the permission modes and remote access, and stating three security boundaries."
domain: product
tags:
  - coding-agent
  - agent-workspace
  - remote-access
role: tutorial
pageClass: wide-figures readable-tables
---

# T3 Code getting started: install it, run your first thread, continue from your phone

> **The short version:** T3 Code is an open-source local app. It ships no model of its own; it drives the coding agents **already installed and signed in** on your computer (Claude Code, Codex, Cursor, OpenCode and others), lets them share one interface, one approval flow and one change view, and after you leave the computer lets you approve the next step and receive notifications from your phone.
>
> It solves the problem of "too many agents, each in its own window, everything stopping when you walk away". It does not give you yet another stronger agent.

The commands, menu paths and numbers on this page were checked against the official docs and source code on 2026-11-24 (repository commit `d00aaac8`). T3 Code changes fast, with a nightly on GitHub Releases almost every day, so for details go by the docs that ship with the version you use. The official docs live in the repository's `docs/user/` directory, and the documentation links on this page are pinned to that commit.

## 1. What you will be able to do

- Explain what T3 Code, Claude Code and Codex are each responsible for, and why at least one agent must be installed first.
- Install T3 Code on macOS, Windows or Linux, and confirm in **Settings > Providers** that it recognizes the agents you are signed in to.
- Start your first thread, run a small task in **Supervised** mode, reject or approve its actions in the conversation, and then see which files it changed.
- Change the default permission for new threads from **Full access** to a safer level, and switch between the four modes by scenario.
- Connect your phone to this computer with T3 Connect and turn on notifications.
- State what risk guest links, telemetry and managed policy each carry, and how to turn them off or tighten them.

## 2. Audience, prerequisites and non-goals

- **Who**: frontend or AI application developers who already have two or more coding agents, for example with subscriptions to both Claude and ChatGPT; who want to run several tasks in parallel, each on its own branch; who want to check progress and tap approve from the phone after leaving the computer. It also fits you if you have never used an "agent workspace" product and are not familiar with terms such as harness and provider.
- **Prerequisites**: a computer you control as the host; the desktop app supports macOS, Windows 10 / 11 and Linux ([official download page](https://t3.codes/download)); at least one agent that is installed and signed in, in the official wording "You need an installed, authenticated provider before starting a thread"; to use the Pull Request feature, the official requirement is that Git is installed and authentication is configured on the host.
- **Non-goals**: no teaching of Claude Code or Codex themselves; go to [Claude Code](../claude/) and [Codex](../codex/). No running models locally; the official FAQ states that T3 Code does not support local models. No setting up Tailscale; see [Tailscale](../tailscale/). This is not a translation of the official docs; when they conflict, the official docs win.

### Confirm one thing first: where the agent actually runs

The most common worry for newcomers is "if I use T3 Code, is my code uploaded and run on T3's servers?". According to the official docs, no:

- README: T3 Code runs the coding agents on your machine.
- Install doc: Set up the machine where the agents will work first.
- ACP doc: Registry agents always run on the machine that hosts your T3 Code server. That stays true when you connect through app.t3.codes, T3 Connect, or a relay.
- FAQ: Your agents run wherever T3 Code runs: your desktop, a server, a VPS.

So the statement "the agent runs on your own machine" holds. Three additions, so you do not take it too far:

1. **"Your machine" can be your laptop or a VPS you rent.** In the official docs this page checked, there is no option for T3 to host the machine for you.
2. **The agent process is local; the model is still in each vendor's cloud.** The FAQ says: "Your code and prompts go from your machine to your provider (Anthropic, OpenAI, etc.), not to us."
3. **T3 itself operates three things**: the T3 Connect relay, the product usage data endpoint `ingest.t3.codes`, and the web app at app.t3.codes. The web app is only a client: the connection list is stored in your browser, and it connects to your server directly and proxies no traffic.

## 3. Core concepts

The terms below appear again and again in the interface and the official docs. Go through the table first, then read each one in turn.

### Glossary

| Term | One-sentence explanation | Why it is needed |
|---|---|---|
| **Environment** | A machine running a T3 Code server, together with its login credentials, files and state | You may have several machines, and every action has to land on one of them |
| **Server** | T3 Code's background process; it starts and manages agent processes, terminals and Git for you | The interface is only a remote control; this is what actually schedules the work |
| **Project** | A working directory inside an environment, usually a code repository | The agent has to know which folder to work in |
| **Thread** | One ongoing conversation, together with the whole work record it produces | One per task; the record is still there after the agent process exits |
| **Turn** | From the moment you send a message until the agent finishes that round | Changes and checkpoints are both recorded per turn |
| **provider** | The agent runtime that T3 Code controls, such as Codex or Claude Code | T3 Code ships no model; the provider does the work |
| **provider instance** | One configured provider; the same kind of agent can be configured several times | Keeps the work account and the personal account apart |
| **Permission mode** | Rules on whether the agent has to ask you before it acts | This is your main brake on the agent |
| **worktree** | A separate checked-out directory in Git, which lets a thread change code in its own branch and directory | Parallel tasks never step on each other's files |
| **Checkpoint** | A saved snapshot of the working directory, stored as a hidden Git reference | You rely on it to see changes and roll back, and it does not mess up your branches |
| **ACP** | A common protocol between clients and agents | One piece of adapter code can connect many agents |
| **T3 Connect** | T3's official remote connection method; no router ports need opening | Connect back to your own computer from outside |
| **T3 home** | T3 Code's data directory, `~/.t3` by default | Threads, settings and logs all live here |

### Threads, projects and worktrees

**Thread** (one ongoing conversation, together with the whole work record it produces). Everything you say, the agent's replies, the commands it ran, the files it changed and the questions it asked you are recorded in the thread. The official glossary stresses one point: a thread "Survives provider process exits", that is, the thread is still there after the agent process exits. In practice, start one thread per independent task; a thread can be pinned, snoozed (Snooze) or archived. **Settle** is a state specific to T3 Code: it moves finished work out of the active list without deleting the conversation. Afterwards, when you, the agent or a scheduled task sends another message, it automatically returns to the active state.

**Project** (a working directory inside an environment, usually a code repository). A thread can belong to a project or have no project; without one, it uses its own folder under `~/.t3/scratch`. **worktree** (a Git feature: the same repository is checked out again into a separate directory, each on its own branch). Choose **New worktree** when starting a new thread, and the thread gets its own branch and working directory. Threads in the same checkout share the same branch; the official docs state that while one of them is working, T3 Code refuses to switch branches there, so parallel tasks should each open their own worktree. **Multi-repository projects**: one project can cover several repositories. T3 Code counts every repository in the project folder (it looks one level down, then one more level into folders that are not repositories), for example `shop/api` and `shop/web`; repositories outside the folder must be added by hand, see section 8 for how. **Checkpoints** (saved snapshots of the working directory) are stored as hidden Git references, and the official docs explain that this way the working-directory snapshots never add commits to your branches.

### Server and provider: who does the work

**Server** (T3 Code's background process). According to the official architecture doc, it owns the agent processes, terminals, Git, checkpoints, persistent state and project files. The desktop app bundles a server; when you use the `t3` command line, the server runs on its own.

**provider** (the agent runtime that T3 Code controls, such as Codex or Claude Code). The README says: "T3 Code does not resell tokens. It drives the agents you are already signed in to." A **provider instance** (one configured provider) lets the same kind of agent be configured more than once, for example one each for a work account and a personal account, and each instance has its own environment variables. One boundary needs stating up front: **a T3 Code environment is not a sandbox**. SECURITY.md puts it directly: it deliberately runs agents and terminals with the permissions of your OS user. What limits what an agent can do is the permission mode and each agent's own rules, not T3 Code locking it up.

### ACP: one adapter connects many agents

**ACP** (Agent Client Protocol, a common protocol between clients and agents: the two sides agree on how to talk, so any interface can connect to any agent). The official definition is at [agentclientprotocol.com](https://agentclientprotocol.com/overview/introduction): "The Agent Client Protocol standardizes communication between code editors/IDEs and coding agents." The idea is the same as LSP (Language Server Protocol, a common protocol between editors and language servers); that page describes the trouble without a unified protocol: every interface has to write its own integration for every agent. For T3 Code, mainstream agents such as Claude and Codex each have a dedicated adapter that speaks their own native protocol; the other agents go through the generic ACP adapter. In **Settings > Providers > Add provider > Show more** you can add them from the ACP Registry or enter a local ACP command.

### Permission modes: four levels

**Permission mode** (rules on whether the agent has to ask you before it acts). This is your main brake on the agent; the four levels are listed in the table below.

| Mode (as shown in the interface) | Official definition | Which scenario fits (this site's advice) |
|---|---|---|
| **Supervised** | Commands and file changes both need your approval | First use, an unfamiliar repository, or an agent that may touch configuration and credentials |
| **Auto-accept edits** | File changes pass automatically; other actions may still need your approval | You trust it to change code but want to vet which commands it runs |
| **Auto** | Routine actions pass through the provider's own automatic review; only the remaining ones ask you | The provider supports automatic review and the task is long, and you do not want to keep tapping approve |
| **Full access** | Neither commands nor changes show an approval prompt | A one-off, isolated experiment project |

Three things you must know:

1. **The initial default for new threads is Full access.** The official text: "The initial default is **Full access**." If you change nothing, the agent by default changes files and runs commands without asking you. On first use, switch to Supervised first, as in section 7.
2. **Providers implement it differently.** **Auto** uses automatic review on Codex, Claude, Cursor, Grok, Antigravity and fx; those without the capability (OpenCode is named officially) fall back to "ask you". Muse Code and Kiro have only the two levels Supervised and Full access, and a thread set to another level runs as Supervised.
3. **The mode only governs "ask or not before acting", not "asking questions about the task itself".** The official docs state: "Permission modes do not prevent the agent from asking questions about the task."

Even with Full access on, the provider may still come to you. The official docs give Claude as the example: when its settings disable skipping permissions, or a particular action requires approval, it still asks.

### Review and triage

**Review** (seeing what the agent changed) lives in two places. One is the changes and Diff panel under each turn of the conversation; the panel's source selector has three entries: **Uncommitted**, **Changes** and **Commits**. The other is the **Pull requests** page, where you view changes, write comments and merge. **Triage** (having an agent investigate T3 Code's problems by itself): when something goes wrong with T3 Code, choose **Triage an issue** in the command palette. It opens a thread with no project, calls in your own coding agent to read the logs, look up the source code of that version and search for known issues, and helps you write a GitHub issue. The official docs stress that it asks you before it acts: "It asks before it applies a fix or posts anything."

### Remote access

**Remote access** (using a phone, a browser or another computer to connect to a T3 Code server running elsewhere). The official docs give three routes:

| Method | What you need to prepare | Characteristics |
|---|---|---|
| **T3 Connect** | A T3 Connect account | The official built-in method; no router port forwarding to configure, and it works from outside your network |
| Direct connection over a LAN or private network | The two devices reachable from each other, plus a pairing link | Passes through no T3 service; anyone on the same network can reach the port, and the pairing code is what stops them |
| Tailscale HTTPS | Both devices joined to the same tailnet | Reuses the Tailscale you already have and gives you an `https://` address |

- **Pairing** (authorizing a new device with a one-time link). After pairing, that device can keep connecting until you revoke it in **Settings > Sharing & access** on the host.
- **Relay** (the T3-hosted service behind T3 Connect). It records which machine is linked to which account and helps issue connection credentials. It does **not** forward your traffic; traffic goes through the Cloudflare tunnel (`cloudflared`) on your machine. For details, see the [source code walkthrough](./source).
- **Notifications** (phone push) exist only over T3 Connect; direct connections and Tailscale connections do not provide them.

### Secrets and portable handoff

**Secrets** (values such as API keys and tokens that must not be written into configuration in plain text) involve two things. The first is the **secret provider**: T3 Code can read credentials from 1Password and stores only a reference locally, in the form `op://vault/item/field`. The second is the **secret request card**: when the agent needs a token or password, a card appears in the thread; you enter the value and click **Save securely**, or click **Decline**, and the value never appears in the conversation.

**Portable handoff** (carrying the conversation context over when you switch provider inside the same thread), for example when a task is half done with Claude and you want Codex to continue. The official docs stress that it is not an agent-written summary but a selection of messages made within a budget: "A handoff is a budgeted selection, not an agent-written summary." It keeps the most recent questions and answers, the original request and the relevant command results first, and does not copy the previous provider's reasoning, tool-call state or attachments. The server can adjust this budget with `T3CODE_CONTEXT_HANDOFF_TOKEN_CAP`; the default is 16,000.

## 4. Harness, agent and T3 Code: who is responsible for what

Newcomers often mix up three things. According to the official blog post [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness) (2026-10-22), a **large language model** (LLM) only generates text; by itself it can neither read files nor run commands. The **harness** (the layer that turns the model into an agent that can do work: it gives the model tools, agrees on the calling format, executes on the model's behalf and hands the results back) is what actually does the work: on the surface Claude Code is a terminal interface and a desktop app, but underneath is the Anthropic Agent SDK; underneath Codex is the Codex App Server. An **agent** is the harness plus the model; as the blog puts it, "An agent is what happens when you combine a harness and an LLM."

| | Who provides the model | Who provides tools and execution | Who provides the interface, threads, approval, Git and remote access |
|---|---|---|---|
| Claude Code | Anthropic | Claude Code's own harness | Claude Code itself |
| Codex | OpenAI | Codex App Server | Codex's own interface |
| **T3 Code plus Claude Code** | Anthropic | Claude Code's own harness | **T3 Code** |

The FAQ answers bluntly: "Is T3 Code a harness? No. ... T3 Code uses those harnesses. It is not a harness, and it does not work without one." The blog's analogy: the chef is the model, the kitchen is the harness, and T3 Code is the restaurant that lets you bring your own kitchen. This has two practical consequences. First, **quota questions are the quota questions of each agent**: you run within the quota of whichever vendor you pay. Second, **the agent's behavior is decided mainly by the provider**: whether the code is good and whether it touches files carelessly depends on the agent itself; what T3 Code manages is putting them in one interface and gating approvals for you.

T3 Code also hands the agent a "recipe book" in the other direction: it ships an MCP server that exposes a set of T3 tools, for example letting a thread that uses Claude dispatch a subtask to Codex. The FAQ says this is optional; unless you say so, the agent will not use it on its own.

## 5. How it works

Read on with one question in mind: **between typing a sentence in the interface and the agent actually starting work, what sits in between?** The core of T3 Code is "record first, work afterwards". After the server receives your action it does not call the agent directly; it works in three steps:

1. **The Orchestrator** (the code that decides "what happened") works out two things from the current state: the events to record and the effects to run afterwards. It only makes decisions and does no input or output.
2. **The EventSink** (the step that writes to the database) writes the events, the projections (the current state shown to the interface), the command receipt and the pending effects into the database together in one database transaction, and notifies subscribers only after the commit. So your message is already written into the thread record before the agent has started.
3. **The EffectWorker** (the step that runs the effects) acts only after the commit, for example "start a provider turn", and sends the result back to the Orchestrator as a new command.

Without this design: if the agent process crashes or the server restarts, you have no way to know which step was half done. With it, the intent of every step is already stored, and after a restart work can continue. The official architecture doc says: "A command acknowledgement therefore means intent committed, not that provider, checkpoint, or follow-up work finished."

<DocDiagram src="/diagrams/t3code-thread-lifecycle.en.svg" alt="This sequence diagram answers two questions in numbered order: after you send a message in the interface, which stages does it pass through before it becomes one agent turn, and when the agent asks for permission, how does that request reach you and how does your decision get back to it? The diagram has six columns. The first is you: the desktop, web, or mobile client. The next three belong to the T3 Code server: the Orchestrator only decides events and effects and does no input or output; the EventSink writes to the database; the EffectWorker runs effects after commit. The fifth column is the Provider adapter, which translates T3 Code's operations and events into each agent's protocol. The sixth is the external agent process, for example the Claude Code or Codex command-line process. Solid lines are commands or calls; dashed lines are events, notices, and returns. Step 1: you send a command over authenticated RPC. Step 2: the Orchestrator decides the events plus one effect, which starts a provider turn. Step 3: the EventSink writes the events, projections, command receipt, and pending effect in one database transaction. Only after commit are subscribers told, which is when your message appears in the client. Step 4: the EffectWorker picks up the effect after commit and calls the Provider adapter. Step 5: the adapter calls startTurn on the external agent process with the policy for the permission mode, and the agent starts. Step 6: the agent process emits events; the adapter translates them into unified events, which go back to the Orchestrator as commands, are stored, and are pushed to the client as text deltas and tool calls. Step 7: when the agent process requests permission, the adapter first checks the permission mode: allow or deny is answered at once; only ask creates a pending request, called a runtime_request, which appears in the thread. Step 8: you approve or reject, and the client sends a response command; the Orchestrator marks the request resolved and stores it; the EffectWorker calls the adapter's respondToRuntimeRequest, the decision goes back to the agent process, and the agent continues. Three relationships to remember: the interface never talks to the agent directly, and every client reaches the server over authenticated RPC; each provider's differences stay behind the adapter, and the Orchestrator and the interface read only the capabilities the adapter declares; approvals and messages share one channel, both are stored before they are delivered, so approving on the phone and approving on the computer is the same flow. This diagram leaves out the concrete interface and buttons, the internal steps of model inference, and the T3 Connect relay, which is not on the path of business data. T3 Code does not run a model itself." :width="1020" lang="en" />

> **What the diagram is based on:** The events and database writes in steps 2, 3 and 6 were checked against the source in [`Orchestrator.ts` L8383–L8451](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/Orchestrator.ts#L8383-L8451), [`EventSink.ts` L846–L873](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EventSink.ts#L846-L873) and [`EffectWorker.ts` L239–L249](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/EffectWorker.ts#L239-L249); the permission decision in step 7 against the ACP adapter [`adapter.ts` L7513–L7611](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/packages/provider-acp/src/server/adapter.ts#L7513-L7611); the request resolution in step 8 against [`RuntimeRequestService.ts` L78–L124](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/apps/server/src/orchestration-v2/RuntimeRequestService.ts#L78-L124). All line numbers are from commit `d00aaac8`. The diagram keeps the six objects, the order and direction of the eight steps, and the difference between solid lines (commands or calls) and dashed lines (events, notices and returns); it leaves out the concrete interface and buttons, the internal steps of model inference, and the T3 Connect relay, which only helps with environment linking and credential issuing and is not on the path of business data. T3 Code does not run a model itself; the model sits on the side of the external agent process.

Three relationships in the diagram are worth remembering. First, **the interface never touches the agent directly**: desktop, web and phone are only clients, connected to the server over authenticated RPC; the official architecture doc notes that although the desktop app bundles a server, its interface keeps the same boundary. Second, **provider differences stay behind the adapter**: the Orchestrator and the interface read only "which capabilities this provider supports" and never the provider's name. So when you swap in another agent, only the adapter column changes; the Orchestrator and the interface do not need to change with it. Third, **approvals and messages share one channel**: an agent's permission request is an event, your approval or rejection is a command, and both are stored before they are delivered, so tapping approve on the phone and tapping approve on the computer go through the same flow.

## 6. Install: put T3 Code on the machine and let it recognize your agents

The three install forms can coexist. The **desktop app** bundles a server and suits first-time users; the **`t3` command line** suits putting T3 Code on a server or VPS and connecting from a browser or phone the rest of the time; the **mobile app** is only a remote control and is not used on its own. The desktop app also carries the `t3` command; a new install configures it on first launch, and if it is not configured, click **Install** next to **t3 command** in **Settings > About**.

### Install the desktop app

The versions given by the [download page](https://t3.codes/download) (as of 2026-11-24) and the official Install doc:

| System | Download | Package manager |
|---|---|---|
| macOS (Apple Silicon) | `.dmg` (arm64) | `brew install --cask t3-code` |
| macOS (Intel) | The x64 build offered separately on the page | Same as above |
| Windows 10, 11 | `.exe` | `winget install T3Tools.T3Code` or `scoop install extras/t3code` |
| Debian, Ubuntu | `.deb` | `sudo apt install ./T3-Code-*.deb` |
| Linux (x86_64, arm64) | `.AppImage` | None; download and run by hand |
| Arch Linux | None | `yay -S t3code-bin` |
| Nix | None | `nix profile add github:NixOS/nixpkgs/nixos-unstable#t3code` |

Note for Intel Macs: the official docs state that no `t3` executable is provided for Intel Macs; the desktop app works. On Linux, confirm the architecture with `uname -m`: for `x86_64` choose `x86_64.AppImage` or `amd64.deb`, and for `aarch64` choose `arm64.AppImage` or `arm64.deb`. An AppImage needs the execute permission before it runs; replace the file name with the one you actually downloaded:

```bash
chmod +x ./T3-Code.AppImage
./T3-Code.AppImage
```

The first time you open it, a Welcome page appears. Do not rush to click **Start**; read "Let it recognize your agents" below first. On the interface language: the repository has a `zh.json` translation directory for each of the web, mobile and desktop apps; how far the translation reaches and where to switch languages were not verified for this page.

### Use the command line only

On macOS and Linux use `curl -fsSL https://t3.codes/install.sh | sh`; in PowerShell on Windows use the line below. It installs the `t3` command into `~/.local/bin`:

```powershell
irm https://t3.codes/install.ps1 | iex
```

The official notes: when that directory is not on the `PATH`, the installer warns you and prints a command to add the path for zsh, bash on Linux and fish. Running `t3` starts the server and opens the web app; `t3 serve` starts only the server and opens no browser; `t3 service install` installs it as a background service; `t3 update` upgrades to the latest version; for the full reference see `t3 help` or `t3 --help`. To try it once without installing, run `npx t3@latest` (Node.js is needed to provide `npx`). Handing a script from the internet straight to the shell is inherent in this install method; if that worries you, use a package manager instead, or download the script first, read it and then run it.

### Let it recognize your agents

The precondition is that **the agent must be installed on the machine that runs the T3 Code server, and signed in on that machine**, not on the phone you use as a remote control. For Claude Code, run `claude auth login`; for Codex, run `codex login`. The sign-in methods for the other agents are copied from the Providers table of the official Install doc: Cursor is `agent login`, Grok Build is `grok login`, Kiro is `kiro-cli login`, OpenCode is `opencode auth login`, Muse Code is `muse login`, fx is `fx login`, and Pi is `/login` typed inside `pi`. Antigravity, and Codex's other route, **Connect with ChatGPT**, are installed by T3 Code for you.

Then open **Settings > Providers**, select the environment and enable the providers you want to use.

- **What you will see**: the provider's card and its status. When T3 Code finds that a version is incompatible with your T3 Code, it shows a warning and a suggested version range on the card.
- **Why**: apart from the two install-for-you routes above, T3 Code does not install or sign in for you; it only detects and enables.
- **When the command is not found**: the provider's command line must be on the `PATH` of that machine; if it cannot be found, enter **Binary path** in the provider settings. The official FAQ says this pit is mostly here, and it is especially common when a version manager is in use.

The Welcome page lists the agents it found on this computer, with the ready ones on top. When it finds none, it opens **Set up an agent** automatically; for Claude Code, clicking **Install** or **Sign in** opens a terminal and prepares the command for you to run. **Start** waits until at least one agent is ready.

### (Optional) Install the mobile app

On iPhone and iPad use the version on the [App Store](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824); the store page states iOS 18.0 or later as the requirement. On Android use the version on [Google Play](https://play.google.com/store/apps/details?id=com.t3tools.t3code). The mobile app is a remote control that connects to a server elsewhere; for the connection steps see section 8, subsection 2.

## 7. Get the first thing working in 10 minutes

Goal: in a throwaway practice repository, have the agent create a new file. Reject it once before it acts and allow it once, then look at what it changed.

### Step 1: Prepare a practice directory

```bash
mkdir t3-demo && cd t3-demo && git init
```

Use a throwaway directory; if anything goes wrong, delete the whole thing.

### Step 2: Open it and start a new thread

If the desktop app is installed, run `t3 app` in this directory. T3 Code adds the current directory as a project and opens a new thread directly. This is the official "open a project from the terminal" method, and it requires the desktop app to be already running on the same machine. You can also drag the folder onto the sidebar and click **New thread**. When using only the web app, click **Add project**, because the browser cannot get local folder paths.

### Step 3: Switch the permission to Supervised first

A new thread shows its mode under the input box. Open the model selector, scroll to the bottom and click **Permissions**, or press `mod+shift+a`, then choose **Supervised**; the mode then shows next to the model. `mod` is how the official docs write the modifier key; elsewhere they state that it is Cmd on macOS and Ctrl on Windows and Linux. Do this because the initial default is Full access, and without the change you will not see the approval step.

### Step 4: Send a small task

```text
Create hello.md in the project root and write a one-line heading "Hello from T3 Code". Do not touch any other files.
```

Your message appears in the thread, and the agent's work record starts to appear below it. The task is small and its scope is clear, so any deviation is obvious at a glance.

### Step 5: Reject once, then allow

When the agent wants to change a file, an approval request appears in the conversation. The wording of the options comes from the agent itself; an example the official docs give is Grok's **Allow all edits this session**. Choose the reject option first, then send a message telling it to try again, and choose allow this time. After you reject, the decision is sent back to the agent, and what it does next is decided by the agent itself. This is the thing to experience first with T3 Code: whether the brake works matters more than how fast the agent writes.

### Step 6: See what it changed

Expand the tool calls in the conversation to see the full commands and output. Then open the Diff panel and choose **Uncommitted** in the source selector to see the files added or changed in this turn and their diffs. The official docs note that each turn's change list shows only that turn's own work.

### Step 7: (Optional) Commit

The thread's Git panel can commit, push and create pull requests. The practice directory has no remote repository, so this page stops here; for how the source code gets to this step, see the [source code walkthrough](./source). Once you have run it, notice one thing: you never opened Claude Code's or Codex's own interface.

## 8. Day-to-day use

### 1. How to choose a permission mode

Change the default under **Settings > Threads > New threads > Permissions**. A project can override the environment's default; threads that are already open, and the mode you have already picked in a draft, are not affected. For a temporary switch, press `mod+shift+a`. The last two columns of the table below are this site's advice; the official docs only define how each mode behaves.

| My situation | Use | Do not use |
|---|---|---|
| First run, unfamiliar repository | Supervised | Full access |
| Day-to-day development; you trust it to change code but want to vet commands | Auto-accept edits | Full access |
| Long task, and the provider supports automatic review | Auto | None |
| A throwaway experiment directory, a worktree you can delete at any time | Full access | Turning on Full access in a directory that holds SSH private keys and `.env` |

To set a ceiling for a whole machine, use the managed policy in section 11.

### 2. Continue from your phone after leaving the computer

When the host uses the desktop app: open **Settings > Sharing & access**, sign in, and turn on **T3 Connect** for this environment. Also turn on **Require approval for new devices**; from then on, the first connection of a new device has to be approved by an already connected device. Do not close the desktop app's last window; the official docs state that this stops the local server. To keep it online, use the background service from subsection 7 of this section.

When the host uses the command line:

```bash
t3 up
```

It asks how other devices should connect (T3 Connect, the local network, or both) and then installs T3 Code as a background service. To change the choice, run `t3 up` again; to see the current settings, use `t3 status`.

Install the app on the phone, sign in to the **same** T3 Connect account and select this machine. Then turn on **Device Notifications** under **Settings > Notifications**; **Publish agent activity** under **Settings > Sharing & access** on the host must be on. The phone receives an alert when the agent finishes, fails, needs approval or asks a question; tapping it takes you straight to that thread.

- **The phone is a remote control.** The computer must be on and connected. The FAQ says: "The phone is a remote. Your computer does the work and needs to stay on."
- **Push notifications exist only over T3 Connect.** Direct connections and Tailscale connections do not provide them.
- **Publish agent activity has a cost.** It sends project and thread titles, model names and activity status to the T3 Connect relay; see section 11.
- **The number of machines is limited.** Each T3 Connect account can link at most 3 machines; phones and browsers do not count. After linking a paid T3 Chat account, Pro raises it to 10 machines and Premier to 100 (official FAQ as of 2026-11-24).

The new device shows a code in the form `K7QM-2XFD`; check it on a connected device and approve it. On a host with no interface, use the commands; one request expires after 10 minutes:

```bash
t3 auth connect-device list
t3 auth connect-device approve K7QM-2XFD
```

You can skip T3 Connect: for a direct LAN connection use `t3 up --lan` or `t3 pair`, for Tailscale HTTPS use `t3 serve --tailscale-serve`, and the desktop app can also add SSH environments. The steps are all in the official Remote access doc, and this page does not repeat them.

### 3. Run tasks in parallel: worktrees and multi-repository projects

- Choose **New worktree** when starting a new thread, and the thread gets its own branch and working directory. New branch names carry the `t3/` prefix by default, which can be changed under **Settings > Worktrees > Worktree branch naming**; worktrees live in the `worktrees` folder of T3 home by default.
- When disk space runs low, turn on automatic cleanup under **Settings > Worktrees > Cleanup**, or click **Delete now** to clean up once right away.
- A multi-repository project automatically covers all repositories in the project folder. For repositories outside the folder, click **Add folder** under **Settings > Projects > Repositories**, or add them from a script:

```bash
t3 project add <path> --track <folder>
```

One project covers at most 128 folders.

### 4. Terminal

You can open a terminal inside a thread to run a dev server or tests, and the agent can use it too. Three official notes:

- **Change the shell**: set `T3CODE_TERMINAL_SHELL` in the environment that starts the T3 Code server. To use Git Bash on Windows, run the line below in PowerShell, then quit T3 Code completely, reopen it from the Start menu and create a new terminal.

```powershell
[Environment]::SetEnvironmentVariable('T3CODE_TERMINAL_SHELL', 'C:\Program Files\Git\bin\bash.exe', 'User')
```

- **Scrollback**: each terminal keeps at most 5,000 lines and 8 MiB of output on the server.
- **Remote dev server**: when the environment is on another machine, the `localhost` ports on it can be forwarded to the computer in front of you. The desktop app offers a forwarding button for each server in the thread's **Servers** list.

### 5. The project settings file `t3.json`

The file is named `t3.json` and lives in the **project folder**. The official docs state that only this one, under the project folder, is read: "Only the project folder's `t3.json` is read." The keys that appear verbatim in the user docs:

| Key | What it does |
|---|---|
| `ignoreRepositories` | Excludes one repository in the project folder from the project |
| `create` and `remove` of `worktreeLayout` | Create and remove the thread's working directory with your own commands |
| `worktreeSubmodules` | How submodules are initialized in a new worktree |
| `worktreeSparsePatternsPath` | Points to a sparse-checkout rule file, so that large repositories check out only matching files |
| `stopOnSettle` and `runOnSettle` on a script | Stop this script when the thread settles, or run it in the thread's worktree |

T3 Code's own repository has a real example. Below is an excerpt (the original file also has a second script); it shows `$schema`, the project icon path `iconPath`, and a set of `scripts` you can run by clicking in the interface:

```json
{
  "$schema": "https://t3.codes/schema/t3.json",
  "iconPath": "assets/dev/blueprint-web-apple-touch-180.png",
  "scripts": [
    {
      "name": "Dev",
      "command": "vp run dev",
      "icon": "play",
      "stopOnSettle": true
    }
  ]
}
```

Precedence: for settings that a repository can declare in `t3.json` (for example which workspace a new thread uses), values are resolved in the order "project override, environment settings, `t3.json`, built-in defaults"; leaving **Inherit** in the interface hands the decision to the next layer.

<!-- TODO: needs verification — the complete list of fields in t3.json. docs/user mentions only the keys in the table above; the repository's own t3.json references the schema address https://t3.codes/schema/t3.json, which this page did not open, so "what can be written" is not exhaustive -->

### 6. Manage secrets

The secret provider is a preview feature, and the official docs say it is not in every build. How to do it: on the machine that runs the server, install the 1Password command-line tool `op` and sign in; on a remote or headless server, switch to a service account or Connect server instead, because the desktop-style sign-in needs someone at the machine to click confirm. Open **Settings > Secrets**, click **Add provider**, and enter a name and your 1Password account. In the source selector next to a credential field, replace **Value** with your secret provider and enter the reference `op://vault/item/field`. The secret request card, by contrast, is in every build: when the agent asks for a secret, a card appears in the thread; enter the value and click **Save securely**, or click **Decline**. The official docs say the value does not appear in the conversation, and for most requests even the agent does not get it; T3 Code hands it straight to the tool that needs it.

### 7. Background service and start on boot

Install `t3` first, then run the following on the machine that acts as the host:

| To do this | Command |
|---|---|
| Install and start | `t3 service install` |
| See the status and log location | `t3 service status` |
| Restart | `t3 service restart` |
| Stop and cancel start on boot | `t3 service uninstall` |

"Start on boot" means different things in the three systems. Linux needs a systemd user service; it starts at boot and keeps running after logout, and if it cannot be installed, follow the prompt to have an administrator enable lingering. On macOS it starts at login and stops at logout, so stay logged in and do not sleep. On Windows it also starts at login and stops at logout, so lock the screen instead of logging out, and keep the machine awake. Write custom environment variables in `~/.t3/service.env`, one `KEY=VALUE` per line, and run `t3 service restart` after changing them; if it contains credentials, run `chmod 600 ~/.t3/service.env`.

### 8. Turn off telemetry

T3 Code sends product usage events by default. First look at what it sends (official Product usage data doc):

| Sent | Not sent |
|---|---|
| provider, model, reasoning effort, permission mode, the result and duration of each turn, release channel, token count | prompts, model replies, file contents, auth tokens, conversation IDs, raw provider events |

The receiver is T3 Code's own endpoint `ingest.t3.codes`, and the identifier is a hashed account or installation ID. Several other kinds of data flow are separate, and turning off telemetry does not affect them; see section 11.

| Where | How to turn it off |
|---|---|
| Server and desktop app | Set `T3CODE_TELEMETRY_ENABLED=false` in the environment that starts it. The desktop app on macOS and Linux reads it from shell configuration files (such as `~/.zshrc`); write it there and restart the app. On Windows set it as a user environment variable |
| Background service | Write it into `~/.t3/service.env`, then run `t3 service restart` |
| Crash reports from the phone | Turn off **Send crash reports** under **Settings > About T3 Code > Diagnostics** |
| Turn it off for a whole machine | Write `"telemetry": false` in the managed policy |

Two places cannot be turned off, and the official docs say so: the web app in the browser does not read these environment variables, and when its build includes tracking it sends its own connection tracking, and there is no switch for it; the mobile app's connection tracking is also not controlled by the server setting or the managed policy.

## 9. Real-world use cases

| Scenario | How to do it |
|---|---|
| The same React upgrade task, with two agents each doing a version | Start a new thread in a Git project, **Shift-click** two models in the model selector, choose the base branch and send. The official docs say each selected model opens its own thread and creates its own worktree, while you stay in the new-thread input box. When they finish, compare the two in the Diff panel |
| You have to commute in the middle of a fix | Before leaving, confirm that T3 Connect is on, on the host, or that it has been installed as a background service with `t3 up`. On the way, the agent wants to delete a file; the phone gets an alert, and tapping it opens the approval request of that thread. At the office, open [app.t3.codes](https://app.t3.codes), sign in to the same account and continue the same thread |
| Frontend and backend in two repositories | Add the whole `shop` folder as a project. T3 Code automatically covers `shop/api` and `shop/web` inside it, and one thread can read and change both. Each turn's changes are grouped by repository, and a commit or push works on one repository at a time |

A fourth scenario is wiring T3 Code into scripts. On the host you can start threads and send messages directly from the command line (copied from the official Outside agents doc):

```sh
id=$(t3 thread start . "Find why the tests are slow")
t3 thread send "$id" "Now fix it" --wait
t3 thread show "$id"
t3 thread list
```

`.` means the project that the current folder belongs to. `--wait` prints the agent's reply and exits with code 1 when the run fails or is stopped, and with code 2 when the agent is waiting for your answer. The TypeScript below wraps it for Node.js and branches on the exit codes as the official docs define them. This site wrote it; it was not actually run when it was written, and it only wraps the commands listed officially above:

```ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

/** Send a message to a thread and wait for the agent's reply. For the meaning of the exit codes, see the official Outside agents doc. */
async function sendAndWait(threadId: string, message: string): Promise<string> {
  try {
    const { stdout } = await run("t3", ["thread", "send", threadId, message, "--wait"]);
    return stdout;
  } catch (error) {
    const code = Number((error as NodeJS.ErrnoException).code);
    if (code === 2) throw new Error("The agent is waiting for your answer. Reply to this thread in the T3 Code app.", { cause: error });
    if (code === 1) throw new Error("This run failed or was stopped", { cause: error });
    throw error; // For example the t3 command was not found (code is ENOENT); rethrow as is
  }
}
```

## 10. Pricing, quotas and limits

The official FAQ as of 2026-11-24: T3 Code **is free itself**; the original text is "Nothing. There's no way to pay us to use T3 Code". **You keep paying the provider you use for model costs**; T3 Code does not resell tokens. **T3 Connect is free for now**; the original text adds for now, and the same paragraph says the policy may change if the billing pressure gets too high. The **machine limit** is 3 per account, 10 after linking T3 Chat Pro and 100 after Premier. It also **does not support local models**.

<!-- TODO: needs verification — the prices of T3 Chat Pro and Premier. T3 Code's FAQ gives only the machine limits, not the prices; the repository's docs/user/faq.md and docs/user/remote-access.md were checked, and T3 Chat's pricing page was not opened. For prices, defer to T3 Chat's official source -->

Other limits (official docs):

| Item | Limit |
|---|---|
| Length of one message | At most 120,000 characters |
| Attachments on one message | At most 100 files; images at most 10 MiB each |
| Usage history on the Usage page | The server keeps it for 92 days by default |
| Portable handoff budget | 16,000 tokens by default; adjustable from 1,024 to 64,000 |

To see how much quota each account has left, open the **Usage** page. The official docs caution that the cost there is estimated from API prices and is not your subscription bill. On account bans, the official FAQ says T3 Code is within the terms of service of Claude Code, Codex and Google Antigravity; the same FAQ also advises you not to use it to stockpile accounts: a work account plus a personal account, two in all, is fine, and it does not consider batches of accounts a proper use.

## 11. Security and privacy essentials

| Mechanism | What risk it means | How to turn it off or tighten it |
|---|---|---|
| Default permission Full access | By default the agent in a new thread changes files and runs commands without asking | Change the default under **Settings > Threads > New threads > Permissions**; do it first thing after installing |
| The environment is not a sandbox | Agents and terminals run with the permissions of your system user | Use Supervised; put tasks in worktrees; combine with each agent's own rules |
| T3 Connect account | By default any device signed in to your account can open the linked machines | Turn on **Require approval for new devices**; review and revoke regularly under **Settings > Sharing & access** |
| Pairing link | The official docs require treating it like a password | Use a new link for each device; never put it in screenshots, logs or error reports |
| Guest link | Someone without an account can see the content of one thread | Off by default; when finished, click **Stop sharing** |
| Telemetry | provider, model, token count, permission mode and the like are sent to `ingest.t3.codes` | `T3CODE_TELEMETRY_ENABLED=false`; see section 8 for how |
| Publish agent activity | Thread and project titles and model names are sent to the T3 Connect relay | Turn it off, at the cost of phone push notifications |
| Managed policy | An administrator can set defaults, locks and ceilings for a whole machine | See below |

### Guest links: people without an account can view one thread

Guest links are a beta feature, off by default. Turning it on requires two conditions: enable it under **Settings > Labs > Guest links**, and the machine must already be linked to T3 Connect and stay online, because the link points to its T3 Connect address. How to use it: right-click a thread in the sidebar, choose **Share with guest**, and send the link to **one person**. It works in only one browser and expires after 24 hours. A message the other person sends is not executed directly; it shows as **Request** in the sidebar, and only after you look at it and click **Send** does it run as a normal turn. If you do not want it, click **Dismiss**. To withdraw immediately, choose **Stop sharing**; archiving the thread, creating a new link, or unlinking the machine from T3 Connect also ends it.

The other person can see the thread's recent history and everything after that, including messages and files, the agent's replies, reasoning, plans, questions and work process; expanding a command shows its output. They cannot see diffs and cannot operate the thread for you. The official docs give one warning to follow: "Anything the agent read or printed can show, such as a value from a file." Anything the agent has read or printed may be shown to the guest, so share only threads you do not mind being seen. What the other person sends runs with the thread's current permission mode, so read it before clicking **Send**, as you would with anything pasted in from a chat.

### Managed policy: set the rules for a whole machine

A managed policy lets an administrator configure T3 Code for every user on a machine. The server reads the policy **at startup** and enforces it on every client that connects, whether desktop app, browser or phone. The example from the official docs:

```json
{
  "schemaVersion": 1,
  "organization": "Example Corp",
  "supportUrl": "https://it.example.com/t3",
  "settings": {
    "defaultRuntimeMode": { "value": "approval-required", "locked": false },
    "enableAgentBrowserAccess": { "value": false, "locked": true }
  },
  "limits": {
    "maxRuntimeMode": "auto-accept-edits",
    "clients": ["desktop", "local-browser"],
    "telemetry": false
  }
}
```

`settings` sets defaults and locks; `limits` sets ceilings. This example means: the default permission mode is Supervised (`approval-required`); no thread can go wider than Auto-accept edits (`maxRuntimeMode`); only the desktop app and the local browser may connect (`clients` has no `remote`); telemetry is off. A setting with `locked: true` can be changed by neither the user nor the agent. The workflow: write the JSON, run `t3 policy check policy.json` to check it, deploy it with your device management tool to the location the official docs specify (for the paths on the three systems, see the official Managed policy doc), restart T3 Code, then use `t3 policy show` to confirm that this is the one the server loaded.

What it cannot reach is also stated in the official docs. **The policy only constrains T3 Code's own behavior**: agents go through each provider's own command line and read their own configuration (for example `~/.claude`), so users can still run them outside T3 Code, and limiting those command lines takes each of their own managed configurations. **`maxRuntimeMode` is not a sandbox**: it decides which mode T3 Code asks the provider to use and is not responsible for confining the agent. In addition, when a machine has both a configuration profile (or group policy) and a policy file, T3 Code refuses to start until you delete one of them.

## 12. Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| My agent does not appear in **Settings > Providers** | The agent's command line is not installed, or is not on the `PATH` of the machine running the server (not the phone) | Sign in on that machine first, for example `codex login`; if it still fails, enter **Binary path** in the provider settings |
| The agent in a new thread changes files without asking me | The initial default for new threads is Full access | Change the default, or switch each thread to Supervised by hand |
| The thread is set to Auto but behaves like Supervised | The provider does not have this level; the official rule is to fall back to Supervised | Switch to a provider that supports it, or accept that it runs as Supervised |
| The phone cannot connect after I close the window on the computer | Closing the desktop app's last window stops the local server | Install it as a background service with `t3 up`, or do not close the last window |
| Push notifications do not arrive on the phone | Push works only under T3 Connect; Publish agent activity is off on the host; Device Notifications is off on the phone | Check all three; Android needs 7.0 or later and Google Play services |
| T3 Connect keeps dropping | One of the four legs is broken: this device, T3 Connect, the host tunnel, T3 Code on the host | Select this machine under **Settings > Environments** and click **Details**; the first leg marked failed is the cause. On the host, run `t3 connect status` |
| The host is online but T3 Connect says the tunnel is offline | The host network blocks outbound port 7844 (TCP and UDP), common with a Tailscale exit node, a company VPN or a strict firewall | Allow 7844, or add the host's Tailscale address as a direct route |
| The disk suddenly fills up | One worktree per thread, and they pile up | Turn on automatic cleanup under **Settings > Worktrees > Cleanup** |
| Claude's 5-hour quota drains faster than using Claude Code directly | A problem in old versions; the official side says the rate has been the same since v0.1.7 | Upgrade T3 Code on the machine that runs the agent |
| Timeout while checking Codex status | Not enough time for the check | Set `T3CODE_CODEX_PROBE_TIMEOUT_MS=60000` in the environment that starts the server, then restart |
| A background service installed over SSH stops as soon as you disconnect | lingering is not enabled on Linux | Follow the prompt to run `sudo loginctl enable-linger "$(id -un)"`, then retry as a normal user |
| The browser tab does not start on Linux | Ubuntu 23.10 and later block the browser sandbox | Run `sudo t3 browser setup` on the host |

## 13. Troubleshooting

Check in order; if an earlier step has not passed, there is no need to look at the next one:

| Symptom | What to check first | How to fix |
|---|---|---|
| No agent can be used | Whether there is a ready provider in **Settings > Providers** | Go back to section 6 and install and sign in on that machine |
| Cannot connect to your own server | `t3 service status` (background service) or `t3 status` (remote settings) | Read the logs at the path it prints; by default the logs are in `~/.t3/userdata/logs` |
| T3 Connect cannot connect | `t3 connect status` on the host | It points out the cause on the host side, item by item matching the official T3 Connect troubleshooting doc |
| The database takes too much space | `t3 doctor`; add `--dry-run` to report only and change nothing | After confirming, run it without `--dry-run`; the server is offline during the repair |
| The app itself is broken | **Triage an issue** in the command palette | When the app will not start, run `npx t3 triage` in a terminal |
| Running `t3` says a server is already running | There is already one on this machine | Pair to that server with the `t3 pair` command it prints; to start another one, use a different `--base-dir` |
| Still not solved | Whether the Issues of the [GitHub repository](https://github.com/pingdotgg/t3code) have the same report | If not, file one, with the text from **Copy diagnostics** and the output of `t3 connect status` |

When reporting, do not paste pairing links or authorization codes; the official docs require treating them as passwords.

## 14. Next steps

1. **Change the default permission.** This is the first thing to do after installing.
2. **Keep the host always online.** Install it as a background service with `t3 up`, and verify once on the phone that notifications arrive.
3. **Try parallelism once.** Run two worktree threads at the same time, then try Shift-clicking several models.
4. **Bring in a real project.** For adding multi-repository projects and `t3.json`, see section 8.
5. **To know how it works inside**, read the [source code walkthrough](./source).
6. **To improve the agent's own performance**, go back to the [Claude Code](../claude/) and [Codex](../codex/) tutorials.

## 15. Further reading

The official docs are under the repository's `docs/` directory; the links below are pinned to commit `d00aaac8`. To read the latest version, replace the commit hash in the URL with `main`.

- [Install T3 Code](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/install.md): installation on each platform, the `t3` command, and installing and signing in to each provider.
- [Permission modes](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/permission-modes.md): the behavior of the four modes, and the differences per provider.
- [Remote access](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/remote-access.md): T3 Connect, LAN pairing, Tailscale HTTPS, SSH, permission scopes.
- [Working with threads](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/thread-sidebar.md) and [Source control](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/source-control.md): starting threads, worktrees, pinning and settling; the Diff panel, signing in to each Git host, Pull Request review.
- [Running in the background](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/background-service.md): the background service, `service.env`, differences between systems.
- [Product usage data](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/telemetry.md): where each kind of data flow goes, and its switch.
- [Guest links](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/guest-links.md) and [Managed policy](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/managed-policy.md): the full rules for sharing and control.
- [ACP providers](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/providers-acp.md) and [Workflows](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/workflows.md): adding agents from the ACP Registry; chaining agents, schedules and human approval into one resumable run with TypeScript.
- [FAQ](https://github.com/pingdotgg/t3code/blob/d00aaac85fc71195f133a8580c3f0f2e29ac33a2/docs/user/faq.md): the most common questions on cost, quotas, remote access, account bans and more.
- [What is a "harness"?](https://t3.gg/blog/post/what-is-a-harness): the official blog post on how the work is divided between the model, the harness, the agent and T3 Code.
- [Agent Client Protocol](https://agentclientprotocol.com/overview/introduction): the official introduction to ACP.

## 16. Related pages

- [Learning map](./index): the T3 Code product family, how to choose, and how to read this directory.
- [Source code walkthrough](./source): the data flow of a thread from creation to the end, the enforcement points of the permission modes, and the trust model of T3 Connect.
- [Claude Code](../claude/), [Codex](../codex/): the two agents that T3 Code drives.
- [Codex Dot](../codex/dot): the always-on agent on OpenAI's side; read it alongside this page when comparing "who keeps pushing a task forward".
- [Cindy](../cindy/): a multi-agent workspace product of the same kind; see that page for the trade-offs.
- [Tailscale](../tailscale/): a connection route other than T3 Connect, and also what `packages/tailscale` calls.
- [UU Remote](../uu-remote/): another kind of approach to "the person is not at the computer"; work out which kind you need first.
