# GitHub Copilot 学习导航

> GitHub Copilot 是一套共享订阅、但入口 / 自主程度 / 副作用范围完全不同的 AI 编程产品族。本页是全景图和决策树——**先分清形态，再决定学什么**。

## 产品全景图

官方功能清单见 [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)。同步辅助类工具**和你一起工作**；agent 类工具**可以在你不盯着的时候跑**。

```
GitHub Copilot
├── IDE — VS Code / Visual Studio / JetBrains / Xcode / Eclipse
│   ├── 行内补全（灰字；VS Code / Xcode / Eclipse 还有 next-edit suggestions）
│   └── Chat：Ask / Edit / Agent 模式（Agent 模式跑在本地）
├── github.com — Web（对位 Claude 的 Web）
│   ├── Copilot Chat（https://github.com/copilot，或任意仓库 / Issue / PR）
│   ├── Cloud agent — 调研 / 计划 / 改分支 / 可选开 PR（付费计划）
│   ├── 代码审查
│   └── PR 摘要
├── Copilot CLI — 终端（对位 Claude 的 CLI）
│   ├── 交互式会话（`copilot`）
│   └── 编程式调用（`copilot -p "..."`）
├── Copilot app — 桌面（对位 Claude 的 Desktop）
│   └── 并行 agent 会话、Issues / PR、定时自动化
├── GitHub Mobile
└── GitHub Desktop — 只生成 commit message
```

**不要再新开这些。** 它们已日落或正在关闭：

| 产品 | 现状 | 替代 |
|------|------|------|
| **Copilot Workspace** | **2025-05-30** 日落 | Cloud agent |
| **GitHub App Copilot Extensions** | **2025-11-10** 日落 | MCP |
| **`gh copilot`** | 官方已标 **retired** | 独立 `copilot` CLI |
| **GitHub Spark** | **2026-08-04** 起不再接受新用户、不能新建应用；已有应用须在 **2026-08-31** 前导出 | 在 IDE、CLI 或 Copilot app 里做 |

Spark 是用自然语言搭微应用的产品。对前端读者相关度中等，密度不够单独成页——而且已经在关停。如果你已经有 Spark，在 workbench 里点 `…` → **Create repository**，在 2026-08-31 前导出。官方公告：[Spark deprecation](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/)。

### 快速决策：我该用哪个？

```
我现在要干什么？
├── 在编辑器里写 / 补全 / 重构
│   └── → IDE
│       ├── 补下一行 / 补样板          → 代码补全（Tab）
│       ├── 只想搞懂，别动我代码        → Chat Ask
│       ├── 我知道改哪几个文件          → Chat Edit
│       └── 我只给目标，过程你定        → Chat Agent（本地执行，有副作用）
├── 任务在命令行（脚本、git、构建排错，不在 IDE）
│   └── → Copilot CLI
│       ├── 多轮                           → `copilot`
│       └── 脚本里一次性调用               → `copilot -p "..."`
├── 人已经在 github.com 上（这个仓库 / 这个 Issue / 这个 PR）
│   └── → github.com
│       ├── 问这个仓库的事                 → Copilot Chat
│       ├── 边界清楚、耗时、不想守着       → Cloud agent
│       └── 审这个 PR                      → 代码审查
└── 要并行指挥多个 agent，不想待在 IDE 里
    └── → Copilot app（桌面）
```

三个最常见的混淆，先记住：

| 容易混的 | 区别 |
|---------|------|
| Chat 的 **Agent 模式** vs **Cloud agent** | 前者跑在你本地机器上；后者跑在 GitHub 云端（Actions 临时环境），产出是分支 / PR。[官方对照](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) |
| 独立 **`copilot` CLI** vs **`gh copilot`** | 前者是完整 agent，且已 **GA**；后者官方已 **retired**，只剩 explain / suggest |
| **Copilot app** vs **IDE Chat** | app 是架在 Copilot CLI 上的桌面壳：并行会话、Issues / PR、自动化。IDE Chat 待在编辑器里 |

更多同类辨析见 [术语表](./copilot-glossary)。

关键机制（决定了后面所有优化动作）：Copilot 不是「把你的仓库喂给模型训练」，而是**每次请求时检索并注入上下文**。所以「仓库大 = Copilot 懂得多」是错的；「打开相关文件再提问」才有效。

## 核心概念速览

详见 [术语表](./copilot-glossary)。

| 概念 | 一句话解释 | 出现位置 |
|------|-----------|---------|
| **四个日常入口** | 补全、IDE Chat、CLI、Cloud agent | 全局 |
| **Ask / Edit / Agent** | **IDE Chat 内部**的三档自主程度 | IDE |
| **Cloud agent** | GitHub 上的后台 agent；付费计划；Business / Enterprise 需管理员开启 | github.com / Issue / VS Code |
| **Copilot CLI** | 终端 agent（`copilot`）。不是 `gh copilot` | 终端 |
| **Copilot app** | 并行 agent 会话的桌面应用 | 桌面 |
| **自定义指令** | 自动附着的项目级约束 | 所有界面 |
| **提示文件** | `/name` 可复用任务 | IDE Chat |
| **MCP** | 连接外部工具的开放协议。取代了 GitHub App Extensions | 所有 agent 界面 |
| **Plugins / Skills** | 可安装的 agent / skill / hook 包 | CLI / Chat / app |
| **Spaces** | 命名的上下文包（仓库 + 文件 + 说明） | github.com / Chat |
| **AI credits** | Chat、CLI、agent、审查的用量单位 | 计费 |

## 该读哪一篇

本组文档按 [Diataxis](https://diataxis.fr/) 四象限拆分，各有明确分工——**别拿速查表当教程读**：

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./copilot) | Tutorial | 第一次用，想按顺序走一遍：装 → 登录 → 认识四个日常入口 → 沉淀项目规范 |
| [实战 Cookbook](./copilot-cookbook) | How-to | 已经会基本操作，想照抄某个场景的现成做法 |
| [Cheatsheet](./copilot-cheatsheet) | Reference | 查快捷键、斜杠命令、配置键名、CLI 参数、计划配额 |
| [术语表](./copilot-glossary) | Explanation | 看到不认识的名词，或怀疑某个说法已经过时 |

## 学习路径

### 第一阶段：能用起来

**目标**：装好、登录，理解检索式上下文注入。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 1 | 选订阅——有免费档 | [教程 · 第 0 步](./copilot) |
| 2 | 装 IDE 扩展并登录；需要终端能力再另装 CLI | [教程 · 第 1 步](./copilot) |
| 3 | 理解上下文注入机制，这是后面一切优化的前提 | [教程 · 第 2 步](./copilot) |

### 第二阶段：选对入口

**目标**：别再付「选错形态」的税。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 4 | IDE vs github.com vs CLI vs 云端 vs 桌面 | 上面的决策树；[教程 · 第 3 步](./copilot) |
| 5 | Ask / Edit / Agent 形成肌肉记忆 | [术语表 · 三种模式](./copilot-glossary) |
| 6 | 用 `@` 和 `#` 显式喂上下文 | [Cheatsheet · 聊天参与者](./copilot-cheatsheet) |

### 第三阶段：把重复的沉淀下来

**目标**：同一句话只写一次。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 7 | 写 `.github/copilot-instructions.md` | [Cookbook · 沉淀项目规范](./copilot-cookbook) |
| 8 | 用提示文件处理成型任务 | [Cookbook · 复用提示文件](./copilot-cookbook) |
| 9 | 接 MCP 访问数据库、内部 API | [术语表 · MCP](./copilot-glossary) |

### 第四阶段：规模化与安全

**目标**：会派活，会审查。

| 步骤 | 内容 | 链接 |
|------|------|------|
| 10 | 派活给 Cloud agent，任务描述写清硬边界 | [Cookbook · 把任务扔到云端](./copilot-cookbook) |
| 11 | 权限判断、SQL 拼接、加密、支付相关代码永远人工过一遍 | [教程 · 第 6 步](./copilot) |

## 功能速查表

### 同步辅助（你一直在环里）

| 功能 | 用途 | 文档 |
|------|------|------|
| 行内补全 | 下一行 / 样板代码，Tab 接受 | [教程](./copilot) |
| IDE Chat · Ask | 解释、对比、计划——不改代码 | [术语表](./copilot-glossary) |
| IDE Chat · Edit | 只改你点名的文件，给你看 diff | [Cookbook](./copilot-cookbook) |
| github.com 上的 Copilot Chat | 不问 IDE，直接问仓库 / Issue / PR | [Ask questions in GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github) |
| PR 摘要 | 给 PR 生成 AI 摘要 | [Create a PR summary](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/create-a-pr-summary) |
| GitHub Desktop | 根据 diff 写 commit message | [Features](https://docs.github.com/en/copilot/get-started/features) |

### Agent 能力（可以不盯着跑）

| 功能 | 用途 | 文档 |
|------|------|------|
| IDE Agent 模式 | 本地多步改动 + 命令（需你审批） | [Cookbook](./copilot-cookbook) |
| Copilot CLI | 终端 agent；交互式或 `copilot -p` | [Cheatsheet · CLI](./copilot-cheatsheet) · [About CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) |
| Cloud agent | 在 GitHub 上调研 / 计划 / 改分支 / 可选开 PR | [Cookbook](./copilot-cookbook) · [About cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) |
| Copilot app | 桌面：并行会话、Issues / PR、自动化 | [About the Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) |
| 代码审查 | 给 PR 写 AI 审查意见 | [Code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) |

### 定制（横跨所有入口）

| 功能 | 用途 | 文档 |
|------|------|------|
| 自定义指令 | 写一次，每次自动附着 | [Cheatsheet](./copilot-cheatsheet) |
| 提示文件 | `/name` 可复用任务 | [Cookbook](./copilot-cookbook) |
| MCP | 外部工具和数据 | [术语表](./copilot-glossary) |
| Skills / Plugins | 专项知识包 | [术语表](./copilot-glossary) |
| Spaces | 命名的上下文包 | [术语表](./copilot-glossary) |

## 时效性提醒

Copilot 迭代很快，旧教程里大量写法已经失效。下面几条是查资料时最容易踩的坑：

- **Copilot Workspace**（GitHub Next 技术预览）**已于 2025-05-30 日落**。「Issue → 计划 → PR」现由 **Cloud agent** 承载。
- **Copilot Extensions（GitHub App 形态）已于 2025-11-10 日落**，官方替代方案是 MCP。VS Code 客户端侧的 Chat 扩展不受影响。
- **GitHub Spark** 自 **2026-08-04** 起不再接受新用户、不能新建应用；已有应用须在 **2026-08-31** 前导出。已部署的应用会继续跑。不要再写「从零做一个 Spark」的教程。
- `@workspace`、`#editor`、`#git`、`#vscodeAPI` 等旧引用**已不在官方清单里**——代码库检索下沉成了工具，Agent 模式自主调用。
- 曾叫 "coding agent" 的云端能力**官方已改称 cloud agent**。
- **`gh copilot`（GitHub CLI 扩展）官方已标 retired**，由独立 `copilot` CLI 取代。
- Copilot CLI 已 **GA**（自 [2026-02-25](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/)）。还写「public preview」的页面过时了。
- Copilot **在 GitHub Enterprise Server 上不可用**。Enterprise 需要 GitHub Enterprise Cloud；Business / Enterprise 的额度差见 [Cheatsheet · 计划对照](./copilot-cheatsheet)。

完整的已退役/改名清单见 [术语表 · 已退役或已改名的概念](./copilot-glossary)。

## 资源链接

- [GitHub Copilot 官方文档](https://docs.github.com/en/copilot)
- [GitHub Copilot 功能清单](https://docs.github.com/en/copilot/get-started/features)
- [VS Code Copilot 文档](https://code.visualstudio.com/docs/copilot/overview)
- [Cheatsheet · 高质量信息源](./copilot-cheatsheet) — 按可信度排序的完整信息源清单，也是本组文档的核实依据

> **取证注意**：`docs.github.com` 中文版覆盖不全且滞后，`docs.github.com/zh/enterprise-cloud@latest/...` 这类路径大量已失效。核对事实统一用 `docs.github.com/en/copilot/...`。
