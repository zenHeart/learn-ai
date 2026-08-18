# Grok Imagine

> **Imagine** is xAI's image and video surface. Official consumer entry is [grok.com/imagine](https://grok.com/imagine). Official API entry is the [Imagine API](https://docs.x.ai/developers/model-capabilities/imagine):
> "The Imagine API lets you generate and edit images and videos with Grok Imagine models."
>
> This page maps the **product** (chat + grok.com/imagine + iOS/Android) and the **API**. Analog: Claude Design / Gemini Flow — a creative surface, **not** a coding agent.

## Goals and non-goals

**Audience:** people who want images or short video from Grok, either in the app or from `api.x.ai`.

**Goals:** separate product Imagine from the Imagine API, list official models and workflows, point at docs.

**Non-goals:** a second copy of the full REST reference, invented quotas, or third-party "Grok 4.3 / 2M token" claims. Do not treat Imagine as Grok Build.

## Two doors

| Door | Who it is for | Entry |
|------|---------------|-------|
| **Product Imagine** | Chat users on grok.com / iOS / Android | [grok.com/imagine](https://grok.com/imagine), or generate inside a [Grok Chat](./grok-chat.md) thread |
| **Imagine API** | Your own app | [docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine), playground on [console.x.ai](https://console.x.ai) |

[x.ai/grok](https://x.ai/grok) describes the product in one line: generate images and video from text or reference photos; restyle, edit, and iterate without leaving the conversation. Marketing numbers on that page: **up to 2K** stills and **15-second** videos (video also listed as "up to 15 seconds at 720p" in the feature grid — resolution caps also depend on plan, see FAQ).

Paid usage draws from the **same weekly SuperGrok pool** as Chat / Voice / Build ([FAQ](https://docs.x.ai/grok/faq)). This page does not invent how many images a plan includes.

## Product Imagine

Official consumer facts:

- [overview](https://docs.x.ai/grok/overview): "Create images and video with Grok Imagine."
- [x.ai/news/grok-imagine-image-2](https://x.ai/news/grok-imagine-image-2) (2026-08-07): **Imagine Image 2.0** is generally available as **Quality Mode** on grok.com/imagine and the iOS / Android apps.
- Same post: product tools include a **magic wand** (edit the region you point at), **segmentation**, **background removal**, **multi-ref editing (up to 5 input images)**, **smart resize** to another aspect ratio, and **templates** (photo edit, product shots, headshots, icons, game assets, and more).
- [x.ai/news/grok-imagine-video-1-5-references](https://x.ai/news/grok-imagine-video-1-5-references) (2026-07-31): **text-to-video** and **native 1080p** (text-to-video and image-to-video) are generally available on grok.com/imagine, iOS, and Android. Image + voice references started in the US for SuperGrok Heavy and SuperGrok Plus, then rolled out. Up to **seven** image references per generation.

### Product rules you will hit ([FAQ](https://docs.x.ai/grok/faq))

- Generated images and videos include a **Grok watermark**. There is no setting to remove it. Removing, altering, or obscuring the watermark is prohibited under the Acceptable Use Policy.
- Enabling **NSFW** does **not** turn off moderation. CSAM and non-consensual intimate imagery are never permitted.
- **720p videos automatically fall back to 480p** once you hit the 720p cap for your tier.

## Imagine API

Official overview ([imagine](https://docs.x.ai/developers/model-capabilities/imagine)): image generation, image editing with up to **3** reference images, video from text or stills, video editing, reference-to-video, video extension, and Files API integration.

That **3-image API edit cap** is not the same number as the product's "up to 5 input images" on Image 2.0. Quote the page you are on.

### Models (official slugs)

| Job | Official pick ([developers/models](https://docs.x.ai/developers/models), [imagine](https://docs.x.ai/developers/model-capabilities/imagine)) |
|-----|------------------------------------------------------------------------------------------------------------------------------------------|
| Images | `grok-imagine-image-2.0` |
| Videos | `grok-imagine-video-1.5` |

[x.ai/api/imagine](https://x.ai/api/imagine): up to **2K** resolution, **10 images per request**, video **up to 15s**. Image generation is **flat per-image**. Image edits bill **input + output**. Video is **per-second**, duration and resolution both affect cost. Prices live on [developers/models](https://docs.x.ai/developers/models) / [pricing](https://docs.x.ai/developers/pricing#imagine-api-pricing) — do not copy a third-party table.

### Image generation

Endpoint: `POST https://api.x.ai/v1/images/generations`. Official knobs ([images/generation](https://docs.x.ai/developers/model-capabilities/images/generation)):

- `n` — multiple images in one request (overview: up to 10).
- `aspect_ratio` — `1:1`, `16:9` / `9:16`, `4:3` / `3:4`, `3:2` / `2:3`, `2:1` / `1:2`, `19.5:9` / `9:19.5`, `20:9` / `9:20`, `auto`.
- `resolution` — `1k` or `2k`.
- `quality` — `low` or `medium` (default `medium`). **Only** on `grok-imagine-image-2.0`.
- Default return is a **temporary URL**. Download promptly, or request base64.

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

Edit path: `POST https://api.x.ai/v1/images/edits` with a public URL or `data:` URI ([imagine](https://docs.x.ai/developers/model-capabilities/imagine)).

### Video generation

Endpoint: `POST https://api.x.ai/v1/videos/generations`, then poll `GET https://api.x.ai/v1/videos/{request_id}` ([video/generation](https://docs.x.ai/developers/model-capabilities/video/generation)).

Official constraints:

| Knob | Official range |
|------|----------------|
| `duration` | 1–15 seconds |
| `aspect_ratio` | `1:1`, `16:9` / `9:16` (default `16:9`), `4:3` / `3:4`, `3:2` / `2:3` |
| `resolution` | `480p` (default), `720p`, `1080p` on `grok-imagine-video-1.5` for text-to-video and image-to-video. Reference-to-video is capped at 720p |
| Status | `pending` → `done` / `expired` / `failed` |
| Modes (one per request) | text-to-video, image-to-video, reference-to-video, edit-video, extend-video |

Do **not** send `image` and `reference_images` together (400). Video URLs are temporary.

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

The xAI SDK's `generate()` polls for you. REST users must poll.

Voice on video: preset `voice_id` values (same roster as TTS) are generally available on reference-to-video. **Voice references from your own audio files** are trusted-partner only, [on request](https://x.ai/contact-sales?interest=imagine) ([video/generation](https://docs.x.ai/developers/model-capabilities/video/generation), [news](https://x.ai/news/grok-imagine-video-1-5-references)).

Generated media is subject to content-policy review and is **not used for training** ([imagine](https://docs.x.ai/developers/model-capabilities/imagine)). Enterprise bullets on that page: SOC 2 Type II, HIPAA eligible, GDPR, data residency, SSO & RBAC.

## When to use which

| You want | Use |
|----------|-----|
| A poster / clip inside Grok | Product Imagine on grok.com/imagine or in chat |
| Images or video inside your product | Imagine API |
| A working website / game with a `*.grok.me` link | **Build Mode** on grok.com, not Imagine ([x.ai/grok/build-mode](https://x.ai/grok/build-mode)) |
| Edits in a real git repo | [Grok Build](./grok-cli.md) |

## Common pitfalls

- Mixing the product **5-image** editor with the API **3-image** edit cap.
- Assuming API 1080p works on every mode — reference-to-video is 720p; editing keeps the input resolution, capped at 720p.
- Leaving Imagine output on the temporary URL.
- Treating Imagine as "Grok 4.3 with 2M context". Image/video slugs are `grok-imagine-*`. The coding flagship is `grok-4.6`.
- Removing the product watermark. Officially forbidden.

## Official docs

| Page | Use |
|------|-----|
| [grok.com/imagine](https://grok.com/imagine) | Consumer studio |
| [docs.x.ai/grok/overview](https://docs.x.ai/grok/overview) | Imagine as a chat capability |
| [docs.x.ai/grok/faq](https://docs.x.ai/grok/faq) | Watermark, NSFW, 720p fallback, weekly pool |
| [docs.x.ai/developers/model-capabilities/imagine](https://docs.x.ai/developers/model-capabilities/imagine) | API overview |
| [images/generation](https://docs.x.ai/developers/model-capabilities/images/generation) | Still images |
| [video/generation](https://docs.x.ai/developers/model-capabilities/video/generation) | Video |
| [x.ai/api/imagine](https://x.ai/api/imagine) | API marketing |
| [x.ai/news/grok-imagine-image-2](https://x.ai/news/grok-imagine-image-2) | Image 2.0 / Quality Mode |
| [x.ai/news/grok-imagine-video-1-5-references](https://x.ai/news/grok-imagine-video-1-5-references) | 1080p, references |

## Related pages

- [Grok Chat](./grok-chat.md) — Imagine also lives inside a thread
- [Voice](./grok-voice.md) — TTS roster reused as video preset voices
- [Grok learning map](./index.md)
- [Glossary](./grok-glossary.md)
