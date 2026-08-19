---
title: Pi Agent cheatsheet
description: Official Pi install commands, modes, and doors. Do not use the old npm package.
domain: product
tags:
  - harness
role: reference
---

# Pi Agent cheatsheet

Verified 2026-08-19.

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
curl -fsSL https://pi.dev/install.sh | sh
```

| Action | Official |
|--------|----------|
| Interactive | `pi` |
| Script | `pi -p "query"` |
| JSON | `--mode json` |
| Model | `/model` or `Ctrl+L` |
| Package | `pi install npm:@foo/pi-tools` |

Doors: https://pi.dev/ · https://pi.dev/docs/latest/quickstart · https://github.com/earendil-works/pi
