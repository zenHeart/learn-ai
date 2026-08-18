# Grok 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/ai-coding/grok/grok-cheatsheet.md` 的「高质量信息源」章节（方法论见 [`sources/_template.md`](./sources/_template.md)）。文档架构的 Diataxis 四象限设计见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-18。以下每条都来自一手官方来源，来源标在括号里。

**结论一：xAI 有第一方 agentic 编程 CLI，官方产品名是 Grok Build，不叫 "Grok Code"。**

- `https://docs.x.ai/build/overview` 原文：「**Grok Build** is a powerful and extensible coding agent. Use it via an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps.」
- 开源仓库 `github.com/xai-org/grok-build` README 原文：「**Grok Build** is SpaceXAI's terminal-based AI coding agent. It runs as a full-screen TUI that understands your codebase, edits files, executes shell commands, searches the web, and manages long-running tasks — interactively, headlessly for scripting/CI, or embedded in editors via the Agent Client Protocol (ACP).」
- 可执行文件名是 `grok`（不是 `grok-build`）。仓库 README 说明：编译产物名为 `xai-grok-pager`，「official installs ship it as `grok`」。

**结论二：产品形态是 CLI/TUI，不是 IDE 插件，也不是「仅 API」。**

三种使用面（来自 `/build/overview` 与 `/build/cli/reference`）：

| 使用面 | 入口 | 典型场景 |
|--------|------|----------|
| 交互式 TUI | `grok`（无参数） | 日常开发 |
| Headless | `grok -p "<prompt>"` | 脚本、CI |
| ACP | `grok agent stdio` | 被编辑器/编排器嵌入（JSON-RPC over stdin/stdout） |

编辑器集成是通过 ACP 由第三方宿主实现的，xAI 自己没有发布 VS Code/JetBrains 插件（`/build/cli/terminal-support` 只讨论 VS Code / Cursor / Windsurf / Zed 内置终端里的按键差异，没有插件条目）。

**结论三：适合本站「前端工程师 AI 编程工具」定位。**

依据：
- 安装门槛低，有 npm 通道：`npm install -g @xai-official/grok`（`/build/enterprise` 原文把它列为 curl 安装的替代方案；npm registry 确认 `bin.grok`、`engines.node >= 20`、Apache-2.0）。
- 能力面与 Claude Code 同级：plan mode、subagents、skills、hooks、MCP、AGENTS.md 项目规则、memory、sandbox、worktrees、background tasks、dashboard、theming（`https://x.ai/build` 的 18 项功能网格 + `/build/*` 各专题页）。
- 官方主打 Claude Code 兼容，迁移成本极低（`/build/skills-plugins-marketplaces` 原文：「Grok is fully compatible with Claude Code with zero configuration needed.」）：读 `CLAUDE.md` / `.claude/settings.json` / `~/.claude.json` / `.cursor/*`，接受 Claude Code 的 flag 别名，`grok import` 与 `/import-claude` 可导入 Claude Code 会话。

**结论四：处于 beta 阶段，迭代极快，写文档必须避免绑定版本号。**

- 发布公告 `https://x.ai/news/grok-build-cli`（2026-05-25）原文：「Today we're launching an early beta of Grok Build」「Available now to all SuperGrok and X Premium Plus subscribers.」
- `https://x.ai/build` 当前文案：「Available to try for Free」，且横幅为「Meet Grok 4.6 • Now powering Grok Build」。
- npm `@xai-official/grok` 的 `time` 字段从 2025-10-22 起累计 552 个历史版本号（含已从 `versions` 下架的）；2026-08-18 抽查时 `versions` 里仍列出 191 个可安装版本。`dist-tags.latest` 与 `alpha` 均为 `1.0.5`（发布时间 2026-08-16T00:25:35Z）。近期 `latest` 轨迹：1.0.0 → 1.0.1 / 1.0.2 → 1.0.3（08-12）→ 1.0.4（08-13）→ 1.0.5（08-16）。不要把 552 写成「当前可安装版本数」。

**结论五：文档分两套站点，写作时不要混引。**

- `https://docs.x.ai/build/*` = Grok Build CLI（TUI、配置、hooks、MCP、sandbox、企业策略）
- `https://docs.x.ai/developers/*` = xAI API（模型、价格、限流、SDK、release notes）
- `https://x.ai/build/changelog` = CLI 的版本变更日志（比 docs 更新更快，出现过 docs 里还没有的子命令，如 `grok du`、`grok trace`）

**结论六：编程相关模型有两个，不要写错 slug。**

- `grok-4.6`：`/developers/models` 原文「For everything else, including code, use Grok 4.6.」当前驱动 Grok Build。
- `grok-build-0.1`：`/developers/release-notes` 原文「xAI's coding model, trained specifically for agentic coding workflows.」

**结论七：消费端还有独立形态，index 必须画决策树，只有 Grok Bot 够独立密度才立页。**（复核 2026-08-18，仅官方）

- **Grok 聊天**：`docs.x.ai/grok/overview`、`x.ai/grok`、`grok.com`。对话 / 搜索 / 语音 / 上传文件。对位 Claude.ai。
- **Imagine**：消费端 `grok.com/imagine` + `x.ai/news/grok-imagine-image-2`；API `docs.x.ai/developers/model-capabilities/imagine`。生图生视频。对位 Claude Design（创作面）。**不立页**——本站读者要的是编程工具，密度不够单独成章。
- **Build Mode ≠ Grok Build**：`x.ai/news/grok-build-mode`、`x.ai/grok/build-mode`。grok.com 模式切换选 Build；Early Beta 仅 SuperGrok Heavy；发布到 **grok.me** 或自定义域名。grok.me 是发布域名，不是产品。**不立页**——官方只有营销页 + 一篇 news。
- **Grok Bot**：`docs.x.ai/grok-bot/*`（overview / get-started / computer-and-apps / approvals / faq / teams）、`x.ai/bot`、`x.ai/news/introducing-grok-bot`（2026-08-11 beta）。持久云电脑同事；资格 SuperGrok Heavy / Cursor Ultra / Cursor Teams Premium；认证走 **Cursor**。对位 Cowork。**立页** `grok-bot.md`。
- **禁止当事实写**：官方 VS Code 插件、「Grok Code / Grok CLI」产品名、三方博客的 Grok 4.3 / 200 万 token / Arena Mode / 8 路并行。账号不是一口池子（Grok Build 用 SuperGrok 或 API key，Grok Bot 用 Cursor 账号）。

## 基本信息

- 工具名：Grok Build（CLI 可执行文件 `grok`）
- 官方文档根地址：<https://docs.x.ai/build/overview>
- 发版节奏：npm `latest` 在 2026-08-12 / 08-13 / 08-16 连续换了 1.0.3 → 1.0.4 → 1.0.5。不要写死「每 1–3 天一版」——那是对近期轨迹的概括，不是官方 SLA。
- 当前覆盖版本：v1.0.5（2026-08-16，npm `latest` 与 `alpha`；`https://x.ai/build/changelog` 头部在 2026-08-18 仍显示 v1.0.3 / Aug 12, 2026）
- 官方两处对 subagent 默认开关说法不一致，文档里必须并列引用、禁止猜哪个赢：`/build/features/subagents` 原文 “Enabled by default when the setting is unset.”；`/build/settings/reference` 里 `GROK_SUBAGENTS` 默认值是 `0`。

## 文档文件结构（Diataxis 四象限）

最终采用 6 文件结构。Grok Build 仍是 5 文件 Diataxis；2026-08-18 官方确认 Grok Bot 有独立文档树（`docs.x.ai/grok-bot/*`），才加一张产品地图。Imagine / Build Mode / grok.me 只进 index 决策树和 glossary，不立页。

```
docs/zh/products/ai-coding/grok/
├── index.md              # 🗺️ 学习地图（家族决策树 + Grok Build 功能速查 + 模型参考）
├── grok-cli.md           # 📘 Tutorial+How-to — 安装、认证、TUI、headless、ACP、核心功能怎么用
├── grok-cookbook.md      # 🔧 How-to — 场景化配方（Claude Code 迁移、CI、hooks、MCP、skills、subagents、worktrees、sandbox）
├── grok-cheatsheet.md    # 📐 Reference — 子命令/flag/slash/配置键/环境变量/模型价格 + 高质量信息源
├── grok-glossary.md      # 📖 Explanation — 概念是什么/为什么（家族撞名、TUI/headless/ACP、权限模式 vs sandbox 等）
└── grok-bot.md           # 🗺️ 周边产品地图 — 云电脑同事（只写官方页，对位 Cowork）
```

每个文件的职责边界：

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | Tutorial 导航 + Reference 速查 | 家族决策树、Grok Build 功能速查表、模型选择 | 具体操作步骤 |
| `grok-cli.md` | Tutorial + How-to | 安装、认证、TUI 交互、headless、ACP、各功能怎么用 | 完整参数清单（→ cheatsheet）、概念定义（→ glossary） |
| `grok-cookbook.md` | How-to | 场景化配方与避坑 | 基础安装（→ cli）、概念定义（→ glossary） |
| `grok-cheatsheet.md` | Reference | 命令/flag/配置键/环境变量/价格表/信息源 | 概念解释、学习路径 |
| `grok-glossary.md` | Explanation | 是什么、为什么、概念之间的关系 | 参数清单（→ cheatsheet）、操作步骤 |
| `grok-bot.md` | 周边产品地图 | Grok Bot 是什么、资格、共享电脑、官方链接 | 臆造配额；Grok Build 操作步骤 |

跨页顺序（两轴法）：`index` → `grok-cli` → `grok-cookbook` → `grok-cheatsheet` → `grok-glossary`。Axis A（概念依赖）允许 glossary 更早，但 Axis B（读者复杂度）把它压到最后——前端工程师读者的第一诉求是「装上能跑」，概念辨析是回查内容。

## 监控页面（What's New 驱动更新的信息源，日常追踪用的最小子集）

- What's New / Changelog（CLI）：<https://x.ai/build/changelog>
- Grok Bot 文档树：<https://docs.x.ai/grok-bot/overview>
- Grok 消费端总览：<https://docs.x.ai/grok/overview>
- Build Mode（不要和 CLI 混）：<https://x.ai/grok/build-mode>
- Imagine API：<https://docs.x.ai/developers/model-capabilities/imagine>
- Release Notes（API/模型）：<https://docs.x.ai/developers/release-notes>
- 配置 / Settings 参考：<https://docs.x.ai/build/settings/reference>
- CLI Reference：<https://docs.x.ai/build/cli/reference>
- 模型与价格：<https://docs.x.ai/developers/models>、<https://docs.x.ai/developers/pricing>
- GitHub 源码（周期性从 monorepo 同步）：<https://github.com/xai-org/grok-build>
- npm 版本节奏：<https://www.npmjs.com/package/@xai-official/grok>

## Git 提交 scope

```
docs(grok): ...
```

## 已知踩坑 / 特殊约定

1. **`x.ai` 有 Cloudflare 防护，`curl` 和 WebFetch 一律 403**（`status.x.ai`、`console.x.ai` 同样 403）。读 `x.ai/*` 页面只能用 `mcp__web-reader__webReader`；`docs.x.ai` 反而可以直接 curl（200）。
2. **`https://docs.x.ai/llms.txt` 是整站全文镜像**（约 1.4 MB / 38,745 行），一次抓取即可离线检索，比逐页抓省得多。用 `grep -n "^==="` 取章节索引。注意：这类大文件要放在仓库外（如 `/tmp`），避免误提交。
3. **产品名不要写成 "Grok Code" / "Grok CLI"**。官方名是 Grok Build，可执行文件是 `grok`，仓库是 `grok-build`，营销页是 `x.ai/build`（`x.ai/cli` 会跳到同一页）。
4. **`x.ai/build/changelog` 比 docs 更新更快**，出现过 docs 的 CLI reference 里还没有的子命令（`grok du`、`grok trace`）。写 Reference 时以 docs 为准，changelog 独有的条目要标注出处。
5. **权限模式命名有两套**：TUI 里是 Ask / Auto / Always-approve（`Shift+Tab` 循环），headless/企业策略里出现 Claude Code 风格的 `--permission-mode dontAsk` / `acceptEdits`。教程里必须说明这是两套表述，不要混用。
6. **权限规则优先级是 deny > ask > allow**（`/build/settings/reference` 原文），和「后写覆盖先写」的直觉相反。
7. **project 级 `.grok/config.toml` 只生效 `[mcp_servers]`、`[plugins]`、`[permission]` 三个段**，其余键必须写在用户级 `~/.grok/config.toml`。这是最容易写错的一条。
8. **`MCP_TIMEOUT` 是毫秒，`GROK_MCP_STARTUP_TIMEOUT_SECS` 是秒**，官方文档明确前者是为兼容 Claude Code 而保留的。
9. **`GROK_WEB_FETCH` 默认为 `0`（关闭）**，官方给的理由是安全。写教程时不要假设 web fetch 开箱可用。
10. **`xai-org/grok-build` 不接受外部 PR**（README 原文「External contributions are not accepted.」），不要在文档里引导读者提 PR，反馈渠道是 TUI 里的 `/feedback`。
