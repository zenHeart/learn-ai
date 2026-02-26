# 上下文窗口管理 (Context Window Management)

## 什么是上下文？

在 LLM 中，**上下文 (Context)** 指的是模型在生成响应时可以“看到”并考虑的所有文本。这包括：

- 系统提示词 (System prompts)
- 之前的对话消息
- 当前用户输入
- 你提供的任何额外数据（文档、代码等）

**关键限制**: LLM 有一个 **上下文窗口 (context window)** —— 即它一次能处理的最大文本量。

## 为什么上下文管理很重要

作为一名构建 AI 功能的前端工程师，你会**经常**遇到上下文限制：

- 具有长对话历史的聊天应用
- 分析整个文件的代码助手
- 基于大型文档的问答 (Q&A)
- 历史记录不断增长的多轮交互

**糟糕的上下文管理**会导致：

- 错误: "Context length exceeded" (超出上下文长度)
- 高成本: 为不必要的 Token 付费
- 响应慢: 处理巨大的上下文
- 信息丢失: 截断重要数据

## 上下文窗口大小

不同的模型有不同的限制：

| 模型 | 上下文窗口 | 大约单词数 | 用途 |
|-------|----------------|-------------------|----------|
| GPT-3.5 Turbo | 16K tokens | ~12,000 词 | 短对话，快速任务 |
| GPT-4 | 8K-128K tokens | ~6K-96K 词 | 因版本而异 |
| GPT-4 Turbo | 128K tokens | ~96,000 词 | 长文档 |
| Claude 3.5 Sonnet | 200K tokens | ~150,000 词 | 海量上下文 |
| Claude 3 Opus | 200K tokens | ~150,000 词 | 海量上下文 |
| Gemini 1.5 Pro | 1M tokens | ~750,000 词 | 整个代码库 |

**经验法则**: 1 token ≈ 0.75 个单词 ≈ 4 个字符

## Token 计数

### 估算 Token (快速方法)

```javascript
function estimateTokens(text) {
  // 粗略估算: 约 4 个字符 1 个 token
  return Math.ceil(text.length / 4);
}

const message = "Hello, how are you today?";
console.log(estimateTokens(message)); // ~7 tokens
```

### 准确 Token 计数 (tiktoken)

```javascript
import { encoding_for_model } from 'tiktoken';

const encoding = encoding_for_model('gpt-4');

const text = "Hello, how are you today?";
const tokens = encoding.encode(text);

console.log(tokens.length); // 准确的 token 数量
console.log(tokens); // Token ID 数组

encoding.free(); // 释放内存
```

### 计算消息中的 Token

```javascript
import { encoding_for_model } from 'tiktoken';

function countMessageTokens(messages, model = 'gpt-4') {
  const encoding = encoding_for_model(model);

  let numTokens = 0;

  for (const message of messages) {
    numTokens += 4; // 每个消息都有开销
    numTokens += encoding.encode(message.role).length;
    numTokens += encoding.encode(message.content).length;
  }

  numTokens += 2; // 每个回复都以 assistant 开头

  encoding.free();
  return numTokens;
}

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi! How can I help?' },
  { role: 'user', content: 'What is React?' }
];

console.log(countMessageTokens(messages)); // 例如：45 tokens
```

## 上下文管理策略

### 1. 滑动窗口 (聊天历史)

只保留最近的消息，丢弃旧的：

```javascript
class ChatContext {
  constructor(maxMessages = 10) {
    this.messages = [];
    this.maxMessages = maxMessages;
  }

  addMessage(role, content) {
    this.messages.push({ role, content });

    // 只保留最后 N 条消息（加上系统提示词）
    if (this.messages.length > this.maxMessages) {
      const systemMessage = this.messages.find(m => m.role === 'system');
      const recentMessages = this.messages.slice(-this.maxMessages);

      this.messages = systemMessage
        ? [systemMessage, ...recentMessages]
        : recentMessages;
    }
  }

  getMessages() {
    return this.messages;
  }
}

// 用法
const chat = new ChatContext(10);
chat.addMessage('system', 'You are a helpful assistant.');
chat.addMessage('user', 'Hello!');
chat.addMessage('assistant', 'Hi there!');
// ... 10 条消息后，最旧的用户消息被丢弃
```

### 2. 基于 Token 的截断

保留消息直到达到 Token 限制：

```javascript
import { encoding_for_model } from 'tiktoken';

class TokenAwareChatContext {
  constructor(maxTokens = 4000) {
    this.messages = [];
    this.maxTokens = maxTokens;
    this.encoding = encoding_for_model('gpt-4');
  }

  addMessage(role, content) {
    this.messages.push({ role, content });
    this.truncateToLimit();
  }

  truncateToLimit() {
    // 始终保留系统消息
    const systemMessage = this.messages.find(m => m.role === 'system');
    let otherMessages = this.messages.filter(m => m.role !== 'system');

    let totalTokens = this.countTokens([...otherMessages]);

    // 移除最旧的消息直到低于限制
    while (totalTokens > this.maxTokens && otherMessages.length > 0) {
      otherMessages.shift(); // 移除最旧的
      totalTokens = this.countTokens(otherMessages);
    }

    this.messages = systemMessage
      ? [systemMessage, ...otherMessages]
      : otherMessages;
  }

  countTokens(messages) {
    let count = 0;
    for (const msg of messages) {
      count += 4; // 消息开销
      count += this.encoding.encode(msg.role).length;
      count += this.encoding.encode(msg.content).length;
    }
    return count;
  }

  getMessages() {
    return this.messages;
  }
}

// 用法
const chat = new TokenAwareChatContext(4000);
chat.addMessage('system', 'You are a code assistant.');
chat.addMessage('user', 'Explain React hooks...');
// 自动管理 Token 限制
```

### 3. 摘要 (Summarization)

定期总结旧消息：

```javascript
async function summarizeConversation(messages, openai) {
  const summary = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Summarize this conversation in 2-3 sentences.'
      },
      {
        role: 'user',
        content: JSON.stringify(messages)
      }
    ]
  });

  return summary.choices[0].message.content;
}

class SummarizingChatContext {
  constructor(maxMessages = 20, summarizeAfter = 10) {
    this.messages = [];
    this.maxMessages = maxMessages;
    this.summarizeAfter = summarizeAfter;
  }

  async addMessage(role, content, openai) {
    this.messages.push({ role, content });

    // 如果消息太多则进行总结
    if (this.messages.length > this.maxMessages) {
      const systemMessage = this.messages.find(m => m.role === 'system');
      const toSummarize = this.messages.slice(1, -this.summarizeAfter);
      const recent = this.messages.slice(-this.summarizeAfter);

      const summary = await summarizeConversation(toSummarize, openai);

      this.messages = [
        systemMessage,
        { role: 'system', content: `Previous conversation summary: ${summary}` },
        ...recent
      ].filter(Boolean);
    }
  }

  getMessages() {
    return this.messages;
  }
}
```

### 4. 选择性上下文包含

仅包含相关的过去消息：

```javascript
async function selectRelevantMessages(currentQuery, messageHistory, openai) {
  // 使用 Embeddings 查找相关的过去消息
  const currentEmbedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: currentQuery
  });

  const relevantMessages = [];

  for (const msg of messageHistory) {
    const msgEmbedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: msg.content
    });

    const similarity = cosineSimilarity(
      currentEmbedding.data[0].embedding,
      msgEmbedding.data[0].embedding
    );

    if (similarity > 0.7) {
      relevantMessages.push(msg);
    }
  }

  return relevantMessages;
}

function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
```

## 上下文优化技巧

### 1. 压缩系统提示词

```javascript
// ❌ 冗长的系统提示词 (消耗大量 Token)
const verbose = `
You are an extremely helpful, friendly, and knowledgeable AI assistant.
You always provide detailed explanations with examples.
You are patient and understanding with users.
You never make assumptions and always ask for clarification.
`;

// ✅ 简洁的系统提示词 (消耗较少 Token)
const concise = `
You are a helpful AI assistant. Provide detailed explanations with examples.
Ask for clarification when needed.
`;
```

### 2. 移除冗余信息

```javascript
// ❌ 冗余的上下文
const messages = [
  { role: 'user', content: 'What is React?' },
  { role: 'assistant', content: 'React is a JavaScript library...' },
  { role: 'user', content: 'What is React used for?' }, // 冗余问题
];

// ✅ 合并的上下文
const messages = [
  { role: 'user', content: 'What is React and what is it used for?' },
  { role: 'assistant', content: 'React is a JavaScript library...' }
];
```

### 3. 使用引用而非完整内容

```javascript
// ❌ 包含整个文件内容 (消耗大量 Token)
const prompt = `
Here is the full code of app.js:
${fullFileContent} // 10,000 lines

What does this function do?
`;

// ✅ 仅提取相关部分
const prompt = `
Here is the function from app.js (lines 245-260):
${relevantSection} // 15 lines

What does this function do?
`;
```

### 4. 分块大型文档

```javascript
async function queryLargeDocument(document, query, openai) {
  const chunkSize = 2000; // tokens
  const chunks = splitIntoChunks(document, chunkSize);

  const results = [];

  for (const chunk of chunks) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Answer based on this document chunk.' },
        { role: 'user', content: `Document: ${chunk}\n\nQuestion: ${query}` }
      ]
    });

    results.push(response.choices[0].message.content);
  }

  // 合并结果或选择最佳答案
  return results;
}

function splitIntoChunks(text, chunkSize) {
  const words = text.split(' ');
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks;
}
```

## 生产模式

### 上下文管理器类

```javascript
import { encoding_for_model } from 'tiktoken';

class ContextManager {
  constructor(config = {}) {
    this.maxTokens = config.maxTokens || 4000;
    this.model = config.model || 'gpt-4';
    this.encoding = encoding_for_model(this.model);
    this.messages = [];
  }

  addSystemMessage(content) {
    this.messages.unshift({ role: 'system', content });
    this.truncate();
  }

  addMessage(role, content) {
    this.messages.push({ role, content });
    this.truncate();
  }

  truncate() {
    const systemMessages = this.messages.filter(m => m.role === 'system');
    let otherMessages = this.messages.filter(m => m.role !== 'system');

    let totalTokens = this.countTokens(this.messages);

    while (totalTokens > this.maxTokens && otherMessages.length > 2) {
      // 至少保留最后一对用户-助手消息
      otherMessages.shift();
      totalTokens = this.countTokens([...systemMessages, ...otherMessages]);
    }

    this.messages = [...systemMessages, ...otherMessages];
  }

  countTokens(messages) {
    let count = 0;
    for (const msg of messages) {
      count += 4;
      count += this.encoding.encode(msg.role).length;
      count += this.encoding.encode(msg.content).length;
    }
    return count + 2;
  }

  getMessages() {
    return this.messages;
  }

  getRemainingTokens() {
    return this.maxTokens - this.countTokens(this.messages);
  }

  clear() {
    const systemMessages = this.messages.filter(m => m.role === 'system');
    this.messages = systemMessages;
  }
}

// 用法
const ctx = new ContextManager({ maxTokens: 4000, model: 'gpt-4' });
ctx.addSystemMessage('You are a helpful assistant.');
ctx.addMessage('user', 'Hello!');
ctx.addMessage('assistant', 'Hi there!');

console.log('Remaining tokens:', ctx.getRemainingTokens());
console.log('Messages:', ctx.getMessages());
```

### React Hook 用于上下文管理

```typescript
import { useState, useCallback } from 'react';
import { encoding_for_model } from 'tiktoken';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function useChatContext(maxTokens: number = 4000) {
  const [messages, setMessages] = useState<Message[]>([]);
  const encoding = encoding_for_model('gpt-4');

  const countTokens = useCallback((msgs: Message[]) => {
    let count = 0;
    for (const msg of msgs) {
      count += 4;
      count += encoding.encode(msg.role).length;
      count += encoding.encode(msg.content).length;
    }
    return count + 2;
  }, [encoding]);

  const addMessage = useCallback((role: Message['role'], content: string) => {
    setMessages(prev => {
      const newMessages = [...prev, { role, content }];

      // 如果需要则截断
      let systemMessages = newMessages.filter(m => m.role === 'system');
      let otherMessages = newMessages.filter(m => m.role !== 'system');

      let totalTokens = countTokens(newMessages);

      while (totalTokens > maxTokens && otherMessages.length > 2) {
        otherMessages.shift();
        totalTokens = countTokens([...systemMessages, ...otherMessages]);
      }

      return [...systemMessages, ...otherMessages];
    });
  }, [maxTokens, countTokens]);

  const clear = useCallback(() => {
    setMessages(prev => prev.filter(m => m.role === 'system'));
  }, []);

  const remainingTokens = maxTokens - countTokens(messages);

  return {
    messages,
    addMessage,
    clear,
    remainingTokens,
    tokenCount: countTokens(messages)
  };
}

// 组件用法
function ChatComponent() {
  const { messages, addMessage, remainingTokens } = useChatContext(4000);

  const handleSend = (text: string) => {
    addMessage('user', text);
    // 调用 LLM API...
  };

  return (
    <div>
      <div>Remaining tokens: {remainingTokens}</div>
      {/* 聊天 UI */}
    </div>
  );
}
```

## 成本影响

上下文大小直接影响成本：

```javascript
// GPT-4 示例
const inputTokens = 3000;  // 大上下文
const outputTokens = 500;

// GPT-4 定价: 输入 $0.03/1K, 输出 $0.06/1K
const cost = (inputTokens * 0.03 + outputTokens * 0.06) / 1000;
console.log(`Cost per request: $${cost.toFixed(4)}`); // $0.1200

// 1000 次请求
console.log(`Monthly cost: $${(cost * 1000).toFixed(2)}`); // $120.00
```

**优化可以省钱**:

- 将上下文从 3000 减少到 1000 tokens → 节省 $40/月 (1000 次请求)
- 简单任务使用更便宜的模型 (GPT-3.5) → 节省 90%

## 最佳实践

1. **测量 Token 使用** - 在 API 调用前始终计算 Token
2. **设置 Token 预算** - 根据用例限制上下文大小
3. **缓存系统提示词** - 某些提供商提供提示词缓存
4. **使用合适的模型** - 如果只需要 4k，不要使用 200k 上下文
5. **清理旧数据** - 定期删除不相关的上下文
6. **监控成本** - 在生产环境中跟踪 Token 使用
7. **测试边缘情况** - 当上下文填满时会发生什么？

## 下一步

- **RAG** - 学习如何添加外部知识而不填满上下文
- **提示工程** - 编写简洁、有效的提示词
- **LLM** - 了解 Token 定价和模型选择

上下文管理是构建经济高效、可扩展的 AI 应用程序的基础。尽早掌握它！

## 参考资料

* [上下文工程](https://baoyu.io/translations/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)