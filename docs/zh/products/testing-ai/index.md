---
title: Testing AI 学习地图
description: 这不是单一厂商产品。本目录是 AI 测试工具表，主教程走 Midscene（官方 Playwright / 视觉自动化）。
domain: product
tags:
  - testing
role: map
---

# Testing AI 学习地图

> 货架上的 **Testing AI** 是本站分类，不是某个公司的产品名。
>
> 主路径选 **Midscene**：开源、视觉驱动 UI 测试，可嵌进 Playwright / Vitest。官方（[introduction](https://midscenejs.com/introduction)）：
> 用自然语言描述操作目标，多模态模型根据**截图**规划并操作界面。

## 写给谁 / 不写什么

**写给谁：** 已经会 Playwright 或想用自然语言补 UI 断言的前端。

**非目标：** 把 Jest/Vitest 本身写成 AI 产品；给 Qodo / ZeroStep / Reflect 各写一套五文件；编造已失效的 `ai()` helper 当现行官方 API。

## 产品目录（官方一级）

| 官方名称 | 官方 URL | 一句话 | 本站去向 |
|----------|----------|--------|----------|
| **Midscene** | [midscenejs.com](https://midscenejs.com/) · [introduction](https://midscenejs.com/introduction) · [GitHub](https://github.com/web-infra-dev/midscene) | 视觉驱动 UI 测试 SDK | [教程](./testing-ai.md) |
| Qodo（原 Codium / CodiumAI） | [qodo.ai](https://www.qodo.ai/) · [更名](https://www.qodo.ai/blog/introducing-qodo-a-new-name-the-same-commitment-to-quality/) | AI code review + 测例生成 | **目录一行** |
| ZeroStep | [zerostep.com](https://zerostep.com/) | Playwright 上的自然语言步骤 | 目录一行；旧站摘抄勿当现行 API |
| Reflect | [reflect.run](https://reflect.run/) | 无代码 E2E | 目录一行 |
| Playwright | [playwright.dev](https://playwright.dev/) | 微软 E2E，**不是** AI 产品 | 一行：宿主，不是本货架主角 |
| 本站 Midscene 笔记 | | 技术向 | [Midscene UI 自动化](/zh/tech/testing/midscene-ui-automation) |

**容易撞名：** Testing AI ≠ Midscene ≠ Qodo；CodiumAI 已更名 **Qodo**；Playwright ≠ Midscene。

### 快速决策

```
我要做什么？
├── 在已有 Playwright / Vitest 里用自然语言点界面
│   └── → Midscene（本目录教程）
├── PR / IDE 里审代码、补单测
│   └── → Qodo（官网，本目录不写安装）
└── 只要稳定选择器 E2E
    └── → Playwright 本身（非本站 AI 产品）
```

## 学习路径

[教程 · Midscene](./testing-ai.md) → [速查](./testing-ai-cheatsheet.md) → [术语](./testing-ai-glossary.md)
