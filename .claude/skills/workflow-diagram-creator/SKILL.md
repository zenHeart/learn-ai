---
description: 为技术 PPT 生成可交互的 stepper-driven 流程图组件（独立 Vue SFC）。当用户要求做"流程图 / 时序图 / 工作流图 / pipeline 演示 / 状态机图 / workflow 可视化 / 多步骤动画"，且需要分步动画、节点高亮、连线流动、底部状态区、与 Slidev clicks 同步时调用。基于 5 类预设（linear / feedback-loop / nested-loops / progressive / tabbed）输出独立可运行的 Vue SFC + Slidev 全屏 layout 嵌入代码。每次产出零依赖独立组件，不引入 npm 包。
name: workflow-diagram-creator
allowed-tools:
  - Read Write Edit Bash(mkdir:*) Bash(cp:*)
license: MIT
compatibility: 适用于 Slidev 项目（vibe-coding / skill-mcp / prompt-context 风格）；需要 Vue 3 + @slidev/client 环境
metadata:
  author: zenheart
  version: 1.0.0
---

# Workflow Diagram Creator

为技术 PPT 生成 stepper-driven 流程图组件。每次产出**完整独立的 Vue SFC**，不引第三方依赖。

## When to use

匹配以下任一信号即激活：

- 用户说"做个流程图 / 时序图 / 工作流图 / 状态机图 / pipeline 演示 / workflow 可视化"
- 用户要做技术 PPT / 演讲材料，需要分步动画 + 节点高亮
- 用户给出 mermaid flowchart 但希望 PPT 中带交互高亮（不仅仅是静态图）
- 用户问"怎么做 vibe-coding 的 VibeWorkflow / PairWorkflow 那种交互流程图"
- 用户描述"多个步骤 + 每步切换激活节点 + 与翻页同步"

## How to do（5 步工作流）

### Step 1 · 识别预设类型

读 [`references/PRESET_GALLERY.md`](references/PRESET_GALLERY.md)，根据用户描述匹配最近的预设：

| Preset | 何时选 | 节点数 |
|---|---|---|
| **linear** | 单向 N 步、无回流（OAuth 流程、CI 流水线、安装步骤） | 3-7 |
| **feedback-loop** | 含错误回流（编译失败重试、自动化测试、Vibe Coding） | 5-10 |
| **nested-loops** | 双循环嵌套（PAIR / SDLC，含对齐 Loop + 执行 Loop） | 6-10 |
| **progressive** | 层级渐进展开（Progressive Disclosure / 架构层揭示） | 3-5 |
| **tabbed** | 多 Tab 切换 + 每 Tab 一个迷你流程（多原语对照） | 2-4 Tab |

不确定时优先用 `linear`，再根据需要升级。

### Step 2 · 设计数据

读 [`references/DATA_MODEL.md`](references/DATA_MODEL.md)，根据场景填充：

- **steps[]** ：每步的 `id` / `title` / `description` / `activeNode` / `line` / 可选 `result` / 可选 `tags` / 可选 `in / out / principle`
- **nodes[]** ：节点 `id` / `label` / `sub` / `icon` / `position {x, y}` / 可选 `size`
- **edges[]**（仅 feedback-loop / nested-loops 需要）：`from` / `to` / `type: line | curve | orthogonal` / 可选 `path` / 可选 `variant: pass | fail | warn`
- **loops[]**（仅 nested-loops 需要）：`label` / `bbox {x, y, w, h}` / `color`

参考 [`assets/examples/`](assets/examples/) 中的真实生产案例找最近邻写法。

### Step 3 · 拷贝模板 + 替换数据

1. 选定 `assets/presets/<preset-type>.vue` 作为基础模板
2. **完整拷贝**到目标位置（如 `<your-ppt>/components/YourFlow.vue`）
3. 替换文件内的 `steps` / `nodes` / `edges` / `loops` 数据
4. 调整画布尺寸（默认 1000×400），参考 [`references/COORDINATE_GUIDE.md`](references/COORDINATE_GUIDE.md) 算节点坐标
5. 重命名组件标识（替换占位符 `{{COMPONENT_NAME}}` 为实际名称）

### Step 4 · 嵌入 PPT

在用户指定的 .md 中添加：

```yaml
---
layout: full-vibe          # 或 full-interactive / full-screen，按项目而定
class: p-0
clicks: <N>                # 必须 = steps.length（不要 ±1）
---

<YourComponentName />

<!-- 演讲者备注：
[click 1] 第一步说明...
[click 2] 第二步说明...
-->
```

### Step 5 · 调试

```bash
npm run dev         # 起 Slidev
# 浏览器访问 http://localhost:3030
# 用键盘左右键测试每个 click 是否对应正确的 step
```

常见问题速查 → [`references/DEBUG_TIPS.md`](references/DEBUG_TIPS.md)：

- SVG marker 颜色冲突 → 用 `instanceId` 隔离
- 画布超出可视区域 → 调 `.diagram-scaler` 的 `scale()` 计算
- 暗色模式样式裸露 → 所有颜色加 `dark:` 前缀
- SSR 报错 `useNav is not a function` → 用 `try/catch` 降级
- clicks 翻页失灵 → frontmatter `clicks` 必须 = `steps.length`

## Common edge cases

### 不要做

1. **不要创建 npm 包 / 通用组件** —— 每次生成完整独立 SFC，对 LLM 友好、零供应链成本
2. **不要超 500 行 SKILL.md 主文件** —— 详细规范放 `references/`，按 Tier 3 加载
3. **不要把所有预设塞同一个文件** —— 5 个预设各自独立，按需引用
4. **不要直接 `import` `assets/presets/*`** —— 这些是模板，应当**完整拷贝粘贴**到目标项目，避免运行时依赖本 skill 路径

### 必须做

1. **frontmatter `clicks` 必须 = `steps.length`** —— 否则 Slidev 翻页会卡住
2. **SVG marker 必须用 `instanceId` 隔离** —— 否则同一页放两个组件 marker 会撞色（参考 PairWorkflow.vue 的做法）
3. **状态区文字字号 ≤ 11px** —— Slidev 视口有限，过大会溢出（参考 assets/examples/ 的 inline style）
4. **`useNav()` 必须 try/catch** —— 让组件能在非 Slidev 环境（如 Storybook、单元测试）降级运行

## 触发示例

```
> 帮我做一个 6 步的 OAuth 授权流程图，含错误回流
↓
[Skill 激活]
↓
1. 识别预设：feedback-loop（含错误回流）
2. 读 PRESET_GALLERY.md 确认 6 节点合规
3. 拷贝 assets/presets/feedback-loop.vue 到目标位置
4. 替换 steps：① 用户点登录 ② 跳 OAuth Server ③ 用户授权 ④ 拿 code ⑤ 换 token ⑥ 完成
5. 替换 edges：含 verify-fail 回流到 step 2（重新授权）
6. 写入 .md：layout: full-vibe / clicks: 6
↓
[输出独立可运行 Vue SFC + .md 嵌入代码]
```

## 资产索引

| 资产 | 用途 | 何时读 |
|---|---|---|
| [`references/PRESET_GALLERY.md`](references/PRESET_GALLERY.md) | 5 类预设特征 + 决策树 | Step 1 |
| [`references/DATA_MODEL.md`](references/DATA_MODEL.md) | 完整 TypeScript 字段 schema | Step 2 |
| [`references/COORDINATE_GUIDE.md`](references/COORDINATE_GUIDE.md) | 画布 / 节点 / 连线坐标计算 | Step 3 |
| [`references/DEBUG_TIPS.md`](references/DEBUG_TIPS.md) | 8 类常见问题速查 | Step 5 |
| [`assets/presets/*.vue`](assets/presets/) | 5 类预设模板（完整可运行 SFC） | Step 3 |
| [`assets/snippets/*.vue`](assets/snippets/) | controller / status-bar / svg-defs 可粘贴片段 | 自定义模板时 |
| [`assets/examples/*.vue`](assets/examples/) | 4 个真实生产案例（vibe / pair / mcp / progressive） | 找最近邻参考 |

## 关于"独立 SFC"的设计哲学

每次产出**零依赖、可粘贴即用**的 Vue SFC，而不是引入通用组件库。理由：

1. **LLM 友好**：单文件 = 单次输出，无需协调多个文件版本
2. **零供应链风险**：用户不依赖任何 npm 包或 skill 安装
3. **修改自由**：用户可以随意调样式、加状态、改坐标，不被通用 API 约束
4. **可移植**：把 Vue SFC 拷给同事也能跑，不用解释依赖

代价是会有一些代码重复（5 个预设各有 ~200-400 行）。这是有意的权衡。

后续若想升级为通用组件库，本 skill 中的 5 个 preset 可作为基础抽象的素材。