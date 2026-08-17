# Codex 维护参考

> 本文件只记录 OpenAI Codex 文档特有的维护事实。通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)，Diataxis 四象限设计见 [`documentation-architecture.md`](./documentation-architecture.md)，完整数据源清单发布在读者可见的 `codex-cheatsheet.md`「高质量信息源」章节。

## 基本信息

- 工具名：OpenAI Codex（Codex CLI / Codex Cloud / Codex IDE 扩展）
- 官方文档根地址：<https://developers.openai.com/codex>
- 发版节奏：**稳定版约每周一个 minor**（0.144 → 0.145 于 2026-07-21、0.146 于 2026-07-29、0.147 于 2026-08-07），同时每天有多个 `0.x.0-alpha.N` 预发布。文档核对周期建议不超过两周，否则 flag 和配置键很容易落后。
- 当前覆盖版本：**0.147.0**（2026-08-07 发布的最新稳定版；核对基准为同期的 `developers.openai.com/codex` 在线文档）

## 文档文件结构（Diataxis 四象限）

Codex 是「订阅套餐 + CLI + 云端 + 生态」四层结构，因此比单 CLI 工具多出 `chatgpt-plus.md` 与 `codex-ai.md` 两页；文件名保持中英一一对应：

```
docs/products/ai-coding/codex/        (英文)
docs/zh/products/ai-coding/codex/     (中文)
├── index.md                # 🗺️ 学习地图（Tutorial 导航 + Reference 功能速查）
├── codex-cli.md            # 📘 Tutorial — 安装、交互、核心功能
├── codex-ai.md             # 📘 Tutorial — ChatGPT/Codex 产品线全景（云端、IDE、SDK）
├── chatgpt-plus.md         # 📘 Tutorial — 订阅套餐与配额
├── integration.md          # 🔧 How-to — 项目集成（AGENTS.md、MCP、CI）
├── codex-cookbook.md       # 🔧 How-to — 场景化提示模式与避坑
├── codex-cheatsheet.md     # 📐 Reference — 配置/决策表/命令清单/数据源
└── codex-glossary.md       # 📖 Explanation — 核心概念统一解释
```

> ⚠️ 中文历史文件名是 `cheatsheet.md`（没有 `codex-` 前缀），英文版新建时统一用 `codex-cheatsheet.md`。改中文文件名会破坏既有书签和外链，暂不重命名；侧边栏与交叉链接需要注意这个不对称。

## 监控页面（What's New 驱动更新的最小子集）

- Changelog（CLI）：<https://developers.openai.com/codex/changelog>
- 配置参考（config.toml + requirements.toml 全量键表）：<https://developers.openai.com/codex/config-reference>
- 配置入门 / 进阶：<https://developers.openai.com/codex/config-basic> · <https://developers.openai.com/codex/config-advanced>
- CLI 功能总览（flag、会话、审批模式）：<https://developers.openai.com/codex/cli/features>
- 斜杠命令全量清单：<https://developers.openai.com/codex/cli/slash-commands>
- 沙箱与审批：<https://developers.openai.com/codex/local/sandbox>
- GitHub Releases：<https://github.com/openai/codex/releases>

## Git 提交 scope

```
docs(codex): ...
```

## 已知踩坑 / 特殊约定

- **`github.com/openai/codex` 仓库里的 `docs/*.md` 大多只是重定向占位页**（`config.md`、`slash_commands.md`、`authentication.md`、`getting-started.md` 都只剩一行指向 developers.openai.com 的链接）。唯一仍有实质内容、可直接引用的是 `docs/install.md`。核实配置键和命令时**必须**去 `developers.openai.com/codex`，不要引用仓库 docs。
- **`config-reference` 单页极大**（正文约 12.4 万字符，且抓取后常压在一行里），`Read` 的 offset/limit 无法分块。可行做法：先把抓取结果落到本地临时文件，再用 `grep -n -E '^\| `key' file` 定位需要的键，不要整页读。
- **审批策略有「配置键取值」和「TUI 显示名」两套命名**，必须分开写，混用是历史文档最主要的错误来源：
  - `config.toml` 的 `approval_policy` = `untrusted` / `on-request` / `never` / `{ granular = { ... } }`（`on-failure` 已废弃）
  - TUI 里通过 `/permissions` 切换的是 `Auto`（默认）/ `Read-only` / `Full Access`
  - 本教程统一写法：正文讲交互时用 TUI 名字，讲配置文件时用配置键取值，并在术语表里显式对照。
- **联网检索也有两套命名**：配置键是 `web_search = "disabled" | "cached" | "live"`（默认 `cached`，走 OpenAI 维护的索引而非实时抓取），CLI 是**裸 flag `--search`**（单次会话改成 live）。不存在 `search = true` 配置键，也不存在 `--search true` 这种带值写法。
- **MCP 配置是「以 id 为键的 table」而不是 array-of-tables**：正确写法 `[mcp_servers.filesystem]`，键只有 `command` / `args` / `url` / `env` / `enabled_tools` 等；**没有 `name` 键，也没有 `type` 键**。历史文档里的 `[[mcp_servers]]` + `name` + `type` 是错的。
- **非交互模式是 `codex exec "..."`**（配 `--json`、`resume --last`），不是 `--no-interactive`；工作目录是 `--cd`，不是 `--working-dir`；恢复会话是 `codex resume`，不存在 `codex sessions list/get`。
- **`@` 只是工作区内的模糊文件路径选择器**，不支持 `@file.ts:10-20` 行区间，也不支持 `@functionName()` 引用符号。
- **项目级 `.codex/config.toml` 优先级低于用户级，而不是更高**：项目层无法覆盖 provider / auth / 通知 / profile 选择 / 遥测类键（`chatgpt_base_url`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`、`otel` 等会被直接忽略），并且只有项目被标记为 trusted（`projects.<path>.trust_level = "trusted"`）时才会加载。
- **系统要求写 macOS 12+ / Ubuntu 20.04+ 或 Debian 10+ / Windows 11 + WSL2**（依据仓库 `docs/install.md`）。历史文档写的「macOS 10.15 Catalina」是错的。
- **价格与配额一律不要写具体数字**。官方把套餐价格和 Codex 用量额度放在 pricing / help center 页面且频繁调整，配置参考里没有任何价格信息；无法定位官方出处时用 `<!-- TODO: 待核实 -->` 标注，不要凭印象填表。
- **`codex doctor` / `codex auth status` / `codex config list` / `codex config reset` 在官方 CLI 文档中查不到**，写作时不要出现；诊断请用 `/status`、`/debug-config`、`/usage`。
