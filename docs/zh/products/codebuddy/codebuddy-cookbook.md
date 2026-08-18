---
title: CodeBuddy 实战手册
description: "面向已经装好、能登录的读者。每个配方抄官方步骤：先说目标，再给命令，最后标坑。不重复安装。"
domain: product
tags:
  - coding-agent
role: cookbook
---

# CodeBuddy 实战手册

面向「已经装好、能登录」的读者。每个配方是一个具体任务：先说目标，再给官方命令，最后说坑。

不会装的先看 [上手教程](./codebuddy)；只查命令去 [速查表](./codebuddy-cheatsheet)。

## 第一次进仓库先 `/init`

**目标**：让 CLI 先建项目上下文，再开始改代码。

来源：[快速入门](https://www.codebuddy.cn/docs/cli/quickstart)

```bash
cd /path/to/your/project
codebuddy
```

```
> /init
```

官方把 `/init` 标成「强烈推荐」：预先构建项目知识图谱，后续少重复扫描。结构大变时：

```
> /clear
> /init
```

**坑**：跳过 `/init` 直接甩跨文件大任务，官方说会更慢、更容易误判。不要用「仓库很大所以它肯定懂」代替这一步。

## 用 print 模式做一次性审查

**目标**：脚本或管道里跑一次，不要进 REPL。

来源：[快速入门](https://www.codebuddy.cn/docs/cli/quickstart)、[CLI 参考](https://www.codebuddy.cn/docs/cli/cli-reference)

```bash
codebuddy -p "优化这个 SQL 查询的性能"
cat error.log | codebuddy -p "分析这些错误日志"
codebuddy -p "审查 src/utils.js 的代码质量" -y
```

官方原文：使用 `-p/--print` 时，如果操作需要访问文件、执行命令等授权操作，必须添加 `-y`（或 `--dangerously-skip-permissions`）。也可以改用 `--permission-mode auto` / `dontAsk`，或预先配置 `permissions.allow`。

**坑**：只写 `-p` 不写权限策略，需要确认的操作会被挡住。`-y` 会跳过权限提示，官方写「谨慎使用」。

## 自定义一条斜杠命令

**目标**：把重复任务收成 `/名字`。

来源：[斜杠命令 · 自定义](https://www.codebuddy.cn/docs/cli/slash-commands)

- 项目级：`.codebuddy/commands/`
- 用户级：`~/.codebuddy/commands/`

`test.md` 会注册成 `/test`。子目录用冒号：`commands/frontend/build.md` → `/frontend:build`。

官方示例（审查文件）：

```markdown
---
description: "对指定文件进行代码审查"
argument-hint: "[file-paths...]"
allowed-tools: Read
---

请对以下文件进行代码审查，关注代码质量、可维护性和安全性：

@$ARGUMENTS
```

带 Shell 的命令必须在 frontmatter 写上 `Bash`，否则官方说「命令无法执行」。

**坑**：自定义斜杠命令是人手动触发的。官方另有 Skills——「AI 自动识别并调用的专业能力模板」。不要把两套写成一套。

## 加一个 MCP 服务器

**目标**：让 CLI 调到外部工具。

来源：[MCP 文档](https://www.codebuddy.cn/docs/cli/mcp)

```bash
codebuddy mcp add --scope user my-tool -- /path/to/tool arg1 arg2
codebuddy mcp add --scope project python-tool -- python /path/to/script.py
codebuddy mcp add --scope user --transport sse sse-server https://example.com/mcp/sse
codebuddy mcp add --scope project --transport http http-server https://example.com/mcp/http
```

IDE 里的 CloudBase 一类集成，CloudBase 文档写：IDE 用户在设置页 / 集成点「Tencent CloudBase」授权，不必手写 MCP。那是 CloudBase 文档的口径，配 CodeBuddy 时以你本机设置为准。

## 从 Claude Code 迁移

**目标**：把已有 Claude Code 的 agents / commands / skills / 指令文件接到 CodeBuddy。

来源：[故障排查 · 从 Claude Code 迁移](https://www.codebuddy.cn/docs/cli/troubleshooting)

官方迁移表：

| 目录 / 文件 | 说明 |
|-------------|------|
| `agents/` | 自定义 agents |
| `commands/` | 斜杠命令 |
| `skills/` | Skills |
| `CLAUDE.md` → `CODEBUDDY.md` | AI 指令和记忆文档 |

方案一（官方推荐，符号链接）：

```bash
cd ~/.codebuddy
ln -s ~/.claude/agents agents
ln -s ~/.claude/commands commands
ln -s ~/.claude/skills skills
ln -s ~/.claude/CLAUDE.md CODEBUDDY.md
```

方案二（复制，两边独立）：

```bash
cp -r ~/.claude/agents ~/.codebuddy/agents
cp -r ~/.claude/commands ~/.codebuddy/commands
cp -r ~/.claude/skills ~/.codebuddy/skills
cp ~/.claude/CLAUDE.md ~/.codebuddy/CODEBUDDY.md
```

验证：

```bash
codebuddy
```

```
> /skills
> /config
```

官方还写：Claude Code 插件中的 Skills 支持一键安装，安装后自动加载。

**坑**：这是「拷配置」，不是「Claude Code 和 CodeBuddy 是同一个产品」。权限模式、登录域、额度都走 CodeBuddy 自己的账号。

## 控制 Token：新任务新会话

**目标**：别在一个会话里塞十件无关的事。

来源：[故障排查 · 成本优化](https://www.codebuddy.cn/docs/cli/troubleshooting)

官方原则：

- 新任务用 `/clear`
- 长对话用 `/compact`
- 用 `@filename` 引用文件，避免粘贴代码

官方对照（原文数字，不是本站测算）：

| 方式 | 输入 Token | 相对成本 |
|------|------------|----------|
| 单会话连续 10 个任务 | ~50,000 | 高 |
| 每个任务新会话 | ~15,000 | 低 |
| 定期 `/compact` | ~25,000 | 中 |

官方建议每 20–30 轮 `/compact`。

## 在插件里问整个工程

**目标**：不问「当前文件」，问仓库结构。

来源：[产品概述](https://cloud.tencent.com/document/product/1831/134343)

官方提供 `@workspace` 和 `#Codebase`：对工程提问，覆盖结构、函数和类关系、依赖、业务流程。

**坑**：这是插件 / IDE 侧的工程问答能力。不要把它和 CLI 的 `/init` 当成同一个开关。

## 让 IDE 从一句话走到可预览产物

**目标**：用独立 IDE 做 0-1，而不是在旧仓库里补一行。

来源：[产品概述](https://cloud.tencent.com/document/product/1831/134343)、[IDE 落地页](https://www.codebuddy.cn/ide/)

官方链路：自然语言描述 → 结构化 PRD → 原型 / 设计稿（也可手绘或组件库）→ 设计稿转代码（内置 Figma）→ CloudBase / Supabase → 部署到 CloudStudio / EdgeOne Pages。

**坑**：这是 IDE 的主场。插件不会 magically 变成同一条「产设研」流水线。部署和 BaaS 以 IDE 设置页为准，不要在本站编一套控制台路径。

## 护栏

- 配方里的命令必须能在上面列出的官方页找到。找不到就不要补「通常可以」。
- 不要在这里教 WorkBuddy、元宝、微信或 QQ。
- 不要把 CLI `plugin` 和编辑器插件写成同一次安装。
