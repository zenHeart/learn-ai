# Copilot Cheatsheet

> 这是一份**参考型**文档——回答"参数是什么、快捷键是哪个、该选哪个"。要理解概念看 [术语表](./copilot-glossary)，要学怎么上手看 [主教程](./copilot)，要照着场景抄看 [Cookbook](./copilot-cookbook)。
>
> **口径说明**：Copilot 迭代极快（GitHub changelog 每周多条，VS Code 每月一个 Stable）。本页所有快捷键、命令、配置键均逐条对照官方参考页核对，**未在官方清单中找到的条目一律不收录**，而不是"先留着"。核对基准见文末[高质量信息源](#高质量信息源)。

## 术语索引

一行一个，详细解释点进 [术语表](./copilot-glossary)：

| 术语 | 一句话 |
|------|--------|
| [GitHub Copilot](./copilot-glossary#github-copilot) | GitHub 的 AI 编程助手，多入口、多模型 |
| [Prompt / PE / Context](./copilot-glossary#prompt-prompt-engineering-context) | 输入 / 组织输入的方法 / 附带的额外信息 |
| [四种交互界面](./copilot-glossary#四种交互界面) | 补全、Chat、CLI、Cloud agent |
| [Ask / Edit / Agent](./copilot-glossary#ask--edit--agent-三种模式) | Chat 的三档自主程度 |
| [聊天参与者](./copilot-glossary#聊天参与者chat-participant) | `@` 前缀，把提问限定到某个领域 |
| [工具与工具集](./copilot-glossary#工具与工具集tools--tool-sets) | `#` 前缀，Chat 能调用的能力单元 |
| [自定义指令](./copilot-glossary#自定义指令custom-instructions) | 自动注入的项目级约束 |
| [提示文件](./copilot-glossary#提示文件prompt-files) | `.prompt.md`，手动调用的可复用任务 |
| [Agent Skills](./copilot-glossary#agent-skills) | 带资源的目录，专项任务知识包 |
| [Plugins](./copilot-glossary#plugins) | 可安装的 agent / skill / hook 包——**不是**已日落的 Extensions |
| [MCP](./copilot-glossary#mcpmodel-context-protocol) | 开放协议，AI 与外部工具通信的标准 |
| [Cloud agent](./copilot-glossary#cloud-agent) | GitHub 云端后台跑任务，产出 PR |
| [Copilot app](./copilot-glossary#copilot-app) | 并行 agent 会话的桌面壳 |
| [Copilot Spaces](./copilot-glossary#copilot-spaces) | 命名的上下文包（仓库+文件+说明） |
| [Copilot CLI](./copilot-glossary#copilot-cli) | 终端里的 Copilot agent |
| [GitHub Spark](./copilot-glossary#已退役或已改名的概念) | 微应用构建器；2026-08-04 起不再接受新用户 |
| [AI credits](./copilot-glossary#ai-credits-与配额) | 用量计费单位 |

---

## 界面选型

| 你的任务 | 用哪个界面 | 为什么 |
|---------|-----------|--------|
| 补下一行、补样板代码 | **代码补全** | 零成本、零打断 |
| 「这段代码在干什么」 | **Chat / Ask** | 只要答案，不要改动 |
| 「重构这两个文件」 | **Chat / Edit** | 要看 diff 再决定 |
| 「装依赖、跑测试、多步改造」 | **Chat / Agent** | 需要执行命令并迭代 |
| 「这个 shell 命令怎么写」 | **Chat 内联（终端里 `⌘I`）** 或 **CLI** | 上下文就在终端 |
| 「跑 20 分钟的机械迁移」 | **Cloud agent** | 不占本地、产出 PR |
| 「在 GitHub 上问某个仓库的事」 | **GitHub 网页端 Chat** | 仓库上下文现成 |
| 「并行指挥多个 agent，不想待在 IDE」 | **Copilot app** | 架在 Copilot CLI 上的桌面壳 |
| 「用一句话搭一个微应用」 | **不要新开 GitHub Spark** | 2026-08-04 起不再接受新用户 / 新建应用 |

---

## 模式选型

| | Ask | Edit | Agent |
|---|---|---|---|
| 会改文件吗 | 不会 | 会，只改你指定的 | 会，自己决定改哪些 |
| 会跑命令吗 | 不会 | 不会 | 会（需你审批） |
| 你的介入点 | 无 | 逐条接受 / 放弃 diff | 审批工具调用 + 审最终结果 |
| 选它的信号 | 我要先搞懂 | 我知道要改哪、但不想手写 | 我知道目标、不想管过程 |

> 决策口诀：**你能不能一眼看出它做错了**。能 → 往 Agent 走；不能 → 退回 Edit 甚至 Ask。

---

## 计划对照

数据源：[GitHub Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)

| 计划 | 价格 | 关键限制 |
|------|------|---------|
| **Copilot Free** | 免费 | 每月 2000 次代码补全；模型只能用自动选择 |
| **Copilot Pro** | $10 / 月 | 面向个人开发者 |
| **Copilot Pro+** | $39 / 月 | 更高 AI credits 额度、更全的模型选择 |
| **Copilot Max** | $100 / 月 | 个人计划里额度最高的一档 |
| **Copilot Business** | $19 / 席位 / 月 | 每用户 **1,900 AI credits**（组织池化）；组织级策略；Cloud agent |
| **Copilot Enterprise** | $39 / 席位 / 月 | 每用户 **3,900 AI credits**（组织池化）；含 Business 全部能力 + 新模型/功能优先 + 额外企业管控 |
| **Copilot for Students / Teachers / OSS maintainers** | 免费 | 需通过资格验证 |

**必须知道的三条**：

1. 每个付费计划包含一定额度的 **GitHub AI credits**；基于请求数的 premium request 计费已被官方标注为 **legacy**。
2. Copilot **在 GitHub Enterprise Server 上不可用**。Enterprise 需要 **GitHub Enterprise Cloud**；企业主可以按组织分别分配 Enterprise 或 Business。
3. 官方计划页记录了两次**临时暂停新注册**：2026-04-20（Pro / Pro+ / Max / Student）与 2026-04-22（GitHub Free、Team 组织的自助 Business）。是否仍在暂停以计划页现文为准，不要把暂停日期写成永久事实。

组织计划超额默认按 **$0.01 / AI credit** 计费，可用 budget 封顶。数据源另见 [选择企业计划](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan)。

---

## 快捷键

数据源：[VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)。下表为 macOS 键位。

| 场景 | 快捷键 | 作用 |
|------|--------|------|
| **代码补全** | `Tab` | 接受行内建议 / 下一处编辑建议 |
| | `Escape` | 忽略当前建议 |
| **打开 Chat** | `⌃⌘I` | 打开 Chat 视图 |
| | `⌘I` | 打开行内 Chat（编辑器内或终端内均可） |
| | `⇧⌥⌘L` | 打开 Quick Chat |
| **Chat 内操作** | `⌘N` | 新建 Chat 会话 |
| | `⇧⌘I` | 在 Chat 视图中切换为使用 agent |
| | `⌥⌘.` | 打开模型选择器 |
| **编辑器辅助** | `F2` | AI 辅助重命名符号 |

> 旧版本站文档里的「`Shift Tab` 按行补全 / `⌘→` 按词补全 / `⌃Enter` 显示所有建议 / `⌥]` `⌥[` 切换建议」四项，未在当前官方键位清单中找到，已移除。原因见 [术语表 · 已退役概念](./copilot-glossary#已退役或已改名的概念)。

---

## 聊天参与者

用 `@` 调用。数据源同上。

| 参与者 | 作用 | 示例 |
|--------|------|------|
| `@github` | GitHub 相关上下文（仓库、Issue、PR） | `@github 列出本仓库最近的未关闭 bug` |
| `@terminal` | 集成终端的 shell 与内容 | `@terminal find the largest file in the src directory` |
| `@vscode` | VS Code 自身命令与功能 | `@vscode how do I change my colors`<br>`@vscode how can I change key bindings`<br>`@vscode tell me how to debug a node.js app` |

扩展可以贡献自己的参与者，安装后出现在同一个 `@` 列表里。

> `@workspace` 与 `@regex` 已不在官方清单中，见[已退役概念](./copilot-glossary#已退役或已改名的概念)。

---

## 工具集与上下文引用

用 `#` 引用。引用一个**工具集**等于允许其下的一批**工具**。

| 工具集 | 包含的工具 |
|--------|-----------|
| `#agent` | `/runSubagent` |
| `#browser` | 浏览器相关工具 |
| `#changes` | 查看工作区改动 |
| `#edit` | `/createDirectory`、`/createFile`、`/editFiles`、`/editNotebook` |
| `#execute` | `/createAndRunTask`、`/getTerminalOutput`、`/runInTerminal`、`/runNotebookCell`、`/testFailure` |
| `#githubRepo` | 检索指定 GitHub 仓库 |
| `#githubTextSearch` | GitHub 文本搜索 |
| `#newWorkspace` | 创建新工作区脚手架 |
| `#read` | `/getNotebookSummary`、`/problems`、`/readFile`、`/readNotebookCellOutput`、`/terminalLastCommand`、`/terminalSelection` |
| `#search` | `/changes`、`/codebase`、`/fileSearch`、`/listDirectory`、`/textSearch`、`/usages` |
| `#selection` | 当前选中内容 |
| `#todos` | 任务清单 |
| `#vscode` | `/askQuestions`、`/extensions`、`/getProjectSetupInfo`、`/installExtension`、`/runCommand`、`/VSCodeAPI` |
| `#web` | `/fetch` |

**另外可直接引用文件**：`#file:路径`，例如 `#file:gameReducer.js #file:gameInit.js how are these files related`。

MCP 服务器提供的工具也出现在这个 `#` 列表里，用法一致。

---

## 斜杠命令（VS Code Chat）

| 命令 | 作用 |
|------|------|
| `/explain` | 解释所选代码 |
| `/fix` | 为所选代码的问题给修复建议 |
| `/doc` | 生成文档注释 |
| `/tests` | 为所选代码生成测试 |
| `/setupTests` | 配置测试环境 |
| `/fixTestFailure` | 修复失败的测试 |
| `/new` | 脚手架新项目 / 新文件 |
| `/newNotebook` | 新建 Jupyter notebook |
| `/init` | 初始化项目的 Copilot 配置 |
| `/plan` | 让 Copilot 先出计划 |
| `/search` | 搜索工作区 |
| `/debug`、`/startDebugging`、`/troubleshoot` | 调试相关 |
| `/clear` | 清空当前会话 |
| `/compact` | 压缩会话历史 |
| `/fork` | 从当前会话分叉 |
| `/agents`、`/hooks`、`/instructions`、`/prompts`、`/skills` | 管理对应的定制资源 |
| `/create-agent`、`/create-hook`、`/create-instruction`、`/create-prompt`、`/create-skill` | 新建对应的定制资源 |
| `/yolo`（`/autoApprove`）、`/disableYolo`（`/disableAutoApprove`） | 开启 / 关闭自动批准 |
| `/<skill 名>`、`/<prompt 名>` | 调用你自定义的 skill / 提示文件 |

> `/new-from`、`/runCommand`、`/help` 均不在当前官方清单中，见[已退役概念](./copilot-glossary#已退役或已改名的概念)。

---

## 自定义指令

数据源：[自定义指令支持矩阵](https://docs.github.com/en/copilot/reference/custom-instructions-support)

| 类型 | 文件位置 | 作用范围 |
|------|---------|---------|
| 👤 个人 | 在 GitHub 个人设置中配置 | 你的所有项目 |
| 📦 仓库级 | `.github/copilot-instructions.md` | 该仓库的所有对话 |
| 📂 路径级 | `.github/instructions/**/*.instructions.md` | 由 frontmatter 中 glob 匹配的文件 |
| 🤖 Agent | `AGENTS.md`（也支持 `CLAUDE.md`、`GEMINI.md`） | 跨工具通用的 agent 约定 |
| 🏢 组织级 | 在组织设置中配置 | 组织下所有仓库 |

**Copilot CLI 的个人指令**放在：`~/.copilot/copilot-instructions.md` 或 `~/.copilot/instructions/**/*.instructions.md`。

各 IDE（GitHub.com / VS Code / Visual Studio / JetBrains / Eclipse / Xcode / Copilot CLI）对上述类型的支持不完全一致，逐项以官方支持矩阵为准。

---

## 提示文件

| 项 | 值 |
|---|---|
| 项目范围位置 | `.github/prompts/*.prompt.md` |
| 用户范围位置 | 存储在 VS Code [profile](https://code.visualstudio.com/docs/configure/profiles) 中的 `.prompt.md`，支持设置同步 |
| 自定义位置 | 设置 `chat.promptFilesLocations` |
| 调用方式 | Chat 里输入 `/<文件名>`，可带参数：`/create-react-form: formName=MyForm` |

frontmatter 字段与完整示例见 [Cookbook · 复用提示文件](./copilot-cookbook#复用提示文件)。

---

## 常用配置键

数据源：[VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

| 配置键 | 作用 |
|--------|------|
| `chat.promptFilesLocations` | 指定提示文件的搜索位置（可用于复用 Cursor rules 目录） |
| `chat.tools.autoApprove` | 自动批准工具调用 |
| `chat.tools.terminal.autoApprove` | 自动批准终端命令（可按命令配置规则） |
| `chat.tools.global.autoApprove` | 全局自动批准 |
| `chat.tools.todos.showWidget` | 显示任务清单浮窗 |
| `chat.math.enabled` | Chat 中渲染数学公式 |
| `mermaid-chat.enabled` | Chat 中渲染 Mermaid 图 |
| `github.copilot.chat.tools.memory.enabled` | 启用 Memory 工具 |
| `github.copilot.chat.agentDebugLog.enabled` | 输出 agent 调试日志 |
| `workbench.browser.enableChatTools` | 启用浏览器类工具 |
| `workbench.settings.showAISearchToggle` | 设置页显示 AI 搜索开关 |
| `search.searchView.semanticSearchBehavior` | 搜索视图的语义搜索行为 |

**权限级别**（Chat 的工具审批策略）：`Default Approvals`（默认逐次询问）→ `Bypass Approvals`（跳过审批）→ `Autopilot`（预览版，完全自主）。

---

## Copilot CLI

指独立的 `copilot` 命令行 agent（**不是** `gh copilot`，区别见[术语表](./copilot-glossary#copilot-cli)）。数据源：[安装文档](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli) 与 [CLI 命令参考](https://docs.github.com/en/copilot/reference/cli-command-reference)。自 [2026-02-25](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/) 起为 GA。

### 安装

```bash
# npm（需要 Node.js 22 或更高）
npm install -g @github/copilot

# Homebrew
brew install --cask copilot-cli

# Windows
winget install GitHub.Copilot

# 安装脚本（支持 PREFIX、VERSION 环境变量）
curl -fsSL https://gh.io/copilot-install | bash
```

Windows 上需要 PowerShell v6 或更高版本。若 npm 因忽略安装脚本而失败，可用 `npm_config_ignore_scripts=false` 重试。

### 认证

| 方式 | 说明 |
|------|------|
| `/login` | 交互式登录（推荐） |
| `copilot login [--host HOST] [--web-flow] [--device-code]` | 命令行登录 |
| 环境变量 | 优先级 `COPILOT_GITHUB_TOKEN` > `GH_TOKEN` > `GITHUB_TOKEN` |

用 PAT 时需要 **fine-grained PAT 且包含 "Copilot Requests" 权限**；**classic `ghp_` PAT 不支持**。凭据存在系统凭据库，无凭据库时以明文存于 `~/.copilot/`（可用 `COPILOT_HOME` 改位置）。

### 命令

| 命令 | 作用 |
|------|------|
| `copilot` | 启动交互式会话 |
| `copilot init` | 在当前仓库初始化配置 |
| `copilot help [TOPIC]` | 帮助。TOPIC 可选 `billing`、`commands`、`config`、`environment`、`logging`、`monitoring`、`permissions`、`providers`、`sandbox` |
| `copilot completion SHELL` | 生成 shell 补全脚本（`bash` / `zsh` / `fish`） |
| `copilot login` / `copilot logout` | 登录 / 登出 |
| `copilot mcp` | 管理 MCP 服务器 |
| `copilot skill` | 管理 Agent Skills |
| `copilot plugin` | 管理插件 |
| `copilot plugins list [--kind mcp\|skill\|instruction\|plugin\|lsp] [--scope SCOPE] [--json]` | 列出已装插件 |
| `copilot plugins enable\|disable\|remove [--plugin\|--mcp\|--skill]` | 启用 / 禁用 / 移除 |
| `copilot update` | 升级到最新版 |
| `copilot version` | 查看版本 |

> `--config-dir=DIRECTORY` 已废弃，改用环境变量 `COPILOT_HOME`。

### 会话内斜杠命令

| 命令 | 作用 |
|------|------|
| `/clear`、`/new`、`/reset` | 清空并开新会话 |
| `/compact` | 压缩上下文 |
| `/context` | 查看当前上下文占用 |
| `/add-dir` | 把额外目录加入可访问范围 |
| `/cwd`、`/cd` | 查看 / 切换工作目录 |
| `/model`、`/models` | 查看与切换模型 |
| `/mcp` | 管理 MCP 服务器 |
| `/plugins` | 管理插件 |
| `/agent` | 切换自定义 agent |
| `/delegate` | 委派子任务 |
| `/plan` | 进入计划模式 |
| `/autopilot`、`/goal` | 自主模式（支持 `--max-ai-credits N`） |
| `/allow-all`、`/yolo` | 允许全部操作 |
| `/permissions [default\|assisted\|allow-all\|show]`、`/permissions reset` | 权限模式管理 |
| `/sandbox` | 沙箱设置 |
| `/diff` | 查看改动 |
| `/review` | 代码审查 |
| `/security-review` | 安全审查 |
| `/research` | 调研模式 |
| `/pr [view\|create\|fix\|auto\|automerge]` | Pull Request 操作 |
| `/limits`（含 `set max-ai-credits`、`unset`） | 查看与设置额度上限 |
| `/session`、`/sessions` | 会话管理 |
| `/resume`、`/continue` | 恢复上次会话 |
| `/settings`、`/config` | 设置 |

### 会话内快捷键

| 按键 | 作用 |
|------|------|
| `@ 文件名` | 引用文件 |
| `# 数字` | 引用编号项 |
| `! 命令` / 单独 `!` | 执行 shell 命令 / 进入 shell 模式 |
| `?` | 快速帮助 |
| `Shift+Tab` | 在 standard / plan / autopilot 模式间循环 |
| `Shift+Enter`、`Option+Enter`、`Alt+Enter` | 换行不发送 |
| `Ctrl+Enter`、`Ctrl+Q` | 加入队列 |
| `Esc` | 中断当前操作 |
| `Ctrl+C` | 取消 |
| `Ctrl+D` | 退出 |
| `Ctrl+L` | 清屏 |
| `Ctrl+G` | 跳转 |
| `Ctrl+R` | 历史搜索 |
| `Ctrl+V`、`Alt+V` | 粘贴相关 |
| `Ctrl+X` 后接 `/`、`e`、`b`、`o` | 扩展操作 |
| `Ctrl+Z` | 挂起 |
| `Ctrl+F`、`Ctrl+O`、`Ctrl+E`、`Ctrl+T`、`PageUp` / `PageDown` | 时间线导航 |

### 已退役 `gh copilot`

[官方声明](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli)：GitHub CLI 的 Copilot 扩展 **已退役**，由独立 `copilot` CLI 取代。下面命令来自本站旧单文件，只作对照，不要当现行安装路径：

```bash
# 解释命令含义（已退役）
gh copilot explain "sudo apt-get"

# 建议命令（已退役）
gh copilot suggest "Undo the last commit"

# 旧别名（已退役）
ghce "sudo apt-get"
ghcs "Undo the last commit"
```

---

## 常见问题排查

| 症状 | 先查这里 |
|------|---------|
| 建议质量差、答非所问 | 相关文件有没有打开？有没有用 `#file:` 显式引用？有没有写自定义指令？ |
| 想知道建议是否匹配了公开代码 | [查找与 Copilot 建议匹配的公开代码](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code) |
| 通用故障 | [排查 Copilot 常见问题](https://docs.github.com/en/copilot/how-tos/troubleshoot/troubleshoot-common-issues) |
| Agent 行为异常，想看它到底调了什么 | 开启 `github.copilot.chat.agentDebugLog.enabled` |
| 想调试提示文件效果 | 在提示文件编辑器右上角点播放按钮直接运行 |
| CLI 装不上 | 确认 Node.js ≥ 22；Windows 确认 PowerShell ≥ 6；npm 失败试 `npm_config_ignore_scripts=false` |
| CLI 认证失败 | 确认用的是 fine-grained PAT 且勾了 Copilot Requests 权限（classic `ghp_` 不支持） |

---

## 高质量信息源

按可信度排序，**写文档或核对事实时按这个顺序取证**：

| 来源 | 用途 | 更新频率 |
|------|------|---------|
| [GitHub Copilot 官方文档](https://docs.github.com/en/copilot) | 产品能力、概念、how-to 的唯一权威 | 持续 |
| [Copilot 功能清单](https://docs.github.com/en/copilot/get-started/features) | 官方 assistive / agentic 形态列表 | 不定期 |
| [About cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) | Cloud agent 与 IDE Agent 模式对照 | 不定期 |
| [About Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | 终端 agent 能力 | 跟随 CLI 发版 |
| [About the Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) | 桌面并行 agent 应用 | 不定期 |
| [VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features) | 快捷键、斜杠命令、工具集、settings 键的权威清单 | 跟随月度 Stable |
| [Copilot 计划与配额](https://docs.github.com/en/copilot/get-started/plans) | 价格、AI credits、可用性 | 不定期 |
| [Copilot CLI 命令参考](https://docs.github.com/en/copilot/reference/cli-command-reference) | CLI 子命令、flag、交互快捷键 | 跟随 CLI 发版 |
| [自定义指令支持矩阵](https://docs.github.com/en/copilot/reference/custom-instructions-support) | 各 IDE 对五类自定义指令的支持 | 不定期 |
| [GitHub Changelog · Copilot](https://github.blog/changelog/label/copilot/) | 功能上线与退役公告 | 每周多条 |
| [VS Code Release Notes](https://code.visualstudio.com/updates) | 月度变更，Copilot 相关集中在 Chat 章节 | 每月 |
| [GitHub Blog · AI & ML](https://github.blog/ai-and-ml/github-copilot/) | 原理性长文（如上下文检索机制） | 不定期 |
| [GitHub Copilot 视频系列](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) | 官方视频教程 | 不定期 |

**取证注意**：`docs.github.com` 有中文版但覆盖不全且滞后，且 `docs.github.com/zh/enterprise-cloud@latest/...` 这类企业云路径大量已失效——**核对与引用统一用 `docs.github.com/en/copilot/...`**。

---

## 相关页面

- [Copilot 主教程](./copilot) — 装什么、怎么起步
- [实战 Cookbook](./copilot-cookbook) — 场景化提示模式
- [术语表](./copilot-glossary) — 概念解释与已退役清单
