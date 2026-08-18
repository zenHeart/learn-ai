# Gemini 全家族术语表

> 这份文档解释 Gemini 全家族里的**概念**：它是什么、为什么存在、在生态里扮演什么角色、和相邻概念的区别。
>
> 要查命令、配置键、订阅数字，去 [速查表](./gemini-cheatsheet)；要照场景抄配方，去 [Cookbook](./gemini-cookbook)。

## 概念关系图

```
                        ┌─────────────────────────────┐
                        │      Agent-first 范式        │
                        │ AI 是行动者，不是补全引擎     │
                        └──────────────┬──────────────┘
                                       │ 落地为
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
 ┌──────▼──────┐               ┌───────▼───────┐              ┌───────▼───────┐
 │  Gemini CLI │               │  Antigravity  │              │     Jules     │
 │   终端本地   │               │  本地多表面    │              │    云端 VM    │
 └──────┬──────┘               └───────┬───────┘              └───────┬───────┘
        │                              │                              │
   约束与记忆                      约束与能力                      约束与产出
        │                              │                              │
 ┌──────▼──────────┐    ┌──────────────▼──────────────┐    ┌──────────▼────────┐
 │ GEMINI.md 项目  │    │ Rules 规则（全局 + 工作区）   │    │ AGENTS.md 仓库指令 │
 │ system.md 系统  │    │ Skill 技能（目录 + SKILL.md） │    │ Pull Request 交付  │
 │ Extension 扩展  │    │ Workflow 工作流（/名字调用）  │    └───────────────────┘
 └──────┬──────────┘    │ Subagent 子智能体（并发）     │
        │               │ Artifact 构件（可审查中间物）  │
        │               └──────────────┬──────────────┘
        │                              │
        └───────────┬──────────────────┘
                    │ 都通过
            ┌───────▼────────┐
            │      MCP       │  接外部工具（GitHub / 浏览器 / 数据库）
            └────────────────┘

  横向的安全与可恢复机制：
  Trusted Folder（信任才加载项目配置） · Checkpoint（改动前存档，可回滚）
  Session（整段对话可列出与恢复） · Headless Mode（一次性执行，进管道）
```

一句话读法：**范式（Agent-first）决定了产品形态（CLI / Antigravity / Jules），产品形态决定了你用什么载体去约束它（GEMINI.md / Rules / AGENTS.md），而 MCP 决定了它能碰到多大的世界。**

## Agent-first

**是什么**：一种产品设计前提——假设 AI 是能自主规划、调用工具、执行多步任务的行动者，而不是等你敲一半代码再补全后半截的引擎。

**为什么需要这个概念**：它解释了 Antigravity 为什么不是"又一个装了 AI 的编辑器"。补全式工具的交互单位是"一次按键"，Agent-first 工具的交互单位是"一个任务"。这直接改变了你该给它什么输入：补全工具需要光标位置，智能体需要目标、约束和验收标准。

**生态角色**：这是整个 Gemini 编码家族的共同前提。Gemini CLI 在终端里体现它，Antigravity 在桌面端体现它，Jules 在云端体现它。

**与"AI 补全"的区别**：补全在你的编辑循环内部；智能体自己拥有一个编辑循环。前者出错你立刻看见，后者出错可能在二十个文件之后才暴露——这就是 [Checkpoint](#checkpoint-检查点) 和 [Artifact](#artifact-构件) 存在的原因。

**官方文档**：[Antigravity 文档首页](https://antigravity.google/docs/home)

## Surface 表面

**是什么**：Antigravity 的多个入口。官方把桌面应用、CLI（终端 UI）、SDK（Python）、IDE 集成描述为构建在**同一套智能体 harness** 之上的不同表面。

**为什么需要这个概念**：它回答了一个很常见的困惑——"我在桌面端配的规则，用 CLI 还生效吗？"因为共享同一套 harness，规则、技能这类约束是跨表面的，你只需要按当下的工作方式挑入口，而不用重新学一套心智模型。

**工作机制**：表面负责交互形态（图形界面 / 终端 / 编程接口），harness 负责智能体的规划、工具调用与执行。

**与"多客户端"的区别**：普通多客户端往往只是同一个后端 API 的不同壳子，能力常常不对等；表面共享的是智能体运行时本身。

**使用场景**：交互式探索用桌面端；接进已有脚本用 CLI；要把智能体嵌入自己的自动化流程用 SDK。

**官方文档**：[Antigravity 文档首页](https://antigravity.google/docs/home)

## Rules 规则

**是什么**：长期生效的行为约束文件。Antigravity 分两级——全局规则在 `~/.gemini/GEMINI.md`，工作区规则在 `.agents/rules` 目录。官方明确每个规则文件上限 12,000 字符。

**为什么需要**：智能体每次任务都从零开始理解你的偏好，成本极高且不稳定。规则把"我们用 pnpm 不用 npm""所有组件必须带类型"这类不变量沉淀下来，不必每次重述。

**工作机制**：官方提供四种激活模式——Manual（手动引用）、Always On（始终加载）、Model Decision（模型判断是否需要）、Glob（按文件模式匹配触发）。规则之间可以用 `@filename` 交叉引用。

**与 [Skill 技能](#skill-技能) 的区别**：规则是"你必须始终这样做"（约束），技能是"遇到这类活儿按这个流程做"（能力）。约束总是在场，能力按需加载。

**与 Gemini CLI 的 `GEMINI.md` 的区别**：作用相同（提供长期上下文），但位置与分层机制不同，别把两者的路径混着写。

**使用场景**：编码规范、技术栈约束、禁止事项、评审清单。

**官方文档**：[Rules & Workflows](https://antigravity.google/docs/rules-workflows)

## Skill 技能

**是什么**：一个**目录**，里面放一个 `SKILL.md`。位置是 `.agents/skills/<folder>/SKILL.md`（随仓库走）或 `~/.gemini/config/skills/<folder>/SKILL.md`（全局）。frontmatter 里 `description` 必填，`name` 可选。

**为什么需要**：把专项流程（比如"怎么给这个项目发版""怎么写这套 E2E 测试"）从一次性提示词变成可复用、可提交进仓库、可被团队共享的资产。

**工作机制**：`description` 是模型判断"这个技能现在用不用得上"的依据，所以它要写得像触发条件而不是标题。因为技能是目录，你可以把脚本、模板、示例数据一起放进去，让 `SKILL.md` 引用它们。

**常见误解**：技能**不是**一个扁平的 `.md` 文件。历史文档里 `.agents/skills/xxx.md` 这种写法是错的。`.agent/skills`（单数）仅作为向后兼容保留，新建请用 `.agents/skills`。

**使用场景**：发版流程、代码迁移套路、领域特定的调试步骤。

**官方文档**：[Skills](https://antigravity.google/docs/skills)

## Workflow 工作流

**是什么**：可以用 `/<workflow-name>` 显式调用的多步流程。

**为什么需要**：有些流程你希望**由人决定何时开始**，而不是让模型自己判断。技能靠 description 被动匹配，工作流靠斜杠命令主动触发。

**与 [Skill 技能](#skill-技能) 的区别**：触发权归属不同——技能是模型决定要不要用，工作流是你决定什么时候跑。

**使用场景**：上线前检查、生成周报、固定格式的代码审查。

**官方文档**：[Rules & Workflows](https://antigravity.google/docs/rules-workflows)

## Subagent 子智能体

**是什么**：主智能体派出去干活的下级智能体。Antigravity 官方把它描述为 Asynchronous Subagents（异步子智能体）。

**为什么需要**：单个智能体的上下文窗口是有限资源。让子智能体各自去读一个模块、各自返回结论，主智能体只消费结论而不消费原始文件，能在同样的窗口里处理大得多的任务。

**工作机制**：子智能体独立执行、异步返回。这意味着主智能体在等结果的同时可以继续推进别的分支。

**代价**：并发意味着改动来自多个方向，冲突与"两个子智能体改了同一个文件"的风险变高。这也是 [Artifact 构件](#artifact-构件) 有价值的原因——你需要能审查它们各自打算做什么。

<!-- TODO: 待核实 —— 官方是否规定了子智能体的并发数量上限。抓取到的官方文档只描述了能力，未找到官方说明给出具体数字 -->

**官方文档**：[Antigravity 文档首页](https://antigravity.google/docs/home)

## Artifact 构件

**是什么**：智能体在执行过程中产出的可审查中间产物，比如计划、任务清单、验证记录。

**为什么需要**：智能体自主性越高，"它到底打算干什么"就越不透明。构件把黑箱中间态变成你可以读、可以否决的东西——这是自主性的配套刹车，不是装饰。

**生态角色**：它和 Jules"先出计划待人工批准"是同一个设计动机在不同产品里的体现：**在动手之前先给人一个否决点**。

**使用场景**：跨模块重构前先读它的计划；智能体跑完后用它的验证记录判断该信多少。

**官方文档**：[Antigravity 文档首页](https://antigravity.google/docs/home)

## Checkpoint 检查点

**是什么**：Gemini CLI 在每次修改文件之前自动存档，之后可以用 `/restore` 回滚。默认**关闭**，需要把 `general.checkpointing.enabled` 设为 `true`。

**为什么需要**：智能体的一次任务可能连续改十几个文件。等你发现方向错了，用 `git checkout` 会连你自己手写的改动一起丢掉。检查点提供的是"回到智能体动手前那一刻"这个更精准的粒度。

**与 Git 的区别**：Git 记录的是你**想留下**的历史，检查点记录的是你**可能想撤销**的自动改动。两者互补，检查点不能替代提交。

**使用场景**：开启后再让智能体做大范围重构。

**官方文档**：[Gemini CLI 文档](https://geminicli.com/docs/)

## Session 会话

**是什么**：一次对话的完整记录，可以列出并恢复。

**为什么需要**：真实工作会被打断。会话让"昨天那个上下文"不必靠你重新粘贴一遍。

**工作机制**：会话默认永久保留，可以用配置项自动清理——`general.sessionRetention.enabled` 开启清理，`maxAge`（如 `"30d"`）按时间、`maxCount` 按数量、`minRetention`（默认 `"1d"`）兜底最短保留期。

**与 [Checkpoint 检查点](#checkpoint-检查点) 的区别**：会话保存的是**对话**，检查点保存的是**文件**。恢复会话不会把代码改回去。

**官方文档**：[Gemini CLI 文档](https://geminicli.com/docs/)

## Headless Mode 无头模式

**是什么**：用 `-p`（prompt）参数一次性执行并直接返回结果，不进入交互界面。配合 `--output-format json` 可以拿到结构化输出。

**为什么需要**：这是让 AI 进入既有工程管道的接口。交互式界面对人友好，对脚本不友好；无头模式让 `gemini` 变成一个普通的 Unix 命令，能被管道、CI、Git hook 调用。

**工作机制**：标准输入进、标准输出出，所以 `npm run build 2>&1 | gemini -p "分析这个报错"` 这类写法成立。

**使用场景**：构建失败分析、批量生成、CI 检查。

**官方文档**：[Gemini CLI 文档](https://geminicli.com/docs/)

## Trusted Folder 信任文件夹

**是什么**：一个安全边界机制。开启 `security.folderTrust.enabled` 后，只有被信任的目录才会加载项目级配置；信任列表存在 `~/.gemini/trustedFolders.json`。

**为什么需要**：`.gemini/settings.json` 和自定义命令是随仓库走的。如果你克隆了一个陌生仓库并在里面启动智能体，仓库自带的配置就有机会影响智能体行为。信任机制让"我读过并认可这个仓库的配置"成为一个显式动作。

**工作机制**：未信任的目录里，项目配置与自定义命令不生效。

**与沙盒的区别**：信任控制的是"**加载谁的配置**"，沙盒控制的是"**执行能碰到什么**"。两者解决不同的问题。

**官方文档**：[Gemini CLI 文档](https://geminicli.com/docs/)

## MCP

**是什么**：Model Context Protocol，一个让智能体连接外部工具与数据源的开放协议。

**为什么需要**：没有 MCP 的智能体只能读写本地文件、跑本地命令。接上 MCP 之后它能查 GitHub Issue、驱动浏览器、读数据库——能力边界从"这台机器"扩展到"这些服务"。

**生态角色**：它是 Gemini 家族与外部世界之间的统一插头，也是 Gemini CLI、Antigravity、Code Assist 共同支持的能力。

**工作机制**：MCP 服务器暴露一组工具，智能体在需要时调用。在 Gemini CLI 里，MCP 服务器通常通过 [Extension 扩展](#extension-扩展) 安装。

**安全提示**：MCP 服务器往往需要凭据（比如 GitHub token）。把凭据放进环境变量或 `.gemini/.env`，**不要写进会提交进仓库的配置文件，也不要直接敲在命令行里**（命令行会进 shell history）。

**官方文档**：[Gemini CLI 文档](https://geminicli.com/docs/)

## Extension 扩展

**是什么**：Gemini CLI 的安装单元，最常见的用途是安装 MCP 服务器。安装形式是 `gemini extensions install <git-url>`。

**为什么需要**：把"配一个 MCP 服务器"从手写 JSON 变成一条命令。

**工作机制**：从 Git 仓库地址安装。注意仓库地址必须完整含组织名，例如官方 GitHub MCP 服务器是 `https://github.com/github/github-mcp-server`——历史文档里出现过 `https://github.com/github-mcp-server`（缺组织名）这种拼错的地址，装不上。

**使用场景**：接 GitHub、接浏览器自动化、接内部服务。可用扩展见[官方扩展市场](https://geminicli.com/extensions/)。

**官方文档**：[Gemini CLI 扩展](https://geminicli.com/extensions/)

## AGENTS.md

**是什么**：放在**仓库根目录**的指令文件，Jules 会自动读取。

**为什么需要**：Jules 在云端 VM 里独立干活，你不在旁边。它需要提前知道这个仓库怎么装依赖、怎么跑测试、有什么禁区——否则它只能猜。

**与 [Rules 规则](#rules-规则)、`GEMINI.md` 的区别**：三者都是"给智能体的长期指令"，但归属不同产品、位置不同：Jules 读仓库根的 `AGENTS.md`，Antigravity 读 `~/.gemini/GEMINI.md` 与 `.agents/rules`，Gemini CLI 读 `GEMINI.md` 与 `.gemini/system.md`。**不要假设写一处能被全家族共用。**

**使用场景**：写清依赖安装命令、测试命令、代码风格、不许动的目录。

**官方文档**：[Jules 文档](https://jules.google/docs/)

## Google Flow

**是什么**：Google 的 AI 创意工作室。用 Veo 3.1、Nano Banana、Gemini Omni 从文本 / 帧 / 素材生成并精修视频与图像。入口是 [labs.google/fx/tools/flow](https://labs.google/fx/tools/flow)。

**为什么需要**：编码主线（CLI / Antigravity / Jules）交出的是仓库里的代码。对外讲一个功能时，前端工程师还需要成片——落地页宣传、产品演示、分镜。Flow 填的是这一段，不是另一条编码入口。

**生态角色**：对位 Claude 家族的 Claude Design。Design 出可交接的界面原型，Flow 出可发布的影像。订阅档位同时决定 Flow 积分和 Antigravity / Jules 额度，但账本分开。

**与 [Canvas](./canvas) 的区别**：Canvas 在 Gemini 对话旁边给你一个能点的工作区，产出是交互原型。Flow 产出是视频 / 图像。要 DOM 用 Canvas，要成片用 Flow。

**与 Flow Music 的区别**：Flow Music 在 [flowmusic.app](https://www.flowmusic.app/)，做歌和 MV。Pro 对应它自己的 Plus 档（每月 10,000 音乐积分）。**两本积分不能混用**。

**Flow Sessions**：落地页上的艺术家合作计划，不是日常产品。

**官方文档**：[产品入口](https://labs.google/fx/tools/flow)、[额度](https://support.google.com/flow/answer/16526234)。产品页见 [Flow](./flow)。

## 相关页面

- [速查表](./gemini-cheatsheet) — 命令、配置键、订阅层级
- [Cookbook](./gemini-cookbook) — 按场景抄配方
- [学习地图](./index) — 学习顺序
