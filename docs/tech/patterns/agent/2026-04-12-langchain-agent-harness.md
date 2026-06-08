# The Anatomy of an Agent Harness

> **Title**: The Anatomy of an Agent Harness  
> **Author**: Vivek Trivedi  
> **Source**: [LangChain Blog - Inbox (Agent-Langchain)](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)  
> **Date**: 2026-04-12

---

## Core Definition: Agent = Model + Harness

The article establishes a fundamental equation:

```
Agent = Model + Harness
```

**Harness** is defined as everything outside the model itself — code, configuration, and execution logic that transforms a raw language model into an agent. A raw model alone is not an agent. Only when we add the harness do we get:

- **State** — memory and context management
- **Tool execution** — ability to take actions
- **Feedback loops** — self-correction and iteration
- **Enforceable constraints** — guardrails and limits

This framing is powerful because it separates concerns clearly: the model provides reasoning capability, while the harness provides everything else needed to make that reasoning actionable.

## Harness Core Components

The article identifies five core components of a well-designed harness:

### 1. System Prompts

引导 agent 行为的指令系统。包括角色定义、行为规则、输出格式要求等。好的 system prompt 让 agent 知道"我是谁"、"我该怎么做"。

### 2. Tools, Skills, MCPs

扩展模型能力的关键接口。Tools 让 agent 能执行特定操作，Skills 封装领域知识，MCP (Model Context Protocol) 提供标准化工具调用。

### 3. Bundled Infrastructure

Harness 自带的基础设施组件：
- **Filesystem** — workspace 读写能力
- **Sandbox** — 隔离安全执行环境
- **Browser** — 网页访问和操作

### 4. Orchestration Logic

编排多个 agent 或任务的逻辑：
- Subagent spawning — 分解任务给专门的子 agent
- Handoffs — 任务在不同 agent 间的交接
- Model routing — 根据任务类型选择不同模型

### 5. Hooks / Middleware

拦截和修改 agent 行为的中间件：
- **Compaction** — 压缩过长的上下文
- **Continuation** — 长任务的分步执行
- **Lint checks** — 输出质量检查

## Key Primitive: Filesystem for Durable Storage

The article emphasizes **filesystem** as one of the most important primitives for agents. This is deeply relevant to my work on OpenClaw.

Why filesystem matters:

1. **Workspace operations** — Agent needs to read/write data, code, and documents
2. **Context offloading** — Not everything belongs in the context window; offload to filesystem
3. **Cross-session persistence** — Maintain state across sessions without losing context
4. **Multi-agent collaboration** — Shared filesystem enables multiple agents to work together

> **Personal insight**: This aligns with how OpenClaw handles sessions — each conversation has persistent state on the filesystem, allowing agents to maintain context across interactions.

## Bash + Code as General Purpose Tool

The article makes a key point about the **ReAct loop**:

```
Model reasoning → Action via tool → Observe → Repeat
```

Bash and code execution capabilities let agents **design their own tools** rather than being limited to pre-configured fixed tools. This is a significant capability upgrade — an agent that can write and execute code has essentially unlimited tool extensibility.

This is the principle behind AI coding tools like Claude Code and Cursor. They don't just use tools; they can create new tools when needed.

## Sandboxes: Safe Execution Environments

Sandboxes provide **isolated, on-demand execution environments** that can be created and destroyed as needed.

Key characteristics:
- **Isolation** — Code runs separately from production systems
- **Scalability** — Can scale horizontally based on demand
- **Security** — Contains potential damage from malicious or buggy code

Enhancement mechanisms:
- **Allow-list commands** — Only permit specific operations
- **Network isolation** — Prevent unauthorized network access
- **Pre-installed runtimes** — CLIs, browsers, test runners available out of the box

The goal: let agents **observe** their work and **self-verify** results in a safe environment.

## Memory & Search: Knowledge is Context Injection

A critical insight: **models cannot edit their own weights**. This means "adding knowledge" to an agent can only happen through:

1. **Context injection** — Providing knowledge at inference time
2. **Retrieval** — Searching relevant information when needed

This is why RAG (Retrieval Augmented Generation) exists and why memory systems are fundamental to agent architecture. The agent's "knowledge" is always a combination of:
- Pre-trained weights (general knowledge)
- Context window (current session context)
- Retrieved information (from memory/search systems)

## Personal Reflection: Harness Design Choices

Reading this article, I see several important implications:

### 1. The Model is Just One Piece

It's easy to focus on which model to use (Claude, GPT-4, etc.), but the article reminds us that the **harness is equally important**. Two agents with the same model but different harnesses will have dramatically different capabilities.

### 2. Filesystem as Foundation

The emphasis on filesystem as a core primitive resonates with how I've seen agents built. Having a durable, shared filesystem is foundational for:
- Long-running task persistence
- Multi-agent state sharing
- Cross-session continuity

### 3. Tool Flexibility vs. Fixed Tools

The distinction between **fixed tools** (predefined actions the agent can take) and **general purpose tools** (ability to write code/bash that creates new capabilities) is crucial. Fixed tools are safer and more predictable; general purpose tools are more flexible and powerful.

### 4. Security Through Sandboxing

The sandbox concept is essential for production agents. Without isolation, agents could cause damage to production systems. Sandboxing enables agents to experiment, test, and verify without risk.

## Relationship to Other Concepts

### vs. MCP (Model Context Protocol)

MCP is one specific implementation of the **Tools, Skills, MCPs** component. It provides a standardized protocol for tool discovery and invocation. MCP sits at the tool integration layer of the harness.

### vs. Agent Skills

Agent Skills are a specific instantiation of the **Skills** component within the harness. They provide:
- Progressive disclosure (load only what's needed)
- Portability across agent platforms
- Structured knowledge encapsulation

The harness provides the runtime; Skills provide the content.

### vs. OpenClaw Agents

OpenClaw's agent architecture implements several of these concepts:
- **Sessions** provide state management (like filesystem persistence)
- **Hooks** system enables middleware patterns (compaction, continuation)
- **Channel system** handles orchestration across different interfaces
- **Skills** provide domain-specific knowledge

## Practical Takeaways

1. **Don't just focus on the model** — The harness is where most of the engineering happens
2. **Design filesystem/state management early** — It's foundational, not optional
3. **Consider sandboxing for safety** — Essential for production agents
4. **Balance fixed tools vs. general purpose** — Fixed tools for reliability, code execution for flexibility
5. **Memory is retrieval, not weights** — Design your retrieval systems as carefully as your prompts

## Summary

This article provides a valuable mental framework: **Agent = Model + Harness**. The model provides reasoning capability; the harness provides everything else that makes that reasoning actionable in the real world.

The five core harness components — System Prompts, Tools/Skills/MCPs, Bundled Infrastructure, Orchestration Logic, and Hooks/Middleware — form a useful checklist for designing agent systems.

Most importantly, the article reinforces that building agents is fundamentally a **systems engineering challenge**, not just a model selection challenge. The harness is where most of the real work happens.

---

## References

- [The Anatomy of an Agent Harness - LangChain Blog](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)
- [MCP Protocol](/integration/protocols/mcp)
- [Agent Skills](/tech/patterns/agent/skills)
