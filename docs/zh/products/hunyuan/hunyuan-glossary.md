---
title: 腾讯混元术语表
description: "不教操作。先分清 Hy、TokenHub、元宝、CodeBuddy，再处理两套云文档和三套思考字段。"
domain: product
tags:
  - hunyuan
  - llm-api
role: glossary
---

# 腾讯混元术语表

不教操作，只解释「为什么会撞名」。选门看 [学习地图](./index.md)。

## Hy / 混元

**是什么**：腾讯自研大模型家族的现行品牌。官网 [hunyuan.tencent.com](https://hunyuan.tencent.com/) 与 [hy.tencent.com](https://hy.tencent.com/) 是同一站。国际通稿写过「Tencent Hy, formerly known as Tencent Hunyuan」。

**不是什么**：不是元宝 App，不是 TokenHub 账号，不是一个可执行文件。

仓库、论文、老云产品仍大量使用 Hunyuan。写文档时两种叫法都要能对上官方页，不要发明第三种「混元 3.0」当产品名——当前旗舰语言模型官方名是 **Hy3**。

机制（为什么是 MoE、MTP 是什么）见 [Learn LLM](https://llm.zenheart.site/chapters/)，本页不展开。

## Hy3

**是什么**：2026-07-06 正式发布的旗舰语言模型。TokenHub slug `hy3`。开源权重 [Tencent-Hunyuan/Hy3](https://github.com/Tencent-Hunyuan/Hy3)：295B 总参数、21B 激活、256K 上下文、Apache-2.0。

托管侧能力（[模型列表](https://cloud.tencent.com/document/product/1823/130051)）：深度思考（保留式）、结构化输出、Function Calling、Cache。产品页补充了 Coding / 长文 / Agent。

**不是什么**：

- 不是 `hy3-preview`。Preview 官方标注 2026-08-31 下线。
- 不是「混元生图 / 生视频 / 生 3D」那些模态模型。
- 不是 CodeBuddy 里的某一个按钮。

## TokenHub

**是什么**：腾讯云「大模型服务平台」。文档树产品 ID **1823**。官方概述：统一入口，**整合混元并引入第三方模型**。调混元只是它的一条线。

**为什么单独成词**：2026 年 Hy3 的调用指南、价格、Key、Claude Code 接入都写在这棵树上。把它理解成「混元控制台」会漏掉「它还卖别人的模型」，也会和 1729 老树打架。

鉴权是 TokenHub 自己的 API Key，不是随便一个腾讯云 SecretId/SecretKey。

## 两套云文档

| 树 | ID | 现在怎么用 |
|----|-----|------------|
| TokenHub | 1823 | **本站主源**。Hy3、价格、OpenAI 兼容口 |
| 腾讯混元大模型 | 1729 | 仍在线。页面上还能看到 Hunyuan-T1 / TurboS 等更早规格 |

[cloud.tencent.com/product/hunyuan](https://cloud.tencent.com/product/hunyuan) 抓下来仍偏老规格；同主题的 [product/tclm](https://cloud.tencent.com/product/tclm) 已切到 Hy3。两份营销页不一致时，**以 TokenHub 文档 + hunyuan.tencent.com 为准**，并在正文点名冲突。

## 思考档位为什么有三套词

不是三个产品，是三份官方页用了不同 JSON：

| 出处 | 怎么写 |
|------|--------|
| TokenHub 调用指南 | `thinking: { type: "enabled" }`；`reasoning_effort`（`hy3` 默认 `low`） |
| tclm 产品页 | `no_think` / `think_low` / `think_high` |
| Hy3 开源 README | `extra_body.chat_template_kwargs.reasoning_effort = no_think \| low \| high`（默认 `no_think`） |

本站不猜「TokenHub 的 low 等于开源的哪一档」。照你正在打的那份文档抄字段。带 `tools` 时 TokenHub 会把 `low` 映射成 `high`（调用指南原文）。

## 同厂产品不是混元

| 名字 | 官方一句话 / 定位 | 入口 | 本站 |
|------|-------------------|------|------|
| 元宝 | 「腾讯推出的全能 AI 助手，已接入最新的混元 Hy3 模型」 | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | #76 |
| CodeBuddy | 腾讯云代码助手（IDE / CLI） | [codebuddy.cn](https://www.codebuddy.cn/) | #78 |
| WorkBuddy | 办公 Agent 工作台 | [workbuddy.cn](https://www.workbuddy.cn/) | 地图一行 |
| ima | 「以知识库为基础的 AI 知识管家」 | [ima.qq.com](https://ima.qq.com/) | 地图一行 |

它们**消费**混元（或其它模型），本身不是「混元开放能力」。Hy3 README 提到在 CodeBuddy / Cline / KiloCode 上评测，那是脚手架名字，不能反过来说混元 = CodeBuddy。

## 开源名 vs API slug

GitHub org [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan) 的仓库名偏 Hunyuan*（HunyuanVideo、HunyuanImage-3.0、Hunyuan3D-2.1）。TokenHub 的调用参数偏 `hy-*` / `hy3`。

对账时以各页原文为准，禁止「看名字像就当成同一个 model 字段」。

## 本站不写的机制

MoE 路由、MTP 推测解码、量化训练、RL 后训练流程：官方 README 有章节，但属于模型内部。需要原理时去 [LLM 基础](../../tech/fundamentals/LLM.md)。本目录只保留官方给出的**规格数字和启动命令**。
