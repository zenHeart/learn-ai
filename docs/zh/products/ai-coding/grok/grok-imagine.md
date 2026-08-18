# Grok Imagine

> **Imagine** 是 xAI 的生图 / 视频面。消费端入口是 [grok.com/imagine](https://grok.com/imagine)。API 入口是 [Imagine API](https://docs.x.ai/developers/model-capabilities/imagine)：
> "The Imagine API lets you generate and edit images and videos with Grok Imagine models."
>
> 本页同时画**产品**（聊天 + grok.com/imagine + iOS/Android）和 **API**。对位 Claude Design / Gemini Flow——创作面，**不是**编程 Agent。

## 目标与非目标

**写给谁：** 想在 Grok 里出图 / 短视频，或在自己的程序里调 Imagine API 的人。

**目标：** 把产品 Imagine 和 Imagine API 分开，列出官方模型与工作流，指向文档。

**非目标：** 再抄一遍完整 REST 参考、臆造配额，或写三方「Grok 4.3 / 200 万 token」。不要把 Imagine 当成 Grok Build。

## 两扇门

| 门 | 给谁 | 入口 |
|----|------|------|
| **产品 Imagine** | grok.com / iOS / Android 的聊天用户 | [grok.com/imagine](https://grok.com/imagine)，或在 [Grok 聊天](./grok-chat.md) 线程里生成 |
| **Imagine API** | 你自己的应用 | [docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine)，playground 在 [console.x.ai](https://console.x.ai) |

[x.ai/grok](https://x.ai/grok) 一句话：用文本或参考图生图 / 生视频；改风格、编辑、迭代，不用离开对话。该页营销数字：静帧最高 **2K**，视频最长 **15 秒**（功能网格里视频还写过「最长 15 秒、720p」——分辨率上限还跟套餐有关，见 FAQ）。

付费用量与 Chat / Voice / Build 抽**同一份每周 SuperGrok 池**（[FAQ](https://docs.x.ai/grok/faq)）。本页不臆造某档套餐含多少张图。

## 产品 Imagine

官方消费端事实：

- [overview](https://docs.x.ai/grok/overview)："Create images and video with Grok Imagine."
- [x.ai/news/grok-imagine-image-2](https://x.ai/news/grok-imagine-image-2)（2026-08-07）：**Imagine Image 2.0** 作为 **Quality Mode** 在 grok.com/imagine 与 iOS / Android App 正式可用。
- 同一篇：产品工具包括 **magic wand**（改你点的区域）、**segmentation**、**抠背景**、**多参考编辑（最多 5 张输入图）**、**smart resize** 换画幅，以及 **templates**（修图、产品图、证件照、图标、游戏资产等）。
- [x.ai/news/grok-imagine-video-1-5-references](https://x.ai/news/grok-imagine-video-1-5-references)（2026-07-31）：**文生视频**与**原生 1080p**（文生视频、图生视频）已在 grok.com/imagine、iOS、Android 正式可用。图像 + 语音参考先在美国对 SuperGrok Heavy / SuperGrok Plus 开放，再铺开。每次生成最多 **7** 张参考图。

### 产品侧会撞上的规则（[FAQ](https://docs.x.ai/grok/faq)）

- 生成的图和视频带 **Grok 水印**。没有去水印开关。去掉、改、遮水印违反 Acceptable Use Policy。
- 打开 **NSFW** **不会**关掉审核。CSAM 与非自愿私密影像一律禁止。
- **720p 视频在你这一档的 720p 额度用完后自动回落到 480p**。

## Imagine API

官方总览（[imagine](https://docs.x.ai/developers/model-capabilities/imagine)）：文生图、最多 **3** 张参考图的改图、文生 / 图生视频、改视频、reference-to-video、视频续写，以及 Files API。

API 改图的 **3 张上限**，和产品 Image 2.0 的「最多 5 张输入图」不是同一个数字。引用你正在看的那一页。

### 模型（官方 slug）

| 用途 | 官方选型（[developers/models](https://docs.x.ai/developers/models)、[imagine](https://docs.x.ai/developers/model-capabilities/imagine)） |
|------|------------------------------------------------------------------------------------------------------------------------------------------|
| 图 | `grok-imagine-image-2.0` |
| 视频 | `grok-imagine-video-1.5` |

[x.ai/api/imagine](https://x.ai/api/imagine)：最高 **2K**，单次最多 **10** 张图，视频最长 **15s**。生图按张一口价。改图按**输入图 + 输出图**计。视频按秒，时长和分辨率都影响价格。价格以 [developers/models](https://docs.x.ai/developers/models) / [pricing](https://docs.x.ai/developers/pricing#imagine-api-pricing) 为准——不要抄三方表。

### 生图

端点：`POST https://api.x.ai/v1/images/generations`。官方旋钮（[images/generation](https://docs.x.ai/developers/model-capabilities/images/generation)）：

- `n` — 一次多张（总览：最多 10）。
- `aspect_ratio` — `1:1`、`16:9` / `9:16`、`4:3` / `3:4`、`3:2` / `2:3`、`2:1` / `1:2`、`19.5:9` / `9:19.5`、`20:9` / `9:20`、`auto`。
- `resolution` — `1k` 或 `2k`。
- `quality` — `low` 或 `medium`（默认 `medium`）。**仅** `grok-imagine-image-2.0`。
- 默认返回**临时 URL**。尽快下载，或要 base64。

```bash
curl -X POST https://api.x.ai/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -d '{
    "model": "grok-imagine-image-2.0",
    "prompt": "A collage of London landmarks in a stenciled street-art style",
    "aspect_ratio": "16:9",
    "resolution": "2k"
  }'
```

改图：`POST https://api.x.ai/v1/images/edits`，公网 URL 或 `data:` URI（[imagine](https://docs.x.ai/developers/model-capabilities/imagine)）。

### 生视频

端点：`POST https://api.x.ai/v1/videos/generations`，再轮询 `GET https://api.x.ai/v1/videos/{request_id}`（[video/generation](https://docs.x.ai/developers/model-capabilities/video/generation)）。

官方约束：

| 旋钮 | 官方范围 |
|------|----------|
| `duration` | 1–15 秒 |
| `aspect_ratio` | `1:1`、`16:9` / `9:16`（默认 `16:9`）、`4:3` / `3:4`、`3:2` / `2:3` |
| `resolution` | `480p`（默认）、`720p`；`grok-imagine-video-1.5` 的文生视频 / 图生视频支持 `1080p`。reference-to-video 最高 720p |
| 状态 | `pending` → `done` / `expired` / `failed` |
| 模式（每次只能一种） | 文生视频、图生视频、reference-to-video、改视频、续写 |

**不要**同时传 `image` 和 `reference_images`（400）。视频 URL 也是临时的。

```bash
REQUEST_ID=$(curl -s -X POST https://api.x.ai/v1/videos/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -d '{
    "model": "grok-imagine-video-1.5",
    "prompt": "A glowing crystal-powered rocket launching from Mars",
    "duration": 10,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }' | jq -r '.request_id')

curl -s "https://api.x.ai/v1/videos/$REQUEST_ID" \
  -H "Authorization: Bearer $XAI_API_KEY"
```

xAI SDK 的 `generate()` 会帮你轮询。REST 必须自己轮询。

视频配音：reference-to-video 上的预设 `voice_id`（与 TTS 同一套）一般可用。**用你自己的音频做 voice reference** 仅对 trusted partner 开放，需 [单独申请](https://x.ai/contact-sales?interest=imagine)（[video/generation](https://docs.x.ai/developers/model-capabilities/video/generation)、[news](https://x.ai/news/grok-imagine-video-1-5-references)）。

生成媒体会过内容审核，且**不用于训练**（[imagine](https://docs.x.ai/developers/model-capabilities/imagine)）。该页企业条目：SOC 2 Type II、HIPAA eligible、GDPR、数据驻留、SSO & RBAC。

## 什么时候用哪个

| 你想要 | 用 |
|--------|----|
| 在 Grok 里出一张海报 / 一段片子 | 产品 Imagine：grok.com/imagine 或对话里 |
| 在自己的产品里出图 / 视频 | Imagine API |
| 一个能打开的网站 / 游戏，`*.grok.me` 链接 | grok.com 上的 **Build Mode**，不是 Imagine（[x.ai/grok/build-mode](https://x.ai/grok/build-mode)） |
| 改真实 git 仓库 | [Grok Build](./grok-cli.md) |

## 常见陷阱

- 把产品编辑器的 **5 张图** 和 API 改图的 **3 张上限** 混为一谈。
- 以为 API 每种模式都能 1080p——reference-to-video 最高 720p；改视频保持输入分辨率，且封顶 720p。
- 把 Imagine 输出晾在临时 URL 上。
- 把 Imagine 写成「Grok 4.3、200 万上下文」。图 / 视频 slug 是 `grok-imagine-*`。编码旗舰是 `grok-4.6`。
- 去掉产品水印。官方禁止。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [grok.com/imagine](https://grok.com/imagine) | 消费端工作室 |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | 聊天能力里的 Imagine |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | 水印、NSFW、720p 回落、每周池 |
| [docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine) | API 总览 |
| [images/generation](https://docs.x.ai/developers/model-capabilities/images/generation) | 静帧 |
| [video/generation](https://docs.x.ai/developers/model-capabilities/video/generation) | 视频 |
| [x.ai/api/imagine](https://x.ai/api/imagine) | API 营销 |
| [x.ai/news/grok-imagine-image-2](https://x.ai/news/grok-imagine-image-2) | Image 2.0 / Quality Mode |
| [x.ai/news/grok-imagine-video-1-5-references](https://x.ai/news/grok-imagine-video-1-5-references) | 1080p、参考图 |

## 相关页面

- [Grok 聊天](./grok-chat.md) — 对话里也能 Imagine
- [Voice](./grok-voice.md) — 视频预设音色与 TTS 共用名单
- [Grok 学习地图](./index.md)
- [术语表](./grok-glossary.md)
