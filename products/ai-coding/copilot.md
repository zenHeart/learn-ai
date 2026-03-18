# copilot

## 概览

本指北用来提升 copilot 使用功力，向 10x 工程师更进一步!!!

## 核心概念

### [GitHub copilot](https://github.com/features/copilot)

GitHub Copilot 是微软推出的 AI 开发辅助工具，主要面向广大工程师，基于大语言模型提供辅助代码编写的能力。通过 IDE 插件的方式嵌入到开发日常工作流、基于项目代码和注释辅助代码生成。

本质上 copilot 就是在 ChatGPT 能力上结合 GitHub 仓库数据实现的计算机领域的专家模型，配合 IDE 插件能力，提供了丰富的交互方式来辅助开发完成编程任务。进一步理解 copilot 工作原理可以参考此文档 [How GitHub Copilot is getting better at understanding your code](https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/)

微软在自家多种产品上集成了 copilot 能力，本文我们重点讨论 GitHub copilot 在 IDE 中的能力使用，后续提及 copilot 的地方均指 GitHub copilot, 后续不赘述

### [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering)

在理解 Prompt engineering 之前，需要先明白什么是 **Prompt** ，

**Prompt** 就是你传递给语言模型的输入，而 Prompt engineering 就是如何编写输入来使模型更好的执行你的指令的实践。此外为了使模型更好的理解你的问题，通常提供额外的上下文给模型，这称之为 **Context。** 理解了这些核心概念，我们可以进一将上述概念在 copilot 语境下解释为如下含义。

| 角色 | **Prompts** | **Prompt engineering(PE 工程)** | **Context** |
| --- | --- | --- | --- |
| 开发人员(developer) | 项目代码块或代码行代码注释
提供给 copilot 生成代码建议 | 通过优化代码或注释来辅助 copilot 生成更好代码建议 | 通过插件提供的 participant、命令等能力，来注入的额外信息，辅助 copilot 生成期望的输出 |

表格出处参考 [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/#whats-a-prompt-and-what-is-prompt-engineering)


### 模式

在日常使用中存在如下模式

**Ask 模式：**

- 类似对话助手或“结对编程”伙伴。
- 你可以实时提问、获取解释或请求建议。
- 示例场景：
  - 理解难点概念：“JavaScript 中 let、const 和 var 有什么区别？”
  - 获取代码帮助：“你能解释下这个 JavaScript 函数的作用吗？”
- 适用于需要快速解答或指导，但不直接修改代码的场景。

**Edit 模式：**

- 对代码修改有更细致的控制。
- 你可以选择允许 Copilot 修改的文件，预览建议的更改，并决定是否接受或放弃。
- 示例场景：
  - 重构代码：“重构 calculateTotal 函数以提升可读性。”
  - 调试问题：“login 函数运行不正常，能帮忙调试下吗？”
- 适用于对特定文件或代码片段进行受控更新的场景。

**Agent 模式：**

- 允许 Copilot 自动编辑代码并执行任务。
- Copilot 会自主决定修改哪些文件，建议终端命令，并多步迭代完成任务。
- 示例场景：
  - 自动化复杂任务：“将代码重构为多个函数以提升可读性。”
  - 执行测试或安装依赖：“为 payment-processing 模块运行所有测试和 linter。”
- 适用于需要多步骤或外部集成的复杂任务。

具体内容详见

* [ask 模式](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/choosing-the-right-ai-tool-for-your-task#using-copilot-chat-in-ask-mode)
* [edit 模式](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/choosing-the-right-ai-tool-for-your-task#using-copilot-chat-in-edit-mode)
* [agent 模式](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/choosing-the-right-ai-tool-for-your-task#using-copilot-chat-in-agent-mode)


### 自定义上下文

在 AI 交流中，对于经常使用的 prompt, 或者需要频繁强调的限制条件，都可以通过 **自定义上下文** 来实现。
对于经常使用的 prompt, 可以像代码片段一样进行复用，vscode 详见 [prompt.md](https://code.visualstudio.com/docs/copilot/copilot-customization) 

从指令的应用范围，使用方式，vscode 提供了如下三种策略

* **custom instructions** 项目级别上下文控制，作用于所有聊天
* **prompt files** 复用的 prompt
* **custom chat modes** 自定义聊天的上下文

#### custom instructions

支持如下方式设置全局自定义指令


| Custom instructions type | Description |
| --- | --- |
| .github/copilot-instructions.md | 用 Markdown 描述代码生成指令。所有指令集中在一个文件，存储在工作区内，每次聊天请求自动包含，适用于所有支持 Copilot 的编辑器和 IDE。用于定义通用编码规范、首选技术和项目通用要求。 |
| .instructions.md files | 用 Markdown 描述代码生成指令。可在工作区或用户配置中创建一个或多个指令文件，支持使用 glob 模式自动包含全部或特定文件的指令，仅支持 VS Code。适合需要任务特定指令和更灵活控制指令包含时使用。 |
| VS Code settings | 在 VS Code 用户或工作区设置中指定指令，可在设置值或文件中定义。仅支持 VS Code，支持代码生成、测试生成、提交信息、代码评审、PR 标题和描述等任务。适合定义除代码生成外的其他任务指令。 |


#### Prompt file structure

prompt 用于解决提示词的复用问题，目前 vscode 支持

* `.github/prompts/*.prompt.md` 文件 , 适用于项目范围
* `.prompt.md` 文件，适用于用户范围, 跨项目，存储在 [profile](https://code.visualstudio.com/docs/configure/profiles)，用户空间的 prompt 支持同步，更详细的控制参考 [集中管理 prompt](https://code.visualstudio.com/docs/copilot/copilot-customization#_centrally-manage-instructions-and-prompt-files-in-vs-code)

:::tip

为了实现和 cursor rule 复用，你可以采用 [chat.promptFilesLocations](vscode://settings/chat.promptFilesLocations) 设置来指定 prompt 文件位置

:::

prompt 文件的结构如下

```markdown
---
mode: 'agent'
tools: ['githubRepo', 'codebase']
description: 'Generate a new React form component'
---
Your goal is to generate a new React form component based on the templates in #githubRepo contoso/react-templates.

Ask for the form name and fields if not provided.

Requirements for the form:
* Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
* Use `react-hook-form` for form state management:
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
* Create reusable validation schemas in separate files
* Use TypeScript types to ensure type safety
* Customize UX-friendly validation rules

```

* **配置头部** 用于定义 chat 的工作模式等
  * **mode**, 详见 [mode](#模式)
  * **tools**, 需要使用的工具列表
  * **description**, 用于描述 prompt 的功能
* **提示内容**，用于描述具体的提示内容，支持 markdown 语法, 在 md 中可以使用变量语法来注入动态信息，也支持文件链接或者， [聊天变量](#聊天变量) 的方式注入上下文， 此外 prompt 支持相互引入，来组合逻辑。

设置完 prompt 后再 chat 窗口，通过 [斜杠命令](#斜杠命令) 换取对应的自定义 prompt, 可以通过类似 `/create-react-form: formName=MyForm.` 注入参数

:::tip 

完成 prompt 文件后，可以通过顶部播放按钮来调试 prompt 效果

:::


#### settings

相关配置详见 [copilot settings](https://code.visualstudio.com/docs/copilot/copilot-customization#_settings)


## 场景详解

### 内联模式

辅助代码生成

重构、修复错误代码

解释代码

添加代码注释

生成测试用例

### 终端模式

解释命令

生成命令

修正命令

### Chat 模式

通过 **⌃⌘I** 唤起 copolit 插件聊天窗口，

### 聊天参与者(participant)

限制提示范围，目前支持的参与者

| **参与者** | **功能** | 示例 |
| --- | --- | --- |
| **@workspace** | 注入项目上下文，辅助 copilot 理解项目文件关系 | @workspace add form validation, similar to the newsletter page |
| **@vscode** | 注入 vscode 本身的命令和功能上下文，辅助 copilot 执行关联 IDE 相关操作 | @vscode tell me how to debug a node.js app@vscode how do I change my Visual Studio Code colors@vscode how can I change key bindings |
| **@terminal** | 注入 terminal 啥下文，辅助 copilot 执行终端相关命令操作 | @terminal find the largest file in the src directory@terminal #terminalLastCommand 解释上一个命令以及任何错误 |
| **@github** | 注入 terminal 啥下文，辅助 copilot 执行终端相关命令操作 |  |
| **@regex** | 注入正则逻辑，辅助 copilot 处理正则相关功能 |  |

### 斜杠命令

使用斜杠命令简化 prompt 的场景信息注入

| **参与者** | **功能** | **示例** |
| --- | --- | --- |
| /doc | 注释文档 | ts 申明的类型上使用 doc 添加 jsdoc 注解 |
| **/explain** | 解释所选代码 |  |
| **/fix** | 为所选代码中的问题提供修复建议 |  |
| **/tests** | 为所选代码生成单元测试 | /tests/tests using the Jest framework/tests ensure the function rejects an empty list |
| **/new** | 创建新文件 | /new react app with typescript/new python django web application/new node.js express server |
| **/new-from** | 创建正则 | newNotebook retrieve the titanic dataset and use Seaborn to plot the data |
| **/runCommand** | vscode 运行命令 |  |
| **/search** | 搜索项目 |  |
| **/newNotebook** | 创建笔记 |  |
| **/help** | 帮助信息 |  |
| **/clear** | 开始新聊天 |  |

### 聊天变量

使用聊天变量在提示中包含特定上下文。支持的变量包括

| **参与者** | **功能** | **示例** |
| --- | --- | --- |
| **#file** | 包含特定文件上下文 | #file:gameReducer.js #file:gameInit.js how are these files related |
| **#selection** | 包含选中区块上下文 |  |
| **#editor** |  |  |
| **#terminalLastCommand** |  |  |
| **#terminalSelection** |  |  |
| **#vscodeAPI** |  |  |
| **#git** |  | 更详细使用参考 [github copilot](https://docs.github.com/zh/enterprise-cloud@latest/copilot/using-github-copilot/asking-github-copilot-questions-in-githubcom) |

进一步阅读参见 [copilot-chat](https://code.visualstudio.com/docs/copilot/copilot-chat)

## 通用原则

### prompt 原则

首先需要对 PE工程的常用概念和技巧有理解，这里推荐如下材料

[A Beginner's Guide to Prompt Engineering with GitHub Copilot](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp) 为不了解 copilot 和 PE 工程的人提供一个快速熟悉相关知识的说明

[PE 工程](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction) 吴恩达和 ChatGpt 工程师联合推出的关于 ChatGPT 提示词编写的最佳实践

这里做一些简单总结并结合 copilot 场景做一些特定说明

### 简单任务处理

采用 3S 编写 prompt，Simple(简洁),Specfic(清晰),Short(精炼)

保证 prompt 的清晰

### 复杂任务处理

先预设背景，在逐步拆解

### context 注入

通过利用 participants、命令等技巧为撰写提示此提供更多的上下文

打开关联的文件辅助 copilot 分析已打开的 tab 辅助生成相关逻辑

进一步阅读 [copilot prompt](https://docs.github.com/zh/enterprise-cloud@latest/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

### 安全策略

检查生成的代码，不要过份依赖

利用自动化测试检测代码

## 其他说明

### 快捷键

| **功能块** | **快捷键** | **功能** | **备注** |
| --- | --- | --- | --- |
| **代码补全** | **Tab** | 自动补全代码 |  |
|  | **Shift Tab** | 按行补全代码 |  |
|  | **⌘→** | 按词补全代码 |  |
|  | **Esc** | 拒绝补全提示 |  |
|  | **⌃Enter** | 显示所有提示建议 |  |
|  | **⌥ ]** | 切换下一个提示 |  |
|  | **⌥ [** | 切换上一个提示 |  |
| **窗口唤起** | **⌘I** | 内联窗口 | 在终端和编辑文件内均可触发 |
|  | **⌃⌘I** | 左侧聊天窗 |  |
|  | **Shift⌘I** | 悬浮聊天窗 |  |

### copilot 扩展

可以通过 vscode 插件机制在 copilot 中添加自定义扩展，参考 [cat 扩展示例](https://vscode.js.cn/api/extension-guides/chat) 理解相关操作

[copilot extension](https://docs.github.com/zh/enterprise-cloud@latest/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat)

[构建扩展](https://docs.github.com/zh/enterprise-cloud@latest/copilot/building-copilot-extensions/about-building-copilot-extensions)

### copilot cli

详见 https://docs.github.com/zh/enterprise-cloud@latest/copilot/using-github-copilot/using-github-copilot-in-the-command-line

首先确保安装了 gh 并且配置了 token ，详见 [prerequisites](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line#prerequisites)

常用命令

```
# 解释命令含义
gh copilot explain "sudo apt-get"

# 建议的命令
gh copilot suggest "Undo the last commit"

```

设置快捷方式 ，详见 [cli alias](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-the-cli#setting-up-aliases),  设置完成后上述名利等效为

```
# 表示 gh copilot explain "sudo apt-get"
ghce "sudo apt-get"

# 表示 gh copilot suggest "Undo the last commit"
ghcs "sudo apt-get"

```

### 调试

[copilot vscode 匹配日志](https://docs.github.com/zh/enterprise-cloud@latest/copilot/using-github-copilot/finding-public-code-that-matches-github-copilot-suggestions)

[常见问题](https://docs.github.com/zh/enterprise-cloud@latest/copilot/troubleshooting-github-copilot/troubleshooting-common-issues-with-github-copilot)

## 参考资料

[github copilot](https://docs.github.com/zh/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/customizing-copilot-for-your-organization/managing-copilot-knowledge-bases)

[vscode copilot docs](https://code.visualstudio.com/docs/copilot/overview)

[vscode copilot extension](https://code.visualstudio.com/docs/copilot/overview)

[github copilot series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt)