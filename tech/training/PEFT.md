# PEFT (Parameter-Efficient Fine-Tuning)

## What is PEFT?

**Parameter-Efficient Fine-Tuning (PEFT)** is a set of techniques to fine-tune Large Language Models (LLMs) without retraining all parameters. Instead of updating billions of weights, PEFT updates only a small fraction (often < 1%) of added parameters.

**The Core Idea**: Freeze the massive pre-trained model and only train small adapter layers.

**Benefits**:
- **Lower Hardware Cost**: Can run on consumer GPUs (e.g., a single RTX 4090 instead of an A100 cluster).
- **Storage Efficiency**: "Adapters" are small files (MBs) vs full models (GBs).
- **Multi-Tenancy**: You can serve one base model and swap small adapters for different users/tasks on the fly.

## LoRA (Low-Rank Adaptation)

**LoRA** is the most popular PEFT technique.

- **How it works**: It injects small "rank decomposition matrices" into the model and trains only those.
- **Analogy**: Imagine editing a book. Instead of rewriting the whole book (Full Fine-Tuning), you just write your edits on sticky notes and stick them on the pages (LoRA). When reading, you read the original page + the sticky note.

## When Companies Use PEFT

1. **Cost-Effective Customization**: When they need a custom model for a specific task (e.g., "SQL Generator") but can't afford to train a full 70B parameter model.
2. **Privacy/On-Premise**: Running fine-tuned open-source models (Llama 3, Mistral) on local hardware.
3. **Personalized AI**: Creating thousands of user-specific models (e.g., one style adapter per user) that share one base model.

::: tip Frontend Relevance
**Running Local LLMs**

If you use tools like **Ollama** or **LM Studio**, you are often downloading "quantized" models or applying LoRA adapters. Understanding PEFT helps you understand why you can run powerful AI on your MacBook.
:::

## Further Reading

- [LoRA: Low-Rank Adaptation of Large Language Models (Paper)](https://arxiv.org/abs/2106.09685)
- [Hugging Face PEFT Library](https://github.com/huggingface/peft)
