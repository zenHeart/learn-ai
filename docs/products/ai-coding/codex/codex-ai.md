# The Codex Product Line

> Codex is not one program. It is one agent reachable through four surfaces, sharing one configuration. This page maps the surfaces and explains what each is for — read it before deciding where a given task belongs.
>
> Concept definitions live in the [Glossary](./codex-glossary); this page is about product shape.

## What Codex is

From the official documentation:

> Codex is OpenAI's coding agent for software development.

The word that matters is *agent*. A completion tool suggests the next line; an agent reads your files, runs your commands, and iterates on the result. That difference drives everything else on this page — the sandbox, the approval policy, and the trust model all exist because Codex acts rather than suggests.

The documented capabilities are five:

| Capability | What it means in practice |
| --- | --- |
| **Write code** | Matches your intent and adapts to the existing project structure and conventions |
| **Understand unfamiliar codebases** | Reads and explains code it has never seen before |
| **Review code** | Finds potential bugs, logic errors, and unhandled edge cases |
| **Debug and fix problems** | Traces failures, diagnoses root causes, applies targeted fixes |
| **Automate development tasks** | Refactoring, testing, migrations, project setup |

## Four surfaces, one configuration

```
                    ┌──────────────────────────────┐
                    │   ~/.codex/config.toml       │
                    │   AGENTS.md · Rules          │
                    │   MCP · Skills · Hooks       │
                    └───────────┬──────────────────┘
                                │  same configuration
        ┌───────────────┬───────┴───────┬───────────────┐
        │               │               │               │
   ┌────▼────┐    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
   │   CLI   │    │    IDE    │   │  Desktop  │   │   Cloud   │
   │ `codex` │    │ extension │   │    app    │   │  / Web    │
   └─────────┘    └───────────┘   └───────────┘   └───────────┘
   terminal        in-editor       GUI, local      remote,
   scriptable      context         browser, etc.   parallel
```

That shared configuration is the point. An `AGENTS.md` you write for the CLI governs the IDE extension too. A sandbox mode you set applies everywhere. You learn the model once.

### CLI

The terminal surface, and the one this tutorial focuses on. It is the only surface that is fully scriptable, which makes it the surface for automation.

```bash
codex                                    # interactive
codex exec "run the tests and fix failures"    # one-shot, non-interactive
```

Choose the CLI when the task is scriptable, when you are already in a terminal, or when it needs to run in CI.

Reference: [CLI documentation](https://learn.chatgpt.com/docs/codex/cli)

### IDE extension

Runs inside your editor, with the editor's notion of what file and selection you are looking at.

Choose the IDE extension when the task is anchored to code you are currently reading — the editor already knows the context you would otherwise have to describe.

Reference: [IDE Extension documentation](https://learn.chatgpt.com/docs/codex/ide) · this guide’s [IDE tutorial](./codex-ide)

### Desktop app

On 2026-07-09 the standalone Codex app merged into the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app). Updating the old Codex app leaves Chat, Work, and Codex in one window. You can still default to the Codex view and keep the Codex icon.

The graphical surface has what the terminal does not: an in-app browser, worktrees, local environments, a PR sidebar, multi-repo projects, Computer Use. Choose desktop Codex when a browser belongs in the loop or you want several tasks visible — and do not confuse it with [ChatGPT Work](./chatgpt-work). Work hides Git / shell detail and has no PR pane.

### Cloud, web, and hosted review {#cloud-web-and-hosted-review}

Runs the agent on OpenAI's infrastructure against a configured environment rather than your laptop. Product entry: [chatgpt.com/codex](https://chatgpt.com/codex). Docs: [Codex cloud](https://learn.chatgpt.com/docs/cloud). Tutorial: [Codex Cloud](./codex-cloud). Phone control of a **local** host is [Remote](./codex-remote), not Cloud.

```bash
codex cloud                                            # browse environments (Ctrl+O reveals IDs)
codex cloud exec --env <ENV_ID> "run the migration dry run"
codex cloud exec --env <ENV_ID> --attempts 3 "..."     # 1-4 attempts
```

Official “use Cloud when…” list:

- The job should run in the background without tying up the laptop
- You want several attempts in parallel
- The work starts in **GitHub, Linear, or Slack**
- You are away from the development machine and only have the web UI or CLI

Setup: sign in → connect GitHub → create an environment in [environment settings](https://chatgpt.com/codex/settings/environments) → start a task → review the summary and diff → open a PR if it is ready. Environment details: [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment).

**Hosted review is not a fourth product.** It is Cloud / web review:

| Surface | What it does | Source |
| --- | --- | --- |
| Local `/review` | Base-branch or uncommitted diff; does not change the tree | CLI / IDE / desktop |
| Codex cloud code review / QA | Review and QA in the hosted environment | [What's new](https://learn.chatgpt.com/docs/whats-new) (week of 2026-07-27): **GPT-5.6 Sol** for eligible customers; Cloud **selects the model automatically**; Terra / Luna remain on local and web surfaces |
| Codex Security Review | PR changes plus repo context and threat model; auto on open/push or `@codex security review` | Research preview; Enterprise / Business / Edu / Pro; **not Plus** |

Do not give hosted review its own page: it is a Cloud workflow. Config and quota still come from the plan and the cloud environment.

> Documentation pages use a `?surface=cli|app|ide` selector. If a page seems to describe features you don't have, check which surface is selected.

## How a run actually proceeds

Understanding the sequence explains most surprising behavior.

```
1. Build the instruction chain
   global AGENTS.md → project AGENTS.md chain (root → cwd)
   Rebuilt every run. No cache.
        │
2. Load configuration layers
   ~/.codex/config.toml → profile → trusted project .codex/ → CLI flags
        │
3. Read the prompt, plan
        │
4. Act: read files, run commands, call MCP tools
   Every action filtered through: sandbox_mode → approval_policy → hooks
        │
5. Report, and iterate if verification failed
```

Three consequences worth internalizing:

- **Instruction files are re-read every run**, so editing `AGENTS.md` takes effect on the next invocation with nothing to flush.
- **Project configuration only loads for trusted projects.** If `.codex/config.toml` seems inert, that is the first thing to check.
- **The sandbox is checked before the approval policy.** A read-only sandbox cannot be talked into writing, no matter how the approval policy is set.

## Where Codex sits among coding tools

| | Completion tools | IDE-integrated agents | Terminal agents |
| --- | --- | --- | --- |
| **Unit of work** | Next few lines | A file or selection | A task across files |
| **Runs commands** | No | Sometimes | Yes |
| **Scriptable / CI** | No | Rarely | Yes |
| **You review** | Each suggestion | Each edit | The resulting diff |
| **Examples** | Copilot completions | Cursor, Copilot agent mode | **Codex CLI**, Claude Code |

Codex spans more than one column — the IDE extension sits in the middle, the CLI in the right — but the CLI is where its distinctive capabilities live: non-interactive execution, sandbox modes, subagents, and cloud offload.

Practical selection guidance:

- **Typing code yourself and want it faster** → a completion tool
- **Changing code you're currently reading** → IDE extension
- **A task described in a sentence, spanning several files** → Codex CLI
- **Something that must run without a human present** → `codex exec`
- **Deep in the OpenAI ecosystem already** → Codex, since access comes with your ChatGPT plan

## The extension surface

Codex is extended at five distinct points. Knowing which one to reach for is most of the skill.

| Point | Nature | Use when |
| --- | --- | --- |
| **AGENTS.md** | Natural-language briefing | You can state it in prose |
| **Rules** | Structured constraint | It must be enforceable, not advisory |
| **MCP** | External tools and data | The agent needs to reach outside the machine |
| **Skills** | Packaged workflow | A procedure repeats and is worth naming |
| **Hooks** | Command on a lifecycle event | It must happen deterministically |
| **Subagents** | Delegated agent | A sub-task deserves its own context |
| **Plugins** | Distribution bundle | More than one person needs the above |

The load-bearing distinction: **`AGENTS.md` is advice the model may weigh against other instructions; a hook is mechanism that runs regardless.** If a step must not be skipped, it is a hook.

Hook events: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`. Only command hooks execute today — prompt and agent hooks are parsed but skipped.

See [Choosing an extension point](./codex-cookbook#part-8-choosing-an-extension-point) for the decision rules.

## Security model

Three layers, checked in order, and the first one is mechanical rather than advisory.

**Sandbox** — `read-only`, `workspace-write`, or `danger-full-access`. This is a hard boundary on file and network access. `workspace-write` is the everyday default; `read-only` is what makes an adversarial review session trustworthy.

**Approval policy** — `untrusted`, `on-request`, `never`, or a granular table. This controls whether Codex pauses to ask before acting. In the TUI these appear as `Auto`, `Read-only`, and `Full Access` via `/permissions`.

**Project trust** — `projects.<path>.trust_level`. An untrusted project's `.codex/` layers are not loaded at all: no project config, no project hooks, no project rules. This is the layer that protects you when you clone a repository you have not read.

> `--yolo` sets full access and also switches web search to live. It is a real flag and it exists for a reason, but it disables the layer that would otherwise contain a mistake. Reach for `--ask-for-approval never` with a normal sandbox first — it stops the prompting without removing the boundary.

## Models

```toml
model = "gpt-5.6"
model_reasoning_effort = "medium"    # minimal | low | medium | high | xhigh
model_reasoning_summary = "auto"     # auto | concise | detailed | none
model_verbosity = "medium"           # low | medium | high
review_model = "gpt-5.6"
```

`gpt-5.6` is the model named in the current [config basics](https://learn.chatgpt.com/docs/config-file/config-basic) example. The 5.6 family on the pricing page is Sol / Terra / Luna. ChatGPT Pro additionally has `GPT-5.3-Codex-Spark` as a research preview. `model_reasoning_effort` applies to the Responses API. Model names change; check [Models](https://learn.chatgpt.com/docs/models) rather than trusting any tutorial including this one.

`review_model` lets a review run use a different model from the writing run — useful if you want a stronger model doing the critique.

The authoritative list is [Models](https://learn.chatgpt.com/docs/models). Model names change; check there rather than trusting any tutorial including this one.

## Capabilities and limits

**Reliable at:** reading unfamiliar code, mechanical multi-file changes, writing tests against a stated contract, tracing a failure from a reproduction command, translating between conventions.

**Needs supervision for:** architectural decisions with long-lived consequences, anything where "correct" depends on business context not in the repository, performance work requiring real measurement, security-sensitive changes.

**Structurally cannot do:** know things absent from your repository and its instruction files, verify anything it cannot run, or be sure a change is safe without a test that proves it.

The last point is the practical one. Almost every disappointing Codex session traces back to accepting a change that was never executed. The fix is one sentence in the prompt: *run the tests and show me the output.*

## Related pages

- [Learning Map](./) — family tree and decision tree
- [Codex CLI](./codex-cli) — installation and core features
- [ChatGPT Work](./chatgpt-work) — knowledge-work agent (not Codex)
- [ChatGPT Plans and Codex Access](./chatgpt-plus) — how access works
- [Project Integration](./integration) — wiring Codex into a real project
- [Codex Cookbook](./codex-cookbook) — task recipes
- [Codex Glossary](./codex-glossary) — concept definitions
- [Codex Cheatsheet](./codex-cheatsheet) — quick lookup

## Official sources

- [Codex documentation](https://learn.chatgpt.com/docs)
- [CLI](https://learn.chatgpt.com/docs/codex/cli) · [IDE](https://learn.chatgpt.com/docs/codex/ide) · [App](https://learn.chatgpt.com/docs/app)
- [Codex cloud](https://learn.chatgpt.com/docs/cloud) · [Code review](https://learn.chatgpt.com/docs/code-review)
- [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) · [Permissions](https://learn.chatgpt.com/docs/permissions)
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Models](https://learn.chatgpt.com/docs/models) · [Feature Maturity](https://learn.chatgpt.com/docs/feature-maturity)
- [What's new](https://learn.chatgpt.com/docs/whats-new)
