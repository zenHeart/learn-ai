# LangChain.js Guide

LangChain is a framework for developing applications powered by language models. It excels at **orchestrating complex workflows**, managing memory, and connecting to external data.

## Core Concepts (LCEL)

Modern LangChain uses **LCEL (LangChain Expression Language)** to compose chains using pipe `|` syntax.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({ model: "gpt-4o" });
const prompt = PromptTemplate.fromTemplate("Tell me a joke about {topic}");
const outputParser = new StringOutputParser();

// The Chain
const chain = prompt.pipe(model).pipe(outputParser);

// Run it
const response = await chain.invoke({ topic: "ice cream" });
console.log(response);
```

## Chains vs. Agents

- **Chains**: Hardcoded sequences of steps. (Input -> Prompt -> LLM -> Output)
- **Agents**: The LLM decides what steps to take. (Input -> LLM -> Tool A -> LLM -> Tool B -> Output)

## Building an Agent

Agents can use "Tools" to interact with the world.

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";

const model = new ChatOpenAI({ temperature: 0 });
const tools = [new Calculator()];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  tools,
  prompt: /* ... standard agent prompt ... */,
});

const executor = new AgentExecutor({
  agent,
  tools,
});

const result = await executor.invoke({
  input: "What is 5 to the power of 3?",
});
```

## Memory

LLMs are stateless. LangChain provides memory to store chat history.

*Note: In production, it's often better to manage history in your own database and pass it as context, rather than relying on in-memory storage.*

## Integration with Next.js

You can use LangChain to generate the response, and then stream it using the Vercel AI SDK.

```typescript
// app/api/chat/route.ts
import { ChatOpenAI } from '@langchain/openai';
import { LangChainAdapter } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = new ChatOpenAI({ model: 'gpt-4o' });

  const stream = await model.stream(messages);

  return LangChainAdapter.toDataStreamResponse(stream);
}
```

## When to use LangChain?

- ✅ Complex multi-step chains (e.g. Summarize text -> Translate -> Extract keywords).
- ✅ Switching between models (easy to swap OpenAI for Anthropic).
- ✅ Using pre-built tools (Calculators, Web Search, SQL).

## Next Steps

- Explore **[LlamaIndex](./llamaindex-ts.md)** for data-heavy applications.
