# Codex 学习地图

> Codex 是 OpenAI 的编程 Agent。它能跑在终端、编辑器、ChatGPT 应用和云端——四个入口共用同一套配置。本页是地图：每页干什么、按什么顺序读最快能上手。
>
> 官方文档在 `learn.chatgpt.com/docs`。旧地址 `developers.openai.com/codex/*` 会 308 永久重定向过去。

## 四个入口

```
Codex
├── CLI            — 终端，最灵活，本教程以它为中心
├── IDE 扩展       — 嵌在编辑器里，看行内 diff
├── ChatGPT 应用   — 对话式，把任务丢出去再回来看
└── Cloud          — 托管环境里跑，可并行多次尝试
```

这是**一个产品、一套配置**，不是四个碰巧同名的工具。CLI 里学会的沙箱、审批策略和 `AGENTS.md`，在其他入口同样生效。

## 我该看哪一页？

按你现在要做的事选，不要按功能分类硬翻：

| 你想 | 去读 | 类型 |
| --- | --- | --- |
| 装好并完成第一个任务 | [Codex CLI](./codex-cli) | Tutorial |
| 先看清整条产品线 | [Codex 产品线](./codex-ai) | Tutorial |
| 弄清套餐到底包含什么 | [ChatGPT 套餐与 Codex 访问](./chatgpt-plus) | Tutorial |
| 马上解决一个具体任务 | [Codex Cookbook](./codex-cookbook) | How-to |
| 接到真实项目或 CI | [项目集成](./integration) | How-to |
| 搞懂一个概念为什么存在 | [Codex 术语表](./codex-glossary) | Explanation |
| 查某个 flag 或配置键 | [Codex 速查表](./codex-cheatsheet) | Reference |

只读两页的话：先读 [Codex CLI](./codex-cli)，再把 [速查表](./codex-cheatsheet) 钉住。

## 学习路径

### 阶段 1 — 安装，并用只读模式跑一次

装好、登录，对着你已经熟悉的仓库关掉写入。先看它怎么推理，再让它改东西。

```bash
npm install -g @openai/codex
codex login
codex --sandbox read-only "explain how this project is structured"
```

macOS 也可以用已核实的 Homebrew cask：`brew install --cask codex`。

→ [Codex CLI](./codex-cli) 第 1–3 步

### 阶段 2 — 把权限模型设对

这一步最容易被跳过，也是 Codex 要么烦到被卸载、要么松到出事的原因。两个设置各自独立：

- **`sandbox_mode`** — `read-only` / `workspace-write` / `danger-full-access`。硬边界，决定能写什么。
- **`approval_policy`** — `untrusted` / `on-request` / `never`，或 granular 表。决定什么时候停下来问你。

「从不询问」+「不能写出工作区」是完全合理的组合，也是自动化评审能跑起来的前提。

→ 模型见 [术语表](./codex-glossary)，配置见 [Codex CLI](./codex-cli) 第 6 步

### 阶段 3 — 写一份 AGENTS.md

`AGENTS.md` 是每次运行都会加载的自然语言项目简报。用 `/init` 生成草稿，再删到只剩团队才知道的事：包管理器、验收命令、谁都不该碰的目录。

失败模式：合并后的指令文件受 `project_doc_max_bytes` 限制（默认 32 KiB），超出部分会**静默丢弃**。

→ [Codex CLI](./codex-cli) 第 7 步，[项目集成](./integration)

### 阶段 4 — 按任务查 Cookbook

从这里开始不要再线性读。去 [Cookbook](./codex-cookbook) 查重构、补测试、评审、排错各自该怎么下指令。

### 阶段 5 — 自动化

`codex exec` 是同一个 Agent，只是没有 TUI：跑完就退出。CI 里必须配 `--ask-for-approval never`，因为没有人会回答审批提示。不要用已删除的 `--full-auto`。

```bash
codex --ask-for-approval never exec --json \
  "run the test suite; if anything fails, fix it and re-run until green"
```

→ [项目集成](./integration)

### 阶段 6 — 扩展

MCP、Hooks、Skills、Plugins、Subagents。有重复工作流值得打包时再碰，不要提前堆配置。

→ [术语表](./codex-glossary)、[速查表](./codex-cheatsheet)

## 需要尽早建立的概念

| 概念 | 一句话 | 为什么重要 |
| --- | --- | --- |
| 沙箱 | 文件和网络访问的硬边界 | 信任 Agent 还是监督 Agent，差在这里 |
| 审批策略 | 行动前要不要问你 | 设错了会不可用，或反过来太危险 |
| 信任级别 | 项目级 `.codex/` 会不会加载 | 未信任项目会静默忽略自己的配置 |
| `AGENTS.md` | 自动加载的项目简报 | 避免每个会话重新解释约定 |
| Profile | 用 `--profile` 切换的命名配置包 | 一条命令在评审模式和开发模式之间切 |
| `codex exec` | 一次性非交互运行 | CI 入口 |
| Compaction | 对旧上下文做有损压缩 | 解释长会话为何会变差 |

完整定义在 [术语表](./codex-glossary)。

## 和同类工具比

| 如果你要 | 考虑 |
| --- | --- |
| OpenAI 生态里的终端 Agent，挂在 ChatGPT 套餐上 | **Codex** |
| Anthropic 套餐上的终端 Agent | [Claude Code](../claude/) |
| 围绕 AI 做的编辑器，带 Tab 补全 | [Cursor](../cursor) |
| 现有编辑器里的行内补全 | [GitHub Copilot](../copilot) |

已经付 ChatGPT Plus 及以上的话，Codex 是自然选项——访问权含在套餐里，不用另买。定价页还列出 Free / Go 也有部分 Codex 能力，入口和额度以[官方定价页](https://learn.chatgpt.com/docs/pricing)为准。

## 诚实的限制

- **一定要看 diff。** Codex 擅长写出「看起来对」的代码，这不等于正确。
- **`danger-full-access` 名副其实。** 没读过的代码不要开。
- **搜索默认走缓存。** 查变动很快的库时，加裸 `--search`，否则它会很有把握地给你过期答案。
- **版本敏感细节会漂。** 稳定版大约每周一个 minor。本指南和 `learn.chatgpt.com/docs` 不一致时，以官方为准。

## 官方来源

| 来源 | 用来查什么 |
| --- | --- |
| [Codex 文档根](https://learn.chatgpt.com/docs) | 一切 |
| [Quickstart](https://learn.chatgpt.com/docs/quickstart) | 从安装到第一次运行 |
| [Configuration Reference](https://learn.chatgpt.com/docs/config-file/config-reference) | 每个配置键 |
| [Pricing](https://learn.chatgpt.com/docs/pricing) | 套餐和配额的唯一权威 |
| [Changelog](https://learn.chatgpt.com/docs/changelog) | 发了什么 |
| [openai/codex](https://github.com/openai/codex) | 源码、发行版、Issues |

> 文档页带 `?surface=cli|app|ide` 选择器。页面看起来像在讲另一个产品时，先看当前 surface。
