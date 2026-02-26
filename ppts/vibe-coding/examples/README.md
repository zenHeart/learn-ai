# Vibe-Coding 示例目录

本目录为 **vibe-coding** 分享的动手示例集合。每个示例对应一个概念或流程，让听众能直观理解「这是什么」「怎么用」，并按步骤完成操作，降低上手成本。

---

## 示例的组织目标

1. **概念补充**  
   示例是概念的具象化。每个示例都应回答「这是什么」「怎么用」，并符合 **MVP** 原则：足够简单、贴近实际场景、用最小代价说明概念或流程。

2. **步骤详细、可跟做**  
   所有操作必须是**编号步骤**且**可复制粘贴**。每一步需写清：在哪里做、具体动作、可复制的命令/文案、以及**预期结果**，让用户按步骤即可完成，减少挫败感。

3. **延伸与进一步学习**  
   每个示例都包含 **「延伸阅读」**：概念延伸说明、官方文档链接（Cursor / Claude Code）、以及可选的 `ppts/vibe-coding/tool-feature.md` 引用（L3 关键特性与工具能力矩阵）。

4. **结构一致**  
   所有示例的 README 采用**同一套模板**（见下）。便于维护，并在后续修订或新增示例时提供统一基准。

---

## 示例的组织逻辑

示例按与 vibe-coding 幻灯片的对应关系分组：

| 区块 | 主题     | 编号      | 说明 |
|------|----------|-----------|------|
| **2.x** | 原理     | 2.1～2.4 | 为何 vibe coding 成立：Tokenizer、Embedding、Attention、Tool Use。 |
| **3.x** | 特性     | 3.1～3.6 | 工具能力：AGENTS.md、Rules、Commands & Skills、MCP、Hooks、Sub-agents。 |
| **4.x** | 实战     | 4.1～4.3 | 真实工作流：冷启动、VDD（验证驱动开发）、Bug 定位与修复。 |

- 每个示例子目录命名为 **`X.Y.slug`**（如 `2.1.tokenizer`、`3.2.rules-matching`、`4.2.vdd`）。  
- 幻灯片通过 `<VibeExample id="X.Y" />` 引用示例，并按前缀 `X.Y.` 解析到 `examples/X.Y.xxx/README.md`。  
- **Demo 脚本**在本目录下通过 `npm run demo:X.Y` 运行（如 `npm run demo:2.1`、`npm run demo:4.2`）。`package.json` 中的脚本路径使用**点号**目录名（`2.1.tokenizer`，而非 `2.1-tokenizer`）。

---

## README 模板（所有示例的统一基准）

本目录下每个示例的 README 都必须按以下结构编写，以便幻灯片与读者获得一致体验。

1. **标题 + 一句话核心**  
   - 首行：`# X.Y 标题（概念名）`。  
   - 紧接下方：**一句话核心** — 用一句话说明本示例演示什么、听众将学会或完成什么。

2. **1. 概念简述**  
   - 2～4 句：为何需要该概念、在 L3 / vibe coding 中的作用；不展开长篇理论。

3. **2. 前置条件**  
   - 需要安装的工具（Node、Cursor、Claude Code 等）。  
   - **工作区根目录**：涉及规则的示例（如 3.2）需写明 Cursor 必须以 **`ppts/vibe-coding/examples`**（或对应子目录）为工作区根打开，以便正确读取 `.cursor/rules`。

4. **3. 操作步骤**  
   - 分为 **步骤 A**（运行脚本，若有）、**步骤 B**（Cursor）、**步骤 C**（Claude Code）。  
   - 每块内为编号子步骤，**可复制**的命令与 Prompt 放在代码块中，并写明 **预期结果**。  
   - 若某工具不适用，需说明（如「本示例不涉及 Cursor 操作」或「Cursor 不支持，见替代方案」）。

5. **4. 本示例涉及的文件**  
   - 可选表格：列出关键文件或目录及说明。

6. **5. 核心要点**  
   - 简短 bullet 列表。

7. **6. 延伸阅读**  
   - 概念延伸（1～2 句）。  
   - 官方文档：Cursor、Claude Code 链接（与 `tool-feature.md` 中对应特性一致）。  
   - 可选：「可结合 `ppts/vibe-coding/tool-feature.md` …」用于 L3 与工具矩阵。  
   - 若该示例另有 `prompt.md` 用于现场演示，在此注明（如「详细演示话术见本目录 `prompt.md`」）。

---

## 修订与新增示例时的基准原则

在修改或新增示例时，请遵循以下原则：

- **一示例一概念**  
  每个示例只服务幻灯片中的一节，避免在一个 README 里混入多个概念。

- **MVP 与最小路径**  
  优先用最少的步骤把概念演示清楚；可选或进阶步骤标「(可选)」或放到「延伸阅读」。

- **路径与可运行性**  
  - 所有「运行 demo」的说明均假定当前目录为 **`ppts/vibe-coding/examples`**（或你本地的仓库路径）。  
  - `package.json` 中脚本使用**点号**目录名（`X.Y.slug`）。  
  - 不要引用不存在的 demo 脚本（如 2.5～2.7 已移除；仅在有对应目录时再添加）。

- **每步必有预期结果**  
  每个步骤块（A/B/C）结尾都必须有 **预期结果**，方便用户自检、减少挫败感。

- **可复制优先**  
  命令、Prompt、配置片段一律放在代码块中，且能直接复制使用；避免「输入类似…」却不给出完整内容。

- **与幻灯片一致**  
  示例 ID 与目录名必须与幻灯片引用一致（`VibeExample id="X.Y"` 对应目录 `X.Y.*`）。若调整目录命名（如改为连字符），需同步修改 `package.json` 及相关链接。

---

## 如何运行 Demo

在本目录（`ppts/vibe-coding/examples`）下执行：

```bash
npm install   # 首次需要
npm run demo:2.1   # Tokenizer
npm run demo:2.2   # Embedding
npm run demo:2.3   # Attention
npm run demo:2.4   # Tool Use
npm run demo:3.1   # AGENTS.md（占位脚本；主体验在 IDE 中）
npm run demo:3.2   # Rules 匹配（占位脚本；主体验在 Cursor 中）
npm run demo:3.3   # Commands & Skills（权限演示）
npm run demo:3.4   # MCP
npm run demo:3.5   # Hooks
npm run demo:3.6   # Sub-agents
npm run demo:4.1   # 冷启动
npm run demo:4.2   # VDD（先跑测试得到失败输出，再把报错交给 AI）
npm run demo:4.3   # Bug 修复（启动服务得到堆栈，再把报错交给 AI）
```

部分示例（如 3.1、3.2）以 **IDE/CLI 操作**为主，脚本仅作提示；请按各示例 README 在 Cursor 或 Claude Code 中完成主要步骤。

---

## 示例共用的配置

- **`.cursor/rules/`**  
  存放 `.mdc` 规则文件（如 `react-components.mdc`、`utils-format.mdc`），供 **3.2 Rules Matching** 使用。Cursor 必须以**本 `examples` 目录**（或包含 `.cursor` 的上级目录）为工作区根，规则才会生效。

- **`.cursor/commands/`**  
  存放**项目级斜杠命令**示例（如 `review.md`），供 **3.3 Commands & Skills** 使用。以本目录为工作区打开 Cursor 后，在 Chat 输入 **`/`** 即可看到并试用。

- **`.cursor/skills/`**  
  存放**项目级 Skill** 示例（如 `security-audit/SKILL.md`），供 **3.3** 使用。每个 skill 为一个文件夹、内含 `SKILL.md`，与 Claude 的 `.claude/skills/` 格式可对照；在 Cursor Agent 中可通过 **`/security-audit`** 调用。

- **`.claude/skills/`**  
  存放 **3.3 Commands & Skills** 的 Claude Skill 示例（如 `security-audit.md`）。用户可将其复制到 `~/.claude/skills/`，在 Claude Code 中通过 `/security-audit` 调用。

---

## 参考

- 幻灯片入口：`ppts/vibe-coding/slides.md`（及引入的 `01.overview.md` … `05.QA.md`）。  
- 工具能力矩阵与 L3 标准：`ppts/vibe-coding/tool-feature.md`。  
- 示例优化计划与模板细节：见 `.cursor/plans` 中的 vibe-coding examples 优化计划文档。
