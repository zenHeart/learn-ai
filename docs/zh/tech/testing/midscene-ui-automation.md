# Midscene.js — AI 驱动的 UI 自动化测试

> 来源：[Midscene.js 官方文档](https://midscenejs.com/zh/)

## 概述

Midscene.js 是字节跳动 Web Infra 团队开源的 **AI 驱动、视觉感知**的 UI 自动化测试工具。通过自然语言交互，开发者无需编写传统选择器（XPath/CSS），即可完成 Web、移动端、桌面端等多端自动化测试。

- **GitHub Stars**: 12k+
- **Github 趋势榜**: 第 2 名
- **支持平台**: Web、Android、iOS、HarmonyOS、Linux、macOS、Windows

## 核心特性

### 用自然语言编写 UI 自动化脚本

- 描述你的目标和步骤，Midscene 会为你规划和操作用户界面
- 由视觉语言模型驱动，适用于 Web、移动端、桌面端，甚至任意界面
- 使用 JavaScript SDK 或 YAML 格式编写自动化脚本

### 全平台支持

| 平台 | 说明 |
|------|------|
| Web | 与 Puppeteer/Playwright 集成，或使用桥接模式控制桌面浏览器 |
| Android | 使用 JS SDK 配合 adb 控制本地 Android 设备 |
| iOS | 使用 JS SDK 配合 WebDriverAgent 控制本地 iOS 设备 |
| 任意界面 | 使用 JS SDK 控制自定义界面 |

### 面向开发者

- **三种类型的 API**：
  - 交互 API：与用户界面交互
  - 数据提取 API：从用户界面和 DOM 中提取数据
  - 实用 API：`aiAssert()`（断言）、`aiLocate()`（定位）、`aiWaitFor()`（等待）
- **MCP Server**：将 Midscene Agent 的原子操作暴露为 MCP 工具
- **使用缓存提高效率**：使用缓存能力重放脚本
- **调试体验**：可视化回放报告、内置 Playground 和 Chrome 插件

## 视觉语言模型驱动

Midscene.js 在 UI 操作上采用**纯视觉（Pure Vision）路线**：

- **元素定位和交互只基于截图完成**，不再依赖 DOM
- 适用于 Web、移动端、桌面应用，甚至任意场景
- **UI 操作无需 DOM，Token 更少、成本更低、运行更快**
- 数据提取和页面理解可按需附带 DOM 信息
- 支持开源模型，方便自托管

### 支持的视觉模型

| 模型 | 说明 |
|------|------|
| 豆包 Seed | 视觉模型，针对 UI 元素识别优化 |
| Qwen3-VL | 视觉语言模型，高性价比 |
| Gemini-3-Pro | 多模态模型，强大视觉能力 |
| UI-TARS | 开源智能体模型 |

## 两种自动化风格

### 风格一：自动规划（Auto Planning）

AI 自主规划执行流程，完成任务：

```javascript
await aiAct('逐一点击所有记录。如果某个记录包含文本"completed"，则跳过它');
```

### 风格二：工作流风格（Workflow）

将复杂逻辑拆分为多个步骤，提高稳定性：

```javascript
const recordList = await agent.aiQuery('string[], the record list');

for (const record of recordList) {
    const hasCompleted = await agent.aiBoolean(
        `check if the record ${record}" contains the text "completed"`
    );
    if (!hasCompleted) {
        await agent.aiTap(record);
    }
}
```

## 核心 API

### 交互 API

`aiAct()` — 执行 UI 操作（点击、输入、滚动等）

```javascript
await aiAct('点击"提交"按钮');
```

### 数据提取 API

`aiQuery()` — 从页面中提取结构化数据

```javascript
const data = await aiQuery('JSON, 用户列表，包含用户名和邮箱');
```

### 断言 API

`aiAssert()` — 自然语言断言

```javascript
await aiAssert('页面显示"操作成功"提示');
```

### 定位 API

`aiLocate()` — 定位界面元素

```javascript
const position = await aiLocate('搜索输入框');
```

### 等待 API

`aiWaitFor()` — 等待特定条件

```javascript
await aiWaitFor('加载动画消失');
```

## 技术架构

### 依赖的开源项目

- **Rsbuild / Rslib** — 构建工具
- **UI-TARS** — 开源智能体模型
- **Qwen2.5-VL** — 开源 VL 模型
- **scrcpy** — Android 设备控制
- **Puppeteer / Playwright** — 浏览器自动化
- **Appium** — 移动端自动化

## 实战案例

- Web: 在 GitHub 浏览器中自主注册表单，通过所有字段校验
- iOS: 美团下单咖啡
- iOS: Twitter 自动点赞
- Android: 懂车帝查看小米 SU7 参数
- Android: Booking 预订东京圣诞酒店

## 总结

Midscene.js 通过纯视觉方案 + 多模型支持 + 丰富的 API，为 UI 自动化测试提供了全新的 AI Native 解决思路，大幅降低了自动化测试的门槛和维护成本。
