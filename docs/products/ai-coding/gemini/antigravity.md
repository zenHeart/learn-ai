# Google Antigravity

> Google's agent-first development platform. It is not "an editor with AI bolted on" — the unit of interaction is **one task**, not one keystroke.

## What it is for

Antigravity assumes the AI can plan on its own, call tools and execute multi-step work. That premise changes what you have to feed it: a completion tool needs a cursor position, Antigravity needs a goal, constraints and acceptance criteria.

Three things decide how far its capability reaches:

| What you provide | Carrier | Effect |
|---|---|---|
| Long-lived invariants | [Rules](#rules) | "this project must be done this way" |
| Reusable procedures | [Skills](#skills) and [Workflows](#workflows) | "for this kind of work, follow this playbook" |
| The outside world | MCP | lets it query GitHub, drive a browser |

## Surfaces

The official docs describe Antigravity as several surfaces built on **the same agent harness**:

| Surface | Shape | Suits |
|---|---|---|
| Desktop app | GUI | interactive exploration, verifying as you go |
| CLI | Terminal UI | slotting into existing scripts and terminal workflows |
| SDK | Python | embedding the agent in your own automation |
| IDE integration | Inside the editor | staying in the editor you already use |

**This is the most practical thing to know**: because they share one harness, rules and skills are **effective across surfaces**. You do not configure them twice for desktop and CLI, and you do not learn a second mental model — pick whichever entry point fits how you are working right now.

On models, the official model documentation notes that Gemini 3.5 Flash powers all of Antigravity's local agents. There is also a hosted form, `antigravity-preview-05-2026`, which the docs describe as a general-purpose hosted agent that plans autonomously, executes code, manages files and browses the web inside an isolated Linux sandbox.

## Rules

Rules are long-lived behavioural constraints, at two levels:

| Level | Location | Scope |
|---|---|---|
| Global | `~/.gemini/GEMINI.md` | all workspaces |
| Workspace | `.agents/rules` directory | travels with the repo, committable |

**The docs state a hard limit of 12,000 characters per rule file.** When you reach it, split the file and cross-reference with `@filename` rather than squeezing the wording to fit.

### Four activation modes

| Mode | When it loads | Suits |
|---|---|---|
| Manual | when you reference it by hand | conventions needed only occasionally |
| Always On | every time | genuinely global iron laws |
| Model Decision | when the model judges it relevant | situational advice |
| Glob | when a file pattern matches | stack-specific conventions |

**Prefer Glob.** "React component conventions" loading only for `src/**/*.tsx` is far cheaper than Always On sitting in context permanently. Always On should be reserved for the very few real invariants.

### What belongs in a rule

Only the few things **the agent actually gets wrong**:

```markdown
# Project constraints

- pnpm only; npm install / yarn add must never appear
- every new component needs explicit Props types, no any
- src/legacy/ is read-only; ask before changing anything there
```

Do not paste your whole coding standard in. It already knows to write semicolons.

> ⚠️ The rules file is **not** an `agents.md` at the project root. That form appeared in older docs and is wrong. The paths are `~/.gemini/GEMINI.md` (global) and the `.agents/rules` directory (workspace).

## Skills

A skill is **a directory** containing a `SKILL.md`:

```
.agents/skills/release-flow/          # travels with the repo
└── SKILL.md

~/.gemini/config/skills/release-flow/ # global
└── SKILL.md
```

In the frontmatter, `description` is required and `name` is optional:

```markdown
---
description: Use when a release needs cutting for this project; covers version bump, changelog and tag end to end
---

# Release process

1. Confirm CI is green on main
2. Update CHANGELOG.md
3. ...
```

**`description` decides whether the skill gets used at all**, so write it as a trigger condition ("when a release needs cutting…"), not as a title ("release process"). The model reads it to judge whether the current task matches.

**Because a skill is a directory**, you can put scripts, templates and sample data alongside it and have `SKILL.md` reference them — that is the biggest difference from a single prompt file.

> ⚠️ A flat `.agents/skills/xxx.md` is not recognised as a skill. `.agent/skills` (singular) is kept only for backward compatibility; use `.agents/skills` for anything new.

## Workflows

Workflows are invoked explicitly as `/<workflow-name>`.

**How they differ from skills**: who holds the trigger.

- Skill: the model reads `description` and decides whether to use it
- Workflow: you decide when it runs

Write a skill when you want automatic matching, a workflow when you want to pick the moment. Pre-release checks and weekly report generation — procedures that must be started by a human — belong to the latter.

## Subagents and artifacts

These two mechanisms are how Antigravity handles large tasks, and they are the line between it and "a smarter completion tool".

**Asynchronous subagents**: the main agent dispatches subordinate agents to work in parallel. The value is context economy — each subagent reads one module and returns a conclusion, so the main agent consumes conclusions rather than raw files and the same window covers a much bigger task.

**Artifacts**: reviewable intermediate products the agent emits, such as a plan, a task list or a verification record. They are the brake that comes with autonomy: the more autonomous the agent, the less transparent "what is it actually about to do" becomes, and artifacts turn that black-box middle state into something you can read and veto.

<!-- TODO: needs verification — whether the official docs specify a cap on subagent concurrency. The scraped official docs describe the capability but no official statement gives a number. -->

## A typical workflow: cross-module refactor

This is where Antigravity's advantage over other tools is clearest, because the two mechanisms above map onto exactly this risk.

```
1. Describe the goal and acceptance criteria, have it emit a plan artifact
       ↓
2. Read the plan, veto the parts pointing the wrong way   ← the human checkpoint
       ↓
3. Let it execute (subagents can read several modules in parallel)
       ↓
4. Use its verification record to decide how much to trust, then review the key changes yourself
```

**Make sure the workspace is clean before you start.** Concurrency means changes arrive from several directions, and afterwards you cannot tell which came from where.

## Common problems

**A rule is written but it is not being followed**: check the activation mode first. Manual rules do not load automatically; for Glob, confirm the file you are editing actually matches the pattern.

**A skill never triggers**: `description` was written as a title instead of a trigger condition. Rewrite it as "when …".

**Context fills up fast**: too many Always On rules. Move the stack-specific ones to Glob.

## Choosing between this and the others

The full comparison of Antigravity (local, you converse in real time) vs Code Assist (in-IDE, editor-triggered) vs Jules (cloud, asynchronous, produces a PR) is in the [cheatsheet](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules) and is not repeated here.

The one-line version: **big local changes you want to verify as they happen go to Antigravity, work you hand off and collect as a PR goes to [Jules](./jules), small in-editor changes go to [Code Assist](./code-assist).**

## Official resources

- [Antigravity docs home](https://antigravity.google/docs/home)
- [Rules & Workflows](https://antigravity.google/docs/rules-workflows)
- [Skills](https://antigravity.google/docs/skills)

## Related pages

- [Cheatsheet](./gemini-cheatsheet) — rule/skill paths, cross-product decision table
- [Glossary](./gemini-glossary) — definitions of Surface, Rules, Skill, Subagent, Artifact
- [Cookbook](./gemini-cookbook#_11-cross-module-refactor-that-needs-verification-as-it-goes) — the cross-module refactor recipe
