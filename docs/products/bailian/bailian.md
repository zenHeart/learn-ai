---
title: Getting started with Model Studio
description: Activate the console, create an API key, send the first OpenAI-compatible request. Model internals live in Learn LLM.
domain: product
tags:
  - model-platform
role: tutorial
---

# Getting started with Model Studio

> This is a **tutorial**. Finish it and you will have sent one Model Studio request from your machine.
>
> URLs and plans: [cheatsheet](./bailian-cheatsheet). Names: [glossary](./bailian-glossary). Concrete problems: [Cookbook](./bailian-cookbook).

Goal: go from "I have heard of Qwen" to "my Node service can hit a pinned model".

Attention, tokenization, and training are in [LLM fundamentals](/tech/fundamentals/LLM) and [Learn LLM](https://llm.zenheart.site/chapters/). Not here.

## Step 0: Confirm you want Model Studio

| You want | Go |
|----------|-----|
| HTTP API, console apps, quota for coding tools | **This page** |
| Only Tongyi chat | Qwen (#83), not this tutorial |
| An Alibaba coding IDE | Qoder CN / Lingma (#84), not this tutorial |

Model Studio has **no** official standalone mobile app. The entry is the web console. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## Step 1: Activate and pick a region

1. Sign in with the **Alibaba Cloud primary account** and open the [console](https://bailian.console.aliyun.com/).
2. Switch region in the top-right. The China-site intro lists China (Beijing), US (Virginia), Singapore, Germany (Frankfurt), Japan (Tokyo). [ZH intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio). The [international intro](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) also lists China (Hong Kong).
3. Accept the agreement. No dialog means that region is already on. [FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)
4. Complete identity verification if the console asks.

**Keys, base URLs, catalogs, and prices do not cross regions.**

China-site [free quota](https://help.aliyun.com/zh/model-studio/new-free-quota) is **Beijing only**. The international intro places new-user quota in **Singapore**. Do not copy one site's numbers onto the other.

Activation is free. Inference, fine-tuning, and deployment bill. [Intro](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)

## Step 2: Create an API key and put it in the environment

Follow [Get an API key](https://help.aliyun.com/zh/model-studio/get-api-key) (China-site; same product):

1. Pick the region → **API Key** → **Create**.
2. Prefer the default workspace.
3. Permission **All** unless you need an IP or model allowlist.
4. The plaintext key is shown **once**. Copy it.

The official env var is `DASHSCOPE_API_KEY` (legacy DashScope name, not a second product):

```bash
# macOS / zsh — replace YOUR_DASHSCOPE_API_KEY
echo "export DASHSCOPE_API_KEY='YOUR_DASHSCOPE_API_KEY'" >> ~/.zshrc
source ~/.zshrc
```

Bash and Windows variants are on the same official page.

New PAYG keys start with `sk-ws` (except US Virginia). Older `sk-` keys still work.

Beijing / Singapore / Tokyo / Frankfurt MaaS URLs also need a **WorkspaceId**. Copy it from workspace management. [First API call](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen)

## Step 3: Send the first request

Install the official Node path:

```bash
npm install openai
```

Replace `{WorkspaceId}`. This is the Node.js sample from [First API call to Qwen](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen):

```js
import OpenAI from "openai";

try {
    const openai = new OpenAI(
        {
            // If the env var is unset, replace with: apiKey: "sk-xxx",
            apiKey: process.env.DASHSCOPE_API_KEY,
            // China (Beijing). Other regions differ. Replace {WorkspaceId}.
            baseURL: "https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1"
        }
    );
    const completion = await openai.chat.completions.create({
        model: "qwen-plus",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Who are you?" }
        ],
    });
    console.log(completion.choices[0].message.content);
} catch (error) {
    console.log(`Error: ${error}`);
    console.log("See https://help.aliyun.com/model-studio/developer-reference/error-code");
}
```

Other OpenAI-compatible hosts: [cheatsheet · Base URL](./bailian-cheatsheet#base-url) and [Models](https://help.aliyun.com/zh/model-studio/models). Do not invent hostnames.

If you do not want to write code, the official pointer is [Chatbox](https://help.aliyun.com/zh/model-studio/chatbox).

## Step 4: Pick a tier, then a real model ID

The intro's three Qwen tiers (not the same thing as a `model` string):

| Tier | Official line | First use |
|------|---------------|-----------|
| **Max** | Strongest; complex multi-step work. The intro names `qwen3.8-max` | Hard tasks, tool use |
| **Plus** | Balance of quality, speed, cost — **recommended for most cases** | **Use the sample's `qwen-plus`** |
| **Flash** | Cheap and low-latency | High QPS, short answers |

Source: [intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio).

Live IDs, regional availability, and the three protocol URLs live only on [Models](https://help.aliyun.com/zh/model-studio/models). This tutorial does not copy that table.

Plan catalogs are **exact-string allowlists**. Coding Plan forbids version-compatibility guesses. [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan)

## Step 5: Stop surprise PAYG before you explore

Verified accounts flip to PAYG when the free quota ends. Turn on **Free quota only**. China-site: Beijing, and only while the quota is still valid. [Free quota](https://help.aliyun.com/zh/model-studio/new-free-quota)

To stop calls entirely: delete every key in that region. There is no "disable auto-billing" switch. [Intro](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

Next: [Cookbook](./bailian-cookbook).
