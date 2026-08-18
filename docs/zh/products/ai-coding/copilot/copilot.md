# GitHub Copilot 上手

> 这是一份**教程型**文档——按顺序读完，你会从"装上 Copilot"到"知道四种界面各干什么、怎么把项目规范喂给它"。
>
> 遇到不认识的名词看 [术语表](./copilot-glossary)；要查快捷键和参数看 [Cheatsheet](./copilot-cheatsheet)；要按场景抄现成做法看 [Cookbook](./copilot-cookbook)。

本指南目标：把 Copilot 从"帮我补代码"用成"帮我干活"。

## 第 0 步：选订阅

Copilot 有免费档，先用起来再说：

- **Copilot Free** 免费，每月 2000 次代码补全，模型只能用自动选择。
- **学生、教师、开源维护者**通过资格验证后免费。
- 觉得额度不够再升级，各计划价格与限制见 [Cheatsheet · 计划对照](./copilot-cheatsheet#计划对照)。

一个前置事实：Copilot **在 GitHub Enterprise Server 上不可用**。公司用的是自建 GHES 的话，先确认这一点。

## 第 1 步：装上并登录

以 VS Code 为例：装 GitHub Copilot 扩展 → 用 GitHub 账号登录 → 状态栏出现 Copilot 图标即可用。

在终端里用的话另装 CLI（**注意有两套 CLI，别装错**，区别见[术语表](./copilot-glossary#copilot-cli)）：

```bash
# 独立 Copilot CLI（完整 agent，需要 Node.js 22+）
npm install -g @github/copilot
```

其他安装方式见 [Cheatsheet · Copilot CLI · 安装](./copilot-cheatsheet#安装)。

## 第 2 步：搞清它是怎么"懂你项目"的

先纠正一个最常见的误解：**Copilot 不是"ChatGPT + 你的仓库"**。

它不绑定单一模型（不同订阅可用的模型集合不同），也没有把你的仓库喂进模型训练。它靠的是**检索式上下文注入**——编辑器把当前文件、你打开的标签页、你显式引用的文件、工具检索到的结果，拼进每一次请求。

这个机制决定了你的所有优化动作：

| 你做什么 | 为什么有用 |
|---------|-----------|
| 打开相关文件再提问 | 打开的标签页会进上下文 |
| 用 `#file:` 显式引用 | 比让它自己找可靠 |
| 写自定义指令 | 每次请求自动带上，一次投入长期受益 |

反过来，"我们仓库很大所以 Copilot 肯定懂"是错的。详细解释见[术语表 · GitHub Copilot](./copilot-glossary#github-copilot)。

## 第 3 步：四种界面，各管一段

Copilot 不是一个界面，是四类入口。**选错入口是新手最大的效率损失。**

| 界面 | 在哪 | 你怎么用 | 典型任务 |
|------|------|---------|---------|
| **代码补全** | 编辑器里你打字的位置 | 打字 → 出灰字 → `Tab` | 补下一行、补样板代码 |
| **Chat** | 侧边栏 / 行内 / 终端 | 对话 | 解释、重构、多文件改动 |
| **CLI** | 终端 | 交互式 agent 会话 | 命令行任务、脚本 |
| **Cloud agent** | GitHub 网页端 / Issue | 派任务，后台跑，产出 PR | 边界清楚的耗时任务 |

### 3.1 代码补全

最简单也最容易到天花板：打字，出灰字，`Tab` 接受，`Escape` 忽略。

想让补全更准，就把意图写进注释：

```ts
// 从 users 中过滤出 30 天内活跃且已验证邮箱的用户，
// 返回按 lastActiveAt 降序排序的数组
```

比写"处理用户"有用得多——原因和写法见 [Cookbook · 在编辑器里写代码](./copilot-cookbook#在编辑器里写代码补全--行内-chat)。

### 3.2 Chat：先学会选模式

`⌃⌘I` 打开 Chat 视图，`⌘I` 在编辑器或终端里打开行内 Chat。

Chat 有三档自主程度，**这是整份文档里最需要形成肌肉记忆的选择**：

| 模式 | 它能干什么 | 选它的信号 |
|------|-----------|-----------|
| **Ask** | 只回答，不动代码 | 我要先搞懂 |
| **Edit** | 改你指定的文件，你逐条看 diff | 我知道改哪，不想手写 |
| **Agent** | 自己决定改哪些文件、跑命令、多轮迭代 | 我知道目标，不想管过程 |

判断口诀：**你能不能一眼看出它做错了。** 能 → 往 Agent 走；不能 → 退回 Edit 甚至 Ask。

深入解释见[术语表 · Ask / Edit / Agent](./copilot-glossary#ask--edit--agent-三种模式)，标准流程见 [Cookbook · 让 Chat 干多文件改动](./copilot-cookbook#让-chat-干多文件改动)。

### 3.3 给 Chat 加上下文：`@` 和 `#`

两个前缀，作用不同：

- **`@` 是参与者**——把提问限定到某个领域并注入该领域上下文。当前只有 `@github`、`@terminal`、`@vscode` 三个（加扩展贡献的）。
- **`#` 是工具与文件引用**——`#file:路径` 引用文件，`#search`、`#read`、`#execute` 这类是工具集，MCP 服务器提供的工具也在这个列表里。

```
@terminal find the largest file in the src directory
#file:gameReducer.js #file:gameInit.js how are these files related
```

> 旧教程里常见的 `@workspace`、`#editor`、`#git`、`#vscodeAPI` **已经不在官方清单里**了——代码库检索下沉成了工具，Agent 模式会自主调用。完整的已退役清单见[术语表](./copilot-glossary#已退役或已改名的概念)。

完整的参与者、工具集、斜杠命令清单见 [Cheatsheet](./copilot-cheatsheet#聊天参与者)。

### 3.4 终端：CLI

```bash
copilot            # 启动交互式会话
```

会话里 `@ 文件名` 引用文件、`! 命令` 跑 shell、`Shift+Tab` 在 standard / plan / autopilot 之间切。

它和 Chat 最本质的区别：**它有副作用**——会真的改文件、真的跑命令，所以有分级权限（默认询问 / 辅助 / 全部允许）。第一次用建议保持默认，逐条看它想跑什么。

### 3.5 云端：Cloud agent

在 GitHub Issue 或网页端派任务，它开分支、改代码、开 PR。适合"边界清楚、耗时、不需要你随时介入"的活。写任务描述的要点见 [Cookbook · 把任务扔到云端](./copilot-cookbook#把任务扔到云端cloud-agent)。

> 注意它曾叫 "coding agent"，官方已改称 cloud agent；另外 Chat 里的 **Agent 模式**跑在你本地，和 Cloud agent 不是一回事。

## 第 4 步：把重复的要求沉淀下来

到这一步你已经会用四种界面了。**真正拉开差距的是这一步**——不再每次重复描述项目约定，而是写进文件让 Copilot 自动带上。

三类机制，生命周期不同：

| 机制 | 触发方式 | 解决什么 |
|------|---------|---------|
| **自定义指令** | 自动，每次对话都带 | 恒定约束（「我们用 TypeScript strict」） |
| **提示文件** | 手动，`/名字` 调用 | 可复用的完整任务（「按模板生成表单」） |
| **自定义 Agent** | 切换到该 agent | 角色切换（「你现在是代码审查员」） |

**从一个文件开始就够**——在仓库根建 `.github/copilot-instructions.md`：

```markdown
# 项目约定

- TypeScript strict 模式，不允许 `any`
- 组件一律函数式 + hooks，不写 class 组件
- 测试用 Vitest
```

判断标准：**同一句话你在 prompt 里写过三次以上，就该写进自定义指令。**

写法要点和进阶（路径级指令、`AGENTS.md`、提示文件 frontmatter）见 [Cookbook · 沉淀项目规范](./copilot-cookbook#沉淀项目规范自定义指令) 和 [Cheatsheet · 自定义指令](./copilot-cheatsheet#自定义指令)。

## 第 5 步：接外部工具（MCP）

需要 Copilot 访问数据库、内部 API、第三方服务时，接 MCP 服务器。接好后它提供的工具出现在 `#` 列表里，和内置工具一样用。

> **重要时效提醒**：GitHub App 形态的 **Copilot Extensions 已于 2025-11-10 日落**，官方替代方案就是 MCP。旧教程里"用 `@扩展名` 调用扩展"已失效。VS Code 客户端侧的 Chat 扩展**不受影响，仍然支持**。详情见[术语表 · MCP](./copilot-glossary#mcpmodel-context-protocol)。

## 第 6 步：养成安全习惯

- **永远审查生成的代码**，尤其是权限判断、SQL 拼接、加密、支付相关。
- **用自动化测试当护栏**——先确认测试正确，再让它改实现。
- 需要确认某段建议是否与公开代码高度相似时，用[官方匹配日志](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code)。
- Agent 模式和 CLI 会执行命令，**不确定的命令别按同意**。

## 接下来

- 觉得"它老是不懂我" → [Cookbook · 提示原则](./copilot-cookbook#提示原则)
- 想查某个快捷键 / 命令 / 配置键 → [Cheatsheet](./copilot-cheatsheet)
- 看到不认识的名词，或怀疑某个说法过时了 → [术语表](./copilot-glossary)，尤其是[已退役概念](./copilot-glossary#已退役或已改名的概念)

## 参考资料

- [GitHub Copilot 官方文档](https://docs.github.com/en/copilot)
- [VS Code Copilot 文档](https://code.visualstudio.com/docs/copilot/overview)
- [VS Code Copilot 功能参考](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)
- [GitHub Copilot 系列视频](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt)

更完整的、按可信度排序的信息源清单见 [Cheatsheet · 高质量信息源](./copilot-cheatsheet#高质量信息源)。
