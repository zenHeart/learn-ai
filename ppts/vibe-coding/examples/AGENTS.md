# AGENTS.md

本文件定义本 **Vibe Coding 示例** 目录的 **项目意图、架构目标与规则**，供 AI 理解「项目要做什么」以及「编写或修改代码时应遵守什么」。环境、命令与工具说明见同目录下的 **CLAUDE.md**。

---

## 意图

本目录是「Vibe Coding」演讲的 **动手示例集合**。每个示例通过可运行 demo 和分步 README 讲解一个概念（如 tokenizer、embedding、AGENTS.md、规则、MCP、冷启动等）。

在此目录下工作时，你的目标是让示例 **清晰、自包含、且符合下述结构与约定**。不要在此重复「如何运行」或命令列表，相关内容放在 **CLAUDE.md**。

---

## 架构目标

- **一主题一 demo：** 每个子目录为 `X.Y.topic/`（如 `2.1.tokenizer/`、`3.1.agents-md/`、`4.1.cold-start/`），一个文件夹对应一个概念。
- **自包含：** 每个主题有独立 README（分步说明）和入口文件（如 `index.ts`），通过根目录 `package.json` 中对应的 `demo:X.Y` 脚本运行。
- **分层指引：** 子目录可有自己的 AGENTS.md 或 CLAUDE.md。**路径上最近** 的 AGENTS.md/CLAUDE.md 对该子树优先生效。本文件适用于整个 `examples/` 目录树，除非子目录另有覆盖。

---

## 规则

1. **语言与运行时：** 使用 **TypeScript**（ESNext、严格模式）。用 **tsx** 直接运行 `.ts` 文件。使用 **ES 模块**（`import`/`export`）；本包已设置 `"type": "module"`。
2. **主题结构：** 新 demo 放在新的 `X.Y.topic/` 文件夹下，并包含 **README**（面向讲师与使用者的步骤）和入口脚本。在根目录 `package.json` 中注册为 `demo:X.Y`（例如 `tsx X.Y.topic/index.ts`）。
3. **不与 CLAUDE.md 重复：** 不要在本文件中写环境/安装命令、demo 命令表或 Claude/Cursor 配置路径。**AGENTS.md** 只写意图、目标与规则；**CLAUDE.md** 写命令、目录结构与工具说明。

---

## 与其他文档的关系

- **CLAUDE.md**（本目录）— 命令、目录结构、Claude/Cursor 配置、技术栈。用于「怎么跑 / 某文件在哪」。
- **README.md**（各主题下，如 `3.1.agents-md/README.md`）— 该 demo 的教程与操作步骤。
- **本文件（AGENTS.md）** — 仅意图、架构目标与规则；用于理解「项目要什么」和「必须满足什么」。
