# Debug Tips · 8 类常见问题速查

按出现频率排序。

---

## 1. SVG marker 颜色冲突（最高频）

**症状**：同一页放两个流程图组件，第二个组件的箭头颜色全变成第一个的颜色。

**根因**：SVG `<defs>` 里的 marker `id` 是全局命名空间，重复 id 会被第一个定义抢占。

**修复**：用 `instanceId` 隔离：

```js
// 在 <script setup> 顶部
const instanceId = Math.random().toString(36).substring(2, 7)
```

```html
<!-- defs 里 -->
<marker :id="`arrow-blue-${instanceId}`" ...>...</marker>

<!-- 引用时 -->
<line :marker-end="`url(#arrow-blue-${instanceId})`" />
```

参考实现：`assets/examples/pair-workflow.vue` 的第 13 行。

---

## 2. clicks 翻页失灵

**症状**：按右方向键，组件内部 step 跳了，但 Slidev 不进入下一页。

**根因**：frontmatter 里 `clicks` 数量不对。

**修复**：

```yaml
---
layout: full-vibe
clicks: 7        # ← 必须等于 steps.length
---
```

如果 `steps.length = 10`，就写 `clicks: 10`，不是 9 也不是 11。

---

## 3. 画布超出可视区域

**症状**：流程图右半被遮挡，或顶部 / 底部被切。

**根因**：`.diagram-scaler` 的 `scale()` 计算与画布实际尺寸不匹配。

**修复**：

```css
.diagram-scaler {
  /* 画布是 1000×400，加上 50px 边距 → 1050 / 480 */
  transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
}
```

如果改了画布到 `1200×500`，相应改成：

```css
transform: scale(min(1, calc(100cqw / 1250), calc(100cqh / 580)));
```

---

## 4. 暗色模式样式裸露

**症状**：在深色 PPT 主题下，组件背景仍然是白色或文字看不清。

**根因**：所有颜色没加 `dark:` 前缀。

**修复**：

```html
<!-- ❌ 只有 light -->
<div class="bg-white border border-slate-200 text-slate-700">

<!-- ✅ 同时支持 light + dark -->
<div class="bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200">
```

参考 `assets/examples/pair-workflow.vue` 几乎每个 class 都有 `dark:` 配对。

---

## 5. SSR 报错 `useNav is not a function`

**症状**：用 Nuxt / Astro / 静态生成时，组件挂载报错。

**根因**：`useNav()` 来自 `@slidev/client`，仅在 Slidev 环境提供。

**修复**：

```js
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 非 Slidev 环境降级 —— 组件仍可工作但失去 clicks 同步
}

// 后续使用前判断
watch(
  () => slidevNav?.clicks?.value,    // 用 ?. 链式访问
  (newVal) => {
    if (newVal !== undefined) { ... }
  },
  { immediate: true },
)
```

---

## 6. mini 模式（缩略图）布局错乱

**症状**：组件作为缩略图嵌入其他屏时，节点重叠 / 字超出。

**根因**：mini 模式下 `1000×400` 画布缩到 `220×100`，单纯 CSS scale 不够。

**修复**：

```vue
<script>
defineProps({
  mini: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="['workflow-container', { 'mini-mode': mini }]">
    <div :class="mini ? 'mini-scaler' : 'diagram-scaler'">
      <!-- 画布内容 -->
    </div>
  </div>
</template>

<style>
.mini-scaler {
  position: absolute;
  top: 0; left: 0;
  width: 1000px;
  height: 400px;
  transform-origin: top left;
  transform: scale(0.22);          /* 缩到约 220×88 */
}

.mini-mode .node-active {
  transform: scale(1.3);            /* 当前节点放大补偿 */
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}
</style>
```

参考 `assets/examples/vibe-workflow.vue` 的 mini 实现（用于 vibe-step layout 的右上角缩略图）。

---

## 7. 回流路径压到节点上

**症状**：feedback-loop 的回流曲线穿过中间节点，视觉混乱。

**根因**：path 的 `yMid` 偏移不够。

**修复**：把回流路径的 y 拉远主流程：

```js
// ❌ 太近
{ from: 'verify', to: 'gather', path: 'M 740 235 L 740 245 L 230 245 L 230 235' }

// ✅ 拉远（主流程 y=180，回流 y=270）
{ from: 'verify', to: 'gather', path: 'M 740 235 L 740 270 L 230 270 L 230 235' }
```

经验值：回流路径距主流程**至少 60px**。

---

## 8. 状态区文字溢出

**症状**：底部 description 太长，把整个 PPT 撑爆。

**根因**：Slidev 视口高度有限（通常 720-800px），状态区只剩 80-120px。

**修复**：

```html
<!-- 用 inline style 强制限制字号 -->
<p
  class="text-slate-600 dark:text-slate-300 leading-tight"
  style="font-size: 9px !important; margin: 0 !important"
>
  {{ currentStep.description }}
</p>

<!-- 标题字号 ≤ 11px -->
<h3 style="font-size: 10px !important">{{ currentStep.title }}</h3>

<!-- tags 字号 ≤ 8px -->
<span style="font-size: 8px !important">#{{ tag }}</span>
```

⚠️ **不要用 Tailwind 的 `text-xs` `text-sm`** —— Slidev 主题可能覆盖这些。**直接 inline `font-size: 9px !important`** 最稳。

---

## 通用调试命令

```bash
# 启动 Slidev
npm run dev

# 在浏览器中：
# - 左右方向键测试 clicks
# - g + 数字 跳到指定 slide
# - o 打开 overview 模式（看缩略图）
# - p 进入 presenter mode（看 speaker notes）
```

打开 Chrome DevTools → Elements 面板，对着流程图节点 inspect，看 SVG 真实坐标。
打开 Console，输入 `document.querySelector('svg').getBBox()` 看画布实际尺寸。

---

## 终极保命

跑不起来时，**直接拷贝 `assets/examples/` 中最相近的真实组件**，先让它能渲染再改数据。所有现有 examples 都是生产环境验证过的，复用率 > 90%。
