# ChatGPT Sites

> A **tutorial** — turn a prompt (or a compatible local project) into a **hosted** website or app. Sites is a public-beta product next to ChatGPT Work, not a footnote. Every deploy URL is production.
>
> Official landing: [learn.chatgpt.com/codex/sites](https://learn.chatgpt.com/codex/sites). Docs: [Sites](https://learn.chatgpt.com/docs/sites). Manage: [chatgpt.com/sites](https://chatgpt.com/sites).

## Prerequisites

| Need | Requirement |
| --- | --- |
| Account | A ChatGPT plan that includes Sites. Limits are plan-wide during the beta — [pricing](https://learn.chatgpt.com/docs/pricing) |
| Surface | ChatGPT **web** or the **desktop app**. CLI and IDE have **no** Sites management UI |
| Optional | A local project you will publish; Codex CLI / IDE can still edit that source |

Availability depends on plan, region, and workspace settings. Hitting a limit can block a new Site, extra storage, or a high-usage public Site; you can still edit existing ones.

**Learning objectives**: start a Site from a prompt; save a version before deploy; pick access; know D1 / R2 vs no storage.

**Non-goals**: treating Sites as your production frontend stack; Claude Design-style brand import (that product does not exist here); CLI sandbox ([CLI](./codex-cli)).

## What Sites is — and is not

Sites lets ChatGPT **create, host, refine, and share** websites, web apps, and games. Mention `website` or `@Sites` to start the workflow. A Site is a persistent hosted output. It survives the Work chat that created it. It is **not** a ChatGPT Project.

It is **not**:

- Claude Design. There is no official “import a design system from the repo, then hand off a bundle” product.
- Staging. The deployment URL is live for the chosen audience.
- A Codex CLI or IDE panel. Create, save, deploy, and manage on the web or desktop. Use CLI / IDE only to edit and test the local source.

Work still owns the knowledge-work agent. This page is the Sites product. Work’s short Sites note lives in [ChatGPT Work](./chatgpt-work#sites-when-you-need-a-hosted-page).

## Where to open it

| Surface | How |
| --- | --- |
| Web | **More → Sites**, or [chatgpt.com/sites](https://chatgpt.com/sites) |
| Desktop | Open **Sites** in the ChatGPT desktop app |
| CLI / IDE | No management view. Edit the local project there; publish from web or desktop |

## First Site (15 minutes)

### 1. Describe the audience and the result

```text
Build a project request dashboard for my operations team. Let team members
submit requests, see who owns each one, update the status, and filter the list.
Require people to sign in with their workspace account, and keep the request
data saved between visits.
```

### 2. Review behavior, not just the screenshot

Check content, data handling, and the signed-in vs signed-out path.

### 3. Refine

Say the change. Attach files or a screenshot when that is the evidence.

On the web preview, **Edit → Describe website edits**. Use **Screenshot** or **Add files and more** when extra context helps.

### 4. Save a version, then deploy

Two stages (desktop / local project):

1. **Save a version** — a reviewable candidate. For a local source project, the version ties to the Git commit used for the build.
2. **Deploy a version** — publishes that candidate and returns the production URL.

If you want to review first, ask ChatGPT to **save a version without deploying**.

### 5. Share with the narrowest audience

A new Site is limited to the owner and workspace admins until you change access.

## Projects, versions, and `.openai/hosting.json`

On desktop / local projects, Sites stores linkage and optional storage binding names in `.openai/hosting.json`. A new starter may omit `project_id` until hosting is provisioned.

```json
{
  "project_id": "<project-id>",
  "d1": "DB",
  "r2": null
}
```

Do **not** put secrets in this file. Hosted env vars live in the Site’s **Settings**. Keep local `.env` / `.env.example` aligned for keys only.

Publish a compatible existing app:

```text
Deploy this project with Sites. Check whether it is compatible, make any
required changes, and give me the deployment URL.
```

## Pick a site shape

| Need | Ask Sites for |
| --- | --- |
| Landing page / content | No persistent app state unless required |
| Saved records, scores, progress | **D1** (relational) |
| Uploads (images, docs, media) | **R2** (object storage) |
| Uploads plus searchable metadata | D1 + R2 |
| Internal, current workspace user | Workspace-authenticated identity |
| Public sign-in | Authentication-enabled Site |

Do not request durable storage for a theme toggle. Do request it for data people expect to survive a refresh.

## Access, Sign in with ChatGPT, domains

Sharing lets people **visit**. It does not let them edit.

Typical options (depends on account and workspace): owner + admins; selected users or groups; anyone in the workspace; anyone on the internet (only if public publishing is on). Enterprise public publishing is **off** by default.

Workspace-restricted Sites already use ChatGPT identity. A public Site can stay open and add optional **Sign in with ChatGPT**:

```text
Add Sign in with ChatGPT to this public Site. Keep the Site available to
signed-out visitors. After they sign in, greet them with their full name
when available, or their email address otherwise. Keep authorization
decisions in server-side code.
```

Platform paths: `/signin-with-chatgpt`, `/signout-with-chatgpt`. Identity arrives as `oai-authenticated-user-email` and optional `oai-authenticated-user-full-name`. Authorize on the server.

Custom domains (where available): you already own the apex or subdomain; Sites does not register DNS. Not available in Enterprise at launch. Add the records Sites shows, wait, refresh status.

## Analytics and teardown

Traffic is recorded without an analytics SDK: unique visitors and page views over time. Open the Site → **More actions → Analytics**. Not available for Sites owned by an Enterprise workspace.

To unpublish without delete: tighten sharing and confirm the old audience cannot open it.

To delete: **Delete site** → type the slug → **Permanently delete**. There is no restore.

## Limits and unsupported uses

Sites runs in a supported runtime. Some frameworks, private networks, databases, background services, and hosting patterns are out.

No data residency or inference residency at launch — including Site code, D1 / R2, artifacts, and logs.

**NEVER** use Sites for PHI, payment-card data, children under 13 (or the applicable age of consent), financial transactions, malware, phishing, impersonation, or other policy violations. Current policy: [Creating and managing ChatGPT Sites](https://help.openai.com/en/articles/20001339).

## Common pitfalls

| Pitfall | What happens | Do this instead |
| --- | --- | --- |
| Deploying to “preview” | The URL is production | Save a version; deploy after review |
| Looking for Sites in the CLI | There is no management UI | Web or desktop |
| Putting secrets in prompts or `hosting.json` | Leak | Site **Settings** for hosted secrets |
| Treating Sites as the production app platform | Runtime / residency / policy limits | Use it for internal tools and betas; keep real prod elsewhere |
| Confusing a Site with a ChatGPT Project | Wrong list, wrong lifetime | Sites list at [chatgpt.com/sites](https://chatgpt.com/sites) |

## Real-world use

A frontend team ships an internal request board: describe the audience, require workspace sign-in, ask for D1 so rows persist, save a version, have one teammate open the URL, then deploy. Implement the long-lived component library in the repo with [Codex](./codex-cli); use Sites for the hosted shell, not as the design system.

Showcase (prompts and live apps): [developers.openai.com/showcase](https://developers.openai.com/showcase).

## Next steps

1. Work vs Codex vs Sites → [Learning Map](./)
2. Work agent (decks, plugins, schedule) → [ChatGPT Work](./chatgpt-work)
3. Local source + review pane → [Code review](https://learn.chatgpt.com/docs/code-review?surface=app)

## Official sources

- [Sites (landing)](https://learn.chatgpt.com/codex/sites)
- [Sites (docs)](https://learn.chatgpt.com/docs/sites)
- [chatgpt.com/sites](https://chatgpt.com/sites)
- [Creating and managing ChatGPT Sites](https://help.openai.com/en/articles/20001339)
- [Privacy / data-protection](https://help.openai.com/en/articles/20001340)
