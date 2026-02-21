# Vibe Coding 演示项目优化建议

经过对 `01.overview.md`、`README.md` 中定义的核心目标，以及各个章节 PPT（`02.principle.md` ~ `05.QA.md`）和 `examples/` 目录下示例代码的深入分析，虽然目前项目的目录结构、知识点编排以及理论部分（如 Transformer 和 Embeddings）的推演非常清晰，但在“实战体验”与“目标契合度”上存在一定的优化空间。

以下为基于本次深入分析提出的针对性优化建议：

## 1. 为什么需要修改？ (问题发现)

根据 `README.md` 中定义的核心目标：“**学会在真实开发场景中应用 AI 工具（修复 bug、重构、写测试等），并能将其自然整合到日常工作流中。**”

目前的 `examples/` 实现侧重于**理论的命令行模拟**（Console Simulation）：
- **匹配度良好部分 (2.x)**：`2.1` 到 `2.4`（Tokenizer, Embedding, Attention, Tool Use）通过纯 TypeScript 和数学计算（如计算余弦相似度、模拟 QKV 矩阵点积归一化），非常精妙地让听众在不看底层 C 源码的情况下直观理解了 AI 的大脑是如何运作的。这部分完全匹配了 `02.principle.md` 帮助听众理解基本概念的目标。
- **匹配度不足部分 (3.x & 4.x)**：从 `3.1-agents-md` 开始，一直到 `4.3-bug-fix`，代码实现主要采用了 `console.log` 和硬编码的模拟逻辑（如模拟 `fsSimulator` 去打印创建文件、模拟大模型发现 Bug 并打印修复日志）。这导致了听众虽然“看到”了流程是怎样的，但无法在自己的 IDE 中“上手体验”真正的 AI 魔法（比如真正的 Cursor Composer 交互）。由于这是一个以“工具使用与实战”为导向的分享，缺乏真实环境互动的示例会极大削弱听众的参与感与震撼力。

## 2. 修改的目的是什么？

将 3.x（用法）和 4.x（实战）部分的示例从**“日志模拟沙盒”**转变为**“交互式实战演练场 (Interactive Playground)”**。

具体而言：
- 摒弃单纯的 `console.log`，针对每个实战环节提供一个真实的、残缺的或存在 Bug 的**可运行小工程**。
- 为这些示例补充“实操 Prompt 指南”，让听众（研发人员）能够在分享过程中，直接打开他们的 Cursor / Claude Code，跟着讲师一起输入 Prompt，亲眼见证代码被 AI 在真实文件中被修改。

## 3. 具体优化建议与好处

### 建议一：重构 3.x (用法) 的示例 —— 展示真实的上下文干预
- **修改方案**：
  - 在 `3.1-agents-md` 中，不再用代码去 `loadProjectRules()`。而是真实地在这个目录下放一个 `AGENTS.md`（要求强制使用某个冷门的时间库或指定特定的代码风格），并放一个待完成的 `index.ts`。让讲师/听众圈选文件按 `Cmd+K` 生成代码，体验生成的代码是如何被这层“隐形设定”所改变的。
  - 在 `3.2-rules-matching` 中，真实配置 `.cursor/rules/*.mdc`，让听众在不同目录下唤醒 AI，看到它遵守不同 Glob 配置下的细粒度规则。
- **好处**：化抽象为具象。开发者对 `console.log` 已经免疫，但当他们真实地看到由于加上了一个 `.md` 文件，导致 AI 写出的代码风格瞬间发生 180 度大转变时，才能真正理解 “Context Engineering (上下文工程)” 的威力。

### 建议二：重构 4.x (实战演练) 的示例 —— 引入 VDD 真实场景
- **修改方案**：
  - **4.2 VDD (验证驱动开发)**：不用 `console.log` 模拟执行。写真正使用 Jest/Vitest 驱动的测试文件（例如：测试一个复杂的包含边界情况的 `formatDate` 或 `throttle` 函数），并将对应的实现代码留空或故意写错。在分享时，让所有人执行 `npm run test`，看到红色的报错后，直接将错误堆栈抛给终端里的 Claude Code 或 Cursor，让它自动完成修复直至变绿。
  - **4.3 Bug 修复**：准备一个基于 Vue/React 或 Node.js 的真实小 Demo，制造一处由于异步竞态条件或空指针引起的线上级隐藏 Bug。提供堆栈日志，演示如何利用 AI 的横向溯源能力秒切文件出 Diff。
- **好处**：完全契合 PPT `04.practice.md` 中讲述的 “四步走红绿重构” 及 “疑难问题排查链”。能够让听众将其直接与日常的修复工作对齐，不再认为 AI 只能写玩具代码。

### 建议三：统一 Prompt 指令卡片 (Cheat Sheet)
- **修改方案**：为 `examples/` 下的所有实战任务准备配套的 `.md` 提示词小抄，明确标示出哪些指令适合丢给 IDE (Cursor)，哪些适合丢给 CLI (Claude Code/Gemini CLI)。
- **好处**：降低上手门槛。听众可以直接复制粘贴，加深对 `03.usage.md` 中介绍的不同工具边界的认识。

### 建议四：引入 “Try in Cursor” 深度链接 (Deep Link) 打通 PPT 与 IDE 联动
- **修改方案**：参考 [官方 Deep Link 文档](https://cursor.com/docs/integrations/deeplinks)，利用 Slidev 的超链接特性，在 PPT 的实战章节中直接嵌入 Cursor 专属深层链接协议（Deep Link）。
  - 一键注入 **Prompt**：在 PPT 按钮中配置链接 `cursor://anysphere.cursor-deeplink/prompt?text=Research+and+find+one+bug+in+this+codebase` 或备用 Web 链接 `https://cursor.com/link/prompt?text=...`，点击直接唤起本地 Cursor Chat 并自动填入预设的 Prompt。
  - 一键分发 **Commands 与 Rules**：使用 `cursor://anysphere.cursor-deeplink/command?name=debug-api&text=...` 或是 `cursor://anysphere.cursor-deeplink/rule?name=typescript-strict&text=...` 一键将复杂的自定义命令或架构规范推送到听众的 Cursor 环境中。
  - 一键打开源码/目录：直接利用项目真实的绝对路径（例如 `cursor://file/Users/zenheart/code/github/learn-ai/ppts/vibe-coding/examples/4.3-bug-fix`）一键打开特定的示例源码或唤醒对应目录。
- **好处**：
  - **无缝转化**：听众不再是在网页上看 PPT，而是达成“即点即编码”的心流体验。打破了讲解平台（浏览器/投影仪）和实操平台（Cursor 编辑器）之间的割裂感。
  - **演示震撼力**：演讲者点击 PPT 中的按钮，本地 Cursor 瞬间被拉起并定位到了制造了 Bug 的那一行代码，然后自动呼出 Prompt 修复，这种极具有沉浸感的交互能将 Vibe Coding “一切尽在掌握”的氛围推向高潮。

## 4. 是否能够更好地满足此次 Vibe Coding 分享的目标？

**绝对能够。**

本次演讲对象涵盖了前端、后端、C++ 等一线研发人员，他们的核心痛点不是“不懂概念”，而是“不知道怎么把它可靠地融进我每天繁杂的打杂、修复、重构中”。

1. 对于 **“正确理解 Vibe Coding”** 的目标：当前的 2.x 示例已经很好地完成了这一点，无需大改。
2. 对于 **“高效利用相关工具”** 和 **“解决实际问题”** 的目标：重构后的 3.x 和 4.x 真实演练场将完美交付这两个承诺。通过直接的 IDE 和终端交互实战（替代模拟日志），能打破听众“这只是概念炒作”的防线，让他们确信 Vibe Coding `意图定义 -> Context约束 -> AI生成 -> 人工兜底` 工作流在工程级是完全落地可用的。
