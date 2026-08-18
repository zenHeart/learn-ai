# Codex Remote

> A **tutorial** — pair the ChatGPT mobile app with a Mac or Windows host, then start, steer, approve, and review Codex tasks from your phone. The **connected computer** runs the work. Remote is not Cloud.
>
> Official landing: [learn.chatgpt.com/codex/remote](https://learn.chatgpt.com/codex/remote). Setup and security: [Remote connections](https://learn.chatgpt.com/docs/remote-connections).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Host | Latest [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) on macOS or Windows, awake and online |
| Phone | Latest ChatGPT iOS or Android app, with **Remote** visible |
| Account | Same ChatGPT account **and** workspace on both devices |
| Access | Codex on that account; workspace admins may need to enable Remote Control |

Availability depends on rollout and workspace settings. You cannot start pairing from the CLI or the IDE extension.

**Learning objectives**: pair one phone with one host; start or continue a task; approve a command; review a diff; know why the host must stay awake.

**Non-goals**: hosted environments ([Cloud](./codex-cloud)); `codex app-server` JSON-RPC ([App Server](https://learn.chatgpt.com/docs/app-server)); desktop Work vs Codex mapping ([Work](./chatgpt-work)).

## What Remote is — and is not

Remote is a **control surface**. Your phone sends prompts, approvals, and follow-ups. The host provides the repo, shell, plugins, Computer Use, browser, credentials, and sandbox.

```
Phone (ChatGPT mobile · Remote)
        │  prompts / approvals / review
        ▼
Host (ChatGPT desktop · Mac or Windows)
        │  files, shell, plugins, Computer Use
        ▼
Optional: SSH project on another machine
```

It is **not**:

- [Codex Cloud](./codex-cloud). Cloud runs on OpenAI-hosted machines and does not need your laptop.
- A public listener. Pairing uses a relay; do not expose `codex app-server` to the internet.
- A way to unlock a Windows desktop for Computer Use while you use that same session. Windows Computer Use takes the foreground.

## Step 1 — Start setup on the host

On the Mac or Windows PC:

1. Open the ChatGPT desktop app.
2. Go to **Settings → Connections → Control this Mac or PC**.
3. Select **Set up** or **Add**.
4. Approve remote access and finish any verification.

Only pair devices you own and trust.

## Step 2 — Scan the QR code

Scan the code with the phone. Sign in to the **same** account and workspace. Complete MFA / SSO / passkey if asked. The host then appears under **Remote**.

Pair every phone with every host you want it to control. Existing connections unused since 2026-06-08 need a fresh pair after you update both apps.

## Step 3 — Work from the phone

Open **Remote**, pick the connected computer, start a task or continue one.

Keep the host **awake and online**. Closing the desktop app, sleeping, or losing the network stops Remote.

| Host detail | Constraint |
| --- | --- |
| Mac laptop, lid open, power connected | Remote can stay available |
| Mac laptop, lid closed | Also connect an external display |
| Choosing **Sleep** | Remote stops |
| Windows + Computer Use | Keep the session unlocked; Computer Use owns the foreground |

## What you do from the phone

1. **See tasks** on the connected computer, including when input is needed.
2. **Approve** commands and actions before Codex continues on that host.
3. **Review** responses, changed files, diffs, and test results.
4. **Start** a new task against a connected computer and project.

The host’s sandbox, approval policy, and organization settings still apply.

## Remote vs Cloud vs app-server

| | Remote | Cloud | `codex app-server` |
| --- | --- | --- | --- |
| Where work runs | Your paired Mac / Windows (or its SSH project) | OpenAI-hosted env | A process you start, usually for a custom client |
| Needs the laptop awake | **Yes** | No | Depends on that process |
| Typical entry | ChatGPT mobile **Remote** | [chatgpt.com/codex](https://chatgpt.com/codex) | `codex app-server --listen …` |
| Use when | Approve / steer a local session from the phone | Parallel hosted jobs | Embed Codex in a product |

App Server protocol: [Codex App Server](https://learn.chatgpt.com/docs/app-server). SSH projects and chat handoff: [Remote connections](https://learn.chatgpt.com/docs/remote-connections).

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Pairing different workspaces | Host never appears | Same account **and** workspace |
| Letting the laptop sleep | Session drops | Keep the host awake; or use [Cloud](./codex-cloud) |
| Expecting Cloud-style isolation | Phone drives **your** machine | Do not treat Remote as a sandbox |
| Exposing app-server on a public port | Unauthenticated listeners during rollout | Use official Remote pairing or `wss://` + auth; prefer a VPN |
| Looking for setup in the CLI | There is no CLI pairing flow | Start from the desktop app |

## Real-world use

You kick off a local test-and-fix in desktop Codex before leaving the office. On the train you open **Remote**, approve one `pnpm test` run, and read the diff. If the laptop will sleep, do not use Remote — send the job to [Cloud](./codex-cloud) before you close the lid.

## Next steps

1. Full pairing, SSH, handoff, troubleshooting → [Remote connections](https://learn.chatgpt.com/docs/remote-connections)
2. Hosted jobs that survive sleep → [Cloud](./codex-cloud)
3. Desktop Chat / Work / Codex → [Work](./chatgpt-work) · [product line](./codex-ai)

## Official sources

- [Codex Remote (landing)](https://learn.chatgpt.com/codex/remote)
- [Remote (docs)](https://learn.chatgpt.com/docs/remote)
- [Remote connections](https://learn.chatgpt.com/docs/remote-connections)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [App Server](https://learn.chatgpt.com/docs/app-server)
