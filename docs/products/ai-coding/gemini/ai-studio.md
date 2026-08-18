# Google AI Studio

> The console for controlling the model and its parameters directly, and the starting point for the Gemini API. It is the only place in the family where you set the temperature, pin a system prompt, and feed in a large amount of context at once.

## What it is for

Every other product decides the model and the parameters for you. AI Studio hands them back:

| What you control | Why it helps |
|---|---|
| Which model | different tasks trade cost against quality differently |
| Temperature and other sampling parameters | audits want reproducibility, creative work wants variety |
| The system prompt | pin the role and constraints instead of restating them |
| How much context goes in at once | the precondition for auditing a large codebase |

It is also the first stop on the path of "get it working in the UI, then integrate through the API".

## Choosing a model

The model list changes very fast, so **always re-check the [official list](https://ai.google.dev/gemini-api/docs/models) before quoting a specific model name**. Currently available and retired models are in [model status in the cheatsheet](./gemini-cheatsheet#model-status) and are not repeated here.

Only one principle is worth memorising: **get the flow working on cheap Flash first, and only consider a stronger model once you know the prompt works.** Doing it the other way round burns a lot of quota during the prompt-tuning phase.

## Long-context audits

This is AI Studio's most distinctive capability relative to the other tools.

**There is exactly one quotable number**: the official subscription comparison lists 1,000,000-token extended context for Pro and above.

<!-- TODO: needs verification — the context window ceiling of each specific model. The official model list page does not enumerate context windows per model; the older docs' "2 million tokens ≈ 1.5 million English words ≈ 5,000 pages" chain was derived entirely from an unsourced number and has been removed. -->

### Fuller context is not better context

The real constraint on long context is not capacity but **attention distribution**:

```
How well the model uses different positions in the context (illustrative)

  utilisation
      high │ ██                                    ██
           │ ████                                ████
           │ ██████                            ██████
       low │ ████████████████████████████████████████
           └────────────────────────────────────────────
            start            middle                  end
             ↑                 ↑                      ↑
      system prompt      easily ignored          your question
      core constraints   (detail buried here      acceptance criteria
                          often does not land)
```

Practical conclusions:

1. **Put the most important constraints at the start, and the question plus acceptance criteria at the end**
2. Put reference material in the middle, not rules that must be obeyed
3. Filling 1,000,000 tokens is worse than curating 200,000 — **noise dilutes signal**

<!-- TODO: needs verification — the diagram above describes a widely observed phenomenon in long-context use and is not an official chart. The official long-context documentation (https://ai.google.dev/gemini-api/docs/long-context) gives usage advice, but no official statement provides a quantified position-versus-utilisation curve. -->

### Preparing the audit input

The key is to **feed only source code and type definitions** and strip the noise out. A small script assembles the input more reliably than copying by hand:

```python
#!/usr/bin/env python3
"""Concatenate repository source into a single audit input for the model."""
from pathlib import Path

INCLUDE_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".vue", ".py"}
EXCLUDE_DIRS = {
    "node_modules", "dist", "build", ".git", ".next",
    "coverage", "__pycache__", ".vitepress",
}

def collect(root: Path) -> str:
    parts = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix not in INCLUDE_SUFFIXES:
            continue
        if EXCLUDE_DIRS & set(path.parts):
            continue
        rel = path.relative_to(root)
        parts.append(f"\n===== {rel} =====\n{path.read_text(errors='ignore')}")
    return "".join(parts)

if __name__ == "__main__":
    body = collect(Path("."))
    # Rough estimate: about 4 characters of English code per token; order of magnitude only
    print(f"~{len(body) // 4} tokens, {len(body)} characters")
    Path("audit-input.txt").write_text(body)
```

Paste the resulting file into AI Studio, or wire up the API following the [official quickstart](https://ai.google.dev/gemini-api/docs/quickstart).

> Converting characters to tokens is an **order-of-magnitude estimate** for judging whether a repository will fit at all. It is not a billing basis — use the official counting endpoint for accurate counts.

### How you ask decides what you get

```
✅ Find every place that manipulates the DOM directly, list them by file, and note whether a framework API could be used instead
✅ List every circular dependency across modules
❌ Review the quality of this codebase        ← no acceptance criteria, so the output is inevitably vague
```

**Ask one class of question at a time.** Mixing them makes every answer shallow.

## Tuning parameters

| Scenario | Temperature | Reasoning |
|---|---|---|
| Code audit, fact extraction | Low | you want reproducibility; the same input should yield the same conclusion |
| Refactoring options, naming suggestions | Medium | some variety helps you compare options |
| Brainstorming, copywriting | High | divergence is the point |

<!-- TODO: needs verification — the numeric range behind each temperature band. Valid ranges and defaults differ per model; follow the official API reference for the model you are using. -->

**Pin the system prompt before tuning the temperature.** Adjusting parameters while the prompt is still vague makes it impossible to tell which side caused a change.

## Controlling cost

The AI Pro tier provides US$10/month of Google Cloud credit through the Google Developer Program (Ultra 5x gets US$40, Ultra 20x gets US$100).

**The first thing to do is set a budget, not start calling APIs**: GCP console → Billing → Budgets & alerts → create a budget matching the credit amount → enable 50% / 90% / 100% alerts.

Credit is money you were given, not a hard cap, and **anything beyond it bills normally**. A single long-context call costs far more than an interactive exchange, so running batch scripts without a budget is the easiest trap to fall into.

Billing definitions are in the [official billing documentation](https://ai.google.dev/gemini-api/docs/billing).

<!-- TODO: needs verification — per-million-token pricing for each AI Studio / Gemini API model. The "$0.25 per million input tokens" figure in older docs had no source and no official statement was found; follow the official pricing page. -->

## Choosing between this and the others

- want the model **in your terminal** → [Gemini CLI](./gemini-cli)
- want it **in your editor** → [Code Assist](./code-assist)
- want **autonomous code changes** → [Antigravity](./antigravity) / [Jules](./jules)
- want to **control the model itself**, or to put Gemini inside your own product → AI Studio

## Official resources

- [AI Studio](https://aistudio.google.com)
- [Model list](https://ai.google.dev/gemini-api/docs/models)
- [Long context documentation](https://ai.google.dev/gemini-api/docs/long-context)
- [Billing](https://ai.google.dev/gemini-api/docs/billing)

## Related pages

- [Cheatsheet](./gemini-cheatsheet#model-status) — model status and the retired list
- [Cookbook](./gemini-cookbook#_12-having-ai-read-the-whole-repository-for-an-audit) — the whole-repository audit recipe
