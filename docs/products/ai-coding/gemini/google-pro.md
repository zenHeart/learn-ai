# Google AI subscriptions and quota

> Your subscription tier decides which models you can use, how much, and whether you get Google Cloud credit. This page covers **payment, quota, and how Pro entitlements map onto the family**. For how each product works, see its own page. The full four-tier table lives only in the [cheatsheet](./gemini-cheatsheet#subscription-tiers).

## One thing to get straight first

The family is **not unlocked by a single subscription**. There are two separate paid entry points:

| Entry point | Covers | Aimed at |
|---|---|---|
| Google AI subscription (Plus / Pro / Ultra) | usage for the Gemini app, Jules, Antigravity, Flow and so on | individual developers |
| [Gemini Code Assist](./code-assist) Standard / Enterprise | IDE extension capability and compliance features | teams and organisations |

**Buying personal AI Pro does not turn Code Assist into the enterprise product** — they are separate. Team compliance requirements are met by the Code Assist edition, not by a personal subscription.

**Since 2026-06-18**, individual / Pro / Ultra accounts can no longer reach Gemini CLI or the Code Assist IDE extensions via Login with Google. The individual terminal and IDE entry point is [Antigravity](./antigravity). Standard / Enterprise and paid API keys are unchanged. [Official deprecation](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals).

## The four tiers

Subscriptions come in four tiers: **AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x**. Storage, model multipliers, Cloud credit and monthly Flow credits are compared in the [cheatsheet](./gemini-cheatsheet#subscription-tiers) and are not duplicated here.

A few facts that actually change which tier you should pick:

**1. Extended context starts at Pro.** The official comparison marks Pro and above as 1,000,000 tokens. This is the only context figure in the family that can be cited.

**2. Google Cloud credit exists only at Pro and above.** It is delivered through the Google Developer Program: Pro US$10/month, Ultra 5x US$40/month, Ultra 20x US$100/month. If you intend to use the Gemini API or Vertex AI, this is the main reason to choose Pro over Plus.

**3. Quota for the agent products is described only qualitatively.** The official comparison for Jules and Antigravity says only that "task count and concurrent task count increase with the tier" and **gives no specific numbers**.

**4. Flow credits are numeric.** 50/day on the free trial, 200/month on Plus, 1,000/month on Pro, 10,000 or 25,000/month on Ultra. Details live only on [Flow](./flow#credits).

<!-- TODO: needs verification — the specific task count and concurrency cap per tier for Jules / Antigravity. The official subscription comparison is qualitative only and no official statement gives numbers. -->

<!-- TODO: needs verification — the actual prices of the four tiers. The official comparison page returns localised content per region and swallows the currency amounts, so no stably citable price was found; check the official page for your region. -->

## Coding-relevant Pro entitlements

Source: [Use Google AI Pro benefits](https://support.google.com/googleone/answer/14534406). Only the items a frontend engineer will actually hit; the rest of the subscription list is not copied here.

| Entitlement | For a frontend engineer | Where to read it |
|---|---|---|
| **Google Flow** | landing-page / launch / product-demo video | [Flow](./flow) (credits live on that page) |
| **Google Antigravity** higher limits and prioritized traffic | the individual daily entry point after 2026-06-18 | [Antigravity](./antigravity) |
| **Jules** higher task / concurrency / model access | asynchronous cloud PRs | [Jules](./jules) |
| **Google AI Studio** | tune the model, call the API; Pro raises the Gemini 3.1 Pro and Nano Banana Pro caps | [AI Studio](./ai-studio) |
| **Gemini in Android Studio** | higher completion and reasoning quota on Android projects; code is not used for training | no standalone page; IDE entry is [Code Assist](./code-assist) |
| **Google Developer Program premium** | US$10 Cloud credit, higher Code Assist quota, 30 Firebase Studio workspaces. **Cannot** be shared with family-group members | [Developer Program](https://developers.google.com/profile/help/benefits#premium-benefits) |
| **Gemini app + Deep Research** | in-depth research outside the editor | [Deep Research](https://gemini.google/overview/deep-research/) |
| **Gemini Spark** (US only) | a personal agent inside Gemini apps that runs workflows against a goal | no standalone page; [official note](https://support.google.com/gemini/answer/17094507) |
| **Gemini Notebook** | research / writing assistant; Pro raises Audio Overviews and similar caps, up to **300** sources per notebook | no standalone page; [official note](https://support.google.com/gemininotebook/answer/16213268) |
| **Gemini in Chrome auto browse** (US only) | Gemini in Chrome runs multi-step web tasks (compare prices, book a hotel). Chrome 144+ | no standalone page; [official note](https://support.google.com/gemini/answer/16821166) |
| **Google Flow Music** | songs / music videos; Pro maps to Flow Music's Plus plan: **10,000 music credits / month** (~2,000 songs), 12 concurrent generations. **Separate from Flow video credits** | [flowmusic.app](https://www.flowmusic.app/) |

When the allocation runs out, Pro / Ultra can buy extra AI credits for Gemini, [Flow](./flow) and [Antigravity](./antigravity). How to manage them: [Manage AI credits](https://support.google.com/googleone/answer/16287445).

## What else the plan includes

The same Pro plan also includes Dreambeans (US only), Health Premium, Home Premium, TV Create Hub (US only), Gemini in Earth, and Photos Remix / Photo to video. **None of that is about coding.** This site does not document them.

## Which tier to pay for

Decide by **which tool you mainly use**, not by which tier has the longest feature list:

| Your main usage | Suggestion | Reasoning |
|---|---|---|
| Occasional questions in the terminal | start on the free quota | upgrade when you run out, do not pre-buy |
| Daily terminal work on a personal account | Pro + [Antigravity](./antigravity) | after 2026-06-18, individual / Pro / Ultra no longer use Gemini CLI via Login with Google |
| Gemini CLI daily (Standard / Enterprise or API key) | Pro | extended context and Cloud credit both start here |
| Integrating through the Gemini API | Pro or above | mostly for the US$10 Cloud credit |
| Heavy Jules / Antigravity task volume | Ultra | concurrency and task count rise with the tier |
| Regular landing-page / product-demo video | Pro or above + [Flow](./flow) | monthly credits jump from 200 to 1,000; the free 50/day is only a trial |
| A hard team compliance requirement | use a [Code Assist](./code-assist) edition | personal subscriptions do not offer VPC-SC or IP indemnification |

**The order matters: exhaust the free quota until it genuinely is not enough, then upgrade.** Doing it the other way round means paying for capacity you never use, and never learning your real order of consumption.

## Credit is not a hard cap

This is the easiest trap: **Google Cloud credit is money you were given. Nothing stops automatically when it runs out, and the overage bills normally.**

Set a budget before running any batch script:

```
GCP console → Billing → Budgets & alerts → create a budget
    ↓
set the amount to your credit amount (US$10 on Pro)
    ↓
alert thresholds: 50% / 90% / 100%
```

**Note that a budget only sends notifications; it does not disable the service.** For a genuine hard stop, the official documentation's approach is to publish budget notifications to Pub/Sub and have a function unlink the billing account, which you have to build yourself:

- [Set up budget notifications](https://cloud.google.com/billing/docs/how-to/notify)
- [Disable billing automatically with notifications](https://cloud.google.com/billing/docs/how-to/disable-billing-with-notifications)

The two operations most likely to overspend: **a single long-context call** (far more expensive than an interactive exchange) and **unattended batch scripts**. Configure the budget before either.

## Security practices

Beyond quota, these are worth setting up:

| Practice | How |
|---|---|
| Let the agent auto-execute only in trusted directories | Gemini CLI `security.folderTrust.enabled`, see the [cheatsheet](./gemini-cheatsheet#common-settings-keys) |
| Isolate agent changes on their own branch | branch before starting, review by diff afterwards |
| Human confirmation for important changes | Jules plan approval, Antigravity plan artifacts |
| Read the changes regularly instead of only the conclusion | an agent's verification record is a hint, not a substitute for review |

> ⚠️ Older docs contained configuration keys such as `security.allowedCommands` / `security.deniedCommands` / `security.sandboxMode`. **They do not exist in the official documentation.** The security-related settings that really exist are a small set including folder trust, listed in the [cheatsheet](./gemini-cheatsheet#common-settings-keys).

## Where the products are

This page does not repeat the product introductions; go straight to the page you want:

- terminal → [Gemini CLI](./gemini-cli)
- autonomous development platform → [Antigravity](./antigravity)
- asynchronous cloud tasks → [Jules](./jules)
- interactive prototypes → [Canvas](./canvas)
- landing-page / launch / product-demo video → [Google Flow](./flow)
- IDE extension → [Code Assist](./code-assist)
- models and API → [AI Studio](./ai-studio)

## Official resources

- [Google AI plan comparison](https://one.google.com/about/google-ai-plans/)
- [Google AI Pro benefits](https://support.google.com/googleone/answer/14534406)
- [Google Developer Program](https://developers.google.com/program)
- [GCP budgets and alerts](https://cloud.google.com/billing/docs/how-to/budgets)

## Related pages

- [Cheatsheet](./gemini-cheatsheet#subscription-tiers) — the full four-tier comparison
- [Cookbook](./gemini-cookbook#_14-you-got-google-cloud-credit-and-worry-about-overspending) — the budget configuration recipe
