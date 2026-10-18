# Pi Agent 维护参考

调研时间：2026-08-19。先写这一节再动教程。

## 产品形态调研结论

**结论一：Pi 是终端 coding-agent harness，不是聊天 App，也不是 OpenClaw。**

- [pi.dev](https://pi.dev/) title：Pi Coding Agent。description：「A terminal-based coding agent」。
- 官方：minimal agent harness。可装 extensions / skills / prompt templates / themes，打成 Pi packages。
- 现行 npm：`@earendil-works/pi-coding-agent`。[news 2026-05-07](https://pi.dev/news/2026/5/7/pi-has-a-new-home)：仓库迁到 `earendil-works/pi`。
- 旧包 `@mariozechner/pi-coding-agent` npm 原文：`please use @earendil-works/pi-coding-agent instead going forward`。
- 可执行文件名是 **`pi`**。

**结论二：官方安装只抄文档。**

[Quickstart](https://pi.dev/docs/latest/quickstart)：

```
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Linux/macOS 还可：`curl -fsSL https://pi.dev/install.sh | sh`。

**结论三：官方一级是一套 harness，不是五六个独立产品。**

GitHub [earendil-works/pi](https://github.com/earendil-works/pi) 包表：`pi-coding-agent` / `pi-agent-core` / `pi-ai` / `pi-tui` / `pi-telemetry`。Slack/chat 另见 `earendil-works/pi-chat`（地图一行）。OpenClaw 用 SDK 接入（pi.dev 原文），正文归 #104。

**结论四：默认不做的功能是官方卖点，不要写成缺陷补丁。**

pi.dev：跳过 sub-agents、plan mode；No MCP（可用 extension / skill 自己加）。无内置权限系统（README）。

## 基本信息

- 工具名：Pi / Pi Coding Agent
- 官方站：<https://pi.dev/>
- 文档：<https://pi.dev/docs/latest>
- 仓库：<https://github.com/earendil-works/pi>
- 现行包：`@earendil-works/pi-coding-agent`

## 官方一级导航

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| Pi Coding Agent | https://pi.dev/ | 独立 Tutorial |
| Docs / Quickstart | https://pi.dev/docs/latest/quickstart | Tutorial |
| GitHub monorepo | https://github.com/earendil-works/pi | 地图 + 速查 |
| Packages 目录 | https://pi.dev/packages | 地图一行 |
| pi-chat | GitHub earendil-works/pi-chat | 地图一行 |
| OpenClaw | https://openclaw.ai/ | 地图一行（#104） |

## Git

```
docs(pi-agent): ...
```
