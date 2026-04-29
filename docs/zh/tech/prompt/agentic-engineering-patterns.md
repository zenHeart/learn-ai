# Simon Willison's Agentic Engineering Patterns 深度解析

> 来源：[Simon Willison - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)
> 作者：Simon Willison（著名技术博主，Datasette 作者）
> 整理时间：2026-04-12

## 前言：为什么这篇文章值得细读

Simon Willison 是我长期关注的技术作家。他的文章有一个鲜明特点：**不是告诉你"怎么做"，而是帮你理解"为什么这样做"**。

Agentic Engineering Patterns 这套指南于 2026 年 2 月开始连载，是目前关于 AI Coding 实践最系统、最有深度的免费资源之一。与其他泛泛而谈的"AI 编程指南"不同，Willison 本人就是 Claude Code、OpenAI Codex 等工具的深度用户，他的每一个 pattern 都来自真实项目的第一手经验。

**这篇文档的目标**：不是翻译或摘要，而是以第一性原理的视角，深度解析每个 pattern 背后的工程思维，以及它们如何重塑我们对"软件工程"这件事的理解。**

## 一、重新定义"Agentic Engineering"

### 1.1 什么是 Coding Agent

Willison 给出了一个极简但精准的定义：

> **Agents run tools in a loop to achieve a goal**

这句话拆解开来，每个词都精确：

- **Tools**：Agent 拥有可调用的工具（不只是 LLM 输出文本）
- **Loop**：反复执行，直到目标达成
- **Goal**：有明确的目标导向
- **Agents**：不是"助手"，是能自主决策的软件系统

关键区分在于"code execution"——Coding Agent 能**执行代码**，这让它与普通 LLM 对话有本质区别。LLM 输出代码，只是文本；Coding Agent 输出代码，并运行它、验证它、迭代它。

### 1.2 "Agentic Engineering" 不是什么

Willison 专门用一节区分了 **Agentic Engineering** 和 **Vibe Coding**：

| 概念 | 定义 | 本质 |
|------|------|------|
| **Vibe Coding** | "让 LLM 写代码，同时你忘记代码的存在" | 放弃理解，把代码当黑箱 |
| **Agentic Engineering** | 用 coding agent 辅助开发，但人始终是质量把控者 | 人机协作，工程化实践 |

这是对 Andrej Karpathy "Vibe Coding" 概念的有力回应：Vibe Coding 作为**原型探索**是合理的，但它不等同于"用 AI 写代码"的全部。

**关键洞察**：Coding Agent 降低的是"**打字成本**"，而不是"**软件工程的认知成本**"。理解代码、设计架构、评估取舍——这些仍然是人的核心职责。

## 二、第一性原理：代码变便宜了，然后呢？

### 2.1 一个被低估的认知转变

Willison 在 "Writing code is cheap now" 中指出：

> Coding agents dramatically drop the cost of typing code into the computer, which disrupts so many of our existing personal and organizational intuitions about which trade-offs make sense.

这是全文最核心的一句话。它揭示了一个深刻的事实：**我们大量工程习惯是建立在"代码昂贵"这个隐含假设上的**。

### 2.2 这些习惯需要被颠覆

当代码成本趋近于零，以下旧习惯需要重新审视：

**宏观层面**：
- "这个功能值不值得开发"——现在可以用 agent 快速验证后再决定
- "不要过度设计"——如果过度设计的成本也趋近于零呢？
- "先规划，再编码"——规划阶段的探索性编码现在几乎免费

**微观层面**：
- "这个函数要不要重构成更优雅的写法"——现在可以让 agent 在后台异步完成
- "这个边界情况要不要写测试"——agent 写测试几乎零成本
- "这段代码要不要加注释"——agent 可以自动生成文档

### 2.3 "好代码仍然有成本"

Willison 没有陷入"代码免费 = 代码不重要"的误区。他明确指出：**交付代码 ≠ 交付好代码**。

好代码的标准：
- 代码能工作（works）
- **我们知道**代码能工作（we know it works）——通过验证，而非假设
- 解决了正确的问题
- 处理错误情况优雅且可预测
- 简单且最小化
- 有测试保护
- 有文档且文档反映当前状态
- 设计支持未来变更

**核心张力**：交付新代码的成本几乎为零，但交付"好代码"的成本依然显著。Agent 可以帮你写代码，但**质量的责任仍在你**。

## 三、核心工程模式

### 3.1 Hoard Everything——知识囤积策略

Willison 最独特的洞见之一：**构建软件的技能很大程度上取决于你知道什么是可能的、以及如何实现**。

这听起来朴素，细想极其深刻——工程师的价值不在于能从零发明算法，而在于"见过足够多的解决方案"。当你见过足够多，你就能在新问题出现时快速识别"这个问题像上次遇到的 X，可以用 Y 方案解决"。

#### 3.1.1 囤积的正确姿势

不是收藏文章链接，而是**带可执行证据的解决方案**：

- **Blog + TIL（Today I Learned）**：记录"如何做到某件事"的笔记
- **GitHub 仓库**：收集代码片段，特别是小型概念验证（proof-of-concept）
- **工具集合**：单 HTML 文件解决特定问题的工具库
- **研究仓库**：更大的研究项目，包含代码和详细报告

#### 3.1.2 为什么这对 Coding Agent 特别有价值

最有力的例子：Willison 用两个已有代码片段（PDF.js + Tesseract.js），通过一个 prompt 生成了一个浏览器端 OCR 工具。他没有从零学习两个库的 API，而是直接告诉 agent："把这两个组合起来"。

**关键洞见**：Coding Agent 意味着我们**只需要想出一个有用的技巧一次**。如果这个技巧被记录在某处（有代码示例），我们的 agent 以后可以查阅并用于解决任何类似问题。

#### 3.1.3 重组（Recombination）的力量

```
新问题 + 已知解决方案 A + 已知解决方案 B → 新工具
```

这是工程创造力的本质，不是发明，而是**组合**。

### 3.2 Compound Engineering Loop——复利工程循环

Every 公司的 Dan Shipper 和 Kieran Klaassen 提出"Compound Engineering"概念，被 Willison 采纳：

> 每个编码项目完成后，进行复盘（retrospective），将经验文档化供未来 agent 使用。

这个循环的精妙之处：
- **短期**：每次任务学到的经验被积累
- **长期**：agent 的提示词和工具配置不断改进
- **复利效应**：每次改进都让下一次更好

**类比**：就像 TDD 每次测试覆盖保护未来重构，Compound Engineering 每次复盘都在改进未来 agent 的表现。

### 3.3 异步 Agent——后台并行工作流

Willison 大量使用异步 coding agent（Gemini Jules、OpenAI Codex web、Claude Code on the web）在后台处理重构任务，而他在本地继续其他工作。

这彻底改变了工程工作的组织方式：
- 一个 agent 在后台做 API 重构
- 另一个在做测试覆盖
- 人在做需要深度思考的设计决策
- 最终在 PR 中评估 agent 的产出

**关键变化**：从"人按顺序做 A、B、C"，变成"人指挥多个 agent 并行做 A、B、C"。

## 四、反模式——Agentic Engineering 中绝对要避免的事

### 4.1 不要向协作者强加未审查的代码

这是 Willison 最强调的反模式，措辞相当严厉：

> 如果你开了一个 PR，里面有数百行（甚至数千行）agent 生成的代码，而你本人没有确保这些代码能工作——你是在把实际工作推给别人。他们本来也可以自己 prompt 一个 agent，你到底提供了什么价值？

这句话击中了要害。当"用 AI 写代码"变得容易，最大的危险不是 AI 写得差，而是人**放弃了本应承担的工程责任**。

### 4.2 高质量 PR 的标准

一个合格的 agentic engineering PR 具有以下特征：

1. **代码能工作**，且你对此有信心（"Your job is to deliver code that works"）
2. **变更足够小**，不会给审查者造成过大认知负担。几个小 PR 远好于一个大 PR
3. **包含额外上下文**：更高层的目标是什么，为什么要做这个变更
4. **PR 描述也经过审查**：agent 写的 PR 描述看起来很专业，但你仍然需要读它
5. **有手动测试的证据**：截图、视频、或手动测试的笔记——证明你真的验证过

**Willison 的建议**：包含一些"你确实做过工作"的证据，比如手动测试记录、具体实现决策的注释，甚至是功能运行效果的截图和视频。

## 五、Coding Agent 内部原理——为什么理解它能帮你用得更好

### 5.1 LLM 本质：Token 预测机器

Willison 简洁地解释了 LLM 的工作原理：
- LLM 是**根据概率预测下一个 token** 的机器
- 输入是 token 序列，输出是 token 序列
- "thinking" 或 "reasoning" 只是在生成更多 token 来"推理"，而不是真正的思考

理解这一点非常重要，因为它解释了很多 LLM 的行为：
- 为什么长上下文会让模型"遗忘"早期信息（注意力机制限制）
- 为什么"说不要做什么"不如"说应该做什么"有效
- 为什么示例（few-shot）比纯指令更有效

### 5.2 Chat Template——对话的本质

LLM 本质上是**无状态的**：每次调用都是从零开始。为了模拟对话，软件需要维护状态并**在每次请求时重放整个对话历史**。

这导致一个关键成本结构：
- 对话越长，每条消息的输入 token 越多
- Provider 按 token 数量收费
- 所以对话越长，**每条消息的平均成本递增**

### 5.3 Token Caching——为什么 Coding Agent 要避免修改早期对话

大多数模型 provider 对缓存的输入 token 提供折扣价。Coding Agent 被设计为**尽量不修改早期对话内容**，以最大化缓存命中率。

这解释了为什么好的 coding agent session 习惯很重要：
- 保持指令简洁且不频繁改动
- 将大量信息放在 system prompt 中（只加载一次）
- 在 session 中渐进式增加上下文，而非来回修改

### 5.4 Tool Calling 的机制

```
LLM 输出特殊格式文本（如 <tool>get_weather("SF")</tool>）
  → Agent Harness 用正则提取函数调用
  → 执行工具
  → 将结果注入对话
  → LLM 继续处理
```

Coding Agent 的核心是**工具循环**。最强大的工具是能执行代码的工具（Bash、Python 等），因为这让 agent 能够验证自己的输出。

### 5.5 System Prompt——Agent 行为的源头

System prompt 是给 LLM 的指令集，告诉它"如何行为"。好的 coding agent system prompt 可能数百行，包含：
- 工具定义和使用规范
- 代码风格指南
- 工作流程建议
- 限制和边界条件

Willison 指出：[OpenAI Codex 的 system prompt](https://github.com/openai/codex/blob/rust-v0.114.0/codex-rs/core/templates/model_instructions/gpt-5.2-codex_instructions_template.md) 是一个很好的参考。

### 5.6 Reasoning——"思考" token 的作用

2025 年的一个重大进展是"推理"能力的引入。模型在回答问题之前先生成"思考 token"来推演，这类似于人类"出声思考"。

关键理解：
- 推理占用 token，但提高了复杂问题的质量
- 对调试特别有价值：模型可以在推理阶段跟踪代码调用链，找到问题根源
- 很多 coding agent 支持调节推理强度（花更多或更少时间"思考"）

## 六、Git——被低估的 Agentic Engineering 工具

### 6.1 Git 重新成为第一公民

Willison 认为 Git 对 agentic engineering 的价值被大大低估：

> Git 仓库的完整历史在你自己的机器上。历史挖掘几乎零成本。

当 agent 可以访问你的 Git 历史，它可以在几秒内：
- 了解项目结构和技术栈
- 理解最近的变更方向
- 找到类似问题的历史解决方案

### 6.2 高效 prompt 库

Willison 分享了一系列让 agent 善用 Git 的 prompt：

| 场景 | Prompt |
|------|--------|
| 让 agent 了解项目 | `Run the tests` |
| 查看最近的变更 | `What have been the recent changes?` |
| 理解 merge 策略 | `Tell me about the different ways to merge in git` |
| 修复 merge 冲突 | `I messed up my git repo - help me fix it` |
| 使用 bisect | `Help me bisect this - I think a bug was introduced recently` |

### 6.3 重写历史——从负担到工具

传统观点认为 Git 历史应该"如实记录"。Willison 提出了更激进的观点：

> 不要把 Git 历史看成"实际发生了什么"的永久记录，而是把它看成软件项目演进的**刻意讲述的故事**。

这在 agentic engineering 中特别有意义，因为：
- Agent 可以帮助重组提交，使历史更清晰
- Agent 写的 commit message 通常比人写的更好
- 可以从旧仓库提取代码创建新仓库，同时保留关键历史

### 6.4 Git Bisect——从"陡峭学习曲线"到"随时可用"

Git bisect 是一个强大的二分查找工具，但传统上需要一个可执行的测试条件，这让很多开发者望而却步。

有了 coding agent：你只需要说"我怀疑最近有个 commit 引入了这个 bug"，agent 会帮你：
- 构造合适的测试条件
- 执行 bisect
- 解读结果

从"偶一用之的工具"升级为"任何时候都可以用的调试手段"。

## 七、Subagent——管理 Context 限制的策略

### 7.1 Context 窗口的物理限制

LLM 的 context 窗口（一次能处理的 token 数量）虽有提升，但相比 AI 能力的发展速度仍然有限。顶级模型一般在 100 万 token 左右，但最佳质量通常在 20 万 token 以下。

### 7.2 Subagent 的本质

Subagent 是 coding agent 的"分身"——当一个任务太大时，主 agent 派生出新的 agent 实例来处理子任务，这个新实例拥有全新的 context 窗口。

```
主 Agent context 即将耗尽
  → 派生出 Subagent，给予新 context
  → Subagent 完成子任务，返回结果
  → 主 Agent 整合结果，继续工作
```

### 7.3 Subagent 的三种类型

1. **Explore Subagent**：主 agent 在处理任务前先派它探索代码库结构
2. **Parallel Subagent**：同时运行多个 subagent 处理相互独立的任务（加速）
3. **Specialist Subagent**：带有自定义 system prompt 或工具的专业化 subagent

### 7.4 Specialist Subagent 的实际应用

| 角色 | 功能 | 价值 |
|------|------|------|
| Code Reviewer | 审查代码找 bug 和设计问题 | 隐藏详细测试输出，减少主 agent 认知负担 |
| Test Runner | 运行大型测试套件并报告结果 | 避免冗长测试输出淹没主 context |
| Debugger | 专门调试问题，深挖代码路径 | 可以在自己的 context 中详细探索 |
| Researcher | 调研某个技术问题并返回报告 | 保持主 session 干净 |

**Willison 的忠告**：subagent 很有价值，但不要过度拆分。主 agent 完全有能力调试或审查自己的输出，只要它有足够的 token。

## 八、测试——Agentic Engineering 的基石

### 8.1 测试为什么不再是"奢侈品"

Willison 的核心论点：

> 旧的"不写测试"的借口——太耗时、太贵、在快速迭代时频繁重写——在 agent 可以几分钟内搞定测试的情况下，不再成立。

这是一个范式转变：
- **以前**：测试是投资，需要认真考虑投入产出比
- **现在**：测试是默认行为，成本可忽略

### 8.2 "First, run the tests"——四词工程纪律

Willison 发现"When I start a new session with an agent against an existing project"时，最好的开场 prompt 是：

```
First, run the tests
```

对于 Python 项目（使用 uv）：

```
uv run test
```

这四（或三）个词的 prompt 实际上涵盖了大量工程纪律：
- 告诉 agent 有测试套件存在
- 迫使 agent 学会如何运行测试
- 大概率确保 agent 未来会运行测试来验证自己的改动
- 让 agent 了解项目的复杂度和规模

### 8.3 红/绿 TDD——简洁提示的巨大威力

```
Use red/green TDD
```

Willison 指出：每个好的模型都理解这句话的含义："使用测试驱动开发，先写测试，确认测试失败，再实现代码让测试通过"。

这再次印证了 Willison 的核心哲学：**模型已经内化了大量工程纪律，关键是你用简洁的提示激活它**。

### 8.4 测试是理解代码库的最佳入口

当 coding agent 被问到某个功能的工作方式时，它的第一反应通常是**找到并阅读相关测试**。测试比代码更清晰地表达了"这个功能应该做什么"。

因此：
- **有测试的代码** = agent 更容易理解、修改、扩展
- **没测试的代码** = agent 在修改时不知道是否破坏了现有功能

## 九、Agentic Manual Testing——超越单元测试

### 9.1 为什么手动测试仍然必要

> 仅仅因为代码通过了测试，不代表代码按预期工作。

这是非常重要的一点。测试覆盖的是"你想到要测试的 case"，而手动测试能发现**你没想到的 case**。

Willison 在 landing 任何功能前，一定要亲眼看到它正常工作。这不是不信任 agent，而是工程纪律。

### 9.2 Agentic Manual Testing 的机制

根据代码类型，有不同的测试方式：

**Python 库**：
```bash
python -c "import mymodule; mymodule.test()"
```

**JSON API**：
```bash
curl http://localhost:5000/api/endpoint
```

**Web UI**：用 Playwright 或 Rodney（Willison 自己构建的 Chrome DevTools Protocol 封装）

### 9.3 Showboat——记录 agent 工作痕迹的工具

Willison 构建的 Showboat 是一个记录 agent 工作的工具：
- `note`：追加 Markdown 笔记
- `exec`：执行命令并记录输入+输出
- `image`：添加截图

最有价值的是 `exec`——它记录了"agent 做了什么"和"结果是什么"，防止 agent 写"它希望发生过"的结果。

这是对抗 agent 幻觉（hallucination）的有力工具。

### 9.4 Rodney——让 Agent 测试 Web UI

Rodney 是一个基于 Chrome DevTools Protocol 的浏览器自动化工具，专为 coding agent 设计。它的特点：
- 通过 `uvx rodney --help` 自动安装和使用
- 帮助输出包含 agent 需要的所有上下文
- 支持截图，让 agent 用自己的视觉能力评估页面外观

```bash
# 示例 prompt
Use uvx rodney --help and explore the page, take screenshots and describe what you see.
```

## 十、Linear Walkthroughs——将"经验"变成"理解"

### 10.1 认知债务问题

当 agent 写了代码，而你只是运行它而不理解它——你欠下了**认知债务**（cognitive debt）。

对于很多简单代码这不是问题，但当你的应用核心变成你不理解的黑箱时：
- 无法自信地规划新功能
- 无法推理边界情况
- 逐渐积累成阻碍速度的技术债务

### 10.2 Linear Walkthrough 的价值

让 agent 遍历代码文件，逐行解释代码做什么——这是一个**主动理解代码**的过程。

Willison 的案例：他用 vibe coding 做了一个 SwiftUI 演示应用，代码全由 Claude Code 生成，他完全没有看代码本身。之后他用 Linear Walkthrough 模式让另一个 agent 帮他梳理代码，"学习" SwiftUI 应用的结构。

**关键发现**：即使是一个 ~40 分钟 vibe coding 的玩具项目，也可以成为探索新生态和学习新技巧的机会。

### 10.3 互动解释（Interactive Explanations）

这是 Linear Walkthrough 的扩展——不只是解释代码，而是**构建可交互的动画或工具来解释概念**。

Willison 的例子：用 Claude Opus 4.6 构建了一个动画来解释词云算法（Archimedean spiral placement）。通过看动画，他真正理解了算法的工作原理，而不只是知道"它用了螺旋布局"这个描述。

## 十一、Annotated Prompts——值得学习的提示词模板

### 11.1 Artifacts 的正确用法

Willison 用 Claude Artifacts 构建原型和小型 HTML 工具。但他有一个明确偏好：

> 模型喜欢用 React，但我不喜欢 React 需要的额外构建步骤，所以我用 vanilla JS 构建 artifacts，这样我能轻松复制粘贴代码到其他项目。

这是**工具选择服从于工作流**的典型案例。

### 11.2 Proofreader 的边界

Willison 有一条硬线：

> 任何表达意见或使用"I"的文字，必须是我自己写的。LLM 可以更新代码文档，但如果什么东西要署我的名字，**我亲自写**。

这本质上是一个**责任边界**：机器可以辅助，但不能替代人的声音。

### 11.3 Podcast Highlights——复用的艺术

处理播客记录时，Willison 用 LLM 从长 transcript 中提取关键引述。这不是生成内容，而是**从已有内容中提取高价值片段**——与代码复用同一个逻辑。

## 十二、系统性总结：Agentic Engineering 的核心思维模型

### 12.1 五个最关键的心智模型

```
1. 代码打字成本趋近于零，但工程判断成本不变
2. 测试是默认行为，不是可选项
3. 人是质量把关者和架构决策者，agent 是执行放大器
4. 每次任务的经验应该被积累，让未来的 agent 更好
5. 提交未审查的代码 = 对协作者的不尊重
```

### 12.2 从"工具使用者"到"系统设计者"

传统软件工程教育强调"如何正确使用工具"。Agentic Engineering 要求的是：

- **理解 LLM 的工作原理**（token、context、reasoning）
- **理解工具 harness 的设计**（system prompt、tool calling loop）
- **设计有效的反馈机制**（测试、Showboat 记录、手动验证）
- **管理信息流**（subagent、context 窗口、缓存策略）

这是从"用工具做事"到"设计让 AI 工具高效工作的系统"的跃迁。

### 12.3 为什么 Simon Willison 的框架值得认真学

最后，我想回到一个更基本的问题：为什么 Willison 的这套指南比大多数 AI 编程资源更有价值？

**答案在于他的方法论立场**：他不只是在讲"怎么用 AI 写代码"，他在讲"在 AI 能写代码的时代，什么是软件工程的本质"。

他的每一个 pattern，都指向同一个核心问题：

> **如果机器可以执行常规任务，人应该把精力集中在哪里？**

Willison 的答案：
- 在判断力和创造力上
- 在质量把关和工程标准上
- 在理解代码和设计架构上
- 在积累经验和传承知识上

这不是一份"AI 编程入门指南"，而是一份**关于软件工程本质的深度思考**。

---

## 相关资源

- [Simon Willison - Agentic Engineering Patterns（完整指南）](https://simonwillison.net/guides/agentic-engineering-patterns/)
- [Simon Willison 博客](https://simonwillison.net/)
- [Simon Willison TIL](https://til.simonwillison.net/)
- [tools.simonwillison.net](https://tools.simonwillison.net/)（LLM 辅助工具集合）
- [Rodney - 浏览器自动化工具](https://github.com/simonw/rodney)
- [Showboat - 记录 Agent 工作痕迹](https://github.com/simonw/showboat)
- [Every - Compound Engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
