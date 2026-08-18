# OpenClaw 维护参考

调研：2026-08-19。官方 [openclaw.ai](https://openclaw.ai/)、[docs.openclaw.ai](https://docs.openclaw.ai/)、[getting-started](https://docs.openclaw.ai/start/getting-started)、[install](https://docs.openclaw.ai/install)、[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)。

## 形态

OpenClaw 是多通道 AI agent **网关**，跑在本机 / 服务器。不是 Pi CLI，不是飞书/微信产品。

官方安装：

```
curl -fsSL https://openclaw.ai/install.sh | bash
iwr -useb https://openclaw.ai/install.ps1 | iex
npm install -g openclaw@latest --allow-scripts=openclaw
```

Getting started：Node **22.22.3+ / 24.15+ / 25.9+**（推荐 Node 26）；`openclaw gateway status` 监听 **18789**；`openclaw dashboard`；频道首选 Telegram。

本仓已有中文通道页与源码章：地图链过去，不删。

## 家族

| 入口 | URL | 本站 |
|------|-----|------|
| 产品站 | https://openclaw.ai/ | Tutorial |
| Docs | https://docs.openclaw.ai/ | 地图 |
| Install | https://docs.openclaw.ai/install | Tutorial |
| Getting started | https://docs.openclaw.ai/start/getting-started | Tutorial |
| GitHub | https://github.com/openclaw/openclaw | 速查 |
| Pi | https://pi.dev/ | 一行 #103 |
| 飞书/微信/企微 | 通道 | 已有页一行，不是那些产品的教程 |

```
docs(openclaw): ...
```
