# Jules

> 云端异步编码智能体。你在本地建任务然后走人，它在云端 VM 里克隆仓库、执行、最后产出一个 Pull Request。

## 核心定位

Jules 和家族里其他工具最本质的区别是**你不在旁边**。

这一条决定了它的全部设计：因为无人监督，所以它先出计划等你批准；因为产出需要评审，所以它交付的是 PR 而不是直接改你的工作区；因为环境不是你的机器，所以它需要 `AGENTS.md` 告诉它怎么装依赖、怎么跑测试。

| 维度 | Jules |
|---|---|
| 运行位置 | 云端 VM |
| 谁发起 | 你在 Web 或 CLI 建任务，之后离开 |
| 交付物 | 一个 Pull Request |
| 人工卡点 | 执行前的计划批准 |
| 适合 | 边界清晰、机械、耗时的任务 |

额度随 Google AI 订阅档位提升，官方对比表**只有定性描述**（任务数与并发任务数逐档提高），没有具体数字，详见 [速查表的订阅层级](./gemini-cheatsheet#订阅层级)。

## 第一步：写 AGENTS.md

**这一步不能省。** Jules 会自动读取仓库根目录的 `AGENTS.md`。省了它，Jules 只能靠猜你的项目怎么跑起来，产出质量会明显下降。

```markdown
# AGENTS.md

## 环境
- Node 22，包管理器用 pnpm
- 安装依赖：pnpm install --frozen-lockfile

## 验证
- 类型检查：pnpm typecheck
- 测试：pnpm test
- 提 PR 前这两条必须都过

## 禁区
- src/legacy/ 只读
- 不要改 pnpm-lock.yaml 之外的锁文件
- 不要动 .github/workflows/
```

写作要点：**写命令，不要写描述**。"用 pnpm 安装依赖"不如 `pnpm install --frozen-lockfile` 有用。

## 安装与使用

```bash
npm install -g @google/jules
```

首次使用需要在浏览器里完成 Google 账号授权。

### 交互式看板

直接跑 `jules` 打开交互式 TUI，能看到任务状态和并排 diff：

```bash
jules
```

### 常用命令

```bash
jules help
jules version

jules remote --help
jules remote list --repo                 # 列出仓库
jules remote list --session              # 列出会话

# 建任务
jules remote new --repo <owner/repo> --session "把 React 升到 19 并修复破坏性变更"

# 并行开多个任务
jules remote new --parallel <number>

# 把结果拉到本地
jules remote pull --session <id>

# shell 补全
jules completion bash

# 全局选项
jules --theme dark                       # dark / light
```

> ⚠️ npm 包名是 `@google/jules`。历史版本文档里的 `@google/jules-tools`、`jules status`、`jules task list`、`jules pr apply`、`jules remote new "<描述>"`（缺 `--repo` / `--session`）、`--issue=` 都不存在，别照抄。

## 什么任务适合丢给 Jules

判据是**边界是否清晰**，而不是任务大小。

| 适合 | 为什么 |
|---|---|
| 依赖 / 框架升级 | 目标明确，验证方式明确（测试过不过） |
| 技术债清理（补类型、删死代码） | 机械、耗时、不需要架构判断 |
| 批量重命名与格式统一 | 规则可以完全写清 |
| 补测试 | 有明确的覆盖目标 |

| 不适合 | 为什么 |
|---|---|
| 需要架构决策的重构 | 无人监督时它只能自己选一条路，你事后大概率不认 |
| 探索性任务（"看看能不能优化性能"） | 没有验收标准，产出无法判断 |
| 需要边看边调的 UI 工作 | 反馈回路断了，用 [Antigravity](./antigravity) |

## 并行任务的坑

`--parallel` 很诱人，但**多个任务改同一批文件会撞车**。

拆任务时按**目录或模块**划清边界：

```
✅ 任务 A：src/features/auth/ 补类型
   任务 B：src/features/billing/ 补类型

❌ 任务 A：全项目补类型
   任务 B：全项目删死代码        ← 必然冲突
```

**别按"顺手一起做"划分**。两个任务只要可能碰到同一个文件，就串行跑。

## 常见问题

**PR 里的改动方向不对**：回头看计划批准那一步。计划阶段花一分钟读完，比事后重做一个 PR 便宜得多。

**它装不上依赖 / 测试跑不起来**：`AGENTS.md` 里的命令不完整或过期。这是最常见的失败原因。

**多个 PR 互相冲突**：并行任务边界没划清，见上一节。

## 与其他产品怎么选

完整对比表见 [速查表](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules)。

一句话版本：**能写清验收标准并且愿意等的活丢给 Jules，需要边看边验证的留给 [Antigravity](./antigravity)，编辑器里的小改动用 [Code Assist](./code-assist)。**

## 官方资源

- [Jules 文档](https://jules.google/docs/)
- [Jules CLI 命令参考](https://jules.google/docs/cli/reference/)

## 相关页面

- [速查表](./gemini-cheatsheet#jules) — CLI 命令速查
- [术语表](./gemini-glossary#agents-md) — `AGENTS.md` 与其他指令文件的区别
- [Cookbook](./gemini-cookbook#10-依赖升级这种耗时又机械的活) — 依赖升级配方
