# Agent 工程实践与工具链

> 本文档整理自 Inbox 学习任务（第二批次），来源包括 Microsoft AI Agents、StackOverflow、GitHub 等。

## 1. Agent 系统架构

> 来源：[deepchat - Agent 系统架构详解](https://github.com/ThinkInAIXYZ/deepchat/wiki/Agent-%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AF%A6%E8%A7%A3)

### 1.1 Agent 核心组件

```
┌─────────────────────────────────────────────────────┐
│                    User Interface                     │
├─────────────────────────────────────────────────────┤
│                  Orchestrator / Planner              │
│              (任务分解 + 流程编排 + 决策)              │
├──────────┬──────────┬──────────┬───────────────────┤
│  Tools   │ Memory   │  RAG     │  LLM              │
│  (工具)  │ (记忆)   │ (知识检索)│  (推理引擎)        │
├──────────┴──────────┴──────────┴───────────────────┤
│                  External Services / APIs            │
└─────────────────────────────────────────────────────┘
```

### 1.2 关键设计决策

1. **集中式 vs 分布式编排**：集中式更简单，分布式更适合复杂任务
2. **同步 vs 异步执行**：长时间运行任务适合异步
3. **确定性 vs 概率性**：Agent 输出具有概率性，需考虑容错
4. **单 Agent vs 多 Agent**：简单任务单 Agent 足够，复杂任务需要协作

### 1.3 Agent 文献综述

> 来源：[ninehills - Agent 文献综述](https://github.com/ninehills/blog/issues/150)

主要研究方向：
- **Planning**：任务分解、目标推理
- **Memory**：短期/长期记忆管理
- **Tool Use**：工具选择、工具调用
- **Collaboration**：多 Agent 协作
- **Safety**：Agent 安全边界

## 2. RAG (Retrieval Augmented Generation)

> 来源：[RAG Techniques](https://github.com/NirDiamant/RAG_Techniques)、[Pinecone RAG](https://platform.claude.com/cookbook/third-party-pinecone-rag-using-pinecone)

### 2.1 RAG 核心模式

```
Query → Embedding → Vector Search → Retrieved Docs → LLM → Response
```

### 2.2 RAG 技术分类

| 技术 | 描述 | 适用场景 |
|---|---|---|
| Naive RAG | 直接检索 + 生成 | 简单 Q&A |
| Hybrid RAG | 关键词 + 向量混合 | 需要精确匹配 |
| Contextual RAG | 加入上下文 | 长文档检索 |
| Self-RAG | 自反思增强 | 高精度场景 |
| Corrective RAG | 检索结果校验 | 防止幻觉 |

### 2.3 Pinecone + Claude RAG 集成

```python
# Pinecone + Claude RAG 示例框架
import pinecone
from anthropic import Anthropic

# 1. 初始化
pinecone.init(api_key=..., environment=...)
index = pinecone.Index("my-rag-index")

# 2. 检索相关文档
query_embedding = embed_model.encode("用户问题")
results = index.query(vector=query_embedding.tolist(), top_k=5)

# 3. 构建 context
context = "\n".join([r['text'] for r in results['matches']])

# 4. Claude 生成
client = Anthropic()
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"Context:\n{context}\n\nQuestion: {user_question}"
    }]
)
```

## 3. Microsoft AI Agents for Beginners

> 来源：[microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners)

### 3.1 微软 Agent 设计理念

- **可靠性优先**：Agent 应能优雅处理失败
- **可观测性**：完整的日志和追踪
- **渐进式复杂度**：从简单开始，逐步增加功能

### 3.2 入门路径

1. **理解 Agent 基础**：LLM + Tools + Loop
2. **掌握 Prompt Engineering**：高质量 prompt 是基础
3. **学习工具设计**：工具定义、调用、结果处理
4. **实践编排模式**：从单步到多步编排

### 3.3 微软 vs 其他厂商

| 维度 | Microsoft | Anthropic | OpenAI |
|---|---|---|---|
| 生态 | Azure + .NET/JS | Claude SDK | OpenAI SDK |
| 专注点 | 企业应用 | 安全可靠 | 能力边界 |
| 多 Agent | handoffs | conversation | function calling |

## 4. AI Code Review 实践

> 来源：[AI Code Review Trick](https://oldmanrahul.com/2025/12/19/ai-code-review-trick/)

### 4.1 AI Review 优势

- **速度**：批量检查比人工快
- **一致性**：不受情绪/疲劳影响
- **覆盖面**：可检查所有变更

### 4.2 AI Review 最佳实践

1. **聚焦可自动化项**：风格、格式、安全漏洞
2. **人工复核复杂逻辑**：业务逻辑需人工把关
3. **分阶段引入**：先从低风险领域开始
4. **持续优化 Prompt**：根据反馈迭代 review prompt

### 4.3 AI Review Prompt 示例

```
你是一个资深代码审查员。审查以下 PR 变更：
- 只报告确定性问题（不报风格问题）
- 优先报告安全和性能问题
- 每个问题给出具体修复建议
- 如果变更看起来合理，简洁说明

变更内容：
{diff}
```

## 5. Claude MD 编写指南

> 来源：[Writing a Good Claude MD](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

### 5.1 Claude MD 核心要素

Claude MD 是给 Claude Code 的配置文件，影响 AI 的行为模式。

**关键配置项**：
- **model**：使用的模型
- **max_tokens**：单次响应最大 token 数
- **temperature**：创造性/确定性平衡
- **system_prompt**：Agent 的角色和行为定义

### 5.2 最佳实践

1. **清晰的任务描述**：明确 AI 应该做什么
2. **具体的约束条件**：说明限制和边界
3. **示例输出**：展示期望的输出格式
4. **渐进式设计**：从简单 prompt 开始，逐步增加复杂度

## 6. Tiny LLM (轻量级模型)

> 来源：[skyzh/tiny-llm](https://skyzh.github.io/tiny-llm/)

### 6.1 何时使用 Tiny LLM

- **边缘部署**：资源受限环境
- **快速原型**：开发阶段快速迭代
- **特定任务**：任务简单，不需要大盘模型
- **成本敏感**：降低 API 调用成本

### 6.2 模型压缩技术

| 技术 | 原理 | 效果 |
|---|---|---|
| 知识蒸馏 | 大模型教小模型 | ~90% 大模型性能 |
| 量化 (Quantization) | INT8/INT4 替代 FP32 | 4x 内存降低 |
| 剪枝 (Pruning) | 移除不重要的权重 | 减少参数量 |
| 知识蒸馏 + 量化 | 组合使用 | 最佳性价比 |

## 7. MCP (Model Context Protocol) 生态

> 来源：[Figma MCP Server](https://www.figma.com/blog/introducing-figma-mcp-server/)、[Chrome MCP](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651623546&idx=2&sn=77024551ec6cefcbbb14b4c9dec21081)

### 7.1 MCP 协议概述

MCP 是 Anthropic 推出的标准化工具调用协议，让 AI 可以连接各种外部工具和数据源。

**核心架构**：
```
Host (Claude Code) ←→ MCP Client ←→ MCP Server ←→ External Tool
```

### 7.2 热门 MCP Servers

| Server | 用途 | 特点 |
|---|---|---|
| Figma | 设计工具集成 | UI 生成自动化 |
| Chrome | 浏览器自动化 | 网页抓取/交互 |
| GitHub | 代码托管 | PR/Issue 管理 |
| Filesystem | 本地文件 | 项目文件操作 |
| Slack | 团队协作 | 消息通知 |

### 7.3 Chrome MCP 集成场景

- **自动化测试**：AI 驱动的 E2E 测试
- **内容抓取**：自动化网页数据提取
- **UI 验证**：截图对比和视觉检查

## 8. StackOverflow Agent 设计指南

> 来源：[Create Agents That People Want](https://stackoverflow.blog/2025/11/18/how-to-create-agents-that-people-actually-want-to-use/)

### 8.1 用户真正想要的 Agent 特性

1. **透明可预测**：用户能理解 Agent 在做什么
2. **可纠正**：用户能干预和纠正 Agent 行为
3. **可靠**：一致的结果，能处理边界情况
4. **尊重边界**：不越界，不做用户不想做的事

### 8.2 Agent UX 设计原则

- **渐进式披露**：逐步展示复杂功能
- **即时反馈**：每个操作都有状态反馈
- **优雅失败**：出错时给出清晰的恢复建议
- **人工确认**：关键操作前请求确认

## 9. 通往 AGI 之路

> 来源：[飞书 Wiki - 通往 AGI 之路](https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e)

### 9.1 AGI 学习路径概览

1. **基础**：LLM 原理、Transformer 架构
2. **Prompt Engineering**：有效使用 LLM
3. **Agent**：工具使用、决策、规划
4. **多模态**：图像、视频、音频处理
5. **自主性**：长期任务、持续学习

### 9.2 前端 AI 赋能

> 来源：[AI 赋能前端指南](https://ai.iamlv.cn/guide/preface/intro.html)

- **AI 生成 UI**：自然语言描述 → 可用界面
- **智能组件**：AI 根据上下文推荐组件
- **自动化测试**：AI 生成测试用例
- **性能优化**：AI 分析和优化建议

## 10. Cursor IDE 原理分析

> 来源：[Cursor 抓包分析](https://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=2650541333&idx=1&sn=48a4eb5c1ab1f39630124038d31ec715)

### 10.1 Cursor 架构

- **基于 VSCode**：继承 VSCode 生态
- **AI 深度集成**：Chat Panel + Inline Completions
- **Context 管理**：智能上下文选择和压缩
- **多模型支持**：Claude + GPT + 本地模型

### 10.2 关键实现

- **流式响应**：SSE 实现打字机效果
- **上下文窗口**：智能决定上下文组成
- **Agent Loop**：Chat → Plan → Execute → Review

## 11. 相关资源

- [Microsoft AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners)
- [RAG Techniques GitHub](https://github.com/NirDiamant/RAG_Techniques)
- [Pinecone RAG Cookbook](https://platform.claude.com/cookbook/third-party-pinecone-rag-using-pinecone)
- [Figma MCP Server](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [Writing a Good Claude MD](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [StackOverflow Agent Design](https://stackoverflow.blog/2025/11/18/how-to-create-agents-that-people-actually-want-to-use/)
- [Tiny LLM Guide](https://skyzh.github.io/tiny-llm/)
