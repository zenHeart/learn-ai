# ChatGPT Work

> ChatGPT Work is the agent mode that takes a task to a **reviewable result**: a brief, a deck, a spreadsheet, a hosted site, a recurring update. It is not Chat, and it is not Codex.
>
> Official wording: “ChatGPT Work is a way to delegate real work to ChatGPT.” Start at [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Account | Any ChatGPT plan; surfaces and limits are on the [pricing page](https://learn.chatgpt.com/docs/pricing) |
| Web | The Work switcher at [chatgpt.com](https://chatgpt.com/) |
| Desktop | The [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) (macOS / Windows; Linux is preview) |
| Local files / apps | **Work locally** in the desktop app |
| Keep running after you close the laptop | **Cloud**, or Work on the web |

**Learning objectives**: tell Chat / Work / Codex apart; delegate one task with a clear deliverable; know local vs cloud; use plugins and scheduled tasks.

**Non-goals**: CLI sandbox setup ([Codex CLI](./codex-cli)); prices and quotas ([Plans and access](./chatgpt-plus)).

## What Work is — and is not

Official docs split the same desktop app into three ways of working:

| Choose | When you want | Examples |
| --- | --- | --- |
| **Chat** | A question or a short draft | Compare options, rewrite a message, clarify a brief |
| **ChatGPT Work** | An outcome you can review | An eight-slide deck, a comparison sheet, a weekly agenda |
| **Codex** | Developer views and repo-level edits | Debug, run tests, review a PR, implement a feature |

Work plans the steps, pulls in files and plugins, and stops at something you can open and check. You can follow progress, change direction, and approve consequential actions.

It is **not**:

- A replacement for Codex’s coding UI (no pull-request pane; Git / shell detail is hidden by default)
- A replacement for Chat (short questions belong in Chat)
- A third app you install separately (since 2026-07-09, Work and Codex live in the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app))

> Official note: if you already used Codex for non-coding work, you can stay there or switch to Work. The capabilities overlap; the interface is built for everyday knowledge work. Work and Codex **share usage limits**.

## Capabilities

| Capability | What it does | Official page |
| --- | --- | --- |
| Research and analysis | Search, browse, compare sources, read files, summarize | [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) |
| Files and tools | Uploads, Projects, Library, Memories, plugins | [Projects](https://learn.chatgpt.com/docs/projects) · [Plugins](https://learn.chatgpt.com/docs/plugins) |
| Finished files | Documents, decks, spreadsheets, PDFs — preview, then download | [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer) |
| Visual and hosted work | Images, visualizations, **Sites** for websites and apps | [Sites](https://learn.chatgpt.com/docs/sites) |
| Browser and desktop | Built-in browser, Chrome extension, Computer Use, Appshots | [Browser](https://learn.chatgpt.com/docs/browser) |
| Long tasks | Subagents, long-running work, mid-flight course changes | [Long-running work](https://learn.chatgpt.com/docs/long-running-work) |
| Repeatable work | Scheduled tasks + skills | [Scheduled tasks](https://learn.chatgpt.com/docs/automations) |

Features depend on plan, platform, region, rollout, and workspace settings. Administrators can disable Work, plugins, browser use, and network access.

## First 15 minutes

### 1. Switch to Work

In the web or desktop app, open the switcher and choose **Work**. A good first task has a clear outcome, a few source files, and a result you can review.

### 2. Choose local or cloud

The desktop composer exposes **Work locally**. If **Cloud** is offered, pick by the job:

| | **Cloud** | **Work locally** |
| --- | --- | --- |
| Runs on | An isolated OpenAI-hosted environment | Your computer |
| After you quit / sleep | Continues; resume from web or mobile | Stops |
| Local files / apps | No direct access; upload, Project, or an authorized plugin | Yes |
| Work on the web | Web Work **is** cloud | Desktop only |
| Use when | Long jobs, watching websites on a schedule, continuing on another device | Sorting a local folder, driving a desktop app |

Cloud scheduled tasks do not need your computer awake. Local scheduled tasks do: the machine must stay on and the desktop app must stay running.

### 3. Specify the result, not the vibe

Weak:

```
Make me a presentation about our customer research.
```

The official shape: outcome, sources, constraints, what “good” looks like, and when to stop for review.

```
Review the attached interview notes and survey results. Create an eight-slide presentation for the product leadership meeting. Focus on the three most common customer problems, include supporting evidence, separate findings from recommendations, and flag any claims that are not well supported. Use @Google Drive for the source docs. Return a draft for my review before treating it as final.
```

## Three official starter tasks

### A presentation

```
Review the attached source materials and create an eight-slide presentation for [audience]. Focus on the main themes, include supporting evidence, and flag anything that needs human review. Return a draft for my review.
```

### A comparison spreadsheet

```
Create a spreadsheet comparing the options for [decision]. Use the attached notes and source materials. Include the most important criteria, score each option, flag risks or missing information, and add a summary tab with a recommendation and next steps.
```

### A recurring update

```
Every Monday morning, review new updates from @Slack and @Google Drive for [project]. Refresh the meeting agenda with decisions, blockers, owners, and open questions. Send me a draft before sharing it.
```

Manage runs from **Scheduled** in the sidebar. Details: [Scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app).

## Plugins (the connector layer)

Plugins are the consumer-facing counterpart to Claude Connectors: Slack, Google Drive, SharePoint, mail, calendars, CRMs, project trackers.

1. Open **Plugins** in the left sidebar and install what you need.
2. Mention a tool with `@plugin-name` in the prompt.
3. Availability depends on plan, workspace, and the plugin itself.

Enterprise / Edu workspaces keep plugins off by default; Business keeps them on. Making a plugin available is not the same as granting your account access — you still enable it and sign in.

Repo wiring, CI, and custom MCP stay on [Project Integration](./integration). Do not treat those as Work plugins.

## Sites, when you need a hosted page

[Sites](https://learn.chatgpt.com/docs/sites) is a public beta: ChatGPT creates, hosts, refines, and shares websites, internal tools, or small apps without a separate deploy stack. Web entry: [chatgpt.com/sites](https://chatgpt.com/sites).

It is **not** Claude Design. There is no official “import a design system from the repo, then hand off a bundle” product on the OpenAI side. Sites is a hosting workflow.

Documented constraints:

- Every deployment URL is production. To review first, ask it to **save a version without deploying**.
- The CLI and IDE extension have **no** Sites management UI; create and publish from web or the desktop app.
- Enterprise workspaces keep public publishing off by default.
- No data residency at launch; do not process PHI or payment-card data.

For frontend work: implement and test in the repo with Codex, then publish via Sites — or use Work for a throwaway internal dashboard. Do not treat Sites as your production frontend stack.

## Work vs Codex on desktop

Official comparison ([Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt#compare-chatgpt-work-and-codex-on-desktop)):

| Difference | ChatGPT (including Work) | Codex in the desktop app |
| --- | --- | --- |
| Where to start | Select **ChatGPT**, then **Work** | Select **Codex** in the product selector |
| Chats you see | Chat from web/mobile plus Work | Codex chats and development projects |
| Technical detail | Hides Git / shell by default | Shows diffs and review views |
| Voice | Prefers non-technical, finished outputs | Can include implementation detail |
| Pull requests pane | Not available in Work | Available when enabled |

Changing code, inspecting a diff, or driving a PR → Codex. A file someone else can open → Work.

## Safety boundaries worth internalizing

- The **cloud browser** is not your Chrome: no local tabs, extensions, history, or passwords, and it cannot sign in or pay. Unsupported steps stop the task.
- **Local Work** can reach files and apps you authorize. Do not point it at a secrets directory.
- Review approval prompts before spend, account changes, or outbound sends.
- Admin policy wins. Turning on public internet access does not override a workspace restriction.

Enterprise isolation, retention, and compliance: [ChatGPT Work Overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview).

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Opening Work for a one-line question | Multi-step agent work burns more quota | Use Chat |
| Editing a repo in Work and looking for the PR pane | Work has no PR sidebar | Switch to Codex |
| Expecting a local schedule to run on a sleeping laptop | It will not | Use Cloud when the job is not local |
| Treating a Sites URL as staging | Deploy URLs are production | Save a version; deploy after review |
| Prompting “make a deck” | Polished slides with thin evidence | Name the audience, sources, and review gate |
| Assuming an installed plugin is authorized | Enterprise defaults off; OAuth is per user | Enable it and sign in |

## Real-world use

A frontend weekly: Work pulls decisions from `@Slack` and `@Google Drive` into an agenda draft; the actual code change goes to [Codex CLI](./codex-cli) or desktop Codex. Keep the design conversation in Chat. Do not mix it into the same Work thread as the implementation.

## Next steps

1. Still choosing a surface → the decision tree on the [Learning Map](./).
2. Writing code → [Codex CLI](./codex-cli) or the [product line](./codex-ai).
3. Plans and the Chat surface → [ChatGPT Plans and Access](./chatgpt-plus).
4. Wiring a real repo → [Project Integration](./integration).

## Official sources

- [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work)
- [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) (Chat / Work / Codex)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [Sites](https://learn.chatgpt.com/docs/sites)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [ChatGPT Work Overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview)
- [What's new](https://learn.chatgpt.com/docs/whats-new) (2026-07-09 Work + desktop merge)
