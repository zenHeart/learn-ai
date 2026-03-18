# SFT (Supervised Fine-Tuning)

## What is Fine-Tuning?

**Supervised Fine-Tuning (SFT)** is the process of training an existing pre-trained model on your specific data to adapt it to your domain or task. It adjusts the model's parameters to specialize in your use case.

**The Core Idea**: Take a general-purpose LLM → Train it on your data → Get a specialized model

**Why Fine-Tuning**:
- Improve performance on domain-specific tasks
- Learn specialized terminology and patterns
- Reduce prompt engineering needs
- Better consistency in outputs

::: info Frontend Engineer Recommendation
**For Implementation: Hire ML Engineers**

As a frontend developer, you generally should **not** be implementing SFT yourself unless using a managed service like OpenAI's fine-tuning API. This is typically the domain of Machine Learning Engineers.
:::

## SFT vs RAG vs Prompt Engineering

| Aspect | Prompt Engineering | RAG | Fine-Tuning (SFT) |
|--------|-------------------|-----|-------------------|
| **Cost** | Very Low (free) | Low (inference + retrieval) | Very High (GPU training) |
| **Setup Time** | Minutes | Hours to days | Days to weeks |
| **Data Needed** | None (just prompts) | Documents for retrieval | 100s-1000s labeled examples |
| **Speed** | Fast | Medium (retrieval overhead) | Fast (after training) |
| **Updates** | Instant | Instant (update knowledge base) | Requires retraining |
| **Best For** | General tasks | Dynamic knowledge | Specialized domains |

## When to Use Fine-Tuning

### ✅ Good Use Cases

1. **Specialized Domain Language**
   - Medical diagnosis (medical terminology)
   - Legal document analysis (legal jargon)

2. **Consistent Output Format**
   - Always need specific JSON structure
   - Code generation in proprietary framework

3. **Style and Tone**
   - Brand-specific writing style
   - consistent personality across responses

4. **Performance Optimization**
   - Need smaller model with specialized capability to reduce costs/latency

### ❌ Bad Use Cases (Use RAG Instead)

1. **Frequently Changing Information**
   - Product catalogs
   - News and updates

2. **Large Knowledge Bases**
   - Company wikis
   - Technical manuals

3. **Limited Budget**
   - Startups without GPU access
   - Prototype/MVP stage

## Services for Fine-Tuning

If you decide SFT is necessary, these platforms offer managed fine-tuning services that don't require managing GPU infrastructure:

- [OpenAI Fine-Tuning](https://platform.openai.com/docs/guides/fine-tuning) (GPT-3.5, GPT-4)
- [Anthropic Fine-Tuning](https://docs.anthropic.com/en/docs/build-with-claude/fine-tuning-overview) (Claude Haiku)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/fine-tuning)
- [Together AI](https://www.together.ai/) (Open source models)
- [Anyscale](https://www.anyscale.com/) (Open source models)

## Next Steps

- **Evaluate if you really need SFT** (try RAG first)
- **Start with OpenAI's fine-tuning API** if you must proceed
- **Collaborate with ML Engineers** for complex model training