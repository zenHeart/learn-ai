---
title: 腾讯混元速查表
description: "只查不学。slug、端点、价格以 TokenHub 当页为准。本页复核日 2026-08-19。"
domain: product
tags:
  - hunyuan
  - llm-api
role: cheatsheet
---

# 腾讯混元速查表

只查不学。价格和 slug 会变，以链出去的官方页为准。

## 决策

| 场景 | 选 |
|------|----|
| 自己的服务调语言模型 | TokenHub `hy3` |
| 网页先试用 | [AI Studio](https://aistudio.tencent.com/) |
| 翻译 | `hy-mt2-pro` / `plus` / `lite` |
| 角色扮演 | `hy-role` / `hunyuan-role-latest` |
| 生图 | `hy-image-v3.0` |
| 生 3D | `hy-3d-3.1` |
| 自建推理 | [tencent/Hy3](https://huggingface.co/tencent/Hy3)，不是 TokenHub |
| 聊天 App | 元宝，不是本表 |
| 编码 IDE | CodeBuddy，不是本表 |

## 端点与鉴权

| 项 | 值 | 来源 |
|----|----|------|
| Base URL | `https://tokenhub.tencentmaas.com/v1` | [快速入门](https://cloud.tencent.com/document/product/1823/130058) |
| Chat Completions | `POST /v1/chat/completions` | 同上 + [132252](https://cloud.tencent.com/document/product/1823/132252) |
| 鉴权 | `Authorization: Bearer <TokenHub API Key>` | 同上 |
| 协议 | OpenAI Chat Completions、OpenAI Responses、Anthropic Messages | [132252](https://cloud.tencent.com/document/product/1823/132252) |
| 控制台 | https://console.cloud.tencent.com/tokenhub | TokenHub 产品页 |

本地开源 serve 默认是 `http://127.0.0.1:8000/v1`，`api_key` 可用 `EMPTY`（Hy3 README）。

## 混元系 `model` 参数

来源：[模型列表](https://cloud.tencent.com/document/product/1823/130051)（复核 2026-08-19）。只抄混元 / Hy 行。

| 名称 | `model` | 窗口 | 最大入 / 出 | 能力（官方列） |
|------|---------|------|-------------|----------------|
| Hy3 | `hy3` | 256k | 192k / 128k | 深度思考（保留式）、结构化输出、Function Calling、Cache |
| Hy3 preview | `hy3-preview` | 256k | 192k / 128k | 交错式思考；**2026-08-31 下线** |
| Hy-MT2-Pro | `hy-mt2-pro` | 8k | 4k / 4k | 翻译旗舰 |
| Hy-MT2-Plus | `hy-mt2-plus` | 8k | 4k / 4k | 翻译 |
| Hy-MT2-Lite | `hy-mt2-lite` | 8k | 4k / 4k | 翻译轻量 |
| Hy-Role-Latest | `hunyuan-role-latest` | 32k | 28k / 4k | 角色扮演 |
| Hy-Role | `hy-role` | 32k | 28k / 4k | 角色扮演 |
| HY-Image-V3.0 | `hy-image-v3.0` | — | — | 文生图、图生图 |
| Hy-Image-Lite | `hy-image-lite` | — | — | 文生图 |
| HY-Video-1.5 | `hy-video-1.5` | — | — | 文生视频、图生视频 |
| HY-3D-3.0 | `hy-3d-3.0` | — | — | 文生 3D、图生 3D |
| HY-3D-3.1 | `hy-3d-3.1` | — | — | 文生 3D、图生 3D |
| HY-3D-Express | `hy-3d-express` | — | — | 极速 3D |
| HY-Vision-2.0-Instruct | `hy-vision-2.0-instruct` | 44k | 24k / 16k | 图生文 |
| HY-Vision-1.5-Thinking | `hunyuan-t1-vision-20250916` | 40k | 16k / 24k | 视觉深度思考 |
| HY-Vision-Video | `hunyuan-turbos-vision-video-20250728` | 32k | 24k / 8k | 视频理解 |

视觉 / 3D 的并发与任务类型以模型列表当页为准。

## 价格（后付费，元/百万 tokens）

来源：[模型价格](https://cloud.tencent.com/document/product/1823/130055)，页面「最近更新时间：2026-08-14 21:58:00」。最终以账单为准。

| 模型 | 输入 | 输出 | 缓存命中 |
|------|------|------|----------|
| Hy3 | 1 | 4 | 0.25 |
| Hy3 preview（输入 &lt; 16k） | 1.2 | 4 | 0.4 |
| Hy3 preview（16k–32k） | 1.6 | 6.4 | 0.6 |
| Hy3 preview（32k+） | 2 | 8 | 0.8 |
| Hy-MT2-Pro / Plus | 0.5 | 2 | — |
| Hy-MT2-Lite | 0.3 | 1.2 | — |
| Hy-Role / Latest | 2.4 | 9.6 | — |
| Hy-Image-3.0 | 10（且 20,000 tokens/张 → 约 0.2 元/张） | | |

免费体验：快速入门要求在模型广场领取，**额度以控制台为准**。

## 思考相关字段

| 面 | 字段 | 取值 | 来源 |
|----|------|------|------|
| TokenHub | `thinking` | `{ "type": "enabled" }` | [132252](https://cloud.tencent.com/document/product/1823/132252) |
| TokenHub | `reasoning_effort` | `hy3` 默认 `low`；可 `high`。带 `tools` 时 `low`→`high` | 同上 |
| 云产品页 tclm | 文案 | `no_think` / `think_low` / `think_high` | [tclm](https://cloud.tencent.com/product/tclm) |
| 开源 README | `chat_template_kwargs.reasoning_effort` | `no_think`（默认）/ `low` / `high` | [Hy3 README](https://github.com/Tencent-Hunyuan/Hy3) |

推荐采样（开源 README）：`temperature=0.9`，`top_p=1.0`。TokenHub 基础对话示例也用了 `temperature: 0.9`。

## 术语索引

一行一个，解释在 [术语表](./hunyuan-glossary.md)。

| 词 | 钩子 |
|----|------|
| [Hy / 混元](./hunyuan-glossary.md#hy--混元) | 模型家族，不是 App |
| [Hy3](./hunyuan-glossary.md#hy3) | 当前旗舰语言模型 |
| [TokenHub](./hunyuan-glossary.md#tokenhub) | 云上网关，卖多家模型 |
| [1729](./hunyuan-glossary.md#两套云文档) | 老混元 API 树 |
| [元宝](./hunyuan-glossary.md#同厂产品不是混元) | C 端助手 |
| [CodeBuddy](./hunyuan-glossary.md#同厂产品不是混元) | 编码工具 |

## 高质量信息源

- **[混元官网](https://hunyuan.tencent.com/)** — 模型与研究一级导航。建议访问方式：浏览器（SPA）。最后核实：2026-08-19
- **[TokenHub 文档根](https://cloud.tencent.com/document/product/1823)** — 开通、调用、计费。最后核实：2026-08-19
- **[模型列表](https://cloud.tencent.com/document/product/1823/130051)** — slug 真源。最后核实：2026-08-19
- **[混元调用指南](https://cloud.tencent.com/document/product/1823/132252)** — `hy3` 请求示例。最后核实：2026-08-19
- **[模型价格](https://cloud.tencent.com/document/product/1823/130055)** — 后付费表。最后核实：2026-08-19
- **[快速入门](https://cloud.tencent.com/document/product/1823/130058)** — Key 与第一调用。最后核实：2026-08-19
- **[Claude Code × Hy3](https://cloud.tencent.com/document/product/1823/131903)** — 官方接入。最后核实：2026-08-19
- **[Hy3 GitHub](https://github.com/Tencent-Hunyuan/Hy3)** / **[HF tencent/Hy3](https://huggingface.co/tencent/Hy3)** — 开源规格与部署。最后核实：2026-08-19
- **[org Tencent-Hunyuan](https://github.com/Tencent-Hunyuan)** — 其它开源模态。最后核实：2026-08-19
- **[Hy AI Studio](https://aistudio.tencent.com/)** — 试用。最后核实：2026-08-19
- **待核实**：Co-design 栏目的独立落地 URL（官网页头有入口，公开页抓取只拿到 SPA 壳）。
