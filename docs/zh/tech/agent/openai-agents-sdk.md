# OpenAI Agents SDK

> 原文: https://openai.github.io/openai-agents-python/

## 概述

OpenAI Agents SDK 让你用轻量、易用的方式构建 agentic AI 应用，只用少量抽象。 它是之前 [Swarm](https://github.com/openai/swarm/tree/main) 实验的生产就绪升级版。

Agents SDK 的核心原语非常精简：
- **Agents**: 配备指令和工具的 LLMs
- **Handoffs (Agents as Tools)**: 允许 agents 将任务委托给其他 agents
- **Guardrails**: 验证 agent 输入输出的机制

## 设计原则

SDK 有两个核心设计原则：
1. 功能足够值得使用，但原语足够少，学习快速
2. 开箱即用优秀，但你可以精确定制每个细节

## 核心特性

| 特性 | 说明 |
|------|------|
| **Agent Loop** | 内置 agent 循环，处理工具调用、将结果返回 LLM、持续直到任务完成 |
| **Python-First** | 用 Python 语言特性编排和链接 agents，无需学习新抽象 |
| **Agents as Tools / Handoffs** | 跨多 agents 协调和委托工作的强大机制 |
| **Guardrails** | 与 agent 执行并行运行输入验证和安全检查，失败即停 |
| **Function Tools** | 将任何 Python 函数转为工具，自动生成 schema 和 Pydantic 验证 |
| **MCP Server Tool Calling** | 内置 MCP server 工具集成，与函数工具用法相同 |
| **Sessions** | 持久化内存层，在 agent 循环中维护工作上下文 |
| **Human in the Loop** | 内置机制，在 agent 运行中引入人工参与 |
| **Tracing** | 内置追踪，可视化、调试和监控工作流 |
| **Realtime Agents** | 用 gpt-realtime-1.5 构建低延迟语音 agent |

## 安装

```bash
pip install openai-agents
```

## Hello World 示例

```python
from agents import Agent, Runner

agent = Agent(name="Assistant", instructions="You are a helpful assistant")

result = Runner.run_sync(agent, "Write a haiku about recursion in programming.")
print(result.final_output)
# Code within the code,
# Functions calling themselves,
# Infinite loop's dance.
```

设置环境变量：
```bash
export OPENAI_API_KEY=sk-...
```

## 核心概念

### Agent

Agent 是配备指令和工具的 LLM。你定义：
- `name`: agent 名称
- `instructions`: agent 的系统指令
- `tools`: agent 可使用的工具

### Handoffs (Agents as Tools)

一个 agent 可以将任务委托给另一个 agent。这对于：
- 需要专业知识的任务
- 需要不同视角的场景
- 分层处理流程

### Guardrails

Guardrails 允许在 agent 执行的同时运行输入验证和安全检查：
- 定义输入验证规则
- 定义输出验证规则
- 验证失败时快速失败

### Function Tools

将任何 Python 函数转换为 agent 工具：
- 自动 schema 生成
- Pydantic 验证输入
- 错误处理

### Sessions

Sessions 提供持久化内存层，维护 agent 循环内的工作上下文：
- 跨轮次保持状态
- 管理对话历史
- 支持上下文累积

### Human in the Loop

SDK 提供内置机制在 agent 运行中引入人工参与：
- 在关键决策点暂停
- 请求人工确认
- 处理人工输入

### Tracing

内置追踪功能：
- 可视化 agent 流程
- 调试工作流
- 监控性能
- 支持评估和微调

### Realtime Agents

用 gpt-realtime-1.5 构建语音 agent：
- 自动中断检测
- 上下文管理
- Guardrails
- 低延迟语音交互

## 学习路径

| 目标 | 起点 |
|------|------|
| 构建第一个文本 agent 并看一次完整运行 | Quickstart |
| 添加函数工具、托管工具或 agents as tools | Tools |
| 在 handoffs 和 manager-style 编排间选择 | Agent orchestration |
| 跨轮次保持内存 | Running agents / Sessions |
| 使用 OpenAI 模型、WebSocket 传输或非 OpenAI 提供商 | Models |
| 审查输出、运行项目、中断和恢复状态 | Results |
| 用 gpt-realtime-1.5 构建低延迟语音 agent | Realtime agents quickstart |
| 构建语音转文本/agent/文本转语音 pipeline | Voice pipeline quickstart |

## Agent 编排选择

### Handoffs vs Manager-style

**Handoffs (推荐)**: 一个 agent 直接将任务转交给另一个 agent
- 清晰的所有权
- 简单直接的流程
- 适合任务明确需要不同专业知识时

**Manager-style**: 一个中心 agent 协调多个 sub-agents
- 适合需要聚合多个子任务结果时
- 适合需要复杂条件路由时
- 适合需要保持全局上下文时

## 与 Swarm 的区别

Agents SDK 是 Swarm 的生产就绪升级：
- 更稳定的核心抽象
- 内置 Tracing 支持
- 更好的错误处理
- 更完善的文档
- 持续维护和更新
