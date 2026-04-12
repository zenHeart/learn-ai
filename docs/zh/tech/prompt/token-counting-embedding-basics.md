# Token Counting 与 Embedding 基础

> 来源：[Anthropic Claude 官方文档 - Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)

## 概述

Token counting（令牌计数）让你能够在将消息发送给 Claude 之前确定其中的令牌数量，帮助你做出关于 Prompt 和使用量的明智决策。通过 Token Counting，你可以：

- **主动管理速率限制和成本**
- **做出明智的模型路由决策**
- **优化 Prompt 至特定长度**

> 此功能适用于 [零数据保留（ZDR）](https://platform.claude.com/docs/en/build-with-claude/api-and-data-retention)。当组织有 ZDR 协议时，通过此功能发送的数据在 API 响应返回后不会被存储。

## 如何计算消息 Token

Token counting 端点接受与创建消息相同的结构化输入，包括对 system prompt、[工具](/docs/en/agents-and-tools/tool-use/overview)、[图像](/docs/en/build-with-claude/vision) 和 [PDF](/docs/en/build-with-claude/pdf-support) 的支持。响应包含输入 Token 的总数。

> **注意**：Token 计数应被视为**估计值**。在某些情况下，创建消息时使用的实际输入 Token 数量可能略有不同。
>
> Token 计数可能包含 Anthropic 为系统优化自动添加的 Token。**你无需为系统添加的 Token 付费**。账单仅反映你的内容。

### 支持的模型

所有 [活跃模型](https://platform.claude.com/docs/en/about-claude/models/overview) 都支持 Token 计数。

## 基本消息 Token 计数

### Python 示例

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.count_tokens(
    model="claude-opus-4-6",
    system="You are a scientist",
    messages=[{"role": "user", "content": "Hello, Claude"}],
)

print(response.json())
# 输出: { "input_tokens": 14 }
```

### TypeScript 示例

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.countTokens({
  model: "claude-opus-4-6",
  system: "You are a scientist",
  messages: [
    { role: "user", content: "Hello, Claude" }
  ]
});

console.log(response);
// 输出: { input_tokens: 14 }
```

## 带工具（Tools）的消息 Token 计数

> [Server tool](/docs/en/agents-and-tools/tool-use/server-tools) 的 Token 计数仅适用于第一次采样调用。

```python
response = client.messages.count_tokens(
    model="claude-opus-4-6",
    tools=[
        {
            "name": "get_weather",
            "description": "Get the current weather in a given location",
            "input_schema": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    }
                },
                "required": ["location"],
            },
        }
    ],
    messages=[{"role": "user", "content": "What's the weather like in San Francisco?"}],
)
# 输出: { "input_tokens": 403 }
```

## 带图像（Images）的消息 Token 计数

```python
import base64
import httpx

image_url = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
image_media_type = "image/jpeg"
image_data = base64.standard_b64encode(httpx.get(image_url).content).decode("utf-8")

response = client.messages.count_tokens(
    model="claude-opus-4-6",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": image_media_type,
                        "data": image_data,
                    },
                },
                {"type": "text", "text": "Describe this image"},
            ],
        }
    ],
)
# 输出: { "input_tokens": 1551 }
```

## 带扩展思考（Extended Thinking）的消息 Token 计数

> 关于扩展思考如何计算上下文窗口的更多详情，请参阅[扩展思考文档](/docs/en/build-with-claude/extended-thinking#how-context-window-is-calculated-with-extended-thinking)：
> - **之前**助手消息中的 thinking blocks 被忽略，**不**计入输入 Token
> - **当前**助手消息的思考**会**计入输入 Token

```python
response = client.messages.count_tokens(
    model="claude-sonnet-4-6",
    thinking={"type": "enabled", "budget_tokens": 16000},
    messages=[
        {
            "role": "user",
            "content": "Are there an infinite number of prime numbers such that n mod 4 == 3?",
        },
        {
            "role": "assistant",
            "content": [
                {
                    "type": "thinking",
                    "thinking": "This is a nice number theory question. Let's think about it step by step...",
                    "signature": "EuYBCkQYAiJAgCs1le6/Pol5Z4/JMomVOouGrWdhYNsH3ukzUECbB6iWrSQtsQuRHJID6lWV..."
                },
                {
                    "type": "text",
                    "text": "Yes, there are infinitely many prime numbers p such that p mod 4 = 3..."
                }
            ],
        },
        {"role": "user", "content": "Can you write a formal proof?"},
    ],
)
# 输出: { "input_tokens": 88 }
```

## 带 PDF 的消息 Token 计数

```python
with open("document.pdf", "rb") as pdf_file:
    pdf_base64 = base64.standard_b64encode(pdf_file.read()).decode("utf-8")

response = client.messages.count_tokens(
    model="claude-opus-4-6",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "document",
                    "source": {
                        "type": "base64",
                        "media_type": "application/pdf",
                        "data": pdf_base64,
                    },
                },
                {"type": "text", "text": "Please summarize this document."},
            ],
        }
    ],
)
# 输出: { "input_tokens": 2188 }
```

## 定价与速率限制

Token counting **免费使用**，但受基于你的[使用层级的请求速率限制](/docs/en/api/rate-limits#rate-limits)。

| 使用层级 | 每分钟请求数 (RPM) |
|----------|---------------------|
| 1        | 100                 |
| 2        | 2,000               |
| 3        | 4,000               |
| 4        | 8,000               |

> **注意**：Token counting 和消息创建有独立且互不影响的速率限制。一个的使用不会计入另一个的限制。

## 常见问题

**Token counting 是否使用 Prompt 缓存？**

不，Token counting 提供估计值，不使用缓存逻辑。虽然你可以在 Token counting 请求中提供 `cache_control` 块，但缓存仅在实际消息创建时发生。

## Embedding 与 Token 的关系

虽然本文档主要介绍 Token counting，但理解 Embedding 与 Token 的关系对 AI 应用开发至关重要：

- **Token 是 LLM 处理文本的基本单位**：LLM 并不直接处理"文字"，而是以 Token 为单位进行计算。一个 Token 大约等于 4 个字符或 0.75 个英文单词
- **Embedding 将 Token 转换为向量**：Embedding 模型将文本（Token 序列）映射为稠密向量，实现语义表示
- **Token 上限决定上下文窗口**：模型的上下文窗口大小以 Token 计算，超过上限的内容会被截断
- **成本与 Token 数量直接相关**：大多数 LLM API 按输入/输出的 Token 数量计费

### Embedding 的核心应用场景

| 场景 | 说明 |
|------|------|
| **语义搜索** | 将文档和查询分别 Embedding，通过向量相似度检索相关内容 |
| **文本分类** | 基于 Embedding 向量训练分类器 |
| **相似度匹配** | 计算两段文本 Embedding 之间的距离 |
| **聚类分析** | 对 Embedding 向量进行聚类发现语义模式 |

## 总结

Token counting 是 Anthropic 提供的免费工具，可帮助开发者精确管理 Prompt 的 Token 消耗，优化成本和性能。结合 Embedding 技术，可以构建高效的 RAG（检索增强生成）系统和语义搜索应用。
