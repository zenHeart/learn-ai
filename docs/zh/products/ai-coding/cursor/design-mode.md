# Design Mode

Design Mode 让你用**视觉提示**指挥 Agent。在 [Agents Window](https://cursor.com/docs/agent/agents-window) 的浏览器里，点元素、在页面上画、或开口说。Cursor 会带上元素和截图去改代码，你继续看下一处。

> 官方：[Design Mode](https://cursor.com/docs/agent/design-mode)。开关：**`Cmd+Shift+D`**。
>
> 这是**应用内的 UI 指挥**，不是独立设计画布。本站近亲：[Claude Design](../claude/claude-design)。

## 先决条件

- Cursor 桌面端，**Agents Window** 浏览器已打开正在跑的应用
- 那个浏览器里能真正加载 UI（本地 dev server 或预览）
- 一个擅长界面、够快的模型 — 官方推荐：**[Composer 2.5](https://cursor.com/blog/composer-2-5)**

## 学习目标

读完本页你能：

1. 不离开正在跑的应用，打开 / 关掉 Design Mode
2. 对准一个元素、多个元素、画出来的区域，或一段语音
3. 知道 Agent 实际看到什么（身份 + 截图）
4. 第一个改动还没完，就能排上下一个视觉编辑

---

## 为什么要用视觉提示

UI 是空间的。「把 hero 不那么挤」不如：选中的节点、背后的代码、周围布局、以及你正在看的页面状态。

在运行中的应用里点一个元素，对着这个选区下指令，让 Agent 改源码。

## 打开 Design Mode

Design Mode 住在 **Agents Window 里的浏览器**。

1. 打开 Agents Window 浏览器
2. **`Cmd+Shift+D`** 打开 Design Mode
3. 同一快捷键关掉，回到普通浏览

## 怎么指挥 Agent

### 选一个元素

在运行中的产品上点任意元素。Agent 拿到元素**和**它的代码，你对着看见的东西说话。

### 选多个元素

改动取决于**关系**时用多选：让 A 对齐 B、去掉重复内容、或一组一起调。

### 在页面上画

圈一块挤的区域、框一块、或标动画页的一部分。标注叠在视口的**冻结帧**上，Agent 看到的是你当时响应的那一屏。

### 用语音说

不打字，开口说。Agent 还在跑时麦克风仍可用，你可以接着排下一处。语音和画可以一起用。

## 快捷键

官方表：

| 动作 | 快捷键 |
|------|--------|
| 开关 Design Mode | `Cmd+Shift+D` |
| 框选区域 | `Shift+drag` |
| 把元素加进 chat | `Cmd+L` |
| 把元素加进输入框 | `Option+click` |

## Agent 看到什么

选中元素会补上两路信号：

| 信号 | 内容 | 为什么 |
|------|------|--------|
| **元素身份** | xpath、组件、属性、计算样式、**fiber tree** 上的 props | 找到源码，改对文件 |
| **截图** | 布局、周围元素、当时的页面状态 | 空间上下文 |

官方没写的东西（整棵 DOM、HAR、设计 token）不要编进去。

## 连续改

一处 UI 改完通常立刻看到下一处。点一个元素、说清改动、挪到页面另一边，在**第一处还没跑完**时就发出下一处。Agent 完成后应用会热更新。

这就是在界面上同时管多个 **subagents** 的方式。

iOS 应用也能进 Design Mode（对照片或前端组件点选、涂画）。那在 [Cursor for iOS](https://cursor.com/docs/cloud-agent/mobile) — 本页只讲桌面 Agents Window。

## 什么时候用

- 正在跑的页面上调间距、对齐、「让这个长得像那个」
- 挤或在动的区域，画比写更快
- 手忙：上一个 Agent 还在跑，用语音排下一个

不是视觉问题（API 契约、数据模型）就回普通 Agent 对话。需要**独立**、跟品牌走的画布和 handoff 包时，用 [Claude Design](../claude/claude-design)，不是编辑器里的这层叠加。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 像素级改动只靠文字 | 选中元素或画出区域 |
| 忘了它住在 Agents Window **浏览器** | 先开那个浏览器，再 `Cmd+Shift+D` |
| 选了慢、不擅长 UI 的模型 | 官方：**Composer 2.5** |
| 以为涂鸦会跟着动画走 | 标注在**冻结**视口帧上 |
| 和 Claude Design 搞混 | Claude Design 是独立 Web 画布；这是对着**正在跑的应用**做视觉提示 |

## 下一步

- [Cursor 教程](./cursor) — 编辑器里的 Agent / Ask / Plan / Debug
- [Cloud Agents](./cloud-agents) — 同一家族，隔离 VM
- 官方：[Design Mode](https://cursor.com/docs/agent/design-mode)、[Agents Window](https://cursor.com/docs/agent/agents-window)、[Browser](https://cursor.com/docs/agent/tools/browser)
