# Grok Voice

> **Voice** 这个词指两件不同的事。
>
> **产品 Voice** 是 grok.com 与 iOS / Android App 上的 "Talk to Grok hands-free with voice"（[docs.x.ai/grok/overview](https://docs.x.ai/grok/overview)）。
>
> **Voice API** 是开发者栈，文档在 [docs.x.ai/developers/model-capabilities/audio/voice](https://docs.x.ai/developers/model-capabilities/audio/voice)：Speech to Speech、Text to Speech、Speech to Text、自定义音色。
>
> 本页两面都画。它**不是** Grok Build。

## 目标与非目标

**写给谁：** 想跟 Grok 说话，或在自己的应用里接语音的人。

**目标：** 把产品 Voice 和 Voice API 分箱；列出官方端点；产品 UI 细节找不到就标 TODO。

**非目标：** 完整 realtime 事件手册、臆造 App 按钮路径，或把三方 voice-arena 排名写成产品规格。

## 产品 Voice（grok.com / App）

官方页实际写了的：

| 事实 | 来源 |
|------|------|
| 免提语音是 Grok 的一等能力 | [overview](https://docs.x.ai/grok/overview) |
| "Natural voice conversations with low-latency back and forth" / "sub-second latency" | [x.ai/grok](https://x.ai/grok) |
| Web、iOS、Android 可用，历史同步 | [overview](https://docs.x.ai/grok/overview)、[x.ai/grok](https://x.ai/grok) |
| Voice 是**每周 SuperGrok 用量池**的一块（与 Chat、Imagine、Build、API 共享） | [FAQ](https://docs.x.ai/grok/faq) |
| 付费周上限撞上后，**免费档 Chat 与 Voice 限额仍可用**，按自己的周期重置 | [FAQ](https://docs.x.ai/grok/faq) |

**TODO — 产品 Voice UI（docs.x.ai / x.ai / grok.com 没有操作走查页）：**

- grok.com / iOS / Android 上到底点哪个控件开始 Voice（麦克风、模式切换、锁屏等）。
- 产品 Voice 是否暴露 API 那套音色名单（`eve`、`ara` …），还是 App 内更短的列表。
- 产品 Voice 通话中能否调 [Connectors](./grok-connectors.md)。
- 插话、转写、语言选择，以及和 Companion 的重叠（[FAQ](https://docs.x.ai/grok/faq) 写 Companions **仅 iOS**；那不是 Voice 本身）。

在这些页出现之前，不要编点击路径。打开 grok.com 或 Grok App，用你实际看到的 Voice 控件。

产品 Voice 是聊天能力。要合上笔记本还在云 VM 上干活的同事，用 [Grok Bot](./grok-bot.md)。

## Voice API

官方栈（[voice overview](https://docs.x.ai/developers/model-capabilities/audio/voice)、[x.ai/api/voice](https://x.ai/api/voice)）：

| 面 | 干什么 | 官方入口 |
|----|--------|----------|
| **Speech to Speech**（Realtime） | 全双工语音 Agent、工具、插话 | `wss://api.x.ai/v1/realtime?model=grok-voice-latest` |
| **Text to Speech** | 文本 → 音频 | `POST https://api.x.ai/v1/tts` 与 `wss://api.x.ai/v1/tts` |
| **Speech to Text** | 音频 → 文本 | `POST https://api.x.ai/v1/stt` 与 `wss://api.x.ai/v1/stt` |
| **自定义音色** | 短音频克隆，再传 `voice_id` | `POST https://api.x.ai/v1/custom-voices` |

音频实时处理，**不存储、不用于训练**（[voice overview](https://docs.x.ai/developers/model-capabilities/audio/voice)）。企业条目与 Imagine 相同：SOC 2 Type II、HIPAA eligible、GDPR、数据驻留、SSO & RBAC。

官方价格在 [developers/models](https://docs.x.ai/developers/models)（Speech to Speech、TTS 每百万字符、STT REST vs 流式）。[x.ai/api/voice](https://x.ai/api/voice) 也有营销数字——和 `docs.x.ai` 不一致时，**信 docs.x.ai**。

### Text to Speech

文本转语音（[text-to-speech](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech)）。默认音色 **`eve`**。Voice ID 大小写不敏感。

```bash
curl -X POST https://api.x.ai/v1/tts \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! Welcome to the xAI Text to Speech API.",
    "voice_id": "eve",
    "language": "en"
  }' \
  --output hello.mp3
```

值得记住的官方旋钮：

- `text` — 必填，一元 `POST /v1/tts` 最多 **15,000** 字符。WebSocket 无总上限（单条 `text.delta` 仍 ≤ 15,000）。
- `language` — 必填。BCP-47 或 `auto`。TTS 页表格列了 20 个代码（`en`、`zh`、`pt-BR` …）。
- `output_format` — 默认 **MP3 24 kHz / 128 kbps**。编码：`mp3`、`wav`、`pcm`、`mulaw`、`alaw`。
- `speed` — `0.7`–`1.5`。
- Speech tags — 行内 `[pause]` / `[laugh]`，包裹 `<whisper>…</whisper>`。
- `replace` — 发音替换表（拼写或 IPA），合成前生效。计费仍按你发送的原文。
- `with_timestamps` — JSON 信封：base64 音频 + 逐字符时间。
- 列音色：`GET https://api.x.ai/v1/tts/voices`。
- **永远不要在浏览器里用 API key 直接打 TTS。** 走后端代理。

流式：`wss://api.x.ai/v1/tts`，每团队最多 **50** 个并发会话。

Playground：[console.x.ai text-to-speech](https://console.x.ai/team/default/voice/text-to-speech)。

### Speech to Text

转写文件或流（[speech-to-text](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text)）。

```bash
curl -X POST https://api.x.ai/v1/stt \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -F format=true \
  -F language=en \
  -F file=@audio.mp3
```

官方限制：必须提供 `file` 或 `url`；`file` 必须是 multipart 最后一个字段；最大 **500 MB**。可选：词级时间戳、`diarize`、`multichannel`（最多 8 声道）、`keyterm`、`filler_words`、逆文本正规化（`format=true` + `language`）。流式：`wss://api.x.ai/v1/stt`，带 Smart Turn 话轮检测。

Voice 总览写 STT 支持 **25 种语言**；STT 页另有一张具体的 formatting 语言表。不要把这两句压成你自己发明的一张数字表——链回原页。

### Speech to Speech（Realtime）

用 WebSocket 做语音 Agent（[speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech)）。

```javascript
import WebSocket from "ws";

const ws = new WebSocket("wss://api.x.ai/v1/realtime?model=grok-voice-latest", {
  headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` },
});

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: {
      voice: "eve",
      instructions: "You are a helpful customer support agent.",
      turn_detection: { type: "server_vad" },
      tools: [{ type: "web_search" }],
    },
  }));
});
```

官方模型 slug：

| Slug | 含义 |
|------|------|
| `grok-voice-latest` | `grok-voice-think-fast-2.0` 的别名 |
| `grok-voice-think-fast-2.0` | 旗舰语音模型 |
| `grok-voice-think-fast-1.0` | 上一代 |

客户端应用应使用 **[ephemeral tokens](https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens)**，不要把 API key 放到浏览器。浏览器不能设 WebSocket header；协议里传 `xai-client-secret.<token>`。

会话上的服务端工具：`file_search`、`web_search`、`x_search`、`mcp`。客户端：自定义 `function`。会话恢复需显式打开（`resumption.enabled`），用 `conversation_id` 做键，**30 分钟**不活动即丢。

文档里的 demo：[Web Agent](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/web)、[WebRTC](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/webrtc)、[Twilio](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/telephony)、[iOS tester](https://github.com/xai-org/xai-cookbook/tree/main/iOS/VoiceTesterApp)。

### 自定义音色

用参考音频克隆（Voice 总览写 **最长 120s**；[x.ai/api/voice](https://x.ai/api/voice) 写 "two minutes"）。得到的 `voice_id` 可用于 TTS、流式 TTS、Speech to Speech。

## 什么时候用哪个

| 你想要 | 用 |
|--------|----|
| 免提跟 Grok 说话 | grok.com / Grok App 上的产品 Voice |
| 念稿、字幕、电话提示音 | TTS API |
| 转写会议或直播 | STT API |
| 会搜索 / 调工具的语音 Agent | Speech to Speech API |
| 云电脑上的具名同事 | [Grok Bot](./grok-bot.md)，不是 Voice |

## 常见陷阱

- 在浏览器语音组件里塞 API key。用 ephemeral token 或后端代理。
- 把产品 Voice（订阅每周池）和 Voice API（API credit / 团队账单）混成一笔账。
- 工具调用后、播放还没完就发 `response.create`——官方 Speech-to-Speech 文档警告会叠音。
- 臆造 App 设置路径去选 `eve` / `ara`。在 xAI 写出产品 Voice UI 之前标 **TODO**。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | 产品 Voice 一句话 |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | 每周池、撞上限后的免费 Voice |
| [docs.x.ai/developers/model-capabilities/audio/voice](https://docs.x.ai/developers/model-capabilities/audio/voice) | API 栈 |
| [text-to-speech](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech) | TTS |
| [speech-to-text](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text) | STT |
| [speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech) | Realtime |
| [custom-voices](https://docs.x.ai/developers/model-capabilities/audio/custom-voices) | 克隆音色 |
| [x.ai/api/voice](https://x.ai/api/voice) | API 营销 + 在线 demo |
| [x.ai/grok](https://x.ai/grok) | 产品营销 |

## 相关页面

- [Grok 聊天](./grok-chat.md) — Voice 挨着 Chat
- [Imagine](./grok-imagine.md) — 视频预设音色与 TTS 共用名单
- [Connectors](./grok-connectors.md)
- [Grok 学习地图](./index.md)
- [术语表](./grok-glossary.md)
