# Cost Optimization

AI is expensive. A single GPT-4 request can cost $0.03. If you have 10,000 users, that's $300/day.

## Strategies

### 1. Model Routing (The 80/20 Rule)
80% of user queries are simple ("Hi", "Thanks", "Summarize this short text").
**Don't use GPT-4 for everything.**

```typescript
const isComplex = await classifier.classify(prompt); // Cheap BERT model
const model = isComplex ? 'gpt-4o' : 'gpt-4o-mini';
```

**Savings**: 20x cheaper.

### 2. Semantic Caching
If User A asks "Who is the President?", and User B asks "Who is the current President?", they should get the same cached answer.
Use **Redis** or a specialized cache (GPTCache) to store `(embedding(prompt), response)`.

**Savings**: 100% (Free).

### 3. Prompt Compression
Shorter prompts = Lower cost.
- Remove polite phrases ("Please", "Thank you").
- Use specialized syntax instead of verbose English.

### 4. Self-Hosting (for high volume)
If you spend > $5k/month, consider hosting Llama 3 on your own GPU server (AWS EC2 / RunPod).

## Budgeting

**Formula**:
`Cost = (Input Tokens * Price_In) + (Output Tokens * Price_Out)`

**Rule of Thumb**:
- 1,000 tokens ≈ 750 words.
- Output is usually 3x more expensive than Input.
- RAG apps have Huge Inputs (Context) and Small Outputs.

## Alerts

Set a **Hard Limit** in OpenAI. If you don't, a `while(true)` loop in your code could cost you $10,000 overnight.
