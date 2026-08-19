---
title: 通义灵码学习地图
description: "通义灵码是阿里云的智能编码助手，2026-05-20 起系列名改为 Qoder CN。本目录只写插件和独立 IDE；通义千问、百炼、CLI、办公助手只在家族图占一行。"
domain: product
tags:
  - coding-agent
role: map
---

# 通义灵码学习地图

> **通义灵码**（TONGYI Lingma / Lingma）是阿里云的智能编码助手，提供代码智能生成、智能问答、多文件修改、编程智能体。对位 Copilot / Cursor。
>
> 官方已于 **2026-05-20** 把系列名改为 **Qoder CN**。帮助中心原文：「Qoder CN 系列原名“智能编码助手通义灵码”（Lingma），已于 2026 年 5 月 20 日正式更名。如您在其他渠道看到“通义灵码”相关内容，与本产品为同一产品。」（[什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)）
>
> 本目录**只写编码子产品**：独立 IDE + IDE 插件。同厂其它 AI 产品只在下面家族图占一行。

## 产品家族

官方一级入口来自 [什么是 Qoder CN 系列](https://help.aliyun.com/zh/lingma/introduction-of-lingma) 和 [docs.qoder.cn 系列介绍](https://docs.qoder.cn/product-overview/introduction-of-qodercn)。营销站 [lingma.aliyun.com](https://lingma.aliyun.com/) 仍用旧品牌。

```
阿里云 AI（本站只展开编码助手）
├── 通义灵码 / Qoder CN（编码）——本目录
│   ├── Qoder CN IDE（营销站仍写 Lingma IDE）
│   ├── JetBrains 插件（现行迭代面）
│   ├── Visual Studio Code 插件（官方已标放缓 / 停更）
│   └── Visual Studio 插件
├── Qoder CN CLI —— 终端，地图一行
├── QoderWork CN —— 办公桌面助手，地图一行
├── QoderWake CN —— 数字员工，地图一行
├── Qoder Cloud Agents —— 云端托管，地图一行
├── Qoder CN Mobile —— 移动端，地图一行
├── 通义千问 —— 通用对话，地图一行（#83）
└── 阿里云百炼 —— 模型平台，地图一行（#85）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **通义灵码 / Qoder CN**（IDE + 插件） | [lingma.aliyun.com](https://lingma.aliyun.com/) · [qoder.com.cn](https://qoder.com.cn/) | **独立页**（本目录） |
| Qoder CN CLI | [qoder.com.cn/cli](https://qoder.com.cn/cli) | 地图一行。终端形态，不是插件，本目录不写正文 |
| QoderWork CN | [什么是 QoderWork CN](https://help.aliyun.com/zh/lingma/what-is-qoderwork-cn) | 地图一行。日常办公助手，不是编码 IDE |
| QoderWake CN | [qoder.com.cn/qoderwake](https://qoder.com.cn/qoderwake) | 地图一行。数字员工 |
| Qoder Cloud Agents | [qoder.com.cn/cloud-agents](https://qoder.com.cn/cloud-agents) | 地图一行。云端托管 Agent 平台 |
| Qoder CN Mobile | [qoder.com.cn/mobile](https://qoder.com.cn/mobile) | 地图一行。移动指挥面 |
| **通义千问** | [qianwen.com](https://www.qianwen.com/) | 地图一行。通用对话助手，另 issue #83 |
| **阿里云百炼** | [产品页](https://www.aliyun.com/product/bailian) | 地图一行。模型 / Agent 开发平台，另 issue #85 |
| 淘宝 / ECS / 支付等非 AI | — | **非本站**。Retrieve 时阿里云首页会冒出，这里不写 |

**不要当成同一产品：**

| 容易混的 | 区别 |
|---------|------|
| 通义灵码 vs **通义千问** | 编码助手 vs 通用对话。本目录不写千问 |
| 通义灵码 vs **百炼** | IDE / 插件 vs 模型平台。本目录不写百炼 |
| **Lingma IDE / Qoder CN IDE** vs 插件 | 独立编辑器，开箱即用；插件装进你已有的 JetBrains / VS Code / Visual Studio |
| 会话里的 **智能体模式** vs **Qoder CN CLI** vs **Cloud Agents** | 本机 IDE 里跑任务；终端子产品；云端托管平台 |
| 营销站搜「通义灵码（TONGYI Lingma）」vs 帮助中心搜「Qoder CN」 | 同一插件的新旧展示名，安装时按你打开的那一页原文搜 |

### 快速决策：我该用哪个？

```
我现在要干什么？
├── 在已有 JetBrains IDE 里写代码
│   └── → JetBrains 插件（官方现行迭代面）
├── 想要开箱即用的 AI IDE，不想再装插件
│   └── → Qoder CN IDE（营销站：Lingma IDE）
├── 还在 VS Code 里
│   └── → 插件仍可装，但官方已写更新放缓 / 停止维护
│       └── 遇到问题，官方建议切到 Qoder CN IDE
├── 在 Visual Studio 里
│   └── → Visual Studio 插件（智能会话暂仅智能问答）
├── 只在终端里派活，不打开 IDE
│   └── → Qoder CN CLI（本目录不写，见家族图）
├── 写文档 / 整理文件 / 办公自动化
│   └── → QoderWork CN（本目录不写）
└── 跟模型对话、或自己调 API
    └── → 通义千问 / 百炼（本目录不写）
```

## 该读哪一篇

本组按 [Diataxis](https://diataxis.fr/) 拆分：

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./lingma) | Tutorial | 第一次用：装 IDE 或插件 → 登录 → 补全 → 三种会话 |
| [实战 Cookbook](./lingma-cookbook) | How-to | 已经会基本操作，要抄模式选择、提示、Agent、MCP |
| [Cheatsheet](./lingma-cheatsheet) | Reference | 查安装 URL、兼容版本、快捷键、套餐、数据源 |
| [术语表](./lingma-glossary) | Explanation | 更名、形态、模式、「不是什么」 |

## 学习路径

| 阶段 | 目标 | 链接 |
|------|------|------|
| 1. 分清名字 | 灵码 = 现 Qoder CN 编码子产品；不是千问、不是百炼 | 上面的家族图；[术语表](./lingma-glossary) |
| 2. 装上能登录 | 选 IDE 或插件，抄官方安装原文，用阿里云账号登录 | [教程 · 安装](./lingma#第-1-步装上) |
| 3. 用上补全和会话 | 行间续写 + 智能问答 / 文件编辑 / 智能体 | [教程 · 第 3–4 步](./lingma#第-3-步行间代码补全) |
| 4. 让它干活 | 智能体、终端命令确认、MCP | [Cookbook](./lingma-cookbook) |
| 5. 回查 | 快捷键、套餐、官方页 | [Cheatsheet](./lingma-cheatsheet) |

## 功能速查

官方能力清单来自 [什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn) 和 [智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)。

| 能力 | 一句话 | 文档 |
|------|--------|------|
| 行间代码补全 | 按当前文件和跨文件上下文生成行级 / 函数级代码 | [教程](./lingma) |
| 行间建议预测（NES） | 按修改和光标位置预测下一处变更，Tab 接受 | [Cookbook](./lingma-cookbook) · [官方](https://help.aliyun.com/zh/lingma/next-edit-suggestion) |
| 智能问答 Ask | 只回答，不改工程文件 | [术语表](./lingma-glossary) |
| 文件编辑 Edit | 按你给的范围改多文件；**Lingma IDE / JetBrains 不支持** | [官方](https://help.aliyun.com/zh/lingma/edit) |
| 智能体 Agent | 自主拆任务、改文件、跑终端；可接 MCP | [Cookbook](./lingma-cookbook) |
| 工程自动感知 | 按任务描述感知框架、技术栈、相关文件、报错 | [官方产品页](https://lingma.aliyun.com/) |
| 记忆感知 | 对话中积累个人 / 工程 / 问题记忆 | [官方](https://help.aliyun.com/zh/lingma/memory) |
| MCP | 智能体可调用你配置的 MCP；可走魔搭等广场 | [Cookbook](./lingma-cookbook) |
| 模型选择器 / 专家团 / Quest / RepoWiki | IDE 侧升级能力；按 Credits 计 | [术语表](./lingma-glossary) |

## 时效性提醒

- **品牌**：2026-05-20 起官方系列名是 Qoder CN。旧教程里的「通义灵码」仍指同一产品。
- **VS Code 插件**：帮助中心仍给安装步骤，同时写更新放缓；计费页写「停止演进」；新文档站写「已停止维护」。不要再把它写成现行主入口。
- **文件编辑模式**：官方写明 Lingma IDE 和 JetBrains 插件不支持；Visual Studio 智能会话暂仅智能问答。
- **套餐**：2026-05-20 起引入 Credits；个人专业版限免已结束。价格只看 [计费说明](https://help.aliyun.com/zh/lingma/billing-description) 打开的表。
- **文档站**：帮助中心提示最新能力以 [docs.qoder.cn](https://docs.qoder.cn/) 为准。

## 资源链接

- [通义灵码官网](https://lingma.aliyun.com/)
- [Qoder CN 官网](https://qoder.com.cn/)
- [docs.qoder.cn](https://docs.qoder.cn/)
- [阿里云帮助中心 · Qoder CN / 通义灵码](https://help.aliyun.com/zh/lingma/)
- [Cheatsheet · 高质量信息源](./lingma-cheatsheet#高质量信息源)
