---
title: MiniMax Agent 教程
description: "打开 agent.minimaxi.com，选 Lightning 或 Pro，发出第一个长程任务。这不是 MiniMax Code 桌面教程。"
domain: product
tags:
  - coding-agent
role: tutorial
---

# MiniMax Agent 教程

> 目标：15 分钟内在网页工作台跑完一次可交付任务。
>
> 非目标：安装 MiniMax Code、配置工作区 / 终端 / 权限模式、解释模型内部。桌面端见 [Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome)。机制见 [Learn LLM](https://llm.zenheart.site/chapters/)。

## 先决条件

- 能打开 [agent.minimaxi.com](https://agent.minimaxi.com/)（国内）或 [agent.minimax.io](https://agent.minimax.io/)（海外）。
- 一个 MiniMax 账号。登录按钮在产品页右上角，原文是「登录」/「Sign in」。
- 不需要本机仓库，不需要 CLI。

## 学习目标

1. 分清 Agent 网页和 Code 桌面端。
2. 按任务长度选 Lightning 或 Pro。
3. 发出一个带交付物的任务，并知道何时改用 Agent Team 或技能市场。

## 它是什么

MiniMax Agent 是网页上的通用智能体。官方 [靠谱](https://www.minimaxi.com/news/minimax-agent) 用「靠谱的人」当设计标准，列了三块：

| 标准 | 官方原文在说什么 |
|------|------------------|
| 编程 | 更多组件和复杂跳转；模拟用户操作做测试；重视界面与交互 |
| 多模态 | 理解长文本、视频、音频、图片；内置生图、音频、视频 |
| MCP | 内置 MiniMax MCP；并写了 GitHub / GitLab / Slack / Figma 等办公扩展 |

首页当前文案是「MiniMax，让工作更简单」，并提供 **Agent 团队** 开关和模型选择（2026-08-19 可见 MiniMax-M3）。

它**不是**：

- MiniMax Code（桌面端；[welcome](https://agent.minimaxi.com/docs/code/welcome) 原文：「把对话、项目工作区、文件操作、终端、浏览器、技能、记忆和自动化任务放在同一个本地工作环境里」）
- MiniMax Design / Hub（创作画布）
- Hailuo、星野、Audio（见 [学习地图](./index.md)）

## 第一步：打开工作台

1. 打开 [agent.minimaxi.com](https://agent.minimaxi.com/)。
2. 点 **登录**。
3. 用首页输入框描述目标。2026-08-19 首页可见快捷入口：**视频生成**、**调研报告**、**文档**、**教育学习**。
4. 需要装桌面端时，首页有「下载桌面端」。注意：[下载页](https://agent.minimaxi.com/download) 当前标题是 **MiniMax Code - 下载**。那是桌面端品牌，不是本教程的下一步。

海外站点步骤相同，入口换成 [agent.minimax.io](https://agent.minimax.io/)，按钮原文是 **Sign in** / **Download desktop**。

## 第二步：选 Lightning 或 Pro

[M2 新闻](https://www.minimaxi.com/news/minimax-m2) 原文：

| 模式 | 官方定位 | 官方举例 |
|------|----------|----------|
| **Lightning 高效模式** | 高效极速版 Agent | 对话问答 / 轻量级搜索 / 轻量级代码 |
| **Pro 专业模式** | 专业 agent 能力，复杂长程任务上最佳表现 | 深度研究 / 全栈开发 / PPT / 报告撰写 / 网页制作 |

怎么选：

- 一问一答、查一条资料、改一小段代码 → Lightning。
- 要一份带出处的报告、一套 PPT、一个可打开的网页、一次全栈交付 → Pro。
- 不确定就先 Lightning；交付物不够再开 Pro。不要把「所有任务都开 Pro」当成默认。

两种模式是官方产品声明。界面上的具体开关文案以你登录后看到的为准；本页不臆造按钮路径。

## 第三步：发出第一个任务

官方要求「show me the requirement」。把**交付物**写进第一句话。

```
帮我调研 MiniMax Agent 和 MiniMax Code 的官方区别。
只使用 minimaxi.com 与 agent.minimaxi.com 上的页面。
交付：
1. 一份 Markdown 对照表（产品、入口、适合做什么、不适合做什么）
2. 不超过 8 张幻灯片的 HTML 提纲，给前端工程师 internally share
不要写模型内部结构。
```

发送后盯三件事：

1. Agent 有没有先确认目标，而不是直接堆字。
2. 引用是不是官方 URL。Verifier 思路见 [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md)：正式来源应尽量使用稳定 URL，搜索缓存只能当线索。
3. 交付物能不能下载或打开。不要只收下一段聊天记录。

第一个任务建议用 **Pro**。这是长程调研 + 双交付。

## 第四步：复杂任务再开 Agent Team

[Agent Team 技术文](https://agent.minimaxi.com/docs/techblog/agent-team.md) 原文：用户仍然只发出一条消息；系统判断是否拆分、哪些角色并行、哪些结果必须验证。

三类角色（官方命名）：

- **Leader**：把目标变成任务结构。
- **Worker**：执行子任务，工具 / 上下文 / 输出要求可以不同。
- **Verifier**：把「完成了」变成「可以交付」，和 Worker 是对抗关系。

什么时候开 Team：

- 要并行检索、交叉核验、再合成。
- 文档要过「能生产 → 能交付」（官方办公文档场景：Planner / Writer / Formatter / Evaluator）。
- 你在 IM 里等秒回，但任务本身要跑很久。官方写：主 Agent 先快速响应，后台拆分执行。

什么时候不要开：

- 改一处文案、查一个事实、生成一张图。官方自己说单 Agent 更便宜。
- 你还没写清验收标准。Team 会放大一个含糊目标。

首页有 **Agent 团队** 开关。技术文还提到显式 `/team` 出现在桌面端 changelog 语境里；网页以你看到的开关为准，不要把 Code 斜杠命令抄过来当网页必经步骤。

## 第五步：用技能市场扩展，而不是每次重写流程

打开 [agent.minimaxi.com/skills](https://agent.minimaxi.com/skills)。官方描述：「探索、安装和使用由开发者和社区构建的强大能力。」支持自定义创建或从 GitHub 导入。

2026-08-19 市场里能直接看到的官方技能包括：演示文稿、行业研究报告、DOCX、热点长文、图像提示词、股票分析、Excel、PowerPoint 等。**技能名单会变**，以市场页为准。

用法：

1. 先搜有没有现成技能，再开始长任务。
2. 重复做过两次的流程，再考虑沉淀为自己的技能。Agent Team 文把「经验沉淀为记忆、Skill」写成 Team 的长期价值。
3. 不要把技能市场和 Code 的插件市场混成一页。插件市场上线公告写在 Code 更新说明里。

## 计费：只抄两份官方原文

| 来源 | 原文 | 怎么用 |
|------|------|--------|
| [M2 新闻](https://www.minimaxi.com/news/minimax-m2) | 「我们目前在免费提供 MiniMax Agent, 直到我们的服务器撑不住为止。」 | 这是发布当时的限时政策，不是长期 SLA |
| [技能市场](https://agent.minimaxi.com/skills) | 「统一计费：全面打通 Token Plan」 | 额度以账号内套餐页为准 |
| [下载页](https://agent.minimaxi.com/download) | Plus ¥49 / Max ¥119 / Ultra ¥469 | 页面品牌是 MiniMax Code，不要写成 Agent 网页专用价 |

登录后点首页的「查看套餐与价格」。本页不臆造 token 包大小。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 把 Agent 网页教程写成 Code CLI | 本页停在浏览器。工作区 / 终端 / Coding 模式去 #72 |
| 所有任务都开 Pro 或 Team | 短问答用 Lightning；Team 留给要验收的长程 |
| 把搜索摘要当出处 | 只要官方稳定 URL |
| 把限时免费写成永远免费 | 链回套餐页 |
| 把 Hub 当成 Agent 的别名 | Hub 当前落地页是 Design |
| 写 MSA / 注意力细节 | 链 [Learn LLM](https://llm.zenheart.site/chapters/) |

## 下一步

- 场景配方：[Cookbook](./minimax-agent-cookbook.md)
- 入口与数据源：[速查表](./minimax-agent-cheatsheet.md)
- 名字：[术语表](./minimax-agent-glossary.md)
- 本机仓库：[Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome)
