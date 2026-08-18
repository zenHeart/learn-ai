# Grok Voice

> Two different things share the word **Voice**.
>
> **Product Voice** is "Talk to Grok hands-free with voice" on grok.com and the iOS / Android apps ([docs.x.ai/grok/overview](https://docs.x.ai/grok/overview)).
>
> **Voice API** is the developer stack at [docs.x.ai/developers/model-capabilities/audio/voice](https://docs.x.ai/developers/model-capabilities/audio/voice): Speech to Speech, Text to Speech, Speech to Text, and custom voices.
>
> This page maps both. It is **not** Grok Build.

## Goals and non-goals

**Audience:** people who want to *talk* to Grok, or ship voice in their own app.

**Goals:** keep product Voice and the Voice API in separate boxes; list official endpoints; mark missing product-UI detail as TODO.

**Non-goals:** a full realtime event reference, invented app-button paths, or third-party voice-arena rankings as product specs.

## Product Voice (grok.com / apps)

What official pages actually say:

| Fact | Source |
|------|--------|
| Hands-free voice is a first-class Grok capability | [overview](https://docs.x.ai/grok/overview) |
| "Natural voice conversations with low-latency back and forth" / "sub-second latency" | [x.ai/grok](https://x.ai/grok) |
| Available on web, iOS, and Android with synced history | [overview](https://docs.x.ai/grok/overview), [x.ai/grok](https://x.ai/grok) |
| Voice is one slice of the **weekly SuperGrok usage pool** (with Chat, Imagine, Build, API) | [FAQ](https://docs.x.ai/grok/faq) |
| After the paid weekly cap, **free-tier Chat and Voice limits still work** and reset on their own schedule | [FAQ](https://docs.x.ai/grok/faq) |

**TODO — product Voice UI (not on docs.x.ai / x.ai / grok.com as a walkthrough):**

- Which control starts Voice on grok.com vs iOS vs Android (mic button, mode switcher, lock-screen, etc.).
- Whether product Voice exposes the API voice roster (`eve`, `ara`, …) or a shorter in-app set.
- Whether product Voice can call [Connectors](./grok-connectors.md) mid-call.
- Barge-in, transcripts, language picker, and Companion overlap (Companions are **iOS-only** per the [FAQ](https://docs.x.ai/grok/faq); that is not the same feature as Voice).

Until those pages exist, do not invent a click-path. Open grok.com or the Grok app and use the in-product Voice control you actually see.

Product Voice is a chat capability. For a teammate that keeps working on a cloud VM, use [Grok Bot](./grok-bot.md).

## Voice API

Official stack ([voice overview](https://docs.x.ai/developers/model-capabilities/audio/voice), [x.ai/api/voice](https://x.ai/api/voice)):

| Surface | Job | Official entry |
|---------|-----|----------------|
| **Speech to Speech** (Realtime) | Full-duplex voice agent, tools, barge-in | `wss://api.x.ai/v1/realtime?model=grok-voice-latest` |
| **Text to Speech** | Text → audio | `POST https://api.x.ai/v1/tts` and `wss://api.x.ai/v1/tts` |
| **Speech to Text** | Audio → text | `POST https://api.x.ai/v1/stt` and `wss://api.x.ai/v1/stt` |
| **Custom voices** | Clone from a short clip, then pass `voice_id` | `POST https://api.x.ai/v1/custom-voices` |

Audio is processed in real time and **never stored or used for training** ([voice overview](https://docs.x.ai/developers/model-capabilities/audio/voice)). Same enterprise bullets as Imagine: SOC 2 Type II, HIPAA eligible, GDPR, data residency, SSO & RBAC.

Official prices live on [developers/models](https://docs.x.ai/developers/models) (Speech to Speech, TTS per 1M characters, STT REST vs streaming). [x.ai/api/voice](https://x.ai/api/voice) also lists marketing numbers — when they disagree with `docs.x.ai`, **trust docs.x.ai**.

### Text to Speech

Convert text to spoken audio ([text-to-speech](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech)). Default voice is **`eve`**. Voice IDs are case-insensitive.

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

Official knobs worth knowing:

- `text` — required, max **15,000** characters on unary `POST /v1/tts`. WebSocket has no total cap (each `text.delta` still ≤ 15,000).
- `language` — required. BCP-47 or `auto`. Table on the TTS page lists 20 codes (`en`, `zh`, `pt-BR`, …).
- `output_format` — default **MP3 24 kHz / 128 kbps**. Codecs: `mp3`, `wav`, `pcm`, `mulaw`, `alaw`.
- `speed` — `0.7`–`1.5`.
- Speech tags — inline `[pause]` / `[laugh]`, wrapping `<whisper>…</whisper>`.
- `replace` — pronunciation map (respelling or IPA), applied before synthesis. Billing stays on the text you sent.
- `with_timestamps` — JSON envelope with base64 audio + per-character timings.
- List voices: `GET https://api.x.ai/v1/tts/voices`.
- **Never call TTS from the browser with your API key.** Proxy it.

Streaming: `wss://api.x.ai/v1/tts`, up to **50 concurrent sessions per team**.

Playground: [console.x.ai text-to-speech](https://console.x.ai/team/default/voice/text-to-speech).

### Speech to Text

Transcribe a file or a stream ([speech-to-text](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text)).

```bash
curl -X POST https://api.x.ai/v1/stt \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -F format=true \
  -F language=en \
  -F file=@audio.mp3
```

Official limits: file or `url` required; file last in the multipart body; max **500 MB**. Optional: word timestamps, `diarize`, `multichannel` (up to 8 channels), `keyterm`, `filler_words`, Inverse Text Normalization (`format=true` + `language`). Streaming: `wss://api.x.ai/v1/stt` with Smart Turn end-of-turn detection.

The Voice overview says **25 languages** for STT; the STT page lists a concrete formatting-language table. Do not collapse those two sentences into one number in a table you invent — link the page.

### Speech to Speech (Realtime)

Build a voice agent over WebSocket ([speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech)).

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

Official model slugs:

| Slug | Meaning |
|------|---------|
| `grok-voice-latest` | Alias for `grok-voice-think-fast-2.0` |
| `grok-voice-think-fast-2.0` | Flagship voice model |
| `grok-voice-think-fast-1.0` | Previous generation |

Client-side apps should use **[ephemeral tokens](https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens)** so the API key never hits the browser. Browsers cannot set WebSocket headers; pass `xai-client-secret.<token>` as the protocol.

Server-side tools on the session: `file_search`, `web_search`, `x_search`, `mcp`. Client-side: custom `function` tools. Session resumption is opt-in (`resumption.enabled`), keyed by `conversation_id`, dropped after **30 minutes** of inactivity.

Demo apps from the docs: [Web Agent](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/web), [WebRTC](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/webrtc), [Twilio](https://github.com/xai-org/xai-cookbook/tree/main/voice-examples/agent/telephony), [iOS tester](https://github.com/xai-org/xai-cookbook/tree/main/iOS/VoiceTesterApp).

### Custom voices

Clone from a reference clip (**max 120s** on the Voice overview; [x.ai/api/voice](https://x.ai/api/voice) says "two minutes"). The resulting `voice_id` works on TTS, streaming TTS, and Speech to Speech.

## When to use which

| You want | Use |
|----------|-----|
| Talk to Grok with your hands free | Product Voice on grok.com / the Grok app |
| Narrate text, captions, telephony prompts | TTS API |
| Transcribe a meeting or a live stream | STT API |
| A voice agent that searches / calls tools | Speech to Speech API |
| A named teammate on a cloud computer | [Grok Bot](./grok-bot.md), not Voice |

## Common pitfalls

- Shipping the API key in a browser Voice widget. Use ephemeral tokens or a backend proxy.
- Mixing product Voice (subscription weekly pool) with Voice API (API credits / team billing).
- Sending `response.create` before playback finishes after a tool call — official Speech-to-Speech docs warn this overlaps audio.
- Inventing an in-app settings path for choosing `eve` vs `ara`. **TODO** until xAI documents product Voice UI.

## Official docs

| Page | Use |
|------|-----|
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | Product Voice one-liner |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | Weekly pool, free-tier Voice after cap |
| [docs.x.ai/developers/model-capabilities/audio/voice](https://docs.x.ai/developers/model-capabilities/audio/voice) | API stack |
| [text-to-speech](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech) | TTS |
| [speech-to-text](https://docs.x.ai/developers/model-capabilities/audio/speech-to-text) | STT |
| [speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech) | Realtime |
| [custom-voices](https://docs.x.ai/developers/model-capabilities/audio/custom-voices) | Clone a voice |
| [x.ai/api/voice](https://x.ai/api/voice) | API marketing + live demos |
| [x.ai/grok](https://x.ai/grok) | Product marketing |

## Related pages

- [Grok Chat](./grok-chat.md) — Voice lives next to Chat
- [Imagine](./grok-imagine.md) — video preset voices share the TTS roster
- [Connectors](./grok-connectors.md)
- [Grok learning map](./index.md)
- [Glossary](./grok-glossary.md)
