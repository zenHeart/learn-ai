# Gemini 全家族 Cookbook

> 场景化配方集：每条从"我遇到的具体情况"出发，给出该用哪个产品、怎么做、有什么坑。
>
> 概念不清楚看 [术语表](./gemini-glossary)；要查命令和配置键看 [速查表](./gemini-cheatsheet)。本页不重复速查表里的表格。

## 目录

- [日常开发](#日常开发)
  - [1. 构建/类型报错，想直接让 AI 读日志](#_1-构建-类型报错-想直接让-ai-读日志)
  - [2. 把 AI 判断接进脚本或 CI](#_2-把-ai-判断接进脚本或-ci)
  - [3. 智能体改坏了一批文件，想回到动手前](#_3-智能体改坏了一批文件-想回到动手前)
  - [4. 昨天的上下文想接着用](#_4-昨天的上下文想接着用)
- [约束智能体](#约束智能体)
  - [5. 每次都要重复项目规范](#_5-每次都要重复项目规范)
  - [6. 有一套固定流程想复用](#_6-有一套固定流程想复用)
  - [7. 想区分"死规矩"和"项目上下文"](#_7-想区分-死规矩-和-项目上下文)
- [扩展能力](#扩展能力)
  - [8. 想让智能体查 GitHub / 驱动浏览器](#_8-想让智能体查-github-驱动浏览器)
  - [9. 克隆了陌生仓库，不想让它的配置影响智能体](#_9-克隆了陌生仓库-不想让它的配置影响智能体)
- [大任务](#大任务)
  - [10. 依赖升级这种耗时又机械的活](#_10-依赖升级这种耗时又机械的活)
  - [11. 跨模块重构，需要边看边验证](#_11-跨模块重构-需要边看边验证)
  - [12. 想让 AI 通读整个仓库做审计](#_12-想让-ai-通读整个仓库做审计)
- [其他](#其他)
  - [13. 快速做个能点的原型](#_13-快速做个能点的原型)
  - [14. 拿到 Google Cloud 额度，怕超支](#_14-拿到-google-cloud-额度-怕超支)
  - [15. 团队有数据合规要求](#_15-团队有数据合规要求)

## 日常开发

### 1. 构建/类型报错，想直接让 AI 读日志

**用**：Gemini CLI 无头模式（Standard / Enterprise 或 API key）。个人账号请改用 [Antigravity](./antigravity) 的 CLI 表面，管道写法以官方 Antigravity CLI 文档为准。

不要复制粘贴报错到聊天窗口——直接把 stderr 接过去：

```bash
# Vite / Webpack 构建失败
npm run build 2>&1 | gemini -p "分析构建错误，指出根因和最小修复"

# TypeScript 类型错误一次爆几十条
npx tsc --noEmit 2>&1 | gemini -p "按根因分组这些类型错误，先给最影响面大的"

# 测试失败
npm test 2>&1 | gemini -p "这些失败是同一个原因吗？"
```

**关键点**：一定要写 `2>&1`。大部分构建工具把错误写到 stderr，只用 `|` 管道传过去的是空的。

**别做**：不要把整个 `node_modules` 的日志灌进去。先用 `tail -100` 截断，模型看开头结尾就够判断根因了。

### 2. 把 AI 判断接进脚本或 CI

**用**：`-p` 配 `--output-format json`。

无头模式的价值不在省一次点击，而在于它让 `gemini` 变成一个普通 Unix 命令，可以被脚本消费：

```bash
gemini -p "这个 diff 有没有引入明显的安全问题？" --output-format json
```

拿到 JSON 后用 `jq` 提取字段，再决定退出码。

**关键点**：脚本里跑 AI 意味着输出不确定。让它输出**结构化的判断**（有/无、等级），不要让它输出自由文本再去正则匹配。

**别做**：不要在 CI 里让智能体自动改代码后直接合并。CI 里的 AI 应该只产出信息，改动交给 [Jules](#_10-依赖升级这种耗时又机械的活) 这类会产出 PR 的产品，保留人工评审。

### 3. 智能体改坏了一批文件，想回到动手前

**用**：Gemini CLI 的检查点。**默认关闭，必须先开**：

```json
// ~/.gemini/settings.json 或项目内 .gemini/settings.json
{
  "general": {
    "checkpointing": {
      "enabled": true
    }
  }
}
```

开启后 CLI 在每次改文件前存档，出问题用 `/restore` 回滚。

**关键点**：检查点和 Git 解决的不是同一个问题。`git checkout .` 会把你自己手写的改动一起丢掉；检查点的粒度是"智能体这次动手之前"。两者都要有。

**别做**：不要因为开了检查点就跳过提交。检查点是短期撤销，不是历史。

### 4. 昨天的上下文想接着用

**用**：Gemini CLI 的会话（Session）功能，会话默认永久保留。

时间久了会话会堆积，用配置项自动清理：

```json
{
  "general": {
    "sessionRetention": {
      "enabled": true,
      "maxAge": "30d",
      "maxCount": 50
    }
  }
}
```

`minRetention` 默认 `"1d"`，是防止误删太新会话的兜底。

恢复会话用 `gemini --resume`（最新）、`gemini --resume 2`（索引）或 `gemini --resume <id>`。官方见 [Session management](https://geminicli.com/docs/cli/session-management/)。

**关键点**：恢复会话恢复的是**对话**，不是**文件**。代码状态要靠 Git 或[检查点](#_3-智能体改坏了一批文件-想回到动手前)。

## 约束智能体

### 5. 每次都要重复项目规范

**用**：把不变量写进规则文件，别每次重述。

选哪个文件取决于你用哪个产品——三者不通用：

| 产品 | 写哪里 |
|---|---|
| Gemini CLI | `GEMINI.md` |
| Antigravity | 全局 `~/.gemini/GEMINI.md`，工作区 `.agents/rules` 目录 |
| Jules | 仓库根目录 `AGENTS.md` |

Antigravity 的工作区规则支持四种激活模式（Manual / Always On / Model Decision / Glob）。**优先用 Glob**：让 "React 组件规范" 只在匹配 `src/**/*.tsx` 时加载，而不是 Always On 一直占着上下文。

**关键点**：单个规则文件上限 12,000 字符。到了上限就该拆分 + 用 `@filename` 交叉引用，而不是压缩措辞。

**别做**：不要把整份代码规范文档粘进去。规则里只放**智能体容易做错的**那几条。它本来就会写分号。

### 6. 有一套固定流程想复用

**用**：技能（模型自己决定何时用）或工作流（你显式触发）。

技能是**目录**，不是单文件：

```
.agents/skills/release-flow/
└── SKILL.md          # frontmatter 里 description 必填，name 可选
```

因为是目录，你可以把脚本、模板、示例数据一起放进去让 `SKILL.md` 引用。

工作流用 `/<workflow-name>` 调用。

**怎么选**：想让模型自己判断该不该用 → 技能，`description` 要写成触发条件（"当需要发版时…"）而不是标题（"发版流程"）。想自己掐时间点 → 工作流。

**别做**：不要写 `.agents/skills/release-flow.md` 这种扁平文件，那不会被识别为技能。`.agent/skills`（单数）只为向后兼容保留，新建用 `.agents/skills`。

### 7. 想区分"死规矩"和"项目上下文"

**用**：Gemini CLI 的 `system.md` 与 `GEMINI.md` 分工。

```bash
export GEMINI_SYSTEM_MD=true        # 启用后读取 .gemini/system.md
```

也可以直接给绝对路径指向别处的文件。生效时界面会显示 `|⌐■_■|` 指示器——**看到这个标记说明系统提示词被替换了**，行为异常时先想到这里。

分工：

- `.gemini/system.md`：不可协商的操作规则——安全边界、工具使用协议、批准机制
- `GEMINI.md`：角色、目标、方法论、项目上下文

**关键点**：`system.md` 是**替换**默认系统提示词，不是追加。写得太少会让 CLI 丢掉内置的工具使用协议，反而变笨。

## 扩展能力

### 8. 想让智能体查 GitHub / 驱动浏览器

**用**：MCP，在 Gemini CLI 里通过扩展安装：

```bash
gemini extensions install https://github.com/github/github-mcp-server
```

可用扩展见[官方扩展市场](https://geminicli.com/extensions/)。

**关键点**：仓库地址必须**完整含组织名**。`https://github.com/github-mcp-server` 这种少了组织名的地址装不上——这是历史文档里出现过的错误写法。

**凭据处理**：MCP 服务器常需要 token。放进环境变量或 `.gemini/.env`，并确认 `.gemini/.env` 在 `.gitignore` 里。

**别做**：不要把 token 直接敲在命令行参数里——它会进 shell history，也会出现在进程列表里。

### 9. 克隆了陌生仓库，不想让它的配置影响智能体

**用**：文件夹信任机制。

```json
{
  "security": {
    "folderTrust": {
      "enabled": true
    }
  }
}
```

开启后，未信任目录里的项目级配置与自定义命令不生效。信任列表落在 `~/.gemini/trustedFolders.json`。

**为什么要在意**：`.gemini/settings.json` 和自定义命令是随仓库走的。在陌生仓库里直接启动智能体，等于先执行了别人写的配置。

**关键点**：信任机制管的是"**加载谁的配置**"，不管"**执行能碰到什么**"。后者是沙盒的职责，别把两件事混为一谈。

> ⚠️ 历史文档里出现过 `security.allowedCommands`、`security.deniedCommands`、`security.sandboxMode`、`requireBranch`、`allowedBranchPattern` 这些配置键，在[官方 Schema](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json) 里都不存在。要做命令白名单请查[策略引擎](https://geminicli.com/docs/core/policy-engine/)。

## 大任务

### 10. 依赖升级这种耗时又机械的活

**用**：[Jules](./jules)。它在云端 VM 里克隆仓库执行，先出计划待你批准，最后产出 Pull Request。

```bash
npm install -g @google/jules
jules                                   # 交互式看板，含并排 diff
jules remote new --repo <owner/repo> --session "把 React 升到 19 并修复破坏性变更"
jules remote list --session             # 看进度
jules remote pull --session <id>        # 结果拉到本地
```

**先写 `AGENTS.md`**：Jules 不在你旁边，它需要提前知道怎么装依赖、怎么跑测试、哪些目录不许动。这一步省了，产出质量会明显下降。

**并行的坑**：`jules remote new --parallel <number>` 可以同时开多个任务，但**多个任务改同一批文件会撞车**。拆任务时按目录或模块划清边界，别按"顺手一起做"划。

**别做**：npm 包名是 `@google/jules`。历史文档里的 `@google/jules-tools`、`jules status`、`jules task list`、`jules pr apply`、`--issue=` 都不存在。

### 11. 跨模块重构，需要边看边验证

**用**：[Antigravity](./antigravity)。

理由是它的两个机制正好对上这类任务的风险：**构件（Artifact）** 让你在它动手前先读到计划，**异步子智能体** 让它能并行读多个模块而不撑爆单个上下文窗口。

**做法**：先让它产出计划构件 → 你读并否决掉方向不对的部分 → 再放它执行 → 用它的验证记录判断该信多少。

**关键点**：并发意味着改动来自多个方向。跑之前确认工作区是干净的，否则事后分不清哪处改动是谁的。

**入口怎么挑**：桌面端适合交互式探索，CLI 适合接进已有脚本，SDK 适合嵌进自己的自动化。规则和技能跨表面共享，不用重配。

### 12. 想让 AI 通读整个仓库做审计

**用**：[AI Studio](./ai-studio)，它能直接控制模型与参数。

官方订阅对比表里唯一可引用的上下文数字是：**Pro 及以上为 100 万令牌扩展上下文**。

<!-- TODO: 待核实 —— 具体某个模型的上下文窗口上限。官方模型清单页不逐个模型列出上下文窗口；历史文档里的"200 万令牌"没有出处 -->

**做法**：

1. 只喂**源码和类型定义**，把 `node_modules`、`dist`、锁文件、构建产物全排除
2. 把问题写成可枚举的清单（"找出所有直接操作 DOM 的地方"），而不是开放式的"审查一下代码质量"
3. 一次只问一类问题。混着问会让它每类都答得很浅

**关键点**：上下文长不等于注意力均匀。放在开头和结尾的内容被利用得更好，中段容易被忽略——把最关键的约束和问题放两端。

**降温度**：审计要的是稳定复现而不是创意，把 temperature 调低。

## 其他

### 13. 快速做个能点的原型

**用**：[Canvas](./canvas)，在对话里直接得到工作区，不用搭本地工程。

**分层推进，别一次要全部**：

```
第一层：DOM 结构 + 基础交互      → 确认逻辑没跑偏
第二层：套设计系统               → 保持代码整洁
第三层：搬进正式工程做类型和测试   → 这一步离开 Canvas
```

**关键点**：Canvas 的产出是原型。把它当成"验证想法的最快路径"，不是"生产代码的来源"。要的是视频而不是能点的页面，去 [Google Flow](./flow)。

**别做**：不要一次性要求它生成带完整业务逻辑的全尺寸应用——反馈回路一长，你就失去了"哪一步开始错的"这个信息。

### 14. 拿到 Google Cloud 额度，怕超支

Google AI Pro 档通过 Google Developer Program 提供 US$10/月 Google Cloud 额度（Ultra 5x 为 US$40，Ultra 20x 为 US$100）。

**第一件事是设预算上限，不是开始调用**：

1. GCP 控制台 → 计费 → 预算和警报
2. 按额度金额建预算
3. 开启告警（建议 50% / 90% / 100% 三档）

**关键点**：额度是"送你的钱"，不是"硬性上限"。超出部分会正常计费到你绑的付款方式上。

**别做**：不要在没设预算的情况下跑批量脚本。长上下文的单次调用成本比交互式对话高得多。

### 15. 团队有数据合规要求

**用**：[Code Assist](./code-assist) 的企业版本。它是家族里唯一以合规为主要卖点的产品——官方开场就写给"有严格数据安全与合规要求的组织"，明确提供 VPC Service Controls 与知识产权赔偿（IP indemnification）。

**版本形态**：Standard / Enterprise（个人 free 档已于 2026-06-18 停服），支持 VS Code / JetBrains / Android Studio。

**关键点**：合规能力绑在**版本**上，不是绑在你的个人订阅上。个人 AI Pro 订阅不会让 Code Assist 变成企业版。

> ⚠️ 历史文档里出现过 `codeAssist.agentMode`（含 `enabled` / `autoApprove` / `requireSpecConfirmation`）这个配置块。Code Assist 确实有智能体模式，但**官方文档里不存在这个 JSON 配置键**，请以官方文档的开启方式为准。

## 相关页面

- [速查表](./gemini-cheatsheet) — 命令、配置键、模型现状、订阅层级
- [术语表](./gemini-glossary) — 概念定义与关系图
- [学习地图](./index) — 学习顺序
