---
title: 腾讯混元教程
description: "先分清门，再在 TokenHub 上用 hy3 打出第一句。开源权重另有官方部署命令，本页只给入口。"
domain: product
tags:
  - hunyuan
  - llm-api
role: tutorial
---

# 腾讯混元教程

> 本页带你走完「认产品 → 网页试用 → TokenHub 第一次调用 → 找到开源权重」。参数与价格见 [速查表](./hunyuan-cheatsheet.md)，场景配方见 [Cookbook](./hunyuan-cookbook.md)，撞名见 [术语表](./hunyuan-glossary.md)。
>
> 模型内部（MoE、MTP、注意力）不在这里讲，见 [LLM 基础](../../tech/fundamentals/LLM.md) 和 [Learn LLM](https://llm.zenheart.site/chapters/)。

## 1. 先确认你进对了门

| 你以为自己在用 | 实际是 | 下一步 |
|----------------|--------|--------|
| 「腾讯那个 AI」网页聊天 | 多半是 [元宝](https://yuanbao.tencent.com/) | 离开本页，见 #76 |
| IDE 里补全 / 改仓库 | [CodeBuddy](https://www.codebuddy.cn/) | 离开本页，见 #78 |
| 自己的服务要 `chat/completions` | **TokenHub + `hy3`** | 继续往下 |
| 下载权重自己 serve | [Tencent-Hunyuan/Hy3](https://github.com/Tencent-Hunyuan/Hy3) | 跳到 [开源权重](#开源权重) |

混元官网是 [hunyuan.tencent.com](https://hunyuan.tencent.com/)（同站 [hy.tencent.com](https://hy.tencent.com/)）。品牌文案已从 Hunyuan 迁到 **Hy**；API 和仓库里两套名字都还在。

## 2. 网页试用（可选）

官方试用台是 **Hy AI Studio**：[aistudio.tencent.com](https://aistudio.tencent.com/)。官网页头「试用 Hy」也进这里。适合确认模型口吻，不适合当生产端点。

生产调用不要抄 Studio 的页面 URL，走下一节的 TokenHub。

## 3. TokenHub：15 分钟第一次 `hy3`

事实源：[快速入门](https://cloud.tencent.com/document/product/1823/130058)、[混元调用指南](https://cloud.tencent.com/document/product/1823/132252)。

### 3.1 开通

1. [注册腾讯云](https://cloud.tencent.com/register) 并完成实名（快速入门「准备工作」原文）。
2. 登录 [TokenHub 控制台](https://console.cloud.tencent.com/tokenhub)，按界面开通。
3. 在**模型广场**右上角领「新用户福利免费体验」。额度与有效期以控制台和 [新人免费体验包](https://cloud.tencent.com/document/product/1823) 文档为准，不要把营销页的「100 万 tokens」当成所有模型的固定配额。
4. 打开 **API Key 管理** → 选地域 → **创建 API Key**。范围选「全选」或勾上 `hy3`。创建后立刻复制，页面不会反复明文展示。

TokenHub 不是混元专用网关。它还提供 DeepSeek / Kimi / GLM 等。本教程只把 `model` 设成 `hy3`。

### 3.2 调一次（TypeScript）

端点：`https://tokenhub.tencentmaas.com/v1`。鉴权：`Authorization: Bearer <API Key>`。`hy3` 兼容 OpenAI Chat Completions（以及 Responses、Anthropic Messages，见调用指南）。

官方 Node 示例把 `model` 换成 `hy3`，并带上调用指南推荐的 `temperature: 0.9`：

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENHUB_API_KEY,
  baseURL: 'https://tokenhub.tencentmaas.com/v1',
})

const response = await client.chat.completions.create({
  model: 'hy3',
  messages: [{ role: 'user', content: '你好，请简单介绍一下你自己。' }],
  temperature: 0.9,
})

console.log(response.choices[0].message.content)
```

curl 对照（[132252](https://cloud.tencent.com/document/product/1823/132252)）：

```bash
curl -X POST 'https://tokenhub.tencentmaas.com/v1/chat/completions' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${TOKENHUB_API_KEY}" \
  -d '{
    "model": "hy3",
    "messages": [{"role": "user", "content": "你好，请简单介绍一下你自己。"}],
    "stream": false,
    "temperature": 0.9
  }'
```

成功时响应里的 `model` 是 `hy3`，`choices[0].message.content` 是正文。不要把示例里的 `YOUR_API_KEY` 提交进仓库。

### 3.3 规格（托管）

来源：[模型列表](https://cloud.tencent.com/document/product/1823/130051)、[模型价格](https://cloud.tencent.com/document/product/1823/130055)。

| 项 | 官方值 |
|----|--------|
| `model` | `hy3` |
| 上下文窗口 | 256k |
| 最大输入 / 输出 | 192k / 128k |
| 能力 | 深度思考（保留式）、结构化输出、Function Calling、Cache |
| 后付费 | 输入 1 / 输出 4 / 缓存命中 0.25 **元/百万 tokens** |

`hy3-preview` 能力相近，但官方写明 **2026-08-31 下线**。新代码不要再用 preview slug。

思考档、流式、工具调用见 [Cookbook](./hunyuan-cookbook.md)。

## 4. 接到现成 coding agent

TokenHub 快速入门「通过 AI 工具调用模型」列出 Claude Code、Cursor、OpenClaw、CodeBuddy Code、Cline、Kilo Code、Roo Code 等。Hy3 在 Claude Code 里的官方步骤：[1823/131903](https://cloud.tencent.com/document/product/1823/131903)。

本页不复制那些 IDE 的安装过程。要点只有一句：把兼容端点指到 `https://tokenhub.tencentmaas.com/v1`，模型填 `hy3`，Key 用 TokenHub 的。CodeBuddy 本身怎么用，去 #78。

## 5. 开源权重

旗舰开源模型是 **Hy3**：[GitHub](https://github.com/Tencent-Hunyuan/Hy3)、[Hugging Face `tencent/Hy3`](https://huggingface.co/tencent/Hy3)。Apache-2.0。联系邮箱（README 原文）：`hunyuan_opensource@tencent.com`。

官方规格（不要改数字）：295B MoE、21B 激活、3.8B MTP、256K 上下文、192 experts top-8。README 原文：满血 serve 建议 **8 卡**，推荐 H20-3e 或显存更大的 GPU。这不是「笔记本 `ollama run`」那条路。

本地先起服务，再打 OpenAI 兼容口（README Quickstart）：

```python
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="EMPTY")

response = client.chat.completions.create(
    model="hy3",
    messages=[{"role": "user", "content": "Hello! Can you briefly introduce yourself?"}],
    temperature=0.9,
    top_p=1.0,
    extra_body={"chat_template_kwargs": {"reasoning_effort": "no_think"}},
)
print(response.choices[0].message.content)
```

启动命令以仓库 README 为准。两套 parser **不要抄混**：

- vLLM：`--tool-call-parser hy_v3`、`--reasoning-parser hy_v3`
- SGLang：`--tool-call-parser hunyuan`、`--reasoning-parser hunyuan`

同 org 还有 HunyuanVideo、HunyuanImage-3.0、Hunyuan3D-2.1、HunyuanOCR 等。下载哪个仓，看你要的模态，不要假设都能用 `hy3` 这个 slug 调用。

## 6. 常见失败

| 现象 | 先查 |
|------|------|
| 401 | Key 没带、带了腾讯云 CAM 密钥而不是 TokenHub API Key |
| 模型不存在 | `model` 写成了 `hunyuan` / `Hy3` / `hy3-preview`（后者临近下线） |
| 思考字段对不上 | TokenHub 用 `thinking` / `reasoning_effort`；本地 README 用 `chat_template_kwargs`。见 [术语表](./hunyuan-glossary.md) |
| 想找 CLI | 混元没有第一方 CLI。终端 Agent 是 CodeBuddy |

下一步：[Cookbook](./hunyuan-cookbook.md) 或 [速查表](./hunyuan-cheatsheet.md)。
