---
title: Kimi 对话与 Agent Cookbook
description: "已经打得开 kimi.com。每个配方一个任务：目标、官方入口、步骤、坑。"
domain: product
tags:
  - chat
role: cookbook
---

# Kimi 对话与 Agent Cookbook

已经打得开 [kimi.com](https://www.kimi.com/)。每个配方一个任务。安装 Kimi Code 不在这里——见 [Kimi Code](/zh/products/kimi-code/)。

## 1. 用 Agent 交出可下载产物

**目标：** 要网站、PPT、表格或报告，而不是一段聊天回复。

**入口：** [kimi.com/agent](https://www.kimi.com/agent)；App 模型切换选 **K3**（[Agent 概览](https://www.kimi.com/zh-cn/help/agent/agent-overview)）。

1. 用官方那种任务句：「帮我创建一个在线投票工具的网站代码」。
2. 等它走完规划 / 工具 / 交付。
3. 下载代码项目、Office 文件，或打开部署链接。

**坑：** 这是浏览器里的 Agent，不会改你磁盘上的 git 仓库。

## 2. 用 Swarm 做大规模搜集

**目标：** 上百个来源、多视角评审、超长文，单 Agent 太慢。

**入口：** [kimi.com/agent-swarm](https://www.kimi.com/agent-swarm)；App 选 **K3 Swarm**（[Agent Swarm](https://www.kimi.com/zh-hans/help/agent/agent-swarm)）。

官方例子可直接改：

- 「收集 200+ 篇 Paul Graham 文章」
- 「100 个 YouTube 细分领域中的 Top 3 创作者」
- 「基于 40 份 PDF 生成 100 页文献综述」

**坑：** 仅 Moderato 及以上；比标准 Agent 更吃额度；带 [Beta] 时可能不是全量开放。

## 3. 给长期工作建 Project

**目标：** 同一规范 / 同一批 PDF 要用很多轮。

**入口：** 侧栏 Projects 旁 **+**，或首页 **+ New project**（[Projects](https://www.kimi.com/help/features/project)）。

1. 名称 1–50 字符，可选项目指令（官方例子："You are a senior product manager. Reply in Chinese and output in Markdown."）。
2. 上传参考文件：单文件 ≤ 100 MB，最多 50 个。
3. 每个独立产出开一条项目内对话，不要全塞进一条线程。
4. 项目内可用 plugins、Skills、Goal，可换模型。

**坑：** 删除不可恢复。Kimi Work 的 Projects **不共享**这份数据。

## 4. 定一个每天跑的任务

**目标：** 日报 / 行业监测，不用每天手点。

**入口：** 侧栏 **Create scheduled task**，或对话里用自然语言（[Scheduled Tasks](https://www.kimi.com/help/features/scheduled-tasks)）。

官方可复制提示：

> Every day at 9:00, summarize the latest market news as 3 key points plus 1 risk note, in Chinese, within 200 words.

1. 先在普通对话跑通，或用「Run once now」。
2. 若依赖 Skill：先安装并试跑，再挂到定时任务。
3. kimi.com 上创建的任务在云端跑，不必开着电脑。

**坑：** 默认过期：Daily +7 天，Weekly +1 月，Monthly +3 月。Kimi Work **本地**任务关机不补跑。到上限时新任务会存成 inactive。

## 5. 用 Skill 固定输出格式

**目标：** 周报 / SOP / 深度研究格式不要每轮重讲。

**入口：** [What are Skills?](https://www.kimi.com/help/features/what-are-skills)

1. Skills 面板浏览官方 / 推荐技能，点 **+** 安装。
2. 输入框键入 `/` 选用，或让 Kimi 按问题自动触发。
3. 没有合适的：上传文档生成，或 `/skill-creator`。

官方技能名可抄：`docx`、`deep-research`；推荐 `sop-writer`、`event-etf-study`。

**坑：** Skill 只在相关任务加载。创建技能会耗额度（见帮助中心 Creating skills FAQ）。

## 6. 给 Agent 接插件

**目标：** 查工商 / GitHub / Notion，而不是只靠网页搜索。

**入口：** 侧栏 **Plugins**，或输入框 **+** / `/`（[Plugins](https://www.kimi.com/help/features/plugins)）。

1. 先把模型切到 **K3** 或 **K3 Swarm**（Deep Research / Websites / PPT 场景也可以）。
2. 登录后安装；要 OAuth 的走第三方授权。
3. 一次可以 `/` 调多个插件。

**坑：** Claw 和 Kimi Plus 对话**还不能**用插件。未登录不能装。列表随地区（国内 / 海外）和是否企业账号变化。有的插件按调用扣会员额度。

## 7. 一键部署一只 Claw

**目标：** 24/7 云端助手，接到飞书 / 企微，不自己买服务器。

**入口：** [kimi.com/bot](https://www.kimi.com/bot)（[Claw overview](https://www.kimi.com/en/help/kimi-claw/overview)）。

1. 确认会员是 **Allegretto 或更高**。
2. **Create** Kimi Claw，等自动配置。
3. **Settings → Chat channels** 配渠道。

已有自建 OpenClaw：选 **Link existing OpenClaw**，在那台机器装 Kimi 插件。

**坑：** 默认模型是 **K2.6**，走会员额度。切 K3 要改 OpenClaw 配置文件，不是网页斜杠命令。

## 8. 开一个 Claw 群聊

**目标：** 多只 Claw 分工，Kimi Conductor 拆任务。

**入口：** Claw 侧栏 **+** → **Start Group Chat**（[group-chat](https://www.kimi.com/help/kimi-claw/group-chat)）。

1. 填 **Group Name** 和 **Group Goal**（都必填）。
2. 勾选已连接的 Claw，Create。
3. 用自然语言设群规则（输出格式、语言、谁干什么）。
4. 文件在 **Workspace** 预览下载。
5. 某只 Claw 说个没完：主聊天发 **`/stop`**。

**坑：** 会员表 Claw 群聊从 Allegretto 起，10 个群。加不进去先查私聊是否在线。第三方 OpenClaw 版本以群聊帮助页为准（该页写过版本上下限）。

## 相关页面

- [学习地图](./index.md)
- [教程](./kimi.md)
- [速查表](./kimi-cheatsheet.md)
- [术语表](./kimi-glossary.md)
