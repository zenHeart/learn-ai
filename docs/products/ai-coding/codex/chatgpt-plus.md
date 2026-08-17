# ChatGPT Plans and Codex Access

> How Codex access is tied to a ChatGPT plan, what that gets you, and where the authoritative numbers live.
>
> This page deliberately quotes no prices or quota figures. Those change, and a stale number in a tutorial is worse than no number. The single source of truth is the [official pricing page](https://learn.chatgpt.com/docs/pricing).

## Codex is included with a ChatGPT plan

From the official documentation:

> ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex.

That is the important fact and it removes a common source of confusion: you do not buy Codex separately, and you do not need to provision an API key to use the CLI. You sign in with your ChatGPT account.

```bash
codex login
codex status
```

`codex status` shows the account and plan Codex is currently operating under. If you have both a personal and a work account, that is the command to run before wondering why your limits look wrong.

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

## Using ChatGPT and Codex together

They are different tools with different strengths, and the pairing is genuinely useful:

| Task | Better in |
| --- | --- |
| Thinking through an approach before any code exists | ChatGPT |
| Comparing libraries or architectures | ChatGPT |
| Reading and changing files in a real repository | Codex |
| Running tests and iterating until green | Codex |
| Explaining a diff to a colleague | ChatGPT |
| Automating a task in CI | Codex (`codex exec`) |

A workflow that works: settle the design in ChatGPT, write it down as an `AGENTS.md` entry or a task description, then hand the implementation to Codex with a verification command. The design conversation and the implementation session have very different context needs, and keeping them separate produces better output from both.

## Related pages

- [Codex CLI](./codex-cli) — installation and core features
- [Codex Product Line](./codex-ai) — the CLI, IDE, app, and cloud surfaces
- [Codex Cookbook](./codex-cookbook) — task recipes
- [Codex Cheatsheet](./codex-cheatsheet) — commands and config keys
- [Learning Map](./) — the full path

## Official sources

- [Pricing](https://learn.chatgpt.com/docs/pricing) — the only authority on plans and quotas
- [Models](https://learn.chatgpt.com/docs/models) — model list and reasoning effort
- [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) — `requirements.toml` and every config key
