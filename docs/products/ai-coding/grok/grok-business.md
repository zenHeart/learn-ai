# Grok Business & Enterprise

> Official positioning ([docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide)):
> "**Grok Business provides dedicated workspaces for personal and team use, with enhanced privacy and sharing controls.**"
>
> [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) lists **Business & Enterprise** as a first-class next step: "team workspaces, licenses, and organization controls."
>
> This page is a product map for that official entry. On this site's complexity axis it sits later than Grok Build. It still gets a page because xAI put it on the Grok docs home.

## Goals and non-goals

**Audience:** someone whose company already has (or is buying) Grok Business / Enterprise, not a solo SuperGrok subscriber.

**Goals:** explain personal vs team workspaces, licenses, sharing, and the admin console. Point at official pages.

**Non-goals:** invented seat prices, a second copy of Enterprise legal terms, or Grok Build's `/etc/grok/requirements.toml` policy (that is [enterprise CLI policy](https://docs.x.ai/build/enterprise), a different product).

## What you get

A **team workspace** ([user-guide](https://docs.x.ai/grok/user-guide)):

- Privacy guarantees as outlined in xAI's [enterprise terms](https://x.ai/legal/terms-of-service-enterprise).
- Full benefits of **SuperGrok** (or **SuperGrok Heavy** for upgraded licenses).
- Secure sharing of conversations limited to **active** team members.

Two workspace types:

| Workspace | Who it is for | Gate |
|-----------|---------------|------|
| **Personal** | Individual use | Available unless the org disables it on an Enterprise license |
| **Team** | Collaborative work | Only with an **active license** |

Switch workspaces with the selector in the **bottom-left** navigation on grok.com. Start new conversations in the correct workspace.

If you cannot open the team workspace, you lack an active license — contact a team admin. If you **do not see a personal workspace**, the org disabled it; enabling/disabling that is an Enterprise / sales conversation ([user-guide](https://docs.x.ai/grok/user-guide)).

Enterprise adds custom retention policies. This page does not paraphrase the legal terms — read [x.ai/legal/terms-of-service-enterprise](https://x.ai/legal/terms-of-service-enterprise).

## Licenses and users

Hub: the Grok Business overview at [console.x.ai](https://console.x.ai) ([management](https://docs.x.ai/grok/management), [user-guide](https://docs.x.ai/grok/user-guide)).

Official license types ([management](https://docs.x.ai/grok/management)):

- **SuperGrok** — standard business access with enhanced quotas and features.
- **SuperGrok Heavy** — upgraded performance for demanding workloads.

This page does **not** invent a dollar price per seat.

Admin flow (condensed from [management](https://docs.x.ai/grok/management) and [user-guide](https://docs.x.ai/grok/user-guide)):

1. Buy licenses on the overview (type + quantity). Needs **Billing Read-Write**.
2. Invite users by email; optionally pick a license to auto-provision on accept. Needs **Team Read-Write**. Invited users get team workspace access and basic team read (so conversations can be shared).
3. Assign / revoke licenses from the user list. Revoke returns the license to the pool and drops **team** workspace access; **personal** workspace remains.
4. Cancel unused licenses on the overview. Cancellations may take a few days; eligible refunds go to the billing method.

End-user activation ([user-guide](https://docs.x.ai/grok/user-guide)): console.x.ai → **Assign license** → pick the type. Then the team workspace appears on grok.com.

## Sharing

Team conversation sharing ([user-guide](https://docs.x.ai/grok/user-guide)):

1. Open the conversation **in the team workspace**.
2. Share button → select team members → generate the link.
3. Links open only for **licensed** team members. Non-members and unlicensed teammates cannot open them.
4. Inbox: [grok.com/history?tab=shared-with-me](https://grok.com/history?tab=shared-with-me).

Org-wide sharing policy is a **ceiling**, not a default share ([management](https://docs.x.ai/grok/management)). Admins set it in console.x.ai → **Sharing & Retention** → **Product Sharing**. Each resource type has its own policy: conversations, projects, skills.

| Level | What members can do |
|-------|---------------------|
| **Private** | Sharing off for that resource |
| **Team** | Individual teammates and the member's own team. No org-wide / cross-team |
| **Organization** | Team, plus other teams and everyone in the org |
| **Public** | Organization, plus public links anyone can open |

Public links apply to **conversations only**. Projects and skills cap at Organization. Defaults: conversations and projects can be shared organization-wide; **skills start at Private**. Tightening a policy applies immediately, including existing shares that now sit above the ceiling.

## Connectors in a team

Business / Enterprise members do **not** add connectors on their own first. A team admin must provision the connector in the console; then members connect their own accounts on [grok.com/connectors](https://grok.com/connectors). Details: [Connectors](./grok-connectors.md) and [connector-management](https://docs.x.ai/grok/connector-management).

## Not this page

| Product | Why it is different |
|---------|---------------------|
| Personal SuperGrok on grok.com | No team workspace, no license pool. See [Grok Chat](./grok-chat.md) |
| xAI API "teams" in the consumer [FAQ](https://docs.x.ai/grok/faq) | Console teams for **API usage / invoices**, not Grok Business workspaces |
| Grok Build enterprise policy | Five config layers, OIDC, MDM on the **CLI** ([docs.x.ai/build/enterprise](https://docs.x.ai/build/enterprise)) |
| Grok Bot teams | Per-member cloud computer ([docs.x.ai/grok-bot/teams-and-enterprises](https://docs.x.ai/grok-bot/teams-and-enterprises)) |

## Common pitfalls

- Starting a confidential thread in the **personal** workspace, then wondering why team sharing links do not work.
- Expecting an unlicensed teammate to open a share link. Officially they cannot.
- Mixing Grok Business licenses with `XAI_API_KEY` API credit.
- Looking for a seat price on this page. Official docs list **license types**, not consumer dollar amounts.

## Official docs

| Page | Use |
|------|-----|
| [docs.x.ai/grok/user-guide](https://docs.x.ai/grok/user-guide) | Workspaces, privacy, conversation sharing, activate license |
| [docs.x.ai/grok/management](https://docs.x.ai/grok/management) | Buy / invite / assign / revoke / cancel, sharing policy |
| [docs.x.ai/grok/connector-management](https://docs.x.ai/grok/connector-management) | Admin provisions connectors |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | First-class "Business & Enterprise" link |
| [console.x.ai](https://console.x.ai) | Admin hub |
| [enterprise terms](https://x.ai/legal/terms-of-service-enterprise) | Privacy / data handling |

White-glove / Enterprise upgrades: contact xAI sales (the docs pages leave the address as a site widget).

## Related pages

- [Grok Chat](./grok-chat.md) — what members use inside a workspace
- [Connectors](./grok-connectors.md) — admin provision + member OAuth
- [Grok Bot](./grok-bot.md) — different team product
- [Grok Build tutorial](./grok-cli.md) — CLI enterprise policy is elsewhere
- [Grok learning map](./index.md)
