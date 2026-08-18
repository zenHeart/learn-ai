# Gemini Code Assist

> Google's IDE integration. The one coding product in the family whose primary selling point is **enterprise compliance**.

## What it is for

Autonomous agents are the direction of travel, but developers still spend most of their time in VS Code or JetBrains. Code Assist fills that gap: it does not ask you to change tools or workflow, and the price is that its context boundary is whatever the editor can see.

Supported IDEs: VS Code, the JetBrains family, Android Studio.

## Three editions

The official editions are free / Standard / Enterprise. **Capability is attached to the edition, not to your personal Google AI subscription** — buying personal AI Pro does not turn Code Assist into the enterprise product.

**Since 2026-06-18 the individual free tier, and Google AI Pro / Ultra via Login with Google, no longer serve the IDE extensions.** Individual developers should move to the [Antigravity](./antigravity) IDE / CLI surfaces. Standard / Enterprise licences are unchanged. [Official deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals).

The enterprise editions sell compliance, not extra intelligence. The official documentation opens by addressing "organizations with strict data security and compliance requirements" and explicitly offers:

- VPC Service Controls
- IP indemnification

If your team cannot use other AI coding tools for compliance reasons, this is the one in the family to look at.

On models, the official documentation notes that Code Assist uses Gemini 2.5 models.

## Core capabilities

| Capability | Notes |
|---|---|
| Completion and generation | the main interaction shape inside the editor |
| Agent mode | understands codebase context and executes multi-step changes |
| MCP support | can connect external tools |
| Gemini CLI quota | the subscription includes Gemini CLI usage quota |

> ⚠️ Older docs contained this configuration block:
>
> ```json
> { "codeAssist": { "agentMode": { "enabled": true, "autoApprove": true } } }
> ```
>
> **That JSON key does not exist in the official documentation.** Agent mode is real, but follow the official docs for how to enable it rather than copying this.

## How to use it well

### Specification first

Do not throw a vague idea at it and expect a perfect result. Have it produce a specification, then generate against that specification:

```
1. Generate spec.md through conversation
   → interface constraints, Props definitions, state management strategy, edge cases

2. Feed spec.md back as context

3. Generate code step by step against the spec
```

The real benefit is that it **prevents architectural drift over a long conversation**. With a written spec in context, the model has an anchor at every step; without one it slowly diverges from your original intent, and the divergence is hard to notice.

### Pair it with Gemini CLI for debugging

Reading an error in the editor is worse than piping the log straight over:

```bash
npm run build 2>&1 | gemini -p "analyse the build error and give the smallest fix"
npx tsc --noEmit 2>&1 | gemini -p "group these type errors by root cause"
```

The division of labour is clean: **terminal work goes to [Gemini CLI](./gemini-cli), editor work goes to Code Assist.**

## Common problem: context hallucination across repositories

**Symptom**: when generating logic that spans micro-frontends or services, it starts inventing API contracts.

**Cause**: an IDE plugin's context is limited to the open files and the locally indexed workspace. If your frontend depends on type definitions in a backend repository that is not indexed locally, the model cannot see them and can only guess.

**Fix**:

1. Pull the relevant interface contracts and type definition files into the current workspace
2. Select that content and explicitly include it in context

**The underlying judgement**: if a task inherently requires understanding several repositories at once, Code Assist is the wrong tool. That case wants [Antigravity](./antigravity), which can go and read for itself.

## Choosing between this and the others

The full comparison table is in the [cheatsheet](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules) and is not repeated here.

The easiest way to remember it is by scope of change:

| Scope | Use |
|---|---|
| Executing and debugging in the terminal | [Gemini CLI](./gemini-cli) |
| Completion in the editor, one file to a few nearby files | Code Assist |
| Cross-module, needs to read the code itself | [Antigravity](./antigravity) |
| Hand it off and wait for a PR | [Jules](./jules) |

## Official resources

- [Code Assist overview](https://developers.google.com/gemini-code-assist/docs/overview)
- [Write code with Gemini](https://developers.google.com/gemini-code-assist/docs/write-code-gemini)
- [Product page](https://codeassist.google)

## Related pages

- [Cheatsheet](./gemini-cheatsheet) — cross-product decision table
- [Cookbook](./gemini-cookbook#_15-your-team-has-data-compliance-requirements) — the compliance recipe
