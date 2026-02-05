# Evaluations (Evals)

You can't improve what you don't measure. **Evals** are the "Unit Tests" for AI quality.

## Core RAG Metrics (The RAG Triad)

When building RAG, you need to measure three things:

1.  **Context Relevance**: Did I find the right documents? (Retriever quality)
2.  **Faithfulness**: Did the AI answer based *only* on the documents? (Hallucination check)
3.  **Answer Relevance**: Did the AI actually answer the user's question?

## How to measure?

Since "Quality" is subjective, we use a stronger LLM (GPT-4) to grade the weaker LLM.

### Example: Faithfulness Check

```
System: You are a strict grader.
User:
Context: "Apple was founded in 1976."
Answer: "Apple was founded in 1990."

Does the Answer agree with the Context?
Score (0-1):
```

## A/B Testing Prompts

Never change a prompt in production without an A/B test.

1.  **Baseline**: Current Prompt A.
2.  **Challenger**: New Prompt B (e.g., "Be more concise").
3.  **Experiment**: Route 50% of traffic to B.
4.  **Metric**: Measure "Copy Button Clicks" or "Thumbs Up rate".

## User Feedback Loops

The most valuable data is explicit user feedback.

- 👍 **Positive**: Add this conversation to your "Golden Dataset" for future fine-tuning.
- 👎 **Negative**: Add this to your "Regression Test Suite" to ensure you fix the bug.

## Tools of the Trade

1.  **Ragas**: Python/JS library for calculating RAG scores.
2.  **Arize Phoenix**: Open-source observability and eval platform.
3.  **LangSmith**: LangChain's enterprise platform.
