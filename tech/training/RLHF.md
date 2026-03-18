# RLHF (Reinforcement Learning from Human Feedback)

## What is RLHF?

**Reinforcement Learning from Human Feedback (RLHF)** is a training technique used to align Language Models with human values and preferences. It's the "secret sauce" that turned raw GPT-3 into the helpful ChatGPT assistant we use today.

**The Core Idea**: Train a reward model based on human rankings of AI outputs, then use that reward model to fine-tune the LLM to generate "better" answers.

**Three Steps of RLHF**:
1. **Supervised Fine-Tuning (SFT)**: Train model on human demonstrations.
2. **Reward Modeling**: Humans rank multiple model outputs; train a "Reward Model" to predict these rankings.
3. **Reinforcement Learning (PPO)**: Optimize the LLM to maximize the score from the Reward Model.

::: info Frontend Relevance
**You Will Not Implement This**

RLHF is extremely expensive and complex. It requires massive datasets of human feedback and significant GPU resources. As a frontend engineer, you only need to know that **this is why models refuse to answer harmful questions** or try to be "helpful, honest, and harmless."
:::

## Used By

Virtually all top-tier Chat models use RLHF or similar alignment techniques (like RLAIF - AI Feedback):

- **OpenAI**: ChatGPT (GPT-3.5, GPT-4)
- **Anthropic**: Claude (Constitutional AI, a variation of RLHF)
- **Meta**: Llama 2 & 3 (Llama-2-chat)
- **Google**: Gemini

## Why It Matters for Application Development

Understanding RLHF helps explain certain model behaviors:

1. **Refusals**: Models might refuse benign requests because of over-optimization on safety data during RLHF.
2. **Verbosity**: Models often become "chatty" or hedge their answers ("As an AI language model...") due to RLHF patterns.
3. **Style**: The "personality" of the model is largely shaped during this stage.

## Further Reading

- [Deep reinforcement learning from human preferences (OpenAI)](https://openai.com/research/learning-from-human-preferences)
- [Training language models to follow instructions with human feedback (InstructGPT Paper)](https://arxiv.org/abs/2203.02155)
- [Constitutional AI: Harmlessness from AI Feedback (Anthropic)](https://arxiv.org/abs/2212.08073)
