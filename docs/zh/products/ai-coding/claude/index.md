# Claude Code 生态学习导航

> Claude Code 是 Anthropic 推出的 AI 编程与智能代理产品生态，覆盖终端、IDE、桌面端、网页端和浏览器。本文是你进入 Claude Code 生态的导航地图，帮助你以最短路径掌握所有核心能力。

## 产品全景图

Claude Code 生态包含 5 个核心产品，每个面向不同的使用场景：

```
Claude Code 生态
├── Claude Code（编程代理）— 写代码、调试、提 PR
│   ├── 终端 CLI        — 命令行交互，最灵活
│   ├── VS Code 扩展     — 编辑器内嵌，内联 diff
│   ├── JetBrains 扩展    — IntelliJ/PyCharm/WebStorm 集成
│   ├── 桌面 App         — 可视化 diff，并行会话，PR 监控
│   └── Web 版           — 浏览器运行，无需安装
├── Claude.ai 平台（对话智能）— 分析、写作、调研
│   ├── Projects        — 持久化上下文 + 知识库
│   ├── Research        — 多轮联网深度调研
│   ├── Artifacts       — 交互式代码/文档/图表输出
│   └── Extended Thinking — 深度推理
├── Claude Design（设计原型）— 代码库驱动的品牌原型
│   └── 对话生成 → 微调迭代 → 交接给 Claude Code
├── Cowork（桌面代理）— 处理本地文件、自动化重复工作
│   └── 读写文件、生成文档、定期任务
└── Connectors（连接器）— 接入外部服务
    └── Gmail、Notion、GitHub、Slack 等 50+ 服务
```

### 快速决策：我该用哪个？

```
我要做什么？
├── 写代码 / 调试 / 重构 / 提 PR
│   └── → Claude Code
│       ├── 在终端？→ CLI（claude 命令）
│       ├── 在 IDE？→ VS Code / JetBrains 扩展
│       ├── 想要可视化 diff？→ 桌面 App
│       ├── 没装环境？→ 浏览器用 claude.ai/code
│       └── 不在电脑旁？→ 远程控制 / Dispatch
├── 写作 / 分析 / 调研 / 学习
│   └── → claude.ai（网页或手机）
│       ├── 需要持久上下文？→ 创建 Project
│       ├── 需要深度推理？→ 启用 Extended Thinking
│       ├── 需要联网查资料？→ 启用 Research
│       └── 需要生成专业文档？→ 文件创建（Excel/Word/PPT）
├── 设计原型 / 落地页 / 仪表板
│   └── → Claude Design
│       ├── 有品牌规范？→ 先配置 Design System
│       ├── 想复刻现有页面？→ 用 Web Capture
│       └── 设计完成后 → Handoff 给 Claude Code 实现
├── 接入外部服务（Gmail / Notion / GitHub / Slack）
│   └── → Connectors 连接器
│       ├── 一次性查询？→ claude.ai 开启连接器
│       ├── 持续使用？→ 绑定到 Project
│       └── 定期自动化？→ 结合云端定期任务
└── 处理本地文件 / 自动化重复工作
    └── → Claude Desktop / Cowork
        ├── 一次性读写文件 → Cowork 标签页
        ├── 定期任务（需本地文件）→ 桌面定期任务
        ├── 定期任务（不需本地文件）→ 云端定期任务
        └── 操控应用/浏览器 → Computer Use
```

## 核心概念速览

在深入各产品之前，先了解几个贯穿整个生态的核心概念。详见 [术语表 Glossary](./claude-code-glossary)。

| 概念 | 一句话解释 | 出现位置 |
|------|-----------|---------|
| **MCP**（Model Context Protocol） | 连接外部工具的开放协议，Connectors 和插件都基于它 | 全局 |
| **Skills**（技能） | 可复用的专项工作流，Claude 自动识别场景并加载 | Claude Code / Claude.ai / Cowork |
| **Hooks**（钩子） | 工具调用前后自动触发的脚本 | Claude Code |
| **Plugins**（插件） | Skills + Agents + Hooks + MCP 打包的扩展包 | Claude Code / Cowork |
| **Sub-agents**（子代理） | 独立人格和权限的 AI 助手，可并行处理任务 | Claude Code |

## 学习路径

### 第一阶段：了解 Claude.ai 平台

从每天都会用到的 Web 界面开始，建立生产力基线。

**目标**：会用 Projects 管理上下文，会用 Research 深度调研，理解 Artifacts 输出。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | Claude.ai 平台功能全景 | [Claude.ai 平台指南](./claude-ai) |
| 2 | 用 Projects 建立专属工作区 | [→ Projects 章节](./claude-ai#projects-专属工作区) |
| 3 | 启用 Extended Thinking 解决复杂问题 | [→ Extended Thinking 章节](./claude-ai#extended-thinking-深度推理) |
| 4 | 用 Research 做多轮联网调研 | [→ Research 章节](./claude-ai#research-深度研究) |
| 5 | 理解 Artifacts 和文件创建 | [→ Artifacts 章节](./claude-ai#artifacts-独立内容输出) |

### 第二阶段：上手 Claude Code

面向前端工程师的核心武器，让 AI 真正参与你的开发流程。

**目标**：能在项目里跑 Claude Code，理解 CLAUDE.md、MCP、Hooks 的作用。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | Claude Code 是什么，有哪些界面 | [Claude Code 产品概览](./claude-code#产品概览) |
| 2 | 安装 + 第一次运行 | [→ 快速入门](./claude-code#cli-快速入门) |
| 3 | 理解快捷键和权限模式 | [→ 交互基础](./claude-code#交互基础) |
| 4 | 用 CLAUDE.md 管理项目上下文 | [→ 项目上下文管理](./claude-code#项目上下文管理) |
| 5 | 接入 MCP 连接外部工具 | [→ MCP 集成](./claude-code#mcp-集成) |
| 6 | 日常开发实战工作流 | [→ 实战工作流 cookbook](./claude-code-cookbook) |
| 7 | 配置权限、Hooks、插件（随手查） | [→ Cheatsheet 速查表](./claude-code-cheatsheet) |
| 8 | 概念记不清就查术语表 | [→ Glossary 术语表](./claude-code-glossary) |

### 第三阶段：Connectors 连接外部服务

将 Claude 接入你实际在用的工具，让它能直接读取真实数据、执行实际操作——紧接在 Claude Code 之后，是因为它复用的正是刚学过的 MCP 概念。

**目标**：会连接 Google Workspace / Notion / GitHub，能结合定期任务实现跨服务自动化。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Connectors 与 MCP 的关系 | [Connectors 连接器](./connectors) |
| 2 | 连接 Google Workspace | [→ Google Workspace](./connectors#google-workspace) |
| 3 | 连接项目管理工具 | [→ 主要连接器详解](./connectors#主要连接器详解) |
| 4 | 结合 Projects 长期使用 | [→ 与 Projects 组合](./connectors#连接器与-projects-组合使用) |
| 5 | 接入定期任务实现自动化 | [→ 连接器 + 定期任务](./connectors#连接器-定期任务) |

### 第四阶段：Claude Design 设计原型

把 AI 设计界面接入你的代码库，生成符合品牌规范的原型，直接交接给 Claude Code。

**目标**：能配置 design system、用 web capture 重建现有页面、通过 handoff bundle 无缝衔接 Claude Code。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 了解 Claude Design 定位与核心概念 | [Claude Design 使用手册](./claude-design) |
| 2 | 配置 design system（链接代码库） | [→ 快速上手](./claude-design#快速上手-前-30-分钟) |
| 3 | 掌握四种建站工作流 | [→ 建站工作流](./claude-design#建站工作流-四种端到端模式) |
| 4 | 学会 handoff bundle 交接 Claude Code | [→ Handoff 集成](./claude-design#claude-code-集成-handoff-bundle) |
| 5 | 了解导出目标和 Canva 集成 | [→ 导出选项](./claude-design#导出和-canva-选对目标) |

### 第五阶段：Cowork 自动化工作流

把 Claude 变成你的私人桌面代理，处理文件整理、定期报告等重复工作。

**目标**：会创建定期任务，会安装插件，理解 Cowork 的安全边界。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Cowork 是什么 | [Cowork 完整指南](./cowork) |
| 2 | 授权文件夹并执行第一个任务 | [→ 快速上手](./cowork#快速上手) |
| 3 | 创建定期自动化任务 | [→ 定期任务](./cowork#定期任务自动化) |
| 4 | 安装插件扩展能力 | [→ 插件系统](./cowork#插件系统) |
| 5 | 理解安全边界 | [→ 安全使用](./cowork#安全使用指南) |

### 第六阶段：Plugin 开发

为团队或社区开发可复用的 Claude Code 插件。

**目标**：理解插件结构，能开发并发布一个完整的插件包。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解插件核心概念 | [Plugin 开发手册](./plugin#核心概念) |
| 2 | 掌握目录结构和 plugin.json | [→ 目录结构](./plugin#目录结构与-plugin-json) |
| 3 | 开发五大核心组件 | [→ 五大组件详解](./plugin#_1-2-五大核心组件详解-the-big-5) |
| 4 | 本地调试与验证 | [→ 本地调试](./plugin#_1-3-本地调试与验证) |
| 5 | 发布到 npm / Marketplace | [→ 发布指南](./plugin#_2-·-发布指南-私有-npm-与-marketplace) |

## 功能速查表

### Claude.ai 平台功能

| 功能 | 用途 | 文档链接 |
|------|------|---------|
| Projects | 持久化上下文 + RAG 知识库 | [Claude.ai](./claude-ai#projects-专属工作区) |
| Extended Thinking | 复杂推理、数学、规划 | [Claude.ai](./claude-ai#extended-thinking-深度推理) |
| Research | 多轮联网深度调研 | [Claude.ai](./claude-ai#research-深度研究) |
| Artifacts | 代码、文档、图表独立输出 | [Claude.ai](./claude-ai#artifacts-独立内容输出) |
| 交互式图表 | 可操作的数据可视化 | [Claude.ai](./claude-ai#交互式图表与可视化) |
| 网络搜索 | 实时信息获取 | [Claude.ai](./claude-ai#网络搜索) |
| 语音模式 | 免提双向语音对话 | [Claude.ai](./claude-ai#语音模式) |
| 文件创建 | 直接生成 Excel/Word/PPT/PDF | [Claude.ai](./claude-ai#文件创建和代码执行) |
| Memory | 跨对话保存偏好 | [Claude.ai](./claude-ai#memory-跨对话记忆) |
| Skills | 加载专项工作流 | [Claude.ai](./claude-ai#skills-技能系统) |
| 隐私聊天 | 不用于训练的对话 | [Claude.ai](./claude-ai#隐私与安全) |

### Claude Code 核心功能

| 功能 | 用途 | 文档链接 |
|------|------|---------|
| 终端 CLI | 在项目目录直接交互 | [Claude Code](./claude-code#cli-快速入门) |
| VS Code / JetBrains | 编辑器内嵌集成 | [Claude Code](./claude-code#vs-code-扩展) |
| 桌面 App | 可视化 diff、并行会话、PR 监控 | [Claude Code](./claude-code#桌面-app) |
| Web 版 | 浏览器运行，无需安装 | [Claude Code](./claude-code#web-版) |
| CLAUDE.md / Memory | 项目级持久上下文 + 自动记忆 | [Claude Code](./claude-code#项目上下文管理) |
| MCP 集成 | 连接数据库、API、工具 | [Claude Code](./claude-code#mcp-集成) |
| Hooks | 自动化触发（lint、格式化、自定义脚本） | [Claude Code](./claude-code#hooks-钩子) |
| Skills | 加载专项工作流 | [Claude Code](./claude-code#skills-技能) |
| Sub-agents | 多代理并行处理 | [Claude Code](./claude-code#sub-agents-子代理) |
| Dynamic Workflows | 脚本化编排大规模 Agent 工作流 | [Claude Code](./claude-code#dynamic-workflows-动态工作流) |
| Cross-Session Messaging | 跨会话消息协作 | [Claude Code](./claude-code#cross-session-messaging-跨会话消息) |
| Agent Teams | 多会话团队协作 | [Claude Code](./claude-code#agent-teams-多-agent-团队-实验性) |
| Channels | 外部消息源（Telegram/Discord/iMessage） | [Claude Code](./claude-code#cross-session-messaging-跨会话消息) |
| Worktree | Git 工作树并行隔离 | [Claude Code](./claude-code#worktree-并行隔离) |
| 计划任务 | 云端/桌面定时任务 | [Claude Code](./claude-code#计划任务) |
| 远程控制 | 手机/浏览器远程操作本地会话 | [Claude Code](./claude-code#远程控制-remote-control) |
| Computer Use | 操控桌面 GUI 应用 | [Claude Code](./claude-code#桌面-app) |
| 无头模式 | CI/CD 脚本自动化 | [Claude Code](./claude-code#无头模式-headless) |
| 诊断工具 | /doctor、/context、/hooks 等内置诊断命令 | [Claude Code](./claude-code#故障排除) |
| 验证模式 | Writer→Reviewer、Tests→Iterate→Pass 等自验证模式 | [Claude Code](./claude-code#最佳实践) |
| 实战工作流 | 9 大日常场景的提示模式与最佳实践 | [实战工作流 cookbook](./claude-code-cookbook) |
| 配置速查 | Settings Scope 五层优先级、权限/Hook/插件配置 | [Cheatsheet 速查表](./claude-code-cheatsheet) |
| Plugin 系统 | 扩展命令和技能 | [Plugin](./plugin) |
| /powerup | 内置交互式功能教程 | [Claude Code](./claude-code#内置命令) |

### Claude Design 核心功能

| 功能 | 用途 | 文档链接 |
|------|------|---------|
| Design System 导入 | 从 GitHub 仓库抽取品牌规范 | [Claude Design](./claude-design#快速上手-前-30-分钟) |
| Web Capture | 抓取任意 URL 实时元素 | [Claude Design](./claude-design#建站工作流-四种端到端模式) |
| Adjustment Knobs | 动态滑块微调间距/颜色/圆角 | [Claude Design](./claude-design#概览-claude-design-究竟是什么) |
| Handoff Bundle | 设计文件 + 对话交接 Claude Code | [Claude Design](./claude-design#claude-code-集成-handoff-bundle) |
| 导出为独立 HTML | 静态托管部署 | [Claude Design](./claude-design#导出和-canva-选对目标) |
| 发送到 Canva | 完全可编辑的 Canva 设计 | [Claude Design](./claude-design#导出和-canva-选对目标) |

### Connectors 核心功能

| 功能 | 用途 | 文档链接 |
|------|------|---------|
| Google Workspace | Gmail / Calendar / Drive | [Connectors](./connectors#google-workspace) |
| Microsoft 365 | Outlook / Teams / SharePoint（只读） | [Connectors](./connectors#microsoft-365) |
| GitHub | PR / Issue / 代码搜索 | [Connectors](./connectors#github) |
| Slack | 消息搜索 / 发送 | [Connectors](./connectors#slack) |
| Notion / Linear / Asana | 任务和页面管理 | [Connectors](./connectors#linear-asana-jira) |
| 自定义 Remote MCP | 接入内网或自建工具 | [Connectors](./connectors#自定义连接器-custom-connectors-remote-mcp) |

### Cowork 核心功能

| 功能 | 用途 | 文档链接 |
|------|------|---------|
| 本地文件读写 | 直接操作电脑文件 | [Cowork](./cowork#核心能力) |
| 生成专业文档 | Excel / PPT / Word | [Cowork](./cowork#核心能力) |
| 定期任务 | 每日报告、自动整理 | [Cowork](./cowork#定期任务自动化) |
| 插件系统 | 安装/自定义技能和连接器 | [Cowork](./cowork#插件系统) |
| Computer Use | 操控浏览器和应用 | [Cowork](./cowork#计算机使用-computer-use) |
| 跨应用协作 | 从任意地方派发任务 | [Cowork](./cowork#跨应用协作) |

## 模型参考

Claude Code 和 Claude.ai 平台支持以下模型（截至 2026 年 8 月）：

| 模型 | 定位 | 适用场景 |
|------|------|---------|
| Claude Opus 5 | 最新旗舰 | 最复杂任务、深度推理、企业级代理 |
| Claude Fable 5 | 最前沿（限量） | 创意写作、复杂推理（Pro/Max/Team/Enterprise） |
| Claude Opus 4.8 | 高性能 | 编程、代理任务、复杂代码工程 |
| Claude Sonnet 4.6 | 均衡（默认） | 日常开发、写作、大多数任务 |
| Claude Haiku 4.5 | 快速轻量 | 简单问答、批量处理、低成本场景 |

> **说明**：Claude Code 支持 `--model` 参数切换模型。Claude Design 使用独立的 Opus 级视觉模型，配额独立于 Claude.ai 对话额度。

## 资源链接

- [Claude Code Cheatsheet · 高质量信息源](./claude-code-cheatsheet#高质量信息源) — 官方文档/Cookbook、核心团队账号与 Blog、GitHub 高质量仓库、Awesome List、三方 Blog 的完整核实清单，也是本教程持续更新的依据
- [Claude Code 官方文档](https://code.claude.com/docs/zh-CN/overview)
- [Claude.ai 帮助中心](https://support.claude.com/zh-CN)
- [Claude 定价方案](https://claude.com/pricing)
- [MCP 注册表](https://api.anthropic.com/mcp-registry)
- [Connectors 完整集合](https://support.claude.com/en/collections/15399129-connectors)
- [Claude Design 产品入口](https://claude.ai/design)
