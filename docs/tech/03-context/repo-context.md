---
title: Repo Context
description: "The README for coding assistants: AGENTS.md format and conventions, global/project/directory layering with nearest-wins, and the host-injection mechanism — commands must actually run, because assistants execute them as written."
domain: tech
tags: [context, repo-context, agents-md, coding-assistant]
navOrder: 35
topicId: repo-context
layer: "3"
status: canonical
nodeType: contract
owner: learn-ai
externalOwners: []
prerequisites: [context]
next: [acp-agent-client]
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

# Repo Context

> **Group**: Context group ｜ **Previous group exit**: design multi-source context assembly with priorities ｜ **This topic exit**: land an AGENTS.md with real commands and correct layering for your repo, and explain how it enters every turn's context
> **Prerequisites**: [Context Engineering](context-engineering.md) ｜ **Next**: [ACP: the editor-agent boundary](../07-interoperability/acp-agent-client.md)

## 1. Overview

**Bottom line**: switch coding assistants and dependencies get mis-installed, test commands mis-run — that is not a model problem, it is **missing repo-level context**. `AGENTS.md` is the README for coding assistants: which package manager installs, how tests run, which directories are off-limits. Its place in the context system is precise: **a stable source injected by the host (editor / CLI) at session start**, entering the source taxonomy of [context-engineering](context-engineering.md) and consuming budget from [context-window](context-window.md).

### Mental model: the layering chain

```text
Global rules (user-level, cross-repo)     <- personal preferences: language, style
   ↓ overridden
Repo-root AGENTS.md                       <- team conventions: package manager, test commands, no-go zones
   ↓ overridden (nearest wins)
Subdirectory AGENTS.md (monorepo nesting) <- per-package exceptions, e.g. "this package uses npm"
   ↓ overridden (highest priority)
In-chat instruction                       <- "this one task's" details, overrides everything
```

A rule has one body of text; on conflict, **the AGENTS.md nearest the file being edited wins**, and the user's in-chat instruction overrides everything.

### When to use / when not to

| | |
|---|---|
| **Audience** | Developers and teams using Cursor / Claude Code / Codex / Copilot and other coding assistants |
| **When to use** | Any repo opened by multiple assistants or multiple people — especially with special commands or no-go zones |
| **When not to use** | This-task details (they go in chat, not AGENTS.md); long human-oriented docs (that is README) |
| **Not this page** | The overall model of sources and priorities → [context-engineering](context-engineering.md); how hosts carry editor state (open files, selections) → [ACP](../07-interoperability/acp-agent-client.md) |

### Decision table: where a rule belongs

| Where | Direction | Control | State | Trust domain | Min complexity |
|---|---|---|---|---|---|
| Repo-root AGENTS.md | Host-injected | Repo maintainers | Evolves with repo | Version control (diffable, reviewable) | One text file |
| Subdirectory AGENTS.md | Host-injected, nearest | Package owner | Evolves with subtree | Version control | + layering rules |
| README | Human-read | Repo maintainers | Evolves with repo | Version control | Usually exists |
| In-chat | Typed | Current user | One-off | Session | Zero |
| User-level global rules | Host-injected | Personal | Cross-repo | Local config | Never enters version control |

**Version milestones**: the AGENTS.md format is defined by [agents.md](https://agents.md/) (hosted by the Agentic AI Foundation / Linux Foundation) and read by Cursor, Codex, GitHub Copilot, Gemini CLI, Claude Code, and others (retrieved 2026-09-01, site returned 200). Each tool's precedence rules follow its own product docs.

## 2. Usage

### Minimal hands-on: a minimal AGENTS.md parser (zero key)

15 minutes, Node 22 LTS. Demonstrates three things: **recommended-structure lint** (a missing section is caught), **layered merge** (nearest wins; the same key resolves to the later layer), and a negative case showing the per-package exception **ignored without layered merge**. Note: the agents.md spec itself has **no required fields** (it is plain Markdown); this fixture lints "this repo's recommended structure", not the spec.

**Setup**: save as `repo-context.ts`, run `npx tsx@4 repo-context.ts`.

```ts
// fixture: minimal AGENTS.md parser — recommended-structure lint + layered merge (nearest wins)
// Note: the agents.md spec has no required fields; this lints a recommended structure, not the spec
interface Rule {
  key: string
  value: string
  section: string
  source: string // which layer's file stated it
}

function parseAgentsMd(name: string, text: string): Rule[] {
  const rules: Rule[] = []
  let section = ''
  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) section = line.slice(3).trim()
    const match = /^- ([^:]+):\s*(.+)$/.exec(line)
    if (match) rules.push({ key: match[1].trim(), value: match[2].trim(), section, source: name })
  }
  return rules
}

// Recommended structure: Setup / Testing / Constraints each appear at least once
function lintAgentsMd(text: string): string[] {
  const issues: string[] = []
  for (const need of ['Setup', 'Testing', 'Constraints']) {
    if (!text.split('\n').some((l) => l.trim() === `## ${need}`)) {
      issues.push(`missing recommended section: ## ${need}`)
    }
  }
  return issues
}

// Layered merge: later layers (nearer the file being edited) override earlier ones
function mergeLayers(...layers: Rule[][]): Rule[] {
  const merged = new Map<string, Rule>()
  for (const layer of layers) {
    for (const rule of layer) merged.set(rule.key, rule) // same key: nearest wins
  }
  return [...merged.values()]
}

const repoRoot = `# AGENTS.md

## Setup
- package manager: pnpm (npm install is forbidden at the repo root)
- node: >= 22 LTS

## Testing
- unit tests: pnpm test
- docs build: pnpm docs:build

## Constraints
- commit language: English
- do-not-touch: docs/.vitepress/dist
`

const webPkg = `# AGENTS.md (packages/web)

## Setup
- package manager: npm (this package ships independently; documented exception to the repo root)

## Constraints
- framework: React 18 only
`

const broken = `# AGENTS.md

## Setup
- package manager: pnpm

## Constraints
- commit language: English
`

console.log('--- Lint: the repo-root sample passes the recommended structure ---')
console.log('repoRoot issues:', lintAgentsMd(repoRoot))

console.log('\n--- Lint: the missing Testing section is caught ---')
console.log('broken issues  :', lintAgentsMd(broken))

console.log('\n--- Merge: repo root + packages/web, nearest wins ---')
const effective = mergeLayers(parseAgentsMd('repo-root', repoRoot), parseAgentsMd('packages/web', webPkg))
for (const r of effective) {
  console.log(`  ${r.key}: ${r.value}  <- ${r.source}`)
}

console.log('\n--- Negative: without layered merge, the assistant runs pnpm inside packages/web ---')
const flat = parseAgentsMd('repo-root', repoRoot)
const pm = flat.find((r) => r.key === 'package manager')
console.log(`  with only the repo root, "package manager" = ${pm?.value}; the packages/web exception is ignored`)
```

**Normal output**:

```text
--- Lint: the repo-root sample passes the recommended structure ---
repoRoot issues: []

--- Lint: the missing Testing section is caught ---
broken issues  : [ 'missing recommended section: ## Testing' ]

--- Merge: repo root + packages/web, nearest wins ---
  package manager: npm (this package ships independently; documented exception to the repo root)  <- packages/web
  node: >= 22 LTS  <- repo-root
  unit tests: pnpm test  <- repo-root
  docs build: pnpm docs:build  <- repo-root
  commit language: English  <- repo-root
  do-not-touch: docs/.vitepress/dist  <- repo-root
  framework: React 18 only  <- packages/web
```

**Negative output** (without layered merge, the per-package exception is ignored — the assistant runs `pnpm` inside `packages/web`):

```text
--- Negative: without layered merge, the assistant runs pnpm inside packages/web ---
  with only the repo root, "package manager" = pnpm (npm install is forbidden at the repo root); the packages/web exception is ignored
```

**Acceptance command**:

```bash
npx tsx@4 repo-context.ts && echo AGENTS-MD-OK
```

**Cleanup**: delete temporary files.

### Scenario table

| Scenario | Input | Action | Output | Fits | Does not fit |
|---|---|---|---|---|---|
| Basic: single-repo lint | repo-root AGENTS.md | `lintAgentsMd` | recommended sections present | Any repo onboarding assistants | Toy repos with no special commands |
| Common: monorepo nesting | repo root + one package file | `mergeLayers` (nearest wins) | the effective ruleset | Mixed pnpm/npm, multi-framework repos | Single-package repos |
| Combined: CI validation | AGENTS.md changes | fixture in CI: lint + command dry-run | fake commands never reach main | Team collaboration | Personal repos (optional) |

## 3. Principles

### The mechanism: host injection, not model magic

The model does not "automatically know" AGENTS.md: the **host** (Cursor, Claude Code, etc.) reads the file at session start and assembles it into the system / opening context. In the source model it is therefore a **stable source**: unchanged within a session, evolving across sessions with the repo. Two direct corollaries:

1. It consumes window budget — the longer it is written, the less room for the task (see [context-window](context-window.md)).
2. It is part of the stable prefix — this-task details do not belong in it, or they break prefix stability and hurt caching (see I3 in [context-engineering](context-engineering.md)).

### Nearest wins and the override chain

Conflict resolution (agents.md convention, retrieved 2026-09-01): **the AGENTS.md nearest the file being edited wins**; the user's in-chat instruction overrides everything. This is "one rule, one owner" in essence: the repo root states defaults, subdirectories state exceptions, and exceptions do not copy the default's body. Each tool's read depth and precedence follow its product docs.

### Command truthfulness: assistants execute as written

The commands in AGENTS.md are not documentation decoration — assistants **faithfully execute** the install and check commands you list. False commands have real costs (running `npm install` at this repo's root is exactly that failure: version mismatch, lockfile conflicts). So the discipline is: **run every command once before writing it in**. This repo's root `AGENTS.md` / `CLAUDE.md` is the live sample.

### The editor boundary

The host injects more than AGENTS.md: open files, selections, and terminal state all ride the "editor → model" channel — how that boundary is standardized → [ACP: the editor-agent boundary](../07-interoperability/acp-agent-client.md).

### Spec claims vs local measurement

| Official / spec claim | Our fixture / practice |
|---|---|
| No required fields (plain Markdown) | The fixture's lint is this repo's recommended structure, not a spec check |
| Nearest wins on conflict | `mergeLayers`: later layers override earlier ones; same key, nearest wins |
| The user's in-chat instruction overrides everything | Not in the fixture (host behavior); consistent with this repo's practice |
| Broad tool support (Cursor / Codex / Copilot / Gemini CLI / Claude Code) | Retrieved 2026-09-01, site 200; per-tool behavior follows its product docs |

### Key invariants

1. **Commands must run**: assistants execute what is written; do not write a command you have not run.
2. **One rule, one owner**: defaults at the repo root, exceptions in subdirectories; nearest overrides, never duplicates the body.
3. **README for humans, AGENTS.md for assistants**: content is routed by reader; do not write a second README.
4. **This-task details go in chat, not AGENTS.md**: keep the stable prefix stable.

## 4. Development

### Integration points

1. **Minimal checklist for landing an AGENTS.md**: start with three sections — Setup (package manager / node version), Testing (how to run), Constraints (no-go zones / language conventions).
2. **Monorepos use nested files**: defaults at the root, exceptions only in packages; do not enumerate every package's details at the root.
3. **Commands go through CI validation**: the fixture's lint approach plus periodically dry-running the listed commands, to keep docs and reality from drifting.
4. **Personal preferences go user-level**: themes and language preferences do not belong in the repo's AGENTS.md (that is a team contract).

### Debug runbooks

#### R1 The assistant guesses project conventions wrong in every tool

**Symptom**: switch coding assistants and dependencies get mis-installed, test commands mis-run again.
**Evidence**: no AGENTS.md at the repo root, or its commands do not match reality (running `npm install` in this repo is exactly this failure).
**Action**: land an AGENTS.md with real commands and clear no-go zones; long human-oriented content stays in README.
**Done when**: a fresh session uses the right package manager and test command on the first turn; behavior is consistent across tools.

#### R2 Wrong conventions inside a monorepo package

**Symptom**: the root says pnpm, one package actually needs npm; the assistant runs the wrong one inside it.
**Evidence**: no AGENTS.md in the package directory; or the host does not implement nearest-file reading (check its product docs).
**Action**: land an exceptions-only AGENTS.md in the package (the fixture's `mergeLayers` approach).
**Done when**: a session started inside the package uses the package's commands; root behavior is unchanged.

#### R3 AGENTS.md is stale; commands no longer run

**Symptom**: the assistant follows AGENTS.md and errors — a command was renamed, a script deleted.
**Evidence**: CI validation (command dry-run) is red; `git log` shows the script changed without a doc sync.
**Action**: fix the command and run it; add "changing a script requires syncing AGENTS.md" to the PR checklist.
**Done when**: CI validation stays green; no "doc command failed" interruptions for a full iteration.

### Anti-patterns

- **A second README**: repeating the project intro while omitting install / test commands.
- **Fake commands**: writing `npm test` on autopilot when it is `pnpm test` — assistants execute them faithfully.
- **This-task details in AGENTS.md**: breaks the stable prefix and pollutes every later session.
- **Enumerating everything at the root**: piling every package's details into the root leaves nowhere for exceptions.
- **Personal preferences in a team contract**: style preferences belong in user-level globals, not the repo file.

## 5. Resource Library

### Four-level reading route

| Level | Read | Why this order |
|---|---|---|
| Beginner | The [agents.md](https://agents.md/) site (format and conventions) ｜ this repo's root `AGENTS.md` / `CLAUDE.md` (live sample) | The format in five minutes: Markdown with conventions |
| Builder | Land one for your repo + run this page's fixture lint | A regression-checkable validation in hand before team rollout |
| Operator | Your tools' product-doc chapters on "read precedence / memory" ｜ CI command validation | Tools differ; their docs are authoritative |
| Researcher | [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (the CLAUDE.md hybrid case) | Where repo context sits in the overall assembly strategy |

### Resource table

| Name | Level | canonical URL | Use | Supports | Next |
|---|---|---|---|---|---|
| agents.md | L1 | https://agents.md/ | Repo-level context convention | Format, nearest-wins, tool support | Land one for your repo |
| Anthropic context engineering | L1 | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Mental model | The CLAUDE.md prefetch + JIT hybrid case | Read alongside [context-engineering](context-engineering.md) |
| This repo's root AGENTS.md / CLAUDE.md | E | repo root | Live sample | Real commands, clear no-go zones | Compare against your own repo |
| This page's fixture | E | repo-context.ts (inline) | Zero-key verification | lint / nearest-merge behavior | Move into CI validation |

(retrievedAt: 2026-09-01.)

### Active falsification and open questions

- "Nearest wins" is convention-level guidance in agents.md; hosts differ in actual read depth and override behavior — their product docs are authoritative (this repo has not tested each tool).
- Tool support (which tools read AGENTS.md) changes quickly; see the retrieval date above — verify before adopting a new tool.
- Open: no public data on the quantitative effect of AGENTS.md length on task quality (budget cost vs signal); the experiential starting point is "one screen or less, commands first".

### Where learn-ai stops / where to continue

- Where repo context sits in the overall assembly strategy → [context-engineering](context-engineering.md).
- How the editor carries state and rules to the agent → [ACP: the editor-agent boundary](../07-interoperability/acp-agent-client.md).
- Capability distribution (skills / MCP) interop → [MCP](../07-interoperability/mcp.md).
