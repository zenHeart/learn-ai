---
title: 阿里云百炼速查表
description: 查地域、Key、Base URL、套餐对照。模型全表和单价只链官方页。
domain: product
tags:
  - model-platform
role: cheatsheet
---

# 阿里云百炼速查表

> 查阅用。学习走 [地图](./index) 和 [教程](./bailian)。概念走 [术语表](./bailian-glossary)。

**最后核实：2026-08-19。** 模型 ID、套餐价、主机名以当时打开的官方页为准。

## 选哪条路

| 我要做的事 | 用 | 官方页 |
|------------|----|--------|
| 自己的服务里调模型 | 按量 API + OpenAI 兼容 | [首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) |
| 编程工具里包月用模型 | Token Plan（官方推荐新订）或 Coding Plan | [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)、[Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) |
| 无代码问答 / 智能体 | 控制台应用，优先 Agent 2.0 | [Agent 2.0](https://help.aliyun.com/zh/model-studio/new-single-agent-application) |
| 本机 Agent 调度多模态能力 | 百炼 CLI `bl` | [安装说明](https://bailian.aliyun.com/cli/install.md) |
| 只聊天 | 通义千问（#83） | 不是百炼 |
| 阿里云编码 IDE | Qoder CN / 灵码（#84） | [接入说明](https://help.aliyun.com/zh/model-studio/lingma-agent) |

## 地域

中国站产品简介（2026-08-19）：华北 2（北京）、美国（弗吉尼亚）、新加坡、德国（法兰克福）、日本（东京）。

| 事实 | 出处 |
|------|------|
| Key、Endpoint、模型、功能、价格按地域隔离 | [产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio) |
| 中国站新人免费额度只在北京 | [新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota) |
| 国际站简介把免费额度写在新加坡 | [What is Model Studio](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) |
| Token Plan 目前仅北京 | [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview) |
| 国际站侧栏还出现中国（香港） | 国际站简介；中国站简介未列。用哪一站就认哪一站 |

开通后不支持关闭服务。停调用 = 删 Key。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## API Key

| 项 | 官方值 |
|----|--------|
| 环境变量 | `DASHSCOPE_API_KEY` |
| 按量（升级后新建） | `sk-ws` 开头，只展示一次 |
| 按量（升级前） | `sk-` 开头，仍可用 |
| Coding Plan / Token Plan 专属 | `sk-sp-` |
| 北京 / 新加坡 / 东京 / 法兰克福 | 每主账号每地域最多 50 个 |
| 美国（弗吉尼亚） | 每归属账号最多 20 个；无禁用/重置 |
| 有效期 | 无过期；删除即失效 |
| 子账号被删 | 其创建的 Key 全部失效 |

来源：[获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key)。

## Base URL

把 `{WorkspaceId}` 换成控制台里的业务空间 ID。

| 地域 | OpenAI 兼容（模型清单 / 首次调用） | Anthropic 兼容（模型清单） |
|------|-----------------------------------|----------------------------|
| 华北 2（北京） | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/apps/anthropic` |
| 新加坡 | `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/apps/anthropic` |
| 日本（东京） | `https://{WorkspaceId}.ap-northeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.ap-northeast-1.maas.aliyuncs.com/apps/anthropic` |
| 德国（法兰克福） | `https://{WorkspaceId}.eu-central-1.maas.aliyuncs.com/compatible-mode/v1` | `https://{WorkspaceId}.eu-central-1.maas.aliyuncs.com/apps/anthropic` |
| 美国（弗吉尼亚） | `https://dashscope-us.aliyuncs.com/compatible-mode/v1`（[模型清单](https://help.aliyun.com/zh/model-studio/models)） | `https://dashscope-us.aliyuncs.com/apps/anthropic` |

DashScope 原生主机把路径换成 `/api/v1`，见同一张模型清单。

**两份官方页不一致，写在这里避免各抄各的：**

- 产品简介的美国示例仍出现 `{WorkspaceId}.us-east-1.maas.aliyuncs.com`。本表美国行跟**模型清单**。
- Coding Plan 页把按量 OpenAI 主机写成 `https://dashscope.aliyuncs.com/compatible-mode/v1`。新代码跟**首次调用 / 模型清单**。

Coding Plan 专属：

- OpenAI：`https://coding.dashscope.aliyuncs.com/v1`
- Anthropic：`https://coding.dashscope.aliyuncs.com/apps/anthropic`

Token Plan 专属主机以控制台为准，不要复用上表 Coding Plan 行。

## 模型怎么查

禁止在本站维护一份「当前全量模型表」。打开：

- [选择模型](https://help.aliyun.com/zh/model-studio/models)
- [模型调用价格](https://help.aliyun.com/zh/model-studio/model-pricing)

产品简介的档位：Max = 最强；Plus = 多数场景推荐；Flash = 低延迟。2026-08 简介点名最新旗舰 `qwen3.8-max`。首次调用示例用的是 `qwen-plus`。

FAQ：`qwen-plus-latest` 属于 Qwen3 系列，**不是** Qwen3.5 / Qwen3.7 的别名。Qwen3.5、Qwen3.7 是并列系列。

## 套餐对照（数字会变，下单页优先）

核实日打开的 [Token Plan 概述](https://help.aliyun.com/zh/model-studio/token-plan-overview) 与 [Coding Plan 概述](https://help.aliyun.com/zh/model-studio/coding-plan)：

| | Token Plan 个人版 | Token Plan 团队版 | Coding Plan Pro |
|--|-------------------|-------------------|-----------------|
| 计量 | Credits，7 天窗口 | Credits / 座席 / 月 | 请求次数（5 小时 / 周 / 月三档封顶，先到先停） |
| 2026-08-19 页上标价 | Lite 限时 39 元/月（原价 60）；Standard 139（180）；Pro 499（600） | 标准座席限时 150 元/座席/月（198）；高级 550（698）；尊享 1,398 | 200 元/月；官方写过首月 39.90，以下单页为准 |
| 地域 | 仅北京 | 仅北京 | 见该页 |
| 数据训练 | 个人版**会**用于服务改进（产品简介「重要」） | 团队版承诺不用于训练 | **会**用于服务改进与模型优化 |
| 退款 | 以该页 / 协议为准 | 以该页 / 协议为准 | 官方写**不支持退款** |
| 现状 | 官方推荐新订 | 多席位 | Lite 2026-03-20 停新购，2026-04-13 停续费；Pro 限量 |

Coding Plan Pro 页上的用量封顶（核实日）：每 5 小时 6,000 次、每周 45,000、每月 90,000。简单任务约 5–10 次，复杂约 10–30+ 次。

抵扣顺序（按量实时推理）：新人免费额度 > 资源包 > 节省计划 > 账户余额。[新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota)、[计费项](https://help.aliyun.com/zh/model-studio/billing-for-model-studio)

Batch 为实时价的 50%，且**不能**用免费额度 / 节省计划 / 资源包。[计费项](https://help.aliyun.com/zh/model-studio/billing-for-model-studio)

万相会员不能抵扣百炼 API。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## 百炼 CLI

| 项 | 官方值 |
|----|--------|
| npm 包 | `bailian-cli` |
| 命令 | `bl`、`bailian` |
| Node | ≥ 22.12.0 |
| 安装 | `npm install -g bailian-cli`（不要用 pnpm / yarn 装这个包） |
| 登录 | `bl auth login --console` |
| 验活 | `bl text chat --message "ping" --non-interactive --output json` |
| 地域开关 | `--region cn\|us\|intl`，默认 `cn` |

不是 `aliyun bailian`。

## 术语索引

一行一个，解释在术语表。

| 术语 | 钩子 |
|------|------|
| [百炼 / Model Studio](./bailian-glossary#百炼-model-studio) | 平台，不是聊天窗口 |
| [千问](./bailian-glossary#千问-qwen) | 模型，也是另一款产品 |
| [灵码 / Qoder CN](./bailian-glossary#灵码--qoder-cn) | IDE |
| [DashScope](./bailian-glossary#dashscope) | 旧接口品牌；变量名还在 |
| [业务空间](./bailian-glossary#业务空间-workspace) | 隔离权限和账单 |
| [三种协议](./bailian-glossary#三种调用协议) | OpenAI / Anthropic / DashScope |
| [Token Plan vs Coding Plan](./bailian-glossary#token-plan-vs-coding-plan) | 两套不能迁移的订阅 |
| [Agent 1.0 vs 2.0](./bailian-glossary#agent-10-vs-20) | 不能升级，只能新建 |
| [百炼 CLI vs 阿里云 CLI](./bailian-glossary#百炼-cli-vs-阿里云-cli) | `bl` ≠ `aliyun bailian` |

## 高质量信息源

**最后一次系统性核实：2026-08-19。**

### S 级：官方唯一真相源

| 来源 | 用途 |
|------|------|
| [什么是阿里云百炼](https://help.aliyun.com/zh/model-studio/what-is-model-studio) | 产品定义、地域、计费边界 |
| [选择模型](https://help.aliyun.com/zh/model-studio/models) | 模型 ID、地域、三种 Base URL |
| [首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) | 开通、示例代码 |
| [获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key) | Key 格式、限额、环境变量 |
| [计费项](https://help.aliyun.com/zh/model-studio/billing-for-model-studio) | 推理 / 训练 / 部署 |
| [模型调用价格](https://help.aliyun.com/zh/model-studio/model-pricing) | 单价 |
| [新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota) | 90 天、用完即停 |
| [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview) | Credits 套餐 |
| [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) | 请求次套餐、专属 URL |
| [接入客户端](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/) | 第三方工具 |
| [CLI 安装说明](https://bailian.aliyun.com/cli/install.md) | `bailian-cli` 命令 |
| [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio) | 开通/关闭/千问区别 |

### A 级：官方但偏营销或更新慢

| 来源 | 用途 |
|------|------|
| [产品落地页](https://www.aliyun.com/product/bailian) | 能力宣传；数字以帮助文档为准 |
| [国际站简介](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) | 国际地域与侧栏家族 |
| [控制台](https://bailian.console.aliyun.com/) | 实际开通与额度 |
| [CLI 落地页](https://bailian.console.aliyun.com/cli) | CLI 能力介绍 |
| [合规与隐私](https://help.aliyun.com/zh/model-studio/privacy-notice) | 与套餐页对照数据用途 |
| [服务协议](https://terms.alicdn.com/legal-agreement/terms/common_platform_service/20230728213935489/20230728213935489.html) | 第 5.2 条（Coding Plan 点名） |

### B 级：需交叉验证

开发者社区文章、第三方博客。模型 ID 和 Base URL 过期极快，只当线索，命令以 S 级为准。

## 相关页面

- [学习地图](./index)
- [教程](./bailian)
- [Cookbook](./bailian-cookbook)
- [术语表](./bailian-glossary)
