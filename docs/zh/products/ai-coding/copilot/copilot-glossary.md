# Copilot 术语表 / Glossary

> 这是一份**解释型**文档——回答"这个概念是什么、为什么这样设计、什么时候该用"。和 [Copilot Cheatsheet](./copilot-cheatsheet) 互补：cheatsheet 回答"怎么配置、参数是什么、快捷键是哪个"，本文档回答"这是什么、为什么需要、它怎么和其他概念打交道"。
>
> **所有跨章节共享的术语**都在这里统一定义，主教程 [Copilot](./copilot) 和 [实战 Cookbook](./copilot-cookbook) 引用这里，不重复解释，避免口径不一致。
>
> Copilot 迭代极快、退役概念多，文末「[已退役或已改名的概念](#已退役或已改名的概念)」专门收纳"你可能在旧教程里见过、但今天已经不存在"的说法。

## 概念关系图

```
                    ┌────────────────────────┐
                    │     GitHub Copilot     │  ← 订阅层：计划决定
                    │      计划 / 配额        │     能用哪些界面和模型
                    └───────────┬────────────┘
                                │
        ┌──────────────┬────────┴───────┬─────────────────┐
        │              │                │                 │
   ┌────┴─────┐  ┌────┴─────┐    ┌────┴─────┐     ┌─────┴──────┐
   │ 代码补全  │  │   Chat   │    │   CLI    │     │ Cloud agent │  ← 交互界面层
   │ (inline) │  │ (IDE 内)  │    │  (终端)   │     │ (GitHub 上) │
   └──────────┘  └────┬─────┘    └────┬─────┘     └──────┬─────┘
                      │               │                  │
                      └───────┬───────┴──────────────────┘
                              │
              ┌───────────────┴────────────────┐
              │        上下文与定制层            │  ← 你写什么、Copilot 看得到什么
              ├────────────────────────────────┤
              │ 自定义指令  提示文件  自定义 Agent │
              │ Agent Skills  Plugins  MCP  Spaces │
              └────────────────────────────────┘
```

**核心逻辑**：**订阅层**决定你有多少额度、能选哪些模型；**交互界面层**是四个入口——补全在你打字时介入，Chat 在 IDE 里对话，CLI 在终端里跑 agent，Cloud agent 在 GitHub 上后台跑；**上下文与定制层**横跨所有界面，决定 Copilot 到底"知道"什么。日常提效的抓手 90% 在第三层——换界面只是换姿势，喂上下文才是换实力。

---

## GitHub Copilot

**是什么**：GitHub 推出的 AI 编程助手，通过编辑器插件、命令行工具、GitHub 网页端等多个入口，基于大语言模型辅助你写代码、解释代码、执行开发任务。

**它不是"ChatGPT + 你的仓库"**：这是最常见的误解。Copilot 不绑定单一模型——[计划页](https://docs.github.com/en/copilot/get-started/plans)明确列出不同订阅可用的模型集合不同，付费计划可以在多家供应商的模型之间切换，免费计划只能用自动模型选择。所谓"懂你的项目"也不是靠把仓库喂进模型训练，而是靠**检索式上下文注入**：编辑器把当前文件、打开的标签页、你显式引用的文件和工具返回的检索结果拼进请求。理解这一点很关键——它解释了为什么"打开相关文件"和"写好自定义指令"能立刻提升输出质量，而"我们仓库很大所以 Copilot 肯定懂"是错的。

**为什么值得系统学**：补全（按 Tab）是最容易上手也最容易到天花板的用法。真正的差距在于会不会控制上下文、会不会选界面、会不会把重复的要求沉淀成配置。这也是本套文档按 Diataxis 拆成四份的原因。

**官方文档**：
- [Copilot 文档首页](https://docs.github.com/en/copilot)
- [计划与配额对比](https://docs.github.com/en/copilot/get-started/plans)
- [Copilot 如何更好地理解你的代码](https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/)

---

## Prompt / Prompt Engineering / Context

**是什么**：

- **Prompt（提示）**：你传给模型的输入。
- **Prompt Engineering（提示工程）**：如何组织这个输入，让模型更准确地执行你的意图。
- **Context（上下文）**：为了让模型理解你的问题而附带提供的额外信息。

**在 Copilot 语境下的具体含义**：

| 角色 | Prompt 是什么 | Prompt Engineering 是什么 | Context 是什么 |
|------|--------------|--------------------------|---------------|
| 开发者 | 你写的代码块、行内注释、或 Chat 里输入的问题 | 通过优化注释和提问方式，让 Copilot 给出更好的建议 | 通过参与者（`@`）、工具（`#`）、显式引用文件等方式注入的额外信息 |

> 表格思路来自 [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/#whats-a-prompt-and-what-is-prompt-engineering)。

**为什么要区分这三个**：新手容易把"Copilot 不懂我"归因为模型不行，实际上八成是 Context 没给够——文件没打开、没引用、没写自定义指令。区分开之后，排查路径就清晰了：先看上下文够不够，再看提示写得清不清楚，最后才怀疑模型。

**具体怎么写**：见 [Cookbook · 提示原则](./copilot-cookbook#提示原则)。

**延伸阅读**：
- [A Beginner's Guide to Prompt Engineering with GitHub Copilot](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp)
- [ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction)（吴恩达与 OpenAI 联合课程）

---

## 四种交互界面

**是什么**：Copilot 不是一个界面，而是四类入口。选错入口是新手最常见的效率损失。

| 界面 | 在哪 | 交互方式 | 典型任务 |
|------|------|---------|---------|
| **代码补全（inline completion）** | 编辑器里你打字的位置 | 打字 → 出灰字 → `Tab` 接受 | 补下一行、补样板代码 |
| **Chat** | 编辑器侧边栏 / 行内 / 终端 | 对话 | 解释、重构、多文件改动 |
| **CLI** | 终端 | 交互式 agent 会话 | 命令行任务、脚本、跨仓库操作 |
| **Cloud agent** | GitHub 网页端 / Issue | 派任务，后台跑，产出 PR | 明确定义的独立任务 |

另外两个官方入口，第一天用得少（见[学习地图](./)）：

| 界面 | 在哪 | 典型任务 |
|------|------|---------|
| **github.com 上的 Copilot Chat** | 浏览器 | 不问 IDE，直接问仓库 / Issue / PR |
| **Copilot app** | 桌面 | 并行 agent 会话、Issues / PR、自动化 |

**为什么分成四类而不是"一个 Copilot"**：三个维度不同——**谁发起**（你打字 / 你提问 / 你派任务）、**跑在哪**（本地 / GitHub 云端）、**结果形态**（灰字建议 / 编辑器改动 / Pull Request）。任务和界面错配就会难受：用补全干重构（改不动多文件）、用 Chat 干"跑 20 分钟的迁移"（要一直盯着）都属于这类。

**怎么选**：见 [Cheatsheet · 界面选型](./copilot-cheatsheet#界面选型)。

---

## Ask / Edit / Agent 三种模式

**是什么**：Chat 里的三档"自主程度"。

| 模式 | Copilot 能做什么 | 你的控制点 | 适合 |
|------|-----------------|-----------|------|
| **Ask（提问）** | 只回答，不动代码 | 完全掌控——它只是说 | 理解概念、解释代码、要方案 |
| **Edit（编辑）** | 改你指定范围的文件 | 你选文件、预览 diff、逐条接受或放弃 | 对特定文件的受控改动 |
| **Agent（代理）** | 自主决定改哪些文件、建议并执行命令、多轮迭代 | 你审批工具调用和最终结果 | 多步骤、需要跑测试/装依赖的复杂任务 |

**示例场景**：

- Ask：「JavaScript 中 let、const 和 var 有什么区别？」「解释下这个函数的作用」
- Edit：「重构 `calculateTotal` 提升可读性」「`login` 函数运行不正常，帮我调试」
- Agent：「把这段逻辑拆成多个函数」「为 payment-processing 模块跑所有测试和 linter」

**为什么需要三档而不是一档全自动**：自主程度和可控性是此消彼长的。Agent 模式省事，但它会自己决定动哪些文件——在你还不清楚代码结构时容易改出一片你没预期的 diff。反过来 Ask 模式最安全，但每一步都要你手动落地。**判断标准是"你能不能一眼看出它做错了"**：能，就往 Agent 走；不能，就退回 Edit 甚至 Ask。

**注意模式名和界面名不是一回事**：Agent **模式**是 Chat 里的一个档位（跑在本地编辑器），Cloud **agent** 是 GitHub 云端后台跑任务的独立产品，两者容易混。

**官方文档**：[Copilot 最佳实践](https://docs.github.com/en/copilot/get-started/best-practices) · [About Copilot Chat](https://docs.github.com/en/copilot/concepts/chat)

<!-- TODO: 待核实 —— 旧文档里的三条 ask/edit/agent 模式深链（/using-github-copilot/guides-on-using-github-copilot/choosing-the-right-ai-tool-for-your-task#using-copilot-chat-in-*-mode）在当前 docs.github.com 上已重定向，未找到官方仍在维护的等价锚点，此处只保留上级页面链接 -->

---

## 聊天参与者（Chat participant）

**是什么**：Chat 里用 `@` 前缀调用的"专家"，作用是把提问限定到某个领域，并让 Copilot 拿到该领域特有的上下文。

**当前可用的参与者**（VS Code）：

| 参与者 | 注入什么上下文 | 示例 |
|--------|--------------|------|
| `@github` | GitHub 相关上下文（仓库、Issue、PR 等） | `@github 这个仓库最近有哪些未关闭的 bug issue` |
| `@terminal` | 集成终端的 shell 及其内容 | `@terminal find the largest file in the src directory` |
| `@vscode` | VS Code 自身的命令和功能 | `@vscode how do I change my colors` |

扩展也可以贡献自己的参与者。完整清单和示例见 [Cheatsheet · 聊天参与者](./copilot-cheatsheet#聊天参与者)。

**为什么它在变少**：早期 Copilot 用参与者来划分能力边界（比如用 `@workspace` 表示"查代码库"）。现在这类能力已经下沉成**工具**——Agent 模式下 Copilot 会自主决定要不要调用代码库检索，不需要你手动 `@`。所以参与者的定位从"能力开关"退化成了"少数几个仍需显式指定的领域入口"。这是理解 `@workspace` 为什么消失的关键（见[已退役概念](#已退役或已改名的概念)）。

**官方文档**：[VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

---

## 工具与工具集（Tools / Tool sets）

**是什么**：Chat 能调用的具体能力单元，用 `#` 前缀引用。相关工具被打包成**工具集**——引用一个工具集（如 `#read`）等于允许它下面的一批工具（`/readFile`、`/problems`、`/terminalLastCommand`…）。

**几个常用工具集**：

| 工具集 | 覆盖什么 |
|--------|---------|
| `#read` | 读文件、读诊断问题、读终端上次命令与选中内容 |
| `#edit` | 建目录、建文件、改文件、改 notebook |
| `#execute` | 建并跑任务、跑终端命令、跑 notebook cell、看测试失败 |
| `#search` | 代码库语义检索、文件搜索、文本搜索、找引用、看改动 |
| `#vscode` | 装扩展、跑 VS Code 命令、查 VS Code API |
| `#web` | 抓取网页 |

完整清单见 [Cheatsheet · 工具集与上下文引用](./copilot-cheatsheet#工具集与上下文引用)。

**为什么从"聊天变量"演进成"工具集"**：早期的 `#file`、`#selection` 是**静态变量**——把某段内容原样贴进 prompt。工具是**可调用的动作**——Copilot 自己决定要不要调、调几次、拿结果再决定下一步。这个转变是 agent 化的直接结果：静态变量只能一次性喂料，工具能支撑多轮探索。

**和 MCP 的关系**：MCP 服务器提供的能力也以工具形式出现在这个列表里，用同一套 `#` 语法引用。也就是说 `#` 是统一的工具入口，内置工具和外部 MCP 工具在使用体验上是一致的。

**官方文档**：[VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

---

## 自定义上下文（Customization）

**是什么**：把"每次都要强调的要求"沉淀成文件或配置，让 Copilot 自动带上，不用你反复打字。

**三类机制，按"作用范围 × 触发方式"划分**：

| 机制 | 作用范围 | 触发方式 | 解决什么 |
|------|---------|---------|---------|
| **自定义指令（Custom instructions）** | 项目级或路径级，作用于所有对话 | 自动注入 | 「我们用 TypeScript strict」「不要写 class 组件」这类恒定约束 |
| **提示文件（Prompt files）** | 单次任务 | 你用 `/名字` 显式调用 | 「按模板生成一个 React 表单」这类可复用的完整任务 |
| **自定义 Agent（Custom agents）** | 一整段对话 | 你切换到该 agent | 「现在你是代码审查员，只看安全问题」这类角色切换 |

**为什么需要三种而不是一种**：它们的**生命周期**不同。自定义指令是"永远生效的项目宪法"；提示文件是"喊一声就来的一次性任务"；自定义 Agent 是"这一整段对话都换个身份"。把恒定约束写进提示文件，就得每次手动调用；把一次性任务写进自定义指令，就会污染所有无关对话。

**具体文件放哪、怎么写**：见 [Cheatsheet · 自定义指令](./copilot-cheatsheet#自定义指令) 和 [Cookbook · 复用提示文件](./copilot-cookbook#复用提示文件)。

**官方文档**：
- [自定义指令支持矩阵](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [VS Code Copilot 定制](https://code.visualstudio.com/docs/copilot/customization/overview)

---

## 自定义指令（Custom instructions）

**是什么**：Markdown 文件，描述"在这个项目/这类文件里，你应该遵守什么"，Copilot 每次请求自动带上。

**五类作用域**（官方划分）：

| 类型 | 作用范围 |
|------|---------|
| 👤 **个人（Personal）** | 你自己的所有项目 |
| 📦 **仓库级（Repository-wide）** | 单个仓库的所有对话 |
| 📂 **路径级（Path-specific）** | 匹配某个 glob 的文件 |
| 🤖 **Agent** | 通用 agent 约定文件（`AGENTS.md` 等） |
| 🏢 **组织级（Organization）** | 组织下所有仓库 |

具体文件路径和各 IDE 支持情况见 [Cheatsheet · 自定义指令](./copilot-cheatsheet#自定义指令)。

**为什么它是提效性价比最高的一项**：它是唯一"写一次、之后每次对话都受益"的机制。写十条精准的项目约束，胜过在每个 prompt 里重复描述技术栈。

**和 `AGENTS.md` 的区别**：`.github/copilot-instructions.md` 是 Copilot 专属的；`AGENTS.md` 是跨工具的通用 agent 约定文件，Copilot 也读它。想让同一份约束同时被多家 AI 工具吃到，写 `AGENTS.md`；只服务 Copilot 且要用到 Copilot 专属写法，写 `copilot-instructions.md`。

**官方文档**：[自定义指令支持矩阵](https://docs.github.com/en/copilot/reference/custom-instructions-support)

---

## 提示文件（Prompt files）

**是什么**：`.prompt.md` 文件，把一个完整的、可复用的任务描述存下来，之后在 Chat 里用斜杠命令调用，还能传参数。

**和自定义指令的区别**：

| 维度 | 自定义指令 | 提示文件 |
|------|-----------|---------|
| 触发 | 自动，每次都带 | 手动，`/名字` 调用 |
| 内容 | 约束、规范（「不要用 any」） | 任务（「生成一个带校验的表单组件」） |
| 类比 | 项目的 ESLint 配置 | 代码片段 / 脚本 |

**为什么需要它**：团队里总有那么几个"每次都要重新描述一遍"的任务——按模板建组件、按规范写迁移脚本、按格式生成变更日志。提示文件把这些变成可提交进 Git、团队共享、带参数的资产。

**具体结构和写法**：见 [Cookbook · 复用提示文件](./copilot-cookbook#复用提示文件)。

**官方文档**：[VS Code Copilot 定制](https://code.visualstudio.com/docs/copilot/customization/overview)

---

## Agent Skills

**是什么**：把某个专项任务的完整知识（说明、脚本、参考资料）打包成一个目录，Copilot 在识别到相关任务时动态加载。

**和提示文件的区别**：提示文件是**单个 Markdown 文件**、你显式调用；Skill 是**带资源的目录**、可以被自动识别加载，能容纳多文件工作流和辅助脚本。任务复杂到"一个文件写不完"或"需要附带脚本"时，才需要升级成 Skill。

**官方文档**：[关于 Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

---

## Plugins

**是什么**：可安装的扩展包，把可复用的 agent、skill、hook 和集成打成一份，用 Copilot CLI（`copilot plugin` / `copilot plugins …`）或 Chat 里的 `/plugins` 管理。

**它不是什么**：不是 2025-11-10 日落的 **GitHub App Copilot Extensions**。后者是 Chat 里 `@扩展名` 的那套；Plugins 是后来的包装格式。2024 年博客里「自己做一个 Copilot Extension」说的是已死产品。

**官方文档**：[About GitHub Copilot plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)

---

## MCP（Model Context Protocol）

**是什么**：一个开放标准协议，定义 AI 应用如何与外部工具、数据源通信。实现一次 MCP 服务器，所有支持 MCP 的 AI 宿主都能用。

**为什么 Copilot 押注它**：这不是猜测，是官方在退役 Copilot Extensions 的[公告](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps/)里写明的理由——Extensions 只能在 Copilot Chat 里用，工具开发者想接入其他 AI 助手就得重写一遍；MCP 让"建一次，跨宿主复用"成为可能。

**在 Copilot 里怎么体现**：MCP 服务器提供的能力以**工具**形式出现，用 `#` 语法引用，和内置工具无差别。管理侧支持组织级的启用/禁用/白名单策略。

**官方文档**：[关于 MCP](https://docs.github.com/en/copilot/concepts/context/mcp)

---

## Cloud agent

**是什么**：在 GitHub 云端后台运行的 Copilot agent。你在 Issue 或网页端派一个任务，它自己开分支、改代码、跑验证，最后开一个 Pull Request 给你审。

**和 Chat 的 Agent 模式的区别**：

| 维度 | Chat 的 Agent 模式 | Cloud agent |
|------|-------------------|-------------|
| 跑在哪 | 你本地的编辑器 | GitHub 云端 |
| 你要不要盯着 | 要（工具调用需要你审批） | 不要，跑完通知你 |
| 产出 | 工作区里的改动 | 一个 Pull Request |
| 适合 | 需要你随时介入的探索性任务 | 边界清楚、能一句话说完的任务 |

**为什么需要它**：本地 agent 占着你的编辑器和注意力。「把这 30 个文件里的旧 API 调用换成新的」这类任务，边界清楚但耗时，扔到云端后台跑、回头审 PR 更划算。

**注意它曾叫 "coding agent"**：官方文档已改称 cloud agent，旧资料里的 "Copilot coding agent" 指的是同一个东西。

**2026-04-01 能力扩展**（[changelog](https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/)）：不再限于「一定开 PR」。它可以先调研仓库、先出计划等你批准、只在分支上改到你点 Create pull request。付费计划可用；Business / Enterprise 需管理员启用。

**官方文档**：[About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)

---

## Copilot app

**是什么**：面向 agent 开发的桌面应用。它架在 Copilot CLI 上，在一个窗口里提供并行 agent 会话、GitHub Issues / pull request，以及定时自动化。

**和 IDE Chat / CLI 的区别**：

| 维度 | IDE Chat | Copilot CLI | Copilot app |
|------|----------|-------------|-------------|
| 在哪 | 编辑器里 | 终端 | 独立桌面窗口 |
| 并行 | 默认一次一个对话 | 一个终端一个会话 | 一等公民的并行工作区 |
| 适合 | 你已经在改文件 | 你住在 shell 里 | 你要指挥多个 agent，不想待在 IDE |

**可用性**：所有 Copilot 计划。Business / Enterprise 需要保持 Copilot app 策略开启（默认开，且和 Copilot CLI 策略是两条）。

**官方文档**：[About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)

---

## Copilot Spaces

**是什么**：把一组相关的上下文（仓库、文件、自由文本、附件）打包成一个命名的"空间"，之后针对这个空间提问，Copilot 始终带着这批上下文。

**为什么需要**：自定义指令解决"项目级恒定约束"，Spaces 解决"某个专题的知识包"——比如「我们的支付域」包含 3 个仓库、1 份架构文档、1 份术语约定。这批上下文不该塞进全局指令（和其他任务无关），但每次手动引用又太累。

**官方文档**：[关于 Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces)

---

## Copilot CLI

**是什么**：在终端里运行的 Copilot agent。注意这里有**两套东西，别混**：

| | 旧：`gh copilot` | 新：`copilot` |
|---|---|---|
| 形态 | `gh` CLI 的扩展 | 独立可执行程序 |
| 装法 | `gh extension install github/gh-copilot` | `npm install -g @github/copilot` 等 |
| 能力 | 只有 `explain` / `suggest` 两个动作 | 完整交互式 agent：读写文件、跑命令、调 MCP、装插件 |
| 交互 | 一问一答 | 持续会话，有权限模式、斜杠命令、会话恢复 |

**为什么会有两套**：`gh copilot` 是早期的轻量试水，定位是"帮我想命令"；独立 `copilot` 是把完整 agent 能力搬进终端。官方已将前者标为 retired。今天讲"Copilot CLI"只指后者。

**关键概念——权限模式**：CLI 的 agent 会真的跑命令、真的改文件，所以有分级授权（默认询问 / 辅助 / 全部允许），并支持按命令和路径配置允许与拒绝规则。这是它和"聊天工具"最本质的区别：它有副作用。

**完整命令、flag、快捷键**：见 [Cheatsheet · Copilot CLI](./copilot-cheatsheet#copilot-cli)。

**官方文档**：
- [安装 Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli)
- [CLI 命令参考](https://docs.github.com/en/copilot/reference/cli-command-reference)

---

## AI credits 与配额

**是什么**：Copilot 的用量计费单位。每个付费计划包含一定额度的 GitHub AI credits，高消耗功能（Chat、CLI、agent、代码审查等）消耗额度，基础代码补全在各计划内有独立的额度规则。

**为什么要理解它**：它直接决定"我能不能随便用 Agent 模式"。补全几乎免费，agent 类操作按实际用量扣——这解释了为什么"能用补全解决就别开 agent"不只是效率建议，也是成本建议。

**注意计费模型正在迁移**：官方计划页把基于请求数的 premium request 计费标注为 legacy，当前口径是 AI credits。旧教程里的"每月 X 次 premium requests"是过时说法。

**Business 与 Enterprise 的额度池**（官方企业计划页）：Business 每用户 **1,900** credits，Enterprise **3,900**，在组织内池化。见 [Cheatsheet · 计划对照](./copilot-cheatsheet#计划对照)。

**官方文档**：[Copilot 计划](https://docs.github.com/en/copilot/get-started/plans)

---

## 已退役或已改名的概念

Copilot 迭代快，下面这些说法你很可能在旧教程（包括本站的旧版 Copilot 单文件）里见过，**今天已经不适用**：

| 旧说法 | 现状 | 替代 |
|--------|------|------|
| **Copilot Workspace**（GitHub Next 技术预览） | 已于 **2025-05-30** 日落，原文在 [GitHub Next](https://githubnext.com/projects/copilot-workspace/) 与 [sunset 说明](https://gh.io/copilot-workspace-sunset) | 「从 Issue 描述产出 PR」现由 Cloud agent 承载 |
| **GitHub Spark** | **2026-08-04** 起不再接受新用户、不能新建应用；已有应用须在 **2026-08-31** 前导出。[Changelog](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/) | 改到 IDE、Copilot CLI 或 Copilot app 里做。已部署的 Spark 应用会继续跑 |
| **Copilot Extensions**（GitHub App 形态） | 已于 2025-11-10 完全日落，[官方公告](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps/) | MCP 服务器。注意 **VS Code 客户端侧的 Chat 扩展仍然支持**，公告明确排除了这一类 |
| **`@workspace`** | 已不在 VS Code 参与者清单中 | 代码库检索下沉为工具，Agent 模式自动调用；需显式指定时用 `#search`（含 `/codebase`） |
| **`@regex`** | 未在官方清单中找到，疑为早期社区扩展贡献 | 直接在 Ask 模式提问即可 |
| **`#editor` / `#git` / `#vscodeAPI`** | 已不是独立变量 | 分别归入 `#read`（编辑器内容）、`#search`（`/changes` 看改动）、`#vscode`（`/VSCodeAPI`） |
| **`/new-from`** | 未在任何官方清单中找到，**旧文档此条为误写** | 建项目用 `/new`，建 notebook 用 `/newNotebook` |
| **`/runCommand`** | 不再是斜杠命令 | 归入 `#vscode` 工具集下的 `/runCommand` 工具 |
| **Custom chat modes** | 概念已更名 | 自定义 Agent（Custom agents） |
| **Copilot coding agent** | 已更名 | Cloud agent |
| **`gh copilot` 是 Copilot 的命令行形态** | [官方已标 retired](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli) | 独立 `copilot` CLI |
| **Premium requests 按次配额** | 官方计划页标为 legacy | AI credits |
| **`docs.github.com/zh/enterprise-cloud@latest/...` 链接** | 大量已失效或重定向 | 统一用 `docs.github.com/en/copilot/...` |

<!-- TODO: 待核实 —— 旧文档快捷键表中的「Shift Tab 按行补全」「⌘→ 按词补全」「⌃Enter 显示所有建议」「⌥] / ⌥[ 切换建议」四项，在当前 VS Code Copilot 功能参考的键位清单中未找到官方说明，已从 cheatsheet 的快捷键表中移除而非保留 -->

---

## 相关页面

- [Copilot 主教程](./copilot) — 装什么、怎么起步、四种界面怎么用
- [Copilot Cheatsheet](./copilot-cheatsheet) — 快捷键/命令/配置/计划/数据源速查
- [实战 Cookbook](./copilot-cookbook) — 场景化提示模式与工作流
