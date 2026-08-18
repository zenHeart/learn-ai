# Gemini Family Cookbook

> Recipes by scenario. Each one starts from a concrete situation, then says which product to use, how to do it, and where the traps are.
>
> For concept definitions see the [glossary](./gemini-glossary); for commands and config keys see the [cheatsheet](./gemini-cheatsheet). This page does not repeat the cheatsheet tables.

## Contents

- [Everyday development](#everyday-development)
  - [1. Build or type errors, and you want AI to read the log](#_1-build-or-type-errors-and-you-want-ai-to-read-the-log)
  - [2. Wire an AI judgement into a script or CI](#_2-wire-an-ai-judgement-into-a-script-or-ci)
  - [3. The agent broke a batch of files and you want to go back](#_3-the-agent-broke-a-batch-of-files-and-you-want-to-go-back)
  - [4. Resuming the context from yesterday](#_4-resuming-the-context-from-yesterday)
- [Constraining the agent](#constraining-the-agent)
  - [5. You repeat the project conventions every time](#_5-you-repeat-the-project-conventions-every-time)
  - [6. You have a fixed procedure worth reusing](#_6-you-have-a-fixed-procedure-worth-reusing)
  - [7. Separating hard rules from project context](#_7-separating-hard-rules-from-project-context)
- [Extending capability](#extending-capability)
  - [8. Letting the agent query GitHub or drive a browser](#_8-letting-the-agent-query-github-or-drive-a-browser)
  - [9. You cloned an unfamiliar repo and do not want its config applied](#_9-you-cloned-an-unfamiliar-repo-and-do-not-want-its-config-applied)
- [Large tasks](#large-tasks)
  - [10. Dependency upgrades, slow and mechanical](#_10-dependency-upgrades-slow-and-mechanical)
  - [11. Cross-module refactor that needs verification as it goes](#_11-cross-module-refactor-that-needs-verification-as-it-goes)
  - [12. Having AI read the whole repository for an audit](#_12-having-ai-read-the-whole-repository-for-an-audit)
- [Other](#other)
  - [13. A clickable prototype, fast](#_13-a-clickable-prototype-fast)
  - [14. You got Google Cloud credit and worry about overspending](#_14-you-got-google-cloud-credit-and-worry-about-overspending)
  - [15. Your team has data compliance requirements](#_15-your-team-has-data-compliance-requirements)

## Everyday development

### 1. Build or type errors, and you want AI to read the log

**Use**: Gemini CLI headless mode (Standard / Enterprise or an API key). Individual accounts should use the [Antigravity](./antigravity) CLI surface; follow the official Antigravity CLI docs for the pipe syntax.

Do not copy-paste the error into a chat window. Hand over stderr directly:

```bash
# Vite / Webpack build failure
npm run build 2>&1 | gemini -p "analyse the build error, name the root cause and the smallest fix"

# TypeScript emitting dozens of errors at once
npx tsc --noEmit 2>&1 | gemini -p "group these type errors by root cause, most impactful first"

# Failing tests
npm test 2>&1 | gemini -p "are these failures all the same cause?"
```

**Key point**: you must write `2>&1`. Most build tools write errors to stderr, so a bare `|` pipes nothing.

**Do not**: dump the whole `node_modules` log in. Truncate with `tail -100` first — the head and tail are enough to identify a root cause.

### 2. Wire an AI judgement into a script or CI

**Use**: `-p` together with `--output-format json`.

The value of headless mode is not saving one click; it is that `gemini` becomes an ordinary Unix command a script can consume:

```bash
gemini -p "does this diff introduce an obvious security problem?" --output-format json
```

Extract fields from the JSON with `jq`, then decide the exit code.

**Key point**: running AI in a script means non-deterministic output. Make it emit a **structured judgement** (yes/no, a severity level) rather than free text you then regex.

**Do not**: let an agent auto-edit code in CI and merge straight away. AI in CI should only produce information; leave the edits to a product that produces a pull request, like [Jules](#_10-dependency-upgrades-slow-and-mechanical), so human review stays in the loop.

### 3. The agent broke a batch of files and you want to go back

**Use**: Gemini CLI checkpoints. **Off by default, so turn them on first**:

```json
// ~/.gemini/settings.json or a project-local .gemini/settings.json
{
  "general": {
    "checkpointing": {
      "enabled": true
    }
  }
}
```

Once enabled, the CLI snapshots before each file modification and `/restore` rolls back.

**Key point**: checkpoints and Git do not solve the same problem. `git checkout .` also throws away the edits you made by hand; a checkpoint has the granularity of "just before the agent touched anything". You want both.

**Do not**: skip commits because checkpointing is on. A checkpoint is short-term undo, not history.

### 4. Resuming the context from yesterday

**Use**: Gemini CLI sessions. Sessions are kept indefinitely by default.

They pile up over time, so let configuration clean them:

```json
{
  "general": {
    "sessionRetention": {
      "enabled": true,
      "maxAge": "30d",
      "maxCount": 50
    }
  }
}
```

`minRetention` defaults to `"1d"` and is the floor that stops very recent sessions from being deleted.

Resume with `gemini --resume` (latest), `gemini --resume 2` (index) or `gemini --resume <id>`. Official: [Session management](https://geminicli.com/docs/cli/session-management/).

**Key point**: resuming a session restores the **conversation**, not the **files**. Code state comes from Git or [checkpoints](#_3-the-agent-broke-a-batch-of-files-and-you-want-to-go-back).

## Constraining the agent

### 5. You repeat the project conventions every time

**Use**: put the invariants in a rules file instead of restating them.

Which file depends on which product — the three are not interchangeable:

| Product | Where to write it |
|---|---|
| Gemini CLI | `GEMINI.md` |
| Antigravity | global `~/.gemini/GEMINI.md`, workspace `.agents/rules` directory |
| Jules | `AGENTS.md` at the repository root |

Antigravity workspace rules support four activation modes (Manual / Always On / Model Decision / Glob). **Prefer Glob**: let "React component conventions" load only when the path matches `src/**/*.tsx` instead of sitting in context permanently as Always On.

**Key point**: the limit is 12,000 characters per rule file. When you hit it, split the file and cross-reference with `@filename` rather than compressing the wording.

**Do not**: paste your whole coding standard in. Rules should only carry the few things **the agent actually gets wrong**. It already knows to write semicolons.

### 6. You have a fixed procedure worth reusing

**Use**: a skill (the model decides when to apply it) or a workflow (you trigger it explicitly).

A skill is a **directory**, not a single file:

```
.agents/skills/release-flow/
└── SKILL.md          # description required in the frontmatter, name optional
```

Because it is a directory, you can ship scripts, templates and sample data next to `SKILL.md` and reference them from it.

Workflows are invoked as `/<workflow-name>`.

**How to choose**: want the model to judge whether it applies? Write a skill, and phrase `description` as a trigger condition ("when a release needs cutting…") rather than a title ("release process"). Want to pick the moment yourself? Write a workflow.

**Do not**: write a flat `.agents/skills/release-flow.md`; that is not recognised as a skill. `.agent/skills` (singular) exists only for backward compatibility — use `.agents/skills` for anything new.

### 7. Separating hard rules from project context

**Use**: the division of labour between `system.md` and `GEMINI.md` in Gemini CLI.

```bash
export GEMINI_SYSTEM_MD=true        # once enabled, .gemini/system.md is read
```

You can also point it at an absolute path elsewhere. When it is active the UI shows a `|⌐■_■|` indicator — **seeing that marker means the system prompt has been replaced**, which is the first thing to check when behaviour looks off.

The split:

- `.gemini/system.md`: non-negotiable operating rules — safety boundaries, tool-use protocol, approval mechanics
- `GEMINI.md`: role, goals, methodology, project context

**Key point**: `system.md` **replaces** the default system prompt rather than appending to it. Write too little and the CLI loses its built-in tool-use protocol, which makes it worse, not better.

## Extending capability

### 8. Letting the agent query GitHub or drive a browser

**Use**: MCP, installed through an extension in Gemini CLI:

```bash
gemini extensions install https://github.com/github/github-mcp-server
```

Available extensions are listed in the [official gallery](https://geminicli.com/extensions/).

**Key point**: the repository URL must **include the organisation name**. `https://github.com/github-mcp-server`, which omits it, cannot install — that wrong form appeared in older docs.

**Credentials**: MCP servers often need a token. Put it in an environment variable or `.gemini/.env`, and make sure `.gemini/.env` is in `.gitignore`.

**Do not**: type the token as a command-line argument. It lands in shell history and shows up in the process list.

### 9. You cloned an unfamiliar repo and do not want its config applied

**Use**: folder trust.

```json
{
  "security": {
    "folderTrust": {
      "enabled": true
    }
  }
}
```

With this on, project-level settings and custom commands in untrusted directories do not take effect. The trust list lives in `~/.gemini/trustedFolders.json`.

**Why it matters**: `.gemini/settings.json` and custom commands travel with the repository. Starting an agent inside an unfamiliar repo means someone else's configuration runs first.

**Key point**: trust governs **whose configuration is loaded**, not **what execution can reach**. The latter is the sandbox's job; do not conflate the two.

> ⚠️ Older docs contained the config keys `security.allowedCommands`, `security.deniedCommands`, `security.sandboxMode`, `requireBranch` and `allowedBranchPattern`. None of them exist in the [official schema](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json). For command allowlisting, see the [policy engine](https://geminicli.com/docs/core/policy-engine/).

## Large tasks

### 10. Dependency upgrades, slow and mechanical

**Use**: [Jules](./jules). It clones and executes the repo in a cloud VM, produces a plan for your approval first, and ends with a pull request.

```bash
npm install -g @google/jules
jules                                   # interactive board, includes side-by-side diffs
jules remote new --repo <owner/repo> --session "upgrade React to 19 and fix the breaking changes"
jules remote list --session             # check progress
jules remote pull --session <id>        # pull the result locally
```

**Write `AGENTS.md` first**: Jules is not sitting next to you, so it needs to know up front how to install dependencies, how to run tests, and which directories are off limits. Skip this and the output quality drops noticeably.

**The parallelism trap**: `jules remote new --parallel <number>` runs several tasks at once, but **tasks touching the same files collide**. Split work along directory or module boundaries, not by "these feel convenient together".

**Do not**: the npm package is `@google/jules`. The `@google/jules-tools` package and the `jules status`, `jules task list`, `jules pr apply` and `--issue=` forms seen in older docs do not exist.

### 11. Cross-module refactor that needs verification as it goes

**Use**: [Antigravity](./antigravity).

The reason is that two of its mechanisms map onto exactly this kind of risk: **artifacts** let you read the plan before it starts, and **asynchronous subagents** let it read several modules in parallel without blowing out a single context window.

**How**: have it emit a plan artifact → read it and veto the parts pointing the wrong way → then let it execute → use its verification record to decide how much to trust the result.

**Key point**: concurrency means changes arrive from several directions. Make sure the workspace is clean before you start, or you will not be able to tell afterwards which change came from where.

**Picking an entry point**: desktop suits interactive exploration, the CLI slots into existing scripts, the SDK embeds in your own automation. Rules and skills are shared across surfaces, so there is nothing to reconfigure.

### 12. Having AI read the whole repository for an audit

**Use**: [AI Studio](./ai-studio), where you control the model and its parameters directly.

The only context figure quotable from the official subscription comparison is: **1,000,000-token extended context for Pro and above**.

<!-- TODO: needs verification — the context window ceiling of any specific model. The official model list page does not enumerate context windows per model; the "2 million tokens" figure in older docs had no source. -->

**How**:

1. Feed only **source code and type definitions**; exclude `node_modules`, `dist`, lock files and build output
2. Phrase the question as an enumerable checklist ("find every place that manipulates the DOM directly") instead of an open-ended "review the code quality"
3. Ask one class of question at a time. Mixing them makes every answer shallow

**Key point**: a long context does not mean uniform attention. Content at the beginning and end is used better than the middle, so put the most important constraints and questions at both ends.

**Lower the temperature**: an audit wants stable reproducibility, not creativity.

## Other

### 13. A clickable prototype, fast

**Use**: [Canvas](./canvas), which gives you a workspace inside the conversation with no local project to set up.

**Go in layers, do not ask for everything at once**:

```
Layer 1: DOM structure + basic interaction   → confirm the logic is on track
Layer 2: apply the design system             → keep the code tidy
Layer 3: move into a real project for types
         and tests                           → this step leaves Canvas
```

**Key point**: Canvas output is a prototype. Treat it as the fastest path to validating an idea, not as a source of production code.

**Do not**: ask it for a full-size application with complete business logic in one shot. Once the feedback loop gets long, you lose the information about which step went wrong.

### 14. You got Google Cloud credit and worry about overspending

The Google AI Pro tier provides US$10/month of Google Cloud credit through the Google Developer Program (Ultra 5x gets US$40, Ultra 20x gets US$100).

**The first thing to do is set a budget, not start calling APIs**:

1. GCP console → Billing → Budgets & alerts
2. Create a budget matching the credit amount
3. Turn on alerts (50% / 90% / 100% is a reasonable set)

**Key point**: credit is money you were given, **not a hard cap**. Anything beyond it bills normally to your attached payment method.

**Do not**: run batch scripts without a budget in place. A single long-context call costs far more than an interactive exchange.

### 15. Your team has data compliance requirements

**Use**: the enterprise editions of [Code Assist](./code-assist). It is the one product in the family whose primary selling point is compliance — the official opening addresses "organizations with strict data security and compliance requirements", and it explicitly offers VPC Service Controls and IP indemnification.

**Editions**: Standard / Enterprise (the individual free tier stopped on 2026-06-18), supporting VS Code / JetBrains / Android Studio.

**Key point**: the compliance capabilities are attached to the **edition**, not to your personal subscription. A personal AI Pro subscription does not turn Code Assist into the enterprise product.

> ⚠️ Older docs contained a `codeAssist.agentMode` configuration block (with `enabled` / `autoApprove` / `requireSpecConfirmation`). Code Assist does have an agent mode, but **that JSON key does not exist in the official documentation** — follow the official docs for how to enable it.

## Related pages

- [Cheatsheet](./gemini-cheatsheet) — commands, config keys, model status, subscription tiers
- [Glossary](./gemini-glossary) — concept definitions and how they relate
- [Learning map](./index) — what to learn in what order
