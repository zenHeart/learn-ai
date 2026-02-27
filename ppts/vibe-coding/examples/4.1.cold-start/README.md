# 4.1 新项目冷启动 (Cold Start)

**一句话核心**：从一段口头描述出发，用 PAIR 工作流驱动 AI **从 0 到 1 生成可运行项目骨架**。你将学会如何在执行前锁定技术栈基线，让 Agent 按模块逐步交付。

---

## 1. 概念简述

传统新项目需要手写 boilerplate、查文档、配置脚手架，耗费大量时间在与业务无关的搭建工作上。在 Vibe Coding 的 PAIR 工作流中：

- **Plan 阶段**：将口头意图转化为 `AGENTS.md`（技术栈决策）和 `blueprint.md`（架构草图），AI 即可获得明确的执行约束
- **Assess 阶段**：人工检查架构是否合理，在首行代码落地之前消除认知偏差
- **Implement 阶段**：以模块为单位（路由/状态/组件）原子化执行，控制上下文复杂度
- **Review 阶段**：每模块完成后跑 `npm run dev` 验证，确保增量可运行

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**
- 以 **`ppts/vibe-coding/examples`** 为工作区根目录打开（确保 `AGENTS.md` 等规则文件生效）

---

## 3. PAIR 操作步骤

### 🗺️ Plan — 将意图转化为结构化约束

**目标**：生成 `AGENTS.md` + `blueprint.md`，作为后续所有执行的基线。

1. 打开 Cursor / Claude Code，进入 **Plan Mode**（Cursor: `Cmd+Shift+I` → Plan 模式；Claude Code: 输入 `/think`）
2. 输入以下 Prompt（可直接复制）：

   ```text
   我想从 0 开始搭建一个前端项目，需求如下：
   - 框架：Vue 3 + Vite + TypeScript
   - 样式：TailwindCSS
   - 路由：Vue Router（含首页 / 详情页）
   - 状态：Pinia
   - 测试：Vitest

   请帮我：
   1. 生成一份 AGENTS.md，记录技术栈选型与代码规范（文件命名、组件规范、import 顺序）
   2. 生成一份 blueprint.md，包含：目录结构、核心模块列表、模块间依赖关系
   3. 将 blueprint.md 拆分为 todo.md（按模块排序的执行清单，每条一行）

   先输出计划，等我确认后再执行。
   ```

3. **预期结果**：AI 输出三份文档草案，尚未创建任何文件

---

### 🔍 Assess — 人工对齐，锁定基线

**目标**：Review `blueprint.md`，确认模块划分合理，无遗漏约束。

1. 阅读 AI 输出的 `blueprint.md`，重点检查：
   - 模块划分是否与实际需求匹配？
   - 是否遗漏了关键约束（如不允许使用 `any`、组件文件必须 `.vue` 后缀）？
   - Todo 顺序是否符合依赖关系（如路由需在组件之前）？

2. 如有偏差，回复修正指令（示例）：
   ```text
   调整几处：
   - 增加约束：所有异步请求统一走 composables/useRequest.ts 封装
   - blueprint 中缺少 ErrorBoundary 组件，请补充
   - todo.md 中将「配置 TailwindCSS」提前到第一步
   ```

3. 确认对齐后指令：
   ```text
   计划已确认，请按 todo.md 的顺序开始执行，每完成一个模块暂停，等我验收。
   ```

4. **预期结果**：AI 创建 `AGENTS.md`、`blueprint.md`、`todo.md` 三个文件，等待执行指令

---

### ⚡ Implement — 按模块原子化执行

**目标**：消耗 `todo.md` 中的每一个 Todo 节点，每次只处理一个模块。

1. 触发执行（示例 Prompt，每次只执行一个 Todo）：
   ```text
   执行 todo.md 第 1 项：初始化 Vite + Vue 3 + TypeScript 项目骨架
   ```

2. Agent 完成后，处理下一个：
   ```text
   第 1 项验收通过，继续执行第 2 项：配置 TailwindCSS
   ```

3. **执行粒度原则**：
   - ✅ 每次一个模块（路由骨架 / 状态配置 / 首页组件 / 样式配置）
   - ❌ 不要一次让 AI 完成所有步骤（上下文过长，质量下降）

4. **预期结果**：每步完成后，对应模块的文件被创建，项目可增量运行

---

### ✅ Review — 每模块验收，保障质量收敛

**目标**：每完成一个模块即验收，发现问题立即回溯。

1. 验收命令：
   ```bash
   # 在项目目录下执行
   npm run dev   # 确认无报错，可访问 localhost
   npm run type-check  # 确认无 TS 类型错误
   ```

2. 对照 `blueprint.md` 检查目录结构是否符合预期

3. **回溯触发条件**：
   - 目录结构与 blueprint 偏离 → 回溯 Plan，修正 blueprint.md
   - 出现大量 TS 报错 → 回溯 Plan，在 AGENTS.md 中补充类型约束
   - 模块间依赖混乱 → 回溯 Plan，重新拆解 todo.md

4. 全部 Todo 验收通过后，整体验收：
   ```text
   todo.md 全部执行完毕，请帮我检查：
   1. 是否所有文件都符合 AGENTS.md 中的规范？
   2. 路由是否正常跳转？
   3. 输出最终文件树
   ```

5. **预期结果**：可运行的项目骨架，结构符合 blueprint.md

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `AGENTS.md` | Plan 阶段产出：技术栈决策与代码规范 |
| `blueprint.md` | Plan 阶段产出：架构草图与模块清单 |
| `todo.md` | Plan 阶段产出：按模块排序的执行清单 |
| `4.1.cold-start/index.ts` | 演示脚本入口（辅助说明） |

---

## 5. 核心要点

- **Plan 先行**：先锁定 `AGENTS.md` + `blueprint.md`，再动第一行代码，避免"边写边想"的混乱
- **原子化执行**：每次只消耗一个 Todo 节点，防止上下文窗口负担过重
- **回溯而非修补**：发现架构偏差时，直接回溯 Plan 修正文档，而不是在错误的基础上打补丁

---

## 6. 延伸阅读

- **概念延伸**：`blueprint.md` 和 `todo.md` 是 PAIR 引擎的"执行基线"，对应 `pairV2.mermaid` 中 Plan 节点的产出物
- **官方文档**：
  - Cursor：[Composer / Agent](https://cursor.com/docs/agent/overview)
  - Claude Code：[Extended Thinking](https://docs.anthropic.com/en/docs/about-claude/models/extended-thinking)
