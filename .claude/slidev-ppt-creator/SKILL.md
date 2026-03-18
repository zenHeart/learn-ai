---
name: slidev-ppt-creator
description: 当用户要求创建技术 PPT、可视化讲解技术架构、进行事后复盘演示或分享工程方法论时，请使用此技能。不要只输出纯文本 Markdown；要充分利用 Slidev 的特性（如转场、代码步进、v-mark 动画、布局和组件）。
compatibility: 支持执行本地命令和编写结构化 Markdown 文件的 AI Agent
---

# Slidev PPT Creator 技能

使用此技能指导如何在 Slidev 中构建技术演讲 PPT。核心重点是让观众能够理解并应用这些概念。

## 核心工作流 (Agent Orchestration Workflow)

你作为专业的 PPT 架构师与研究员，不能仅仅依靠用户投喂素材。大部分情况下，用户只清楚大方向和预期受众，**你需要主动承担资料收集、内容提炼和架构设计的核心工作**。

请严格遵循以下 **8 步顺次执行流 (Sequential Workflow)**：

### Step 1: 需求对齐与澄清 (Clarification)

接到 PPT 生成任务后，如果用户输入的信息不足，**必须主动询问** 以下三大核心约束，切勿盲目开工：

1. **明确受众 (Audience)**：确认听众是谁 (例如：VP 关注业务价值；总监/TL 关注成本、对比与架构落地；一线工程师关注实现细节、避坑指南和原理源码)。
2. **明确目标 (Goal)**：期望听众听完后获得什么样的具体收益或核心能力？
3. **补充上下文 (Context)**：特定业务背景、公司内部环境约束或其他边界条件。

---

### ⚡ 强制模式决策 (CRITICAL - 必须在 Step 1 后立即执行)

**在你开始任何内容生成之前，你必须先回答以下问题并写入工作记忆**：

1. **这个 PPT 的核心目标是什么？**（用一句话描述）
2. **这个核心目标由几个子主题组成？**
   - **1 个子主题** → 使用 **Pattern A**（标准 5 层结构）
   - **≥2 个子主题**（如 "MCP + Skill"、"Prompt + Context"、"Vite + Vitest"） → 使用 **Pattern B**（微结构 + 收敛模型）

3. **Pattern A vs Pattern B 的选择依据**：
   - 如果主题之间是**线性递进关系**（A → B → C）→ Pattern A
   - 如果主题之间是**并行组合关系**（A 和 B 需要组合才能发挥作用）→ Pattern B

**🚨 违反规则**：如果你选择了 Pattern B 但没有生成 `02.1.xxx.md` + `02.2.xxx.md` + `03.integration.md` 结构，你将被判定为**违反架构约束**。

---

### Step 2: 深度智能研究 (Proactive Research)

在确认核心受众和目标后，**必须利用搜索工具自主进行全网或定向知识库调研**。你的搜索资料源必须覆盖：

1. **权威资料**：技术概念溯源、官方规范、白皮书或核心论文。
2. **开源生态与最佳实践**：检索 GitHub `awesome-xxx` 系列、高星项目落地实践及主流技术博客 (如 Medium, HackerNews) 的高价值讨论。
3. **头部大厂落地案例**：主动穿插搜索顶级科技公司 (AI 时代如 OpenAI, Anthropic, Google; 全栈业务如 Meta, Amazon, 阿里, 字节跳动, 美团, 百度等) 的技术博客与真实踩坑记录。

### Step 3: 核心认知萃取 (Synthesis)

基于浩如烟海的搜索结果，代表讲师进行高密度的信息降维与结构化提炼：

1. **一句话定义问题**：这项技术到底解决了什么现实痛点或填补了什么鸿沟？
2. **核心概念拆解**：抽丝剥茧梳理底层原理，把复杂的理论说人话。
3. **技术缺陷与折衷 (Trade-offs)**：客观呈现技术缺点、适用边界及核心技巧。

### Step 4: 架构映射与组合 (Structuring & Integration)

将提炼后的知识块严格映射到预设的 **[核心架构规则 (patterns.md)](assets/patterns.md)**：

**根据 Step 1 的模式决策，严格执行对应的结构**：

- **Pattern A (单一主题)**：
  - `01.overview.md` → `02.principle.md` → `03.solution.md` → `04.practice.md` → `05.QA.md`

- **Pattern B (多子主题)**：
  - `01.overview.md` → `02.1.xxx.md` + `02.2.xxx.md` → `03.integration.md` → `04.practice.md` → `05.QA.md`
  - **严禁横向生硬割裂**：必须将每个技术打包封装为独立的微结构
  - **强制收敛**：必须创建 **`03.integration.md`** 作为中间收敛章节，专门讲解这些技术联合起来后如何运转、如何产生 1+1>2 的化学反应

### Step 5: 实战经验与最佳实践 (Practice)

不要空谈理论。结合第 2 步中调研到的大厂经验或高价值实践，设计可操作的端到端演练环节 (Show me the code or visual architecture)。**强烈建议在讲解重构或修复前后代码对比时使用 Magic Move 视觉特技。**

### Step 6: 高频问题防御 (QA)

基于主流社区对该项技术的争议与疑难杂症，提前预判并准备高质量的 Q&A 及相关文献指引。

### Step 7: 执行与多文件生成 (Generation)

最终依照上述蓝图生成符合 **[内页结构铁律](assets/patterns.md)** 且包含 Slidev 语法标记的 Markdown 文件集。**特别注意：`slides.md` 中的 `src:` 路径必须与实际生成的文件名严格对齐！**

### Step 8: 自我校验与终检 (Validation Loop)

在交付给用户之前，必须打开并阅读 `assets/patterns.md` 底部的 **✅ 分享大纲质量终检 (Self-Review Checklist)**。逐一排查你刚刚生成的所有文件，确保没有任何遗漏或违规嵌套。修复一切未达标的地方。

---

### 🚨 违反 Pattern B 的即时纠正协议

**如果在终检中发现以下违规，必须立即修复**：

| 违规类型 | 错误表现 | 纠正方法 |
|---------|---------|---------|
| **缺失子主题拆分** | 只有 `02.principle.md`，没有 `02.1.xxx` | 拆分为 `02.1.xxx.md` + `02.2.xxx.md` |
| **缺失收敛章节** | 没有 `03.integration.md` | 必须创建 `03.integration.md` 讲解组合 |
| **错误的序号命名** | 使用了 `02.concepts/` 目录嵌套 | 改名为 `02.1.xxx.md` + `02.2.xxx.md` 平铺 |
| **收敛章节命名错误** | 用了 `03.solution.md` 而非 `03.integration.md` | 重命名为 `03.integration.md` |

**纠正示例**：
```
# 错误结构
02.principle.md    ❌ 只有单一文件
02.mcp.md          ❌ 序号不连续

# 正确结构 (Pattern B)
02.1.mcp-core.md   ✅
02.2.skill-core.md ✅
03.integration.md ✅
```

---

## 必须落实的 Slidev 最佳实践

在生成 Slidev markdown 时，抛弃传统的纯文本罗列，充分激发 Slidev 的“极客潜力”：

- **极简原生主义**：尽可能使用 Slidev 原生特性和原生 Markdown 描述。**绝对拒绝复杂的 `div` 嵌套逻辑**。如果涉及卡片等特殊布局描述，统一使用 Comark 语法（如 `!!steps` 等）来简化。
- **复杂流程的组件化与全屏化**：针对复杂流程图、交互演示，**严禁使用原生 HTML 堆砌**。必须采用全屏交互的 Vue 组件来描述。
  - 必须将这类复杂逻辑封装至 `components/` 目录下（如 `PairWorkflow.vue`, `VibeWorkflow.vue`）。
  - 必须配合自定义 Layout （如 `layout: full-vibe`）实现全屏布局沉浸式展示。
  - 明确示范组合语法：

    ```yaml
    ---
    layout: full-vibe
    class: p-0
    clicks: 9
    ---

    <PairWorkflow />
    ```

- **拥抱 Comark**：原生支持 Markdown 拓展，首选语法极为纯净的组合。
- **高级代码展示 (Code Highlighting & Monaco)**：
  - 第一优先使用渐进式代码步进展示源码：````ts {1|2-3|all}````。
  - 对于强互动的实战片段，加上 `{monaco}` 标签允许 PPT 内现场改代码运行。
  - 对于状态前后的代码对比（例如 Bug 修复前后），必须使用 `<MagicMove>` （或 `!!magic-move`）实现神级过渡。
- **高亮与标注**：使用 `<span v-mark.underline.yellow="1">文本</span>` 或 `<span v-mark.circle.blue="2">文本</span>` 动态标注非代码关键字。
- **布局 (Layouts)**:
  - `layout: cover` 用于入口标题页。
  - `layout: two-cols` 用于对比说明。
  - `layout: center` 用于主要的章节过渡或最终总结。
  - `layout: full-vibe` 等自定义全屏布局用于承载复杂 Vue 流程组件。
- **演讲者备忘录 (Speaker Notes)**: 在每页幻灯片的末尾添加 `<!-- 演讲者备注：... -->`。

## 项目结构与构建

### 模块化项目结构

**Pattern A (单一主题)**：
```
your-ppt/
├── slides.md              # 入口文件
├── 01.overview.md        # 概述
├── 02.principle.md       # 原理
├── 03.solution.md        # 解决方案
├── 04.practice.md        # 实战
├── 05.QA.md             # 问答
├── components/           # Vue 组件
└── examples/             # Demo
```

**Pattern B (多子主题)**：
```
your-ppt/
├── slides.md              # 入口文件
├── 01.overview.md        # 概述
├── 02.1.xxx.md           # 微结构 A
├── 02.2.xxx.md           # 微结构 B
├── 03.integration.md     # 强制收敛 (必选!)
├── 04.practice.md        # 综合实战
├── 05.QA.md             # 问答
├── components/           # Vue 组件
└── examples/             # Demo
```

### 本地预览

```bash
npm install
npx slidev  # http://localhost:3030
```

### 生产构建

```bash
npx slidev build --base /your-deployment-path/
```

> **重要**: `--base` 必须与部署后的 URL 路径一致。

## 资产与参考资料

当需要生成具体的文件或结构时，请参考以下文件：

| 文件 | 用途 |
|------|------|
| [patterns.md](assets/patterns.md) | 叙事模式与结构规则及 CheckList |
| [template-slides.md](assets/template-slides.md) | slides.md 汇总入口演示模板 |
| [template-content.md](assets/template-content.md) | 内容页基准模板 (含核心收获样式) |
| [VibeExample.vue](assets/VibeExample.vue) | 交互式组件示例代码 |
| `assets/examples/` | （强烈推荐）包含可供参考的实际场景组件代码文件集，参考以生成工作流演示组件。 |
