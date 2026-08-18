# Data Model · 完整字段 Schema

5 类预设共用的核心数据结构。**用 TypeScript 接口描述**，但实际使用是普通 JS 对象。

## 核心：`StepDef`（步骤剧本）

每个 click 对应一个 step，组件内部用 `currentStepIndex` 切换。

```ts
interface StepDef {
  /** 唯一标识（用于排查 / 跳转） */
  id: string

  /** 步骤标题（显示在底部状态区） */
  title: string

  /** 步骤说明（一句话描述这步发生了什么） */
  description: string

  /** 标签数组（如 ['Tool: Read', 'Context']） */
  tags?: string[]

  /** 本步激活的节点 id（必填） */
  activeNode: string

  /** 本步激活的连线，格式 'fromId-toId'（可选） */
  line?: string

  /** 本步的状态（可选，影响节点徽章和图标颜色） */
  result?: 'pass' | 'fail' | 'warn'

  // ===== nested-loops 专用扩展（PAIR 风格） =====

  /** 本步的输入数据（显示在底部状态区中部） */
  in?: string[]

  /** 本步的输出数据 */
  out?: string[]

  /** 本步遵循的核心原则（黄色提示框） */
  principle?: string

  // ===== 通用扩展 =====

  /** 临时浮标（如显示 ALIGNED / FAILED） */
  badge?: { node: string; text: string; variant?: 'green' | 'red' | 'orange' | 'purple' }

  /** 临时高亮某个 UI 部件（如 Human-in-Loop 盒） */
  highlightSlot?: string
}
```

### 示例（feedback-loop）

```ts
const steps = [
  {
    id: 'start',
    title: '1. User Prompt',
    description: '用户描述需求',
    tags: ['Input', 'Intent'],
    activeNode: 'start',
  },
  {
    id: 'verify_fail',
    title: '5. Verify Failed',
    description: '检测到报错，回流到 Gather 阶段',
    tags: ['Self-Correction', 'Loop'],
    activeNode: 'verify',
    line: 'verify-gather',  // 显示从 verify 到 gather 的回流曲线
    result: 'fail',
  },
]
```

---

## 核心：`NodeDef`（节点定义）

```ts
interface NodeDef {
  /** 唯一标识（被 step.activeNode / edge.from / edge.to 引用） */
  id: string

  /** 节点主标题（如 "User Prompt"） */
  label: string

  /** 节点副标题（如 "用户提示词"） */
  sub?: string

  /** 节点角标（如 "Tool: Read"，固定显示在节点底部） */
  meta?: string

  /** Lucide / Heroicon SVG 名称（如 "user" / "code"） */
  icon?: string

  /** 节点中心点位置（画布坐标） */
  position: { x: number; y: number }

  /** 节点尺寸（默认 120 × 100） */
  size?: { w: number; h: number }

  /** 归属哪个 loop（仅 nested-loops 用） */
  group?: string
}
```

### 示例

```ts
const nodes = [
  { id: 'start',  label: 'User Prompt',    sub: '用户提示词',      icon: 'message-square', position: { x: 10,  y: 130 } },
  { id: 'gather', label: 'Gather Context', sub: '收集上下文', meta: 'RAG / Read',      icon: 'search',          position: { x: 170, y: 130 } },
  { id: 'llm',    label: 'LLM Reasoning',  sub: '推理与规划', meta: 'Plan / Code',    icon: 'brain',          position: { x: 340, y: 130 } },
]
```

---

## 核心：`EdgeDef`（连线定义）

```ts
interface EdgeDef {
  /** 起点节点 id */
  from: string

  /** 终点节点 id */
  to: string

  /** 连线类型 */
  type?: 'line' | 'curve' | 'orthogonal'

  /** type=curve / orthogonal 时显式 SVG path（覆盖自动计算） */
  path?: string

  /** 连线类别（决定颜色和虚线） */
  variant?: 'default' | 'pass' | 'fail' | 'warn' | 'human'

  /** 是否虚线（默认 false） */
  dashed?: boolean
}
```

### 4 种 variant 颜色对照

| variant | 颜色 | 用途 |
|---|---|---|
| `default` | 蓝 `#60a5fa` | 主流程 |
| `pass` | 绿 `#10b981` | 验证通过 / 单步成功 |
| `fail` | 红 `#ef4444` | 验证失败 / 错误回流 |
| `warn` | 紫 `#a855f7` | 认知对齐 / 修正循环 |
| `human` | 橙 `#f97316` | 人工介入 / Human-in-Loop |

### 示例（feedback-loop 的回流曲线）

```ts
const edges = [
  // 主流程线（type 默认 'line'）
  { from: 'start', to: 'gather' },
  { from: 'gather', to: 'llm' },
  { from: 'llm', to: 'action' },
  { from: 'action', to: 'verify' },
  { from: 'verify', to: 'done', variant: 'pass' },

  // 失败回流（必须显式声明 path —— 自动算出来不一定优雅）
  {
    from: 'verify',
    to: 'gather',
    type: 'orthogonal',
    path: 'M 740 235 L 740 270 L 230 270 L 230 235',
    variant: 'fail',
    dashed: true,
  },
]
```

---

## 核心：`LoopDef`（循环背景框，仅 nested-loops）

```ts
interface LoopDef {
  /** 显示在虚线框左上角的标签 */
  label: string

  /** 框的位置和尺寸 */
  bbox: { x: number; y: number; w: number; h: number }

  /** 框颜色 */
  color?: 'purple' | 'amber' | 'blue' | 'green' | 'slate'
}
```

### 示例

```ts
const loops = [
  { label: 'Alignment Loop',  bbox: { x: 155, y: 50,  w: 310, h: 260 }, color: 'purple' },
  { label: 'Execution Loop',  bbox: { x: 505, y: 50,  w: 310, h: 260 }, color: 'amber' },
]
```

---

## 整合：`progressive` 专用结构

```ts
interface TierDef {
  id: number          // 1, 2, 3...
  title: string       // "Tier 1 — Metadata"
  badge: string       // "~100 tokens"
  when: string        // "所有 Skill 启动时全量加载"
  what: string        // "只读 frontmatter：name + description"
  detail: string      // 长一点的解释
  color: 'blue' | 'purple' | 'amber' | 'green'
}
```

`progressive` 预设不需要 nodes / edges / loops，只需要 `tiers[]`。

---

## 整合：`tabbed` 专用结构

```ts
interface TabDef {
  id: string                      // 'tools' / 'resources' / 'prompts'
  name: string                    // 'Tools'
  controller: string              // 'Model-controlled'
  sub?: string                    // 副标题
  color: string                   // hex 颜色
  accent: string                  // 浅色背景
  methods: string[]               // ['tools/list', 'tools/call']
  examples: string[]              // ['查 Jira 工单', '写文件']
  note?: string                   // 黄色提示框文字
  flow: { from: string; to: string; label: string }[]   // 迷你流程序列
}
```

`tabbed` 预设用 `tabs[]` + `clicks` 数 = `tabs.length`（每次点击切下一个 Tab）。

---

## 完整数据示例（feedback-loop · 极简 5 步）

```ts
const steps = [
  { id: 's1', title: '1. 提交代码', description: '用户提交 PR', activeNode: 'submit' },
  { id: 's2', title: '2. 跑 CI',   description: 'GitHub Actions 触发',  activeNode: 'ci', line: 'submit-ci' },
  { id: 's3', title: '3. 测试失败', description: '单测有红',  activeNode: 'ci', result: 'fail', line: 'ci-fix' },
  { id: 's4', title: '4. 修复',    description: '开发者修 bug',  activeNode: 'fix', line: 'fix-ci' },
  { id: 's5', title: '5. 通过 + 合并', description: '所有检查 ✓',  activeNode: 'merge', result: 'pass', line: 'ci-merge' },
]

const nodes = [
  { id: 'submit', label: 'Submit PR',  position: { x: 10,  y: 150 } },
  { id: 'ci',     label: 'CI Run',     position: { x: 200, y: 150 } },
  { id: 'fix',    label: 'Fix Code',   position: { x: 200, y: 280 } },
  { id: 'merge',  label: 'Merge',      position: { x: 400, y: 150 } },
]

const edges = [
  { from: 'submit', to: 'ci' },
  { from: 'ci', to: 'merge', variant: 'pass' },
  // 失败回流
  { from: 'ci', to: 'fix', type: 'orthogonal', path: 'M 260 200 L 260 280', variant: 'fail', dashed: true },
  { from: 'fix', to: 'ci',  type: 'orthogonal', path: 'M 200 280 L 140 280 L 140 200 L 200 200', variant: 'warn', dashed: true },
]
```

---

## 数据校验清单

写完数据后自查：

- [ ] `steps.length` = frontmatter `clicks` 值
- [ ] 每个 `step.activeNode` 都能在 `nodes` 中找到
- [ ] 每个 `step.line` 的 `from` / `to` 都能在 `edges` 中找到
- [ ] 每个 `edge.from` / `edge.to` 都能在 `nodes` 中找到
- [ ] 节点位置不重叠（最小间距 ≥ 60px）
- [ ] 画布尺寸（默认 1000×400）能容纳所有节点
- [ ] 必填字段都有值（id / title / description / activeNode）
