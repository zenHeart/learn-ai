# PR Routing & Approval

PR Routing & Approval **routes pull requests to the right reviewers** and can **approve low-risk changes** when your criteria are met. It runs on Automations. It **does not replace a full code review**.

> Official: [PR Routing & Approval](https://cursor.com/docs/approval-agents). Configure at [Automations](https://cursor.com/automations/from-cursor/pr-routing-and-approval).
>
> Policy files: exact basename **`APPROVAL_POLICY.md`**, plus optional `.cursor/approval-policies/ROUTING.md`.

## Prerequisites

- Source control connected for the orgs / repos you care about
- Team admin access to **edit** the automation (non-admins can view only)
- Optional: Bugbot and/or [Security Agents](./security-agents) if you want those findings in the decision
- Security Review Context needs Security Agents on a **team or enterprise** plan

## Learning objectives

After this page you can:

1. Turn on reviewer assignment and / or automatic approval separately
2. Drop a trusted `APPROVAL_POLICY.md` in the right directory
3. Know which filenames are **ignored**
4. See why a PR that edits its own policy will not relax review for that same PR

---

## What it does

The agent assigns reviewers from **code ownership and commit history**. It can approve when your **approval criteria**, **risk settings**, **policy files**, **AI reviewer findings**, and **current review state** all line up.

Two capabilities you enable independently:

| Capability | Official toggle | Job |
|------------|-----------------|-----|
| Reviewer assignment | **Enable PR Routing and Requests for Review** | Request reviewers |
| Risk-based approval | **Automatically Approve PRs** | Approve only after you configure criteria |

## Signals it can read

### AI reviewer awareness

- **Bugbot Review Context** — Bugbot findings feed the approval decision
- **Security Review Context** — Security Agent findings feed the approval decision

When enabled, the agent **waits** for those checks to finish. If Bugbot or Security Agents report findings that need human review, PR Routing **will not approve**.

Security Agents require a **team or enterprise** plan.

### Risk scoring

- **Use Risk Score** — classify the PR (customizable with prompting)
- **Maximum Risk Threshold** — highest risk the agent may approve

If the PR exceeds the threshold, it will not approve.

## Policy files

### `APPROVAL_POLICY.md`

For each changed file, the agent walks that file's directory and every ancestor looking for this **exact** filename:

```text
APPROVAL_POLICY.md
```

Only exact basename matches are trusted. These are **ignored**:

- `POLICY.md`
- `approval_policy.md`
- `APPROVAL_POLICY.md.bak`
- `team_APPROVAL_POLICY.md`

The **closest** applicable file has the highest priority. Ancestor policies still apply unless they conflict with a more specific one.

### `.cursor/approval-policies/ROUTING.md`

Top-level routing file. YAML list of product entries:

- `product` — product or area name
- `boundary` — semantic boundary, or a repository-relative path / glob
- `policies` — policy prompt pointers (paths or semantic descriptions)

If `ROUTING.md` is missing, directory-based `APPROVAL_POLICY.md` discovery **still runs**. Missing routing does not weaken policy discovery.

### Precedence

Applicable approval policy prompts override generic approval criteria, risk thresholds, reviewer-selection guidance, custom approval instructions, and the default automated-review posture.

If policies conflict: follow the **most specific**. If specificity is unclear: follow the **stricter** instruction and **avoid auto-approval**.

If a PR **changes** an approval policy, the routing file, a routed policy file, or a reviewer-specific policy file, the agent does **not** use the changed content to relax review for **that same PR**. It uses the **base-branch** version when available, or requires human review.

Minimal example (shape only — write the actual rules your team needs):

```markdown
# APPROVAL_POLICY.md  (docs/ only, for example)

Auto-approve typo and copy edits in this directory.
Require a human reviewer for any change that touches authentication,
billing, or dependency versions.
```

## Setup

Open [PR Routing & Approval in Automations](https://cursor.com/automations/from-cursor/pr-routing-and-approval).

1. Enable routing and / or automatic approval
2. Choose organizations and repositories
3. Configure **triggers**:
   - **PR opened**
   - **PR pushed / updated**
   - **PR commented** (comment matching a regex)
4. In **Configuration**, pick signals: Bugbot context, Security context, risk score, max risk
5. Optional **Custom Prompt** for local expectations. Policy files still win for applicable files. If empty, Cursor-managed defaults apply
6. Tools: the agent needs **at least one** primary action — **Request Reviewers** and / or **Approve PR**. Optional: Slack, Microsoft Teams, extra MCP
7. Save. Enable or disable later from the detail page

Triggers can be scoped to repos or orgs. Team admins can set broader team scopes.

## When to use it

- Large monorepo: route by ownership so the right humans see the PR
- Low-risk docs / generated files: auto-approve only where `APPROVAL_POLICY.md` says so
- Combine with Bugbot + Security Agents so auto-approve **waits** on those findings

Keep a human review for auth, payments, and anything your policy marks as out of bounds. This product **does not replace** that review.

## Common pitfalls

| Pitfall | Do this |
|---------|---------|
| `approval_policy.md` or `POLICY.md` | Exact name **`APPROVAL_POLICY.md`** |
| Expect missing `ROUTING.md` to disable policies | Directory discovery still runs |
| Edit the policy in the same PR to loosen it | Agent uses the **base-branch** copy, or requires a human |
| Enable auto-approve with no primary action | Need **Approve PR** (and / or **Request Reviewers**) |
| Ignore Bugbot / Security findings | If those contexts are on and they need a human, **no auto-approve** |
| Treat it as Bugbot | Bugbot comments; this **routes and maybe approves** |

## Next steps

- [Security Agents](./security-agents) — Security Review Context
- [Cookbook · Bugbot](./cursor-cookbook#review-prs-with-bugbot) — Bugbot Review Context
- [Cloud Agents](./cloud-agents) — Automations run Cloud Agents
- Official: [PR Routing & Approval](https://cursor.com/docs/approval-agents), [Automations](https://cursor.com/docs/cloud-agent/automations)
