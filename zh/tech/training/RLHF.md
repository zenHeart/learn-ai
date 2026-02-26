# RLHF (基于人类反馈的强化学习)

## 什么是 RLHF？

**基于人类反馈的强化学习 (Reinforcement Learning from Human Feedback, RLHF)** 是一种用于使语言模型与人类价值观和偏好保持一致的训练技术。它是将原始 GPT-3 变成我们今天使用的有用的 ChatGPT 助手的“秘方”。

**核心思想**: 根据人类对 AI 输出的排名训练奖励模型，然后使用该奖励模型微调 LLM 以生成“更好”的答案。

**RLHF 的三个步骤**:
1. **监督微调 (SFT)**: 在人类演示上训练模型。
2. **奖励建模**: 人类对多个模型输出进行排名；训练一个“奖励模型”来预测这些排名。
3. **强化学习 (PPO)**: 优化 LLM 以最大化来自奖励模型的分数。

::: info 前端相关性
**你不会实施这个**

RLHF 极其昂贵且复杂。它需要海量的人类反馈数据集和大量的 GPU 资源。作为一名前端工程师，你只需要知道**这就是为什么模型拒绝回答有害问题**，或者试图变得“有用、诚实和无害”的原因。
:::

## 使用者

几乎所有顶级聊天模型都使用 RLHF 或类似的对齐技术（如 RLAIF - AI 反馈）：

- **OpenAI**: ChatGPT (GPT-3.5, GPT-4)
- **Anthropic**: Claude (Constitutional AI, RLHF 的变体)
- **Meta**: Llama 2 & 3 (Llama-2-chat)
- **Google**: Gemini

## 为什么它对应用开发很重要

理解 RLHF 有助于解释某些模型行为：

1. **拒绝**: 由于在 RLHF 期间对安全数据过度优化，模型可能会拒绝良性请求。
2. **冗长**: 由于 RLHF 模式，模型经常变得“话痨”或对答案进行对冲（“作为一门 AI 语言模型...”）。
3. **风格**: 模型的“个性”很大程度上是在这个阶段形成的。

## 延伸阅读

- [Deep reinforcement learning from human preferences (OpenAI)](https://openai.com/research/learning-from-human-preferences)
- [Training language models to follow instructions with human feedback (InstructGPT Paper)](https://arxiv.org/abs/2203.02155)
- [Constitutional AI: Harmlessness from AI Feedback (Anthropic)](https://arxiv.org/abs/2212.08073)