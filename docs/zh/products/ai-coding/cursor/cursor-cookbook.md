# Cursor 实战 Cookbook

按任务跳读。不会从零教安装——先走完 [教程 · 五分钟第一例](./cursor#五分钟第一例)。概念定义看 [术语表](./cursor-glossary)，参数看 [速查表](./cursor-cheatsheet)。

核心理念来自官方 [Best practices for coding with agents](https://cursor.com/blog/agent-best-practices)：

- **先写清要什么**，让 Agent 决定怎么做
- **上下文窗口是稀缺资源**
- **给它能自己验收的命令**（测试 / lint / 类型检查 / 构建）

---

## 理解陌生仓库

**适用**：刚 clone、要改一个你没写过的模块。

```text
这个仓库怎么工作？技术栈、启动方式、核心目录。
我接下来要改「用户登录」。指出我该先读的文件，并画出从前端到后端的调用链。
不要修改文件。
```

跟进：

```text
登录失败时错误是怎么冒泡到 UI 的？
只引用现有代码，不要给重写建议。
```

**做法**：

- 用项目自己的词（「CheckoutSession」而不是「那个付款的东西」）
- 不必 `@` 整个 `src/`。官方：知道文件再标，否则让 Agent 搜
- 需要对照未提交改动时再 `@Commit` 或 `@Branch`

---

## 高效修 Bug

**适用**：有报错、有复现、或「以前能跑」。

### 普通回归

把**完整**报错和复现命令贴进去：

```text
我跑 `pnpm test src/auth/session.test.ts` 得到下面错误。
先复现，再找根因，再修。不要只改测试来让它绿。

<粘贴终端输出>
```

原则（官方 blog）：

- 告诉它怎么复现
- 说明是偶发还是必现
- 明确「修根因，不要吞错误」

### 能复现但找不到根因 → Debug Mode

官方 Debug Mode（[文档](https://cursor.com/docs/agent/debug-mode)、[blog](https://cursor.com/blog/agent-best-practices)）：

1. 生成多个假设
2. 给代码打日志
3. 让你按步骤复现，收集运行时数据
4. 根据实际行为定位
5. 做小范围修复

适合：竞态、时序、泄漏、曾经能跑的回归。**复现步骤写得越具体，日志才打在点上。**

不要拿 Debug Mode 去「随便改改看绿不绿」——那是浪费配额。

---

## 做跨文件功能

**适用**：3 个以上文件，或需求还没写死。

1. `Shift+Tab` 进 Plan Mode。
2. 用结果说话：

```text
为设置页增加「导出当前主题为 JSON」按钮。
约束：
- 只动 settings 相关文件
- 复用现有 Button 和下载工具，不要新造组件库
- 导出后要能再导入；先写失败用例
先出计划。在我批准前不要改代码。
```

3. 直接编辑计划 Markdown：删多余步骤、补它漏的文件。
4. 批准后实现。走偏了：**回滚 + 改计划再跑**，不要在错误实现上叠 prompt。官方原文：这通常比修到一半的 Agent 更快、更干净。
5. 计划点 **Save to workspace**，方便隔天或另一个 Agent 接着干。

小改（1–2 文件、你做过很多次）可以直接 Agent，不必每次 Plan。

---

## 写好 Rules

**适用**：你已经把同一句话纠正了两遍。

官方建议：**先简单，错了再加规则。** 不要在第一天堆 20 条 Always 规则。

### 配方：包管理器 + 验收命令

`AGENTS.md` 或一条 Always 规则只放「每次都要用的」：

```markdown
# Commands

- 安装：`pnpm install`（禁止 npm / yarn）
- 类型检查：`pnpm typecheck`
- 测试：`pnpm test`（优先跑单文件）

# Workflow

- 连续改完一轮后跑 typecheck
- API 路由放在 `app/api/`，跟现有文件走
```

### 配方：按目录拆

```text
.cursor/rules/
  project-commands.mdc    # Always：命令与包管理器
  ts-modules.mdc          # globs: **/*.{ts,tsx}
  tests.mdc               # globs: **/*.{test,spec}.ts
```

`ts-modules.mdc` 指向规范文件，不复制：

```markdown
---
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

组件结构以 `src/components/Button.tsx` 为准。
不要在规则里粘贴该文件内容。
```

### 反模式

- Always 规则超过几百行（官方上限 500，实际应远小于此）
- 把 ESLint 规则全文贴进 `.mdc`
- 为「一年用一次」的发布流程写 Always 规则——改成 Command 或 Skill

团队：Rules 进 git。GitHub 上可 `@cursor` 让 Agent 改规则。Team / Enterprise 可在 Dashboard 做 Team Rules，优先级高于项目规则。

---

## TDD 循环

官方 blog 的五步，Agent 最稳的用法之一：

1. **先写测试**，并写明「现在在做 TDD，不要给不存在的功能写 mock 实现」
2. **跑测试，确认失败**，此阶段不要写实现
3. 测试满意后 **commit 测试**
4. **只写实现、禁止改测试**，循环到绿
5. **commit 实现**

```text
为 `src/lib/money.ts` 的 `addCents(a: number, b: number): number` 写测试。
我们在做 TDD：现在不要写实现，也不要用 mock 假装它存在。
测试文件放到现有 `__tests__/` 风格里。
跑测试并确认失败。
```

---

## Git / PR 命令

Commands 是 `.cursor/commands/*.md`。输入 `/` 触发。官方仍单独成页：[Commands](https://cursor.com/docs/context/commands)。可复用、要隔离上下文的长流程优先 Skills。

`.cursor/commands/pr.md` 示例（改编自官方 blog 的 `/pr`）：

```markdown
为当前改动创建 pull request。

1. 用 `git diff` 看暂存和未暂存改动
2. 按改动写清楚的 commit message
3. commit 并 push 到当前分支
4. 用 `gh pr create` 开 PR
5. 只返回 PR URL
```

同目录还可以放：

- `/fix-issue 123`：`gh issue view` → 定位 → 修 → 开 PR
- `/review`：跑 linter、列常见问题（与内置 `/review` / `/review-bugbot` 不要重名）

文件名会变成 `/` 后面的命令名。

---

## 用 Bugbot 审 PR

**适用**：PR 已推，或推之前想在 Agent 里先审。

Bugbot **审查 PR diff**，找 bug / 安全 / 质量问题。它**不是** Debug Mode。官方：[Bugbot](https://cursor.com/docs/bugbot)。

### 云端 PR

1. Dashboard 接上 GitHub / GitLab / Bitbucket / Azure DevOps
2. Automations 里按仓库打开 Bugbot
3. 每个 PR 更新会自动跑；也可评论 `cursor review` 或 `bugbot run`
4. 排障评论 `cursor review verbose=true`，看本轮加载了哪些规则

根目录放 `.cursor/BUGBOT.md`，写审查时必须知道的项目事实（不要贴密钥）：

```markdown
# Bugbot

- 支付金额只用整数分，禁止浮点美元。
- 不要建议把 `.env` 提交进仓库。
- UI 文案错误除非导致逻辑错误，否则不要当 bug。
```

### 推之前本地审

Agent 里运行 `/review-bugbot`。默认对比默认基线分支上**已提交 + 未提交**的全部改动。基线不是 `main` 时，在提示里写明。

同一份 diff 推上去之后，远端 Bugbot 看到相同 patch ID 会跳过，并留言说明已经审过。

### Autofix

可拉起 Cloud Agent 修 finding。团队默认建议 **Create New Branch**。直接提交到 PR 分支每 PR 最多 3 次，防止循环。需要 on-demand usage，且不能停在 Legacy Privacy Mode（官方：Storage 必须开启）。

### CI 陷阱

GitHub check 名叫 `Cursor Bugbot`。有 finding 时默认结论是 **`neutral`**。分支保护只「要求这个 check」**不会**因为有 finding 而挡住合并。要挡住，需组织打开 fail-on-unresolved-issues。

---

## 接 MCP

**适用**：Agent 需要 Figma / GitHub / 浏览器 / 内部 API，而不是你把 JSON 粘进 Chat。

官方：[MCP](https://cursor.com/docs/mcp)。优先 Marketplace 一键安装。手写配置放在工作区 `.cursor/mcp.json`（官方插值把 `${workspaceFolder}` 定义成「包含 `.cursor/mcp.json` 的目录」）。

```json
{
  "mcpServers": {
    "filesystem-notes": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}/notes"],
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

字段名来自官方 MCP 页（`type` / `command` / `args` / `env` / `envFile`）。具体包装哪个社区服务器，以 Marketplace 或该服务器自己的 README 为准，不要抄过期包名。

安全（官方原文要点）：

- 只装可信来源
- 看它要访问的数据和 API
- API key 用最小权限，走 `${env:NAME}`，不要写进 json
- 关键集成先读源码

MCP 工具默认要批准。Auto-review 模式下白名单工具可直接跑。

---

## 编辑后自动格式化（Hooks）

**适用**：你懒得每次说「跑 prettier」。

官方 Quickstart 形态：项目 `.cursor/hooks.json` + 可执行脚本。Cloud Agent 会跑仓库里的 **command-based** hooks，不会跑你家里的 `~/.cursor/hooks.json`。

官方 blog 给的可运行骨架是 **stop 钩子 + stdin JSON**（不要猜 argv）：

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      { "command": "bun run .cursor/hooks/grind.ts" }
    ]
  }
}
```

```typescript
// .cursor/hooks/grind.ts — 字段来自 https://cursor.com/blog/agent-best-practices
import { readFileSync, existsSync } from "fs";

interface StopHookInput {
  conversation_id: string;
  status: "completed" | "aborted" | "error";
  loop_count: number;
}

const input: StopHookInput = await Bun.stdin.json();
const MAX_ITERATIONS = 5;

if (input.status !== "completed" || input.loop_count >= MAX_ITERATIONS) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

const scratchpad = existsSync(".cursor/scratchpad.md")
  ? readFileSync(".cursor/scratchpad.md", "utf-8")
  : "";

if (scratchpad.includes("DONE")) {
  console.log(JSON.stringify({}));
} else {
  console.log(
    JSON.stringify({
      followup_message: `[Iteration ${input.loop_count + 1}/${MAX_ITERATIONS}] Continue working. Update .cursor/scratchpad.md with DONE when complete.`,
    }),
  );
}
```

`afterFileEdit` 的 stdin JSON 字段以当前 [Hooks](https://cursor.com/docs/hooks) 页为准，不要假设路径在 `argv[1]`。

官方还支持 `type: "prompt"` 的 LLM 评估钩子。Cloud Agent **不跑** prompt-based hooks。

完整事件名见 [速查表 · Hooks](./cursor-cheatsheet#hooks)。

---

## 并行 Agent 与 Cloud

**适用**：难题要对比两种实现，或任务该进 todo 而不是占着本地窗口。

### 本地 worktree

官方 blog：从 Agent 下拉框选 worktree，每个 Agent 独立工作树。结束后 **Apply** 合并回当前分支。

同一 prompt 也可丢给多个模型并排跑，再挑一条。贵，留给真正难的题。

### Cloud Agents

适合：别人甩过来的小修、给旧代码补测试、文档、你正在干别的时冒出来的活。从 [cursor.com/agents](https://cursor.com/agents)、编辑器或手机发起。Slack 里 `@Cursor` 可拉起（需管理员先接好集成）。

Cloud Agent 用的是团队在 cursor.com/agents 配的 MCP，不是你本机 `mcp.json`。

---

## 常见陷阱

| 场景 | 别这样做 | 这样做 |
|------|----------|--------|
| 功能跑偏 | 再追 15 轮「再改改」 | Restore + 改计划再跑 |
| 规则不生效 | 把说明写成 `.cursor/rules/notes.md` | 改成 `.mdc` 并写 frontmatter，或用 `AGENTS.md` |
| 修偶发 bug | 只贴「有时候挂」 | Debug Mode + 逐步复现 |
| 大 PR | 指望默认 Bugbot check 挡住合并 | 开 fail-on-unresolved，或自己看评论 |
| 密钥 | 把 token 写进 Always 规则 | `.cursorignore` + `${env:NAME}` |
| 并行 | 两个 Agent 改同一工作树 | worktree 或 Cloud 子代理 |

---

## 下一步

- 回 [教程](./cursor) 查基础操作
- 打开 [速查表](./cursor-cheatsheet) 抄配置
- 模式和扩展点为什么分开，见 [术语表](./cursor-glossary)
