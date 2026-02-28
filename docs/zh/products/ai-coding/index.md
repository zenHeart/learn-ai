# AI 编程工具

## 概览

[AI 编程层级](https://paradite.github.io/ai-coding/) - 查看 [AI 编程 L1-L5](https://prompt.16x.engineer/blog/ai-coding-l1-l5) 详细分类

## AI 编程的 5 个层级

| 层级 | 能力 | 热门产品示例 |
|-------|------------|-------------------------|
| L1   | 代码级补全   | GitHub Copilot, Tabby |
| L2   | 任务级代码生成 | Ticket to Code, IDE 对话: ChatGPT, Claude, aider, cline, 16x Prompt, Cursor, Continue, PearAI, Windsurf |
| L3   | 项目级生成   | Ticket to PR, Prompt to UI: Codegen, Sweep, Pythagora, Plandex, v0 |
| L4   | PRD 到生产环境   | AI 软件工程师: Marblism, bolt.new, Trickle, Lovable, Devin, Genie, Engine, devlo, Gru |
| L5   | AI 开发团队  | AutoDev, MetaGPT, MGX |

## 精选工具

- [GitHub Copilot](./copilot.md) - 行业标准的 AI 代码补全
- [Cursor](./cursor.md) - AI 优先的代码编辑器，具备聊天和生成功能
- [Claude CLI](./claude-cli.md) - 命令行 AI 编程助手
- [Gemini CLI](./gemini-cli.md) - Google 的 AI 编程助手
- [其他工具](./othertools.md) - 探索更多 AI 编程工具

## 快速开始

**AI 编程新手？** 从我们的 [学习路径：使用 AI 工具](/zh/paths/productivity) 开始 —— 一个为期 2 周的指南，助你掌握 AI 编程助手。

## 选择你的 AI 编程工具

### 适合初学者
**推荐**: [Cursor](./cursor.md)
- 最容易上手
- 一站式解决方案 (自动补全 + 聊天)
- 优秀的多文件上下文支持

### 适合 VS Code 高级用户
**推荐**: [GitHub Copilot](./copilot.md)
- 无缝集成 VS Code
- 快速自动补全
- 行业标准

### 适合终端爱好者
**推荐**: [Claude CLI](./claude-cli.md)
- 命令行优先
- 出色的推理能力
- 非常适合重构

### 适合 Google 生态用户
**推荐**: [Gemini CLI](./gemini-cli.md)
- 超大上下文窗口
- 多模态能力
- Google 集成

## 工具能力矩阵

### Cursor

| Feature | 描述 |
|:--------|:------------|
| [AGENTS.md](https://cursor.com/docs/context/rules) | AI对齐的项目上下文标准 |
| [Rules (.cursor/rules)](https://cursor.com/docs/context/rules) | 基于glob模式的精细化控制 |
| [Commands](https://cursor.com/docs/context/commands) | 工作流自定义斜杠命令 |
| [Skills](https://cursor.com/docs/context/skills) | 可复用能力和工具函数 |
| [MCP](https://cursor.com/docs/context/mcp) | Model Context Protocol 集成 |
| [Hooks](https://cursor.com/docs/agent/hooks) | 文件操作生命周期拦截器 |
| [Sub-agents](https://cursor.com/docs/context/subagents) | 特定任务的专用AI代理 |
| [BugBot](https://cursor.com/docs/bugbot) | 带运行时上下文的自动调试器 |
| [Modes](https://cursor.com/docs/agent/modes) | Agent/Ask/Plan/Debug 模式切换 |
| [Tab](https://cursor.com/docs/tab/overview) | 智能代码补全 |
| [Chat](https://cursor.com/docs/context/mentions) | AI对话界面 |
| [Codebase Indexing](https://cursor.com/docs/context/semantic-search) | 项目级向量搜索 |
| [@ Symbols](https://cursor.com/docs/context/mentions) | 文件/函数引用 |
| [Notepad](https://cursor.com/docs/context/mentions) | 持久化草稿板上下文 |
| [Docs Integration](https://cursor.com/docs/context/mentions) | 自定义文档索引 |
| [Privacy Mode](https://cursor.com/docs/enterprise/privacy-and-data-governance) | 本地处理选项 |
| [Model Selection](https://cursor.com/docs/models) | Claude/GPT等模型选择 |
| [Integrations](https://cursor.com/docs/integrations/github) | 第三方集成(GitHub/GitLab/Linear/Slack) |
| [Inline Edit](https://cursor.com/docs/inline-edit/overview) | 内联代码编辑 |
| [Reuse Existing Code](https://cursor.com/docs/reuse-existing-code) | 代码复用建议 |
| [Long-running Agents](https://cursor.com/blog/long-running-agents) | 长时运行代理 |
| [Self-driving Codebases](https://cursor.com/blog/self-driving-codebases) | 自主驾驶代码库 |

### Claude Code

| Feature | 描述 |
|:--------|:------------|
| [CLAUDE.md](https://code.claude.com/docs/en/claude-md) | 项目上下文文件（类似AGENTS.md） |
| [Rules (.claude/rules)](https://code.claude.com/docs/en/memory#modular-rules) | 模块化规则系统 |
| [Skills](https://code.claude.com/docs/en/skills) | 自定义斜杠命令 |
| [Hooks](https://code.claude.com/docs/en/hooks) | 前后置操作拦截器 |
| [MCP](https://code.claude.com/docs/en/mcp) | Model Context Protocol |
| [Sub-agents](https://code.claude.com/docs/en/sub-agents) | 自定义代理创建 |
| [Agent Teams](https://code.claude.com/docs/en/agent-teams) | 多代理协调 |
| [Plan Mode](https://code.claude.com/docs/en/common-workflows#plan-mode) | 修改前的只读分析 |
| [Worktrees](https://code.claude.com/docs/en/common-workflows#worktrees) | Git worktree隔离 |
| [Session Management](https://code.claude.com/docs/en/common-workflows#resume) | 恢复、重命名、分支会话 |
| [Headless Mode](https://code.claude.com/docs/en/cli-reference#headless) | CI/CD自动化 |
| [Extended Thinking](https://code.claude.com/docs/en/settings#thinking) | 深度推理模式 |
| [Git Integration](https://code.claude.com/docs/en/common-workflows#pull-requests) | PR创建、提交自动化 |
| [Image Analysis](https://code.claude.com/docs/en/common-workflows#images) | 多模态支持 |
| [Plugins](https://code.claude.com/docs/en/plugins) | IDE/编辑器扩展 |
| [Multi-surface](https://code.claude.com/docs/en/overview) | 终端/IDE/桌面/网页 |
| [Checkpointing](https://code.claude.com/docs/en/checkpointing) | 状态保存/恢复 |
| [Memory](https://code.claude.com/docs/en/memory) | 长期记忆系统 |
| [Sandboxing](https://code.claude.com/docs/en/sandboxing) | 安全沙箱执行 |
| [IDE Integrations](https://code.claude.com/docs/en/vs-code) | VS Code/JetBrains桌面集成 |

### Gemini CLI

| Feature | 描述 |
|:--------|:------------|
| [GEMINI.md](https://geminicli.com/docs/cli/gemini-md) | 项目上下文配置 |
| [Skills](https://geminicli.com/docs/cli/skills) | Agent技能系统 |
| [MCP](https://geminicli.com/docs/tools/mcp-server) | Model Context Protocol |
| [Hooks](https://geminicli.com/docs/hooks) | 生命周期钩子 |
| [Sub-agents](https://geminicli.com/docs/core/subagents) | Agent委托 |
| [YOLO Mode](https://geminicli.com/docs/reference/policy-engine) | 非交互式执行 |
| [100万 Token Context](https://gemini-cli.xyz/docs/zh/core) | 超大上下文窗口 |
| [Multimodal](https://gemini-cli.xyz/docs/zh/tools) | 图像/视频/音频/PDF支持 |
| [Built-in Search](https://gemini-cli.xyz/docs/zh/tools/web-search) | Google搜索集成 |
| [Extensions](https://blog.google/technology/developers/gemini-cli-extensions) | 插件系统 |
| [Checkpointing](https://gemini-cli.xyz/docs/zh/cli/checkpointing) | 状态保存/恢复 |
| [Sandbox](https://gemini-cli.xyz/docs/zh/cli/sandbox) | 隔离执行环境 |
| [Headless Mode](https://gemini-cli.xyz/docs/zh/cli/headless) | 脚本/自动化 |
| [Trusted Folders](https://gemini-cli.xyz/docs/zh/cli/trusted-folders) | 安全边界 |
| [Token Caching](https://gemini-cli.xyz/docs/zh/cli/token-caching) | 成本优化 |
| [IDE Integration](https://gemini-cli.xyz/docs/zh/ide-integration) | VS Code伴侣 |

### GitHub Copilot

| Feature | 描述 |
|:--------|:------------|
| [Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) | 个人/团队编码规范 |
| [Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | 可复用能力 |
| [MCP](https://docs.github.com/en/copilot/concepts/context/mcp) | Model Context Protocol |
| [Hooks](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks) | 生命周期自动化 |
| [Custom Agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) | 专用AI代理 |
| [Participant](https://docs.github.com/en/copilot/concepts/chat) | @-mentions上下文引用 |
| [Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) | 自主PR创建 |
| [Code Review](https://docs.github.com/en/copilot/concepts/agents/code-review) | 自动化PR审查 |
| [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | 命令行界面 |
| [Copilot Chat](https://docs.github.com/en/copilot/how-tos/chat-with-copilot) | IDE聊天界面 |
| [Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) | 上下文工作区 |
| [Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | 跨会话学习 |
| [Spark](https://docs.github.com/en/copilot/concepts/spark) | 应用部署平台 |
| [Auto Model Selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) | 动态模型切换 |
| [Repository Indexing](https://docs.github.com/en/copilot/concepts/context/repository-indexing) | 代码库理解 |
| [Content Exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | 隐私/安全控制 |
| [Copilot SDK](https://github.blog/news-insights/company-news/build-an-agent-into-any-app-with-the-github-copilot-sdk/) | 开发工具包 |

### Trae

| Feature | 描述 |
|:--------|:------------|
| [Rules](https://docs.trae.ai/ide/rules?_lang=en) | 项目特定规范 |
| [Skills](https://docs.trae.ai/ide/skills) | 自定义能力 |
| [MCP](https://docs.trae.ai/ide/ide-settings-overview?_lang=en) | Model Context Protocol |
| [Agent](https://docs.trae.ai/ide/agent?_lang=en) | AI编码助手 |
| [SOLO Mode](https://www.trae.ai/solo) | 自主任务完成 |
| [Builder Mode](https://docs.trae.ai/ide/builder?_lang=en) | 项目脚手架 |
| [Chat Mode](https://docs.trae.ai/ide/chat?_lang=en) | 交互式编码助手 |
| [Multi-model Support](https://docs.trae.ai/ide/models?_lang=en) | Claude/DeepSeek/Doubao |
| [Remote Development](https://juejin.cn/post/7480953775899099146) | SSH/容器支持 |
| [Figma to Code](https://www.toutiao.com/article/7489004741838504500) | 设计转代码 |
| [Multi-modal](https://www.toutiao.com/article/7489004741838504500) | 图像理解 |
| [Smart Completion](https://docs.trae.ai/ide) | 上下文感知建议 |
| [Cue-Pro](https://www.trae.ai/blog/product_update_1229) | 编辑预测AI |
| [Vercel Integration](https://www.trae.ai/blog/vercel_in_trae) | Vercel部署集成 |
| [Supabase Integration](https://www.trae.ai/blog/supabase_112) | 后端开发集成 |

### OpenCode

| Feature | 描述 |
|:--------|:------------|
| [AGENTS.md](https://opencode.ai/docs/rules/) | 项目上下文配置 |
| [Rules](https://opencode.ai/docs/rules/#custom-instructions) | 自定义指令 |
| [Skills](https://opencode.ai/docs/skills/) | Agent能力 |
| [MCP](https://opencode.ai/docs/mcp/) | Model Context Protocol |
| [Agents](https://opencode.ai/docs/agents/) | 多种Agent类型 |
| [Sessions](https://opencode.ai/docs/tui/#sessions) | 多会话并行Agent |
| [Multi-provider](https://opencode.ai/docs/providers/) | 75+ LLM供应商 |
| [LSP Support](https://opencode.ai/docs/lsp/) | Language Server Protocol |
| [Plan Mode](https://opencode.ai/docs) | 只读分析 |
| [Share Links](https://opencode.ai/docs/share/) | 会话分享 |
| [Undo/Redo](https://opencode.ai/docs) | 变更管理 |
| [Desktop App](https://opencode.ai/download) | 图形界面 |
| [IDE Extensions](https://opencode.ai/docs/ide/) | VS Code/Vim等 |
| [Web Interface](https://opencode.ai/docs/web/) | 浏览器访问 |
| [GitHub Integration](https://opencode.ai/docs/github/) | 原生GitHub支持 |
| [Client/Server](https://opencode.ai/docs/server/) | 远程执行 |
| [Zen Models](https://opencode.ai/docs/zen/) | 精选模型选择 |
| [Ecosystem](https://opencode.ai/docs/ecosystem/) | 插件生态系统 |
| [MCPServers](https://opencode.ai/docs/mcp-servers/) | MCP服务器配置 |

### Codex

| Feature | 描述 |
|:--------|:------------|
| [AGENTS.md](https://developers.openai.com/codex/guides/agents-md/) | 项目上下文配置 |
| [Skills](https://developers.openai.com/codex/skills/) | 可复用能力 |
| [MCP](https://developers.openai.com/codex/mcp/) | Model Context Protocol |
| [Worktrees](https://developers.openai.com/codex/app/worktrees) | Git worktree隔离 |
| [Multi-agent Parallel](https://openai.com/index/introducing-codex) | 并发Agent执行 |
| [Cloud Sandbox](https://openai.com/index/introducing-codex) | 隔离执行环境 |
| [CLI/Web/App](https://openai.com/index/introducing-codex) | 多平台访问 |
| [Custom Prompts](https://developers.openai.com/codex/custom-prompts/) | 用户自定义指令 |
| [codex-1 Model](https://openai.com/index/introducing-codex) | 专业编程模型 |
| [Async Tasks](https://openai.com/index/introducing-codex) | 后台任务执行 |
| [Task Tracking](https://openai.com/index/introducing-codex) | 进度监控 |
| [Internet Access](https://openai.com/index/introducing-codex) | 实时网络搜索 |

## 下一步

1. 从上面的列表中**选择一个工具**
2. **跟随我们的指南**: [路径 1: 使用 AI 工具](/zh/paths/productivity)
3. **开始编程**，在 AI 辅助下效率提升 2-3 倍

**有问题？** 加入 [GitHub](https://github.com/zenheart/learn-ai/discussions) 上的讨论