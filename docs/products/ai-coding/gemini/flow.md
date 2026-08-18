# Google Flow

> Google's AI creative studio. Frontend engineers use it for **landing-page films, product demos and scene boards**, not for writing code.
>
> Entry point: [labs.google/fx/tools/flow](https://labs.google/fx/tools/flow). Help centre: [support.google.com/flow](https://support.google.com/flow).

## What it is

Officially an **AI creative studio**: plan, generate and refine in natural language, on top of Google's generative models.

The landing page currently lists three model families:

| Model | Official one-liner |
|---|---|
| **Gemini Omni** | create and edit videos from any input reference — real or generated; world understanding, multimodality, conversational editing |
| **Nano Banana** | image generation and precise editing; subject consistency, text rendering, reasoning |
| **Veo 3.1** | video generation; physics, realism, prompt adherence, native audio and expanded controls |

It is off the coding main line. The counterpart in the Claude family is [Claude Design](../claude/claude-design): Design hands off an interface prototype; Flow hands off a piece of film.

**Age and language**: you must be 18 or older. Prompts to Flow are English only; replies are English. [Official note](https://support.google.com/googleone/answer/14534406).

## When to use it

| I want… | Use | Do not use Flow |
|---|---|---|
| A **video** for a landing page, launch film or product demo | **Flow** | Canvas produces a clickable page, not a finished clip |
| A **clickable prototype** for a PM within half an hour | [Canvas](./canvas) | Flow does not emit DOM or interaction |
| The chosen direction committed to the repo | [Antigravity](./antigravity) | Flow does not edit code or open a PR |
| Songs / music videos / generative score | [Flow Music](https://www.flowmusic.app/) (credits are **separate** from Flow) | Do not treat Flow video credits as music credits |

A useful combination: try three interaction directions in Canvas → pick one → implement it in the real project with Antigravity; when you need to present the feature, make an 8–10 second clip in Flow.

## What it can do

Capabilities listed on the [product landing page](https://labs.google/fx/tools/flow) and the [Pro benefits article](https://support.google.com/googleone/answer/14534406):

- **Generation modes**: Text to video, Frames to video, Ingredients to video, Text to image, Image to image
- **Refinement**: Video Extension, Video-to-video editing, Scenebuilder
- **Cast**: Characters, Avatars
- **Agent**: described as a project-level creative partner for exploring and iterating
- **Custom Tools**: build tools in natural language (type overlays, resize, storyboard, shaders); share and remix. The free tier can **use** existing Tools; **creating** them starts at Plus

[Create videos](https://support.google.com/flow/answer/16353334) and [edit / build scenes](https://support.google.com/flow/answer/16935718) are the how-to pages. This page does not repeat the steps.

<!-- TODO: needs verification — the exact mapping of each mode onto Veo / Omni / Nano Banana, and an official one-sentence definition of Scenebuilder. The landing page lists mode names and the help centre splits them by task; no official mode × model matrix was found. -->

## Credits

Figures come from [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234) and the landing page — **not** from third-party blogs.

| Tier | Flow credits |
|---|---|
| No subscription | **50 per day** (trial; unused daily credits do not roll over) |
| AI Plus | **200 per month** |
| AI Pro | **1,000 per month** |
| AI Ultra $100 (Ultra 5x in this site) | **10,000 per month** |
| AI Ultra $200 (Ultra 20x in this site) | **25,000 per month** |

Key points:

- Paid tiers refresh on the **billing cycle**. Unused monthly credits **do not roll over**.
- Upgrading to a paid plan forfeits leftover free daily credits immediately; they are replaced by the plan's monthly allocation.
- Free daily credits can be spent only on **Veo 3.1 Lite / Fast / Quality**.
- After the allocation is exhausted, Plus / Pro / Ultra can buy extra AI credits (except in Japan). The same AI credits also work in [Antigravity](./antigravity).
- Cost per generation depends on the model (for example Veo 3.1 Lite is 10 credits for non-Ultra, Quality is 100). Use the table on the credits page; this page does not copy it.

The full four-tier comparison (storage, model multiplier, Cloud credit) lives **only** in the [cheatsheet](./gemini-cheatsheet#subscription-tiers).

<!-- TODO: needs verification — the landing page lists USD prices (Plus $4.99 / Pro $19.99 / Ultra $99.99 / $199.99) with “* Prices may vary by market”. The one.google.com comparison swallows amounts when scraped; family-wide prices still follow the official page for your region. -->

## Flow Sessions

**Flow Sessions** on the [landing page](https://labs.google/fx/tools/flow) is an artist collaboration programme: a small group of creatives is invited to make a passion project in Flow with Google. **It is not a daily product.** Frontend engineers do not need a separate tutorial for it.

## Common pitfalls

- Some older Labs help pages still say you must subscribe to Pro / Ultra. Trust the landing page and the [credits article](https://support.google.com/flow/answer/16526234): no subscription still gets 50 credits a day to try Flow.
- A VPN **will not** unlock unsupported regions. Check [Where you can use Flow](https://support.google.com/flow/answer/16353544) first.
- Failed generations are not charged. A returned result **is** charged, even without audio or at a quality you dislike.
- All Veo / Imagen output carries an invisible SynthID. <!-- TODO: needs verification — visible-watermark rule: the older Labs FAQ said Pro videos have a visible watermark and Ultra videos do not; article 16526234 does not repeat this. Follow the in-product setting. -->

## Official resources

- [Product entry](https://labs.google/fx/tools/flow)
- [Flow help centre](https://support.google.com/flow)
- [Credits and per-generation cost](https://support.google.com/flow/answer/16526234)
- [Create videos](https://support.google.com/flow/answer/16353334)
- [Google AI Pro benefits](https://support.google.com/googleone/answer/14534406)

## Related pages

- [Subscriptions and quota](./google-pro) — other coding-relevant Pro entitlements
- [Canvas](./canvas) — clickable prototypes
- [Cheatsheet](./gemini-cheatsheet#which-tool) — pick a tool by task
