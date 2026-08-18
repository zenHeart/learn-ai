# ChatGPT Chrome Extension

> A **tutorial** — let ChatGPT drive **your** Chrome profile so it can act on sites you are already signed into. Treat every page as untrusted context. Review the site before you allow the agent to continue.
>
> Official landing: [learn.chatgpt.com/codex/chrome-extension](https://learn.chatgpt.com/codex/chrome-extension). Docs: [Chrome extension](https://learn.chatgpt.com/docs/chrome-extension).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Browser | **Google Chrome** only. Other Chromium browsers are not supported |
| Desktop | [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) with Work or Codex |
| Store item | [ChatGPT Chrome extension](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg) |

**Learning objectives**: install the plugin + extension; start a side chat on the current tab; invoke `@Chrome` from Work or Codex; set allow / block lists; tell Chrome apart from the built-in browser.

**Non-goals**: Atlas (retired 2026-08-09); Cloud browser sign-in (it cannot use your cookies); a second desktop Codex tutorial ([product line](./codex-ai)).

## Three browsers, one job each

| Tool | What it is | Use when |
| --- | --- | --- |
| **Chrome extension** | Controls **your** Chrome, including signed-in tabs | LinkedIn, Salesforce, Gmail, internal tools |
| **Built-in browser** (`@Browser`) | A separate ChatGPT profile inside the desktop app | Localhost preview, research, stay out of your Chrome |
| **Work cloud browser** | Hosted, signed-out browser on the web | Public pages; no local tabs or passwords |

ChatGPT can switch tools mid-task: a **plugin** when a dedicated integration exists, **Chrome** when it needs your logged-in session, **built-in browser** for localhost.

Built-in browser docs: [Browser](https://learn.chatgpt.com/docs/browser). Atlas is gone; see the [Learning Map](./).

## Step 1 — Install

In the desktop app, open **Plugins** and install **Chrome**. Follow the flow:

1. Install the [Chrome extension](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg).
2. Approve Chrome’s permission prompts.
3. Open Chrome and confirm the ChatGPT side chat loads.

Use the **same Chrome profile** that has the extension. Install it again if you switch profiles.

## Step 2 — Chat beside the page

1. Open the page.
2. Click ChatGPT in the toolbar or **Extensions**. On macOS: `Cmd+Shift+.`.
3. Ask about the page or give a task.

The panel stays with that tab. Chats started in Chrome appear in the ChatGPT app, and recent app chats can open in Chrome.

Mention an open tab, or highlight text and bring the selection into the chat. Right-click → **Ask ChatGPT** to start from the page.

On YouTube, ChatGPT can use timestamped captions when they exist. Still treat the transcript as untrusted.

## Step 3 — Start a Chrome task from ChatGPT

Start a **Work** or **Codex** chat. ChatGPT uses Chrome when the task needs a signed-in site. You can invoke it:

```text
@Chrome open Salesforce and update the account from these call notes.
```

If Chrome is closed, ChatGPT can open it. Tasks run in Chrome **tab groups**.

## Control website access

By default ChatGPT asks per **host** (`example.com`) before it interacts.

| Choice | Effect |
| --- | --- |
| **Allow once** | This request only |
| **Allow for this site** | This host without asking again |
| **Allow for all sites** | No per-site prompt. Elevated risk |
| **Decline** | Do not use the site |

Manage lists in the desktop app: **Settings → Computer Use → Google Chrome → Manage**. Allowlist = do not ask. Blocklist = do not use. Removing a domain from either list returns you to “ask again.”

**Allow for all sites** means ChatGPT will not ask before using websites. Only choose it if you trust the agent with any tab in that Chrome profile.

**Browser history** is a separate, elevated-risk prompt. History can include internal URLs, search terms, and activity on signed-in devices. Access is scoped to the request. There is **no** always-allow for history.

## Data and permissions

Chrome may ask for debugger access, all-site data, history on signed-in devices, notifications, bookmarks, downloads, native messaging, and tab groups. Those capabilities make browser workflows possible. ChatGPT still uses its own confirmations, allowlists, and blocklists.

Memories follow your Memories setting.

OpenAI does **not** store a separate complete log of Chrome actions. It stores browser activity only when that activity becomes chat context (text, screenshots, tool calls, summaries). Your ChatGPT data controls apply. Do not send secrets through a browser task unless you are present for every prompt.

## Troubleshooting

If ChatGPT cannot connect to Chrome:

1. Confirm the host is not on the blocklist.
2. Update every ChatGPT / Codex desktop app you still have installed.
3. Close the side panel, restart Chrome, reopen the extension. If you see a missing native host, remove and re-add the Chrome plugin.
4. In the app, switch to **Work** or **Codex**. Confirm the Chrome plugin is on.
5. Use the Chrome profile that has the extension.
6. Start a new Work or Codex chat.
7. Restart the desktop app; last resort, uninstall the extension and re-run setup.
8. Side chat works but Chrome tasks fail: `/feedback` and include the chat ID.

File uploads from disk: Chrome → extension **Details → Allow access to file URLs**, then retry the task.

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Using Edge / Arc / Brave | Extension is not supported | Google Chrome |
| Allowing all sites on a personal profile | Agent can touch bank / mail / admin consoles | Per-site allow; keep a dedicated profile |
| Always-allowing history | Not offered — for good reason | Approve history only for that request |
| Expecting the cloud browser to see Gmail | Cloud browser is signed out | Use this extension, or a plugin |
| Confusing `@Chrome` with `@Browser` | Wrong profile, missing localhost or cookies | `@Browser` = built-in; `@Chrome` = your Chrome |

## Real-world use

A frontend bug only reproduces in the staging admin you are already signed into. Start a Codex chat, `@Chrome` that tab, ask it to capture the failing flow, then fix the component locally. Keep payroll and password-manager tabs out of that Chrome profile.

## Next steps

1. Built-in browser and comments → [Browser](https://learn.chatgpt.com/docs/browser)
2. Desktop Computer Use (apps, not just Chrome) → [Computer Use](https://learn.chatgpt.com/docs/computer-use)
3. Hosted public pages → [Sites](./sites)

## Official sources

- [Chrome extension (landing)](https://learn.chatgpt.com/codex/chrome-extension)
- [Chrome extension (docs)](https://learn.chatgpt.com/docs/chrome-extension)
- [Chrome Web Store](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg)
- [Built-in browser (help)](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app)
- [Browser](https://learn.chatgpt.com/docs/browser)
- [Computer Use](https://learn.chatgpt.com/docs/computer-use)
