# Context Window Management

## What is Context?

In LLMs, **context** refers to all the text the model can "see" and consider when generating a response. This includes:

- System prompts
- Previous conversation messages
- Current user input
- Any additional data you provide (documents, code, etc.)

**Key limitation**: LLMs have a **context window** - a maximum amount of text they can process at once.

## Why Context Management Matters

As a frontend engineer building AI features, you'll hit context limits **constantly**:

- Chat applications with long conversations
- Code assistants analyzing entire files
- Document Q&A with large documents
- Multi-turn interactions with growing history

**Poor context management** leads to:

- Errors: "Context length exceeded"
- High costs: Paying for unnecessary tokens
- Slow responses: Processing huge contexts
- Lost information: Truncating important data

## Context Window Sizes

Different models have different limits:

| Model | Context Window | Approximate Words | Use Case |
|-------|----------------|-------------------|----------|
| GPT-3.5 Turbo | 16K tokens | ~12,000 words | Short chats, quick tasks |
| GPT-4 | 8K-128K tokens | ~6K-96K words | Varies by version |
| GPT-4 Turbo | 128K tokens | ~96,000 words | Long documents |
| Claude 3.5 Sonnet | 200K tokens | ~150,000 words | Massive contexts |
| Claude 3 Opus | 200K tokens | ~150,000 words | Massive contexts |
| Gemini 1.5 Pro | 1M tokens | ~750,000 words | Entire codebases |

**Rule of thumb**: 1 token ≈ 0.75 words ≈ 4 characters

## Token Counting

### Estimate Tokens (Quick Method)

```javascript
function estimateTokens(text) {
  // Rough estimation: ~4 chars per token
  return Math.ceil(text.length / 4);
}

const message = "Hello, how are you today?";
console.log(estimateTokens(message)); // ~7 tokens
```

### Accurate Token Counting (tiktoken)

```javascript
import { encoding_for_model } from 'tiktoken';

const encoding = encoding_for_model('gpt-4');

const text = "Hello, how are you today?";
const tokens = encoding.encode(text);

console.log(tokens.length); // Exact token count
console.log(tokens); // Array of token IDs

encoding.free(); // Release memory
```

### Count Tokens in Messages

```javascript
import { encoding_for_model } from 'tiktoken';

function countMessageTokens(messages, model = 'gpt-4') {
  const encoding = encoding_for_model(model);

  let numTokens = 0;

  for (const message of messages) {
    numTokens += 4; // Every message has overhead
    numTokens += encoding.encode(message.role).length;
    numTokens += encoding.encode(message.content).length;
  }

  numTokens += 2; // Every reply is primed with assistant

  encoding.free();
  return numTokens;
}

const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi! How can I help?' },
  { role: 'user', content: 'What is React?' }
];

console.log(countMessageTokens(messages)); // e.g., 45 tokens
```

## Context Management Strategies

### 1. Sliding Window (Chat History)

Keep only recent messages, drop old ones:

```javascript
class ChatContext {
  constructor(maxMessages = 10) {
    this.messages = [];
    this.maxMessages = maxMessages;
  }

  addMessage(role, content) {
    this.messages.push({ role, content });

    // Keep only last N messages (plus system prompt)
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

// Usage
const chat = new ChatContext(10);
chat.addMessage('system', 'You are a helpful assistant.');
chat.addMessage('user', 'Hello!');
chat.addMessage('assistant', 'Hi there!');
// ... after 10 messages, oldest user messages are dropped
```

### 2. Token-Based Truncation

Keep messages until token limit:

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
    // Always keep system message
    const systemMessage = this.messages.find(m => m.role === 'system');
    let otherMessages = this.messages.filter(m => m.role !== 'system');

    let totalTokens = this.countTokens([...otherMessages]);

    // Remove oldest messages until under limit
    while (totalTokens > this.maxTokens && otherMessages.length > 0) {
      otherMessages.shift(); // Remove oldest
      totalTokens = this.countTokens(otherMessages);
    }

    this.messages = systemMessage
      ? [systemMessage, ...otherMessages]
      : otherMessages;
  }

  countTokens(messages) {
    let count = 0;
    for (const msg of messages) {
      count += 4; // Message overhead
      count += this.encoding.encode(msg.role).length;
      count += this.encoding.encode(msg.content).length;
    }
    return count;
  }

  getMessages() {
    return this.messages;
  }
}

// Usage
const chat = new TokenAwareChatContext(4000);
chat.addMessage('system', 'You are a code assistant.');
chat.addMessage('user', 'Explain React hooks...');
// Automatically manages token limits
```

### 3. Summarization

Periodically summarize old messages:

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

    // Summarize if too many messages
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

### 4. Selective Context Inclusion

Only include relevant past messages:

```javascript
async function selectRelevantMessages(currentQuery, messageHistory, openai) {
  // Use embeddings to find relevant past messages
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

## Context Optimization Techniques

### 1. Compress System Prompts

```javascript
// ❌ Verbose system prompt (uses many tokens)
const verbose = `
You are an extremely helpful, friendly, and knowledgeable AI assistant.
You always provide detailed explanations with examples.
You are patient and understanding with users.
You never make assumptions and always ask for clarification.
`;

// ✅ Concise system prompt (uses fewer tokens)
const concise = `
You are a helpful AI assistant. Provide detailed explanations with examples.
Ask for clarification when needed.
`;
```

### 2. Remove Redundant Information

```javascript
// ❌ Redundant context
const messages = [
  { role: 'user', content: 'What is React?' },
  { role: 'assistant', content: 'React is a JavaScript library...' },
  { role: 'user', content: 'What is React used for?' }, // Redundant question
];

// ✅ Consolidated context
const messages = [
  { role: 'user', content: 'What is React and what is it used for?' },
  { role: 'assistant', content: 'React is a JavaScript library...' }
];
```

### 3. Use References Instead of Full Content

```javascript
// ❌ Include entire file content (uses many tokens)
const prompt = `
Here is the full code of app.js:
${fullFileContent} // 10,000 lines

What does this function do?
`;

// ✅ Extract relevant section only
const prompt = `
Here is the function from app.js (lines 245-260):
${relevantSection} // 15 lines

What does this function do?
`;
```

### 4. Chunk Large Documents

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

  // Combine results or pick best answer
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

## Production Patterns

### Context Manager Class

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
      // Keep at least last user-assistant pair
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

// Usage
const ctx = new ContextManager({ maxTokens: 4000, model: 'gpt-4' });
ctx.addSystemMessage('You are a helpful assistant.');
ctx.addMessage('user', 'Hello!');
ctx.addMessage('assistant', 'Hi there!');

console.log('Remaining tokens:', ctx.getRemainingTokens());
console.log('Messages:', ctx.getMessages());
```

### React Hook for Context Management

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

      // Truncate if needed
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

// Usage in component
function ChatComponent() {
  const { messages, addMessage, remainingTokens } = useChatContext(4000);

  const handleSend = (text: string) => {
    addMessage('user', text);
    // Call LLM API with messages...
  };

  return (
    <div>
      <div>Remaining tokens: {remainingTokens}</div>
      {/* Chat UI */}
    </div>
  );
}
```

## Cost Implications

Context size directly affects costs:

```javascript
// Example with GPT-4
const inputTokens = 3000;  // Large context
const outputTokens = 500;

// GPT-4 pricing: $0.03 per 1K input, $0.06 per 1K output
const cost = (inputTokens * 0.03 + outputTokens * 0.06) / 1000;
console.log(`Cost per request: $${cost.toFixed(4)}`); // $0.1200

// Over 1000 requests
console.log(`Monthly cost: $${(cost * 1000).toFixed(2)}`); // $120.00
```

**Optimization saves money**:

- Reduce context from 3000 to 1000 tokens → Save $40/month (1000 requests)
- Use cheaper model (GPT-3.5) for simple tasks → Save 90%

## Best Practices

1. **Measure token usage** - Always count tokens before API calls
2. **Set token budgets** - Limit context size based on use case
3. **Cache system prompts** - Some providers offer prompt caching
4. **Use appropriate models** - Don't use 200k context if you only need 4k
5. **Clean old data** - Remove irrelevant context regularly
6. **Monitor costs** - Track token usage in production
7. **Test edge cases** - What happens when context fills up?

## Next Steps

- **RAG** - Learn to add external knowledge without filling context
- **Prompt Engineering** - Write concise, effective prompts
- **LLM** - Understand token pricing and model selection

Context management is foundational to building cost-effective, scalable AI applications. Master it early!

## reference

* [context engineering](https://baoyu.io/translations/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) 