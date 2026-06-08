# Claude Pro 会员学习地图

> 你是 Claude Pro 会员，这意味着你拥有 Anthropic 最强大的个人用户工具集。本页是你的学习导航，帮助你以最短路径掌握所有核心能力。

## Claude Pro 能给你什么

作为 Pro 会员（$20/月），你解锁了三个维度的能力：

| 维度 | 产品入口 | 核心价值 |
|------|---------|---------|
| **智能对话平台** | claude.ai（网页 / 手机 / 桌面） | Projects、Research、Artifacts、Extended Thinking |
| **编程代理** | Claude Code（终端 / VS Code / JetBrains） | 自主写代码、跑命令、提交 PR |
| **桌面工作代理** | Cowork（Claude Desktop 内置） | 读写本地文件、自动化任务、定期调度 |
| **连接器生态** | Connectors（claude.ai / Claude Desktop） | 接入 Gmail、Notion、GitHub 等 50+ 外部服务 |

---

## 学习路径

### 第一阶段：掌握 Claude.ai 平台（1-2 天）

从每天都用的 Web 界面开始，快速建立生产力基线。

**目标**：能用 Projects 管理上下文，会用 Research 深度调研，理解 Artifacts 输出。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Pro 核心功能全景 | [Claude.ai 平台指南](./claude-ai) |
| 2 | 用 Projects 建立专属工作区 | [→ Projects 章节](./claude-ai#projects-专属工作区) |
| 3 | 启用 Extended Thinking 解决复杂问题 | [→ Extended Thinking 章节](./claude-ai#extended-thinking-深度推理) |
| 4 | 用 Research 做多轮联网调研 | [→ Research 章节](./claude-ai#research-深度研究) |
| 5 | 理解 Artifacts 和 Skills | [→ Artifacts 章节](./claude-ai#artifacts-独立内容输出) |

---

### 第二阶段：上手 Claude Code（2-3 天）

面向前端工程师的核心武器，让 AI 真正参与你的开发流程。

**目标**：能在项目里跑 Claude Code，理解 CLAUDE.md、MCP、Hooks 的作用。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 安装 + 第一次运行 | [Claude Code CLI](./claude-code#第一部分快速入门) |
| 2 | 理解快捷键和权限模式 | [→ 交互基础](./claude-code#第二部分交互基础) |
| 3 | 用 CLAUDE.md 管理项目上下文 | [→ 项目上下文管理](./claude-code#第四部分项目上下文管理) |
| 4 | 接入 MCP 连接外部工具 | [→ MCP 集成](./claude-code#第六部分mcp-集成) |
| 5 | 理解 Plugin 体系 | [Plugin 开发与发布](./plugin) |

---

### 第三阶段：Connectors 连接外部服务（半天）

将 Claude 接入你实际在用的工具，让它能直接读取真实数据、执行实际操作。

**目标**：会连接 Google Workspace / Notion / GitHub，能结合定期任务实现跨服务自动化。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Connectors 是什么 | [Connectors 连接器](./connectors) |
| 2 | 连接 Google Workspace | [→ Google Workspace](./connectors#google-workspace) |
| 3 | 连接项目管理工具 | [→ 主要连接器详解](./connectors#主要连接器详解) |
| 4 | 结合 Projects 长期使用 | [→ 与 Projects 组合](./connectors#连接器与-projects-组合使用) |
| 5 | 接入定期任务实现自动化 | [→ 连接器 + 定期任务](./connectors#连接器--定期任务) |

---

### 第四阶段：Cowork 自动化工作流（1-2 天）

把 Claude 变成你的私人桌面代理，处理文件整理、定期报告等重复工作。

**目标**：会创建定期任务，会安装插件，理解 Cowork 的安全边界。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 理解 Cowork 是什么 | [Cowork 完整指南](./cowork) |
| 2 | 授权文件夹并执行第一个任务 | [→ 快速上手](./cowork#快速上手) |
| 3 | 创建定期自动化任务 | [→ 定期任务](./cowork#定期任务自动化) |
| 4 | 安装插件扩展能力 | [→ 插件系统](./cowork#插件系统) |
| 5 | 理解安全边界 | [→ 安全使用](./cowork#安全使用指南) |

---

## 功能速查表

### Claude.ai 核心功能

| 功能 | Pro 是否可用 | 核心用途 | 文档 |
|------|:---------:|---------|------|
| Projects（项目） | ✅ | 持久化上下文 + RAG 知识库 | [Claude.ai](./claude-ai#projects-专属工作区) |
| Extended Thinking | ✅ | 复杂推理、数学、规划（Claude 4.6） | [Claude.ai](./claude-ai#extended-thinking-深度推理) |
| Research | ✅ | 多轮联网深度调研 | [Claude.ai](./claude-ai#research-深度研究) |
| Artifacts | ✅ | 代码、文档、图表独立输出 | [Claude.ai](./claude-ai#artifacts-独立内容输出) |
| 交互式图表 | ✅ | 可操作的数据可视化（2026年3月） | [Claude.ai](./claude-ai#交互式图表与可视化) |
| 网络搜索 | ✅ | 实时信息获取 | [Claude.ai](./claude-ai#网络搜索) |
| 语音模式 | ✅ | 免提双向语音对话 | [Claude.ai](./claude-ai#语音模式) |
| 文件创建和代码执行 | ✅ | 直接生成 Excel/Word/PPT/PDF | [Claude.ai](./claude-ai#文件创建和代码执行) |
| Memory（记忆） | ✅ | 跨对话保存偏好 | [Claude.ai](./claude-ai#memory-跨对话记忆) |
| Skills（技能） | ✅ | 加载专项工作流 | [Claude.ai](./claude-ai#skills-技能系统) |
| 隐私聊天 | ✅ | 不用于训练的对话 | [Claude.ai](./claude-ai#隐私与安全) |
| 项目可见性（Team/Ent）| ✅ | 团队项目共享与权限管理 | [Claude.ai](./claude-ai#项目可见性和共享teamenterprise) |
| 自定义样式 | ✅ | 调整回复风格 | [Claude.ai](./claude-ai#个性化设置) |
| 模型切换 | ✅ | Opus 4.6 / Sonnet 4.6 / Haiku 4.5 | [Claude.ai](./claude-ai#个性化设置) |

### Connectors 核心功能

| 功能 | 核心用途 | 文档 |
|------|---------|------|
| Google Workspace | Gmail 读写、Calendar 管理、Drive 文件 | [connectors](./connectors#google-workspace) |
| Microsoft 365 | Outlook / Teams / SharePoint（只读） | [connectors](./connectors#microsoft-365) |
| GitHub | PR / Issue / 代码搜索 | [connectors](./connectors#github) |
| Slack | 消息搜索 / 发送 | [connectors](./connectors#slack) |
| Notion / Linear / Asana | 任务和页面管理 | [connectors](./connectors#linear--asana--jira) |
| 自定义 Remote MCP | 接入内网或自建工具 | [connectors](./connectors#自定义连接器custom-connectors--remote-mcp) |

### Claude Code 核心功能

| 功能 | 核心用途 | 文档 |
|------|---------|------|
| 终端 CLI | 在项目目录直接交互 | [claude-code](./claude-code#第一部分快速入门) |
| VS Code / JetBrains | 编辑器内嵌集成 | [claude-code](./claude-code#第十四部分vs-code-和-jetbrains-集成) |
| Web 版 | 浏览器中运行，无需安装 | [claude-code](./claude-code#第十五部分claude-code-web) |
| CLAUDE.md | 项目级持久上下文 | [claude-code](./claude-code#第四部分项目上下文管理) |
| MCP 集成 | 连接数据库、API、工具 | [claude-code](./claude-code#第六部分mcp-集成) |
| Hooks（含条件触发） | 自动化触发（lint、格式化） | [claude-code](./claude-code#第七部分钩子自动化) |
| Sub-agents | 多代理并行处理 | [claude-code](./claude-code#第八部分sub-agents-多代理系统) |
| 云端计划任务 | 电脑关机也能自动运行 | [claude-code](./claude-code#第十一部分计划任务) |
| 远程控制 / Dispatch | 手机继续本地会话 | [claude-code](./claude-code#第九部分会话管理与跨端协作) |
| Auto 权限模式 | AI 自动决策权限，无需频繁确认 | [claude-code](./claude-code#第二部分交互基础) |
| Computer Use | 操控桌面 GUI 应用 | [claude-code](./claude-code#第十三部分桌面-app) |
| 无头模式 | CI/CD 脚本自动化 | [claude-code](./claude-code#第十二部分无头模式headless) |
| Plugin 系统 | 扩展命令和技能 | [plugin](./plugin) |
| /powerup | 内置交互式功能教程 | [claude-code](./claude-code#第三部分内置命令) |

### Cowork 核心功能

| 功能 | 核心用途 | 文档 |
|------|---------|------|
| 本地文件读写 | 直接操作电脑文件 | [cowork](./cowork#核心能力) |
| 生成专业文档 | Excel / PPT / Word | [cowork](./cowork#核心能力) |
| 定期任务 | 每日报告、自动整理 | [cowork](./cowork#定期任务自动化) |
| 插件系统 | 安装/自定义技能和连接器 | [cowork](./cowork#插件系统) |
| 计算机使用 | 操控浏览器和应用 | [cowork](./cowork#计算机使用computer-use) |
| 跨应用协作 | 从任意地方派发任务 | [cowork](./cowork#跨应用协作) |

---

## Pro 专属权益总结

```
Claude Pro ($20/月) 包含：
├── claude.ai 平台（Standard 使用量，远超 Free 的 Limited）
│   ├── Projects + RAG 知识库（10x 容量扩展）
│   ├── Extended Thinking（Claude 4.6 深度推理）
│   ├── Research（多轮联网调研）
│   ├── Artifacts（可交互输出 + 交互式图表）
│   ├── Skills 系统
│   ├── Memory 跨对话记忆
│   └── 隐私聊天
├── Claude Code（所有平台共用同一引擎）
│   ├── 终端 CLI（无头模式、MCP、Hooks、Sub-agents）
│   ├── VS Code / JetBrains 扩展
│   ├── 桌面 App（可视化 Diff、并行会话、PR 监控）
│   ├── Web 版 claude.ai/code（PR Auto-fix、无需本地安装）
│   ├── Plugin 系统
│   ├── 云端计划任务（电脑关机也能跑）
│   ├── 远程控制（从手机/浏览器继续会话）
│   └── Computer Use（桌面 App + CLI）
├── Connectors（claude.ai / Claude Desktop 通用）
│   ├── Google Workspace（Gmail / Calendar / Drive）
│   ├── Microsoft 365（Outlook / Teams / SharePoint，只读）
│   ├── GitHub / Linear / Asana / Notion / Slack
│   ├── 50+ 预置连接器（无额外费用）
│   └── 自定义 Remote MCP（接入内网/自建工具）
└── Cowork（Claude Desktop Cowork 标签页）
    ├── 本地文件直接读写
    ├── 桌面定期任务（需电脑开机）
    ├── 插件市场
    └── 跨应用协作
```

---

## 快速决策：我该用哪个？

```
我要做什么？
├── 写作 / 分析 / 调研 / 学习
│   └── → claude.ai（网页或手机）
│       ├── 需要深入推理？→ 启用 Extended Thinking
│       ├── 需要联网查资料？→ 启用 Research
│       ├── 需要可视化？→ 让 Claude 生成交互式图表
│       ├── 双手不便（开车/做饭）？→ 启用语音模式
│       └── 需要生成专业文档？→ 开启文件创建（Excel/Word/PPT）
├── 写代码 / 调试 / 重构 / 提 PR
│   └── → Claude Code
│       ├── 在终端？→ CLI（claude 命令）
│       ├── 在 IDE？→ VS Code / JetBrains 扩展
│       ├── 没装环境？→ 浏览器用 claude.ai/code
│       ├── 自动修 PR？→ Web 版开启 Auto-fix
│       └── 不在电脑旁？→ 远程控制 / Dispatch（手机派发）
├── 接入外部服务（Gmail / Notion / GitHub / Slack）
│   └── → Connectors 连接器
│       ├── 一次性查询/操作？→ claude.ai 开启连接器直接问
│       ├── 持续使用？→ 绑定到 Project
│       └── 定期自动化？→ 结合云端定期任务
└── 处理本地文件 / 自动化重复工作
    └── → Claude Desktop / Chrome 扩展
        ├── 一次性任务（读写文件）→ Cowork 标签页
        ├── 重复任务（需要本地文件）→ 桌面定期任务
        ├── 重复任务（不需要本地文件）→ 云端定期任务（更可靠）
        ├── 操控应用/浏览器？→ 开启 Computer Use
        └── 浏览器自动化 / 计划任务？→ Claude in Chrome 扩展
```

---

## 资源链接

- [Claude 官方支持中心](https://support.claude.com/zh-CN)
- [Claude Code 官方文档](https://code.claude.com/docs/zh-CN/overview)
- [Claude 计划对比](https://claude.com/pricing)
- [MCP 注册表](https://api.anthropic.com/mcp-registry)
- [Connectors 完整集合](https://support.claude.com/en/collections/15399129-connectors)
