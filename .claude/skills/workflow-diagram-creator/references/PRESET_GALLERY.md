# Preset Gallery

5 类预设的特征对照、适用场景、决策树。

## 决策树（按需选择）

```
用户描述含...
├─ "Tab 切换 / 多类对照 / 一组并列概念"
│   → tabbed
│
├─ "层级展开 / 渐进揭示 / N Tier"
│   → progressive
│
├─ "嵌套循环 / 内外 Loop / SDLC / PAIR / 双层流程"
│   → nested-loops
│
├─ "重试 / 失败回流 / 验证失败回去 / Self-correction"
│   → feedback-loop
│
└─ 其他（单向 N 步 / pipeline / 安装步骤）
    → linear
```

不确定时优先 `linear`，再根据复杂度升级。

---

## Preset 1 · `linear`

**视觉**：

```
[Node 1] → [Node 2] → [Node 3] → [Node 4] → [Node N] → [✓ Done]
```

**适用场景**：

- 安装 / 配置流程（如 OAuth、CI 流水线、Docker 部署）
- 单向数据流（如 ETL pipeline）
- 顺序步骤（如新手引导、用户旅程）

**节点数推荐**：3-7 个（超过 7 建议拆为多个流程图）

**必填数据字段**：
- `steps[]`（必填）
- `nodes[]`（必填）
- `edges[]`（可选 —— 默认按 nodes 顺序自动连线）

**特征**：
- 无回流，无嵌套
- 控制器：上一步 / 下一步 / 重置
- 底部状态区：title + description + tags
- 最简模式 —— 学习成本最低

**真实案例参考**：
- `assets/examples/mcp-workflow.vue`（7 步线性 MCP 调用流程）
- `assets/examples/progressive-disclosure.vue` 也可视为 linear 的渐进变体

---

## Preset 2 · `feedback-loop`

**视觉**：

```
                      ↓ verify FAIL
[Start] → [Gather] → [LLM] → [Action] → [Verify] → [Done]
              ↑__________ ←___________________|
```

**适用场景**：

- AI Coding 循环（Vibe Coding：Generate → Verify → Fail → 回到 Gather）
- CI 失败重试
- 编译 + Lint + Test 三件套
- 任何"做完检查，错了重来"的流程

**节点数推荐**：5-10 个

**必填数据字段**：
- `steps[]`（必填）
- `nodes[]`（必填）
- `edges[]`（必填 —— 必须显式声明回流的曲线 path）

**特征**：
- 主流程线性 + 1-2 条回流曲线
- 步骤序列含 `result: 'fail'` 的"失败步" + `result: 'pass'` 的"通过步"
- 可选 Human-in-Loop 浮窗（用户手动 Steer）
- 底部状态区：title + description + tags + 上下文窗口副板

**真实案例参考**：
- `assets/examples/vibe-workflow.vue`（10 步 + 验证失败回流 + Human-in-Loop 盒）

---

## Preset 3 · `nested-loops`

**视觉**：

```
┌───── Alignment Loop ─────┐  ┌───── Execution Loop ─────┐
│                          │  │                          │
│  Plan ←→ Assess          │  │  Implement ←→ Review     │
│      ↓ aligned           │  │      ↓ pass              │
└──────────────────────────┘  └──────────────────────────┘
                            ↓
                         [Done]
```

**适用场景**：

- PAIR / SDLC 流程（含对齐阶段 + 执行阶段双层循环）
- 设计-实现双轨工作流（设计稿对齐 + 代码实现）
- DevOps 双 Loop（开发-测试 / 部署-监控）

**节点数推荐**：6-10 个

**必填数据字段**：
- `steps[]`（必填，含 `in[]` / `out[]` / `principle` 字段以填充底部状态区）
- `nodes[]`（必填）
- `edges[]`（必填，多种 variant: `pass / fail / warn`）
- `loops[]`（必填 —— 双循环背景框）

**特征**：
- 两个虚线背景框（Alignment Loop / Execution Loop）
- 多种连线 variant（pass 绿 / fail 红 / warn 紫）+ 实线 / 虚线
- 底部状态区扩展：含 I/O 数据流（in → out）+ 核心原则提示框（amber 黄色）
- SVG marker 必须用 `instanceId` 隔离

**真实案例参考**：
- `assets/examples/pair-workflow.vue`（10 步 PAIR：Input → Plan → Assess → Implement → Review → Done，含双循环）

---

## Preset 4 · `progressive`

**视觉**：

```
点击 1 →   [Tier 1]
点击 2 →   [Tier 1]
           [Tier 2]
点击 3 →   [Tier 1]
           [Tier 2]
           [Tier 3]
```

**适用场景**：

- 渐进式知识揭示（如 Skill Progressive Disclosure 三层加载）
- 架构层级展开（横向 + 纵向 + 容器）
- 概念递进（从粗到细 / 从浅到深）

**节点数推荐**：3-5 个 Tier（每 Tier 含 1-3 项）

**必填数据字段**：
- `tiers[]` 替代 `nodes[]`（每个 tier 含 title / badge / what / when / detail）
- `steps[]` 简化为"点击次数"（每次点亮下一个 tier）

**特征**：
- 无 SVG 连线（不需要画箭头）
- 每点击一次新增一行，旧行保持高亮
- 用 `is-active` / `is-highlight` 双状态
- 底部可选总结句（最后一步出现）

**真实案例参考**：
- `assets/examples/progressive-disclosure.vue`（3 Tier：Metadata 100t → Instructions 5000t → Resources 按需）

---

## Preset 5 · `tabbed`

**视觉**：

```
[Tab A]  [Tab B]  [Tab C]   ← 顶部 Tab 切换
─────────────────────────
│  当前 Tab 的迷你流程：    │
│  Step 1 → Step 2 → ...    │
│  注：xxxx                  │
─────────────────────────
```

**适用场景**：

- 多概念并列对照（如 MCP 三大原语 Tools/Resources/Prompts）
- 同一抽象的多种实现（如三种数据库选型）
- 多角色视角（用户视角 / 管理员视角 / 开发者视角）

**节点数推荐**：2-4 个 Tab（每 Tab 内 3-7 步迷你流程）

**必填数据字段**：
- `tabs[]`（每个 tab 含 id / name / controller / methods / examples / flow / note）
- `steps[]` 简化为"Tab 索引"（每次点击切换 Tab）

**特征**：
- 顶部 Tab 栏（点击或 v-clicks 切换）
- 当前 Tab 内显示：title + 控制类型 + JSON-RPC methods + 例子标签 + 流程序列 + 注释
- 颜色按 Tab 不同（如 Tools 蓝 / Resources 紫 / Prompts 绿）
- 无 SVG，主要用色块和分组

**真实案例参考**：
- `ppts/skill-mcp/components/MCPPrimitivesMatrix.vue`（3 Tab：Tools / Resources / Prompts，每 Tab 5 步流程）

---

## 选择不当的代价

| 错误选择 | 后果 |
|---|---|
| 6 步流程用 `progressive` | 无法表达节点之间的因果连接 |
| 简单线性流用 `nested-loops` | 多余的 loops[] 配置，画面凌乱 |
| 多概念对照用 `linear` | 无法切换视角，所有 Tab 信息混在一起 |
| 含错误回流用 `linear` | 无法显示 verify-fail 的回流曲线 |
| 渐进展开用 `tabbed` | 失去"层层揭示"的渐进感 |

---

## 升级路径（preset 之间的兼容性）

- `linear` ↗ `feedback-loop`：当需要加错误回流时升级（保留所有 nodes / steps，新增 edges）
- `feedback-loop` ↗ `nested-loops`：当需要双循环时升级（保留所有数据，新增 loops[]）
- `progressive` 与其他 preset 不互通（数据模型不同）
- `tabbed` 内部每个 Tab 可以是 `linear` 风格的迷你流程（嵌套使用）

不确定时先做 `linear`，跑起来再升级。
