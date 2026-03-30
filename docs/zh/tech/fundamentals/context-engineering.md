# Context Engineering 上下文工程完整指南

> 从入门到精通，构建高效 AI 系统的核心方法论

---

## 目录

1. [引言：为什么需要 Context Engineering](#1-引言为什么需要-context-engineering)
2. [核心概念详解](#2-核心概念详解)
3. [实践方法与框架](#3-实践方法与框架)
4. [代码示例](#4-代码示例)
5. [最佳实践](#5-最佳实践)
6. [常见问题与解决方案](#6-常见问题与解决方案)
7. [总结与进阶路线](#7-总结与进阶路线)

---

## 1. 引言：为什么需要 Context Engineering

### 1.1 从 Prompt Engineering 到 Context Engineering

在 AI 开发领域，我们经历了从简单的「写提示词」到「系统化工程」的演进。传统的 Prompt Engineering（提示词工程）主要关注如何撰写单个提示词，而 Context Engineering（上下文工程）则着眼于构建一个完整的信息环境，让 AI 能够稳定、可靠地完成复杂任务。

**核心区别**：

| 维度 | Prompt Engineering | Context Engineering |
|------|-------------------|---------------------|
| 关注点 | 单个提示词 | 完整上下文系统 |
| 范围 | 点 | 面和体 |
| 目标 | 优化单次输出 | 构建可扩展的 AI 系统 |
| 复杂性 | 相对简单 | 需要系统性设计 |
| 适用场景 | 简单问答 | 复杂 Agent 系统 |

### 1.2 什么是 Context Engineering

Context Engineering 是一门关于如何设计、编排和优化提供给语言模型的完整信息环境的艺术和科学。它包括但不限于：

- **系统提示词（System Prompt）**：定义 AI 的角色、能力边界和行为模式
- **用户输入（User Input）**：用户的具体需求和指令
- **上下文信息（Context）**：历史对话、外部知识、工具调用结果等
- **示例（Examples）**：Few-shot 学习所需的参考案例
- **工具定义（Tool Definitions）**：AI 可调用的函数和 API

### 1.3 为什么 Context Engineering 至关重要

根据 Anthropic 的研究，Context Engineering 能够显著提升 AI Agent 的性能和可靠性 [citation:Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)。在生产环境中，上下文的质量直接影响：

- 输出的准确性和相关性
- 任务的完成率
- 系统的响应速度和成本
- 用户体验的稳定性

---

## 2. 核心概念详解

### 2.1 上下文窗口（Context Window）

**定义**：上下文窗口是语言模型一次性能够处理的输入和输出的总长度，通常以 Token 为单位计量。

**关键参数**：
- **上下文长度**：模型能处理的最大 Token 数
- **Token 估算**：英文约 1 Token ≈ 0.75 个单词；中文约 1-2 个字符 ≈ 1 Token
- **输入/输出权衡**：上下文窗口是输入和输出共享的

**常见模型的上下文长度（2025年）**：

| 模型规模 | Token 范围 | 适用场景 |
|---------|-----------|---------|
| 小型 | 4K-8K | 简单任务 |
| 标准 | 32K | 日常对话 |
| 大型 | 128K-200K | 文档分析 |
| 超大 | 1M+ | 长文本处理 |

**「中间丢失」问题**：
研究表明，当相关信息位于上下文窗口中间位置时，模型的表现会下降。这被称为「Lost in the Middle」问题 [citation:Context Length Guide 2025](https://local-ai-zone.github.io/guides/context-length-optimization-ultimate-guide-2025.html)。因此，**重要信息应放在上下文的开头或结尾**。

### 2.2 上下文组成要素

一个完整的上下文由以下几个部分组成：

```
┌─────────────────────────────────────────────────────────┐
│                      完整上下文                           │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐                                        │
│  │ 系统提示词    │  角色定义、能力边界、行为规范            │
│  ├─────────────┤                                        │
│  │ 工具定义     │  可用函数、API、参数规范                 │
│  ├─────────────┤                                        │
│  │ 示例        │  Few-shot 学习的参考案例                 │
│  ├─────────────┤                                        │
│  │ 历史消息    │  对话上下文、多轮交互                    │
│  ├─────────────┤                                        │
│  │ 外部知识    │  RAG 检索、文档注入                       │
│  ├─────────────┤                                        │
│  │ 用户输入    │  当前请求、具体任务                      │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
```

### 2.3 系统提示词（System Prompt）

系统提示词是定义 AI 行为的「宪法」，它应该包含：

1. **角色定义**：AI 应该扮演什么角色？
2. **能力边界**：AI 能做什么？不能做什么？
3. **行为规范**：如何处理特殊情况？
4. **输出格式**：响应的结构要求

**好的系统提示词示例**：

```
你是一位专业的数据分析师，名为"DataPro"。你的职责是：
1. 解释数据分析概念时使用简单易懂的语言
2. 在进行分析时，始终先说明分析方法，再展示结果
3. 当数据不足以得出结论时，明确指出不确定性
4. 响应格式：先给结论，再给详细解释

限制：
- 不编造任何数据或统计结果
- 不对数据来源做任何假设
```

### 2.4 提示词结构（Prompt Structure）

一个结构良好的提示词应包含以下要素：

| 要素 | 作用 | 示例 |
|-----|------|-----|
| 任务描述 | 明确要做什么 | 「请分析这份销售数据」 |
| 上下文/背景 | 提供必要信息 | 「这是Q3的销售数据」 |
| 输出要求 | 定义响应格式 | 「以表格形式呈现」 |
| 约束条件 | 设置限制规则 | 「只分析中国区数据」 |
| 示例 | 展示期望输出 | 「例如：日期、产品、销量」 |

### 2.5 Few-shot Learning（少样本学习）

Few-shot Learning 通过提供示例来帮助模型理解任务要求，是 Context Engineering 的核心技巧之一。

**最佳实践**：
- 示例数量：通常 2-5 个效果最佳
- 示例多样性：覆盖不同场景和边界情况
- 示例格式：与实际输入格式保持一致
- 示例质量：确保示例的输出是正确的

### 2.6 RAG（检索增强生成）

RAG (Retrieval-Augmented Generation) 是将外部知识注入上下文的核心技术 [citation:RAG Guide 2025](https://tensorblue.com/blog/rag-retrieval-augmented-generation-implementation-guide-2025)。

**核心流程**：
```
用户查询 → 检索 → 相关文档 → 与查询组合 → LLM 生成 → 响应
```

**关键组件**：
- **向量化（Embedding）**：将文档转换为向量表示
- **相似度检索**：找到与查询最相关的文档
- **上下文组装**：将检索结果与用户输入组合
- **生成**：基于增强后的上下文生成响应

### 2.7 AI Agent 的记忆系统

根据认知架构理论，AI Agent 需要多种类型的记忆 [citation:AI Agent Memory Systems](https://calmops.com/ai/ai-agent-memory-systems-context-management/)：

| 记忆类型 | 作用 | 持续时间 |
|---------|------|---------|
| 工作记忆 | 当前任务的即时信息 | 当前会话 |
| 情景记忆 | 过去交互的重要事件 | 有限会话 |
| 语义记忆 | 持久化的知识和规则 | 长期 |
| 感官记忆 | 原始输入数据 | 短暂 |

---

## 3. 实践方法与框架

### 3.1 Context Engineering 迭代流程

Context Engineering 是一个迭代优化的过程 [citation:Prompt Engineering Guide](https://www.promptingguide.ai/guides/context-engineering-guide)：

```
┌──────────────────────────────────────────────────────────┐
│                    迭代优化流程                            │
│                                                          │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│   │   定义   │───▶│   设计   │───▶│   测试   │          │
│   │   目标   │    │   上下文 │    │   效果   │          │
│   └──────────┘    └──────────┘    └────┬─────┘          │
│                                       │                  │
│                          ┌────────────┼────────────┐    │
│                          ▼            ▼            ▼    │
│                    ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│                    │  效果   │  │  需要   │  │  超出   │ │
│                    │  不佳   │  │  微调   │  │  预期   │ │
│                    └────┬────┘  └────┬────┘  └────┬────┘ │
│                         │           │           │      │
│                         ▼           └───────────┘      │
│                    ┌──────────┐                       │
│                    │  调整    │◀──────────────────────┘
│                    │  优化    │
│                    └──────────┘
└──────────────────────────────────────────────────────────┘
```

### 3.2 上下文设计原则

根据 Anthropic 的最佳实践，上下文设计应遵循以下原则 [citation:Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)：

1. **信息丰富但紧凑**：提供足够信息，但不冗余
2. **结构清晰**：使用明确的格式和分隔符
3. **优先级明确**：重要信息放在显眼位置
4. **动态调整**：根据任务类型调整上下文组成

### 3.3 上下文窗口管理策略

当上下文超出模型限制时，需要采用以下策略 [citation:Context Window Management](https://www.getmaxim.ai/articles/context-window-management-strategies-for-long-context-ai-agents-and-chatbots/)：

**策略一：智能截断（Truncation）**
- 保留最近的消息和系统提示词
- 截断中间的历史消息

**策略二：摘要压缩（Summarization）**
- 对长对话进行摘要
- 保留关键信息和结论

**策略三：选择性检索（Selective Retrieval）**
- 只检索与当前任务相关的信息
- 使用语义相似度过滤

**策略四：分层记忆（Hierarchical Memory）**
- 工作内存：当前任务的关键信息
- 长期内存：重要历史信息
- 外部内存：文档和知识库

### 3.4 工具调用设计

为 AI Agent 设计工具时，需要考虑：

1. **工具命名**：清晰描述工具功能
2. **参数定义**：明确参数类型和约束
3. **返回格式**：定义工具输出的结构
4. **使用说明**：提供何时使用、如何使用的指导

---

## 4. 代码示例

### 4.1 Python 实现：基础上下文管理器

```python
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field

@dataclass
class Message:
    """消息结构"""
    role: str  # "system", "user", "assistant"
    content: str
    metadata: Dict[str, Any] = field(default_factory=dict)

class ContextManager:
    """上下文管理器"""
    
    def __init__(self, max_tokens: int = 8000):
        self.max_tokens = max_tokens
        self.messages: List[Message] = []
        self.system_prompt: Optional[str] = None
    
    def set_system_prompt(self, prompt: str) -> None:
        """设置系统提示词"""
        self.system_prompt = prompt
    
    def add_message(self, role: str, content: str) -> None:
        """添加消息"""
        self.messages.append(Message(role=role, content=content))
    
    def add_system_context(self, content: str, priority: int = 1) -> None:
        """添加系统级上下文信息"""
        if self.system_prompt:
            self.system_prompt += f"\n\n[{priority}] {content}"
        else:
            self.system_prompt = content
    
    def get_context(self) -> List[Dict[str, str]]:
        """获取当前上下文"""
        context = []
        
        # 添加系统提示词
        if self.system_prompt:
            context.append({"role": "system", "content": self.system_prompt})
        
        # 添加历史消息
        for msg in self.messages:
            context.append({"role": msg.role, "content": msg.content})
        
        return context
    
    def trim_context(self, model: str = "gpt-4") -> None:
        """当上下文超限时，智能裁剪"""
        # 估算当前 token 数（简化估算）
        current_tokens = sum(len(msg.content) // 4 for msg in self.messages)
        current_tokens += len(self.system_prompt) // 4 if self.system_prompt else 0
        
        # 如果超限，保留最近的消息
        while current_tokens > self.max_tokens and len(self.messages) > 2:
            removed = self.messages.pop(0)
            current_tokens -= len(removed.content) // 4
    
    def clear_history(self) -> None:
        """清除历史消息（保留系统提示词）"""
        self.messages = []
```

### 4.2 Python 实现：RAG 上下文检索

```python
from typing import List, Tuple
import numpy as np

class SimpleRAGRetriever:
    """简化版 RAG 检索器"""
    
    def __init__(self, documents: List[str], embeddings: np.ndarray):
        self.documents = documents
        self.embeddings = embeddings
    
    def retrieve(
        self, 
        query: str, 
        query_embedding: np.ndarray,
        top_k: int = 3,
        similarity_threshold: float = 0.5
    ) -> List[Tuple[str, float]]:
        """检索与查询最相关的文档"""
        # 计算相似度（余弦相似度）
        similarities = np.dot(self.embeddings, query_embedding) / (
            np.linalg.norm(self.embeddings, axis=1) * 
            np.linalg.norm(query_embedding)
        )
        
        # 获取 top-k 结果
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            if similarities[idx] >= similarity_threshold:
                results.append((self.documents[idx], float(similarities[idx])))
        
        return results

class ContextualRAGRetriever:
    """上下文感知的 RAG 检索器 - 基于 Anthropic 的方法"""
    
    def __init__(self, documents: List[str]):
        self.documents = documents
        self.embeddings = None  # 需要外部模型生成
    
    def create_contextual_chunks(
        self, 
        document: str, 
        chunk_size: int = 500,
        overlap: int = 100
    ) -> List[str]:
        """创建带上下文的文本块"""
        chunks = []
        words = document.split()
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk_words = words[i:i + chunk_size]
            chunk = ' '.join(chunk_words)
            
            # 添加文档级别的上下文
            contextual_chunk = f"[文档位置 {i // chunk_size + 1}] {chunk}"
            chunks.append(contextual_chunk)
        
        return chunks
    
    def build_context_from_retrieval(
        self, 
        query: str, 
        retrieved_docs: List[Tuple[str, float]]
    ) -> str:
        """构建检索增强的上下文"""
        if not retrieved_docs:
            return ""
        
        context_parts = ["【参考信息】"]
        for idx, (doc, score) in enumerate(retrieved_docs, 1):
            context_parts.append(f"[来源 {idx}]（相关度: {score:.2f}）\n{doc}")
        
        return "\n\n".join(context_parts)

# 使用示例
def example_rag_usage():
    documents = [
        "Python 是一种高级编程语言，由 Guido van Rossum 创建。",
        "Python 支持多种编程范式，包括面向对象、函数式和过程式编程。",
        "Python 的设计哲学强调代码可读性和简洁性。",
        "React 是一个用于构建用户界面的 JavaScript 库。",
        "React 采用组件化架构，支持声明式编程。"
    ]
    
    retriever = ContextualRAGRetriever(documents)
    
    # 检索相关文档
    retrieved = [
        ("Python 是一种高级编程语言，由 Guido van Rossum 创建。", 0.95),
        ("Python 的设计哲学强调代码可读性和简洁性。", 0.88)
    ]
    
    context = retriever.build_context_from_retrieval("什么是Python？", retrieved)
    print(context)
```

### 4.3 Python 实现：多轮对话上下文

```python
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ConversationTurn:
    """对话轮次"""
    user_message: str
    assistant_message: Optional[str]
    timestamp: datetime
    extracted_entities: Dict[str, Any] = None
    task_state: Dict[str, Any] = None

class ConversationContextManager:
    """多轮对话上下文管理器"""
    
    def __init__(self, max_turns: int = 20):
        self.max_turns = max_turns
        self.conversation_history: List[ConversationTurn] = []
        self.session_memory: Dict[str, Any] = {}
        self.task_progress: Dict[str, str] = {}
    
    def add_turn(
        self, 
        user_message: str, 
        assistant_message: Optional[str] = None,
        entities: Dict[str, Any] = None
    ) -> None:
        """添加一轮对话"""
        turn = ConversationTurn(
            user_message=user_message,
            assistant_message=assistant_message,
            timestamp=datetime.now(),
            extracted_entities=entities or {},
            task_state=dict(self.task_progress)
        )
        self.conversation_history.append(turn)
        
        # 更新会话记忆
        if entities:
            self.session_memory.update(entities)
        
        # 限制历史长度
        if len(self.conversation_history) > self.max_turns:
            self.conversation_history.pop(0)
    
    def build_conversation_summary(self) -> str:
        """构建对话摘要"""
        if not self.conversation_history:
            return "（新对话开始）"
        
        recent_turns = self.conversation_history[-5:]
        summary_parts = ["【最近对话摘要】"]
        
        for i, turn in enumerate(recent_turns, 1):
            summary_parts.append(f"轮次 {i}:")
            summary_parts.append(f"  用户: {turn.user_message[:100]}...")
            if turn.assistant_message:
                summary_parts.append(f"  助手: {turn.assistant_message[:100]}...")
            if turn.extracted_entities:
                summary_parts.append(f"  提取实体: {turn.extracted_entities}")
        
        return "\n".join(summary_parts)
    
    def get_relevant_history(self, current_intent: str) -> List[ConversationTurn]:
        """获取与当前意图相关的历史"""
        # 简化版：返回最近 N 轮
        return self.conversation_history[-3:]

class TaskStateTracker:
    """任务状态追踪器"""
    
    def __init__(self):
        self.states: Dict[str, Dict] = {}
    
    def start_task(self, task_id: str, initial_state: Dict) -> None:
        """开始新任务"""
        self.states[task_id] = {
            "status": "in_progress",
            "steps": [],
            "current_step": 0,
            "data": initial_state
        }
    
    def update_step(self, task_id: str, step_name: str, result: Any) -> None:
        """更新任务步骤"""
        if task_id in self.states:
            self.states[task_id]["steps"].append({
                "name": step_name,
                "result": result
            })
            self.states[task_id]["current_step"] += 1
    
    def complete_task(self, task_id: str, final_result: Any) -> None:
        """完成任务"""
        if task_id in self.states:
            self.states[task_id]["status"] = "completed"
            self.states[task_id]["final_result"] = final_result
    
    def get_context_summary(self, task_id: str) -> str:
        """获取任务上下文摘要"""
        if task_id not in self.states:
            return "任务不存在"
        
        state = self.states[task_id]
        summary = [f"任务状态: {state['status']}"]
        summary.append(f"当前步骤: {state['current_step']}/{len(state['steps'])}")
        
        if state["steps"]:
            summary.append("已完成步骤:")
            for step in state["steps"]:
                summary.append(f"  - {step['name']}")
        
        return "\n".join(summary)
```

### 4.4 Python 实现：Few-shot 示例管理器

```python
import json
from typing import List, Dict, Any, Optional

class FewShotExampleManager:
    """Few-shot 示例管理器"""
    
    def __init__(self):
        self.examples: Dict[str, List[Dict[str, str]]] = {}
        self.example_metadata: Dict[str, Dict] = {}
    
    def add_example(
        self, 
        task_type: str, 
        input_example: str, 
        output_example: str,
        metadata: Optional[Dict] = None
    ) -> None:
        """添加示例"""
        if task_type not in self.examples:
            self.examples[task_type] = []
        
        self.examples[task_type].append({
            "input": input_example,
            "output": output_example
        })
        
        if metadata:
            self.example_metadata[f"{task_type}_{len(self.examples[task_type])}"] = metadata
    
    def get_examples(
        self, 
        task_type: str, 
        max_examples: int = 3,
        selection_method: str = "diverse"
    ) -> List[Dict[str, str]]:
        """获取示例"""
        if task_type not in self.examples:
            return []
        
        available = self.examples[task_type]
        
        if len(available) <= max_examples:
            return available
        
        # 选择策略：优先选择多样的示例
        if selection_method == "diverse":
            # 简化版：选择均匀分布的示例
            step = len(available) / max_examples
            indices = [int(i * step) for i in range(max_examples)]
            return [available[i] for i in indices]
        
        # 默认：返回前 N 个
        return available[:max_examples]
    
    def format_examples_for_prompt(
        self, 
        task_type: str, 
        input_placeholder: str = "{{input}}",
        output_placeholder: str = "{{output}}"
    ) -> str:
        """格式化示例为提示词字符串"""
        examples = self.get_examples(task_type)
        
        if not examples:
            return ""
        
        formatted = ["【示例】"]
        for i, ex in enumerate(examples, 1):
            formatted.append(f"\n示例 {i}:")
            formatted.append(f"输入: {ex['input']}")
            formatted.append(f"输出: {ex['output']}")
        
        return "\n".join(formatted)

# 使用示例
def example_fewshot_usage():
    manager = FewShotExampleManager()
    
    # 添加情感分析示例
    examples = [
        ("这部电影太棒了！", "正面"),
        ("剧情拖沓，毫无亮点。", "负面"),
        ("还行吧，中规中矩。", "中性"),
        ("笑得我肚子疼，必须推荐！", "正面"),
        ("浪费时间，完全看不下去。", "负面"),
    ]
    
    for text, sentiment in examples:
        manager.add_example("sentiment_analysis", text, sentiment)
    
    # 获取格式化后的示例
    prompt_section = manager.format_examples_for_prompt("sentiment_analysis")
    print(prompt_section)
    
    """
    输出:
    【示例】
    
    示例 1:
    输入: 这部电影太棒了！
    输出: 正面
    示例 2:
    输入: 剧情拖沓，毫无亮点。
    输出: 负面
    示例 3:
    输入: 还行吧，中规中矩。
    输出: 中性
    """
```

### 4.5 Python 实现：结构化提示词构建器

```python
from typing import List, Dict, Any, Optional, Callable
from enum import Enum

class OutputFormat(Enum):
    """输出格式枚举"""
    JSON = "json"
    MARKDOWN = "markdown"
    PLAIN_TEXT = "plain_text"
    TABLE = "table"
    CUSTOM = "custom"

class StructuredPromptBuilder:
    """结构化提示词构建器"""
    
    def __init__(self):
        self.components: List[Dict[str, Any]] = []
        self.role_definition: Optional[str] = None
        self.constraints: List[str] = []
        self.output_format: Optional[OutputFormat] = None
    
    def set_role(self, role: str, expertise: List[str], limitations: List[str]) -> "StructuredPromptBuilder":
        """设置角色"""
        role_section = [
            f"【角色定义】你是 {role}",
            "你的专长包括:",
        ]
        for exp in expertise:
            role_section.append(f"  - {exp}")
        
        role_section.append("\n你必须遵守以下限制:")
        for limit in limitations:
            role_section.append(f"  - {limit}")
        
        self.role_definition = "\n".join(role_section)
        return self
    
    def add_instruction(
        self, 
        title: str, 
        content: str,
        priority: int = 1
    ) -> "StructuredPromptBuilder":
        """添加指令"""
        self.components.append({
            "type": "instruction",
            "title": title,
            "content": content,
            "priority": priority
        })
        return self
    
    def add_context(self, content: str) -> "StructuredPromptBuilder":
        """添加上下文信息"""
        self.components.append({
            "type": "context",
            "content": content
        })
        return self
    
    def add_examples(
        self, 
        examples: List[Dict[str, str]],
        title: str = "示例"
    ) -> "StructuredPromptBuilder":
        """添加示例"""
        example_texts = [f"【{title}】"]
        for i, ex in enumerate(examples, 1):
            example_texts.append(f"\n示例 {i}:")
            for key, value in ex.items():
                example_texts.append(f"  {key}: {value}")
        
        self.components.append({
            "type": "examples",
            "content": "\n".join(example_texts)
        })
        return self
    
    def add_constraint(self, constraint: str) -> "StructuredPromptBuilder":
        """添加约束条件"""
        self.constraints.append(constraint)
        return self
    
    def set_output_format(
        self, 
        format_type: OutputFormat,
        schema: Optional[Dict] = None
    ) -> "StructuredPromptBuilder":
        """设置输出格式"""
        self.output_format = format_type
        
        format_instructions = {
            OutputFormat.JSON: "请以 JSON 格式输出响应",
            OutputFormat.MARKDOWN: "请使用 Markdown 格式输出",
            OutputFormat.TABLE: "请以表格形式输出",
            OutputFormat.PLAIN_TEXT: "请以纯文本形式输出"
        }
        
        instruction = format_instructions.get(format_type, "")
        
        if schema and format_type == OutputFormat.JSON:
            instruction += f"\n\nJSON 结构要求:\n{json.dumps(schema, indent=2, ensure_ascii=False)}"
        
        self.components.append({
            "type": "output_format",
            "content": instruction
        })
        return self
    
    def build(self) -> str:
        """构建最终提示词"""
        prompt_parts = []
        
        # 1. 角色定义
        if self.role_definition:
            prompt_parts.append(self.role_definition)
        
        # 2. 指令（按优先级排序）
        instructions = [c for c in self.components if c["type"] == "instruction"]
        instructions.sort(key=lambda x: x.get("priority", 1))
        
        if instructions:
            prompt_parts.append("\n【任务指令】")
            for inst in instructions:
                prompt_parts.append(f"\n{inst['title']}: {inst['content']}")
        
        # 3. 上下文
        contexts = [c for c in self.components if c["type"] == "context"]
        if contexts:
            prompt_parts.append("\n【背景信息】")
            for ctx in contexts:
                prompt_parts.append(f"\n{ctx['content']}")
        
        # 4. 示例
        examples = [c for c in self.components if c["type"] == "examples"]
        for ex in examples:
            prompt_parts.append(f"\n{ex['content']}")
        
        # 5. 约束
        if self.constraints:
            prompt_parts.append("\n【约束条件】")
            for i, constraint in enumerate(self.constraints, 1):
                prompt_parts.append(f"{i}. {constraint}")
        
        # 6. 输出格式
        output_formats = [c for c in self.components if c["type"] == "output_format"]
        if output_formats:
            prompt_parts.append("\n【输出要求】")
            for fmt in output_formats:
                prompt_parts.append(fmt["content"])
        
        return "\n".join(prompt_parts)

# 使用示例
def example_structured_prompt():
    builder = StructuredPromptBuilder()
    
    prompt = (
        builder
        .set_role(
            role="数据分析助手",
            expertise=[
                "统计分析",
                "数据可视化",
                "趋势预测",
                "异常检测"
            ],
            limitations=[
                "不编造任何数据",
                "不确定时明确标注",
                "不进行超出数据范围的推断"
            ]
        )
        .add_instruction(
            title="主要任务",
            content="分析提供的销售数据，识别关键趋势和异常",
            priority=1
        )
        .add_instruction(
            title="分析步骤",
            content="1. 数据清洗 2. 描述性统计 3. 趋势分析 4. 异常检测",
            priority=2
        )
        .add_context(
            "数据范围：2024年Q1-Q4\n数据来源：销售系统\n包含字段：日期、产品类别、地区、销量、单价"
        )
        .add_examples([
            {
                "输入": "数据: [1, 2, 3, 100, 4, 5]",
                "输出": "异常值: [100]，建议处理后重新分析"
            },
            {
                "输入": "连续下降趋势",
                "输出": "建议：检查外部因素，制定应对策略"
            }
        ])
        .add_constraint("只基于提供的数据进行分析")
        .add_constraint("异常值需要特别标注")
        .set_output_format(OutputFormat.JSON, schema={
            "summary": "分析摘要",
            "trends": ["趋势列表"],
            "anomalies": ["异常列表"],
            "recommendations": ["建议列表"]
        })
        .build()
    )
    
    print(prompt)

# 运行示例
example_structured_prompt()
```

---

## 5. 最佳实践

### 5.1 提示词设计最佳实践

根据 OpenAI 和 Anthropic 的官方指南，以下是提示词设计的最佳实践 [citation:OpenAI - Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)：

**1. 清晰具体的指令**

```python
# ❌ 模糊的指令
"分析这个数据"

# ✅ 清晰具体的指令
"请分析2024年Q1-Q4的销售数据，计算：
1. 每个月的总销售额
2. 销售额环比增长率
3. 找出销售额最高和最低的月份
4. 识别任何异常值（如超过均值2个标准差）

以表格形式呈现结果，并在最后给出简要分析。"
```

**2. 使用结构化格式**

```python
# ✅ 使用明确的格式和分隔符
prompt = """
【任务】
将以下英文句子翻译成中文

【格式要求】
- 直译
- 意译
- 解释

【句子】
"The early bird catches the worm"

【翻译】
"""
```

**3. 角色扮演提升效果**

```python
prompt = """
你是一位拥有20年经验的资深软件架构师，专长于：
- 微服务架构设计
- 系统性能优化
- 技术债务管理

请评审以下架构设计方案，指出潜在问题并提供改进建议。
"""
```

### 5.2 上下文管理最佳实践

**1. 重要信息放在开头或结尾**

由于「中间丢失」效应，重要信息应放在上下文的显著位置：

```
【关键要求】（放在开头）
- 所有输出必须使用中文
- 数值保留两位小数

[... 大量中间内容 ...]

【最终检查清单】（放在结尾）
- 是否使用了中文？
- 数值精度是否正确？
```

**2. 使用明确的分隔符**

```python
prompt = """
=== 背景信息 ===
{background}

=== 用户输入 ===
{user_input}

=== 输出要求 ===
{requirements}

=== 响应 ===
"""
```

**3. 控制上下文长度**

```python
# 估算 token 数的简单方法
def estimate_tokens(text: str) -> int:
    # 粗略估算：中文约1字≈1.5 token，英文约1词≈1.3 token
    chinese_chars = sum(1 for c in text if '\u4e00' <= c <= '\u9fff')
    other_chars = len(text) - chinese_chars
    return int(chinese_chars * 1.5 + other_chars / 4)
```

### 5.3 RAG 最佳实践

**1. 分块策略（Chunking Strategy）**

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| 固定大小 | 简单实现 | 可能切断语义 | 通用场景 |
| 段落分割 | 保持语义完整 | 块大小不一 | 文档分析 |
| 语义分割 | 高相关性 | 实现复杂 | 精确检索 |
| 层次分割 | 支持多粒度 | 管理复杂 | 大文档 |

**2. 上下文增强**

Anthropic 提出的上下文检索方法显著提升了 RAG 效果 [citation:Anthropic - Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)：

```python
def create_contextual_chunk(document: str, chunk: str, doc_id: str) -> str:
    """创建带上下文的文本块"""
    return f"""
[文档: {doc_id}]
[文档概述: {get_document_summary(document)}]
[前文摘要: {get_previous_context(chunk)}]

当前段落:
{chunk}

[后文提示: {get_next_topic_hint(chunk)}]
"""
```

### 5.4 Agent 上下文最佳实践

**1. 分离不同类型的信息**

```python
context = {
    "system": "你是一个客服助手...",
    "tools": {...},  # 工具定义
    "memory": {...},  # 记忆信息
    "current_task": {...},  # 当前任务
    "conversation": [...]  # 对话历史
}
```

**2. 动态调整上下文**

```python
def should_include_in_context(item: Any, current_tokens: int, max_tokens: int) -> bool:
    """判断是否应包含某项信息"""
    item_tokens = estimate_tokens(item)
    
    # 核心信息永远包含
    if is_core_information(item):
        return True
    
    # 检查是否会影响输出质量
    impact = estimate_impact_on_output(item)
    
    # 空间足够且影响较大
    return (current_tokens + item_tokens < max_tokens) and impact > 0.3
```

**3. 错误处理和恢复**

```python
class ContextError(Exception):
    """上下文相关错误"""
    pass

class ContextValidator:
    """上下文验证器"""
    
    def __init__(self, max_tokens: int):
        self.max_tokens = max_tokens
    
    def validate(self, context: List[Dict]) -> None:
        """验证上下文"""
        total_tokens = sum(estimate_tokens(msg["content"]) for msg in context)
        
        if total_tokens > self.max_tokens:
            raise ContextError(
                f"上下文超限: {total_tokens} tokens > {self.max_tokens} tokens"
            )
        
        # 检查必需组件
        roles = [msg["role"] for msg in context]
        if "system" not in roles:
            raise ContextError("缺少系统提示词")
    
    def suggest_optimization(self, context: List[Dict]) -> List[str]:
        """建议优化方案"""
        suggestions = []
        
        total_tokens = sum(estimate_tokens(msg["content"]) for msg in context)
        if total_tokens > self.max_tokens * 0.8:
            suggestions.append("上下文使用率超过80%，建议优化")
        
        # 检查是否有重复信息
        # ... 重复检测逻辑
        
        return suggestions
```

---

## 6. 常见问题与解决方案

### 6.1 上下文超限问题

**问题描述**：输入的 Token 数超过模型的上下文窗口限制。

**解决方案**：

| 策略 | 实现难度 | 效果 | 适用场景 |
|------|---------|------|---------|
| 智能截断 | 低 | 中 | 对话历史 |
| 摘要压缩 | 中 | 高 | 长对话 |
| 选择性检索 | 中 | 高 | 知识密集 |
| 分块处理 | 中 | 高 | 长文档 |
| 模型升级 | 低 | 高 | 预算充足 |

**代码示例**：

```python
def smart_truncate(
    messages: List[Dict], 
    max_tokens: int,
    preserve_roles: List[str] = ["system"]
) -> List[Dict]:
    """智能截断，优先保留系统消息"""
    result = []
    available_tokens = max_tokens
    
    # 第一步：添加必须保留的消息
    must_keep = []
    for msg in messages:
        if msg["role"] in preserve_roles:
            tokens = estimate_tokens(msg["content"])
            if tokens < available_tokens:
                must_keep.append(msg)
                available_tokens -= tokens
    
    # 第二步：从后向前添加其他消息
    remaining = [
        msg for msg in messages 
        if msg not in must_keep and msg["role"] not in preserve_roles
    ]
    
    current_tokens = 0
    for msg in reversed(remaining):
        msg_tokens = estimate_tokens(msg["content"])
        if current_tokens + msg_tokens <= available_tokens:
            result.insert(0, msg)
            current_tokens += msg_tokens
        else:
            break
    
    return must_keep + result
```

### 6.2 输出质量不稳定

**问题描述**：相同的输入得到不同的输出质量。

**原因分析**：
- 上下文信息不完整
- 提示词不够明确
- 模型固有的随机性
- 缺乏示例

**解决方案**：

```python
def stabilize_output(prompt: str, examples: List[Dict]) -> str:
    """通过 Few-shot 示例稳定输出"""
    if not examples:
        return prompt
    
    # 添加明确的输出格式约束
    enhanced_prompt = prompt + "\n\n"
    enhanced_prompt += "【输出格式约束】\n"
    enhanced_prompt += "- 使用与示例相同的结构和术语\n"
    enhanced_prompt += "- 如果不确定，参考示例的表述方式\n\n"
    
    # 添加示例
    enhanced_prompt += "【参考示例】\n"
    for i, ex in enumerate(examples, 1):
        enhanced_prompt += f"示例 {i}:\n"
        enhanced_prompt += f"输入: {ex['input']}\n"
        enhanced_prompt += f"输出: {ex['output']}\n\n"
    
    return enhanced_prompt

# 使用 Temperature 控制
def generate_with_stability(
    client, 
    prompt: str, 
    stability_level: str = "high"
) -> str:
    """根据稳定性需求调整生成参数"""
    stability_configs = {
        "high": {"temperature": 0.1, "top_p": 0.9},
        "medium": {"temperature": 0.5, "top_p": 0.95},
        "creative": {"temperature": 0.9, "top_p": 0.95}
    }
    
    config = stability_configs.get(stability_level, stability_configs["medium"])
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        **config
    )
    
    return response.choices[0].message.content
```

### 6.3 模型「幻觉」问题

**问题描述**：模型生成看似合理但实际错误的信息。

**解决方案**：

```python
def reduce_hallucination_prompt(prompt: str, grounding_context: str = "") -> str:
    """添加减少幻觉的提示词增强"""
    
    grounding_instructions = """
【事实核查要求】
1. 只使用提供的背景信息回答，不要编造任何未给出的事实
2. 当信息不足以回答时，明确说明"根据提供的信息，无法确定..."
3. 对于推测性内容，使用"可能"、"推测"等限定词
4. 引用信息来源时，使用[来源N]格式标注
"""
    
    if grounding_context:
        return f"{prompt}\n\n【背景信息】\n{grounding_context}\n{grounding_instructions}"
    
    return prompt + "\n" + grounding_instructions

# 使用结构化输出强制格式
def structured_output_prompt(schema: Dict) -> str:
    """强制结构化输出以减少歧义"""
    import json
    
    return f"""
请严格按照以下 JSON Schema 输出：
{json.dumps(schema, indent=2, ensure_ascii=False)}

要求：
- 只输出 JSON，不要有其他文字
- 字段值必须是 Schema 指定的类型
- 不确定的值使用 null，不要编造
- 数组元素类型必须一致
"""
```

### 6.4 上下文污染问题

**问题描述**：历史对话中的无关信息影响当前任务。

**解决方案**：

```python
class ContextFilter:
    """上下文过滤器"""
    
    def __init__(self, embedding_model=None):
        self.embedding_model = embedding_model
    
    def filter_relevant_messages(
        self, 
        messages: List[Dict], 
        current_task: str,
        relevance_threshold: float = 0.5,
        max_messages: int = 10
    ) -> List[Dict]:
        """过滤与当前任务相关的消息"""
        
        if not self.embedding_model:
            # 无 embedding 模型时，使用关键词匹配
            return self.keyword_filter(messages, current_task, max_messages)
        
        # 计算相关性
        task_embedding = self.embedding_model.encode(current_task)
        scored_messages = []
        
        for msg in messages:
            msg_embedding = self.embedding_model.encode(msg["content"])
            similarity = cosine_similarity(task_embedding, msg_embedding)
            
            if similarity >= relevance_threshold:
                scored_messages.append((msg, similarity))
        
        # 按相关性排序并截取
        scored_messages.sort(key=lambda x: x[1], reverse=True)
        return [msg for msg, _ in scored_messages[:max_messages]]
    
    def keyword_filter(
        self, 
        messages: List[Dict], 
        task: str,
        max_messages: int
    ) -> List[Dict]:
        """基于关键词过滤"""
        keywords = self.extract_keywords(task)
        
        scored = []
        for msg in messages:
            score = sum(1 for kw in keywords if kw in msg["content"].lower())
            scored.append((msg, score))
        
        scored.sort(key=lambda x: x[1], reverse=True)
        return [msg for msg, _ in scored[:max_messages]]
    
    def extract_keywords(self, text: str) -> List[str]:
        """提取关键词（简化版）"""
        # 移除停用词
        stopwords = {"的", "了", "在", "是", "我", "有", "和", "就", "不", "人"}
        words = text.split()
        return [w for w in words if w not in stopwords and len(w) > 1]
```

### 6.5 长文本处理问题

**问题描述**：处理超长文档时效果下降。

**解决方案**：

```python
class HierarchicalDocumentProcessor:
    """层次化文档处理器"""
    
    def __init__(self, chunk_size: int = 1000, overlap: int = 200):
        self.chunk_size = chunk_size
        self.overlap = overlap
    
    def process_document(self, document: str) -> Dict:
        """层次化处理文档"""
        # 1. 生成文档摘要
        summary = self.generate_summary(document)
        
        # 2. 分割成块
        chunks = self.split_into_chunks(document)
        
        # 3. 为每个块生成摘要
        chunk_summaries = [self.generate_summary(chunk) for chunk in chunks]
        
        return {
            "summary": summary,
            "chunks": chunks,
            "chunk_summaries": chunk_summaries,
            "metadata": {
                "total_chunks": len(chunks),
                "document_length": len(document)
            }
        }
    
    def split_into_chunks(self, text: str) -> List[str]:
        """分割文档"""
        chunks = []
        start = 0
        
        while start < len(text):
            end = start + self.chunk_size
            chunk = text[start:end]
            
            # 尝试在句子边界分割
            if end < len(text):
                last_period = chunk.rfind('。')
                if last_period > self.chunk_size // 2:
                    chunk = chunk[:last_period + 1]
                    end = start + len(chunk)
            
            chunks.append(chunk)
            start = end - self.overlap
        
        return chunks
    
    def build_query_context(
        self, 
        processed: Dict, 
        query: str,
        top_k: int = 3
    ) -> str:
        """为查询构建上下文"""
        # 1. 找到最相关的块
        relevant_indices = self.find_relevant_chunks(
            processed["chunk_summaries"], 
            query,
            top_k
        )
        
        # 2. 构建上下文
        context_parts = [f"【文档摘要】\n{processed['summary']}\n"]
        context_parts.append("【相关段落】\n")
        
        for idx in relevant_indices:
            context_parts.append(f"[段落 {idx + 1}]\n{processed['chunks'][idx]}\n")
        
        return "\n".join(context_parts)
```

---

## 7. 总结与进阶路线

### 7.1 核心要点总结

| 类别 | 关键要点 |
|------|---------|
| **概念** | Context Engineering 关注完整上下文系统的设计，而非单个提示词 |
| **系统提示词** | 明确定义角色、能力边界、行为规范和输出格式 |
| **上下文管理** | 重要信息放首尾，使用分隔符，控制长度 |
| **Few-shot** | 提供多样化、高质量的示例 |
| **RAG** | 智能检索 + 上下文增强 |
| **迭代优化** | 测试 → 评估 → 调整 → 验证 |

### 7.2 Context Engineering 检查清单

```markdown
## 上线前检查清单

### 系统提示词
- [ ] 角色定义清晰
- [ ] 能力边界明确
- [ ] 约束条件完整
- [ ] 输出格式指定

### 上下文构建
- [ ] 上下文长度合理
- [ ] 重要信息位置正确
- [ ] 无重复冗余信息
- [ ] 格式统一规范

### 示例设计
- [ ] 示例覆盖主要场景
- [ ] 示例输出正确
- [ ] 示例格式一致
- [ ] 数量适中（2-5个）

### 工具定义
- [ ] 命名清晰
- [ ] 参数定义完整
- [ ] 返回格式明确
- [ ] 错误处理说明

### 错误处理
- [ ] 上下文超限处理
- [ ] 无效输入处理
- [ ] 异常情况处理
- [ ] 降级策略
```

### 7.3 进阶学习路线

```
┌─────────────────────────────────────────────────────────────────┐
│                     Context Engineering 进阶路线                   │
└─────────────────────────────────────────────────────────────────┘

阶段一：基础入门（1-2周）
├── 理解上下文窗口概念
├── 掌握基本提示词技巧
├── 学习 Few-shot 方法
└── 完成简单项目练习

阶段二：系统提升（2-4周）
├── 学习 RAG 技术
├── 掌握上下文管理策略
├── 实现多轮对话系统
└── 优化提示词性能

阶段三：高级应用（1-2月）
├── 构建 AI Agent 系统
├── 设计复杂工作流
├── 实现记忆系统
└── 处理边缘案例

阶段四：生产优化（持续）
├── 性能调优
├── 成本优化
├── 监控与迭代
└── 团队协作规范
```

### 7.4 推荐资源

**官方文档**：
- [OpenAI Prompt Engineering Guide](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) - OpenAI 官方提示词工程指南
- [Anthropic Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) - Anthropic 的上下文工程实践
- [Prompt Engineering Guide](https://www.promptingguide.ai/guides/context-engineering-guide) - 全面的提示词工程指南

**开源项目**：
- [DataWhale Context Engineering](https://github.com/datawhalechina/dive-into-context-engineering) - 中文开源教程
- [LangChain](https://github.com/langchain-ai/langchain) - Agent 开发框架
- [LlamaIndex](https://github.com/run-llama/llama_index) - RAG 开发框架

**进阶主题**：
- 向量数据库与语义检索
- Agent 记忆系统设计
- 多模态上下文处理
- 本地部署与成本优化

---

## 附录：快速参考卡片

### A1. 提示词模板

```markdown
【角色】
你是...

【任务】
请...

【背景】
...

【要求】
1. ...
2. ...
3. ...

【示例】
输入: ...
输出: ...

【输出格式】
...
```

### A2. Token 估算速查

| 内容类型 | Token 估算 |
|---------|-----------|
| 中文（简体） | 1 字 ≈ 1.5 tokens |
| 中文（繁体） | 1 字 ≈ 1.3 tokens |
| 英文单词 | 1 词 ≈ 1.3 tokens |
| 代码 | 1 字符 ≈ 1 token |
| 中英文混合 | 按字符/单词分别估算 |

### A3. 常见错误代码对照

| 错误 | 原因 | 解决方案 |
|-----|------|---------|
| context_length_exceeded | 上下文超限 | 截断/摘要/检索 |
| invalid_format | 格式错误 | 明确输出格式 |
| hallucination | 幻觉 | 添加 grounding |
| inconsistent_output | 输出不一致 | 添加示例 |
| tool_call_failed | 工具调用失败 | 检查参数/权限 |

---

*本文档由 AI 辅助生成，内容基于公开研究和最佳实践。如有错误，欢迎指正。*

**最后更新**：2025年3月

---

## Sources

- [Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) - AI Agent 上下文工程最佳实践
- [Prompt Engineering Guide - Context Engineering Guide](https://www.promptingguide.ai/guides/context-engineering-guide) - 上下文工程完整指南
- [OpenAI - Best practices for prompt engineering with the OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) - OpenAI 官方最佳实践
- [Context Length Guide 2025](https://local-ai-zone.github.io/guides/context-length-optimization-ultimate-guide-2025.html) - 上下文长度优化指南
- [Context Window Management Strategies](https://www.getmaxim.ai/articles/context-window-management-strategies-for-long-context-ai-agents-and-chatbots/) - 长上下文管理策略
- [RAG Implementation Guide 2025](https://tensorblue.com/blog/rag-retrieval-augmented-generation-implementation-guide-2025) - RAG 实现指南
- [Anthropic - Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) - 上下文感知检索方法
- [AI Agent Memory Systems](https://calmops.com/ai/ai-agent-memory-systems-context-management/) - AI Agent 记忆系统
- [DataWhale - dive-into-context-engineering](https://github.com/datawhalechina/dive-into-context-engineering) - 中文开源上下文工程教程
- [Latitude - 10 Best Practices for Production-Grade LLM Prompt Engineering](https://latitude.so/blog/10-best-practices-for-production-grade-llm-prompt-engineering) - 生产级提示词工程最佳实践
