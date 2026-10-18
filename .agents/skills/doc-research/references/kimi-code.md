# Kimi Code 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/kimi-code/kimi-code-cheatsheet.md` 的「高质量信息源」章节。文档架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：本 issue 的主产品是 Kimi Code（CLI + VS Code），不是 Kimi 对话，也不是旧版 Python `kimi-cli`。**

- 产品落地页 `https://www.kimi.com/code` 原文：「Engineered to drop into any dev workflow…」安装栏给出 `curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash`。
- 产品文档总览 `https://www.kimi.com/code/docs/` 原文：「Kimi Code 是 Kimi 会员权益 中专为开发者提供的智能编程服务……通过 CLI、VS Code 扩展插件等产品形态」。
- 帮助中心产品对照 `https://www.kimi.com/zh-hans/help/others/product-comparison` 把家族拆成四项：**Kimi**（网页 / App）、**Kimi Work**（桌面本地 Agent）、**Kimi Code**（CLI + VS Code）、**Kimi Claw**（云端自动化）。
- 开源仓 `github.com/MoonshotAI/kimi-code` README 标题是 **Kimi Code CLI**，可执行文件名是 `kimi`。

**结论二：当前官方 CLI 是 Node.js / TypeScript 重写版；旧版 Python/uv `kimi-cli` 只作迁移附录。**

- 产品总览横幅：「Kimi Code CLI 已完成重大版本升级，底层从 Python/uv 迁移至 Node.js……旧版将不再维护。」
- What's New 对照表（`/code/docs/kimi-code/whats-new`）：旧版运行时 Python + uv、配置 `~/.kimi/config.toml`；新版 Node.js、配置 `~/.kimi-code/config.toml`（**格式不兼容**）。迁移命令是 `kimi migrate`。
- 新版安装（Getting Started + GitHub README）：
  - macOS / Linux：`curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash`
  - Windows PowerShell：`irm https://code.kimi.com/kimi-code/install.ps1 | iex`
  - npm：`npm install -g @moonshot-ai/kimi-code`（`engines.node >= 22.19.0`）
- 帮助中心里仍能看到旧脚本 `curl -LsSf https://code.kimi.com/install.sh | bash` 与 `uv tool install … kimi-cli`。那是旧 Python 线，**不要当当前安装命令抄**。

**结论三：形态是「会员编程权益 + 第一方 CLI + 第一方 VS Code 扩展 + 兼容 API」，对位 Claude Code。**

三种官方使用面（产品总览 + membership-guide）：

| 使用面 | 入口 | 典型场景 |
|--------|------|----------|
| Kimi Code CLI | 命令 `kimi` | 终端 TUI / `-p` headless / `kimi acp` |
| Kimi Code for VS Code | Marketplace `moonshot-ai.kimi-code` | 编辑器侧栏聊天、diff、`@` 引用 |
| 第三方工具 API | `https://api.kimi.com/coding/`（Anthropic）或 `https://api.kimi.com/coding/v1`（OpenAI） | Claude Code、OpenCode、Codex、Roo Code 等 |

Zed / JetBrains / Paseo 走 CLI 的 ACP：`kimi acp`（`guides/ides`）。这不是第一方 VS Code 插件。

**结论四：VS Code 扩展处于适配窗口，两份官方页口径不一致，教程必须并列引用。**

- 产品文档 `/code/docs/kimi-code-for-vscode/getting-started` 原文：「Kimi Code for VS Code 目前仅对旧版 Python CLI 用户开放新增安装。已安装插件的老用户升级新版 CLI 后仍可继续使用，其他 TS 版本 CLI 用户暂不支持安装。」
- Marketplace 扩展页（publisher `moonshot-ai`，item `kimi-code`，2026-08-19 看到 0.7.0）原文：扩展跑 **Kimi Code Node SDK**；与终端 App 解析到同一 `KIMI_CODE_HOME` 时共享 `config.toml`、MCP、登录态和会话；要求 VS Code `>= 1.100.0`。
- 禁止抹平成「现在一定能 / 一定不能装」。以产品文档的安装资格为准，Marketplace 的共享 home / 版本要求单独写。

**结论五：适合本站「前端工程师 AI 编程工具」定位。**

- 安装门槛低：一行官方脚本，无需预装 Node；也有 npm 通道。
- 能力面与 Claude Code / Grok Build 同级：Plan / YOLO / Auto、Skills、Hooks、MCP、Plugins、subagent（`coder` / `explore` / `plan`）、Goal、ACP、`AGENTS.md`。
- 国内直连、走 Kimi 会员。国内前端读者是目标受众。

**结论六：文档分三套站点，写作时不要混引。**

| 站点 | 写什么 | 不要当成 |
|------|--------|----------|
| `https://www.kimi.com/code/docs/` | 产品总览、会员、模型 ID、VS Code、FAQ | CLI 子命令全集 |
| `https://moonshotai.github.io/kimi-code/` | CLI Guides / Customization / Configuration / Reference | 会员档位与 VS Code 安装资格 |
| `https://www.kimi.com/help/kimi-code/` 与 `kimi.ai/help/kimi-code/` | 帮助中心入门（有时滞后） | 当前安装脚本 SSOT |

CLI 命令 / flag 以 github.io `reference/kimi-command` 为准。模型 ID / 会员档位以 `www.kimi.com/code/docs/kimi-code/models` 为准。

**结论七：同厂兄弟产品只在地图占一行，链到将有的 `/zh/products/kimi/`。**

本目录不写 Kimi 对话、Kimi Work、Kimi Claw 的完整教程（issue #70）。开放平台 `platform.moonshot.cn` / `platform.kimi.com` / `platform.kimi.ai` 只在地图和 API 对照表出现。

**禁止当事实写：**

- 旧脚本 `code.kimi.com/install.sh`（无 `kimi-code/` 路径）当作当前安装命令
- 产品名写成「Kimi CLI」而不加 Code（可执行文件可以写 `kimi`）
- 「应该是 npm 包名 `@kimi/cli`」之类猜测（官方包是 `@moonshot-ai/kimi-code`）
- 把 Marketplace 的 Node SDK 说明写成已经取消「仅 Python CLI 用户可新装」的限制
- 套餐价格数字（官方只链会员页，不在文档里写死金额）
- `k3-256k` 作为当前模型 ID：2026-08-19 的产品总览一度列出 4 个 ID，同日 `/kimi-code/models` 写「共 3 个模型 ID」，以 models 页为准

## 基本信息

- 工具名：Kimi Code（CLI 可执行文件 `kimi`；VS Code 扩展 `moonshot-ai.kimi-code`）
- 厂商：月之暗面 Moonshot AI
- 官方产品页：<https://www.kimi.com/code>
- 官方产品文档根：<https://www.kimi.com/code/docs/>
- CLI 文档根：<https://moonshotai.github.io/kimi-code/zh/>（英：`/en/`）
- 发版节奏：npm `@moonshot-ai/kimi-code` 在 2026-08-18 的 `latest` 是 `0.37.1`。不要写死 SLA。
- 当前覆盖版本：以 2026-08-19 打开的官方页为准；教程不绑死小版本号。

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。

| 官方一级入口 | 官方 URL | 本站去向（独立页 / 地图一行 / 缺失） | 不拆页理由（若一行） |
|--------------|----------|--------------------------------------|----------------------|
| Kimi Code（产品） | https://www.kimi.com/code | 独立页（本目录） | |
| Kimi Code 文档总览 | https://www.kimi.com/code/docs/ | 独立页 `index.md` | |
| Kimi Code CLI | https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started 、https://moonshotai.github.io/kimi-code/zh/guides/getting-started | 独立页 `kimi-code.md` | |
| Kimi Code for VS Code | https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started 、Marketplace `moonshot-ai.kimi-code` | 并入 `kimi-code.md` | 官方 VS Code 页偏薄，且标明适配中 |
| Kimi Code 控制台 | https://www.kimi.com/code/console | 地图一行 | 额度 / API Key 管理台，不是教程产品 |
| Kimi Code API（第三方） | 总览里的 Base URL 表 | 并入 Tutorial + cheatsheet | 官方是配置表，不是独立产品 |
| Kimi（网页 / App） | https://www.kimi.com 、对照页 | 地图一行 → `/zh/products/kimi/` | issue #70 |
| Kimi Work | 对照页、下载页桌面端 | 地图一行 → `/zh/products/kimi/` | issue #70 |
| Kimi Claw | 对照页 | 地图一行 → `/zh/products/kimi/` | issue #70 |
| Kimi 开放平台 | https://platform.moonshot.cn/ 、`platform.kimi.com` / `platform.kimi.ai` | 地图一行（只链官方） | 按量 API，不是 Coding Agent |
| 旧版 Python kimi-cli | What's New 对照表、`kimi migrate` | Tutorial 附录 | 官方声明不再维护 |

易撞名：

- **Kimi Code ≠ Kimi（对话）≠ Kimi Work ≠ Kimi Claw**。对照页把「在哪用 / 面向谁」写死了。
- **可执行文件 `kimi` ≠ 产品营销名 Kimi Code**。
- **新版 `~/.kimi-code/` ≠ 旧版 `~/.kimi/`**。
- **Kimi Code API（`api.kimi.com/coding`）≠ 开放平台 API（`api.moonshot.cn/v1`）**。Key 不通用。
- **Build / Work / Claw 都不是本目录的 CLI。**
- **`kimi acp` ≠ 第一方 VS Code 扩展。**

## 文档文件结构（Diataxis）

官方 CLI 参考密度够独立 cheatsheet。Cookbook / Glossary 官方虽有 use-cases 和概念，但本站先用 Tutorial + 官方深链覆盖，避免五文件硬凑。

```
docs/zh/products/kimi-code/
├── index.md                     # 学习地图 + 家族表
├── kimi-code.md                 # Tutorial（CLI + VS Code + API + 迁移附录）
└── kimi-code-cheatsheet.md      # Reference
docs/products/kimi-code/         # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族表、决策树、学习路径、功能速查 | 逐步操作 |
| `kimi-code.md` | Tutorial | 安装、登录、第一次对话、VS Code、ACP、API、迁移附录 | 完整 flag 表 |
| `kimi-code-cheatsheet.md` | Reference | 命令 / slash / 模型 ID / Base URL / 信息源 | 概念散文 |

不写：`kimi-code-cookbook.md`、`kimi-code-glossary.md`（官方 How-to / 术语密度尚未要求本站再抄一份；场景链官方 use-cases，撞名写在 index）。

跨页顺序：`index` → `kimi-code` → `kimi-code-cheatsheet`。

## 监控页面

- 产品落地页：<https://www.kimi.com/code>
- 产品文档总览：<https://www.kimi.com/code/docs/>
- What's New：<https://www.kimi.com/code/docs/kimi-code/whats-new>
- 会员权益：<https://www.kimi.com/code/docs/kimi-code/membership>
- 模型配置：<https://www.kimi.com/code/docs/kimi-code/models>
- VS Code 快速开始：<https://www.kimi.com/code/docs/kimi-code-for-vscode/getting-started>
- CLI Getting Started：<https://www.kimi.com/code/docs/kimi-code-cli/guides/getting-started>
- CLI 命令参考：<https://moonshotai.github.io/kimi-code/zh/reference/kimi-command>
- CLI Changelog：<https://moonshotai.github.io/kimi-code/zh/release-notes/changelog>
- 产品对照：<https://www.kimi.com/zh-hans/help/others/product-comparison>
- GitHub：<https://github.com/MoonshotAI/kimi-code>
- npm：<https://www.npmjs.com/package/@moonshot-ai/kimi-code>
- Marketplace：<https://marketplace.visualstudio.com/items?itemName=moonshot-ai.kimi-code>
- 控制台：<https://www.kimi.com/code/console>

## Git 提交 scope

```
docs(kimi-code): ...
```

## 已知踩坑 / 特殊约定

1. **安装脚本路径带 `/kimi-code/`**。当前官方是 `https://code.kimi.com/kimi-code/install.sh`。帮助中心 / 营销旧文仍可能写 `https://code.kimi.com/install.sh`（那是 Python 线）。
2. **`-c` 才是官方 continue 短选项**（`kimi-command` + Getting Started）。帮助中心英/中文页写过 `-C`。以 CLI 参考为准。
3. **`KIMI_API_KEY` 不会从 shell 环境自动读取**（`env-vars` 原文）。必须写进 `config.toml` 的 `[providers.<name>]` 或 `[providers.<name>.env]`。例外是 `KIMI_MODEL_*` 临时通道。
4. **两套账号体系**：`api.kimi.com`（会员 Coding）和 `api.moonshot.cn`（开放平台按量）Key 不通用。
5. **不要改 `products-gallery.js` / `ai-coding.mjs` / `config.mjs`**。本 issue 父进程统一挂导航。
6. **VS Code 新装资格以产品文档横幅为准**，不要用 Marketplace README 覆盖它。
7. **`www.kimi.com/code/docs/` 与 `www.kimi.com/coding/docs/` 是同一产品文档的两套路径**，内容可能差一个模型 ID。写模型表跟 `/kimi-code/models`。
8. **What's New 提到 Homebrew `brew upgrade kimi-code`**，但 Getting Started 没有 `brew install` 原文。不要补安装命令。
9. **`code.kimi.com/console` 会落到旧安装脚本 CDN**，控制台用 `https://www.kimi.com/code/console`。
