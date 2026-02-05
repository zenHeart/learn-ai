# Large Language Models (LLM)

## What is an LLM?

A **Large Language Model** is a neural network trained on massive amounts of text data to understand and generate human-like text. For frontend engineers, think of it as an API that:

- Takes text input (prompt)
- Returns text output (completion)
- Can perform tasks like code generation, translation, summarization, Q&A

**Key Insight**: You don't need to understand the math. You need to understand **how to use them effectively** in your applications.

## How LLMs Work (Simplified for Engineers)

### 1. Training Phase (Not Your Job)

Companies like OpenAI, Anthropic, Google train models on:
- Books, articles, code repositories
- Billions of parameters (weights)
- Months of GPU time, millions of dollars

**You use the pre-trained models** - no training required.

### 2. Inference Phase (Your Job)

When you call an LLM API:

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Explain React hooks" }]
});
```

**What happens**:
1. Your prompt is tokenized (split into pieces)
2. Model predicts next token based on previous tokens
3. Repeats until completion or max tokens reached
4. Returns generated text

**Important**: LLMs are **stateless** - they don't remember previous conversations unless you include them in the prompt.

## Key Concepts for Frontend Engineers

### Tokens

**What**: The "currency" of LLMs. Text is broken into tokens (roughly 0.75 words per token).

**Why it matters**:
- APIs charge per token (input + output)
- Context window is measured in tokens (e.g., 128k tokens)
- Need to estimate costs and manage context size

```javascript
// Rough estimation
const estimateTokens = (text) => Math.ceil(text.length / 4);

const prompt = "Write a React component";
const estimatedTokens = estimateTokens(prompt); // ~6 tokens
const estimatedCost = estimatedTokens * 0.00001; // GPT-4 pricing
```

### Context Window

**What**: The maximum number of tokens an LLM can process in one request (prompt + response).

**Why it matters**:
- GPT-3.5: 16k tokens (~12,000 words)
- GPT-4: 128k tokens (~96,000 words)
- Claude 3.5 Sonnet: 200k tokens (~150,000 words)

**Frontend implications**:
- Can't send entire codebase to LLM
- Need to select relevant context (RAG, embeddings)
- Must handle token limits in chat interfaces

### Temperature

**What**: Controls randomness of output (0 to 1+).

**Usage**:
- **Low (0-0.3)**: Deterministic, consistent (code generation, data extraction)
- **Medium (0.5-0.7)**: Balanced (chatbots, general tasks)
- **High (0.8-1.0)**: Creative, varied (content writing, brainstorming)

```javascript
// Code generation - use low temperature
const codeResponse = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.2,
  messages: [{ role: "user", content: "Generate a TypeScript interface" }]
});

// Creative writing - use high temperature
const storyResponse = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.9,
  messages: [{ role: "user", content: "Write a creative story" }]
});
```

### System Prompts

**What**: Instructions that set the LLM's behavior and role.

**Frontend pattern**:

```javascript
const messages = [
  {
    role: "system",
    content: "You are a helpful React expert. Answer concisely with code examples."
  },
  {
    role: "user",
    content: "How do I use useState?"
  }
];
```

**Best practices**:
- Define persona and expertise
- Set constraints (tone, length, format)
- Specify output format (JSON, markdown, etc.)

## Common LLM Providers

### OpenAI (GPT)

**Models**:
- GPT-4 Turbo: Most capable, expensive
- GPT-3.5 Turbo: Fast, cheap, good for simple tasks

**Use cases**: Code generation, chat, embeddings

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [{ role: "user", content: "Hello!" }]
});
```

### Anthropic (Claude)

**Models**:
- Claude 3.5 Sonnet: Best for coding, 200k context
- Claude 3 Opus: Most capable, highest quality

**Strengths**: Long context, code understanding, tool use

```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const response = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }]
});
```

### Google (Gemini)

**Models**:
- Gemini 1.5 Pro: 1M token context window
- Gemini 1.5 Flash: Fast, cheap

**Strengths**: Massive context window, multimodal

### Local Models (Ollama)

**What**: Run models locally (no API costs, privacy)

**Use cases**: Development, sensitive data, offline apps

```javascript
import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

## LLM Limitations (What They Can't Do)

### 1. They Have Knowledge Cutoffs

- Training data has a date cutoff (e.g., April 2024)
- Don't know recent events or updates
- **Solution**: RAG (Retrieval-Augmented Generation)

### 2. They Hallucinate

- Generate plausible-sounding but incorrect information
- Invent facts, API methods, or libraries
- **Solution**: Verify outputs, use structured outputs, add validation

### 3. They're Stateless

- Don't remember previous conversations
- **Solution**: Include conversation history in messages array

### 4. Token Limits

- Can't process entire codebases at once
- **Solution**: Select relevant context, use embeddings

### 5. No Real-Time Data

- Can't browse the web or access databases (unless you give them tools)
- **Solution**: Function calling / tool use

## Frontend Integration Patterns

### Pattern 1: Simple Completion

```javascript
// app/api/chat/route.js (Next.js)
import { OpenAI } from 'openai';

export async function POST(request) {
  const { message } = await request.json();
  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }]
  });

  return Response.json({
    reply: response.choices[0].message.content
  });
}
```

### Pattern 2: Streaming Responses

```javascript
import { OpenAI } from 'openai';

const client = new OpenAI();

const stream = await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Write a long story" }],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  process.stdout.write(content); // Stream to UI
}
```

### Pattern 3: Structured Outputs

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "Extract user info and return JSON: {name, email, age}"
    },
    {
      role: "user",
      content: "My name is John, email is john@example.com, I'm 25"
    }
  ],
  response_format: { type: "json_object" }
});

const data = JSON.parse(response.choices[0].message.content);
// { name: "John", email: "john@example.com", age: 25 }
```

## Cost Management

### Calculate Before Calling

```javascript
const estimateCost = (inputTokens, outputTokens, model) => {
  const pricing = {
    'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 }
  };

  const rates = pricing[model];
  return (inputTokens * rates.input + outputTokens * rates.output) / 1000;
};

// Example
const inputTokens = 1000;
const outputTokens = 500;
const cost = estimateCost(inputTokens, outputTokens, 'gpt-4');
console.log(`Estimated cost: $${cost.toFixed(4)}`); // $0.0600
```

### Optimization Tips

1. **Use cheaper models for simple tasks** (GPT-3.5 vs GPT-4)
2. **Limit output tokens** with `max_tokens` parameter
3. **Cache system prompts** (some providers offer prompt caching)
4. **Batch requests** when possible
5. **Use local models** (Ollama) for development

## Decision Tree: When to Use Which Model?

```
Is it code-related?
├─ Yes
│  ├─ Need long context (>8k tokens)? → Claude 3.5 Sonnet
│  └─ Simple task? → GPT-3.5 Turbo or GPT-4o Mini
│
└─ No
   ├─ Need huge context (>100k tokens)? → Gemini 1.5 Pro
   ├─ Need best quality? → GPT-4 Turbo or Claude 3 Opus
   ├─ Need speed + low cost? → GPT-3.5 Turbo or Gemini Flash
   └─ Privacy concerns? → Local model (Ollama + Llama)
```

## Next Steps

- **RAG** - Learn how to give LLMs access to external knowledge
- **Prompt Engineering** - Master techniques to get better outputs
- **MCP** - Integrate tools and give LLMs new capabilities
- **Agent** - Build autonomous systems that use LLMs

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Token Counter Tool](https://platform.openai.com/tokenizer)
- [Ollama Documentation](https://ollama.ai/)
