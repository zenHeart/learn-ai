# Codex IDE Extension

> A **tutorial** — install the extension, attach the file you already have open, and review the edit beside the source. The IDE is one Codex surface. It shares `AGENTS.md`, sandbox, and approval with the CLI.
>
> Official landing: [learn.chatgpt.com/codex/ide](https://learn.chatgpt.com/codex/ide). Docs: [IDE extension](https://learn.chatgpt.com/docs/codex/ide).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Account | A ChatGPT plan that includes Codex |
| Editor | VS Code, Cursor, Windsurf, VS Code Insiders, Xcode, or a JetBrains IDE |
| Repo | A project folder you already know |

**Learning objectives**: install or enable Codex in your editor; start a chat that already has the open file; review a focused diff in place; hand a long task to Cloud without leaving the editor.

**Non-goals**: CLI install ([CLI](./codex-cli)); Cloud environment setup ([Cloud](./codex-cloud)); desktop Chat / Work / Codex switcher ([product line](./codex-ai), [Work](./chatgpt-work)).

## What the IDE extension is — and is not

The extension puts Codex **beside the code**. Open files, the current selection, and recent chats go into the composer. You read a short summary and a focused diff next to the source.

It is **not**:

- A second agent with a different config. Same `~/.codex/config.toml`, same `AGENTS.md`.
- The desktop Codex surface. Desktop Codex lives in the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app): visual diffs, PR sidebar, multi-repo, Computer Use. Mapped on the [product line](./codex-ai) — no duplicate desktop tutorial here.
- A replacement for `codex exec` in CI.

Choose the IDE when the task is anchored to the file or selection you are looking at. Choose the CLI when the job is scriptable. Choose [Cloud](./codex-cloud) when it should keep running after you close the laptop.

## Step 1 — Install or enable Codex

| Editor | How |
| --- | --- |
| Visual Studio Code | [openai.chatgpt](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) or `vscode:extension/openai.chatgpt` |
| Cursor | `cursor:extension/openai.chatgpt` |
| Windsurf | `windsurf:extension/openai.chatgpt` |
| VS Code Insiders | Same Marketplace item |
| Xcode | [Setting up coding intelligence](https://developer.apple.com/documentation/Xcode/setting-up-coding-intelligence); pick Codex as the agent |
| JetBrains IDEs | [Codex agent in AI Assistant](https://www.jetbrains.com/help/ai-assistant/codex-agent.html); open AI Chat and select Codex |

Sign in with the same ChatGPT account you use for the CLI.

## Step 2 — Open Codex

**VS Code, Cursor, or Windsurf:** click the Codex icon. If it is missing, run **Codex: Open Codex Sidebar** from the Command Palette.

**Xcode:** open the coding assistant, start a chat, choose Codex.

**JetBrains:** open AI Chat, select Codex.

## Step 3 — First chat, with editor context

Open a project you already know. Ask for an explanation or a small edit. Create Git checkpoints before and after so you can revert.

```text
@src/auth/session.ts Explain how session refresh works, then add a test for
the expired-token path only. Do not change the cookie format.
```

Attach the open file or the selection from the composer instead of restating the problem. Official prompting: [Use editor context](https://learn.chatgpt.com/docs/prompting#use-editor-context).

## Step 4 — Review beside the source

Read the summary. Inspect the changed lines. Keep only the edits you want. Ask for a follow-up in the same chat. Do not accept a multi-file rewrite you have not opened.

## Step 5 — Delegate when the task grows

Keep quick iterations local. When the job needs more time, connect Codex web and send it to [Cloud](./codex-cloud). The chat stays in the editor so you can review the result later.

Official: [Delegate from the IDE extension](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension).

## Use the IDE when…

| Situation | Why |
| --- | --- |
| Focused edits | Relevant files and Codex stay in one view |
| Unfamiliar code | Ask about the symbols already open |
| Review in place | Diff sits next to the source |
| A larger task | Start Cloud from the IDE, return to the result |

Commands and settings: [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide), [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide). Docs pages use `?surface=ide` — if a page looks like the CLI, check the surface selector.

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Describing a file instead of attaching it | Codex guesses the wrong module | Mention the open file or selection |
| Treating the IDE as a different agent | Config / `AGENTS.md` “not loading” | Same config model as the CLI; trust the project |
| Leaving a long job on the laptop | The editor session dies with sleep | Delegate to [Cloud](./codex-cloud) |
| Looking for the PR sidebar here | That is desktop Codex | [Product line](./codex-ai) · [Work vs Codex](./chatgpt-work#work-vs-codex-on-desktop) |

## Real-world use

You have `Button.tsx` open and a failing visual test. Attach the file, ask for the smallest CSS fix, review the diff beside the component. If the fix turns into a token-migration across the design system, hand that off to Cloud and keep the IDE chat for review.

## Next steps

1. Prompting with editor context → [Prompting](https://learn.chatgpt.com/docs/prompting#use-editor-context)
2. Best practices → [guides/best-practices](https://learn.chatgpt.com/guides/best-practices)
3. Long jobs → [Cloud](./codex-cloud)
4. Flags and slash commands → [Cheatsheet](./codex-cheatsheet)

## Official sources

- [IDE extension (landing)](https://learn.chatgpt.com/codex/ide)
- [IDE extension (docs)](https://learn.chatgpt.com/docs/codex/ide)
- [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)
- [Prompting · editor context](https://learn.chatgpt.com/docs/prompting#use-editor-context)
- [Delegate from the IDE](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension)
- [VS Marketplace: openai.chatgpt](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt)
