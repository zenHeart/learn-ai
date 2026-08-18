# Codex 维护参考

> 本文件只记录 OpenAI Codex 文档特有的维护事实。通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)，Diataxis 四象限设计见 [`documentation-architecture.md`](./documentation-architecture.md)，完整数据源清单发布在读者可见的 `codex-cheatsheet.md`「高质量信息源」章节。

## 基本信息

- 工具名：OpenAI Codex（Codex CLI / Codex Cloud / Codex IDE 扩展）
- 官方文档根地址：<https://learn.chatgpt.com/docs>（`developers.openai.com/codex` 仍是产品落地页，深层路径多数 308 到 Learn）
- 发版节奏：**稳定版约每周一个 minor**（0.144 → 0.145 于 2026-07-21、0.146 于 2026-07-29、0.147 于 2026-08-07），同时每天有多个 `0.x.0-alpha.N` 预发布。文档核对周期建议不超过两周，否则 flag 和配置键很容易落后。
- 当前覆盖版本：**0.147.0**（2026-08-07 发布的最新稳定版；核对基准为同期的 `learn.chatgpt.com/docs`）

## 文档文件结构（Diataxis 四象限）

Codex 是「订阅套餐 + CLI + 云端 + 生态」四层结构，因此比单 CLI 工具多出 `chatgpt-plus.md` 与 `codex-ai.md` 两页；文件名保持中英一一对应：

```
docs/products/ai-coding/codex/        (英文)
docs/zh/products/ai-coding/codex/     (中文)
├── index.md                # 🗺️ 学习地图（全家桶产品树 +「我要做什么」决策树）
├── codex-cli.md            # 📘 Tutorial — 安装、交互、核心功能
├── codex-ai.md             # 📘 Tutorial — Codex 入口全景（CLI / IDE / 桌面 / Cloud / 托管评审）
├── chatgpt-plus.md         # 📘 Tutorial — 套餐、Chat 对话智能、Atlas 下线
├── chatgpt-work.md         # 📘 Tutorial — ChatGPT Work（对位 Cowork；Sites / 插件 / 定期任务）
├── integration.md          # 🔧 How-to — 项目集成（AGENTS.md、MCP、CI）
├── codex-cookbook.md       # 🔧 How-to — 场景化提示模式与避坑
├── codex-cheatsheet.md     # 📐 Reference — 配置/决策表/命令清单/数据源
└── codex-glossary.md       # 📖 Explanation — 核心概念统一解释
```

立页规则（轴 A 概念依赖 / 轴 B 前端工程师相关度 + 密度）：

- **立了** `chatgpt-work.md`：官方独立教程 + 企业概览，对位 Claude Cowork；Sites / 插件 / 本地-云端密度够。
- **不立** Chat 独立页：官方把 Chat 写成同一应用的一种模式，密度收到 `index` + `chatgpt-plus`。
- **不立** Cloud / hosted review 独立页：那是 Codex 的入口和用法，写在 `codex-ai.md`。
- **不立** Atlas 页：官方 2026-08-09 已停止独立浏览器；只在 `index` / `chatgpt-plus` 写下线事实。
- **不立** Sites / Design 页：没有官方「ChatGPT Design」产品；Sites 是 Work 的托管工作流。
- **不立** Plugins/Connectors 独立页：消费级插件在 Work，仓库 MCP 在 `integration.md`。

> 中英文件名已统一为 `codex-cheatsheet.md`。历史文件名 `cheatsheet.md` 不再使用。

## 监控页面（What's New 驱动更新的最小子集）

- What's new（Work / 桌面合并 / Sol 托管评审）：<https://learn.chatgpt.com/docs/whats-new>
- ChatGPT Work：<https://learn.chatgpt.com/docs/get-started-with-work> · <https://learn.chatgpt.com/docs/use-chatgpt>
- Codex cloud：<https://learn.chatgpt.com/docs/cloud>
- Atlas 下线（只认官方）：<https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work> · <https://openai.com/index/chatgpt-for-your-most-ambitious-work/>
- Changelog：<https://learn.chatgpt.com/docs/changelog>
- 配置参考（config.toml + requirements.toml）：<https://learn.chatgpt.com/docs/config-file/config-reference>
- 配置入门 / 进阶：<https://learn.chatgpt.com/docs/config-file/config-basic> · <https://learn.chatgpt.com/docs/config-file/config-advanced>
- CLI 与开发者命令（flag、子命令、斜杠命令）：<https://learn.chatgpt.com/docs/codex/cli> · <https://learn.chatgpt.com/docs/developer-commands?surface=cli>
- 沙箱与审批：<https://learn.chatgpt.com/docs/sandboxing> · <https://learn.chatgpt.com/docs/permissions>
- 定价（唯一数字来源）：<https://learn.chatgpt.com/docs/pricing>
- GitHub Releases：<https://github.com/openai/codex/releases>

## Git 提交 scope

```
docs(codex): ...
```

## 已知踩坑 / 特殊约定

- **`github.com/openai/codex` 仓库里的 `docs/*.md` 大多只是重定向占位页**。唯一仍有实质内容、可直接引用的是 `docs/install.md`。核实配置键和命令时**必须**去 `learn.chatgpt.com/docs`（可用同路径加 `.md` 抓 Markdown）。
- **`config-reference` 单页极大**（正文约 12.4 万字符，且抓取后常压在一行里），`Read` 的 offset/limit 无法分块。可行做法：先把抓取结果落到本地临时文件，再用 `grep -n -E '^\| `key' file` 定位需要的键，不要整页读。
- **审批策略有「配置键取值」和「TUI 显示名」两套命名**，必须分开写，混用是历史文档最主要的错误来源：
  - `config.toml` 的 `approval_policy` = `untrusted` / `on-request` / `never` / `{ granular = { ... } }`（`on-failure` 已废弃）
  - TUI 里通过 `/permissions` 切换的是 `Auto`（默认）/ `Read-only` / `Full Access`
  - 本教程统一写法：正文讲交互时用 TUI 名字，讲配置文件时用配置键取值，并在术语表里显式对照。
- **联网检索也有两套命名**：配置键是 `web_search = "disabled" | "cached" | "indexed" | "live"`（默认 `cached`），CLI 是**裸 flag `--search`**（单次会话改成 live）。不存在 `search = true` 配置键，也不存在 `--search true`。
- **MCP 配置是「以 id 为键的 table」而不是 array-of-tables**：正确写法 `[mcp_servers.filesystem]`，键只有 `command` / `args` / `url` / `env` / `enabled_tools` 等；**没有 `name` 键，也没有 `type` 键**。历史文档里的 `[[mcp_servers]]` + `name` + `type` 是错的。
- **非交互模式是 `codex exec "..."`**（配 `--json`、`resume --last`），不是 `--no-interactive`；工作目录是 `--cd`，不是 `--working-dir`；恢复会话是 `codex resume`，不存在 `codex sessions list/get`。
- **`@` 只是工作区内的模糊文件路径选择器**，不支持 `@file.ts:10-20` 行区间，也不支持 `@functionName()` 引用符号。
- **配置优先级以 Config basics 为准（高优先在前）**：CLI flag → 信任项目的 `.codex/config.toml` → profile → 用户 `~/.codex/config.toml` → 系统 → 默认。未信任项目会跳过整个项目 `.codex/` 层。另有一组机器本地键（`chatgpt_base_url`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`otel` 等）在项目层会被忽略，不能和「整体优先级」混为一谈。
- **系统要求写 macOS 12+ / Ubuntu 20.04+ 或 Debian 10+ / Windows 11 + WSL2**（依据仓库 `docs/install.md`）。历史文档写的「macOS 10.15 Catalina」是错的。
- **价格与配额一律不要写具体数字**。官方把套餐价格和 Codex 用量额度放在 pricing / help center 页面且频繁调整，配置参考里没有任何价格信息；无法定位官方出处时用 `<!-- TODO: 待核实 -->` 标注，不要凭印象填表。
- **认证与诊断**：官方子命令是 `codex login` / `codex login status` / `codex logout` / `codex doctor`。不存在 `codex status`、`codex auth status`、`codex config list`、`codex config reset`、`codex sessions list/get`。会话内诊断用 `/status`、`/debug-config`、`/usage`。
- **`--full-auto` 已从 0.147.0 的 `codex exec` 移除**（changelog #36054）。新脚本写 `--sandbox workspace-write` + `--ask-for-approval never`。
- **`--approve-for-me` 是 0.147.0 新增的自动审核审批 flag**（changelog #36373）。
- **Homebrew 安装名是 cask `codex`**：`brew install --cask codex`。不存在官方 formula `openai-codex`，也不需要 `openai/codex` tap。
- **套餐**：产品落地页写 Plus / Pro / Business / Edu / Enterprise 包含 Codex。定价页另列出 Free / Go 也有部分 Codex 能力；Plus 卡片才明确写 CLI / IDE。不要写「Plus 专属」，也不要写具体价格。
