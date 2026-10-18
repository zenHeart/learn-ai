# Slidev 复杂流程组件化开发规范 (Componentization Guide)

在技术分享中，当我们需要展示复杂的「工作流 (Workflow)」、「多阶段互动架构图」或「前后对比沙盒」时，直接在 Markdown 里使用 HTML `div` 和 `<v-clicks>` 堆砌会导致代码极其臃肿、难以复用。

最佳实践是：**分离关注点**。将交互逻辑和 UI 封装在 `components/*.vue` 内，并在 `.md` 页面配合自定义 `layouts/*.vue` 零代码嵌入。

## 目录结构

你需要生成（或引用）如下两种产物：

1. **Layout (布局容器)**: `layouts/full-interactive.vue`
   - **作用**: 这是承载交互组件的容器。它的核心职责是去除了 Slidev 默认的边距、Padding，将控制权完全交给你的组件，呈现**沉浸式全屏**效果。
2. **Component (交互组件)**: `components/MinimalWorkflow.vue`
   - **作用**: 包含状态机、动画和内部逻辑，自动捕获 Slidev 的 `clicks`（点击翻页状态）来驱动内部的状态流转。

## 如何在 Markdown (大纲) 中消费组件

当你在规划 PPT 大纲，比如在编写 `04.practice.md` 时，使用以下方式来调用你的全屏交互组件：

````yaml
---
# 1. 采用你创建或引用的全屏无填充 Layout
layout: full-interactive
# 2. 移除任何阻挡的内置 class (依据各自项目所用 CSS 框架定义，常为 p-0 等)
class: p-0
# 3. 非常重要：声明该页面总共包含多少次子点击状态 (Clicks)。
# 这个数值必须与你组件内部需要流转的状态数量严格对应或稍大。
clicks: 4
---

<!-- 这一页直接且唯一地挂载你的 Vue 组件，除此之外不要写其他多余的标题或文本 -->
<MinimalWorkflow />

<!-- 演讲者备注：你可以写在这里 -->
<!-- 
演讲者备注：
在这里，大家可以看到 AI 的执行环...
[click 1] 收集完上下文后...
-->
````

## 核心设计要点深入思考

1. **为什么要暴露 `clicks` 到 Frontmatter?**
   - Slidev 的核心翻页引擎通过侦听页面的 `clicks` 属性来判定这页是否“放映结束”才能跳至下一页。如果你在内部画了 5 个高亮状态的节点图，你希望观众按 4 次“右方向键”来依次点亮它们，那么必须在头部写上 `clicks: 4`。
2. **在组件内部如何监听进展？**
   - 见示例 `components/MinimalWorkflow.vue`，通过引入 `@slidev/client` 的 `useNav()`，监听内部的 `clicks.value`：
     ```javascript
     import { useNav } from "@slidev/client";
     const { clicks } = useNav();
     // clicks.value 就是当前观众按了第几次键盘。
     ```
3. **样式隔离与作用域**
   - 在 Vue 组件中使用 `<style scoped>` 确保你的样式不会污染 Slidev 其他普通的 Markdown 章节。

## 参考示例路径

- Layout 样板：`assets/examples/layouts/full-interactive.vue`
- Component 样板：`assets/examples/components/MinimalWorkflow.vue`
