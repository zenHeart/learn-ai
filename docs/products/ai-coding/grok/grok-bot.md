# Grok Bot

> **Grok Bot** is xAI's always-on teammate product. Official definition ([docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview)):
> "Bots are AI teammates you can give real work to. Bots can sign and use apps and websites just like you do on a persistent cloud computer."
>
> This page is a product map sourced only from [docs.x.ai/grok-bot](https://docs.x.ai/grok-bot/overview), [x.ai/bot](https://x.ai/bot), and [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot). It is **not** the Grok Build CLI tutorial — that is [grok-cli.md](./grok-cli.md).

## Goals and non-goals

**Goals:** tell Grok Bot apart from Grok Build / grok.com chat / Imagine / Build Mode, and point at the official docs for setup, the shared computer, and approvals.

**Non-goals:** a second copy of the official get-started walkthrough, invented quotas, or third-party claims that do not appear on docs.x.ai / x.ai / grok.com.

## What it is

In the docs and in the app, **a Bot = a single persistent, named agent** ([overview](https://docs.x.ai/grok-bot/overview)). You message it like a teammate. It keeps working on a cloud computer after you close the laptop ([faq](https://docs.x.ai/grok-bot/faq)).

Official differences from a chat assistant ([overview](https://docs.x.ai/grok-bot/overview), [faq](https://docs.x.ai/grok-bot/faq)):

- Each Bot runs on a **persistent cloud VM** with a browser, filesystem, and terminal.
- It can use connectors / MCP where available, and computer use for apps and websites without a clean API.
- Multiple Bots share **one user-scoped computer** and can run in parallel, message each other, and hand off work.
- It can learn a workflow from a live demonstration and persist it as a **routine**.
- Named Bots keep memory, files, browser sessions, and preferences across turns.

| | Grok (chat) | Grok Build | Grok Bot |
|---|-------------|------------|----------|
| Job | Conversation, search, voice, Imagine | Edit a real local / CI repo | Finish work inside apps and websites |
| Computer | None of its own | Your machine (optional sandbox) | One persistent **cloud** computer per user |
| Stops when the laptop closes? | Yes (it is a chat) | Yes (the process is local) | No — cloud work continues |
| Official entry | [grok.com](https://grok.com) | `grok` | Desktop + iOS apps ([x.ai/bot](https://x.ai/bot)) |

The launch post ([2026-08-11](https://x.ai/news/introducing-grok-bot)) says Grok Bot is **in beta**.

## Who can use it

[get-started](https://docs.x.ai/grok-bot/get-started) lists eligible plans:

- SuperGrok Heavy
- Cursor Ultra
- Cursor Teams Premium (sign in with your Cursor account)

[x.ai/bot](https://x.ai/bot) adds: "Already on Cursor Ultra or SuperGrok Heavy? Grok Bot is included." Enterprise access is on a waitlist in the [launch post](https://x.ai/news/introducing-grok-bot); the [faq](https://docs.x.ai/grok-bot/faq) says team / enterprise rollout varies by organization.

**Authentication is Cursor**, not `grok login`. Grok Bot requires cloud data storage; Legacy Privacy Mode is not supported ([get-started](https://docs.x.ai/grok-bot/get-started), [faq](https://docs.x.ai/grok-bot/faq)).

### Platforms ([faq](https://docs.x.ai/grok-bot/faq))

| Supported at launch | Not supported at launch |
|---------------------|-------------------------|
| macOS (Apple silicon and Intel) | Linux desktop |
| Windows (x64 and Arm64) | Android |
| iPhone on iOS 18 or later | iPad |

The same Bots and conversations sync across signed-in devices.

## The shared cloud computer

Every Bot on the account uses **the same** computer ([computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps)):

- Browser cookies and signed-in sessions are shared.
- Files are visible to every Bot.
- Command-line credentials are shared.
- One Bot can continue from work another Bot saved.

The computer is assigned to the **user account**, not to an individual Bot. Official warning, twice: **do not use separate Bots as a security boundary**.

Each Bot gets its own screen on that shared computer, so several Bots can use browser and desktop tools in parallel. One Bot can run only one computer-use task on its screen at a time. The screens are work surfaces, **not** separate security boundaries.

Durable project files go in the shared workspace at `/workspace`. Temporary directories, manually installed packages, and uncommitted application state are treated as replaceable.

The cloud computer is **separate** from the Mac or Windows machine in front of you. Local-command policy lives under **Settings → General → Agent → Execution on Local Computer**; the default is **Ask every time** ([approvals](https://docs.x.ai/grok-bot/approvals-security-and-privacy)). Those settings do not stop the Bot from using its cloud computer.

## Get started (official sequence)

Follow [get-started](https://docs.x.ai/grok-bot/get-started). Condensed:

1. Install the desktop app from the [Grok Bot access page](https://x.ai/bot) (macOS: drag to Applications; Windows: run the installer).
2. Sign in with your Cursor account in the browser window the app opens.
3. Create a Bot: a short name, one primary job, and a description of how it should work. Official advice: focused Bots beat one catch-all Bot.
4. Give a first task that names the outcome, sources, constraints, deliverable, and review point.
5. When a site needs a password, passkey, 2FA, or CAPTCHA, open **Agent Computer**, take over, complete only that step yourself, then return control. **Do not paste passwords or one-time codes into chat.**

Connectors appear as **Plugins** in the current app: **Settings → Plugins**. Type `@` to attach a connector; type `/` to reference a saved skill. Prefer a connector when one exists; use the browser for services without one.

## Skills vs routines

Official split ([faq](https://docs.x.ai/grok-bot/faq)):

- A **skill** describes how to perform a task.
- A **routine** assigns a workflow to one Bot and tells it when to run — on a schedule or, where supported, after an event.

Test the skill on a real one-time task before turning it into a routine.

**Teach a task** (when available) records one browser workflow from the computer view, limited to ten minutes. The rollout may be gradual.

Deleting a Bot removes its profile, conversation, and routines. Files and logins on the shared computer may remain.

## Approvals you should set

[approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) tells you to put standing boundaries in the Bot description and to keep these behind approval:

- Sending messages or invitations
- Publishing content
- Purchases and financial transfers
- Deleting or overwriting data
- Changing permissions
- Production changes
- Accepting legal terms

When Auto Review is available: **Require Approval** always wins over **Always Allow**. Do not write a rule like "allow everything in the browser."

## Cost (only what official pages say)

The [faq](https://docs.x.ai/grok-bot/faq) says availability and billing depend on the account and plan, Grok Bot subscriptions include weekly usage, and eligible accounts can add on-demand usage billed from model and token cost. [x.ai/bot](https://x.ai/bot) currently lists Cursor Ultra at $200 / month and Cursor Premium Teams at $120 / seat / month, with SuperGrok Heavy / Cursor Ultra already including Grok Bot. This page does **not** invent a SuperGrok Heavy price or a token quota.

## Official docs

| Page | Use |
|------|-----|
| [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) | What a Bot is |
| [docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started) | Install, sign-in, first task |
| [docs.x.ai/grok-bot/files-and-results](https://docs.x.ai/grok-bot/files-and-results) | Attach files and review results |
| [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) | Shared computer, connectors, `/workspace` |
| [docs.x.ai/grok-bot/approvals-security-and-privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) | Approvals, local computer, privacy |
| [docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq) | Platforms, memory, cost, delete |
| [docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises) | Per-member computer, org controls |
| [x.ai/bot](https://x.ai/bot) | Marketing + downloads |
| [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) | Launch (2026-08-11, beta) |

## Related pages

- [Grok learning map](./index.md) — family decision tree
- [Grok Build tutorial](./grok-cli.md) — the terminal coding agent
- [Glossary](./grok-glossary.md) — name collisions
