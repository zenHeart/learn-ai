# 大语言模型 (LLM)

## 什么是 LLM？

**大语言模型 (Large Language Model)** 是一个神经网络，在海量文本数据上进行训练，以理解和生成类似人类的文本。对于前端工程师来说，可以将其视为一个 API：

- 接收文本输入 (提示词 Prompt)
- 返回文本输出 (补全 Completion)
- 可以执行代码生成、翻译、摘要、问答等任务

**关键见解**: 你不需要理解数学原理。你需要理解**如何在你的应用中有效地使用它们**。

## LLM 如何工作 (工程师简化版)

### 1. 训练阶段 (不是你的工作)

OpenAI, Anthropic, Google 等公司在以下数据上训练模型：
- 书籍、文章、代码库
- 数十亿个参数 (权重)
- 数月的 GPU 时间，数百万美元

**你使用预训练的模型** —— 无需训练。

### 2. 推理阶段 (你的工作)

当你调用 LLM API 时：

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Explain React hooks" }]
});
```

**发生的事情**:
1. 你的提示词被 Token 化 (分解成片段)
2. 模型根据前面的 Token 预测下一个 Token
3. 重复直到完成或达到最大 Token 数
4. 返回生成的文本

**重要**: LLM 是 **无状态的 (Stateless)** —— 除非你在提示词中包含之前的对话，否则它们不记得之前的对话。

## 前端工程师的关键概念

### Tokens

**是什么**: LLM 的“货币”。文本被分解成 Token (大约 0.75 个单词/Token)。

**为什么重要**:
- API 按 Token 收费 (输入 + 输出)
- 上下文窗口以 Token 衡量 (例如 128k tokens)
- 需要估算成本和管理上下文大小

```javascript
// 粗略估算
const estimateTokens = (text) => Math.ceil(text.length / 4);

const prompt = "Write a React component";
const estimatedTokens = estimateTokens(prompt); // ~6 tokens
const estimatedCost = estimatedTokens * 0.00001; // GPT-4 定价
```

### 上下文窗口 (Context Window)

**是什么**: LLM 在一次请求中可以处理的最大 Token 数量 (提示词 + 响应)。

**为什么重要**:
- GPT-3.5: 16k tokens (~12,000 词)
- GPT-4: 128k tokens (~96,000 词)
- Claude 3.5 Sonnet: 200k tokens (~150,000 词)

**前端影响**:
- 不能将整个代码库发送给 LLM
- 需要选择相关上下文 (RAG, Embeddings)
- 必须在聊天界面中处理 Token 限制

### 温度 (Temperature)

**是什么**: 控制输出的随机性 (0 到 1+)。

**用法**:
- **低 (0-0.3)**: 确定性、一致性 (代码生成、数据提取)
- **中 (0.5-0.7)**: 平衡 (聊天机器人、一般任务)
- **高 (0.8-1.0)**: 创意、多样性 (内容写作、头脑风暴)

```javascript
// 代码生成 - 使用低温度
const codeResponse = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.2,
  messages: [{ role: "user", content: "Generate a TypeScript interface" }]
});

// 创意写作 - 使用高温度
const storyResponse = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.9,
  messages: [{ role: "user", content: "Write a creative story" }]
});
```

### 系统提示词 (System Prompts)

**是什么**: 设置 LLM 行为和角色的指令。

**前端模式**:

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

**最佳实践**:
- 定义角色和专长
- 设置约束 (语气、长度、格式)
- 指定输出格式 (JSON, Markdown 等)

## 常见 LLM 提供商

### OpenAI (GPT)

**模型**:
- GPT-4 Turbo: 能力最强，昂贵
- GPT-3.5 Turbo: 快，便宜，适合简单任务

**用例**: 代码生成，聊天，Embeddings

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

**模型**:
- Claude 3.5 Sonnet: 最适合编码，200k 上下文
- Claude 3 Opus: 能力最强，质量最高

**优势**: 长上下文，代码理解，工具使用

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

**模型**:
- Gemini 1.5 Pro: 1M Token 上下文窗口
- Gemini 1.5 Flash: 快，便宜

**优势**: 海量上下文窗口，多模态

### 本地模型 (Ollama)

**是什么**: 本地运行模型 (无 API 成本，隐私)

**用例**: 开发，敏感数据，离线应用

```javascript
import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: "user", content: "Hello!" }]
});
```

## LLM 局限性 (它们不能做什么)

### 1. 它们有知识截止日期

- 训练数据有日期截止 (例如 2024 年 4 月)
- 不知道最近的事件或更新
- **解决方案**: RAG (检索增强生成)

### 2. 它们会产生幻觉 (Hallucinate)

- 生成听起来合理但不正确的信息
- 编造事实、API 方法或库
- **解决方案**: 验证输出，使用结构化输出，添加验证

### 3. 它们是无状态的

- 不记得之前的对话
- **解决方案**: 在 messages 数组中包含对话历史

### 4. Token 限制

- 无法一次处理整个代码库
- **解决方案**: 选择相关上下文，使用 Embeddings

### 5. 无实时数据

- 无法浏览网页或访问数据库 (除非你给它们工具)
- **解决方案**: 函数调用 / 工具使用

## 前端集成模式

### 模式 1: 简单补全

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

### 模式 2: 流式响应 (Streaming)

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
  process.stdout.write(content); // 流式传输到 UI
}
```

### 模式 3: 结构化输出

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

## 成本管理

### 调用前计算

```javascript
const estimateCost = (inputTokens, outputTokens, model) => {
  const pricing = {
    'gpt-4': { input: 0.03, output: 0.06 }, // 每 1K tokens
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 }
  };

  const rates = pricing[model];
  return (inputTokens * rates.input + outputTokens * rates.output) / 1000;
};

// 示例
const inputTokens = 1000;
const outputTokens = 500;
const cost = estimateCost(inputTokens, outputTokens, 'gpt-4');
console.log(`Estimated cost: $${cost.toFixed(4)}`); // $0.0600
```

### 优化技巧

1. **简单任务使用更便宜的模型** (GPT-3.5 vs GPT-4)
2. **限制输出 Token** 使用 `max_tokens` 参数
3. **缓存系统提示词** (某些提供商提供提示词缓存)
4. **批量请求** (如果可能)
5. **使用本地模型** (Ollama) 进行开发

## 决策树：何时使用哪个模型？

```
是否与代码相关？
├─ 是
│  ├─ 需要长上下文 (>8k tokens)? → Claude 3.5 Sonnet
│  └─ 简单任务? → GPT-3.5 Turbo 或 GPT-4o Mini
│
└─ 否
   ├─ 需要巨大上下文 (>100k tokens)? → Gemini 1.5 Pro
   ├─ 需要最佳质量? → GPT-4 Turbo 或 Claude 3 Opus
   ├─ 需要速度 + 低成本? → GPT-3.5 Turbo 或 Gemini Flash
   └─ 隐私担忧? → 本地模型 (Ollama + Llama)
```

## 下一步

- **RAG** - 学习如何让 LLM 访问外部知识
- **提示工程** - 掌握获得更好输出的技术
- **MCP** - 集成工具并赋予 LLM 新能力
- **智能体** - 构建使用 LLM 的自主系统

## 额外资源

- [OpenAI API 文档](https://platform.openai.com/docs)
- [Anthropic Claude 文档](https://docs.anthropic.com/)
- [Token 计数工具](https://platform.openai.com/tokenizer)
- [Ollama 文档](https://ollama.ai/)