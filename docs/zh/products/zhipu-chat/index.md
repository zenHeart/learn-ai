---
title: 智谱清言 / Z.ai 学习地图
description: 写给谁：要选智谱对话面的前端工程师。主路径是智谱清言和 Z.ai 对话，不是 GLM Coding Plan。
domain: product
tags:
  - coding-agent
role: map
---

# 智谱清言 / Z.ai 学习地图

> **智谱清言** 是智谱的国内生成式助手。官方定义（[chatglm.cn](https://chatglm.cn)）：
> 「基于 GLM 大模型，不只是 AI 助手，更是能帮你把事办成的 Agent。」
>
> **Z.ai** 是同一厂商的国际对话面。官方 title（[chat.z.ai](https://chat.z.ai)）：
> 「Z.ai - Advanced AI Chatbot & Agent powered by GLM-5.2」
>
> 本目录对位 Claude.ai。它**不是** GLM Coding Plan，也不是 ZCode / AutoClaw。编码套餐只在下面占一行。

## 目标与非目标

**写给谁：** 前端工程师，要先分清该打开哪个官方入口。你需要浏览器或清言 App，不需要仓库。

**目标：** 画出官方一级 AI 产品，并带你进清言 / Z.ai 对话。

**非目标：** Coding Plan 安装、API 快速开始、模型内部机制（链 [Learn LLM](/zh/tech/fundamentals/LLM)）、臆造每日额度或现行人民币价。

## 产品全景

智谱（公司站 [zhipuai.cn](https://www.zhipuai.cn/zh)）下面有多张 AI 皮。它们**不是**同一个聊天窗口。

```
智谱 / Z.ai
├── 对话（本目录主路径）
│   ├── 智谱清言 — chatglm.cn、官方 App
│   └── Z.ai — chat.z.ai / z.ai
├── 编码套餐 / 桌面编码
│   ├── GLM Coding Plan — 给 Claude Code 等工具配额度
│   └── ZCode — 官方代码工具
├── Agent / 办公
│   ├── AutoGLM
│   └── AutoClaw（本地 OpenClaw 客户端）
├── 开放平台 / API
│   ├── BigModel（bigmodel.cn）
│   └── docs.z.ai
└── 其它官方 AI 入口（地图一行）
    ├── Zread.ai
    ├── AMiner
    ├── 智谱学习中心
    ├── 智谱 AI 输入法
    ├── CodeGeeX
    └── 开源 GLM 权重
```

| 产品 | 是什么 | 入口 | 本站去向 |
|------|--------|------|----------|
| **智谱清言** | 国内对话 / Agent 助手 | [chatglm.cn](https://chatglm.cn) | [Tutorial](./zhipu-chat.md) |
| **Z.ai 对话** | 国际对话 / Agent 助手 | [chat.z.ai](https://chat.z.ai) | 同一 Tutorial |
| **GLM Coding Plan** | 编码工具订阅，不是聊天安装 | [z.ai/subscribe](https://z.ai/subscribe)、[bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding) | 地图一行（#75） |
| **ZCode** | 官方代码工具 | [zcode.z.ai/cn](https://zcode.z.ai/cn) | 地图一行 |
| **AutoGLM / AutoClaw** | 报告 / 浏览器操作 / 本地客户端 | [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) | 地图一行 |
| **BigModel / Z.ai API** | 模型 HTTP API | [bigmodel.cn](https://bigmodel.cn)、[docs.z.ai](https://docs.z.ai) | 地图一行 |
| **Zread.ai / AMiner / 学习中心 / AI 输入法** | 公司页「原生产品」列出 | [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | 地图一行；独立 URL 以公司页为准 |
| **CodeGeeX** | 智能编程助手（官方新闻） | [公司新闻](https://www.zhipuai.cn/en/news/20) | 地图一行 |
| **开源 GLM** | 模型权重 | [github.com/zai-org/GLM-5](https://github.com/zai-org/GLM-5) | 地图一行 |
| 商业生态 / IR / 招聘 | 非 AI 产品手册 | 公司页 | **非本站** |

官方把「在线体验」写成两个链接（[GLM-5.2 研究页](https://www.zhipuai.cn/zh/research/161)）：**Z.ai = chat.z.ai**，**智谱清言 App/网页版 = chatglm.cn**。

**容易撞名：**

- **清言 ≠ Z.ai 对话。** 两个入口，两套协议主体。没有官方「一个账号打通」。
- **ChatGLM** 是历史模型 / 商店文案里的名字，不是现在要记的产品 URL。
- **对话里写代码 ≠ GLM Coding Plan。** 后者是给 Claude Code 等工具的额度，见 #75。
- **AutoGLM ≠ AutoClaw。** 公司页两者都列。

细节见 [术语表](./zhipu-chat-glossary.md)。

### 快速决策：我该用哪个？

```
我要做什么？
├── 在浏览器里对话 / 写作 / 看图看文档 / 做 PPT 或研究报告
│   ├── 人在国内、要中文产品面 → 智谱清言（chatglm.cn 或官方 App）
│   └── 人在国际面、页面是 Z.ai → chat.z.ai
├── 在 Claude Code / Cline 等工具里用 GLM 额度
│   └── → GLM Coding Plan（本目录不写安装）
├── 要官方桌面代码工具
│   └── → ZCode
├── 要报告 / 网页自动操作 / 本地小龙虾客户端
│   └── → AutoGLM / AutoClaw
└── 在自己的程序里调模型
    └── → BigModel 或 docs.z.ai API
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 选对入口 | 上面的决策树 | 不把 Coding Plan 打开当清言 |
| 2. 会用对话 | [智谱清言 / Z.ai 教程](./zhipu-chat.md) | 登录、发第一条、知道芯片是什么 |
| 3. 回查入口 | [速查表](./zhipu-chat-cheatsheet.md) | URL、决策、信息源 |
| 4. 名字打架 | [术语表](./zhipu-chat-glossary.md) | 清言 / Z.ai / ChatGLM / Coding Plan |

没有独立 cookbook：官方没有可引用的 How-to 文档树。

## 相关页面

- [智谱清言 / Z.ai 教程](./zhipu-chat.md)
- [速查表](./zhipu-chat-cheatsheet.md)
- [术语表](./zhipu-chat-glossary.md)
- [产品总览](../index.md)
