# Cursor 术语表

解释型文档：回答「是什么、为什么这样切、和谁容易混」。怎么配、怎么选见 [速查表](./cursor-cheatsheet)；怎么点见 [教程](./cursor)。

## 概念关系图

```
                    ┌──────────────┐
                    │  模型 + 工具  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌───┴────┐  ┌────┴────┐
         │  Rules  │  │ Skills │  │   MCP   │
         │ AGENTS  │  │Commands│  │ (外部)  │
         └────┬────┘  └───┬────┘  └────┬────┘
              │           │            │
              └─────┬─────┴──────┬─────┘
                    │            │
              ┌─────┴─────┐ ┌────┴────┐
              │   Agent   │ │  Hooks  │  ← 观察 / 拦截循环
              │ Ask/Plan/ │ └─────────┘
              │ Debug/Tab │
              └─────┬─────┘
                    │
         ┌──────────┼──────────┐
         │                     │
   ┌─────┴─────┐        ┌──────┴──────┐
   │ Subagents │        │ Cloud /     │
   │           │        │ Bugbot      │
   └───────────┘        └─────────────┘
```

**怎么读**：Rules / `AGENTS.md` 是常驻说明书。Skills / Commands 是按需工作流。MCP 把外部系统变成工具。Hooks 挂在循环上，不依赖模型自觉。Agent 在这些约束里选工具；Subagents 把吵的中间过程挪到别的上下文；Bugbot 和 Cloud 是仓库 / PR 维度的另一条线。

---

## Rules

**是什么**：写进模型上下文**开头**的持久指令。官方原文：模型跨补全不记事，Rules 在 prompt 层提供可复用上下文。

**为什么需要**：没有它，你每次都要重复「用 pnpm」「别碰 `src/legacy`」。有它，团队把约定提交进 git，新会话自动带上。

**四种触发**：Always / 按 glob / 按 description 智能拉取 / 仅 `@` 手动。frontmatter 真值表见 [速查表](./cursor-cheatsheet#rules-frontmatter)。

**和 AGENTS.md 的区别**：

| | Rules (`.mdc`) | AGENTS.md |
|--|----------------|-----------|
| 格式 | YAML frontmatter + Markdown | 纯 Markdown |
| 触发 | 四类 | 出现即作为项目指令 |
| 适合 | 按路径拆、要 metadata | 简单、给人类和其他 Agent 看 |

`.cursor/rules` 里的纯 `.md` **不会**进规则系统。官方：若想写纯 Markdown，用 `AGENTS.md`。

**优先级**：Team → Project → User。全部合并，冲突时更早的源优先。

**官方文档**：[Rules](https://cursor.com/docs/rules)

---

## AGENTS.md

**是什么**：项目根或子目录里的一份普通 Markdown，写给 Agent 的说明书。没有 `description` / `globs` / `alwaysApply`。

**为什么需要**：一份文件同时服务 Cursor、Claude Code、Codex 等读 `AGENTS.md` 的工具。Rules 的 glob 更强，但绑定 Cursor。

**在生态中的角色**：简单项目可以只有它。复杂仓库：根目录 `AGENTS.md` 讲全局，`.cursor/rules/*.mdc` 按语言/目录加约束。

**官方文档**：[Rules · AGENTS.md](https://cursor.com/docs/rules)

---

## Skills

**是什么**：Agent Skills 开放标准下的目录：一份 `SKILL.md` + 可选 `scripts/` / `references/` / `assets/`。启动时被发现，Agent 按 `description` 判断是否相关；也可 `/skill-name` 手动调。

**为什么需要**：Always Rules 每轮都占窗口。发布流程、评审清单这类长说明书应该按需加载。

**和 Commands 的区别**：Commands 是「我键入 `/` 才跑」的 Markdown。Skills 默认可被模型自动调用；`disable-model-invocation: true` 时行为接近传统 slash command。官方 2.4 起有 `/migrate-to-skills`，把动态规则和 slash commands 迁过去。

**内置例子**（官方表，不是完整产品功能列表）：`/create-rule`、`/create-skill`、`/create-subagent`、`/review-bugbot`、`/babysit`、`/in-cloud` 相关能力等。写文档前以 [Skills](https://cursor.com/docs/skills) 表格为准。

**官方文档**：[Skills](https://cursor.com/docs/skills)

---

## Commands

**是什么**：`.cursor/commands/` 或 `~/.cursor/commands/` 或 Dashboard Team Commands 里的 Markdown。聊天输入 `/` 列出。

**为什么需要**：一天要跑很多次、步骤固定的提示（开 PR、修某个 issue 模板）。不必封装成带 scripts 的 Skill。

**官方状态**：文档仍称 beta，语法可能变。不要宣布它已删除。

**官方文档**：[Commands](https://cursor.com/docs/context/commands)

---

## MCP

**是什么**：Model Context Protocol。Cursor 通过它调用外部工具和数据源。传输：`stdio`（本地进程）、`SSE`、`Streamable HTTP`。

**为什么需要**：没有 MCP，你只能把 Figma JSON、Sentry 堆栈粘进 Chat。有 MCP，Agent 按需拉真实系统。

**和 Hooks 的区别**：MCP 是「Agent 可以调用的工具」。Hooks 是「调用前后你的脚本」。两者常一起用：Hook 审计或拦截某个 MCP 工具。

**安全**：MCP 能代表你执行代码、打外部 API。官方：只装可信源、最小权限 key、关键集成读源码。

**官方文档**：[MCP](https://cursor.com/docs/mcp)

---

## Hooks

**是什么**：在 Agent / Tab / 工作区生命周期上拉起的进程，stdin/stdout 走 JSON。可观察、拦截、改行为。

**为什么需要**：模型不会稳定地「每次都跑 prettier」或「永远别对生产库跑 SQL」。Hook 把策略放在循环外。

**三类**：Agent 钩子、Tab 钩子、`workspaceOpen`。Cloud Agent 只跑仓库里的 command-based 钩子，原因见官方 Hooks 页（只读探索阶段不加载 hooks、没有 IDE 会话边界等）。

**官方文档**：[Hooks](https://cursor.com/docs/hooks)

---

## Subagents

**是什么**：父 Agent 可委派的专用助手。自己的上下文窗口，干完把结果交回。可前台阻塞或后台并行。

**为什么需要**：官方根据「上下文被探索日志撑爆」的会话设计了三个内置子代理：

| 子代理 | 干什么 | 为什么要独立 |
|--------|--------|----------------|
| Explore | 搜和分析仓库 | 中间输出大；默认更快模型，可并行多次搜 |
| Bash | 一串 shell | 日志吵 |
| Browser | 浏览器 MCP | DOM / 截图噪声大 |

**和 Skills 怎么选**（官方表）：要隔离上下文、并行、多步专长 → Subagent。单次可重复动作 → Skill。

**代价**：每个子代理独立耗 token。简单活交给主 Agent 往往更快。

**官方文档**：[Subagents](https://cursor.com/docs/subagents)

---

## Modes

**是什么**：同一 Agent 的不同约束，不是四个产品。

| 模式 | 约束 |
|------|------|
| Agent | 可以改文件、跑命令 |
| Ask | 只读理解（changelog：自带搜索，旧 `@Codebase` 工具已去掉） |
| Plan | 先研究、提问、出可编辑计划，批准后再写 |
| Debug | 假设 → 埋点 → 你复现 → 用运行时数据修 |

**为什么需要**：默认 Agent 会尽快写代码。Plan 把「改什么」从「怎么改」里拆出来。Debug 避免在没证据时乱改。Ask 避免解释仓库时误伤文件。

**官方文档**：[Overview](https://cursor.com/docs/agent/overview)、[Plan](https://cursor.com/docs/agent/plan-mode)、[Debug](https://cursor.com/docs/agent/debug-mode)

---

## Tab

**是什么**：补全专用模型。接受 `Tab`、拒绝 `Esc` 会成为后续建议的信号。

**为什么需要**：多文件 Agent 对「改光标旁三行」又慢又贵。Tab 用最近编辑、lint、已接受建议做多行和跨文件预测。

**不是 Chat**。没有工具循环，也不读你的整份 Rules 当一次「任务」。

**官方文档**：[Tab](https://cursor.com/docs/tab/overview)

---

## Bugbot

**是什么**：对 PR（或 `/review-bugbot` 看到的本地 diff）做审查的云服务。找 bug、安全问题、质量问题，留言并给修复建议。

**为什么需要**：人审 AI 生成的大 diff 会疲劳。Bugbot 每推一次跑一遍，并可按 `.cursor/BUGBOT.md` / Team rules 对齐仓库口味。

**不是 Debug Mode**：Debug 在你的工作区里打日志、看运行时。Bugbot 看 diff，不启动你的 app。旧总览矩阵把 Bugbot 写成「带运行时上下文的自动调试器」，那是错的。

**官方文档**：[Bugbot](https://cursor.com/docs/bugbot)

---

## Checkpoints

**是什么**：Agent 会话里、大改之前自动拍的工作区快照。时间线上可预览并 Restore。

**为什么需要**：探索性和大重构需要可逆。Checkpoints 是文件级回滚，不是 git commit，也不是 Plan 文件。

**官方文档**：[Agent Overview · Checkpoints](https://cursor.com/docs/agent/overview)

---

## Codebase Indexing

**是什么**：把仓库切成函数/类级块，做成向量，用来做语义搜索。问「导航栏在哪」可以打到 `header.tsx`，即使文件名没有 navigation。

**为什么需要**：单靠 grep 找不到同义词。官方：索引阶段算好向量，Agent 搜索更快、更省。

**隐私要点**（官方）：路径加密；源码不以明文长期存放；索引过程中在内存处理。索引默认排除 `.gitignore` / `.cursorignore`。语义搜索约在索引 **80%** 完成后可用。闲置约 6 周会删索引。

**官方文档**：[Semantic search](https://cursor.com/docs/context/semantic-search)

---

## Privacy Mode

**是什么**：数据治理开关。开启后，官方承诺 Cursor 和其他模型提供方**不用你的代码训练**。Enterprise 团队默认开。

**为什么需要**：两路数据会离开本机：发给 LLM 的请求，以及（可选）Cloud Agents 为了改仓库而做的临时加密副本。Privacy Mode 管训练/留存承诺；它**不是**「代码永远不上网」。

**和 Cloud Agents**：Cloud Agents 是官方写明「唯一需要 Cursor 存代码」的功能。策略禁止存代码就不要开 Cloud Agents，其余功能仍可用。

**官方文档**：[Privacy and Data Governance](https://cursor.com/docs/enterprise/privacy-and-data-governance)

---

## Cloud Agents

**是什么**：在隔离 VM 上跑的 Agent。克隆仓库、建分支、干活、开 PR。可从编辑器、[cursor.com/agents](https://cursor.com/agents)、手机、Slack `@Cursor` 发起。

**为什么需要**：不适合占着本地窗口的 todo 项：顺手修的 bug、补测试、文档。

**和本地 Subagents**：本地子代理用你的机器和本机 MCP。Cloud 子代理（`/in-cloud`、`/babysit`）用团队在 cursor.com 配的 MCP 和环境。

**官方文档**：[Cloud Agent](https://cursor.com/docs/cloud-agent)、[agent-best-practices](https://cursor.com/blog/agent-best-practices)
