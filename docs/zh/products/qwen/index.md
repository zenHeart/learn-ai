---
title: 千问学习地图
description: 阿里官方 AI 助手在 qianwen.com。本目录只写千问助手。通义灵码 / Qoder CN 与百炼各占一行。
domain: product
tags:
  - chat
role: map
---

# 千问学习地图

> **千问**是阿里的消费级 AI 助手。官方首页 description（[qianwen.com](https://www.qianwen.com/)）：
> 「千问 是 **阿里官方AI助手** ,提供最强Qwen大模型体验的第一入口,助力你的工作、学习、生活。」
>
> 同页 title：`千问-阿里 AI 助手`。问候语：「你好，我是千问」。
>
> 本目录只写 **qianwen.com 千问助手**。通义灵码 / Qoder CN（#84）和百炼（#85）各占一行，正文在别的 issue。

## 写给谁 / 不写什么

**写给谁：** 需要在浏览器或电脑端里聊天、写文案、做 PPT、读文件的前端工程师。不需要仓库。

**目标：** 分清千问和同厂其它 AI 入口，按官方页面打开产品，发出第一句。

**非目标：**

- 通义灵码 / Qoder CN 安装（#84）
- 阿里云百炼 API / Token Plan（#85）
- 淘宝 / 钉钉 / ECS 操作
- 臆造会员价、默认模型 slug
- 模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）

## 产品全景

通义实验室把千问标成「个人应用」。它们**不是**同一个产品的几张皮。

```
阿里 / 通义（本目录只展开千问）
├── 千问 — 消费级助手（qianwen.com）
│   ├── 网页
│   ├── iOS / Android
│   ├── Windows / Mac 电脑端
│   └── 办公助理 / 本地电脑 / 定时任务 / 云空间 / AI创作（产品内）
├── 通义实验室 — 网关（千问 · 万相）
├── 万相 — 视觉生成模型家族（一行）
├── 通义灵码 / Qoder CN — 编码助手（#84，一行）
├── 阿里云百炼 — 模型 API 与应用平台（#85，一行）
├── Qwen Studio — 国际站助手 chat.qwen.ai（一行）
├── Qwen Code — 国际站终端编码 Agent（一行）
└── 开源 / Research — QwenLM / qwenlm.github.io（一行）
```

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| **千问**（阿里官方AI助手） | [qianwen.com](https://www.qianwen.com/) | 独立页 [qwen.md](./qwen.md) |
| 下载电脑端 / PC 客户端 | [qianwen.com/download](https://www.qianwen.com/download) | Tutorial 一节 |
| API 服务（首页顶栏） | 首页按钮；同厂平台 [百炼](https://www.aliyun.com/product/bailian) | 地图一行（#85）。<!-- TODO: 待核实首页按钮落地 URL --> |
| 通义实验室 | [tongyi.aliyun.com](https://tongyi.aliyun.com/) | 地图一行：网关；页脚「个人应用」链回千问 |
| 万相 | [landing?family=wan](https://tongyi.aliyun.com/landing?family=wan) | 地图一行 |
| 通义灵码 / Qoder CN | [lingma.aliyun.com](https://lingma.aliyun.com/)、[qoder.com.cn](https://qoder.com.cn/)、[aliyun.com/product/lingma](https://www.aliyun.com/product/lingma) | 地图一行（#84，本目录不写安装） |
| 阿里云百炼 | [aliyun.com/product/bailian](https://www.aliyun.com/product/bailian) | 地图一行（#85，本目录不写 API） |
| Qwen Studio | [chat.qwen.ai](https://chat.qwen.ai/)、[qwen.ai](https://qwen.ai/) | 地图一行：国际站；页名是 **Qwen Studio** |
| Qwen Code | [qwen.ai/qwencode](https://qwen.ai/qwencode) | 地图一行 |
| Research / 开源 | [qwenlm.github.io](https://qwenlm.github.io/)、[github.com/QwenLM](https://github.com/QwenLM) | 地图一行。<!-- TODO: 待核实实验室「开源社区」按钮落地 URL --> |
| 千问输入法 | 首页横幅；应用宝 `com.qianwen.ime` | 地图一行：同厂输入法，不拆页 |
| 淘宝 / 钉钉 / ECS | — | **非本站** |

**容易撞名：**

- **千问 ≠ 通义实验室 ≠ 万相。** 千问是助手。实验室是网关。万相是视觉生成家族。
- **千问 ≠ 通义灵码 / Qoder CN。** 千问的「代码」是对话里生成 / 检查小程序、网页、SQL。仓库 / IDE 编码不在本目录写。
- **千问 ≠ 百炼。** 首页「API 服务」不是本教程。
- **千问 ≠ Qwen Studio ≠ Qwen Code。** `chat.qwen.ai` 页上写的是 **Qwen Studio**，不是「千问国际版」。
- **办公助理 / 本地电脑 ≠ QoderWork / 千问办公。** 前两个是 qianwen.com 里的模式。后者文档在阿里云帮助中心，属 #84 周边。
- **旧名「通义」「通义千问」不是第二个产品。** 现行消费页写 **千问**。

### 快速决策：我该用哪个？

```
我要做什么？
├── 网页或电脑里聊天、写作、PPT、生图生视频、读文件、划词
│   └── → 千问（本目录）
│       ├── 先打开网页？→ qianwen.com
│       └── 要电脑端 / 划词 / 侧边栏？→ 下载电脑端
├── 在仓库或 IDE 里写代码、补全、改项目
│   └── → 通义灵码 / Qoder CN（#84，这里不写教程）
├── 在自己的程序里调模型 / 买 Token Plan
│   └── → 阿里云百炼（#85）
├── 国际站网页聊天（页名 Qwen Studio）
│   └── → chat.qwen.ai（本站不写安装）
├── 终端里的开源编码 Agent
│   └── → Qwen Code（qwen.ai/qwencode）
└── 淘宝 / 钉钉 / ECS 本身
    └── → 非本站
```

来源：[qianwen.com](https://www.qianwen.com/)、[tongyi.aliyun.com](https://tongyi.aliyun.com/)、[chat.qwen.ai](https://chat.qwen.ai/)、[qwen.ai](https://qwen.ai/)。

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 分清门 | 本页家族表 | 不要走进灵码 / 百炼 / Qwen Studio |
| 2. 打开能聊 | [千问教程](./qwen.md) | 网页发出第一句；按需装电脑端 / App |
| 3. 回查链接 | [速查表](./qwen-cheatsheet.md) | 商店、协议、同厂入口 |
| 4. 名字分清 | [术语表](./qwen-glossary.md) | 不再把灵码 / 百炼 / Studio 叫成千问 |

官方没有 How-to 文档树，本目录**不设 cookbook**。逐步点击以产品里的 UI 为准。

## 功能速查（只抄官方页）

| 能力 | 官方原文出处 |
|------|----------------|
| 阿里官方AI助手；Qwen 大模型第一入口 | [首页 description](https://www.qianwen.com/) |
| 你好，我是千问；模型标签 Qwen3.7-千问 | 首页 |
| 新建对话 / 云空间 / AI创作 / 定时任务 | 首页侧栏 |
| 快速 / 办公助理 / 本地电脑 | 首页模式 |
| PPT创作、AI生视频、AI生图、代码、翻译、AI写作、研究、录音纪要、千问高考、音视频速读 | 首页 |
| 办公助理：手机远程操控，技能与连接器，多格式交付 | 首页横幅 |
| 快捷划词：总结、翻译、创作 | 首页横幅 |
| 录音纪要：断网也能稳定录 | 首页横幅 |
| 千问输入法：300 字/分，9 种方言，无广告 | 首页横幅 |
| 电脑端侧边栏：边浏览边对话、边看边总结、即问即答 | [用户协议](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html) 1.2 |
| 办公助理交付网页 / 应用 / PPT / Word / Excel / 图片 | [App Store](https://apps.apple.com/cn/app/%E5%8D%83%E9%97%AE-%E9%98%BF%E9%87%8Cai%E5%8A%A9%E6%89%8B/id6466733523) |
| 文档一次上传 10 个；500 页超长文 | App Store |
| 代码处理：小程序 / 网页 / 小游戏 / SQL | App Store |
| Wan 2.7 视频；Qwen-Image 2.0 生图 / 修图 | App Store |

套餐与额度：2026-08-19 **没有**找到 qianwen.com 官方价目表。App Store 标「免费 · App 内购买」。不要把百炼 Token Plan 的价格写进本页。
