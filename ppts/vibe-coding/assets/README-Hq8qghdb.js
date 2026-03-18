const n=`# 4.3 hotfix Bug 修复 (Crash to PR)

**一句话核心**：以 Crash 堆栈 / Sentry 报告 / 业务日志为输入，用 PAIR 工作流驱动 AI **从根因分析到修复 PR** 的闭环交付。

---

## 1. 概念简述

Bug 修复的最大陷阱是"头痛医头"——在没有搞清根因的情况下直接改代码，往往修了一处又冒出新的问题。在 Vibe Coding 的 PAIR 工作流中：

- **Plan 阶段**：将 Crash 堆栈注入 AI，跨文件追踪调用链，产出 \`root-cause.md\`（根因分析）和 \`fix-todo.md\`（修复计划）
- **Assess 阶段**：人工确认根因归因是否准确、修复面是否最小化，防止过度修改引入新风险
- **Implement 阶段**：先写复现测试（固化 Bug），再修复代码，确保测试由红变绿
- **Review 阶段**：Repro Test 通过 + 全量测试无 regression，生成含根因说明的修复 PR

---

## 2. 前置条件

- 已安装 **Node.js 18+** 以及 **Cursor** 或 **Claude Code**
- 操作前请进入 \`ppts/vibe-coding/examples\` 并确保已执行 \`npm install\`
- 准备好报错信息（可用下方步骤 A 触发示例崩溃）

---

## 3. PAIR 操作步骤

### 🗺️ Plan — 注入堆栈，生成根因分析

**目标**：生成 \`root-cause.md\` + \`fix-todo.md\`，作为修复的执行基线。

#### 步骤 A：触发示例崩溃（获取真实堆栈）

\`\`\`bash
cd /path/to/learn-ai/ppts/vibe-coding/examples
npm run demo:4.3
\`\`\`

**预期结果**：终端抛出未捕获异常：
\`\`\`
TypeError: Cannot read properties of undefined (reading 'map')
    at transformUsers (src/utils/transformers.ts:12:28)
    at processResponse (server.ts:34:18)
    ...
\`\`\`

#### 步骤 B：将堆栈注入 AI，生成根因分析

1. 全选复制终端中的完整报错（含堆栈）
2. 打开 Cursor / Claude Code，进入 **Plan Mode**，输入 Prompt：

   \`\`\`text
   服务崩溃，以下是完整的错误堆栈：

   [粘贴完整堆栈]

   请帮我：
   1. 跨文件追踪调用链，找出 Root Cause（不要只看报错那一行）
   2. 生成 root-cause.md，包含：
      - 根因描述（用一句话）
      - 涉及的文件路径与行号
      - 错误触发路径（A → B → C → Crash）
      - 潜在影响范围（是否还有其他调用方？）
   3. 生成 fix-todo.md，按优先级列出修复计划，每条说明：修改位置 + 修改意图 + 是否需要新增测试

   先输出分析，等我确认后再执行。
   \`\`\`

3. **预期结果**：AI 输出 \`root-cause.md\` + \`fix-todo.md\` 草案，无文件变更

> **如有 MCP 接入（进阶）**：可使用 Sentry MCP 直接拉取线上报错，省去手动复制步骤：
> \`\`\`text
> 使用 Sentry MCP 获取最近 1 小时内 TypeError 相关的报错，然后分析根因。
> \`\`\`

---

### 🔍 Assess — 确认根因，控制修复面

**目标**：确认 \`root-cause.md\` 准确，修复面最小化，防止过度修改。

1. 阅读 \`root-cause.md\`，重点验证：

   | 检查项 | 关注点 |
   |--------|--------|
   | 根因准确性 | AI 指出的根因是否真实可复现？ |
   | 调用链完整性 | 是否只追踪到表层，忽略了上游数据源？ |
   | 影响范围评估 | 是否有其他调用方也会触发同样的问题？ |
   | fix-todo 修改面 | 是否修改了不必要的文件？ |

2. 如有疑问，追加上下文（示例）：
   \`\`\`text
   root-cause.md 描述的根因有疑问：
   - transformers.ts:12 只是崩溃点，上游 fetchUsers() 返回的数据结构也需要检查
   - 请追加分析 api/users.ts 和 store/users.ts，确认数据从哪里开始变形的
   \`\`\`

3. 确认后锁定修复基线：
   \`\`\`text
   root-cause.md 已确认，修复面合理。请按 fix-todo.md 执行，每条完成后暂停等待验收。
   \`\`\`

4. **预期结果**：\`root-cause.md\` 和 \`fix-todo.md\` 落地，修复基线锁定

---

### ⚡ Implement — 先写复现测试，再修复代码

**目标**：原子化执行每一处修复，遵循"测试先行"原则。

1. 第一步总是先写**复现测试**：
   \`\`\`text
   执行 fix-todo.md 第 1 条前，先为根因场景写一个 Repro Test：
   在 server.test.ts 中新增一个测试，模拟 fetchUsers 返回 undefined，
   确认测试当前为红（复现了 Bug）。
   \`\`\`

2. 测试为红后，再执行修复：
   \`\`\`text
   Repro Test 已为红，现在执行 fix-todo.md 第 1 条：
   在 src/utils/transformers.ts 中增加防御性判断，
   要求：不要只是判断 undefined，要从数据源头修复。
   \`\`\`

3. **执行原则**：
   - ✅ 复现测试（红）→ 修复代码（绿）→ Review → 下一条
   - ❌ 不要多条一起修复（避免互相干扰，难以定位新增问题）
   - ❌ 不要只判空了事，要从 \`root-cause.md\` 指出的根源入手

4. **预期结果**：每条修复后，对应的 Repro Test 由红变绿

---

### ✅ Review — 验收修复，生成修复 PR

**目标**：确认修复彻底，无 regression，生成高质量修复 PR。

1. 运行验收命令：
   \`\`\`bash
   npm run test              # 全量测试（含 Repro Test）
   npm run type-check        # TS 类型检查
   npm run lint              # 代码规范检查

   # 重新触发原始崩溃场景
   npm run demo:4.3          # 预期：不再崩溃
   \`\`\`

2. Diff 审查关注点：
   - Repro Test 是否完整覆盖了崩溃场景？
   - 修复代码是否只改动了 \`root-cause.md\` 中指出的范围？
   - 是否有新引入的 \`any\` 类型或跳过错误的 \`try-catch\`？

3. **回溯触发条件**：
   - Repro Test 通过但全量测试出现 regression → 修复面过大，回溯 Plan 重新评估影响范围
   - 修复后复现场景仍然崩溃 → 根因归因有误，回溯 Plan 追加日志 / 重新分析

4. 生成修复 PR：
   \`\`\`text
   所有修复已验收，请帮我生成 PR 描述，包含：
   - 根因说明（来自 root-cause.md）
   - 修复方案摘要
   - 复现步骤
   - 测试覆盖说明
   \`\`\`

5. **预期结果**：含 Repro Test 的修复 PR，根因描述清晰，可直接合并上线

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| \`root-cause.md\` | Plan 阶段产出：根因分析文档 |
| \`fix-todo.md\` | Plan 阶段产出：修复优先级计划 |
| \`4.3.troubleshooting/server.ts\` | 模拟业务逻辑入口（Bug 爆发地） |
| \`4.3.troubleshooting/src/utils/transformers.ts\` | 脆弱的数据转换工具（Root Cause 所在地） |

---

## 5. 核心要点

- **堆栈是起点，不是终点**：AI 能从堆栈倒推整条调用链，不要只盯着崩溃行
- **复现测试先于修复**：先写红色 Repro Test，再修复至绿色，是防止"假修复"的最有效手段
- **修复面最小化**：Assess 阶段的核心价值是控制修复范围，避免"修好一处，破坏三处"

---

## 6. 延伸阅读

- **MCP 进阶**：在生产环境，可配置 Sentry MCP 或 ELK MCP，让 Agent 直接获取线上报错，省去手动复制堆栈的步骤。参考 \`examples/3.4.mcp-protocol/\`
- **官方文档**：
  - Cursor：[BugBot 调试指南](https://cursor.com/docs/bugbot)
  - Claude Code：[复杂任务处理](https://docs.anthropic.com/en/docs/claude-code/best-practices)
- **本课程材料**：结合 \`ppts/vibe-coding/04.practice.md\` 中「实战场景 3：Bug 修复」做扩展阅读
`;export{n as default};
