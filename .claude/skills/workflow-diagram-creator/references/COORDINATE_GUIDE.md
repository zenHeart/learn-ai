# Coordinate Guide · 坐标系与连线计算

## 画布坐标系

```
(0, 0) ─────────────────→ x (1000)
   │
   │
   │      [节点]
   │
   ↓
   y (400)
```

**默认画布**：`1000 × 400` （由 `.diagram-scaler` 包裹的内层 div）

外层用 `cqw / cqh` 自动响应式缩放：
```css
.diagram-scaler {
  transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
}
```

如果你的流程图节点很多，画布可以扩大到 `1200 × 500`，但记得改 `cqw` 计算。

---

## 节点坐标计算

### 标准尺寸

| 节点类型 | 尺寸 | 适用 |
|---|---|---|
| 普通节点（含 sub） | `120 × 100` | linear / feedback-loop / nested-loops |
| 紧凑节点（无 sub） | `100 × 80` | tabbed 内迷你节点 |
| 端点节点（圆形） | `80 × 80` | Done / Start 终态 |

### 横向单行布局（最常用）

```
y 固定（如 130 - 150 之间），x 等距分布：

第 i 个节点 x = startX + i * spacing

例（5 节点，画布 1000）：
  startX = 10, spacing = 170
  → 节点 x: 10, 180, 350, 520, 690
```

### 纵向 / 上下分层（feedback-loop 含回流）

```
主流程（上层）：y = 150
回流路径（下层）：y = 280
垂直间距 ≥ 130（留出回流箭头空间）
```

### 双循环对称（nested-loops）

```
Alignment Loop（左半）：
  loop bbox: { x: 155, y: 50, w: 310, h: 260 }
  内部节点 y = 130（垂直居中）
  Plan node x = 170
  Assess node x = 330

Execution Loop（右半）：
  loop bbox: { x: 505, y: 50, w: 310, h: 260 }
  Implement node x = 520
  Review node x = 680
```

### 起点 + 终点（端节点）

```
Start: x = 10, y = 130-150
Done:  x = 860-880, y = 140-150（圆形节点 80px 居中）
```

---

## 节点连线计算

### 直线（type: 'line'）

最简单，给两个节点的 id 即可。系统自动算路径：

```
从 nodeA 中心 → nodeB 中心
SVG: <line x1=cAx y1=cAy x2=cBx y2=cBy />
```

实际写法（参考 vibe-coding 的 VibeWorkflow）：

```html
<line
  x1="130" y1="180"
  x2="170" y2="180"
  stroke-width="2"
  :class="getLineClass('start', 'gather')"
  :marker-end="getMarker('start', 'gather')"
/>
```

`x1 = nodeA.x + nodeA.w + 10`（节点右边 + 10px 留白）
`y1 = nodeA.y + nodeA.h / 2`（节点垂直中点）
`x2 = nodeB.x - 10`（终点节点左边 - 10px 留 marker 位置）
`y2 = nodeB.y + nodeB.h / 2`

### 圆角正交（type: 'orthogonal'）

最适合**回流**和**长跨距**连接。需要显式 path。

```
从 (x1, y1) 横向走 → 折角 → 纵向走 → 终点

SVG: M x1 y1 L x1 yMid L x2 yMid L x2 y2

加圆角（推荐）：
M x1 y1
L x1 yMid - radius
Q x1 yMid x1 + radius yMid    （第一个圆角）
L x2 - radius yMid
Q x2 yMid x2 yMid + radius    （第二个圆角）
L x2 y2
```

### 三次曲线（type: 'curve'）

最适合**S 曲线**（如 Steer 修正路径）：

```
M x1 y1 Q midX midY x2 y2

Q 控制点选择：
  - 中点的 X / Y 各偏移 30-60 像素，得到平滑弧线
```

### Marker（箭头）

每条连线末端都要有箭头。SVG `<defs>` 里定义 marker，通过 `marker-end` 引用。

```html
<defs>
  <marker id="arrow-blue-{instanceId}" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
    <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
  </marker>
</defs>
```

⚠️ **`instanceId` 必须唯一**：
```js
const instanceId = Math.random().toString(36).substring(2, 7)
// → marker id: arrow-blue-x9k2m

// 在 marker-end 引用：
:marker-end="`url(#arrow-blue-${instanceId})`"
```

否则同一页放两个流程图组件会撞 id，第二个组件的箭头颜色错乱。

---

## 循环背景框（loops）

```html
<div
  class="absolute border-2 border-dashed bg-purple-50/5"
  :style="{
    top: loop.bbox.y + 'px',
    left: loop.bbox.x + 'px',
    width: loop.bbox.w + 'px',
    height: loop.bbox.h + 'px',
  }"
>
  <div class="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-purple-400">
    {{ loop.label }}
  </div>
</div>
```

颜色对照（用 Tailwind class）：

| color | border | bg | label color |
|---|---|---|---|
| `purple` | `border-purple-200 dark:border-purple-800/50` | `bg-purple-50/5 dark:bg-purple-900/5` | `text-purple-400` |
| `amber` | `border-amber-200 dark:border-amber-800/50` | `bg-amber-50/5 dark:bg-amber-900/5` | `text-amber-500` |
| `blue` | `border-blue-200 dark:border-blue-800/50` | `bg-blue-50/5 dark:bg-blue-900/5` | `text-blue-400` |
| `green` | `border-green-200 dark:border-green-800/50` | `bg-green-50/5 dark:bg-green-900/5` | `text-green-500` |

---

## 容器响应式（cqw / cqh）

容器查询单位（CSS Container Query）让画布自动按 Slidev 视口缩放：

```css
.vibe-workflow-container {
  container-type: size;
}

.diagram-scaler {
  transform-origin: center center;
  /* 同时考虑宽度和高度，取较小值 */
  transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
}

@container (max-height: 400px) {
  .diagram-scaler {
    transform: scale(min(0.85, calc(100cqh / 450)));
  }
}
```

`100cqw / 1050`：画布需要 1050px 宽（1000 + 边距），cqw 是容器宽度的 1%
`100cqh / 480`：画布需要 480px 高（400 + 顶部和底部状态条），cqh 是容器高度的 1%

如果画布扩大到 1200×500，记得改成 `100cqw / 1250` + `100cqh / 580`。

---

## 完整坐标示例（5 节点 linear）

```
画布 1000 × 400

节点尺寸 120 × 100（含 sub），y = 130

[Submit]    x=10
[CI Run]    x=180
[Test]      x=350
[Build]     x=520
[Deploy]    x=690
[Done]      x=860（圆形 80×80）

连线 x 计算：
  start.x + 120 + 10 = 140  → 起点 x1
  next.x - 10 = 170          → 终点 x2

垂直中点：y + 50 = 180 → 连线 y1 = y2 = 180
```

---

## Debug 技巧

1. **画到一半发现节点重叠** → 加大 spacing 到 180+ 或 减小节点宽度到 100
2. **连线箭头看不见** → 检查 marker 是否被 SVG `overflow:hidden` 裁剪，加上 `class="overflow-visible"`
3. **回流路径压到节点上** → 增加 yMid 的偏移（远离主流程）
4. **画布缩放后字模糊** → 不要用 `transform: scale`，改用 `font-size` + `transform: scale` 配合 `transform-style: preserve-3d`
