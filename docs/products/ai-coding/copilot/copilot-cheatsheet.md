# Copilot Cheatsheet

> This is a **reference** page — "what is the key, the flag, the plan?" Concepts: [Glossary](./copilot-glossary). First run: [Tutorial](./copilot). Recipes: [Cookbook](./copilot-cookbook).
>
> **Currency**: Copilot ships weekly on the GitHub changelog and monthly with VS Code Stable. Every keybinding, command, and setting on this page was checked against the official lists. **If it is not on the official list, it is not here.** Evidence base: [High-quality sources](#high-quality-sources).

## Term index

One line each; details in the [Glossary](./copilot-glossary):

| Term | One-liner |
|------|-----------|
| [GitHub Copilot](./copilot-glossary#github-copilot) | GitHub's AI coding assistant; many doors, many models |
| [Prompt / PE / Context](./copilot-glossary#prompt--prompt-engineering--context) | Input / how you shape the input / extra information attached |
| [Four surfaces](./copilot-glossary#four-surfaces) | Completion, Chat, CLI, Cloud agent |
| [Ask / Edit / Agent](./copilot-glossary#ask--edit--agent) | Three autonomy levels inside Chat |
| [Chat participant](./copilot-glossary#chat-participant) | `@` prefix; pins the question to a domain |
| [Tools / tool sets](./copilot-glossary#tools--tool-sets) | `#` prefix; capabilities Chat can call |
| [Custom instructions](./copilot-glossary#custom-instructions) | Auto-injected project constraints |
| [Prompt files](./copilot-glossary#prompt-files) | `.prompt.md`; manually invoked reusable tasks |
| [Agent Skills](./copilot-glossary#agent-skills) | Directory with assets; specialized task pack |
| [Plugins](./copilot-glossary#plugins) | Installable pack of agents / skills / hooks — **not** the sunset Extensions |
| [MCP](./copilot-glossary#mcp-model-context-protocol) | Open protocol between AI hosts and external tools |
| [Cloud agent](./copilot-glossary#cloud-agent) | Runs in GitHub's cloud; output is usually a PR |
| [Copilot app](./copilot-glossary#copilot-app) | Desktop shell for parallel agent sessions |
| [Copilot Spaces](./copilot-glossary#copilot-spaces) | Named context pack (repos + files + notes) |
| [Copilot CLI](./copilot-glossary#copilot-cli) | Terminal Copilot agent |
| [GitHub Spark](./copilot-glossary#retired-or-renamed-concepts) | Micro-app builder; closed to new users 2026-08-04 |
| [AI credits](./copilot-glossary#ai-credits-and-quotas) | Usage billing unit |

---

## Surface selection

| Your task | Surface | Why |
|-----------|---------|-----|
| Next line, boilerplate | **Code completion** | Zero cost, zero interrupt |
| "What does this code do?" | **Chat / Ask** | Answer only |
| "Refactor these two files" | **Chat / Edit** | You want the diff |
| "Install deps, run tests, multi-step rewrite" | **Chat / Agent** | Needs commands and iteration |
| "How do I write this shell command?" | **Inline Chat** (`⌘I` in the terminal) or **CLI** | The context is the terminal |
| "A 20-minute mechanical migration" | **Cloud agent** | Does not occupy your machine; output is a PR |
| "Ask about this repo on github.com" | **Copilot Chat on GitHub** | Repo context is already there |
| "Run several agents in parallel, stay out of the IDE" | **Copilot app** | Desktop shell on top of Copilot CLI |
| "Build a micro-app from a prompt" | **Do not start GitHub Spark** | Closed to new users / new apps on 2026-08-04 |

---

## Mode selection

| | Ask | Edit | Agent |
|---|---|---|---|
| Edits files? | No | Yes, only the ones you name | Yes, it chooses |
| Runs commands? | No | No | Yes (you approve) |
| Your checkpoint | None | Accept / discard each diff | Approve tool calls + review the result |
| Signal to pick it | I need to understand first | I know where, I do not want to type | I know the goal, not the process |

> Rule of thumb: **can you tell at a glance that it is wrong?** Yes → lean Agent. No → fall back to Edit or Ask.

---

## Plan comparison

Source: [Plans for GitHub Copilot](https://docs.github.com/en/copilot/get-started/plans) and [Choosing your enterprise plan](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan)

| Plan | Price | What matters |
|------|-------|--------------|
| **Copilot Free** | Free | 2,000 code completions / month; models via auto-selection only |
| **Copilot Pro** | $10 / month | Individual; unlimited completions; Cloud agent; monthly AI credits |
| **Copilot Pro+** | $39 / month | Larger credit allowance; broader model catalog |
| **Copilot Max** | $100 / month | Highest individual credit allowance; priority access to new models |
| **Copilot Business** | $19 / seat / month | **1,900 AI credits / user** (pooled); org policies; Cloud agent |
| **Copilot Enterprise** | $39 / seat / month | **3,900 AI credits / user** (pooled); everything in Business + priority models/features + extra enterprise controls |
| **Students / teachers / OSS maintainers** | Free after verification | Eligibility required |

**Three facts you need:**

1. Paid plans include a pool of **GitHub AI credits**. Per-request "premium request" billing is marked **legacy** on the official plans page.
2. Copilot is **not available on GitHub Enterprise Server**. Enterprise Copilot requires **GitHub Enterprise Cloud**. Owners can assign Enterprise or Business per organization.
3. Official pages recorded two **temporary new-signup pauses**: 2026-04-20 (Pro / Pro+ / Max / Student) and 2026-04-22 (self-serve Business on GitHub Free / Team orgs). Check the live plans page before you treat those pauses as still in force.

Overage on org plans is billed at **$0.01 per AI credit** unless you set a budget.

---

## Keybindings

Source: [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features). macOS keys.

| Scene | Key | Action |
|-------|-----|--------|
| **Completion** | `Tab` | Accept inline suggestion / jump to next edit suggestion |
| | `Escape` | Dismiss the current suggestion |
| **Open Chat** | `⌃⌘I` | Open the Chat view |
| | `⌘I` | Inline Chat (editor or terminal) |
| | `⇧⌥⌘L` | Quick Chat |
| **Inside Chat** | `⌘N` | New Chat session |
| | `⇧⌘I` | Switch the Chat view to an agent |
| | `⌥⌘.` | Model picker |
| **Editor assist** | `F2` | AI-assisted rename |

> Older site docs listed "Shift Tab accept line / `⌘→` accept word / `⌃Enter` show all / `⌥]` `⌥[` cycle suggestions." Those four are **not** on the current official key list and are omitted. Why: [Glossary · Retired concepts](./copilot-glossary).

---

## Chat participants

Invoke with `@`. Same source as above.

| Participant | Role | Example |
|-------------|------|---------|
| `@github` | GitHub context (repos, Issues, PRs) | `@github list recent open bug issues in this repo` |
| `@terminal` | Integrated terminal shell and contents | `@terminal find the largest file in the src directory` |
| `@vscode` | VS Code commands and features | `@vscode how do I change my colors`<br>`@vscode how can I change key bindings`<br>`@vscode tell me how to debug a node.js app` |

Extensions can contribute their own participants; they appear in the same `@` list.

> `@workspace` and `@regex` are not on the official list. See [retired concepts](./copilot-glossary).

---

## Tool sets and file references

Cite with `#`. Citing a **tool set** allows the **tools** under it.

| Tool set | Tools inside |
|----------|--------------|
| `#agent` | `/runSubagent` |
| `#browser` | Browser tools |
| `#changes` | Current source-control changes as context |
| `#edit` | `/createDirectory`, `/createFile`, `/editFiles`, `/editNotebook` |
| `#execute` | `/createAndRunTask`, `/getTerminalOutput`, `/runInTerminal`, `/runNotebookCell`, `/testFailure` |
| `#githubRepo` | Search a named GitHub repo |
| `#githubTextSearch` | GitHub text search |
| `#newWorkspace` | Scaffold a new workspace |
| `#read` | `/getNotebookSummary`, `/problems`, `/readFile`, `/readNotebookCellOutput`, `/terminalLastCommand`, `/terminalSelection` |
| `#search` | `/changes`, `/codebase`, `/fileSearch`, `/listDirectory`, `/textSearch`, `/usages` |
| `#selection` | Current editor selection |
| `#todos` | Todo list |
| `#vscode` | `/askQuestions`, `/extensions`, `/getProjectSetupInfo`, `/installExtension`, `/runCommand`, `/VSCodeAPI` |
| `#web` | `/fetch` |

**Files directly**: `#file:path`, e.g. `#file:gameReducer.js #file:gameInit.js how are these files related`.

MCP tools appear in the same `#` list.

---

## Slash commands (VS Code Chat)

| Command | Action |
|---------|--------|
| `/explain` | Explain the selection |
| `/fix` | Suggest a fix for the selection |
| `/doc` | Generate doc comments |
| `/tests` | Generate tests for the selection |
| `/setupTests` | Help set up a test framework |
| `/fixTestFailure` | Suggest fixes for failing tests |
| `/new` | Scaffold a project / file |
| `/newNotebook` | New Jupyter notebook |
| `/init` | Generate or update workspace Copilot config |
| `/plan` | Produce an implementation plan |
| `/search` | Search the workspace |
| `/debug`, `/startDebugging`, `/troubleshoot` | Debug-related |
| `/clear` | Clear the session |
| `/compact` | Compact session history |
| `/fork` | Fork the session |
| `/agents`, `/hooks`, `/instructions`, `/prompts`, `/skills` | Manage those customizations |
| `/create-agent`, `/create-hook`, `/create-instruction`, `/create-prompt`, `/create-skill` | Create those customizations |
| `/yolo` (`/autoApprove`), `/disableYolo` (`/disableAutoApprove`) | Toggle auto-approve |
| `/<skill name>`, `/<prompt name>` | Run a skill or prompt file |

> `/new-from`, `/runCommand` as a top-level slash command, and `/help` are not on the current official list. See [retired concepts](./copilot-glossary).

---

## Custom instructions

Source: [Custom instructions support matrix](https://docs.github.com/en/copilot/reference/custom-instructions-support)

| Type | Location | Scope |
|------|----------|-------|
| 👤 Personal | GitHub personal settings | All of your projects |
| 📦 Repository | `.github/copilot-instructions.md` | Every conversation in that repo |
| 📂 Path-specific | `.github/instructions/**/*.instructions.md` | Files matching the frontmatter glob |
| 🤖 Agent | `AGENTS.md` (also `CLAUDE.md`, `GEMINI.md`) | Cross-tool agent conventions |
| 🏢 Organization | Org settings | Every repo in the org |

**Copilot CLI personal instructions**: `~/.copilot/copilot-instructions.md` or `~/.copilot/instructions/**/*.instructions.md`.

IDE support (GitHub.com / VS Code / Visual Studio / JetBrains / Eclipse / Xcode / Copilot CLI) is not uniform — use the official matrix.

---

## Prompt files

| Item | Value |
|------|-------|
| Project location | `.github/prompts/*.prompt.md` |
| User location | `.prompt.md` in a VS Code [profile](https://code.visualstudio.com/docs/configure/profiles); settings sync |
| Custom location | `chat.promptFilesLocations` |
| Invoke | `/<filename>` in Chat, with args: `/create-react-form: formName=MyForm` |

Frontmatter and a full example: [Cookbook · Prompt files](./copilot-cookbook).

---

## Common settings

Source: [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

| Key | Role |
|-----|------|
| `chat.promptFilesLocations` | Extra search paths for prompt files (including a Cursor-rules directory) |
| `chat.tools.autoApprove` | Auto-approve tool calls |
| `chat.tools.terminal.autoApprove` | Auto-approve terminal commands (per-command rules allowed) |
| `chat.tools.global.autoApprove` | Global auto-approve |
| `chat.tools.todos.showWidget` | Show the todo widget |
| `chat.math.enabled` | Render math in Chat |
| `mermaid-chat.enabled` | Render Mermaid in Chat |
| `github.copilot.chat.tools.memory.enabled` | Enable the Memory tool |
| `github.copilot.chat.agentDebugLog.enabled` | Agent debug log |
| `workbench.browser.enableChatTools` | Enable browser tools |
| `workbench.settings.showAISearchToggle` | AI search toggle in Settings |
| `search.searchView.semanticSearchBehavior` | Semantic search behavior in Search |

**Permission levels** (Chat tool-approval policy): `Default Approvals` (ask each time) → `Bypass Approvals` → `Autopilot` (preview, fully autonomous).

---

## Copilot CLI

The standalone `copilot` agent (**not** `gh copilot`; difference in the [Glossary](./copilot-glossary)). Sources: [Install](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli) and [CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference). Generally available since [2026-02-25](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/).

### Install

```bash
# npm (Node.js 22+)
npm install -g @github/copilot

# Homebrew
brew install --cask copilot-cli

# Windows
winget install GitHub.Copilot

# Install script (honors PREFIX, VERSION)
curl -fsSL https://gh.io/copilot-install | bash
```

Windows needs PowerShell v6+. If npm skipped install scripts, retry with `npm_config_ignore_scripts=false`.

### Auth

| Method | Notes |
|--------|-------|
| `/login` | Interactive (preferred) |
| `copilot login [--host HOST] [--web-flow] [--device-code]` | CLI login |
| Env vars | Precedence `COPILOT_GITHUB_TOKEN` > `GH_TOKEN` > `GITHUB_TOKEN` |

PATs must be **fine-grained and include "Copilot Requests"**. **Classic `ghp_` PATs are not supported.** Credentials go in the OS keychain; without one they are stored in the clear under `~/.copilot/` (`COPILOT_HOME` moves that directory).

### Commands

| Command | Action |
|---------|--------|
| `copilot` | Interactive session |
| `copilot init` | Init config in the current repo |
| `copilot help [TOPIC]` | Help. TOPIC: `billing`, `commands`, `config`, `environment`, `logging`, `monitoring`, `permissions`, `providers`, `sandbox` |
| `copilot completion SHELL` | Shell completion (`bash` / `zsh` / `fish`) |
| `copilot login` / `copilot logout` | Sign in / out |
| `copilot mcp` | Manage MCP servers |
| `copilot skill` | Manage Agent Skills |
| `copilot plugin` | Manage plugins |
| `copilot plugins list [--kind mcp\|skill\|instruction\|plugin\|lsp] [--scope SCOPE] [--json]` | List installed plugins |
| `copilot plugins enable\|disable\|remove [--plugin\|--mcp\|--skill]` | Enable / disable / remove |
| `copilot update` | Upgrade |
| `copilot version` | Version |

> `--config-dir=DIRECTORY` is deprecated; use `COPILOT_HOME`.

### In-session slash commands

| Command | Action |
|---------|--------|
| `/clear`, `/new`, `/reset` | New session |
| `/compact` | Compact context |
| `/context` | Context usage |
| `/add-dir` | Extra readable directory |
| `/cwd`, `/cd` | Show / change cwd |
| `/model`, `/models` | Show / switch models |
| `/mcp` | MCP servers |
| `/plugins` | Plugins |
| `/agent` | Switch custom agent |
| `/delegate` | Delegate a subtask |
| `/plan` | Plan mode |
| `/autopilot`, `/goal` | Autonomous mode (`--max-ai-credits N`) |
| `/allow-all`, `/yolo` | Allow all operations |
| `/permissions [default\|assisted\|allow-all\|show]`, `/permissions reset` | Permission modes |
| `/sandbox` | Sandbox settings |
| `/diff` | Show the diff |
| `/review` | Code review |
| `/security-review` | Security review |
| `/research` | Research mode |
| `/pr [view\|create\|fix\|auto\|automerge]` | Pull requests |
| `/limits` (`set max-ai-credits`, `unset`) | Credit caps |
| `/session`, `/sessions` | Session management |
| `/resume`, `/continue` | Resume last session |
| `/settings`, `/config` | Settings |

### In-session keys

| Key | Action |
|-----|--------|
| `@ filename` | Cite a file |
| `# number` | Cite a numbered item |
| `! command` / bare `!` | Run a shell command / enter shell mode |
| `?` | Quick help |
| `Shift+Tab` | Cycle standard / plan / autopilot |
| `Shift+Enter`, `Option+Enter`, `Alt+Enter` | Newline without send |
| `Ctrl+Enter`, `Ctrl+Q` | Queue |
| `Esc` | Interrupt |
| `Ctrl+C` | Cancel |
| `Ctrl+D` | Quit |
| `Ctrl+L` | Clear screen |
| `Ctrl+G` | Jump |
| `Ctrl+R` | History search |
| `Ctrl+V`, `Alt+V` | Paste helpers |
| `Ctrl+X` then `/`, `e`, `b`, `o` | Extended actions |
| `Ctrl+Z` | Suspend |
| `Ctrl+F`, `Ctrl+O`, `Ctrl+E`, `Ctrl+T`, `PageUp` / `PageDown` | Timeline |

### Retired `gh copilot`

[Official notice](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli): the Copilot extension for GitHub CLI is **retired**. Use standalone `copilot` instead. The commands below are from this site's old single file, kept only so readers can map old tutorials:

```bash
# Explain a command (retired)
gh copilot explain "sudo apt-get"

# Suggest a command (retired)
gh copilot suggest "Undo the last commit"

# Old aliases (retired)
ghce "sudo apt-get"
ghcs "Undo the last commit"
```

---

## Troubleshooting

| Symptom | Look here first |
|---------|-----------------|
| Weak answers, wrong topic | Relevant files open? `#file:` used? Custom instructions written? |
| Did this suggestion match public code? | [Find matching public code](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code) |
| Generic failures | [Troubleshoot common issues](https://docs.github.com/en/copilot/how-tos/troubleshoot/troubleshoot-common-issues) |
| Agent misbehaves; you want the tool trace | `github.copilot.chat.agentDebugLog.enabled` |
| Debug a prompt file | Play button in the prompt-file editor |
| CLI will not install | Node.js ≥ 22; Windows PowerShell ≥ 6; npm retry `npm_config_ignore_scripts=false` |
| CLI auth fails | Fine-grained PAT with Copilot Requests (classic `ghp_` is rejected) |

---

## High-quality sources

Ranked by trust. **Use this order when you write or fact-check:**

| Source | Use | Cadence |
|--------|-----|---------|
| [GitHub Copilot docs](https://docs.github.com/en/copilot) | Product facts, concepts, how-tos | Continuous |
| [Copilot features](https://docs.github.com/en/copilot/get-started/features) | Official assistive vs agentic surface list | Irregular |
| [About cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) | Cloud agent vs IDE Agent mode | Irregular |
| [About Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | Terminal agent capabilities | With CLI releases |
| [About the Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) | Desktop parallel-agent app | Irregular |
| [VS Code Copilot feature reference](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features) | Keys, slash commands, tool sets, settings | Monthly Stable |
| [Copilot plans](https://docs.github.com/en/copilot/get-started/plans) | Prices, AI credits, availability | Irregular |
| [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) | CLI subcommands, flags, session keys | With CLI releases |
| [Custom instructions support](https://docs.github.com/en/copilot/reference/custom-instructions-support) | Per-IDE support for the five instruction types | Irregular |
| [GitHub Changelog · Copilot](https://github.blog/changelog/label/copilot/) | Launches and sunsets | Several per week |
| [VS Code Release Notes](https://code.visualstudio.com/updates) | Monthly deltas; Copilot lives under Chat | Monthly |
| [GitHub Blog · AI & ML](https://github.blog/ai-and-ml/github-copilot/) | Mechanism essays (retrieval, etc.) | Irregular |
| [GitHub Copilot video series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) | Official videos | Irregular |

**Evidence rule**: Chinese `docs.github.com` is incomplete and lags. `docs.github.com/zh/enterprise-cloud@latest/...` is widely dead. **Cite `docs.github.com/en/copilot/...`.**

---

## Related pages

- [Copilot tutorial](./copilot) — install and first run
- [Cookbook](./copilot-cookbook) — scenario recipes
- [Glossary](./copilot-glossary) — concepts and the retired list
