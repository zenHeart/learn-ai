---
title: Qingyan / Z.ai cheatsheet
description: Lookup only. Doors, decisions, official links. Quotas and prices come from the signed-in official page.
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Qingyan / Z.ai cheatsheet

Lookup only. Numbers and SKUs come from the signed-in official page. Last verified: 2026-08-19.

## Which door

| Job | Open | Do not open |
|-----|------|-------------|
| China web chat | [chatglm.cn](https://chatglm.cn) | Coding Plan subscribe |
| Official app | [chatglm.cn/download](https://chatglm.cn/download) or [App Store](https://apps.apple.com/cn/app/id6450893458) | Unofficial "Qingyan" APK mirrors |
| International web chat | [chat.z.ai](https://chat.z.ai) | `docs.z.ai` (API) |
| GLM inside Claude Code etc. | [z.ai/subscribe](https://z.ai/subscribe) or [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding) | Qingyan membership |
| HTTP API | [docs.z.ai](https://docs.z.ai) or [docs.bigmodel.cn](https://docs.bigmodel.cn) | The chat box as an SDK |
| Whole family | [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | Third-party directories |

Term hooks (one line; [glossary](./zhipu-chat-glossary.md) has the rest):

| Term | Hook |
|------|------|
| Qingyan | China chat product |
| Z.ai chat | International chat product |
| ChatGLM | Historical model / store copy, not the URL |
| GLM Coding Plan | Coding-tool quota, not a Qingyan install |
| AutoGLM / AutoClaw | A different agent / client skin |
| ZCode | Official coding tool |

## Qingyan homepage chips (2026-08-19)

Source: [chatglm.cn](https://chatglm.cn)

| Chip | Note |
|------|------|
| Agent | Homepage positioning |
| Research report | Official entry |
| Slides | Official entry |
| Data analysis | Official entry |
| GLM-5.2 | Model name on the page |
| GLM-5.2 Fast | Model name on the page |

The download page also names chat / writing / coding / image and document understanding / tool use. The paid agreement also names Qingying video, video calls, cloud knowledge base, and AI images. **This table is not "every free account has every chip."**

## Z.ai chips (2026-08-19)

Source: [chat.z.ai](https://chat.z.ai) description + visible chips; [glm-4.5 blog](https://z.ai/blog/glm-4.5)

| Chip / claim | Note |
|--------------|------|
| Magic Design | Page chip |
| Full-Stack | Page chip |
| Write Code | Page chip |
| artifacts / slides / full-stack | Blog wording for the chat surface |

## Account rules (Qingyan agreement)

Source: [paid-service agreement](https://chatglm.cn/pay/policy/vipservice) (2026-05-21)

| Question | Answer |
|----------|--------|
| Which account holds benefits | The one you were signed into when you bought |
| Move to another Qingyan account | No (§3.2.2) |
| Same pot as BigModel | No; can stack; no refund for overlap (§4.4) |
| Is the price frozen | No; trust the service page (§4.7) |
| Default refund | No; duplicate charge / official outage → support (§4.8.1) |

Z.ai terms: [Terms of Use](https://docs.z.ai/legal-agreement/terms-of-use). Do not fill China Qingyan prices from that page.

## High-quality sources

Last verified: 2026-08-19. Official pages we actually opened.

### First-party

| Source | Use |
|--------|-----|
| [chatglm.cn](https://chatglm.cn) | Qingyan product, homepage chips |
| [chatglm.cn/download](https://chatglm.cn/download) | Client copy |
| [chatglm.cn/pay/policy/vipservice](https://chatglm.cn/pay/policy/vipservice) | Membership / credits / accounts |
| [chatglm.cn/agreement](https://chatglm.cn/agreement) | User agreement |
| [chatglm.cn/privacypolicy](https://chatglm.cn/privacypolicy) | Privacy |
| [chat.z.ai](https://chat.z.ai) | Z.ai chat |
| [z.ai](https://z.ai) | International top nav |
| [z.ai/company](https://z.ai/company) | Timeline, Chat / API / Coding Plan |
| [z.ai/blog/glm-5.2](https://z.ai/blog/glm-5.2) | Chat door vs Coding Plan door |
| [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | First-party family |
| [zhipuai.cn/zh/research/161](https://www.zhipuai.cn/zh/research/161) | Official pair of "try it online" URLs |
| [docs.z.ai](https://docs.z.ai) | API docs |
| [docs.bigmodel.cn/cn/guide/start/introduction](https://docs.bigmodel.cn/cn/guide/start/introduction) | China open-platform intro |
| [App Store Qingyan](https://apps.apple.com/cn/app/id6450893458) | Official app copy and IAP list |

### Monitor only (not this handbook)

| Source | Use |
|--------|-----|
| [z.ai/subscribe](https://z.ai/subscribe) | GLM Coding Plan (#75) |
| [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding) | China Coding Plan |
| [zcode.z.ai/cn](https://zcode.z.ai/cn) | ZCode |
| [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) | AutoGLM / AutoClaw |
| [github.com/zai-org/GLM-5](https://github.com/zai-org/GLM-5) | Open weights |

### Unverified

| Item | Why |
|------|-----|
| Standalone URLs for Learning Center / AI IME / Zread.ai / AMiner | Named on the company page; no independent doc page opened this pass |
| Whether a Qingyan WeChat mini program is still a first-class door | Third-party copies only; download-page fetch had no body list |
| Shared login between Qingyan and Z.ai | Official pages do not say |

**Access note (2026-08-19):** `chatglm.cn` / `chat.z.ai` are SPAs; headless fetches often return title only. `www.zhipuai.cn` can resolve to a private address on some networks. Use a browser or page reader.

## Related pages

- [Learning map](./index.md)
- [Tutorial](./zhipu-chat.md)
- [Glossary](./zhipu-chat-glossary.md)
