---
title: "Cindy getting started: put Claude Code, Codex and Pi in one workspace"
description: "Cindy is an open-source AI agent app for desktop and phone. It puts three agent engines, Claude Code, Codex and Pi, in one interface, so that tasks, memory and skills follow you across computers and phones. This page walks you through installing it, running a first task in 10 minutes, and telling which data stays on your machine and which is sent out."
domain: product
tags:
  - multi-agent
  - coding-agent
  - device-link
  - open-source
role: tutorial
pageClass: wide-figures readable-tables
---

# Cindy getting started: install it and run a first task

> **The short version:** Cindy is an open-source AI agent app for desktop and phone (slogan "Consider it done.").
> It does not replace Claude Code or Codex for you. It puts these agent engines in one interface, and lets the same tasks, memory and skills follow you across computers and phones.
> This page walks you through installing it from scratch, running a first task within 10 minutes, and understanding which data stays on your machine and which is sent out.

## Audience, prerequisites and non-goals

- **Who**: people who write frontend code, have used a command line, and already use or plan to use coding agents such as Claude Code and Codex. It is fine if you have never touched Cindy or heard terms such as harness and device link; this page explains each one the first time it appears.
- **Prerequisites**: a macOS, Windows or Linux computer; one source of models (an existing subscription, your own API key, a local model, or Cindy's official model service after signing in — pick one of the four). A phone is optional.
- **Non-goals**:
  - It does not teach how to use Claude Code, Codex or Pi themselves. Cindy only puts them inside; for usage see [Claude](../claude/), [Codex](../codex/) and [Pi](../pi-coding-agent).
  - It does not teach self-hosting a backend. The repository README states that the backend is "Not in this repo"; by default the client connects to the official cloud service.
  - It does not teach building from source or reading the source; that is the job of the [source code walkthrough](./source).
  - It does not cover the Team and Enterprise editions. The official home page says "coming soon" and "contact us"; individuals have no use for them.

## What you will be able to do

1. Explain in three sentences what problem Cindy solves, and what it does **not** do for you.
2. Install Cindy on the computer, make your own choice between "Sign in" and "Skip Sign-In", and know the difference between the two.
3. Run a first task with the subscription or API key you already have, and use a script to check exactly which files it changed.
4. Connect a second computer and a phone, view tasks on the phone, and take over the computer's desktop when necessary.
5. Hand over repetitive work with memory, Skills, companions, automations and chat channels.
6. Name which statistics are sent out by default, how to turn them off, and which one cannot be turned off.

## Prerequisites and environment requirements

### Pick the right edition and platform

Cindy comes in a **Mainland China edition** and an **international edition**: two account systems and two official sites. Decide before you install.

| Item | Mainland China edition | International edition |
|---|---|---|
| Official site and download page | [cindy.cn](https://cindy.cn) · [Download](https://cindy.cn/download) | [cindy.app](https://cindy.app) · [Download](https://cindy.app/download) |
| Sign-in methods | Phone number, WeChat (see item 1 of Section II of the [privacy policy](https://cindy.cn/privacy)) | Email, Apple, Google (see item 1 of Section II of the [privacy policy](https://cindy.app/privacy)) |
| Operator | 心动网络股份有限公司 (Chinese legal name) | XD Entertainment Pte. Ltd. (Singapore) |

The system requirements for each platform come from the two download pages opened on 2026-11-24:

| Platform | System requirements stated officially | Notes |
|---|---|---|
| macOS | macOS 13 or later | Two installers: one for Apple silicon and one for Intel |
| Windows | Windows 10 or later | x64 |
| Linux | The international edition offers x64 and ARM64 | As of 2026-11-24 the Mainland China download page still says "In preparation"; see the Linux section below |
| iPhone and iPad | Get it from the App Store | Minimum OS version not stated |
| Android | APK, from the official CDN | Minimum OS version not stated |

<!-- TODO: needs verification — the minimum system versions for iOS, iPadOS and Android. Neither the download pages nor the privacy policy state them; no hardware requirements such as memory or disk were seen either. The minimum macOS version in the repository's developer document macos-system-permissions.md (12) disagrees with the download page (13), and no official explanation was found -->

The download page also has a sentence that is easy to miss: **"The desktop app works as soon as it is installed. The mobile app is for viewing, asking follow-up questions and taking over Cindy tasks that are running on the computer."**
The phone app runs no agent itself, so install the desktop app first.

### Prepare a source of models

The Cindy client is free, but someone has to pay for model calls. The official site gives four kinds of source; pick the one you already have:

| Source | How to connect | Who it suits |
|---|---|---|
| An existing subscription | Sign in and authorize. The Mainland China home page lists Claude, ChatGPT, SuperGrok, Kimi Code, MiniMax and GitHub Copilot | People already paying for one of these subscriptions |
| Your own API key or Coding Plan | Add a provider in Settings and enter the key. Both home pages say a Key can connect other supported Coding Plans; the Mainland China edition names Zhipu and Alibaba Cloud | People with an API account who want to control their own usage |
| A local model | Connect a runtime that runs on your machine, such as Ollama, llama.cpp or LM Studio. Officially labeled Beta; performance depends on the model and the hardware | People who do not want content to leave the computer |
| Cindy's official model service | Use it as needed after signing in; pay per usage or by the month | People who do not want to configure things themselves |

The official home page says: "We encourage you to use your own subscription and key." There is one more sentence to remember: **"Pi is a Harness. You do not need to buy another subscription."**

## Core concepts

### Glossary

| Term | One-sentence explanation | Why it is needed |
|---|---|---|
| **harness** | The agent engine that actually executes the task, for example Claude Code. Codex and Pi are harnesses too | A model only reasons and generates text; reading files, running commands and deciding what to do next are organized by the harness |
| **Task (session)** | A continuing conversation between you and an agent, with a working directory and a full history. The official interface calls it "task" | It is what you resume when you change screen or harness |
| **Turn** | From the moment you send a message until the agent finishes the work and stops counts as one turn | Permission confirmations, queueing and interruptions are all managed per turn |
| **Model provider** | Where the model comes from, that is, one of the four sources above | The harness and the model are two layers of choice; the same harness can switch between models |
| **Device Link** | The channel that lets computers and phones signed in to the same account find and control each other | To view and take over a computer's task on the phone, the two must be connected first |
| **Memory** | Preferences and knowledge that the agent stores and can read later | Otherwise you explain everything from scratch each time you start a new task |
| **Skill** | A set of operating instructions written for the agent, kept in a folder with a `SKILL.md` | It fixes "how to do a certain kind of thing", so you do not repeat it each time |
| **Plugin** | An extension packaged as a `.cindy` file that can add UI and new tools | A Skill only teaches a method; a plugin can connect external services |
| **MCP** | A general protocol for connecting tools to a model | It brings your own systems into the agent |
| **Companion** (the English interface says **Buddies**) | A long-term partner with a name, responsibilities, memory and skills | Recurring work such as code review and research goes to a fixed role |
| **Automation** | A task that runs automatically on a schedule or in a loop | Repetitive things such as weekly reports and routine checks need not be started by hand each time |
| **Chat channel** | A chat tool you already use, such as Slack, Telegram or Feishu | One @-mention in the chat assigns the work |
| **Remote desktop** | The feature that lets you see and operate the computer's real screen on the phone | Use it when chat cannot handle it and you must click through the software yourself |
| **Orca (collaboration)** | One Lead task with several Worker tasks sharing the work | When one agent is not enough, different harnesses each handle a part |

### harness: it does the work, not Cindy

The official FAQ says: "Claude Code, Codex and Pi are the Agent Harnesses that organize execution; the model handles reasoning and generation."
The README describes the three: Claude Code is "Claude Code's agent workflow, with Cindy's interface and connected tools"; Codex is "Codex's coding workflow, available alongside your other agents";
Pi is "a lean, open-source, extensible agent with support for multiple model providers". The desktop installer bundles the executables of these three engines (the `apps/*-bin` line in the README), so you do not need to install them separately.
The official site also warns: **the available combinations depend on the service you connect, the authorization and the model's capability**; not every harness can be paired with every model.

### Tasks and Device Link: your computer is the server

- The README says "Your session stays in Cindy": whichever engine runs underneath, Cindy keeps the task's history, working directory and settings. That is why you can open the same task on another device and switch harness midway.
- The README's "Your computer becomes your server" refers to your own computer: tasks run on the computer, and the project files stay on that computer. The phone and a second computer are only entrances for "seeing and speaking". The device-link notes in the repository state that the mobile app is a pure controller, with no local agent, session or database.
- **Remote access is not a whole-disk sync.** The README: "Project files stay on their computer — remote access is not whole-disk sync."

### Memory, Skills, plugins and MCP: four layers of reusable things

| Layer | What it is | What the official site says |
|---|---|---|
| Memory | Scattered knowledge such as preferences and project background, managed by Cindy per working directory | "Keep useful preferences and knowledge in memory" |
| Skill | A set of operating instructions, reusable and shareable, carried by the `SKILL.md` in the skill directory | "Turn a good way of working into a Skill you can reuse and share" |
| Plugin | A package with UI and new tools, in the `.cindy` package format | "Discover Skills and plugins in SkillHub" |
| MCP | The protocol for connecting your own systems and internal tools | "Connect more tools through Skills, plugins and MCP" |

### Companions, automations, channels, remote desktop and Orca

- **Companion**: the README says "Give them a role, instructions, skills and recurring work — a reviewer, researcher, project partner, or something of your own".
- **Automation**: set repetitive work as a scheduled or recurring task.
- **Channel**: the English README names Slack and Telegram; the Chinese README says "chat channels such as Slack and Feishu".
- **Remote desktop**: the README says "Built-in remote desktop on your phone lets you open apps, type and operate a connected computer when a chat isn't enough". It needs separate authorization.
- **Orca (collaboration)**: the source documentation defines it as "one Lead session responsible for splitting the task, assigning work, acceptance and summary, and several Worker sessions responsible for parallel or serial execution", and states that "a Worker is a complete session, not a one-off subagent". The three-step example on the official home page, "planning, parallel execution and independent review", is labeled as an "illustration of usage".

## How it works

Remember one sentence first: **Cindy itself does not call the model to do the work; the harness does the work.** Cindy does three things: it gives you one unified interface, it manages each harness's process and session, and it extends tasks, files and model access to your other devices.
In the source code the engines are three fixed values, `claude-code`, `codex` and `pi`, plus one more provided by a plugin, `acp` ([`packages/maker-core/src/types/common.ts`, lines 8 to 16](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/maker-core/src/types/common.ts#L8-L16)).

Look at the next diagram with this question in mind: after a task leaves your phone or computer, which layers does it pass through before it reaches the harness? Which data always stays on your computer, and which is sent to Cindy's services or the model provider?

<DocDiagram src="/diagrams/cindy-architecture.en.svg" alt="This layered architecture diagram answers two questions: after a task leaves your phone or computer, which layers does it pass through before it reaches the agent engine, and which data stays on your computer while which goes to Cindy's services or the model provider? There are four areas. On the left are your devices: the phone and computer B. The phone is only a remote control; no agent runs on it, and it reaches computer A only through the Device Link relay in Cindy's cloud, on whitelisted channels. Computer B can be the controller or the controlled side. In the middle is the Cindy client on computer A, in four layers from top to bottom: the UI, or Renderer, which only submits intent to the main process; the main process, which holds the input coordinator, the local SQLite database, automations, and chat channels; the session layer, maker-core, where Maker and Session unify the output of the three harnesses into one event stream that returns to the UI; and at the bottom the harness adapters for Claude Code, Codex, Pi, and the plugin engine. Below the adapters is the harness subprocess, which reads and writes files, the browser, and apps on computer A; project files stay on the computer that runs the task. At the lower right are the model providers, in four kinds: an existing subscription, an API key, a local model, and Cindy's own model service. A harness's model request first passes through the loopback proxy and protocol bridges, and computer A then sends it straight to the chosen provider; only when Cindy's model service is chosen does the request pass through the cloud gateway. At the top is Cindy's cloud, and only four lines connect it to your machine. First, device information and the online heartbeat, sent from the computer to the cloud in sign-in mode only. Second, usage statistics sent to TapDB, on by default and possible to turn off. Third, the conversation sync of cloud companions, which is two-way. Fourth, model requests when Cindy's model service is chosen. In local mode, when sign-in is skipped, there is no heartbeat, no usage reporting, and no Device Link. Agent-Net is a Beta feature, off by default, drawn as an optional encrypted path next to the Device Link relay. This diagram leaves out the server's internal modules, because the backend is not in the open-source repository. It draws no conclusion about whether the official relay reads data, and it shows no prices or quotas." :width="1080" lang="en" />

> **What the diagram is based on:** the layers, the device roles and the data flows come from the sections "How connections and data work" and "Privacy & telemetry" of the repository's [`README.zh-CN.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/README.zh-CN.md), and from "Roles and topology" in [`packages/device-link/README.md`](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/packages/device-link/README.md); the heartbeat is sent only during a signed-in cloud session, checked against [`heartbeatService.ts` L6–L10](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/main/heartbeatService.ts#L6-L10), all at commit `6fdec7fb`; the default of usage statistics and how to turn them off are checked against the [privacy policy](https://cindy.cn/privacy) (as of 2026-11-24). The diagram keeps the objects in the four areas, the direction of the four cloud connections, and the labels of what stays on your machine; it leaves out the server's internal modules, because the backend is not in the open-source repository. It draws no conclusion about whether the official relay reads data, and it shows no prices or quotas.

The thing to see most clearly in the diagram is **the boundary in two directions**.

**The first boundary is between the interface and the harness.** The three harnesses each speak their own language. Cindy has an adapter for each harness, and the adapters translate them into the same event stream (text, tool calls, Diffs, confirmation requests, completion, errors).
That is why the task record, the Diff and the confirmation card look the same after you switch engines. For the details, see the [source code walkthrough](./source).

**The second boundary is between your devices and the cloud.** The table below lists it data item by data item; it is the basis for your decision between "Sign in" and "Skip Sign-In":

| Data | Stays on your machine? | When it is sent out |
|---|---|---|
| Project files | Yes, on the computer that runs the task | When remote access or cloud companion sync is on, the related messages, files and metadata pass through Cindy's service |
| Conversation records and agent call history | Yes | Same as above; with the official model service selected, requests also pass through the official gateway |
| The prompts and context you send to the model | No | Sent to the model provider you chose on every request |
| API keys and sign-in credentials | Yes, stored encrypted | Token refresh for subscription sign-in may be handled by the official service |
| Device information and online heartbeat | No | Sign-in mode only, about once every 60 seconds |
| Usage statistics | No | On by default; can be turned off |

The basis is item 3 of Section I of the [privacy policy](https://cindy.cn/privacy): "Conversation records, Agent call history, files in the working directory and API Keys are usually stored on your local device."
And item 2 of Section II: when you use your own key or a subscription, the input "may be sent directly from the local device to the model provider you choose"; when you use the official gateway, the content passes through the gateway before it is forwarded to the model. For the full list, see "Security and privacy essentials" below.

There are two more forms that the diagram does not draw: a task can run on another machine over SSH, or the agent runs on another computer while the files stay on yours. They are advanced usage, and this page does not cover them.

## Install

> **About the steps on this page**: the author did not install and run Cindy on a local machine. The steps were checked against four sets of official material: the Chinese README of the repository, the official site (download page, pricing page, privacy policy), the UI strings in the repository (`apps/desktop/src/renderer/i18n/locales/zh-CN/common.json`) and the product rules documents (`docs/product-rules/`).
> Text in quotation marks is the original wording of the interface or the documentation. The version in your hands may have moved buttons; the interface is authoritative.

### macOS and Windows

1. **What to do**: open the download page you chose. On macOS, pick **Apple silicon** or **Intel** by chip and download the `.dmg`; on Windows, download the `.exe` for **Windows x64**.
2. **What to do**: finish the installation as you would for any other desktop software, then open Cindy.
   <!-- TODO: needs verification — the exact installation steps. The official site provides no installation document for macOS or Windows; whether the first launch on macOS requires allowing the app in System Settings was not found either -->

### Linux

The two download pages disagree; choose by your edition:

| Edition | Current state | How to install |
|---|---|---|
| International edition | The download page offers Linux x64 and ARM64 | The command given on the page is `curl -fsSL https://hotfix.cindy.app/cindy/install-omarchy.sh \| bash`, run in a terminal |
| Mainland China edition | The download page says "We are preparing the release packages and installation instructions" and "In preparation" | Go to [GitHub Releases](https://github.com/makecindy/cindy/releases) and find the package whose file name ends in `-linux-x64-cn.deb` or `-linux-arm64-cn.deb`. The v0.1.144 Release does contain these two files |

The repository's [Linux installation guide](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/linux.md) lists four routes:

| Environment | Installation | Updates |
|---|---|---|
| Ubuntu 22.04 / 24.04 | The official `.deb`, via apt | Downloaded in-app; takes effect after an explicit restart; needs polkit authorization |
| Arch Linux, Omarchy (Hyprland) x86_64 | A one-command, user-level installation | Downloaded in-app; switches version after an explicit restart |
| Other glibc desktops | The same user-level installation script; a compatible runtime library is required | The official note says "this does not mean every distribution has been tested" |
| pacman, AUR or other third-party packages | Install with that package manager | Do not use the in-app update any more |

The guide does not support Alpine (musl) or desktop sessions running as root.

### Phone

Search for Cindy in the App Store, or get the Android APK from the download page, then sign in with the same account as on the computer. The phone app's role is to "view, ask follow-up questions and take over Cindy tasks that are running on the computer", so install the desktop app first.

### First launch: sign in or skip sign-in

The sign-in page offers two choices. This is the first important decision you make:

| | Sign in (called "Hosted service" in the README) | Skip Sign-In (local mode) |
|---|---|---|
| Interface text | The sign-in methods | **Skip Sign-In**, with this line below it: "No Cindy account required. Data stays on this device; cloud models, cross-device access, and marketplace services are unavailable." |
| Account needed | A Cindy cloud account | None |
| Account status shown | Your account | **Not signed in** |
| Available | Local agent tasks, Cindy's official model service, cross-device access, remote desktop, cloud companion sync, SkillHub and the plugin marketplace | Local agent tasks |
| Not available | None | The official model service, cross-device access, marketplace services |
| Online heartbeat | Yes, about once every 60 seconds | No |
| Usage statistics (TapDB) | Reported by default; can be turned off | Not reported |

<!-- TODO: needs verification — whether "subscription sign-in" can be used in local mode to connect subscriptions such as Claude and ChatGPT. The privacy policy states explicitly only that local mode supports bringing your own API Key; the first-run guide document in the source says "in local mode, a sign-in entry is given" -->

The README makes one thing clear: **"Skip Sign-In" is not a connection to a local server.** It means you can use the local agent without signing in to a Cindy account; the client still connects to the address of the official cloud service by default, and only the capabilities that depend on the server are unavailable in this state.

| My situation | What to use |
|---|---|
| I want to use the phone, connect several computers, or not configure models myself | Sign in |
| I use it on one computer only, with my own API key or a local model, and do not want the device to stay online | Skip Sign-In |
| I want to see what it looks like first | Skip Sign-In; you can sign in later |

After you sign in or skip, a new computer shows a **Get-started guide** window. It lists only the steps that concern you, and each step can be skipped.
Its "Connect a model" page covers two methods, which the official site says can be used together: **Cindy AI** (the official model service, included once you sign in) and **Use your own plan**. The page lists the signed-in subscriptions detected on this machine; everything else goes under "Other providers and API keys". To see it again later, the entry is **Settings > General > Get-started guide**.

## Get the first thing working in 10 minutes

The goal is small: have Cindy create one file in an empty folder, then check yourself that it did only that.
**Do not practice on an important project the first time.** The agent can run commands on your computer; build trust in a folder that does not matter first.

### Step 0: Create a practice folder and take a snapshot

Open a terminal and create an empty folder:

```bash
mkdir cindy-trial && cd cindy-trial
```

Save the script below as `snapshot-diff.mts`, anywhere **outside** this folder (for example, your home directory). It records the hash of every file before you hand the folder to Cindy, and after the task finishes it tells you which files were added, modified or deleted.

```ts
// snapshot-diff.mts — snapshot the folder before handing it to Cindy, and compare after the task finishes.
// Usage: node snapshot-diff.mts snap <folder>
//        node snapshot-diff.mts diff <folder>
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Dependencies and build output hold too many files; comparing them only produces a thousand lines of noise.
const IGNORED = new Set(['node_modules', '.git', 'dist']);

/** Relative path → SHA-256 of the file content. */
type Snapshot = Record<string, string>;

async function walk(dir: string, root: string, out: Snapshot): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, root, out);
    } else if (entry.isFile()) {
      const bytes = await fs.readFile(full);
      out[path.relative(root, full)] = createHash('sha256').update(bytes).digest('hex');
    }
  }
}

async function main(): Promise<void> {
  const [command, target] = process.argv.slice(2);
  if (!target || (command !== 'snap' && command !== 'diff')) {
    console.error('Usage: node snapshot-diff.mts <snap|diff> <folder>');
    process.exitCode = 2;
    return;
  }
  const root = path.resolve(target);
  // Snapshots are stored per folder in the system temp directory, so they do not pollute your project.
  const store = path.join(
    os.tmpdir(),
    `cindy-snapshot-${createHash('sha256').update(root).digest('hex').slice(0, 12)}.json`,
  );
  try {
    const stat = await fs.stat(root);
    if (!stat.isDirectory()) throw new Error(`${target} is not a folder`);
    const now: Snapshot = {};
    await walk(root, root, now);
    if (command === 'snap') {
      await fs.writeFile(store, JSON.stringify(now, null, 2), 'utf8');
      console.log(`Recorded ${Object.keys(now).length} files`);
      return;
    }
    const before = JSON.parse(await fs.readFile(store, 'utf8')) as Snapshot;
    for (const file of Object.keys(now).sort()) {
      if (!(file in before)) console.log(`Added  ${file}`);
      else if (before[file] !== now[file]) console.log(`Modified  ${file}`);
    }
    for (const file of Object.keys(before).sort()) {
      if (!(file in now)) console.log(`Deleted  ${file}`);
    }
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    // "Running diff before taking a snapshot" is the most common mistake, so give a line the reader can act on.
    console.error(
      err.code === 'ENOENT' && err.path === store
        ? `Snapshot not found. Run this first: node snapshot-diff.mts snap ${target}`
        : `Error: ${err.message}`,
    );
    process.exitCode = 1;
  }
}

void main();
```

Take the snapshot (replace the path with where you keep the script):

```bash
node <script-dir>/snapshot-diff.mts snap .
```

For an empty folder, you should see `Recorded 0 files`.

**Why `.mts`**: it lets Node run TypeScript directly, with no dependencies to install. Node 22.18 and later support it by default; from 22.6 to 22.17 you need the flag `--experimental-strip-types`.
I ran this script on Node v24.16.0 in six cases (normal, no snapshot taken, missing argument, folder does not exist, a file was passed, changes present); the output and exit codes were as expected.
The file name must end in `.mts`: I tried `.ts`, and Node treated it as CommonJS and failed with `Cannot use import statement outside a module`.

### Step 1: Create a task and choose the practice folder

1. **What to do**: create a new task in Cindy and choose the `cindy-trial` folder you just made as the working directory. If you see a worktree-related checkbox, leave it off the first time.
   <!-- TODO: needs verification — the text of the button for creating a new task and the location of the working-directory picker. The repository documentation confirms only what the entry is called ("New Session" in the English interface strings) -->
2. **Why**: with a worktree, the task changes code in a separate working tree of the repository, and the changes do not appear in the directory you opened. The official home page says "eligible local Git tasks can use a separate worktree and checkpoints", so the option only matters for Git tasks, and `cindy-trial` is not a Git repository.

### Step 2: Choose a harness and a model

Set it up according to the source you chose in "Prepare a source of models":

| What you have | Which harness | Where the model comes from |
|---|---|---|
| A Claude subscription, and you have already signed in with `claude` on this machine | Claude Code | Reuses the local Claude Code sign-in |
| A ChatGPT subscription | Codex | Reuses the local Codex sign-in |
| Only an API key | Pi, or a harness for which the provider is officially supported | Add the provider in Settings and enter the key |
| You want to configure nothing, and you are signed in to Cindy | Any | The models included with Cindy AI |

The basis for "reuses the local sign-in" is the repository's desktop development document: Cindy, like the official release, uses the default Claude Code configuration directory, so it directly reuses the local subscription sign-in.
<!-- TODO: needs verification — the menu path and form fields for adding an API key provider in Settings. The product rules confirm only that the entry is called "Other providers and API keys" -->

### Step 3: Send the first task

Keep the permission at the default level you see, and read each confirmation the first time. Then send:

```text
Create a hello.txt in the current folder with only one line of content: Hello Cindy.
Do not create or modify any other files. When you are done, tell me what you changed.
```

**What you will see**: the task starts running, and the interface shows the agent's tool calls and results one after another. An operation that needs your approval stops, and a confirmation card appears. The card states what it is about to do; read it before you allow it.
**Why write the task this way**: the scope is small, the result is verifiable, and extra actions are explicitly forbidden. It is the least effortful way to test whether any agent does as it is told.

About permissions: the source has six internal values for the levels: `ask`, `default`, `acceptEdits`, `plan`, `auto` and `bypassPermissions`. `bypassPermissions` is Full access, and switching into it from another level requires an explicit confirmation; any value the client does not recognize is handled as the safest one, `ask`.
The names these six values show in the interface come in two sets, depending on which agent runs the task. The table copies the `label` values under `newChat.permissionSelector.modes` in the interface strings ([`en/common.json` L14501-L14575](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/renderer/i18n/locales/en/common.json#L14501-L14575)):

| Internal value | Built-in Claude Code, Codex, Pi | Plugin engine (an external agent connected through ACP) |
|---|---|---|
| `ask` | Default permissions | Ask each time |
| `default` | not in the selector | Default |
| `acceptEdits` | Auto accept edits, Claude Code only | Accept edits |
| `plan` | not in the selector | Plan only |
| `auto` | Auto-review | Auto |
| `bypassPermissions` | Full access | Allow all |

The right column appears only when a plugin engine runs the task; the selector then offers exactly the modes that engine declares ([`PermissionSelector.tsx` L74-L78](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/renderer/components/new-chat/PermissionSelector.tsx#L74-L78)). ACP is the Agent Client Protocol, which lets an external agent connect to the client. Plan mode is a separate switch in the interface and is in neither set ([`en/common.json` L20177](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/apps/desktop/src/renderer/i18n/locales/en/common.json#L20177)).

### Step 4: See which files it changed

Check along two paths: one reads the agent's own account, and one looks at the facts.

- **Look at the interface**: while the task runs, Cindy shows the Diff of this turn's changes (the `turn_diff` event in the source, defined as "the provider's cumulative unified diff of this turn's workspace changes"); you can also see the git data in the review panel of the right sidebar.
- **Look at the facts**: go back to the terminal and run `node <script-dir>/snapshot-diff.mts diff .`. If the task followed the constraints, you will see one line, `Added  hello.txt`. Then use `cat hello.txt` to confirm that the content is a single line, `Hello Cindy`.

**Only the second path counts.** If there is one extra file, or another file was changed, the task did not follow the constraints. Do not bring it into an important project yet; go back and check the permission level and the task description.
If the task is fine and you want to continue, send the next message in the same task; the agent remembers the context of the previous turn. To check whether it remembers, you can ask: "Which file did you just create?"

## Day-to-day use

### Switch harness and carry on

**Goal**: plan with one engine in the same task, then switch to another engine to execute, without copying and pasting context.

1. **What to do**: open the model picker in the task, change to another harness and choose a model. **What you will see**: the interface shows your new choice at once, but the engine underneath has not changed yet.
   <!-- TODO: needs verification — the name and location of the model picker entry -->
2. **What to do**: send the next message as usual. **What you will see**: the switch happens only when this message is sent; a switch boundary appears in the conversation, and you can expand it to read the full handoff text.
3. **Why**: Cindy first registers the intent that "you want to switch" and performs one switch when the next message arrives, so changing your choice repeatedly costs nothing.

**One thing has to be made clear here.** The README: "Your session stays in Cindy; switching harnesses hands off or rebuilds the engine context rather than making their internal states identical." Broken down:

| What is carried over | What is not moved as is |
|---|---|
| The handoff text Cindy writes for the new engine (what was done before, where things stand now) | What is in the old engine's "head": its hidden reasoning, its own session cache |
| The task's history, working directory, and the permissions you set in Cindy | The internal state inside each engine's own native session |
| The memory and Skills managed by Cindy | |

A source comment spells out the flow: build the handoff text, close the old engine's session, record the switch in the database, insert a boundary record, and then rebuild the session in the new engine.
When you switch back to the original harness, Cindy restores its original native session where possible and only fills in the progress made while you were away. So the practical advice is: **write key constraints into task messages or memory; do not leave them only in one engine's session.**
Two limitations: a session running on another machine over SSH does not support switching; the Lead and Workers in a collaboration, review tasks and archived tasks also do not support this complete switch made by the agent itself.

### Connect a second computer and a phone, and use remote desktop

**Goal**: after you leave the computer, keep working on the same task from the phone or another computer.

The prerequisite is three sentences from the README: "For remote access to your computers, keep them online, sign in with the same account and enable the relevant permissions. Model sharing requires allowing remote access to that provider; remote desktop also needs its own permissions."

1. **What to do**: install Cindy on the second computer, sign in with the same account, then turn on "Allow same-account devices to control this machine" in the remote connection settings on this computer.
   **What you will see**: after the other device refreshes, it can see this computer. While it is being controlled, the controlled computer shows the notice "Your desktop is being controlled".
   <!-- TODO: needs verification — the name of the settings page that holds "Allow same-account devices to control this machine". The switch text is taken from the interface strings in the repository -->
2. **What to do**: install Cindy on the phone, sign in with the same account, switch device in the device list, open the task and continue the conversation.
   **Why**: the task still runs on the original computer; the phone sends control commands. Once the computer shuts down, the remote task stops. The official FAQ states that the phone "does not automatically move the work of an offline computer to the cloud to run".
3. **To borrow the model on another computer**: allow the corresponding provider to be called remotely on that computer. The task stays on the original computer; only the other computer's model access is borrowed.

**Remote desktop**: first turn on the switch from the previous step on the computer to be controlled, then turn on remote desktop; then open "Remote desktop" on the phone and complete the authorization as prompted, and you can see the computer's real screen and type and operate it.
<!-- TODO: needs verification — the name of the remote desktop switch, and which system permissions macOS and Windows each require. The README says only "its own permissions"; the corresponding developer document in the repository could not be read correctly -->

What the phone can do to the computer has a clear boundary. The device-link notes in the repository state that the full set of remotely callable channels is a deny-by-default allowlist, covering creating and closing tasks, sending messages, handling confirmations, switching model and permission, and reading history;
**account and keys, the global settings of the controlled end, and local pop-ups are never allowed**.

**Privacy note**: by default, Device Link traffic can go through the official relay or connect directly, and the protocol has no end-to-end encryption field. There is a newer connection method called **Agent-Net (Beta)**; the product rules state "end-to-end encryption" and "off by default", and you need to turn it on by hand on your device.
<!-- TODO: needs verification — the page that holds the Agent-Net switch, and whether it is open to all accounts in the current release -->

### Make experience stick with memory and Skills

**Memory**. The easiest way is to say "Remember: …" directly in the conversation. The memory instructions Cindy gives the agent list trigger words such as "remember", "I prefer" and "don't do that again", as well as the moments when you correct it.
Memory falls into four kinds: `user` (your role and preferences), `feedback` (corrections and approvals), `project` (the progress and constraints of this working directory) and `reference` (entry points to external systems).
Memory is divided by working directory and is **shared across engines**, so switching harness does not lose it; it is a separate system from the native memory that Claude Code and Codex each bring, and the two do not connect. A remote controller can only read memory and memory settings; the allowlist has no channel for changing them remotely.

**Skill**. You can install ready-made ones from SkillHub, or write your own: create a folder and put a `SKILL.md` in it. When Cindy scans, it reads the `description` at the top of the file.
The product rules in the repository also state that Cindy recognizes the skill directories of Claude Code, Codex and Pi directly, so you do not install them twice. A minimal `SKILL.md`:

```markdown
---
description: Replace the deprecated APIs in this repository with the new form. Use when the user mentions "replace the old API" or "upgrade xx"
---

Work in the order below, and finish each step before moving to the next:

1. First use grep to list all the files that still use the old API. Only list them; do not change anything.
2. After the user confirms the list, change one file at a time.
3. After each file is changed, run `pnpm lint` once and paste the result.
4. When everything is changed, give a list of the changes: which files were added, modified and deleted.
```

<!-- TODO: needs verification — the exact paths of the user-level and project-level skill directories. A repository comment mentions only that Skills Cindy produces itself land in ~/.agents/skills; whether SKILL.md needs a name field in addition to description -->

### Build a companion

**Goal**: give recurring work such as code review a fixed role, so you do not rewrite the role definition each time.

1. **What to do**: open the companion entry, create a companion, fill in its name, responsibilities and way of working, and attach memory and Skills.
   <!-- TODO: needs verification — the name and location of the companion entry in the interface. The README and the product rules use the word "companion" -->
2. **What you will see**: the companion has its own default model, which does not affect, and is not affected by, the model you choose when creating a task.
3. **What to do**: give it recurring work (see automations in the next section), or bind a messaging platform and assign it work from a chat.
4. **Why**: the point of a companion is accumulation. Its memory and skills stay after each time you work together, and are there for the next time.

A companion belongs to the account, not to one computer. Each companion has a **main computer**; its agent runs only there, and the working directory, sign-in state and files are all there. Other computers and the phone are entrances for seeing and speaking.
When the main computer is offline, Cindy tells you so explicitly and offers "Continue on This Computer"; by default it does not switch computers automatically. The cloud syncs only the **conversation layer** (the messages you can see and the companion's final replies); tool call details and the full run records stay on the main computer.
If you already use OpenClaw or Hermes, the first-run guide can import companions.

### Set up automations and connect chat channels

**Automations**:

1. **What to do**: open "Automations", create one, and fill in the task content and the schedule or recurrence rule.
   <!-- TODO: needs verification — the fields on the automations page (time format, recurrence options, optional computer to run on). The repository confirms only that the page is called "Automations", that the engine underneath is a cron engine, and that triggering by Webhook is supported -->
2. **What you will see**: when the time comes, it automatically starts a task turn, and the run records stay on the page.
3. **Why**: automations are executed by the Cindy on your computer, so the computer has to be on. The repository rules state that when unattended work meets an operation that needs confirmation, the confirmation card waits for an answer or times out, and you can handle it from a notification or on the phone. So a task you give an automation must either need no confirmation, or you must be sure you can look at the phone when the time comes.

**Chat channels**:

1. **What to do**: in the channel settings card in Settings, or in the companion's "Messaging platforms" dialog, choose Slack, Telegram or Feishu, and enter the bot credentials as the page guides you.
   <!-- TODO: needs verification — the setup entry and authorization steps for each channel. The README gives only the channel names -->
2. **What you will see**: once connected, @-mention Cindy in the chat; it turns the message into a task turn, and the result comes back to the chat.
3. **Why**: this is the handiest way to hand work over, but the data passes through three places: the chat platform, Cindy's service and your computer.

The release notes for v0.1.96 say that the Mainland China edition previously could not see the configuration for official bots and for personal Telegram, Discord and Lark; from that version on, both editions offer the same entry.

### Use Orca to split the work between several agents

**Goal**: split something too big for one agent among several harnesses working in parallel.

1. **What to do**: turn on the collaboration switch in a normal task.
   <!-- TODO: needs verification — the interface name of the collaboration switch. The repository documentation calls it "collaboration", Orca in English -->
2. **What to do**: create a Worker, choose its harness, model, reasoning effort and permissions, then state clearly what it has to do.
3. **What you will see**: the interface splits into two columns, with the Lead on one side and the Worker currently in focus on the other. Each Worker is an independent task with its own history.
4. **What to do**: tell the Lead what you want, for example: "Split the English translation of the README into three Workers: body text, example code and glossary."

The Lead directs Workers through a set of tools. The instructions for the Lead in the source list these tools: `get_workspace_info`, `create_worker`, `create_workers`, `send_to_worker`, `interrupt_worker`, `update_worker`, plus several tools for managing the Worker queue.
When a Worker finishes, it reports back through `send_to_lead`; the Lead is woken up automatically and does not need to poll.

Three boundaries come from the collaboration architecture document in the repository: one team is bound strictly to one Lead task, and Workers cannot be shared across Leads; switching which Worker is in focus is "changing what is displayed", not showing several Workers side by side; the local Claude Code, Codex and Pi can all act as Lead or Worker.
**The difference from subagents**: a Worker is a complete session, visible in the interface, with a persistent history; a subagent is a one-off subtask executor inside one agent. The prompt for the Lead in the source explicitly requires not mixing the two.

## Real-world use cases

The four scenarios below are ideas designed for frontend engineers. Every capability each scenario uses has appeared above; adapt the task descriptions to your repository.

| Scenario | How | Capabilities used |
|---|---|---|
| Major dependency upgrade | First have a harness that is good at planning produce a change list; after you confirm it, switch to another harness to execute. When it is done, use the Step 0 script to check the scope of the changes | Switching harness, Diff |
| Daily check | Create an automation that runs lint and tests every weekday morning, reports only the failures, and pushes the results to the chat channel you use most | Automations, channels |
| Code review partner | Build a companion whose responsibilities state clearly what it reviews and what it does not, and put the team conventions into its memory. When a PR is up, @-mention it in the chat | Companion, memory, channels |
| Taking over after work | The task runs on your work computer. On the way home, check progress on the phone; when you need to click a build tool, open remote desktop | Device Link, remote desktop |

One thing to watch in the second scenario: do not set the automation's task to need confirmation for each action; otherwise it stops on a confirmation card and waits for you.

## Pricing, quotas and limits

**Remember one sentence first: free software does not mean unlimited model calls.** The numbers below are from the official pricing pages on 2026-11-24; they may change later, and the official pages are authoritative.

| Tier | Mainland China edition ([pricing page](https://cindy.cn/pricing)) | International edition ([pricing page](https://cindy.app/pricing)) | Notes |
|---|---|---|---|
| FREE | ¥0 | $0 | All software features. Pay-as-you-go top-up from ¥50 (from $10 in the international edition); topped-up credit does not expire |
| PLUS | ¥100/month, ¥80/month on a monthly plan | $20/month, $16/month on a monthly plan | The monthly usage allowance equals the monthly price; unused allowance rolls over, up to ¥50 ($10) |
| SUPER | ¥500/month, ¥400/month on a monthly plan | $100/month, $80/month on a monthly plan | Rollover cap ¥250 ($50) |
| ULTRA | ¥1000/month, ¥800/month on a monthly plan | $200/month, $160/month on a monthly plan | Rollover cap ¥500 ($100) |
| TEAM, ENTERPRISE | Quoted by seats and governance needs | Quoted by seats and governance needs | The official home page shows "coming soon" and "contact us" |

A few rules, worded the same on both pricing pages:

- **Using your own key or an existing subscription uses no Cindy allowance and costs nothing extra.** The official model service is a separate option.
- The usage allowance covers all the models of the official service in the "current region". The Mainland China edition lists DeepSeek, Kimi, GLM and Qwen; the international edition lists GPT, Claude, Grok, Gemini and the ones above.
- How much each task spends is shown in real time on the session.
- Existing subscriptions still follow the provider's limits and rules. The v0.1.101 release notes on GitHub mention that when a task hits the 5-hour or weekly usage limit, the time at which it is expected to continue automatically is shown, and it can be canceled.

<!-- TODO: needs verification — the amount of free credit given to new accounts. The first-run guide document in the repository says "new accounts get free credit"; the pricing page gives no number -->

## Security and privacy essentials

This section stands on its own because it is the one beginners most easily skip. Cindy can run commands and read your files, and by default it is connected to the official cloud service, so you need to know which data goes out by default.
The conclusion first: **if you do not want the device to stay online, use "Skip Sign-In"; if you sign in, turn off "Usage statistics" by hand.**

### The four kinds of data sent out by default

| Mechanism | What is sent | Default state | Can it be turned off |
|---|---|---|---|
| Usage statistics (TapDB) | Device identifier, OS and app version, launches and return visits; after sign-in, a regional account alias; which model each participating desktop device chose each day, and model usage. **Excludes conversations, prompts, files and working-directory data** | On | Yes; see the next subsection |
| Online heartbeat | User ID, platform, app version; device registration also includes the device name, OS version, CPU model, memory size, whether remote control is on, and whether it is busy or idle | On in sign-in mode | No. The privacy policy states that it "cannot be turned off by the user"; local mode sends none |
| Diagnostic logs | Logs you upload by hand; there is also an "automatic crash log upload" option | Manual upload; automatic upload is off by default | Nothing is sent unless you upload. Native crash dumps stay local |
| Model requests | Prompts, related context, attachments, tool results | Sent whenever used | Sent to the model provider you chose; with the official model service selected, they pass through the official gateway and go through content safety checks |

The heartbeat and usage statistics are two separate mechanisms. The README: "Online heartbeats and diagnostic logs are separate mechanisms, unaffected by the usage statistics switch."

### Turn off usage statistics

- **Desktop**: **Settings > About > Usage statistics**. Once off, subsequent reporting stops immediately.
- **Mobile**: **Settings > About this phone > Usage statistics** (the path as the Chinese privacy policy gives it, translated; the README says "Usage statistics in Settings"). Once off, the account is unlinked immediately and reports explicitly triggered by Cindy stop, but the native statistics component that has already been initialized cannot be uninitialized; **fully quit and reopen the app** for it to stay uninitialized.

The README also discloses a known mobile exception on its own: enterprise SSO sign-in skips the step of accepting the policy, and in certain cases the migration logic can mark even a new installation as "consented". With statistics configured and the switch on, reporting may then start without the user explicitly accepting the privacy policy. The official way to avoid it is to turn off usage statistics.

**The difference between local mode and sign-in mode**: when you choose "Skip Sign-In", usage statistics are not reported, no online heartbeat is sent, no device information is registered, and the online state of Device Link is not maintained. For the full comparison of the two modes, see the table in the Install section above.

### Four more things that are easy to miss

- **Document preview uploads temporarily.** The privacy policy states that previewing formats such as DOCX and PPTX calls cloud transcoding; the file is uploaded temporarily and deleted immediately after the conversion.
- **Chat channels are a third place.** After you enable a Feishu bot or another messaging integration, messages, commands, files and execution results pass through the messaging platform, Cindy's service and your local client.
- **A shared task is a local file.** The exported `.cshare` file can be password-protected; without a password, anyone who gets the file can read the content. The official service does not store the password, and it cannot be recovered.
- **Local models are Beta.** The official site states that performance depends on the model, the hardware and the runtime. To keep content from leaving the computer, you also need to use local mode at the same time, connect no chat channels and turn on no remote access.

The last item is the official FAQ's own wording: "Local-first does not mean no data ever leaves the device." Choose services, permissions and sync options according to your own needs.

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| The interface shows "Not signed in", and the phone cannot connect to the computer | You are in the local mode of Skip Sign-In, which has no Device Link | Sign in to the same Cindy account |
| Your computer does not show up on the phone | The computer is offline, or "Allow same-account devices to control this machine" is off | Keep the computer online, sign in to the same account, and turn on the switch |
| The task stopped after you closed the laptop lid | Remote tasks run on the computer; the phone is only an entrance | Do not let the computer sleep while a task needs to continue; Cindy does not move the task to the cloud |
| After switching harness, the agent seems to have forgotten a few details | The switch rebuilds the context from the handoff text; the old engine's internal state does not carry over | Write key constraints into task messages or memory |
| After creating a task in a Git repository, you see no changes in your own directory | A worktree may be in use; the changes are in a separate working tree | Look at this turn's Diff in the review panel; turn off the worktree option when creating a task |
| You turned off usage statistics, but the computer still connects to the network regularly | That is the online heartbeat, a separate mechanism | It cannot be turned off in sign-in mode; if you mind, switch to Skip Sign-In |
| Reports continue on the phone after you turned off usage statistics | The native statistics component that has been initialized cannot be uninitialized | Fully quit the app and open it again |
| You cannot find a Linux package on the Mainland China download page | That page still says "In preparation" | Find the `-cn` `.deb` on GitHub Releases, or follow the repository's Linux guide |
| You cannot switch harness in an SSH remote session | Remote sessions do not support switching | Create a new task and carry the handoff content over |
| The automation ran on time but stopped on a confirmation card | When unattended, an operation that needs confirmation waits for an answer | Choose a permission for the automation's task that needs no confirmation, or make sure you can look at the phone when the time comes |

## Troubleshooting

| My situation | Where to go |
|---|---|
| I do not know how to use a feature | Ask with the "Usage question" template in GitHub issues |
| I hit a bug | File a GitHub issue with the version, platform, reproduction steps and redacted logs |
| I need logs | Diagnostic logs can be uploaded by hand; uploading requires privacy consent first |
| I suspect a security vulnerability | Report it privately following the process in `SECURITY.md`; do not open a public issue |
| I want to see the licenses of third-party components | The Chinese terms of service give the entry as **Menu > Settings > Open-source licenses** (translated) |

<!-- TODO: needs verification — the exact menu paths for viewing the version number, exporting logs and uploading diagnostic logs. Neither the README nor SUPPORT.md gives them -->

Two reminders from the repository's usage support document: the community can help confirm reproducible problems, but it does not promise one-on-one troubleshooting for every custom environment; do not put real user data, access tokens, private keys or internal addresses in public issues or logs.

## Next steps

1. **Learn the harnesses themselves well.** How far Cindy can take you depends on how well you know Claude Code, Codex and Pi; see [Claude](../claude/), [Codex](../codex/) and [Pi](../pi-coding-agent).
2. **Want to know how it connects to the three engines.** Read the [source code walkthrough](./source), focusing on "Key mechanism 1: how Cindy drives the three harnesses".
3. **Choosing a tool, or want to help improve it.** Go back to the [learning map](./index) to see how to choose between it and other tools; the repository accepts pull requests, every commit needs a DCO sign-off, and no CLA is required.

## Further reading

- [Chinese README in the repository](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/README.zh-CN.md): the official description of the full feature set, the two modes, privacy and telemetry; the source of most facts on this page.
- [Official site FAQ](https://cindy.cn): the difference between harness and model, what happens to tasks when the computer shuts down, what local-first means.
- [Mainland China edition pricing](https://cindy.cn/pricing) and [international edition pricing](https://cindy.app/pricing): four price tiers, the rollover rules and eight billing rules.
- [Privacy policy](https://cindy.cn/privacy): the use of each kind of data, the device heartbeat, usage statistics, retention periods.
- [Terms of service](https://cindy.cn/terms): where responsibility lies in bring-your-own-key mode and in official gateway mode.
- [Linux installation guide](https://github.com/makecindy/cindy/blob/6fdec7fb89b955be548c3f5cc9a42d83bf174aa3/docs/linux.md): how to install and update on each distribution.
- [GitHub Releases](https://github.com/makecindy/cindy/releases): what changed in each version; the first-hand material for known issues.

## Related pages

- [Learning map](./index): the product family, the comparison with the alternatives, the quick decision table.
- [Source code walkthrough](./source): the repository map, the data flow of one task, where Codex plugs in, how device connection and Orca are implemented.
- [Claude](../claude/), [Codex](../codex/), [Pi](../pi-coding-agent): the three harnesses Cindy puts inside.
- [T3 Code](../t3code/): also a multi-agent workspace; useful for comparison.
- [Tailscale](../tailscale/), [UU Remote](../uu-remote/): remote control and networking tools; compare them with Cindy's remote desktop and device connection.
- [Codex cloud agent](../codex/dot): another approach, with tasks running permanently in the cloud; compare it with Cindy's "your computer is the server".
