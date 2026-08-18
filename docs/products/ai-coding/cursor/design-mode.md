# Design Mode

Design Mode lets you **direct agents with visual prompts**. In the browser inside the [Agents Window](https://cursor.com/docs/agent/agents-window), you click an element, draw on the page, or speak. Cursor captures the element plus a screenshot and edits the code while you move to the next change.

> Official: [Design Mode](https://cursor.com/docs/agent/design-mode). Toggle: **`Cmd+Shift+D`**.
>
> This is **in-app UI direction**, not a standalone design canvas. Closest cousin on this site: [Claude Design](../claude/claude-design).

## Prerequisites

- Cursor desktop, with the **Agents Window** browser open on a running app
- A UI you can actually load in that browser (local dev server or preview)
- A fast model that is strong at interface work — official recommendation: **[Composer 2.5](https://cursor.com/blog/composer-2-5)**

## Learning objectives

After this page you can:

1. Open and close Design Mode without leaving the running app
2. Target one element, several elements, a drawn region, or a voice note
3. Know what the agent actually sees (identity + screenshot)
4. Queue the next visual edit before the first one finishes

---

## Why a visual prompt

UI work is spatial. A sentence like “make the hero less cramped” is weaker than: the selected node, the code behind it, the surrounding layout, and the page state you are looking at.

Click an element in the running app, prompt against that selection, and let the agent edit the source.

## Open Design Mode

Design Mode lives in the **browser inside the Agents Window**.

1. Open the Agents Window browser
2. Toggle Design Mode with **`Cmd+Shift+D`**
3. Toggle it off with the same shortcut to return to normal browsing

## Ways to direct the agent

### Select an element

Click any element in the running product. The agent gets the element **and** its code, so you prompt against the thing you see.

### Select multiple elements

Multi-select when the change is a **relationship**: make A match B, remove repeated content, or adjust a group together.

### Draw on the page

Circle a crowded section, box a region, or mark part of an animated page. The annotation sits over a **frozen frame** of the viewport, so the agent sees the exact page state you reacted to.

### Narrate by voice

Speak instead of typing. The mic stays available while agents run, so you can queue the next change without waiting. Voice + drawing work together.

## Keyboard shortcuts

Official table:

| Action | Shortcut |
|--------|----------|
| Toggle Design Mode | `Cmd+Shift+D` |
| Select an area | `Shift+drag` |
| Add element to chat | `Cmd+L` |
| Add element to input | `Option+click` |

## What the agent sees

Picking an element adds two complementary signals:

| Signal | Contents | Why |
|--------|----------|-----|
| **Element identity** | xpath, component, attributes, computed styles, props from the **fiber tree** | Find the source and edit the right file |
| **A screenshot** | layout, surrounding elements, exact page state | Spatial context |

Do not invent extra signals (full DOM dumps, network HAR, design tokens) unless a later official page lists them.

## Work in flow

One UI edit usually leads to the next. Point at one element, describe the change, move to another part of the page, and send another edit **before the first one finishes**. As agents finish, the app hot-reloads.

This is how you run several **subagents** at once on an interface.

The iOS app can also enter Design Mode (point, click, and draw on images or front-end components). That lives on [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile) — this page stays on the desktop Agents Window.

## When to use it

- Spacing, alignment, and “make this match that” on a running page
- Crowded or animated regions you can circle faster than you can describe
- Hands-busy iteration: voice while the previous agent is still running

Stay in ordinary Agent chat when the change is not visual (API contract, data model). Use [Claude Design](../claude/claude-design) when you need a **standalone** brand-aware canvas and a handoff bundle, not an in-editor overlay.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| Describe a pixel change in prose only | Select the element or draw the region |
| Forget it lives in the Agents Window **browser** | Open that browser, then `Cmd+Shift+D` |
| Pick a slow / weak-at-UI model | Official: **Composer 2.5** |
| Assume drawing tracks a live animation | Annotation is on a **frozen** viewport frame |
| Confuse this with Claude Design | Claude Design is a separate web canvas; this is visual prompting **on your running app** |

## Next steps

- [Cursor tutorial](./cursor) — Agent / Ask / Plan / Debug in the editor
- [Cloud Agents](./cloud-agents) — same family, isolated VM
- Official: [Design Mode](https://cursor.com/docs/agent/design-mode), [Agents Window](https://cursor.com/docs/agent/agents-window), [Browser](https://cursor.com/docs/agent/tools/browser)
