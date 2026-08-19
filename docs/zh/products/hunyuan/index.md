---
title: 腾讯混元学习地图
description: "混元（Tencent Hy）是腾讯的模型与开放能力，不是元宝，也不是 CodeBuddy。本目录只教怎么认模型、怎么在 TokenHub 上调 Hy3、怎么找到开源权重。"
domain: product
tags:
  - hunyuan
  - llm-api
role: map
---

# 腾讯混元学习地图

> **混元 / Tencent Hy** 是腾讯自研的大模型家族，以及把这些模型开放给开发者的通道。官网定义自己是「全链路自研」的模型与研究站（[hunyuan.tencent.com](https://hunyuan.tencent.com/)）。云上调用走 [TokenHub](https://cloud.tencent.com/document/product/1823)。
>
> 本目录**只写模型与开放能力**。元宝、CodeBuddy、WorkBuddy、ima 是同厂其它产品，只在下面家族图占一行。

## 产品全景

好几个腾讯入口都带「混元」或「Hy」。它们**不是**同一个产品的四张皮。

```
腾讯 AI（与混元相关的官方一级）
├── 混元 / Hy — 模型、研究、开源（本目录主线）
│   ├── Hy 模型（Hy3、Hy-MT2、生图 / 生视频 / 生 3D / 视觉理解 / ASR）
│   ├── 研究（Hy3 技术帖、Hyra 等）
│   ├── Co-design / International（官网栏目，不是独立调用面）
│   ├── 试用 Hy（Hy AI Studio）
│   └── 开源权重（GitHub Tencent-Hunyuan / Hugging Face tencent/Hy3）
├── TokenHub — 云上模型网关（调混元，也卖第三方模型）
├── 腾讯混元大模型（云产品 1729，老 API 树）
├── 元宝 — C 端助手（接入了 Hy3）          → issue #76
├── CodeBuddy — 编码 IDE / CLI               → issue #78
├── WorkBuddy — 办公 Agent
└── ima — 知识管家
```

| 入口 | 是什么 | 官方 URL | 本站去向 |
|------|--------|----------|----------|
| **Hy 模型 / 混元官网** | 模型与研究主站 | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | 本页 + [教程](./hunyuan.md) |
| **TokenHub** | 统一大模型 API（混元 + 第三方） | [产品页](https://cloud.tencent.com/product/tokenhub) / [文档 1823](https://cloud.tencent.com/document/product/1823) | [教程](./hunyuan.md) / [Cookbook](./hunyuan-cookbook.md) / [速查](./hunyuan-cheatsheet.md) |
| 试用 Hy（AI Studio） | 网页里试用对话 / 多模态 | [aistudio.tencent.com](https://aistudio.tencent.com/) | 教程一节，不拆页 |
| 开源权重 | Hy3 等 Apache-2.0 权重与部署脚本 | [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan) / [tencent/Hy3](https://huggingface.co/tencent/Hy3) | 教程一节 + 速查 |
| 研究 | 技术帖与论文 | [research](https://hunyuan.tencent.com/research) / [Hy3 帖](https://hy.tencent.com/research/hy3) | 地图一行 |
| Co-design / International | 官网一级栏目 | [hunyuan.tencent.com](https://hunyuan.tencent.com/) 页头 | 地图一行；不是新产品 |
| 腾讯混元大模型（1729） | 更早的云 API 产品树 | [product/hunyuan](https://cloud.tencent.com/product/hunyuan) / [文档 1729](https://cloud.tencent.com/document/product/1729) | 地图一行。Hy3 正文以 TokenHub 为准 |
| 元宝 | 全能 AI 助手，已接入 Hy3 | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | 地图一行，正文见 #76 |
| CodeBuddy | 腾讯云代码助手 | [codebuddy.cn](https://www.codebuddy.cn/) | 地图一行，正文见 #78 |
| WorkBuddy | 办公 Agent 工作台 | [workbuddy.cn](https://www.workbuddy.cn/) / [云产品页](https://cloud.tencent.com/product/workbuddy) | 地图一行，不写教程 |
| ima | 以知识库为基础的 AI 知识管家 | [ima.qq.com](https://ima.qq.com/) | 地图一行，不写教程 |
| 招聘 / 人脸识别 / 云主机 / 短信 | 官网或腾讯云一级 nav 里的非本主题项 | — | **非本站** |

**容易撞名的几条**（展开见 [术语表](./hunyuan-glossary.md)）：

- **混元 / Hy ≠ 元宝**。混元是模型；元宝是 C 端助手。
- **Hy3 ≠ TokenHub ≠ AI Studio**。模型、网关、试用台是三件事。
- **没有官方 `hunyuan` CLI**。终端里写代码的是 CodeBuddy，不是本目录。
- **开源仓库名 ≠ TokenHub 的 `model` 参数**。例如权重 `HunyuanImage-3.0` 对 API slug `hy-image-v3.0`。

### 快速决策：我该走哪扇门？

```
我要做什么？
├── 在网页里先试试 Hy3 / 翻译 / 多模态
│   └── → Hy AI Studio（aistudio.tencent.com）或官网「试用 Hy」
├── 在自己的前端 / Node 服务里调混元
│   └── → TokenHub，model = hy3（本目录主线）
├── 把 Hy3 接到 Claude Code / Cursor 等现成 coding agent
│   └── → TokenHub「接入 AI 工具」；Hy3 示例见官方 1823/131903
│       └── 不要在本目录找 CodeBuddy 教程（那是 #78）
├── 本机 / 自建集群跑开源权重
│   └── → github.com/Tencent-Hunyuan/Hy3（官方写的是 8 卡级 GPU）
├── 只要聊天、搜索、写文档，不写代码
│   └── → 元宝（#76），不是本目录
├── 要 IDE 补全 / 仓库 Agent
│   └── → CodeBuddy（#78），不是混元 CLI
└── 云主机 / 对象存储 / 短信
    └── → 非本站。不要在混元文档里找
```

来源：[hunyuan.tencent.com](https://hunyuan.tencent.com/)、[TokenHub 文档](https://cloud.tencent.com/document/product/1823)、[混元调用指南](https://cloud.tencent.com/document/product/1823/132252)。

## 什么时候值得看这套文档

**值得看**

- 你要在 TypeScript / Node 里用 OpenAI 兼容 SDK 调一个国内模型，官方推荐入口是 TokenHub，slug 是 `hy3`。
- 你已经在用 Claude Code / Cursor，想换成或兼用 Hy3（官方有接入页）。
- 你要对照开源权重和托管 API，而不是再装一个腾讯编码 IDE。

**先别看**

- 你要的是元宝那种聊天 App —— 去 #76。
- 你要的是 CodeBuddy 的补全和仓库 Agent —— 去 #78。
- 你想搞懂 MoE / MTP / 注意力为什么这样设计 —— 去 [LLM 基础](../../tech/fundamentals/LLM.md) 和 [Learn LLM](https://llm.zenheart.site/chapters/)。本目录不写模型内部。

## 学习路径

| 阶段 | 读 | 目标 |
|------|----|------|
| 1. 认门 | 本页家族图 | 不再把元宝 / TokenHub / Hy3 当成同一个东西 |
| 2. 调通 | [教程](./hunyuan.md) | 15 分钟内用 TokenHub 打出第一句 `hy3` |
| 3. 接到工作流 | [Cookbook](./hunyuan-cookbook.md) | 流式、思考档、Function Calling、Claude Code |
| 4. 查参数 | [速查表](./hunyuan-cheatsheet.md) | slug、价格、端点、数据源 |
| 5. 分清名字 | [术语表](./hunyuan-glossary.md) | 两套官方页谁说了算 |

## 模型速查（只列官方已给 slug 的混元系）

完整表以 [TokenHub 模型列表](https://cloud.tencent.com/document/product/1823/130051) 为准。价格只抄 [模型价格](https://cloud.tencent.com/document/product/1823/130055)（2026-08-14）。

| 官方名 | `model` | 窗口（入 / 出） | 一句话（官方） |
|--------|---------|-----------------|----------------|
| Hy3 | `hy3` | 192k / 128k（窗口 256k） | 「基于真实业务场景打磨……强化 Coding、长文、推理和 Agent」 |
| Hy3 preview | `hy3-preview` | 同上 | 官方标注 **2026-08-31 下线**，不要当默认 |
| Hy-MT2-Pro / Plus / Lite | `hy-mt2-pro` 等 | 4k / 4k | 翻译专项 |
| Hy-Role / Latest | `hy-role` / `hunyuan-role-latest` | 28k / 4k | 角色扮演 |
| HY-Image-V3.0 | `hy-image-v3.0` | — | 文生图 / 图生图 |
| HY-3D-3.1 | `hy-3d-3.1` | — | 文生 3D / 图生 3D |

Hy3 托管价：输入 **1** / 输出 **4** / 缓存命中 **0.25** 元/百万 tokens。开源权重是另一条线，见 [教程 · 开源](./hunyuan.md#开源权重)。

## 本目录不写什么

- 元宝、CodeBuddy、WorkBuddy、ima 的完整教程。
- TokenHub 上的 DeepSeek / Kimi / GLM 选型（那是网关能力，不是混元）。
- 腾讯云非 AI 产品（CVM、COS、短信、域名）。
- 模型内部训练与推理机制。

## 相关页面

- [教程](./hunyuan.md) — 试用、第一次 API、开源入口
- [Cookbook](./hunyuan-cookbook.md)
- [速查表](./hunyuan-cheatsheet.md)
- [术语表](./hunyuan-glossary.md)
- [LLM 基础](../../tech/fundamentals/LLM.md)
- [产品总览](../ai-coding/)
