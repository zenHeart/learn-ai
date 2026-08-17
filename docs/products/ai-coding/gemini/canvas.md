# Gemini Canvas

> A dynamic workspace inside the Gemini app. Its value is **skipping project setup and getting straight to something clickable**.

## What it is for

In an ordinary conversation the AI can only hand you a block of code; you still have to create a project, install dependencies and run it before you see anything. Canvas removes that stretch — it gives you a workspace next to the conversation, and what it produces is directly interactive.

**It is positioned as a prototyping tool, not a source of production code.** Once that is clear, every trade-off below follows naturally.

## Core features

The official page describes Canvas as an interactive space for creating and refining documents, code and web designs together with Gemini, with a live preview of the result.

<!-- TODO: needs verification — whether Canvas uses native code execution and WebGL rendering underneath. Older docs made that claim, but the only official page, gemini.google/overview/canvas/, describes the product at feature level and no official statement confirms the implementation. -->

The two points that matter most to developers:

**Visible iteration**: the output is not a static code block. You can operate it, then base the next round of requests on "the behaviour I saw" rather than "the behaviour I imagined while reading code".

**Local refinement**: you can ask for changes to one part instead of regenerating the whole file each time. That saves a lot of time when tuning UI details.

## Work in layers

This is the one methodology that matters when using Canvas.

**Anti-pattern**: asking for a full-size application with complete business logic in one shot.

The problem is not that it cannot do it; it is that **you lose the information about which step went wrong**. Generate two hundred lines at once and your only recourse when something breaks is to start over.

**Instead**:

```
Layer 1: DOM structure + basic interaction           → confirm the logic is on track
    ↓
Layer 2: apply the design system (Tailwind / CSS variables)  → keep the code tidy
    ↓
Layer 3: move into a real project for types and tests  → this step leaves Canvas
```

Confirm at the end of each layer. **Layer 3 means leaving Canvas** — do not try to do the engineering inside it; that is not its strength.

### Example prompt

```
Build a business dashboard from the JSON structure below, with a live revenue line chart and a churn rate pie chart:
- support a dark mode toggle
- responsive layout
- structure and interaction only for now, styling comes later
```

The last line is the important one: it confines this round to layer 1.

## Where it fits

| Scenario | Fit | Notes |
|---|:---:|---|
| One-off prototype | High | fastest path to validating an idea, no engineering investment |
| A small tool for non-technical colleagues | High | they can read something clickable, not code |
| Standalone lightweight micro-app | Medium | possible, but moving it out still needs engineering |
| Production application | Low | do not start a system with real reliability requirements here |

## Choosing between this and the others

Canvas is off the engineering mainline, so it does not compete with the rest:

- want code you can **commit to a repository** → [Gemini CLI](./gemini-cli) or [Antigravity](./antigravity)
- want to **see the result before deciding whether to build it** → Canvas

A genuinely useful combination: try three directions in Canvas, pick one, then have Antigravity implement it in the real project.

## Official resources

- [Canvas overview](https://gemini.google/overview/canvas/)

## Related pages

- [Cookbook](./gemini-cookbook#_13-a-clickable-prototype-fast) — the prototyping recipe
- [Cheatsheet](./gemini-cheatsheet#pick-by-task) — pick a tool by task
