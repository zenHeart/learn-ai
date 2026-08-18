---
title: MiniMax Code tutorial
description: Install the desktop app from the download page. The official CLI command is mcode. Copy only official install text.
domain: product
tags:
  - coding-agent
role: tutorial
---

# MiniMax Code tutorial

> This page goes from install to the first local-repo task. Flags live in the [cheatsheet](./minimax-code-cheatsheet.md), recipes in the [cookbook](./minimax-code-cookbook.md), and names in the [glossary](./minimax-code-glossary.md).
>
> MiniMax Code has a desktop face and a CLI face. Official text: it "complements the desktop client" ([CLI Features](https://agent.minimax.io/docs/cli/features)). Install one face first.

## 1. Pick a face

| Where you work | Install | Official entry |
|----------------|---------|----------------|
| Window, browser preview, schedules, phone remote | Desktop | [International download](https://agent.minimax.io/download) / [CN download](https://agent.minimaxi.com/download) |
| Terminal, scripts, CI, editor ACP | CLI (`mcode`) | [CLI Quick Start](https://agent.minimax.io/docs/cli/quick-start) |

You can install both. They are one product.

## 2. Install the desktop app

From [Download and Install](https://agent.minimax.io/docs/code/get-started/download):

> MiniMax Code supports macOS and Windows. After installation, sign in with your MiniMax account to start creating tasks.

| Platform | Requirement |
|----------|-------------|
| macOS | macOS 11 Big Sur or later |
| Windows | Windows 10 or later |

Official steps (same page):

1. Open the download page and pick the package for your device. **Use arm64 for Apple silicon Macs and x64 for Intel Macs.**
2. On macOS, open the `.dmg` and drag the app into Applications. On Windows, run the installer.
3. Launch MiniMax Code and sign in with your MiniMax account.
4. The app notifies you about updates. You can also check from settings.

International build: [agent.minimax.io/download](https://agent.minimax.io/download). Mainland China build: [agent.minimaxi.com/download](https://agent.minimaxi.com/download).

The desktop app has **no** official one-line `curl` installer. Do not use the CLI script in the next section to install the GUI.

## 3. Install the CLI

From [CLI Quick Start](https://agent.minimax.io/docs/cli/quick-start):

> The installer reuses a compatible Node.js installation when available. If your system does not have a compatible version, it installs a self-contained runtime in your user directory. The entire process requires neither `sudo` nor administrator privileges.

::: code-group

```bash [macOS / Linux / WSL]
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://filecdn.minimax.chat/public/install.ps1 | iex
```

:::

Then reopen the terminal:

```bash
mcode --version
mcode --help
```

Official support: macOS, Windows, common Linux distributions, and WSL. **Alpine and other musl-based Linux distributions are not currently supported.**

<!-- TODO: 待核实 —— official docs do not publish an npm package name. The FAQ only says the installer may reach the npm registry. -->

If the command is missing: close and reopen the terminal, then run `mcode --version`. On Windows, a VS Code that was already open can keep a stale `PATH`; quit VS Code entirely ([CLI FAQ](https://agent.minimax.io/docs/cli/faq)).

Update with `mcode update` or `/update` in the TUI.

## 4. Sign in

### Desktop

Sign in with your MiniMax account after launch ([Download](https://agent.minimax.io/docs/code/get-started/download)). For your own API key, see the [cookbook](./minimax-code-cookbook.md).

### CLI

Sign in before using MiniMax-hosted models or a Token Plan ([quick-start](https://agent.minimax.io/docs/cli/quick-start)):

```bash
mcode login
```

For a Global account:

```bash
mcode login --region global
```

Sign-in finishes in the browser. Back in the TUI, run `/status`. Configure a custom provider or API key with `mcode provider`.

Mainland China accounts use `mcode login`. Global accounts use `mcode login --region global` ([CLI FAQ](https://agent.minimax.io/docs/cli/faq)). Sign out with `mcode logout`.

WSL / SSH callback steps belong on the [CLI FAQ](https://agent.minimax.io/docs/cli/faq). The callback URL contains a temporary credential. Do not paste it into chat or a repo.

## 5. First desktop task

Source: [Create Your First Task](https://agent.minimax.io/docs/code/get-started/first-task).

1. Start from the home composer or create a new task.
2. Describe the outcome in natural language. Official examples include fixing a bug, building a page, writing a report, or analyzing files.
3. Attach files, pick a workspace, `@` project files, or `/` a skill.
4. Keep adding instructions while it runs. Answer permission prompts when they appear.

Official writing tips: state the outcome, not only the process. For code, state the stack, constraints, and how you will accept the work. If the approach is unclear, ask it to plan first.

To edit an existing repo, attach a workspace first. Official text: after you choose a project directory, the agent can read files, run commands, produce artifacts, and report changes in that directory. Pick only the directory that belongs to the task ([Workspace](https://agent.minimax.io/docs/code/workflows/workspace)).

## 6. First CLI task

```bash
cd /path/to/your/project
mcode
```

Or submit on launch:

```bash
mcode "Inspect the failing tests in this project, fix them, and run the relevant tests to verify the changes"
```

On a new repo, generate project instructions (officially creates or updates `AGENTS.md`):

```bash
mcode init .
```

Include the expected outcome, change boundaries, and validation method ([quick-start](https://agent.minimax.io/docs/cli/quick-start)).

Resume:

```bash
mcode --continue
mcode --session
```

In the TUI, use `/sessions [query]`. The [CLI FAQ](https://agent.minimax.io/docs/cli/faq) says to pass a known session id to `mcode --session`.

<!-- TODO: 待核实 —— the quick-start page repeats `mcode --session` without an id; the FAQ is the source for "known ID". -->

Starter keys (same page):

| Key | Purpose |
|-----|---------|
| `Enter` | Send; extra messages queue while a task runs |
| `Shift+Enter` | New line |
| `@` | Reference a file or directory |
| `Shift+Tab` | Default ↔ Plan Mode |
| `Alt+M` | Ask, Auto, Full access |
| `Esc` | Close a panel or interrupt |

Starter slash commands: `/help`, `/status`, `/model`, `/sessions`, `/context`, `/compact`, `/new`, `/init`, `/quit`. Treat `/help` as the live list.

## 7. Coding mode or Work mode

Desktop only. Official text: they "use the same Agent capabilities" with different UI and tool exposure ([Modes](https://agent.minimax.io/docs/code/workflows/modes)).

| Situation | Mode |
|-----------|------|
| Read or edit a code repo | Coding |
| Need the terminal, browser, or file panels | Coding |
| You care about the deliverable, not the implementation | Work |
| Multi-step work with no local code | Work |

Coding: new features, bug fixes, tests, diffs, web / HTML debugging. Work: docs, research, spreadsheets, writing, office automation.

## 8. Permissions

The desktop app confirms before it ([Permissions](https://agent.minimax.io/docs/code/workflows/permissions)):

- Reads files outside the workspace
- Modifies or deletes files
- Runs commands
- Uses tools with external effects
- Handles actions that arrived through Remote Control or IM

Official advice: stay conservative on a new project; lower the prompt frequency for familiar low-risk repeats; keep a human in the loop for delete, overwrite, upload, and sending messages.

On the CLI, Plan Mode and permission mode are **separate** ([CLI FAQ](https://agent.minimax.io/docs/cli/faq)):

- Plan Mode: execute the next message or plan first. `Shift+Tab` or `/plan`.
- Permission mode: how tools are confirmed. `Alt+M` or `/permission` → Ask, Auto, Full access.

`mcode exec` accepts `--permission` with `ask`, `smart`, `full`, or `off` ([features](https://agent.minimax.io/docs/cli/features)). Do not merge the TUI names and the exec names into one enum.

## 9. Next

- Split hard work: [Cookbook · Agent Team](./minimax-code-cookbook.md)
- Scripts / CI: `mcode exec`
- Editors: `mcode acp` (official Zed snippet)
- Lookup: [cheatsheet](./minimax-code-cheatsheet.md)
