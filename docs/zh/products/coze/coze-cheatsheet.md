---
title: 扣子 / Coze 速查表
description: "只查不学。套餐、渠道、CLI、限制和官方信息源。数字以官方页为准，付费页会变。"
domain: product
tags:
  - agent-builder
role: cheatsheet
---

# 扣子 / Coze 速查表

只查不学。价格、积分、QPM 以控制台和官方页为准。本页数字抄自 2026-08-19 打开的 [订阅套餐](https://docs.coze.cn/guides_edition.md)，企业版价格自 **2026-07-14 00:00** 起调整。

## 入口

| 用途 | URL |
|------|-----|
| 扣子（工作台） | https://www.coze.cn/ |
| 扣子编程 | https://code.coze.cn/ |
| 国内文档 | https://docs.coze.cn/ |
| 文档索引 | https://docs.coze.cn/llms.txt |
| 权益对照（控制台） | https://code.coze.cn/subscription-paywall |
| 国际站 | https://www.coze.com/ |
| 国际文档 | https://docs.coze.com/ |
| OpenAPI（国际） | https://www.coze.com/open/docs |
| 企业产品页 | https://www.volcengine.com/product/coze-pro |
| Coze Studio | https://github.com/coze-dev/coze-studio |
| Coze Loop | https://github.com/coze-dev/coze-loop |

## 决策表

| 场景 | 选 | 不要选 |
|------|----|--------|
| 可视化搭对话 Bot | 扣子编程 · 低代码智能体 | 豆包、Trae |
| 固定多步流程 | 低代码工作流 / 对话流 | 把全部判断塞进人设 |
| 一句话出全代码项目 | 扣子编程 · AI 编程 | 只在 coze.cn 里找智能体画布 |
| 终端 / 其他 Agent 操作扣子 | `@coze/cli` | 臆造 `coze-cli` 包名 |
| 和 Agent 一起办公、做视频 | 扣子 coze.cn | 本目录教程 |
| 数据必须出域 | Coze Studio | 扣子编程私有化（官方不支持） |
| 评测 / Trace | 扣子罗盘 | 把它当成搭建画布 |

术语索引（一句话，详解在 [术语表](./coze-glossary.md)）：

| 词 | 钩子 |
|----|------|
| [扣子](./coze-glossary.md#扣子) | 协作工作台 |
| [扣子编程](./coze-glossary.md#扣子编程) | 搭建平台 |
| [低代码智能体](./coze-glossary.md#低代码智能体) | 旧称 Bot |
| [工作流 / 对话流](./coze-glossary.md#工作流--对话流) | 画布编排 |
| [插件](./coze-glossary.md#插件) | API 工具集 |
| [技能](./coze-glossary.md#技能-skill) | `SKILL.md` |
| [知识库](./coze-glossary.md#知识库) | 静态检索 |
| [Coze CLI](./coze-glossary.md#coze-cli) | `coze` 命令 |
| [Coze Studio](./coze-glossary.md#coze-studio) | 开源单机核 |

## 套餐与积分

来源：[guides_edition](https://docs.coze.cn/guides_edition.md)。完整权益以 [paywall](https://code.coze.cn/subscription-paywall) 为准。

| | 个人免费 | 个人进阶 | 个人高阶 | 个人旗舰 | 个人尊享 | 团队高阶 | 团队旗舰 | 团队尊享 | 企业标准 | 企业旗舰 |
|--|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|
| 月价 | 0 | 39.9 元 | 99 元 | 199 元 | 999 元 | 198 元起 | 398 元起 | 1998 元起 | 980 元起 | 8980 元起 |
| 月积分 | ➖ | 3 万 | 9.9 万 | 19.9 万 | 99.9 万 | 19.8 万起 | 39.8 万起 | 199.8 万起 | 34.5 万起 | 207 万起 |

规则（官方原文）：

- 个人 / 团队：积分为 0 后不可使用。
- 企业：积分为 0 后**扣现金余额**。
- 团队版上线日：官方写明 **2026-06-22**。
- 个人 / 团队售后走扣子；企业版走火山引擎。

搭建相关摘录：

| 项 | 免费 | 进阶 | 高阶 | 旗舰 | 尊享 |
|----|------|------|------|------|------|
| 编程产物去 Logo | ➖ | ✔️ | ✔️ | ✔️ | ✔️ |
| 改 `.coze.site` 前缀 | ➖ | ✔️ | ✔️ | ✔️ | ✔️ |
| 自定义域名 + 免费 SSL | ➖ | ➖ | ➖ | ✔️ | ✔️ |
| 网页项目 DDoS 防护 | ➖ | ➖ | ✔️ | ✔️ | ✔️ |
| 编程项目调用 QPM | 100 | 600 | 600 | 6000 | 6000 |
| 一键部署 OpenClaw 项目 | ➖ | ➖ | ✔️ | ✔️ | ✔️ |
| 本地 Agent 数量 | 1（限时免费） | 1 | 3 | 10 | 不限制 |
| 扣子 CLI | 限时尝鲜，各档 ✔️ | | | | |

SSO、VPC 私网、自定义内容安全、会话自定义加密密钥：仅企业旗舰。企业技能商店：团队尊享或企业旗舰。

## Coze CLI

```bash
npm install -g @coze/cli --foreground-scripts
coze self skill install
coze self skill install --target trae
coze auth login --oauth
```

| 项 | 值 |
|----|-----|
| 包名 | `@coze/cli` |
| 命令 | `coze` |
| 2026-08-19 npm `latest` | `0.3.10` |
| 文档 | [developer_guides_coze_cli](https://docs.coze.cn/developer_guides_coze_cli) |
| 参数真源 | `coze --help`、[npmjs.com/package/@coze/cli](https://www.npmjs.com/package/@coze/cli) |

官方能力模块：账号与空间、AI 编程、项目资源、代码与数据、多模态内容、Agent 自动化。具体子命令随版本变，不要从博客抄。

## 发布渠道

来源：[发布概览](https://docs.coze.cn/guides_publish_overview.md)。

| 类别 | 渠道 | 智能体 | 应用 |
|------|------|--------|------|
| 扣子平台 | 商店 / 作品社区 | ✔️ | ✔️ |
| 扣子平台 | 模板 | 暂未开放 | 运营活动获奖后 |
| 社交 | 飞书、飞书多维表格 | ✔️ | 飞书 ✔️ |
| 社交 | 微信客服 / 服务号 / 订阅号 | ✔️ | ✔️ |
| 社交 | 掘金 | ✔️ | 暂不支持 |
| 小程序 | 抖音、微信 | ✔️ | ✔️ |
| 集成 | API、Chat SDK | ✔️ | ✔️ |
| 社交 | 豆包 | **2026-07-01 下线** | — |

其它：团队自定义渠道；公共渠道仅企业旗舰可公开。

## 常见限制

| 限制 | 官方说法 |
|------|----------|
| 扣子编程私有化 | 暂不支持 |
| 插件 / 空间 | 最多 1000 |
| IDE 插件 / 账号 | 最多 30 |
| 工具 / 插件 | 最多 100 |
| 自定义插件 QPS | 最大 50 |
| 插件依赖包 | 250 MB |
| 商店 / 调试对话 | 超时 10 分钟 →「运行中止」 |
| 三方付费插件 | 不能发飞书多维表格、掘金、豆包及部分公共渠道 |
| 工作流 / 图像流商店 | 已下架 |
| 抖音分身 | 2025-09-03 下架 |
| Agent 互相 @ | 人可以 @Agent；Agent 可 @人，暂不能 @其他 Agent |

## 高质量信息源

核实日期：2026-08-19。

| 源 | 用途 | 怎么抓 |
|----|------|--------|
| [docs.coze.cn/llms.txt](https://docs.coze.cn/llms.txt) | 一级导航与文档树 | 纯文本索引 |
| 同路径 `.md` | 专题正文 | 例如 `guides_quickstart.md` |
| [guides_edition](https://docs.coze.cn/guides_edition.md) | 套餐 | 会改价 |
| [guides_FAQ](https://docs.coze.cn/guides_FAQ.md) | 开源差异、下线渠道 | 优先于博客 |
| [cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq.md) | 扣子 3.0、本地/云端 Agent | |
| [developer_guides_coze_cli](https://docs.coze.cn/developer_guides_coze_cli.md) | CLI | 配 npm |
| [github.com/coze-dev/coze-studio](https://github.com/coze-dev/coze-studio) | 开源搭建 | README / wiki |
| [docs.coze.com](https://docs.coze.com/) | 国际站 | 不要和国内步骤混抄 |
| 社区课、CSDN、B 站 | 仅线索 | **数字和渠道以官方为准** |
