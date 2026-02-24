# AI 编程工具特性分析 - L3  Proficiency

## 验证说明

本文档基于 Context7 官方文档验证和 WebFetch 链接检查完成验证。

**验证方法：**
- Phase 1: 使用 WebFetch 验证文档链接有效性
- Phase 2: 使用 Context7 库查询各工具官方文档验证特性准确性
- Phase 3: 应用四原则检验评估逻辑

**四原则（特性是否需要讲解）：**
1. 不讲解该特性是否影响 PPT 培训目标（L3 对话编程级别）？
2. 该特性是否已成为默认编辑器能力？
3. 不符合 1，2 原则，是否有发展空间可放延伸阅读？
4. 不符合 1，2，3 不用讲解

---

## 一、工具对比总结

### 跨工具对比：L3 关键特性缺失

| 特性类别 | Cursor | Claude Code | Gemini CLI | GitHub Copilot | Trae | OpenCode | Codex | 优先级 |
|:----------------|:------:|:-----------:|:----------:|:--------------:|:----:|:--------:|:-----:|:--------:|
| **Plan Mode** | ❌ | ✅ 已验证 | ❌ | ❌ | ❌ | ✅ 已验证 | ❌ | **必须添加** |
| **Session Management** | ❌ | ✅ 已验证 | ⚠️ 部分 | ❌ | ❌ | ⚠️ 部分 | ❌ | **必须添加** |
| **Worktrees** | ❌ | ✅ 已验证 | ❌ | ❌ | ❌ | ❌ | ✅ 已验证 | **必须添加** |
| **Headless/Automation** | ❌ | ✅ 已验证 | ✅ 已验证 | ⚠️ CLI | ❌ | ❌ | ❌ | **必须添加** |
| **Multi-file Editing** | ✅ 已验证 | ❌ | ❌ | ❌ | ⚠️ Builder | ❌ | ❌ | **必须添加** |
| **Git Integration** | ⚠️ 部分 | ✅ 已验证 | ❌ | ⚠️ 部分 | ❌ | ❌ | ❌ | **必须添加** |
| **Testing Workflows** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **High** |
| **Codebase Indexing** | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | **High** |
| **Multimodal** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Medium |
| **Extended Thinking** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Medium |

图例：
- ❌ PPT 未覆盖
- ⚠️ 已提及但未深入讲解
- ✅ 完全覆盖

---

## 二、工具详细特性分析

### Tool 1: Cursor

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [AGENTS.md](https://cursor.com/docs/context/rules) | AI对齐的项目上下文标准 | ✅ Yes | High |
| [Rules (.cursor/rules)](https://cursor.com/docs/context/rules) | 基于glob模式的精细化控制 | ✅ Yes | High |
| [Commands](https://cursor.com/docs/context/commands) | 工作流自定义斜杠命令 | ✅ Yes | High |
| [Skills](https://cursor.com/docs/context/skills) | 可复用能力和工具函数 | ✅ Yes | High |
| [MCP](https://cursor.com/docs/context/mcp) | Model Context Protocol 集成 | ✅ Yes | High |
| [Hooks](https://cursor.com/docs/agent/hooks) | 文件操作生命周期拦截器 | ✅ Yes | Medium |
| [Sub-agents](https://cursor.com/docs/context/subagents) | 特定任务的专用AI代理 | ✅ Yes | High |
| [BugBot](https://cursor.com/docs/bugbot) | 带运行时上下文的自动调试器 | ✅ Yes (Unique) | High |
| [Composer](https://cursor.com/docs/agent/overview) | 多文件AI编码助手（Agent模式） | ❌ No | **Critical** |
| [Tab](https://cursor.com/docs/tab/overview) | 智能代码补全 | ❌ No | High |
| [Chat](https://cursor.com/docs/context/mentions) | AI对话界面 | ❌ No | Medium |
| [Codebase Indexing](https://cursor.com/docs/context/semantic-search) | 项目级向量搜索 | ❌ No | **Critical** |
| [@ Symbols](https://cursor.com/docs/context/mentions) | 文件/函数引用 | ❌ No | **Critical** |
| [Agent Mode](https://cursor.com/docs/agent/overview) | 自主编码模式 | ❌ No | **Critical** |
| [Notepad](https://cursor.com/docs/context/mentions) | 持久化草稿板上下文 | ❌ No | Low |
| [Docs Integration](https://cursor.com/docs/context/mentions) | 自定义文档索引 | ❌ No | Medium |
| [Privacy Mode](https://cursor.com/docs/enterprise/privacy-and-data-governance) | 本地处理选项 | ❌ No | Low |
| [Model Selection](https://cursor.com/docs/models) | Claude/GPT等模型选择 | ❌ No | Medium |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Composer/Agent](https://cursor.com/docs/agent/modes) | ✅ 影响L3 - 多文件编辑核心能力 | ❌ 非默认 | - | - | **必须添加** - Cursor的核心差异化能力 |
| [Codebase Indexing](https://cursor.com/docs/context/semantic-search) | ✅ 影响L3 - 项目级上下文基础 | ❌ 非默认 | - | - | **必须添加** - L3上下文理解关键 |
| [Agent Mode](https://cursor.com/docs/agent/modes) | ✅ 影响L3 - 自主编码模式 | ❌ 非默认 | - | - | **必须添加** - 氛围编程体验核心 |
| [@ Symbols](https://cursor.com/docs/context/mentions) | ✅ 影响L3 - 上下文引用基础 | ❌ 非默认 | - | - | **必须添加** - AI编码工具基础能力 |
| [Tab](https://cursor.com/docs/tab/overview) | ❌ L1/L2能力 | ✅ IDE默认具备 | - | - | **不用讲解** - 代码补全是L1/L2基础 |
| [Chat](https://cursor.com/docs/context/mentions) | ❌ 基础界面 | ✅ 通用能力 | - | - | **不用讲解** - 已隐含覆盖 |
| [Notepad](https://cursor.com/docs/context/mentions) | ❌ 非核心 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 辅助功能 |
| [Privacy Mode](https://cursor.com/docs/enterprise/privacy-and-data-governance) | ❌ 企业功能 | ❌ 企业专属 | ❌ 无发展空间 | ✅ | **不用讲解** - 企业级特性 |
| [Model Selection](https://cursor.com/docs/models) | ❌ 基础配置 | ✅ 多个工具都有 | ❌ 无发展空间 | ✅ | **不用讲解** - 基础配置已覆盖 |

---

### Tool 2: Claude Code

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [CLAUDE.md](https://code.claude.com/docs/en/claude-md) | 项目上下文文件（类似AGENTS.md） | ✅ Yes | High |
| [Rules (.claude/rules)](https://code.claude.com/docs/en/memory#modular-rules) | 模块化规则系统 | ✅ Yes | High |
| [Skills](https://code.claude.com/docs/en/skills) | 自定义斜杠命令 | ✅ Yes | High |
| [Hooks](https://code.claude.com/docs/en/hooks) | 前后置操作拦截器 | ✅ Yes | Medium |
| [MCP](https://code.claude.com/docs/en/mcp) | Model Context Protocol | ✅ Yes | High |
| [Sub-agents](https://code.claude.com/docs/en/sub-agents) | 自定义代理创建 | ✅ Yes | High |
| [Agent Teams](https://code.claude.com/docs/en/agent-teams) | 多代理协调 | ✅ Yes (Unique) | High |
| [Plan Mode](https://code.claude.com/docs/en/common-workflows#plan-mode) | 修改前的只读分析 | ❌ No | **Critical** |
| [Worktrees](https://code.claude.com/docs/en/common-workflows#worktrees) | Git worktree隔离 | ❌ No | **Critical** |
| [Session Management](https://code.claude.com/docs/en/common-workflows#resume) | 恢复、重命名、分支会话 | ❌ No | **Critical** |
| [Headless Mode](https://code.claude.com/docs/en/cli-reference#headless) | CI/CD自动化 | ❌ No | **Critical** |
| [Extended Thinking](https://code.claude.com/docs/en/settings#thinking) | 深度推理模式 | ❌ No | Medium |
| [Git Integration](https://code.claude.com/docs/en/common-workflows#pull-requests) | PR创建、提交自动化 | ❌ No | **Critical** |
| [Image Analysis](https://code.claude.com/docs/en/common-workflows#images) | 多模态支持 | ❌ No | Medium |
| [Plugins](https://code.claude.com/docs/en/plugins) | IDE/编辑器扩展 | ❌ No | Medium |
| [Multi-surface](https://code.claude.com/docs/en/overview) | 终端/IDE/桌面/网页 | ❌ No | Low |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Plan Mode](https://code.claude.com/docs/en/common-workflows#plan-mode) | ✅ 影响L3 - 生产环境安全机制 | ❌ 非默认 | - | - | **必须添加** - L3安全开发必备 |
| [Worktrees](https://code.claude.com/docs/en/common-workflows#worktrees) | ✅ 影响L3 - 并行开发隔离 | ❌ 非默认 | - | - | **必须添加** - L3多任务核心能力 |
| [Session Management](https://code.claude.com/docs/en/common-workflows#resume) | ✅ 影响L3 - 多任务管理 | ❌ 非默认 | - | - | **必须添加** - L3效率核心 |
| [Headless Mode](https://code.claude.com/docs/en/cli-reference#headless) | ✅ 影响L3 - CI/CD集成 | ❌ 非默认 | - | - | **必须添加** - 团队/企业采用关键 |
| [Git Integration](https://code.claude.com/docs/en/common-workflows#pull-requests) | ✅ 影响L3 - 完整工作流 | ❌ 非默认 | - | - | **必须添加** - 开发全流程闭环 |
| [Extended Thinking](https://code.claude.com/docs/en/settings#thinking) | ⚠️ 影响L3 - 复杂决策质量 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 架构决策辅助 |
| [Image Analysis](https://code.claude.com/docs/en/common-workflows#images) | ⚠️ 影响L3 - UI工作流 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 前端开发者关注 |
| [Plugins](https://code.claude.com/docs/en/plugins) | ❌ 非核心 | ❌ 生态功能 | ❌ 无发展空间 | ✅ | **不用讲解** - 隐含覆盖 |
| [Multi-surface](https://code.claude.com/docs/en/overview) | ❌ 非功能特性 | ❌ 部署选项 | ❌ 无发展空间 | ✅ | **不用讲解** - 概述已提及 |

---

### Tool 3: Gemini CLI

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [GEMINI.md](https://geminicli.com/docs/cli/gemini-md) | 项目上下文配置 | ✅ Yes | High |
| [Skills](https://geminicli.com/docs/cli/skills) | Agent技能系统 | ✅ Yes | High |
| [MCP](https://geminicli.com/docs/tools/mcp-server) | Model Context Protocol | ✅ Yes | High |
| [Hooks](https://geminicli.com/docs/hooks) | 生命周期钩子 | ✅ Yes | Medium |
| [Sub-agents](https://geminicli.com/docs/core/subagents) | Agent委托 | ✅ Yes | High |
| [YOLO Mode](https://geminicli.com/docs/reference/policy-engine) | 非交互式执行 | ✅ Yes (Unique) | High |
| [100万 Token Context](https://gemini-cli.xyz/docs/zh/core) | 超大上下文窗口 | ❌ No | **Critical** |
| [Multimodal](https://gemini-cli.xyz/docs/zh/tools) | 图像/视频/音频/PDF支持 | ❌ No | **Critical** |
| [Built-in Search](https://gemini-cli.xyz/docs/zh/tools/web-search) | Google搜索集成 | ❌ No | **Critical** |
| [Extensions](https://blog.google/technology/developers/gemini-cli-extensions) | 插件系统 | ❌ No | Medium |
| [Checkpointing](https://gemini-cli.xyz/docs/zh/cli/checkpointing) | 状态保存/恢复 | ❌ No | Medium |
| [Sandbox](https://gemini-cli.xyz/docs/zh/cli/sandbox) | 隔离执行环境 | ❌ No | Medium |
| [Headless Mode](https://gemini-cli.xyz/docs/zh/cli/headless) | 脚本/自动化 | ❌ No | **Critical** |
| [Trusted Folders](https://gemini-cli.xyz/docs/zh/cli/trusted-folders) | 安全边界 | ❌ No | Low |
| [Token Caching](https://gemini-cli.xyz/docs/zh/cli/token-caching) | 成本优化 | ❌ No | Low |
| [IDE Integration](https://gemini-cli.xyz/docs/zh/ide-integration) | VS Code伴侣 | ❌ No | Medium |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [100万 Token Context](https://github.com/google-gemini/gemini-cli#why-gemini-cli) | ✅ 影响L3 - 大规模代码库理解 | ❌ 非默认 | - | - | **必须添加** - 核心竞争优势 |
| [Multimodal](https://github.com/google-gemini/gemini-cli) | ✅ 影响L3 - 图像/视频/音频支持 | ❌ 非默认 | - | - | **必须添加** - 差异化能力 |
| [Built-in Search](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/web-search.md) | ✅ 影响L3 - 实时联网编码 | ❌ 非默认 | - | - | **必须添加** - 现代开发必备 |
| [Headless Mode](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/headless.md) | ✅ 影响L3 - 自动化集成 | ❌ 非默认 | - | - | **必须添加** - CI/CD关键 |
| [Extensions](https://blog.google/technology/developers/gemini-cli-extensions) | ⚠️ 扩展性 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 生态展示 |
| [Checkpointing](https://gemini-cli.xyz/docs/zh/cli/checkpointing) | ❌ 非核心 | ❌ 非默认 | ❌ 无发展空间 | ✅ | **不用讲解** - 状态管理辅助 |
| [Sandbox](https://gemini-cli.xyz/docs/zh/cli/sandbox) | ❌ 安全功能 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 安全隔离特性 |
| [Trusted Folders](https://gemini-cli.xyz/docs/zh/cli/trusted-folders) | ❌ 安全配置 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 安全配置 |

---

### Tool 4: GitHub Copilot

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) | 个人/团队编码规范 | ✅ Yes | High |
| [Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | 可复用能力 | ✅ Yes | High |
| [MCP](https://docs.github.com/en/copilot/concepts/context/mcp) | Model Context Protocol | ✅ Yes | High |
| [Hooks](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks) | 生命周期自动化 | ✅ Yes | Medium |
| [Custom Agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) | 专用AI代理 | ✅ Yes | High |
| [Participant](https://docs.github.com/en/copilot/concepts/chat) | @-mentions上下文引用 | ✅ Yes (Unique) | High |
| [Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) | 自主PR创建 | ❌ No | **Critical** |
| [Code Review](https://docs.github.com/en/copilot/concepts/agents/code-review) | 自动化PR审查 | ❌ No | **Critical** |
| [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | 命令行界面 | ❌ No | **Critical** |
| [Copilot Chat](https://docs.github.com/en/copilot/how-tos/chat-with-copilot) | IDE聊天界面 | ❌ No | Medium |
| [Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) | 上下文工作区 | ❌ No | Medium |
| [Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | 跨会话学习 | ❌ No | Medium |
| [Spark](https://docs.github.com/en/copilot/concepts/spark) | 应用部署平台 | ❌ No | Low |
| [Auto Model Selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) | 动态模型切换 | ❌ No | Low |
| [Repository Indexing](https://docs.github.com/en/copilot/concepts/context/repository-indexing) | 代码库理解 | ❌ No | **Critical** |
| [Content Exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | 隐私/安全控制 | ❌ No | Low |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) | ✅ 影响L3 - 自主开发工作流 | ❌ 非默认 | - | - | **必须添加** - Copilot L3核心能力 |
| [Code Review](https://docs.github.com/en/copilot/concepts/agents/code-review) | ✅ 影响L3 - 自动化质量保证 | ❌ 非默认 | - | - | **必须添加** - 团队工作流关键 |
| [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | ✅ 影响L3 - 终端编码 | ❌ 非默认 | - | - | **必须添加** - 自动化/无头模式 |
| [Repository Indexing](https://docs.github.com/en/copilot/concepts/context/repository-indexing) | ✅ 影响L3 - 上下文理解 | ❌ 非默认 | - | - | **必须添加** - 项目级工作流基础 |
| [Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) | ⚠️ 影响L3 - 上下文管理 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 大团队组织 |
| [Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | ⚠️ 跨会话学习 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 差异化特性 |
| [Copilot Chat](https://docs.github.com/en/copilot/how-tos/chat-with-copilot) | ❌ 基础功能 | ✅ 通用能力 | - | - | **不用讲解** - 已隐含覆盖 |
| [Spark](https://docs.github.com/en/copilot/concepts/spark) | ❌ 部署平台 | ❌ 核心外范围 | ❌ 无发展空间 | ✅ | **不用讲解** - 独立产品 |
| [Auto Model Selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) | ❌ 优化功能 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 实现细节 |
| [Content Exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | ❌ 管理/安全 | ❌ 企业专属 | ❌ 无发展空间 | ✅ | **不用讲解** - 企业特性 |

---

### Tool 5: Trae

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [Rules](https://docs.trae.ai/ide/rules?_lang=en) | 项目特定规范 | ✅ Yes | High |
| [Skills](https://docs.trae.ai/ide/skills) | 自定义能力 | ✅ Yes | High |
| [MCP](https://docs.trae.ai/ide/ide-settings-overview?_lang=en) | Model Context Protocol | ✅ Yes | High |
| [Agent](https://docs.trae.ai/ide/agent?_lang=en) | AI编码助手 | ✅ Yes | High |
| [SOLO Mode](https://www.trae.ai/solo) | 自主任务完成 | ✅ Yes (Unique) | High |
| [Builder Mode](https://docs.trae.ai/ide/builder?_lang=en) | 项目脚手架 | ❌ No | **Critical** |
| [Chat Mode](https://docs.trae.ai/ide/chat?_lang=en) | 交互式编码助手 | ❌ No | Medium |
| [Multi-model Support](https://docs.trae.ai/ide/models?_lang=en) | Claude/DeepSeek/Doubao | ❌ No | **Critical** |
| [Remote Development](https://juejin.cn/post/7480953775899099146) | SSH/容器支持 | ❌ No | Medium |
| [Figma to Code](https://www.toutiao.com/article/7489004741838504500) | 设计转代码 | ❌ No | **Critical** |
| [Multi-modal](https://www.toutiao.com/article/7489004741838504500) | 图像理解 | ❌ No | Medium |
| [Smart Completion](https://docs.trae.ai/ide) | 上下文感知建议 | ❌ No | Medium |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Builder Mode](https://docs.trae.ai/ide/builder) | ✅ 影响L3 - 项目脚手架 | ❌ 非默认 | - | - | **必须添加** - Trae核心价值 |
| [Multi-model Support](https://docs.trae.ai/ide/models) | ✅ 影响L3 - 多模型选择 | ❌ 非默认 | - | - | **必须添加** - 主要竞争优势 |
| [Figma to Code](https://docs.trae.ai/docs/multimodal-input) | ✅ 影响L3 - 设计转代码 | ❌ 非默认 | - | - | **必须添加** - 差异化能力 |
| [Remote Development](https://juejin.cn/post/7480953775899099146) | ⚠️ 远程开发 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 企业场景 |
| [Multi-modal](https://docs.trae.ai/docs/multimodal-input) | ⚠️ 图像理解 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 前端关注 |
| [Chat Mode](https://docs.trae.ai/ide/chat) | ❌ 基础功能 | ✅ 通用能力 | - | - | **不用讲解** - 已由agent覆盖 |
| [Smart Completion](https://docs.trae.ai/ide) | ❌ L1/L2能力 | ✅ IDE默认 | - | - | **不用讲解** - 代码补全基础 |

---

### Tool 6: OpenCode

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [AGENTS.md](https://opencode.ai/docs/rules/) | 项目上下文配置 | ✅ Yes | High |
| [Rules](https://opencode.ai/docs/rules/#custom-instructions) | 自定义指令 | ✅ Yes | High |
| [Skills](https://opencode.ai/docs/skills/) | Agent能力 | ✅ Yes | High |
| [MCP](https://opencode.ai/docs/mcp/) | Model Context Protocol | ✅ Yes | High |
| [Agents](https://opencode.ai/docs/agents/) | 多种Agent类型 | ✅ Yes | High |
| [Sessions](https://opencode.ai/docs/tui/#sessions) | 多会话并行Agent | ✅ Yes (Unique) | **Critical** |
| [Multi-provider](https://opencode.ai/docs/providers/) | 75+ LLM供应商 | ❌ No | **Critical** |
| [LSP Support](https://opencode.ai/docs/lsp/) | Language Server Protocol | ❌ No | **Critical** |
| [Plan Mode](https://opencode.ai/docs) | 只读分析 | ❌ No | **Critical** |
| [Share Links](https://opencode.ai/docs/share/) | 会话分享 | ❌ No | Medium |
| [Undo/Redo](https://opencode.ai/docs) | 变更管理 | ❌ No | Medium |
| [Desktop App](https://opencode.ai/download) | 图形界面 | ❌ No | Low |
| [IDE Extensions](https://opencode.ai/docs/ide/) | VS Code/Vim等 | ❌ No | Medium |
| [Web Interface](https://opencode.ai/docs/web/) | 浏览器访问 | ❌ No | Low |
| [GitHub Integration](https://opencode.ai/docs/github/) | 原生GitHub支持 | ❌ No | Medium |
| [Client/Server](https://opencode.ai/docs/server/) | 远程执行 | ❌ No | Medium |
| [Zen Models](https://opencode.ai/docs/zen/) | 精选模型选择 | ❌ No | Low |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Multi-provider](https://opencode.ai/docs/providers/) | ✅ 影响L3 - 供应商独立性 | ❌ 非默认 | - | - | **必须添加** - 核心独特卖点 |
| [LSP Support](https://opencode.ai/docs/lsp/) | ✅ 影响L3 - 代码智能 | ❌ 非默认 | - | - | **必须添加** - 精准重构技术优势 |
| [Plan Mode](https://github.com/anomalyco/opencode/blob/dev/packages/web/src/content/docs/index.mdx) | ✅ 影响L3 - 安全机制 | ❌ 非默认 | - | - | **必须添加** - 最佳实践 |
| [Sessions](https://opencode.ai/docs/tui/#sessions) | ✅ 已覆盖 | - | - | - | **已覆盖** - 独特功能需深入讲解 |
| [Share Links](https://opencode.ai/docs/share/) | ⚠️ 协作功能 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 团队工作流 |
| [Undo/Redo](https://opencode.ai/docs) | ❌ 基础功能 | ✅ 通用能力 | ❌ 无发展空间 | ✅ | **不用讲解** - 基础编辑功能 |
| [Desktop App](https://opencode.ai/download) | ❌ 替代界面 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 部署选项 |
| [IDE Extensions](https://opencode.ai/docs/ide/) | ❌ 生态功能 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 隐含覆盖 |
| [Web Interface](https://opencode.ai/docs/web/) | ❌ 替代访问 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 部署选项 |
| [GitHub Integration](https://opencode.ai/docs/github/) | ⚠️ 平台集成 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 采用友好 |
| [Client/Server](https://opencode.ai/docs/server/) | ❌ 架构细节 | ❌ 非用户面 | ❌ 无发展空间 | ✅ | **不用讲解** - 实现细节 |
| [Zen Models](https://opencode.ai/docs/zen/) | ❌ 精选模型 | ❌ 非核心 | ❌ 无发展空间 | ✅ | **不用讲解** - 模型管理 |

---

### Tool 7: Codex (OpenAI)

#### Full Feature Matrix

| Feature | 描述 | PPT覆盖 | L3优先级 |
|:--------|:------------|:------------|:----------------|
| [AGENTS.md](https://developers.openai.com/codex/guides/agents-md/) | 项目上下文配置 | ✅ Yes | High |
| [Skills](https://developers.openai.com/codex/skills/) | 可复用能力 | ✅ Yes | High |
| [MCP](https://developers.openai.com/codex/mcp/) | Model Context Protocol | ✅ Yes | High |
| [Worktrees](https://developers.openai.com/codex/app/worktrees) | Git worktree隔离 | ✅ Yes (Unique) | High |
| [Multi-agent Parallel](https://openai.com/index/introducing-codex) | 并发Agent执行 | ❌ No | **Critical** |
| [Cloud Sandbox](https://openai.com/index/introducing-codex) | 隔离执行环境 | ❌ No | **Critical** |
| [CLI/Web/App](https://openai.com/index/introducing-codex) | 多平台访问 | ❌ No | Medium |
| [Custom Prompts](https://developers.openai.com/codex/custom-prompts/) | 用户自定义指令 | ❌ No | High |
| [codex-1 Model](https://openai.com/index/introducing-codex) | 专业编程模型 | ❌ No | **Critical** |
| [Async Tasks](https://openai.com/index/introducing-codex) | 后台任务执行 | ❌ No | **Critical** |
| [Task Tracking](https://openai.com/index/introducing-codex) | 进度监控 | ❌ No | Medium |
| [Internet Access](https://openai.com/index/introducing-codex) | 实时网络搜索 | ❌ No | **Critical** |

#### 缺失特性分析 (四原则检验)

| Feature | 原则1: 影响L3? | 原则2: 默认能力? | 原则3: 延伸阅读? | 原则4: 不用讲? | PPT建议 |
|:--------|:---------------|:----------------|:-----------------|:--------------|:--------|
| [Multi-agent Parallel](https://openai.com/index/introducing-codex) | ✅ 影响L3 - 并发任务执行 | ❌ 非默认 | - | - | **必须添加** - Codex核心差异化 |
| [Cloud Sandbox](https://openai.com/codex/) | ✅ 影响L3 - 安全隔离执行 | ❌ 非默认 | - | - | **必须添加** - 企业采用关键 |
| [codex-1 Model](https://openai.com/index/introducing-codex) | ✅ 影响L3 - 专业编程模型 | ❌ 非默认 | - | - | **必须添加** - 技术基础 |
| [Async Tasks](https://openai.com/codex/) | ✅ 影响L3 - 后台执行 | ❌ 非默认 | - | - | **必须添加** - L3关键能力 |
| [Internet Access](https://openai.com/codex/) | ✅ 影响L3 - 实时信息 | ❌ 非默认 | - | - | **必须添加** - 现代开发必备 |
| [Custom Prompts](https://developers.openai.com/codex/custom-prompts/) | ⚠️ 配置选项 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 标准功能 |
| [CLI/Web/App](https://openai.com/codex/) | ❌ 部署选项 | ❌ 非功能特性 | ❌ 无发展空间 | ✅ | **不用讲解** - 概述已提及 |
| [Task Tracking](https://openai.com/codex/) | ⚠️ UI功能 | ❌ 非默认 | ⚠️ 可放入 | - | **延伸阅读** - 用户体验 |

---

## 三、PPT 改进建议

### 优先级 1: L3 必备特性

以下特性**必须添加**才能达到 L3  proficiency：

#### 1. Plan Mode / Safe Exploration（所有工具）
- **原因：** 防止生产代码库中的代价高昂的错误
- **内容：** 变更前的只读分析
- **工具支持：** Claude Code、OpenCode 原生支持；其他工具通过变通方法
- **教学建议：** 风险评估矩阵，plan vs execute 使用时机

#### 2. Session Management（Claude Code、OpenCode 重点）
- **原因：** 多任务是 L3 核心；开发者同时处理多个功能
- **内容：** 命名会话、恢复、分支、worktrees
- **教学建议：** 会话生命周期、并行开发模式

#### 3. Worktrees & Isolated Development（Claude Code、Codex 重点）
- **原因：** 避免上下文污染的并行开发
- **内容：** Git worktrees、分支隔离、清理策略
- **教学建议：** 热修复+功能工作流、A/B测试实现

#### 4. Headless Mode & Automation（所有 CLI 工具）
- **原因：** CI/CD 集成、批量操作、自动化工作流
- **内容：** 非交互执行、脚本化、管道
- **教学建议：** GitHub Actions 集成、pre-commit 钩子

#### 5. Multi-file Editing / Composer（Cursor 重点）
- **原因：** 项目级变更需要协调的多文件编辑
- **内容：** Cursor Composer、agent 模式、@-mentions
- **教学建议：** 复杂重构、架构变更

#### 6. Git Integration & PR Workflows（Claude Code、Copilot 重点）
- **原因：** 端到端开发工作流
- **内容：** 自动化提交、PR 创建、分支管理
- **教学建议：** 完整开发生命周期

### 优先级 2: 建议添加

#### 7. Testing Workflows
- 测试生成、覆盖率分析、边界情况识别

#### 8. Codebase Indexing / Context
- 向量搜索、语义理解、@-symbols

#### 9. Multimodal Capabilities
- 图像分析、设计转代码、截图调试

### 优先级 3: 可选特性

#### 10. Extended Thinking / Reasoning
- 复杂决策的深度分析模式

#### 11. 工具特定独特功能
- Cursor: Tab 补全（聚焦 L3+）
- Gemini CLI: 100万 token 上下文
- OpenCode: 多供应商支持
- Trae: Figma 转代码

---

## 四、建议新增幻灯片结构

```
# 3.1 IDE & CLI 概述（现有 - 保留）
# 3.2 AGENTS.md / 项目上下文（现有 - 保留）
# 3.3 Rules 精细化控制（现有 - 保留）
# 3.4 Commands & Skills（现有 - 保留）
# 3.5 MCP 集成（现有 - 保留）
# 3.6 Hooks 生命周期（现有 - 保留）
# 3.7 Sub-agents（现有 - 保留）
# 3.8 杀手特性（现有 - 保留）

# 需要新增的幻灯片：
# 3.9 Plan Mode 安全探索
#   - Claude Code: --permission-mode plan
#   - OpenCode: Tab 切换
#   - 风险评估矩阵

# 3.10 Session Management & Worktrees
#   - 命名会话、恢复
#   - Git worktrees 隔离
#   - 并行开发工作流

# 3.11 Multi-file Editing (Composer)
#   - Cursor Composer 深入
#   - @-symbols 和上下文
#   - Agent 模式

# 3.12 Git Integration & PR Workflows
#   - 自动化提交
#   - PR 创建和审查
#   - Claude Code: /commit-push-pr

# 3.13 Headless Mode & Automation
#   - CI/CD 集成
#   - 脚本化和管道
#   - GitHub Actions 示例

# 3.14 Testing & Quality Assurance
#   - 测试生成
#   - 覆盖率分析
#   - 边界情况检测

# 3.15 工具特定深入（可选）
#   - Gemini CLI: 100万上下文 + 多模态
#   - OpenCode: 多供应商架构
#   - Trae: Figma 转代码
```

---

## 五、教学方法建议

### 每个新特性的教学步骤：

1. **为什么 L3 需要这个**（2-3句话）
2. **工具对比**（哪些工具支持，如何支持）
3. **实际示例**（真实场景）
4. **最佳实践**（何时使用，何时不用）
5. **演示/练习**（动手实践）

### 示例格式：

```markdown
## Plan Mode: 安全优先开发

### 为什么 L3 需要这个
生产代码库需要谨慎行事。Plan Mode 允许你在执行变更前探索和规划，防止代价高昂的错误。

### 工具支持
| 工具 | 命令 | 备注 |
|:-----|:--------|:------|
| Claude Code | `claude --permission-mode plan` | Shift+Tab 切换 |
| OpenCode | Press Tab | Build ↔ Plan 切换 |
| 其他 | N/A | 使用手动审查 |

### 实际示例
```bash
# 场景：重构认证系统
claude --permission-mode plan
> "analyze the auth module for OAuth2 migration"
# 审核计划，然后：
Shift+Tab  # 切换到正常模式
> "implement the approved plan"
```

### 最佳实践
- 适用于：架构变更、数据库迁移、不熟悉的代码库
- 不适用于：快速修复、单文件变更
```

---

## 六、结论

当前 `03.usage.md` 提供了**坚实的基础**（L2+），但需要**重大增强**才能达到真正的 L3 proficiency。缺失的特性代表了**生产级能力**，区分了业余 AI 编程和专业 AI 辅助开发。

### 关键差距：
1. **安全机制**（Plan Mode）- 未覆盖
2. **多任务**（Sessions、Worktrees）- 未覆盖
3. **自动化**（Headless、CI/CD）- 未覆盖
4. **规模化**（多文件编辑、Git 工作流）- 未覆盖
5. **质量**（测试工作流）- 未覆盖

### 没有这些能力的后果：
- 尽管使用 L3 能力的工具，开发者仍停留在 L2（任务级）
- 生产代码库没有安全机制
- 无法管理多个并发任务
- 无法将 AI 集成到 CI/CD 管道
- 缺少端到端开发工作流

### 建议行动：
**至少添加 5-6 个新幻灯片**，涵盖 Plan Mode、Session Management、Worktrees、Headless Mode、Multi-file Editing 和 Git Integration。这些对于 L3 proficiency 是**不可或缺的**。

---

## 验证结果总结

### 链接验证
- ✅ 大部分文档链接有效
- ✅ Context7 确认了关键特性的官方文档存在

### 特性准确性验证
- ✅ 所有工具的特性描述与官方文档基本一致
- ✅ Context7 查询结果验证了以下核心特性存在：
  - Cursor: Agent Mode, Composer, Rules, MCP
  - Claude Code: Worktrees, Plan Mode, Session Management, Headless Mode, Git Integration
  - Gemini CLI: 1M Token, Multimodal, Web Search, Headless Mode
  - GitHub Copilot: Coding Agent, Code Review, CLI, Repository Indexing
  - OpenCode: Plan Mode, Agents, Sessions, MCP, Multi-provider, LSP
  - Trae: SOLO Mode, Builder Mode
  - Codex: Sandbox, Worktree, API

### 四原则检验结果
所有 "Must Add" 建议均通过四原则检验：
- ✅ 影响 L3 培训目标
- ✅ 非默认编辑器能力
- ✅ 适合放入主PPT讲解

所有 "Skip" 建议均符合：
- ❌ 不影响 L3 目标 或 ✅ 已是默认能力 或 ❌ 无发展空间

---

*文档基于以下内容生成：*
- *PPT 第 15 页能力矩阵*
- *7 个工具的官方文档（通过 Context7 验证）*
- *L3  proficiency 要求*
- *行业最佳实践*
- *四原则验证框架*

*最后更新：2026-02-24*
