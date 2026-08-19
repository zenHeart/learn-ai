---
title: OpenClaw tutorial
description: Install OpenClaw with the official install.sh or npm command, finish onboarding, and send the first dashboard message.
domain: product
tags:
  - agent-runtime
role: tutorial
---

# OpenClaw tutorial

> Official: [Getting started](https://docs.openclaw.ai/start/getting-started), [Install](https://docs.openclaw.ai/install).

Need Node **22.22.3+, 24.15+, or 25.9+** (Node 26 recommended) and a provider API key.

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows: `iwr -useb https://openclaw.ai/install.ps1 | iex`

If you already manage Node:

```bash
npm install -g openclaw@latest --allow-scripts=openclaw
```

npm 11.15 and earlier: omit `--allow-scripts=openclaw`.

```bash
openclaw gateway status   # listening on 18789
openclaw dashboard
```

Fastest phone channel in the official guide: Telegram. Other channels: official Channels docs. Chinese Feishu/WeChat pages: `/zh/products/openclaw/`.
