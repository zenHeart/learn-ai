# Origin

Origin is **Cursor's git forge** (early beta): host repos, mirror GitHub, browse and search at [cursor.com/codebase](https://cursor.com/codebase), and open or merge pull requests. It is a **hosted-code product**, not another Rules file.

> Official: [Origin](https://cursor.com/docs/origin). Feedback: [hi@cursor.com](mailto:hi@cursor.com).
>
> The Origin CLI binary is **`origin`**. That is not the Cursor Agent CLI binary **`agent`**.

## Prerequisites

- A **Pro, Teams, or Enterprise** plan. Origin code storage is **not** on free plans
- Access rolls out in stages — you may not see Origin the day it lands on your plan
- Teams on **legacy privacy mode cannot enable Origin**. Switch to [Privacy Mode](https://cursor.com/help/security-and-privacy/privacy.md#how-do-i-enable-privacy-mode) first
- You can use git, and you know GitHub is optional here (mirror when the source already lives there)

## Learning objectives

After this page you can:

1. Tell Origin apart from Rules, Bugbot, and “just another GitHub integration”
2. Claim a **codebase name** and create or mirror a repo
3. Clone / push with standard git or the Origin CLI
4. Know what a GitHub mirror copies — and what it does **not**

---

## What Origin is (and is not)

Official early-beta list: create repos (including from Cursor agents), clone / push / pull with standard git, [mirror a GitHub repository](https://cursor.com/docs/origin/mirror-github), [open / review / merge PRs](https://cursor.com/docs/origin/pull-requests), [browse and search](https://cursor.com/docs/origin/browse) at `cursor.com/codebase/{owner}/{repo}`, manage repo and codebase settings, connect third-party apps (Vercel, Depot, Buildkite), connect [automations and cloud agents](https://cursor.com/docs/origin/integrations), and install the [Origin CLI](https://cursor.com/docs/origin/cli).

| This | Not this |
|------|----------|
| Git host + browser for your team's code | A replacement for `.cursor/rules` |
| Namespace `{owner}` in `https://cursor.com/codebase/{owner}/{repo}` | A Bugbot check on a GitHub PR |
| Optional GitHub **mirror** | Automatic copy of GitHub Issues or Actions |

Closest cousins on this site: Cloud Agents can clone, branch, commit, push, and open PRs **on Origin remotes**. Bugbot / Cursor Review comment on GitHub PRs **without moving storage**.

## Who can access

Origin code storage is available on **Pro, Teams, and Enterprise**. It is **not** available on free plans.

**Privacy:** Origin follows the [Privacy Mode](https://cursor.com/help/security-and-privacy/privacy.md) of the **namespace owner** — the team or the individual who owns the repo.

## Enable Origin

Someone has to **claim a codebase name** first. That name is the `{owner}` in `https://cursor.com/codebase/{owner}/{repo}`.

1. Open [cursor.com/codebase](https://cursor.com/codebase)
2. Select **Get Started** and finish setup
3. Any team member can claim the name
4. Admins can disable Origin for the team from the dashboard at any time
5. After the name is claimed, admins create repositories and grant access from [codebase settings](https://cursor.com/docs/origin/codebase-settings.md#permissions)

The repo list then shows **Find repo...**, **New**, and **Sync from GitHub**. Icons tell Origin-hosted repos from GitHub-synced ones.

## Create a repository

Official: [Create a repository](https://cursor.com/docs/origin/create-repository).

From [cursor.com/codebase](https://cursor.com/codebase):

1. Select **New**
2. Enter a **Repo Name**
3. Choose visibility: **Internal** (anyone with access to the team's codebase) or **Private** (only members granted access)
4. Select **Create Repo**
5. Copy the clone URL from the green **Code** button

If the code already lives on GitHub, use **Sync from GitHub** instead of **New**.

Cursor agents can create Origin repos as part of a task. They use the same permissions as your Cursor account. Cloud agents work against **existing** Origin repositories: clone, branch, commit, push, and open PRs.

Empty repo, then first push:

```bash
git clone https://origin.cursor.com/{owner}/{repo}.git
cd {repo}
# add your files
git add .
git commit -m "Initial commit"
git push -u origin main
```

Existing local project:

```bash
cd your-project
git remote add origin https://origin.cursor.com/{owner}/{repo}.git
git push -u origin main
```

## Clone, push, and pull

Official: [Clone, Push & Pull](https://cursor.com/docs/origin/git). HTTPS remote:

```text
https://origin.cursor.com/{owner}/{repo}.git
```

```bash
git clone https://origin.cursor.com/acme/checkout.git
```

Sign in with the Origin CLI before the first git operation if you have not already:

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin --version
```

The installer puts the binary at `~/.local/bin/origin`. If the shell says `command not found: origin`, add that directory to `PATH`. Login also sets up the git credential helper.

Keep GitHub and Origin in parallel while you evaluate:

```bash
git remote set-url --add --push origin git@github.com:acme/checkout.git
git remote set-url --add --push origin https://origin.cursor.com/acme/checkout.git
```

For a full history copy, prefer **mirroring**.

## Mirror a GitHub repository

Official: [Mirror a GitHub repository](https://cursor.com/docs/origin/mirror-github).

**Prerequisites:** Origin access on Pro / Teams / Enterprise; the [Cursor GitHub app](https://cursor.com/docs/integrations/github) connected; **GitHub admin** on the source repo.

1. Open [cursor.com/codebase](https://cursor.com/codebase)
2. Select **Sync from GitHub**
3. Choose the GitHub organization and repository
4. Confirm the sync

| Included | Not included |
|----------|--------------|
| Git history, branches, and tags | GitHub Issues |
| Code you can browse and search on Origin | GitHub Actions workflows and secrets |
| Pull requests, which sync in **both** directions | |
| Ongoing updates so Origin stays fresh | |

On a mirrored repo, Origin is the mirror and GitHub remains the **source of truth**. Pushes to the Origin remote pass through to GitHub. PRs opened on Origin sync back to GitHub.

**Detach from GitHub** (Settings → General → Danger Zone) stops the sync and makes Origin the source of truth. Your GitHub repository is not affected.

If you only want review comments on GitHub PRs, use [Cursor Review](https://cursor.com/docs/cursor-review/overview) or [Bugbot](https://cursor.com/docs/bugbot) without moving storage.

## Pull requests

Official: [Pull requests](https://cursor.com/docs/origin/pull-requests).

```bash
git checkout -b my-change
git push -u origin my-change
```

Then use the create-pull-request flow on the **Code** tab. Cloud agents can open Origin PRs as part of a task.

Each PR has four tabs: **Activity**, **Commits**, **Checks**, **Files Changed**. You can request reviewers, comment on lines, and merge once reviews and CI are satisfied.

PRs on a repo **created directly on Origin stay on Origin**. They are not mirrored anywhere.

## Origin CLI vs Cursor CLI

| Binary | Install | Job |
|--------|---------|-----|
| **`origin`** | `curl -fsSL https://downloads.cursor.com/origin/install.sh \| sh` | Auth, create / delete repos, git helper |
| **`agent`** | `curl https://cursor.com/install -fsS \| bash` | Cursor coding agent in a terminal |

```bash
origin repo create my-project
origin repo delete acme/my-project
origin update
```

`origin repo create` without a slash creates the repo in your account's namespace. `origin repo delete` always takes the full `org/name`. Command reference: [Origin CLI commands](https://cursor.com/docs/origin/cli/reference/commands).

## When to use Origin

- You want Cursor-hosted storage, browse, search, and PRs — not just a GitHub comment bot
- A Cloud Agent or Automation should work against an Origin remote
- You are evaluating a GitHub mirror so agents can use Origin browse + PR sync

Stay on GitHub-only when policy forbids a second host, or when you only need Bugbot comments.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| Treat Origin as “more Rules” | It stores **code**. Rules stay in `.cursor/rules` / `AGENTS.md` |
| Expect it on the free plan | Pro / Teams / Enterprise only |
| Enable on **legacy** privacy | Switch to Privacy Mode first |
| Type `agent` when you meant the forge CLI | Install **`origin`** |
| Mirror to get GitHub Issues / Actions | Those stay on GitHub |
| Detach and still expect GitHub to receive Origin pushes | After detach, Origin is the source of truth |

## Next steps

- [Cloud Agents](./cloud-agents) — agents can work on Origin remotes
- [Cursor CLI](./cursor-cli) — coding agent binary `agent`, not `origin`
- [Security Agents](./security-agents) and [PR Routing](./pr-routing) — review / route **after** the code is hosted
- Official: [Origin](https://cursor.com/docs/origin), [Create](https://cursor.com/docs/origin/create-repository), [Mirror](https://cursor.com/docs/origin/mirror-github), [Integrations](https://cursor.com/docs/origin/integrations)
