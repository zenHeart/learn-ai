# Copilot 实战 Cookbook

> 这是一份**任务导向**文档——每节解决一个具体问题，可以直接跳到你需要的那一节。要理解概念看 [术语表](./copilot-glossary)，要查参数看 [Cheatsheet](./copilot-cheatsheet)，要从零起步看 [主教程](./copilot)。
>
> 前提：已经装好 Copilot 并登录，参见[主教程](./copilot)。

## 提示原则

先补两份 PE 基础材料，读完再看下面的 Copilot 特化技巧：

- [A Beginner's Guide to Prompt Engineering with GitHub Copilot](https://dev.to/github/a-beginners-guide-to-prompt-engineering-with-github-copilot-3ibp) — 面向完全不了解 Copilot 和提示工程的人
- [ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction) — 吴恩达与 OpenAI 工程师联合课程

### 简单任务：3S 原则

**Simple（简洁）、Specific（清晰）、Short（精炼）**。

| ❌ bad | ✅ good |
|--------|--------|
| 帮我写个函数处理数据 | 写一个函数，输入是 `User[]`，按 `createdAt` 降序排序并返回前 10 条 |
| 优化下这段代码 | 把这个 `for` 循环改成 `reduce`，保持行为不变 |
| 加点测试 | 用 Jest 为 `calculateTotal` 写测试，覆盖空数组、单元素、含负数三种输入 |

左列的问题不是"太短"，是**没有可验证的完成标准**——Copilot 只能猜你要什么。

### 复杂任务：先给背景，再逐步拆解

一次性丢一个大任务，Copilot 会在你没预期的地方做决定。正确做法是**先对齐背景，再一步步走**：

```
第 1 轮：这个项目用 Next.js 15 App Router + Drizzle ORM，
        数据库是 Postgres。我要加一个用户导出 CSV 的功能。
        先别写代码，告诉我你打算改哪些文件、加哪些接口。

第 2 轮：（确认方案后）先只实现 server action，不动 UI。

第 3 轮：现在加前端触发按钮，用现有的 <Button> 组件。
```

三轮的价值在于**每轮结束你都能验证**。一轮出全部代码，出错时你不知道错在哪一步的判断。

### Context 注入：最高性价比的动作

按"见效快 → 见效慢"排序：

1. **打开相关文件**——已打开的编辑器标签页会进入上下文。改 A 模块前先把它依赖的 B 模块打开。
2. **显式引用**——用 `#file:路径` 明确指定，比"你自己找"可靠。
3. **选中代码再提问**——选中区域会自动成为上下文焦点。
4. **写自定义指令**——一次性投入，之后每轮对话都受益。见 [Cheatsheet · 自定义指令](./copilot-cheatsheet#自定义指令)。

> 判断上下文够不够的土办法：**先让它复述**。「在动手前，先用三句话说明你理解的当前实现」——它复述错了，说明上下文不够，别急着让它改代码。

### 安全策略

- **永远审查生成的代码**，尤其是涉及权限判断、SQL 拼接、加密、支付的部分。
- **用自动化测试当护栏**：先让 Copilot 写测试并确认测试本身正确，再让它改实现。反过来（先改实现再补测试）等于让它自己给自己出考题。
- **注意公开代码匹配**：需要确认某段建议是否与公开仓库高度相似时，用[官方的匹配日志功能](https://docs.github.com/en/copilot/how-tos/troubleshoot/find-matching-public-code)。

---

## 在编辑器里写代码（补全 + 行内 Chat）

代码补全适合的场景：

| 场景 | 做法 |
|------|------|
| 辅助代码生成 | 写函数签名或一行注释描述意图，等灰字出现按 `Tab` |
| 重构、修复错误代码 | 选中代码 → `⌘I` 行内 Chat → 说明要改成什么 |
| 解释代码 | 选中 → Chat 里 `/explain` |
| 添加代码注释 | 选中 → `/doc` |
| 生成测试用例 | 选中 → `/tests`，可追加要求：`/tests using the Jest framework` |

**注释驱动补全的写法**：

```ts
// ❌ bad：意图模糊，Copilot 只能猜
// 处理用户

// ✅ good：输入、输出、边界都说清楚
// 从 users 中过滤出 30 天内活跃且已验证邮箱的用户，
// 返回按 lastActiveAt 降序排序的数组
```

---

## 在终端里干活

两条路，按"要不要多轮"选：

**一次性问命令** —— 在终端里按 `⌘I` 唤起行内 Chat，或用 `@terminal`：

```
@terminal find the largest file in the src directory
```

结合上次命令的报错排查：先用 `#read` 工具集里的 `/terminalLastCommand`，让它读到你刚跑失败的那条命令。

**多轮终端任务** —— 用 [Copilot CLI](./copilot-cheatsheet#copilot-cli)：

```bash
copilot            # 启动交互式会话
```

会话里可以 `@ 文件名` 引用文件、`! 命令` 直接跑 shell、`Shift+Tab` 在 standard / plan / autopilot 之间切换。

**只想搞懂一条命令**（不需要 agent），旧的 `gh copilot` 更轻：

```bash
gh copilot explain "sudo apt-get"
gh copilot suggest "Undo the last commit"
```

---

## 让 Chat 干多文件改动

按"你有多确定"选模式（对照表见 [Cheatsheet · 模式选型](./copilot-cheatsheet#模式选型)）：

**Edit 模式的标准流程**：

1. 把要改的文件加进上下文（拖进 Chat 或 `#file:`）
2. 描述目标 + 不许动的边界：「把 `calculateTotal` 拆成三个纯函数，**不要改它的导出签名**」
3. 逐条看 diff，接受或放弃

**Agent 模式的标准流程**：

1. 先让它出计划：`/plan` 或直接说「先别改，列出你要做的步骤」
2. 确认计划，再让它执行
3. 它要跑命令时逐条审批（不确定的命令别按同意）
4. 结束后跑测试验证

> 一个反复出现的坑：Agent 模式下让它"顺手把格式也整理一下"，结果 diff 里 90% 是格式噪音，真正的逻辑改动埋在里面看不见。**一次只让它干一件事。**

---

## 复用提示文件

把"每次都要重新描述一遍"的任务存成 `.prompt.md`，之后一个斜杠命令调用。

**放哪里**（完整位置表见 [Cheatsheet · 提示文件](./copilot-cheatsheet#提示文件)）：

- 项目共享：`.github/prompts/*.prompt.md`（提交进 Git，团队共用）
- 个人跨项目：VS Code [profile](https://code.visualstudio.com/docs/configure/profiles) 里的 `.prompt.md`，支持设置同步

**结构**：frontmatter 配置 + Markdown 正文。

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
* Use `react-hook-form` for form state management
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
  * Create reusable validation schemas in separate files
  * Use TypeScript types to ensure type safety
  * Customize UX-friendly validation rules
```

frontmatter 三个字段：

- `mode` — 用哪种模式执行（`ask` / `edit` / `agent`，概念见[术语表](./copilot-glossary#ask--edit--agent-三种模式)）
- `tools` — 允许使用的工具，清单见 [Cheatsheet · 工具集](./copilot-cheatsheet#工具集与上下文引用)
- `description` — 一句话说明用途，会显示在斜杠命令列表里

**正文写法**：支持 Markdown、支持相对路径的文件链接、支持 `#` 工具引用，也支持提示文件之间相互引入来组合逻辑。

**调用**：Chat 里输入 `/文件名`，可以传参：

```
/create-react-form: formName=MyForm
```

**调试**：打开提示文件，点编辑器右上角的播放按钮直接运行，比在 Chat 里反复试快。

**从 Cursor 迁移**：已经有一批 Cursor rules 的话，用 `chat.promptFilesLocations` 设置把那个目录也纳入搜索路径，不用搬文件。

---

## 沉淀项目规范（自定义指令）

判断标准：**同一句话你在 prompt 里写过三次以上，就该写进自定义指令。**

从 `.github/copilot-instructions.md` 开始，一个文件就够用：

```markdown
# 项目约定

- TypeScript strict 模式，不允许 `any`（用 `unknown` + 类型守卫）
- 组件一律函数式 + hooks，不写 class 组件
- 状态管理用 Zustand，不引入 Redux
- 测试用 Vitest，断言用 `expect().toEqual()`，不用 `toBe` 比较对象
- 提交信息用 Conventional Commits
```

写法要点：

- **写"不要做什么"和"用哪个"，别写"要写好代码"**——后者对模型没有约束力。
- **一条一句，可验证**。"代码要优雅"没用，"函数超过 40 行就拆"有用。
- **按路径细分**时再上 `.github/instructions/**/*.instructions.md`，用 frontmatter 的 glob 限定范围（比如只对 `**/*.test.ts` 生效的测试规范）。

五类作用域的完整对照见 [Cheatsheet · 自定义指令](./copilot-cheatsheet#自定义指令)。

---

## 把任务扔到云端（Cloud agent）

适合"边界清楚、耗时、不需要你随时介入"的任务。典型用法是在 GitHub Issue 里把任务描述清楚，然后派给 Cloud agent，它开分支、改代码、开 PR，你回头审。

写任务描述的关键：**它看不到你脑子里的隐含约束**，所以要写全。

```
❌ bad：把旧的 API 调用都换掉

✅ good：
把 src/ 下所有 `fetchLegacy(` 的调用换成 `apiClient.request(`，
参数映射规则：第一个参数 url 保持不变，第二个参数 options 里的
`body` 改名为 `data`。
不要改 tests/ 目录。改完确保 `pnpm test` 通过。
```

概念与和本地 Agent 模式的区别见[术语表 · Cloud agent](./copilot-glossary#cloud-agent)。

---

## 接入外部工具（MCP）

需要 Copilot 访问你的数据库、内部 API、第三方服务时，接 MCP 服务器。接好之后它提供的工具会出现在 `#` 列表里，和内置工具用法一致。

**注意**：GitHub App 形态的 **Copilot Extensions 已在 2025-11-10 日落**，官方替代方案就是 MCP。旧教程里"用 `@扩展名` 调用扩展"的写法已失效，见[已退役概念](./copilot-glossary#已退役或已改名的概念)。

VS Code 客户端侧的 Chat 扩展（用 VS Code 扩展 API 贡献参与者/工具）**不受影响，仍然支持**，开发文档见 [Chat 扩展指南](https://code.visualstudio.com/api/extension-guides/chat)。

---

## 排查"Copilot 不好用"

按这个顺序查，绝大多数问题在前两步就解决了：

1. **上下文够不够**——相关文件打开了吗？用 `#file:` 引用了吗？写了自定义指令吗？
2. **提示清不清楚**——有没有可验证的完成标准？有没有说明不许动什么？
3. **模式对不对**——用 Ask 模式抱怨"它不改代码"属于这类。
4. **模型对不对**——不同计划可选的模型不同，复杂任务换个模型再试。
5. **才是工具问题**——这时候去查 [Cheatsheet · 常见问题排查](./copilot-cheatsheet#常见问题排查)。

---

## 相关页面

- [Copilot 主教程](./copilot) — 装什么、怎么起步
- [Copilot Cheatsheet](./copilot-cheatsheet) — 快捷键/命令/配置/计划速查
- [术语表](./copilot-glossary) — 概念解释与已退役清单
