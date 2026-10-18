# MiniMax Code 维护参考

> 复制自 [`_template.md`](./_template.md)。通用流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)。读者可见的数据源写进 `docs/zh/products/minimax-code/minimax-code-cheatsheet.md` 的「高质量信息源」，不要在本文件再抄一份。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：MiniMax Code 是第一方 Coding Agent 产品，不是「只把 M3 接到 Claude Code」。**

- 中文官网首页原文：「MiniMax Code / 最适配 MiniMax 模型的 Coding Agent」（[minimaxi.com](https://www.minimaxi.com/)）。
- 国际站原文：「The coding harness built for MiniMax models」（[minimax.io](https://www.minimax.io/)）。
- 产品文档原文：「MiniMax Code 是一款桌面端 AI Agent 应用。它把对话、项目工作区、文件操作、终端、浏览器、技能、记忆和自动化任务放在同一个本地工作环境里」（[agent.minimaxi.com/docs/code/welcome](https://agent.minimaxi.com/docs/code/welcome)）。
- M3 发布博文原文：「As an agent product designed specifically for M3 and trained together with M3, MiniMax Code can fully leverage M3’s capabilities… making it the preferred agent to pair with MiniMax-M3。」下载入口写的是 `agent.minimaxi.com/download`（[minimax.io/blog/minimax-m3](https://www.minimax.io/blog/minimax-m3)）。

**结论二：同一产品有两张使用面，不要写成两个产品。**

| 使用面 | 官方入口 | 可执行文件 / 安装物 | 文档 |
|--------|----------|---------------------|------|
| 桌面端 | [agent.minimaxi.com/download](https://agent.minimaxi.com/download)（国内）、[agent.minimax.io/download](https://agent.minimax.io/download)（海外） | macOS `.dmg` / Windows 安装程序 | `/docs/code/*` |
| CLI | [cli/quick-start](https://agent.minimaxi.com/docs/cli/quick-start) | 命令 **`mcode`** | `/docs/cli/*` |

CLI 官方定义：「MiniMax Code CLI 是 MiniMax Code 面向开发者工作流的终端入口。它与桌面客户端互为补充」（[cli/features](https://agent.minimaxi.com/docs/cli/features)）。三种 CLI 面：交互式 TUI（`mcode`）、Headless（`mcode exec`）、ACP（`mcode acp`）。

**结论三：适合本站「前端工程师 AI 编程工具」定位。**

依据：桌面端 Coding 模式保留工作区 / Files / Changes / Terminal / 内置浏览器；CLI 读 `AGENTS.md`、可接 Zed 等 ACP 宿主、有 `mcode exec` 进脚本和 CI。目标读者要的是对着本地仓库干活的 Agent，不是聊天陪聊或生视频。

**结论四：文档分两套站点，写作时不要混引。**

- `agent.minimaxi.com/docs/code/*`（中文）/ `agent.minimax.io/docs/code/*`（英文）= 桌面端
- `agent.minimaxi.com/docs/cli/*` / `agent.minimax.io/docs/cli/*` = CLI
- `platform.minimaxi.com/docs/guides/text-ai-coding-tools` = 把 **MiniMax-M3** 接到 Claude Code / Cursor / TRAE 等**第三方工具**。这不是 MiniMax Code 产品手册。
- `platform.minimax.io/docs/guides/models-intro` = 模型目录（M3 / H3 / Speech / Music），不是 Coding Agent。

2026-08-19 抓到的 `agent.minimax.io/docs/llms.txt` **没有列出** `/docs/cli/*`。CLI 页是靠侧栏 / 搜索发现的，维护时不要只扫 llms.txt。

**结论五：易撞名必须写清「不是什么」。**

- **MiniMax Code ≠ MiniMax Agent**。桌面端在 changelog v3.0.33（2026-05-29）「正式更名为 MiniMax Code」；网页通用 Agent 仍在 [agent.minimaxi.com](https://agent.minimaxi.com/)，文档站品牌仍写「MiniMax Agent 文档」。Agent 正文归 #73。
- **`mcode` ≠ changelog 里的 `minimax` 快捷方式**。CLI 官方命令是 `mcode`。v3.0.33 写的是桌面端「新增 minimax 命令行快捷方式」，没有给出 flag 表。不要把两者合成一条安装命令。
- **MiniMax Code ≠ 在 Claude Code 里用 M3**。后者是开放平台「通过 AI 编程工具接入」。
- **Mini-Agent（GitHub `MiniMax-AI/Mini-Agent`）不是本产品**。
- **Hailuo / 海螺 / MiniMax H3** 是视频生成，不是编程 Agent。
- **星野 / Talkie** 是角色互动应用，不是编程 Agent。
- **MiniMax Hub 与 MiniMax Design**：国际站产品名是 MiniMax Design（[design.minimax.io](https://design.minimax.io/)）；中文 About 一级导航和正文仍写 MiniMax Hub（[minimaxi.com/about](https://www.minimaxi.com/about)）。两份官方页打架，并列引用，禁止猜哪个赢。

**结论六：命令 / 包名只抄官方。没有官方 npm 包名。**

CLI 官方安装只有：

```bash
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

```powershell
irm https://filecdn.minimax.chat/public/install.ps1 | iex
```

验证：`mcode --version` / `mcode --help`。FAQ 提到安装器会访问 npm registry，**没有**给出 `npm install -g <包名>`。禁止编造包名。

桌面端没有 CLI 安装命令：打开下载页 → 选 arm64 / x64 → macOS 拖进 Applications / Windows 跑安装程序 → MiniMax 账号登录。系统要求：macOS 11 Big Sur+、Windows 10+。

## 基本信息

- 工具名：MiniMax Code（桌面端 + CLI 可执行文件 `mcode`）
- 官方文档根地址：<https://agent.minimaxi.com/docs/code/welcome>（中文桌面）、<https://agent.minimax.io/docs/code/welcome>（英文桌面）、<https://agent.minimaxi.com/docs/cli/quick-start>（CLI）
- 发版节奏：桌面 changelog 以 `v3.0.x` 记；2026-08-19 打开的 changelog 头部可见区间到 v3.0.37~v3.0.40（2026-06-08）。不要写死「每几天一版」。
- 当前覆盖版本：不锁桌面内部版本号。CLI 以读者本机 `mcode --version` 与 `/help` 为准。

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。抓页见 [`official-fetch.md`](./official-fetch.md)。

来源：中文站顶栏 / About（[minimaxi.com](https://www.minimaxi.com/)、[minimaxi.com/about](https://www.minimaxi.com/about)）；国际站顶栏 / 页脚（[minimax.io](https://www.minimax.io/)）；Agent 文档站（[agent.minimaxi.com/docs/llms.txt](https://agent.minimaxi.com/docs/llms.txt)）；开放平台模型页（[platform.minimax.io/docs/guides/models-intro](https://platform.minimax.io/docs/guides/models-intro)）。

| 官方一级入口 | 官方 URL | 本站去向（独立页 / 地图一行 / 缺失） | 不拆页理由（若一行） |
|--------------|----------|--------------------------------------|----------------------|
| MiniMax Code | [docs/code/welcome](https://agent.minimaxi.com/docs/code/welcome)、[download](https://agent.minimaxi.com/download) | 独立页（本目录） | — |
| MiniMax Agent | [agent.minimaxi.com](https://agent.minimaxi.com/) | 地图一行 | 网页通用 Agent；正文归 #73 |
| MiniMax Design | [design.minimax.io](https://design.minimax.io/) | 地图一行 | 商业内容 / 多模态创作，不是编程 Agent |
| MiniMax Hub | 中文 About 一级导航仍用此名（[about](https://www.minimaxi.com/about)） | 地图一行 | 与 Design 撞名；不写第二份教程 |
| MiniMax Audio / 语音 | [minimax.io/audio](https://www.minimax.io/audio) | 地图一行 | 语音与音乐产品 |
| 星野 | [xingyeai.com](https://www.xingyeai.com/) | 地图一行 | 角色互动社区，非本目录 |
| Talkie | 国际站 Product 一级（[minimax.io](https://www.minimax.io/)） | 地图一行 | 星野的国际名；专用落地页 URL 未在本次抓到独立文档树 |
| Hailuo / 海螺 / MiniMax H3 | [hailuoai.video](https://hailuoai.video/)、模型表 [models-intro](https://platform.minimax.io/docs/guides/models-intro) | 地图一行 | 视频生成；非编程 Agent |
| MiniMax M3 / M2.7 / … | [models-intro](https://platform.minimax.io/docs/guides/models-intro) | 地图一行 | 模型，不是产品教程；机制链 Learn LLM |
| Token Plan / API / 开放平台 | [platform.minimaxi.com](https://platform.minimaxi.com/)、[platform.minimax.io](https://platform.minimax.io/) | 地图一行 | 开发者平台；把 M3 接到第三方工具走 text-ai-coding-tools |
| 通过 AI 编程工具接入 | [text-ai-coding-tools](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools) | 地图一行 | 第三方 IDE/CLI 配 M3，不是 MiniMax Code |

易撞名（可执行文件名 ≠ 营销名 / Mode ≠ 同名产品）：见结论五。MiniMax Code 的 Coding / Work 是桌面模式，不是独立产品。CLI 的 Plan Mode 与 Ask / Auto / Full access 是两套开关。

非本站：微信 / 飞书只作为 MiniMax Code 的 IM 连接出现，不写即时通讯产品教程。

## 文档文件结构（Diátaxis）

官方桌面树约 25 页、CLI 另有 quick-start / features / faq，密度够四象限。本站只收 MiniMax Code，同厂其它 AI 产品不拆页。

```
docs/zh/products/minimax-code/
├── index.md                      # 🗺️ 学习地图 + Retrieve 家族表
├── minimax-code.md               # 📘 Tutorial — 桌面安装、第一次任务、CLI `mcode`
├── minimax-code-cookbook.md      # 🔧 How-to — Agent Team、exec、ACP、API Key
├── minimax-code-cheatsheet.md    # 📐 Reference — 命令 / slash / 权限 / 数据源
└── minimax-code-glossary.md      # 📖 Explanation — 撞名、两张脸、模式正交
docs/products/minimax-code/       # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族表、决策树、两张使用面 | 具体点击步骤 |
| `minimax-code.md` | Tutorial | 下载 / `mcode` 安装、登录、第一次任务、Coding/Work、工作区 | 完整 flag 表、模型内部 |
| `minimax-code-cookbook.md` | How-to | Agent Team、headless、ACP、自备 Key | 基础安装 |
| `minimax-code-cheatsheet.md` | Reference | 命令、slash、权限档、信息源 | 概念散文 |
| `minimax-code-glossary.md` | Explanation | 是什么 / 不是什么 | 操作步骤 |

跨页顺序：`index` → `minimax-code` → cookbook → cheatsheet → glossary。

## 监控页面

- 桌面 changelog：<https://agent.minimaxi.com/docs/changelog>
- 桌面欢迎页：<https://agent.minimaxi.com/docs/code/welcome>
- 桌面下载文档：<https://agent.minimaxi.com/docs/code/get-started/download>
- CLI 快速开始：<https://agent.minimaxi.com/docs/cli/quick-start>
- CLI 功能：<https://agent.minimaxi.com/docs/cli/features>
- 用量 / Token Plan（产品内）：<https://agent.minimaxi.com/docs/code/account/usage>
- 模型目录：<https://platform.minimax.io/docs/guides/models-intro>
- 第三方工具接 M3：<https://platform.minimaxi.com/docs/guides/text-ai-coding-tools>
- 中文 / 国际官网：<https://www.minimaxi.com/>、<https://www.minimax.io/>
- llms.txt（桌面树；缺 CLI）：<https://agent.minimaxi.com/docs/llms.txt>

## Git 提交 scope

```
docs(minimax-code): ...
```

## 已知踩坑 / 特殊约定

1. **两套安装原文不要混。** 桌面是下载页 + `.dmg` / 安装程序；CLI 才是 `filecdn.minimax.chat/public/install.sh`。
2. **`agent.*.com/docs/llms.txt` 漏 CLI。** 审计家族图时必须再打开 `/docs/cli/quick-start`。
3. **中英产品名不完全对齐。** 国际站 Design / Talkie / Audio；中文站 Hub / 星野 / 语音。Hub↔Design、星野↔Talkie 只并列，不裁定。
4. **下载页套餐（Plus / Max / Ultra）≠ Token Plan 美元档。** 2026-08-19 国内下载页见到 ¥49 / ¥119 / ¥469；M3 博文 Token Plan 是 $20 / $50 / $120。不要合成一张价目表。用量页写「具体计费和额度规则以产品内展示为准」。
5. **`mcode --session` 官方 quick-start 两行示例都没写出 session id**；FAQ 才写「已知 ID 时使用 `mcode --session <id>`」。引用时写清出处。
6. **CLI 不继承桌面 Browser / Computer Use。** FAQ 原文：这些能力「只有在当前宿主明确提供时才会出现」。
7. **开放平台 `text-ai-coding-tools` 里的 Grok CLI 包名是 `@vibe-kit/grok-cli`，且标注「不推荐」。** 那是第三方工具接 M3，禁止写进 MiniMax Code 安装节。
8. **模型内部（MSA、训练数据、benchmark 数字）不写进本站产品教程。** 链 Learn LLM / 官方博文。
