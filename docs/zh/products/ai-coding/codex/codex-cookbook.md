# Codex Cookbook

> 这是一份**任务导向**的文档——按「我要做什么」组织，每一节给出可直接照抄的提示词和命令。
>
> **补充阅读**：概念定义见 [Codex 术语表](./codex-glossary)，命令与配置速查见 [Codex 速查表](./codex-cheatsheet)，从零安装见 [Codex CLI 教程](./codex-cli)。本页假设你已经装好并登录了 Codex CLI。

## 核心理念

- **先给上下文，再提要求**。Codex 的输出质量和你提供的上下文量正相关。与其让它猜，不如把文件路径、错误信息、约束条件一次说清。
- **让它自己验证**。人工检查 Agent 的每一行输出不可持续。把「跑测试」「对比 diff」写进任务本身，让 Codex 自证。
- **一个会话只做一件事**。上下文是稀缺资源。任务切换时 `/clear` 或开新会话，比让 Codex 在混杂上下文里挣扎更快。

---

## 第一部分：日常开发工作流

### 1. 理解一个陌生代码库

新接手项目时，不要从 `README` 开始逐个文件读。让 Codex 先给你一张地图。

```
这个项目的整体架构是什么？请从入口文件开始，说明主要模块的职责划分和它们之间的数据流向。
```

```
用户提交一个订单，从点击按钮到数据落库，代码路径依次经过哪些文件和函数？
```

```
这个仓库里有哪些地方在处理认证？分别用了什么机制，是否存在重复实现？
```

**提示**

- 用「数据流」而不是「文件列表」提问——前者能得到有因果关系的解释，后者只是目录树。
- 想限定范围时用 `codex --cd <path>` 把工作目录锁定在子目录，避免它读整个 monorepo。
- 需要临时加入工作区之外的目录，用可重复的 `--add-dir <path>`。
- 只做分析不改代码时，把沙箱切到 `read-only`：`codex --sandbox read-only`，从机制上排除误改。

### 2. 高效修复 Bug

```
测试 `test_order_total_with_discount` 失败了，报错是：

AssertionError: expected 90.0, got 100.0

请先定位根因再改，不要直接改断言值。改完跑一遍这个测试确认通过。
```

**关键原则**

- **贴完整错误信息**，包括堆栈。转述会丢掉最有价值的行号。
- **明确禁止投机取巧**。「不要直接改断言值」「不要加 try/except 吞掉异常」这类约束必须写出来，否则 Agent 会选最省事的路径。
- **要求它先解释再动手**。加一句「先说明你判断的根因，我确认后再改」，能在方向错的时候及早止损。

### 3. 重构代码

```
`src/services/payment.py` 里的 `process_payment` 函数有 200 行，职责混杂。

请拆分成职责单一的小函数。约束：
1. 对外的函数签名和行为保持不变
2. 不引入新的第三方依赖
3. 每拆出一个函数就跑一次 `pytest tests/test_payment.py`，保持全绿
```

**提示**

- 重构必须绑定「行为不变」的验证手段，否则你无法区分「重构」和「重写」。
- 先让 Codex 输出拆分方案，你确认边界后再让它落地。方案阶段改主意的成本远低于代码阶段。
- 大重构前先 `git commit` 一个干净的基线，随时可以 `git diff` 看全貌、可以整体回退。

### 4. 编写测试

```
为 `src/utils/date.py` 里的 `parse_relative_date` 补测试。

要求：
- 覆盖正常输入、边界值、非法输入三类
- 用 pytest 的 parametrize 组织用例，不要写十个重复的测试函数
- 跑一遍确认全部通过，并告诉我覆盖率有没有提升
```

**关键原则**

不要只说「写测试」。说清**覆盖什么维度**（正常/边界/异常）和**用什么组织形式**，否则你大概率会拿到十个只改了一个字面量的重复函数。

### 5. 创建 Pull Request

```
把当前分支的改动整理成一个 PR：
1. 先 `git diff origin/master...HEAD` 看全部改动
2. 生成 PR 标题（conventional commits 格式）和正文（改了什么、为什么、怎么验证）
3. 用 `gh pr create` 提交
```

**提示**

- 让它**先读 diff 再写描述**。跳过这步生成的 PR 描述往往和实际改动不符。
- 仓库里有 PR 模板（`.github/pull_request_template.md`）时，明确要求按模板填。

### 6. 处理文档

```
`docs/api/auth.md` 里描述的接口和 `src/routes/auth.py` 的实现已经不一致了。

请逐个接口核对，列出所有不一致的地方，然后更新文档。以代码为准。
```

**提示**

明确「以代码为准」还是「以文档为准」。不说清楚的话，Codex 可能会去改代码来迎合过期的文档。

### 7. 在非代码目录里工作

Codex 不止能处理代码。

```
这个目录下有 30 个会议记录 markdown 文件。请提取所有标记为「待办」的条目，
按负责人分组汇总成一个 todo.md。
```

```
把 data/ 下的 CSV 按月份合并，输出一个汇总表，并指出哪些月份的数据有缺失。
```

### 8. 用图像做输入

Codex CLI 支持传入图片，适合从设计稿或截图出发。

```bash
codex -i mockup.png "按这张设计稿实现一个 React 组件，用项目现有的 Tailwind 配置"
codex --image error-1.png,error-2.png "这两张截图是同一个 bug 的不同阶段，帮我分析原因"
```

支持 PNG 和 JPEG。

---

## 第二部分：高效沟通模式

### 提示词写法对比

| 策略 | 模糊写法 | 具体写法 |
| --- | --- | --- |
| 指明位置 | 「修一下登录的 bug」 | 「`src/auth/login.ts` 第 42 行，`validateToken` 在 token 过期时返回 `undefined` 而不是抛异常」 |
| 给出预期 | 「优化这个函数」 | 「这个函数目前 O(n²)，请降到 O(n log n)，行为不变，跑 `test_sort.py` 验证」 |
| 限定范围 | 「加个缓存」 | 「只给 `getUserProfile` 加缓存，用项目已有的 `lib/cache.ts`，TTL 5 分钟，不要引新依赖」 |
| 声明约束 | 「重构一下」 | 「重构，但不改公开 API、不加依赖、每步跑测试」 |
| 要求验证 | 「写个功能」 | 「写完跑 `pnpm test` 和 `pnpm lint`，都过了再告诉我」 |

### 提供上下文的几种方式

| 方式 | 怎么用 | 适用场景 |
| --- | --- | --- |
| `@` 文件引用 | TUI 里输入 `@` 触发工作区内模糊文件搜索 | 指向具体文件 |
| `--cd` | `codex --cd services/api` | 把注意力限定在子项目 |
| `--add-dir` | `codex --add-dir ../shared-lib` | 需要跨仓库参考 |
| `!` 前缀 | TUI 里 `!git log --oneline -10` | 在当前审批/沙箱下直接跑命令看结果 |
| AGENTS.md | 写进仓库 | 每次都要交代的项目约定 |
| 图片 | `codex -i shot.png "..."` | 设计稿、报错截图 |

### 让 Codex 反过来采访你

需求本身模糊时，别急着让它写代码：

```
我想给这个项目加一个通知系统，但需求还没想清楚。

请先向我提问，把你需要知道的信息问齐（技术选型、触达渠道、失败重试策略、
数据留存等），我回答完你再给方案。一次最多问三个问题。
```

「一次最多问三个问题」很重要——否则你会收到一份 20 条的问卷。

---

## 第三部分：让 Codex 自我验证

### 验证策略对比

| 做法 | 不带验证 | 带验证 |
| --- | --- | --- |
| 改代码 | 「改完了」→ 你手动跑测试 | 「改完跑 `pnpm test`，失败就继续修直到通过」 |
| 加功能 | 「实现好了」 | 「实现后写一个最小复现脚本证明它能工作，把输出贴给我」 |
| 修 bug | 「应该修好了」 | 「先写一个能复现这个 bug 的测试（确认它失败），再修，再确认它通过」 |
| 性能优化 | 「优化了」 | 「优化前后各跑一次 benchmark，把两个数字都给我」 |

最后一行是最有价值的模式：**先写失败的测试，再修**。这样你拿到的不只是修复，还有防止回归的保障。

### 按风险选择验证深度

| 深度 | 做法 | 适用 |
| --- | --- | --- |
| 轻量 | 跑 lint + 类型检查 | 改文档、改注释 |
| 中等 | 跑相关单测 | 局部逻辑改动 |
| 强约束 | 跑全量测试 + 手动确认 diff | 改公共模块、改数据层 |
| 独立审查 | 用 `/review` 或另起会话审查 | 大重构、上线前 |

### 对抗性审查

让 Codex 反过来挑自己的刺：

```
你刚才的实现，请以代码审查者的身份找问题。重点看：
1. 边界条件（空值、超长输入、并发）
2. 错误处理是否吞掉了异常
3. 有没有引入不必要的依赖或复杂度

如果确实没问题，明确说「无问题」，不要为了凑数编造无关紧要的建议。
```

最后一句必须写。不写的话，Agent 倾向于「找点什么说」来显得尽责。

### 用 `/review` 做结构化审查

TUI 里 `/review` 提供几种预设范围：

- 与基线分支 merge-base 的 diff
- 未提交的改动
- 指定的某个 commit
- 自定义审查指令

上线前审查用「与基线分支的 diff」，最接近 Reviewer 在 PR 里看到的内容。

### 验证模式速查

| 模式 | 流程 | 适用 |
| --- | --- | --- |
| Writer → Reviewer | 会话 A 实现，会话 B（或子代理）审查 | 需要独立视角，避免被自己的思路带偏 |
| Test → Iterate → Pass | 先写失败测试 → 改 → 直到通过 | 修 bug、补功能 |
| Plan → Implement → Verify | 出方案 → 你确认 → 实现 → 验证 | 大改动 |

---

## 第四部分：会话管理

### 生命周期命令

```bash
codex                          # 新会话
codex resume                   # 从选择器里挑一个会话恢复
codex resume --last            # 恢复最近一次
codex resume <SESSION_ID>      # 恢复指定会话
codex resume --all             # 列出全部
```

会话内：

```
/clear        清空上下文，开始新任务
/compact      压缩上下文（保留摘要）
/fork         从当前状态分叉出新会话
/status       查看当前会话状态（含会话 ID）
/usage        查看用量
/archive      归档当前会话
/quit         退出
```

会话 ID 也可以直接从 `~/.codex/sessions/` 目录里找。归档过的会话用 `codex unarchive <SESSION>` 取回。

### 方向控制

跑偏时不要等它跑完：

- `Esc` `Esc`（在空输入框上）编辑上一条消息，按 `Enter` 从那里分叉重来
- `Tab` 把补充说明排队，让它做完当前动作后接着处理
- `Ctrl+C` 直接中断
- `Ctrl+R` 搜索历史提示词，复用之前写好的指令

### 上下文管理策略

| 情况 | 做法 |
| --- | --- |
| 切换到无关任务 | `/clear` 或开新会话 |
| 同一任务但上下文快满 | `/compact` |
| 想保留当前状态再试另一条路 | `/fork` |
| 探索性对话产出了有价值的结论 | 结论写进 AGENTS.md 或笔记，再 `/clear` |

压缩是有损的。与其等它自动压缩后丢细节，不如在任务边界主动清空。

---

## 第五部分：自动化与扩展

### 非交互模式

CI 和脚本里用 `codex exec`：

```bash
codex exec "run the test suite and fix any failing tests"
codex exec --json "summarize the changes in this branch"
codex exec resume --last "now add tests for the function you just wrote"
```

`--json` 输出结构化事件，便于脚本解析。`codex exec` 的日志默认级别是 `RUST_LOG=error`。

需要给下游脚本一份有类型的最终输出时，官方非交互文档支持 `--output-schema`。把 schema 和调用方放在一起：

```ts
// schema.ts — 传给 --output-schema 的 JSON Schema 的源
export interface ProjectMetadata {
  project_name: string
  programming_languages: string[]
}

export const projectMetadataSchema = {
  type: 'object',
  properties: {
    project_name: { type: 'string' },
    programming_languages: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['project_name', 'programming_languages'],
  additionalProperties: false,
} as const
```

```bash
codex exec "Extract project metadata" \
  --output-schema ./schema.json \
  -o ./project-metadata.json
```

`schema.json` 由上面的对象写出，不要额外编字段。见 [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)。

在 CI 里通常还要显式指定审批策略，避免它停下来等人：

```bash
codex --ask-for-approval never exec "update the changelog for this release"
```

### 用独立的 Codex home 做隔离

CI 或多身份场景下，用 `CODEX_HOME` 完全隔离配置、会话和日志：

```bash
CODEX_HOME=$(pwd)/.codex codex exec "List active instruction sources"
```

比 `--profile` 隔离得更彻底——`--profile` 只换配置，`CODEX_HOME` 换整个目录。

### 并行会话

互不依赖的任务可以开多个终端并行跑。要点：

- 每个会话用 `--cd` 锁定不同的子目录，避免同时改同一个文件
- 需要真正的文件隔离时用 git worktree，每个 worktree 一个会话
- 需要在同一会话内派生子代理时用 `/agent`——注意子代理**只在你明确要求时才会派生**

### Writer / Reviewer 双会话

| 角色 | 沙箱 | 任务 |
| --- | --- | --- |
| Writer | `workspace-write` | 实现功能，跑测试 |
| Reviewer | `read-only` | 只读审查，找问题不改代码 |

Reviewer 用 `read-only` 是关键：从机制上保证它不会「顺手帮你改了」，你拿到的是纯粹的意见。

### 远程使用

```bash
codex app-server --listen ws://127.0.0.1:4500    # 在有代码的机器上起服务
codex --remote ws://127.0.0.1:4500               # 从另一处连接
```

`--remote` 接受 `ws://`、`wss://`、`unix://`。跨网络必须用 `wss://` 并配置鉴权（capability token 或 signed bearer token）；纯 `ws://` 只用于本机。

### 云端执行

```bash
codex cloud                                          # 打开云端界面，Ctrl+O 查看环境 ID
codex cloud exec --env <ENV_ID> "..."                # 在云环境执行
codex cloud exec --env <ENV_ID> --attempts 3 "..."   # 同一任务尝试多次（1-4）
```

`--attempts` 适合结果有不确定性的任务——让它跑几次，你挑最好的那次。

---

## 第六部分：常见失败模式与规避

### 厨房水槽式会话

**症状**：一个会话里先修 bug，然后重构，然后写文档，然后又想加功能。Codex 开始把不相关的上下文混起来推理，输出质量断崖式下跌。

**规避**：任务切换就 `/clear`。会话不是稀缺资源，上下文才是。

### 反复改正

**症状**：「不对，再改」「还是不对」——来回五轮还没对。

**规避**：第二轮还没对就停下，用 `Esc` `Esc` 回到最初的提示词，把缺失的约束一次补齐重来。在错误的地基上打补丁只会越来越糟。

### AGENTS.md 过度膨胀

**症状**：AGENTS.md 写到 500 行，什么都往里塞，结果 Codex 反而忽略了关键的几条。

**规避**：只写「每次都适用」的约定。一次性的要求写在提示词里。注意合并后的体积上限是 `project_doc_max_bytes`（默认 32 KiB），超了会被截断——被截掉的正是离你最近、最具体的那部分。

### 信任-验证鸿沟

**症状**：Codex 说「已修复并测试通过」，你直接合并，线上炸了。

**规避**：要求它**贴出实际的命令输出**，而不是自己声称通过。「跑 `pnpm test` 并把完整输出贴给我」和「跑测试确认通过」是两回事。

### 无限探索

**症状**：让它「看看这个项目有什么可以优化的」，然后它读了 200 个文件还在读。

**规避**：给探索**明确的终止条件**。「找出三个最值得优化的点就停，按影响大小排序」比开放式提问有效得多。

### 忘了项目配置需要信任

**症状**：明明写了 `.codex/config.toml`，但配置完全没生效。

**规避**：项目级 `.codex/` 层（配置、hooks、rules）**只在项目被信任时加载**。用 `/debug-config` 查看实际生效的配置层级和顺序。另外记住用户级 `~/.codex/config.toml` 优先级**更高**，项目级不能覆盖它的模型与服务端相关键。

---

## 第七部分：AGENTS.md 最佳实践

### 应该包含

- **构建与测试命令**：「用 pnpm，不要用 npm」「测试跑 `pnpm test:unit`」
- **代码风格约定**：不写死规则（那交给 linter），写 linter 管不了的，比如「新增 API 一律放 `src/api/`」
- **项目特有的坑**：「`legacy/` 目录不要动，正在下线」「改 schema 必须同步更新 `types/db.ts`」
- **验证要求**：「改完必须跑类型检查」
- **代码评审规则**：用 `## Code Review Rules` 小节，写清要标记什么行为、有没有安全替代路径

### 应该排除

- linter / formatter 已经能强制的规则——重复写只是浪费预算
- 一次性的任务要求——那属于提示词
- 长篇的架构介绍——Codex 能自己读代码
- 已经过期的说明——过期的 AGENTS.md 比没有更糟，它会主动误导

### 文件位置与继承

| 位置 | 作用范围 |
| --- | --- |
| `~/.codex/AGENTS.md` | 全局，所有项目 |
| `~/.codex/AGENTS.override.md` | 全局临时覆盖（存在时忽略同目录 `AGENTS.md`） |
| `<项目根>/AGENTS.md` | 整个项目 |
| `<子目录>/AGENTS.md` | 该子目录及其下 |

合并规则：从项目根往下拼接到当前目录，**离当前目录越近的越靠后，因此覆盖前面的指导**。每个目录最多取一个文件。

想确认到底加载了哪些指令文件：

```bash
codex --ask-for-approval never "Summarize the current instructions."
```

或者开日志再看：

```bash
codex -c log_dir=./.codex-log
# 然后查看 ./.codex-log/codex-tui.log
```

### 代码评审规则示例

```markdown
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

写法要点：规则简短，说清要标记什么行为，给出安全替代路径或例外；格式和 lint 类检查交给 CI，不要写进这里。把规则放在**最靠近被约束代码**的 AGENTS.md 里——仓库级检查放根目录，服务专属规则放对应子目录。

---

## 第八部分：扩展 Codex 的选型指南

| 扩展点 | 什么时候用 | 生效时机 |
| --- | --- | --- |
| AGENTS.md | 传达项目约定和背景 | 每次运行时加载为上下文 |
| Rules | 需要结构化、可审计的约束 | 项目被信任时加载 |
| MCP | 需要接入外部系统（数据库、内部 API） | Codex 主动调用工具时 |
| Skills | 需要固化一套可复用流程 | 匹配到场景时调用 |
| Hooks | 需要**强制**执行某个动作 | 生命周期事件触发时 |
| Subagents | 需要上下文隔离或并行 | 你明确要求时 |
| Plugins | 需要把上面几种打包分发给团队 | 安装后按各自机制生效 |

**决策规则**

1. 能用 AGENTS.md 说清的，就不要上 Hooks——自然语言的维护成本最低。
2. 「建议」用 AGENTS.md，「必须」用 Hooks。Agent 可能不照做建议，但脚本一定会跑。
3. 要接外部系统用 MCP，要固化做法用 Skills。这是最容易混的一对，判断标准是「谁执行」。
4. 团队里超过两个人需要同一套配置，就打成 Plugin。

概念的完整定义见 [Codex 术语表](./codex-glossary)。

---

## 第九部分：批量与跨文件处理

### 批量修改

```
把 src/ 下所有组件里的 `import { Button } from '../ui/button'` 
改成 `import { Button } from '@/ui/button'`。

改完跑 `pnpm build` 确认没有断掉的引用。
```

批量改动的要点：**必须绑定一个能验证全局一致性的命令**（构建、类型检查），否则漏改的地方要等到运行时才暴露。

### 跨文件一致性检查

```
这个项目里有多处在做日期格式化。请找出所有实现，对比它们的行为差异，
指出哪些是不一致的（比如时区处理不同），并给出统一方案。
先只给分析和方案，不要改代码。
```

「先只给分析，不要改代码」这句在探索性任务里非常重要——你要先看清全貌再决定改不改。

---

## 相关页面

- [Codex 术语表](./codex-glossary) — 概念定义与设计原理
- [Codex 速查表](./codex-cheatsheet) — 命令、配置、错误速查
- [Codex CLI 教程](./codex-cli) — 安装与核心功能
- [项目集成](./integration) — 接入真实项目的完整流程
- [学习地图](./) — 完整学习路径
