# LangChain.js 指南

LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它擅长**编排复杂的工作流**、管理记忆以及连接外部数据。

## 核心概念 (LCEL)

现代 LangChain 使用 **LCEL (LangChain Expression Language)** 通过管道 `|` 语法来组合链。

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({ model: "gpt-4o" });
const prompt = PromptTemplate.fromTemplate("Tell me a joke about {topic}");
const outputParser = new StringOutputParser();

// 链
const chain = prompt.pipe(model).pipe(outputParser);

// 运行它
const response = await chain.invoke({ topic: "ice cream" });
console.log(response);
```

## 链 (Chains) vs. 智能体 (Agents)

- **链**: 硬编码的步骤序列。(输入 -> 提示词 -> LLM -> 输出)
- **智能体**: LLM 决定采取什么步骤。(输入 -> LLM -> 工具 A -> LLM -> 工具 B -> 输出)

## 构建智能体

智能体可以使用“工具”与世界互动。

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";

const model = new ChatOpenAI({ temperature: 0 });
const tools = [new Calculator()];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  tools,
  prompt: /* ... 标准智能体提示词 ... */,
});

const executor = new AgentExecutor({
  agent,
  tools,
});

const result = await executor.invoke({
  input: "What is 5 to the power of 3?",
});
```

## 记忆 (Memory)

LLM 是无状态的。LangChain 提供记忆来存储聊天历史。

*注意：在生产环境中，通常最好在自己的数据库中管理历史记录并将其作为上下文传递，而不是依赖内存存储。*

## 与 Next.js 集成

你可以使用 LangChain 生成响应，然后使用 Vercel AI SDK 进行流式传输。

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

## 何时使用 LangChain?

- ✅ 复杂的多步链（例如：总结文本 -> 翻译 -> 提取关键词）。
- ✅ 在模型之间切换（轻松将 OpenAI 替换为 Anthropic）。
- ✅ 使用预构建工具（计算器、网络搜索、SQL）。

## 下一步

- 探索 **[LlamaIndex](./llamaindex-ts.md)** 以构建数据密集型应用。