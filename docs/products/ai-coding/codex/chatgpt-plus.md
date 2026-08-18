# ChatGPT Plans and Codex Access

> How Codex access is tied to a ChatGPT plan, what that gets you, and where the authoritative numbers live.
>
> This page deliberately quotes no prices or quota figures. Those change, and a stale number in a tutorial is worse than no number. The single source of truth is the [official pricing page](https://learn.chatgpt.com/docs/pricing).

## Codex is included with a ChatGPT plan

From the official Codex landing page:

> ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex.

That is the important fact for the CLI: you do not buy Codex separately, and you do not need to provision an API key for normal use. You sign in with your ChatGPT account.

The [pricing page](https://learn.chatgpt.com/docs/pricing) also lists **Free** and **Go** as including some Codex capability. The Plus card is the one that explicitly names "Codex on the web, in the CLI, in the IDE extension, and on iOS." Surfaces and limits vary by plan — read that page rather than trusting a tutorial table.

```bash
codex login
codex login status    # exits 0 when saved credentials are present
codex doctor          # local diagnostic report
```

There is no `codex status` subcommand in the official CLI reference. For the account, model, and configuration of the *current session*, use `/status` inside the TUI.

## Which plan, and why it matters

Rather than reproduce a table that will be out of date next month, here is what actually varies between plans, so you know what to look for when you read the pricing page:

| What varies | Why you'd care |
| --- | --- |
| Included usage before limits apply | How long a heavy day of agent work lasts |
| Model access | Whether the newest or fastest models are available to you |
| Cloud execution capacity | How much you can push to `codex cloud` |
| Admin and governance controls | Whether you can enforce `requirements.toml` across a team |
| Seat management | Whether the plan is per-person or per-organization |

Two concrete points that are documented and worth knowing:

- **ChatGPT Pro** includes access to `GPT-5.3-Codex-Spark` as a research preview.
- **Business, Edu, and Enterprise** are the plans where managed configuration matters — see [requirements.toml](./codex-glossary#requirementstoml-managed-policy) for what an administrator can pin.

For anything numeric, read [learn.chatgpt.com/docs/pricing](https://learn.chatgpt.com/docs/pricing).

## Watching your own consumption

Codex reports usage in-session, which is more useful than checking a dashboard after the fact.

```
/usage              # current session
/usage daily
/usage weekly
/usage cumulative
```

`/status` shows the session's account, model, and configuration state.

Two habits keep consumption predictable:

**Match reasoning effort to the task.** `model_reasoning_effort` runs from `minimal` through `xhigh`. High effort on a one-line rename is waste; low effort on a subtle concurrency bug is false economy.

```toml
model_reasoning_effort = "medium"
```

**Don't carry dead context.** A long session that drifted off-task spends budget re-reading history that no longer matters. `/clear` between unrelated tasks is the cheapest optimization available.

## Where the API is separate

Two things are billed through the OpenAI API rather than your ChatGPT plan, and both are opt-in:

- **A custom model provider.** If you configure `model_providers` to point at your own endpoint, that endpoint's billing applies.
- **High-volume image generation.** Image generation normally draws on your included limits — the documentation notes it consumes them 3 to 5 times faster than text. Setting `OPENAI_API_KEY` switches large batches to API pricing instead.

Under normal CLI use with `codex login`, neither applies. If you have never set `OPENAI_API_KEY` and never touched `model_providers`, your usage is on your ChatGPT plan.

> There is no `api_key` setting in the Codex configuration reference. Authentication is `codex login`, or a provider entry with `env_key` naming an environment variable. <!-- TODO: 待核实 --> Older guides sometimes show an `api_key` key in `config.toml`; it is not present in the current official reference.

## Enterprise and team deployments

If you are rolling Codex out to a team, the relevant surface is not the plan page but the managed-policy layer:

| Concern | Mechanism |
| --- | --- |
| Restrict which approval policies are selectable | `allowed_approval_policies` in `requirements.toml` |
| Restrict sandbox modes | `allowed_sandbox_modes` |
| Restrict web search | `allowed_web_search_modes` (`disabled` is always allowed) |
| Allowlist MCP servers | `mcp_servers` entries with an `identity` block |
| Pin feature flags | `[features]` in `requirements.toml` |
| Data residency | `enforce_residency` |

Managed permission-profile allowlists require **Codex 0.138.0 or later**. Clients on 0.137.0 and earlier silently ignore `allowed_permission_profiles` and managed `default_permissions` — a rollout that assumes enforcement without checking client versions is not enforcing anything.

See the [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) for the full `requirements.toml` surface.

## ChatGPT Chat (conversation) {#chatgpt-chat-conversation}

The Claude.ai counterpart is **Chat**, not a separate install. Official docs split the same app into Chat / Work / Codex ([Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt)).

| Choose | When | This guide |
| --- | --- | --- |
| **Chat** | Questions, brainstorms, short drafts, settling a design | This page |
| **Work** | A file someone can open and review | [ChatGPT Work](./chatgpt-work) |
| **Codex** | Repo, diff, tests, PR | [Product line](./codex-ai) · [CLI](./codex-cli) |

Chat surfaces frontend engineers actually hit:

- **Projects** — chats, files, and instructions under one topic.
- **Voice** — desktop and iOS; can talk through uploaded files and Projects.
- **Library** — reuse saved files without uploading again.
- **Web / desktop / mobile** — one account. On 2026-07-09 the standalone Codex app merged into the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app). Every plan, including Free, can open Chat, Work, and Codex; limits still come from the pricing page.

The GPT-5.6 Sol slider in Chat does **not** change model behavior in Work or Codex.

## Using ChatGPT and Codex together

They are different tools with different strengths, and the pairing is genuinely useful:

| Task | Better in |
| --- | --- |
| Thinking through an approach before any code exists | Chat |
| Comparing libraries or architectures | Chat |
| An eight-slide deck / comparison sheet / recurring agenda | [Work](./chatgpt-work) |
| Reading and changing files in a real repository | Codex |
| Running tests and iterating until green | Codex |
| Explaining a diff to a colleague | Chat |
| Automating a task in CI | Codex (`codex exec`) |

A workflow that works: settle the design in Chat, write it down as an `AGENTS.md` entry or a task description, then hand the implementation to Codex with a verification command. The design conversation and the implementation session have very different context needs, and keeping them separate produces better output from both.

## Atlas: officially retired — do not document it as current

The standalone **ChatGPT Atlas** browser is not a rumor to hedge. Official pages already closed it:

- [Evolving Atlas into ChatGPT](https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work): browser-based agentic work moves into ChatGPT and Codex; **Atlas is scheduled to stop working on 2026-08-09**.
- [ChatGPT is now a partner for your most ambitious work](https://openai.com/index/chatgpt-for-your-most-ambitious-work/) (2026-07-09): the Codex app merges into the new ChatGPT desktop app; “We'll begin sunsetting the standalone Atlas browser.”
- [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes), **Retiring Atlas**, repeats the same stop date.

Today (2026-08-18) is after that date. For browser-agent work use the desktop **built-in browser**, the [Chrome extension](https://learn.chatgpt.com/docs/chrome-extension), or Work’s **cloud browser**. Do not cite WSJ / Reddit merger rumors; those three pages are the record.

<!-- TODO: 待核实 --> Whether Atlas bookmarks / passwords can still be exported from a leftover local install after 2026-08-09 is whatever the help article currently says. This guide does not invent steps.

## Related pages

- [Learning Map](./) — family tree and decision tree
- [ChatGPT Work](./chatgpt-work) — reviewable deliverables, plugins, Sites
- [Codex CLI](./codex-cli) — installation and core features
- [Codex Product Line](./codex-ai) — CLI, IDE, app, and cloud
- [Codex Cookbook](./codex-cookbook) — task recipes
- [Codex Cheatsheet](./codex-cheatsheet) — commands and config keys

## Official sources

- [Pricing](https://learn.chatgpt.com/docs/pricing) — the only authority on plans and quotas
- [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) — Chat / Work / Codex
- [Models](https://learn.chatgpt.com/docs/models) — model list and reasoning effort
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) — `requirements.toml` and every config key
- [Evolving Atlas](https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work)
