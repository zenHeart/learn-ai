# Gemini Family Cheatsheet

> This is a **lookup** document, not a tutorial. To learn a tool, start from the [learning map](./index); to understand a concept, see the [glossary](./gemini-glossary); to copy a recipe, see the [cookbook](./gemini-cookbook).
>
> This page is the **single authoritative copy** of the Gemini family decision tables, config keys, model status and subscription tiers. Other pages link here instead of duplicating them.

## Contents

- [Which tool](#which-tool)
- [Model status](#model-status)
- [Subscription tiers](#subscription-tiers)
- [Glossary index](#glossary-index)
- [Configuration](#configuration)
- [High-quality sources](#high-quality-sources)
- [Related pages](#related-pages)

## Which tool

> **Since 2026-06-18**: individual / Google AI Pro / Ultra accounts can no longer reach Gemini CLI or the Code Assist IDE extensions via Login with Google. Read those two rows as **Standard / Enterprise or a paid API key**; the individual entry point is [Antigravity](./antigravity). [Official deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals).

### Pick by task

| What I want to do | Use | Why |
|---|---|---|
| Ask about code in the terminal, run scripts, pipe output | [Gemini CLI](./gemini-cli) (enterprise / API key) or [Antigravity](./antigravity) CLI (individual) | CLI has zero prerequisites, `-p` headless mode and `--output-format json`; individual accounts use Antigravity daily |
| Let an agent plan and change a batch of files on its own | [Antigravity](./antigravity) | Desktop + CLI + SDK share one harness, with asynchronous subagents and reviewable artifacts |
| Hand a task to the cloud and come back to a PR | [Jules](./jules) | Clones the repo into a cloud VM, produces a plan for your approval, then opens a PR |
| Complete code, edit one file, do a local refactor in the IDE | [Code Assist](./code-assist) | VS Code / JetBrains / Android Studio extension with local codebase awareness |
| See a clickable prototype right inside the conversation | [Canvas](./canvas) | In-conversation workspace, no local project setup |
| Tune model parameters, test a system prompt, call the API | [AI Studio](./ai-studio) | Direct control over model and parameters; the entry point for API integration |
| Decide which tier to buy and how to cap spend | [Plans and quota](./google-pro) | Quota differences across the 4 tiers plus the Google Cloud credit |

### Antigravity vs Code Assist vs Jules

These three are the easiest to confuse. Separate them by **where it runs, who starts it, how much it changes**:

| Dimension | Antigravity | Code Assist | Jules |
|---|---|---|---|
| Where it runs | Local (desktop / CLI / IDE / SDK) | Inside your local IDE | Cloud VM |
| Who starts it | You, in a live conversation | You, from the editor | You create a task in web or CLI, then leave |
| Deliverable | Changes in your workspace plus artifacts | Completions and edits in the editor | A pull request |
| Concurrency | Asynchronous subagents | Single session | Multiple parallel tasks (cap varies by subscription tier) |
| Editions | One product | Standard / Enterprise (individual free tier stopped 2026-06-18) | One product; quota varies by subscription tier |
| Typical use | Cross-module refactor you want to watch | Single-file completion, local multi-file refactor | Dependency upgrades, tech-debt cleanup, well-bounded standalone tasks |

<!-- TODO: needs verification — whether the official docs state a cap on concurrent subagents in Antigravity. The docs describe the Asynchronous Subagents capability but no official statement gives a number. -->

### Pick by input size

| Input size | Suggestion |
|---|---|
| One file, one error message | Gemini CLI pipe: `... 2>&1 \| gemini -p "analyse this error"` |
| One module, dozens of files | An Antigravity workspace — let it read for itself |
| Whole-repository audit | [AI Studio](./ai-studio); the official plan comparison lists 1,000,000-token extended context for Pro and above |

## Model status

The [official model list](https://ai.google.dev/gemini-api/docs/models) (page states Last updated 2026-08-14) is the source of truth. **This table goes stale fast — re-check the official page before citing a model name.**

### Current stable models (excerpt)

| Model | Positioning (per official description) |
|---|---|
| Gemini 3.7 Flash | Described as the newest and most capable Flash model, aimed at complex coding, agentic workflows and reliable multi-step execution |
| Gemini 3.6 Flash (`gemini-3.6-flash`) | Previous stable Flash |
| Gemini 3.5 Flash | Stable; the docs state it powers all local Antigravity agents |
| Gemini 3.5 Flash-Lite / 3.1 Flash-Lite | Cost-sensitive workloads |
| `gemini-2.5-pro` / `gemini-2.5-flash` / `gemini-2.5-flash-lite` | The 2.5 generation is still listed |
| `antigravity-preview-05-2026` | Described as a general-purpose hosted agent that plans autonomously, executes code, manages files and browses the web in an isolated Linux sandbox |

### Retired (do not put these in docs or examples)

`gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-2.0-flash` and `gemini-2.0-flash-lite` are all marked Shut down in the official Previous models table.

### What the version suffixes mean

| Suffix | Meaning |
|---|---|
| stable | Stable, no breaking changes |
| preview | Preview; deprecation is announced at least two weeks ahead |
| latest (e.g. `gemini-flash-latest`) | Points at the newest version and is hot-swapped; two weeks' email notice before breaking changes |
| experimental | Experimental, can disappear at any time |

> ⚠️ Context windows: the official model list **does not give a per-model context window**. The only citable figure today comes from the plan comparison — 1,000,000-token extended context for Pro and above.
> <!-- TODO: needs verification — per-model context window limits. Not found on the official model list page; the "2 million tokens" figure in earlier revisions had no source and has been removed. -->

## Subscription tiers

From the [official Google AI plans comparison](https://one.google.com/about/google-ai-plans/).

| Dimension | AI Plus | AI Pro | AI Ultra 5x | AI Ultra 20x |
|---|---|---|---|---|
| Storage | 400 GB | 5 TB | 20 TB | 30 TB |
| Model access multiplier (official wording) | 2x | 4x | 5x | 20x |
| Extended context window | not listed | 1,000,000 tokens | 1,000,000 tokens | 1,000,000 tokens |
| Monthly Google Cloud credit (via Google Developer Program) | not listed | US$10 | US$40 | US$100 |
| Antigravity agent request quota | limited | extended | higher | highest |
| Jules tasks / concurrent tasks | increases per tier (official wording is qualitative only) | | | |
| Flow credits per month | 200 | 1,000 | 10,000 | 25,000 |
| Deep Think, Project Genie | ❌ | ❌ | ✅ | ✅ |

Key points:

- **The official table describes Antigravity and Jules quota qualitatively, with no numbers at all.** Do not cite figures like "N tasks per day".
- Coding-related Pro entitlements the official page does list: higher AI Studio / Antigravity / Jules quota, agentic assistance in Android Studio, and the US$10 monthly Google Cloud credit from the Google Developer Program.
- Once you have the Cloud credit, **set a budget first**: GCP console → Billing → Budgets & alerts → create a budget matching the credit and turn on alerts.

<!-- TODO: needs verification — the subscription price of each tier. The official comparison page returns a localised version when scraped and swallows the currency amounts; no official figure was found. The "AI Pro $20/month" in earlier revisions had no source and has been removed. -->

## Glossary index

One line per concept. **The full definition exists only once, in the [glossary](./gemini-glossary)** — this is just a jump table.

| Concept | One line | Detail |
|---|---|---|
| Agent-first | Treats AI as an actor that plans and executes, not a completion engine | [detail](./gemini-glossary#agent-first) |
| Surface | Antigravity's multiple entry points share one agent harness | [detail](./gemini-glossary#surface) |
| Rules | Long-lived behavioural constraints, at global and workspace level | [detail](./gemini-glossary#rules) |
| Skill | A directory containing `SKILL.md`, loaded on demand | [detail](./gemini-glossary#skill) |
| Workflow | A multi-step procedure invoked explicitly as `/name` | [detail](./gemini-glossary#workflow) |
| Subagent | A subordinate agent the main agent dispatches to work in parallel | [detail](./gemini-glossary#subagent) |
| Artifact | A reviewable intermediate product an agent emits | [detail](./gemini-glossary#artifact) |
| Checkpoint | Gemini CLI snapshots before each edit; `/restore` rolls back | [detail](./gemini-glossary#checkpoint) |
| Session | The full record of one conversation; can be listed and resumed | [detail](./gemini-glossary#session) |
| Headless mode | One-shot execution via `-p`, suitable for pipelines | [detail](./gemini-glossary#headless-mode) |
| Trusted folder | In an untrusted directory, project settings and custom commands do not apply | [detail](./gemini-glossary#trusted-folder) |
| MCP | An open protocol that lets agents reach external tools | [detail](./gemini-glossary#mcp) |
| Extension | Gemini CLI's installation unit, commonly used to install MCP servers | [detail](./gemini-glossary#extension) |
| AGENTS.md | The instruction file Jules reads automatically from the repo root | [detail](./gemini-glossary#agents-md) |

## Configuration

### Gemini CLI settings layers

Lowest to highest precedence:

| Layer | Location |
|---|---|
| System defaults | `GEMINI_CLI_SYSTEM_DEFAULTS_PATH`; defaults to Linux `/etc/gemini-cli/system-defaults.json`, Windows `C:\ProgramData\gemini-cli\system-defaults.json`, macOS `/Library/Application Support/GeminiCli/system-defaults.json` |
| User | `~/.gemini/settings.json` |
| Project | `.gemini/settings.json` |
| System overrides (highest) | `GEMINI_CLI_SYSTEM_SETTINGS_PATH`; defaults to Linux `/etc/gemini-cli/settings.json`, Windows `C:\ProgramData\gemini-cli\settings.json`, macOS `/Library/Application Support/GeminiCli/settings.json` |

Config files can reference environment variables as `$VAR_NAME` or `${VAR_NAME}`. The single source of truth for available keys is [settings.schema.json](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json).

### Common settings keys

| Key | Effect |
|---|---|
| `general.checkpointing.enabled` | Enables checkpoints so `/restore` can roll back (off by default) |
| `general.sessionRetention.enabled` | Enables automatic session cleanup (off by default) |
| `general.sessionRetention.maxAge` | Maximum session age, e.g. `"30d"` |
| `general.sessionRetention.maxCount` | Maximum number of sessions kept |
| `general.sessionRetention.minRetention` | Minimum retention period, default `"1d"` |
| `model.maxSessionTurns` | Maximum turns in one session, default `-1` (unlimited) |
| `security.folderTrust.enabled` | Enables folder trust; the trust list lives in `~/.gemini/trustedFolders.json` |

> ⚠️ Earlier revisions of these docs listed `security.allowedCommands`, `security.deniedCommands`, `security.sandboxMode`, `requireBranch`, `allowedBranchPattern` and `codeAssist.agentMode`. **None of these exist in the official schema or docs** and all have been removed. For command allow-listing see the [policy engine](https://geminicli.com/docs/core/policy-engine/).

### Environment variables and prompt files

| Item | Effect |
|---|---|
| `GEMINI_SYSTEM_MD=true` (or `1`) | Enables a custom system prompt read from `.gemini/system.md`; an absolute path also works. While active the UI shows a `\|⌐■_■\|` indicator |
| `.gemini/.env` | Persisted environment variables |
| `GEMINI_CLI=1` | Lets a shell-mode command detect that it is running inside the CLI sandbox |

Put non-negotiable operating rules (safety, tool-use protocol, approval gates) in `system.md`; put role, goals, methodology and project context in `GEMINI.md`.

### Antigravity rules and skills paths

| Item | Location | Notes |
|---|---|---|
| Global rules | `~/.gemini/GEMINI.md` | Applies across all workspaces |
| Workspace rules | `.agents/rules` directory | Travels with the repo |
| Rule length cap | 12,000 characters each | Official limit |
| Rule activation modes | Manual / Always On / Model Decision / Glob | Glob triggers on file patterns |
| Skills | `.agents/skills/<folder>/SKILL.md` or `~/.gemini/config/skills/<folder>/SKILL.md` | **A skill is a directory, not a single md file**; `.agent/skills` is kept only for backward compatibility |
| Skill frontmatter | `description` required, `name` optional | |
| Workflow invocation | `/<workflow-name>` | |
| Cross-reference inside rules | `@filename` | |

### Jules

| Item | Value |
|---|---|
| Install | `npm install -g @google/jules` (binary is `jules`) |
| Repo instruction file | `AGENTS.md` in the repo root, read automatically |
| Auth | Requires a browser to complete Google account authorisation |

Common commands:

```bash
jules                                   # open the interactive TUI board (with side-by-side diff)
jules help
jules version
jules remote --help
jules remote list --repo                # list repositories
jules remote list --session             # list sessions
jules remote new --repo <owner/repo> --session "<task description>"
jules remote new --parallel <number>    # start several tasks in parallel
jules remote pull --session <id>        # pull results locally
jules completion bash                   # generate shell completion
jules --theme dark                      # global option: dark / light
```

> ⚠️ The npm package is `@google/jules`. `@google/jules-tools`, `jules status`, `jules task list`, `jules pr apply`, `jules remote new "<desc>"` (missing `--repo` / `--session`) and `--issue=` appeared in earlier revisions with no official source and have been removed.

## High-quality sources

**Last systematic verification: 2026-08-18.** The tiering below is this document's maintainer ranking by "official?" and "kept in sync with releases?", and is advisory only.

### Tier S: official sources of truth

| Source | Use for |
|---|---|
| [Gemini CLI docs](https://geminicli.com/docs/) | All Gemini CLI commands, config, headless mode, sessions, checkpoints |
| [settings.schema.json](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json) | The source of truth for config keys; updated ahead of the docs |
| [Model and retirement list](https://ai.google.dev/gemini-api/docs/models) | Current models, retired models, version suffix semantics |
| [Antigravity docs](https://antigravity.google/docs/home) | Surfaces, rules, skills, subagents |
| [Antigravity rules/workflows](https://antigravity.google/docs/rules-workflows) | Rule file locations, character cap, activation modes |
| [Antigravity skills](https://antigravity.google/docs/skills) | Skill directory structure and frontmatter |
| [Jules CLI reference](https://jules.google/docs/cli/reference/) | Every Jules CLI command and option |
| [Jules docs](https://jules.google/docs/) | Cloud workflow, `AGENTS.md`, environment setup scripts |
| [Code Assist overview](https://developers.google.com/gemini-code-assist/docs/overview) | Edition differences, supported IDEs, agent mode, enterprise features |
| [Consumer-account deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals) | What stopped on 2026-06-18 for individual / Pro / Ultra Login with Google |
| [Gemini CLI → Antigravity CLI transition](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli) | Consumer migration timeline; enterprise access unchanged |
| [Google AI plans](https://one.google.com/about/google-ai-plans/) | Quota comparison across the four tiers |

### Tier A: official but slower-moving or marketing-oriented

| Source | Use for |
|---|---|
| [gemini-cli repository](https://github.com/google-gemini/gemini-cli) | Issues often document behaviour the docs omit |
| [Gemini CLI release channels](https://geminicli.com/docs/changelogs/) | nightly / preview / stable differences |
| [Gemini CLI extensions](https://geminicli.com/extensions/) | Available extensions |
| [Canvas overview](https://gemini.google/overview/canvas/) | The only official Canvas page; product-level |
| [Gemini API billing](https://ai.google.dev/gemini-api/docs/billing) | Billing model for the API |
| [Long context docs](https://ai.google.dev/gemini-api/docs/long-context) | Guidance for long-context use |

### Tier B: cross-check required

Community tutorials, third-party blogs, videos. Command names in this family change often, so **community content goes stale quickly** — use it for ideas, not for copying commands.

> Watch the domain: `geminicli.com` is the official docs site (linked from `github.com/google-gemini/gemini-cli`). Similar-looking domains are not.

## Related pages

- [Learning map](./index) — where to start and in what order
- [Cookbook](./gemini-cookbook) — recipes by scenario
- [Glossary](./gemini-glossary) — concepts and how they relate
- [Gemini CLI](./gemini-cli) — the main tutorial
